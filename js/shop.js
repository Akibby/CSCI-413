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
    $('#result-title').show();
    if (query != '') {
      $('#resultArea').empty();
      search(query)
        .then(result => {
          console.log(result);
          for (let i = 0; i < result.length; i++) {
            $('#resultArea').append(`<div class="col-lg-3 col-md-6">
                                        <div class="item">
                                          <img src="${result[i].image_url}" alt="img">
                                          <h3>${result[i].title}</h3>
                                          <h6><a href="/product-single.html?id=${result[i].isbn}">Buy Now</a></h6>
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
  getRecentlyAdded()
    .then(result => {
      console.log(result);
      const recentlyAdded = result.slice(4, 9);
      for (let i = 0; i < recentlyAdded.length; i++) {
        $('#recent-books').append(
          `<div class="col-md-3">
            <div class="item">
              <img src="${recentlyAdded[i].image_url}" alt="img">
              <h8><a href="/product-single.html?id=${recentlyAdded[i].isbn}">${recentlyAdded[i].title}</a></h8>
              <h3><a href="/product-single.html?id=${recentlyAdded[i].isbn}">ISBN: ${recentlyAdded[i].isbn}</a></h3>
              <h6><span class="price">$${recentlyAdded[i].price}</span> / <a href="/product-single.html?id=${recentlyAdded[i].isbn}">Buy Now</a></h6>
            </div>
          </div>`);
      }
    }).catch(error => {
      showErrorMessage(error);
    })

  getCategories()
    .then(result => {
      for (let i = 0; i < result.length; i++) {
        $('#categoryArea').append(`<div class="col-lg-3 col-md-6">
                                        <a class="category" href="#"><h3>#${result[i].category}</h3></a>
                                      </div>`)
      }
    }).catch(error => {
      showErrorMessage(error);
    })

  $(document.body).on('click', '.category', (event) => {
    event.preventDefault();
    $('#resultArea').empty();
    const category = $(event.target).text().replace('#', '');
    searchByCategory(category)
      .then(result => {
        for (let i = 0; i < result.length; i++) {
          $('#resultArea').append(`<div class="col-lg-3 col-md-6">
                                      <div class="item">
                                        <img src="${result[i].image_url}" alt="img">
                                        <h3>${result[i].title}</h3>
                                        <h6><a href="/product-single.html?id=${result[i].isbn}">Buy Now</a></h6>
                                      </div>
                                    </div>`)
        }
      }).catch(error => {
        showErrorMessage(error);
      })
  });
});

function search(query) {
  return $.get(scrapeMultiURL + '/' + encodeURI(query));
}

function getCategories() {
  return $.get(API_URL + '/category');
}

function getRecentlyAdded() {
  return $.get(scrapeMultiURL);
}

function searchByCategory(category) {
  return $.get(API_URL + '/category/' + category);
}