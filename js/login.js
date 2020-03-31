redirectIfLoggedIn();

$(() => {
  $('#loginForm').submit((event) => {
    event.preventDefault();
    const user = getUserFromForm();

    login(user)
      .then(result => {
        localStorage.user_id = result.id;
        window.location = '/index.html'
      }).catch(error => {
        console.error(error);
        showErrorMessage(error.responseJSON.message);
      });
  });
});

function login(user) {
  return $.post(`${AUTH_URL}/login`, user)
}