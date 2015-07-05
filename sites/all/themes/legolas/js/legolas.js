(function ($) {
  Drupal.behaviors.legolas = {
    attach: function (context, settings) {
      if (typeof Drupal.settings.legolas == 'undefined') {
        Drupal.settings.legolas = {};
      }
      // This should be done in XSL instead, that's
      // https://github.com/xurizaemon/legolas/issues/15
      if (typeof Drupal.settings.legolas.processed == 'undefined') {
        Drupal.settings.legolas.processed = true;
        var paraId = 0;
        $('.leg-act p').each(function() {
          if (!$(this).attr('data-para-id')) {
            var identifier = 'dlm-x-' + paraId;
            $(this).data('para-id', identifier);
            $(this).attr('id', identifier);
            $(this).append('<a class="para-link" href="#' + identifier + '">link</a> ');
            $(this).append('<a class="para-comment" href="#' + identifier + '">comment</a>');
            paraId++;
          }
        });
        $('.leg-act p .para-comment').on('click', function(e) {
          var offset = $(this).offset();
          $('.ajax-comments-form-add').css({
            backgroundColor: 'white',
            border: '1px solid black',
            padding: '5px',
            left: ($(this).offset().left + $(this).width()) + "px",
            // Aie, work around position absolute working by adding offset for header.
            top: ($(this).offset().top - $('.navbar-collapse').height() - $('.navbar-header').height() + 5) +  "px",
            // left: offset.left,
            // top: offset.top,
            position: 'absolute'
          });
          $('.ajax-comments-form-add .field-name-field-reference input.form-text').val($(this).parent().data('para-id'));
          $('.ajax-comments-form-add').append('<a href="#" class="close">x</a>');
          e.preventDefault();
        });
        $('#dlm-x-17 a.para-link').after(' <strong><a class="para-link" href="#" id="dlm-x-17-comments">3 comments</a></strong>');
        $('#dlm-x-17-comments').on('click', function(e) {
          var offset = $(this).offset();
          $('#comments').css({
            backgroundColor: 'white',
            border: '1px solid black',
            padding: '5px',
            left: ($(this).offset().left + $(this).width()) + "px",
            // Aie, work around position absolute working by adding offset for header.
            top: ($(this).offset().top - $('.navbar-collapse').height() - $('.navbar-header').height() + 5) +  "px",
            // left: offset.left,
            // top: offset.top,
            position: 'absolute',
            width: '450px'
          });
          $('#comments').append('<a href="#" class="close">x</a>');
          e.preventDefault();
        });
        $('.close').on('click', function(e) {
          $($(this).parent()).hide();
        });
      }
      $('.leg-contents p').on('click', function(e) {
        if ($('body').is('.logged-in')) {
          console.log('legolas says hi');
        }
        else {
          console.log('legolas says log in');
        }
      });
    }
  }
})(jQuery);
