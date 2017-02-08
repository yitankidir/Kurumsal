//global variables
var responsiveflag = false;
var isMobile       = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var isiPad         = /iPad/i.test(navigator.userAgent);
$(document).ready(function() {
  controller = new ScrollMagic();
  highdpiInit();
  responsiveResize();
  scrollPane();
  $(window).resize(responsiveResize);
  if (navigator.userAgent.match(/Android/i)) {
    var viewport = document.querySelector('meta[name="viewport"]');
    viewport.setAttribute('content', 'initial-scale=1.0,maximum-scale=1.0,user-scalable=0,width=device-width,height=device-height');
    window.scrollTo(0, 1);
  }
  blockHover();
  if (typeof quickView !== 'undefined' && quickView) {
    quick_view();
  }
  dropDown();
  sitemapAccordion();
  counter();
  testimonialsSlider();
  if (typeof page_name != 'undefined' && !in_array(page_name, ['index', 'product'])) {
    bindGrid();
    $(document).on('change', '.selectProductSort', function(e) {
      if (typeof request != 'undefined' && request) {
        var requestSortProducts = request;
      }
      var splitData = $(this).val().split(':');
      var url       = '';
      if (typeof requestSortProducts != 'undefined' && requestSortProducts) {
        url += requestSortProducts;
        if (typeof splitData[0] !== 'undefined' && splitData[0]) {
          url += ( requestSortProducts.indexOf('?') < 0 ? '?' : '&') + 'orderby=' + splitData[0] + (splitData[1] ? '&orderway=' + splitData[1] : '');
          if (typeof splitData[1] !== 'undefined' && splitData[1]) {
            url += '&orderway=' + splitData[1];
          }
        }
        document.location.href = url;
      }
    });
    $(document).on('change', 'select[name="n"]', function() {
      $(this.form).submit();
    });
    $(document).on('change', 'select[name="currency_payment"]', function() {
      setCurrency($(this).val());
    });
  }
  $(document).on('change', 'select[name="manufacturer_list"], select[name="supplier_list"]', function() {
    if (this.value != '') {
      location.href = this.value;
    }
  });
  $(document).on('click', '.back', function(e) {
    e.preventDefault();
    history.back();
  });
  jQuery.curCSS = jQuery.css;
  if (!!$.prototype.cluetip) {
    $('a.cluetip').cluetip({
      local           : true,
      cursor          : 'pointer',
      dropShadow      : false,
      dropShadowSteps : 0,
      showTitle       : false,
      tracking        : true,
      sticky          : false,
      mouseOutClose   : true,
      fx              : {
        open      : 'fadeIn',
        openSpeed : 'fast'
      }
    }).css('opacity', 0.8);
  }
  if (typeof(FancyboxI18nClose) !== 'undefined' && typeof(FancyboxI18nNext) !== 'undefined' && typeof(FancyboxI18nPrev) !== 'undefined' && !!$.prototype.fancybox) {
    $.extend($.fancybox.defaults.tpl, {
      closeBtn : '<a title="' + FancyboxI18nClose + '" class="fancybox-item fancybox-close" href="javascript:;"></a>',
      next     : '<a title="' + FancyboxI18nNext + '" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
      prev     : '<a title="' + FancyboxI18nPrev + '" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
    });
  }
  // Close Alert messages
  $('.alert.alert-danger').on('click', this, function(e) {
    if (e.offsetX >= 16 && e.offsetX <= 39 && e.offsetY >= 16 && e.offsetY <= 34) {
      $(this).fadeOut();
    }
  });
  /*-------------- Search-result hide on Scroll --------------*/
  $(document).on('scroll', function() {
    if ($('#search-popup, .ac_results').length > 0) {
      $('#search-popup, .ac_results').hide();
    } else {
      $('#search-popup, .ac_results').show();
    }
  });


  $('#tmsearch > .trigger-close').on('click', function() {
    $('#search-popup').hide();
  });
  $('#header-login-content > .trigger-close').on('click', function() {
    $('#header-login-content').hide();
  });


  $('.nav .trigger').on('click touchstart', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).toggleClass('active');
  });

  $('.row.trigger_nav').on('click touchstart', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).toggleClass('active');
  });

  $(document).on('click touchstart', function (e) {
    var container = $(".row.trigger_nav");
    if (container.has(e.target).length === 0){
      container.removeClass('active');
    }
  });


  if ($('#module-smartblog-category').hasClass('show-left-column hide-right-column') || $('#module-smartblog-category').hasClass('show-left-column show-right-column') || $('#module-smartblog-category').hasClass('show-right-column')) {
    $(this).find('#columns').removeClass('container');
  } else {
    $(this).find('#columns').addClass('container');
  }


  /*-------------- Scroll To --------------*/
  $(".parallax-TopColumn").on('click', 'a[href^=#]', function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop : $('a[id="' + this.hash.slice(1) + '"]').offset().top}, 2000);
  });


  /*-------------- To Top --------------*/
  var toTop = $('<a>', {
    class: 'toTop fl-outicons-up-arrow46',
    id: 'toTop',
    href: '#'
  });
  $('body').append(toTop);
  toTop.click(function(e) {
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop : 0
    }, 500)
  });

});



