$(document).ready(function () {
  option_month();
  function option_month() {
    var month_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    var date = new Date();
    var m = date.getMonth();
    var selected_m ="";
    var month ="";
    for (var i = 0; i < month_arr.length; i++) {
      if (i == m) {
        selected_m = " selected";
      }else {
        selected_m = "";
      }
      month += "<option value='"+ month_arr[i] +"'"+ selected_m + ">" + month_arr[i] + "</option>";
    }
    $(".month").html(month);
    // console.log(month);
    // console.log(month_arr);
  }
  get_year();
  function get_year() {
    $.ajax({
      type: "POST",
      url: "./ajax/get_year.php",
      success: function (data) {
        $(".year").html(data)
      }
    })
  }
  function linis(data) {
    data = data.replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
    data = data.replace(/[\u0000-\u0019]+/g,"");
    return data;
  }

  function get_total_sales() {
    $.ajax({
      type: "GET",
      url: "./ajax/total_sales_chart.php",
      success: function (data) {
        linis(data);
        var data = JSON.parse(data);
        var days = Array();
        var total_sales_data = Array();
        var date = new Date();
        var day_today = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        // console.log(month);
        // console.log(year);

        function daysInMonth(month,year) {
            return new Date(year, month, 0).getDate();
        }
        var howmanydays = daysInMonth(month+1,year);
        // console.log(howmanydays);

        for (var i = 1; i <= howmanydays; i++) {
          days.push(data[0].month + " " + i + " " + year);
        }
        var eto = 1;
        for (var i in data) {
          for (c = eto; c <= howmanydays; c++) {
            if (data[i].day == c) {
              total_sales_data.push(data[i].total_sales);
              eto = c+1;
              break;
            }
            else {
              total_sales_data.push(0);
            }
          }
        }
        if (total_sales_data.length < howmanydays) {
          var kulang = howmanydays - total_sales_data.length;
          for (var i = 1; i <= kulang; i++) {
            total_sales_data.push(0);
          }
        }

        // console.log(total_sales_data);
        // console.log(days);
        make_chart(total_sales_data, days)
      }
    })
  }
  get_total_sales();

  function make_chart(total_sales_data, days) {
    var item_sales;
    var ctx = document.getElementById('sales_Chart').getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 325);
    gradient.addColorStop(0, 'rgb(250, 75, 112)');
    gradient.addColorStop(0.5, 'rgba(250, 75, 112, 0.7)');
    gradient.addColorStop(1, 'rgba(251, 251, 251, 0.7)');

    var gradient2 = ctx.createLinearGradient(0, 0, 0, 325);
    gradient2.addColorStop(0, 'rgb(250, 154, 75)');
    // gradient2.addColorStop(0.5, '#fa9a4b');
    // gradient2.addColorStop(1, '#fbfbfb');
    gradient2.addColorStop(0.5, 'rgba(250, 154, 75, 0.7)');
    gradient2.addColorStop(1, 'rgba(251, 251, 251, 0.7)');
    var option = {
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

    // if(item_sales !== undefined){
    //   option.legend.display = true;
    // }

    var datas = {
      labels: days,
      datasets: [
        {
          label: 'Total Sales',
          data: total_sales_data,
          backgroundColor: gradient,
          // backgroundColor: "rgba(250, 75, 112, 0.7)",
          borderColor: "rgb(250, 75, 112)",
          pointRadius: 2,
          pointBackgroundColor: "rgb(250, 75, 112)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(250, 75, 112)",

        },
      ]
    }

    if (item_sales !== undefined) {
      var item_sales_data = {
        label: 'brush',
        data: [100, 170, 1000, 500, 100, 100, 300, 500, 1800, 100, 170, 100, 500, 100, 100, 300, 500, 1800, 1000, 170, 100, 500, 1000, 100, 300, 500, 500],
        backgroundColor: gradient2,
        borderColor: "rgb(250, 154, 75)",
        // borderWidth: "1";
        pointRadius: 2,
        pointBackgroundColor: "rgb(250, 154, 75)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(250, 154, 75)",
      }
      datas.datasets.unshift(item_sales_data);
    }

    // console.log(datas.datasets);

    if(window.LineGraph != null){
      window.LineGraph.destroy();
    }
    Chart.defaults.global.elements.line.borderWidth = 1;
    window.LineGraph = new Chart(ctx, {
      type: 'line',
      data: datas,
      options: option
    });
  }


  function get_inventory_data(id) {
    $.ajax({
      type: "POST",
      url: "./ajax/get_inventory_info.php",
      data: {side_id: id},
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

        var stock = data[0].stock;
        var capacity = data[0].max_stock_quantity;
        $(".stock_val").html("<h1>"+ stock +"</h1>")
        $(".capacity_val").html("<h1>"+ capacity +"</h1>")
        console.log(stock);
        console.log(capacity);

        var percent = Math.round(stock/capacity*100);
        $(".percent_val").text(percent);

        percent = parseInt(percent);
        var circle = $('#status_svg #bar');
        // var bilog = document.getElementById('bar');
        // var length = bilog.getTotalLength()
        var r = circle.attr('r');
        var c = Math.PI*(r*2);

        // if (val < 0) { val = 0;}
        // if (val > 100) { val = 100;}
        // console.log(length);
        // console.log(c);
        var pct = ((capacity-stock)/capacity)*c;
        // console.log((capacity-stock)/capacity);
        // console.log(pct);

        circle.css({"strokeDashoffset": pct});
            // $("#cont").attr('percent', val)


      }
    })
  }


  function post_val() {
    var val = $.trim($("#side_search_item").val());
    $.ajax({
      type: "POST",
      url: "./ajax/side_search.php",
      data: {search_val: val},
      success: function (data) {
        $(".side_list").html(data);
      }
    })
  }
  $("#side_search_item").keyup(function () {
    post_val();
  })

  var selected = false;
  $(".month").change(function () {
    tingnan_kung_may_selected()
  });
  $(".year").change(function () {
    tingnan_kung_may_selected()
  });
  $(document).on("click", ".side_items" , function () {
    var id = $(this).children(".side_id").text();
    $(".side_items").removeClass("selected_item", "");
    $(this).addClass("selected_item");
    selected = true;
    post_item_data();
    get_inventory_data(id)
  })



  function make_chart_total_and_sales(item) {
    var s_month = $(".month").val();
    var s_year = $(".year").val();
    $.ajax({
      type: "POST",
      url: "./ajax/total_sales_chart.php",
      data: {month: s_month, year: s_year},
      success: function (data) {
        linis(data);
        var data = JSON.parse(data);


        var days = Array();
        var item_sales = Array();
        var total_sales_data = Array();
        if(data.length == 0){

        }
        var month = data[0].month;
        var year = data[0].year;
        var item_name = item[0].item_name;
        switch (month) {
            case "Jan":
              month = 0;
              break;
            case "Feb":
              month = 1;
              break;
            case "Mar":
              month = 2;
              break;
            case "Apr":
              month = 3;
              break;
            case "May":
              month = 4;
              break;
            case "Jun":
              month = 5;
              break;
            case "Jul":
              month = 6;
              break;
            case "Aug":
              month = 7;
              break;
            case "Sept":
              month = 8;
              break;
            case "Oct":
              month = 9;
              break;
            case "Nov":
              month = 10;
              break;
            case "Dec":
              month = 11;
              break;
            default:
          }

        function daysInMonth(month,year) {
            return new Date(year, month, 0).getDate();
        }
        var howmanydays = daysInMonth(month+1,year);
        // console.log(howmanydays);

        for (var i = 1; i <= howmanydays; i++) {
          days.push(data[0].month + " " + i + " " + year);
        }
        var eto = 1;
        for (var i in data) {
          for (c = eto; c <= howmanydays; c++) {
            if (data[i].day == c) {
              total_sales_data.push(data[i].total_sales);
              eto = c+1;
              break;
            }
            else {
              total_sales_data.push(0);
            }
          }
        }
        if (total_sales_data.length < howmanydays) {
          var kulang = howmanydays - total_sales_data.length;
          for (var i = 1; i <= kulang; i++) {
            total_sales_data.push(0);
          }
        }
        var eto2 = 1;
        for (var i in item) {
          for (x = eto2; x <= howmanydays; x++) {
            if (item[i].day == x) {
              item_sales.push(item[i].total_sales);
              eto2 = x+1;
              break;
            }
            else {
              item_sales.push(0);
            }
          }
        }
        if (item_sales.length < howmanydays) {
          var kulang = howmanydays - item_sales.length;
          for (var i = 1; i <= kulang; i++) {
            item_sales.push(0);
          }
        }

        // console.log(total_sales_data);
        // console.log(days);
        // make_chart(total_sales_data, days)
        var ctx = document.getElementById('sales_Chart').getContext('2d');
        var gradient = ctx.createLinearGradient(0, 0, 0, 325);
        gradient.addColorStop(0, 'rgb(250, 75, 112)');
        gradient.addColorStop(0.5, 'rgba(250, 75, 112, 0.7)');
        gradient.addColorStop(1, 'rgba(251, 251, 251, 0.7)');

        var gradient2 = ctx.createLinearGradient(0, 0, 0, 325);
        gradient2.addColorStop(0, 'rgb(250, 154, 75)');
        // gradient2.addColorStop(0.5, '#fa9a4b');
        // gradient2.addColorStop(1, '#fbfbfb');
        gradient2.addColorStop(0.5, 'rgba(250, 154, 75, 0.7)');
        gradient2.addColorStop(1, 'rgba(251, 251, 251, 0.7)');
        var option = {
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

        // if(item_sales !== undefined){
        //   option.legend.display = true;
        // }

        var datas = {
          labels: days,
          datasets: [
            {
              label: 'Total Sales',
              data: total_sales_data,
              backgroundColor: gradient,
              // backgroundColor: "rgba(250, 75, 112, 0.7)",
              borderColor: "rgb(250, 75, 112)",
              pointRadius: 2,
              pointBackgroundColor: "rgb(250, 75, 112)",
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(250, 75, 112)",

            },
          ]
        }

        if (item_sales !== undefined) {
          var item_sales_data = {
            label: item_name,
            data: item_sales,
            backgroundColor: gradient2,
            borderColor: "rgb(250, 154, 75)",
            // borderWidth: "1";
            pointRadius: 2,
            pointBackgroundColor: "rgb(250, 154, 75)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(250, 154, 75)",
          }
          datas.datasets.unshift(item_sales_data);
        }

        // console.log(datas.datasets);

        if(window.LineGraph != null){
          window.LineGraph.destroy();
        }
        Chart.defaults.global.elements.line.borderWidth = 1;
        window.LineGraph = new Chart(ctx, {
          type: 'line',
          data: datas,
          options: option
        });
      }


    })

  }

  function post_item_data() {
    var s_month = $(".month").val();
    var s_year = $(".year").val();
    var id = $(".selected_item").children(".side_id").text();
      $.ajax({
        type: "POST",
        url: "./ajax/item_sales.php",
        data: {side_id: id, month: s_month, year: s_year},
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
          console.log(data);
          data = JSON.parse(data);
          make_chart_total_and_sales(data);

        }
      })
  }

  // var item = Array();
  function tingnan_kung_may_selected() {
    var selected_item = $(".selected_item").text();
    if (selected_item == "") {
      make_chart_total_and_sales();
    }
    else {
      post_item_data();
    }
  }









})
