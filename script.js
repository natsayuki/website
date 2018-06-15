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
    }
  });
});
