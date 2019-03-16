$(document).ready(() => {
    $('#createAccount').click(function (event) {
        event.preventDefault();
        userDetails = {
            username: $('#createUsername').val(),
            password: $('#createPassword').val(),
        }
        $.post("/createUser", userDetails)
            .then(function (data) {
                $('#badPass').css('display', 'none');
                $('#userExists').css('display', 'none');

                if ('userExists' in data) {
                    $('#userExists').css('display', 'block');
                    clearCA('both');
                } else if ('invalidPass' in data) {
                    $('#badPass').css('display', 'block');
                    clearCA('pass');
                } else {
                    clearCA('both')
                    $('#badUser').css('display', 'none');
                    $('#loginModal').modal('hide');
                    $('#userCreated').css('display', 'block');
                };
            });
    });

    function clearCA(job) {
        switch (job) {
            case 'both':
                $('#createUsername').val('');
            case 'pass':
                $('#createPassword').val('');
        };
    };

    
})