<?php
$host = "localhost";
$user = "root";
$pass = ""; // XAMPP default empty aanu
$dbname = "goldenaura";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>