$(document).ready(function () {
    $("#changeBtn").click(function () {
        changepass();
    });
    $("#password").keyup(function () {
        if ($(this).val().length != "") {
            $(".error").fadeOut();
            return false;
        }
    });
    $("#password2").keyup(function () {
        if ($(this).val().length != "") {
            $(".error").fadeOut();
            return false;
        }
    });
});

function changepass() {
    var password = $("#password").val();
    var password2 = $("#password2").val();
    var value = false;

    if (password == '') {
        $("#password").after('<span class="error">Introduzca un password</span>');
        value = false;
    } else if (password2 == '') {
        $("#password2").after('<span class="error">Por favor vuelve a introducir el password</span>');
        value = false;
    } else if (password != password2) {
        $("#password2").after('<span class="error">Las passwords no coiciden</span>');
        value = false;
    } else if (password === password2) {
        value = true;
        var token = window.location.href;
        token = token.split("/");

        var data = {"password": password, "token": token[7]};
        var change_JSON = JSON.stringify(data);
            $.post(amigable("?module=users&function=update_pass"), {passw: change_JSON},
            function (response) {
                if (response.success) {
                    window.location.href = response.redirect;
                }
            }, "json").fail(function (xhr, textStatus, errorThrown) {
                //console.log(xhr);
                //console.log(xhr.responseJSON);
                //console.log(xhr.responseText);
                if( (xhr.responseJSON === undefined) || (xhr.responseJSON === null) )
                    xhr.responseJSON = JSON.parse(xhr.responseText);
                if (xhr.status === 0) {
                    alert('Not connect: Verify Network.');
                } else if (xhr.status === 404) {
                    alert('Requested page not found [404]');
                } else if (xhr.status === 500) {
                    alert('Internal Server Error [500].');
                } else if (textStatus === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (textStatus === 'timeout') {
                    alert('Time out error.');
                } else if (textStatus === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error: ' + xhr.responseText);
                }
            });
    }
}