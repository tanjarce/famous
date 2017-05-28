$(document).ready(function () {
  $(".notification_number").hide();
  function show_notification() {
    $(".notifications_wrapper").css({"display": "flex"});
    $(".notifications_wrapper").addClass("show");
  }
  function hide() {
    $(".pangharang").css({"display": "none"});
    $(".notifications_wrapper").removeClass("show", "");
    $(".notifications_wrapper").css({"display": "none"});
  }
  initial_table();
  function initial_table() {
    $.ajax({
      type: "GET",
      url: "./ajax/Post_Get_items.php",
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
        make_table(data);
      }
    })
  }
  function make_table(iv) {
        var row = "";
        for (var i in iv) {
          row += "<div class='item_row' id='row_"+ iv[i].item_id +"'>";
          row += "<div class='data item_name' id='item_"+ iv[i].item_id +"'>"+ iv[i].item_name +"</div>";
          row += "<div class='data item_category' id='category_"+ iv[i].item_id +"'>"+ iv[i].category +"</div>";
          row += "<div class='data item_brand' id='brand_"+ iv[i].item_id +"'>"+ iv[i].brand +"</div>";
          row += "<div class='data item_price' id='price_"+ iv[i].item_id +"'><span>₱</span><span class='price_val'>"+ iv[i].price +"</span></div>";
          row += "<div class='data item_avail' id='avail_"+ iv[i].item_id +"'>"+ iv[i].availability +"</div>";

          var stock = parseInt(iv[i].stock);
          var capacity = parseInt(iv[i].max_stock_quantity);

          var percent = Math.round(stock/capacity*100);

          row += "<div class='data item_status' id='status_"+ iv[i].item_id +"'>";
          var critical;
          var critical_bar;
          if (percent <= 20) {
            critical = "critical";
            critical_bar = "critical_bar";
          }
          else if (percent > 20) {
            critical = "";
            critical_bar = "";
          }
            row += "<div class='container "+ critical +"'>"
              row += "<span class='text'>";
                row +="<span class='stock' id='stock_"+ iv[i].item_id +"'>"+ stock + "</span>";
                row +="/";
                row +="<span class='capacity' id='capacity_"+ iv[i].item_id +"'>" + capacity +"</span>";
              row += "</span>";


              row += "<span class='bar "+ critical_bar +"' id='bar_"+ iv[i].item_id +"' style='width: "+ percent +"%'></span>";
              row += "<span class='bar_update' style='width: "+ percent +"%' id='update_bar_"+ iv[i].item_id +"'></span>";
            row += "</div>";

            row += "<div class='update_inv' id='update_inv_"+ iv[i].item_id +"'>";
              row += "<span class='stock_display_wrapp'>Stock: <span id='stock_display'>"+ stock +"</span><span class='stock_operator'></span><span class='stock_input_val'></span></span>";
              row += "<div class='stock_wrapp'>";
                row += "<button class='minus_stock'>&minus;</button>";
                row += "<input class='stock_update' type='number' maxlength='6' disabled>";
                row += "<button class='plus_stock'>&plus;</button>";
              row += "</div>";

              row += "<span class='capacity_display_wrapp'>Capacity: <span id='capacity_display'>"+ capacity +"</span><span class='capacity_operator'></span><span class='capacity_input_val'></span></span>";
              row += "<div class='capacity_wrapp'>";
                row += "<button class='minus_capa'>&minus;</button>";
                row += "<input class='capacity_update' type='number' maxlength='6' disabled>";
                row += "<button class='plus_capa'>&plus;</button>";
              row += "</div>";
              row += "<div class='button_wrapp'>";
                row += "<button id='update_inv_save' name="+ iv[i].item_id +">Save</button>";
                row += "<button id='update_inv_cancel' name="+ iv[i].item_id +">Cancel</button>";
              row += "</div>";
            row += "</div>";

          row += "</div>";

          row += "<div class='data item_action' id='action_"+ iv[i].item_id +"' name='"+ iv[i].item_id +"'>";
            row += "<div class='action_container' id='action_container_"+ iv[i].item_id +"'>";
              row += "<span id='edit' name='"+ iv[i].item_id +"'>Edit Item</span>"
              row += "<span id='update_inv' name='"+ iv[i].item_id +"'>Update Inventory</span>"
              row += "<span id='delete' name='"+ iv[i].item_id +"'>Delete Item</span>"
              row += "<span id='show_sales' name='"+ iv[i].item_id +"'>Sales Info</span>"
            row += "</div>";
          row += "</div>";

          row += "</div>";
        }
        $(".item_list").html(row);
      }

  get_category();
  get_brand();
  function get_category() {
    $.ajax({
      type: "GET",
      url: "./ajax/get_categories.php",
      success: function (data) {
        $("#category_list").html(data);
      }
    });
  }
  function get_brand() {
    $.ajax({
      type: "GET",
      url: "./ajax/get_brands.php",
      success: function (data) {
        $("#brand_list").html(data);
      }
    });
  }

  function post_get_items() {
    var item = $.trim($("#search_item").val());
    var category = $("#category_value").text();
    var brand = $("#brand_value").text();

    $.ajax({
      type: "POST",
      url: "./ajax/Post_Get_items.php",
      data: {item: item, category: category, brand: brand},
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
        make_table(data);
        if (data.length == 0) {
          $(".item_list").html("<div class='no_match'><h2>No match found</h2></div>")
        };
      }
    })
  }

  $(document).on("click", ".category", function () {
      var categ = $(this).text();
      if (categ == " All ") {
        $("#category_value").text("Category");
      }
      else {
        $("#category_value").text(categ);
      }
      post_get_items();
      $("#category_list").css({"opacity": "0"});
      setTimeout(function () {
        $(".category").removeClass("show", "");
        $("#category_list").css({"display": "none"})
        $(".item_list").removeClass("hide_scroll", "");
      }, 200)

  });
  $("#category_value").on("click", function (e) {

      if (e.target == e.currentTarget) {

        var category = $(".category");

        if ($("#category_list").css("display") == "none") {
          $("#category_list").css({"display": "inline-block"});
          $("#category_list").css({"opacity": "1"});
          setTimeout(galaw, 100);
          var count = 0;

          function galaw() {
            if(count !== category.length){
              $(".category").eq(count).addClass("show");
              // console.log(count);
              dagdag();
              // console.log(count);
            }
          }
          function dagdag() {
            count += 1;
            if ($("#category_list").css("display") == "block") {
              setTimeout(function () {
                galaw()
              },100);
            }
            else {
              $(".category").removeClass("show", "");
            }
          }
        }
        else {
          // console.log(count);
          $("#category_list").css({"opacity": "0"});
          setTimeout(function () {
            $("#category_list").css({"display": "none"})
            $(".category").removeClass("show", "");
          }, 200)
        }
    }
    $(this).outclick(function () {
      $("#category_list").css({"opacity": "0"});
      setTimeout(function () {
        $("#category_list").css({"display": "none"})
        $(".category").removeClass("show", "");
      }, 200)
    })
  })

  $(document).on("click", ".brand", function () {
    var brand = $(this).text();
    if (brand == " All ") {
      $("#brand_value").text("Brand");
    }
    else {
      $("#brand_value").text(brand);
    }
    post_get_items();

    $("#brand_list").css({"opacity": "0"});
    setTimeout(function () {
      $(".brand").removeClass("show", "");
      $("#brand_list").css({"display": "none"})
      $(".item_list").removeClass("hide_scroll", "");
    }, 200)
  })
  $("#brand_value").on("click", function (e) {
    if(e.target == e.currentTarget){
      var brand = $(".brand");
      if ($("#brand_list").css("display") == "none") {
        $("#brand_list").css({"display": "inline-block"});
        $("#brand_list").css({"opacity": "1"});

        var count = 0;
        setTimeout(galaw, 100);

        function galaw() {
          if(count < brand.length){
            $(".brand").eq(count).addClass("show");
            // console.log(count);
            dagdag();
          }
        }
        function dagdag() {
          count += 1;
          if ($("#brand_list").css("display") == "block") {
            setTimeout(function () {
              galaw()
            },100);
          }
          else {
            $(".brand").removeClass("show", "");
          }
        }

      }
      else {
        $("#brand_list").css({"opacity": "0"});
        setTimeout(function () {
          $(".brand").removeClass("show", "");
          $("#brand_list").css({"display": "none"})
        }, 200)
      }
    }
    $(this).outclick(function () {
      $("#brand_list").css({"opacity": "0"});
      setTimeout(function () {
        $(".brand").removeClass("show", "");
        $("#brand_list").css({"display": "none"})
      }, 200)
    })
  })

  $(document).on("keyup", "#search_item", function () {
    post_get_items();
    $(".item_list").removeClass("hide_scroll", "");
  });

  $(document).on("click", ".item_action", function () {
    var id = $(this).attr("name");
    var position = $(this).position();
    var container = $("#action_container_"+id);
    $(".item_action").removeClass("show", "");
    //  console.log(container);
      if (container.css("display") == "none") {
        $(".action_container").css({"display": "none"});
        $(this).addClass("show");
        if(position.top <= 480){
          container.removeClass("bot", "");
          container.addClass("top");
          container.css({
            "display": "flex",
            "top": position.top + container.innerHeight()/2.9
          })
        }
        else {
          container.removeClass("top","");
          container.addClass("bot");
          container.css({
            "display": "flex",
            // "top": position.top + container.innerHeight()/2.2
            "top": position.top - container.innerHeight()
          })
        }
      }
      else{
        $(this).removeClass("show", "");
        container.css({
          "display": "none"
        });
      }
    // console.log(container.innerHeight());
    $(this).outclick(function () {
      $(this).removeClass("show", "");
      container.css({
        "display": "none"
      });
    })
  })


