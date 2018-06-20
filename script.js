$(document).ready(function(){
  const navBar = $('#navBar');
  const contentWrapper = $('#contentWrapper');
  const contentContainer = $('#contentContainer');
  const projectsWrapper = $('#projectsWrapper');
  const projectsContainer = $('#projectsContainer');
  const reviewsContainer = $('#reviewsContainer');
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
    constructor(theme, headline, body, num, type, date, views, image){
      this.theme = theme;
      this.headline = headline;
      this.body = body;
      this.rippleColor = theme.split(",");
      this.num = num;
      this.type = type;
      this.date = date;
      this.views = views;
      this.image = image;
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
      <div class="article" theme="`+this.theme+`" read="false" style="background-color: rgba(` + this.theme + `, .5)" num="` + this.num + `">
        <div class="headline">
          <div class="share"></div>
          <div class="eye"></div>
          <textarea class="link">` + this.link + `</textarea>
          <h1 align="center">`+this.headline+`</h1>
          <h1 class="date">` + this.date + `</h1>
          <h1 class="views">` + this.views + `</h1>
          <img src="` + this.image + `" class="headlineImg" />
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

  window.mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };
  mobile = window.mobilecheck();

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
      parent.find('.headlineImg').animate({'opacity': '0'});
      $.ajax('api/getArticles.php', {
        type: 'POST',
        data: {type: 'views', num: parent.attr('num')}
      });
    }
    else{
      $(parent).animate({'height': $(parent).find('.headline').css('height')});
      $(parent).attr('read', 'false');
      parent.find('.headlineImg').animate({'opacity': '.4'});
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
    else if(selected == 'optionReviews'){
      reviewsWrapper.stop();
      reviewsWrapper.css({'display': 'block'})
      reviewsWrapper.animate({'opacity': '1'}, {duration: 500, complete: function(){projectsWrapper.css({'display': 'block'})}});
      document.title = "42turtle.com: REVIEWS";
    }
  });

  $.ajax('api/getArticles.php', {
    type: 'get',
    data: {type: 'new'},
    success: function(data){
      data = JSON.parse(data);
      $.each(data.reverse(), function(key, value){
        let container;
        if(value['type'] == 'optionFeed'){
          container = contentContainer;
        }
        else if(value['type'] == 'optionProjects'){
          container = projectsContainer;
        }
        else{
          container = reviewsContainer
        }
        container.append(new Article(value['theme'], value['headline'], value['body'], value['key'],
         value['type'], value['date'], value['views'], value['image']).build());
      });
      $('#optionFeed').click();
      params = new URLSearchParams(window.location.search);
      if(params.has('a') && params.has('p')){
        $('#' + params.get('p')).click();
        console.log("div[num='" + params.get('a') + "'][parent='" + params.get('p') + "']");
        let article;
        let container;
        if(params.get('p') == 'optionFeed'){
          article = contentContainer.find("div[num='" + params.get('a') + "']");
          wrapper = contentWrapper;
        }
        else if(params.get('p') == 'optionProjects'){
          article = projectsContainer.find("div[num='" + params.get('a') + "']");
          wrapper = projectsWrapper;
        }
        wrapper.scrollTop(article.offset().top - contentWrapper.offset().top);
        highlight(article);
      }
      if(mobile){
        $('.article').addClass('articleMobile');
        $('#navBar').addClass('navBarMobile');
        $('img').addClass('mediaMobile');
        $('iframe').addClass('mediaMobile');
      }
    }
  });
  $(window).bind("orientationchange", function(){
    if(window.orientation == 90) $('body').css({'transform': 'rotate(-90)'});
    else if(window.orientation == -90) $('body').css({'transform': 'rotate(90)'});
   });
});
