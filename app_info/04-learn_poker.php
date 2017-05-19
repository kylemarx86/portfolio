<?php
$data = [];
$data['name'] = 'Learn Poker';

$data['description'] = [];
$data['description']['tech_used'] = ['HTML', 'JavaScript', 'jQuery', 'RequireJS', 'Node.js'];
$data['description']['details'] = [];
$data['description']['details'][] = 'Educational application intended to help users learn to identify poker hands and their relative strength';
$data['description']['details'][] = 'Uses an object oriented model to create cards and identify hands';
$data['description']['details'][] = 'Utilizes RequireJS to maintain orderly file structure';

$data['picture_source'] = 'app_pics/learn_poker-wide.png';
$data['live_address'] = 'http://dev.kylemarx86.com/learn_poker/';
$data['github_address'] = 'https://github.com/kylemarx86/learn_poker';

print(json_encode($data));
?>