//////////////////////////////////////////////////////////////////
                    // update inventory //
//////////////////////////////////////////////////////////////////
  var original_stock = 0;
  var original_capa = 0;
  var bar;
  var update_bar;
  var display_stock;
  var display_capacity;
  var check_operator_stock ;
  var check_operator_capa ;

  $(document).on("click", "#update_inv", function () {
    var id = $(this).attr("name");
    original_stock = parseInt($("#stock_"+id).text());
    original_capa = parseInt($("#capacity_"+id).text());
    bar = $("#bar_"+id);
    update_bar = $("#update_bar_"+id);
    display_stock = $("#stock_"+id);
    display_capacity = $("#capacity_"+id);
    var una = $("#update_inv_"+id).find(".stock_display_wrapp").find("#stock_display");
    una.text(original_stock);
    var dulo = $("#update_inv_"+id).find(".capacity_display_wrapp").find("#capacity_display");
    dulo.text(original_capa);

    $(".update_inv").css({"display": "none"});
    $(".item_list").addClass("hide_scroll");
    var container = $("#status_"+id);
    var position = container.position();

    var update_div = $("#update_inv_"+id);
    if(position.top <= 450){
      update_div.removeClass("bott", "");
      update_div.addClass("topp");
      update_div.css({
        "display" : "flex",
        "left" : position.left - (update_div.innerWidth()/8),
        "top" : position.top + (update_div.innerHeight()/4)
        // "background" : "pink"
      })
    // console.log(container);
    }
    else {
      update_div.removeClass("topp" ,"");
      update_div.addClass("bott");
      update_div.css({
        "display" : "flex",
        "left" : position.left - (update_div.innerWidth()/8),
        "top" : position.top - update_div.innerHeight()-5
        // "background" : "pink"
      })
    }
  })

  function add_error() {
    bar.parent().addClass("over");
    bar.parent().find(".text").addClass("over_t");
  }
  function remove_error() {
    bar.parent().removeClass("over", "");
    bar.parent().find(".text").removeClass("over_t", "");
    $(".stock_wrapp").removeClass("warning");
  }
  function insert_records_to_inventory(a, e, i, o, u){
    $.ajax({
      type: "POST",
      url: "./ajax/add_inventory_record.php",
      data: {
        "inventory_id": a,
        "name": e,
        "stock": i,
        "capa": o,
        "value": u,
      },
      success: function (data) {
        $(".notifications_wrapper").html("<h2>Inventory Updated</h2>");
        show_notification();
        setTimeout(function () {
          hide();
        }, 1000);
      }
    })
  }

  $(document).on("click", ".plus_stock", function () {
    check_operator_stock = "add";
    var field = $(this).siblings(".stock_update");
    var una = $(this).parent().siblings(".stock_display_wrapp").find("#stock_display");
    var operator = $(this).parent().siblings(".stock_display_wrapp").find(".stock_operator");
    var dulo = $(this).parent().siblings(".stock_display_wrapp").find(".stock_input_val");
    field.attr("disabled", false).focus();
    operator.text("+");
    if (field.val() == "") {
      dulo.text(0);
    } else {
      dulo.text(Math.round(field.val()));
    }
    var total = parseInt(una.text())+parseInt(dulo.text());
    display_stock.text(total);
    var percent = parseInt(display_stock.text())/parseInt(display_capacity.text())*100;
    if (percent > 100) {
      percent = 100;
    }
    update_bar.css({
      "width": percent + "%"
    });

    if(parseInt(display_stock.text()) > parseInt(display_capacity.text())){
      add_error();
    } else {
      remove_error();
    }
  });
  $(document).on("click", ".minus_stock", function () {
    check_operator_stock = "sub";
    var field = $(this).siblings(".stock_update");
    var una = $(this).parent().siblings(".stock_display_wrapp").find("#stock_display");
    var operator = $(this).parent().siblings(".stock_display_wrapp").find(".stock_operator");
    var dulo = $(this).parent().siblings(".stock_display_wrapp").find(".stock_input_val");
    field.attr("disabled", false).focus();

    operator.text("-");
    if (field.val() == "") {
      dulo.text(0);
    } else {
      dulo.text(Math.round(field.val()));
    }

    if(field.val() > parseInt(una.text())){
      remove_error();
      dulo.text(0);
      field.val(null);
      var total = parseInt(una.text())-parseInt(dulo.text());
      display_stock.text(total);
      update_bar.css({
        "width": parseInt(display_stock.text())/parseInt(display_capacity.text())*100 + "%"
      });
    } else {
      var total = parseInt(una.text())-parseInt(dulo.text());
      display_stock.text(total);
      var percent = parseInt(display_stock.text())/parseInt(display_capacity.text())*100;
      if (percent > 100) {
        percent = 100;
      }
      update_bar.css({
        "width": percent + "%"
      });

      if(parseInt(display_stock.text()) > parseInt(display_capacity.text())){
        add_error();
      } else {
        remove_error();
      }
    }
  });
  $(document).on("keyup", ".stock_update", function (e) {
    var field = $(this);
    if (field.val() == "-") {
      field.val(null);
    }
    var una = $(this).parent().siblings(".stock_display_wrapp").find("#stock_display");
    var operator = $(this).parent().siblings(".stock_display_wrapp").find(".stock_operator");
    var dulo = $(this).parent().siblings(".stock_display_wrapp").find(".stock_input_val");

    if (e.keyCode === 13) {
      if (field.val() == "") {
        dulo.text(0);
      } else {
        var value = Math.round(field.val())
        dulo.text(value)
      }

      if(field.val() > parseInt(una.text()) && check_operator_stock == 'sub'){
        remove_error();
        dulo.text(0);
        field.val(null);
        var total = eval(una.text() + operator.text() + dulo.text());
        display_stock.text(total);
        update_bar.css({
          "width": parseInt(display_stock.text())/parseInt(display_capacity.text())*100 + "%"
        });
      }
      else{
        var total = eval(una.text() + operator.text() + dulo.text());
        display_stock.text(total);
        var percent = parseInt(display_stock.text())/parseInt(display_capacity.text())*100;
        if (percent > 100) {
          percent = 100;
        }
        update_bar.css({
          "width": percent + "%"
        });
        if(parseInt(display_stock.text()) > parseInt(display_capacity.text())){
          add_error();
        } else {
          remove_error();
        }
      }
    }
  })

  $(document).on("click", ".plus_capa", function () {
    check_operator_capacity = "add";
    var field = $(this).siblings(".capacity_update");
    var una = $(this).parent().siblings(".capacity_display_wrapp").find("#capacity_display");
    var operator = $(this).parent().siblings(".capacity_display_wrapp").find(".capacity_operator");
    var dulo = $(this).parent().siblings(".capacity_display_wrapp").find(".capacity_input_val");
    field.attr("disabled", false).focus();

    operator.text("+");
    if (field.val() == "") {
      dulo.text(0);
    } else {
      dulo.text(Math.round(field.val()));
    }

    var total = parseInt(una.text())+parseInt(dulo.text());
    display_capacity.text(total);
    var percent = parseInt(display_stock.text())/parseInt(display_capacity.text())*100;
    if (percent > 100) {
      percent = 100;
    }
    update_bar.css({
      "width": percent + "%"
    });

    if(parseInt(display_stock.text()) > parseInt(display_capacity.text())){
      add_error();
    } else {
      remove_error();
    }
  });
  $(document).on("click", ".minus_capa", function () {

      check_operator_capacity = "sub";
      var field = $(this).siblings(".capacity_update");
      var una = $(this).parent().siblings(".capacity_display_wrapp").find("#capacity_display");
      var operator = $(this).parent().siblings(".capacity_display_wrapp").find(".capacity_operator");
      var dulo = $(this).parent().siblings(".capacity_display_wrapp").find(".capacity_input_val");
      field.attr("disabled", false).focus();

      operator.text("-");
      if (field.val() == "") {
        dulo.text(0);
      } else {
        dulo.text(Math.round(field.val()));
      }

      if(field.val() > parseInt(una.text()) - parseInt(display_stock.text())){
        remove_error();
        dulo.text(0);
        field.val(null);
        var total = parseInt(una.text())-parseInt(dulo.text());
        display_capacity.text(total);
        update_bar.css({
          "width": parseInt(display_stock.text())/parseInt(display_capacity.text())*100 + "%"
        });
      } else {
        var total = parseInt(una.text())-parseInt(dulo.text());
        display_capacity.text(total);
        var percent = parseInt(display_stock.text())/parseInt(display_capacity.text())*100;
        if (percent > 100) {
          percent = 100;
        }
        update_bar.css({
          "width": percent + "%"
        });

        if(parseInt(display_stock.text()) > parseInt(display_capacity.text())){
          add_error();
        } else {
          remove_error();
        }
      }
  })
  $(document).on("keyup", ".capacity_update", function (e) {
    var field = $(this);
    if (field.val() == "-") {
      field.val(null);
    }
    var una = $(this).parent().siblings(".capacity_display_wrapp").find("#capacity_display");
    var operator = $(this).parent().siblings(".capacity_display_wrapp").find(".capacity_operator");
    var dulo = $(this).parent().siblings(".capacity_display_wrapp").find(".capacity_input_val");

    if (e.keyCode === 13) {
      if (field.val() == "") {
        dulo.text(0);
      } else {
        var value = Math.round(field.val())
        dulo.text(value)
      }

      if(field.val() > parseInt(una.text()) - parseInt(display_stock.text()) && check_operator_capacity == 'sub'){
        remove_error();
        dulo.text(0);
        field.val(null);
        var total = eval(una.text() + operator.text() + dulo.text());
        display_capacity.text(total);
        update_bar.css({
          "width": parseInt(display_stock.text())/parseInt(display_capacity.text())*100 + "%"
        });
      }
      else{
        var total = eval(una.text() + operator.text() + dulo.text());
        display_capacity.text(total);
        var percent = parseInt(display_stock.text())/parseInt(display_capacity.text())*100;
        if (percent > 100) {
          percent = 100;
        }
        update_bar.css({
          "width": percent + "%"
        });

        if(parseInt(display_stock.text()) > parseInt(display_capacity.text())){
          add_error();
        } else {
          remove_error();
        }
      }
    }
  })

  $(document).on("click", "#update_inv_cancel", function () {
    var id = $(this).attr("name");
    remove_error();
    $(".update_inv").css({"display": "none"});
    $(".item_list").removeClass("hide_scroll", "");
    $(".stock_update").attr("disabled", true);
    $(".stock_update").val(null);
    $(".capacity_update").attr("disabled", true);
    $(".capacity_update").val(null);
    var percent = original_stock / original_capa * 100;
    update_bar.css({"width": percent + "%"});
    $("#stock_"+id).text(original_stock);
    $("#capacity_"+id).text(original_capa);
    $(".stock_operator").text("");
    $(".stock_input_val").text("");
    $(".capacity_operator").text("");
    $(".capacity_input_val").text("");
    bar.parent().removeClass("over", "");

    display_stock;
    display_capacity;
    original_stock = 0;
    original_capa = 0;
  })
  $(document).on("click", "#update_inv_save", function () {
    var id = $(this).attr("name");
    var item_brand = $("#item_"+id).text() + " | " + $("#brand_"+id).text();
    var stock = display_stock.text();
    var capacity = display_capacity.text();
    var operator = $(this).parent().siblings(".stock_display_wrapp").find(".stock_operator").text();
    var dulo = $(this).parent().siblings(".stock_display_wrapp").find(".stock_input_val").text();
    var value = operator + dulo;

    if(parseInt(display_stock.text()) > parseInt(display_capacity.text())) {
      alert("your storage capacity is overflowing!")
    }
    else{
      if(parseInt(dulo) > 0){
        insert_records_to_inventory(id, item_brand, stock, capacity, value);
      }
      $.ajax({
        type: "POST",
        url: "./ajax/update_inventory.php",
        data: {"inventory_id": id, "stock": stock, "capacity": capacity},
        success: function (data) {
          var una_stock = $("#update_inv_"+id).find(".stock_display_wrapp").find("#stock_display");
          var una_capacity = $("#update_inv_"+id).find(".capacity_display_wrapp").find("#capacity_display")
          $(".update_inv").css({"display": "none"});
          $(".item_list").removeClass("hide_scroll", "");
          $(".stock_update").attr("disabled", true);
          $(".stock_update").val("");
          $(".capacity_update").attr("disabled", true);
          $(".capacity_update").val("");

          var width = update_bar.css("width");
          bar.css({"width": width});

          una_stock.text(display_stock.text());
          una_capacity.text(display_capacity.text());

          $(".stock_operator").text("");
          $(".stock_input_val").text("");
          $(".capacity_operator").text("");
          $(".capacity_input_val").text("");

          original_stock = "null";
          original_capacity = "null";
          var percent = Math.round(parseInt(display_stock.text())/parseInt(display_capacity.text())*100)
          if (percent <= 20) {
            bar.parent().addClass("critical");
            bar.addClass("critical_bar");
          }
          else if (percent > 20) {
            bar.parent().removeClass("critical", "");
            bar.removeClass("critical_bar", "");
          }
          // alert("Successfully Upadated")
        },
        error: function (data) {
        }
      })
    }
  })

