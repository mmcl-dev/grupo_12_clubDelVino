USE club_del_vino;

INSERT INTO `users` 
(createdAt, updatedAt, first_name, last_name, user_type, email, password, image)
VALUES 
(NULL,NULL,'Magdalena','Centeno','administrador','centenomagdalena@hotmail.com','$2a$10$5M4kIBznoe.ICH1/jwfnbuu4JBnm5DENjGB0MgleOeWVfQmFT1bP2','MCL.jpg'),
(NULL,NULL,'Maria','Perez','user','mperez@hotmail.com','$2a$10$5M4kIBznoe.ICH1/jwfnbuu4JBnm5DENjGB0MgleOeWVfQmFT1bP2','anime1.png'),
(NULL,NULL,'Juan','González','user','jgonzalez@gmail.com','$2a$10$5M4kIBznoe.ICH1/jwfnbuu4JBnm5DENjGB0MgleOeWVfQmFT1bP2','generico.jpg'),
(NULL,NULL,'a','a','user','a@a.com','$2a$10$5M4kIBznoe.ICH1/jwfnbuu4JBnm5DENjGB0MgleOeWVfQmFT1bP2','defaultImageUser.jpg'),
(NULL,NULL,'l','l','administrador','l@l.com','$2a$10$5M4kIBznoe.ICH1/jwfnbuu4JBnm5DENjGB0MgleOeWVfQmFT1bP2','ironman.jpg');



INSERT INTO `categories` 
(createdAt, updatedAt, category_name)
VALUES 
 (NULL,null,'Blend'),
 (NULL,null,'Malbec'),
 (NULL,null,'Cabernet Suavignon'),
 (NULL,null,'Chardonnay - Chenin'),
 (NULL,null,'Espumante'),
 (NULL,null,'Rosé'),
 (NULL,null,'Vidau'),
 (NULL,null,'Bonarda'),
 (NULL,null,'Cabernet Franc'),
 (NULL,null,'Syrah'),
 (NULL,null,'Pinot Noir'),
 (NULL,null,'Carmenere');



