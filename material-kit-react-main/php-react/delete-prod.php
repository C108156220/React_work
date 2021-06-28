<?php
// delete-user.php is for deleting an existing user.
// Method: POST - http://localhost/php-react/delete-user.php
// Required Fields: id --> EmpId

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->prod_id) && is_numeric($data->prod_id)) {
    $delID = $data->prod_id;
    $deleteUser = mysqli_query($db_connection, "DELETE FROM `product` WHERE `ProdId`='$delID'");
    if ($deleteUser) {
        echo json_encode(["success" => 1, "msg" => "User Deleted"]);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not Found!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "User Not Found!"]);
}
?>