//chrome.extension.onRequest.addListener(function (request) {
//    console.log(request.status);
//    $('html').css('opacity', 0);
//
//    var loadingDiv = $('<div></div>');
//    loadingDiv.css({'backgroundImage':'url(' + chrome.extension.getURL("loading-big.gif") + ')',
//        "position":"absolute",
//        "left":$(window).width() / 2,
//        "top":$(window).height() / 2,
//        "opacity":1,
//        "width":"100px",
//        "height":"100px",
//        "z-index":100});
//    loadingDiv.attr('id', 'loading');
//    $('html').prepend(loadingDiv);
//});

chrome.extension.onRequest.addListener(function (req, sender, sendResponse) {
    console.log(req);
});

$('#toctitle').bind('click', function () {
    newPage = $('html').html();
    $('html').find('*').remove();
    $('html').html(originalPage);
});

var originalPage;
var newPage;
var body;
$(document).ready(function () {
    $('html').css('backgroundImage', 'url(' + chrome.extension.getURL("background.jpg") + ')');
});
$(document).ready(function () {
   originalPage = $('html').html();

   var menu = $("<div class='sidebar_menu'><p>MENU</p><p>TRACK</p><p>BACK</p></div><div class='menucontainer'><div class='close_icon'><p>+</p></div><div id='mcs_container' class='translate'><div class='customScrollBox'> <div class='horWrapper'> <div class='container'> <div class='content'></div> </div> <div class='dragger_container'> <div class='dragger'></div> </div> </div> </div> </div></div>");

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
   window.scrollTo(0, 0);
});

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = elem.offset().top;
    var elemBottom = elemTop + elem.height();

    return elemTop <= (docViewTop + docViewBottom / 2);
}

$(window).scroll(function () {
});

var language = 'general';

