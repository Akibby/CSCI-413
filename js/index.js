const url_string = window.location.href;
const url = new URL(url_string);
const q = url.searchParams.get('q');

$(() => {
  getRecommended()
    .then(results => {
      const recommended = results.slice(0, 5);
      console.log(recommended);
      for(let i = 0; i < recommended.length; i++){
        $('#recommended').append(
          `<div class="col-lg-2 col-md-3 col-sm-4">
            <div class="item">
              <img src="${recommended[i].image_url}" alt="img">
              <h3><a href="/product-single.html?id=${recommended[i].isbn}">${recommended[i].title}</a></h3>
              <h6><span class="price">$${recommended[i].price}</span> / <a href="/product-single.html?id=${recommended[i].isbn}">Buy Now</a></h6>
            </div>
          </div>`);
      }
    }).catch(error => {
        showErrorMessage('Error Retrieving Recommended Books');
      });
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const keys = urlParams.keys();
      console.log(q);
  if(isLoggedIn() && q === 'thankyou'){
    showSuccessMessage('Thank you for your purchase!');
  }
});

function getRecommended(){
  return $.get(scrapeMultiURL);
}