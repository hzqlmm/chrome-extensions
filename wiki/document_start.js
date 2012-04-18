$(document).ready(function () {
	$('html').css('backgroundImage', 'url(' + chrome.extension.getURL("background.jpg") + ')');
    var menu = $("<div class='sidebar_menu'><p></p><p>TRACK</p></div><div class='menucontainer'><div class='close_icon'><p>+</p></div><div id='mcs_container' class='translate'><div class='customScrollBox'> <div class='horWrapper'> <div class='container'> <div class='content'></div> </div> <div class='dragger_container'> <div class='dragger'></div> </div> </div> </div> </div></div>");

    $('#catlinks,span.tocnumber,script,div.printfooter,#mw-articlefeedback,div.articleFeedback-panel div.references-column-width,hr,head,#protected-icon,a#top,#mw-js-message,#siteNotice,#jump-to-nav,#contentSub,#mw-head,#mw-panel,#footer,#mw-page-base,#mw-head-base,#siteSub,sup,table.ambox-style').remove();
    $('#References').parent().find('~*').remove();
    $('#References').parent().remove();
    $('html').find('*').removeClass();
    $('html').find('*').removeAttr('style');

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

    var left = $('div#bodyContent').offset().left;
    $('#content').children().offset({left:left});

    var width = $('div#bodyContent').width();
    $('#content').children().css('width', width);

    $('#content').css('color', 'white');
    $('#bodyContent').css('color', 'white');
    $('#content').offset({top:0});

    $('#content,#mcs_container').hover(
        function () {
            $(this).find('a').css('color', 'lightblue');
        },
        function () {
            $(this).find('a').css('color', 'white');
        });

    $('body').css('backgroundImage', 'url(' + chrome.extension.getURL("background.jpg") + ')');
    $('div.sidebar_menu p:first').css('backgroundImage','url(' + chrome.extension.getURL("menu_editor.png") + ')');
    $('#content').css({'height':$('#content').height() + 20, 'top':0});
    $("#mcs_container").mCustomScrollbar("vertical", 1000, "easeOutCirc", 1.05, "fixed", "yes", "yes", 20);
    $('div.menucontainer').css('left', '-20%');
    $(".close_icon").hide();

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
      	$.jStorage.set(window.location.pathname,$(window).scrollTop()); 
    });
    window.scrollTo(0, 0);
})
