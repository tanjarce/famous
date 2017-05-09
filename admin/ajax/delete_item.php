<?php
require_once '../../inc/connect.php';

if (isset($_POST['item_id_delete'])) {
  $item = $_POST['item_id_delete'];

  $query = "DELETE FROM product_info WHERE item_id = ". $item ."";
  mysqli_query($connection, $query);

  echo $item;
}

?>
