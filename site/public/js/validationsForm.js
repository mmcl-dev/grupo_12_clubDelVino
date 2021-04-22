window.addEventListener("load",function(e){
    //variable que contiene los datos del FORM en el DOM dependiendo en que pantalla estemos
    let form = selectForm();
    //console.log(form);

    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;//expresion regular para validar mail
//*****************para validar en pantalla de login***********************
    if(form != null && form !="" && document.getElementById("formLoginUser") != null){

        let input_login_user_mail = document.querySelector("#email");//referencia al input de user mail
        let check_face_validation_login_user_mail = document.querySelector('#check_face_validation_login_user_mail');//referencia carita check de user mail
        let validation_login_user_mail = false;
        let input_login_user_password = document.querySelector("#password");//referencia al input de user password
        let check_face_validation_login_user_password = document.querySelector('#check_face_validation_login_user_password');//referencia carita check de user password
        let validation_login_user_password = false;
        let button_submit_login_form = document.querySelector("#button_submit_login_form");

        //********Validaciones para el submit de LOGIN*************/
        form.addEventListener('submit', function(e){                       
            if(validation_login_user_mail && validation_login_user_password){
                console.log('las validaciones fueron correctas');
            }else{
                e.preventDefault();
            }
        });
        
//validamos el mail
        //muestra carita en el input seleccionado por primera vez
        input_login_user_mail.addEventListener('focus', function(){
            check_face_validation_login_user_mail.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que caracteres ingresa
        input_login_user_mail.addEventListener('input', function (){
            if(input_login_user_mail.value.match(mailformat)){
                check_face_validation_login_user_mail.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_login_user_mail.classList.add('fa-smile-beam');
                check_face_validation_login_user_mail.style.color = 'green'
                validation_login_user_mail = true;

                if(validation_login_user_mail && validation_login_user_password){
                    button_submit_login_form.style.background = '#B0976D';
                }else{
                    button_submit_login_form.style.background = 'gray';
                }
            }else{
                check_face_validation_login_user_mail.classList.remove('fa-smile-beam');
                check_face_validation_login_user_mail.classList.add('fa-meh-rolling-eyes');
                check_face_validation_login_user_mail.style.color = 'white'
                validation_login_user_mail = false;
                button_submit_login_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si es o no correcto los campos ingresados.
        input_login_user_mail.addEventListener('blur', function(){
            //muestra carita en el input seleccionado
            if(!input_login_user_mail.value.match(mailformat)){
                check_face_validation_login_user_mail.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_login_user_mail.classList.add('fa-frown-open');
                check_face_validation_login_user_mail.style.color = 'red'
                validation_login_user_mail = false;
                button_submit_login_form.style.background = 'gray';
            }else{
                validation_login_user_mail = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_login_user_mail && validation_login_user_password){
                button_submit_login_form.style.background = '#B0976D';
            }else{
                button_submit_login_form.style.background = 'gray';
            }
        });

//validamos el password
        //muestra carita en el input seleccionado por primera vez
        input_login_user_password.addEventListener('focus', function(){
            check_face_validation_login_user_password.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 4 caracteres para que funcione
        input_login_user_password.addEventListener('input', function (){
            if(input_login_user_password.value.length > 4){
                check_face_validation_login_user_password.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_login_user_password.classList.add('fa-smile-beam');
                check_face_validation_login_user_password.style.color = 'green'
                validation_login_user_password = true;
                if(validation_login_user_mail && validation_login_user_password){
                    button_submit_login_form.style.background = '#B0976D';
                }else{
                    button_submit_login_form.style.background = 'gray';
                }
            }else{
                check_face_validation_login_user_password.classList.remove('fa-smile-beam');
                check_face_validation_login_user_password.classList.add('fa-meh-rolling-eyes');
                check_face_validation_login_user_password.style.color = 'white'
                validation_login_user_password = false;
                button_submit_login_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_login_user_password.addEventListener('blur', function(){
            if(input_login_user_password.value.length < 5){
                check_face_validation_login_user_password.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_login_user_password.classList.add('fa-frown-open');
                check_face_validation_login_user_password.style.color = 'red'
                validation_login_user_password = false;
                button_submit_login_form.style.background = 'gray';
            }else{
                validation_login_user_password = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_login_user_mail && validation_login_user_password){
                button_submit_login_form.style.background = '#B0976D';
            }else{
                button_submit_login_form.style.background = 'gray';
            }

        });
    }


//*****************para validar en pantalla de REGISTER***********************    
    if(form != null && form !="" && document.getElementById("formRegisterUser") != null){
        
        let input_register_user_name = document.querySelector("#firstname");//referencia al input de user name
        let check_face_validation_register_user_name = document.querySelector('#check_face_validation_register_user_name');//referencia carita check de user name
        let validation_register_user_name = false;
        let input_register_user_lastname = document.querySelector("#lastname");//referencia al input de user name
        let check_face_validation_register_user_lastname = document.querySelector('#check_face_validation_register_user_lastname');//referencia carita check de user lastname
        let validation_register_user_lastname = false;
        let input_register_user_mail = document.querySelector("#email");//referencia al input de user mail
        let check_face_validation_register_user_mail = document.querySelector('#check_face_validation_register_user_mail');//referencia carita check de user mail
        let validation_register_user_mail = false;
        let input_register_user_password = document.querySelector("#password");//referencia al input de user password
        let check_face_validation_register_user_password = document.querySelector('#check_face_validation_register_user_password');//referencia carita check de user password
        let validation_register_user_password = false;

        let button_submit_register_form = document.querySelector("#button_submit_register_form");

        //********Validaciones para el submit de Register*************/
        form.addEventListener('submit', function(e){                       
            if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password){
                console.log('las validaciones fueron correctas');
            }else{
                e.preventDefault();
            }
        });

//validamos el name
        //muestra carita en el input seleccionado por primera vez
        input_register_user_name.addEventListener('focus', function(){
            check_face_validation_register_user_name.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_register_user_name.addEventListener('input', function (){
            if(input_register_user_name.value.length > 2){
                check_face_validation_register_user_name.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_register_user_name.classList.add('fa-smile-beam');
                check_face_validation_register_user_name.style.color = 'green'
                validation_register_user_name = true;
                if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password){
                    button_submit_register_form.style.background = '#B0976D';
                }else{
                    button_submit_register_form.style.background = 'gray';
                }
            }else{
                check_face_validation_register_user_name.classList.remove('fa-smile-beam');
                check_face_validation_register_user_name.classList.add('fa-meh-rolling-eyes');
                check_face_validation_register_user_name.style.color = 'white'
                validation_register_user_name = false;
                button_submit_register_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_register_user_name.addEventListener('blur', function(){
            if(input_register_user_name.value.length < 3){
                check_face_validation_register_user_name.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_register_user_name.classList.add('fa-frown-open');
                check_face_validation_register_user_name.style.color = 'red'
                validation_register_user_name = false;
                button_submit_register_form.style.background = 'gray';
            }else{
                validation_register_user_name = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password){
                button_submit_register_form.style.background = '#B0976D';
            }else{
                button_submit_register_form.style.background = 'gray';
            }
        });

//validamos el lastname
        //muestra carita en el input seleccionado por primera vez
        input_register_user_lastname.addEventListener('focus', function(){
            check_face_validation_register_user_lastname.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_register_user_lastname.addEventListener('input', function (){
            if(input_register_user_lastname.value.length > 2){
                check_face_validation_register_user_lastname.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_register_user_lastname.classList.add('fa-smile-beam');
                check_face_validation_register_user_lastname.style.color = 'green'
                validation_register_user_lastname = true;
                if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password){
                    button_submit_register_form.style.background = '#B0976D';
                }else{
                    button_submit_register_form.style.background = 'gray';
                }
            }else{
                check_face_validation_register_user_lastname.classList.remove('fa-smile-beam');
                check_face_validation_register_user_lastname.classList.add('fa-meh-rolling-eyes');
                check_face_validation_register_user_lastname.style.color = 'white'
                validation_register_user_lastname = false;
                button_submit_register_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_register_user_lastname.addEventListener('blur', function(){
            if(input_register_user_lastname.value.length < 3){
                check_face_validation_register_user_lastname.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_register_user_lastname.classList.add('fa-frown-open');
                check_face_validation_register_user_lastname.style.color = 'red'
                validation_register_user_lastname = false;
                button_submit_register_form.style.background = 'gray';
            }else{
                validation_register_user_lastname = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password){
                button_submit_register_form.style.background = '#B0976D';
            }else{
                button_submit_register_form.style.background = 'gray';
            }
        });

//validamos el mail
        //muestra carita en el input seleccionado por primera vez
        input_register_user_mail.addEventListener('focus', function(){
            check_face_validation_register_user_mail.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que caracteres ingresa
        input_register_user_mail.addEventListener('input', function (){
            if(input_register_user_mail.value.match(mailformat)){
                check_face_validation_register_user_mail.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_register_user_mail.classList.add('fa-smile-beam');
                check_face_validation_register_user_mail.style.color = 'green'
                validation_register_user_mail = true;

                if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password){
                    button_submit_register_form.style.background = '#B0976D';
                }else{
                    button_submit_register_form.style.background = 'gray';
                }
            }else{
                check_face_validation_register_user_mail.classList.remove('fa-smile-beam');
                check_face_validation_register_user_mail.classList.add('fa-meh-rolling-eyes');
                check_face_validation_register_user_mail.style.color = 'white'
                validation_register_user_mail = false;
                button_submit_register_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si es o no correcto los campos ingresados.
        input_register_user_mail.addEventListener('blur', function(){
            //muestra carita en el input seleccionado
            if(!input_register_user_mail.value.match(mailformat)){
                check_face_validation_register_user_mail.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_register_user_mail.classList.add('fa-frown-open');
                check_face_validation_register_user_mail.style.color = 'red'
                validation_register_user_mail = false;
                button_submit_register_form.style.background = 'gray';
            }else{
                validation_register_user_mail = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password){
                button_submit_register_form.style.background = '#B0976D';
            }else{
                button_submit_register_form.style.background = 'gray';
            }
        });

//validamos el password
        //muestra carita en el input seleccionado por primera vez
        input_register_user_password.addEventListener('focus', function(){
            check_face_validation_register_user_password.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 4 caracteres para que funcione
        input_register_user_password.addEventListener('input', function (){
            if(input_register_user_password.value.length > 4){
                check_face_validation_register_user_password.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_register_user_password.classList.add('fa-smile-beam');
                check_face_validation_register_user_password.style.color = 'green'
                validation_register_user_password = true;
                if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password){
                    button_submit_register_form.style.background = '#B0976D';
                }else{
                    button_submit_register_form.style.background = 'gray';
                }
            }else{
                check_face_validation_register_user_password.classList.remove('fa-smile-beam');
                check_face_validation_register_user_password.classList.add('fa-meh-rolling-eyes');
                check_face_validation_register_user_password.style.color = 'white'
                validation_register_user_password = false;
                button_submit_register_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_register_user_password.addEventListener('blur', function(){
            if(input_register_user_password.value.length < 5){
                check_face_validation_register_user_password.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_register_user_password.classList.add('fa-frown-open');
                check_face_validation_register_user_password.style.color = 'red'
                validation_register_user_password = false;
                button_submit_register_form.style.background = 'gray';
            }else{
                validation_register_user_password = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password){
                button_submit_register_form.style.background = '#B0976D';
            }else{
                button_submit_register_form.style.background = 'gray';
            }
        });
    }
    
//*****************para validar en pantalla de UPDATE USER***********************    
    if(form != null && form !="" && document.getElementById("formEditUser") != null){
        let input_update_user_name = document.querySelector("#firstname");//referencia al input de user name
        let check_face_validation_update_user_name = document.querySelector('#check_face_validation_update_user_name');//referencia carita check de user name
        let validation_update_user_name = false;
        let input_update_user_lastname = document.querySelector("#lastname");//referencia al input del user apellido
        let check_face_validation_update_user_lastname = document.querySelector('#check_face_validation_update_user_lastname');//referencia carita check de user lastname
        let validation_update_user_lastname = false;
        let input_update_user_password = document.querySelector("#password");//referencia al input de user password
        let check_face_validation_update_user_password = document.querySelector('#check_face_validation_update_user_password');//referencia carita check de user password
        let validation_update_user_password = false;
        let button_submit_update_form = document.querySelector("#button_submit_update_form");

        //********Validaciones para el submit de UPDATE*************/
        form.addEventListener('submit', function(e){                       
            if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password){
                console.log('las validaciones fueron correctas');
            }else{
                e.preventDefault();
            }
        });

//validamos el name
        //muestra carita en el input seleccionado por primera vez
        input_update_user_name.addEventListener('focus', function(){
            check_face_validation_update_user_name.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_update_user_name.addEventListener('input', function (){
            if(input_update_user_name.value.length > 2){
                check_face_validation_update_user_name.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_user_name.classList.add('fa-smile-beam');
                check_face_validation_update_user_name.style.color = 'green'
                validation_update_user_name = true;
                if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password){
                    button_submit_update_form.style.background = '#B0976D';
                }else{
                    button_submit_update_form.style.background = 'gray';
                }
            }else{
                check_face_validation_update_user_name.classList.remove('fa-smile-beam');
                check_face_validation_update_user_name.classList.add('fa-meh-rolling-eyes');
                check_face_validation_update_user_name.style.color = 'white'
                validation_update_user_name = false;
                button_submit_update_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_update_user_name.addEventListener('blur', function(){
            if(input_update_user_name.value.length < 3){
                check_face_validation_update_user_name.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_user_name.classList.add('fa-frown-open');
                check_face_validation_update_user_name.style.color = 'red'
                validation_update_user_name = false;
                button_submit_update_form.style.background = 'gray';
            }else{
                validation_update_user_name = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password){
                button_submit_update_form.style.background = '#B0976D';
            }else{
                button_submit_update_form.style.background = 'gray';
            }
        });
        
//validamos el lastname
        input_update_user_lastname.addEventListener('focus', function(){
            check_face_validation_update_user_lastname.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_update_user_lastname.addEventListener('input', function (){
            if(input_update_user_lastname.value.length > 2){
                check_face_validation_update_user_lastname.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_user_lastname.classList.add('fa-smile-beam');
                check_face_validation_update_user_lastname.style.color = 'green'
                validation_update_user_lastname = true;
                if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password){
                    button_submit_update_form.style.background = '#B0976D';
                }else{
                    button_submit_update_form.style.background = 'gray';
                }
            }else{
                check_face_validation_update_user_lastname.classList.remove('fa-smile-beam');
                check_face_validation_update_user_lastname.classList.add('fa-meh-rolling-eyes');
                check_face_validation_update_user_lastname.style.color = 'white'
                validation_update_user_lastname = false;
                button_submit_update_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_update_user_lastname.addEventListener('blur', function(){
            if(input_update_user_lastname.value.length < 3){
                check_face_validation_update_user_lastname.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_user_lastname.classList.add('fa-frown-open');
                check_face_validation_update_user_lastname.style.color = 'red'
                validation_update_user_lastname = false;
                button_submit_update_form.style.background = 'gray';
            }else{
                validation_update_user_lastname = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password){
                button_submit_update_form.style.background = '#B0976D';
            }else{
                button_submit_update_form.style.background = 'gray';
            }
        });

//validamos el password
        //muestra carita en el input seleccionado por primera vez
        input_update_user_password.addEventListener('focus', function(){
            check_face_validation_update_user_password.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 4 caracteres para que funcione
        input_update_user_password.addEventListener('input', function (){
            if(input_update_user_password.value.length > 4){
                check_face_validation_update_user_password.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_user_password.classList.add('fa-smile-beam');
                check_face_validation_update_user_password.style.color = 'green'
                validation_update_user_password = true;
                if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password){
                    button_submit_update_form.style.background = '#B0976D';
                }else{
                    button_submit_update_form.style.background = 'gray';
                }
            }else{
                check_face_validation_update_user_password.classList.remove('fa-smile-beam');
                check_face_validation_update_user_password.classList.add('fa-meh-rolling-eyes');
                check_face_validation_update_user_password.style.color = 'white'
                validation_update_user_password = false;
                button_submit_update_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_update_user_password.addEventListener('blur', function(){
            if(input_update_user_password.value.length < 5){
                check_face_validation_update_user_password.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_user_password.classList.add('fa-frown-open');
                check_face_validation_update_user_password.style.color = 'red'
                validation_update_user_password = false;
                button_submit_update_form.style.background = 'gray';
            }else{
                validation_update_user_password = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password){
                button_submit_update_form.style.background = '#B0976D';
            }else{
                button_submit_update_form.style.background = 'gray';
            }
        });


    }





});

function selectForm(){
    let tempForm = '';
    //Si estamos en la pantalla de LOGIN USER
    if(document.getElementById("formLoginUser") != null) {
        tempForm = document.querySelector("#formLoginUser");
    }
    //Si estamos en la pantalla de REGISTER USER
    if(document.getElementById("formRegisterUser") != null) {
        tempForm = document.querySelector("#formRegisterUser");
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