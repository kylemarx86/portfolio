<?php
$data = [];
$data['name'] = 'JavaScript';

$data['image_src'] = 'technologies/images/js.png';

$data['apps'] = [];
$data['apps'][] = 'iBet';
$data['apps'][] = 'Memory Match';
$data['apps'][] = 'Student Grade Table';
$data['apps'][] = 'Learn Poker';

print(json_encode($data));
?>