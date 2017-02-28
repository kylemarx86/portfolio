var apps_array = [];
var image_array = [];
var current_app_index = null;


$(document).ready(function () {
    apps_array = [];
    drawTriangles();
    load_files();
    apply_standard_event_handlers();
});

function apply_standard_event_handlers(){
    $('button[name="submit"]').click(send_form);
}

//method to make ajax call to send email form.
function send_form(){
    $.ajax({
        dataType:'json',
        url: 'mailer/mail_handler.php',
        method: 'post',
        data: {
            email: $('input[name="email"]').val(),
            name: $('input[name="name"]').val(),
            subject: $('input[name="subject"]').val(),
            body: $('textarea[name="body"]').val()
        },
        success: function(response){
            if(response.success){
                $('.mail_response').text(response.message);
            }else{
                $('.mail_response').text('Message could not be sent.');
                // var temp_str = "";
                // for(var i = 0; i < response.message.length; i++){
                //     $('.mail_response').append("<p>"  + response.message[i] + "</p>")
                // }
            }
        },
        error: function(response){
            $('.mail_response').text('Message could not be sent due to server error');
        }
    });
}

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
                //add event handlers to buttons     //question: do i really only want to
                                                        //add event handlers if there is success of loading apps
                                                        //maybe rename this method to reflect it adds event handlers to the app switcher
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
    update_app(1);        //while waiting for event handlers to be reapplied
}

function get_prev_app() {
    remove_event_handlers();      //disable event handlers for both buttons while picture updates
    setTimeout(apply_event_handlers, 3000);
    update_app(-1);        //while waiting for event handlers to be reapplied
}

//takes param direction,
//if direction = 1, then we will move forward through the image array (i.e. increase index)
//if direction = -1, then we will move backward through the image array (i.e. decrease index)
function update_app(direction) {
    //declare new image
    var new_app_index = null;
    //declare animation time duration in ms
    var time_duration = 3000;
    if(direction === 1){
        if (current_app_index < apps_array.length - 1) {
            new_app_index = current_app_index + 1;
        } else {
            new_app_index = 0;
        }
    }else{
        if(current_app_index > 0){
            new_app_index = current_app_index - 1;
        }else{
            new_app_index = apps_array.length - 1;
        }
    }
    //prepare new image for move in
    $(image_array[new_app_index]).css({'left': direction*100+'%', 'top': '0'});
    //slide previous image out
    $(image_array[current_app_index]).animate({left: -100*direction+'%'},time_duration);
    //slide new image in
    $(image_array[new_app_index]).animate({left: '0'},time_duration);
    //change active app css
    $('.nav_number:nth-of-type(' + (current_app_index + 1) + '), .nav_number:nth-of-type(' + (new_app_index + 1) + ')').toggleClass('active_nav_number');
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
    $('.next_btn_part').hover(
        function () {
            $('.next_button').find('.next_btn_part').addClass('highlighted_button');
        },
        function () {
            $('.next_button').find('.next_btn_part').removeClass('highlighted_button');
        }
    );
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

    for(var i = 0; i < apps_array.length; i++){
        var $nav_number = $('<div>').addClass('nav_number').text(i+1);
        $($number_bar).append($nav_number);

        //closure to lock which element is clicked in place
            //the inner portion is just insuring the element number was caught
        $nav_number.click((function(index){
                return function(){
                    jump_to_app(index);
                    // console.log(index + ' was pressed');
                };
            })(i)
        );
    }
    //give the first app the active nav_number css
    $('.nav_number:nth-of-type(1)').addClass('active_nav_number');
}

//pretty much a duplicate of update app. I should work on reworking that to fall allow functionality with this method
function jump_to_app(new_app_index){
    if(new_app_index !== current_app_index){
        var time_duration = 3000;
        var direction = -1;
        //prepare new image for move in
        $(image_array[new_app_index]).css({'top': direction*100+'%','left': '0'});
        //slide previous image out
        $(image_array[current_app_index]).animate({top: -100*direction+'%'},time_duration);
        //slide new image in
        $(image_array[new_app_index]).animate({top: '0'},time_duration);

        //change active app css
        $('.nav_number:nth-of-type(' + (current_app_index + 1) + '), .nav_number:nth-of-type(' + (new_app_index + 1) + ')').toggleClass('active_nav_number');
        //update current_app_index
        current_app_index = new_app_index;

        update_links();
    }
    
}



