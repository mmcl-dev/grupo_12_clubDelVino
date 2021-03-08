// JavaScript for label effects only
window.onload = function(){

  /*VERIFICAMOS EN QUE PANTALLA ESTAMOS, para saberlo buscamos el campo name que solo esta en la pantalla de register */
if(document.getElementById("name") != null){
  /*limpia todos los campos del formulario*/
  /*
  document.getElementById("name").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  */
 
  /* revisa los inputs y si contienen algo remueven la clase has-content para que el css funcione. si no la agrega y no anda esa parte del css */
  document.getElementById("name").onblur = function(){
  if(document.getElementById("name").value !=""){
    document.getElementById("name").classList.add("has-content");
    }else{
      document.getElementById("name").classList.remove("has-content");
    }
  }
  document.getElementById("lastname").onblur = function(){
  if(document.getElementById("lastname").value !=""){
    document.getElementById("lastname").classList.add("has-content");
    }else{
      document.getElementById("lastname").classList.remove("has-content");
    }
  }
  document.getElementById("email").onblur = function(){
  if(document.getElementById("email").value !=""){
    document.getElementById("email").classList.add("has-content");
    }else{
      document.getElementById("email").classList.remove("has-content");
    }
  }
  document.getElementById("password").onblur = function(){
  if(document.getElementById("password").value !=""){
    document.getElementById("password").classList.add("has-content");
    }else{
      document.getElementById("password").classList.remove("has-content");
    }
  }
}else{
  /*limpia todos los campos del formulario*/
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";

  /* revisa los inputs y si contienen algo remueven la clase has-content para que el css funcione. si no la agrega y no anda esa parte del css */
  document.getElementById("email").onblur = function(){
  if(document.getElementById("email").value !=""){
    document.getElementById("email").classList.add("has-content");
    }else{
      document.getElementById("email").classList.remove("has-content");
    }
  }
  document.getElementById("password").onblur = function(){
  if(document.getElementById("password").value !=""){
    document.getElementById("password").classList.add("has-content");
    }else{
      document.getElementById("password").classList.remove("has-content");
    }
  }
}



};