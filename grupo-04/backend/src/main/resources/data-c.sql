

-- Category table --

INSERT INTO `digital_booking`.`category` (title,description,url)
VALUES ('Hoteles','507.105 alojamientos','https://media.istockphoto.com/photos/portrait-of-young-couple-tourist-standing-nearly-window-looking-to-picture-id1227060710?k=20&m=1227060710&s=612x612&w=0&h=sHszTIiX840cklpj5peumCwL5uapWst1-rfqXWuf9dE=');

INSERT INTO `digital_booking`.`category` (title,description,url)
VALUES ('Hostels','556.704 alojamientos','https://media.istockphoto.com/photos/dormitory-room-with-bunk-beds-in-the-modern-hostel-picture-id932716210?k=20&m=932716210&s=612x612&w=0&h=bV_hQ1Y-KPECl1FEhj5zHXd88oQ8JA8SeJ52x2-JULg=');

INSERT INTO `digital_booking`.`category` (title,description,url)
VALUES ('Departamentos','459.333 alojamientos','https://media.istockphoto.com/photos/modern-luxury-apartment-picture-id1204742836?k=20&m=1204742836&s=612x612&w=0&h=TFxRgBiSgVf1GidVKiOvwDXvfGPhH3M_845tD1SzVY8=');

INSERT INTO `digital_booking`.`category` (title,description,url)
VALUES ('Bed and breakfast','388.978 alojamientos','https://media.istockphoto.com/photos/luxury-travel-romantic-couple-in-beach-hotel-picture-id1213840216?k=20&m=1213840216&s=612x612&w=0&h=XTT-5KD8VdcQJnlq02dH2-znH41R0P4p7F36vMiWfPY=');


-- 'feature' table------
INSERT INTO `digital_booking`.`features` (name, type_feature)
VALUES ('cocina', 0);
INSERT INTO `digital_booking`.`features` (name, type_feature)
VALUES ('televisor', 1);
INSERT INTO `digital_booking`.`features` (name, type_feature)
VALUES ('cocaireAcondicionadoina', 2);
INSERT INTO `digital_booking`.`features` (name, type_feature)
VALUES ('wifi', 3);
INSERT INTO `digital_booking`.`features` (name, type_feature)
VALUES ('piscina', 4);
INSERT INTO `digital_booking`.`features` (name, type_feature)
VALUES ('spa', 5);
INSERT INTO `digital_booking`.`features` (name, type_feature)
VALUES ('bar', 6);
INSERT INTO `digital_booking`.`features` (name, type_feature)
VALUES ('gimnasio', 7);
INSERT INTO `digital_booking`.`features` (name, type_feature)
VALUES ('restaurante', 8);
INSERT INTO `digital_booking`.`features` (name, type_feature)
VALUES ('parqueo', 9);


-- 'city' table--------

INSERT INTO `digital_booking`.`city` (name,country)
VALUES ('Buenos Aires','Argentina');

INSERT INTO `digital_booking`.`city` (name,country)
VALUES ('San Carlos de Bariloche','Argentina');

INSERT INTO `digital_booking`.`city` (name,country)
VALUES ('Mendoza','Argentina');

INSERT INTO `digital_booking`.`city` (name,country)
VALUES ('Cordoba','Argentina');

-- 'product' table-------

INSERT INTO `digital_booking`.`products` (description,name,title,category_id,city_id)
VALUES ('Hoteles en Buenos Aires','Hoteles Alexis','Hotel',1,1);
INSERT INTO `digital_booking`.`products` (description,name,title,category_id,city_id)
VALUES ('Hostels','Hostel Hostel','Hostel Salo',2,2);
INSERT INTO `digital_booking`.`products` (description,name,title,category_id,city_id)
VALUES ('Hostels','Hostel Hostel','Hotel Mauri',3,3);
INSERT INTO `digital_booking`.`products` (description,name,title,category_id,city_id)
VALUES ('Hostels','Hostel Hostel','Hostel Sofi',4,1);
INSERT INTO `digital_booking`.`products` (description,name,title,category_id,city_id)
VALUES ('Hostels','Hostel Hostel','Hotel Richard',2,3);
INSERT INTO `digital_booking`.`products` (description,name,title,category_id,city_id)
VALUES ('Hostels','Hostel Hostel','Hostel Juanma',3,1);
INSERT INTO `digital_booking`.`products` (description,name,title,category_id,city_id)
VALUES ('Hostels','Hostel Hostel','Hostel pepito',3,2);
INSERT INTO `digital_booking`.`products` (description,name,title,category_id,city_id)
VALUES ('Hostels','Hostel Hostel','Hostel Sol',2,4);
INSERT INTO `digital_booking`.`products` (description,name,title,category_id,city_id)
VALUES ('Hostels','Hostel Hostel','Hostel fulanito',1,3);
INSERT INTO `digital_booking`.`products` (description,name,title,category_id,city_id)
VALUES ('Hostels','Hostel Hostel','Hostel TNT',4,2);

-- 'product_image' table------
INSERT INTO `digital_booking`.`image` (title,url,product_id)
VALUES ('imagen','url',1);
INSERT INTO `digital_booking`.`image` (title,url,product_id)
VALUES ('imagen','url',1);
INSERT INTO `digital_booking`.`image` (title,url,product_id)
VALUES ('imagen','url',2);
INSERT INTO `digital_booking`.`image` (title,url,product_id)
VALUES ('imagen','url',3);
INSERT INTO `digital_booking`.`image` (title,url,product_id)
VALUES ('imagen','url',4);
INSERT INTO `digital_booking`.`image` (title,url,product_id)
VALUES ('imagen','url',5);
INSERT INTO `digital_booking`.`image` (title,url,product_id)
VALUES ('imagen','url',6);
INSERT INTO `digital_booking`.`image` (title,url,product_id)
VALUES ('imagen','url',7);
INSERT INTO `digital_booking`.`image` (title,url,product_id)
VALUES ('imagen','url',8);
INSERT INTO `digital_booking`.`image` (title,url,product_id)
VALUES ('imagen','url',9);
INSERT INTO `digital_booking`.`image` (title,url,product_id)
VALUES ('imagen','url',10);
INSERT INTO `digital_booking`.`image` (title,url,product_id)
VALUES ('imagen','url',10);

-- 'product-feacture'--
INSERT INTO `digital_booking`.`products_features` (product_id,feature_id)
VALUES (1,1);
INSERT INTO `digital_booking`.`products_features` (product_id,feature_id)
VALUES (1,2);
INSERT INTO `digital_booking`.`products_features` (product_id,feature_id)
VALUES (2,3);
INSERT INTO `digital_booking`.`products_features` (product_id,feature_id)
VALUES (3,4);
INSERT INTO `digital_booking`.`products_features` (product_id,feature_id)
VALUES (4,2);
INSERT INTO `digital_booking`.`products_features` (product_id,feature_id)
VALUES (5,7);
INSERT INTO `digital_booking`.`products_features` (product_id,feature_id)
VALUES (6,9);
INSERT INTO `digital_booking`.`products_features` (product_id,feature_id)
VALUES (7,2);
INSERT INTO `digital_booking`.`products_features` (product_id,feature_id)
VALUES (8,3);
INSERT INTO `digital_booking`.`products_features` (product_id,feature_id)
VALUES (9,5);
INSERT INTO `digital_booking`.`products_features` (product_id,feature_id)
VALUES (10,2);
INSERT INTO `digital_booking`.`products_features` (product_id,feature_id)
VALUES (10,3);