function getTagName(_node) {
    return _node.nodeType === 3 ? '#text' : ((_node.nodeType === 1 && _node.tagName && _node.tagName > '') ? _node.tagName.toLowerCase() : '#invalid');
}
var getContent__exploreNodeAndGetStuff = function (_nodeToExplore, _justExploring) {
    var
        _global__element_index = 0,
        _global__inside_link = false,
        _global__inside_link__element_index = 0,
        _global__length__above_plain_text = 0,
        _global__count__above_plain_words = 0,
        _global__length__above_links_text = 0,
        _global__count__above_links_words = 0,
        _global__count__above_candidates = 0,
        _global__count__above_containers = 0,
        _global__above__plain_text = '',
        _global__above__links_text = '',
        _return__containers = [],
        _return__candidates = [],
        _return__links = [];

    var _recursive = function (_node) {
        _global__element_index++;

        var
            _tag_name = getTagName(_node),
            _result =
            {
                '__index':_global__element_index,
                '__node':_node,
                '_is__container':(parsingOptions._elements_container.indexOf('|' + _tag_name + '|') > -1),
                '_is__candidate':false,
                '_is__text':false,
                '_is__link':false,
                '_is__link_skip':false,
                '_is__image_small':false,
                '_is__image_medium':false,
                '_is__image_large':false,
                '_is__image_skip':false,
                '_length__above_plain_text':_global__length__above_plain_text,
                '_count__above_plain_words':_global__count__above_plain_words,
                '_length__above_links_text':_global__length__above_links_text,
                '_count__above_links_words':_global__count__above_links_words,
                '_length__above_all_text':(_global__length__above_plain_text + _global__length__above_links_text),
                '_count__above_all_words':(_global__count__above_plain_words + _global__count__above_links_words),
                '_count__above_candidates':_global__count__above_candidates,
                '_count__above_containers':_global__count__above_containers,
                '_length__plain_text':0,
                '_count__plain_words':0,
                '_length__links_text':0,
                '_count__links_words':0,
                '_length__all_text':0,
                '_count__all_words':0,
                '_count__containers':0,
                '_count__candidates':0,
                '_count__links':0,
                '_count__links_skip':0,
                '_count__images_small':0,
                '_count__images_medium':0,
                '_count__images_large':0,
                '_count__images_skip':0
            };

        switch (true) {
            case ((_tag_name == '#invalid')):
            case ((parsingOptions._elements_ignore.indexOf('|' + _tag_name + '|') > -1)):
                return;
            case ((parsingOptions._elements_visible.indexOf('|' + _tag_name + '|') > -1)):
                switch (true) {
                    case (_node.offsetWidth > 0):
                    case (_node.offsetHeight > 0):
                        break;
                    default:
                        switch (true) {
                            case (_node.offsetLeft > 0):
                            case (_node.offsetTop > 0):
                                break;

                            default:
                                return;
                        }
                        break;
                }
                break;
            case (parsingOptions._elements_self_closing.indexOf('|' + _tag_name + '|') > -1):
                switch (true) {
                    case ((_tag_name == 'img')):
                        break;
                    default:
                        return;
                }
                break;
        }

        switch (true) {
            case ((_tag_name == '#text')):
                _result._is__text = true;
                var _nodeText = _node.nodeValue;
                _result._length__plain_text = measureText__getTextLength(_nodeText);
                _result._count__plain_words = measureText__getWordCount(_nodeText);

                if (_global__inside_link) {
                    _global__length__above_links_text += _result._length__plain_text;
                    _global__count__above_links_words += _result._count__plain_words;
                }
                else {
                    _global__length__above_plain_text += _result._length__plain_text;
                    _global__count__above_plain_words += _result._count__plain_words;
                }

                return _result;
            case (_tag_name == 'a'):
                var _href = _node.href;
                if (_href > ''); else {
                    break;
                }
                if (_href.indexOf); else {
                    break;
                }

                _result._is__link = true;

                for (var i = 0, _i = skipStuffFromDomains__links.length; i < _i; i++) {
                    if (_node.href.indexOf(skipStuffFromDomains__links[i]) > -1) {
                        _result._is__link_skip = true;
                        break;
                    }
                }

                if (_global__inside_link); else {
                    _global__inside_link = true;
                    _global__inside_link__element_index = _result.__index;
                }

                _return__links.push(_result);
                break;

            case (_tag_name == 'img'):
                if (_node.src && _node.src.indexOf) {
                    for (var i = 0, _i = skipStuffFromDomain__images.length; i < _i; i++) {
                        if (_node.src.indexOf(skipStuffFromDomain__images[i]) > -1) {
                            _result._is__image_skip = true;
                            break;
                        }
                    }
                }

                var _width = $(_node).width(), _height = $(_node).height();
                switch (true) {
                    case ((_width * _height) >= 50000):
                    case ((_width >= 350) && _height >= 75):
                        _result._is__image_large = true;
                        break;

                    case ((_width * _height) >= 20000):
                    case ((_width >= 150) && (_height >= 150)):
                        _result._is__image_medium = true;
                        break;

                    case ((_width <= 5) && (_height <= 5)):
                        _result._is__image_skip = true;
                        break;

                    default:
                        _result._is__image_small = true;
                        break;
                }

                break;
        }

        for (var i = 0, _i = _node.childNodes.length; i < _i; i++) {
            var
                _child = _node.childNodes[i],
                _child_result = _recursive(_child);
            if (_child_result); else {
                continue;
            }

            _result._count__links += _child_result._count__links + (_child_result._is__link ? 1 : 0);
            _result._count__links_skip += _child_result._count__links_skip + (_child_result._is__link_skip ? 1 : 0);
            _result._count__images_small += _child_result._count__images_small + (_child_result._is__image_small ? 1 : 0);
            _result._count__images_medium += _child_result._count__images_medium + (_child_result._is__image_medium ? 1 : 0);
            _result._count__images_large += _child_result._count__images_large + (_child_result._is__image_large ? 1 : 0);
            _result._count__images_skip += _child_result._count__images_skip + (_child_result._is__image_skip ? 1 : 0);
            _result._count__containers += _child_result._count__containers + (_child_result._is__container ? 1 : 0);
            _result._count__candidates += _child_result._count__candidates + (_child_result._is__candidate ? 1 : 0);
            _result._length__all_text += _child_result._length__plain_text + _child_result._length__links_text;
            _result._count__all_words += _child_result._count__plain_words + _child_result._count__links_words;

            switch (true) {
                case (_child_result._is__link):
                    _result._length__links_text += (_child_result._length__plain_text + _child_result._length__links_text);
                    _result._count__links_words += (_child_result._count__plain_words + _child_result._count__links_words);
                    break;
                default:
                    _result._length__plain_text += _child_result._length__plain_text;
                    _result._count__plain_words += _child_result._count__plain_words;
                    _result._length__links_text += _child_result._length__links_text;
                    _result._count__links_words += _child_result._count__links_words;
                    break;
            }
        }
        if ((_result._is__link) && (_global__inside_link__element_index == _result.__index)) {
            _global__inside_link = false;
            _global__inside_link__element_index = 0;
        }
        if (_result._is__container || ((_result.__index == 1) && (_justExploring))) {
            _return__containers.push(_result);
            if (_result._is__container) {
                _global__count__above_containers++;
            }

            if (_justExploring); else {
                switch (true) {
                    case ((language != 'cjk') && ((_result._count__links * 2) >= _result._count__plain_words)):  /* link ratio */

                    case ((language != 'cjk') && (_result._length__plain_text < (65 / 3))):  /* text length */
                    case ((language != 'cjk') && (_result._count__plain_words < 5)):            /* words */

                    case ((language == 'cjk') && (_result._length__plain_text < 10)):        /* text length */
                    case ((language == 'cjk') && (_result._count__plain_words < 2)):            /* words */
                        break;

                    default:
                        _result._is__candidate = true;
                        _return__candidates.push(_result);
                        _global__count__above_candidates++;
                        break;
                }

                if ((_result.__index == 1) && !(_result._is__candidate)) {
                    _result._is__candidate = true;
                    _result._is__bad = true;
                    _return__candidates.push(_result);
                }
            }
        }
        return _result;
    };


    _recursive(_nodeToExplore);

    if (_justExploring) {
        return _return__containers.pop();
    }

    return {
        '_containers':_return__containers,
        '_candidates':_return__candidates,
        '_links':_return__links
    };
};


