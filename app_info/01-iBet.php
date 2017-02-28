<?php
$data = [];
$data['name'] = 'iBet';

$data['description'] = [];
$data['description']['tech_used'] = ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'APIs', 'Angular', 'HTML', 'CSS'];
$data['description']['details'] = [];
$data['description']['details'][] = 'Allows you to place simulated bets on real sports games utilizing information pulled in through an API';
$data['description']['details'][] = 'Uses PHP and MySQL to create, read, and update entries in database';
$data['description']['details'][] = 'Utilizes PHP to control logic of win conditions and payouts';
$data['description']['details'][] = 'Worked closely with front end written in Angular to create database queries to retrieve upcoming game info, bet history, and leaderboard.';

// $data['picture_source'] = 'app_pics/iBet-big.png';
$data['picture_source'] = 'app_pics/iBet.png';
$data['live_address'] = 'http://dev.danlee.site/c10_sports/';
$data['github_address'] = 'https://github.com/xuesongc4/c10_sports';

print(json_encode($data));
?>