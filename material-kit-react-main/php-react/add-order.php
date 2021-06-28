<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->ID)
    && isset($data->eID)
    && isset($data->cID)
    && isset($data->orderdate)
    && !empty(trim($data->ID))
    && !empty(trim($data->eID))
    && !empty(trim($data->cID))
    && !empty(trim($data->orderdate))
) {
    $ID = mysqli_real_escape_string($db_connection, trim($data->ID));
    $eID = mysqli_real_escape_string($db_connection, trim($data->eID));
    $cID = mysqli_real_escape_string($db_connection, trim($data->cID));
    $orderdate = mysqli_real_escape_string($db_connection, trim($data->orderdate));
    $note = mysqli_real_escape_string($db_connection, trim($data->descript));
    $insertOrder = mysqli_query($db_connection, "INSERT INTO `salesorder`(`OrderId`,`EmpId`,`CustId`,`OrderDate`,`Descript`) VALUES('$ID','$eID','$cID','$orderdate','$note')");
    if ($insertOrder) {
        echo json_encode(["success" => 1, "msg" => "Order Inserted."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Order Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>