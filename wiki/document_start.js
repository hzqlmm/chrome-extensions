var tabId = -1;
chrome.extension.sendRequest({}, function (response) {
  tabId = response.tabId;
});

handleCenter = function () {
  $('center').each(function () {
    $(this).before($(this).children());
    $(this).remove();
  });
};

handleTable = function () {
  $('table').each(function () {
    if ($(this).hasClass('infobox'))return true;
    if ($(this).text().trim() == "")
      $(this).remove();

    $(this).css({'margin':'1em 0', 'float':'none'});

    $(this).find('b').each(function () {
      $(this).css({'font-weight':$(this).css('font-weight')});
    });

    $(this).find('td,th').each(function () {
      $(this).css({'vertical-align':$(this).css('vertical-align'), margin:$(this).css('margin'), padding:$(this).css('padding')});
    });

    $(this).find('tr').each(function () {
      $(this).css({'height':$(this).css('height')});
    });
  });
};

handleLi = function () {
  var $liInsideUl = $('ul').children('li');
  $liInsideUl.children('ul').css('marginLeft', '15px');
  var $liInsideOl = $('ol').children('li');
  $liInsideOl.children('ul').css('marginLeft', '15px');
  $liInsideUl.each(function (i) {
    if ($(this).find('img').length == 0) {
      $(this).css('text-align', 'justify');
    }
    $(this).css({display:$(this).css('display'), 'vertical-align':$(this).css('vertical-align'), 'list-style-position':'inside', 'list-style-image':$(this).css('list-style-image'), 'list-style-type':$(this).css('list-style-type')});
  });
  $('ul.gallery').find('li').css({'display':'block', 'width':''});
};

handleOl = function () {
  $('ol').not('.references').each(function () {
    $(this).css({'margin':$(this).css('margin')});
  })
};

handleDiv = function () {
  var $divOutsideTable = $('#content').find('div').not('table div');
  $divOutsideTable.css({'margin':'1em 0', 'width':'', 'float':'none'});
  $('div.thumb').find('img').css({'border-radius':'5px', border:'3px solid black'});
};

handleA = function () {
  var $aInContent = $('#content').find('a');
  $aInContent.attr({'color':'black', 'hover-color':'green', 'target':'_blank'});

  var $aInNewClass = $aInContent.find('a.new');
  $aInNewClass.attr({'href':'#'});
  $aInNewClass.css({'cursor':'text'});

  $('#content').hover(
    function () {
      $aInContent.each(function () {
        $(this).css('color', $(this).attr('hover-color'));
      });
    },
    function () {
      $aInContent.each(function () {
        $(this).css('color', $(this).attr('color'));
      });
    }
  );

  $aInContent.hover(
    function () {
      if ($(this).attr('hover-color') != 'white') {
        $(this).css('color', 'lightCoral');
      }
    },
    function () {
      $(this).css('color', $(this).attr('hover-color'));
    });
};

handleP = function () {
  $('p').each(function () {
    if ($(this).text() == "") {
      $(this).remove();
    }

    $(this).find('img').each(function () {
      if ($(this).width() > 25 || $(this).height() > 25) {
        $(this).css('text-align', 'left');
        return false;
      }
    });
  });
};

removeElements = function () {
  $('#content~*,#coordinates,#mw-articlefeedback,#mw-articlefeedbackv5,' +
    '#mw-js-message,#catlinks,#protected-icon,#mw-content-text~*,#top,' +
    '#siteNotice,#jump-to-nav,#contentSub,#mw-head,#mw-panel,#footer,#mw-page-base,#mw-head-base,#siteSub,' +
    'script,hr,head,' +
    'span.mw-cite-backlink,span.editsection,span.printonly,' +
    'sup.Template-Fact,sup[id],' +
    'img[src*=\\/info\\.png],img[src*=magnify-clip],img[src*=Magnify-clip],' +
    'div.printfooter,div.articleFeedback-panel,div.noprint.tright.portal,' +
    'table.navbox,table.ambox,table.vertical-navbox.nowraplinks,table.ambox-style,table.metadata').remove();
};

