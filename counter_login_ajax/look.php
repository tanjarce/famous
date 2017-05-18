<?php
require_once '../inc/connect.php';
include '../inc/fun.php';
if(isset($_POST["bra"])){
  $b = $_POST["bra"];
  $c = $_POST["cat"];
  if($b == "brand"){
    $b = "";
  }
  if($c == "category"){
    $c = "";
  }

  $query = "SELECT * FROM product_info WHERE brand LIKE '%". $b ."%' AND category LIKE '%". $c ."%'";
  $result = mysqli_query($connection, $query);
  confirm_query($result);
  $output = "";
  while ($row = mysqli_fetch_assoc($result)) {
    $output .= "<div class='row_lu'><span class='lu_item'>". $row['item_name'] ." | ". $row['brand'] ."</span><span class='lu_price'><span>₱</span>". $row['price'] ."</span></div>";
  };
  echo $output;
}

else{
  $query = "SELECT * FROM product_info";
  $result = mysqli_query($connection, $query);
  confirm_query($result);
  $output = "";
  while ($row = mysqli_fetch_assoc($result)) {
    $output .= "<div class='row_lu'><span class='lu_item'>". $row['item_name'] ." | ". $row['brand'] ."</span><span class='lu_price'><span>₱</span>". $row['price'] ."</span></div>";
  };

  echo $output;
}
mysqli_free_result($result);
mysqli_close($connection);
?>
