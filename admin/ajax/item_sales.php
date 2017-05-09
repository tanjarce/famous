<?php
include '../../inc/fun.php';
require_once '../../inc/connect.php';

if (isset($_POST["side_id"])) {
  $month = $_POST['month'];
  $year = $_POST['year'];
  $side_id = $_POST['side_id'];

  // echo "$year";
  $query = "SELECT item_name, month, day, year, SUM(sales_amount) as total_sales from sales_transaction";
  $query .= " WHERE month = '". $month ."' AND year = '". $year ."' AND item_id = '". $side_id ."' ";
  $query .= "GROUP by day";
  $result = mysqli_query($connection, $query);
  confirm_query($result);

  $data = array();

  foreach ($result as $row) {
    $data[] = $row;
  }
  mysqli_free_result($result);
  print json_encode($data);
  mysqli_close($connection);

}
// else {
//   $month = date("M");
//   $year = date("Y");
//
//   $query = "SELECT month, day, year, SUM(sales_amount) as total_sales from sales_transaction WHERE month = '". $month ."' AND year = '". $year ."' GROUP by day";
//   $result = mysqli_query($connection, $query);
//   confirm_query($result);
//
//   $data = array();
//
//   foreach ($result as $row) {
//     $data[] = $row;
//   }
//   mysqli_free_result($result);
//   print json_encode($data);
//   mysqli_close($connection);
// }


?>
