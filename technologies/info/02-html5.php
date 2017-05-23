<?php
$data = [];
$data['name'] = 'HTML5';

$data['image_src'] = 'technologies/images/html5.png';

$data['apps'] = [];
$data['apps'][] = 'iBet';
$data['apps'][] = 'Memory Match';
$data['apps'][] = 'Student Grade Table';
$data['apps'][] = 'Learn Poker';

print(json_encode($data));
?>