<?php
// update-user.php is for updating an existing user.
// Method: POST - http://localhost/php-react/update-user.php
// Required Fields: id --> EmpId, user_name --> EmpName, user_job --> JobTitle

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->prod_name)
    && !empty(trim($data->prod_name))
) {
    $prodseq = mysqli_real_escape_string($db_connection, trim($data->prod_seq));
    $prodname = mysqli_real_escape_string($db_connection, trim($data->prod_name));
    $prodid = mysqli_real_escape_string($db_connection, trim($data->prod_id));
    $prodqty = mysqli_real_escape_string($db_connection, trim($data->prod_qty));
    $proddis = mysqli_real_escape_string($db_connection, trim($data->prod_discount));
    $updateProd = mysqli_query($db_connection, "UPDATE `orderdetail` SET `ProdId`='$prodname', `Qty`='$prodqty',  `Discount`='$proddis'WHERE `seq`='$prodseq'");
    if ($updateUser) {
        echo json_encode(["success" => 1, "msg" => "Orderdetail Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Orderdetail Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>