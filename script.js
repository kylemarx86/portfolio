var page_arr = ['.about', '.apps', '.technologies_used', '.contact'];
var curr_page = null;
var new_page = null;
var apps_array = [];
var image_array = [];
var rot_arr;    //keeps track of the rotations of each elt as they spin around in circular path
var current_app_index = null;
var click_event_happening = null;

$(document).ready(function () {
    curr_page = 0;
    apps_array = [];
    rot_arr = [];
    draw_triangles();
    initialize_locations();
    apply_click_handlers();
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
    retStr += `${x[i]},${y[i]} `;
  }
  return retStr;
}

//apply standard click handlers
function apply_click_handlers(){
    // for footer
    $('#prev').click(get_prev_screen);
    $('#next').click(get_next_screen);
    $('.page_link').click(jump_to_screen($(this)));
    // for tech page
    $('.tech').click(toggle_selected_tech($(this)));
    // for contact page
    $('button[name="submit"]').click(send_form);


    // not sure if i still want to include
    $('button[name="top"]').click(function(){
        window.location = "#top";
    });
}

// load previous page from page_arr
function get_prev_screen(){
  button_disable_and_reenable();
  new_page = (curr_page + page_arr.length - 1) % page_arr.length;
  update_page(new_page);
}
// load next page from page_arr
function get_next_screen(){
  button_disable_and_reenable();
  new_page = (curr_page + 1) % page_arr.length;
  update_page(new_page);
}
function jump_to_screen(screen){
    $('.page_link').click(function(){
        var new_page = $('ul .page_link').index(this);
        update_page(new_page);
    });
}

// called by get_prev_screen and get_next_screen to load a new page
function update_page(new_page){
  // title
  $(`${page_arr[curr_page]} .title`).toggleClass('slide');
  $(`${page_arr[new_page]} .title`).toggleClass('slide');
  // content
  $(`${page_arr[curr_page]} .content`).toggleClass('shrunk grown');
  $(`${page_arr[new_page]} .content`).toggleClass('shrunk grown');

  toggle_hidden(curr_page, new_page);
  curr_page = new_page;
  new_page = null;
}
// called by update_page to control what is hidden
function toggle_hidden(curr_page, new_page){
    setTimeout(function(){
      // page
      $(`${page_arr[curr_page]}.page`).toggleClass('hidden');
      $(`${page_arr[new_page]}.page`).toggleClass('hidden');
      //content
      $(`${page_arr[curr_page]} .content`).toggleClass('hidden');
      $(`${page_arr[new_page]} .content`).toggleClass('hidden');
    }, 480);
}
// control button functionality when click event is happening 
function button_disable_and_reenable(){
  $('#prev, #next').off();
  setTimeout(function(){
    $('#prev').click(get_prev_screen);
    $('#next').click(get_next_screen);
  }, 1000);
}




