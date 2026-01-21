import { marked } from 'marked';

/**
 * Slugify a string for use as an anchor ID
 * Matches Obsidian's heading ID generation
 * @param {string} text - The heading text
 * @returns {string} - URL-safe slug
 */
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // Remove special characters
    .replace(/\s+/g, '-')       // Replace spaces with hyphens
    .replace(/-+/g, '-')        // Collapse multiple hyphens
    .replace(/^-|-$/g, '');     // Trim hyphens from ends
}

/**
 * Configure marked to add IDs to headings
 */
const renderer = new marked.Renderer();
const originalHeadingRenderer = renderer.heading.bind(renderer);

renderer.heading = function(text, level, raw) {
  const slug = slugify(raw);
  return `<h${level} id="${slug}">${text}</h${level}>\n`;
};

marked.setOptions({
  renderer: renderer,
  gfm: true,
  breaks: false,
});

/**
 * Converts markdown text to HTML with custom processing
 * Supports:
 * - Obsidian %% comments %%
 * - Obsidian image embeds: ![[image.png]]
 * - Obsidian anchor links: [[#Heading Name]] or [[#Heading Name|Custom Text]]
 * - Obsidian wikilinks: [[Page Name]] (converted to internal routes)
 * - Auto-generated heading IDs for anchor navigation
 * 
 * @param {string} markdown - The markdown text to convert
 * @param {string} type - The content type (e.g., "projects", "blog") for wikilink routing
 * @returns {string} - The converted HTML
 */
export function markdownToHtml(markdown, type = null) {
  if (!markdown) return '';
  
  // Step 1: Remove Obsidian comments wrapped in %%text%%
  const withoutComments = markdown.replace(/%%[\s\S]*?%%/g, '');
  
  // Step 2a: Pre-process footnote-style references: \[[[#Heading|N]]] → [N] as link
  // Format in .md file: \[[[#Appendix|1]]]
  // Output: <a href="#appendix">[1]</a>
  const withFootnoteRefs = withoutComments.replace(
    /\\\[\[\[#([^\]|]+)(?:\|([^\]]+))?\]\]\]/g,
    (match, heading, displayText) => {
      const slug = slugify(heading);
      const text = displayText || '1';
      // Use a placeholder that marked won't touch
      return `%%FOOTNOTE_REF:${slug}:${text}%%`;
    }
  );
  
  // Step 2b: Pre-process Obsidian anchor links BEFORE marked parsing
  // Convert [[#Heading Name]] to a placeholder that won't be altered by marked
  // Also handles [[#Heading Name|Custom Text]] syntax
  const withAnchorPlaceholders = withFootnoteRefs.replace(
    /\[\[#([^\]|]+)(?:\|([^\]]+))?\]\]/g,
    (match, heading, customText) => {
      const slug = slugify(heading);
      const displayText = customText || heading;
      // Use a placeholder that marked won't touch
      return `%%ANCHOR_LINK:${slug}:${displayText}%%`;
    }
  );
  
  // Step 3: Parse markdown to HTML with marked (headings now get IDs)
  const parsedMarkdown = marked.parse(withAnchorPlaceholders);
  
  // Step 4a: Restore footnote reference placeholders to bracketed links
  const withFootnoteLinks = parsedMarkdown.replace(
    /%%FOOTNOTE_REF:([^:]+):([^%]+)%%/g,
    (match, slug, displayText) => {
      return `<a href="#${slug}" class="footnote-ref">[${displayText}]</a>`;
    }
  );
  
  // Step 4b: Restore anchor link placeholders to actual links
  const withAnchorLinks = withFootnoteLinks.replace(
    /%%ANCHOR_LINK:([^:]+):([^%]+)%%/g,
    (match, slug, displayText) => {
      return `<a href="#${slug}" class="anchor-link">${displayText}</a>`;
    }
  );
  
  // Step 5: Process Obsidian image embeds: ![[filename.ext]] or ![[filename.ext#classname]]
  const withImages = withAnchorLinks.replace(/<p>!\[\[(.*?)\]\]<\/p>/g, (match, raw) => {
    if (!raw) return match;
    
    // Extract optional class after '#'
    const hashIndex = raw.indexOf('#');
    const pathPart = hashIndex >= 0 ? raw.slice(0, hashIndex) : raw;
    const className = hashIndex >= 0 ? raw.slice(hashIndex + 1) : '';

    // Use last '.' to allow filenames with dots
    const lastDot = pathPart.lastIndexOf('.');
    if (lastDot === -1) return match;
    
    const baseName = pathPart.slice(0, lastDot);
    const extension = pathPart.slice(lastDot + 1).toLowerCase();

    // Permit common image extensions
    const allowed = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
    if (!allowed.includes(extension)) return match;

    // Build img src path, auto-prepend images/ if no folder provided
    const imagePath = baseName.includes('/') ? `${baseName}.${extension}` : `images/${baseName}.${extension}`;
    const idValue = baseName.split('/').pop();
    const classAttr = className ? ` class="${className}"` : '';
    
    return `<img id="${idValue}"${classAttr} src="/${imagePath}" />`;
  });

  // Step 6: Process remaining wikilinks for cross-page navigation: [[Page Name]]
  // Skip if it starts with # (those should have been handled above)
  const withWikilinks = withImages.replace(/\[\[([^\]#][^\]]*)\]\]/g, (match, raw) => {
    if (!raw) return match;
    
    const segments = raw.split(' ');
    
    if (type == null) {
      return `<span class="broken-link">${raw}</span>`;
    }

    const prefix = segments.shift().toLowerCase();
    const linkName = segments.join(' ') || prefix;
    const link = `/${type}/${prefix}/${segments.join('_').toLowerCase()}`;
    
    return `<a href="${link}" class="wiki-link">${linkName}</a>`;
  });

  // Step 7: Clean up image tags - remove width attributes
  const cleanedImages = withWikilinks.replace(/\swidth="[^"]*"/g, '');

  // Step 8: Add id attribute to standard <img> tags based on filename if missing
  // Also automatically prepend images/ to paths that don't already have a folder
  const withImgIds = cleanedImages.replace(
    /<img([^>]*?)src="\/?((?:[^/"]+\/)?[^/"]+)\.([a-zA-Z0-9]+)"([^>]*)>/g,
    (match, before, name, ext, after) => {
      // If an id already exists, leave unchanged
      if (/\sid\s*=/.test(match)) return match;
      
      // Check if path already has a folder (contains /)
      const hasFolder = name.includes('/');
      const imagePath = hasFolder ? `${name}.${ext}` : `images/${name}.${ext}`;
      const idValue = name.split('/').pop();
      
      return `<img id="${idValue}"${before}src="/${imagePath}"${after}>`;
    }
  );
  
  return withImgIds;
}

/**
 * Fetches markdown content from a file
 * @param {string} filename - The markdown filename (without .md extension)
 * @returns {Promise<string>} - The markdown content
 */
export async function fetchMarkdown(filename) {
  try {
    const response = await fetch(`/${filename}.md`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}.md: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching markdown file ${filename}.md:`, error);
    return '';
  }
}