var getContent__findInPage = function (_pageWindow) {
    var
        _firstCandidate = false,
        _secondCandidate = false,
        _targetCandidate = false
        ;

    var _stuff = getContent__exploreNodeAndGetStuff(_pageWindow.document.body);

    var _processedCandidates = getContent__processCandidates(_stuff._candidates);
    _firstCandidate = _processedCandidates[0];
    _targetCandidate = _firstCandidate;

    switch (true) {
        case (!(_firstCandidate._count__containers > 0)):
        case (!(_firstCandidate._count__candidates > 0)):
        case (!(_firstCandidate._count__pieces > 0)):
        case (!(_firstCandidate._count__containers > 25)):
            break;

        default:
            var _processedCandidatesSecond = getContent__processCandidatesSecond(_processedCandidates);
            _secondCandidate = _processedCandidatesSecond[0];

            if (_firstCandidate.__node == _secondCandidate.__node) {
                break;
            }

            _firstCandidate['__points_history_final'] = getContent__computePointsForCandidateThird(_firstCandidate, _firstCandidate);
            _firstCandidate['__points_final'] = _firstCandidate.__points_history_final[0];

            _secondCandidate['__points_history_final'] = getContent__computePointsForCandidateThird(_secondCandidate, _firstCandidate);
            _secondCandidate['__points_final'] = _secondCandidate.__points_history_final[0];
            switch (true) {
                case ((_secondCandidate.__candidate_details._count__lines_of_65_characters < 20) && (_secondCandidate.__points_final / _firstCandidate.__points_final) > 1):
                case ((_secondCandidate.__candidate_details._count__lines_of_65_characters > 20) && (_secondCandidate.__points_final / _firstCandidate.__points_final) > 0.9):
                case ((_secondCandidate.__candidate_details._count__lines_of_65_characters > 50) && (_secondCandidate.__points_final / _firstCandidate.__points_final) > 0.75):
                    _targetCandidate = _secondCandidate;
                    break;
            }

            break;
    }

    var _html = getContent__buildHTMLForNode(_targetCandidate.__node, 'the-target');
    _html = _html.substr((_html.indexOf('>') + 1), _html.lastIndexOf('<'));
    _html = _html.replace(/<(blockquote|div|p|td|li)([^>]*)>(\s*<br \/>)+/gi, '<$1$2>');
    _html = _html.replace(/(<br \/>\s*)+<\/(blockquote|div|p|td|li)>/gi, '</$2>');
    _html = _html.replace(/(<br \/>\s*)+<(blockquote|div|h\d|ol|p|table|ul|li)([^>]*)>/gi, '<$2$3>');
    _html = _html.replace(/<\/(blockquote|div|h\d|ol|p|table|ul|li)>(\s*<br \/>)+/gi, '</$1>');
    _html = _html.replace(/(<hr \/>\s*<hr \/>\s*)+/gi, '<hr />');
    _html = _html.replace(/(<br \/>\s*<br \/>\s*)+/gi, '<br /><br />');

    return {
        '_html':_html,
        '_links':_stuff._links,
        '_targetCandidate':_targetCandidate,
        '_firstCandidate':_firstCandidate
    };
};


var parsingOptions =
{
    '_elements_ignore':'|button|input|select|textarea|optgroup|command|datalist|--|frame|frameset|noframes|--|style|link|script|noscript|--|canvas|applet|map|--|marquee|area|base|',
    '_elements_ignore_tag':'|form|fieldset|details|dir|--|center|font|span|',
    '_elements_self_closing':'|br|hr|--|img|--|col|--|source|--|embed|param|--|iframe|',
    '_elements_visible':'|article|section|--|ul|ol|li|dd|--|table|tr|td|--|div|--|p|--|h1|h2|h3|h4|h5|h6|--|span|',
    '_elements_too_much_content':'|b|i|em|strong|--|h1|h2|h3|h4|h5|--|td|',
    '_elements_container':'|body|--|article|section|--|div|--|td|--|li|--|dd|dt|',
    '_elements_link_density':'|div|--|table|ul|ol|--|section|aside|header|',
    '_elements_floating':'|div|--|table|',
    '_elements_above_target':'|br|--|ul|ol|dl|',
    '_elements_keep_attributes':{
        'a':['href', 'title', 'name'],
        'img':['src', 'width', 'height', 'alt', 'title'],

        'video':['src', 'width', 'height', 'poster', 'audio', 'preload', 'autoplay', 'loop', 'controls'],
        'audio':['src', 'preload', 'autoplay', 'loop', 'controls'],
        'source':['src', 'type'],

        'object':['data', 'type', 'width', 'height', 'classid', 'codebase', 'codetype'],
        'param':['name', 'value'],
        'embed':['src', 'type', 'width', 'height', 'flashvars', 'allowscriptaccess', 'allowfullscreen', 'bgcolor'],

        'iframe':['src', 'width', 'height', 'frameborder', 'scrolling'],

        'td':['colspan', 'rowspan'],
        'th':['colspan', 'rowspan']
    }
};

var getContent__processCandidates = function (_candidatesToProcess) {
    var _candidates = _candidatesToProcess;

    _candidates.sort(function (a, b) {
        switch (true) {
            case (a.__index < b.__index):
                return -1;
            case (a.__index > b.__index):
                return 1;
            default:
                return 0;
        }
    });


    var _main = _candidates[0];
    for (var i = 0, _i = _candidates.length; i < _i; i++) {
        var
            _count__pieces = 0,
            _array__pieces = []
            ;

        for (var k = i, _k = _candidates.length; k < _k; k++) {
            if (_candidates[k]._count__candidates > 0) {
                continue;
            }
            if ($.contains(_candidates[i].__node, _candidates[k].__node)); else {
                continue;
            }
            _count__pieces++;
        }


        _candidates[i]['__candidate_details'] = getContent__computeDetailsForCandidate(_candidates[i], _main);


        _candidates[i]['_count__pieces'] = _count__pieces;
        _candidates[i]['_array__pieces'] = _array__pieces;

        _candidates[i]['__candidate_details']['_ratio__count__pieces_to_total_pieces'] = (_count__pieces / (_candidates[0]._count__pieces + 1));

        _candidates[i].__points_history = getContent__computePointsForCandidate(_candidates[i], _main);
        _candidates[i].__points = _candidates[i].__points_history[0];
    }


    _candidates.sort(function (a, b) {
        switch (true) {
            case (a.__points > b.__points):
                return -1;
            case (a.__points < b.__points):
                return 1;
            default:
                return 0;
        }
    });


    return _candidates;
};

