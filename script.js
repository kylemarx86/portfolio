/** @global */
var page_arr = ['.about', '.apps', '.technologies_used', '.contact'];   // array of classes that represent the page titles
var curr_page = null;   // index of the page number currently shown
var image_array = [];   // array of images sources for the apps
var rot_array = [];    //keeps track of the rotations of each elt as they spin around in circular path
var current_app_index = null;   // index of the application currently shown
var current_preview_index = null;   // index of the application currently being previewed
var click_event_happening = null;   // boolean to control when an event is happening so as to prevent interruptions

// array of apps to be displayed on apps page
var apps_array = [
    {
        name: 'iBet',
        description: {
            tech_used: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'APIs', 'Angular', 'HTML', 'CSS'],
            details: [
                'Allows you to place simulated bets on real sports games utilizing information pulled in through an API',
                'Uses PHP and MySQL to create, read, and update entries in database',
                'Utilizes PHP to control logic of win conditions and payouts',
                'Worked closely with front end written in Angular to create database queries to retrieve upcoming game info, bet history, and leaderboard'
            ]
        },
        picture_source: 'apps/images/iBet-wide.png',
        live_address: 'http://dev.danlee.site/c10_sports/',
        github_address: 'https://github.com/xuesongc4/c10_sports'
    }, {
        name: 'Memory Match',
        description: {
            tech_used: ['HTML', 'JavaScript', 'jQuery', 'Google Maps API', 'CSS'],
            details: [
                'Uses JavaScript to control game logic, manage game statistics, and monitor win conditions',
                'jQuery was used to dynamically generate the game board of DOM elements',
                'Utilizes Google Maps API to place markers on a map representing locations of matched National Parks',
                'Employs CSS to style the page, animate actions, and make the display responsive'
            ]
        },
        picture_source: 'apps/images/memory_match-wide.png',
        live_address: 'http://dev.kylemarx86.com/memory_match/',
        github_address: 'https://github.com/kylemarx86/memory_match_clone'
    }, {
        name: 'Student Grade Table',
        description: {
            tech_used: ['HTML', 'JavaScript', 'jQuery', 'PHP', 'MySQL', 'Bootstrap'],
            details: [
                'Uses PHP and MySQL for create, read, update, and delete operations on the database',
                'Makes use of Bootstrap to format the HTML body and make the display responsive'
            ]
        },
        picture_source: 'apps/images/SGT-wide.png',
        live_address: 'http://dev.kylemarx86.com/SGT/',
        github_address: 'https://github.com/kylemarx86/SGT'
    }, {
        name: 'Learn Poker',
        description: {
            tech_used: ['HTML', 'JavaScript', 'jQuery', 'RequireJS', 'Node.js'],
            details: [
                'Educational application intended to help users learn to identify poker hands and their relative strength',
                'Uses an object oriented model to create cards and identify hands',
                'Utilizes RequireJS to maintain orderly file structure'
            ]
        },
        picture_source: 'apps/images/learn_poker-wide.png',
        live_address: 'http://dev.kylemarx86.com/learn_poker/',
        github_address: 'https://github.com/kylemarx86/learn_poker'
    }
];

// array of technologies to be displayed on technologies used page
var tech_array = [
    { 
        name: 'JavaScript',
        image_src: 'technologies/images/js.png',
        apps: ['iBet', 'Memory Match', 'Student Grade Table', 'Learn Poker']
    }, {
        name: 'HTML5',
        image_src: 'technologies/images/html5.png',
        apps: ['iBet', 'Memory Match', 'Student Grade Table', 'Learn Poker']
    }, {
        name: 'CSS3',
        image_src: 'technologies/images/css3.png',
        apps: ['iBet', 'Memory Match', 'Student Grade Table', 'Learn Poker']
    }, {
        name: 'jQuery',
        image_src: 'technologies/images/jquery.png',
        apps: ['iBet', 'Memory Match', 'Student Grade Table', 'Learn Poker']
    }, {
        name: 'PHP',
        image_src: 'technologies/images/php.png',
        apps: ['iBet', 'Student Grade Table']
    }, {
        name: 'MySQL',
        image_src: 'technologies/images/mysql.png',
        apps: ['iBet', 'Student Grade Table']
    }, {
        name: 'Node.js',
        image_src: 'technologies/images/node.png',
        apps: ['Learn Poker']
    }, {
        name: 'Sass',
        image_src: 'technologies/images/sass.png',
        apps: []
    }, {
        name: 'Bootstrap',
        image_src: 'technologies/images/bootstrap.png',
        apps: ['Student Grade Table']
    }
];

