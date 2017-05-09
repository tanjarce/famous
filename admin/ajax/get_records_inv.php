<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';


if (isset($_POST['m'])) {
  $srch = $_POST['s'];
  $month = $_POST['m'];
  $day = $_POST['d'];
  $year = $_POST['y'];

  $query = "SELECT * from  inventory_data WHERE item_name LIKE '%". $srch ."%' AND day = '". $day ."'AND month = '". $month ."' AND year='". $year ."'ORDER by id";
  $data = mysqli_query($connection, $query);

  $output ="";
  while ($row = mysqli_fetch_assoc($data)) {
    $output .= "<div class='item_row'>";
    $output .= "<span class='i'>". $row['item_name'] ."</span>";
    if ($row['reduction_or_increase'] > 0) {
      $output .= "<span class='inc'>+". $row['reduction_or_increase'] ."</span>";
    }
    else {
      $output .= "<span class='dec'>". $row['reduction_or_increase'] ."</span>";
    }
    $output .= "<span class='d'>". $row['month'] . " " . $row['day'] . ", " . $row['year'] . "</span>";
    $output .= "<span class='t'>" . $row['time'] . "</span>";
    $output .= "</div>";
  }
  mysqli_free_result($data);

  echo $output;
}
else {
  date_default_timezone_set('Asia/Manila');

  $month = date("M");
  $day = date("d");
  $year = date("Y");

  $query = "SELECT * from  inventory_data WHERE day = '". $day ."'AND month = '". $month ."' AND year='". $year ."'ORDER by id";
  $data = mysqli_query($connection, $query);

  $output ="";
  while ($row = mysqli_fetch_assoc($data)) {
    $output .= "<div class='item_row'>";
    $output .= "<span class='i'>". $row['item_name'] ."</span>";
    if ($row['reduction_or_increase'] > 0) {
      $output .= "<span class='inc'>+". $row['reduction_or_increase'] ."</span>";
    }
    else {
      $output .= "<span class='dec'>". $row['reduction_or_increase'] ."</span>";
    }
    $output .= "<span class='d'>". $row['month'] . " " . $row['day'] . ", " . $row['year'] . "</span>";
    $output .= "<span class='t'>" . $row['time'] . "</span>";
    $output .= "</div>";
  }
  mysqli_free_result($data);

  echo $output;

}
  mysqli_close($connection);
?>
