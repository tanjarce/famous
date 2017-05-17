$(document).ready(function () {
  var item_name = "";
  var item_id = 0;
  var initial_price = 0;
  var stock_left = 0;
  function update_livesearch_query() {
    var item = $("#srch_item").val();
    item = item.split("|");
    var first = $.trim(item[0]);
    var second = $.trim(item[1]);
    $.ajax({
      type: "POST",
      url: "./counter_login_ajax/live_item_search.php",
      data: {counter_item: first, item_brand: second},
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
        var data = JSON.parse(data);
        put_to_live_list(data);
      }
    });

    function put_to_live_list(data) {
      // console.log(data);
      if (second !== "") {
        var output = "<li id='srch_prev' class='item_row selected' stock=''>"+ first +" | "+ second +"</li>";
      }
      else {
        var output = "<li id='srch_prev'class='item_row selected' stock=''>"+ first +"</li>";
      }
      for(var i in data){
        output += "<li id='"+ data[i].item_id +"' class='item_row' stock='stock left: "+ data[i].stock +"'>"+ data[i].item_name +" | "+ data[i].brand +"</li>";
      }
      $(".srch_item_list").html(output);
    }
  };
  function get_item_info(ew){
    $.ajax({
      type: "POST",
      url: "./counter_login_ajax/get_price.php",
      data: {item_id: ew},
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
        var data = JSON.parse(data);
        put_details_to_display(data);
      },
      error: function (data) {
        alert("error refresh the browser")
      }
    })
    function put_details_to_display(ow){
      for (var i in ow) {
        var id = ow[i].item_id;
        item_id = ow[i].item_id;
        // console.log(item_id);
        var price = ow[i].price;
        initial_price = price;
        stock_left = ow[i].stock;
        // console.log(stock_left);
        var name = ow[i].item_name;
        item_name = name;
        var brand = ow[i].brand;
      }
      var put = "<div id='"+ id +"' class='item_details'>";
      put += "<span id='d_q'>1</span>";
      put += "<span id='d_n'>"+ name +" | "+ brand +"</span>";
      put += "<span>₱<span id='d_p_val'>"+ price +"</span></span>";
      put += "</div>";
      // console.log(put);
      $(".display_screen_val").html(put)
    };

  };
  function get_total_amount() {
    var amounts = $(".l_a_val");
    var total = 0;
    for (var i = 0; i < amounts.length; i++) {
      // console.log(parseFloat(amounts.eq(i).text().replace(",","")).toFixed(2));
      total += parseFloat(amounts.eq(i).text().replace(",",""));
    }
    if (total != 0) {
      function numberWithCommas(n) {
        var parts=n.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
      }

      total = numberWithCommas(total.toFixed(2));
      $(".total_amount").text(total);
    } else {
      $(".total_amount").text("0.00");
    }
  }
  function times_amount() {
    var total = (parseInt($("#d_q").text()) * initial_price).toFixed(2)
    function numberWithCommas(n) {
      var parts=n.toString().split(".");
      return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }
    total = numberWithCommas(total);
    $("#d_p_val").text(total);
  }
  function times_amount_duplicate() {
    var total = (parseInt($(".duplicate").find(".l_q").text()) * initial_price).toFixed(2);
    function numberWithCommas(n) {
      var parts=n.toString().split(".");
      return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }
    total = numberWithCommas(total);
    // console.log(total);
    $(".duplicate").find(".l_a_val").text(total);
  }
  function prepend_item() {

    var purchased_item = "";
    purchased_item += "<div class='list_row row_"+ + item_id +"' id='"+ item_id +"'>";
    purchased_item += "<span class='l_i'>"+ $("#d_n").text() +"</span>";
    purchased_item += "<span class='l_q'>"+ $("#d_q").text() +"</span>";
    purchased_item += "<span class='l_a'>₱ <span class='l_a_val'>"+ $("#d_p_val").text() +"</span><span class='delete'>&times;</span></span>";
    purchased_item += "</div>";
    $(".list").prepend(purchased_item);
    get_total_amount() ;
    $("#srch_item").val("").focus();
    $("#quantity").val("");
    $(".display_screen_val").empty();
    $(".display_stock_left").empty();
  }

  var position = 0;
  var duplicate = false;
  var original_dup_val = 0;
  var original_dup_quant = 0;

  $("#srch_item").keyup(function (e) {
    var items = $(".item_row");

    if (e.keyCode == 40 || e.keyCode === 38) {
      e.preventDefault();
    }
    else if (e.keyCode == 37 || e.keyCode == 39) {
    }
    else if (e.keyCode == 8) {
        $("#quantity").val("");
        $(".display_screen_val").empty();
        $(".display_stock_left  ").empty();
        $(".duplicate").children(".l_a").find(".l_a_val").text(original_dup_val);
        $(".duplicate").find(".l_q").text(original_dup_quant);
        $(".duplicate").removeClass("duplicate", "");
        position = 0;

        // console.log(original_dup_val);
        if($.trim($(this).val()) !== ""){
          update_livesearch_query();
        }else if ($.trim($(this).val())  =="") {
          $(".srch_item_list").empty();
        }
    }
    else if (e.keyCode != 13) {
      position = 0;
      if($.trim($(this).val()) !== ""){
        update_livesearch_query();
      }else if ($.trim($(this).val())  =="") {
        $(".srch_item_list").empty();
      }
    }

    if (items.length > 0) {
      if (e.keyCode == 13) {
        var id = $(".selected").attr("id");
        if (id !== "srch_prev") {
          $(".srch_item_list").empty();
          $("#quantity").focus();
          get_item_info(id);

          var row = $(".list_row");
          duplicate = false;
          if (row.length > 0) {
            for (var i = 0; i < row.length; i++) {
              if (row.eq(i).attr("id") == id) {
                duplicate = true;
                duplicated_row = row.eq(i).attr("class");
                original_dup_val = row.eq(i).find(".l_a_val").text();
                original_dup_quant = row.eq(i).find(".l_q").text();
                alert("you already have that item on the list");
                row.eq(i).addClass("duplicate");
                $(".list").animate({
                  scrollTop: row.eq(i).offset().top - ($(".list").offset().top)
                }, 200);
              }
              else {
                row.eq(i).removeClass("duplicate", "");
              }
            }
          }
        }
      }
    }

    if($.trim($(this).val()) == ""){
      $("#quantity").val("");
      $(".display_screen_val").empty();
      $(".display_stock_left  ").empty();
      $(".list_row").removeClass("duplicate", "");
    }
  });
  $("#srch_item").keydown(function (e) {
    var items = $(".item_row");
    if (items.length > 0) {
      if (e.keyCode == 40) {

        position++;
        if (position > $(".item_row").length-1) {
          position = 0;
          $(".item_row").removeClass("selected", "")
          $(".item_row").eq(0).addClass("selected")
          $(this).val($(".selected").text());
          $(".display_stock_left").text($(".selected").attr("stock"))
        }
        else {
          $(".item_row").removeClass("selected", "")
          $(".item_row").eq(position).addClass("selected")
          $(this).val($(".selected").text());
          $(".display_stock_left").text($(".selected").attr("stock"))
        }
      }
      else if (e.keyCode === 38) {
        e.preventDefault();
        position--;
        if (position < 0) {
          position = $(".item_row").length-1;
          $(".item_row").removeClass("selected", "")
          $(".item_row").eq(position).addClass("selected")
          $(this).val($(".selected").text());
          $(".display_stock_left").text($(".selected").attr("stock"))
        }
        else{
          $(".item_row").removeClass("selected", "")
          $(".item_row").eq(position).addClass("selected")
          $(this).val($(".selected").text());
          $(".display_stock_left").text($(".selected").attr("stock"))
        }
      }
    }
  });
  $("#quantity").keyup(function (e) {
    if (e.keyCode === 13) {
      if ($.trim($(this).val())  !== "") {
        if (parseInt($(this).val()) > stock_left) {
          alert(item_name + " only have " + stock_left + " stock(s) left!")
          $(this).val(1);
          $("#d_q").text(1);
          $(".duplicate").find(".l_q").text(1);
          times_amount_duplicate();
        }
        else if ($(this).val() < 0) {
          alert("negative value is not allowed!");
          $(this).val(1);
          $("#d_q").text(1);
          $(".duplicate").find(".l_q").text(1);
          times_amount_duplicate();

        }
        else if (duplicate == true) {
          $("#srch_item").val("").focus();
          $("#quantity").val("");
          $(".display_screen_val").empty();
          $(".display_stock_left").empty();
          $(".list_row").removeClass("duplicate", "");
          get_total_amount();
          setTimeout(
            function () {
              $(".list").animate({ scrollTop: 0 }, 200);
            }, 500)
          }
        else {
          var row = $(".list_row");
          $(".list").animate({ scrollTop: 0 }, 200);
          prepend_item();
        }
      }
    }
    else{
      if (duplicate == true) {
        if ($.trim($(this).val()) == "") {
          $("#d_q").text(1)
          $(".duplicate").find(".l_q").text(1);
        }
        else {
          $(".duplicate").find(".l_q").text($(this).val());
          $("#d_q").text($(this).val())
        }
         times_amount_duplicate();
      }
      else {
        if ($.trim($(this).val()) == "") {
          $("#d_q").text(1)
        }
        else {
          $("#d_q").text($(this).val())
        }
      }
    }
    times_amount();
  })
  $(document).on("click", ".delete", function () {
    $(this).parent().parent().remove();
    get_total_amount();
  })


  $(".pay").click(function () {
    if (parseFloat($(".total_amount").text()) > 0) {
      $(".cash_wrapp").css({"display": "flex"});
      $("#cash").focus();
    }
  })
    $("#cash").keyup(function (e) {
    function numberWithCommas(n) {
      var parts=n.toString().split(".");
      return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }
    var change = ($("#cash").val() - parseFloat($(".total_amount").text().replace(",",""))).toFixed(2);
    change = numberWithCommas(change);
    var div_change = "<div class='change'>Change :&nbsp;<span>₱&nbsp;</span><span class='change_val'>"+ change +"</span></div>"
    $(".display_screen_val").html(div_change);

    if (e.which == 13) {
      $("#cash").blur();
      // console.log(parseFloat($(".total_amount").text().replace(",","")).toFixed(2));
      // console.log($(this).val());
      if (parseFloat($(".total_amount").text().replace(",","")) > parseFloat($(this).val())) {
        alert("kulang pa ang bayad");
        $("#cash").focus();
      }
      else {
        var binili = $(".list_row");
        var count = 0 ;
        traverse();
        function traverse() {
          if (count < binili.length) {
            var id = parseInt(binili.eq(count).attr("id"));
            var quantity = parseInt(binili.eq(count).children(".l_q").text());
            var item = binili.eq(count).children(".l_i").text()
            var cost = binili.eq(count).children(".l_a").find(".l_a_val").text().replace(",","");
            $.ajax({
              type: "POST",
              url: "./counter_login_ajax/insert_transactions.php",
              data: {binili_id: id, trans_item: item, trans_quant: quantity, trans_cost: cost},
              success: function (data) {
                // console.log(data);
              },
              error: function (data) {
                alert("refresh your browser")
              }
            })
            slow();
          }
          else if (count === binili.length) {
            function numberWithCommas(n) {
              var parts=n.toString().split(".");
              return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
            }

            var head_r = "<div class='head'>"+ $(".head").html() +"</div>";
            var list_r = $(".list").html() +"<hr>";
            var total_r = "<div class='total'>"+ $(".total_and_change").html() +"</div>";
            var cash_r = "<div class='cash'>Cash : ₱&nbsp;<span class='cash_amount'>" + numberWithCommas(parseFloat($("#cash").val()).toFixed(2)) + "</span></div>";
            var change_r = "<div class='change_r'>"+ $(".change").html() +"</div>";
            var resibo_laman = head_r + list_r + total_r + cash_r + change_r;
            $(".resibo").html(resibo_laman);
            window.print();
            $(".resibo").html("");
          }
          // console.log(count);
          // console.log(binili.length);
        }
        function slow() {
          setTimeout(function () {
            count++;
            traverse();
          },200)
        }

      }
    }

  })

  $(".clear").click(function () {
    var item_name = "";
    var item_id = 0;
    var initial_price = 0;
    var stock_left = 0;
    $("#cash").val("");
    $(".cash_wrapp").css({"display": "none"});
    $(".display_stock_left").empty();
    $("#srch_item").val("");
    $("#quantity").val("");
    $(".display_screen_val").html("");
    $(".total_amount").text("0.00");
    $(".list_row").remove();

  })


})
