<?php
header("Content_Type: application/jason");
require_once '../../inc/connect.php';
include '../../inc/fun.php';

if(isset($_POST['item_id'])){

  $id = $_POST['item_id'];

  $query = "SELECT * from product_info WHERE item_id = ". $id ."";
  $result = mysqli_query($connection, $query);
  confirm_query($result);

  $data = array();
  foreach ($result as $row) {
    $data[] = $row;
  }

  mysqli_free_result($result);
  print json_encode($data);
}

mysqli_close($connection);
?>
