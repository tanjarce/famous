$(document).ready(function(){
  function get_brand(){
    $.ajax({
      url: "./counter_login_ajax/get_brand.php",
      type: "GET",
      success: function (data) {
        ayos(data);
      }
    })
    function ayos(asd){
      asd = asd.replace(/\\n/g, "\\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f");
      asd = asd.replace(/[\u0000-\u0019]+/g,"");
     asd = JSON.parse(asd);
      let options = "<option value='brand'>Brand</option>";
      for(var i in asd){
        options += "<option value='"+ asd[i].brand +"'>"+ asd[i].brand +"</option>"
      }
      $(".lu_brand").html(options)
    }
  }
  function get_category(){
    $.ajax({
      url: "./counter_login_ajax/get_category.php",
      type: "GET",
      success: function (data) {
        ayos(data);
      }
    })
    function ayos(asd){
      asd = asd.replace(/\\n/g, "\\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f");
      asd = asd.replace(/[\u0000-\u0019]+/g,"");
     asd = JSON.parse(asd);
      let options = "<option value='category'>Category</option>";
      for(var i in asd){
        options += "<option value='"+ asd[i].category +"'>"+ asd[i].category +"</option>"
      }
      $(".lu_category").html(options)
    }
  }
  function list(){
    const c = $(".lu_category").val();
    const b = $(".lu_brand").val();

   $.ajax({
     url: "./counter_login_ajax/look.php",
     type: "POST",
     data: {cat: c, bra: b},
     success: function (data) {
       if (data.length <= 0 ) {
         $(".lu_listt").html("<div class='no_match'>No Match Found</div>")
       }
       else{
         $(".lu_listt").html(data)
       }
     }
   })

  }
  get_brand();
  get_category();
  $(".look_up").click(function(){
    $(".look_up_container").css({"transform": "translateX(0)", "opacity": "1"});
    get_brand();
    get_category();
  })
  $(".x-button").click(function(){
    $(".look_up_container").css({"transform": "translateX(700px)", "opacity": "0.5"})
    get_brand();
    get_category();
    $.ajax({
      url: "./counter_login_ajax/look.php",
      type: "POST",
      data: {cat: null, bra: null},
      success: function (data) {
        if (data.length <= 0 ) {
          $(".lu_listt").html("<div class='no_match'>No Match Found</div>")
        }
        else{
          $(".lu_listt").html(data)
        }
      }
    })

  })
  $(".lu_category, .lu_brand").change(function(){
    list()
  })
  $.ajax({
    url: "./counter_login_ajax/look.php",
    type: "GET",
    success: function (data) {
      ayos(data);
    }
  })
  function ayos(asd){
    $(".lu_listt").html(asd)
  }
})
