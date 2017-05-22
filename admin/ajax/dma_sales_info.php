<?php
require_once '../../inc/connect.php';
include '../../inc/fun.php';


if (isset($_POST['set'])) {
    //
    $set = $_POST['set'];
    $month = $_POST['m'];
    $day = $_POST['d'];
    $year = $_POST['y'];
    $id = $_POST['item_id'];
    $total_s = 0;
    $total_q = 0;

    switch ($set) {
      case 'd':
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
        break;

      case 'm':
        $query = "SELECT * FROM sales_transaction ";
        $query .= "WHERE month = '". $month ."'";
        $query .= "AND year = '". $year ."' ";
        $query .= "AND item_id = ". $id ." ";
        $query .= "ORDER by item_id";

        $data = mysqli_query($connection, $query);

        while ($row = mysqli_fetch_assoc($data)) {
            $total_q += $row["quantity"];
            $total_s += $row["sales_amount"];
        }
        break;

      case 'a':
        $query = "SELECT * FROM sales_transaction ";
        $query .= "WHERE year = '". $year ."' ";
        $query .= "AND item_id = ". $id ." ";
        $query .= "ORDER by item_id";

        $data = mysqli_query($connection, $query);

        while ($row = mysqli_fetch_assoc($data)) {
            $total_q += $row["quantity"];
            $total_s += $row["sales_amount"];
        }
        break;

      default:
        # code...
        break;
    }


    //
    // $total_s = 0;
    // $total_q = 0;
    //
    // $query = "SELECT * FROM sales_transaction ";
    // $query .= "WHERE month = '". $month ."'";
    // $query .= "AND day = '". $day ."' ";
    // $query .= "AND year = '". $year ."' ";
    // $query .= "AND item_id = ". $id ." ";
    // $query .= "ORDER by item_id";
    //
    // $data = mysqli_query($connection, $query);
    //
    // while ($row = mysqli_fetch_assoc($data)) {
    //     $total_q += $row["quantity"];
    //     $total_s += $row["sales_amount"];
    // }
    $total = "<span class='total_s'>Total Sales: ₱ ". $total_s ."</span><span class='total_s'>Total Quantity: ". $total_q ."</span>";
    mysqli_free_result($data);
    echo $total;
    //
    // if ($output == null) {
    //   $output = "<div class='no'>No Records.</div>";
    // }
    // echo $set;
    // echo $id;
    // echo $month;
    // echo $day;
    // echo $year;
}
  mysqli_close($connection);
?>
