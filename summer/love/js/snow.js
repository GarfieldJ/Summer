(function ($) {
    $.fn.snow = function (options) {
        var $flake = $('<div id="snowbox" />').css({'position': 'fixed', 'top': '-50px'}).html('&#10052;'),
            documentHeight = $(document).height(),
            documentWidth = $(document).width(),
            defaults = {
                minSize: 10,		//雪花的最小尺寸
                maxSize: 40,		//雪花的最大尺寸
                newOn: 1000,		//雪花出现的频率
                flakeColor: "#FFFFFF",
                durationMillis: null  // 一定时间后停止产生
            },
            options = $.extend({}, defaults, options);

        var interval = setInterval(function () {
            var startPositionLeft = Math.random() * documentWidth,
                startOpacity = 0.5 + Math.random(),
                sizeFlake = options.minSize + Math.random() * options.maxSize,
                endPositionTop = documentHeight - 50,
                endPositionLeft = startPositionLeft + Math.random() * 500,
                durationFall = documentHeight * 10 + Math.random() * 5000;
            $flake.clone().appendTo('body').css({
                left: startPositionLeft,
                opacity: startOpacity,
                'font-size': sizeFlake,
                color: options.flakeColor,
                durationMillis: options.durationMillis
            }).animate({
                    top: endPositionTop,
                    left: endPositionLeft,
                    opacity: 0.2
                }, durationFall, 'linear', function () {
                    $(this).remove()
                }
            );

        }, options.newOn);

        // 停止雪花
        if (options.durationMillis) {
            setTimeout(function() {
                clearInterval(interval);
            }, options.durationMillis);
        }
    };

})(jQuery);