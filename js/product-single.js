const url_string = window.location.href;
const url = new URL(url_string);
const id = url.searchParams.get('id');

$(() => {
  search(id)
    .then(result => {
      $('#title').html(result.volumeInfo.title);
      $('#bookImage').attr('src', result.volumeInfo.imageLinks.extraLarge || result.volumeInfo.imageLinks.thumbnail);
      $('#description').html(result.volumeInfo.description);
    }).catch(error => {
      showErrorMessage(error.responseJSON.message);
    });

    $('#addCart').click((event) => {
      if(isLoggedIn()){
        const product_id = id;
        const quantity = 1;
        const newItem = {
          product_id,
          quantity
        }
        addToCart(newItem)
          .then(result => {
            console.log('hello');
          }).catch(error => {
            showErrorMessage(result.responseJSON.message);
          })
      } else {
        showErrorMessage('You must be logged in to do that');
      }
    });
});

function search(searchId){
  return $.get(searchURL + '/' + searchId);
}

function addToCart(item){
  console.log(`${CART_URL}/${localStorage.user_id}/cart`);
  return $.post(`${CART_URL}/${localStorage.user_id}/cart`, item);
}