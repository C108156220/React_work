<?php
header('Access-Control-Allow-Origin: *');

$connect = mysqli_connect("localhost","root","","mmisdb");
$sql = "SELECT ProdName as name, ProdID as ID, UnitPrice as price, Cost as cost  FROM product";
mysqli_query($connect,'SET NAMES utf8');
$result = mysqli_query($connect,$sql);
$json_array = array();
while($row = mysqli_fetch_assoc($result)){
    $json_array[] = $row;
}
echo json_encode($json_array);
?>