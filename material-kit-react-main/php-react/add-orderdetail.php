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
    && isset($data->pID)
    && isset($data->qty)
    && isset($data->discount)
    && !empty(trim($data->ID))
    && !empty(trim($data->pID))
    && !empty(trim($data->qty))
    && !empty(trim($data->discount))
) {
    $ID = mysqli_real_escape_string($db_connection, trim($data->ID));
    $pID = mysqli_real_escape_string($db_connection, trim($data->pID));
    $qty = mysqli_real_escape_string($db_connection, trim($data->qty));
    $discount = mysqli_real_escape_string($db_connection, trim($data->discount));
    $insertDetail = mysqli_query($db_connection, "INSERT INTO `orderdetail`(`OrderId`,`ProdId`,`Qty`,`Discount`) VALUES('$ID','$pID','$qty','$discount')");
    if ($insertDetail) {
        echo json_encode(["success" => 1, "msg" => "Detail Inserted."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Detail Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>