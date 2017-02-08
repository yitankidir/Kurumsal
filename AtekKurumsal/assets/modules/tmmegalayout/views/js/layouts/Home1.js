
$(document).ready(function() {
  setNbItems3();
  if ($('#index #daydeal-products ul.products.product_list').length && !!$.prototype.bxSlider) {
    dealproducts_slider = $('#index #daydeal-products ul.products.product_list').bxSlider({
      minSlides: dealbox_carousel_items,
      maxSlides: dealbox_carousel_items,
      slideWidth: 270,
      slideMargin: 10,
      pager: false,
      nextText: '',
      prevText: '',
      moveSlides: 1,
      infiniteLoop: false,
      hideControlOnEnd: false,
      responsive: true,
      useCSS: false,
      autoHover: false,
      speed: 500,
      pause: 3000,
      controls: true,
      autoControls: false
    });
  }
});


if (!isMobile) {
  $(window).resize(function(){
    if ($('#index #daydeal-products ul.products.product_list').length) {
      resizedealproducts_slider()
    }
  });
} else {
  $(window).on("orientationchange",function(){
    var orientation_time;
    clearTimeout(orientation_time);
    orientation_time = setTimeout(function() {
      if ($('#index #daydeal-products ul.products.product_list').length) {
        resizedealproducts_slider()
      }
    }, 500);
  });
}

function resizedealproducts_slider() {
  setNbItems3();
  dealproducts_slider.reloadSlider({
    minSlides: dealbox_carousel_items,
    maxSlides: dealbox_carousel_items,
    slideWidth: 270,
    slideMargin: 10,
    pager: false,
    nextText: '',
    prevText: '',
    moveSlides: 1,
    infiniteLoop: true,
    hideControlOnEnd: false,
    responsive: true,
    useCSS: false,
    autoHover: false,
    speed: 500,
    pause: 3000,
    controls: true,
    autoControls: false
  });
}


function setNbItems3() {
  if ($('#index #daydeal-products.products_block').width() < 400)
    dealbox_carousel_items = 1;
  if ($('#index #daydeal-products.products_block').width() > 400)
    dealbox_carousel_items = 2;
  if ($('#index #daydeal-products.products_block').width() >=550)
    dealbox_carousel_items = 2;
  if ($('#index #daydeal-products.products_block').width() >=900)
    dealbox_carousel_items = 3;
  if ($('#index #daydeal-products.products_block').width() >=1200)
    dealbox_carousel_items = 3;
  if ($('#index #daydeal-products.products_block').width() >=1500)
    dealbox_carousel_items = 3;
  if ($('#index #daydeal-products.products_block').width() >=1800)
    dealbox_carousel_items = 3;
  if ($('#index #daydeal-products.products_block').width() >=2048)
    dealbox_carousel_items = 3;
}



$(window).load(function() {
  if (!!$.prototype.bxSlider) {
    var blogLayout = $('.blog-layout-carousel #homepage-blog .block_content ul');
    blogLayout.bxSlider({
      responsive: true,
      mode             : 'fade',
      useCSS           : true,
      slideWidth       : 1170,
      controls         : true,
      infiniteLoop     : false,
      hideControlOnEnd : true,
      pager            : false,
      speed            : 500,
      pause            : 3000,
      maxSlides        : 1,
      minSlides        : 1,
      moveSlides       : 1,
      onSlideBefore    : function(slide) {
      },
      onSlideAfter     : function(slide) {
      },
      onSliderLoad     : function() {
      }
    });
  }
});

$(window).load(function() {
  $('#homepage-blog .bx-controls-direction').prependTo('#homepage-blog .btn-wrapper');
});
