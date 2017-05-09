<?php
$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "dbfamous";
$connection = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);

if(mysqli_connect_errno()){
  die("Failed to connect Database!: " . mysqli_connect_error() . "(" . mysqli_connect_errno() . ")");
}

?>
