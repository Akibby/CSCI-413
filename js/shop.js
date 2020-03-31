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
                                          <h3>${items[i].volumeInfo.title}</h3>
                                          <h6><span class="price">$204</span> / <a href="/product-single.html?id=${items[i].id}">Buy Now</a></h6>
                                        </div>
                                      </div>`)
          }
        }).catch(error => {
          console.log('No search results');
        });
    } else {
      showErrorMessage('Please specify search terms')
    }
  });
});

function search(query){
  return $.get(searchURL + '?q=' + encodeURI(query));
}