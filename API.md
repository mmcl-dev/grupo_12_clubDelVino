Info de los endPoint de la api : products

**Listar productos**  
(GET) http://localhost:3030/api/v1/products/list  
      
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

**listar categorias**  
(GET) localhost:3030/api/v1/products/listofcategories  

**lista el ultimo producto creado, entrega tambien una url, donde se encuentra la imagen del producto**  
(GET) localhost:3030/api/v1/products/searchlastproduct  

**listar busca todos los vinos pertenecientes al nombre de una bodega (palabra que se encuentre dentro de bodega)**  
(GET) localhost:3030/api/v1/products/searchbywinefamily?keyword=xxxxx 

**lista todos los productos que pertenescan a una categoria. busca por nombre de categoria**  
(GET) localhost:3030/api/v1/products/searchbycategoryname?keyword=xxxxx  

**busca el vino que coincida con el nombre**  
(GET) localhost:3030/api/v1/products/searchbyproductname?keyword=Espumante  

----------
Info de los endPoint de la api : users

**Listar users**  
(GET)  http://localhost:3030/api/v1/users/
      
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