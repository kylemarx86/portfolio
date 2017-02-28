<?php
$data = [];
$data['name'] = 'Memory Match';

$data['description'] = [];
$data['description']['tech_used'] = ['HTML', 'JavaScript', 'jQuery', 'Google Maps API', 'CSS',];
$data['description']['details'] = [];
$data['description']['details'][] = 'Uses JavaScript to control game logic, (to stuff with game statistics), monitor win conditions';
$data['description']['details'][] = 'Uses Google Maps API to place markers on a map representing locations of matched National Parks';
$data['description']['details'][] = 'Employs CSS to style the page and to make the display responsive';

// $data['picture_source'] = 'app_pics/memory_match-big.png';
$data['picture_source'] = 'app_pics/memory_match.png';
$data['live_address'] = 'http://dev.kylemarx86.com/memory_match/';
$data['github_address'] = 'https://github.com/kylemarx86/memory_match';

print(json_encode($data));
?>