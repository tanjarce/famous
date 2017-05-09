$(document).ready(function () {
  var usererror = $(".form_error_message_user");
  var userl = $.trim(usererror.text()).length;
  if (userl == 0) {
    usererror.css({
      "display":"none",
    })
  }
  else if (userl > 0) {
    usererror.css({
      "display":"block",
    })
    $("#user").focus();
  }

  console.log($.trim(usererror.text()));
  if ($.trim(usererror.text()) == "Username field is blank!") {
    $("#user").css({"border": "solid rgb(255, 54, 54) 2px"})
  }


  var passerror = $(".form_error_message_passandcom");
  var passl = $.trim(passerror.text()).length;
  console.log($.trim(passerror.text()));
  if (passl == 0) {
    passerror.css({
      "display":"none",
    })
  }
  else if (passl > 0) {
    passerror.css({
      "display":"block",
    })
    $("#pass").focus();

  }

  if ($.trim(passerror.text()) == "wrong username/password!") {
    $("#pass").css({"border": "solid rgb(255, 54, 54) 2px"})
    $("#user").css({"border": "solid rgb(255, 54, 54) 2px"})
    $("#pass").focus();
  }
  if ($.trim(passerror.text()) == "Password field is blank!") {
    $("#pass").css({"border": "solid rgb(255, 54, 54) 2px"})
  }
  if ($.trim(usererror.text()) == "Username field is blank!" && $.trim(passerror.text()) == "Password field is blank!") {
    $("#user").focus();

  }



  var usererror = $(".form_error_message_user_s");
  var userl = $.trim(usererror.text()).length;
  if (userl == 0) {
    usererror.css({
      "display":"none",
    })
  }
  else if (userl > 0) {
    usererror.css({
      "display":"block",
    })
    $("#user").focus();
  }

  console.log($.trim(usererror.text()));
  if ($.trim(usererror.text()) == "Username field is blank!") {
    $("#user").css({"border": "solid rgb(255, 54, 54) 2px"})
  }


  var passerror = $(".form_error_message_passandcom_s");
  var passl = $.trim(passerror.text()).length;
  console.log($.trim(passerror.text()));
  if (passl == 0) {
    passerror.css({
      "display":"none",
    })
  }
  else if (passl > 0) {
    passerror.css({
      "display":"block",
    })
    $("#pass").focus();

  }

  if ($.trim(passerror.text()) == "wrong username/password!") {
    $("#pass").css({"border": "solid rgb(255, 54, 54) 2px"})
    $("#user").css({"border": "solid rgb(255, 54, 54) 2px"})
    $("#pass").focus();
  }
  if ($.trim(passerror.text()) == "Password staff field is blank!") {
    $("#pass").css({"border": "solid rgb(255, 54, 54) 2px"})
  }
  if ($.trim(usererror.text()) == "Username staff field is blank!" && $.trim(passerror.text()) == "Password staff field is blank!") {
    $("#user").focus();
  }
})
