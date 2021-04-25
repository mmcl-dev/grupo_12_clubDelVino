Info de los endPoint de la api : products

**Listar productos**  
(GET) localhost:3030/api/v1/products/list  
      
**crear el producto (tiene que ir con los datos por el body)**  
(POST) localhost:3030/api/v1/products/create  
      
**detalle del producto (tiene que ir con el id del producto por params )**  
(GET) localhost:3030/api/v1/products/detail/{id}  
      
**actualizar producto (tiene que ir con el id del producto por params y el contenido por body)**  
(PATCH) localhost:3030/api/v1/products/update/{id}  
      
**borrar producto (tiene que ir con el id por params)**  
(DELETE) localhost:3030/api/v1/products/delete/{id}

**buscar algo en la tabla de producto**  
(GET) localhost:3030/api/v1/products/search?keyword=XXXX

----------
Info de los endPoint de la api : users

**Listar users**  
(GET) localhost:3030/api/v1/users/list  
      
**crear el user (tiene que ir con los datos por el body)**  
(POST) localhost:3030/api/v1/users/create  
      
**detalle del prouserducto (tiene que ir con el id del user por params )**  
(GET) localhost:3030/api/v1/users/detail/{id}  
      
**actualizar producto (tiene que ir con el id del producto por params y el contenido por body)**  
(PATCH) localhost:3030/api/v1/users/update/{id}  
      
**borrar user (tiene que ir con el id por params)**  
(DELETE) localhost:3030/api/v1/users/delete/{id}

**buscar algo en la tabla de user**  
(GET) localhost:3030/api/v1/users/search?keyword=XXXX