<?php
session_start();
require_once './inc/fun.php';
require_once './inc/connect.php';

  if (!isset($_SESSION["admin"])) {
    $_SESSION["admin"] = false;
  }
  if($_SESSION["admin"] === true){
    redirectTo("admin/manage.php");
  }


  if (!isset($_SESSION["staff"])) {
    $_SESSION["staff"] = false;
  }
  if($_SESSION["staff"] === true){
    redirectTo("cashier.php");
  }

  if(!isset($_POST["submit_admin"])){
    $username = "";
  } else {
    $username = $_POST["username_admin"];
    $password = $_POST["password_admin"];

    $requiredField = array("username_admin", "password_admin");
    foreach ($requiredField as $field) {
      $value = trim($_POST[$field]);
      if(!checkPresence($value)){
        $errors[$field] = fieldname_as_text($field) . " field is blank!";
      }
    }
    if(empty($errors)){
      if(attempt_login($username, $password)){
        $_SESSION["admin"] = true;
        redirectTo("admin/manage.php");

      } else {
        $key = "combination";
        $errors[$key] = "wrong username/password!";
        }
      }
    }

    if(!isset($_POST["submit_staff"])){
      $username_s = "";
    } else {
      $username_s = $_POST["username_staff"];
      $password_s = $_POST["password_staff"];

      $requiredField_s = array("username_staff", "password_staff");
      foreach ($requiredField_s as $field_s) {
        $value_s = trim($_POST[$field_s]);
        if(!checkPresence($value_s)){
          $errors_s[$field_s] = fieldname_as_text($field_s) . " field is blank!";
        }
      }
      if(empty($errors_s)){
        if(attempt_login_s($username_s, $password_s)){
          $_SESSION["staff"] = true;
          redirectTo("cashier.php");
        } else {
          $key = "combination";
          $errors_s[$key] = "wrong username/password!";
          }
        }
      }
/*
$user= mysql_prep("staff");
$pass=password_hash("staff", PASSWORD_BCRYPT, ['cost' => 10]);

$query = "INSERT INTO staff ";
$query .= "(username, password) ";
$query .= "VALUES ('{$user}', '{$pass}')";
$result = mysqli_query($connection, $query);
*/
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Famous | Login</title>
    <link rel="icon" href="counter_login_style/ico.png">
    <link rel="stylesheet" href="counter_login_style/login_stylee.css">
  </head>
  <body>
    <header><span class="fa">Famous</span>|<span class="en">Enterprise</span></header>
    <h2>Log In</h2>
    <div class="forms">
      <form class="form_admin" action="login.php" method="post">
        <h3>Admin</h3>
        <label for="username_admin">Username</label>
        <div class="username_wrapp">
          <input id="username_admin" type="username"<?php error_field_design('username_admin');?> name="username_admin" value="<?php echo $username;?>" placeholder="username">
          <div class="form_error_message_user">
            <?php
            if(!empty($errors["username_admin"])){
              echo $errors["username_admin"];
            }
            ?>
          </div>
        </div>
        <label for="password_admin">Password</label>
        <div class="pass_wrapp">
          <input id="password_admin" type="password"<?php error_field_design('password_admin');?> name="password_admin" value="" placeholder="password">
          <div class="form_error_message_passandcom">
            <?php
            if(!empty($errors["password_admin"])){
              echo $errors["password_admin"];
            }
            elseif(!empty($errors["combination"])){
              echo $errors["combination"];
            }
            ?>
          </div>
        </div>

        <input class="sub" type="submit" name="submit_admin" value="Login">
      </form>

      <hr>

      <form class="form_staff" action="login.php" method="post">
        <h3>Staff</h3>
        <label>Username</label>
        <div class="user_wrapp_s">
          <input type="username"<?php error_field_design_s('username_staff');?> name="username_staff" value="<?php echo $username_s;?>" placeholder="username">
          <div class="form_error_message_user_s">
            <?php
            if(!empty($errors_s["username_staff"])){
              echo $errors_s["username_staff"];
            }
            ?>
          </div>
        </div>

        <label>Password</label>
        <div class="pass_wrapp_s">
          <input type="password"<?php error_field_design_s('password_staff');?> name="password_staff" value="" placeholder="password">
          <div class="form_error_message_passandcom_s">
            <?php
            if(!empty($errors_s["password_staff"])){
              echo $errors_s["password_staff"];
            }
            elseif(!empty($errors_s["combination"])){
              echo $errors_s["combination"];
            }
            ?>
          </div>
        </div>

        <input class="sub" type="submit" name="submit_staff" value="Login">
      </form>
    </div>

  </body>
  <script src="counter_login_js/jquery.js" charset="utf-8"></script>
  <script src="counter_login_js/loginn.js" charset="utf-8"></script>
</html>















<?php
mysqli_close($connection)
?>
