$(document).ready(function(){
  const navBar = $('#navBar');
  const contentWrapper = $('#contentWrapper');
  const contentContainer = $('#contentContainer');
  const projectsWrapper = $('#projectsWrapper');
  const projectsContainer = $('#projectsContainer');
  const scroller = $('#scroller');
  const filler = $('#filler');
  const share = $('.share');
  const slider = $('#slider');

  let idleTime = 0;
  let lastHeight = contentContainer.css('height');
  let selected = 'optionFeed';
  let circles = [];

  class Article {
    constructor(theme, headline, body){
      this.theme = theme;
      this.headline = headline;
      this.body = body;
    }
    build(){
      return `
      <div class="article" theme="`+this.theme+`" read="false">
        <div class="headline">
          <h1>`+this.headline+`</h1>
        </div>
        <div class="body">
          <center>
            `+this.body+`
          </center>
        </div>
      </div>
      `;
    }
  }
  article0 = new Article('255, 255, 255', 'Welcome to 42turtle.com', `
  <h1>New articles will be here I guess.  Updates will be announced here.
  Click the little share button to copy an article link to your clipboard.
  That's pretty cool I guess.</h1>
  `);
  article1 = new Article('165,1,52', 'New Gorillaz Album', `
  <img src="https://i.ytimg.com/vi/SHJxEnRxVS8/maxresdefault.jpg" />
  <h1>
  A few days ago, Gorillaz announced their new album The Now Now.  Since the announcement,
  two songs for the upcoming project have been released.  <a href="https://www.youtube.com/watch?v=E5yFcdPAGv0">Humility</a>
  and <a href="https://www.youtube.com/watch?v=68JpPpSc7bs">Lake Zurich</a>.  Two other songs, Hollywood and Idaho, were played
  during the Humanz tour as a part of the not named yet Gorillaz project in progress.
  <br />
  For now, Murdoc is still on prison for unknown reasons so of course the band needed a stand in bassist.  Who else would join them
  but Ace from the Power Puff Girls.
  </h1>
  <img src="https://www.okchicas.com/wp-content/uploads/2018/06/Ace-Gorillaz-730x372.jpg" />
  <h1>
  Believe it or not, a Power Puff Girls character is the stand in bassist for Murdoc.
  </h1>
  `);
  article2 = new Article('0, 38, 255', 'A Rather Glossy Turtle', `
  <h1>I put some XTC-3D on the glow in the dark turtle I designed and printed and now it looks really cool.</h1>
  <img src="images/glossyTurtle.JPG" width="700" />
  <img src="images/glossyTurtleBlue.JPG" width="700" />
  <h1>It even looks glossy in the dark.</h1>
  `);
  contentContainer.append(article2.build());
  contentContainer.append(article1.build());
  contentContainer.append(article0.build());

  project0 = new Article('144, 150, 150', 'PatkerChat', `
  <h1>
  PatkerChat is an instant messaging service where people can talk together in a chat room.
  PatkerChat's main draw is the extensive list of emotes that can be called upon to send to others.
  Emotes can be sent by typing the emote in or double clicking on an emote you want to send either
  from the emote list or from a message someone else has sent.  Emotes can be modified with one
  color tag and one animation tag to mix and match all different types of combinations.  All emotes and tag
  commands can be easily accesed by user by simply hovering their mouse over an emote they wish to view
  the command for.  Anonymity is the default in PatkerChat with each person in the chat room being assigned
  a username consisting of random numbers, however there is always the option to create an account and log in
  allowing users to be identified by custom call signs.  PatkerChat supports two user based commands, whispering and
  at-ing.  A user who is whispered to will receive a grey message in their box stating who the sender is and what they are
  saying.  At-ed users will receive all messages at-ed at them in yellow text so they will be sure not to miss it.  PatkerChat
  can be used at <a href="42turtle.com/patkerchat">42turtle.com/patkerchat</a> if the server is ever up.  Because it uses
  Node.js and because I have been to lazy to make it start on boot, patkerchat will only be available if I ever remember to
  maintain the server, which for a service no one uses, I haven't been bothering to do.  However, source code for PatkerChat
  can be viewed <a href="https://github.com/the42ndturtle/PatkerChat">here</a>.
  </h1>
  `);
  project1 = new Article('0, 242, 255', 'Rain', `
  <h1>
  Rain is a... uh... shape generator?  Click anywhere on the screen to add drops to the randomly generated
  rain fall.  Change the settings to mix it up a bit with different shapes, colors, and even dimensions.
  Rain has also gone X-platform.  Search RainX (not to be confused with the wiper fluid) on the iOS app store
  to download Rain on your mobile device.  Rain can be played at <a href="http://rain.42turtle.com">rain.42turtle.com</a>
  or on an iOS device.  Source code for Rain can be found <a href="https://github.com/the42ndturtle/rain">here</a> and
  source code for RainX can be found <a href="https://github.com/the42ndturtle/rainX">here</a>.
  </h1>
  `);
  projectsContainer.append(project1.build());
  projectsContainer.append(project0.build());


  function idle(){
    idleTime++;
    if(idleTime > 9 && !navBar.hasClass('hideForBack')){
      let temp = true
      contentContainer.children('.article').each(function(){
        if($(this).attr('read') == 'true') temp = false
      });
      projectsContainer.children('.article').each(function(){
        if($(this).attr('read') == 'true') temp = false
      });
      if(temp) showBack();
    }
    setTimeout(function(){idle()}, 1000)
  }
  function showBack(){
    navBar.animate({'opacity': '0'}, 500);
    contentWrapper.animate({'opacity': '0'}, 500);
    projectsWrapper.animate({'opacity': '0'}, 500);
    scroller.animate({'opacity': '0'}, 500);
  }
  function coverBack(){
    navBar.stop();
    navBar.css({'opacity': '1'});
    if(selected == 'optionFeed'){
      contentWrapper.stop();
      contentWrapper.css({'opacity': '1'});
    }
    if(selected == 'optionProjects'){
      projectsWrapper.stop();
      projectsWrapper.css({'opacity': '1'});
    }
    scroller.stop()
    scroller.css({'opacity': '1'});
    idleTime = 0
  }
  function checkHeight(){
    if(contentContainer.css('height') != lastHeight && selected == 'optionFeed'){
      lastHeight = contentContainer.css('height');
      filler.css({'height': contentContainer.css('height')});
    }
    else if(projectsContainer.css('height') != lastHeight && selected == 'optionProjects'){
      lastHeight = projectsContainer.css('height');
      filler.css({'height': projectsContainer.css('height')});
    }
    setTimeout(checkHeight, 50);
  }
  function highlight(article){
    article.css({"border-radius": '1rem', 'box-shadow': '3rem 3rem 3rem rgb(' + article.attr('theme') + ')'});
  }
  function select(option){
    slider.stop();
    let offset = parseInt(option.offset().left) - parseInt(option.css('margin-left').replace('px', ''));
    let width = parseInt(option.width()) + (parseInt(option.css('margin-left').replace('px', '')) );
    slider.animate({'left': offset, 'width': width}, 500);
  }
  function circler(){
    let trunc = false
    $.each(circles, function(index, value){
      console.log(value);
      if(value.width() >= 300) trunc = true
      value.width(value.width() + 15);
      value.height(value.height() + 15);
      value.css({'left': parseInt(value.css('left').replace('px', '')) - 7.5, 'top': parseInt(value.css('top').replace('px', '')) - 7.5});
    });
    if(trunc){
      circles[circles.length-1].remove();
      circles = circles.slice(0, circles.length - 1);
    }
    setTimeout(circler, 33.33);
  }


  idle();
  checkHeight();
  // circler();

  $(document).mousemove(function(){
    if(idleTime > 9) coverBack();
    idleTime = 0;
  });
  contentWrapper.scroll(function(){
    if(idleTime > 9) coverBack();
    idleTime = 0;
  });
  filler.css({'height': contentContainer.css('height')});
  scroller.scroll(function () {
    if(selected == 'optionFeed') contentWrapper.scrollTop($(this).scrollTop());
    else if(selected == 'optionProjects') projectsWrapper.scrollTop($(this).scrollTop());
  });
  num = 0;
  contentContainer.children('.article').each(function(){
    $(this).attr('num', num.toString());
    $(this).attr('parent', 'optionFeed');
    let theme = $(this).attr('theme');
    let link = location.protocol + '//' + location.host + location.pathname + '?a=' + $(this).attr('num') + '&p=optionFeed';
    $(this).css({'background-color': 'rgba(' + theme + ", .5)"});
    $(this).find('.headline').prepend(`
      <div class="share"></div>
      <textarea class="link">` + link + `</textarea>
    `);
    num++;
  });
  num = 0;
  projectsContainer.children('.article').each(function(){
    $(this).attr('num', num.toString());
    $(this).attr('parent', 'optionProjects');
    let theme = $(this).attr('theme');
    let link = location.protocol + '//' + location.host + location.pathname + '?a=' + $(this).attr('num') + '&p=optionProjects';
    $(this).css({'background-color': 'rgba(' + theme + ", .5)"});
    $(this).find('.headline').prepend(`
      <div class="share"></div>
      <textarea class="link">` + link + `</textarea>
    `);
    num++;
  });
  $(document).on("click", '.share', function(){
    $(this).parent().find('.link').select();
    document.execCommand('copy');
  });
  $(document).on('click', '.headline', function(e){
    parent = $(this).parent()
    $(".ripple").remove();
    var posX = $(this).offset().left,
          posY = $(this).offset().top,
          buttonWidth = $(this).width(),
          buttonHeight =  $(this).height();
    let rippleColor = parent.attr('theme').split(",");
    for(let i=0; i<rippleColor.length; i++){
      temp = (parseInt(rippleColor[i]) + 20);
      if(temp > 255) temp = 255;
      rippleColor[i] = temp;
    }
    rippleColor = rippleColor[0].toString() + ', ' + rippleColor[1].toString() + ', ' + rippleColor[2].toString();
    parent.append("<span class='ripple' style='background-color: rgb(" + rippleColor + ")'></span>");
    if(buttonWidth >= buttonHeight) {
      buttonHeight = buttonWidth;
    } else {
      buttonWidth = buttonHeight;
    }
    var x = e.pageX - posX - buttonWidth / 2;
    var y = e.pageY - posY - buttonHeight / 2;

    $(".ripple").css({
      width: buttonWidth,
      height: buttonHeight,
      top: y + 'px',
      left: x + 'px'
    }).addClass("rippleEffect");
    $(parent).stop()
    if($(parent).attr('read') == 'false'){
      bodyHeight = $(parent).find('.body').css('height');
      bodyHeight = parseInt(bodyHeight.replace('px', ''));
      headlineHeight = $(parent).find('.headline').css('height');
      headlineHeight = parseInt(headlineHeight.replace('px', ''));
      fullHeight = headlineHeight + bodyHeight + (headlineHeight/5)
      $(parent).animate({'height': fullHeight});
      $(parent).attr('read', 'true');
    }
    else{
      $(parent).animate({'height': $(parent).find('.headline').css('height')});
      $(parent).attr('read', 'false');
    }
  });
  $('.option').click(function(){
    select($(this));
    selected = $(this).attr('id');
    $('.page').stop();
    $('.page').animate({'opacity': '0'}, {duration: 500, complete: function(){$('.page').css({'display': 'none'})}});
    if(selected == 'optionFeed'){
      contentWrapper.stop();
      contentWrapper.css({'display': 'block'})
      contentWrapper.animate({'opacity': '1'}, {duration: 500, complete: function(){contentWrapper.css({'display': 'block'})}});
      document.title = "42turtle.com: FEED";
    }
    else if(selected == 'optionProjects'){
      projectsWrapper.stop();
      projectsWrapper.css({'display': 'block'})
      projectsWrapper.animate({'opacity': '1'}, {duration: 500, complete: function(){projectsWrapper.css({'display': 'block'})}});
      document.title = "42turtle.com: PROJECTS";
    }
  });
  $('#optionFeed').click();
  params = new URLSearchParams(window.location.search);
  if(params.has('a') && params.has('p')){
    $('#' + params.get('p')).click();
    console.log("div[num='" + params.get('a') + "'][parent='" + params.get('p') + "']");
    let article;
    if(params.get('p') == 'optionFeed'){
      article = contentContainer.find("div[num='" + params.get('a') + "']");
    }
    else if(params.get('p') == 'optionProjects'){
      article = projectsContainer.find("div[num='" + params.get('a') + "']");
    }
    contentWrapper.scrollTop(article.offset().top);
    highlight(article);
  }
});
