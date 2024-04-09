const prevBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');
const path = window.location.pathname;
const parts = path.split('/');
let book_id = Number(parts[parts.length - 1]);

const next = async () => {
    const dataLength = await fetch(`/api/books/length`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const length = await dataLength.json();

    if (book_id === length) {
        document.location.replace(`/book/1`);
    } else {
        book_id = book_id + 1;
        document.location.replace(`/book/${book_id}`)
    };
};

nextBtn.addEventListener('click', next);

const previous = async () => {
    const dataLength = await fetch(`/api/books/length`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const length = await dataLength.json();

    if (book_id === 1) {
        document.location.replace(`/book/${length}`);
    } else {
        book_id = book_id - 1;
        document.location.replace(`/book/${book_id}`);
    };
};

prevBtn.addEventListener('click', previous);