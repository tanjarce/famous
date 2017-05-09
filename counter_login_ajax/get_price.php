<?php
header("Content_Type: application/json");
require '../inc/connect.php';
include '../inc/fun.php';
session_start();

if(isset($_POST['item_id'])){

  $id = $_POST['item_id'];
  $query = "SELECT * from product_info WHERE item_id = ". $id ."";
  $result = mysqli_query($connection, $query);
  $item_name = array();

  foreach ($result as $row) {
    $item_name[] = $row;
  }
  mysqli_free_result($result);
  print json_encode($item_name);
  mysqli_close($connection);
}


?>
