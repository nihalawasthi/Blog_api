document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('postForm');

    // Handle form submission to create a new post
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(postForm);
        const postData = {
            title: formData.get('title'),
            content: formData.get('content')
        };

        fetch('http://127.0.0.1:8000/api/posts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(post => {
            alert('Post created successfully!');
            postForm.reset();
        });
    });
});
