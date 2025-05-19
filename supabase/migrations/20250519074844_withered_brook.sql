/*
  # Product Seeder

  This seeder creates 10 sample products across different categories
  for the POS system.
*/

INSERT INTO products (name, description, price, stock, category) VALUES
('Laptop Pro 15"', 'High-performance laptop with 16GB RAM and 512GB SSD', 1299.99, 25, 'Electronics'),
('Wireless Mouse', 'Ergonomic wireless mouse with long battery life', 29.99, 100, 'Electronics'),
('Bluetooth Headphones', 'Noise-cancelling over-ear headphones', 199.99, 50, 'Electronics'),
('Office Chair', 'Adjustable ergonomic chair for home or office', 249.99, 30, 'Furniture'),
('Standing Desk', 'Electric height-adjustable standing desk', 499.99, 20, 'Furniture'),
('Coffee Maker', 'Programmable coffee maker with thermal carafe', 89.99, 40, 'Appliances'),
('Blender', 'High-speed blender for smoothies and more', 69.99, 35, 'Appliances'),
('Smartphone X', 'Latest model smartphone with triple camera system', 899.99, 45, 'Electronics'),
('Tablet Pro', '10.5" tablet with high-resolution display', 349.99, 30, 'Electronics'),
('Smart Watch', 'Fitness and health tracking smartwatch', 199.99, 60, 'Electronics');