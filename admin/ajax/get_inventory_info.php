<?php
include '../../inc/fun.php';
require_once '../../inc/connect.php';

if (isset($_POST["side_id"])) {
  $id = $_POST['side_id'];
  // echo "$month";
  // echo "$year";
  $query = "SELECT* from product_info WHERE item_id = '". $id ."'";
  $result = mysqli_query($connection, $query);
  confirm_query($result);

  $data = array();

  foreach ($result as $row) {
    $data[] = $row;
  }
  mysqli_free_result($result);
  print json_encode($data);
  mysqli_close($connection);

}

?>
