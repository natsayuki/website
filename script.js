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
  const notification = $('#notification');
  const notificationText = $('#notificationText');

  let idleTime = 0;
  let lastHeight = contentContainer.css('height');
  let selected = 'optionFeed';
  let circles = [];

  class Article {
    constructor(theme, headline, body, num, type){
      this.theme = theme;
      this.headline = headline;
      this.body = body;
      this.rippleColor = theme.split(",");
      this.num = num;
      this.type = type;
      this.link = location.protocol + '//' + location.host + location.pathname + '?a=' + this.num + '&p=' + this.type;
      for(let i=0; i<this.rippleColor.length; i++){
        let temp = (parseInt(this.rippleColor[i]) + 20);
        if(temp > 255) temp = 255;
        this.rippleColor[i] = temp;
      }
      this.rippleColor = this.rippleColor[0].toString() + ', ' + this.rippleColor[1].toString() + ', ' + this.rippleColor[2].toString();
    }
    build(){
      return `
      <div class="article" theme="`+this.theme+`" read="false" style="background-color: rgba(` + this.theme + `, .5)">
        <div class="headline">
          <div class="share"></div>
          <textarea class="link">` + this.link + `</textarea>
          <h1>`+this.headline+`</h1>
        </div>
        <div class="body">
          <center>
            `+this.body+`
          </center>
        </div>
        <div class="rippleTest" style="background-color: rgb(` + this.rippleColor + `)"></div>
      </div>
      `;
    }
  }

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

  project2 = new Article('196, 105, 53', 'I Have More Projects', `
  <h1>
  I'm just too lazy to write about them right now.
  </h1>
  `);

  projectsContainer.append(project2.build());
  projectsContainer.append(project1.build());
  projectsContainer.append(project0.build());

  function highlight(article){
    article.css({"border-radius": '1rem', 'box-shadow': '3rem 3rem 3rem rgb(' + article.attr('theme') + ')'});
  }
  function select(option){
    slider.stop();
    let offset = parseInt(option.offset().left) - parseInt(option.css('margin-left').replace('px', ''));
    let width = parseInt(option.width()) + (parseInt(option.css('margin-left').replace('px', '')) );
    slider.animate({'left': offset, 'width': width}, 500);
  }
  function notify(text){
    notificationText.text(text);
    notification.animate({'bottom': '0px'}, 500);
    setTimeout(function(){
      notification.animate({"bottom": '-5vh'}, 500);
    }, 3000)
  }

  $(document).on("click", '.share', function(){
    $(this).parent().find('.link').select();
    document.execCommand('copy');
    notify('copied to clipboard');
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
    parent.stop();
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
  $.ajax('api/getArticles.php', {
    type: 'get',
    data: {type: 'new'},
    success: function(data){
      data = JSON.parse(data);
      $.each(data.reverse(), function(key, value){
        let wrapper;
        if(value['type'] == 'optionFeed'){
          wrapper = contentWrapper;
        }
        else{
          wrapper = projectsWrapper;
        }
        wrapper.append(new Article(value['theme'], value['headline'], value['body'], value['key'], value['type']).build());
      });
    }
  });
});
