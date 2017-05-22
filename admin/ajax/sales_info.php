<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';


if (isset($_POST['item_id'])) {
    date_default_timezone_set('Asia/Manila');

    $month = date("M");
    $day = date("d");
    $year = date("Y");
    $id = $_POST['item_id'];

    $output ="";
    $total_s = 0;
    $total_q = 0;

    $query = "SELECT * FROM sales_transaction ";
    $query .= "WHERE month = '". $month ."'";
    $query .= "AND day = '". $day ."' ";
    $query .= "AND year = '". $year ."' ";
    $query .= "AND item_id = ". $id ." ";
    $query .= "ORDER by item_id";

    $data = mysqli_query($connection, $query);

    while ($row = mysqli_fetch_assoc($data)) {
        $total_q += $row["quantity"];
        $total_s += $row["sales_amount"];
    }
    $total = "<span class='total_s'>Total Sales: ₱ ". $total_s ."</span><hr><span class='total_q'>Total Quantity: ". $total_q ."</span>";
    mysqli_free_result($data);

    if ($output == null) {
      $output = "<div class='no'>No Records.</div>";
    }
    echo $total;
}
  mysqli_close($connection);
?>
