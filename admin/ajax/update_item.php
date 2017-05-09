<?php
require_once '../../inc/connect.php';


if(isset($_POST['update_id'])) {

  $id = $_POST['update_id'];
  $category = $_POST['update_cat'];
  $brand = $_POST['update_brnd'];
  $price = $_POST['update_price'];
  $availability = $_POST['update_avail'];

  $query = "UPDATE product_info SET ";
  $query .= "category = '". $category ."', ";
  $query .= "brand = '". $brand ."', ";
  $query .= "price = ". $price .", ";
  $query .= "availability = '". $availability ."' ";
  $query .= "WHERE item_id =". $id ."";
  echo "$query";

  $sendquery = mysqli_query($connection, $query);
}


?>
