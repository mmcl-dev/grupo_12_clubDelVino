window.onload = function(){

  /*VERIFICAMOS EN QUE PANTALLA ESTAMOS, para saberlo buscamos el campo name que solo esta en la pantalla de register */
if(document.getElementById("firstname") != null){
  //Ver si volvemos a usar el limpiado de campos.
  /*limpia todos los campos del formulario*/
  /*
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  */
 
  /* revisa los inputs y si contienen algo remueven la clase has-content para que el css funcione. si no la agrega y no anda esa parte del css */
  document.getElementById("firstname").onblur = function(){
  if(document.getElementById("firstname").value !=""){
    document.getElementById("firstname").classList.add("has-content");
    }else{
      document.getElementById("firstname").classList.remove("has-content");
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

  /* revisa los inputs y si contienen algo remueven la clase has-content para que el css funcione. si no la agrega y no anda esa parte del css */
  document.getElementById("email").style.color = "black";
  document.getElementById("email").onfocus = function(){
    document.getElementById("email").style.color = "white";
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

  setTimeout(function(){
    if(document.getElementById("email").value !=""){
      document.getElementById("email").classList.add("has-content");
      document.getElementById("email").style.color = "white";
      }else{
        document.getElementById("email").classList.remove("has-content");
      }
  },500);

}

};
