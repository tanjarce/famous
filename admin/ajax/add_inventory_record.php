<?php
require_once '../../inc/connect.php';

if(isset($_POST['inventory_id'])) {
  date_default_timezone_set('Asia/Manila');
  $month = date("M");
  $day = date("d");
  $year = date("Y");
  $time = date("h:i A");
  $trans_id = $_POST["inventory_id"];
  $trans_item = $_POST["name"];
  $updated_stock = $_POST["stock"];
  $max_stock = $_POST["capa"];
  $reduction = $_POST["value"];

  $query = "INSERT INTO inventory_data (item_id, item_name, reduction_or_increase, updated_stock, max_stock_quantity, day, month, year, time) ";
  $query.= "VALUES ($trans_id, '$trans_item', $reduction, $updated_stock,$max_stock, $day, '$month', $year, '$time')";
  $result = mysqli_query($connection, $query3);

  $sendquery = mysqli_query($connection, $query);
}


?>
