$(document).ready(function () {
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
  initial_item_table();
  function initial_item_table() {
    $.ajax({
      type: "GET",
      url: "./ajax/Post_Get_items.php",
      success: function (data) {
        $(".item_list").html(data);
      }
    })
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
        $(".item_list").html(data);
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
              console.log(count);
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

  })
  $(document).on("keyup", "#search_item", function () {
    post_get_items();
  });
  // $(document).on("focus", "#search_item", function () {
  //   var filter = $(".filters_wrapper");
  //   console.log();
  //   if(filter.innerHeight() < 40){
  //     $(".item_list_wrapper").css({"display": "flex"});
  //     $(".filters_wrapper").removeClass("hide", "");
  //     $(".sales_wrapper").removeClass("up", "");
  //     setTimeout(function () {
  //       $(".item_list_wrapper").removeClass("hide", "");
  //       initial_item_table();
  //     }, 200);
  //   }
  // })


////////////////////////////////////////////////////

                    // EDIT ITEMS

////////////////////////////////////////////////////

function post_get_original_row(id) {
  $.ajax({
    type: "POST",
    url: "./ajax/post_get_original_row.php",
    data: {item_id: id},
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
      // console.log(data);
      var data = JSON.parse(data);
      var original = "";

      for (var i in data) {
        original += "<span class='item_id'>"+ data[i].item_id +"</span>";
        original += "<div class='item_data data_name'>"+ data[i].item_name +"</div>";
        original += "<div class='item_data data_category'>"+ data[i].category +"</div>";
        original += "<div class='item_data data_brand'>"+ data[i].brand +"</div>";
        original += "<div class='item_data data_price'><span>₱</span><span id='data_price_val'> "+ data[i].price +"</span></div>";
        original += "<div class='item_data data_availability'>"+ data[i].availability +"</div>";
        original += "<div class='item_data action'><button id='edit_btn'>Edit</button><button id='delete_btn'>Delete</button></div>";
      }
      $(".selected").html(original);
    },
    error: function (data) {
      alert("Please reload your browser something went wrong.")
    }
  })
};
function make_edit_row(id, item, category, brand, price, availability) {
  $.ajax({
    type: "GET",
    url: "./ajax/edit_row.php",
    success: function (data, edit_format) {
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
      var categ = Array();
      var brnd = Array();
      for (var i in data) {
        if (data[i].category !== undefined) {
          categ.push(data[i].category);
        }
      };
      for (var i in data) {
        if (data[i].brand !== undefined) {
          brnd.push(data[i].brand);
        }
      };


      var edit_format = "<span class='item_id'>"+ id +"</span>";
    /////////// item //////////////////
      edit_format += "<div class='item_data data_name'>"+ item +"</div>";
    /////////// category //////////////////////
      edit_format += "<div class='item_data data_category'>";
      edit_format += "<select class='input' id='edit_cat_val'>";
      var selected = "";
      for (var i in categ) {
        if (category == categ[i]) {
          selected = "selected";
        } else {
          selected = "";
        }
        edit_format += "<option value='"+ categ[i] +"' "+ selected +">"+ categ[i] +"</option>";
      }
      edit_format += "<option value='new'>&plus; New Category</option>";
      edit_format += "</select>"
      edit_format += "</div>"
    /////////// brand //////////////////////
      edit_format += "<div class='item_data data_brand'>";
      edit_format += "<select class='input' id='edit_brnd_val'>";
      var selected = "";
      for (var i in brnd) {
        if (brand == brnd[i]) {
          selected = "selected";
        } else {
          selected = "";
        }
        edit_format += "<option value='"+ brnd[i] +"' "+ selected +">"+ brnd[i] +"</option>";
      }
      edit_format += "<option value='new'>&plus; New Brand</option>";
      edit_format += "</select>"
      edit_format += "</div>"
    /////////// price //////////////////
      edit_format += "<div class='item_data data_price'><input class='input' id='edit_price_val' type='number' value='"+ price +"'></div>"
    /////////// avilable //////////////////
      var yes = "";
      var no = "";
      if (availability == "yes") {
        yes = "checked";
      } else {
        no = "checked";
      }
      edit_format += "<div class='item_data data_availability'>";
      edit_format += "<input type='radio' name='avail' value='yes' "+ yes +"><span>Yes</span>";
      edit_format += "<input type='radio' name='avail' value='no' "+ no +"><span>No</span>";
      edit_format += "</div>";
      /////////// action //////////////////
      edit_format += "<div class='item_data action'><button class='edit_save_btn'>Save</button><button class='edit_cancel_btn'>Cancel</button></div>";
      $(".selected").html(edit_format);
    },
    error: function (data) {
      alert("Please reload your browser something went wrong.")
    }
  });
};
function update_item(id, cat, brnd, price, avail) {
  $.ajax({
    type: "POST",
    url: "./ajax/update_item.php",
    data: {update_id: id, update_cat: cat, update_brnd: brnd, update_price: price, update_avail: avail},
    success: function (data) {

      $(".notifications_wrapper").html("<span id='close_notification'>&times;</span><h2>Updated Succesfully :)</h2>")
      show_notification();
      setTimeout(function () {
        $(".notifications_wrapper").removeClass("show", "");
        $(".notifications_wrapper").css({"display": "none"});
      }, 2000)
    }
  })
};

