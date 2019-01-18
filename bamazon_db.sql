CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;
CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(75) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price decimal(10,2) not null,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM bamazon.products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sports", 30.00, 145),
	("Guitar", "Instruments", 2700.00, 6),
	("Boots", "Footwear", 99.99, 10),
	("Smartphone", "Electronics", 499.99, 100),
	("Bball Goal", "Sports", 200.00, 70),
	("Piano", "Music", 5000.00, 3),
	("Laptop", "Electronics", 2299.99, 13),
	("Sneakers", "Footwear", 79.99, 40),
	("Car", "Vehicles", 15000.00, 20),
	("Truck", "Vehicles", 9999.99, 5);