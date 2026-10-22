<?php
include '../config/db.php';

if (isset($_POST['add_product'])) {
    // Form-il ninnu data edukkuka
    $name = $_POST['name'];
    $desc = $_POST['description'];
    $price = $_POST['price'];
    $category = $_POST['category'];
    $stock = $_POST['stock'];
    $light = $_POST['light'];
    $watering = $_POST['watering'];
    $pet_safety = $_POST['pet_safety'];
    $size = $_POST['size'];

    // Image Upload Logic
    $target_dir = "../../frondend/images/"; // Images frontend-il save cheyyan
    $image_name = basename($_FILES["image"]["name"]);
    $target_file = $target_dir . $image_name;

    // Image upload aavunnundo ennu check cheyyuka
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
        
        // Database-il data insert cheyyuka
        $sql = "INSERT INTO products (name, description, price, image, category_id, stock, light, watering, pet_safety, size) 
                VALUES ('$name', '$desc', '$price', '$image_name', '$category', '$stock', '$light', '$watering', '$pet_safety', '$size')";
        
        if ($conn->query($sql) === TRUE) {
           echo "<script>alert('Plant Added Successfully!'); window.location='manage_products.php';</script>";
        } else {
            echo "Error: " . $conn->error;
        }
    } else {
        echo "<script>alert('Image Upload Failed!');</script>";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Add New Plant - Golden Aura Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container mt-5 mb-5">
        <div class="card shadow">
            <div class="card-header bg-success text-white text-center">
                <h3>🌿 Add New Plant to Golden Aura</h3>
            </div>
            <div class="card-body">
                <form method="POST" enctype="multipart/form-data">
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Plant Name</label>
                            <input type="text" name="name" class="form-control" placeholder="e.g. Philodendron Pink Princess" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Price (₹)</label>
                            <input type="number" name="price" class="form-control" placeholder="e.g. 299" required>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea name="description" class="form-control" rows="3" placeholder="Plant-ne pattiya vivaranam..." required></textarea>
                    </div>

                    <div class="row">
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Light</label>
                            <input type="text" name="light" class="form-control" placeholder="e.g. Bright indirect" required>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Watering</label>
                            <input type="text" name="watering" class="form-control" placeholder="e.g. Every 7 days" required>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Pet Safety</label>
                            <input type="text" name="pet_safety" class="form-control" placeholder="e.g. Toxic to pets" required>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Size</label>
                            <input type="text" name="size" class="form-control" placeholder="e.g. 5 inch pot" required>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Category</label>
                            <select name="category" class="form-select" required>
                                <option value="">Select Category</option>
                                <option value="1">Exotic Rare</option>
                                <option value="2">Foliage</option>
                                <option value="3">Succulents</option>
                                <option value="4">Easy Care</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Stock Quantity</label>
                            <input type="number" name="stock" class="form-control" value="10" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Plant Image</label>
                            <input type="file" name="image" class="form-control" accept="image/*" required>
                        </div>
                    </div>

                    <div class="d-grid">
                        <button type="submit" name="add_product" class="btn btn-success btn-lg">Add Plant to Store</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>