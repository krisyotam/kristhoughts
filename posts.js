let blogPosts = []; // Array to store blog posts

async function fetchPostData() {
    let postIndex = 1; // Start from the first post
    let postUrl;

    while (true) {
        postUrl = `posts/public/post${postIndex}.html`; // Construct the post URL
        try {
            const response = await fetch(postUrl);
            if (!response.ok) {
                console.log(`No more posts found. Stopped at post${postIndex}.html`);
                break; // Stop if no more posts
            }

            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            // Extract title, date, and intro safely
            const titleElement = doc.querySelector('h1');
            const dateElements = doc.querySelectorAll('h6');

            // Check if elements are found
            if (titleElement && dateElements.length >= 2) { // Ensure there are at least 2 h6 elements
                const title = titleElement.innerText; // Title from h1
                const date = dateElements[1].innerText; // Date from second h6
                const intro = dateElements[0].innerText; // Intro from first h6

                // Push the extracted post data into the blogPosts array
                blogPosts.push({
                    title,
                    date,
                    intro,
                    link: postUrl
                });
            } else {
                console.error(`Post structure not as expected in post${postIndex}.html`);
            }

            postIndex++;
        } catch (error) {
            console.error(`Error fetching ${postUrl}:`, error);
            break; // Stop if an error occurs while fetching
        }
    }

    // Expose blogPosts for external access in the browser
    window.blogPosts = blogPosts;
}

// Immediately fetch posts on load
fetchPostData().then(() => {
    console.log('Posts fetched:', window.blogPosts); // Log fetched posts for confirmation
});














