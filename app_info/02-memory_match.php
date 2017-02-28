<?php
$data = [];
$data['name'] = 'Memory Match';

$data['description'] = [];
$data['description']['tech_used'] = ['HTML', 'JavaScript', 'jQuery', 'Google Maps API', 'CSS',];
$data['description']['lines'] = [];
$data['description']['lines'][] = 'Uses JavaScript to control game logic, (to stuff with game statistics), monitor win conditions';
$data['description']['lines'][] = 'Uses Google Maps API to place markers on a map representing locations of matched National Parks';
$data['description']['lines'][] = 'Employs CSS to style the page and to make the display responsive';

// $data['picture_source'] = 'app_pics/memory_match-big.png';
$data['picture_source'] = 'app_pics/memory_match.png';
$data['live_address'] = 'http://dev.kylemarx86.com/memory_match/';
$data['github_address'] = 'https://github.com/kylemarx86/memory_match';

print(json_encode($data));
?>