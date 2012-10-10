escapeJquerySelector = function(selector) {
  return selector.replace(/([$%&()*+,./:;<=>?@\[\\\]^\{|}~])/g, '\\$1');
};

handleCenter = function() {
  $('center').each(function() {
    $(this).before($(this).children());
    $(this).remove();
  });
};

handleTable = function() {
  var tables = $('table');
  var firstTable = tables.filter(':first');
  if (!firstTable.hasClass('infobox')) {
    if (firstTable.text().trim() == "") firstTable.remove();
    firstTable.css('float', 'none');
  }

  tables.filter(':gt(0)').each(function() {
    if ($(this).text().trim() == "") $(this).remove();

    $(this).css({
      'margin': '1em 0',
      'float': 'none'
    });

    $(this).find('b').each(function() {
      $(this).css({
        'font-weight': $(this).css('font-weight')
      });
    });

    $(this).find('td,th').each(function() {
      $(this).css({
        'vertical-align': $(this).css('vertical-align'),
        margin: $(this).css('margin'),
        padding: $(this).css('padding')
      });
    });

    $(this).find('tr').each(function() {
      $(this).css({
        'height': $(this).css('height')
      });
    });
  });
};

handleLi = function() {
  var $liInsideUl = $('ul').children('li');
  $liInsideUl.children('ul').css('marginLeft', '15px');
  var $liInsideOl = $('ol').children('li');
  $liInsideOl.children('ul').css('marginLeft', '15px');
  $liInsideUl.each(function(i) {
    if ($(this).find('img').length == 0) {
      $(this).css('text-align', 'justify');
    }
    $(this).css({
      display: $(this).css('display'),
      'vertical-align': $(this).css('vertical-align'),
      'list-style-position': 'inside',
      'list-style-image': $(this).css('list-style-image'),
      'list-style-type': $(this).css('list-style-type')
    });
  });
  $('ul.gallery').find('li').css({
    'display': 'block',
    'width': ''
  });
};

handleOl = function() {
  $('ol').not('.references').each(function() {
    $(this).css({
      'margin': $(this).css('margin')
    });
  })
};

handleDiv = function() {
  var $divOutsideTable = $('#content').find('div').not('table div');
  $divOutsideTable.css({
    'margin': '1em 0',
    'width': '',
    'float': 'none'
  });
};

handleImg = function() {
  $('div.thumb').not('table div').find('img').each(function() {
    if ($(this).width() > 100 && $(this).height() > 100) {
      $(this).css({
        'border-radius': '5px',
        border: '3px solid black'
      });
    }
  })
}

handleA = function() {
  var $aInContent = $('#content').find('a');
  $aInContent.attr({
    'target': '_blank'
  });

  $aInContent.hover(
    function() {
      $(this).css('color', 'lightCoral');
    }, function() {
      $(this).css('color', 'green');
    }
  );

  var $aInNewClass = $aInContent.find('a.new');
  $aInNewClass.attr({
    'href': '#'
  });
  $aInNewClass.css({
    'cursor': 'text',
    'color':'black'
  });
};

handleTextAlign = function(element) {
  element.find('img').each(function() {
    if ($(this).width() > 25 || $(this).height() > 25) {
      $(this).css('text-align', 'left');
      return false;
    }
  });
};

handleP = function() {
  $('p').each(function() {
    if ($(this).text() == "") {
      $(this).remove();
    }

    handleTextAlign($(this));
  });
};

removeElements = function() {
  $('#content~*,#coordinates,#mw-articlefeedback,#mw-articlefeedbackv5,' + '#mw-js-message,#catlinks,#protected-icon,#mw-content-text~*,#top,' + '#siteNotice,#jump-to-nav,#contentSub,#mw-head,#mw-panel,#footer,#mw-page-base,#mw-head-base,#siteSub,' + 'script,hr,head,' + 'span.mw-cite-backlink,span.editsection,span.printonly,' + 'sup.Template-Fact,sup[id],' + 'img[src*=\\/info\\.png],img[src*=magnify-clip],img[src*=Magnify-clip],' + 'div.printfooter,div.articleFeedback-panel,div.noprint.tright.portal,' + 'table.navbox,table.ambox,table.vertical-navbox.nowraplinks,table.ambox-style,table.metadata').remove();
};

