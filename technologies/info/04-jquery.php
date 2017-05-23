<?php
$data = [];
$data['name'] = 'jQuery';

$data['image_src'] = 'technologies/images/jquery.png';

$data['apps'] = [];
$data['apps'][] = 'iBet';
$data['apps'][] = 'Memory Match';
$data['apps'][] = 'Student Grade Table';
$data['apps'][] = 'Learn Poker';

print(json_encode($data));
?>