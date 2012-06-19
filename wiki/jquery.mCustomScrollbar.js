(function ($) {
    $.fn.mCustomScrollbar = function (scrollType, animSpeed, easeType, bottomSpace, draggerDimType, mouseWheelSupport, scrollBtnsSupport, scrollBtnsSpeed) {
        var id = $(this).attr("id");
        var $customScrollBox = $("#" + id + " .customScrollBox");
        var $customScrollBox_container = $("#" + id + " .customScrollBox .container");
        var $customScrollBox_content = $("#" + id + " .customScrollBox .content");
        var $dragger_container = $("#" + id + " .dragger_container");
        var $dragger = $("#" + id + " .dragger");
        var $scrollUpBtn = $("#" + id + " .scrollUpBtn");
        var $scrollDownBtn = $("#" + id + " .scrollDownBtn");
        var $customScrollBox_horWrapper = $("#" + id + " .customScrollBox .horWrapper");

        //get & store minimum dragger height & width (defined in css)
        if (!$customScrollBox.data("minDraggerHeight")) {
            $customScrollBox.data("minDraggerHeight", $dragger.height());
        }
        if (!$customScrollBox.data("minDraggerWidth")) {
            $customScrollBox.data("minDraggerWidth", $dragger.width());
        }

        //get & store original content height & width
        if (!$customScrollBox.data("contentHeight")) {
            $customScrollBox.data("contentHeight", $customScrollBox_container.height());
        }
        if (!$customScrollBox.data("contentWidth")) {
            $customScrollBox.data("contentWidth", $customScrollBox_container.width());
        }

        CustomScroller();

        function CustomScroller(reloadType) {
            var visibleHeight = $customScrollBox.height();
            if ($customScrollBox_container.height() > visibleHeight) {
                $dragger.css("display", "block");
                if (reloadType != "resize" && $customScrollBox_container.height() != $customScrollBox.data("contentHeight")) {
                    $dragger.css("top", 0);
                    $customScrollBox_container.css("top", 0);
                    $customScrollBox.data("contentHeight", $customScrollBox_container.height());
                }
                $dragger_container.css("display", "block");
                $scrollDownBtn.css("display", "inline-block");
                $scrollUpBtn.css("display", "inline-block");
                var totalContent = $customScrollBox_content.height();
                var minDraggerHeight = $customScrollBox.data("minDraggerHeight");
                var draggerContainerHeight = $dragger_container.height();

                function AdjustDraggerHeight() {
                    if (draggerDimType == "auto") {
                        var adjDraggerHeight = Math.round(draggerContainerHeight * ((visibleHeight) / totalContent));
                        if (adjDraggerHeight <= minDraggerHeight) {
                            $dragger.css("height", minDraggerHeight + "px");
                        } else if (adjDraggerHeight >= draggerContainerHeight) {
                            $dragger.css("height", draggerContainerHeight + "px");
                        } else {
                            $dragger.css("height", adjDraggerHeight + "px");
                        }
                    }
                }

                AdjustDraggerHeight();

                var draggerHeight = $dragger.height();
                $dragger.draggable({
                    axis:"y",
                    containment:"parent",
                    scroll:false,
                    start:function (event, ui) {
                        $dragger.css('background', 'lightcoral');
                        $dragger.hover(
                            function () {
                                $(this).css('background', 'lightcoral');
                            },
                            function () {
                                $(this).css('background', 'lightcoral');
                            }
                        );
                        $dragger.addClass('dragger_pressed');
                    },
                    drag:function (event, ui) {
                        Scroll();
                    },
                    stop:function (event, ui) {
                        $dragger.css('background', 'white');
                        $dragger.hover(
                            function () {
                                $(this).css('background', 'lightblue');
                            },
                            function () {
                                $(this).css('background', 'white');
                            }
                        );
                        $dragger.removeClass('dragger_pressed');
                    }
                });

                $dragger_container.click(function (e) {
                    var $this = $(this);
                    var mouseCoord = (e.pageY - $this.offset().top);
                    if (mouseCoord < $dragger.position().top || mouseCoord > ($dragger.position().top + $dragger.height())) {
                        var targetPos = mouseCoord + $dragger.height();
                        if (targetPos < $dragger_container.height()) {
                            $dragger.css("top", mouseCoord);
                            Scroll();
                        } else {
                            $dragger.css("top", $dragger_container.height() - $dragger.height());
                            Scroll();
                        }
                    }
                });

                $(function ($) {
                    if (mouseWheelSupport == "yes") {
                        $customScrollBox.unbind("mousewheel");
                        $customScrollBox.bind("mousewheel", function (event, delta) {
                            var vel = Math.abs(delta * 10);
                            $dragger.css("top", $dragger.position().top - (delta * vel));
                            Scroll();
                            if ($dragger.position().top < 0) {
                                $dragger.css("top", 0);
                                $customScrollBox_container.stop();
                                Scroll();
                            }
                            if ($dragger.position().top > $dragger_container.height() - $dragger.height()) {
                                $dragger.css("top", $dragger_container.height() - $dragger.height());
                                $customScrollBox_container.stop();
                                Scroll();
                            }
                            return false;
                        });
                    }
                });

                if (scrollBtnsSupport == "yes") {
                    $scrollDownBtn.mouseup(
                        function () {
                            BtnsScrollStop();
                        }).mousedown(
                        function () {
                            BtnsScroll("down");
                        }).mouseout(function () {
                            BtnsScrollStop();
                        });

                    $scrollUpBtn.mouseup(
                        function () {
                            BtnsScrollStop();
                        }).mousedown(
                        function () {
                            BtnsScroll("up");
                        }).mouseout(function () {
                            BtnsScrollStop();
                        });

                    $scrollDownBtn.click(function (e) {
                        e.preventDefault();
                    });
                    $scrollUpBtn.click(function (e) {
                        e.preventDefault();
                    });

                    btnsScrollTimer = 0;
                    function BtnsScroll(dir) {
                        if (dir == "down") {
                            var btnsScrollTo = $dragger_container.height() - $dragger.height();
                            var scrollSpeed = Math.abs($dragger.position().top - btnsScrollTo) * (100 / scrollBtnsSpeed);
                            $dragger.stop().animate({top:btnsScrollTo}, scrollSpeed, "linear");
                        } else {
                            var btnsScrollTo = 0;
                            var scrollSpeed = Math.abs($dragger.position().top - btnsScrollTo) * (100 / scrollBtnsSpeed);
                            $dragger.stop().animate({top:-btnsScrollTo}, scrollSpeed, "linear");
                        }
                        clearInterval(btnsScrollTimer);
                        btnsScrollTimer = setInterval(Scroll, 20);
                    }

                    function BtnsScrollStop() {
                        clearInterval(btnsScrollTimer);
                        $dragger.stop();
                    }
                }

                if (bottomSpace < 1) {
                    bottomSpace = 1;
                }
                var scrollAmount = (totalContent - (visibleHeight / bottomSpace)) / (draggerContainerHeight - draggerHeight);

                function Scroll() {
                    var draggerY = $dragger.position().top;
                    var targY = -draggerY * scrollAmount;
                    var thePos = $customScrollBox_container.position().top - targY;
                    $customScrollBox_container.stop().animate({top:"-=" + thePos}, animSpeed, easeType);
                }
            } else {
                $dragger.css("top", 0).css("display", "none");
                $customScrollBox_container.css("top", 0);
                $dragger_container.css("display", "none");
                $scrollDownBtn.css("display", "none");
                $scrollUpBtn.css("display", "none");
            }

        }
    };
})(jQuery);