document.querySelector('#search-input').addEventListener('keyup', function(e) {
    e.preventDefault();

    let search = document.querySelector('#search-input').value.toLowerCase();

    if (search.length < 1) {
        document.querySelector('#search-results').innerHTML = '';
        return;
    }

    fetch('/api/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({search: search})
    })
    .then(res => res.json())
    .then(data => {
        let output = '<div class="search-container"><h2>Search Results</h2>';

        if (data.length === 0) {
            output += '<p>No results found</p>';
        } else {
            data.slice(0,10).forEach(function(book) {
                let authorUrl = `/author/${book.item.author.toLowerCase().replace(/ /g, '-')}`;
                output += `
                        <div class="search-card">
                            <a href="/book/${book.item.id}">
                                <h4>${book.item.title}</h4>
                                <h4><a href="${authorUrl}" onclick="event.stopPropagation();">${book.item.author}</a></h4>
                            </a>
                        </div>
                `;
            });
        }

        output += '</div>';
        
        document.querySelector('#search-results').innerHTML = output;
    })
    .catch(err => console.log(err));
});

document.querySelector('#search-submit').addEventListener('click', function(e) {

    let search = document.querySelector('#search-input').value.toLowerCase();

});

// const searchInput = document.getElementById("search-input");
// searchInput.addEventListener("input", (event) => {
//     const searchQuery = event.target.value;
//     searchBooks(searchQuery);
// });