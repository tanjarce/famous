<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';

if(isset($_POST['change_user'])){
  $u = $_POST['change_user'];
  $p = $_POST['change_pass'];

  $c_u = mysql_prep($u);
  $c_p =password_hash($p, PASSWORD_BCRYPT, ['cost' => 10]);

  $query = "UPDATE staff SET username = '". $c_u ."', password = '". $c_p ."' WHERE id = 1";
  confirm_query($query);
  echo "$query";
  $result = mysqli_query($connection, $query);
}

?>
