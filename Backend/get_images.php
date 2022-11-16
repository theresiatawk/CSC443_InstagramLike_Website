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
        $query1 = $mysqli->prepare("SELECT * FROM users WHERE id = ? ");
        $query1->bind_param("i", $user_id);
        $query1->execute();
        $result1 = $query1->get_result();
        
        if (mysqli_num_rows($result1) != 0) {
            $query2 = $mysqli->prepare("SELECT first_name, last_name, url, caption, i.id
                                        FROM users as u, images as i 
                                        WHERE u.id = i.user_id 
                                        AND i.id NOT IN (
                                            SELECT image_id 
                                            FROM hidden_images 
                                            WHERE user_id_hidden_from = ?
                                        )");
            $query2->bind_param("i", $user_id);
            $query2->execute();
            $result2 = $query2->get_result();
            if (mysqli_num_rows($result2) == 0) {
                $response ["Error"] = "No Images";
                echo json_encode($response);
                exit();
            }
            else{
                // Returning all images with all info
                while($image = mysqli_fetch_assoc($result2)){
                    $response[] = $image;
                };
                echo json_encode($response);
                exit();
            }
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