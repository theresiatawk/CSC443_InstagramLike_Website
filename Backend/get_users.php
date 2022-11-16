<?php

include("db_connection.php");

$response = [];

// Check if image exist
$query1 = "SELECT id, first_name, last_name FROM users";
$result1 = mysqli_query($mysqli, $query1);
if (mysqli_num_rows($result1) == 0) {
    $response ["Error"] = "No users";
    echo json_encode($response);
    exit();
}
else {
    while($user = mysqli_fetch_assoc($result1)){
        $response[] = $user;

    }; 
    echo json_encode($response);
    exit();
}
?>