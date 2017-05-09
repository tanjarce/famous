<?php
require_once '../inc/connect.php';
include '../inc/fun.php';

session_start();

if(isset($_POST['binili_id'])){
  $trans_id = $_POST['binili_id'];
  $trans_item = $_POST['trans_item'];
  $trans_quant = $_POST['trans_quant'];
  $trans_cost = $_POST['trans_cost'];

  date_default_timezone_set('Asia/Manila');
  $month = date("M");
  $day = date("d");
  $year = date("Y");
  $time = date("h:i A");


  $query1 = "SELECT * FROM product_info WHERE item_id = '$trans_id'";
  $result1 = mysqli_query($connection, $query1);
  confirm_query($result1);

  while ($row = mysqli_fetch_assoc($result1)) {
    $stock = $row['stock'];
    $max_stock = $row['max_stock_quantity'];
  }
  mysqli_free_result($result1);
  $updated_stock = $stock - $trans_quant;
  $reduction = -($trans_quant);


  $query = "INSERT INTO sales_transaction (item_name, item_id, quantity, sales_amount, day, month, year, time) ";
  $query .="VALUES ('$trans_item', $trans_id, $trans_quant, $trans_cost, $day, '$month', $year, '$time')";
  echo "$query";
  $sendquery = mysqli_query($connection, $query);

  $query2 = "UPDATE `product_info` SET `stock`= $updated_stock WHERE item_id = '$trans_id'";
  mysqli_query($connection, $query2);

  $query3 = "INSERT INTO inventory_data (item_id, item_name, reduction_or_increase, updated_stock, max_stock_quantity, day, month, year, time) ";
  $query3.= "VALUES ($trans_id, '$trans_item', $reduction, $updated_stock,$max_stock, $day, '$month', $year, '$time')";
  $result3 = mysqli_query($connection, $query3);

  // echo $query;
  // echo $query2;
  // echo $query3;
}




?>
