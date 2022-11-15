<?php

include("db_connection.php");

$response = [];

// Removing whitespace and backslashes from both sides of a string
function validate($data){
    $data = trim($data);
    $data = stripslashes($data);
    return $data;
}
if (isset($_POST['id']) && isset($_POST['first_name']) && isset($_POST['last_name']) && isset($_POST['email'])){

    $id = validate($_POST['id']);
    $first_name = validate($_POST['first_name']);
    $last_name = validate($_POST['last_name']);
    $email = validate($_POST['email']);

    if (empty($id) || empty($first_name) || empty($last_name) || empty($email)) {
        $response ["Error"] = "Some fields are empty";
        echo json_encode($response);
        exit();
    }
    else{
        // Check if user with this id exist
        $query1 = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
        $query1->bind_param("i", $id);
        $query1->execute();
        $result1 = $query1->get_result();

        if (mysqli_num_rows($result1) == 0) {
            $response ["Error"] = "Invalid User";
            echo json_encode($response);
            exit();
        }
        else{
            // Check if user with the new email exist
            $query2 = $mysqli->prepare("SELECT * FROM users WHERE email = ? AND id != ?");
            $query2->bind_param("si", $email, $id);
            $query2->execute();
            $result2 = $query2->get_result();
            if (mysqli_num_rows($result2) != 0) {
                $response ["Error"] = "This email is already registered";
                echo json_encode($response);
                exit();
            }
            else{
                $query = $mysqli->prepare("UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?");
                $query->bind_param("ssss", $first_name, $last_name, $email, $id);
                $query->execute();
                $response ["Success"] = "Profile Updated";
                echo json_encode($response);
                exit();
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