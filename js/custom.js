
  (function ($) {
  
    "use strict";

    

    var videoCur = 1;

    $('#next-video').click(function(){
      if (videoCur == 1) {
        console.log('asdfsadf')
        $('#video1').css('display','none');
        $('#video2').css('display','block');
        videoCur = 2;
      } else {
        $('#video1').css('display','block');
        $('#video2').css('display','none');
        videoCur = 1;
      }
    });

    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
      var el = $(this).attr('href');
      var elWrapped = $(el);
      var header_height = $('.navbar').height();
  
      scrollToDiv(elWrapped,header_height);
      return false;
  
      function scrollToDiv(element,navheight){
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;
  
        $('body,html').animate({
          scrollTop: totalScroll
        }, 300);
      }
    });
  
  })(window.jQuery);


