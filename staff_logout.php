<?php
require_once 'inc/connect.php';
include 'inc/fun.php';
session_start();

if (!isset($_SESSION["staff"]) || $_SESSION["staff"] !== true) {
  redirectTo("login.php");
}

$_SESSION['staff'] = false;
redirectTo("cashier.php")

?>
