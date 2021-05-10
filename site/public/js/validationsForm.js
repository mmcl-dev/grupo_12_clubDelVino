window.addEventListener("load",function(e){
    //variable que contiene los datos del FORM en el DOM dependiendo en que pantalla estemos
    let form = selectForm();
    //console.log(form);

    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;//expresion regular para validar mail
    let numberformat = /^[0-9]+$/;  //expresion regular para validar numeros nada mas
    let moneyformat = /^[1-9]\d*((\.\d{0,2})?)$/; //expresion regular para validar formato de moneda nada mas
    let extensionformat = (/\.(jpg|png|gif)$/i); //expresion regular para validar formato de imagen aceptada


//*****************para validar en pantalla de login***********************
    if(form != null && form !="" && document.getElementById("formLoginUser") != null){

        let input_login_user_mail = document.querySelector("#email");//referencia al input de user mail
        let check_face_validation_login_user_mail = document.querySelector('#check_face_validation_login_user_mail');//referencia carita check de user mail
        let validation_login_user_mail = true;
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
        let validation_update_user_name = true;
        let input_update_user_lastname = document.querySelector("#lastname");//referencia al input del user apellido
        let check_face_validation_update_user_lastname = document.querySelector('#check_face_validation_update_user_lastname');//referencia carita check de user lastname
        let validation_update_user_lastname = true;
        let input_update_user_password = document.querySelector("#password");//referencia al input de user password
        let check_face_validation_update_user_password = document.querySelector('#check_face_validation_update_user_password');//referencia carita check de user password
        let validation_update_user_password = false;
        let button_submit_update_user_form = document.querySelector("#button_submit_update_user_form");

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
            }else{
                validation_update_user_name = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password){
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
                if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password){
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
            }else{
                validation_update_user_lastname = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password){
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
            if(input_update_user_password.value.length > 4){
                check_face_validation_update_user_password.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_user_password.classList.add('fa-smile-beam');
                check_face_validation_update_user_password.style.color = 'green'
                validation_update_user_password = true;
                if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password){
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
            if(input_update_user_password.value.length < 5){
                check_face_validation_update_user_password.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_user_password.classList.add('fa-frown-open');
                check_face_validation_update_user_password.style.color = 'red'
                validation_update_user_password = false;
                button_submit_update_user_form.style.background = 'gray';
            }else{
                validation_update_user_password = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_user_name && validation_update_user_lastname && validation_update_user_password){
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

        let input_create_product_description = document.querySelector("#description");//referencia al input de la descripcion del producto
        let check_face_validation_create_product_description = document.querySelector('#check_face_validation_create_product_description');//referencia carita check de la descripcion del producto
        let validation_create_product_description = false;

        let input_create_product_wine_family = document.querySelector("#wine_family");//referencia al input de la bodega del producto
        let check_face_validation_create_product_wine_family = document.querySelector('#check_face_validation_create_product_wine_family');//referencia carita check de la bodega del producto
        let validation_create_product_wine_family = false;

        let input_create_product_year = document.querySelector("#year");//referencia al input del anio
        let check_face_validation_create_product_year = document.querySelector('#check_face_validation_create_product_year');//referencia carita check del anio
        let validation_create_product_year = false;

        let input_create_product_price = document.querySelector("#price");//referencia al input del precio
        let check_face_validation_create_product_price = document.querySelector('#check_face_validation_create_product_price');//referencia carita check del precio
        let validation_create_product_price = false;

        let input_create_product_image = document.querySelector("#image");//referencia al input de la imagen
        let check_face_validation_create_product_image = document.querySelector('#check_face_validation_create_product_image');//referencia carita check de la imagen
        let validation_create_product_image = false;


        let button_submit_create_product_form = document.querySelector("#button_submit_create_product_form");

        //********Validaciones para el submit de CREATE PRODUCT*************/
        form.addEventListener('submit', function(e){                       
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image){
                console.log('las validaciones fueron correctas');
            }else{
                e.preventDefault();
            }
        });

//validamos el product_name
        //muestra carita en el input seleccionado por primera vez
        input_create_product_name.addEventListener('focus', function(){
            check_face_validation_create_product_name.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_create_product_name.addEventListener('input', function (){
            if(input_create_product_name.value.length > 2){
                check_face_validation_create_product_name.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_name.classList.add('fa-smile-beam');
                check_face_validation_create_product_name.style.color = 'green'
                validation_create_product_name = true;
                if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image){
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
            if(input_create_product_name.value.length < 3){
                check_face_validation_create_product_name.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_name.classList.add('fa-frown-open');
                check_face_validation_create_product_name.style.color = 'red'
                validation_create_product_name = false;
                button_submit_create_product_form.style.background = 'gray';
            }else{
                validation_create_product_name = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image){
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
                if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image){
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
            }else{
                validation_create_product_description = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image){
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
            if(input_create_product_wine_family.value.length > 2){
                check_face_validation_create_product_wine_family.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_wine_family.classList.add('fa-smile-beam');
                check_face_validation_create_product_wine_family.style.color = 'green'
                validation_create_product_wine_family = true;
                if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image){
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
            if(input_create_product_wine_family.value.length < 3){
                check_face_validation_create_product_wine_family.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_wine_family.classList.add('fa-frown-open');
                check_face_validation_create_product_wine_family.style.color = 'red'
                validation_create_product_wine_family = false;
                button_submit_create_product_form.style.background = 'gray';
            }else{
                validation_create_product_wine_family = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image){
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
            if(input_create_product_year.value.length == 4 && input_create_product_year.value.match(numberformat)){
                check_face_validation_create_product_year.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_year.classList.add('fa-smile-beam');
                check_face_validation_create_product_year.style.color = 'green'
                validation_create_product_year = true;
                if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image){
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
            if(input_create_product_year.value.length != 4 || !input_create_product_year.value.match(numberformat)){
                check_face_validation_create_product_year.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_year.classList.add('fa-frown-open');
                check_face_validation_create_product_year.style.color = 'red'
                validation_create_product_year = false;
                button_submit_create_product_form.style.background = 'gray';
            }else{
                validation_create_product_year = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image){
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
            if(input_create_product_price.value.length > 2 && input_create_product_price.value.match(moneyformat)){
                check_face_validation_create_product_price.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_price.classList.add('fa-smile-beam');
                check_face_validation_create_product_price.style.color = 'green'
                validation_create_product_price = true;
                if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image){
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
            if(input_create_product_price.value.length < 3 || !input_create_product_price.value.match(moneyformat)){
                check_face_validation_create_product_price.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_price.classList.add('fa-frown-open');
                check_face_validation_create_product_price.style.color = 'red'
                validation_create_product_price = false;
                button_submit_create_product_form.style.background = 'gray';
            }else{
                validation_create_product_price = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image){
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
            }else{
                check_face_validation_create_product_image.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_create_product_image.classList.add('fa-smile-beam');
                check_face_validation_create_product_image.style.color = 'green'
                validation_create_product_image = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_create_product_name && validation_create_product_description && validation_create_product_wine_family && validation_create_product_year && validation_create_product_price && validation_create_product_image){
                button_submit_create_product_form.style.background = '#B0976D';
            }else{
                button_submit_create_product_form.style.background = 'gray';
            }
        });       
    }

//*****************para validar en pantalla de UPDATE PRODUCT***********************    
    if(form != null && form !="" && document.getElementById("formEditProduct") != null){
        let input_update_product_name = document.querySelector("#product_name");//referencia al input de nombre del producto
        let check_face_validation_update_product_name = document.querySelector('#check_face_validation_update_product_name');//referencia carita check del nombre del producto
        let validation_update_product_name = true;

        let input_update_product_description = document.querySelector("#description");//referencia al input de la descripcion del producto
        let check_face_validation_update_product_description = document.querySelector('#check_face_validation_update_product_description');//referencia carita check de la descripcion del producto
        let validation_update_product_description = true;

        let input_update_product_wine_family = document.querySelector("#wine_family");//referencia al input de la bodega del producto
        let check_face_validation_update_product_wine_family = document.querySelector('#check_face_validation_update_product_wine_family');//referencia carita check de la bodega del producto
        let validation_update_product_wine_family = true;

        let input_update_product_year = document.querySelector("#year");//referencia al input del anio
        let check_face_validation_update_product_year = document.querySelector('#check_face_validation_update_product_year');//referencia carita check del anio
        let validation_update_product_year = true;

        let input_update_product_price = document.querySelector("#price");//referencia al input del precio
        let check_face_validation_update_product_price = document.querySelector('#check_face_validation_update_product_price');//referencia carita check del precio
        let validation_update_product_price = true;

        let input_update_product_image = document.querySelector("#image");//referencia al input de la imagen
        let check_face_validation_update_product_image = document.querySelector('#check_face_validation_update_product_image');//referencia carita check de la imagen
        let validation_update_product_image = true;//esta en TRUE por que no es obligacion elegir una imagen. pero si se elije tiene que tener el formato correcto

        let button_submit_update_product_form = document.querySelector("#button_submit_update_product_form");

        //********Validaciones para el submit de CREATE PRODUCT*************/
        form.addEventListener('submit', function(e){                       
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image){
                console.log('las validaciones fueron correctas');
            }else{
                e.preventDefault();
            }
        });

//validamos el product_name
        //muestra carita en el input seleccionado por primera vez
        input_update_product_name.addEventListener('focus', function(){
            check_face_validation_update_product_name.classList.add('fa-meh-rolling-eyes');
        });
        //valida que carita mostrar dependiendo de que tenga mas de 2 caracteres para que funcione
        input_update_product_name.addEventListener('input', function (){
            if(input_update_product_name.value.length > 2){
                check_face_validation_update_product_name.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_name.classList.add('fa-smile-beam');
                check_face_validation_update_product_name.style.color = 'green'
                validation_update_product_name = true;
                if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image){
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
            if(input_update_product_name.value.length < 3){
                check_face_validation_update_product_name.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_name.classList.add('fa-frown-open');
                check_face_validation_update_product_name.style.color = 'red'
                validation_update_product_name = false;
                button_submit_update_product_form.style.background = 'gray';
            }else{
                validation_update_product_name = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image){
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
                if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image){
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
            }else{
                validation_update_product_description = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image){
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
            if(input_update_product_wine_family.value.length > 2){
                check_face_validation_update_product_wine_family.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_wine_family.classList.add('fa-smile-beam');
                check_face_validation_update_product_wine_family.style.color = 'green'
                validation_update_product_wine_family = true;
                if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image){
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
            if(input_update_product_wine_family.value.length < 3){
                check_face_validation_update_product_wine_family.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_wine_family.classList.add('fa-frown-open');
                check_face_validation_update_product_wine_family.style.color = 'red'
                validation_update_product_wine_family = false;
                button_submit_update_product_form.style.background = 'gray';
            }else{
                validation_update_product_wine_family = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image){
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
            if(input_update_product_year.value.length == 4 && input_update_product_year.value.match(numberformat)){
                check_face_validation_update_product_year.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_year.classList.add('fa-smile-beam');
                check_face_validation_update_product_year.style.color = 'green'
                validation_update_product_year = true;
                if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image){
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
            if(input_update_product_year.value.length != 4 || !input_update_product_year.value.match(numberformat)){
                check_face_validation_update_product_year.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_year.classList.add('fa-frown-open');
                check_face_validation_update_product_year.style.color = 'red'
                validation_update_product_year = false;
                button_submit_update_product_form.style.background = 'gray';
            }else{
                validation_update_product_year = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image){
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
            if(input_update_product_price.value.length > 2 && input_update_product_price.value.match(moneyformat)){
                check_face_validation_update_product_price.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_price.classList.add('fa-smile-beam');
                check_face_validation_update_product_price.style.color = 'green'
                validation_update_product_price = true;
                if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image){
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
            if(input_update_product_price.value.length < 3 || !input_update_product_price.value.match(moneyformat)){
                check_face_validation_update_product_price.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_price.classList.add('fa-frown-open');
                check_face_validation_update_product_price.style.color = 'red'
                validation_update_product_price = false;
                button_submit_update_product_form.style.background = 'gray';
            }else{
                validation_update_product_price = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image){
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
            }else{
                check_face_validation_update_product_image.classList.remove('fa-meh-rolling-eyes');
                check_face_validation_update_product_image.classList.add('fa-smile-beam');
                check_face_validation_update_product_image.style.color = 'green'
                validation_update_product_image = true;
            }
            //actualizamos visualmente el boton de submit cada vez que cambiamos de campo
            if(validation_update_product_name && validation_update_product_description && validation_update_product_wine_family && validation_update_product_year && validation_update_product_price && validation_update_product_image){
                button_submit_update_product_form.style.background = '#B0976D';
            }else{
                button_submit_update_product_form.style.background = 'gray';
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
