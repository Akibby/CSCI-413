const API_URL = getHostURL();
const AUTH_URL = `${API_URL}/auth`;
const CART_URL = `${API_URL}/user`;
const searchURL = 'https://www.googleapis.com/books/v1/volumes';

$(() => {
  if(isLoggedIn()) {
    showLogout();
    hideLogin();
  } else {
    hideCart();
  }
});

function getHostURL() {
  if (window.location.host.indexOf('localhost') != -1) {
    return 'http://localhost:3000';
  } else {
    return 'https://sticker-mania.herokuapp.com';
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