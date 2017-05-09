<?php

function redirectTo($location){
  header("Location:" . $location);
  exit;
}

function confirm_query($resulta){
  if(!$resulta){
      die("query failed!");
  }
}

function checkPresence($value){
  return isset($value) && $value !== "";
}

function fieldname_as_text($fieldname) {
  $fieldname = str_replace("_", " ", $fieldname);
  $fieldname = ucfirst($fieldname);
  return $fieldname;
}

function mysql_prep($string) {
  global $connection;

  $escaped_string = mysqli_real_escape_string($connection, $string);
  return $escaped_string;
}

function find_admin_by_username($username) {
  global $connection;

  $safe_username = mysqli_real_escape_string($connection, $username);

  $query  = "SELECT * ";
  $query .= "FROM admin ";
  $query .= "WHERE username = '{$safe_username}' ";
  $query .= "LIMIT 1";
  $admin_set = mysqli_query($connection, $query);
  confirm_query($admin_set);
  if($admin = mysqli_fetch_assoc($admin_set)) {
    return $admin;
  } else {
    return null;
  }
}
function find_staff_by_username($username_s) {
  global $connection;

  $safe_username = mysqli_real_escape_string($connection, $username_s);

  $query  = "SELECT * ";
  $query .= "FROM staff ";
  $query .= "WHERE username = '{$safe_username}' ";
  $query .= "LIMIT 1";
  $staff_set = mysqli_query($connection, $query);
  confirm_query($staff_set);
  if($staff = mysqli_fetch_assoc($staff_set)) {
    return $staff;
  } else {
    return null;
  }
}

function attempt_login($username, $password) {
  $admin = find_admin_by_username($username);
  if ($admin) {
    if (password_verify($password, $admin["password"])) {
      return $admin;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function attempt_login_s($username_s, $password_s) {
  $staff = find_staff_by_username($username_s);
  if ($staff) {
    if (password_verify($password_s, $staff["password"])) {
      return $staff;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function error_field_design($ano){
  global $errors;
  if(!empty($errors[$ano]) || !empty($errors["combination"])){
    echo "class='error_field'";
  }
}
function error_field_design_s($ano){
  global $errors_s;
  if(!empty($errors_s[$ano]) || !empty($errors_s["combination"])){
    echo "class='error_field'";
  }
}


?>
