<?php
header("Content_Type: application/json");
require '../inc/connect.php';
include '../inc/fun.php';
session_start();

if(isset($_POST['counter_item'])){
  $item = $_POST['counter_item'];
  $brand = $_POST['item_brand'];

  $query = "SELECT * from product_info WHERE availability = 'yes' AND stock > 0 AND (item_name LIKE '%". $item ."%' OR brand LIKE '%". $item ."%') ";
  $query .= "AND brand LIKE '%". $brand ."%' ORDER by item_name";
  $data = mysqli_query($connection, $query);


  // if ($brand != "") {
  //   $output = "<li id='srch_prev' class='item_row selected'>". $item ." | ". $brand ."</li>";
  // }
  // else {
  //   $output = "<li id='srch_prev'class='item_row selected'>". $item ."</li>";
  // }

  $item_info = array();

  foreach ($data as $row) {
    $item_info[] = $row;
  }
  mysqli_free_result($data);
  print json_encode($item_info);

  // $data = [];

  // while ($row = mysqli_fetch_assoc($data)) {
  //   $output .= "<li id='". $row['item_id'] ."' class='item_row'>". $row['item_name'] ." | ". $row['brand'] ."</li>";
  // }
  // echo $output;

}

mysqli_close($connection);
?>