$(document).ready(function () {
    curr_page = 0;
    rot_array = [];
    draw_triangles();
    apply_event_handlers();
    load_apps_info();
    load_tech_info();
    click_event_happening = false;
});

//section to draw main logo
//draw name in triangles
//rename to reflect a more general purpose for this
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
  var x = [];
  var y = [];
  var retStr = "";
  for(var i = 0; i < 3; i++){
    x[i] = (column + i) * 25;
  }
  for(i = 0; i < 3; i++){
    y[i] = row * 43 + 21.5 + 21.5 * Math.pow(-1, column + row + i + 1);
  }
  for(var i = 0; i < 3; i++){
    retStr += `${x[i]},${y[i]} `;
  }
  return retStr;
}

//apply standard event handlers
function apply_event_handlers(){
    // for footer
    $('#prev').click(get_prev_screen);
    $('#next').click(get_next_screen);
    $('.page_link').click(jump_to_screen($(this)));

    // for apps page
    $('.prev_button').click(get_prev_app);
    $('.next_button').click(get_next_app);
    // for contact page
    $('button[name="submit"]').click(send_form);
    $(window).resize(resize_screen_components);
}

// load previous page from page_arr
function get_prev_screen(){
  button_disable_and_reenable();
  var new_page = (curr_page + page_arr.length - 1) % page_arr.length;
  update_page(new_page);
}
// load next page from page_arr
function get_next_screen(){
  button_disable_and_reenable();
  var new_page = (curr_page + 1) % page_arr.length;
  update_page(new_page);
}
function jump_to_screen(screen){
    $('.page_link').click(function(){
        var new_page = $('ul .page_link').index(this);
        update_page(new_page);
    });
}
// control button functionality when click event is happening
    // NOTE: consider setting up the reenabling of click handlers based on animationEnd or transitionend
function button_disable_and_reenable(){
  $('#prev, #next').off();
  setTimeout(function(){
    $('#prev').click(get_prev_screen);
    $('#next').click(get_next_screen);
  }, 1000);
}


/**
 * called by get_prev_screen and get_next_screen to load a new page
 * @alias update_page 
 * @param {number} new_page - the index of the new page
 */
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
/**
 * called by update_page to control what is hidden
 * @alias toggle_hidden
 * @param {number} curr_page - index of page to be hidden
 * @param {number} new_page - index of page to be shown
 */
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





//make saves images to image_array and sets up carousel for display of apps
function load_apps_info() {
    //identify carousel container
    var $carousel_container = $('.apps_carousel');                
    //set up the gathered images
    for(var i = 0; i < apps_array.length; i++){
        //not sure about adding 'real' class here
        image_array.push($('<img>').addClass('real').attr('src', apps_array[i].picture_source));
        $('#image_container').append(image_array[i]);
    }
    //initialize pictures
    initialize_app_pictures();
    //add the number links to the number bar
    create_number_links();
    //initialize the link buttons and modal
    update_modal_and_links(current_app_index);
}

//sets up pictures for display
    //change to be about initializing both pics and info - not sure if i need to do this now
function initialize_app_pictures() {
    //create an image and set the source
    current_app_index = 0;
    current_preview_index = 1;  //assuming more than one image in apps_array

    for(var i = 1; i < image_array.length; i++){
        image_array[i].css('left','200%');
    }
    image_array[0].addClass('curr_app visible').css('left','0%');
    image_array[1].addClass('curr_preview visible').css('left','100%');
}

