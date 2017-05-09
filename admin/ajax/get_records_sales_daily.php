<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';


if (isset($_POST['m'])) {
  $srch = $_POST['s'];
  $month = $_POST['m'];
  $day = $_POST['d'];
  $year = $_POST['y'];

  $output ="";
  $total_s = 0;
  $total_q = 0;

  $query = "SELECT * FROM sales_transaction ";
  $query .= "WHERE item_name LIKE '%". $srch ."%' ";
  $query .= "AND month = '". $month ."' ";
  $query .= "AND day = '". $day ."' ";
  $query .= "AND year = '". $year ."' ";
  // $query .= "AND (item_name LIKE '%". $srch ."%') ";
  // $query .= "OR (brand LIKE '%". $srch ."%') ";
  $query .= "ORDER by item_id";

  $data = mysqli_query($connection, $query);

  while ($row = mysqli_fetch_assoc($data)) {
    $output .= "<div class='daily_list'>";
      $output .= "<span class='i'>". $row['item_name'] ."</span>";
      $output .= "<span class='q'>". $row['quantity'] ."</span>";
      $total_q += $row["quantity"];
      $output .= "<span class='s'>₱ ". $row['sales_amount'] ."</span>";
      $total_s += $row["sales_amount"];
      $output .= "<span class='d'>". $row['month'] . " " . $row['day'] . ", " . $row['year'] . "</span>";
      $output .= "<span class='t'>". $row['time'] . "</span>";
    $output .= "</div>";
  }

  $total = "<div class='total'><span class='total_s'>Total Quantity: ". $total_q ."</span><span class='total_s'>Total Sales: ₱ ". $total_s ."</span></div>";
  mysqli_free_result($data);

  if ($output == null) {
    $output = "<div class='no'>No Records.</div>";
  }
  echo $output;
  echo $total;
}

else {

  date_default_timezone_set('Asia/Manila');

  $month = date("M");
  $day = date("d");
  $year = date("Y");

  $output ="";
  $total_s = 0;
  $total_q = 0;

  $query = "SELECT * FROM sales_transaction ";
  $query .= "WHERE month = '". $month ."'";
  $query .= "AND day = '". $day ."' ";
  $query .= "AND year = '". $year ."' ";
  $query .= "ORDER by item_id";

  $data = mysqli_query($connection, $query);

  while ($row = mysqli_fetch_assoc($data)) {
    $output .= "<div class='daily_list'>";
      $output .= "<span class='i'>". $row['item_name'] ."</span>";
      $output .= "<span class='q'>". $row['quantity'] ."</span>";
      $total_q += $row["quantity"];
      $output .= "<span class='s'>₱ ". $row['sales_amount'] ."</span>";
      $total_s += $row["sales_amount"];
      $output .= "<span class='d'>". $row['month'] . " " . $row['day'] . ", " . $row['year'] . "</span>";
      $output .= "<span class='t'>". $row['time'] . "</span>";
    $output .= "</div>";
  }

  $total = "<div class='total'><span class='total_s'>Total Quantity: ". $total_q ."</span><span class='total_s'>Total Sales: ₱ ". $total_s ."</span></div>";
  mysqli_free_result($data);

  if ($output == null) {
    $output = "<div class='no'>No Records.</div>";
  }
  echo $output;
  echo $total;
}

  mysqli_close($connection);
?>
