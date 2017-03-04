var apps_array = [];
var image_array = [];
var current_app_index = null;
var click_event_happening = null;

$(document).ready(function () {
    apps_array = [];
    draw_triangles();
    apply_event_handlers();
    click_event_happening = false;
    load_files();
});

//section to draw main logo
//draw name in triangles
function draw_triangles(){
  //draw k
  draw_poly(1,6);
  draw_poly(1,7);
  draw_poly(2,5);
  draw_poly(2,6);
  draw_poly(3,4);
  draw_poly(3,5);
  draw_poly(4,3);
  draw_poly(4,4);
  draw_poly(4,5);
  draw_poly(4,6);
  draw_poly(4,7);
  draw_poly(4,8);
  draw_poly(5,2);
  draw_poly(5,3);
  draw_poly(5,5);
  draw_poly(5,6);
  draw_poly(6,1);
  draw_poly(6,2);
  draw_poly(6,6);
  draw_poly(6,7);

  //draw y
  draw_poly(4,12);
  draw_poly(4,13);
  draw_poly(5,13);
  draw_poly(5,14);
  draw_poly(6,14);
  draw_poly(4,17);
  draw_poly(4,18);
  draw_poly(5,16);
  draw_poly(5,17);
  draw_poly(6,15);
  draw_poly(6,16);
  draw_poly(7,14);
  draw_poly(7,15);
  draw_poly(8,13);
  draw_poly(8,14);
  draw_poly(9,12);
  draw_poly(9,13);
    
  //draw l
  draw_poly(6,19);
  draw_poly(6,20);
  draw_poly(5,20);
  draw_poly(5,21);
  draw_poly(4,21);
  draw_poly(4,22);
  draw_poly(3,22);
  draw_poly(3,23);
  draw_poly(2,23);
  draw_poly(2,24);
  draw_poly(1,24);
  draw_poly(1,25);

  //draw e
  draw_poly(6,26);
  draw_poly(6,27);
  draw_poly(5,25);
  draw_poly(5,26);
  draw_poly(4,25);
  draw_poly(4,26);
  draw_poly(4,27);
  draw_poly(3,26);
  draw_poly(3,27);
  draw_poly(3,28);
  draw_poly(3,29);
  draw_poly(3,30);
  draw_poly(4,30);
  draw_poly(4,29);
  draw_poly(5,29);

  //draw m
  draw_poly(6,35);
  draw_poly(6,36);
  draw_poly(5,36);
  draw_poly(5,37);
  draw_poly(4,37);
  draw_poly(4,38);
  draw_poly(3,38);
  draw_poly(4,39);
  draw_poly(4,40);
  draw_poly(4,41);
  draw_poly(5,41);
  draw_poly(5,40);
  draw_poly(6,40);
  draw_poly(6,39);
  draw_poly(4,43);
  draw_poly(4,44);
  draw_poly(4,45);
  draw_poly(5,45);
  draw_poly(5,44);
  draw_poly(6,44);
  draw_poly(6,43);

  //draw a
  draw_poly(6,48);
  draw_poly(6,49);
  draw_poly(6,50);
  draw_poly(6,52);
  draw_poly(5,48);
  draw_poly(5,49);
  draw_poly(5,51);
  draw_poly(5,52);
  draw_poly(4,49);
  draw_poly(4,50);
  draw_poly(4,51);

  //draw r
  draw_poly(6,55);
  draw_poly(6,56);
  draw_poly(5,56);
  draw_poly(5,57);
  draw_poly(4,57);
  draw_poly(4,58);
  draw_poly(4,59);
  draw_poly(4,60);

  //draw x
  draw_poly(3,63);
  draw_poly(3,64);
  draw_poly(3,66);
  draw_poly(3,67);
  draw_poly(4,64);
  draw_poly(4,65);
  draw_poly(4,66);
  draw_poly(5,64);
  draw_poly(5,65);
  draw_poly(5,66);
  draw_poly(6,63);
  draw_poly(6,64);
  draw_poly(6,66);
  draw_poly(6,67);

  //scale the name drawn
  $('#main').attr('transform', "scale(0.125)");
}

