<?php
require_once '../inc/connect.php';
include '../inc/header.php';
include '../inc/fun.php';

if (!isset($_SESSION['admin']) || $_SESSION['admin'] === false) {
  redirectTo("../login.php");
}
?>
<link rel="stylesheet" media="screen" href="style/records_st_desi.css">
<link rel="stylesheet" media="print" href="style/p_records_st_design.css">
</head>
<body>

  <header>
    <h1>Sales & Transaction History</h1>
    <a class="back" href="manage.php">❮ Back</a>
  </header>

  <div class="filter">
    <input class='srch' type="text" name="" value="" placeholder="Search item or brand ">
    <button class="print" type="button" name="button">PRINT</button>
    <div class="date_con">
      <div class="set_container">
        <select class="set" name="">
          <option value="d">Daily</option>
          <option value="m">Monthly</option>
          <option value="a">Annually</option>
        </select>
      </div>
      <div class="date">
        <select class="month"></select>
        <select class="day" ></select>
        <select class="year" ></select>
      </div>
    </div>
  </div>

  <div class="inv_table">
    <div class="table_head daily"><span class='i'>Item</span><span class='q'>Quantity</span><span class='s'>Sales</span><span class='d'>Date</span><span class='t'>Time</span></div>
    <div class="table_list">


    </div>
  </div>
  <script src="js/jquery.min.js" charset="utf-8"></script>
  <script src="js/records_st_fun.js" charset="utf-8"></script>

</body>
</html>
