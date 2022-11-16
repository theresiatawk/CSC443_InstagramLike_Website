<?php

include("db_connection.php");

$response = [];

// Removing whitespace and backslashes from both sides of a string
function validate($data){
    $data = trim($data);
    $data = stripslashes($data);
    return $data;
}
if (isset($_GET['user_id_hiding']) && isset($_GET['image_id']) && isset($_GET['user_id_hidden_from'])){

    $user_id_hiding = validate($_GET['user_id_hiding']);
    $img_id = validate($_GET['image_id']);
    $user_id_hidden_from = validate($_GET['user_id_hidden_from']);

    if (empty($user_id_hiding) || empty($img_id) || empty($user_id_hidden_from)) {
        $response ["Error"] = "Some field are empty";
        echo json_encode($response);
        exit();
    }
    else if($user_id_hidden_from == $user_id_hiding){
        $response ["Error"] = "You cannot unhide image from yourself";
        echo json_encode($response);
        exit();
    }
    else{ 
        //Check if not hidden 
        $query = $mysqli->prepare("SELECT * FROM hidden_images WHERE user_id_hiding = ? AND user_id_hidden_from = ? AND image_id = ?");
        $query->bind_param("iii", $user_id_hiding, $user_id_hidden_from, $img_id);
        $query->execute();
        $result = $query->get_result();
        if (mysqli_num_rows($result) == 0) {
            $response ["Error"] = "This image is not hidden to unhide it";
            echo json_encode($response);
            exit();
        }
        else{
            // Check for eligibility
            $query1 = $mysqli->prepare("SELECT * FROM images WHERE id = ? AND user_id = ?");
            $query1->bind_param("ii", $img_id, $user_id_hiding);
            $query1->execute();
            $result1 = $query1->get_result();

            if (mysqli_num_rows($result1) == 0) {
                $response ["Error"] = "You cannot unhide this image";
                echo json_encode($response);
                exit();
            }
            else{
                // Check if user with this id exist
                $query2 = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
                $query2->bind_param("i", $user_id_hidden_from);
                $query2->execute();
                $result2 = $query2->get_result();

                if (mysqli_num_rows($result2) == 0) {
                    $response ["Error"] = "Invalid User";
                    echo json_encode($response);
                    exit();
                }
                else{
                    $query3 = $mysqli->prepare("DELETE FROM hidden_images WHERE user_id_hiding = ? AND user_id_hidden_from = ? AND image_id = ?");
                    $query3->bind_param("iii", $user_id_hiding, $user_id_hidden_from, $img_id);
                    $query3->execute();
                    $response ["Success"] = "Image Unhidden";
                    echo json_encode($response);
                    exit();
                }
            }
        }
    }
}
else{
    $response ["Error"] = "Some field are required";
    echo json_encode($response);
    exit();
}
?>
