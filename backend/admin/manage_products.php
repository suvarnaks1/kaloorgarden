<?php
include '../config/db.php';

// Database-il ninnu ella products-um edukkuka
$sql = "SELECT * FROM products ORDER BY id DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Manage Plants - Golden Aura Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
</head>
<body class="bg-light">
    <div class="container mt-5 mb-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
    <div class="d-flex align-items-center gap-3">
        <a href="index.php" class="btn btn-outline-secondary btn-sm"><i class="bi bi-arrow-left"></i> Dashboard</a>
        <h2 class="mb-0">🌿 Manage Plants</h2>
    </div>
    <a href="add_product.php" class="btn btn-success"><i class="bi bi-plus-circle"></i> Add New Plant</a>
</div>
            <h2>🌿 Manage Plants</h2>
            <a href="add_product.php" class="btn btn-success"><i class="bi bi-plus-circle"></i> Add New Plant</a>
        </div>

        <div class="card shadow">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover align-middle">
                        <thead class="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if ($result->num_rows > 0): ?>
                                <?php while($row = $result->fetch_assoc()): ?>
                                    <tr>
                                        <td><?php echo $row['id']; ?></td>
                                        <td>
                                            <img src="../../frondend/images/<?php echo $row['image']; ?>" 
                                                 alt="<?php echo $row['name']; ?>" 
                                                 style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                                        </td>
                                        <td><?php echo $row['name']; ?></td>
                                        <td>₹<?php echo $row['price']; ?></td>
                                        <td><?php echo $row['stock']; ?></td>
                                        <td>
                                            <!-- Edit Button -->
                                            <a href="edit_product.php?id=<?php echo $row['id']; ?>" 
                                               class="btn btn-sm btn-primary">
                                                <i class="bi bi-pencil-square"></i> Edit
                                            </a>
                                            
                                            <!-- Delete Button -->
                                            <a href="delete_product.php?id=<?php echo $row['id']; ?>" 
                                               class="btn btn-sm btn-danger"
                                               onclick="return confirm('Are you sure you want to delete this plant?');">
                                                <i class="bi bi-trash"></i> Delete
                                            </a>
                                        </td>
                                    </tr>
                                <?php endwhile; ?>
                            <?php else: ?>
                                <tr>
                                    <td colspan="6" class="text-center">No products found. Add some plants!</td>
                                </tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>
</html>