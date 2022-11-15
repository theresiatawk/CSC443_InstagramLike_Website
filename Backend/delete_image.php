<?php

include("db_connection.php");

$response = [];

// Removing whitespace and backslashes from both sides of a string
function validate($data){
    $data = trim($data);
    $data = stripslashes($data);
    return $data;
}
if (isset($_GET['user_id']) && isset($_GET['id'])){

    $user_id = validate($_GET['user_id']);
    $img_id = validate($_GET['id']);

    if (empty($user_id) || empty($img_id)) {
        $response ["Error"] = "Some fields are empty";
        echo json_encode($response);
        exit();
    }
    else{
        // Check for image with this id and this user_id
        $query1 = $mysqli->prepare("SELECT * FROM images WHERE id = ? AND user_id = ?");
        $query1->bind_param("ii", $img_id, $user_id);
        $query1->execute();
        $result1 = $query1->get_result();

        if (mysqli_num_rows($result1) == 0) {
            $response ["Error"] = "Cannot Delete Image";
            echo json_encode($response);
            exit();
        }
        else{
            // Deleteing the image from uploads file
            $image = $result1->fetch_assoc();
            $img_url = $image["url"];
            $img_path = 'uploads/'.$img_url;
            unlink($img_path);

            // Deleteing image from the database
            $query2 = $mysqli->prepare("DELETE FROM images WHERE id = ? AND user_id = ?");
            $query2->bind_param("ii", $img_id, $user_id);
            $query2->execute();
            $response ["Success"] = "Image Deleted";
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