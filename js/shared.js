const API_URL = getHostURL();
const AUTH_URL = `${API_URL}/auth`;
const CART_URL = `${API_URL}/user`;
const scrapeMultiURL = `${API_URL}/search`;
// $.ajaxSetup({
//   crossDomain: true,
//   xhrFields: {
//     withCredentials: true
//   }
// });

$(() => {
  if(isLoggedIn()) {
    showLogout();
    hideLogin();
    updateCart();
  } else {
    hideCart();
  }
});

function updateCart(){
  $.ajax({
    type: 'GET',
    url: `${CART_URL}/${localStorage.user_id}/cart`,
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  }).then(result => {
    if(result.length > 0){
      $('#quantity').text(result.length);
    }else{
      $('#quantity').hide();
    }
  }).catch(error => {
    console.log(error.responseJSON.message);
  });
}

function getHostURL() {
  if (window.location.host.indexOf('localhost') != -1) {
    return 'http://localhost:3000';
  } else {
    return 'https://bookstore-users-api.herokuapp.com';
  }
}

function getUserFromForm() {
  const email = $('#email').val();
  const password = $('#password').val();

  const user = {
    email,
    password
  };

  return user
}

function showErrorMessage(message) {
  const $errorMessage = $('#errorMessage');
  $errorMessage.text(message);
  $errorMessage.show().delay(5000).fadeOut();
}

function showSuccessMessage(message) {
  const $successMessage = $('#successMessage');
  $successMessage.text(message);
  $successMessage.show().delay(5000).fadeOut();
}

function setIdRedirect(result) {
  localStorage.user_id = result.id;
  window.location = `/user.html?id=${result.user_id}`;
}

function redirectIfLoggedIn() {
  if(localStorage.user_id != undefined) {
    window.location = '/index.html';
  }
  return true;
}

function showLogout() {
  $('#logout').show();
}

function hideLogin() {
  $('#login').hide();
}

function hideCart() {
  $('#userCart').hide();
}
function isLoggedIn() {
  if(localStorage.user_id) {
    return true;
  }else{
    return false;
  }
}

function logout() {
  localStorage.removeItem('user_id');
  $.get(`${AUTH_URL}/logout`)
    .then(result => {
      window.location = '/index.html';
    });
}