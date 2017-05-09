<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';

$month = date("M");
$query = "SELECT month, year, SUM(quantity) as total_quantity, SUM(sales_amount) as total_sales from sales_transaction WHERE month = '". $month ."' GROUP by month";
$result = mysqli_query($connection, $query);
confirm_query($result);


$data = array();
foreach ($result as $row) {
  $data[] = $row;
}

mysqli_free_result($result);
print json_encode($data);
mysqli_close($connection);
?>
