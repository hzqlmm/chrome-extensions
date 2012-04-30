var tabId = -1;
chrome.extension.sendRequest({}, function (response) {
    tabId = response.tabId;
});

$(document).ready(function () {
    $('table.ambox').remove();
    $('#toc a[href=#References]').parent().find('~*').remove();
    $('#toc a[href=#References]').parent().remove();
    $('#content~*').remove();
    $('.printonly').remove();
    $('*[class]').removeClass();
    $('*[style]').removeAttr('style');
    $('html').css('backgroundImage', 'url(' + chrome.extension.getURL("background.jpg") + ')');

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
    if ($('table#toc').exist()) {
        var toc = $("<ul id='toc'></ul>");
        var li = $('#toc ul:first').find('li');
        toc.append(li);
        menu.find('.content').prepend(toc);
        $('table#toc').remove();
        $('body').prepend(menu);
    } else if (track.length > 0) {
        $('body').prepend(menu);
        $('ul#track').show();
    }


    $('#content,#mcs_container').hover(
        function () {
            $(this).find('a').css('color', 'lightblue');
        },
        function () {
            $(this).find('a').css('color', 'white');
        });

    $('a').hover(
        function () {
            $(this).css('color', 'lightCoral');
        },
        function () {
            $(this).css('color', 'lightblue');
        });

    $("#mcs_container").mCustomScrollbar("vertical", 500, "easeOutCirc", 1.05, "auto", "yes", "yes", 20);
    $('.sidebar_menu >p').click(function () {
        if ($(this).text() == 'MENU') {
            $('.sidebar_menu').animate({left:'-20%'}, 500, function () {
                $('div.menucontainer').animate({left:0}, 500);
            })
        }
    });

    $('a:not(a[href^=#])').attr('target', '_blank');
    $('a:not(a[href^=#]):not(#track a)').click(function () {
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
            } else {
                $('#toc').show();
                $('#track').hide();
                $('.extension_options span').text('TRACK');
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
});

chrome.extension.onRequest.addListener(function (req, sender, sendResponse) {
    if (req.html == 'complete') {
        $('#References').parent().find('~*').remove();
        $('#References').parent().remove();
        $('html').find('div[id*=articlefeedback],' + 'div[id*=articleFeedback],' + '#mw-js-message,' + '#catlinks,' + '#protected-icon,' +
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

        var left = $('#bodyContent').offset().left;
        var width = $('#bodyContent').width();
        $('table').each(function () {
            if ($(this).width() != width) {
                var style = $(this).attr('style');
                style = style == undefined ? "" : style;
                style += ';-webkit-transform: scale(' + width / $(this).width() + ')';
                $(this).attr('style', style);
                $(this).offset({left:left});
            }
        });
        $('a[href^="/w/"]').parent().remove();
        $('p').each(function () {
            if ($(this).text() == "") {
                $(this).remove();
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
        $('#bodyContent div').css('marginBottom', '1.5em');
//        $('#content').css('height', $('#content').height() + 400);
    }
});


