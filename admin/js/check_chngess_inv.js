$(document).ready(function () {



  var shit = setInterval(function () {
    auto_check()
  }, 1000)
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

              // console.log("error: " + request + status + err);
          }
      }
    })
  }
  var display_notification =[];
  function compare_two_array(ew) {
    var ipangkukumapara = [];
    for (var i in ew) {
      var percent = ew[i].stock/ew[i].max_stock_quantity*100;
      if(percent <= 20){
        ipangkukumapara.push("<li class='list_notif'><b><span class='ntf_brnd'>"+ ew[i].brand +"</span> | <span class='ntf_name'>"+ ew[i].item_name +"</span></b> only have "+ ew[i].stock +" stocks left! </li>")
      }
      if (i == ew.length-1) {
        if (display_notification != ipangkukumapara) {
          display_notification = ipangkukumapara;
          if(display_notification.length != 0){
            $(".notification").append("<span class='notification_number'>"+ display_notification.length +"</span>")
            $(".notifications_list").html(display_notification);
          }
          else {
            $(".notification_number").remove();
            $(".notification_number").text(null)
            $(".notifications_list").html("<li>No notification</li>");
          }
        }
        // else {
        //   if(display_notification.length == 0){
        //     $(".notification_number").text(null)
        //     $(".notifications_list").html("<li>No notification</li>");
        //   }
        // }
      }
    }
  }
    if(display_notification.length == 0){
      $(".notification_number").text(null)
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

})
