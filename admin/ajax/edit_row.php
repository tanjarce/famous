<?php
header("Content_Type: application/jason");
require_once '../../inc/connect.php';
include '../../inc/fun.php';
session_start();

$query = "SELECT DISTINCT category from product_info";

$result = mysqli_query($connection, $query);
confirm_query($result);

$data = array();
foreach ($result as $row) {
  $data[] = $row;
}

$query = "SELECT DISTINCT brand from product_info";

$result = mysqli_query($connection, $query);
confirm_query($result);

foreach ($result as $row) {
  $data[] = $row;
}

mysqli_free_result($result);
print json_encode($data);

mysqli_close($connection);
?>
