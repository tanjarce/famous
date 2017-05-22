<?php
require_once '../inc/connect.php';
include '../inc/header.php';
include '../inc/fun.php';

if (!isset($_SESSION['admin']) || $_SESSION['admin'] === false) {
  redirectTo("../login.php");
}

?>


  <link rel="stylesheet" href="style/main_desenyooo.css">
  </head>
  <body>
      <div class="pangharang"></div>

      <span class="mata" title="Sales Monitor"></span>
      <span id="add_btn" title="Add Item">&plus;</span>

      <div class="notifications_wrapper" style="z-index: 99999999999"></div>

      <div class="add_item_wrapper">
        <!-- <span class="close_btn" >&times;</span> -->
        <div class="fields" id="form">
          <span>Item:</span><input class="item_name field" type="text" name="" value="" placeholder="item name">
          <span>Category:</span><span class="item_category_wrapper"><select class="add_item_category  field" name=""></select></span>
          <span>Brand:</span><span class="item_brand_wrapper"><select class="add_item_brand  field" name=""></select></span>
          <span>Price:</span><input class="item_price field" type="number" name="" value="" placeholder="item price">
          <span>Quantity:</span><input class="item_quantity field" type="number" name="" value="" placeholder="item quantity">
          <button class="add_item_btn" type="button">ADD ITEM</button>
          <button class="cancel_btn" type="button" name="button">CANCEL</button>
          <div class="loader_wrapper"><span class="add_err"></span><div class="load"></div></div>
        </div>
      </div>

      <div class="navigator_wrapper">
        <div class="famous_logo"><span class="fa">Famous</span>|<span class="en">Enterprise</span></div>

        <input id='search_item' type="text" name="" value="" placeholder="Search item...">
        <div class="records_wrapper">
          <span>History</span>
          <span class="rec_icon"></span>
          <ul>
            <li><a href="records_inventory.php" target="_blank">Inventory</a></li>
            <li><a href="records_sales&transactions.php" target="_blank">Sales & Transactions</a></li>
          </ul>
        </div>
        <div id="notif" class="notification">
          <span>Notifications</span>
          <span class="notif_icon"></span>
          <span class='notification_number'></span>
          <div class="notifications_list_wrapp">
            <ul class="notifications_list">
            </ul>
          </div>
        </div>
        <hr>
        <div class="account">
          <span>Account▾</span>
          <div class="options">
            <ul>
              <li class="a_s"><a class="a_s">Account Settings</a>
                  <li class="c_s">change staff account</li>
                  <li class="c_a">change admin account</li>
              </li>
              <li><a class="logout" href="logout.php">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="filters_wrapper">
        <div class="filter_icon"></div>
        <div class="category_btn"><span id="category_value">Category</span><ul id="category_list"></ul><span id="arrow">▾</span></div>
        <div class="brand_btn"><span id="brand_value">Brand</span><ul id="brand_list"></ul><span id="arrow">▾</span></div>
      </div>

      <div class="item_list_wrapper">
        <div class="item_head">
          <span class='head h_item'>Item</span>
          <span class='head h_categ'>Category</span>
          <span class='head h_brand'>Brand</span>
          <span class='head h_price'>Price</span>
          <span class='head h_avail'>Availble</span>
          <!-- <span class='head h_stock'>Stock</span> -->
          <span class='head h_status'>Inventory Status</span>
          <!-- <span class='head h_capacity'>Capacity</span> -->
          <span class='head h_action'></span>
        </div>
        <div class="item_list"></div>
      </div>

      <div class="sales_wrapper">
        <!-- <div class="chart_title"> -->
          <h2 class="chart_title"><span class="mon"></span> <span class="ye"></span> Sales </h2>
        <!-- </div> -->

        <div class="total_sales_wrapper">
          <div class="sales_chart_wrapper">
            <canvas id="sales_Chart" width="300" height="50"></canvas>
          </div>
          <div class="head">
            <h1>Total Sales:</h1>
            <div class="date">
              <span class="m"></span> <span class="d"></span>, <span class="y"></span> |
              <span class="h"></span>:<span class="mn"></span> <span class="a"></span>

            </div>
          </div>
          <div class="total">
            <div class="total_sales_year">
              <div class="value">
                <span class="asd">₱</span>
                <span class="total_sales_year_val"></span>
                <h6>this year</h6>
              </div>
            </div>
            <hr>
            <div class="total_sales_month">
              <div class="value">
                <span class="asd">₱</span>
                <span class="total_sales_month_val"></span>
                <h6>this month</h6>
              </div>
            </div>
            <hr>
            <div class="total_sales_day">
              <div class="value">
                <span class="asd">₱</span>
                <span class="total_sales_day_val"></span>
                <h6>this day</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="c_a_s">
        <div class="form_holder">
          <span class='ex'>&times;</span>
          <header>
            Change Staff Account
          </header>
          <label for="n_u">New staff username</label>
          <input class="staff_input" id="n_u" type="username" name="" value="" placeholder="new username">
          <label for="n_p">New staff password</label>
          <input class="staff_input" id="n_p" type="password" name="" value="" placeholder="new password">
          <label for="r_n_p">Retype new staff password</label>
          <input class="staff_input" id="r_n_p" type="password" name="" value="" placeholder="retype password">
          <p>to make sure that you are the admin, please type admin's password.</p>
          <input class="staff_input" id="a_p" type="password" name="" value="" placeholder="admin's password">
          <button id="staff_change_button" type="button" name="button">Change</button>
        </div>
      </div>

      <div class="c_a_a">
        <div class="form_holder">
          <span class='ex_a'>&times;</span>
          <header>
            Change Admin Account
          </header>
          <label for="n_u_a">New admin username</label>
          <input class="admin_input" id="n_u_a" type="username" name="" value="" placeholder="new username">
          <label for="n_p_a">New admin password</label>
          <input class="admin_input" id="n_p_a" type="password" name="" value="" placeholder="new password">
          <label for="r_n_p_a">Retype new admin password</label>
          <input class="admin_input" id="r_n_p_a" type="password" name="" value="" placeholder="retype password">
          <p>to make sure that you are the admin, please type admin's password.</p>
          <input class="admin_input" id="a_p_a" type="password" name="" value="" placeholder="admin's password">
          <button id="admin_change_button" type="button" name="button">Change</button>
        </div>
      </div>

      <script src="js/jquery.min.js" charset="utf-8"></script>
      <script src="js/Chart.min.js" charset="utf-8"></script>
      <script src="js/outclick.min.js" charset="utf-8"></script>
        <script src="js/sales_chart.js" charset="utf-8"></script>
      <!-- <script src="js/total_sales_fun.js" charset="utf-8"></script> -->
      <script src="js/mainFunctionssssss.js" charset="utf-8"></script>
      <!-- <script src="js/main2.js" charset="utf-8"></script> -->
      <!-- <script src="js/side.js" charset="utf-8"></script> -->
    <script src="js/check_chnges_inve.js" charset="utf-8"></script>
    </body>
    </html>
