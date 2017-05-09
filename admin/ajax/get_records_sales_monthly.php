<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';


if (isset($_POST['m'])) {
  $srch = $_POST['s'];
  $month = $_POST['m'];
  $year = $_POST['y'];

  $output ="";
  $total_s = 0;
  $total_q = 0;

  $query = "SELECT *, SUM(sales_amount) as total_sales, SUM(quantity) as total_quantity from sales_transaction WHERE month = '". $month ."' AND year='". $year ."' GROUP by day ORDER by transaction_id";
  $data = mysqli_query($connection, $query);

  while ($row = mysqli_fetch_assoc($data)) {
    $output .= "<div class='monthly_list' id='". $row['month'] . $row['day'] . $row['year'] ."'>";
      $output .= "<span class='arrow'>▾</span>";
      $output .= "<span class='d'>". $row['month'] . " " . $row['day'] . ", " . $row['year'] . "</span>";
      $output .= "<span class='q'>". $row['total_quantity'] ."</span>";
      $total_q += $row["total_quantity"];
      $output .= "<span class='s'>₱ ". $row['total_sales'] ."</span>";
      $total_s += $row["total_sales"];
    $output .= "</div>";

    $query2 = "SELECT * , SUM(sales_amount) as total_sales2, SUM(quantity) as total_quantity2 ";
    $query2 .= "from sales_transaction ";
    $query2 .= "WHERE month = '". $row['month'] ."'";
    $query2 .= " AND day='". $row['day'] ."'";
    $query2 .= " AND year='". $row['year'] ."'";
    // $query2 .= " AND item_id = '". $row['item_id'] ."'";
    $query2 .= " GROUP by item_id";
    $query2 .= " ORDER by transaction_id";
    $data2 = mysqli_query($connection, $query2);

    $output .= "<div class='detail d_monthly' id='d_". $row['month'] . $row['day'] . $row['year'] ."' >";
    while ($row2 = mysqli_fetch_assoc($data2)) {
      $output .= "<div class='detail_row'>";
        $output .= "<span class='d_d'>". $row2['month'] . " " . $row2['day'] . ", " . $row2['year'] . "</span>";
        $output .= "<span class='d_n'>". $row2['item_name'] ."</span>";
        $output .= "<span class='d_q'>". $row2['total_quantity2'] ."</span>";
        $output .= "<span class='d_s'>₱ ". $row2['total_sales2'] ."</span>";
      $output .= "</div>";
    }
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

// else {
//
//   date_default_timezone_set('Asia/Manila');
//
//   $month = date("M");
//   $day = date("d");
//   $year = date("Y");
//
//   $output ="";
//   $total_s = 0;
//   $total_q = 0;
//
//   $query = "SELECT *, SUM(sales_amount) as total_sales, SUM(quantity) as total_quantity from sales_transaction WHERE day = '". $day ."' AND month = '". $month ."' AND year='". $year ."' GROUP by day ORDER by transaction_id";
//   $data = mysqli_query($connection, $query);
//
//   while ($row = mysqli_fetch_assoc($data)) {
//     $output .= "<div class='monthly_list' i_d='". $row['item_id'] ."' m='". $month ."' d='". $day ."' y='". $year ."'>";
//       $output .= "<span class='d'>". $row['month'] . " " . $row['day'] . ", " . $row['year'] . "</span>";
//       $output .= "<span class='q'>". $row['total_quantity'] ."</span>";
//       $total_q += $row["total_quantity"];
//       $output .= "<span class='s'>₱ ". $row['total_sales'] ."</span>";
//       $total_s += $row["total_sales"];
//     $output .= "</div>";
//
//     $query2 = "SELECT * from sales_transaction ";
//     $query2 .= "WHERE day = '". $day ."'";
//     $query2 .= " AND month = '". $month ."'";
//     $query2 .= " AND year='". $year ."'";
//     $query2 .= " AND item_id = '". $row['item_id'] ."'";
//     $query2 .= " ORDER by transaction_id";
//     $data2 = mysqli_query($connection, $query2);
//
//     $output .= "<div class='detail_row' id='detail_". $row['item_id'] ."'>";
//     while ($row2 = mysqli_fetch_assoc($data2)) {
//       $output .= "<div class='detail_row'>";
//         $output .= "<span class='d_n'>". $row['item_name'] ."</span>";
//         $output .= "<span class='d_q'>". $row2['quantity'] ."</span>";
//         $output .= "<span class='d_s'>₱ ". $row2['sales_amount'] ."</span>";
//         $output .= "<span class='d_d'>". $row['month'] . " " . $row2['day'] . ", " . $row2['year'] . "</span>";
//         $output .= "<span class='d_t'>". $row['time'] ."</span>";
//       $output .= "</div>";
//     }
//     $output .= "</div>";
//   }
//
//   $total = "<div class='total'><span class='total_s'>Total Quantity: ". $total_q ."</span><span class='total_s'>Total Sales: ₱ ". $total_s ."</span></div>";
//   mysqli_free_result($data);
//   mysqli_free_result($data2);
//
//   if ($output == null) {
//     $output = "<div class='no'>No Records.</div>";
//   }
//   echo $output;
//   echo $total;
// }

  mysqli_close($connection);
?>
