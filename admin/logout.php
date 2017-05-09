<?php
include '../inc/fun.php';
include '../inc/header.php';

if (!isset($_SESSION["admin"]) || $_SESSION["admin"] !== true) {
  redirectTo("../login.php");
}

$_SESSION["admin"] = false;
redirectTo("manage.php");
?>
