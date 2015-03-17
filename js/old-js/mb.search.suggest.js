/* NEW MULTIBRAND AUTO COMPLETE */
$(function() {
  $('#qMB').on("keyup paste",function() {
      if ($('#qMB').val().length > 3 && $('#qMB').val().length <= 250) {
        clearTimeout(window.timer);
        window.timer=setTimeout(function(){ // setting the delay for each keypress
          var position = $('#qMB').offset();
          position.top = position.top + $('#qMB').height();
          marginLeft = $('#qMB').css('padding-left');
          searchWidth = $('#qMB').width();
          $('#AutoSuggest').css(position);
          $('#AutoSuggest').css('width', searchWidth);
          $('#AutoSuggest').css('margin-left', marginLeft);
          AutoSuggest();
        }, 500);
      }
    });
});
/* HIDE ON CLICK OFF */
$(document).mouseup(function (e) {
    var container = $("#AutoSuggest");
    if (!container.is(e.target)
        && container.has(e.target).length === 0)
    {
        container.hide();
    }
});
//-- MULTIBRAND AUTO SUGGEST
AutoSuggest = function() {
  $('#site-brands > div').each( function(i,e) {
    systemLanguageDesk = $('#system_language').html();
    resultsFound = $('#results_mobile').html();
    brandID = e.id;
    brandName = e.textContent;
    as_count = 0;
    search_query = $('#qMB').val();
    $.ajax({
      url: '//' + document.domain.toString() + '/customer/' + systemLanguageDesk + '/portal/articles/autocomplete?b_id=' + brandID + '&term=' + search_query,
      brandID: brandID,
      brandName: brandName,
      dataType: 'json',
      success: function(data) {
        apiSuccess(data, this.brandID, this.brandName);
        function apiSuccess(data, brandID, brandName) {
          if (brandID != 6346 || brandID != 7112) {
            $('#AutoSuggest div#brand-' + brandID).remove();
            auto_suggest_content = "";
            auto_suggest = "";
            system_snippet_do_these_help = $('#system-snippets-do_these_help').text() || 'Do these help?';
            as_count = 0;
            $.each(data, function() {
              var html = $(this.label);
              article_title = html.find(".article-autocomplete-subject").html();
              if (as_count < 5) {
                if (this.id.indexOf("questions") !== -1) {
                    auto_suggest += '<li><a target="_blank" href="' + this.id + '" class="discussion"><i class="fa fa-question"></i><span>' + article_title + '</span></a></li>';
                } else {
                    auto_suggest += '<li><a target="_blank" href="' + this.id + '" class="article"><i class="fa fa-file-text-o"></i><span>' + article_title + '</span></a></li>';
                }
              }
              as_count++;
            });
            if (as_count > 0) {
              $('#AutoSuggest').show();
              if (as_count > 9) {
                $('#AutoSuggest').append(' ' +
                   '<div id="brand-' + brandID + '">' +
                    '<h4 class="muted"><span>' + as_count + ' + </span>' + resultsFound + ' in ' + brandName + '</h4>' +
                    '<a class="btn btn-primary" target="_blank" href="//' + document.domain.toString() + '/customer/' + systemLanguageDesk + '/portal/articles/search?b_id=' + brandID + '&q=' + search_query + '&displayMode=BrandOnly">View All</a>' +
                    '<ul class="unstyled"></ul>'
                  );
              } else {
                $('#AutoSuggest').append(
                  '<div id="brand-' + brandID + '">' +
                    '<h4 class="muted"><span>' + as_count + ' </span>' + resultsFound + ' in ' + brandName + '</h4>' +
                    '<a class="btn btn-primary" target="_blank" href="//' + document.domain.toString() + '/customer/' + systemLanguageDesk + '/portal/articles/search?b_id=' + brandID + '&q=' + search_query + '&displayMode=BrandOnly">View All</a>' +
                    '<ul class="unstyled"></ul>'
                  );
              }
              if (as_count > 0) {
                $('#AutoSuggest div#brand-' + brandID + ' ul').append(auto_suggest + '</div>');
              } // IF SUGGESTIONS
              as_count = 0;
            } else {
              $('#AutoSuggest').hide();
            }
          };
        } // FUNCTION API SUCCESS
      } // SUCCESS
    }); // AJAX REQUEST
  });// FOR EACH BRAND
} // ARTICLE SUGGESTION ON KEYUP FUNCTION
