<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';

function select_username() {
  global $connection;

  $query  = "SELECT * ";
  $query .= "FROM admin ";
  $query .= "LIMIT 1";
  $set = mysqli_query($connection, $query);
  confirm_query($set);
  if($admin = mysqli_fetch_assoc($set)) {
    return $admin;
  } else {
    return null;
  }
}

function attempt($pass) {
  $admin = select_username();
  if ($admin) {
    if (password_verify($pass, $admin["password"])) {
      echo "match";
    } else {
      echo "not match";
    }
  } else {
    return false;
  }
}




if(isset($_POST['admin_pass'])){
  $pass = $_POST['admin_pass'];

  attempt($pass);

}
?>
