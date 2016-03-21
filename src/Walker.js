APP.Walker = function() {

    this.noise = new APP.Simple1DNoise();

    this.particle = new APP.Particle(0, 0, 0);
    //this.particle.isFixed = true;

    this.attractions = [];
    this.attractionStrength = -26;

    this.springs = [];
    this.springsStrength = 0.03;

    this.offset = Math.random() * 100;

}


APP.Walker.prototype = {


    setup : function( particlesArray, sphereConstraint ) {

        //var constraint = new APP.Constraint( sphereConstraint.center, sphereConstraint.radius * 0.7 );

        this.particle.constraints.push( sphereConstraint );


        // this.particle.isFixed = true;

        for ( var i = 0; i < particlesArray.length; i++ ) {
            var attraction = new APP.Attraction( this.particle, particlesArray[ i ], this.attractionStrength );
            attraction.distMin = 10;
            attraction.distMax = self.clusterRadius;

            this.attractions.push( attraction );
        }

        // var length = sphereConstraint.radius / 5;
        // var strength = this.springsStrength;
        // for ( var i = 0; i < particlesArray.length; i++ ) {
        //     var spring = new APP.SpringMinDist( this.particle, particlesArray[ i ], length, strength );
        //     spring.percent = (i < 8) ? 1 : Math.random();
        //
        //     this.springs.push( spring );
        // }

    },


    update : function() {

        this.noise.setAmplitude( APP.parameters.noise_amplitude );
        this.noise.setScale( APP.parameters.noise_scale );

        var t = Date.now() + this.offset;
        var noiseVal = this.noise.getVal(t);

        var angle = -Math.PI + noiseVal * (Math.PI*2);
        //this.angle += (-0.1 + noiseVal * 0.2);

        this.noise.setAmplitude( APP.parameters.noise_mag_amplitude );
        this.noise.setScale( APP.parameters.noise_mag_scale );

        console.log(APP.parameters.noise_mag_amplitude);

        var noiseMag = this.noise.getVal(t+50);

        var vel = new THREE.Vector3();
        vel.x = Math.cos(angle) * noiseMag;
        vel.y = Math.sin(angle) * noiseMag;

        // change particle's velocity
        //  this.particles[ 0 ].isFixed = true;
        this.particle.prevPos.copy( this.particle.pos.clone().sub( vel ) );
        //console.log(vel);

    },


    setAttractionsStrength : function( strength ) {

        this.attractionStrength = strength;

        for ( var i = 0; i < this.attractions.length; i++ ) {
            this.attractions[ i ].strength = strength;
        }

    },


    enableAttraction : function() {

        for ( var i = 0; i < this.attractions.length; i++ ) {
            this.attractions[ i ].enabled = true;
        }

    },


    disableAttraction : function() {

        for ( var i = 0; i < this.attractions.length; i++ ) {
            this.attractions[ i ].enabled = false;
        }

    },


    addToPhysics : function( physics ) {

        physics.addParticle( this.particle );

        for ( var i = 0; i < this.attractions.length; i++ ) {
            physics.addAttraction( this.attractions[ i ] );
        }

        for ( var i = 0; i < this.springs.length; i++ ) {
            physics.addSpring( this.springs[ i ] );
        }

    }

}
