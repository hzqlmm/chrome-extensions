$(document).ready(function () {
    $('html').css('backgroundImage', 'url(' + chrome.extension.getURL("background.jpg") + ')');

    $('img[src*=\\/info\\.png],img[src*=magnify-clip],#catlinks,span.tocnumber,script,div.printfooter,#mw-articlefeedback,div.articleFeedback-panel div.references-column-width,hr,head,#protected-icon,a#top,#mw-js-message,#siteNotice,#jump-to-nav,#contentSub,#mw-head,#mw-panel,#footer,#mw-page-base,#mw-head-base,#siteSub,sup,table.ambox-style').remove();
    $('#References').parent().find('~*').remove();
    $('#References').parent().remove();
    $('html').find('*').removeClass();
    $('html').find('*').removeAttr('style');

    var menu = $("<div class='menucontainer'><div class='extension_options'><span>TRACK</span></div><div id='mcs_container' class='translate'><div class='customScrollBox'> <div class='horWrapper'> <div class='container'> <div class='content'></div> </div> <div class='dragger_container'> <div class='dragger'></div> </div> </div> </div> </div></div>");
    if ($('table#toc').exist()) {
        var ul = $("<ul id='toc'></ul>");
        var li = $('#toc ul:first').find('li');
        ul.append(li);
        menu.find('.content').prepend(ul);
        $('table#toc').remove();
        $('body').prepend(menu);
        $('div.dragger').css('height', '60px');
        $('a[href=#References]').parent().find('~*').remove();
        $('a[href=#References]').parent().remove();
    }

    $('#content,#mcs_container').hover(
        function () {
            $(this).find('a').css('color', 'lightblue');
        },
        function () {
            $(this).find('a').css('color', 'white');
        });

    $('#content').css({'height':$('#content').height() + 20, 'top':0});
    $("#mcs_container").mCustomScrollbar("vertical", 1000, "easeOutCirc", 1.05, "fixed", "yes", "yes", 20);

    $(".close_icon").click(function () {
        $('div.menucontainer').animate({left:-1000}, 1000, function () {
            $('.sidebar_menu').animate({left:0}, 500);
        })
    });

    $('div.menucontainer').hover(
        function () {
            var left = $('div.dragger_container').offset().left;
            $(".close_icon").css('left', left - 14);
            $(".close_icon").show();
        },
        function () {
            $('.close_icon').hide();
        });

    $('#mcs_container').hover(
        function () {
            var left = $('div.dragger_container').offset().left;
            $(".close_icon").css('left', left - 14);
            $(".close_icon").show();
        });

    $('.sidebar_menu >p').click(function () {
        if ($(this).text() == 'MENU') {
            $('.sidebar_menu').animate({left:'-20%'}, 500, function () {
                $('div.menucontainer').animate({left:0}, 500);
            })
        }
    });
    $(window).scroll(function () {
        $.jStorage.set(window.location.pathname, $(window).scrollTop());
    });
    window.scrollTo(0, 0);

    var item = window.location.pathname;
    item = item.replace('/wiki/', '');
    var track = $.jStorage.get(item);
    track = track == null ? [] : track;
    $.jStorage.deleteKey(item);

    $('a:not(a[href^=#])').attr('target', '_blank');
    $('a:not(a[href^=#])').click(function (event) {
        var href = $(this).attr("href");
        var go = href.substr(href.lastIndexOf('/') + 1);
        var newTrack = $.extend({}, track);
        newTrack[newTrack.length] = item;
        $.jStorage.set(go, track);
        return true;
    });

    $('img').each(function () {
        var img = $(this).get(0);
        if (img.clientWidth < 50 && img.clientHeight < 50) {
            $(this).css({'-webkit-border-radius':0, '-webkit-box-shadow':'0 0 0'});
        }
    });


    $('.extension_options span').click(function () {
        var text = $(this).text();

        $('#mcs_container').fadeOut(500, function () {
            $('#mcs_container').fadeIn(500);
        });

        $('.extension_options').fadeOut(500, function () {
            if ('TRACK' == text) {
                $('.extension_options span').text('MENU');
            } else {
                $('.extension_options span').text('TRACK');
            }
            $('.extension_options').fadeIn(500);
        });
    })


});


