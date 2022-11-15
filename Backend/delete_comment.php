<?php

include("db_connection.php");

$response = [];

// Removing whitespace and backslashes from both sides of a string
function validate($data){
    $data = trim($data);
    $data = stripslashes($data);
    return $data;
}
if (isset($_GET['user_id']) && isset($_GET['image_id'])){

    $user_id = validate($_GET['user_id']);
    $img_id = validate($_GET['image_id']);

    if (empty($user_id) || empty($img_id)) {
        $response ["Error"] = "Some fields are empty";
        echo json_encode($response);
        exit();
    }
    else{
        // Check for like with this image_id and this user_id
        $query1 = $mysqli->prepare("SELECT * FROM comments WHERE image_id = ? AND user_id = ?");
        $query1->bind_param("ii", $img_id, $user_id);
        $query1->execute();
        $result1 = $query1->get_result();

        if (mysqli_num_rows($result1) == 0) {
            $response ["Error"] = "Cannot Delete Comment";
            echo json_encode($response);
            exit();
        }
        else{
            // Deleteing like from the database
            $query2 = $mysqli->prepare("DELETE FROM comments WHERE image_id = ? AND user_id = ?");
            $query2->bind_param("ii", $img_id, $user_id);
            $query2->execute();
            $response ["Success"] = "Comment Deleted";
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