<?php
date_default_timezone_set('America/Los_Angeles');

$output = [];
$output['success'] = false;

$pages = glob('app_info/*.php');

//check if any files were gathered
if($pages){
    $info = [];

    //need to look up how to use file_get_contents without using the long form
    $prefix = 'http://localhost:8888/lfz/portfolio/';
    foreach($pages as $page){
        $info[] = json_decode(file_get_contents('http://localhost:8888/lfz/portfolio/'.$page), true);
    }
    $output['success'] = true;
    $output['pages'] = $info;
}else{
    $output['success'] = false;
}
$output = json_encode($output);
print_r($output);
?>