//////////////////////////////////////////////////////////////////
                    // edit items //
//////////////////////////////////////////////////////////////////

  function get_options_cat(aw, iw) {
    $.ajax({
      type: "GET",
      url: "./ajax/get_category_option.php",
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
        arrange_the_options(data);
      }
    })
    function arrange_the_options(ew){
      var option = "";
      var selected = ""
      for(var i in ew){
        if(ew[i].category == iw){
          selected = "selected";
        } else {
          selected = "";
        }
        option += "<option value='"+ ew[i].category +"'  "+ selected +">"+ ew[i].category +"</option>"
      }
      option += "<option value='new'>&plus; New Category</option>";
      $("#category_val_"+ aw).html(option);
    }
  }
  function get_options_brnd(ow, uw) {
    $.ajax({
      type: "GET",
      url: "./ajax/get_brand_option.php",
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
        arrange_the_options(data);
      }
    })
    function arrange_the_options(ew){
      var option = "";
      var selected = ""
      for(var i in ew){
        if(ew[i].brand == uw){
          selected = "selected";
        } else {
          selected = "";
        }
        option += "<option value='"+ ew[i].brand +"'  "+ selected +">"+ ew[i].brand +"</option>"
      }
      option += "<option value='new'>&plus; New Brand</option>";
      $("#brand_val_"+ ow).html(option);
    }
  }
  function make_edit_row(id) {
    var row = $("#row_"+id);
    var category = $("#category_"+id);
    var brand =  $("#brand_"+id);
    var price = $("#price_"+id).find(".price_val");
    var avail = $("#avail_"+id);
    var action = $("#action_"+id);

    var categ_val = category.text();
    var brand_val = brand.text();
    var price_val = price.text();
    var avail_val = avail.text();

    // row.addClass("selected")
    category.html("<select class='edit_category field_"+id+"' id='category_val_"+ id +"' name='"+ id +"'></select>");
    get_options_cat(id, categ_val)


    brand.html("<select class='edit_brand field_"+id+"' id='brand_val_"+ id +"' name='"+ id +"'></select>");
    get_options_brnd(id, brand_val)



    price.parent().html("<input type='number' class='edit_price field_"+id+"' id='price_val_"+ id +"' value='"+ price_val +"'>");

    avail.html("<input id='yes_"+ id +"' type='radio' name='avail_"+id+"' value='yes'><label for='yes_"+id+"'>Yes</label><input id='no_"+id+"' type='radio' name='avail_"+id+"'  value='no'><label for='no_"+id+"'>No</label>");
    if (avail_val == "yes") {
      $("#yes_"+id).attr("checked", true);
    } else {
      $("#no_"+id).attr("checked", true);
    }

    action.html("<button title='save' class='edit_save' id='save_btn_"+id+"' name='"+id+"'>&check;</button><button title='cancel' class='edit_cancel' id='cancel_btn_"+id+"' name='"+id+"'>&cross;</button>");
  }
  function return_to_original(bo) {
    var row = $("#row_"+bo);
    var category = $("#category_"+bo);
    var brand =  $("#brand_"+bo);
    var price = $("#price_"+bo);
    var avail = $("#avail_"+bo);
    var action = $("#action_"+bo);

    $.ajax({
      type: "POST",
      url: "./ajax/post_get_original_row.php",
      data: {"item_id": bo},
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
        arrange_row(data)
      }
    })

    function arrange_row(bu) {
      for(var i in bu){
        category.html(bu[i].category);
        brand.html(bu[i].brand);

        var original_price = "<span>₱</span><span class='price_val'>"+ bu[i].price +"</span>";
        price.html(original_price);

        avail.html(bu[i].availability);

        var original_action = "";
        original_action += "<div class='action_container' id='action_container_"+ bo +"'>";
          original_action += "<span id='edit' name='"+ bo +"'>Edit Item</span>"
          original_action += "<span id='update_inv' name='"+ bo +"'>Update Inventory</span>"
          original_action += "<span id='delete' name='"+ bo +"'>Delete Item</span>"
          original_action += "<span id='show_sales' name='"+ bo +"'>Sales Info</span>"
        original_action += "</div>";
        action.html(original_action);
      }
    }
  }

  function save_changes(nge) {
    var row = $("#row_"+nge);
    var category = $("#category_"+nge);
    var brand =  $("#brand_"+nge);
    var price = $("#price_"+nge);
    var avail = $("#avail_"+nge);
    var action = $("#action_"+nge);

    var categ_val = $("#category_val_"+nge).val();
    var brnd_val = $("#brand_val_"+nge).val();
    var price_val = $("#price_val_"+nge).val()
    var avail_val = $("input[name='avail_"+ nge +"']:checked").val();

    $.ajax({
      type: "POST",
      url: "./ajax/update_item.php",
      data: {
        "update_id": nge,
        "update_cat": categ_val,
        "update_brnd": brnd_val,
        "update_price": price_val,
        "update_avail": avail_val
      },
      success: function (data) {
        return_to_original(nge);
        $(".notifications_wrapper").html("<h2>Saved</h2>");
        show_notification();
        setTimeout(function () {
          hide();
        }, 1000)
      }
    })
    get_category();
    get_brand();
    get_category_option();
    get_brand_option();
  }

  var original_category_field ="";
  var original_brand_field ="";

  $(document).on("click", "#edit", function () {
    id = $(this).attr("name");
    make_edit_row(id)
    original_category_field = $("#category_"+id).html();
    original_brand_field = $("#brand_"+id).html();
  })

  $(document).on("click", ".edit_cancel", function () {
    var id = $(this).attr("name");
    var text = "<p>All changes will discard, Are you sure you want to cancel?</p>";
    text += "<div><button id='yes_cancel'>Yes</button><button id='no_cancel'>No</button></div>";
    $(".notifications_wrapper").html(text);
    $(".pangharang").css({"display": "block"});
    show_notification();
    $("#yes_cancel").click(function () {
      return_to_original(id);
      hide();
    })
    $("#no_cancel").click(function () {
      hide();
    })
  })
  $(document).on("click", ".edit_save", function () {
    var id = $(this).attr("name");

    var fields = $(".field_"+id);
    var error = false;

    for (var i = 0; i < fields.length ; i++) {
      fields.eq(i).css({"border": "none"});
      if ($.trim(fields.eq(i).val()) == "") {
        fields.eq(i).css({"border": "solid rgb(255, 54, 54) 2px"});
        error = true;
      }
    }

    if(error == false){
      save_changes(id);
    }
  })
  $(document).on("change", ".edit_category", function () {
    var val = $(this).val();
    var clas = $(this).attr('class');
    var id = $(this).attr('id');
    var name = $(this).attr('name');

    if ($(this).val() == "new") {
      $(this).parent().html("<input type='text' class='new_cat"+ name +" "+ clas +"' id='"+ id +"' name='"+ name +"' placeholder='New Category' ><span>press Esc to return</span>");
      $("#category_val_"+name).focus();
    };
    $(document).on("keyup", ".new_cat"+name , function (e) {
      if(e.keyCode === 27){
        $("#category_"+name).html("<select class='edit_category field_"+name+"' id='category_val_"+ name +"' name='"+ name +"'></select>")
        get_options_cat(name)
      }
    })
  })
  $(document).on("change", ".edit_brand", function () {
    var clas = $(this).attr('class');
    var id = $(this).attr('id');
    var name = $(this).attr('name');
    // console.log(name);

    if ($(this).val() == "new") {
      $(this).parent().html("<input type='text' class='new_brnd"+ name +" "+ clas +"' id='"+ id +"' placeholder='New Brand' ><span>press Esc to return</span>");
      $("#brand_val_"+name).focus();
    };
    $(document).on("keyup", ".new_brnd"+name , function (e) {
      if(e.keyCode === 27){
        console.log(name);
        $("#brand_"+name).html("<select class='edit_brand field_"+name+"' id='brand_val_"+ name +"' name='"+ name +"'></select>")
        get_options_brnd(name)
      }
    })
  })

  //////////////////////////////////////////////////////////////////
                      // delete items //
  //////////////////////////////////////////////////////////////////


  $(document).on("click", "#delete", function () {
    var id = $(this).attr("name");
    var name = $("#item_"+id).text();
    var categ = $("#category_"+id).text();
    var brnd = $("#brand_"+id).text();

    var text = "<p>Are you sure you want to delete the selected item:</p>";
    text += "<ul><li>Item: "+ name +"</li>";
    text += "<li>Category: "+ categ +"</li>";
    text += "<li>Brand: "+ brnd +"</li></ul>";
    text += "<div><button id='delete_yes' name='"+ id +"'>Yes</button><button id='delete_cancel'>Cancel</button></div>";

    $(".notifications_wrapper").html(text)
    show_notification();
    $(".pangharang").css({"display": "block"});
  })
  $(document).on("click", "#delete_cancel", function () {
    hide();
    $(".notifications_wrapper").html("")
  })
  $(document).on("click", "#delete_yes", function () {
    var id = $(this).attr("name");
    $.ajax({
      type: "POST",
      url: "./ajax/delete_item.php",
      data: {"item_id_delete": id},
      success: function (data) {
        $("#row_"+id).remove();
        $(".notifications_wrapper").html("<h2>Item Deleted.</h2>");
        setTimeout(function () {
          hide();
          get_category();
          get_brand();
          get_category_option();
          get_brand_option();
        }, 500);
      },
      error: function (data) {
        alert("something went wrong refresh your browser.")
      }
    })

  })


  ////////////////////////////////////////////////////
                      // ADD ITEMS
  ////////////////////////////////////////////////////

    get_category_option();
    get_brand_option();

    function get_category_option() {
      $.ajax({
        type: "GET",
        url: "./ajax/get_category_option.php",
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
          var category = "";
          for (var i in data) {
            category += "<option>"+ data[i].category +"</option>";
          }
          category += "<option>+ New Category</option>";
          $(".add_item_category").html(category);
        }
      })
    }
    function get_brand_option() {
      $.ajax({
        type: "GET",
        url: "./ajax/get_brand_option.php",
        success: function (data) {
          data = JSON.parse(data);
          var category = "";

          for (var i in data) {
            category += "<option>"+ data[i].brand +"</option>";
          }
          category += "<option> + New Brand </option>";
          $(".add_item_brand").html(category);
        }
      })
    }
    function add_item(a, b, c, d, e) {
      console.log(a, b, c, d, e);
      $.ajax({
        type: "POST",
        url: "./ajax/add_item.php",
        data: {item: a, category: b, brand: c, price: d, quantity: e},
        success: function (data) {
          panapos();
        },
      })

      function panapos() {
        $(".load").css({"display": "none"});
        $(".notifications_wrapper").html("<span id='close_notification'>&times;</span><h2>"+ a + " Added :)</h2>")
          setTimeout(function () {
            reset_add_item();
            setTimeout(function () {
              get_category();
              get_brand();
              setTimeout(function () {
                get_category_option();
                get_brand_option();
                setTimeout(function () {
                  show_notification();
                  post_get_items();
                  setTimeout(function () {
                    $(".notifications_wrapper").removeClass("show", "");
                    $(".notifications_wrapper").css({"display": "none"});
                  }, 2000)
                }, 50)
              }, 50)
            }, 50)
          }, 50)
      }
    }
    function reset_add_item() {
      $(".add_item_wrapper").removeClass("slide", "");
      $(".field").css({"border": "none"});
      $(".field").val("");
      $(".item_category_wrapper").html("<select class='add_item_category  field'></select>");
      $(".item_brand_wrapper").html("<select class='add_item_brand field'></select>");
      get_category_option();
      get_brand_option();
    }

    $(document).on("change", ".add_item_category", function () {
      if ($(this).val() == "+ New Category") {
        $(this).parent().html("<input type='text' class='add_item_category field' placeholder='New Category'><span>press Esc to return</span>");
        $(".add_item_category").focus();
      }

      $(document).on("keyup", ".add_item_category", function (e) {
        if(e.keyCode === 27){
          $(".add_item_category").parent().html("<select class='add_item_category  field'></select>");
          get_category_option();
        }
      })
    })

    $(document).on("change", ".add_item_brand", function () {
      if ($(this).val() == "+ New Brand") {
        $(this).parent().html("<input type='text' class='add_item_brand field' placeholder='New Brand'><span>press Esc to return</span>");
        $(".add_item_brand").focus();
      }

      $(document).on("keyup", ".add_item_brand", function (e) {
        if(e.keyCode === 27){
          $(".add_item_brand").parent().html("<select class='add_item_brand  field'></select>");
          get_brand_option();
        }
      })
    })

    $("#add_btn").click(function () {
      $(".item_name").focus();
      setTimeout(function () {
        $(".add_item_wrapper").addClass("slide");
      }, 100)
    })
    $(".add_item_btn").on("click", function(){
      var item = $.trim($(".item_name").val());
      var category = $.trim($(".add_item_category").val());
      var brand = $.trim($(".add_item_brand").val());
      var price = $(".item_price").val();
      var quantity = $(".item_quantity").val();

      var error = false;
      var fields = $(".field");

      for (var i = 0; i < fields.length ; i++) {
        fields.eq(i).css({"border": "none"});
        if ($.trim(fields.eq(i).val()) == "") {
          fields.eq(i).css({"border": "solid rgb(255, 54, 54) 2px"});
          error = true;
        }
      }
      if (error == false) {
        // var image = ;
        add_item(item, category, brand, price, quantity);
        $(".load").css({"display": "block"})
      }
    })
    $(".cancel_btn").click(function () {
      reset_add_item();
    })

