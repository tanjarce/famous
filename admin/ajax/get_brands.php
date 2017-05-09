<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';

$query = "SELECT DISTINCT brand from product_info";
$data = mysqli_query($connection, $query);
confirm_query($data);
  echo "<li class='brand'> All </li>";
while ($row = mysqli_fetch_assoc($data)) {
  echo "<li class='brand'>". $row['brand'] ."</li>";
};




?>
