APP.StateDefault = function( model, categoryIndex ) {


    // var model = model,
    //     mouseBloomingEnabled;
    var mouseBloomingEnabled;

    function goToCategory( index ) {

        if ( model.categoryIndex === index ) {
            return;
        }

        if ( index !== -1 ) {

            console.log("FILTER ON" );

            for ( var i = 0; i < model.clusters.length; i++ ) {
                model.clusters[ i ].setState( ( i === index ) ? APP.clusterParameters.opened : APP.clusterParameters.closed );
            }
            model.physics.gravity.z = 3.21;
            mouseBloomingEnabled = false;

        } else {

            console.log("FILTER OFF" );

            for ( var i = 0; i < model.clusters.length; i++ ) {
                model.clusters[ i ].setState( APP.clusterParameters.default );
            }
            model.physics.gravity.z = APP.parameters.gravity;
            mouseBloomingEnabled = true;

        }

        model.categoryIndex = index;

    }


    function onButtonClick( e ) {

        var $button = $( this );

        model.$bottomBar.find('.active')
            .removeClass( 'active' )
            .css( 'background-color', '' );

        $button
            .addClass( 'active' )
            .css( 'background-color', $button.data( 'color' ) );

        goToCategory( $button.data( 'categoryIndex' ) )

    }


    function onButtonMouseEnter( e ) {

        var $button = $( this );

        $button.css( 'background-color', $button.data( 'color' ) );

    }


    function onButtonMouseLeave( e ) {

        var $button = $( this );

        if ( !$button.hasClass( 'active' ) ){
            $button.css( 'background-color', '' );
        }

    }


    function updateMouseInteraction() {

        var mousePos = model.mouseParticle.pos;

        for ( var i = 0; i < model.clusters.length; i++ ) {
            var cluster = model.clusters[ i ],
                clusterCenter = cluster.centralParticle.pos,
                clusterRadius = cluster.clusterRadius;

            var delta = new THREE.Vector3();
            delta.subVectors( mousePos, clusterCenter );

            var distance = delta.length(),
                limitDistance = clusterRadius + (clusterRadius * 0.2), // 20% of margin
                enabled = ( distance < limitDistance ) ? true : false;

            cluster.setMouseAttractionEnabled( enabled );

            if ( mouseBloomingEnabled ) {

                distance = ( distance < limitDistance ) ? distance : limitDistance;

                cluster.setCentralAttraction( (distance / limitDistance) * 200 );

            }
        }

    }


    // interface ----------------------------------------------------------------------


    this.enter = function() {

        model.nodeIndex = -1;

        // attach events to bottom bar
        model.$bottomBar
            .on( 'click', '.button', onButtonClick )
            .on( 'mouseenter', '.button', onButtonMouseEnter )
            .on( 'mouseleave', '.button', onButtonMouseLeave );

        // apply filter
        goToCategory( categoryIndex )

    }


    this.update = function() {

        model.physics.update();

        for ( var i = 0; i < model.clusters.length; i++ ) {
            model.clusters[ i ].update();
        }

        updateMouseInteraction();

    }


    this.exit = function() {

        model.$bottomBar
            .off( 'click', '.button', onButtonClick )
            .off( 'mouseenter', '.button', onButtonMouseEnter )
            .off( 'mouseleave', '.button', onButtonMouseLeave );

    }
}
