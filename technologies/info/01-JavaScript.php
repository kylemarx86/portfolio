<?php
$data = [];
$data['name'] = 'JavaScript';

$data['apps'] = [];
$data['apps'][] = 'iBet';
$data['apps'][] = 'Memory Match';
$data['apps'][] = 'Student Grade Table';
$data['apps'][] = 'Learn Poker';

$data['image_src'] = 'technologies/images/js.png';

print(json_encode($data));
?>