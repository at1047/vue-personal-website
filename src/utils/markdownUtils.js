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
    return `<img id="${fullname}" class="${classname}" src="/${fullname}.${extension}" />`;
  });
  
  return replacedMarkdown;
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