addSearchBox = function() {
  var hideSuggestion = !0;
  $('#toolBar input').keydown(function(event) {
    if (event.which == 40) {
      var highlight = $('#suggestion').find('li.highlight');
      if (highlight.length == 0) {
        $('#suggestion').find('li:first').addClass('highlight');
        return;
      }
      highlight.removeClass('highlight');
      if (highlight.is('last-child')) $('#suggestion').find('li:last').addClass('highlight');
      else highlight.next().addClass('highlight');
      return;
    }
    if (event.which == 38) {
      highlight = $('#suggestion').find('li.highlight');
      if (highlight.length == 0) {
        $('#suggestion').find('li:last').addClass('highlight');
        return;
      }
      highlight.removeClass('highlight');
      if (highlight.is(':first-child')) $('#suggestion').find('li:last').addClass('highlight');
      highlight.prev().addClass('highlight');
    }
  });
  $('#toolBar input').focusin(function() {
    $('#suggestion').show();
    $('#toc').hide();
    $('#toolBar li:first').css({
      'background-color': 'rgb(249, 249, 249)'
    });
  });
  $('#toolBar input').focusout(function() {
    if (hideSuggestion) $('#suggestion').hide();
  });
  $('#toolBar input').keyup(function(event) {
    if (event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40) // left,up,right,down
    return;
    if (event.which == 13) { //enter
      window.open("http://en.wikipedia.org/wiki/" + $('#suggestion li.highlight').text().replace(/\s/g, '_'), "_blank");
    }

    $.getJSON("http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=" + $(this).val() + "&namespace=0&suggest=", function(json) {
      $('#suggestion').remove();
      var suggestion = $('<ul id="suggestion"></ul>')
      while (json[1].length > 0) {
        suggestion.append("<li>" + json[1].pop() + "</li>");
      }
      if (suggestion.find('li').length > 0) {
        $('#toolBar').append(suggestion);
      }
      suggestion.find('li').click(function() {
        window.open("http://en.wikipedia.org/wiki/" + $(this).text().replace(/\s/g, '_'), "_blank");
        $('#toolBar input').focus();
      });

      if (toc.length == 0) suggestion.css('marginLeft', '0px');

      suggestion.hover(function() {
        hideSuggestion = 0;
      }, function() {
        hideSuggestion = 1;
      })
    });
  });
};

addMenu = function() {
  toc.removeAttr('style');
  toc.hide();
  toc.find('#toctitle').remove();
  toc.find('span.toctoggle').remove();
  toc.find('tr,td').removeAttr('style');
};

var scrollTop = -1;
addToolBar = function() {
  var toolBar = $('<div id="toolBar"><ul class="cssTabs"><li>CONTENTS</li><li><input type="text" name="search" value="" id="searchInput" tabindex="1" placeholder="Search" autocomplete="off"><img id="search-ltr" alt="Search"></li></ul><div style="height: 10px"></div></div></div>')

  $('#content').before(toolBar);
  toolBar.find('#search-ltr').attr({
    src: chrome.extension.getURL("search-ltr.png")
  });
  toolBar.css({
    'z-index': 100,
    'left': ($(window).width() - toolBar.width()) / 2
  });
  if (toc.length == 0) {
    $('ul.cssTabs li:first').remove();
    $('ul.cssTabs li:first').css({
      padding: "10px 20px",
      "border-radius": "10px"
    });
    addSearchBox();
    return;
  }
  toolBar.append(toc);
  toolBar.hover(

  function() {}, function() {
    toc.hide();
    $('#content').show();
    if (scrollTop > 0) {
      $(window).scrollTop(scrollTop);
      scrollTop = -1;
    }
    $('ul.cssTabs li:first').css({
      'background-color': 'rgb(245, 245, 245)',
      'border-radius': '0 0 0 0'
    });
    toolBar.css({
      position: 'fixed',
      top: 0
    });
  });
  $('ul.cssTabs li:first').addClass('contents');

  $('ul.cssTabs li:first').mouseenter(function() {
    $('#suggestion').hide();
    $('#toolBar input').blur();
    if ($('#content').is(':visible')) scrollTop = $(window).scrollTop();
    toc.show();
    $('#content').hide();
    $(this).css({
      'background-color': 'rgb(220, 220, 220)',
      'border-radius': '0 0 10px 10px'
    });
    toolBar.css({
      position: 'absolute',
      top: $(window).scrollTop()
    });
  });

  toc.find('a').click(function(e) {
    scrollTop = -1;
    e.preventDefault();
    toc.hide();
    $('#content').show();
    var href = $(this).attr('href');
    $(window).scrollTop($(escapeJquerySelector(href)).position().top - 45);
  });

  addSearchBox();
};

var toc;
$(document).ready(function() {
  $('html').css({
    'background': 'white',
    'color': 'black'
  });
  toc = $('#toc');
  toc.hide();
  toc.remove();
  removeElements();
});

$(window).load(function() {
  removeElements();
  handleCenter();
  handleTable();
  handleLi();
  handleA();
  handleOl();
  handleP();
  handleDiv();
  handleImg();
  addMenu();
  addToolBar();
});