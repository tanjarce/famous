<?php
require_once '../../inc/connect.php';

if(isset($_POST['inventory_id'])) {

  $id = $_POST['inventory_id'];
  $stock = $_POST['stock'];
  $capacity = $_POST['capacity'];

  $query = "UPDATE product_info SET ";
  $query .= "stock = ". $stock .", ";
  $query .= "max_stock_quantity = ". $capacity ." ";
  $query .= "WHERE item_id =". $id ."";
  echo "$query";

  $sendquery = mysqli_query($connection, $query);
  confirm_query($sendquery);
}


?>
