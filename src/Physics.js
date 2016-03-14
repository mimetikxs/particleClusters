APP.Physics = function() {

    this.gravity = new THREE.Vector3( 0, 0, 2.0 );
    this.drag = 0.9;
    this.particles = [];
    this.springs = [];
    this.attractions = [];

}

APP.Physics.prototype = {

    update : function() {

        var i = 0,
            numParticles = this.particles.length,
            numSprings = this.springs.length,
            numAttractions = this.attractions.length;

        // update particles
        for ( i = 0; i < numParticles; i++ ) {
			this.particles[i].update( this.gravity );
		}

        // update springs
        for ( i = 0; i < numSprings; i++ ) {
			this.springs[i].update();
		}

        // update attractions
        for ( i = 0; i < numAttractions; i++ ) {
			this.attractions[i].update();
		}

        // update repulsion
        // this keeps particles from staying in the center
        // var p,
        //     repulsionPos = new THREE.Vector3(0,0,300),
        //     stength = 10,
        //     delta,
        //     deltaLength2,
        //     force,
        //     deltaForce;

        // for ( i = 0; i < numParticles; i++ ) {
        //     p = particles[ i ];
        //
        //     if ( !p.isFixed ) {
        //         delta = repulsionPos.clone().sub( p.pos );
        //         deltaLength2 = delta.lengthSq();
        //         force = deltaLength2 > 0 ? stength / -deltaLength2 : 0;
        //
        //         p.pos.add( delta.multiplyScalar( force ) );
        //
        //         // delta = repulsionPos.z - p.pos.z;
        //         // deltaLength2 = delta * delta;
        //         // force = deltaLength2 > 0 ? stength / deltaLength2 : 0;
        //         //
        //         // p.pos.z -= force;
        //
        //     }
		// }

    },

    addParticle : function( p ) {

        this.particles.push( p );

    },

    addSpring : function( s ) {

        this.springs.push( s );

    },

    addAttraction : function( a ) {

        this.attractions.push( a );

    }

}
