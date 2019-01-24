$(function(){
  $('#formulario').submit(function check_login(event){
    event.preventDefault();

    let form_data = new FormData();
    form_data.append('username', $('#user').val())
    form_data.append('password', $('#password').val())

    $.ajax({
      url: '../server/check_login.php',
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      data: form_data,
      type: 'POST',
      success: function(php_response){
        if (php_response.conexion == "OK"){
          if(php_response.query == "OK"){
            window.location.href = 'main.html';
          }
          else{
            alert("El usuario o contraseña no son válidos");
          }
        }
        else{
          alert("error: " + php_response.conexion);
        }
/*
          if (php_response.conexion == "OK" || php_response.query == "OK") {
          //window.location.href = 'main.html';
          //alert(php_response.conexion);
          alert(php_response.query + ' ' + php_response.conexion);

        }else {
          alert("error: ".php_response.conexion);
        }*/
      },
      error: function(){
        alert("error en la comunicación con el servidor. index.js");
      }
    })

  })
})


/*
$(function(){
  var l = new Login();
})


class Login {
  constructor() {
    this.submitEvent()
  }

  submitEvent(){
    $('form').submit((event)=>{
      event.preventDefault()
      this.sendForm()
    })
  }

  sendForm(){
    let form_data = new FormData();
    form_data.append('username', $('#user').val())
    form_data.append('password', $('#password').val())
    $.ajax({
      url: '../server/check_login.php',
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      data: form_data,
      type: 'POST',
      success: function(php_response){
        if (php_response.msg == "OK") {
          window.location.href = 'main.html';
        }else {
          alert(php_response.msg);
        }
      },
      error: function(){
        alert("error en la comunicación con el servidor");
      }
    })
  }
}
*/