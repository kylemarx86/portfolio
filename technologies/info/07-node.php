<?php
$data = [];
$data['name'] = 'Node.js';

$data['image_src'] = 'technologies/images/node.png';

$data['apps'] = [];
$data['apps'][] = 'Learn Poker';

print(json_encode($data));
?>