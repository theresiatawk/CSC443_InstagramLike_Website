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
            $query3 = $mysqli->prepare("INSERT INTO likes(image_id, user_id) VALUES (?, ?)");
            $query3->bind_param("ii", $img_id, $user_id);
            $query3->execute();
            $response ["Success"] = "Like Added";
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