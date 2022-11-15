<?php
 
include("db_connection.php");

$response = [];

function validate($data){
    // Removing whitespace and backslashes from both sides of a string
    $data = trim($data);
    $data = stripslashes($data);
    return $data;
}

if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = validate($_POST['email']);
    // mysqli_real_escape_string() function escapes special characters in $_POST['password'] after any HTML character is converted to a special character and any backslashes is removed.
    $password = mysqli_real_escape_string($mysqli, stripslashes(htmlspecialchars($_POST['password'])));

    if (empty($email)) {
        $response ["Error"] = "Email is required";
        echo json_encode($response);
        exit();
    }
    else if(empty($password)){
        $response ["Error"] = "Password is required";
        echo json_encode($response);
        exit();
    }
    else{
        $query = $mysqli->prepare("SELECT * FROM users WHERE email = ? ");
        $query->bind_param("s", $email);
        $query->execute();
        $result = $query->get_result();
        
        // Check if user exist 
        if(mysqli_num_rows($result) != 0){
            $raw = mysqli_fetch_assoc($result);
            $dbemail = $raw['email'];
            $dbpassword = $raw['password'];
            // Check for match
            if ($dbemail == $email && password_verify($password, $dbpassword)) {
                $response["Success"] = $raw;
                echo json_encode($response);
                exit();
            }   
            else{
                $response ["Error"] = "Incorrect Username or password";
                echo json_encode($response);
                exit();
            }
        }
        else{
            $response ["Error"] = "Incorrect Username or password";
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