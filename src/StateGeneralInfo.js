APP.StateGeneralInfo = function( model ) {

    function close() {

        model.setState( new APP.StateDefault( model, model.filterCategoryIndex ) );

    }


    this.enter = function() {

        // stop cluster mouse interaction
        for ( var i = 0; i < model.clusters.length; i++ ) {
            model.clusters[ i ].setMouseAttractionEnabled( false );
        }

        // disable css mouse hover on nodes
        model.$layerNodes.removeClass( 'enabled' );

        // hide bottom bar
        model.$bottomBar.removeClass( 'enabled' );

        $( '#box-general-info').addClass( 'visible' );

        $( '#box-general-info .button-close' ).on( 'click', close );

    };


    this.update = function(){

        model.physics.update();

        for ( var i = 0; i < model.clusters.length; i++ ) {
            model.clusters[ i ].update();
        }

    };


    this.exit = function(){

        $( '#box-general-info').removeClass( 'visible' );

        $( '#box-general-info .button-close' ).off();

    };

}
