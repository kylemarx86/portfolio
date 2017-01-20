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
                console.log(response);
                //create container to place images and buttons in
                var $container = $('<div>').attr('id','image_container');
                //add container to body
                $('body').append($container);
                //gather all images
                var files = response.files;
                //set up the gathered images
                for(var i = 0; i < files.length; i++){
                    image_array.push($('<img>').attr('src', files[i]));
                    $('#image_container').append(image_array[i]);
                }
                // console.log();
                //initialize pictures
                initialize();
                //create next and previous buttons and attach the appropriate handler
                var $prevButton = $('<button>').attr('id','prevButton').text('<');
                var $nextButton = $('<button>').attr('id','nextButton').text('>');
                //add buttons to container
                $container.append($prevButton);
                $container.append($nextButton);
                //add event handlers to buttons
                applyEventHandlers();

                var dot = $('<div>').addClass('dot');
                $('#image_container').append(dot);
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
function initialize() {
    //create an image and set the source
    current_image_index = 0;

    for(var i = 1; i < image_array.length; i++){
        image_array[i].css('left','100%');
    }
    image_array[0].css('left','0%');
}

function next_image(){
    removeEventHandlers();      //disable event handlers for both buttons while picture updates
    setTimeout(applyEventHandlers, 3000);
    update_image(1);        //while waiting for event handlers to be reapplied
}

function prev_image() {
    removeEventHandlers();      //disable event handlers for both buttons while picture updates
    setTimeout(applyEventHandlers, 3000);
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
function applyEventHandlers() {
    $('#prevButton').click(prev_image);
    $('#nextButton').click(next_image);
}
//function to disable event handlers while picture is updating
function removeEventHandlers(){
    $('#prevButton').off('click');
    $('#nextButton').off('click');
}
//function to add navigation dots to the carousel
function createNavigationDots(numberOfImages){
    var imageContainer = $('#image_container');
    var dotContainer = $('<div>').addClass('dot_container');
    for(var i = 0; i < numberOfImages; i++){
        var dot = $('<div>').addClass('dot');
        dotContainer.append(dot);
    }
    dotContainer.append(imageContainer);
}
