<?php
include '../config/db.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    header("Location: manage_products.php");
    exit;
}

// Ippolathe product details edukkuka
$sql = "SELECT * FROM products WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    echo "Product not found.";
    exit;
}

$product = $result->fetch_assoc();

// Form submit aayal update cheyyuka
if (isset($_POST['update_product'])) {
    $name = $_POST['name'];
    $desc = $_POST['description'];
    $price = $_POST['price'];
    $category = $_POST['category'];
    $stock = $_POST['stock'];
    $light = $_POST['light'];
    $watering = $_POST['watering'];
    $pet_safety = $_POST['pet_safety'];
    $size = $_POST['size'];

    // Image update logic (Puthiya image upload cheythal mathram update aavum)
    if (!empty($_FILES["image"]["name"])) {
        $target_dir = "../../frondend/images/";
        $image_name = basename($_FILES["image"]["name"]);
        $target_file = $target_dir . $image_name;

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            // Pazhaya image delete cheyyanam (optional)
            if (!empty($product['image']) && file_exists($target_dir . $product['image'])) {
                unlink($target_dir . $product['image']);
            }
            $image_name = $image_name; // New image name
        }
    } else {
        $image_name = $product['image']; // Pazhaya image thanne use cheyyuka
    }

    $update_sql = "UPDATE products SET 
        name='$name', description='$desc', price='$price', category_id='$category', 
        stock='$stock', light='$light', watering='$watering', pet_safety='$pet_safety', 
        size='$size', image='$image_name' 
        WHERE id=$id";

    if ($conn->query($update_sql) === TRUE) {
        echo "<script>alert('Plant Updated Successfully!'); window.location='manage_products.php';</script>";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Edit Plant - Golden Aura Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container mt-5 mb-5">
        <div class="card shadow">
            <div class="card-header bg-primary text-white">
                <h3>Edit Plant: <?php echo $product['name']; ?></h3>
            </div>
            <div class="card-body">
                <form method="POST" enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Plant Name</label>
                            <input type="text" name="name" class="form-control" value="<?php echo $product['name']; ?>" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Price (₹)</label>
                            <input type="number" name="price" class="form-control" value="<?php echo $product['price']; ?>" required>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea name="description" class="form-control" rows="3" required><?php echo $product['description']; ?></textarea>
                    </div>

                    <div class="row">
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Light</label>
                            <input type="text" name="light" class="form-control" value="<?php echo $product['light']; ?>" required>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Watering</label>
                            <input type="text" name="watering" class="form-control" value="<?php echo $product['watering']; ?>" required>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Pet Safety</label>
                            <input type="text" name="pet_safety" class="form-control" value="<?php echo $product['pet_safety']; ?>" required>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Size</label>
                            <input type="text" name="size" class="form-control" value="<?php echo $product['size']; ?>" required>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Category</label>
                            <select name="category" class="form-select" required>
                                <option value="1" <?php if($product['category_id'] == 1) echo 'selected'; ?>>Exotic Rare</option>
                                <option value="2" <?php if($product['category_id'] == 2) echo 'selected'; ?>>Foliage</option>
                                <option value="3" <?php if($product['category_id'] == 3) echo 'selected'; ?>>Succulents</option>
                                <option value="4" <?php if($product['category_id'] == 4) echo 'selected'; ?>>Easy Care</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Stock Quantity</label>
                            <input type="number" name="stock" class="form-control" value="<?php echo $product['stock']; ?>" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label class="form-label">Current Image</label><br>
                            <img src="../../frondend/images/<?php echo $product['image']; ?>" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; margin-bottom: 5px;"><br>
                            <input type="file" name="image" class="form-control" accept="image/*">
                            <small class="text-muted">Leave empty to keep current image.</small>
                        </div>
                    </div>

                    <div class="d-flex gap-2">
                        <button type="submit" name="update_product" class="btn btn-primary w-50">Update Plant</button>
                        <a href="manage_products.php" class="btn btn-secondary w-50">Cancel</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>