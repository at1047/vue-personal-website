import { marked } from 'marked';
import { RouterLink, RouterView } from 'vue-router'

/**
 * Converts markdown text to HTML with custom image processing
 * @param {string} markdown - The markdown text to convert
 * @returns {string} - The converted HTML
 */
export function markdownToHtml(markdown, type = null) {
  if (!markdown) return '';
  
  // Remove text wrapped in %%text%% before processing
  const withoutIgnored = markdown.replace(/%%[\s\S]*?%%/g, '');
  
  // Parse markdown to HTML
  const parsedMarkdown = marked.parse(withoutIgnored);
  
  // Process custom image syntax: ![[filename.ext#classname]] (supports .jpg, .jpeg, .png, .gif, .svg)
  const replacedMarkdownImg = parsedMarkdown.replace(/<p>!\[\[(.*?)\]\]<\/p>/g, (match, raw) => {
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

    // Permit common image extensions, including gif
    const allowed = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
    if (!allowed.includes(extension)) return match;

    // Build img src path, auto-prepend images/ if no folder provided
    const imagePath = baseName.includes('/') ? `${baseName}.${extension}` : `images/${baseName}.${extension}`;
    const idValue = baseName.split('/').pop();
    const classAttr = className ? ` class="${className}"` : '';
    return `<img id="${idValue}"${classAttr} src="/${imagePath}" />`;
  });

 
  // Process custom image syntax: ![[filename.ext#classname]] (supports .jpg, .jpeg, .png, .gif, .svg)
  const replacedMarkdown = replacedMarkdownImg.replace(/<p>\[\[(.*?)\]\]<\/p>/g, (match, raw) => {
    if (!raw) return match;
    console.log(raw)
    

    const segments = raw.split(' ');

    // var file = raw.replaceAll(' ', '_')
    // file = file + '.md'
    
    if (type == null) {
      return "<p>Link Broken</p>"
    }

    const prefix = segments.shift(0).toLowerCase()

    const linkName = segments.join(' ')

    const link = `/${type}/${prefix}/${segments.join('_').toLowerCase()}`;
    
    return `<a href="${link}" style="text-decoration: underline;">${linkName}</a>`;
  });


  // Remove any width attribute from standard <img> tags (e.g., width="300")
  // Example input: <img src="/clarent_5.jpg" width="300" />
  const cleanedImages = replacedMarkdown.replace(/\swidth="[^"]*"/g, '');

  // Add id attribute to standard <img> tags based on filename if missing
  // Also automatically prepend images/ to paths that don't already have a folder
  // Example: <img src="/clarent_5.jpg" /> => <img id="clarent_5" src="/images/clarent_5.jpg" />
  const withImgIds = cleanedImages.replace(/<img([^>]*?)src=\"\/?([^/\"]+)\.([a-zA-Z0-9]+)\"([^>]*)>/g, (match, before, name, ext, after) => {
    // If an id already exists, leave unchanged
    if (/\sid\s*=/.test(match)) return match;
    // Check if path already has a folder (contains /)
    const imagePath = name.includes('/') ? `${name}.${ext}` : `images/${name}.${ext}`;
    return `<img id="${name.split('/').pop()}"${before}src="/${imagePath}"${after}>`;
  });
  
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
