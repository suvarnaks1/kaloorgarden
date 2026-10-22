<?php
include '../config/db.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    // Aadyam image name edukkuka (folder-il ninnu delete cheyyan)
    $sql = "SELECT image FROM products WHERE id = $id";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $image_path = "../../frondend/images/" . $row['image'];
        
        // Image file undel delete cheyyuka
        if (!empty($row['image']) && file_exists($image_path)) {
            unlink($image_path);
        }
    }

    // Database-il ninnu delete cheyyuka
    $delete_sql = "DELETE FROM products WHERE id = $id";
    
    if ($conn->query($delete_sql) === TRUE) {
        echo "<script>alert('Plant Deleted Successfully!'); window.location='manage_products.php';</script>";
    } else {
        echo "Error deleting record: " . $conn->error;
    }
} else {
    header("Location: manage_products.php");
}
?>