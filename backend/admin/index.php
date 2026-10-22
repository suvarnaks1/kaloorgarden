<?php
// Ithu Admin Panel-inte main dashboard aanu
?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard - Golden Aura</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <style>
        body { background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .sidebar { background-color: #2c3e50; min-height: 100vh; color: white; padding-top: 20px; }
        .sidebar a { color: #bdc3c7; text-decoration: none; display: block; padding: 15px 20px; font-size: 16px; transition: 0.3s; }
        .sidebar a:hover, .sidebar a.active { background-color: #34495e; color: white; border-left: 4px solid #27ae60; }
        .sidebar i { margin-right: 10px; }
        .main-content { padding: 30px; }
        .dashboard-card { border: none; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: 0.3s; }
        .dashboard-card:hover { transform: translateY(-5px); box-shadow: 0 8px 15px rgba(0,0,0,0.1); }
        .card-icon { font-size: 40px; margin-bottom: 15px; }
    </style>
</head>
<body>

<div class="container-fluid">
    <div class="row">
        <!-- Sidebar -->
        <div class="col-md-2 sidebar d-none d-md-block p-0">
            <h4 class="text-center py-3 border-bottom border-secondary">🌿 Golden Aura</h4>
            <a href="index.php" class="active"><i class="bi bi-speedometer2"></i> Dashboard</a>
            <a href="manage_products.php"><i class="bi bi-box-seam"></i> Manage Products</a>
            <a href="add_product.php"><i class="bi bi-plus-circle"></i> Add New Product</a>
            <a href="../../frondend/index.html" target="_blank"><i class="bi bi-shop"></i> View Store</a>
        </div>

        <!-- Main Content -->
        <div class="col-md-10 main-content">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Admin Dashboard</h2>
                <div class="text-muted">Welcome, Admin!</div>
            </div>

            <!-- Quick Stats / Action Cards -->
            <div class="row g-4">
                <!-- Manage Products Card -->
                <div class="col-md-4">
                    <a href="manage_products.php" class="text-decoration-none text-dark">
                        <div class="card dashboard-card text-center p-4 h-100">
                            <div class="text-success card-icon"><i class="bi bi-list-check"></i></div>
                            <h5>Manage Products</h5>
                            <p class="text-muted small">View, Edit or Delete existing plants.</p>
                        </div>
                    </a>
                </div>

                <!-- Add Product Card -->
                <div class="col-md-4">
                    <a href="add_product.php" class="text-decoration-none text-dark">
                        <div class="card dashboard-card text-center p-4 h-100">
                            <div class="text-primary card-icon"><i class="bi bi-plus-square"></i></div>
                            <h5>Add New Product</h5>
                            <p class="text-muted small">Add a new plant to your store.</p>
                        </div>
                    </a>
                </div>

                <!-- View Store Card -->
                <div class="col-md-4">
                    <a href="../../frondend/index.html" target="_blank" class="text-decoration-none text-dark">
                        <div class="card dashboard-card text-center p-4 h-100">
                            <div class="text-warning card-icon"><i class="bi bi-shop-window"></i></div>
                            <h5>View Store</h5>
                            <p class="text-muted small">Go to the live frontend website.</p>
                        </div>
                    </a>
                </div>
            </div>
            
            <!-- Info Note -->
            <div class="alert alert-info mt-5">
                <i class="bi bi-info-circle"></i> <strong>Note:</strong> Ithu Admin Panel-inte main page aanu. Ivide ninnu plants manage cheyyam.
            </div>
        </div>
    </div>
</div>

</body>
</html>