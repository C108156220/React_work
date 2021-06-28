<?php
header('Access-Control-Allow-Origin: *');

$connect = mysqli_connect("localhost","root","","mmisdb");
$sql = "SELECT seq, OrderId as ID, EmpId as eID, CustId as cID, OrderDate as orderdate, Descript as note  FROM salesorder";
mysqli_query($connect,'SET NAMES utf8');
$result = mysqli_query($connect,$sql);
$json_array = array();
while($row = mysqli_fetch_assoc($result)){
    $json_array[] = $row;
}
echo json_encode($json_array);
?>