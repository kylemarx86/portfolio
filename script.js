var apps_array = [];
var image_array = [];
var current_app_index = null;


$(document).ready(function () {
    apps_array = [];
    load_files();
});

//make ajax call to get_images.php and saves those images to image_array
function load_files() {
    $.ajax({
        url: 'get_images.php',      //will need to change name when i change page for repurposing
        dataType: 'json',
        success: function (response) {
            if(response.success){
                // console.log(response);
                apps_array = response.pages;
                //identify carousel container
                var $carousel_container = $('.apps_carousel');                
                //set up the gathered images
                for(var i = 0; i < apps_array.length; i++){
                    image_array.push($('<img>').attr('src', apps_array[i].picture_source));
                    $('#image_container').append(image_array[i]);
                }
                //initialize pictures
                initialize_pictures();
                //add the number links to the number bar
                create_number_links();
                //initialize the link buttons
                update_links();
                //add event handlers to buttons
                apply_event_handlers();
            }
        },
        error: function (response) {
            console.log('connection error');
        }
    });
}


//sets up pictures for display
    //change to be about initializing both pics and info
function initialize_pictures() {
    //create an image and set the source
    current_app_index = 0;

    for(var i = 1; i < image_array.length; i++){
        image_array[i].css('left','100%');
    }
    image_array[0].css('left','0%');
}

function get_next_app(){
    remove_event_handlers();      //disable event handlers for both buttons while picture updates
    setTimeout(apply_event_handlers, 3000);
    update_image(1);        //while waiting for event handlers to be reapplied
}

function get_prev_app() {
    remove_event_handlers();      //disable event handlers for both buttons while picture updates
    setTimeout(apply_event_handlers, 3000);
    update_image(-1);        //while waiting for event handlers to be reapplied
}

//takes param direction,
//if direction = 1, then we will move forward through the image array (i.e. increase index)
//if direction = -1, then we will move backward through the image array (i.e. decrease index)
function update_image(direction) {
    //declare new image
    var new_app_index = null;
    //declare animation time duration in ms
    var time_duration = 3000;
    if(direction === 1){
        if (current_app_index < image_array.length - 1) {
            new_app_index = current_app_index + 1;
        } else {
            new_app_index = 0;
        }
    }else{
        if(current_app_index > 0){
            new_app_index = current_app_index - 1;
        }else{
            new_app_index = image_array.length - 1;
        }
    }
    //prepare new image for move in
    $(image_array[new_app_index]).css('left', direction*100+'%');
    //slide previous image out
    $(image_array[current_app_index]).animate({left: -100*direction+'%'},time_duration);
    //slide new image in
    $(image_array[new_app_index]).animate({left: '0'},time_duration);
    //update current_app_index
    current_app_index = new_app_index;

    update_links();
}
//function to enable click handlers on buttons
function apply_event_handlers() {
    $('.prev_button').click(get_prev_app);
    $('.next_button').click(get_next_app);
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

//function to update the links 
function update_links(){
    var github_address = apps_array[current_app_index].github_address;
    var live_address = apps_array[current_app_index].live_address;

    //update title
    $('.modal-body .title').text(apps_array[current_app_index].name);
    //update tech used
    var tech_used = '';
    for(var i = 0; i < apps_array[current_app_index].description.tech_used.length - 1; i++){
        // add all but the last of the tech used to a string separated by commas
        tech_used += apps_array[current_app_index].description.tech_used[i] + ", ";
    }
    tech_used += apps_array[current_app_index].description.tech_used[apps_array[current_app_index].description.tech_used.length - 1];
    //replace the text with the new tech_used
    $('.modal-body .tech_used').text(tech_used);
    //update descriptive lines
    $('.modal-body .desc').empty();
    for(var i = 0; i < apps_array[current_app_index].description.lines.length; i++){
        $('.modal-body .desc').append('<p>' + apps_array[current_app_index].description.lines[i] + '</p>');
    }
    //update links for github and live site
    $('.link_btn.github').click(function(){
        window.location = github_address;
    });
    $('.link_btn.live').click(function() {
        window.location = live_address;
    });
}

//add the number links to the number bar
function create_number_links(){
    //identify number bar
    var $number_bar = $('.number_bar');
    //add numbers to the bottom of the carousel
    for(var i = 0; i < apps_array.length; i++){
        var $nav_number = $('<div>').addClass('nav_number').text(i+1);
        $($number_bar).append($nav_number);
    }
}