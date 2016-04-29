APP.StateDefault = function( model, categoryIndex ) {


    var mouseBloomingEnabled;


    function filterCategory( index ) {

        if ( index !== -1 ) {

            // console.log("filter ON (" + index + ")" );

            for ( var i = 0; i < model.clusters.length; i++ ) {
                model.clusters[ i ].setState( ( i === index ) ? APP.clusterParameters.opened : APP.clusterParameters.closed );
            }
            model.physics.gravity.z = 2.21;
            model.lineOpacityThreshold = 176;
            mouseBloomingEnabled = false;

            // testing
            $('#btn-randomize')
                .addClass( 'disabled' );
            $('#btn-reset')
                .addClass( 'disabled' );

        } else {

            // console.log("filter OFF" );
            // console.log(model.randomRadius);

            var defaultParams = APP.clusterParameters.default,
                tagetState = {
                    'cluster_radius':                   (model.randomRadius === undefined) ?  defaultParams.cluster_radius : model.randomRadius,
                    'surface_strength':                 defaultParams.surface_strength,
                    'central_attraction':               defaultParams.central_attraction,
                    'mouse_attraction':                 defaultParams.mouse_attraction,
                    'spring_strength_interactive':      defaultParams.spring_strength_interactive,
                    'spring_length_interactive':        defaultParams.spring_length_interactive,
                    'attraction_strength_interactive':  (model.randomStrengthInteractive === undefined) ? defaultParams.attraction_strength_interactive : model.randomStrengthInteractive,
                    'interactive_enabled':              defaultParams.interactive_enabled,
                    'mouse_attraction_enabled':         defaultParams.mouse_attraction_enabled
                };

            for ( var i = 0; i < model.clusters.length; i++ ) {
                //model.clusters[ i ].setState( APP.clusterParameters.default );
                model.clusters[ i ].setState( tagetState );
            }
            model.physics.gravity.z = 0.45, //APP.parameters.gravity;
            model.lineOpacityThreshold = 280;
            mouseBloomingEnabled = true;

            // testing
            $('#btn-randomize')
                .removeClass( 'disabled' );
            $('#btn-reset')
                .removeClass( 'disabled' );

        }

        model.filterCategoryIndex = index;

    }


    function goToNode( categoryIndex, nodeIndex ) {

        model.setState( new APP.StateNodeInfo( model, categoryIndex, nodeIndex ) );

    }

    function showGeneralInfo() {

        model.setState( new APP.StateGeneralInfo( model ) );

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


    function onRandomizeClick( e ) {

        if ( $(this).hasClass('disabled') ) {
            return;
        }

        // calculate random values
        var defaultParams = APP.clusterParameters.default,
            currentRadius = (model.randomRadius === undefined) ?  defaultParams.cluster_radius : model.randomRadius,
            currentStrength = (model.randomStrengthInteractive === undefined) ? defaultParams.attraction_strength_interactive : model.randomStrengthInteractive,
            newRandomRadius,
            newRandomStrength,
            isValid;

        isValid = false;
        while ( !isValid ) {
            newRandomRadius = 82 + Math.random() * 168;
            isValid = Math.abs(currentRadius - newRandomRadius) > 80;
        }

        isValid = false;
        while ( !isValid ) {
            newRandomStrength = -1000 + Math.random() * 2000;
            isValid = Math.abs(currentStrength - newRandomStrength) > 300;
        }

        // apply values
        model.randomRadius = newRandomRadius;
        model.randomStrengthInteractive = newRandomStrength;

        console.log('RANDOMIZE:' + '\n' +
                    'random radius = ' + model.randomRadius + '\n' +
                    'random strength = ' + model.randomStrengthInteractive + '\n' +
                    '---------');

        filterCategory( model.filterCategoryIndex ); // keep the current category filter

    }


    function onResetClick( e ) {

        if ( $(this).hasClass('disabled') ) {
            return;
        }

        model.randomRadius = APP.clusterParameters.default.cluster_radius;
        model.randomStrengthInteractive = APP.clusterParameters.default.attraction_strength_interactive;

        console.log('RESET' + '\n' +
                    '---------');

        filterCategory( model.filterCategoryIndex ); // keep the current category filter

    }


    function enableMouseEvents() {

        model.$bottomBar
            .on( 'click', '.button', onButtonClick )
            .on( 'mouseenter', '.button', onButtonMouseEnter )
            .on( 'mouseleave', '.button', onButtonMouseLeave );

        model.$layerNodes
            .on( 'click', '.node', onNodeClick );

        // testing
        $('#btn-randomize')
            .on( 'click', onRandomizeClick )
            .removeClass( 'disabled' );
        $('#btn-reset')
            .on( 'click', onResetClick )
            .removeClass( 'disabled' );

        // attach event to general info btn
        $('#btn-info').on( 'click', showGeneralInfo );

    }


    function disableMouseEvents() {

        model.$bottomBar
            .off( 'click', '.button', onButtonClick )
            .off( 'mouseenter', '.button', onButtonMouseEnter )
            .off( 'mouseleave', '.button', onButtonMouseLeave );

        model.$layerNodes
            .off( 'click', '.node', onNodeClick );

        // testing
        $('#btn-randomize')
            .off( 'click', onRandomizeClick )
            .addClass( 'disabled' );
        $('#btn-reset')
            .off( 'click', onResetClick )
            .addClass( 'disabled' );

        $('#btn-info').off();

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

        //onResetClick();

    }
}
