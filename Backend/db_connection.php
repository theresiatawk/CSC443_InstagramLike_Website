<?php
$db_host = "localhost";
$db_user = "root";
$db_pass = null;
$db_name = "instagramlikedb";

// Establishing connection between the database and the apis
$db_connection = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if(!$db_connection){
    die("Connection_failed!");
}
?>