var getContent__computeDetailsForCandidate = function (_e, _main) {
    var _r = {};


    if (_e._is__bad) {
        return _r;
    }


    _r['_count__lines_of_65_characters'] = (_e._length__plain_text / 65);
    _r['_count__paragraphs_of_3_lines'] = (_r._count__lines_of_65_characters / 3);
    _r['_count__paragraphs_of_5_lines'] = (_r._count__lines_of_65_characters / 5);

    _r['_count__paragraphs_of_50_words'] = (_e._count__plain_words / 50);
    _r['_count__paragraphs_of_80_words'] = (_e._count__plain_words / 80);


    _r['_ratio__length__plain_text_to_total_plain_text'] = (_e._length__plain_text / _main._length__plain_text);
    _r['_ratio__count__plain_words_to_total_plain_words'] = (_e._count__plain_words / _main._count__plain_words);


    _r['_ratio__length__links_text_to_plain_text'] = (_e._length__links_text / _e._length__plain_text);
    _r['_ratio__count__links_words_to_plain_words'] = (_e._count__links_words / _e._count__plain_words);

    _r['_ratio__length__links_text_to_all_text'] = (_e._length__links_text / _e._length__all_text);
    _r['_ratio__count__links_words_to_all_words'] = (_e._count__links_words / _e._count__all_words);

    _r['_ratio__length__links_text_to_total_links_text'] = (_e._length__links_text / (_main._length__links_text + 1));
    _r['_ratio__count__links_words_to_total_links_words'] = (_e._count__links_words / (_main._count__links_words + 1));

    _r['_ratio__count__links_to_total_links'] = (_e._count__links / (_main._count__links + 1));
    _r['_ratio__count__links_to_plain_words'] = ((_e._count__links * 2) / _e._count__plain_words);


    var
        _divide__candidates = Math.max(2, Math.ceil(_e._count__above_candidates * 0.5)),

        _above_text = ((0 + (_e._length__above_plain_text * 1) + (_e._length__above_plain_text / _divide__candidates) ) / 2),

        _above_words = ((0 + (_e._count__above_plain_words * 1) + (_e._count__above_plain_words / _divide__candidates) ) / 2);

    _r['_ratio__length__above_plain_text_to_total_plain_text'] = (_above_text / _main._length__plain_text);
    _r['_ratio__count__above_plain_words_to_total_plain_words'] = (_above_words / _main._count__plain_words);


    _r['_ratio__count__candidates_to_total_candidates'] = (_e._count__candidates / (_main._count__candidates + 1));
    _r['_ratio__count__containers_to_total_containers'] = (_e._count__containers / (_main._count__containers + 1));

    return _r;
};

var getContent__processCandidatesSecond = function (_processedCandidates) {
    var
        _candidates = _processedCandidates,
        _main = _candidates[0];

    _candidates = $.map(_candidates, function (_element, _index) {
        switch (true) {
            case (!(_index > 0)):
            case (!($.contains(_main.__node, _element.__node))):
                return null;

            default:
                return _element;
        }
    });

    _candidates.unshift(_main);
    _candidates.sort(function (a, b) {
        switch (true) {
            case (a.__index < b.__index):
                return -1;
            case (a.__index > b.__index):
                return 1;
            default:
                return 0;
        }
    });

    for (var i = 0, _i = _candidates.length; i < _i; i++) {
        _candidates[i].__second_length__above_plain_text = (_candidates[i]._length__above_plain_text - _main._length__above_plain_text);
        _candidates[i].__second_count__above_plain_words = (_candidates[i]._count__above_plain_words - _main._count__above_plain_words);

        _candidates[i]['__candidate_details_second'] = getContent__computeDetailsForCandidateSecond(_candidates[i], _main);

        _candidates[i].__points_history_second = getContent__computePointsForCandidateSecond(_candidates[i], _main);
        _candidates[i].__points_second = _candidates[i].__points_history_second[0];
    }


    _candidates.sort(function (a, b) {
        switch (true) {
            case (a.__points_second > b.__points_second):
                return -1;
            case (a.__points_second < b.__points_second):
                return 1;
            default:
                return 0;
        }
    });

    return _candidates;
};

var getContent__computeDetailsForCandidateSecond = function (_e, _main) {
    var _r = {};
    if (_e._is__bad) {
        return _r;
    }
    _r['_ratio__length__plain_text_to_total_plain_text'] = (_e._length__plain_text / _main._length__plain_text);
    _r['_ratio__count__plain_words_to_total_plain_words'] = (_e._count__plain_words / _main._count__plain_words);
    _r['_ratio__length__links_text_to_all_text'] = (_e._length__links_text / _e._length__all_text);
    _r['_ratio__count__links_words_to_all_words'] = (_e._count__links_words / _e._count__all_words);
    _r['_ratio__length__links_text_to_total_links_text'] = (_e._length__links_text / (_main._length__links_text + 1));
    _r['_ratio__count__links_words_to_total_links_words'] = (_e._count__links_words / (_main._count__links_words + 1));
    _r['_ratio__count__links_to_total_links'] = (_e._count__links / (_main._count__links + 1));
    _r['_ratio__count__links_to_plain_words'] = ((_e._count__links * 2) / _e._count__plain_words);
    var
        _divide__candidates = Math.max(2, Math.ceil((_e._count__above_candidates - _main._count__above_candidates) * 0.5)),
        _above_text = ((0 + (_e.__second_length__above_plain_text) + (_e.__second_length__above_plain_text / _divide__candidates) ) / 2),

        _above_words = ((0 + (_e.__second_count__above_plain_words) + (_e.__second_count__above_plain_words / _divide__candidates) ) / 2);

    _r['_ratio__length__above_plain_text_to_total_plain_text'] = (_above_text / _main._length__plain_text);
    _r['_ratio__count__above_plain_words_to_total_plain_words'] = (_above_words / _main._count__plain_words);

    _r['_ratio__length__above_plain_text_to_plain_text'] = (_above_text / _e._length__plain_text);
    _r['_ratio__count__above_plain_words_to_plain_words'] = (_above_words / _e._count__plain_words);

    _r['_ratio__count__candidates_to_total_candidates'] = (Math.max(0, (_e._count__candidates - (_main._count__candidates * 0.25))) / (_main._count__candidates + 1));
    _r['_ratio__count__containers_to_total_containers'] = (Math.max(0, (_e._count__containers - (_main._count__containers * 0.25))) / (_main._count__containers + 1));
    _r['_ratio__count__pieces_to_total_pieces'] = (Math.max(0, (_e._count__pieces - (_main._count__pieces * 0.25))) / (_main._count__pieces + 1));
    return _r;
};

