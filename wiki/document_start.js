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

handleTable = function handleTable() {
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

    $aInContent.find('a[href^=#cite_ref]').remove();

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
    $('#content~*,#toc,#coordinates,#mw-articlefeedback,#mw-articlefeedbackv5,' +
        '#mw-js-message,#catlinks,#protected-icon,#mw-content-text~*,#top,' +
        '#siteNotice,#jump-to-nav,#contentSub,#mw-head,#mw-panel,#footer,#mw-page-base,#mw-head-base,#siteSub,' +
        'script,hr,head,' +
        'span.tocnumber,span.mw-cite-backlink,span.editsection,span.printonly,' +
        'sup.Template-Fact,sup[id],' +
        'img[src*=\\/info\\.png],img[src*=magnify-clip],img[src*=Magnify-clip],' +
        'div.printfooter,div.articleFeedback-panel,div.noprint.tright.portal,' +
        'table.navbox,table.ambox,table.vertical-navbox.nowraplinks,table.ambox-style,table.metadata.mbox-small').remove();
};


$(document).ready(function () {
    $('html').css({'background':'white', 'color':'black'});
    removeElements();
});


window.onload = function () {
    handleTable();
    handleLi();
    handleA();
    handleOl();
    handleCenter();
    handleP();
    handleDiv();
    removeElements();
//    $(':not(span[style*="visibility:hidden"])').removeAttr('class');
};


chrome.extension.onRequest.addListener(function (req, sender, sendResponse) {
    if (req.html == 'complete') {
    }
});



