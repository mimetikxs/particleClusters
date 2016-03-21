APP.AttractionDirectional = function( position, direction, strength ) {

    this.position = position;       // 2d vector
    this.direction = direction;     // 2d unit vector, act as a mask (eg: 0,1 or 1,0  or 0,-1 or -1,0 )
    this.strength = strength;

    this.dist;
    this.distMin = 10;          // force will stop growing when distance < minDist
    this.distMax = 500;       // distance will be capped when greather than this value

    this.particles = [];

}

APP.AttractionDirectional.prototype = {

    update : function() {

        var numParticles = this.particles.length;

        for( var i = 0; i < numParticles; i++ ) {
            var particle = this.particles[ i ],
                p = new THREE.Vector2(particle.pos.x, particle.pos.y); // 2d attraction, ignore the z component of particle position

            // aux vector from
            p.sub( this.position );

            // distance = projection of vector 'p' into vector 'direction'
            this.dist = p.dot(this.direction);

// if(this.dist < 0)
//     console.log(this.dist);

            // clamp the distance
            this.dist = (this.dist < this.distMin) ? this.distMin : this.dist;
            this.dist = (this.dist > this.distMax) ? 0 : this.dist;

            var force = this.strength / (this.dist * this.dist);

            //var deltaForce = delta.multiplyScalar( force );
            var deltaForce = this.direction.clone().multiplyScalar( force );

            if ( !particle.isFixed ) {
                particle.pos.x +=  deltaForce.x;
                particle.pos.y +=  deltaForce.y;
            }

        }

    },


    addParticle : function( p ) {

        this.particles.push( p );

    }


}