var mayineedit = false;

$(document).on("click", "#edit_btn", function () {
  var this_row = $(this).parent().parent();
  var id = this_row.children(".item_id").text();
  var item = this_row.children(".data_name").text();
  var category = this_row.children(".data_category").text();
  var brand = this_row.children(".data_brand").text();
  var price = parseFloat(this_row.children(".data_price").children("#data_price_val").text()).toFixed(2);
  var availability = this_row.children(".data_availability").text();

  // console.log(price);
  if (mayineedit == false) {
    setTimeout(function () {
      $(".item_row").removeClass('selected', '');
      setTimeout(function () {
        this_row.addClass('selected');
        setTimeout(function () {
          make_edit_row(id, item, category, brand, price, availability);
        }, 50)
      }, 50)
    }, 50)
    mayineedit = true;
  }
  else {
    var selected = $(".selected");
    select_item_id = selected.children('.item_id').text();
    console.log(selected);
    setTimeout(function () {
      post_get_original_row(select_item_id);
      setTimeout(function () {
        $(".item_row").removeClass('selected', '');
        setTimeout(function () {
          this_row.addClass('selected');
          setTimeout(function () {
            make_edit_row(id, item, category, brand, price, availability);
          }, 50)
        }, 50)
      }, 50);
    }, 100)
    mayineedit = true;
  }
});
$(document).on("click", ".edit_cancel_btn", function () {
  var selected = $(".selected");
  select_item_id = selected.children('.item_id').text();
  console.log(select_item_id);
  setTimeout(function () {
    post_get_original_row(select_item_id);
    setTimeout(function () {
      $(".item_row").removeClass('selected', '');
    }, 50)
  }, 100)
  mayineedit = false;
});
$(document).on("click", ".edit_save_btn", function () {
  var this_row = $(this).parent().parent();
  var cat = $("#edit_cat_val").val();
  var brnd = $("#edit_brnd_val").val();
  var price = $("#edit_price_val").val();
  var avail = $("input[name='avail']:checked").val();

  var blank = false;
  var inputs = $(".input");

  for (var i = 0; i < inputs.length; i++) {
    inputs.eq(i).css({"border": "none"});
    if ($.trim(inputs.eq(i).val()) == "") {
      inputs.eq(i).css({"border": "solid red 2px"});
      blank = true;
    }
  }

  var id = this_row.children(".item_id").text();
  if (blank == false) {
    setTimeout(function () {
      update_item(id, cat, brnd, price, avail);
      setTimeout(function () {
        post_get_original_row(id);
          setTimeout(function () {
            get_category();
            setTimeout(function () {
              get_brand();
              setTimeout(function () {
                get_category_option();
                setTimeout(function () {
                  get_brand_option();
                }, 50)
              }, 50)
            }, 50)
          }, 50)
          setTimeout(function () {
            $(".item_row").removeClass('selected', '');
          }, 50)
      }, 100)
    }, 50)
  };
  mayineedit = false;
});

$(document).on("change", "#edit_cat_val", function () {
  if ($(this).val() == "new") {
    $(this).parent().html("<input type='text' placeholder='New Category' id='edit_cat_val' class='input'>")
  }
});
$(document).on("change", "#edit_brnd_val", function () {
  if ($(this).val() == "new") {
    $(this).parent().html("<input type='text' placeholder='New Brand' id='edit_brnd_val' class='input'>")
  }
});
////////////////////////////////////////////////////

                    // ADD ITEMS

