$(document).ready(function () {
  var shit = setInterval(function () {
    auto_check()
  }, 1000);

  auto_check();
// calling the function para sa tuloytuloy na pagcheck sa updates about the inventory

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
// the initial state ng variable na gagamitin sa ididisplay sa notification at yung ipangkukumapara

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
        if (display_notification.notification_number !== ipangkukumapara.notification_number || display_notification.notification_list !== ipangkukumapara.notification_list) {
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

  if(display_notification.notification_number == 0){
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
// function para maupdate din yung bar na nakadisplay

});
