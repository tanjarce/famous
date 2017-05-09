$(document).ready(function () {
  $(".notification_number").hide();
  var shit = setInterval(function () {
    auto_check()
  }, 5000);

  var forward = false;
    $(".mata").click(function () {
      var phase = 0;
      if (forward == false) {
        clearInterval(shit);
        var pluss = setInterval(function plus() {
          phase ++;
          if(phase == 1){
            $("#search_item").addClass("hide_search");
            $(".item_list_wrapper").addClass("hide");
            $(".filters_wrapper").addClass("hide_filter");
          }
          else if (phase == 2) {
            $(".total_sales_wrapper").css({"bottom": "0"})
          }
          else if (phase == 3) {
            $(".total").addClass("upp")
            $(".head").addClass("showw")
            $(".chart_title").addClass("down")
            forward = true;
            clearInterval(pluss);
          }
        }, 250);
      }

      else if (forward == true) {
        auto_check()
        shit = setInterval(function () {
          auto_check()
        }, 5000)
        var pluss = setInterval(function plus() {
          phase ++;
          if(phase == 1){
            $(".chart_title").removeClass("down", "")
            $(".total_sales_wrapper").css({"bottom": "-300px"})
          }
          else if (phase == 2) {
            $("#search_item").removeClass("hide_search", "");
            $(".item_list_wrapper").removeClass("hide", "");
            $(".filters_wrapper").removeClass("hide_filter", "");
            $(".total").removeClass("upp", "")
            $(".head").removeClass("showw", "")
            forward = false;
            clearInterval(pluss);
          }
        }, 250);
      }
    })



////////////////////////////////////////////////

  auto_check();

  function auto_check() {
    $.ajax({
      type: "GET",
      url: "./ajax/check_inventory.php",
      timeout: 4000,
      success: function (data) {
        data = data.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
        data = data.replace(/[\u0000-\u0019]+/g,"");
        data = JSON.parse(data);
        check_changes(data);
        compare_two_array(data)
      },
      error: function(request, status, err) {
          if (status == "timeout") {
              console.log("timeout");
              window.location.reload();
          } else {
            window.location.reload();
          }
      }
    })
  }
  var display_notification = {
    notification_list: "",
    notification_number: 0,
  };

  function compare_two_array(ew) {
    var ipangkukumapara =
      {
        notification_list: "",
        notification_number: 0,
      };
    for (var i in ew) {
      var percent = ew[i].stock/ew[i].max_stock_quantity*100;
      if(percent <= 20){
        ipangkukumapara.notification_list += "<li class='list_notif'><b><span class='ntf_brnd'>"+ ew[i].brand +"</span> | <span class='ntf_name'>"+ ew[i].item_name +"</span></b> only have "+ ew[i].stock +" stocks left! </li>";
        ipangkukumapara.notification_number++;
      }
      if (i == ew.length-1) {
        if (display_notification.notification_number !== ipangkukumapara.notification_number && display_notification.notification_list !== ipangkukumapara.notification_list) {
          display_notification.notification_number = ipangkukumapara.notification_number;
          display_notification.notification_list = ipangkukumapara.notification_list;
          if (display_notification.notification_number > 0) {
            if (display_notification.notification_number >= 10) {
              $(".notification_number").fadeIn(100).html("9<sup style='font-size: 10px; position: relative; top: -1px'>+</sup>");
              $(".notifications_list").html(display_notification.notification_list);
            }
            else {
              $(".notification_number").fadeIn(100).html(display_notification.notification_number);
              $(".notifications_list").html(display_notification.notification_list);
            }
          }
          else {
            $(".notification_number").fadeOut(100);
            $(".notifications_list").html("<li>No notification</li>");
          }
        }
      }
    }
  }

  if(display_notification.length == 0){
    $(".notification_number").fadeOut(100);
    $(".notifications_list").html("<li>No notification</li>");
  }



  function check_changes(ye){
    for(var i in ye){
      if($("#stock_"+ye[i].item_id).text() != ye[i].stock || $("#capacity_"+ye[i].item_id).text() != ye[i].max_stock_quantity){
        change_bar_width_n_stock(ye[i].item_id, ye[i].stock, ye[i].max_stock_quantity);
      }
    }
  }
  function change_bar_width_n_stock(fu, fa, fo) {
    if($("#update_inv_"+fu).css("display") == "none"){
      $("#stock_"+fu).text(fa);
      $("#capacity_"+fu).text(fo);
      var percent = parseInt($("#stock_"+fu).text())/parseInt($("#capacity_"+fu).text())*100
      // console.log(percent);
      $("#bar_"+fu).css({"width": percent+"%"});
      $("#update_bar_"+fu).css({"width": percent+"%"});
      if (percent <= 20) {
        $("#bar_"+fu).parent().addClass("critical");
        $("#bar_"+fu).addClass("critical_bar");
      }else {
        $("#bar_"+fu).parent().removeClass("critical", "");
        $("#bar_"+fu).removeClass("critical_bar", "");
      }
    }
  }

/////////////////////////////////////////////////


$(document).ready(function () {

  var check = setInterval(function () {
      kunin_ang_datas();
    }, 5000)

    function kunin_ang_datas() {
      $.ajax({
        type: "GET",
        url: "./ajax/total_sales_val.php",
        timeout: 4000,
        success: function (data) {
          data = data.replace(/\\n/g, "\\n")
          .replace(/\\'/g, "\\'")
          .replace(/\\"/g, '\\"')
          .replace(/\\&/g, "\\&")
          .replace(/\\r/g, "\\r")
          .replace(/\\t/g, "\\t")
          .replace(/\\b/g, "\\b")
          .replace(/\\f/g, "\\f");
          data = data.replace(/[\u0000-\u0019]+/g,"");
          data = JSON.parse(data);
          compare(data);
        },
        error: function(request, status, err) {
            if (status == "timeout") {
                console.log("timeout");
                window.location.reload();
            } else {
              window.location.reload();

                // console.log("error: " + request + status + err);
            }
        }
      })
    }

    var number = 0
    function compare(fu) {
      if (number == 0) {
        number = fu[0].total_quantity;
      }
      if (number !== fu[0].total_quantity) {
        number = fu[0].total_quantity;
        get_total_sales();
        total_sales_this_day();
        total_sales_this_month()
        total_sales_this_year()
      }
    }


  get_total_sales();
  function get_total_sales() {
    $.ajax({
      type: "GET",
      url: "./ajax/total_sales_chart.php",
      success: function (data) {
        data = data.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
        data = data.replace(/[\u0000-\u0019]+/g,"");
        data = JSON.parse(data);
        arrange_data(data);
      }
    })
  }
  function arrange_data(fo) {
    var date = new Date();
    var day_today = date.getDate();
    var days = Array();
    var month = date.getMonth();
    var year = date.getFullYear();
    var total_sales_perday = Array();


    function daysInMonth(month,year) {
      return new Date(year, month, 0).getDate();
    }
    var howmanydays = daysInMonth(month+1,year);

    for (var i = 1; i <= howmanydays; i++) {
      days.push(fo[0].month + " " + i + " " + year);
    }

    var eto = 1;
    for (var i in fo) {
      for (c = eto; c <= howmanydays; c++) {
        if (fo[i].day == c) {
          total_sales_perday.push(fo[i].total_sales);
          eto = c+1;
          break;
        }
        else {
          total_sales_perday.push(0);
        }
      }
    }
    if (total_sales_perday.length < howmanydays) {
      var kulang = howmanydays - total_sales_perday.length;
      for (var i = 1; i <= kulang; i++) {
        total_sales_perday.push(0);
      }
    }
    make_chart(total_sales_perday, days, fo[0].month);

  }
  function make_chart(total_sales_perday, days, m) {
    var item_sales;
    var ctx = document.getElementById('sales_Chart').getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 325);
    gradient.addColorStop(0, 'rgb(250, 75, 112)');
    gradient.addColorStop(1, 'rgb(255, 180, 196)');

    var option = {
      animation: {
        duration: 0,
      },
      legend: {
        display: false
      },
      title: {
        display: false,
        // fontColor: 'rgb(255, 34, 81)',
        fontSize: 20,
        fontFamily: ''
      },
      scales: {
        yAxes: [{
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            beginAtZero:true,
            display: false,
          }
        }],
        xAxes: [{
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false
          }
        }]
      },
    }

    var datas = {
      labels: days,
      datasets: [
        {
          label: 'Total Sales ₱',
          data: total_sales_perday,
          backgroundColor: 'rgba(250, 75, 112, 0.7)',
          // backgroundColor: "rgba(250, 75, 112, 0.7)",
          borderColor: "rgb(250, 75, 112)",
          pointRadius: 2,
          pointBackgroundColor: "rgb(250, 75, 112)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(250, 75, 112)",

        },
      ]
    }

    if(window.LineGraph != null){
      window.LineGraph.destroy();
    }
    Chart.defaults.global.elements.line.borderWidth = 2;
    window.LineGraph = new Chart(ctx, {
      type: 'line',
      data: datas,
      options: option
    });
  }

  total_sales_this_day();
  function total_sales_this_day() {
    $.ajax({
      type: "GET",
      url: "./ajax/total_sales_day.php",
      success: function (data) {
        data = data.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
        data = data.replace(/[\u0000-\u0019]+/g,"");
        data = JSON.parse(data);
        sales_day_put_into_div(data)
      }
    })
    function sales_day_put_into_div(he){
        var num;
      if (he.length == 0) {
        num = 0;
      }
      else {
        num = he[0].total_sales
      }

      function numberWithCommas(n) {
          var parts=n.toString().split(".");
          return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
      }
      num = numberWithCommas(num)
      $(".total_sales_day_val").html(num);
    }
  }
  total_sales_this_month()
  function total_sales_this_month() {
    $.ajax({
      type: "GET",
      url: "./ajax/total_sales_val.php",
      success: function (data) {
        data = data.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
        data = data.replace(/[\u0000-\u0019]+/g,"");
        data = JSON.parse(data);
        sales_month_put_into_div(data)
      }
    })
    function sales_month_put_into_div(he){
      var num;
    if (he.length == 0) {
      num = 0;
    }
    else {
      num = he[0].total_sales
    }

    function numberWithCommas(n) {
        var parts=n.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }
    num = numberWithCommas(num)
    $(".total_sales_month_val").html(num);
    }
  }
  total_sales_this_year()
  function total_sales_this_year() {
    $.ajax({
      type: "GET",
      url: "./ajax/total_sales_year.php",
      success: function (data) {
        data = data.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
        data = data.replace(/[\u0000-\u0019]+/g,"");
        data = JSON.parse(data);
        sales_year_put_into_div(data)
      }
    })
    function sales_year_put_into_div(he){
      var num;
    if (he.length == 0) {
      num = 0;
    }
    else {
      num = he[0].total_sales
    }

    function numberWithCommas(n) {
        var parts=n.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }
    num = numberWithCommas(num)
    $(".total_sales_year_val").html(num);
    }
  }


  date();
  function date() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    switch (month) {
        case 0:
          month = "January";
          break;
        case 1:
          month = "February";
          break;
        case 2:
          month = "March";
          break;
        case 3:
          month = "April";
          break;
        case 4:
          month = "May";
          break;
        case 5:
          month = "June";
          break;
        case 6:
          month = "July";
          break;
        case 7:
          month = "August";
          break;
        case 8:
          month = "September";
          break;
        case 9:
          month = "October";
          break;
        case 10:
          month = "November";
          break;
        case 11:
          month = "December";
          break;
        default:
      }

    $(".mon").html(month)
    $(".m").html(month)
    $(".d").html(day)
    $(".y").html(year)
    $(".ye").html(year)


  }
  time();
  setInterval(function () {
    time();
    date();
  }, 30000)
  function time() {
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var a;
    if (hour > 12) {
      hour = hour - 12;
      a = "PM";
    }
    else {
      a = "AM";
    }

    if (hour < 10) {
      hour = "0" + hour
    }
    // console.log(minutes.length);
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    $(".h").html(hour)
    $(".mn").html(minutes)
    $(".a").html(a)
  }

})
})