////////////////////////////////////////////////////

  get_category_option();
  get_brand_option();

  function show_notification() {
    $(".notifications_wrapper").css({"display": "flex"});
    $(".notifications_wrapper").addClass("show");
  }
  function get_category_option() {
    $.ajax({
      type: "GET",
      url: "./ajax/get_category_option.php",
      success: function (data) {
        linis(data);
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
        linis(data);
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
  function add_item(item, category, brand, price, quantity) {
    $.ajax({
      type: "POST",
      url: "./ajax/add_item.php",
      data: {item: item, category: category, brand: brand, price: price, quantity: quantity},
      success: function (data) {

        $(".load").css({"display": "none"});
        $(".notifications_wrapper").html("<span id='close_notification'>&times;</span><h2>"+ item + " Added :)</h2>")
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
    })
  }
  function reset_add_item() {
    $(".add_item_wrapper").removeClass("slide", "");
    $(".field").css({"border": "none"});
    $(".field").val("");
    $(".item_category").html("<select class='add_item_category  field'></select>");
    $(".item_brand").html("<select class='add_item_brand field'></select>");
    get_category_option();
    get_brand_option();
  }

  $(document).on("change", ".add_item_category", function () {
    if ($(this).val() == "+ New Category") {
      $(this).parent().html("<input type='text' class='add_item_category field' placeholder='New Category'>");
      $(".add_item_category").focus();
    }
  })
  $(document).on("change", ".add_item_brand", function () {
    if ($(this).val() == "+ New Brand") {
      $(this).parent().html("<input type='text' class='add_item_brand field' placeholder='New Brand'>");
      $(".add_item_brand").focus();
    }
  })

  $("#add_btn").click(function () {
    $(".item_name").focus();
    setTimeout(function () {
      $(".add_item_wrapper").addClass("slide");
    }, 100)
  })
  $(".add_item_btn").click(function () {
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
        fields.eq(i).css({"border": "solid red 2px"});
        error = true;
      }
    }
    if (error == false) {
      add_item(item, category, brand, price, quantity);
      $(".load").css({"display": "block"})
    }
  })
  $(".cancel_btn").click(function () {
    reset_add_item();
  })


  ////////////////////////////////////////////////////

                      // DELETE ITEMS

  ////////////////////////////////////////////////////

  function hide() {
    $(".item_row").removeClass("selected", "")
    $(".pangharang").css({"display": "none"});
    $(".notifications_wrapper").removeClass("show", "");
    $(".notifications_wrapper").css({"display": "none"});
  }
  function delete_item(id) {
    $.ajax({
      type: "POST",
      url: "./ajax/delete_item.php",
      data: {item_id_delete: id},
      success: function (data) {
        setTimeout(function () {
          post_get_items();
          setTimeout(function () {
            get_category();
            get_brand();
            setTimeout(function () {
              get_category_option();
              get_brand_option()
              $(".notifications_wrapper").html("<h2>Item Deleted</h2>");
              setTimeout(function () {
                hide();
              }, 1000)
            }, 50)
          }, 50)
        }, 50)
        mayineedit = false;
      }
    })
  }

  $(document).on("click", "#close_notification", function () {
    $(".notifications_wrapper").removeClass("show", "");
  })
  $(document).on("click", "#delete_btn", function () {
    var this_row = $(this).parent().parent();
    var item = $(this).parent().siblings(".data_name").text();
    var category = $(this).parent().siblings(".data_category").text();
    var brand = $(this).parent().siblings(".data_brand").text();

    var text = "<p>Are you sure you want to delete the selected item:</p>";
    text += "<ul><li>Item: "+ item +"</li>";
    text += "<li>Category: "+ category +"</li>";
    text += "<li>Brand: "+ brand +"</li></ul>";
    text += "<div><button id='yes_btn'>Yes</button><button id='cancel_btn'>Cancel</button></div>";

    function show() {
      $(".pangharang").css({"display": "block"});
      $(".notifications_wrapper").html(text);
      show_notification();
    }

    if (mayineedit === true) {
      var selected = $(".selected");
      select_item_id = selected.children('.item_id').text();
      setTimeout(function () {
        post_get_original_row(select_item_id);
        setTimeout(function () {
          $(".item_row").removeClass('selected', '');
          setTimeout(function () {
            this_row.addClass("selected");
            show();
          },50)
        },50);
      },50)
    }
    else {
      this_row.addClass("selected");
      show()
    }
  })
  $(document).on("click", "#cancel_btn", function () {
    hide();
    mayineedit = false;
  })
  $(document).on("click", "#yes_btn", function () {
    var selected = $(".selected");
    select_item_id = selected.children('.item_id').text();
      delete_item(select_item_id);
  })

})
