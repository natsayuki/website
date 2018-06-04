$(document).ready(function(){
  const navBar = $('#navBar');
  const contentWrapper = $('#contentWrapper');
  const contentContainer = $('#contentContainer');
  const scroller = $('#scroller');
  const filler = $('#filler');
  const share = $('.share');

  let idleTime = 0;
  let lastHeight = contentContainer.css('height');

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
  contentContainer.append(article1.build());
  contentContainer.append(article0.build());


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
    scroller.animate({'opacity': '0'}, 500);
  }
  function coverBack(){
    navBar.stop();
    navBar.css({'opacity': '1'});
    contentWrapper.stop();
    contentWrapper.css({'opacity': '1'});
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
  idle();
  checkHeight();

  $(document).mousemove(function(){
    coverBack();
  });
  contentWrapper.scroll(function(){
    coverBack();
  });
  filler.css({'height': contentContainer.css('height')});
  scroller.scroll(function () {
    contentWrapper.scrollTop($(this).scrollTop());
  });
  num = 0
  contentContainer.children('.article').each(function(){
    $(this).attr('num', num.toString());
    let theme = $(this).attr('theme');
    let link = location.protocol + '//' + location.host + location.pathname + '?a=' + $(this).attr('num');
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
  params = new URLSearchParams(window.location.search);
  if(params.has('a')){
    let article = contentContainer.find("div[num='" + params.get('a') + "']");
    contentWrapper.scrollTop(article.offset().top);
    highlight(article);
  }
});
