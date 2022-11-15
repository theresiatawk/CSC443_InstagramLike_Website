<?php
$db_host = "localhost";
$db_user = "root";
$db_pass = null;
$db_name = "instagramlikedb";

// Establishing connection between the database and the apis
$mysqli = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

if(!$mysqli){
    die("Connection_failed!");
}
?>