<?php
require_once '../inc/connect.php';
include '../inc/header.php';
include '../inc/fun.php';

if (!isset($_SESSION['admin']) || $_SESSION['admin'] === false) {
  redirectTo("../login.php");
}
?>
  <link rel="stylesheet" media="screen" href="style/records_inv_d.css">
  <link rel="stylesheet" media="print" href="style/p_records_inv_de.css">
  </head>
  <body>
    <header>
      <h1>Inventory History</h1>
      <a class="back" href="manage.php">❮ Back</a>

    </header>
    <div class="filter">
      <input class='srch' type="text" name="" value="" placeholder="Search item or brand ">
      <button class="print" type="button" name="button">PRINT</button>
      <div class="date">
        <span class="ddate">Date: </span>
        <select class="month"></select>
        <select class="day" ></select>
        <select class="year" ></select>
      </div>
    </div>

    <div class="inv_table">
      <div class="table_head"><span class="i">Item</span><span class="i_d">Inc/Dec</span><span class="d">Date</span><span class="t">Time</span></div>
      <div class="table_list">
      </div>
      <div class="total"></div>
    </div>
    <script src="js/jquery.min.js" charset="utf-8"></script>
    <script src="js/records_inv_func.js" charset="utf-8"></script>
  </body>
</html>
