<?php
session_start();
if(!isset($_SESSION["admin"])){
  $_SESSION["admin"] = false;
}
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>famous | ADMIN</title>
    <link rel="icon" href="style/iconadmin.png">