var getContent__computePointsForCandidateThird = function (_e, _main) {
    var
        _details = _e.__candidate_details,
        _details_second = _e.__candidate_details_second,
        _points_history = [];

    if (_e._is__bad) {
        return [0];
    }

    _points_history.unshift(_e.__points_history[(_e.__points_history.length - 1)]);

    var
        _divide__pieces = Math.max(2, Math.ceil(_e._count__pieces * 0.25)),
        _divide__candidates = Math.max(2, Math.ceil(_e._count__candidates * 0.25)),
        _divide__containers = Math.max(4, Math.ceil(_e._count__containers * 0.25));

    _points_history.unshift(((0
        + (_points_history[0] * 3)
        + ((_points_history[0] / _divide__pieces) * 2)
        + ((_points_history[0] / _divide__candidates) * 2)
        + ((_points_history[0] / _divide__containers) * 2)
        ) / 9));


    getContent__computePointsForCandidate__do(0.75, 1, (1 - (1 - _details_second._ratio__length__plain_text_to_total_plain_text)), _points_history);
    getContent__computePointsForCandidate__do(0.75, 1, (1 - (1 - _details_second._ratio__count__plain_words_to_total_plain_words)), _points_history);

    getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__length__above_plain_text_to_total_plain_text), _points_history);
    getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__above_plain_words_to_total_plain_words), _points_history);

    getContent__computePointsForCandidate__do(0.10, 1, (1 - _details_second._ratio__length__above_plain_text_to_total_plain_text), _points_history);
    getContent__computePointsForCandidate__do(0.10, 1, (1 - _details_second._ratio__count__above_plain_words_to_total_plain_words), _points_history);

    getContent__computePointsForCandidate__do(0.10, 1, (1 - _details_second._ratio__length__above_plain_text_to_plain_text), _points_history);
    getContent__computePointsForCandidate__do(0.10, 1, (1 - _details_second._ratio__count__above_plain_words_to_plain_words), _points_history);

    getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__length__links_text_to_all_text), _points_history);
    getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__links_words_to_all_words), _points_history);

    getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__length__links_text_to_plain_text), _points_history);
    getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__links_words_to_plain_words), _points_history);

    getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__links_to_plain_words), _points_history);

    getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__candidates_to_total_candidates), _points_history);
    getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__containers_to_total_containers), _points_history);
    getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__pieces_to_total_pieces), _points_history);

    return _points_history;
};

var getContent__computePointsForCandidate__do = function (_ratio_remaining, _power, _ratio, _points_history) {
    var
        _points_remaining = (_points_history[0] * _ratio_remaining),
        _points_to_compute = (_points_history[0] - _points_remaining);

    if (_ratio < 0) {
        var _points_return = _points_remaining;
    }
    else {
        _points_return = 0 + _points_remaining + (_points_to_compute * Math.pow(_ratio, _power));
    }

    _points_history.unshift(_points_return);
};

