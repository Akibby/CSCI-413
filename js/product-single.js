const url_string = window.location.href;
const url = new URL(url_string);
const id = url.searchParams.get('id');

$(() => {
  search(id)
    .then(result => {
      console.log(result);
      const image_url = result.image;
      const title = result.title;
      const quantity = parseFloat(result.price).toFixed(2);
      const product_id = result.id;
      const description = result.description;
      $('#title').html(title);
      $('#bookImage').attr('src', image_url);
      $('#description').html(description);
      if (result.available) {
        $('#price').text(quantity);
      } else {
        $('#price').text('Price not found');
        $('#addCart').prop('disabled', true);
      }
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
});

function search(searchId) {
  return $.get(scrapeMultiURL + '/book/' + searchId);
}

function addToCart(item) {
  console.log(`${CART_URL}/${localStorage.user_id}/cart`);
  return $.post(`${CART_URL}/${localStorage.user_id}/cart`, item);
}