INSERT INTO `products` 
(createdAt, updatedAt, product_name, description, wine_family, category_id, year, price, offer, offer_price, image)
VALUES 
(NULL,NULL,'Añoranza Reserva Premium','Un blend de Malbec, Cabernet y Merlot de gran concentración, con aromas frutales y notas ahumadas de café y vainilla aportadas por su paso en barricas de Roble Francés.','La Añoranza',1,'2017',978.0,0,0,'vino1.png'),
(NULL,NULL,'Raíces Argentinas','De color violeta intenso, brillante y limpio. En nariz tiene la fruta característica de un chocolate oscuro y leves notas de cuero. En boca es de entrada dulce y amable, se percibe un sutil toque de vainilla. Su paso por roble le dan complejidad y largo final','Salvador Patti',2,'2018',988.0,1,455,'vino2.png'),
(NULL,NULL,'Cuatro Fincas Cab Suav','De color rojo rubí con destellos violáceos, cautiva por su opulencia en frutos rojos y pimienta negra. En boca, se encuentran marcados taninos, dando un vino concentrado, robusto y de gran riqueza frutal. Se destaca la presencia de vainilla, coco y tabaco.','Salvador Patti',3,'2020',2228.0,0,0,'vino3.png'),
(NULL,NULL,'Cuatro Fincas MS','Bordó oscuro e intenso. Se combinan en balance impecable los especiados aromas del Syrah, con la fruta del Malbec. En boca se encuentra un vino de buena acidez, sabores a mermelada de ciruela y frutos negros, se presenta equilibrado, de taninos suaves y delicadas sensaciones, con un final dulce y largo.','Salvador Patti',4,'2021',1480,0,0,'vino4.png'),
(NULL,NULL,'Cuatro Fincas CC','De color amarillo suave de tintes verdosos. Al aroma se destaca plenamente la fruta fresca, como el durazno blanco. Al sabor se percibe equilibrado en cuerpo y estructura, con una acidez que resalta la frescura y juventud.','Salvador Patti',5,'2019',1234,1,500,'vino5.png'),
(NULL,NULL,'Benito A. Gran Reserva','Un blend perfumado, profundo, con un puro espíritu de reserva.','Palo Alto',1,'2017',2500,0,0,'vino5.png'),
(NULL,NULL,'Espumante Extra Bruit','Excelente Extra Brut, elaborado a través de un paciente proceso de fermentación natural. Su expresión aromática destaca notas de ananá, banana y maracuyá.','Siete Fincas',6,'2020',3700,0,0,'vino6.png'),
(NULL,NULL,'Espumante Dulce Natural','Vino elaborado con una selección de uvas de antiguas fincas de la primera zona de Mendoza. Ideal para acompañar postres, chocolates y frutas regionales.','Siete Fincas',7,'2021',1225,0,0,'vino7.png'),
(NULL,NULL,'Arvum','Limpio y brillante, color rosa-fresa ligeramente anaranjado. Aromas primarios de la variedad, frutosos y de gran finura.','Familia Escudero',8,'2021',5500,0,0,'vino5.png'),
(NULL,NULL,'Añoranzas III','Color rojo cereza muy cubierto. Aromas finos y elegantes tostados cremosos y fruta madura, con mucha expresión y complejidad. En boca es potente, carnoso y redondo, muy rico en matices, compleja y elegante retronasal.','Rioja',9,'2020',2370,0,0,'vino8.png'),
(NULL,NULL,'Añoranza','Un blend de Malbec, Cabernet y Merlot de gran concentración, con aromas frutales y notas ahumadas de café y vainilla aportadas por su paso en barricas de Roble Francés.','La Añoranza',10,'2017',440.0,0,0,'vino1.png'),
(NULL,NULL,'Raíces Provinciales','De color violeta intenso, brillante y limpio. En nariz tiene la fruta característica de un chocolate oscuro y leves notas de cuero. En boca es de entrada dulce y amable, se percibe un sutil toque de vainilla. Su paso por roble le dan complejidad y largo final','Salvador Patti',11,'2018',988.0,0,0,'vino3.png'),
(NULL,NULL,'Tres Fincas Cab Suav','De color rojo rubí con destellos violáceos, cautiva por su opulencia en frutos rojos y pimienta negra. En boca, se encuentran marcados taninos, dando un vino concentrado, robusto y de gran riqueza frutal. Se destaca la presencia de vainilla, coco y tabaco.','Salvador Patti',12,'2020',2228.0,1,1000,'vino9.png'),
(NULL,NULL,'Tres Fincas MS','Bordó oscuro e intenso. Se combinan en balance impecable los especiados aromas del Syrah, con la fruta del Malbec. En boca se encuentra un vino de buena acidez, sabores a mermelada de ciruela y frutos negros, se presenta equilibrado, de taninos suaves y delicadas sensaciones, con un final dulce y largo.','Salvador Patti',1,'2021',1480,1,1234,'vino1.png'),
(NULL,NULL,'Tres Fincas CC','De color amarillo suave de tintes verdosos. Al aroma se destaca plenamente la fruta fresca, como el durazno blanco. Al sabor se percibe equilibrado en cuerpo y estructura, con una acidez que resalta la frescura y juventud.','Salvador Patti',6,'2019',1234,0,0,'vino7.png'),
(NULL,NULL,'Juan Perez','Un blend perfumado, profundo, con un puro espíritu de reserva.','Palo Alto',1,'2017',2500,0,0,'vino5.png'),
(NULL,NULL,'Uvita Extra Bruit','Excelente Extra Brut, elaborado a través de un paciente proceso de fermentación natural. Su expresión aromática destaca notas de ananá, banana y maracuyá.','Siete Fincas',1,'2020',3700,0,0,'vino8.png'),
(NULL,NULL,'Uvita Dulce Natural','Vino elaborado con una selección de uvas de antiguas fincas de la primera zona de Mendoza. Ideal para acompañar postres, chocolates y frutas regionales.','Siete Fincas',3,'2021',1225,0,0,'vino4.png'),
(NULL,NULL,'Simple','Limpio y brillante, color rosa-fresa ligeramente anaranjado. Aromas primarios de la variedad, frutosos y de gran finura.','Familia Escudero',6,'2021',5500,0,0,'vino2.png'),
(NULL,NULL,'Añoranza II Reserva Premium','Color rojo cereza muy cubierto. Aromas finos y elegantes tostados cremosos y fruta madura, con mucha expresión y complejidad. En boca es potente, carnoso y redondo, muy rico en matices, compleja y elegante retronasal.','Rioja',4,'2020',2370,1,1800,'vino9.png');





INSERT INTO `user_product` 
(createdAt, updatedAt, user_id, product_id, quantity) 
VALUES 
(NULL,NULL,1,1,1),
(NULL,NULL,2,1,2),
(NULL,NULL,3,1,1),
(NULL,NULL,4,2,1),
(NULL,NULL,3,5,1),
(NULL,NULL,4,3,3),
(NULL,NULL,4,7,1),
(NULL,NULL,4,8,2);

