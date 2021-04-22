window.addEventListener("load",function(e){
    //variable que contiene los datos del FORM en el DOM dependiendo en que pantalla estemos
    let form = selectForm();
    //console.log(form);

 //*****************para validar en pantalla de login***********************
    if(form != null && form !="" && document.getElementById("formLoginUser") != null){
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;//expresion regular para validar mail
        let input_name_user = document.querySelector("#email");//referencia al input de user mail
        let faceValidationMail = document.querySelector('#check_name_front_login');//referencia carita check de user mail
        let validation_user_mail = false;
        let input_name_password = document.querySelector("#password");//referencia al input de user password
        let faceValidationPassword = document.querySelector('#check_name_front_password');//referencia carita check de user password
        let validation_user_password = false;

        //********Validaciones para el submit de LOGIN*************/
        form.addEventListener('submit', function(e){                       
            if(validation_user_mail && validation_user_password){
                console.log('las validaciones fueron correctas');
            }else{
                e.preventDefault();
            }
        });
        
//validamos el mail
        //muestra carita en el input seleccionado por primera vez
        input_name_user.addEventListener('focus', function(){
            faceValidationMail.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que caracteres ingresa
        input_name_user.addEventListener('input', function (){
            if(input_name_user.value.match(mailformat)){
                faceValidationMail.classList.remove('fa-meh-rolling-eyes');
                faceValidationMail.classList.add('fa-smile-beam');
                faceValidationMail.style.color = 'green'
                validation_user_mail = true;
            }else{
                faceValidationMail.classList.remove('fa-smile-beam');
                faceValidationMail.classList.add('fa-meh-rolling-eyes');
                faceValidationMail.style.color = 'white'
                validation_user_mail = false;
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si es o no correcto los campos ingresados.
        input_name_user.addEventListener('blur', function(){
            //muestra carita en el input seleccionado
            if(!input_name_user.value.match(mailformat)){
                faceValidationMail.classList.remove('fa-meh-rolling-eyes');
                faceValidationMail.classList.add('fa-frown-open');
                faceValidationMail.style.color = 'red'
                validation_user_mail = false;
            }else{
                validation_user_mail = true;
            }
        });

//validamos el password
        //muestra carita en el input seleccionado por primera vez
        input_name_password.addEventListener('focus', function(){
            faceValidationPassword.classList.add('fa-meh-rolling-eyes');
        });

        //valida que carita mostrar dependiendo de que tenga mas de 4 caracteres para que funcione
        input_name_password.addEventListener('input', function (){
            if(input_name_password.value.length > 4){
                faceValidationPassword.classList.remove('fa-meh-rolling-eyes');
                faceValidationPassword.classList.add('fa-smile-beam');
                faceValidationPassword.style.color = 'green'
                validation_user_password = true;
            }else{
                faceValidationPassword.classList.remove('fa-smile-beam');
                faceValidationPassword.classList.add('fa-meh-rolling-eyes');
                faceValidationPassword.style.color = 'white'
                validation_user_password = false;
            }
        });

        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_name_password.addEventListener('blur', function(){
            if(input_name_password.value.length < 5){
                faceValidationPassword.classList.remove('fa-meh-rolling-eyes');
                faceValidationPassword.classList.add('fa-frown-open');
                faceValidationPassword.style.color = 'red'
                validation_user_password = false;
            }else{
                validation_user_password = true;
            }
        })
    }
    
});

function selectForm(){
    let tempForm = '';
    //Si estamos en la pantalla de LOGIN USER
    if(document.getElementById("formLoginUser") != null) {
        tempForm = document.querySelector("#formLoginUser");
    }
    //Si estamos en la pantalla de REGISTER USER
    if(document.getElementById("formRegisterUSer") != null) {
        tempForm = document.querySelector("#formRegisterUSer");
    }
    //Si estamos en la pantalla de EDIT USER
    if(document.getElementById("formEditUser") != null) {
        tempForm = document.querySelector("#formEditUser");
    }
    //Si estamos en la pantalla de CREATE PRODUCT
    if(document.getElementById("formCreateProduct") != null) {
        tempForm = document.querySelector("#formCreateProduct");
    }
    //Si estamos en la pantalla de EDIT PRODUCT
    if(document.getElementById("formEditProduct") != null) {
        tempForm = document.querySelector("#formEditProduct");
    }
    return tempForm;
}


/*
<i class="far fa-smile-beam"></i>
<i class="far fa-meh-rolling-eyes"></i>
<i class="far fa-frown-open"></i>
*/