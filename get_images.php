<?php
$output = [];
$output['success'] = false;
$data = glob("app_pics/*.png");
$output['files'] = $data;
$output['success'] = true;

$output = json_encode($output);

print_r($output);
?>