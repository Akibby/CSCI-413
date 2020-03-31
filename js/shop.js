const searchURL = 'https://www.googleapis.com/books/v1/volumes?q=';

$(() => {
  $('#searchForm').submit((event) => {
    event.preventDefault();
    const query = $('#searchInput').val();
    if(query != '') {
      $('#resultArea').empty();
      search(query)
        .then(result => {
          const items = result.items
          console.log(items);
          for(let i = 0; i < items.length; i++){
            $('#resultArea').append(`<div class="col-lg-3 col-md-6">
                                        <div class="item">
                                          <img src="${items[i].volumeInfo.imageLinks.thumbnail}" alt="img">
                                          <h3>Digatil Fundamentals</h3>
                                          <h6><span class="price">$204</span> / <a href="#">Buy Now</a></h6>
                                        </div>
                                      </div>`)
          }
        }).catch(error => {
          showErrorMessage('No search results');
        });
    } else {
      showErrorMessage('Please specify search terms')
    }
  });
});

function search(query){
  return $.get(searchURL + encodeURI(query));
}