/*-------------- To Top --------------*/
$(window).scroll(function() {
  var $this = $(this),
      top   = $('#toTop')
  st        = $this.scrollTop();
  if (st < 500) {
    top.fadeOut().removeClass('animated_toTop');
  } else {
    top.stop(true, true).fadeIn().addClass('animated_toTop');
  }
});

/*-------------- Preloader --------------*/
$(window).load(function() {
  setTimeout(function() {
    $('#preloader').fadeOut('slow', function() {
    });
  }, 600);

  if ($('.rd-parallax').length) {
    $('.parallax-TopColumn .parallax-hook, .parallax-TopColumn .parallax-hook2, .parallax-home .parallax-hook3').show();
    $('.parallax-home1-product, .bg-fix-wrap').css('background', 'transparent');
  } else {
    $('.parallax-TopColumn .parallax-hook, .parallax-TopColumn .parallax-hook2, .parallax-home .parallax-hook3').hide();
    $('.parallax-home1-product, .bg-fix-wrap').css('background', '#a1a4ae');
  }


});


function highdpiInit() {
  if (typeof highDPI === 'undefined') {
    return;
  }
  if (highDPI && $('.replace-2x').css('font-size') == '1px') {
    var els = $('img.replace-2x').get();
    for (var i = 0; i < els.length; i++) {
      src       = els[i].src;
      extension = src.substr((src.lastIndexOf('.') + 1));
      src       = src.replace('.' + extension, '2x.' + extension);
      var img   = new Image();
      img.src   = src;
      img.height != 0 ? els[i].src = src : els[i].src = els[i].src;
    }
  }
}
// Used to compensante Chrome/Safari bug (they don't care about scroll bar for width)
function scrollCompensate() {
  var inner              = document.createElement('p');
  inner.style.width      = '100%';
  inner.style.height     = '200px';
  var outer              = document.createElement('div');
  outer.style.position   = 'absolute';
  outer.style.top        = '0px';
  outer.style.left       = '0px';
  outer.style.visibility = 'hidden';
  outer.style.width      = '200px';
  outer.style.height     = '150px';
  outer.style.overflow   = 'hidden';
  outer.appendChild(inner);
  document.body.appendChild(outer);
  var w1                 = inner.offsetWidth;
  outer.style.overflow   = 'scroll';
  var w2                 = inner.offsetWidth;
  if (w1 == w2) {
    w2 = outer.clientWidth;
  }
  document.body.removeChild(outer);
  return (w1 - w2);
}
function responsiveResize() {
  compensante = scrollCompensate();
  if (($(window).width() + scrollCompensate()) <= 767 && responsiveflag == false) {
    accordion('enable');
    accordionFooter('enable');
    tabletResize('enable');
    responsiveflag = true;
  } else if (($(window).width() + scrollCompensate()) >= 768) {
    accordion('disable');
    accordionFooter('disable');
    tabletResize('disable');
    responsiveflag = false;
    if (typeof bindUniform !== 'undefined') {
      bindUniform();
    }
  }
}
function blockHover(status) {
  $(document).off('mouseenter').on('mouseenter', '.product_list.grid li.ajax_block_product .product-container', function(e) {
    if ('ontouchstart' in document.documentElement) {
      return;
    }
    if ($('body').find('.container').width() == 1170) {
      $(this).parent().addClass('hovered');
    }
  });
  $(document).off('mouseleave').on('mouseleave', '.product_list.grid li.ajax_block_product .product-container', function(e) {
    if ($('body').find('.container').width() == 1170) {
      $(this).parent().removeClass('hovered');
    }
  });
}
function quick_view() {
  $(document).on('click', '.quick-view:visible, .quick-view-mobile:visible', function(e) {
    e.preventDefault();
    var url = $(this).attr('data-href');
    if (!url && url == 'undefined') {
      var url = this.rel;
    }
    var anchor = '';
    if (url.indexOf('#') != -1) {
      anchor = url.substring(url.indexOf('#'), url.length);
      url    = url.substring(0, url.indexOf('#'));
    }
    if (url.indexOf('?') != -1) {
      url += '&';
    } else {
      url += '?';
    }
    if (!!$.prototype.fancybox) {
      $.fancybox({
        'padding' : 0,
        'width'   : 900,
        'height'  : 500,
        'type'    : 'iframe',
        'href'    : url + 'content_only=1' + anchor
      });
    }
  });
}
function bindGrid() {
  var storage = false;
  if (typeof(getStorageAvailable) !== 'undefined') {
    storage = getStorageAvailable();
  }
  if (!storage) {
    return;
  }
  var view = $.totalStorage('display');
  if (!view && (typeof displayList != 'undefined') && displayList) {
    view = 'list';
  }
  if (view && view != 'grid') {
    display(view);
  } else {
    $('.display').find('li#grid').addClass('selected');
  }
  $(document).on('click', '#grid, #list', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!$(this).hasClass('selected')) {
      display($(this).attr('id'));
    }
  });
}
if (nbItemsPerLine != 'undefined' && nbItemsPerLineTablet != 'undefined' && nbItemsPerLineMobile != 'undefined') {
  var nbItemsPerLine       = nbItemsPerLine;
  var nbItemsPerLineTablet = nbItemsPerLineTablet;
  var nbItemsPerLineMobile = nbItemsPerLineMobile;
} else {
  var nbItemsPerLine       = '';
  var nbItemsPerLineTablet = '';
  var nbItemsPerLineMobile = '';
}
function display(view) {
  if (view == 'list') {
    $('ul.product_list').removeClass('grid').addClass('list row');
    $('.product_list > li:visible')
      .removeAttr('class')
      .addClass('ajax_block_product col-xs-12');
    $('.product_list > li:visible').each(function(index, element) {
      var html  = '';
      html      = '<div class="product-container"><div class="row">';
      html += '<div class="left-block col-xs-5">' + $(element).find('.left-block').html() + '</div>';
      html += '<div class="right-block col-xs-7"><div class="right-block-content row">';
      html += '<div class="product-flags">' + $(element).find('.product-flags').html() + '</div>';
      html += '<h5 itemprop="name">' + $(element).find('h5').html() + '</h5>';
      var price = $(element).find('.content_price').html();  // check : catalog mode is enabled
      if (price != null) {
        html += '<div class="content_price">' + price + '</div>';
      }
      var hookReviews = $(element).find('.hook-reviews');
      if (hookReviews.length) {
        html += hookReviews.clone().wrap('<div>').parent().html();
      }
      html += '<p class="product-desc">' + $(element).find('.product-desc').html() + '</p>';
      var colorList = $(element).find('.color-list-container').html();
      if (colorList != null) {
        html += '<div class="color-list-container">' + colorList + '</div>';
      }
      html += '<div class="button-container">' + $(element).find('.button-container').html() + '</div>';
      var availability = $(element).find('.availability').html();  // check : catalog mode is enabled
      if (availability != null) {
        html += '<span class="availability">' + availability + '</span>';
      }
      html += '</div>';
      html += '</div></div>';
      $(element).html(html);
    });
    $('.display').find('li#list').addClass('selected');
    $('.display').find('li#grid').removeAttr('class');
    listTabsAnimate('ul.product_list > li');
    $.totalStorage('display', 'list');
    if ($('.product_list li div.wishlist').length) {
      WishlistButton();
    }
  } else {
    $('ul.product_list').removeClass('list').addClass('grid row');
    var totModulo = ($('.product_list > li').length) % nbItemsPerLine;
    totModulo == 0 ? totModulo = nbItemsPerLine : totModulo = totModulo;
    var totModuloLine = ($('.product_list > li').length) - totModulo;
    var totModuloTab  = ($('.product_list > li').length) % nbItemsPerLineTablet;
    totModuloTab == 0 ? totModuloTab = nbItemsPerLineTablet : totModuloTab = totModuloTab;
    var totModuloTabLine = ($('.product_list > li').length) - totModuloTab;
    var totModuloMob     = ($('.product_list > li').length) % nbItemsPerLineMobile;
    totModuloMob == 0 ? totModuloMob = nbItemsPerLineMobile : totModuloMob = totModuloMob;
    var totModuloMobLine = ($('.product_list > li').length) - totModuloMob;
    $('.product_list > li:visible').each(function(index, element) {
      $(element)
        .removeAttr('class')
        .addClass('ajax_block_product col-xs-' + 12 / nbItemsPerLineMobile + ' col-sm-' + 12 / nbItemsPerLineTablet + ' col-md-' + 12 / nbItemsPerLine);
      (index + 1) % nbItemsPerLine == 0 ? $(element).addClass('last-in-line') : false;
      (index + 1) % nbItemsPerLine == 1 ? $(element).addClass('first-in-line') : false;
      (index + 1) > totModuloLine ? $(element).addClass('last-line') : false;
      (index + 1) % nbItemsPerLineTablet == 0 ? $(element).addClass('last-item-of-tablet-line') : false;
      (index + 1) % nbItemsPerLineTablet == 1 ? $(element).addClass('first-item-of-tablet-line') : false;
      (index + 1) > totModuloTabLine ? $(element).addClass('last-tablet-line') : false;
      (index + 1) % nbItemsPerLineMobile == 0 ? $(element).addClass('last-item-of-mobile-line') : false;
      (index + 1) % nbItemsPerLineMobile == 1 ? $(element).addClass('first-item-of-mobile-line') : false;
      (index + 1) > totModuloMobLine ? $(element).addClass('last-mobile-line') : false;
      var html  = '';
      html += '<div class="product-container">';
      html += '<div class="left-block">' + $(element).find('.left-block').html() + '</div>';
      html += '<div class="right-block">';
      html += '<div class="product-flags">' + $(element).find('.product-flags').html() + '</div>';
      html += '<h5 itemprop="name">' + $(element).find('h5').html() + '</h5>';
      html += '<p itemprop="description" class="product-desc">' + $(element).find('.product-desc').html() + '</p>';
      var price = $(element).find('.content_price').html(); // check : catalog mode is enabled
      if (price != null) {
        html += '<div class="content_price">' + price + '</div>';
      }
      var hookReviews = $(element).find('.hook-reviews');
      if (hookReviews.length) {
        html += hookReviews.clone().wrap('<div>').parent().html();
      }
      html += '<div class="button-container">' + $(element).find('.button-container').html() + '</div>';
      var colorList = $(element).find('.color-list-container').html();
      if (colorList != null) {
        html += '<div class="color-list-container">' + colorList + '</div>';
      }
      var availability = $(element).find('.availability').html(); // check : catalog mode is enabled
      if (availability != null) {
        html += '<span class="availability">' + availability + '</span>';
      }
      html += '</div>';
      html += '</div>';
      $(element).html(html);
    });
    $('.display').find('li#grid').addClass('selected');
    $('.display').find('li#list').removeAttr('class');
    listTabsAnimate('ul.product_list > li');
    $.totalStorage('display', 'grid');
    if ($('.product_list li div.wishlist').length) {
      WishlistButton();
    }
  }
}
function dropDown() {
  elementClick = '.current';
  elementSlide = '.toogle_content';
  activeClass  = 'active';
  $(elementClick).on('click', function(e) {
    e.stopPropagation();
    var subUl = $(this).next(elementSlide);
    if (subUl.is(':hidden')) {
      subUl.show();
      $(this).addClass(activeClass);
    } else {
      subUl.hide();
      $(this).removeClass(activeClass);
    }
    $(elementClick).not(this).next(elementSlide).hide();
    $(elementClick).not(this).removeClass(activeClass);
    e.preventDefault();
  });
  $(document).on('click', elementSlide, function(e) {
    e.stopPropagation();
  });
  $(document).on('click', function(e) {
    e.stopPropagation();
    if (e.which != 3) {
      var elementHide = $(elementClick).next(elementSlide);
      $(elementHide).hide();
      $(elementClick).removeClass('active');
    }
  });
}
function accordionFooter(status) {
  if (status == 'enable') {
    $('#footer .footer-block h4').on('click', function(e) {
      $(this)
        .toggleClass('active')
        .parent()
        .find('.toggle-footer')
        .stop()
        .slideToggle('medium');
      e.preventDefault();
    });
    $('#footer')
      .addClass('accordion')
      .find('.toggle-footer')
      .slideUp('fast');
  } else {
    $('.footer-block h4').removeClass('active').off().parent().find('.toggle-footer').removeAttr('style').slideDown('fast');
    $('#footer').removeClass('accordion');
  }
}
//  TOGGLE COLUMNS
function accordion(status) {
  if (status == 'enable') {
    $('#product .product-information .tab-content > h3,  #right_column .block:not(#layered_block_left) .title_block, #left_column .block:not(#layered_block_left) .title_block, #left_column #newsletter_block_left h4').on('click', function() {
      $(this)
        .toggleClass('active')
        .parent()
        .find('.block_content')
        .stop()
        .slideToggle('medium');
      $(this)
        .next('.tab-pane')
        .stop()
        .slideToggle('medium');
    });
    $('#right_column, #left_column')
      .addClass('accordion')
      .find('.block:not(#layered_block_left) .block_content')
      .slideUp('fast');
    $('#product .product-information .tab-content > h3:first').addClass('active');
    if (typeof(ajaxCart) !== 'undefined') {
      ajaxCart.collapse();
    }
  } else {
    $('#product .product-information .tab-content > h3, #right_column .block:not(#layered_block_left) .title_block, #left_column .block:not(#layered_block_left) .title_block, #left_column #newsletter_block_left h4')
      .removeClass('active')
      .off()
      .parent()
      .find('.block_content, .tab-pane')
      .removeAttr('style')
      .not('.tab-pane')
      .slideDown('fast');
    $('#left_column, #right_column').removeClass('accordion');
    $('#product .product-information .tab-content > h3:first').addClass('active');
  }
}
function bindUniform() {
  if (!!$.prototype.uniform) {
    $('select.form-control').not('.not_uniform').uniform();
  }
}
function listBlocksAnimate(block, element, row, offset, difEffect) {
  if (!isMobile && jQuery(block).length) {
    var i      = 0;
    var j      = row;
    var k      = 1;
    var effect = -1;
    $(element).each(function() {
      i++;
      if (i > j) {
        j += row;
        k      = i;
        effect = effect * (-1);
      }
      effect == -1 && difEffect == true ? ef = TweenMax.from(element + ':nth-child(' + i + ')', 0.5, {left : -1 * 200 - i * 300 + 'px', alpha : 0, ease : Power1.easeOut}) : ef = TweenMax.from(element + ':nth-child(' + i + ')', 0.5, {right : -1 * 200 - i * 300 + 'px', alpha : 0, ease : Power1.easeOut});
      var scene_new = new ScrollScene({
        triggerElement : element + ':nth-child(' + k + ')',
        offset         : offset,
      }).setTween(ef)
        .addTo(controller)
        .reverse(false);
    });
  }
}
function listTabsAnimate(element) {
  if (!isMobile && jQuery(element).length && !$('#old_center_column').length) {
    TweenMax.staggerFromTo(element, 0.3, {alpha : 0, rotationY : -90, ease : Power1.easeOut}, {alpha : 1, rotationY : 0, ease : Power1.easeOut}, 0.1);
  }
}
$(window).load(function() {
  listBlocksAnimate('#homepage-blog', '#homepage-blog li', nbItemsPerLine, -300, true);
});
//  TOGGLE SITEMAP
function sitemapAccordion() {
  $('#sitemap #center_column ul.tree > li > ul')
    .addClass('accordion_content')
    .parent()
    .find('> a')
    .wrap('<p class="page-subheading accordion_current"></p>');
  $('#center_column .accordion_current').on('click', function() {
    $(this)
      .toggleClass('active')
      .parent()
      .find('.accordion_content')
      .stop()
      .slideToggle('medium');
  });
  $('#center_column')
    .addClass('accordionBox')
    .find('.accordion_content')
    .slideUp('fast');
  if (typeof(ajaxCart) !== 'undefined') {
    ajaxCart.collapse();
  }
}
function counter() {
  $('.count').each(function() {
    $(this).prop('Counter', 0).animate({
      Counter : $(this).text()
    }, {
      duration : 4000,
      easing   : 'swing',
      step     : function(now) {
        $(this).text(Math.ceil(now));
      }
    });
  });
}
function testimonialsSlider() {
  var testimonials_slider = $('#testimonials');
  testimonials_slider.bxSlider({
    responsive   : true,
    useCSS       : false,
    minSlides    : 1,
    maxSlides    : 1,
    slideWidth   : 1200,
    slideMargin  : 0,
    moveSlides   : 1,
    pager        : false,
    autoHover    : false,
    speed        : 500,
    pause        : 3000,
    controls     : true,
    autoControls : true,
    startText    : '',
    stopText     : '',
    prevText     : '',
    nextText     : ''
  });
}