//function to determine what app to be updated to and which direction it should come from
function get_next_app(){
    var new_app_index = null;
    var new_preview_index = null;
    // ensure the current app and the preview app aren't the final indices in the array
    if (current_app_index < apps_array.length - 1) {
        // new_app_index = current_app_index + 1;
        new_app_index = current_preview_index;
        new_preview_index = (new_app_index + 1 < apps_array.length) ? new_app_index + 1 : 0;
    } else {
        new_app_index = 0;
        new_preview_index = new_app_index + 1;
    }
    
    var time_duration = 500;

    if(!click_event_happening){
        //prevent further clicks while animation happens
        click_event_happening = true;   
        // reenable clicks after animation has happened
        setTimeout(function(){ click_event_happening = false; }, time_duration);
        //prepare new images for move in
        $(image_array[new_preview_index]).addClass('visible').css({'left': '200%', 'top': '0'});
        //slide previous image out
        $(image_array[current_app_index]).removeClass('curr_app').animate({left: '-100%'}, time_duration);
        $(image_array[current_preview_index]).removeClass('curr_preview');
        //slide new images in
        $(image_array[current_preview_index]).addClass('curr_app').animate({left: '0'}, time_duration);
        $(image_array[new_preview_index]).addClass('curr_preview').animate({left: '100%'}, time_duration, function(){
            $('.real:not(.curr_app, .curr_preview)').removeClass('visible');
            //change active app css
            $(`.nav_number:nth-of-type(${current_app_index + 1}), .nav_number:nth-of-type(${new_app_index + 1})`).toggleClass('active_nav_number');
            //update current_app_index and current_preview_index
            current_app_index = new_app_index;
            current_preview_index = (current_app_index + 1 < apps_array.length) ? current_app_index + 1 : 0;
            //update the modal info and button links in the main page and modal
            update_modal_and_links(current_app_index);
        });
    }
}

//function to determine what app to be updated to and which direction it should come from
function get_prev_app() {
    var new_app_index = null;
    var new_preview_index = null;
    // ensure the current app isn't the first index in the array
    if (current_app_index > 0) {
        new_app_index = current_app_index - 1;
        new_preview_index = (new_app_index + 1 < apps_array.length) ? new_app_index + 1 : 0;
    } else {
        new_app_index = apps_array.length - 1;
        new_preview_index = 0;
    }

    var time_duration = 500;

    if(!click_event_happening){
        //prevent further clicks while animation happens
        click_event_happening = true;   
        // reenable clicks after animation has happened
        setTimeout(function(){ click_event_happening = false; }, time_duration);
        //prepare new images for move in
        $(image_array[new_app_index]).addClass('visible').css({'left': '-100%', 'top': '0'});
        //slide previous images out
        $(image_array[current_preview_index]).removeClass('curr_preview').animate({left: '200%'}, time_duration);
        //slide new images in
        $(image_array[new_app_index]).addClass('curr_app').animate({left: '0'}, time_duration);
        $(image_array[new_preview_index]).removeClass('curr_app').addClass('curr_preview').animate({left: '100%'}, time_duration, function(){
            //ensure apps not currently displayed in curr_app or curr_preview are hidden
            $('.real:not(.curr_app, .curr_preview)').removeClass('visible');
            //change active app css
            $(`.nav_number:nth-of-type(${current_app_index + 1}), .nav_number:nth-of-type(${new_app_index + 1})`).toggleClass('active_nav_number');        
            //update current_app_index and current_preview_index
            current_app_index = new_app_index;
            current_preview_index = (current_app_index + 1 < apps_array.length) ? current_app_index + 1 : 0;
            //update the modal info and button links in the main page and modal
            update_modal_and_links(current_app_index);
        });
    }
}