///////////////////////////////////////////////


    $(".notification").click(function (e) {
      $(".notifications_list_wrapp").toggle();
      $(".options").hide();
    })
    $(".notification").outclick(function () {
      $(".notifications_list_wrapp").hide();
    })

    $(document).on("click", ".list_notif", function () {
      var brand = $(this).find(".ntf_brnd").text();
      var name = $(this).find(".ntf_name").text();
      $("#search_item").val(name);
      $("#brand_value").text(brand);
      post_get_items();
    })

////////////////////////////////////////////////
              // account changing
////////////////////////////////////////////////

    $(".account").click(function (e) {
      $(".options").toggle();
    })
    $(".account").outclick(function () {
      $(".options").hide();
    })

    $(".c_s").click(function () {
      $(".pangharang").css({"display": "block"})
      $(".c_a_s").fadeToggle(300);
    })
    $(".ex").click(function () {
      $(".c_a_s").fadeToggle(300);
      hide();
      $(".staff_input").val(null)
      $(".staff_input").removeClass("error", "")
    })
    $(".c_a").click(function () {
      $(".pangharang").css({"display": "block"})
      $(".c_a_a").fadeToggle(300);
    })
    $(".ex_a").click(function () {
      $(".c_a_a").fadeToggle(300);
      hide();
      $(".admin_input").val(null)
      $(".admin_input").removeClass("error", "")
    })
    $("#admin_change_button").click(function () {
      var error = false;
      var fields = $(".admin_input");

      for (var i = 0; i < fields.length; i++) {
        if ($.trim(fields.eq(i).val()) == "") {
          fields.eq(i).addClass("error");
          var error = true;
        }
        else {
          fields.eq(i).removeClass("error", "");
        }
      }

      var errorr = false;
      if (error === false) {
        var pass = $("#n_p_a").val();
        var repass = $("#r_n_p_a").val();
        if (pass == repass) {
          $("#r_n_p_a").removeClass("error", "");
        }else {
          $("#r_n_p_a").addClass("error");
          errorr = true;
        }
      }

      if (error == false && errorr == false) {
        var p = $("#a_p_a").val();
        $.ajax({
          type: "POST",
          url: "./ajax/check_admins_pass.php",
          data: {admin_pass : p},
          success: function (data) {
            if (data == "match") {
              change_admin_user();
            } else {
              $("#a_p_a").addClass("error");
            }

          },
          error: function (data) {
           alert("try again later, somethng went wrong ");
          }
        })
      }

      function change_admin_user() {
        var u = $("#n_u_a").val();
        var p = $("#r_n_p_a").val();
        $.ajax({
          type: "POST",
          url: "./ajax/change_admin_acc.php",
          data: {change_user: u, change_pass: p},
          success: function (data) {
            alert("Admin account successfully changed!")
            $(".c_a_a").fadeToggle(300);
            hide();
            $(".admin_input").val(null)
            $(".admin_input").removeClass("error", "")
          },
          error: function (data) {
            alert("somethng wenr wrong.")
          }
        })

      }

    })
    $("#staff_change_button").click(function () {
      var error = false;
      var fields = $(".staff_input");

      for (var i = 0; i < fields.length; i++) {
        if ($.trim(fields.eq(i).val()) == "") {
          fields.eq(i).addClass("error");
          var error = true;
        }
        else {
          fields.eq(i).removeClass("error", "");
        }
      }

      var errorr = false;
      if (error === false) {
        var pass = $("#n_p").val();
        var repass = $("#r_n_p").val();
        if (pass == repass) {
          $("#r_n_p").removeClass("error", "");
        }else {
          $("#r_n_p").addClass("error");
          errorr = true;
        }
      }

      if (error == false && errorr == false) {
        var p = $("#a_p").val();
        $.ajax({
          type: "POST",
          url: "./ajax/check_admins_pass.php",
          data: {admin_pass : p},
          success: function (data) {
            if (data == "match") {
              change_staff_user();
            } else {
              $("#a_p").addClass("error");
            }

          },
          error: function (data) {
           alert("try again later, somethng went wrong ");
          }
        })
      }

      function change_staff_user() {
        var u = $("#n_u").val();
        var p = $("#r_n_p").val();
        $.ajax({
          type: "POST",
          url: "./ajax/change_staff_acc.php",
          data: {change_user: u, change_pass: p},
          success: function (data) {
            alert("Staff account successfully changed!")
            $(".c_a_s").fadeToggle(300);
            hide();
            $(".staff_input").val(null)
            $(".staff_input").removeClass("error", "")
          },
          error: function (data) {
            alert("somethng wenr wrong.")
          }
        })
      }
    })
