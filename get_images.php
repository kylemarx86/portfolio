<?php
date_default_timezone_set('America/Los_Angeles');

$output = [];
$output['success'] = false;
// $data = glob("app_pics/*.png");

// $pics = glob('app_pics/*.png');
// $info = glob('app_info/*.php');
$pages = glob('app_info/*.php');

//check if any files were gathered
if($pages){
    $info = [];
    // $output['data'] = $pages[0];

    // echo $pages[0].'<br>';

    //need to look up how to use file_get_contents without using the long form
    $prefix = 'http://localhost:8888/lfz/portfolio/';
    foreach($pages as $page){
        // $info[] = file_get_contents('http://localhost:8888/lfz/portfolio/'.$page);
        $info[] = json_decode(file_get_contents('http://localhost:8888/lfz/portfolio/'.$page), true);
        // $temp = json_decode($page, true);
        // $info[] = $temp;
    }

    $output['success'] = true;
    // $file_names = ["/iBet/","/memory_match/","/SGT/"];
    // foreach($data as $file_name){

    // }
    // $output['files'] = $data;
    // $output['success'] = true;
    $output['pages'] = $info;
}else{
    $output['success'] = false;
}

$output = json_encode($output);

print_r($output);
?>