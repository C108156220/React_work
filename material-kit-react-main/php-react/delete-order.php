<?php
// delete-Order.php is for deleting an existing Order.
// Method: POST - http://localhost/php-react/delete-Order.php
// Required Fields: id --> ProdID

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $delID = $data->id;
    $deleteOrder = mysqli_query($db_connection, "DELETE FROM `salesorder` WHERE `OrderId`='$delID'");
    if ($deleteOrder) {
        echo json_encode(["success" => 1, "msg" => "Order Deleted"]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Order Not Found!~"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Order Not Found!!"]);
}
?>