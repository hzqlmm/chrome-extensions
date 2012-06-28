var tabId = -1;
chrome.extension.sendRequest({}, function (response) {
    tabId = response.tabId;
});

function handleTableElement() {
    var $allTables = $('table:not(#toc)');
    $allTables.css('padding', '3px');
    $allTables.each(function () {
        $(this).css({'background':$(this).css('background'), 'color':$(this).css('color'), 'border':$(this).css('border'), 'border-collapse':$(this).css('border-collapse'),
            'margin':'1em 0', 'float':''});
        if ($(this).css('background-color') != 'rgba(0, 0, 0, 0)') {
            $(this).find('a').css('color', 'black');
            $(this).find('a').attr('color', 'black');
            $(this).find('a').attr('hover-color', 'rgb(0,153,0)');
            $(this).find('div').each(function () {
                $(this).css({'color':$(this).css('color')});
            });
        } else {
            $(this).css('background-color', 'white');
        }

        $(this).find('b').each(function () {
            $(this).css({'font-weight':$(this).css('font-weight')});
        });

        $(this).find('td,th').each(function () {
            $(this).css({'vertical-align':$(this).css('vertical-align'), margin:$(this).css('margin'), padding:$(this).css('padding'), 'color':$(this).css('color'), 'border':$(this).css('border'), 'border-top':$(this).css('border-top')});
        });

        $(this).find('tr').each(function () {
            $(this).css({'height':$(this).css('height')});
        });
    });
    return $allTables;
}

function handleLiElement() {
    var $allLiInsideUl = $('ul').find('li');
    $allLiInsideUl.each(function (i) {
        if ($(this).find('img').length == 0) {
            $(this).css('text-align', 'justify');
        }
        if ($(this).css('list-style-image') == 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAANAQMAAABb8jbLAAAABlBMVEX///8AUow5QSOjAAAAAXRSTlMAQObYZgAAABpJREFUeF5VxaEBAAAAgjBO9nyjGoUwPuFdCRqSA8lTAUBSAAAAAElFTkSuQmCC)') {
            $(this).css({display:$(this).css('display'), 'vertical-align':$(this).css('vertical-align'), 'list-style-image':'none', 'list-style-type':'disc'});
            return true;
        }
        $(this).css({display:$(this).css('display'), 'vertical-align':$(this).css('vertical-align'), 'list-style-image':$(this).css('list-style-image'), 'list-style-type':$(this).css('list-style-type')});
    });
    $('ul.gallery').find('li').css({'display':'block', 'width':''});
    $('#toc').find('li').css('text-align', 'left');
    return $allLiInsideUl;
}

function handleCaptionElement() {
    $('caption').each(function () {
        if ($(this).css('background-color') == 'rgba(0, 0, 0, 0)') {
            $(this).css('color', 'antiqueWhite');
        }
    });
}


