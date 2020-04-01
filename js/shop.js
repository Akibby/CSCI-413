$.ajaxSetup({
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  }
});

$(() => {
  $('#searchForm').submit((event) => {
    event.preventDefault();
    const query = $('#searchInput').val();
    if(query != '') {
      $('#resultArea').empty();
      search(query)
        .then(result => {
          console.log(result);
          for(let i = 0; i < result.length; i++){
            $('#resultArea').append(`<div class="col-lg-3 col-md-6">
                                        <div class="item">
                                          <img src="${result[i].image}" alt="img">
                                          <h3>${result[i].title}</h3>
                                          <h6><a href="/product-single.html?id=${result[i].id}">Buy Now</a></h6>
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
  return $.get(scrapeMultiURL + '/' + encodeURI(query));
}