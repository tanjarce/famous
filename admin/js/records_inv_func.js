$(document).ready(function () {
  initial_table();
  function initial_table() {
    $.ajax({
      type: "GET",
      url: "./ajax/get_records_inv.php",
      success: function (data) {
        $(".table_list").html(data);
      }
    })
  }
  $(".print").click(function () {
    window.print();
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

  function post_req() {
    var srch = $(".srch").val();
    var month = $(".month").val();
    var day = $(".day").val();
    var year = $(".year").val();

    $.ajax({
      type: "POST",
      url: "./ajax/get_records_inv.php",
      data: {s: srch, m: month, d: day, y: year},
      success: function (data) {
        put_in_table(data)
      },
      error: function (data) {
        alert("something went wrong!")
        window.refresh();
      }

    })

    function put_in_table(as) {
      if (as.length != 0) {
        $(".table_list").html(as);
      } else {
        $(".table_list").html("<div class='no'>No records found.</div>");
      }

    }
  }

  $(".srch").keyup(function () {
    if ($(this).val() == 'All') {
      $(".day").val("All");
    }
    post_req();
  })
  $(".month").change(function () {
    if ($(this).val() == 'All') {
      $(".day").val("All");
    }
    post_req();
  })
  $(".day").change(function () {
    post_req();
  })
  $(".year").change(function () {
    post_req();
  })




})
