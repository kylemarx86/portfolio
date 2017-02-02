var image_array = [];
var current_image_index = null;

$(document).ready(function () {
    load_files();
});

//make ajax call to get_images.php and saves those images to image_array
function load_files() {
    $.ajax({
        url: 'get_images.php',
        dataType: 'json',
        success: function (response) {
            if(response.success){
                // console.log(response);
                console.log(response.files.length);
                var image_count = response.files.length;

                //identify carousel container
                var $carousel_container = $('.apps_carousel');
                //create container to place images and buttons in
                var $container = $('<div>').attr('id','image_container');
                //add container to body
                $carousel_container.append($container);
                //gather all images
                var files = response.files;
                //set up the gathered images
                for(var i = 0; i < files.length; i++){
                    image_array.push($('<img>').attr('src', files[i]));
                    $('#image_container').append(image_array[i]);
                }
                //initialize pictures
                initialize_pictures();

                //set up carousel buttons
                set_up_carousel_buttons();

                //add bar to the bottom of the carousel
                var $number_bar = $('<div>').addClass('number_bar');
                $carousel_container.append($number_bar);
                //add numbers to the bottom of the carousel
                for(var i = 0; i < image_count; i++){
                    var $nav_number = $('<div>').addClass('nav_number').text(i+1);
                    $($number_bar).append($nav_number);
                }

                //add event handlers to buttons
                apply_event_handlers();

                //create numbered areas to jump to specific

                // var dot = $('<div>').addClass('dot');
                // $('#image_container').append(dot);
//                        console.log(files.length);
//                        createNavigationDots(files.length);
            }
        },
        error: function (response) {
            console.log('connection error');
        }
    });
}

//sets up pictures for display
function initialize_pictures() {
    //create an image and set the source
    current_image_index = 0;

    for(var i = 1; i < image_array.length; i++){
        image_array[i].css('left','100%');
    }
    image_array[0].css('left','0%');
}

//sets up the buttons in the carousel for images of apps
function set_up_carousel_buttons() {
    //identify carousel container
    var $carousel_container = $('.apps_carousel');
    //create next and previous buttons and attach the appropriate handler
    var $prev_button = $('<button>').addClass('prev_button skewed');
    var $next_button = $('<button>').addClass('next_button');
    var $skewed = $('<div>').addClass('skewed next_btn_part');
    var $circle = $('<div>').addClass('circle next_btn_part');

    //add parts to the next button
    $next_button.append($skewed);
    $next_button.append($circle);

    //add buttons to container
    $carousel_container.append($prev_button);
    $carousel_container.append($next_button);
}

function get_next_image(){
    remove_event_handlers();      //disable event handlers for both buttons while picture updates
    setTimeout(apply_event_handlers, 3000);
    update_image(1);        //while waiting for event handlers to be reapplied
}

function get_prev_image() {
    remove_event_handlers();      //disable event handlers for both buttons while picture updates
    setTimeout(apply_event_handlers, 3000);
    update_image(-1);        //while waiting for event handlers to be reapplied
}

//takes param direction,
//if direction = 1, then we will move forward through the image array (i.e. increase index)
//if direction = -1, then we will move backward through the image array (i.e. decrease index)
function update_image(direction) {
    //declare new image
    var new_image_index = null;
    //declare animation time duration in ms
    var time_duration = 3000;
    if(direction === 1){
        if (current_image_index < image_array.length - 1) {
            new_image_index = current_image_index + 1;
        } else {
            new_image_index = 0;
        }
    }else{
        if(current_image_index > 0){
            new_image_index = current_image_index - 1;
        }else{
            new_image_index = image_array.length - 1;
        }
    }
    //prepare new image for move in
    $(image_array[new_image_index]).css('left', direction*100+'%');
    //slide previous image out
    $(image_array[current_image_index]).animate({left: -100*direction+'%'},time_duration);
    //slide new image in
    $(image_array[new_image_index]).animate({left: '0'},time_duration);
    //update current_image_index
    current_image_index = new_image_index;
}
//function to enable click handlers on buttons
function apply_event_handlers() {
    $('.prev_button').click(get_prev_image);
    $('.next_button').click(get_next_image);
    //events always on
    //keeps all parts of next button highlighted together
    $('.next_btn_part').hover(function () {
        $('.next_button').find('.next_btn_part').toggleClass('highlighted_button');
    });
}
//function to disable event handlers while picture is updating
function remove_event_handlers(){
    $('.prev_button').off('click');
    $('.next_button').off('click');
}
//function to add navigation dots to the carousel
function createNavigationDots(numberOfImages){
    var image_container = $('#image_container');
    var dotContainer = $('<div>').addClass('dot_container');
    for(var i = 0; i < numberOfImages; i++){
        var dot = $('<div>').addClass('dot');
        dotContainer.append(dot);
    }
    dotContainer.append(image_container);
}