function tabletResize(status) {
  if (status == 'enable') {
    var responsive = {
      'nav'                   : [
        '#header-login',
        '.top_menu',
        '#header_links',
        '#currencies-block-top',
        '#languages-block-top'
      ],
      '.header-mobile-top'    : [
        '#header_logo'
      ],
      '.header-mobile-middle' : [
        '.search_box',
        '.cartBox'
      ]
    }
    elReplace(responsive);
  }
  else {
    $('#header-account-content, #header-login-content').addClass('toogle_content').css('display', 'none');
  }
}
function elReplace(data) {
  for (var key in data) {
    for (var i = 0; i < data[key].length; i++) {
      $(data[key][i]).appendTo(key);
    }
  }
}


var reload_data = false;

$(document).ready(function() {

  if ($(window).width() < 768) {
    new_products_slider();
    reload_data = true;
  }
});

$(window).resize(function(){
  if ($(window).width() < 768) {
    reload_data = true;
  } else {

    if(reload_data == true) {
       $('#preloader').fadeIn();
      location.reload();
    }
    reload_data = false;
  }
});

function new_products_slider() {
  setNbItems2();
  var newproducts_slider = $('#index ul#homefeatured');
  newproducts_slider.bxSlider({
    responsive     : true,
    useCSS         : false,
    minSlides      : cross_carousel_items,
    maxSlides      : cross_carousel_items,
    slideWidth     : 370,
    slideMargin    : 10,
    moveSlides     : 1,
    pager          : false,
    autoHover      : false,
    speed          : 500,
    pause          : 3000,
    controls       : true,
    autoControls   : true,
    infiniteLoop   : true,
    startText      : '',
    stopText       : '',
    prevText       : '',
    nextText       : '',
    onSliderResize : function() {
      if ($(window).width() >= 768) {
        newproducts_slider.destroySlider();
      }
    }
  });
}
function setNbItems2() {
  if ($('#index ul#homefeatured').width() < 500) {
    cross_carousel_items = 1;
  }
  if ($('#index ul#homefeatured').width() > 501) {
    cross_carousel_items = 2;
  }
}

function scrollPane() {
  var o = $('.scroll-pane');
  if (o) {
    o.jScrollPane();
  }
}