//draw name in triangles
function drawTriangles(){
  //draw k
  drawPoly(1,6);
  drawPoly(1,7);
  drawPoly(2,5);
  drawPoly(2,6);
  drawPoly(3,4);
  drawPoly(3,5);
  drawPoly(4,3);
  drawPoly(4,4);
  drawPoly(4,5);
  drawPoly(4,6);
  drawPoly(4,7);
  drawPoly(4,8);
  drawPoly(5,2);
  drawPoly(5,3);
  drawPoly(5,5);
  drawPoly(5,6);
  drawPoly(6,1);
  drawPoly(6,2);
  drawPoly(6,6);
  drawPoly(6,7);

  //draw y
  drawPoly(4,12);
  drawPoly(4,13);
  drawPoly(5,13);
  drawPoly(5,14);
  drawPoly(6,14);
  drawPoly(4,17);
  drawPoly(4,18);
  drawPoly(5,16);
  drawPoly(5,17);
  drawPoly(6,15);
  drawPoly(6,16);
  drawPoly(7,14);
  drawPoly(7,15);
  drawPoly(8,13);
  drawPoly(8,14);
  drawPoly(9,12);
  drawPoly(9,13);
    
  //draw l
  drawPoly(6,19);
  drawPoly(6,20);
  drawPoly(5,20);
  drawPoly(5,21);
  drawPoly(4,21);
  drawPoly(4,22);
  drawPoly(3,22);
  drawPoly(3,23);
  drawPoly(2,23);
  drawPoly(2,24);
  drawPoly(1,24);
  drawPoly(1,25);

  //draw e
  drawPoly(6,26);
  drawPoly(6,27);
  drawPoly(5,25);
  drawPoly(5,26);
  drawPoly(4,25);
  drawPoly(4,26);
  drawPoly(4,27);
  drawPoly(3,26);
  drawPoly(3,27);
  drawPoly(3,28);
  drawPoly(3,29);
  drawPoly(3,30);
  drawPoly(4,30);
  drawPoly(4,29);
  drawPoly(5,29);

  //draw m
  drawPoly(6,35);
  drawPoly(6,36);
  drawPoly(5,36);
  drawPoly(5,37);
  drawPoly(4,37);
  drawPoly(4,38);
  drawPoly(3,38);
  drawPoly(4,39);
  drawPoly(4,40);
  drawPoly(4,41);
  drawPoly(5,41);
  drawPoly(5,40);
  drawPoly(6,40);
  drawPoly(6,39);
  drawPoly(4,43);
  drawPoly(4,44);
  drawPoly(4,45);
  drawPoly(5,45);
  drawPoly(5,44);
  drawPoly(6,44);
  drawPoly(6,43);

  //draw a
  drawPoly(6,48);
  drawPoly(6,49);
  drawPoly(6,50);
  drawPoly(6,52);
  drawPoly(5,48);
  drawPoly(5,49);
  drawPoly(5,51);
  drawPoly(5,52);
  drawPoly(4,49);
  drawPoly(4,50);
  drawPoly(4,51);

  //draw r
  drawPoly(6,55);
  drawPoly(6,56);
  drawPoly(5,56);
  drawPoly(5,57);
  drawPoly(4,57);
  drawPoly(4,58);
  drawPoly(4,59);
  drawPoly(4,60);

  //draw x
  drawPoly(3,63);
  drawPoly(3,64);
  drawPoly(3,66);
  drawPoly(3,67);
  drawPoly(4,64);
  drawPoly(4,65);
  drawPoly(4,66);
  drawPoly(5,64);
  drawPoly(5,65);
  drawPoly(5,66);
  drawPoly(6,63);
  drawPoly(6,64);
  drawPoly(6,66);
  drawPoly(6,67);

  //scale the name drawn
  scaleDown();
}

function scaleDown(){
  $('#main').attr('transform', "scale(0.125)");
}

function drawPoly(row, column) {
    var poly = document.createElementNS("http://www.w3.org/2000/svg","polygon");
    poly.setAttribute("class", 'name');
    points =  getPolyPoints(row, column);
    poly.setAttribute("points", points);
  
    // $('#canvas').append(poly);
    $('#main').append(poly);
}

function getPolyPoints(row, column){
  var x=[];
  var y=[];
  var retStr = "";
  for(var i=0; i<3; i++){
    x[i] = (column+i)*25;
  }
  for(i=0; i<3; i++){
    y[i] = row*43 + 21.5 + 21.5*Math.pow(-1,column + row + i + 1);
  }
  for(var i = 0; i < 3; i++){
    retStr += x[i] + "," + y[i] + " ";
  }
  return retStr;
}
