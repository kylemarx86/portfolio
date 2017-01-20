<?php
$output = [];
$output['success'] = false;
$data = glob("images/*.jpg");
$output['files'] = $data;
$output['success'] = true;

$output = json_encode($output);

print_r($output);
?>