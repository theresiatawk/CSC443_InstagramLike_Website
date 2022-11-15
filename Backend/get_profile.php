<?php
include("db_connection.php");

$response = [];

function validate($data){
    // Removing whitespace and backslashes from both sides of a string
    $data = trim($data);
    $data = stripslashes($data);
    return $data;
}
if (isset($_GET['user_id'])) {

    $user_id = validate($_GET['user_id']);

    if (empty($user_id)) {
        $response ["Error"] = "Id is empty";
        echo json_encode($response);
        exit();
    }
    else{
        // Check if user with this id exist
        $query = $mysqli->prepare("SELECT * FROM users WHERE id = ? ");
        $query->bind_param("i", $user_id);
        $query->execute();
        $result = $query->get_result();

        // if exist display its info
        if (mysqli_num_rows($result) != 0) {
            $raw = mysqli_fetch_assoc($result);
            $response["Success"] = $raw;
            echo json_encode($response);
            exit();
        }   
        else{
            $response["Error"] = "Invalid User";
            echo json_encode($response);
            exit();
        }
    }
}
else{
    $response ["Error"] = "Some field are required";
    echo json_encode($response);
    exit();
}
?>