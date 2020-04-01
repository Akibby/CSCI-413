redirectIfLoggedIn();

$(() => {
  $.ajaxSetup({
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  });
  $('#loginForm').submit((event) => {
    event.preventDefault();
    const user = getUserFromForm();
    console.log(user);
    login(user)
      .then(result => {
        if (result.id) {
          localStorage.user_id = result.id;
          console.log(result);
          window.location = '/index.html'
        } else {
          showErrorMessage('Bad Response From Server')
        }

      }).catch(error => {
        console.error(error);
        showErrorMessage(error.responseJSON.message);
      });
  });
});

function login(user) {
  return $.post(`${AUTH_URL}/login`, user)
}