//function to determine which direction the next app should come from
function jump_to_app(new_app_index){
    if(!click_event_happening){
        if(new_app_index === current_app_index + 1 || (current_app_index === apps_array.length - 1 && new_app_index === 0) ){
            // index clicked on is that of the preview, slide from that direction
            get_next_app();
        }else if(new_app_index === current_app_index - 1 || (current_app_index === 0 && new_app_index === apps_array.length - 1) ){
            // index clicked on is the index prior to the current app, slide from that direciton
            get_prev_app();
        }else if(new_app_index !== current_app_index){
            // index clicked on and current app index are not consecutive, slide from preview side but further
            var new_preview_index = null;
            // ensure the current app and the preview app aren't the final indices in the array
            if (current_app_index < apps_array.length - 1) {
                new_preview_index = (new_app_index + 1 < apps_array.length) ? new_app_index + 1 : 0;
            } else {
                new_preview_index = new_app_index + 1;
            }
            
            var time_duration = 1000;

            if(!click_event_happening){
                //prevent further clicks while animation happens
                click_event_happening = true;   
                // reenable clicks after animation has happened
                setTimeout(function(){ click_event_happening = false; }, time_duration);
                //prepare new images for move in
                $(image_array[new_app_index]).css({'left': '200%', 'top': '0', 'visibility': 'visible'});
                $(image_array[new_preview_index]).css({'left': '300%', 'top': '0', 'visibility': 'visible'});
                //slide previous image out
                $(image_array[current_app_index]).removeClass('curr_app').animate({left: '-200%'}, time_duration);
                $(image_array[current_preview_index]).removeClass('curr_preview').animate({left: '-100%'}, time_duration);
                //slide new images in
                $(image_array[new_app_index]).addClass('curr_app').animate({left: '0'}, time_duration);
                $(image_array[new_preview_index]).addClass('curr_preview').animate({left: '100%'}, time_duration, function(){
                    $('.real:not(.curr_app, .curr_preview)').css({'visibility': 'hidden'});
                    //change active app css
                    $(`.nav_number:nth-of-type(${current_app_index + 1}), .nav_number:nth-of-type(${new_app_index + 1})`).toggleClass('active_nav_number');
                    //update current_app_index and current_preview_index
                    current_app_index = new_app_index;
                    current_preview_index = (current_app_index + 1 < apps_array.length) ? current_app_index + 1 : 0;
                    //update the modal info and button links in the main page and modal
                    update_modal_and_links(current_app_index);

                });
            }
        }
    }

}

//add the number links to the number bar of apps carousel
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


// loads images to circle showing technologies. adds click handlers to allow the toggling of technologies.
function load_tech_info() {
    //identify circle container
    var $circle_container = $('.circle-container');
    //place each element along circle
    for(var i = 0; i < tech_array.length; i++){
        // create image component with corresponding image 
        $img = $('<img>').attr('src', tech_array[i].image_src);
        // loc attribute to keep track of the position along the circle container where element will be
        $li = $('<li>').addClass('tech').attr('loc', i);
        $li.append($img);
        $circle_container.append($li);
        // initialize array of rotated angles
        rot_array[i] = 360 / tech_array.length * i;
    }
    // add click handlers to newly created items
    $('.tech').click(toggle_selected_tech($(this)));
    $('.tech:nth-of-type(1)').addClass('selected');
    update_tech_info();
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
        $('.tech.selected').removeClass('selected').addClass('deselected');
        $('.deselected').one('webkitAnimationEnd animationEnd', function(e){
            $('.tech.deselected').removeClass('deselected');
            var circle_radius = $('.circle-container').outerWidth() / 2;

            for(var i = 0; i < elt_count; i++){
                rot_array[i] += new_rot;
                var $elt = $(`.circle-container > .tech:nth-of-type(${i+1})`);
                var $attr = $elt.attr('loc');
                //assign new location idicator to element
                var new_loc = ( $elt.attr('loc') - loc_index + elt_count ) % elt_count;
                $elt.attr('loc', new_loc).css({
                    'transform': `rotateZ(${rot_array[i]}deg) translate(${circle_radius}px) rotateZ(${-1*rot_array[i]}deg)`
                });
            }
            //after each of the techs have moved to their final position, then add the selected class to the tech at location 0
            var transitionEvent = whichTransitionEvent();
            $('.circle-container .tech[loc="0"]:not(.selected)').one(transitionEvent, function(e){
                $('.circle-container .tech[loc="0"]').toggleClass('selected');
                update_tech_info();
            });
        });
    });
}
/**
 * function to resize elements within the tech page (possibly others) on the resizing of the screen
 */
