let currentIndex = 0; // Index to keep track of current posts displayed
const postsPerPage = 3; // Number of posts to load at once

// Function to load posts from posts.js
async function loadPosts() {
    try {
        await fetchPostData(); // Fetch posts from posts.js
        renderBlogPreviews(); // Render posts immediately after fetching data
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

// Function to render blog previews
function renderBlogPreviews() {
    const carousel = document.getElementById('carousel');

    // Clear existing posts to avoid duplicates
    carousel.innerHTML = ''; 

    // Create a Set to track unique post links
    const uniqueLinks = new Set();

    // Load all posts
    for (let i = 0; i < window.blogPosts.length; i++) {
        const post = window.blogPosts[i]; // Use window.blogPosts
        const postLink = post.link; // Get the post link

        // Check if the link is already added
        if (!uniqueLinks.has(postLink)) {
            uniqueLinks.add(postLink); // Add link to the Set
            const postElement = document.createElement('div');
            postElement.className = 'post-preview'; // Keep class for general styling

            postElement.innerHTML = `
                <h2><a href="${post.link}">${post.title}</a></h2>
                <p class="date ui-monospace"><em>${post.date}</em></p> <!-- Monospace class for date -->
                <p class="intro ui-monospace">${post.intro}</p> <!-- Monospace class for intro -->
            `;
            carousel.appendChild(postElement); // Append the new post
        }
    }

    // Hide Load More button since all posts are loaded initially
    const loadMoreButton = document.getElementById('loadMoreBtn');
    if (loadMoreButton) {
        loadMoreButton.style.display = 'none'; // Hide button
    }
}

// Initial render
document.addEventListener('DOMContentLoaded', loadPosts); // Load posts on DOMContentLoaded


















