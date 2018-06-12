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
      this.rippleColor = theme.split(",");
      for(let i=0; i<this.rippleColor.length; i++){
        let temp = (parseInt(this.rippleColor[i]) + 20);
        if(temp > 255) temp = 255;
        this.rippleColor[i] = temp;
      }
      this.rippleColor = this.rippleColor[0].toString() + ', ' + this.rippleColor[1].toString() + ', ' + this.rippleColor[2].toString();
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
        <div class="rippleTest" style="background-color: rgb(` + this.rippleColor + `)"></div>
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
  <img src="https://www.okchicas.com/wp-content/uploads/2018/06/Ace-Gorillaz-730x372.jpg" width="800" />
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
  article3 = new Article('121, 122, 124', 'Microsoft Buys GitHub', `
  <img src="https://cdn.vox-cdn.com/thumbor/AyBIl2GQKi08EKWATgHM0Jo1qoA=/0x0:1980x1320/920x613/filters:focal(832x502:1148x818)/cdn.vox-cdn.com/uploads/chorus_image/image/59943837/microsoftgithublove.0.jpg" width="800" />
  <h1>
  That's right, the tech giant Microsoft has purchased the repo hosting site GitHub for a whopping $7.5 billion.
  After Microsoft claimed to be the most active company on the popular platform with over 2 million commits,
  it seems almost fitting they are now the owners.  Hopefully they don't screw it up somehow.
  </h1>
  `);
  article4 = new Article('34, 188, 20', 'New Update Canceled?!', `
  <h1>
  You read that right!  A super cool new feature for the breakthrough website <a href="http://42turtle.com">42turtle.com</a>
  (the intersection between fine journalism and great web design) was in fact canceled today before it ever saw the light of day.
  When you click an aritcle, there is a super cool little bubble that appears at your mouse.  The new feature would see this
  cool little bubble expanding to take up the full size of the article, slightly darkening the color, and would retract back to
  your mouse when the article was closed.  This looked really cool and worked very well except for one thing.  The opening
  bubble would always miss your mouse by a very small amount, but it was big enough to cancel this feature all to gether.
  That and it lagged the heck out of everything.  Considering how unoptimized the site is already, it did not need more
  cool bubbles to take all your RAM.  That is why this feature will actually be postponed (contrairy to earlier statements)
  until the website is better optimized.  I know this is sad news for us all, but the cooler bubbles will have to wait.
  </h1>
  `);
  article5 = new Article('255, 0, 0', 'New Gorillaz Song Off The Now Now', `
  <img src="https://static.stereogum.com/uploads/2018/06/Gorillaz-Sorcererz-1528387583-640x533.jpg" />
  <h1>
  Gorillaz released yet another song from their new album The Now Now today.
  <a href="https://www.youtube.com/watch?v=40xG4bMr9F4">Sorcererz</a> is the latest song to be joining the
  pre-release track list.  With over half the songs out now, The Now Now is looking like maybe Gorillaz still has it
  after Humanz.  <br />
  </h1>
  <img src="http://www.gorillaz.com/freemurdoc/murdoc.jpg" />
  <h1>
  Also we have finally heard word from Murdoc while he is still locked behind bars.  Well, there was the one interview
  with him, but now you can actually talk to him yourself.  If you have an Amazon Echo or Google Home, you can speak to Murdoc
  directly through the <a href="http://www.gorillaz.com/freemurdoc/">Free Murdoc</a> application available on both devices.
  If you don't have either of those, do not lose hope.  You can still help Murdoc out through Facebook, Skype,
  and KIK (wait what is KIK).  As the website says, Murdoc needs our help pronto.
  </h1>
  `);
  article6 = new Article('177, 205, 249', 'Super Smash Bros. Ultimate', `
  <img src="https://cdn.vox-cdn.com/thumbor/q8RjM-fqDypZNM0Vg55fTDnfdB0=/0x0:2000x1125/920x613/filters:focal(840x403:1160x723)/cdn.vox-cdn.com/uploads/chorus_image/image/60035685/Switch_SuperSmashBrosUltimate_illustration_02.0.jpg" />
  <h1>
  As Nintendo showed breifly earlier this year, a new Smash Bros. game is in the making.  Not that E3 has come around this year,
  we finally get to take a look at what this game is really going to be, and boy is it good.  The focus of this Smash game as
  Sakurai stated, was to bring back every chracter from every previous Smash game.  This means I'll finally be able to play
  as Bayonetta I guess.  Everyone is back in this game from Pichu to Wolf.  With the separation of Sheik and Zelda in Smash 4,
  I wonder if the duo will reunite, maybe as a separate character, or as one replacing both.  With Charizard also being separate
  in Smash 4 but returning to Pokemon Trainer in Ultimate, it could be possible.  Not only did we get all the old characters back
  but we also got some new characters.  Inkling from Splatoon, and at long last, Ridley. Inkling is exciting I guess, but can
  you believe that after all these years Ridley will actually be playable in a Smash game.  It(?) has been playable in fan mods
  and games forever, but now it will finally appear as a playable character in Smash Ultimate.
  </h1>
  <img src="https://41zxbw463fq733z1kl101n01-wpengine.netdna-ssl.com/wp-content/uploads/2018/06/ridley-750x430.jpg" />
  <h1>
  Along with all of the character returning plus a few new ones, some other major things are coming to Smash Ultimate.
  Perfect dodge has been added as well as directional air dodging (thank you).  Some other cool things were breifly shown
  like quick jump attacks and flurries, as well as latter attacks and the sort.  They also showcased some of the changes made
  to individual characters which look very interesting.  They have also updated the graphics on every stage, even the most
  recent ones.  That is part of the huge amount of detail they appear to be putting into this game.  They showed how on
  some characters, even the voicce actor changes between costumes which is just the type of thing that is so unnecessary
  but so nice at the same time.  They also finally admitted that some characters are complete knock offs of others, introducing
  Echo characters.  Maybe they will be an alternate choice now under the main character on the select screen.  Despite the
  fact that they are technically different characters, I think it's nice that they are counting the duplicates as roughly the
  same character.  Speaking of which, Peach is getting an Echo, Daisy.  They also breifly mentioned that characters
  would be unlocked differently (maybe?) in this game.  All they said was they wanted to make each unlock feel unique,
  so I guess we will just have to wait and see what they mean by that.  All in all, Smash Ultimate looks very exciting and
  I cannot wait to play it.  With a release date of December 7th this year, it won't even be that long before we
  can get our hands on it.  Also all characters Amiibo (even non Smash) will be supported which is nice.
  </h1>
  <img src="http://digitalspyuk.cdnds.net/16/12/980x490/landscape-1458661249-amiibo.jpg" />
  `);

  contentContainer.append(article6.build());
  contentContainer.append(article5.build());
  contentContainer.append(article4.build());
  contentContainer.append(article3.build());
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
    // let x = e.pageX - $(this).offset().left + 50;
    // let y = e.pageY - $(this).offset().top + 50;
    // parent.find('.rippleTest').css({top: y, left: x, width: parent.height(), height: parent.height()});
    // if(parent.attr('read') == 'false'){
    //   parent.find('.rippleTest').css({top: y, left: x}).addClass('rippleOut');
    // }
    // else parent.find('.rippleTest').css({top: y - parent.height()/2, left: x - parent.height()/2}).removeClass('rippleOut');
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
});
