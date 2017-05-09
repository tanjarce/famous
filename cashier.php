<?php
require_once 'inc/connect.php';
include 'inc/fun.php';
session_start();

if(!isset($_SESSION["staff"])){
  $_SESSION["staff"] = false;
}
if (!isset($_SESSION['staff']) || $_SESSION['staff'] == false) {
  redirectTo("login.php");
}

?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Famous | CASHIER</title>
    <link rel="icon" href="counter_login_style/icon.png">
    <link rel="stylesheet" media="screen" href="counter_login_style/cashi.css">
    <link rel="stylesheet" media="print" href="counter_login_style/p_cash.css">
  </head>
  <body>
    <nav>
      <div class="logo">
        <span class="fa">Famous</span>|<span class="en">Enterprise</span>
      </div>
      <span class="ca">CASHIER</span>
      <a href="staff_logout.php">Logout</a>
    </nav>
    <!-- <h1><span>Famous</span>|<span>Enterprise</span></h1> -->
    <div class="casheir_wrapp">
      <div class="display_screen">
        <div class="total_and_change">Total : ₱&nbsp;<span class="total_amount">0.00</span></div>
        <div class="cash_wrapp">
          <label for="cash">Cash : </label>
          <input id="cash" type="number" name="" value="" placeholder="amount">
        </div>
        <div class="display_screen_val"></div>
      </div>
      <hr>
      <div class="input_wrapp">
        <div class="srch_item_wrapp">
          <span class="display_stock_left"></span>
          <label for="srch_item">Item</label>
          <input id="srch_item" type="text" name="" value="" placeholder="item search">
          <ul class="srch_item_list">

          </ul>
        </div>
        <div class="quantity_wrapp">
          <label for="quantity">Quantity</label>
          <input id="quantity" type="number" name="" value="" placeholder="quantity">
        </div>
      </div>
      <button class="pay" type="button" name="button">PAY</button>
      <button class="clear" type="button" name="button">CLEAR</button>
    </div>
    <div class="purchased_list">
      <div class="head">
        <span class="i">item</span>
        <span class="q">quantity</span>
        <span class="a">amount</span>
      </div>
      <div class="list"></div>
    </div>

    <div class="resibo"></div>

    <script src="counter_login_js/jquery.js" charset="utf-8"></script>
    <script src="counter_login_js/cashier_functio.js" charset="utf-8"></script>

  </body>

</html>
