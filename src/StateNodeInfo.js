APP.StateNodeInfo = function( model, categoryIndex, nodeIndex ) {

    function exit() {

        model.setState( new APP.StateDefault( model, model.filterCategoryIndex ) );

    }


    this.enter = function() {

        // var categoryName = APP.data[ categoryIndex ].name,
        //     nodeName = APP.data[ categoryIndex ].videos[ nodeIndex ].title;
        // console.log("--- STATE NODE INFO (" + categoryName + '/' + nodeName + ")");

        var nodeData = APP.data[ categoryIndex ].videos[ nodeIndex ],
            clusterColor = new THREE.Color( APP.data[ categoryIndex ].color );

        clusterColor = '#' + clusterColor.offsetHSL(0,-0.1,0).getHexString();

        // stop cluster mouse interaction
        for ( var i = 0; i < model.clusters.length; i++ ) {
            model.clusters[ i ].setMouseAttractionEnabled( false );
        }

        // disable css mouse hover on nodes
        model.$layerNodes.removeClass( 'enabled' );

        // hide bottomBar
        model.$bottomBar.removeClass( 'enabled' );

        // build info box
        model.$boxInfo
            .find( '.title' ).text( nodeData.title ).end()
            //.find('.subtitle').text( nodeData.subtitle ).end()
            //.find('.description').text( nodeData.description ).end()
            // TODO...

        // show info box
        model.$boxInfo
            .css({
                'background-color': clusterColor,
                'border-color': clusterColor
            })
            .addClass( 'visible' );

        // attach events to close button
        model.$boxInfo.find( '.button-close' )
            .css( 'background-color', clusterColor )
            .on( 'click', exit );

        // attach events to play button
        // TODO...


    }


    this.update = function() {

        model.physics.update();

        for ( var i = 0; i < model.clusters.length; i++ ) {
            model.clusters[ i ].update();
        }

    }


    this.exit = function() {

        model.$layerNodes.off();

        model.$boxInfo.removeClass( 'visible' );

    }

}
