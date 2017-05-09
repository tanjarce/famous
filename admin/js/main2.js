$(document).ready(function () {
    // function get_total_sales_val() {
    //   $.ajax({
    //     type: "GET",
    //     url: "./ajax/total_sales_val.php",
    //     success: function (data) {
    //       $(".total_sales_data").html(data);
    //     }
    //
    //   })
    // }
    function intial_list() {
      $.ajax({
        type: "GET",
        url: "./ajax/side_search.php",
        success: function (data) {
          $(".side_list").html(data);
        }
      })
    }

    // get_total_sales_val();
  function toggle_list_search_filter() {
    $("#search_item").toggleClass("hide_search");
    $(".item_list_wrapper").toggleClass("hide");
    $(".filters_wrapper").toggleClass("hide_filter");
  }

  var forward = false;

  $(".mata").click(function () {
    intial_list();
    var phase = 0;
    if (forward == false) {
      var pluss = setInterval(function plus() {
        phase ++;
        if(phase == 1){
          $("#search_item").addClass("hide_search");
          $(".item_list_wrapper").addClass("hide");
          $(".filters_wrapper").addClass("hide_filter");
        }
        else if (phase == 2) {
          $(".side_search").addClass("slide");
          $(".sales_inventory_wrapper").addClass("slidee");
        }
        else if (phase == 3) {
          forward = true;
          console.log(forward);
          $(".sales_chart_wrapper").addClass("up");
          clearInterval(pluss);
          // break;
        }
      }, 250);
    }

    else if (forward == true) {
      var pluss = setInterval(function plus() {
        phase ++;
        if(phase == 1){
          $(".sales_chart_wrapper").removeClass("up", "");
        }
        else if (phase == 2) {
          $(".side_search").removeClass("slide", "");
          $(".sales_inventory_wrapper").removeClass("slidee", "");
        }
        else if (phase == 3) {
          forward = false;
          console.log(forward);
          $("#search_item").removeClass("hide_search", "");
          $(".item_list_wrapper").removeClass("hide", "");
          $(".filters_wrapper").removeClass("hide_filter", "");
          clearInterval(pluss);
        }
      }, 250);
    }
  })

})
