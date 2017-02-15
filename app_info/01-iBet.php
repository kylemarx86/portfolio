<?php
$data = [];
$data['name'] = 'iBet';

$data['description'] = [];
$data['description']['tech_used'] = ['jQuery', 'PHP', 'MySQL'];
$data['description']['lines'] = [];
$data['description']['lines'][] = 'lorem ipsem for now';
$data['description']['lines'][] = 'lorem ipsem iBet';

$data['picture'] = 'app_pics/iBet-big.png';
$data['live_address'] = 'http://dev.danlee.site/c10_sports/';
$data['github_address'] = 'https://github.com/xuesongc4/c10_sports';

// print_r($data);
print(json_encode($data));
?>