addSearchBox = function () {
  $('#content').before('<div id="simpleSearch"> <input type="text" name="search" value="" title="Search Wikipedia" accesskey="f" id="searchInput" tabindex="1" placeholder="Search" autocomplete="off"> <div  title="Search Wikipedia for this text"><img id="search-ltr" alt="Search"></div></div>');
  $('#search-ltr').attr({src:chrome.extension.getURL("search-ltr.png")});
  $('#simpleSearch input').keydown(function (event) {
    if (event.which == 40) {
      var highlight = $('#suggestion').find('li.highlight');
      if (highlight.length == 0) {
        $('#suggestion').find('li:first').addClass('highlight');
        return;
      }
      highlight.removeClass('highlight');
      if (highlight.is('last-child'))
        $('#suggestion').find('li:last').addClass('highlight');
      else
        highlight.next().addClass('highlight');
      return;
    }
    if (event.which == 38) {
      highlight = $('#suggestion').find('li.highlight');
      if (highlight.length == 0) {
        $('#suggestion').find('li:last').addClass('highlight');
        return;
      }
      highlight.removeClass('highlight');
      if (highlight.is(':first-child'))
        $('#suggestion').find('li:last').addClass('highlight');
      highlight.prev().addClass('highlight');
    }
  });
  $('#simpleSearch input').focusin(function () {
    $('#suggestion').show();
  });
  $('#simpleSearch input').focusout(function () {
    $('#suggestion').hide();
  });
  $('#simpleSearch input').keyup(function (event) {
    if (event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40)    // left,up,right,down
      return;
    if (event.which == 13) {               //enter
      window.open("http://en.wikipedia.org/wiki/" + $('#suggestion li.highlight').text().replace(/\s/g, '_'), "_blank");
    }

    $.getJSON("http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=" + $(this).val() + "&namespace=0&suggest=", function (json) {
      $('#suggestion').remove();
      var suggestion = $('<ul id="suggestion"></ul>')
      while (json[1].length > 0) {
        suggestion.append("<li>" + json[1].pop() + "</li>");
      }
      if (suggestion.find('li').length > 0) {
        $('#simpleSearch').append(suggestion);
      }
      suggestion.find('li').click(function () {
        window.open("http://en.wikipedia.org/wiki/" + $(this).text().replace(/\s/g, '_'), "_blank");
      });
    });
  });
};

addMenu = function () {
  toc.removeAttr('style');
  toc.hide();
  toc.find('#toctitle').remove();
  toc.find('span.toctoggle').remove();
  toc.find('tr,td').removeAttr('style');
  toc.hover(function () {
    $(this).find('a').css('color', 'green');
  }, function () {
    $(this).find('a').css('color', 'black');
  });
};

addToolBar = function () {
  var toolBar = $('<div id="toolBar"><ul class="cssTabs"><li>CONTENTS</li><li><input type="text" name="search" value="" title="Search Wikipedia" accesskey="f" id="searchInput" tabindex="1" placeholder="Search" autocomplete="off"> <div  title="Search Wikipedia for this text"><img id="search-ltr" alt="Search"></div></li></ul><div style="height: 4px"></div></div></div>')
  $('#content').before(toolBar);
  toolBar.find('#search-ltr').attr({src:chrome.extension.getURL("search-ltr.png")});
  toolBar.css('left', ($(window).width() - toolBar.width()) / 2);
  toolBar.append(toc);
  toolBar.hover(
    function () {
    }, function () {
      toc.hide();
      $('#content').css('opacity', 1);
      $('ul.cssTabs li:first').css({'background-color':'rgb(245, 245, 245)', 'border-radius':'0 0 0 0'});
      toolBar.css({position:'fixed', top:0})
    }
  );
  $('ul.cssTabs li:first').hover(
    function () {
      toc.show();
      $('#content').css('opacity', 0.05);
      $(this).css({'background-color':'rgb(220, 220, 220)', 'border-radius':'0 0 10px 10px'});
      toolBar.css({position:'absolute', top:$(window).scrollTop()});
    });
  toolBar.css({'z-index':100});
  $('#firstHeading').css('z-index', '-1');
};

var toc;
$(document).ready(function () {
  $('html').css({'background':'white', 'color':'black'});
  toc = $('#toc');
  toc.hide();
  toc.remove();
  removeElements();
});

window.onload = function () {
  removeElements();
  handleCenter();
  handleTable();
  handleLi();
  handleA();
  handleOl();
  handleP();
  handleDiv();
//  addSearchBox();
  addMenu();
  addToolBar();
};