//////////////////////////////////////////

        // Show Sales Info

//////////////////////////////////////////
  function intial_sales_info(aw){
    $.ajax({
      type: "POST",
      url: "./ajax/sales_info.php",
      data: {item_id: aw},
      success: function (data) {
        $(".sales_info"+ aw).html(data);
      }
    })
  }
  $(document).on("click", "#show_sales", function(){
    var id = $(this).attr("name");
    $(".sales_row").remove();
    $(".item_row").css({"border-left": "solid transparent 3px", "border-top": "solid  transparent 1px"});
    $("#row_"+id).css({"border-left": "solid  rgb(250, 75, 112) 3px", "border-top": "solid  rgb(221, 221, 221) 1px"});
    var sales_info = "<div class='sales_row' id= 's_row_"+ id +"'>";
    sales_info += "<button type='button' class ='hide_button'>&times;</button>";
    sales_info += "<div class='s_date'>";
    sales_info += "<select class='set' item_id='"+ id +"'>";
    sales_info += "<option value='d'>Daily</option>"
    sales_info += "<option value='m'>Monthly</option>"
    sales_info += "<option value='a'>Annually</option>"
    sales_info += "</select>";
    sales_info += "<label>Date: &nbsp;</label>"
    sales_info += "<select class='s_month' item_id='"+ id +"'>";
    var date = new Date();
    var thismonth = date.getMonth();
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    for (var i = 0; i < month.length; i++) {
      if (i == thismonth) {
        sales_info += "<option val='"+ month[i] +"' selected>"+ month[i] +"</option>";
      }
      else {
        sales_info += "<option val='"+ month[i] +"'>"+ month[i] +"</option>";
      }
    }
    sales_info +="</select>";
    sales_info += "<select class='s_day' item_id='"+ id +"'>";
    var date = new Date();
    var thisday = date.getDate();
    for (var i = 1; i <= 31; i++) {
      if (i === thisday) {
        sales_info += "<option val='"+ i +"' selected>"+ i +"</option>";
      } else {
        sales_info += "<option val='"+ i +"'>"+ i +"</option>";
      };
    }
    sales_info += "</select>";
    sales_info += "<select class='s_year' item_id='"+ id +"'>";
    sales_info += "</select>";
      $.ajax({
        type: "GET",
        url: "./ajax/get_year.php",
        success: function (data) {
          $(".s_year").html(data);
        }
      })
    sales_info += "</div>";
    sales_info += "<div class='s_d sales_info"+ id +"'>";
    sales_info += "</div>";
    sales_info += "";
    sales_info += "</div>";


    $("#row_"+id).after(sales_info)
    intial_sales_info(id);
  })

  function post_on_dma(){
    var s = $(".set").val();
    var id = $(".set").attr("item_id");
    var month = $(".s_month").val();
    var day = $(".s_day").val();
    var year = $(".s_year").val();
    $.ajax({
      type: "POST",
      url: "./ajax/dma_sales_info.php",
      data: {set: s, item_id: id, m: month, d: day, y: year},
      success: function (data) {
        $(".sales_info"+ id).html(data);
      }
    })
  }

  $(document).on("change", ".set", function () {
    var val = $(this).val();
    if(val == "d"){
      $(".s_day").show("fast");
      $(".s_month").show("fast");
      $(".s_year").show("fast");
    }
    else if (val == "m") {
      $(".s_day").hide("fast");
      $(".s_month").show("fast");
      $(".s_year").show("fast");
    }
    else if (val == "a") {
      $(".s_day").hide("fast");
      $(".s_month").hide("fast");
      $(".s_year").show("fast");
    }
    post_on_dma();
  })

  $(document).on("change", ".s_day", function(){
    post_on_dma();
  })
  $(document).on("change", ".s_month", function(){
    post_on_dma();
  })
  $(document).on("change", ".s_year", function(){
    post_on_dma();
  })

  $(document).on("click", ".hide_button", function(){
    $(".item_row").css({"border-left": "solid transparent 3px", "border-top": "solid  transparent 1px"});
    $(".sales_row").remove();
  });

})
