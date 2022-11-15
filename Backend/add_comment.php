<?php

include("db_connection.php");

$response = [];

// Removing whitespace and backslashes from both sides of a string
function validate($data){
    $data = trim($data);
    $data = stripslashes($data);
    return $data;
}
if (isset($_POST['user_id']) && isset($_POST['image_id']) && isset($_POST['content'])){
    $user_id = validate($_POST['user_id']);
    $img_id = validate($_POST['image_id']);
    $comment = validate($_POST['content']);

    if (empty($user_id) || empty($img_id) || empty($comment)) {
        $response ["Error"] = "Some fields are empty";
        echo json_encode($response);
        exit();
    }
    else{
        $query1 = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
        $query1->bind_param("i", $user_id);
        $query1->execute();
        $result1 = $query1->get_result();

        $query2 = $mysqli->prepare("SELECT * FROM images WHERE id = ?");
        $query2->bind_param("i", $img_id);
        $query2->execute();
        $result2 = $query2->get_result();

        // Check if user exist
        if (mysqli_num_rows($result1) == 0) {
            $response ["Error"] = "Invalid user";
            echo json_encode($response);
            exit();
        }
        // Check if image exist
        else if (mysqli_num_rows($result2) == 0) {
            $response ["Error"] = "Invalid image";
            echo json_encode($response);
            exit();
        }
        else{      
            $query3 = $mysqli->prepare("INSERT INTO comments(image_id, user_id, content) VALUES (?, ?, ?)");
            $query3->bind_param("iis", $img_id, $user_id, $comment);
            $query3->execute();
            $response ["Success"] = "Comment Added";
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