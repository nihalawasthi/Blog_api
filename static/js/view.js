document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');
    const searchForm = document.getElementById('searchForm');
    const updateForm = document.getElementById('updateForm');

    // Fetch and display all posts
    fetch('http://127.0.0.1:8000/api/posts/')
        .then(response => response.json())
        .then(posts => {
            postsContainer.innerHTML = ''; // Clear existing posts
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <h3>${post.title}, ${post.id}</h3>
                    <p>${post.content}</p>
                    <button onclick="fetchPost(${post.id})">View</button>
                    <button onclick="showUpdateForm(${post.id}, '${post.title}', '${post.content}')">Edit</button>
                    <button onclick="deletePost(${post.id})">Delete</button>
                `;
                postsContainer.appendChild(postElement);
            });
        });

    // Handle form submission to search for a post by ID
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const postId = document.getElementById('searchId').value;
        fetchPost(postId);
    });

    // Handle form submission to update a post
    updateForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(updateForm);
        const postData = {
            title: formData.get('title'),
            content: formData.get('content')
        };
        const postId = document.getElementById('updateId').value;

        fetch(`http://127.0.0.1:8000/api/posts/${postId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(post => {
            location.reload(); // Reload the page to reflect the update
        });
    });
});

// Function to fetch and display a single post by ID
function fetchPost(id) {
    fetch(`http://127.0.0.1:8000/api/posts/${id}/`)
        .then(response => response.json())
        .then(post => {
            if (post.detail) {
                alert('Post not found!');
            } else {
                alert(`Title: ${post.title}\nContent: ${post.content}`);
                showUpdateForm(post.id, post.title, post.content);
            }
        });
}

// Function to show the update form with the post data
function showUpdateForm(id, title, content) {
    document.getElementById('updateId').value = id;
    document.getElementById('updateTitle').value = title;
    document.getElementById('updateContent').value = content;
    document.getElementById('updateForm').classList.remove('hidden');
}

// Function to delete a post
function deletePost(id) {
    fetch(`http://127.0.0.1:8000/api/posts/${id}/`, {
        method: 'DELETE'
    })
    .then(() => {
        location.reload(); // Reload the page to reflect the deletion
    });
}
