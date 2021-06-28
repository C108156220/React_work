<?php
// add-user.php is for inserting new users into the database.
// Method: POST - http://localhost/php-react/add-user.php
// Required Fields – user_name --> EmpName, user_email --> JobTitle

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
    isset($data->prod_name)
    && isset($data->prod_id)
    && !empty(trim($data->prod_name))
    && !empty(trim($data->prod_id))
) {
    $prodname = mysqli_real_escape_string($db_connection, trim($data->prod_name));
    $prodid = mysqli_real_escape_string($db_connection, trim($data->prod_id));
    $prodprice = mysqli_real_escape_string($db_connection, trim($data->prod_price));
    $prodcost = mysqli_real_escape_string($db_connection, trim($data->prod_cost));
    $insertProd = mysqli_query($db_connection, "INSERT INTO `product`(`ProdName`,`ProdID`,`UnitPrice`,`Cost`) VALUES('$prodname','$prodid','$prodprice','$prodcost')");
    if ($insertProd) {
        echo json_encode(["success" => 1, "msg" => "User Inserted."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>