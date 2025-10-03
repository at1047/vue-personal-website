import { marked } from 'marked';

/**
 * Converts markdown text to HTML with custom image processing
 * @param {string} markdown - The markdown text to convert
 * @returns {string} - The converted HTML
 */
export function markdownToHtml(markdown) {
  if (!markdown) return '';
  
  // Parse markdown to HTML
  const parsedMarkdown = marked.parse(markdown);
  
  // Process custom image syntax: ![[filename.ext#classname]]
  const replacedMarkdown = parsedMarkdown.replace(/<p>!\[\[(.*?)\]\]<\/p>/g, (match, filename) => {
    console.log(filename);
    const [fullname, extensionandclass] = filename.split('.');
    console.log(`fullname: ${fullname}, extension: ${extensionandclass}`);
    const [extension, classname] = extensionandclass.split('#');
    console.log(`${fullname}.${extension}, ${classname}`);
    // Automatically prepend images/ to the path
    return `<img id="${fullname}" class="${classname}" src="/images/${fullname}.${extension}" />`;
  });

  // Remove any width attribute from standard <img> tags (e.g., width="300")
  // Example input: <img src="/clarent_5.jpg" width="300" />
  const cleanedImages = replacedMarkdown.replace(/\swidth="[^"]*"/g, '');

  // Add id attribute to standard <img> tags based on filename if missing
  // Also automatically prepend images/ to paths that don't already have a folder
  // Example: <img src="/clarent_5.jpg" /> => <img id="clarent_5" src="/images/clarent_5.jpg" />
  const withImgIds = cleanedImages.replace(/<img([^>]*?)src=\"\/([^\/"]+)\.([a-zA-Z0-9]+)\"([^>]*)>/g, (match, before, name, ext, after) => {
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
