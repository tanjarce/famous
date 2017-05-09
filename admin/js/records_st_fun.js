$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "./ajax/get_records_sales_daily.php",
    success: function (data) {
      $(".table_list").html(data);
    }
  })
  get_year();
  function get_year() {
    $.ajax({
      type: "GET",
      url: "./ajax/get_year.php",
      success: function (data) {
        $(".year").html(data);
      }
    })
  }
  day();
  function day() {
    var date = new Date();
    var thisday = date.getDate();
    days = "";
    for (var i = 1; i <= 31; i++) {
      if (i === thisday) {
        days += "<option val='"+ i +"' selected>"+ i +"</option>";
      } else {
        days += "<option val='"+ i +"'>"+ i +"</option>";
      };
    }
    $(".day").html(days);
  }
  month();
  function month() {
    var date = new Date();
    var thismonth = date.getMonth();
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var m = "";
    for (var i = 0; i < month.length; i++) {
      if (i == thismonth) {
        m += "<option val='"+ month[i] +"' selected>"+ month[i] +"</option>";
      }
      else {
        m += "<option val='"+ month[i] +"'>"+ month[i] +"</option>";
      }
    }
    $(".month").html(m)
  }

  function post_req_d() {
    var srch = $(".srch").val();
    var month = $(".month").val();
    var day = $(".day").val();
    var year = $(".year").val();

    $.ajax({
      type: "POST",
      url: "./ajax/get_records_sales_daily.php",
      data: {s: srch, m: month, d: day, y: year},
      success: function (data) {
        put_in_table(data)
      },
      error: function (data) {
        alert("something went wrong!")
        window.location.reload();
      }

    })

    function put_in_table(as) {
      if (as.length != 0) {
        $(".table_list").html(as);
      } else {
        $(".table_list").html("No records found.");
      }

    }
  }
  function post_req_m() {
    var srch = $(".srch").val();
    var month = $(".month").val();
    var year = $(".year").val();

    $.ajax({
      type: "POST",
      url: "./ajax/get_records_sales_monthly.php",
      data: {s: srch, m: month, y: year},
      success: function (data) {
        put_in_table(data)
      },
      error: function (data) {
        alert("something went wrong!")
        window.location.reload();
      }

    })

    function put_in_table(as) {
      if (as.length != 0) {
        $(".table_list").html(as);
      } else {
        $(".table_list").html("No records found.");
      }

    }
  }
  function post_req_a() {
    var srch = $(".srch").val();
    var year = $(".year").val();

    $.ajax({
      type: "POST",
      url: "./ajax/get_records_sales_annually.php",
      data: {s: srch, y: year},
      success: function (data) {
        put_in_table(data)
      },
      error: function (data) {
        alert("something went wrong!")
        window.location.reload();
      }

    })

    function put_in_table(as) {
      if (as.length != 0) {
        $(".table_list").html(as);
      } else {
        $(".table_list").html("No records found.");
      }

    }
  }

  $(".srch").keyup(function () {
    if ($(".set").val() == "d") {
      post_req_d();
    }
    else if ($(".set").val() == "m") {
      post_req_m();
    }
    else if ($(".set").val() == "a") {
      post_req_a();
      console.log("asd");
    }
  })
  $(".month").change(function () {
    if ($(".set").val() == "d") {
      post_req_d();

    }
    else if ($(".set").val() == "m") {
      post_req_m();
    }
    else if ($(".set").val() == "a") {
      post_req_a();
    }
  })
  $(".day").change(function () {
    if ($(".set").val() == "d") {
      post_req_d();
    }
    else if ($(".set").val() == "m") {
      post_req_m();
    }
    else if ($(".set").val() == "a") {
      post_req_a();
    }
  })
  $(".year").change(function () {
    if ($(".set").val() == "d") {
      post_req_d();
    }
    else if ($(".set").val() == "m") {
      post_req_m();
    }
    else if ($(".set").val() == "a") {
      post_req_a();
    }
  })
  $(".set").change(function () {
    var val = $(this).val();
    if(val == "d"){
      $(".srch").show(200);
      $(".day").attr("hidden", false);
      $(".month").attr("hidden", false);
      $(".year").attr("hidden", false);
      $(".table_head").addClass("daily");
      $(".table_head").removeClass("annualy","");
      $(".table_head").removeClass("monthly", "");
      $(".table_head").html("<span class='i'>Item</span><span class='q'>Quantity</span><span class='s'>Sales</span><span class='d'>Date</span><span class='t'>Time</span>");
      post_req_d();

    }
    else if (val == "m") {
      $(".srch").hide(200);
      $(".day").attr("hidden", true);
      $(".month").attr("hidden", false);
      $(".year").attr("hidden", false);
      $(".table_head").removeClass("daily","");
      $(".table_head").removeClass("annualy","");
      $(".table_head").addClass("monthly");
      $(".table_head").html("<span class='d'>Date</span><span class='q'>Quantity</span><span class='s'>Sales</span>");
      post_req_m();
    }
    else if (val == "a") {
      $(".srch").hide(200);
      $(".day").attr("hidden", true);
      $(".month").attr("hidden", true);
      $(".year").attr("hidden", false);
      $(".table_head").removeClass("daily","");
      $(".table_head").addClass("annualy");
      $(".table_head").removeClass("monthly", "");
      $(".table_head").html("<span class='m'>Month</span><span class='q'>Quantity</span><span class='s'>Sales</span>");
      post_req_a();
    }
  })
  $(document).on("click", ".monthly_list", function () {
    var id = $(this).attr("id");
    $("#d_"+id).slideToggle(200);
  });
  $(document).on("click", ".annualy_list", function () {
    var id = $(this).attr("id");
    $("#d_"+id).slideToggle(200);
  });

  $(".print").click(function () {
    window.print();
  })
})
