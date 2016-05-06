APP.StateVideo = function( model, categoryIndex, nodeIndex ) {

    var player;

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

        // reposition dummi
        container.find('.dummi').css({
            'width'  : w,
            'height' : h,
            'top'   : '50%',
            'left'  : '50%',
            'margin-top'  : -h / 2,
            'margin-left' : -w / 2
        });

        // reposition button
        var offset = iframe.offset();
        $('.video-close-button').css({
            'right' : offset.left + 10,
            'top'  : offset.top + 10
        });

    }


    function close() {

        model.setState( new APP.StateNodeInfo( model, categoryIndex, nodeIndex ) );

    }


    this.enter = function() {

        var videoData = APP.data[ categoryIndex ].videos[ nodeIndex ],
            videoId = videoData.url; 

        $('body').append(
            '<div id="video-container">' +
                '<div class="dummi"></div>' +
                '<iframe src="//player.vimeo.com/video/' + videoId +
                '?autoplay=0&badge=0&byline=0&color=aaaaaa&portrait=0&title=0" width="320px" height="180px" frameborder="0"></iframe>' +
                '<div class="video-close-button">×</div>' +
            '</div>'
        );

        //$('#video-container').css('opacity', 1);
        $('#video-container').fadeOut(0).fadeIn(1000);
        $('#logo, #logo-educar, #right-bar').css('opacity', 0);

        // get the player
        player = $f( $('#video-container iframe')[0] );

        player.addEvent('ready', function() {
           player.addEvent('play', onPlay );
           player.api('play');
       });

       $('.video-close-button').on( 'click', close );

       $(window).on( 'resize', onResize ).resize();

   };


   function onPlay() {
       console.log("play event");

       $('#video-container iframe').css('opacity', 1);
   }


    this.update = function(){

    };


    this.exit = function(){

        $('.video-close-button').off();

        player.removeEvent('ready');
        player.removeEvent('play');
        player.api('pause');

        $('#video-container').remove();
        $('#right-bar, #logo, #logo-educar').css('opacity', 1);

        $(window).off( 'resize', onResize );
    };

}
