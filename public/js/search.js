document.querySelector('#search-input').addEventListener('keyup', function(e) {
    let search = e.target.value.toLowerCase();

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
        let output = '<h2>Search Results</h2>';

        if (data.length === 0) {
            output += '<p>No results found</p>';
        } else {
            data.slice(0,10).forEach(function(book) {
                output += `
                    <div class="card card-body mb-2">
                        <h4>${book.title}</h4>
                        <h4>${book.author}</h4>
                    </div>
                `;
            });
        }
        document.querySelector('#search-results').innerHTML = output;
    })
    .catch(err => console.log(err));
});