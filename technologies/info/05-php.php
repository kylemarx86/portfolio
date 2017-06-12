<?php
$data = [];
$data['name'] = 'PHP';

$data['image_src'] = 'technologies/images/php.png';

$data['apps'] = [];
$data['apps'][] = 'iBet';
$data['apps'][] = 'Student Grade Table';

print(json_encode($data));
?>