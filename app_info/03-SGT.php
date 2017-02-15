<?php
$data = [];
$data['name'] = 'Student Grade Table';

$data['description'] = [];
$data['description']['tech_used'] = ['jQuery', 'PHP', 'MySQL', 'Bootstrap'];
$data['description']['lines'] = [];
$data['description']['lines'][] = 'lorem ipsem for now';
$data['description']['lines'][] = 'lorem ipsem student grade table';
$data['description']['lines'][] = 'lorem ipsem Bootstrap';

$data['picture_source'] = 'app_pics/SGT-big.png';
// $data['live_address'] = 'http://dev.kylemarx86.com/SGT/';

$data['live_address'] = 'http://dev.kylemarx86.com/SGT/';
$data['github_address'] = 'https://github.com/kylemarx86/SGT';

// print_r($data);
print(json_encode($data));
?>