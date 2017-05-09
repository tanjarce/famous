<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';


if (isset($_POST['item'])) {
  $item = $_POST['item'];
  $category = $_POST['category'];
  $brand = $_POST['brand'];

  $query="";
  if ($category == "Category") {
    $query = "SELECT * from product_info WHERE brand = '". $brand ."' AND item_name LIKE '%". $item ."%'  ORDER by item_name";
  }
  if ($brand == "Brand") {
    $query = "SELECT * from product_info WHERE category = '". $category ."' AND item_name LIKE '%". $item ."%'  ORDER by item_name";
  }
  if ($category == "Category" && $brand == "Brand") {
    $query = "SELECT * from product_info WHERE item_name LIKE '%". $item ."%'  ORDER by item_name";
  }
  if($category != "Category" && $brand != "Brand"){
    $query = "SELECT * from product_info WHERE category = '". $category ."' AND brand = '". $brand ."' AND item_name LIKE '%". $item ."%'  ORDER by item_name";
  }
  $data = mysqli_query($connection, $query);
  $result = array();

  foreach ($data as $row) {
    $result[] = $row;
  }

  mysqli_free_result($data);
  print json_encode($result);


}
else {
  $query = "SELECT * from product_info ORDER by item_name";
  $data = mysqli_query($connection, $query);
  $result = array();

  foreach ($data as $row) {
    $result[] = $row;
  }

  mysqli_free_result($data);
  print json_encode($result);


}

  mysqli_close($connection);

?>
