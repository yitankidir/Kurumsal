$(document).ready(function() {
  if ($('body').hasClass('content_only')) {
    return;
  }

  if (typeof(olark) != 'undefined' && tmolarkchat_status == 2) {
    olark('api.box.hide'); // hide olarck chat on load
  }

  if (tmnewsletter_status == 2) {
    // inittialization for tmnewsletter scripts
    initTemplate();
    $(document).on('click', '#newsletter_popup', function(event){
      event.stopPropagation();
    });

    $(document).on('click', '.tmnewsletter-close, .newsletter-overlay', function(){
      closePopup();
      updateDate();
    });

    $(document).on('click', '.tmnewsletter-submit', function(){
      submitNewsletter();
    });
  }
    
  $('a').each(function() {
    var href = $(this).attr('href');
    var search = this.search;
  
    var href_add = 'live_configurator&theme=' + get('theme')
      + '&header_layout=' + get('header_layout')
      + '&top_layout=' + get('top_layout')
      + '&home_layout=' + get('home_layout')
      + '&footer_layout=' + get('footer_layout')
      + '&product_footer_layout=' + get('product_footer_layout');

    var baseDir_ = baseDir.replace('https', 'http');

    if (location.href.indexOf('live_configurator') == -1) {
      return;
    }
  
    if (typeof(href) != 'undefined'
      && href.substr(0, 1) != '#'
      && href.replace('https', 'http').substr(0, baseDir_.length) == baseDir_) {
      if (search.length == 0) {
        this.search = href_add;
      } else {
        this.search += '&' + href_add;
      }
    }
  });

  $('#color-box').find('li').click(function() {
      if (location.href.indexOf('live_configurator') == -1) {
        if (location.href.indexOf('?') == -1) {
          location.href = location.href.replace(/&theme=[^&]*/, '')+'?live_configurator&theme='+$(this).attr('class');
        } else {
          location.href = location.href.replace(/&theme=[^&]*/, '')+'&live_configurator&theme='+$(this).attr('class');
        }
      } else {
        location.href = location.href.replace(/&theme=[^&]*/, '')+'&theme='+$(this).attr('class');
      }
    }
  );

  $('#reset').click(function() {
      location.href = location.href
                .replace(/&theme=[^&]*/, '')
                .replace(/\?theme=[^&]*/, '')
                .replace(/&theme_font=[^&]*/, '')
                .replace(/\?theme_font=[^&]*/, '')
                .replace(/&live_configurator[^&]*/, '')
                .replace(/\?live_configurator[^&]*/, '')
                .replace(/&header_layout[^&]*/, '')
                .replace(/\?header_layout[^&]*/, '')
                .replace(/&top_layout[^&]*/, '')
                .replace(/\?top_layout[^&]*/, '')
                .replace(/&home_layout[^&]*/, '')
                .replace(/\?home_layout[^&]*/, '')
                .replace(/&footer_layout[^&]*/, '')
                .replace(/\?footer_layout[^&]*/, '')
                .replace(/&product_footer_layout[^&]*/, '')
                .replace(/\?product_footer_layout[^&]*/, '');
    }
  );

  $('#gear-right').click(function() {
      if ($(this).css('left') == '280px') {
        $('#tool_customization').animate({left : '-280px'}, 500);
        $(this).animate({left : '0px'}, 500);
        $.totalStorage('live_configurator_visibility', 0);
      } else {
        $('#tool_customization').animate({left : '0px'}, 500);
        $(this).animate({left : '280px'}, 500);
        $.totalStorage('live_configurator_visibility', 1);
      }
    }
  );

  $('#module-tmnewsletter').click(function() {
    if ($(this).hasClass('disable')) {
      closePopup();
      $(this).removeClass('disable');  
    } else {
      if (typeof(tmnewletter_user_message) != 'undefined') {
		setTemplate(tmnewletter_user_message);
	  } else if (typeof(tmnewslettercap) != 'undefined') {
		getNewsletterTemplate('guest', 0);
      } else {
        tmtcl_message = html;
		setTemplate(html);
      }

      $(this).addClass('disable');
    }
    return false;
  });

  $('#module-tmolarkchat').click(function() {
    if (typeof(olark) == 'undefined') {
      return false;
    }
    if ($(this).hasClass('disable')) {
      olark('api.box.hide');
      $(this).removeClass('disable');  
    } else {
      olark('api.box.show');
      $(this).addClass('disable');  
    }
    return false;
  });

  $('#tool_customization select.form-control').on('change', function() {
    if (!get('theme')) {
      $('#tool_customization').find('button[name="submitTmMegaLayoutsDemo"]').trigger('click');
    }
   if ($(this).attr('name') == 'layouts[displayFooter]') {
     if (location.href.indexOf('live_configurator') == -1) {
       if (location.href.indexOf('?') == -1) {
         location.href = location.href.replace(/&footer_layout=[^&]*/, '')+'?live_configurator&footer_layout='+$(this).val();
       } else {
         location.href = location.href.replace(/&footer_layout=[^&]*/, '')+'&live_configurator&footer_layout='+$(this).val();
       }
     } else {
       location.href = location.href.replace(/&footer_layout=[^&]*/, '')+'&footer_layout='+$(this).val();
     }
   } else if ($(this).attr('name') == 'layouts[displayHeader]') {
     if (location.href.indexOf('live_configurator') == -1) {
       if (location.href.indexOf('?') == -1) {
         location.href = location.href.replace(/&header_layout=[^&]*/, '')+'?live_configurator&header_layout='+$(this).val();
       } else {
         location.href = location.href.replace(/&header_layout=[^&]*/, '')+'&live_configurator&header_layout='+$(this).val();
       }
     } else {
       location.href = location.href.replace(/&header_layout=[^&]*/, '')+'&header_layout='+$(this).val();
     }
   } else if ($(this).attr('name') == 'layouts[displayHome]') {
     if (location.href.indexOf('live_configurator') == -1) {
       if (location.href.indexOf('?') == -1) {
         location.href = location.href.replace(/&home_layout=[^&]*/, '')+'?live_configurator&home_layout='+$(this).val();
       } else {
         location.href = location.href.replace(/&home_layout=[^&]*/, '')+'&live_configurator&home_layout='+$(this).val();
       }
     } else {
       location.href = location.href.replace(/&home_layout=[^&]*/, '')+'&home_layout='+$(this).val();
     }
   } else if ($(this).attr('name') == 'layouts[displayTopColumn]') {
     if (location.href.indexOf('live_configurator') == -1) {
       if (location.href.indexOf('?') == -1) {
         location.href = location.href.replace(/&top_layout=[^&]*/, '')+'?live_configurator&top_layout='+$(this).val();
       } else {
         location.href = location.href.replace(/&top_layout=[^&]*/, '')+'&live_configurator&top_layout='+$(this).val();
       }
     } else {
       location.href = location.href.replace(/&top_layout=[^&]*/, '')+'&top_layout='+$(this).val();
     }
   } else if ($(this).attr('name') == 'layouts[displayFooterProduct]') {
     if (location.href.indexOf('live_configurator') == -1) {
       if (location.href.indexOf('?') == -1) {
         location.href = location.href.replace(/&product_footer_layout=[^&]*/, '')+'?live_configurator&product_footer_layout='+$(this).val();
       } else {
         location.href = location.href.replace(/&product_footer_layout=[^&]*/, '')+'&live_configurator&product_footer_layout='+$(this).val();
       }
     } else {
       location.href = location.href.replace(/&product_footer_layout=[^&]*/, '')+'&product_footer_layout='+$(this).val();
     }
   }
  });

  if (parseInt($.totalStorage('live_configurator_visibility')) == 1) {
    $('#tool_customization').animate({left : '0px'}, 200);
    $('#gear-right').animate({left : '280px'}, 200);
  } else {
    $('#tool_customization').animate({left : '-280px'}, 200);
    $('#gear-right').animate({left : '0px'}, 200);
  }
});

// revrite close popup function (tmnewsletter.js)
function closePopup() {
  $('#newsletter_popup, .newsletter-overlay').fadeOut(300, function(){$('#newsletter_popup').remove(); $('button#module-tmnewsletter').removeClass('disable');});
}

function get(name) {
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);

  if (results == null) {
    return "";
  } else {
    return results[1];
  }
}
