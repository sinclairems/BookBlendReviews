// Find the book title and author of the page the link was clicked on
window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const author = urlParams.get('author');
    if (title && author) {
        document.querySelector('#title').value = title;
        document.querySelector('#author').value = author;
    }
};

const postHandler = async (e) => {
    e.preventDefault();
    // Get the values from the form
    const title = document.querySelector('#title').value.trim();
    const author = document.querySelector('#author').value.trim();
    const content = document.querySelector('#review').value.trim();
    console.log(title, author, content);

    // Get the book id from the URL
    const path = window.location.pathname;
    const parts = path.split('/');
    const book_id = Number(parts[parts.length - 1]);
    console.log(book_id);

    // If the URL doesn't have a book id, find the book by title and author
    if (isNaN(book_id)) {
        if (title && author && content) {
            // Find the book by title and author and return the book id
            const response = await fetch(`/api/reviews/findBook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author }),
            });
            if (response.ok) {
                const data = await response.json();
                const bookId = data.bookId;
                console.log(bookId);
                // Post the review with the book id
                const reviewResponse = await fetch(`/api/reviews/${bookId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ book_id: bookId, content }),
                });
                if (reviewResponse.ok) {
                    // Redirect to the book page
                    document.location.replace(`/book/${bookId}`);
                    console.log('Review posted');
                } else {
                    alert('Failed to post review');
                }
            } else {
                alert('Failed to find book');
            }
        } else {
            alert('Failed to post review');
        }
    } else {
        // If the URL has a book id, post the review with the book id
        if (title && author && content) {
            const reviewResponse = await fetch(`/api/reviews/${book_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ book_id, content }),
            });
        } else {
            alert('Failed to post review');
        }
    }
}

document.querySelector('#submit-review').addEventListener('click', postHandler);