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
  article1 = new Article('66, 134, 244', 'New Gorillaz Album', `
  <h1>
  A few days ago, the Gorillaz announced their new album The Now Now.  Since the announcement,
  Two songs for the upcoming project have been released.  <a href="https://www.youtube.com/watch?v=E5yFcdPAGv0">Humility</a>
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

  project0 = new Article('255, 255, 255', 'Test Project 0', `
    <h1>test project 0</h1>
  `);
  projectsContainer.append(project0.build());


  function idle(){
    idleTime++;
    if(idleTime > 9 && !navBar.hasClass('hideForBack')){
      let temp = true
      contentContainer.children('.article').each(function(){
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
    if(contentContainer.css('height') != lastHeight){
      lastHeight = contentContainer.css('height');
      filler.css({'height': contentContainer.css('height')});
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


  idle();
  checkHeight();

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
  $(document).on('click', '.article', function(){
    $(this).stop()
    if($(this).attr('read') == 'false'){
      bodyHeight = $(this).find('.body').css('height');
      bodyHeight = parseInt(bodyHeight.replace('px', ''));
      headlineHeight = $(this).find('.headline').css('height');
      headlineHeight = parseInt(headlineHeight.replace('px', ''));
      fullHeight = headlineHeight + bodyHeight + (headlineHeight/5)
      $(this).animate({'height': fullHeight});
      $(this).attr('read', 'true');
    }
    else{
      $(this).animate({'height': $(this).find('.headline').css('height')});
      $(this).attr('read', 'false');
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
