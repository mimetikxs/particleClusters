APP.Cluster = function( mouseParticle, materialPoints, materialLines ) {

    // physics ------------

    this.centralParticle;
    this.mouseParticle = mouseParticle;
    this.particles = [];
    this.surfaceSprings = [];
    this.centerAttractions = [];
    this.mouseAttractions = [];
    this.sphereConstraint;
    this.walkers = [];
    // interactive
    this.interactiveParticles = [];
    this.interactiveSprings = [];       // springs between interactive particles
    this.interactiveSprings2 = [];      // springs from interactive to normal particles
    this.interactiveAttractions = [];

    this.clusterRadius = APP.parameters.cluster_radius;
    this.surfaceStrength = APP.parameters.surface_strength;
    this.centralAttraction = APP.parameters.centralAttraction;
    this.mouseAttraction = APP.parameters.mouse_attraction;
    // interactive
    this.springStrengthInteractive = APP.parameters.spring_strength_interactive;
    this.springLengthInteractive = APP.parameters.spring_length_interactive;
    this.attractionStrengthInteractive = APP.parameters.attraction_strength_interactive;

    // mouse interaction
    // TODO: move outside
    this.isMouseEnabled = false;
    this.limitDistance = this.clusterRadius + (this.clusterRadius * 0.2); // 20% of margin
    this.limitDistanceSq = this.limitDistanceSq * this.limitDistanceSq;

    // rendering ----------

    this.points;
    this.geometryPoints;
    this.materialPoints = materialPoints;
    this.lines;
    this.geometryLines;
    this.materialLines = materialLines;
    this.walkerPoints; // debug

}


