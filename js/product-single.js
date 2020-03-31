const url_string = window.location.href;
const url = new URL(url_string);
const id = url.searchParams.get('id');

$(() => {
  search(id)
    .then(result => {
      const imageSrc = result.volumeInfo.imageLinks.extraLarge || result.volumeInfo.imageLinks.thumbnail;
      const bookTitle = result.volumeInfo.title;
      console.log(result);
      $('#title').html(result.volumeInfo.title);
      $('#bookImage').attr('src', result.volumeInfo.imageLinks.extraLarge || result.volumeInfo.imageLinks.thumbnail);
      $('#description').html(result.volumeInfo.description);
      if (result.volumeInfo.industryIdentifiers) {
        const ISBN = result.volumeInfo.industryIdentifiers[0].identifier;
        const corsURL = `https://cors-anywhere.herokuapp.com/abebooks.com/servlet/SearchResults?cm_sp=sort-_-SRP-_-Results&ds=20&kn=${ISBN}&sortby=1`;
        $.get(corsURL)
          .then(result => {
            console.log(ISBN);
            $('#hidden').append($.parseHTML(result));
            if ($('#hidden #main .row .m-z-b').text() == 'No results') {
              $('#price').text('Price not found');
              $('#addCart').prop('disabled', true);
              $('#hidden').remove();
            } else {
              const unparsedPrice = $('#hidden').html($('#hidden #book-1 .result-data #srp-item-price-1')).text().replace(' ', '');
              const price = unparsedPrice.substr(unparsedPrice.indexOf('$') + 1).replace(',', '');
              $('#price').text(price);
              $('#hidden').remove();
              $('#addCart').click((event) => {
                if (isLoggedIn()) {
                  $.ajaxSetup({
                    crossDomain: true,
                    xhrFields: {
                      withCredentials: true
                    }
                  });
                  const product_id = id;
                  const quantity = price;
                  const image_url = imageSrc;
                  const title = bookTitle;
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
                } else {
                  showErrorMessage('You must be logged in to do that');
                }
              });
            }
          });
      } else {
        $('#price').text('Price not found');
        $('#addCart').prop('disabled', true);
      }
    }).catch(error => {
      showErrorMessage(error.responseJSON.message);
    });
});

function search(searchId) {
  return $.get(searchURL + '/' + searchId);
}

function addToCart(item) {
  console.log(`${CART_URL}/${localStorage.user_id}/cart`);
  return $.post(`${CART_URL}/${localStorage.user_id}/cart`, item);
}