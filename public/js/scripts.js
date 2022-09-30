//jquery functions


//** functionality for register/login/newsletter modals */
$(document).ready(function() {

    $('#newsletterBtn').click(function() {
        $('#newsletterModal').modal('show');
    });

    $('#registerBtn').click(function() {
        $('#registerModal').modal('show');
    })

    $('#loginBtn').click(function() {
        $('#loginModal').modal('show');
    })
});