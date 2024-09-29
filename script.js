let currentIndex = 0; // Index to keep track of current posts displayed
const postsPerPage = 3; // Number of posts to load at once

// Function to load posts from posts.js
async function loadPosts() {
    try {
        await fetchPostData(); // Fetch posts from posts.js
        renderBlogPreviews(); // Call renderBlogPreviews here for the initial load
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
            postElement.className = 'post-preview';
            
            postElement.innerHTML = `
                <h2><a href="${post.link}">${post.title}</a></h2>
                <p><em>${post.date}</em></p>
                <p>${post.intro}</p>
            `;
            carousel.appendChild(postElement); // Append the new post
        }
    }

    // Update current index for the next load
    currentIndex = window.blogPosts.length; // Load all posts at once, set currentIndex to total

    // Hide Load More button if all posts have been loaded
    const loadMoreButton = document.getElementById('loadMoreBtn');
    if (loadMoreButton) {
        loadMoreButton.style.display = 'none'; // Hide button as it's no longer needed
    }
}

// Initial render
document.addEventListener('DOMContentLoaded', loadPosts); // Load posts on DOMContentLoaded
















