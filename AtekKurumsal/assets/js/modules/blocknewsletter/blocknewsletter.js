$(document).ready(function () {
  $('#newsletter-input').on({
    focus: function () {
      if ($(this).val() == placeholder_blocknewsletter || (typeof(msg_newsl) != 'undefined' && $(this).val() == msg_newsl)) {
        $(this).val('');
      } else {
        validateNewslaterEmail($(this));
      }
    },
    blur: function () {
      if ($(this).val() == '') {
        $(this).val(placeholder_blocknewsletter);
      } else {
        validateNewslaterEmail($(this));
      }
    },
    keyup: function () {
      validateNewslaterEmail($(this));
    },
    change: function () {
      validateNewslaterEmail($(this));
    }
  });

  var cssClass = 'alert alert-danger';
  
  if (typeof nw_error != 'undefined' && !nw_error) {
    cssClass = 'alert alert-success';
  }

  if (typeof msg_newsl != 'undefined' && msg_newsl) {
    if ($('#newsletter_block_left form').length) {
      $('#newsletter_block_left form').append('<div class="clearfix"></div><p class="' + cssClass + '"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><i aria-hidden="true" class="fa fa-times-circle"></i></button>' + alert_blocknewsletter + '</p>');
      $(window).load(function () {
        $('html, body').animate({scrollTop: $('#newsletter_block_left').offset().top}, 'slow')
      });
    } else {
      $('#columns').prepend('<div class="clearfix"></div><p class="' + cssClass + '"> ' + alert_blocknewsletter + '</p>');
      $(window).load(function () {
          $('html, body').animate({scrollTop: $('#columns').offset().top}, 'slow');
      });
    }
  }
});

function validateNewslaterEmail(element) {
  if (element.val() != '') {
    if (!validate_isEmail(element.val())) {
      element
        .parent()
          .removeClass('email-valid')
          .addClass('email-error');
    } else {
      element
        .parent()
          .removeClass('email-error')
          .addClass('email-valid');
    }
  } else {
    element
      .parent()
        .removeClass('email-error')
        .removeClass('email-valid');
  }
}
