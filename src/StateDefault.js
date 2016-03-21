APP.StateDefault = function( model, categoryIndex ) {


    var mouseBloomingEnabled;


    function filterCategory( index ) {

        if ( index !== -1 ) {

            console.log("filter ON (" + index + ")" );

            for ( var i = 0; i < model.clusters.length; i++ ) {
                model.clusters[ i ].setState( ( i === index ) ? APP.clusterParameters.opened : APP.clusterParameters.closed );
            }
            model.physics.gravity.z = 2.21;
            model.lineOpacityThreshold = 176;
            mouseBloomingEnabled = false;

        } else {

            console.log("filter OFF" );

            for ( var i = 0; i < model.clusters.length; i++ ) {
                model.clusters[ i ].setState( APP.clusterParameters.default );
            }
            model.physics.gravity.z = 0.45, //APP.parameters.gravity;
            model.lineOpacityThreshold = 280;
            mouseBloomingEnabled = true;

        }

        model.filterCategoryIndex = index;

    }


    function goToNode( categoryIndex, nodeIndex ) {

        model.setState( new APP.StateNodeInfo( model, categoryIndex, nodeIndex ) );

    }


    function onButtonClick( e ) {

        var $button = $( this );

        model.$bottomBar.find('.selected')
            .removeClass( 'selected' )
            .css( 'background-color', '' );

        $button
            .addClass( 'selected' )
            .css( 'background-color', $button.data( 'color' ) );

        filterCategory( $button.data( 'categoryIndex' ) );

    }


    function onButtonMouseEnter( e ) {

        var $button = $( this );

        $button.css( 'background-color', $button.data( 'color' ) );

    }


    function onButtonMouseLeave( e ) {

        var $button = $( this );

        if ( !$button.hasClass( 'selected' ) ){
            $button.css( 'background-color', '' );
        }

    }


    function onNodeClick( e ) {

        var $node = $( this );

        if ( !$node.hasClass( 'enabled' ) ) {
            return;
        }

        model.$layerNodes.find( '.selected' )
            .removeClass( 'selected' );

        $node.addClass( 'selected' );

        goToNode( $node.data( 'categoryIndex' ), $node.data( 'nodeIndex' ) );

    }


    function enableMouseEvents() {

        model.$bottomBar
            .on( 'click', '.button', onButtonClick )
            .on( 'mouseenter', '.button', onButtonMouseEnter )
            .on( 'mouseleave', '.button', onButtonMouseLeave );

        model.$layerNodes
            .on( 'click', '.node', onNodeClick );

    }


    function disableMouseEvents() {

        model.$bottomBar
            .off( 'click', '.button', onButtonClick )
            .off( 'mouseenter', '.button', onButtonMouseEnter )
            .off( 'mouseleave', '.button', onButtonMouseLeave );

        model.$layerNodes
            .off( 'click', '.node', onNodeClick );

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

                cluster.setCentralAttraction( (distance / limitDistance) * 100 );

            }
        }

    }


    // interface ----------------------------------------------------------------------


    this.enter = function() {

        // console.log("--- STATE DEFAULT");

        // nodes
        model.nodeIndex = -1;

        model.$layerNodes.addClass( 'enabled' );
        model.$layerNodes.find( '.node.selected' ).removeClass( 'selected' );

        // bottom bar
        model.$bottomBar.addClass( 'enabled' );

        var $button = model.$bottomBar.find( '#category-' + (categoryIndex+1) );
        $button
            .addClass( 'selected' )
            .css( 'background-color', $button.data( 'color' ) );

        enableMouseEvents();

        filterCategory( categoryIndex );

    }


    this.update = function() {

        model.physics.update();

        for ( var i = 0; i < model.clusters.length; i++ ) {
            model.clusters[ i ].update();
        }

        updateMouseInteraction();

    }


    this.exit = function() {

        disableMouseEvents();

    }
}
