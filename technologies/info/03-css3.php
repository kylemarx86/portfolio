<?php
$data = [];
$data['name'] = 'CSS3';

$data['image_src'] = 'technologies/images/css3.png';

$data['apps'] = [];
$data['apps'][] = 'iBet';
$data['apps'][] = 'Memory Match';
$data['apps'][] = 'Student Grade Table';
$data['apps'][] = 'Learn Poker';

print(json_encode($data));
?>