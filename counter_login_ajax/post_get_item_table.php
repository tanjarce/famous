<?php
header("Content_Type: application/json");
require '../inc/connect.php';
include '../inc/fun.php';
session_start();

if(isset($_POST['srch'])){
  $s = $_POST['srch'];
  $c = $_POST['cat'];
  $b = $_POST['brnd'];
  // echo "$c";
  // echo "$b";
  if ($c == "Category") {
    $c = null;
  }
  if ($b == "Brand") {
    $b = null;
  }
  $query = "SELECT * from product_info WHERE brand LIKE '%". $b ."%' AND category LIKE '%". $c ."%' ";
  $query .= " AND (item_name LIKE '%". $s ."%' OR brand LIKE '%". $s ."%' OR category LIKE '%". $s ."%')";
  $data = mysqli_query($connection, $query);
  $output = "";
  while($row = mysqli_fetch_assoc($data)){
    $output .= "<div class='item'>";
    $output .= "<img class='image' src='web_image/". $row['image'] ."'>";
    $output .="<div class='details'>";
    $output .= "<span><b>item:</b> ". $row['item_name'] ."</span>";
    $output .= "<span><b>brand:</b> ". $row['brand'] ."</span>";
    $output .= "<span><b>price:</b> ₱". $row['price'] ."</span>";
    $output .= "</div>";
    $output .= "</div>";
  }
  echo $output;
}
else{
  $query = "SELECT * from product_info";
  $data = mysqli_query($connection, $query);
  $output = "";
  while($row = mysqli_fetch_assoc($data)){
    $output .= "<div class='item'>";
    $output .= "<img class='image' src='web_image/". $row['image'] ."'>";
    $output .="<div class='details'>";
    $output .= "<span><b>item:</b> ". $row['item_name'] ."</span>";
    $output .= "<span><b>brand:</b> ". $row['brand'] ."</span>";
    $output .= "<span><b>price:</b> ₱". $row['price'] ."</span>";
    $output .= "</div>";
    $output .= "</div>";
  }
  echo $output;

}


mysqli_close($connection);
?>
