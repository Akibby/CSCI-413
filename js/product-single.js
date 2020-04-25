const url_string = window.location.href;
const url = new URL(url_string);
const id = url.searchParams.get('id');

$(() => {
  search(id)
    .then(result => {
      console.log(result);
      const image_url = result.image_url;
      const title = result.title;
      const quantity = parseFloat(result.price).toFixed(2);
      const product_id = result.isbn;
      const description = result.description;
      $('#title').html(title);
      $('#bookImage').attr('src', image_url);
      $('#description').html(description);
      $('#price').text(`$${quantity}`);
      $('#author').text(result.author);
      $('#publisher').text(capitalizeFirst(result.publisher));
      $('#edition').text(result.edition);
      $('#addCart').click((event) => {
        if(isLoggedIn()){
          $.ajaxSetup({
            crossDomain: true,
            xhrFields: {
              withCredentials: true
            }
          });
          const newItem = {
            product_id,
            quantity,
            image_url,
            title
          }
          console.log(newItem);
          addToCart(newItem)
            .then(result => {
              updateCart();
              showSuccessMessage('Item added to cart');
            }).catch(error => {
              showErrorMessage(error.responseJSON.message);
            });
        }else{
          showErrorMessage('You must be logged in to do that');
        }
      });
    }).catch(error => {
      showErrorMessage(error.responseJSON.message);
    });

    getRecommended()
    .then(results => {
      const recommended = results.slice(0, 5);
      console.log(recommended);
      for(let i = 0; i < recommended.length; i++){
        $('#recommended').append(
          `<div class="col-lg-2 col-md-3 col-sm-4">
            <div class="item">
              <img src="${recommended[i].image_url}" alt="img">
              <h3><a href="#">${recommended[i].title}</a></h3>
              <h6><span class="price">$${recommended[i].price}</span> / <a href="/product-single.html?id=${recommended[i].isbn}">Buy Now</a></h6>
            </div>
          </div>`);
      }
    }).catch(error => {
        showErrorMessage('Error Retrieving Recommended Books');
      });
});

function search(searchId) {
  return $.get(scrapeMultiURL + '/book/' + searchId);
}

function addToCart(item) {
  console.log(`${CART_URL}/${localStorage.user_id}/cart`);
  return $.post(`${CART_URL}/${localStorage.user_id}/cart`, item);
}

function capitalizeFirst(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRecommended(){
  return $.get(scrapeMultiURL);
}