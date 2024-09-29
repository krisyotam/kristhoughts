const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Set options for marked to preserve custom syntax (like $$ for MathJax)
marked.setOptions({
    gfm: true,
    breaks: true,
});

// Directory paths
const postsDirectory = path.join(__dirname, 'posts');
const publicDirectory = path.join(postsDirectory, 'public');
const templatePath = path.join(__dirname, 'blogpost', 'content', 'post-template.html');

// Ensure the public directory exists
if (!fs.existsSync(publicDirectory)) {
    fs.mkdirSync(publicDirectory);
}

// Read the HTML template from the specified file
let template;
try {
    template = fs.readFileSync(templatePath, 'utf8');
} catch (err) {
    console.error('Error reading the template file:', err);
    return;
}

// Function to convert markdown files to HTML
function convertMarkdownToHTML() {
    fs.readdir(postsDirectory, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        files.forEach(file => {
            if (file.endsWith('.md')) {
                const htmlFilePath = path.join(publicDirectory, file.replace('.md', '.html'));
                
                // Check if the HTML file already exists
                if (fs.existsSync(htmlFilePath)) {
                    console.log(`HTML file already exists: ${htmlFilePath}. Skipping...`);
                    return;
                }

                fs.readFile(path.join(postsDirectory, file), 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    // Escape $$ for proper rendering and add an extra $ for single $
                    const escapedData = data.replace(/\$\$/g, '\\$\\$')
                                             .replace(/\$(?!\$)/g, '$$$$'); // Add extra $ for single $

                    const htmlContent = marked(escapedData);

                    // Replace the placeholder in the template with the converted HTML content
                    const htmlPage = template.replace('<!-- CONTENT PLACEHOLDER -->', htmlContent)
                                              .replace(/<title>.*<\/title>/, `<title>${file.replace('.md', '')}</title>`);

                    // Write the HTML to the public directory
                    fs.writeFile(htmlFilePath, htmlPage, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(`HTML file created: ${file.replace('.md', '.html')}`);
                    });
                });
            }
        });
    });
}

// Initial conversion on script run
convertMarkdownToHTML();

// Watch for new markdown files in the posts directory
fs.watch(postsDirectory, (eventType, filename) => {
    if (eventType === 'rename' && filename.endsWith('.md')) {
        console.log(`New markdown file detected: ${filename}. Converting...`);
        convertMarkdownToHTML();
    }
});