$(document).ready(function () {
    var $feedback = $('#mw-articlefeedback');
    console.log($feedback);
    $('table.navbox,' +
        'table.ambox,' +
        '#coordinates,' +
        '#mw-articlefeedback,' +
        '#mw-articlefeedbackv5,' +
        'div.printfooter,' +
        'div.noprint.plainlinks.hlist.navbar.mini,' +
        'span.editsection,' +
        'span.printonly,' +
        'sup.Template-Fact').remove();

    var $visibleOnes = $(':not(span[style*="visibility:hidden"])');
    var $allTables = handleTableElement();
    var $liInsideUl = handleLiElement();
    var $ulInsideLi = $liInsideUl.find('ul');
    $ulInsideLi.each(function () {
        $(this).css({'margin':$(this).css('margin')});
    });

    handleCaptionElement();
    var $content = $('#content');
    var $divOutsideTable = $content.find('div:not(table div)');
    $divOutsideTable.css({'margin':'1em 0', 'width':''});
    var $divThumb = $divOutsideTable.find('.thumb');
    $divThumb.css('color', 'antiqueWhite');

    var $thumbImages = $divOutsideTable.find('.thumbinner>a>img');
    var $imagesOutsideTable = $('img:not(table img)').not('div.thumbinner img');

    var $aInContent = $content.find('a').not('#toc a');
    $aInContent.attr({'color':'white', 'hover-color':'lightblue'});

    var $aInsideThumb = $divThumb.find('a');
    $aInsideThumb.css('color', 'antiqueWhite');
    $aInsideThumb.attr({'color':'antiqueWhite'});

    var $aInNewClass = $content.find('a.new');
    $aInNewClass.attr({'href':'#', 'color':'white', 'hover-color':'white'});
    $aInNewClass.css({'cursor':'text'})

    var $aInsideTable = $allTables.find('a');
    $aInsideTable.css('color', 'black');
    $aInsideTable.attr('color', 'black');
    $aInsideTable.attr('hover-color', 'rgb(0,153,0)');

    $('a[href^=#cite_ref]').remove();
    $visibleOnes.find('[class]').removeClass();
    $('#toc a[href=#References]').parent().find('~*').remove();
    $('#toc a[href=#References]').parent().remove();
    $('#content~*').remove();
    $('html').css('backgroundImage', 'url(' + chrome.extension.getURL("background.jpg") + ')');

    $thumbImages.addClass('img-frame');
    $imagesOutsideTable.addClass('img-frame');
    $imagesOutsideTable.css({'margin':'2px', 'vertical-align':'middle', '-webkit-border-radius':'3px'});

    $allTables.each(function () {
        if ($(this).css('background-color') != 'rgba(0, 0, 0, 0)') {
            $(this).addClass('table-frame');
        }
    });

    var item = window.location.pathname;
    item = item.replace('/wiki/', '');
    var track = $.jStorage.get(item);
    track = track == null ? "" : track;

    var menu = $("<div class='menucontainer'><div class='extension_options'><span>TRACK</span></div><div id='mcs_container'><div class='customScrollBox'> <div class='horWrapper'> <div class='container'> <div class='content'></div> </div> <div class='dragger_container'> <div class='dragger'></div> </div> </div> </div> </div></div>");
    var paths = $('<ul id="track" style="display: none;"></ul>');
    if (track.length > 0) {
        var parts = track.split('||');
        for (var i = 0; i < parts.length; i = i + 3) {
            paths.append('<li><a href=/wiki/' + parts[i] + ' tabId=' + parts[i + 2] + '>' + parts[i + 1] + '</a></li>');
        }
    }
    menu.find('.content').append(paths);

    $.jStorage.deleteKey(item);
    if ($('#toc').exist()) {
        var toc = $("<ul id='toc'></ul>");
        toc.append($('#toc').find('ul:first').find('li'));
        menu.find('.content').prepend(toc);
        $('#toc').remove();
        $('body').prepend(menu);
    } else if (track.length > 0) {
        $('body').prepend(menu);
        $('#track').show();
        $('div.extension_options').hide();
    }

    if (track == "") {
        $('div.extension_options').hide();
    }

    var $aInMCSContainer = $('#mcs_container').find('a');
    $aInMCSContainer.attr({'color':'white', 'hover-color':'lightblue'});

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

    $('#mcs_container').hover(
        function () {
            $aInMCSContainer.each(function () {
                $(this).css('color', $(this).attr('hover-color'));
            });
        },
        function () {
            $aInMCSContainer.each(function () {
                $(this).css('color', $(this).attr('color'));
            });
        }
    );

    $('a').hover(
        function () {
            if ($(this).attr('hover-color') != 'white') {
                $(this).css('color', 'lightCoral');
            }
        },
        function () {
            $(this).css('color', $(this).attr('hover-color'));
        });

    $("#mcs_container").mCustomScrollbar("vertical", 500, "easeOutCirc", 1.05, "auto", "yes", "yes", 10);
    $('.sidebar_menu >p').click(function () {
        if ($(this).text() == 'MENU') {
            $('.sidebar_menu').animate({left:'-20%'}, 500, function () {
                $('div.menucontainer').animate({left:0}, 500);
            })
        }
    });

    var $aWithUrl = $aInContent.find('a[href^=#]');
    $aWithUrl.attr('target', '_blank');
    $aWithUrl.not('#track a').click(function () {
        var href = $(this).attr("href");
        var go = href.substr(href.lastIndexOf('/') + 1);
        var newTrack = item + "||" + $('#firstHeading span').text() + "||" + tabId;
        $.jStorage.set(go, track == "" ? newTrack : track + "||" + newTrack);
        return true;
    });

    $('#track a').click(function () {
    });

    $('.extension_options span').click(function () {
        var text = $(this).text();

        $('#mcs_container').fadeOut(500, function () {
            $('#mcs_container').fadeIn(500);
        });

        $('.extension_options').fadeOut(500, function () {
            if ('TRACK' == text) {
                $('#toc').hide();
                $('#track').show();
                $('.extension_options span').text('MENU');
                $("#mcs_container").mCustomScrollbar("vertical", 500, "easeOutCirc", 1.05, "auto", "yes", "yes", 10);
            } else {
                $('#toc').show();
                $('#track').hide();
                $('.extension_options span').text('TRACK');
                $("#mcs_container").mCustomScrollbar("vertical", 500, "easeOutCirc", 1.05, "auto", "yes", "yes", 10);
            }
            $('.extension_options').fadeIn(500);
        });
    });

    $(window).scroll(function () {
        $.jStorage.set(window.location.pathname, $(window).scrollTop());
    });

    $('#track li >a').click(function () {
        chrome.extension.sendRequest({url:'http://en.wikipedia.org' + $(this).attr('href')}, function (response) {
        });
        return false;
    });

    $('#bodyContent').css('color', 'white');
});

