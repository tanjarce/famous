<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';

$query = "SELECT DISTINCT category from product_info";
$data = mysqli_query($connection, $query);
confirm_query($data);
  echo "<li class='category'> All </li>";
while ($row = mysqli_fetch_assoc($data)) {
  echo "<li class='category'>". $row['category'] ."</li>";
};

?>
