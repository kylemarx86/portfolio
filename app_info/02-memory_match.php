<?php
$data = [];
$data['name'] = 'Memory Match';

$data['description'] = [];
$data['description']['tech_used'] = ['HTML', 'JavaScript', 'jQuery', 'Google Maps API', 'CSS',];
$data['description']['details'] = [];
$data['description']['details'][] = 'Uses JavaScript to control game logic, manage game statistics, and monitor win conditions';
$data['description']['details'][] = 'jQuery was used to dynamically generate the game board of DOM elements';
$data['description']['details'][] = 'Utilizes Google Maps API to place markers on a map representing locations of matched National Parks';
$data['description']['details'][] = 'Employs CSS to style the page, animate actions, and make the display responsive';

// $data['picture_source'] = 'app_pics/memory_match-big.png';
$data['picture_source'] = 'app_pics/memory_match.png';
$data['live_address'] = 'http://dev.kylemarx86.com/memory_match/';
$data['github_address'] = 'https://github.com/kylemarx86/memory_match_clone';

print(json_encode($data));
?>