<?php
$data = [];
$data['name'] = 'MySQL';

$data['image_src'] = 'technologies/images/mysql.png';

$data['apps'] = [];
$data['apps'][] = 'iBet';
$data['apps'][] = 'Student Grade Table';

print(json_encode($data));
?>