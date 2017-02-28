<?php
$data = [];
$data['name'] = 'Student Grade Table';

$data['description'] = [];
$data['description']['tech_used'] = ['HTML', 'JavaScript', 'jQuery', 'PHP', 'MySQL', 'Bootstrap'];
$data['description']['details'] = [];
$data['description']['details'][] = 'Uses PHP and MySQL for create, read, update, and delete operations on the database';
$data['description']['details'][] = 'Uses Bootstrap to format the HTML body and make the display responsive';

// $data['picture_source'] = 'app_pics/SGT-big.png';
$data['picture_source'] = 'app_pics/SGT.png';
$data['live_address'] = 'http://dev.kylemarx86.com/SGT/';
$data['github_address'] = 'https://github.com/kylemarx86/SGT';

print(json_encode($data));
?>