//make ajax call to get_images.php and saves those images to image_array
function load_files() {
    $.ajax({
        url: 'gather_app_info.php',
        dataType: 'json',
        success: function (response) {
            if(response.success){
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
                apply_next_and_prev_app_click_handlers();
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

//function to determine what app to be updated to and which direction it should come from
function get_next_app(){
    var new_app_index = null;
    if (current_app_index < apps_array.length - 1) {
        new_app_index = current_app_index + 1;
    } else {
        new_app_index = 0;
    }
    update_app(new_app_index, 1);
}

//function to determine what app to be updated to and which direction it should come from
function get_prev_app() {
    var new_app_index = null;
    if(current_app_index > 0){
        new_app_index = current_app_index - 1;
    }else{
        new_app_index = apps_array.length - 1;
    }
    update_app(new_app_index, -1);
}

//function to determine which direction the next app should come from
function jump_to_app(new_app_index){
    if(!click_event_happening){
        if(current_app_index < new_app_index){
            // new app is moving in the forward direction
            update_app(new_app_index, 1, 750);
        }else if(current_app_index > new_app_index){
            // new app is moving in the backward direction
            update_app(new_app_index, -1, 750);
        }
    }
}
//takes param new_app_index, direction, and (optional) time_duration
//if direction = 1, then we will move forward through the image array (i.e. increase index)
//if direction = -1, then we will move backward through the image array (i.e. decrease index)
//time_duration is the time in ms for the app to finish animation
function update_app(new_app_index, direction, time_duration = 1000) {
    if(!click_event_happening){
        //prevent further clicks
        click_event_happening = true;   
        setTimeout(function(){ click_event_happening=false; }, time_duration);
        //prepare new image for move in
        $(image_array[new_app_index]).css({'left': `${direction*100}%`, 'top': '0'});
        //slide previous image out
        $(image_array[current_app_index]).animate({left: `${direction*-100}%`},time_duration);
        //slide new image in
        $(image_array[new_app_index]).animate({left: '0'},time_duration);
        //change active app css
        $(`.nav_number:nth-of-type(${current_app_index + 1}), .nav_number:nth-of-type(${new_app_index + 1})`).toggleClass('active_nav_number');
        
        //update current_app_index
        current_app_index = new_app_index;    
        //update the button links in the main page and modal
        update_links();
    }
}
//function to enable click handlers on prev and next app buttons
function apply_next_and_prev_app_click_handlers() {
    $('.prev_button').click(get_prev_app);
    $('.next_button').click(get_next_app);
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
        tech_used += `${apps_array[current_app_index].description.tech_used[i]}, `;
    }
    tech_used += apps_array[current_app_index].description.tech_used[apps_array[current_app_index].description.tech_used.length - 1];
    //replace the text with the new tech_used
    $('.modal-body .tech_used').text(tech_used);
    //update descriptive detail lines of the apps
    $('.modal-body .desc').empty();
    for(var i = 0; i < apps_array[current_app_index].description.details.length; i++){
        $('.modal-body .desc').append(`<p>${apps_array[current_app_index].description.details[i]}</p>`);
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
                };
            })(i)
        );
    }
    //give the first app the active nav_number css
    $('.nav_number:nth-of-type(1)').addClass('active_nav_number');
}

// functions related to technologies section
function initialize_locations(){
    var item_count = $('.circle-container .tech').length;
    for(var i = 0; i < item_count; i++){
        $(`.circle-container .tech:nth-of-type(${i+1})`).attr('loc', i);
        rot_arr[i] = 360 / item_count * i;
    }
}
//rename this function
function toggle_selected_tech(tech){
    $('.tech').click(function(){        
        //determine new rotation based on the location index of the clicked element
        var loc_index = $(this).attr('loc');
        var elt_count = $('.circle-container li.tech').length;
        // determine which way to spin (cw or ccw) and by how much by first determining which is the closer path.
            // this can be done by seeing if the clicked element is under or over the halfway mark of the number of elements
        var new_rot = loc_index <= elt_count / 2 ? -1 * loc_index * 360 / elt_count : (elt_count - loc_index) * 360 / elt_count;
        $('.tech').removeClass('selected');

        // i need this code to fire after the previous line finishes 
        for(var i = 0; i < elt_count; i++){
            rot_arr[i] += new_rot;
            var $elt = $(`.circle-container > .tech:nth-of-type(${i+1})`);
            var $attr = $elt.attr('loc');
            //assign new location idicator to element
            var new_loc = ( $elt.attr('loc') - loc_index + elt_count ) % elt_count;
            $elt.attr('loc', new_loc).css({
                'transform': `rotateZ(${rot_arr[i]}deg) translate(12.5em) rotateZ(${-1*rot_arr[i]}deg)`
            });
        }
        // i don't like the way this fires off
        setTimeout(function(){
            //find element at location 0 and apply selected class
            $('.circle-container .tech[loc="0"]').toggleClass('selected');
        }, 500);
        
    });
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