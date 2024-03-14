<?php
include("connection.php");

$sql = "SELECT * FROM `employees`";


if ($result = mysqli_query($conn, $sql)) {
    $data = [];
    while ($fetch = mysqli_fetch_assoc($result)) {
        $data[] = $fetch;
    }
    echo json_encode($data);

} else {
    echo "Error: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