var getContent__buildHTMLForNode = function (_nodeToBuildHTMLFor, _custom_mode) {
    var
        _global__element_index = 0,
        _global__the_html = '',
        _global__exploreNodeToBuildHTMLFor = getContent__exploreNodeAndGetStuff(_nodeToBuildHTMLFor, true);

    switch (_custom_mode) {
        case 'above-the-target':
            _global__exploreNodeToBuildHTMLFor = false;
            break;
    }

    var _recursive = function (_node) {
        _global__element_index++;
        var
            _explored = false,
            _tag_name = getTagName(_node),
            _pos__start__before = 0,
            _pos__start__after = 0,
            _pos__end__before = 0,
            _pos__end__after = 0;

        switch (true) {
            case ((_tag_name == '#invalid')):
            case ((parsingOptions._elements_ignore.indexOf('|' + _tag_name + '|') > -1)):
                return;
            case (_tag_name == '#text'):
                _global__the_html += _node.nodeValue
                    .replace(/</gi, '&lt;')
                    .replace(/>/gi, '&gt;');
                return;
        }

        if (parsingOptions._elements_visible.indexOf('|' + _tag_name + '|') > -1) {
            switch (true) {
                case (_node.offsetWidth > 0):
                case (_node.offsetHeight > 0):
                    break;
                default:
                    switch (true) {
                        case (_node.offsetLeft > 0):
                        case (_node.offsetTop > 0):
                            break;
                        default:
                            return;
                    }
                    break;
            }
        }

        // object embed iframe
        switch (_tag_name) {
            case ('object'):
            case ('embed'):
            case ('iframe'):
                var
                    _src = (_tag_name == 'object' ? $(_node).find("param[name='movie']").attr('value') : $(_node).attr('src')),
                    _skip = ((_src <= ''));
                if (_skip); else {
                    _skip = true;
                    for (i = 0, _i = keepStuffFromDomain__video.length; i < _i; i++) {
                        if (_src.indexOf(keepStuffFromDomain__video[i]) > -1) {
                            _skip = false;
                            break;
                        }
                    }
                }
                if (_skip) return;
                break;
        }

        if (_tag_name == 'a') {
            _explored = (_explored || getContent__exploreNodeAndGetStuff(_node, true));
            switch (true) {
                case (_explored._is__link_skip):
                case (((_explored._count__images_small + _explored._count__images_skip) > 0) && (_explored._length__plain_text < 65)):
                    return;
            }
        }
        //'|div|--|table|ul|ol|--|section|aside|header|'
        if (parsingOptions._elements_link_density.indexOf('|' + _tag_name + '|') > -1) {
            _explored = (_explored || getContent__exploreNodeAndGetStuff(_node, true));
            switch (true) {
                case (_explored._length__plain_text > (65 * 3 * 2)):
                case (language == 'cjk' && (_explored._length__plain_text > (65 * 3))):
                case (!(_explored._count__links > 1)):
                case (_global__exploreNodeToBuildHTMLFor && (_explored._length__plain_text / _global__exploreNodeToBuildHTMLFor._length__plain_text) > 0.5):
                case (_global__exploreNodeToBuildHTMLFor && (_explored._count__plain_words / _global__exploreNodeToBuildHTMLFor._count__plain_words) > 0.5):
                case ((_explored._length__plain_text == 0) && (_explored._count__links == 1) && (_explored._length__links_text < 65)):
                case ((_explored._length__plain_text < 25) && ((_explored._count__images_large + _explored._count__images_medium) > 0)):
                    break;
                case ((_explored._length__links_text / _explored._length__all_text) < 0.5):
                    if (_explored._count__links > 0); else {
                        break;
                    }
                    if (_explored._count__links_skip > 0); else {
                        break;
                    }
                    if (((_explored._count__links_skip / _explored._count__links) > 0.25) && (_explored._length__links_text / _explored._length__all_text) < 0.05) {
                        break;
                    }

                default:
                    return;
            }
        }

        if (parsingOptions._elements_floating.indexOf('|' + _tag_name + '|') > -1) {
            _explored = (_explored || getContent__exploreNodeAndGetStuff(_node, true));
            switch (true) {
                case (_explored._length__plain_text > (65 * 3 * 2)):
                case (language == 'cjk' && (_explored._length__plain_text > (65 * 3))):
                case (_global__exploreNodeToBuildHTMLFor && (_explored._length__plain_text / _global__exploreNodeToBuildHTMLFor._length__plain_text) > 0.25):
                case (_global__exploreNodeToBuildHTMLFor && (_explored._count__plain_words / _global__exploreNodeToBuildHTMLFor._count__plain_words) > 0.25):
                case ((_explored._length__plain_text < 25) && (_explored._length__links_text < 25) && ((_explored._count__images_large + _explored._count__images_medium) > 0)):
                    break;

                default:
                    var _float = $(_node).css('float');
                    if (_float == 'left' || _float == 'right'); else {
                        break;
                    }
                    if ((_explored._length__links_text == 0) && ((_explored._count__images_large + _explored._count__images_medium) > 0)) {
                        break;
                    }

                    return;
            }
        }

        if (_custom_mode == 'above-the-target') {
            if (parsingOptions._elements_above_target.indexOf('|' + _tag_name + '|') > -1) {
                return;
            }

            if (_tag_name == 'img') {
                _explored = (_explored || getContent__exploreNodeAndGetStuff(_node, true));
                if (_explored._is__image_large); else {
                    return;
                }
            }
        }

        if (parsingOptions._elements_ignore_tag.indexOf('|' + _tag_name + '|') > -1); else {
            _pos__start__before = _global__the_html.length;
            _global__the_html += '<' + _tag_name;
            if (_tag_name in parsingOptions._elements_keep_attributes) {
                for (i = 0, _i = parsingOptions._elements_keep_attributes[_tag_name].length; i < _i; i++) {
                    var
                        _attribute_name = parsingOptions._elements_keep_attributes[_tag_name][i],
                        _attribute_value = _node.getAttribute(_attribute_name);

                    if (_attribute_value > '') {
                        _global__the_html += ' ' + _attribute_name + '="' + (_attribute_value) + '"';
                    }
                }
            }

            var _id_attribute = _node.getAttribute('id');
            if (_id_attribute > '') {
                _global__the_html += ' id="' + _id_attribute + '"';
            }

            if (_tag_name == 'a') {
                _global__the_html += ' target="_blank"';
            }

            if (parsingOptions._elements_self_closing.indexOf('|' + _tag_name + '|') > -1) {
                _global__the_html += ' />';
            }
            else {
                _global__the_html += '>';
            }

            _pos__start__after = _global__the_html.length;
        }

        if (parsingOptions._elements_self_closing.indexOf('|' + _tag_name + '|') > -1); else {
            for (var i = 0, _i = _node.childNodes.length; i < _i; i++) {
                _recursive(_node.childNodes[i]);
            }
        }

        switch (true) {
            case ((parsingOptions._elements_ignore_tag.indexOf('|' + _tag_name + '|') > -1)):
                return;

            case ((parsingOptions._elements_self_closing.indexOf('|' + _tag_name + '|') > -1)):
                _pos__end__before = _global__the_html.length;
                _pos__end__after = _global__the_html.length;
                break;

            default:
                _pos__end__before = _global__the_html.length;
                _global__the_html += '</' + _tag_name + '>';
                _pos__end__after = _global__the_html.length;
                break;
        }

        if (_tag_name == 'iframe' || _tag_name == 'embed' || _tag_name == 'object') {
            _global__the_html = ''
                + _global__the_html.substr(0, _pos__start__before)
                + '<div class="readableLargeObjectContainer">'
                + _global__the_html.substr(_pos__start__before, (_pos__end__after - _pos__start__before))
                + '</div>'
            ;
            return;
        }

        if (_tag_name == 'img') {
            _explored = (_explored || getContent__exploreNodeAndGetStuff(_node, true));
            switch (true) {
                case (_explored._is__image_skip):
                    _global__the_html = _global__the_html.substr(0, _pos__start__before);
                    console.log(_node);
                    console.log(_explored);
                    return;

                case (_explored._is__image_large):
                    _global__the_html = ''
                        + _global__the_html.substr(0, _pos__start__before)
                        + '<div class="readableLargeImageContainer'
                        + (($(_node).width() <= 250) && ($(_node).height() >= 250) ? ' float' : '')
                        + '">'
                        + _global__the_html.substr(_pos__start__before, (_pos__end__after - _pos__start__before))
                        + '</div>'
                    ;
                    return;
            }
        }

        if (_tag_name == 'a') {
            _explored = (_explored || getContent__exploreNodeAndGetStuff(_node, true));
            switch (true) {
                case (_explored._count__images_large == 1):
                    _global__the_html = ''
                        + _global__the_html.substr(0, _pos__start__after - 1)
                        + ' class="readableLinkWithLargeImage">'
                        + _global__the_html.substr(_pos__start__after, (_pos__end__before - _pos__start__after))
                        + '</a>'
                    ;
                    return;

                case (_explored._count__images_medium == 1):
                    _global__the_html = ''
                        + _global__the_html.substr(0, _pos__start__after - 1)
                        + ' class="readableLinkWithMediumImage">'
                        + _global__the_html.substr(_pos__start__after, (_pos__end__before - _pos__start__after))
                        + '</a>'
                    ;
                    return;
            }
        }

        if (parsingOptions._elements_too_much_content.indexOf('|' + _tag_name + '|') > -1) {
            _explored = (_explored || getContent__exploreNodeAndGetStuff(_node, true));
            switch (true) {
                case (_tag_name == 'h1' && (_explored._length__all_text > (65 * 2))):
                case (_tag_name == 'h2' && (_explored._length__all_text > (65 * 2 * 3))):
                case ((_tag_name.match(/^h(3|4|5|6)$/) != null) && (_explored._length__all_text > (65 * 2 * 5))):
                case ((_tag_name.match(/^(b|i|em|strong)$/) != null) && (_explored._length__all_text > (65 * 5 * 5))):
                    _global__the_html = '' + _global__the_html.substr(0, _pos__start__before)
                        + _global__the_html.substr(_pos__start__after, (_pos__end__before - _pos__start__after));
                    return;
            }
        }

        switch (true) {
            case ((parsingOptions._elements_self_closing.indexOf('|' + _tag_name + '|') > -1)):
            case ((parsingOptions._elements_ignore_tag.indexOf('|' + _tag_name + '|') > -1)):
            case (_tag_name == 'td'):
                break;

            default:
                var _contents = _global__the_html.substr(_pos__start__after, (_pos__end__before - _pos__start__after));
                _contents = _contents.replace(/(<br \/>)/gi, '');
                _contents = _contents.replace(/(<hr \/>)/gi, '');
                var _contentsLength = measureText__getTextLength(_contents);

                switch (true) {
                    case (_contentsLength == 0 && _tag_name == 'p'):
                        _global__the_html = _global__the_html.substr(0, _pos__start__before) + '<br /><br />';
                        return;

                    case (_contentsLength == 0):
                    case ((_contentsLength < 5) && (parsingOptions._elements_visible.indexOf('|' + _tag_name + '|') > -1)):
                        _global__the_html = _global__the_html.substr(0, _pos__start__before);
                        return;
                }
                break;
        }

        if (parsingOptions._elements_link_density.indexOf('|' + _tag_name + '|') > -1) {
            _explored = (_explored || getContent__exploreNodeAndGetStuff(_node, true));
            var
                _contents = _global__the_html
                    .substr(_pos__start__after, (_pos__end__before - _pos__start__after))
                    .replace(/(<([^>]+)>)/gi, ''),
                _contentsLength = measureText__getTextLength(_contents),
                _initialLength = 0
                    + _explored._length__all_text
                    + (_explored._count__images_small * 10)
                    + (_explored._count__images_skip * 10)
                    + (_node.getElementsByTagName('iframe').length * 10)
                    + (_node.getElementsByTagName('object').length * 10)
                    + (_node.getElementsByTagName('embed').length * 10)
                    + (_node.getElementsByTagName('button').length * 10)
                    + (_node.getElementsByTagName('input').length * 10)
                    + (_node.getElementsByTagName('select').length * 10)
                    + (_node.getElementsByTagName('textarea').length * 10);

            switch (true) {
                case (!(_contentsLength > 0)):
                case (!(_initialLength > 0)):
                case (!((_contentsLength / _initialLength) < 0.5)):
                case (!((language == 'cjk') && (_contentsLength / _initialLength) < 0.1)):
                case ((_global__exploreNodeToBuildHTMLFor && ((_explored._length__plain_text / _global__exploreNodeToBuildHTMLFor._length__plain_text) > 0.25))):
                case ((language == 'cjk') && (_global__exploreNodeToBuildHTMLFor && ((_explored._length__plain_text / _global__exploreNodeToBuildHTMLFor._length__plain_text) > 0.1))):
                    break;
                default:
                    _global__the_html = _global__the_html.substr(0, _pos__start__before);
                    return;
            }
        }
    };

    _recursive(_nodeToBuildHTMLFor);

    return _global__the_html;
};

