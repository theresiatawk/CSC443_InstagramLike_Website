<?php

include("db_connection.php");

$response = [];

// Removing whitespace and backslashes from both sides of a string
function validate($data){
    $data = trim($data);
    $data = stripslashes($data);
    return $data;
}
if (isset($_POST['user_id']) && isset($_FILES['url']) && isset($_POST['caption']) && isset($_POST['submit'])){

    $user_id = validate($_POST['user_id']);
    $img_caption = validate($_POST['caption']);

    $img_name = $_FILES['url']['name'];
    $img_size = $_FILES['url']['size'];
    $tmp_name = $_FILES['url']['tmp_name'];
    $error = $_FILES['url']['error'];

    // if no file was added
    if ($error === 4){
        $response ["Error"] = "No Photo to add";
        echo json_encode($response);
        exit();
    }
    else if($error === 0){
        // if file is too large
        if($img_size > 125000){
            $response ["Error"] = " Sorry photo is too large";
            echo json_encode($response);
            exit();  
        }
        else{
            $img_extension = pathinfo($img_name, PATHINFO_EXTENSION);
            $img_extension_lc = strtolower($img_extension);

            $allowed_extension = array("jpg", "jpeg", "png");
            //Checking for file extension
            if(in_array($img_extension_lc, $allowed_extension)){
                // Check if user with this id exist
                $query1 = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
                $query1->bind_param("i", $user_id);
                $query1->execute();
                $result1 = $query1->get_result();

                if (mysqli_num_rows($result1) == 0) {
                    $response ["Error"] = "Invalid User";
                    echo json_encode($response);
                    exit();
                }
                else{
                    // Uploaidng te image on our server in uploads folder
                    $new_img_name = uniqid("IMG- ", true).".".$img_extension_lc;
                    $img_upload_path = 'uploads/'.$new_img_name;
                    move_uploaded_file($tmp_name, $img_upload_path);
                    // Insert the image into the database
                    $query = $mysqli->prepare("INSERT INTO images(user_id, url, caption) VALUES (?, ?, ?)");
                    $query->bind_param("sss", $user_id, $new_img_name, $img_caption);
                    $query->execute();
                    $response ["Success"] = "Image Added";
                    echo json_encode($response);
                    exit();
                }
            }
            else{
                $response ["Error"] = " You can't upload files of this type";
                echo json_encode($response);
                exit();
            }
        }
    }
    else{
        $response ["Error"] = "An error occured while uploading the photo";
        echo json_encode($response);
        exit();
    }
}
else{
    $response ["Error"] = "Some field are required";
    echo json_encode($response);
    exit();
}
?>
