<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';


if(isset($_POST['item'])){
  $item = $_POST['item'];
  $category = $_POST['category'];
  $brand = $_POST['brand'];
  $price = $_POST['price'];
  $quantity = $_POST['quantity'];
  $image = $_POST['image'];

  $query = "INSERT INTO product_info";
  $query .= "(item_name, brand, category, price, availability, stock, max_stock_quantity, image)";
  $query .= " VALUES ('". $item ."', '". $brand ."', '". $category ."', ". $price .", 'yes', ". $quantity .", ". $quantity .", '". $image ."')";

  $update = mysqli_query($connection, $query);
}



?>
