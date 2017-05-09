<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';

$month = date("M");
$day = date("d");
$query = "SELECT month, day, year, SUM(quantity) as total_quantity, SUM(sales_amount) as total_sales from sales_transaction WHERE month = '". $month ."' AND day = ". $day ." GROUP by day";
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
