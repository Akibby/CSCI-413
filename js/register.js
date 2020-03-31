redirectIfLoggedIn();

$.ajaxSetup({
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  }
});

$(() => {
  $('#registerForm').submit((event) => {
    event.preventDefault();
    if($('#password').val() == $('#passwordCopy').val()) {
      const user = getUserFromForm();
      register(user)
        .then(result => {
          localStorage.user_id = result.id;
          window.location = '/index.html'
        }).catch(error => {
          console.log(error);
          showErrorMessage(error.responseJSON.message);
        });
    } else {
      showErrorMessage('Passwords Do Not Match')
    }
  });
});

function register(user) {
  return $.post(`${AUTH_URL}/signup`, user)
}