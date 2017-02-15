<?php
$data = [];
$data['name'] = 'Memory Match';

$data['description'] = [];
$data['description']['tech_used'] = ['html','jQuery'];
$data['description']['lines'] = [];
$data['description']['lines'][] = 'lorem ipsem for now';
$data['description']['lines'][] = 'lorem ipsem jQuery';

$data['picture'] = 'app_pics/memory_match-big.png';
$data['live_address'] = 'http://dev.kylemarx86.com/memory_match/';
$data['github_address'] = 'https://github.com/kylemarx86/memory_match';

// print_r($data);
print(json_encode($data));
?>