APP.Cluster.prototype = {


    setup : function( data, numParticles, position ) {

        // init central particle
        this.centralParticle = new APP.Particle(position.x, position.y, 0);
        this.centralParticle.isFixed = true;

        this.sphereConstraint = new APP.Constraint( this.centralParticle.pos, this.clusterRadius );

        this.buildPhysics( numParticles );
        this.buildPhysicsInteractive( data.videos );
        this.build3DObjects();

    },


    setPosition : function( pos ) {

        this.centralParticle.pos.copy( pos )

    },


    setClusterRadius : function( value ) {

        this.clusterRadius = value;

        this.sphereConstraint.radius = value;

        this.limitDistance = value + (value * 0.2); // 20% of margin
        this.limitDistanceSq = this.limitDistance * this.limitDistance;

        for ( var i = 0; i < this.surfaceSprings.length; i++ ) {
            this.surfaceSprings[i].setLength( value );
        }

        for ( var i = 0; i < this.mouseAttractions.length; i++ ) {
            this.mouseAttractions[i].distMax = value;
        }

        for ( var i = 0; i < this.centerAttractions.length; i++ ) {
            this.centerAttractions[i].distMax = value;
        }

    },


    setSurfaceStrength : function( value ) {

        this.surfaceStrength = value;

        for ( var i = 0; i < this.surfaceSprings.length; i++ ) {
            this.surfaceSprings[i].strength = value;
        }

    },


    setCentralAttraction : function( value ) {

        this.centralAttraction = value;

        for ( var i = 0; i < this.centerAttractions.length; i++ ) {
            this.centerAttractions[i].strength = value;
        }

    },


    setMouseAttraction : function( value ) {

        this.mouseAttraction = value;

        for ( var i = 0; i < this.mouseAttractions.length; i++ ) {
            this.mouseAttractions[i].strength = value;
        }

    },


    setSpringStrengthInteractive : function( value ) {

        this.springStrengthInteractive = value;

        for ( var i = 0; i < this.interactiveSprings.length; i++ ) {
            this.interactiveSprings[i].strength = value;
        }

    },


    setSpringLengthInteractive : function( value ) {

        this.springLengthInteractive = value;

        for ( var i = 0; i < this.interactiveSprings.length; i++ ) {
            this.interactiveSprings[i].setLength( value );
        }

    },


    setAttractionStrengthInteractive : function( value ) {

        this.attractionStrengthInteractive = value;

        for ( var i = 0; i < this.interactiveAttractions.length; i++ ) {
            this.interactiveAttractions[i].strength = value;
        }

    },


    addToPhysics : function( physics ) {

        var i;

        physics.addParticle( this.centralParticle );

        for ( i = 0; i < this.particles.length; i++ ) {
            physics.addParticle( this.particles[ i ] );
        }

        for ( i = 0; i < this.surfaceSprings.length; i++ ) {
            physics.addSpring( this.surfaceSprings[ i ] );
        }

        for ( i = 0; i < this.centerAttractions.length; i++ ) {
            physics.addAttraction( this.centerAttractions[ i ] );
        }

        for ( i = 0; i < this.mouseAttractions.length; i++ ) {
            physics.addAttraction( this.mouseAttractions[ i ] );
        }

        for (var i = 0; i < this.walkers.length; i++) {
            this.walkers[ i ].addToPhysics( physics );
        }

        // interactive

        for (var i = 0; i < this.interactiveParticles.length; i++) {
            physics.addParticle( this.interactiveParticles[ i ] );
        }

        for (var i = 0; i < this.interactiveSprings.length; i++) {
            physics.addSpring( this.interactiveSprings[ i ] );
        }

        for (var i = 0; i < this.interactiveSprings2.length; i++) {
            physics.addSpring( this.interactiveSprings2[ i ] );
        }

        for (var i = 0; i < this.interactiveAttractions.length; i++) {
            physics.addAttraction( this.interactiveAttractions[ i ] );
        }

    },


    removeFromPhysics : function( physics ) {

        // At the moment Physics can't identify which
        // particles/springs/constraints belong to this cluster.

    },


    addToScene : function( scene ) {

        scene.add( this.lines );
        scene.add( this.points );
        scene.add( this.walkerPoints );

    },


    removeFromScene : function( scene ) {

        scene.remove( this.points );
        scene.remove( this.lines );
        scene.remove( this.walkerPoints );

    },


    update : function() {

        // update vertices from particles

        var numParticles = this.particles.length,
            positions = this.geometryPoints.getAttribute('position').array,
            particle;

        for ( var i = 0, i3 = 0; i < numParticles; i ++, i3 += 3 ) {
            particle = this.particles[ i ].pos;

            positions[ i3 + 0 ] = particle.x;
            positions[ i3 + 1 ] = particle.y;
            positions[ i3 + 2 ] = particle.z;
        }

        this.geometryPoints.getAttribute('position').needsUpdate = true;

        this.geometryLines.verticesNeedUpdate = true;

        // walkers
        for (var i = 0; i < this.walkers.length; i++) {
            this.walkers[ i ].update();
        }
        this.walkerPoints.geometry.verticesNeedUpdate = true;

    },


    buildPhysics : function( numParticles ) {

        var self = this;

        buildParticles();           // create particles at random positions within the constraining sphere
        buildSurfaceSprings();      // connect particles between them to avoid collisions
        buildCenterAttractions();   // attract particles to center of cluster
        buildMouseAttractions();    // attract particles to mouse
        buildWalkers();

        function buildParticles() {

            var spanRadius = 20;
            for ( var i = 0; i < numParticles; i++ ) {
                var x = Math.random() * (spanRadius*2) - spanRadius,
                    y = Math.random() * (spanRadius*2) - spanRadius,
                    z = Math.random() * spanRadius;

                var particle = new APP.Particle( x, y, z );
                particle.constraints.push( self.sphereConstraint );

                self.particles.push( particle );
            }

        }

        function buildSurfaceSprings() {

            var i, j, a, b;
            for ( i = 0; i < self.particles.length-1; ++i ) {
                for ( j = i+1; j < self.particles.length; ++j ) {
                    a = self.particles[ i ];
                    b = self.particles[ j ];

                    var spring = new APP.SpringMinDist( a, b );
                    spring.setLength( self.clusterRadius );
                    // dirty test: interactive clusters (the first 4) have stroger springs to avoid overlaping
                    // spring.strength = Math.random() * 0.005;
                    spring.percent = ( i < 8 && j < 4) ? 1.0 : Math.random();
                    spring.strength = self.surfaceStrength;

                    self.surfaceSprings.push( spring )
                }
            }

        }

        function buildCenterAttractions() {

            for ( var i = 0; i < self.particles.length; i++ ) {
                var attraction = new APP.Attraction( self.centralParticle, self.particles[ i ], self.centralAttraction );
                attraction.distMin = 50;
                attraction.distMax = self.clusterRadius;

                self.centerAttractions.push( attraction );
            }

        }

        function buildMouseAttractions() {

            for ( var i = 0; i < self.particles.length; i++ ) {
                var attraction = new APP.Attraction( self.mouseParticle, self.particles[ i ], self.mouseAttraction );
                attraction.distMin = 10;
                attraction.distMax = self.clusterRadius;

                self.mouseAttractions.push( attraction );
            }

        }

        function buildWalkers() {

            for ( var i = 0; i < 2; i++ ) {
                var walker = new APP.Walker( 0.3 );
                walker.setup( self.particles, self.sphereConstraint );

                self.walkers.push( walker );
            }

        }

    },


    buildPhysicsInteractive( data ) {

        var self = this;

        buildInteractiveParticles();
        buildInteractiveSprings();
        buildInteractiveSprings2();
        buildInteractiveAttractions();

        function buildInteractiveParticles() {

            var i, j, a, b,
                spanRadius = 20,
                particle,
                spring,
                attraction;

            // particles
            for ( i = 0; i < data.length; i++ ) {
                var videoData = data[ i ];

                var x = Math.random() * (spanRadius*2) - spanRadius,
                    y = Math.random() * (spanRadius*2) - spanRadius,
                    z = Math.random() * spanRadius;

                particle = new APP.Particle( x, y, z );
                particle.data = videoData;
                particle.constraints.push( self.sphereConstraint );

                self.interactiveParticles.push( particle );
            }

        }

        function buildInteractiveSprings() {

            for ( i = 0; i < self.interactiveParticles.length; ++i ) {
                for ( j = i+1; j < self.interactiveParticles.length; ++j ) {
                    a = self.interactiveParticles[ i ];
                    b = self.interactiveParticles[ j ];

                    spring = new APP.SpringMinDist( a, b );
                    spring.setLength( self.springLengthInteractive ); // TODO
                    //spring.percent = ( i < 8 && j < 4) ? 1.0 : Math.random(); // TODO
                    spring.strength = self.springStrengthInteractive;

                    self.interactiveSprings.push( spring )
                }
            }

        }

        function buildInteractiveSprings2() {

            for ( i = 0; i < self.interactiveParticles.length; ++i ) {
                for ( j = 0; j < self.particles.length; ++j ) {
                    a = self.interactiveParticles[ i ];
                    b = self.particles[ j ];

                    spring = new APP.SpringMinDist( a, b );
                    spring.setLength( self.clusterRadius );
                    //spring.percent = Math.random();
                    spring.strength = self.surfaceStrength * 0.2;

                    self.interactiveSprings2.push( spring );
                }
            }

        }

        function buildInteractiveAttractions() {

            for ( var i = 0; i < self.interactiveParticles.length; i++ ) {
                var attraction = new APP.Attraction( self.centralParticle, self.interactiveParticles[ i ], self.attractionStrengthInteractive );
                attraction.distMin = 50;
                attraction.distMax = self.clusterRadius;

                self.interactiveAttractions.push( attraction );
            }

        }

    },


    build3DObjects : function() {

        var self = this;

        buildPointsView();
        buildLinesView();

        function buildPointsView() {

            var numParticles = self.particles.length,

                style_colors = [ 0xF39C12, 0xE74C3C, 0x8E44AD, 0x3498DB, 0x1ABC9C ],
                //style_sizes = [ 25, 18, 15, 12, 6 ],
                style_sizes = [ 18, 15, 12, 6 ],

                positions = new Float32Array( numParticles * 3 ),
                colors = new Float32Array( numParticles * 3 ),
                sizes = new Float32Array( numParticles ),
                imageFlags = new Float32Array( numParticles ),

                rand, randomIndex,
                color = new THREE.Color();

			for ( var i = 0, i3 = 0; i < numParticles; i ++, i3 += 3 ) {

                // randomIndex = Math.floor( Math.random() * style_colors.length );
                rand = Math.random();
                randomIndex = (rand <= 0.2) ? 0 :
                              (rand > 0.2 && rand <= 0.5) ? 1 :
                              (rand > 0.5 && rand <= 0.6) ? 2 :
                              (rand > 0.6 && rand <= 0.8) ? 3 : 4;

                color.setHex( style_colors[ randomIndex ] );

				colors[ i3 + 0 ] = color.r;
				colors[ i3 + 1 ] = color.g;
				colors[ i3 + 2 ] = color.b;

                //randomIndex = Math.floor( Math.random() * style_colors.length );
                rand = Math.random();
                randomIndex = (rand <= 0.2) ? 0 :
                              (rand > 0.2 && rand <= 0.3) ? 1 :
                              (rand > 0.3 && rand <= 0.7) ? 2 : 3;

                sizes[ i ] = style_sizes[ randomIndex ];

                rand = Math.random();
                randomIndex = (rand <= 0.3) ? 1 : 0;

                imageFlags[ i ] = randomIndex;

			}

            self.geometryPoints = new THREE.BufferGeometry();
			self.geometryPoints.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
			self.geometryPoints.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
			self.geometryPoints.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
            self.geometryPoints.addAttribute( 'imageFlag', new THREE.BufferAttribute( imageFlags, 1 ) );

            self.points = new THREE.Points( self.geometryPoints, self.materialPoints );


            // debug

            var geom,
                material = new THREE.PointsMaterial( { size: 15, color: 0x000000, sizeAttenuation: false, map: new THREE.TextureLoader().load( "assets/circle-marked.png" ), alphaTest: 0.5, transparent: true } );

            material.visible = true;

            // geom = new THREE.Geometry();
            // for (var i = 0; i < self.walkers.length; i++) {
            //     geom.vertices.push( self.walkers[i].particle.pos );
            //
            // }
            // self.walkerPoints = new THREE.Points( geom, material );


            // debug

            geom = new THREE.Geometry();
            for (var i = 0; i < self.interactiveParticles.length; i++) {
                geom.vertices.push( self.interactiveParticles[i].pos );

            }
            self.walkerPoints = new THREE.Points( geom, material );

        }

        function buildLinesView() {

            self.geometryLines = new THREE.Geometry();
            for ( var i = 0; i < self.interactiveSprings.length; i++ ) {
                var spring = self.interactiveSprings[ i ];
                self.geometryLines.vertices.push( spring.a.pos, spring.b.pos );
            }

            self.lines = new THREE.LineSegments( self.geometryLines, self.materialLines );

        }

    }

}
