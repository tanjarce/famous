<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';

$query = "SELECT item_id, item_name, brand, stock, max_stock_quantity FROM product_info ";
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
