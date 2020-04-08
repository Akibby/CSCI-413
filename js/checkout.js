$.ajaxSetup({
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  }
});

$(() => {
  if (isLoggedIn()) {
    console.log(localStorage.user_id);
    getCart(localStorage.user_id)
      .then(result => {
        if (result.length == 0) {
          window.location = 'addtocart.html';
        } else {
          $('#cartQuantity').text(result.length);
          let priceTotal = 0;
          for (let i = 0; i < result.length; i++) {
            // $('#cartItems').append(`
            //   <div id="itemdiv-${result[i].product_id}" class="col-lg-2 col-md-3 col-sm-4">
            //     <div class="item">
            //       <img src="${result[i].image_url}" alt="img">
            //       <h3><a href="/product-single.html?id=${result[i].product_id}">${result[i].title}</a></>
            //       <h6><span class="price">$${result[i].quantity}</span> / <a class="removebtn" id="${result[i].product_id}" price="${result[i].quantity}">Remove item</a></h6>
            //     </div>
            //   </div>`);
            $('#cartItems').append(`<p><a href="/product-single.html?id=${result[i].product_id}">${result[i].title}</a> <span class="price">$${result[i].quantity}</span></p>`)
            priceTotal += parseFloat(result[i].quantity);
          }
          $('#totalPrice').text(`$${priceTotal.toFixed(2)}`);
          console.log(result);
        }
      }).catch(error => {
        showErrorMessage(error.reponseJSON.message)
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