//draw a single triangle
function draw_poly(row, column) {
    var poly = document.createElementNS("http://www.w3.org/2000/svg","polygon");
    poly.setAttribute("class", 'name');
    points =  get_poly_points(row, column);
    poly.setAttribute("points", points);
  
    $('#main').append(poly);
}

//function to get the coordinates of the triangle to draw based on the index of the row and column to draw it in
function get_poly_points(row, column){
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


//apply standard event handlers
function apply_event_handlers(){
    $('button[name="submit"]').click(send_form);
    $('button[name="top"]').click(function(){
        window.location = "#top";
    });
    $('.next_btn_part').hover(
        function () {
            $('.next_button').find('.next_btn_part').addClass('highlighted_button');
        },
        function () {
            $('.next_button').find('.next_btn_part').removeClass('highlighted_button');
        }
    );
}

//method to make ajax call to send email form.
function send_form(){
    //change text of send button
    $('.send').text('Sending...');
    //disable send button until a response is received
    $('.send').off('click');

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
            //change text of send button
            $('button[name="submit"]').text('Send Mail');
            //enable send button again
            $('button[name="submit"]').click(send_form);
            if(response.success){
                $('.mail_response p').text(response.message);
            }else{
                $('.mail_response p').text('Message could not be sent.');
            }
        },
        error: function(response){
            $('.mail_response p').text('Message could not be sent due to server error');
            //change text of send button
            $('button[name="submit"]').text('Send Mail');
            //enable send button again
            $('button[name="submit"]').click(send_form);
        }
    });
}

//make ajax call to get_images.php and saves those images to image_array
function load_files() {
    $.ajax({
        url: 'gather_app_info.php',
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
                //add event handlers to next and prev buttons
                apply_next_and_prev_click_handlers();
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
    setTimeout(apply_next_and_prev_click_handlers, 3000);
    update_app(1);        //while waiting for event handlers to be reapplied
}

function get_prev_app() {
    remove_event_handlers();      //disable event handlers for both buttons while picture updates
    setTimeout(apply_next_and_prev_click_handlers, 3000);
    update_app(-1);        //while waiting for event handlers to be reapplied
}

//takes param direction,
//if direction = 1, then we will move forward through the image array (i.e. increase index)
//if direction = -1, then we will move backward through the image array (i.e. decrease index)
function update_app(direction) {
    if(!click_event_happening){
        //declare new image
        var new_app_index = null;
        //declare animation time duration in ms
        var time_duration = 3000;

        click_event_happening = true;

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
        //prevent further clicks
        setTimeout(function(){ click_event_happening=false; }, time_duration);
        //update current_app_index
        current_app_index = new_app_index;    
        //update the button links in the main page and modal
        update_links();
    }
}
//function to enable click handlers on prev and next app buttons
function apply_next_and_prev_click_handlers() {
    $('.prev_button').click(get_prev_app);
    $('.next_button').click(get_next_app);
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
    //update descriptive detail lines of the apps
    $('.modal-body .desc').empty();
    for(var i = 0; i < apps_array[current_app_index].description.details.length; i++){
        $('.modal-body .desc').append('<p>' + apps_array[current_app_index].description.details[i] + '</p>');
    }
    //update links for github and live site
    $('form.github').attr('action',github_address);
    $('form.live').attr('action',live_address);
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
    if(!click_event_happening){
        if(new_app_index !== current_app_index){
            click_event_happening = true;
            var time_duration = 3000;
            var direction = -1;
            //prepare new image for move in
            $(image_array[new_app_index]).css({'top': direction*100+'%','left': '0'});
            //slide previous image out
            $(image_array[current_app_index]).animate({top: -100*direction+'%'},time_duration);
            //slide new image in
            $(image_array[new_app_index]).animate({top: '0'},time_duration);
            
            //prevent further clicks
            setTimeout(function(){ click_event_happening=false; }, time_duration);
            
            //change active app css
            $('.nav_number:nth-of-type(' + (current_app_index + 1) + '), .nav_number:nth-of-type(' + (new_app_index + 1) + ')').toggleClass('active_nav_number');
            //update current_app_index
            current_app_index = new_app_index;

            update_links();
        }   
    }
}