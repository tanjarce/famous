<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';

$query = "SELECT DISTINCT year from inventory_data";
$data = mysqli_query($connection, $query);
confirm_query($data);
while ($row = mysqli_fetch_assoc($data)) {
  echo "<option>". $row['year'] ."</option>";
};

?>
