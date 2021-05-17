window.addEventListener("load",function(e){
    //variable que contiene los datos del FORM en el DOM dependiendo en que pantalla estemos
    let form = selectForm();
    //console.log(form);

    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;//expresion regular para validar mail
    let numberformat = /^[0-9]+$/;  //expresion regular para validar numeros nada mas
    let moneyformat = /^[1-9]\d*((\.\d{0,2})?)$/; //expresion regular para validar formato de moneda nada mas
    let extensionformat = (/\.(jpg|png|gif)$/i); //expresion regular para validar formato de imagen aceptada
    let fullDate = new Date();
    let dateNow = fullDate.getFullYear();


//*****************para validar en pantalla de login***********************
    if(form != null && form !="" && document.getElementById("formLoginUser") != null){

        let input_login_user_mail = document.querySelector("#email");//referencia al input de user mail
        let check_face_validation_login_user_mail = document.querySelector('#check_face_validation_login_user_mail');//referencia carita check de user mail
        let validation_login_user_mail = true;
        let msgCheck_login_user_mail = document.querySelector('#msgCheck_user_email');
        msgCheck_login_user_mail.style.display = 'none';

        let input_login_user_password = document.querySelector("#password");//referencia al input de user password
        let check_face_validation_login_user_password = document.querySelector('#check_face_validation_login_user_password');//referencia carita check de user password
        let validation_login_user_password = false;
        let msgCheck_login_user_password = document.querySelector('#msgCheck_user_password');
        msgCheck_login_user_password.style.display = 'none';

        let button_submit_login_form = document.querySelector("#button_submit_login_form");
        button_submit_login_form.style.background = 'gray';

        //********Validaciones para el submit de LOGIN*************/
        form.addEventListener('submit', function(e){                       
            if(validation_login_user_mail && validation_login_user_password){
                console.log('las validaciones fueron correctas');
            }else{
                e.preventDefault();
                button_submit_login_form.style.background = 'gray';
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
                msgCheck_login_user_mail.style.display = 'inline';
            }else{
                validation_login_user_mail = true;
                msgCheck_login_user_mail.style.display = 'none';
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
            if(input_login_user_password.value.length > 7){
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
            if(input_login_user_password.value.length < 8){
                check_face_validation_login_user_password.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_login_user_password.classList.add('fa-frown-open');
                check_face_validation_login_user_password.style.color = 'red'
                validation_login_user_password = false;
                button_submit_login_form.style.background = 'gray';
                msgCheck_login_user_password.style.display = 'inline';
            }else{
                validation_login_user_password = true;
                msgCheck_login_user_password.style.display = 'none';
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
        let msgCheck_register_user_name = document.querySelector('#msgCheck_user_name');
        msgCheck_register_user_name.style.display = 'none';

        let input_register_user_lastname = document.querySelector("#lastname");//referencia al input de user name
        let check_face_validation_register_user_lastname = document.querySelector('#check_face_validation_register_user_lastname');//referencia carita check de user lastname
        let validation_register_user_lastname = false;
        let msgCheck_register_user_lastname = document.querySelector('#msgCheck_user_lastname');
        msgCheck_register_user_lastname.style.display = 'none';

        let input_register_user_mail = document.querySelector("#email");//referencia al input de user mail
        let check_face_validation_register_user_mail = document.querySelector('#check_face_validation_register_user_mail');//referencia carita check de user mail
        let validation_register_user_mail = false;
        let msgCheck_register_user_email = document.querySelector('#msgCheck_user_email');
        msgCheck_register_user_email.style.display = 'none';

        let input_register_user_password = document.querySelector("#password");//referencia al input de user password
        let check_face_validation_register_user_password = document.querySelector('#check_face_validation_register_user_password');//referencia carita check de user password
        let validation_register_user_password = false;
        let msgCheck_register_user_password = document.querySelector('#msgCheck_user_password');
        msgCheck_register_user_password.style.display = 'none';

        let input_register_user_image = document.querySelector("#image");//referencia al input de la imagen
        let check_face_validation_register_user_image = document.querySelector('#check_face_validation_register_user_image');//referencia carita check de user image
        let validation_register_user_image = true;
        let msgCheck_register_user_image = document.querySelector('#msgCheck_user_image');
        msgCheck_register_user_image.style.display = 'none';

        let button_submit_register_form = document.querySelector("#button_submit_register_form");
        button_submit_register_form.style.background = 'gray';
        //********Validaciones para el submit de Register*************/
        form.addEventListener('submit', function(e){                       
            if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password && validation_register_user_image){
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
                if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password && validation_register_user_image){
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
                msgCheck_register_user_name.style.display = 'inline';
            }else{
                validation_register_user_name = true;
                msgCheck_register_user_name.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password && validation_register_user_image){
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
                if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password && validation_register_user_image){
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
                msgCheck_register_user_lastname.style.display = 'inline';
            }else{
                validation_register_user_lastname = true;
                msgCheck_register_user_lastname.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password && validation_register_user_image){
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

                if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password && validation_register_user_image){
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
                msgCheck_register_user_email.style.display = 'inline';
            }else{
                validation_register_user_mail = true;
                msgCheck_register_user_email.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password && validation_register_user_image){
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
            if(input_register_user_password.value.length > 7){
                check_face_validation_register_user_password.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_register_user_password.classList.add('fa-smile-beam');
                check_face_validation_register_user_password.style.color = 'green'
                validation_register_user_password = true;
                if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password && validation_register_user_image){
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
            if(input_register_user_password.value.length < 8){
                check_face_validation_register_user_password.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_register_user_password.classList.add('fa-frown-open');
                check_face_validation_register_user_password.style.color = 'red'
                validation_register_user_password = false;
                button_submit_register_form.style.background = 'gray';
                msgCheck_register_user_password.style.display = 'inline';
            }else{
                validation_register_user_password = true;
                msgCheck_register_user_password.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_register_user_name && validation_register_user_lastname && validation_register_user_mail && validation_register_user_password && validation_register_user_image){
                button_submit_register_form.style.background = '#B0976D';
            }else{
                button_submit_register_form.style.background = 'gray';
            }
        });

//validamos la imagen del usuario (no es obligatorio, pero si lo intenta una sola ves, se vuelve obligatorio)
        //muestra carita en el input seleccionado por primera vez
        input_register_user_image.addEventListener('focus', function(){
            check_face_validation_register_user_image.classList.add('fa-meh-rolling-eyes');
        });
       
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_register_user_image.addEventListener('blur', function(){
            if(input_register_user_image.value.length < 7 || !extensionformat.test(input_register_user_image.value)){
                check_face_validation_register_user_image.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_register_user_image.classList.remove('fa-smile-beam');
                check_face_validation_register_user_image.classList.add('fa-frown-open');
                check_face_validation_register_user_image.style.color = 'red'
                validation_register_user_image = false;
                button_submit_register_form.style.background = 'gray';
                msgCheck_register_user_image.style.display = 'inline';
            }else{
                check_face_validation_register_user_image.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_register_user_image.classList.add('fa-smile-beam');
                check_face_validation_register_user_image.style.color = 'green'
                validation_register_user_image = true;
                msgCheck_register_user_image.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_register_user_name && validation_register_user_lastname && validation_register_user_password && validation_register_user_image && validation_register_user_image){
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
        let validation_update_user_name = true;
        let msgCheck_update_user_name = document.querySelector('#msgCheck_user_name');
        msgCheck_update_user_name.style.display = 'none';

        let input_update_user_lastname = document.querySelector("#lastname");//referencia al input del user apellido
        let check_face_validation_update_user_lastname = document.querySelector('#check_face_validation_update_user_lastname');//referencia carita check de user lastname
        let validation_update_user_lastname = true;
        let msgCheck_update_user_lastname = document.querySelector('#msgCheck_user_lastname');
        msgCheck_update_user_lastname.style.display = 'none';

        let input_update_user_password = document.querySelector("#password");//referencia al input de user password
        let check_face_validation_update_user_password = document.querySelector('#check_face_validation_update_user_password');//referencia carita check de user password
        let validation_update_user_password = false;
        let msgCheck_update_user_password = document.querySelector('#msgCheck_user_password');
        msgCheck_update_user_password.style.display = 'none';

        let input_update_user_image = document.querySelector("#image");//referencia al input de la imagen
        let check_face_validation_update_user_image = document.querySelector('#check_face_validation_update_user_image');//referencia carita check de user image
        let validation_update_user_image = true;
        let msgCheck_update_user_image = document.querySelector('#msgCheck_user_image');
        msgCheck_update_user_image.style.display = 'none';

        let button_submit_update_user_form = document.querySelector("#button_submit_update_user_form");

        button_submit_update_user_form.style.background = 'gray';

        //********Validaciones para el submit de UPDATE*************/
        form.addEventListener('submit', function(e){                       
            if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password && validation_update_user_image){
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
                if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password && validation_update_user_image){
                    button_submit_update_user_form.style.background = '#B0976D';
                }else{
                    button_submit_update_user_form.style.background = 'gray';
                }
            }else{
                check_face_validation_update_user_name.classList.remove('fa-smile-beam');
                check_face_validation_update_user_name.classList.add('fa-meh-rolling-eyes');
                check_face_validation_update_user_name.style.color = 'white'
                validation_update_user_name = false;
                button_submit_update_user_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_update_user_name.addEventListener('blur', function(){
            if(input_update_user_name.value.length < 3){
                check_face_validation_update_user_name.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_user_name.classList.add('fa-frown-open');
                check_face_validation_update_user_name.style.color = 'red'
                validation_update_user_name = false;
                button_submit_update_user_form.style.background = 'gray';
                msgCheck_update_user_name.style.display = 'inline';
            }else{
                validation_update_user_name = true;
                msgCheck_update_user_name.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password && validation_update_user_image){
                button_submit_update_user_form.style.background = '#B0976D';
            }else{
                button_submit_update_user_form.style.background = 'gray';
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
                if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password && validation_update_user_image){
                    button_submit_update_user_form.style.background = '#B0976D';
                }else{
                    button_submit_update_user_form.style.background = 'gray';
                }
            }else{
                check_face_validation_update_user_lastname.classList.remove('fa-smile-beam');
                check_face_validation_update_user_lastname.classList.add('fa-meh-rolling-eyes');
                check_face_validation_update_user_lastname.style.color = 'white'
                validation_update_user_lastname = false;
                button_submit_update_user_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_update_user_lastname.addEventListener('blur', function(){
            if(input_update_user_lastname.value.length < 3){
                check_face_validation_update_user_lastname.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_user_lastname.classList.add('fa-frown-open');
                check_face_validation_update_user_lastname.style.color = 'red'
                validation_update_user_lastname = false;
                button_submit_update_user_form.style.background = 'gray';
                msgCheck_update_user_lastname.style.display = 'inline';
            }else{
                validation_update_user_lastname = true;
                msgCheck_update_user_lastname.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password && validation_update_user_image){
                button_submit_update_user_form.style.background = '#B0976D';
            }else{
                button_submit_update_user_form.style.background = 'gray';
            }
        });

//validamos el password
        //muestra carita en el input seleccionado por primera vez
        input_update_user_password.addEventListener('focus', function(){
            check_face_validation_update_user_password.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 4 caracteres para que funcione
        input_update_user_password.addEventListener('input', function (){
            if(input_update_user_password.value.length > 7){
                check_face_validation_update_user_password.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_user_password.classList.add('fa-smile-beam');
                check_face_validation_update_user_password.style.color = 'green'
                validation_update_user_password = true;
                if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password && validation_update_user_image){
                    button_submit_update_user_form.style.background = '#B0976D';
                }else{
                    button_submit_update_user_form.style.background = 'gray';
                }
            }else{
                check_face_validation_update_user_password.classList.remove('fa-smile-beam');
                check_face_validation_update_user_password.classList.add('fa-meh-rolling-eyes');
                check_face_validation_update_user_password.style.color = 'white'
                validation_update_user_password = false;
                button_submit_update_user_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_update_user_password.addEventListener('blur', function(){
            if(input_update_user_password.value.length < 8){
                check_face_validation_update_user_password.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_user_password.classList.add('fa-frown-open');
                check_face_validation_update_user_password.style.color = 'red'
                validation_update_user_password = false;
                button_submit_update_user_form.style.background = 'gray';
                msgCheck_update_user_password.style.display = 'inline';
            }else{
                validation_update_user_password = true;
                msgCheck_update_user_password.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password && validation_update_user_image){
                button_submit_update_user_form.style.background = '#B0976D';
            }else{
                button_submit_update_user_form.style.background = 'gray';
            }
        });

//validamos la imagen del usuario (no es obligatorio, pero si lo intenta una sola ves, se vuelve obligatorio)
        //muestra carita en el input seleccionado por primera vez
        input_update_user_image.addEventListener('focus', function(){
            check_face_validation_update_user_image.classList.add('fa-meh-rolling-eyes');
        });
       
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_update_user_image.addEventListener('blur', function(){
            if(input_update_user_image.value.length < 7 || !extensionformat.test(input_update_user_image.value)){
                check_face_validation_update_user_image.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_user_image.classList.remove('fa-smile-beam');
                check_face_validation_update_user_image.classList.add('fa-frown-open');
                check_face_validation_update_user_image.style.color = 'red'
                validation_update_user_image = false;
                button_submit_update_user_form.style.background = 'gray';
                msgCheck_update_user_image.style.display = 'inline';
            }else{
                check_face_validation_update_user_image.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_user_image.classList.add('fa-smile-beam');
                check_face_validation_update_user_image.style.color = 'green'
                validation_update_user_image = true;
                msgCheck_update_user_image.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password && validation_update_user_image){
                button_submit_update_user_form.style.background = '#B0976D';
            }else{
                button_submit_update_user_form.style.background = 'gray';
            }
        }); 
    }

//*****************para validar en pantalla de CREATE PRODUCT***********************    
    if(form != null && form !="" && document.getElementById("formCreateProduct") != null){
        let input_create_product_name = document.querySelector("#product_name");//referencia al input de nombre del producto
        let check_face_validation_create_product_name = document.querySelector('#check_face_validation_create_product_name');//referencia carita check del nombre del producto
        let validation_create_product_name = false;
        let msgCheck_product_name = document.querySelector('#msgCheck_product_name');
        msgCheck_product_name.style.display = 'none';

        let input_create_product_description = document.querySelector("#description");//referencia al input de la descripcion del producto
        let check_face_validation_create_product_description = document.querySelector('#check_face_validation_create_product_description');//referencia carita check de la descripcion del producto
        let validation_create_product_description = false;
        let msgCheck_product_description = document.querySelector('#msgCheck_description');
        msgCheck_product_description.style.display = 'none';

        let input_create_product_wine_family = document.querySelector("#wine_family");//referencia al input de la bodega del producto
        let check_face_validation_create_product_wine_family = document.querySelector('#check_face_validation_create_product_wine_family');//referencia carita check de la bodega del producto
        let validation_create_product_wine_family = false;
        let msgCheck_product_wine_family = document.querySelector('#msgCheck_wine_family');
        msgCheck_product_wine_family.style.display = 'none';

        let input_create_product_year = document.querySelector("#year");//referencia al input del anio
        let check_face_validation_create_product_year = document.querySelector('#check_face_validation_create_product_year');//referencia carita check del anio
        let validation_create_product_year = false;
        let msgCheck_product_year = document.querySelector('#msgCheck_year');
        msgCheck_product_year.style.display = 'none';

        let input_create_product_price = document.querySelector("#price");//referencia al input del precio
        let check_face_validation_create_product_price = document.querySelector('#check_face_validation_create_product_price');//referencia carita check del precio
        let validation_create_product_price = false;
        let msgCheck_product_price = document.querySelector('#msgCheck_price');
        msgCheck_product_price.style.display = 'none';

        let input_create_product_image = document.querySelector("#image");//referencia al input de la imagen
        let check_face_validation_create_product_image = document.querySelector('#check_face_validation_create_product_image');//referencia carita check de la imagen
        let validation_create_product_image = false;
        let msgCheck_product_image = document.querySelector('#msgCheck_image');
        msgCheck_product_image.style.display = 'none';

        let input_create_product_offer_price = document.querySelector("#offer_price");//referencia al input del precio de oferta
        let check_face_validation_create_product_offer_price = document.querySelector('#check_face_validation_create_product_offer_price');//referencia carita check del precio de oferta
        let validation_create_product_offer_price = true;
        let msgCheck_offer_price = document.querySelector('#msgCheck_offer_price');
        msgCheck_offer_price.style.display = 'none';

        let button_submit_create_product_form = document.querySelector("#button_submit_create_product_form");

        let validateCheckInCreate = document.querySelector("#offer");
        let isChecked_offer = validateCheckInCreate.checked;

        button_submit_create_product_form.style.background = 'gray';

        //********Validaciones para el submit de CREATE PRODUCT*************/
        form.addEventListener('submit', function(e){                       
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                console.log('las validaciones fueron correctas');
            }else{
                e.preventDefault();
                button_submit_create_product_form.style.background = 'gray';
            }
        });

//validamos el product_name
        //muestra carita en el input seleccionado por primera vez
        input_create_product_name.addEventListener('focus', function(){
            check_face_validation_create_product_name.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_create_product_name.addEventListener('input', function (){
            if(input_create_product_name.value.length > 4){
                check_face_validation_create_product_name.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_name.classList.add('fa-smile-beam');
                check_face_validation_create_product_name.style.color = 'green'
                validation_create_product_name = true;
                if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                    button_submit_create_product_form.style.background = '#B0976D';
                }else{
                    button_submit_create_product_form.style.background = 'gray';
                }
            }else{
                check_face_validation_create_product_name.classList.remove('fa-smile-beam');
                check_face_validation_create_product_name.classList.add('fa-meh-rolling-eyes');
                check_face_validation_create_product_name.style.color = 'white'
                validation_create_product_name = false;
                button_submit_create_product_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_create_product_name.addEventListener('blur', function(){
            if(input_create_product_name.value.length < 5){
                check_face_validation_create_product_name.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_name.classList.add('fa-frown-open');
                check_face_validation_create_product_name.style.color = 'red'
                validation_create_product_name = false;
                button_submit_create_product_form.style.background = 'gray';
                msgCheck_product_name.style.display = 'inline';
            }else{
                validation_create_product_name = true;
                msgCheck_product_name.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                button_submit_create_product_form.style.background = '#B0976D';
            }else{
                button_submit_create_product_form.style.background = 'gray';
            }
        });

//validamos el product_description
        //muestra carita en el input seleccionado por primera vez
        input_create_product_description.addEventListener('focus', function(){
            check_face_validation_create_product_description.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_create_product_description.addEventListener('input', function (){
            if(input_create_product_description.value.length > 10){
                check_face_validation_create_product_description.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_description.classList.add('fa-smile-beam');
                check_face_validation_create_product_description.style.color = 'green'
                validation_create_product_description = true;
                if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                    button_submit_create_product_form.style.background = '#B0976D';
                }else{
                    button_submit_create_product_form.style.background = 'gray';
                }
            }else{
                check_face_validation_create_product_description.classList.remove('fa-smile-beam');
                check_face_validation_create_product_description.classList.add('fa-meh-rolling-eyes');
                check_face_validation_create_product_description.style.color = 'white'
                validation_create_product_description = false;
                button_submit_create_product_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_create_product_description.addEventListener('blur', function(){
            if(input_create_product_description.value.length < 11){
                check_face_validation_create_product_description.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_description.classList.add('fa-frown-open');
                check_face_validation_create_product_description.style.color = 'red'
                validation_create_product_description = false;
                button_submit_create_product_form.style.background = 'gray';
                msgCheck_product_description.style.display = 'inline';
            }else{
                validation_create_product_description = true;
                msgCheck_product_description.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                button_submit_create_product_form.style.background = '#B0976D';
            }else{
                button_submit_create_product_form.style.background = 'gray';
            }
        });

//validamos el wine_family
        //muestra carita en el input seleccionado por primera vez
        input_create_product_wine_family.addEventListener('focus', function(){
            check_face_validation_create_product_wine_family.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_create_product_wine_family.addEventListener('input', function (){
            if(input_create_product_wine_family.value.length > 3){
                check_face_validation_create_product_wine_family.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_wine_family.classList.add('fa-smile-beam');
                check_face_validation_create_product_wine_family.style.color = 'green'
                validation_create_product_wine_family = true;
                if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                    button_submit_create_product_form.style.background = '#B0976D';
                }else{
                    button_submit_create_product_form.style.background = 'gray';
                }
            }else{
                check_face_validation_create_product_wine_family.classList.remove('fa-smile-beam');
                check_face_validation_create_product_wine_family.classList.add('fa-meh-rolling-eyes');
                check_face_validation_create_product_wine_family.style.color = 'white'
                validation_create_product_wine_family = false;
                button_submit_create_product_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_create_product_wine_family.addEventListener('blur', function(){
            if(input_create_product_wine_family.value.length < 4){
                check_face_validation_create_product_wine_family.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_wine_family.classList.add('fa-frown-open');
                check_face_validation_create_product_wine_family.style.color = 'red'
                validation_create_product_wine_family = false;
                button_submit_create_product_form.style.background = 'gray';
                msgCheck_product_wine_family.style.display = 'inline';
            }else{
                validation_create_product_wine_family = true;
                msgCheck_product_wine_family.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                button_submit_create_product_form.style.background = '#B0976D';
            }else{
                button_submit_create_product_form.style.background = 'gray';
            }
        });

//validamos el year
        //muestra carita en el input seleccionado por primera vez
        input_create_product_year.addEventListener('focus', function(){
            check_face_validation_create_product_year.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_create_product_year.addEventListener('input', function (){
            if(input_create_product_year.value.length == 4 && input_create_product_year.value.match(numberformat)&& input_create_product_year.value > 1800 && input_create_product_year.value < dateNow){
                check_face_validation_create_product_year.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_year.classList.add('fa-smile-beam');
                check_face_validation_create_product_year.style.color = 'green'
                validation_create_product_year = true;
                if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                    button_submit_create_product_form.style.background = '#B0976D';
                }else{
                    button_submit_create_product_form.style.background = 'gray';
                }
            }else{
                check_face_validation_create_product_year.classList.remove('fa-smile-beam');
                check_face_validation_create_product_year.classList.add('fa-meh-rolling-eyes');
                check_face_validation_create_product_year.style.color = 'white'
                validation_create_product_year = false;
                button_submit_create_product_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_create_product_year.addEventListener('blur', function(){
            if(input_create_product_year.value.length != 4 || input_create_product_year.value < 1800 || input_create_product_year.value > dateNow || !input_create_product_year.value.match(numberformat)){
                check_face_validation_create_product_year.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_year.classList.add('fa-frown-open');
                check_face_validation_create_product_year.style.color = 'red'
                validation_create_product_year = false;
                button_submit_create_product_form.style.background = 'gray';
                msgCheck_product_year.style.display = 'inline';
            }else{
                validation_create_product_year = true;
                msgCheck_product_year.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                button_submit_create_product_form.style.background = '#B0976D';
            }else{
                button_submit_create_product_form.style.background = 'gray';
            }
        });
 
//validamos el price
        //muestra carita en el input seleccionado por primera vez
        input_create_product_price.addEventListener('focus', function(){
            check_face_validation_create_product_price.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_create_product_price.addEventListener('input', function (){
            if(input_create_product_price.value.length > 0 && input_create_product_price.value <= 999999 && input_create_product_price.value.match(moneyformat)){
                check_face_validation_create_product_price.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_price.classList.add('fa-smile-beam');
                check_face_validation_create_product_price.style.color = 'green'
                validation_create_product_price = true;
                if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                    button_submit_create_product_form.style.background = '#B0976D';
                }else{
                    button_submit_create_product_form.style.background = 'gray';
                }
            }else{
                check_face_validation_create_product_price.classList.remove('fa-smile-beam');
                check_face_validation_create_product_price.classList.add('fa-meh-rolling-eyes');
                check_face_validation_create_product_price.style.color = 'white'
                validation_create_product_price = false;
                button_submit_create_product_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_create_product_price.addEventListener('blur', function(){
            if(input_create_product_price.value.length < 1 || input_create_product_price.value > 999999 || !input_create_product_price.value.match(moneyformat)){
                check_face_validation_create_product_price.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_price.classList.add('fa-frown-open');
                check_face_validation_create_product_price.style.color = 'red'
                validation_create_product_price = false;
                button_submit_create_product_form.style.background = 'gray';
                msgCheck_product_price.style.display = 'inline';
            }else{
                validation_create_product_price = true;
                msgCheck_product_price.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                button_submit_create_product_form.style.background = '#B0976D';
            }else{
                button_submit_create_product_form.style.background = 'gray';
            }
        });

//validamos el image
        //muestra carita en el input seleccionado por primera vez
        input_create_product_image.addEventListener('focus', function(){
            check_face_validation_create_product_image.classList.add('fa-meh-rolling-eyes');
        });
       
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_create_product_image.addEventListener('blur', function(){
            if(input_create_product_image.value.length < 7 || !extensionformat.test(input_create_product_image.value)){
                check_face_validation_create_product_image.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_image.classList.add('fa-frown-open');
                check_face_validation_create_product_image.style.color = 'red'
                validation_create_product_image = false;
                button_submit_create_product_form.style.background = 'gray';
                msgCheck_product_image.style.display = 'inline';
            }else{
                check_face_validation_create_product_image.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_image.classList.add('fa-smile-beam');
                check_face_validation_create_product_image.style.color = 'green'
                validation_create_product_image = true;
                msgCheck_product_image.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                button_submit_create_product_form.style.background = '#B0976D';
            }else{
                button_submit_create_product_form.style.background = 'gray';
            }
        }); 
        
//validamos el offer_price
        validateCheckInCreate.addEventListener('change', (event) => {
            input_create_product_offer_price.value = 1.00;
            if (event.currentTarget.checked) {
                isChecked_offer = true;
            } else {
                isChecked_offer = false;
                msgCheck_offer_price.style.display = 'none';
                validation_create_product_offer_price = true;
                check_face_validation_create_product_offer_price.classList.remove('fa-smile-beam');
                check_face_validation_create_product_offer_price.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_offer_price.classList.remove('fa-frown-open');               
            }
            //console.log(isChecked_offer)
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                button_submit_create_product_form.style.background = '#B0976D';
            }else{
                button_submit_create_product_form.style.background = 'gray';
            }
        })

        //muestra carita en el input seleccionado por primera vez
        input_create_product_offer_price.addEventListener('focus', function(){          
            if(isChecked_offer){
                check_face_validation_create_product_offer_price.classList.add('fa-meh-rolling-eyes');
            }else{
                input_create_product_offer_price.value = 1.00;
            }
        });

        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_create_product_offer_price.addEventListener('input', function (){
            if(isChecked_offer){
                if(input_create_product_offer_price.value > 0 && input_create_product_offer_price.value <= 999999 && input_create_product_offer_price.value.match(moneyformat)){
                    check_face_validation_create_product_offer_price.classList.remove('fa-meh-rolling-eyes');
                    check_face_validation_create_product_offer_price.classList.add('fa-smile-beam');
                    check_face_validation_create_product_offer_price.style.color = 'green'
                    validation_create_product_offer_price = true;

                    if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                        button_submit_create_product_form.style.background = '#B0976D';
                    }else{
                        button_submit_create_product_form.style.background = 'gray';
                    }
                }else{
                    check_face_validation_create_product_offer_price.classList.remove('fa-smile-beam');
                    check_face_validation_create_product_offer_price.classList.add('fa-meh-rolling-eyes');
                    check_face_validation_create_product_offer_price.style.color = 'white'
                    validation_create_product_offer_price = false;
                    button_submit_create_product_form.style.background = 'gray';
                }
            }else{
                input_create_product_offer_price.value = 1.00;
            }
        });

        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_create_product_offer_price.addEventListener('blur', function(){
            if(isChecked_offer){
                if(input_create_product_offer_price.value < 1 || input_create_product_offer_price.value > 999999 || !input_create_product_offer_price.value.match(moneyformat)){
                    check_face_validation_create_product_offer_price.classList.remove('fa-meh-rolling-eyes');
                    check_face_validation_create_product_offer_price.classList.add('fa-frown-open');
                    check_face_validation_create_product_offer_price.style.color = 'red'
                    validation_create_product_offer_price = false;
                    button_submit_create_product_form.style.background = 'gray';
                    msgCheck_offer_price.style.display = 'inline';
                }else{
                    validation_create_product_offer_price = true;
                    msgCheck_offer_price.style.display = 'none';
                }
                //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
                if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image && validation_create_product_offer_price){
                    button_submit_create_product_form.style.background = '#B0976D';
                }else{
                    button_submit_create_product_form.style.background = 'gray';
                }
            }else{
                input_create_product_offer_price.value = 1.00;
            }
        });

    }

//*****************para validar en pantalla de UPDATE PRODUCT***********************    
    if(form != null && form !="" && document.getElementById("formEditProduct") != null){
        let input_update_product_name = document.querySelector("#product_name");//referencia al input de nombre del producto
        let check_face_validation_update_product_name = document.querySelector('#check_face_validation_update_product_name');//referencia carita check del nombre del producto
        let validation_update_product_name = true;
        let msgCheck_product_name = document.querySelector('#msgCheck_product_name');
        msgCheck_product_name.style.display = 'none';

        let input_update_product_description = document.querySelector("#description");//referencia al input de la descripcion del producto
        let check_face_validation_update_product_description = document.querySelector('#check_face_validation_update_product_description');//referencia carita check de la descripcion del producto
        let validation_update_product_description = true;
        let msgCheck_product_description = document.querySelector('#msgCheck_description');
        msgCheck_product_description.style.display = 'none';

        let input_update_product_wine_family = document.querySelector("#wine_family");//referencia al input de la bodega del producto
        let check_face_validation_update_product_wine_family = document.querySelector('#check_face_validation_update_product_wine_family');//referencia carita check de la bodega del producto
        let validation_update_product_wine_family = true;
        let msgCheck_product_wine_family = document.querySelector('#msgCheck_wine_family');
        msgCheck_product_wine_family.style.display = 'none';

        let input_update_product_year = document.querySelector("#year");//referencia al input del anio
        let check_face_validation_update_product_year = document.querySelector('#check_face_validation_update_product_year');//referencia carita check del anio
        let validation_update_product_year = true;
        let msgCheck_product_year = document.querySelector('#msgCheck_year');
        msgCheck_product_year.style.display = 'none';

        let input_update_product_price = document.querySelector("#price");//referencia al input del precio
        let check_face_validation_update_product_price = document.querySelector('#check_face_validation_update_product_price');//referencia carita check del precio
        let validation_update_product_price = true;
        let msgCheck_product_price = document.querySelector('#msgCheck_price');
        msgCheck_product_price.style.display = 'none';

        let input_update_product_image = document.querySelector("#image");//referencia al input de la imagen
        let check_face_validation_update_product_image = document.querySelector('#check_face_validation_update_product_image');//referencia carita check de la imagen
        let validation_update_product_image = true;//esta en TRUE por que no es obligacion elegir una imagen. pero si se elije tiene que tener el formato correcto
        let msgCheck_product_image = document.querySelector('#msgCheck_image');
        msgCheck_product_image.style.display = 'none';

        let input_update_product_offer_price = document.querySelector("#offer_price");//referencia al input del precio de oferta
        let check_face_validation_update_product_offer_price = document.querySelector('#check_face_validation_update_product_offer_price');//referencia carita check del precio
        let validation_update_product_offer_price = true;
        let msgCheck_offer_price = document.querySelector('#msgCheck_offer_price');
        msgCheck_offer_price.style.display = 'none';

        let button_submit_update_product_form = document.querySelector("#button_submit_update_product_form");

        let validateCheckInUpdate = document.querySelector("#offer");
        let isChecked_offer = validateCheckInUpdate.checked;

        //********Validaciones para el submit de UPDATE PRODUCT*************/
        form.addEventListener('submit', function(e){                       
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                console.log('las validaciones fueron correctas');
            }else{
                e.preventDefault();
                button_submit_update_product_form.style.background = 'gray';
            }
        });

//validamos el product_name
        //muestra carita en el input seleccionado por primera vez
        input_update_product_name.addEventListener('focus', function(){
            check_face_validation_update_product_name.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_update_product_name.addEventListener('input', function (){
            if(input_update_product_name.value.length > 4){
                check_face_validation_update_product_name.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_name.classList.add('fa-smile-beam');
                check_face_validation_update_product_name.style.color = 'green'
                validation_update_product_name = true;
                if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                    button_submit_update_product_form.style.background = '#B0976D';
                }else{
                    button_submit_update_product_form.style.background = 'gray';
                }
            }else{
                check_face_validation_update_product_name.classList.remove('fa-smile-beam');
                check_face_validation_update_product_name.classList.add('fa-meh-rolling-eyes');
                check_face_validation_update_product_name.style.color = 'white'
                validation_update_product_name = false;
                button_submit_update_product_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_update_product_name.addEventListener('blur', function(){
            if(input_update_product_name.value.length < 5){
                check_face_validation_update_product_name.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_name.classList.add('fa-frown-open');
                check_face_validation_update_product_name.style.color = 'red'
                validation_update_product_name = false;
                button_submit_update_product_form.style.background = 'gray';
                msgCheck_product_name.style.display = 'inline';
            }else{
                validation_update_product_name = true;
                msgCheck_product_name.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                button_submit_update_product_form.style.background = '#B0976D';
            }else{
                button_submit_update_product_form.style.background = 'gray';
            }
        });

//validamos el product_description
        //muestra carita en el input seleccionado por primera vez
        input_update_product_description.addEventListener('focus', function(){
            check_face_validation_update_product_description.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_update_product_description.addEventListener('input', function (){
            if(input_update_product_description.value.length > 10){
                check_face_validation_update_product_description.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_description.classList.add('fa-smile-beam');
                check_face_validation_update_product_description.style.color = 'green'
                validation_update_product_description = true;
                if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                    button_submit_update_product_form.style.background = '#B0976D';
                }else{
                    button_submit_update_product_form.style.background = 'gray';
                }
            }else{
                check_face_validation_update_product_description.classList.remove('fa-smile-beam');
                check_face_validation_update_product_description.classList.add('fa-meh-rolling-eyes');
                check_face_validation_update_product_description.style.color = 'white'
                validation_update_product_description = false;
                button_submit_update_product_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_update_product_description.addEventListener('blur', function(){
            if(input_update_product_description.value.length < 11){
                check_face_validation_update_product_description.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_description.classList.add('fa-frown-open');
                check_face_validation_update_product_description.style.color = 'red'
                validation_update_product_description = false;
                button_submit_update_product_form.style.background = 'gray';
                msgCheck_product_description.style.display = 'inline';
            }else{
                validation_update_product_description = true;
                msgCheck_product_description.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                button_submit_update_product_form.style.background = '#B0976D';
            }else{
                button_submit_update_product_form.style.background = 'gray';
            }
        });

//validamos el wine_family
        //muestra carita en el input seleccionado por primera vez
        input_update_product_wine_family.addEventListener('focus', function(){
            check_face_validation_update_product_wine_family.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_update_product_wine_family.addEventListener('input', function (){
            if(input_update_product_wine_family.value.length > 3){
                check_face_validation_update_product_wine_family.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_wine_family.classList.add('fa-smile-beam');
                check_face_validation_update_product_wine_family.style.color = 'green'
                validation_update_product_wine_family = true;
                if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                    button_submit_update_product_form.style.background = '#B0976D';
                }else{
                    button_submit_update_product_form.style.background = 'gray';
                }
            }else{
                check_face_validation_update_product_wine_family.classList.remove('fa-smile-beam');
                check_face_validation_update_product_wine_family.classList.add('fa-meh-rolling-eyes');
                check_face_validation_update_product_wine_family.style.color = 'white'
                validation_update_product_wine_family = false;
                button_submit_update_product_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_update_product_wine_family.addEventListener('blur', function(){
            if(input_update_product_wine_family.value.length < 4){
                check_face_validation_update_product_wine_family.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_wine_family.classList.add('fa-frown-open');
                check_face_validation_update_product_wine_family.style.color = 'red'
                validation_update_product_wine_family = false;
                button_submit_update_product_form.style.background = 'gray';
                msgCheck_product_wine_family.style.display = 'inline';
            }else{
                validation_update_product_wine_family = true;
                msgCheck_product_wine_family.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                button_submit_update_product_form.style.background = '#B0976D';
            }else{
                button_submit_update_product_form.style.background = 'gray';
            }
        });

//validamos el year
        //muestra carita en el input seleccionado por primera vez
        input_update_product_year.addEventListener('focus', function(){
            check_face_validation_update_product_year.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_update_product_year.addEventListener('input', function (){
            if(input_update_product_year.value.length == 4 && input_update_product_year.value.match(numberformat) && input_update_product_year.value > 1800 && input_update_product_year.value < dateNow){
                check_face_validation_update_product_year.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_year.classList.add('fa-smile-beam');
                check_face_validation_update_product_year.style.color = 'green'
                validation_update_product_year = true;
                if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                    button_submit_update_product_form.style.background = '#B0976D';
                }else{
                    button_submit_update_product_form.style.background = 'gray';
                }
            }else{
                check_face_validation_update_product_year.classList.remove('fa-smile-beam');
                check_face_validation_update_product_year.classList.add('fa-meh-rolling-eyes');
                check_face_validation_update_product_year.style.color = 'white'
                validation_update_product_year = false;
                button_submit_update_product_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_update_product_year.addEventListener('blur', function(){
            if(input_update_product_year.value.length != 4 || input_update_product_year.value < 1800 || input_update_product_year.value > dateNow || !input_update_product_year.value.match(numberformat)){
                check_face_validation_update_product_year.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_year.classList.add('fa-frown-open');
                check_face_validation_update_product_year.style.color = 'red'
                validation_update_product_year = false;
                button_submit_update_product_form.style.background = 'gray';
                msgCheck_product_year.style.display = 'inline';
            }else{
                validation_update_product_year = true;
                msgCheck_product_year.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                button_submit_update_product_form.style.background = '#B0976D';
            }else{
                button_submit_update_product_form.style.background = 'gray';
            }
        });

//validamos el price
        //muestra carita en el input seleccionado por primera vez
        input_update_product_price.addEventListener('focus', function(){
            check_face_validation_update_product_price.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_update_product_price.addEventListener('input', function (){
            if(input_update_product_price.value > 0 && input_update_product_price.value <= 999999 && input_update_product_price.value.match(moneyformat)){
                check_face_validation_update_product_price.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_price.classList.add('fa-smile-beam');
                check_face_validation_update_product_price.style.color = 'green'
                validation_update_product_price = true;
                if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                    button_submit_update_product_form.style.background = '#B0976D';
                }else{
                    button_submit_update_product_form.style.background = 'gray';
                }
            }else{
                check_face_validation_update_product_price.classList.remove('fa-smile-beam');
                check_face_validation_update_product_price.classList.add('fa-meh-rolling-eyes');
                check_face_validation_update_product_price.style.color = 'white'
                validation_update_product_price = false;
                button_submit_update_product_form.style.background = 'gray';
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres y el formato correcto de moneda
        input_update_product_price.addEventListener('blur', function(){
            if(input_update_product_price.value < 1 || input_update_product_price.value > 999999 || !input_update_product_price.value.match(moneyformat)){
                check_face_validation_update_product_price.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_price.classList.add('fa-frown-open');
                check_face_validation_update_product_price.style.color = 'red'
                validation_update_product_price = false;
                button_submit_update_product_form.style.background = 'gray';
                msgCheck_product_price.style.display = 'inline';
            }else{
                validation_update_product_price = true;
                msgCheck_product_price.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                button_submit_update_product_form.style.background = '#B0976D';
            }else{
                button_submit_update_product_form.style.background = 'gray';
            }
        });

//validamos el image
        //muestra carita en el input seleccionado por primera vez
        input_update_product_image.addEventListener('focus', function(){
            check_face_validation_update_product_image.classList.add('fa-meh-rolling-eyes');
        });
       
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_update_product_image.addEventListener('blur', function(){
            if(input_update_product_image.value.length < 7 || !extensionformat.test(input_update_product_image.value)){
                check_face_validation_update_product_image.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_image.classList.add('fa-frown-open');
                check_face_validation_update_product_image.style.color = 'red'
                validation_update_product_image = false;
                button_submit_update_product_form.style.background = 'gray';
                msgCheck_product_image.style.display = 'inline';
            }else{
                check_face_validation_update_product_image.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_image.classList.add('fa-smile-beam');
                check_face_validation_update_product_image.style.color = 'green'
                validation_update_product_image = true;
                msgCheck_product_image.style.display = 'none';
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                button_submit_update_product_form.style.background = '#B0976D';
            }else{
                button_submit_update_product_form.style.background = 'gray';
            }
        });   
        
//validamos el offer_price
        //Solo valida si esta el checked de oferta seleccionado
        validateCheckInUpdate.addEventListener('change', (event) => {
            input_update_product_offer_price.value = 1.00;
            if (event.currentTarget.checked) {
                isChecked_offer = true;
            } else {
                isChecked_offer = false;
                msgCheck_offer_price.style.display = 'none';
                validation_update_product_offer_price = true;
                check_face_validation_update_product_offer_price.classList.remove('fa-smile-beam');
                check_face_validation_update_product_offer_price.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_offer_price.classList.remove('fa-frown-open');
                
            }
            //console.log(isChecked_offer)
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                button_submit_update_product_form.style.background = '#B0976D';
            }else{
                button_submit_update_product_form.style.background = 'gray';
            }
        })
        
        //muestra carita en el input seleccionado por primera vez
        input_update_product_offer_price.addEventListener('focus', function(){
            if(isChecked_offer){
                check_face_validation_update_product_offer_price.classList.add('fa-meh-rolling-eyes');
            }else{
                input_update_product_offer_price.value = 1.00;
            }
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_update_product_offer_price.addEventListener('input', function (){
            if(isChecked_offer){
                if(input_update_product_offer_price.value > 0 && input_update_product_offer_price.value <= 999999 && input_update_product_offer_price.value.match(moneyformat)){
                    check_face_validation_update_product_offer_price.classList.remove('fa-meh-rolling-eyes');
                    check_face_validation_update_product_offer_price.classList.add('fa-smile-beam');
                    check_face_validation_update_product_offer_price.style.color = 'green'
                    validation_update_product_offer_price = true;

                //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
                if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                    button_submit_update_product_form.style.background = '#B0976D';
                }else{
                    button_submit_update_product_form.style.background = 'gray';
                }
                }else{
                    check_face_validation_update_product_offer_price.classList.remove('fa-smile-beam');
                    check_face_validation_update_product_offer_price.classList.add('fa-meh-rolling-eyes');
                    check_face_validation_update_product_offer_price.style.color = 'white'
                    validation_update_product_offer_price = false;
                    button_submit_update_product_form.style.background = 'gray';

                }
            }else{
                input_update_product_offer_price.value = 1.00;
            }
        });
        //Al salir del imput valida que carita mostrar, dependiendo si tiene mas de 4 caracteres
        input_update_product_offer_price.addEventListener('blur', function(){
            if(isChecked_offer){
                if(input_update_product_offer_price.value < 1 || input_update_product_offer_price.value > 999999|| !input_update_product_offer_price.value.match(moneyformat)){
                    check_face_validation_update_product_offer_price.classList.remove('fa-meh-rolling-eyes');
                    check_face_validation_update_product_offer_price.classList.add('fa-frown-open');
                    check_face_validation_update_product_offer_price.style.color = 'red'
                    validation_update_product_offer_price = false;
                    button_submit_update_product_form.style.background = 'gray';
                    msgCheck_offer_price.style.display = 'inline';
                }else{
                    validation_update_product_offer_price = true;
                    msgCheck_offer_price.style.display = 'none';
                }
                //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
                if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image && validation_update_product_offer_price){
                    button_submit_update_product_form.style.background = '#B0976D';
                }else{
                    button_submit_update_product_form.style.background = 'gray';
                }
            }else{
                input_update_product_offer_price.value = 1.00;
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
