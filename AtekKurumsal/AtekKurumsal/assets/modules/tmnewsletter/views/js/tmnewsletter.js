/*
* 2002-2016 TemplateMonster
*
* TM Newsletter
*
* NOTICE OF LICENSE
*
* This source file is subject to the General Public License (GPL 2.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/GPL-2.0
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade the module to newer
* versions in the future.
*
* @author     TemplateMonster (Alexander Grosul)
* @copyright  2002-2016 TemplateMonster
* @license    http://opensource.org/licenses/GPL-2.0 General Public License (GPL 2.0)
*/



$(document).ready(function () {
    initTemplate();

    if (popup_status && blocking_popup != 1) {
        if (!user_newsletter_status) {
            getNewsletterTemplate('guest', 4000);
        } else if (user_newsletter_status == 2) {
            getNewsletterTemplate('user', 4000);
        }

        $(document).on('click', '#newsletter_popup', function (event) {
            event.stopPropagation();
        });

        $(document).on('click', '.tmnewsletter-close, .newsletter-overlay', function () {
            closePopup();
            updateDate();
        });

        $(document).on('click', '.tmnewsletter-submit', function () {
            submitNewsletter();
        });

        $(document).on('focus blur keyup change', '.tmnewsletter-content input[name="email"]', function () {
            validateTMNewslaterEmail($(this));
        });
    }
});

function initTemplate() {
  tmnewslettercap = true; // for old module version
}

function setTemplate(html) {
  $('body').append('<div class="newsletter-overlay">'+html+'</div>');
  $("#newsletter_popup .checkbox input").uniform();
}

function displaySuccess(message) {
  successMessage = '';
  successMessage += '<div class="success-message alert alert-success">'+message+'</div>';
  $('body').find('#newsletter_popup .status-message').html(successMessage);  
}

function displayError(message) {
  /****************** error message *********************/
  errormessage = '';
  errormessage += '<div class="error-message alert alert-danger">'+message+'</div>';
  $('body').find('#newsletter_popup .status-message').html(errormessage);
}

function closePopup() {
  $('#newsletter_popup, .newsletter-overlay').fadeOut(300, function() {
    $('#newsletter_popup').remove();
  });
}

function validateEmail(email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test(email);
}

function submitNewsletter() {
  if ($('#newsletter_popup.tmnewsletter-autorized .checker > span').hasClass('checked')) {
    status = 1;
  } else {
    status = 0;
  }

  email_field = $('#newsletter_popup').find('input');
  email = email_field.val();

  if (!email || !validateEmail(email)) {
    email_field.addClass('email-error');
  } else {
    email_field.removeClass('email-error');
    $.ajax({
      type:'POST',
      url: baseDir +'modules/tmnewsletter/tmnewsletter-ajax.php',
      data: 'action=sendemail&email='+email+'&status='+status+'&is_logged='+is_logged,
      dataType:"json",
      success:function(response) {
        if (response.success_status) {
          displaySuccess(response.success_status);
        } else {
          displayError(response.error_status);
        }
      }
    });
  }
}

function updateDate() {
  if ($('#newsletter_popup.tmnewsletter-autorized .checker > span').hasClass('checked')) {
    status = 1;
  } else {
    status = 0;
  }

  $.ajax({
    type: 'POST',
    url: baseDir +'modules/tmnewsletter/tmnewsletter-ajax.php',
    async: true,
    cache: false,
    dataType : "json",
    data: 
    {
      action:'updatedate',
      status: status,
    }
  });
}

function getNewsletterTemplate(type, delay) {
  $.ajax({
    type: 'POST',
    url: baseDir +'modules/tmnewsletter/tmnewsletter-ajax.php',
    async: true,
    cache: false,
    dataType : "json",
    data: 
    {
      action:'getNewsletterTemplate',
      type: type
    },
    success:function(response) {
      if (response.content) {
        content = response.content;
        setTimeout('setTemplate(content)', delay);
      } else {
        comsole.log('Template loading false');  
      }
    }
  });
}

function validateTMNewslaterEmail(element) {
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