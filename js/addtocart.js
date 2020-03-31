$.ajaxSetup({
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  }
});

$(() => {
  if(isLoggedIn()){
    getCart(localStorage.user_id)
      .then(result => {
        let priceTotal = 0;
        for(let i = 0; i < result.length; i++){
          $('#cartResults').append(`
            <div id="itemdiv-${result[i].product_id}" class="col-lg-2 col-md-3 col-sm-4">
              <div class="item">
                <img src="${result[i].image_url}" alt="img">
                <h3><a href="/product-single.html?id=${result[i].product_id}">${result[i].title}</a></>
                <h6><span class="price">$${result[i].quantity}</span> / <a class="removebtn" id="${result[i].product_id}">Remove item</a></h6>
              </div>
            </div>`);
          priceTotal += parseFloat(result[i].quantity);
          $('#totalPrice').text(`$${priceTotal}`);
          $('.removebtn').click(function() {
            const id = this.id;
            deleteItem(id, localStorage.user_id)
              .then(result => {
                console.log(result);
              }).catch(error => {
                showErrorMessage(error.reponseJSON.message);
              });
            $(`#itemdiv-${id}`).delay(1000).fadeOut();
            showSuccessMessage('Item deleted');
            $('#totalPrice').text(`$${$('#totalPrice').text().replace('$', '') - parseFloat(result[i].quantity)}`);
          });
        }
        console.log(result);
      }).catch(error => {
        showErrorMessage(error.reponseJSON.message)
      });
  } else {
    window.location = '/index.html';
  }

 


});

function getCart(id){
  return $.get(`${CART_URL}/${id}/cart`);
}

function deleteItem(itemid, id){
  return $.ajax({
    url: `${CART_URL}/${id}/cart/${itemid}`,
    type: 'DELETE'
  });
}