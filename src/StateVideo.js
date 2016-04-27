APP.StateVideo = function( model, categoryIndex, nodeIndex ) {

    function close() {

        model.setState( new APP.StateNodeInfo( model, categoryIndex, nodeIndex ) );

    }


    this.enter = function() {

        var videoData = APP.data[ categoryIndex ].videos[ nodeIndex ],
            videoId = videoData.url;

        // TODO: fade in video
        $( '<div class="video-close-button">×</div>' +
           '<iframe src="//player.vimeo.com/video/' + videoId +
           '?autoplay=1&badge=0&byline=0&color=aaaaaa&portrait=0&title=0" width="100%" height="100%" frameborder="0"></iframe>'
        ).appendTo('#video-container');

        $('#right-bar').fadeOut();

        $('.video-close-button').on( 'click', close );

    };


    this.update = function(){

    };


    this.exit = function(){
        // TODO: stop video player

        $('.video-close-button').off();

        $('#video-container').children().remove();

        $('#right-bar').fadeIn();
    };

}
