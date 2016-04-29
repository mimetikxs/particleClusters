APP.StateVideo = function( model, categoryIndex, nodeIndex ) {

    function onResize( e ) {

        var container = $('#video-container'),
            iframe = container.find('iframe'),
            w = container.innerWidth() - (75*2), // accounting for padding
            h = container.innerHeight() - (25*2),
            windowRatio = h / w,
            videoRatio = 9 / 16;

        w = (w > 1200) ? 1200 : w;
        h = (h > 900) ? 900 : h;

        if (windowRatio > videoRatio) {
            h = w * videoRatio;
        } else {
            w = h / videoRatio
        }

        // reposition iframe
        container.css( 'text-align', 'center' );
        iframe.css({
            'width'  : w,
            'height' : h,
            'margin-top' : -h / 2
        });

        // reposition button
        var offset = iframe.offset();
        $('.video-close-button').css({
            'right' : offset.left + 10,
            'top'  : offset.top + 10
        })

    }


    function close() {

        model.setState( new APP.StateNodeInfo( model, categoryIndex, nodeIndex ) );

    }


    this.enter = function() {

        var videoData = APP.data[ categoryIndex ].videos[ nodeIndex ],
            videoId = 64378655; // TODO: use -> videoId = videoData.url;

        $('#logo, #logo-educar, #right-bar').fadeOut();

        $('body').append(
            '<div id="video-container">' +
                '<iframe src="//player.vimeo.com/video/' + videoId +
                '?autoplay=1&badge=0&byline=0&color=aaaaaa&portrait=0&title=0" width="320px" height="180px" frameborder="0"></iframe>' +
                '<div class="video-close-button">×</div>' +
            '</div>'
        );

        $('.video-close-button').on( 'click', close );

        $(window).on( 'resize', onResize ).resize();

    };


    this.update = function(){

    };


    this.exit = function(){

        $('.video-close-button').off();

        $('#video-container').remove();

        $('#right-bar, #logo, #logo-educar').fadeIn();

        $(window).off( 'resize', onResize )

    };

}