var measureText__getTextLength = function (_the_text) {
    var _text = _the_text;
    _text = _text.replace(/[\s\n\r]+/gi, '');
    return _text.length;
};
var measureText__getWordCount = function (_the_text) {
    var _text = _the_text;
    _text = _text.replace(/[\s\n\r]+/gi, ' ');
    _text = _text.replace(/([.,?!:;()\[\]'""-])/gi, ' $1 ');
    _text = _text.replace(/([\u3000])/gi, '[=words(1)]');
    _text = _text.replace(/([\u3001])/gi, '[=words(2)]');
    _text = _text.replace(/([\u3002])/gi, '[=words(4)]');
    _text = _text.replace(/([\u301C])/gi, '[=words(2)]');
    _text = _text.replace(/([\u2026|\u2025])/gi, '[=words(2)]');
    _text = _text.replace(/([\u30FB\uFF65])/gi, '[=words(1)]');
    _text = _text.replace(/([\u300C\u300D])/gi, '[=words(1)]');
    _text = _text.replace(/([\u300E\u300F])/gi, '[=words(1)]');
    _text = _text.replace(/([\u3014\u3015])/gi, '[=words(1)]');
    _text = _text.replace(/([\u3008\u3009])/gi, '[=words(1)]');
    _text = _text.replace(/([\u300A\u300B])/gi, '[=words(1)]');
    _text = _text.replace(/([\u3010\u3011])/gi, '[=words(1)]');
    _text = _text.replace(/([\u3016\u3017])/gi, '[=words(1)]');
    _text = _text.replace(/([\u3018\u3019])/gi, '[=words(1)]');
    _text = _text.replace(/([\u301A\u301B])/gi, '[=words(1)]');
    _text = _text.replace(/([\u301D\u301E\u301F])/gi, '[=words(1)]');
    _text = _text.replace(/([\u30A0])/gi, '[=words(1)]');
    var
        _count = 0,
        _words_match = _text.match(/([^\s\d]{3,})/gi);
    _count += (_words_match != null ? _words_match.length : 0);
    _text.replace(/\[=words\((\d)\)\]/, function (_match, _plus) {
        _count += (5 * parseInt(_plus));
    });
    return _count;
};

var keepStuffFromDomain__video =
    [
        'youtube.com',
        'youtube-nocookie.com',
        'vimeo.com',
        'hulu.com',
        'yahoo.com',
        'flickr.com',
        'newsnetz.ch'
    ];

var skipStuffFromDomain__images =
    [
        'googlesyndication.com',
        'fastclick.net',
        '.2mdn.net',
        'de17a.com',
        'content.aimatch.com',
        'bannersxchange.com',
        'buysellads.com',
        'impact-ad.jp',
        'atdmt.com',
        'advertising.com',
        'itmedia.jp',
        'microad.jp',
        'serving-sys.com',
        'adplan-ds.com'
    ];

var skipStuffFromDomains__links =
    [
        'doubleclick.net',
        'fastclick.net',
        'adbrite.com',
        'adbureau.net',
        'admob.com',
        'bannersxchange.com',
        'buysellads.com',
        'impact-ad.jp',
        'atdmt.com',
        'advertising.com',
        'itmedia.jp',
        'microad.jp',
        'serving-sys.com',
        'adplan-ds.com'
    ];

var getContent__computePointsForCandidate = function (_e, _main) {
    var
        _details = _e.__candidate_details,
        _points_history = [],
        _really_big = ((_main._length__plain_text / 65) > 250);

    if (_e._is__bad) {
        return [0];
    }

    _points_history.unshift(((0
        + (_details._count__paragraphs_of_3_lines)
        + (_details._count__paragraphs_of_5_lines * 1.5)
        + (_details._count__paragraphs_of_50_words)
        + (_details._count__paragraphs_of_80_words * 1.5)
        + (_e._count__images_large * 3)
        - ((_e._count__images_skip + _e._count__images_small) * 0.5)
        ) * 1000));

    if (_points_history[0] < 0) {
        return [0];
    }
    var
        _divide__pieces = Math.max(5, Math.ceil(_e._count__pieces * 0.25)),
        _divide__candidates = Math.max(5, Math.ceil(_e._count__candidates * 0.25)),
        _divide__containers = Math.max(10, Math.ceil(_e._count__containers * 0.25));
    _points_history.unshift(((0 + (_points_history[0] * 3) + (_points_history[0] / _divide__pieces) + (_points_history[0] / _divide__candidates)
        + (_points_history[0] / _divide__containers) ) / 6));

    getContent__computePointsForCandidate__do(0.10, 2, (1 - (1 - _details._ratio__length__plain_text_to_total_plain_text)), _points_history);
    getContent__computePointsForCandidate__do(0.10, 2, (1 - (1 - _details._ratio__count__plain_words_to_total_plain_words)), _points_history);

    if (_really_big) {
        getContent__computePointsForCandidate__do(0.10, 4, (1 - (1 - _details._ratio__length__plain_text_to_total_plain_text)), _points_history);
        getContent__computePointsForCandidate__do(0.10, 4, (1 - (1 - _details._ratio__count__plain_words_to_total_plain_words)), _points_history);
    }

    getContent__computePointsForCandidate__do(0.10, 5, (1 - _details._ratio__length__above_plain_text_to_total_plain_text), _points_history);
    getContent__computePointsForCandidate__do(0.10, 5, (1 - _details._ratio__count__above_plain_words_to_total_plain_words), _points_history);

    if (_really_big) {
        getContent__computePointsForCandidate__do(0.10, 10, (1 - _details._ratio__length__above_plain_text_to_total_plain_text), _points_history);
        getContent__computePointsForCandidate__do(0.10, 10, (1 - _details._ratio__count__above_plain_words_to_total_plain_words), _points_history);
    }
    getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__length__links_text_to_total_links_text), _points_history);
    getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__links_words_to_total_links_words), _points_history);
    getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__links_to_total_links), _points_history);
    var __lr = (language == 'cjk' ? 0.75 : 0.50);

    getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__length__links_text_to_plain_text), _points_history);
    getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__count__links_words_to_plain_words), _points_history);
    getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__length__links_text_to_all_text), _points_history);
    getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__count__links_words_to_all_words), _points_history);
    getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__count__links_to_plain_words), _points_history);
    getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__candidates_to_total_candidates), _points_history);
    getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__containers_to_total_containers), _points_history);
    getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__pieces_to_total_pieces), _points_history);
    return _points_history;
};




