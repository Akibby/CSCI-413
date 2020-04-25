$.ajaxSetup({
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  }
});

$(() => {
  if (isLoggedIn()) {
    getCart(localStorage.user_id)
      .then(result => {
        if (result.length == 0) {
          window.location = 'addtocart.html';
        } else {
          $('#cartQuantity').text(result.length);
          let priceTotal = 0;
          for (let i = 0; i < result.length; i++) {
            $('#cartItems').append(`<p><a href="/product-single.html?id=${result[i].product_id}">${result[i].title}</a> <span class="price">$${result[i].quantity}</span></p>`)
            priceTotal += parseFloat(result[i].quantity);
          }
          $('#totalPrice').text(`$${priceTotal.toFixed(2)}`);
          console.log(result);
        }
      }).catch(error => {
        showErrorMessage(error.reponseJSON.message)
      });
    // document.getElementById('ccnum').setCustomValidity("Please input a valid credit card number.");
    $('#checkoutForm').submit((event) => {
      event.preventDefault();
      const cnumerror = document.getElementById('ccnum');
      const cnum = $('#ccnum').val();
      const strippedCnum = cnum.trim().replace(/[^\d]/g, '');
      const creditNames = ['Visa',
        'MasterCard',
        'DinersClub',
        'CarteBlanche',
        'AmEx Discover',
        'JCB',
        'enRoute',
        'Solo',
        'Switch',
        'Maestro',
        'VisaElectron',
        'LaserCard'
      ];
      let validCard = [];
      creditNames.forEach((card) => {
        validCard.push(checkCreditCard(strippedCnum, card))
      });
      console.log(validCard);
      if(validCard.indexOf(true) == -1){
        cnumerror.setCustomValidity("Please input a valid card number.")
      }else{
        deleteCart(localStorage.user_id)
          .then(result => {
            window.location = '/index.html?q=thankyou'
          }).catch(err => {
            showErrorMessage(err);
          });
      }
    });
  } else {
    window.location = '/index.html';
  }




});

function getCart(id) {
  return $.get(`${CART_URL}/${id}/cart`);
}

function deleteItem(itemid, id) {
  return $.ajax({
    url: `${CART_URL}/${id}/cart/${itemid}`,
    type: 'DELETE'
  });
}

function deleteCart(id) {
  return $.ajax({
    url: `${CART_URL}/${id}/cart`,
    type: 'DELETE'
  });
}