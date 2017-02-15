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

    echo $pages[0].'<br>';

    foreach($pages as $page){
        $info[] = file_get_contents('http://localhost:8888/lfz/portfolio/'.$page);
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