function resize_screen_components(){
    var elt_count = $('.circle-container li.tech').length;
    var circle_radius = $('.circle-container').outerWidth() / 2;

    for(var i = 0; i < elt_count; i++){
        var $elt = $(`.circle-container > .tech:nth-of-type(${i+1})`);
        var $attr = $elt.attr('loc');
        $elt.css({
            'transform': `rotateZ(${rot_array[i]}deg) translate(${circle_radius}px) rotateZ(${-1*rot_array[i]}deg)`
        });
    }
}

/**
 * Function from David Walsh: http://davidwalsh.name/css-animation-callback
 * 
 */
function whichTransitionEvent(){
  var t,
      el = document.createElement("fakeelement");

  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

/**
 * Function from David Walsh: http://davidwalsh.name/css-animation-callback
 * 
 */
function whichAnimationEvent(){
  var t,
      el = document.createElement("fakeelement");

  var transitions = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}



/**
 * 
 * 
 */
function update_tech_info(){
    // clear name and apps from tech info box
    $('.tech_info .name, .tech_info .apps').empty();
    // identify index of the selected technology
    var index =  $('.circle-container .tech').index($('.selected'));
    $('.tech_info .name').append(tech_array[index].name);
    // append apps that utilize the technology
    for(var i = 0; i < tech_array[index].apps.length; i++){
        $li = $('<li>');
        $span = $('<span>').text(tech_array[index].apps[i]);
        $button = $('<button>').addClass('link_btn description').attr({
            'data-toggle': 'modal',
            'data-target': '#description_modal'
        }).text('Description');
        $li.append($span, $button);
        $('.tech_info .apps').append($li);
    }
    //add click handlers to description buttons
    $('.tech button.description').click(find_app_index($(this)));
}

/**
 * updates the links and the modal with info from the associated app
 * @param {number} app_index - index of the app modal and links are updating to
 */
function update_modal_and_links(app_index){
    // gather github and live site addresses
    var github_address = apps_array[app_index].github_address;
    var live_address = apps_array[app_index].live_address;
    //update title in modal
    $('.modal-body .title').text(apps_array[app_index].name);
    //update tech used in modal
    var tech_used = '';
    for(var i = 0; i < apps_array[app_index].description.tech_used.length - 1; i++){
        // add all but the last of the tech used to a string separated by commas
        tech_used += `${apps_array[app_index].description.tech_used[i]}, `;
    }
    // add the last of the tech used to the string
    tech_used += apps_array[app_index].description.tech_used[apps_array[app_index].description.tech_used.length - 1];
    //replace the text with the new tech_used
    $('.modal-body .tech_used').text(tech_used);
    //update descriptive detail lines of the apps
    $('.modal-body .desc').empty();
    for(var i = 0; i < apps_array[app_index].description.details.length; i++){
        $('.modal-body .desc').append(`<p>${apps_array[app_index].description.details[i]}</p>`);
    }
    //update links for github and live site
    $('form.github').attr('action',github_address);
    $('form.live').attr('action',live_address);
}

/**
 * 
 * @param {*} app_clicked 
 */
function find_app_index(app_clicked){
    $('.tech_info button.description').click(function(){
        var $app_clicked = $(this);
        var text = $app_clicked.parent().find('span').text();
        for(var i = 0; i < apps_array.length; i++){
            if(apps_array[i].name === text){
                update_modal_and_links(i);
                return;
            }
        }
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