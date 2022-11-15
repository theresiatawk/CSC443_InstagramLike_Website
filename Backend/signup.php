<?php
include("db_connection.php");

$response = [];

function validate($data){
    // Removing whitespace and backslashes from both sides of a string
    $data = trim($data);
    $data = stripslashes($data);
    return $data;
}

if (isset($_POST['first_name']) && isset($_POST['last_name']) && isset($_POST['email']) && isset($_POST['password'])){

    $first_name = validate($_POST['first_name']);
    $last_name = validate($_POST['last_name']);
    $email = validate($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    if (empty($first_name) || empty($last_name) || empty($email) || empty($password)) {
        $response ["Error"] = "Some field are empty";
        echo json_encode($response);
        exit();
    }
    else{
        // Check if account already exist
        $query1 = $mysqli->prepare("SELECT * FROM users WHERE email = ? ");
        $query1->bind_param("s", $email);
        $query1->execute();
        $result = $query1->get_result();
        if (mysqli_num_rows($result) != 0) {
            $response ["Error"] = "This account already exist";
            echo json_encode($response);
            exit();
        }
        else{
            $query2 = $mysqli->prepare("INSERT INTO users(first_name, last_name, email, password) VALUES (?, ?, ?, ?);");
            $query2->bind_param("ssss", $first_name, $last_name, $email, $password);
            $query2->execute();
            $response ["Success"] = "Account Created";
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