chrome.extension.onRequest.addListener(function (req, sender, sendResponse) {
    if (req.html == 'complete') {
        var $feedback = $('#mw-articlefeedback');
        console.log($feedback);

        $('#References').parent().find('~*').remove();
        $('#References').parent().remove();
        $('html').find('div[id*=articlefeedback],' +
            'div[id*=articleFeedback],' +
            '#mw-js-message,' +
            '#catlinks,' +
            '#protected-icon,' +
            '#mw-articlefeedback' +
            '#mw-content-text~*,' +
            'span.tocnumber,' +
            'script,' +
            'div.printfooter,' +
            'div.articleFeedback-panel,' +
            'div.references-column-width,' +
            'hr,' +
            'head,' +
            'a#top,' +
            '#mw-js-message,' +
            '#siteNotice,' +
            '#jump-to-nav,' +
            '#contentSub,' +
            '#mw-head,' +
            '#mw-panel,' +
            '#footer,' +
            '#mw-page-base,' +
            '#mw-head-base,' +
            '#siteSub,' +
            'sup[id],' +
            'img[src*=\\/info\\.png],' +
            'img[src*=magnify-clip],' +
            'img[src*=Magnify-clip],' +
            'table.ambox-style').remove();

//        var left = $('#bodyContent').offset().left;
//        var width = $('#bodyContent').width();
//        $('table').each(function () {
//            $(this).css('float', '');
//            if ($(this).width() > width) {
//                var style = $(this).attr('style');
//                style = style == undefined ? "" : style;
//                style += ';-webkit-transform: scale(' + width / $(this).width() + ')';
//                $(this).attr('style', style);
//                $(this).offset({left:left});
//            }
//        });
        $('div').css('float', '');

        $('p').each(function () {
            if ($(this).text() == "") {
                $(this).remove();
            }
            if ($(this).find('img').length > 0) {
                $(this).css('text-align', 'left');
            }
        });

        $('#toc li').each(function () {
            if ($(this).next().offset() != null && $(this).next().offset().top > ($('#mcs_container').height() + $('#mcs_container').offset().top)) {
                $('#mcs_container').css('height', $(this).offset().top + $(this).height() + 10 - $('#mcs_container').offset().top);
                return false;
            }
        });

        $('#mcs_container .dragger').hover(
            function () {
                $(this).css('background', 'lightblue');
            },
            function () {
                $(this).css('background', 'white');
            }
        );

        $('#mw-content-text').after('<br>');

        setTimeout("$('#mw-articlefeedback').remove()", 500);
    }
});



