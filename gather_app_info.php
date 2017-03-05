<?php
date_default_timezone_set('America/Los_Angeles');

$output = [];
$output['success'] = false;

$pages = glob('app_info/*.php');

//check if any files were gathered
if($pages){
    $info = [];
    foreach($pages as $page){
        $info[] = json_decode(file_get_contents("HTTP://$_SERVER[HTTP_HOST]".dirname($_SERVER['PHP_SELF']).'/'.$page), true);
    }
    $output['success'] = true;
    $output['pages'] = $info;
}else{
    $output['success'] = false;
}
print_r(json_encode($output));
?>