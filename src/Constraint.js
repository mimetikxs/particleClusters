// constraint a particle to the surface of a hemisphere
// it is assumed that hemisphereCenter.z = 0

APP.Constraint = function( center, radius ) {

    this.center = center;
    this.radius = radius;
    // particles = [];

}

APP.Constraint.prototype = {

    apply : function( particle ) {

        var center = this.center.clone(),
            delta = particle.pos.clone().sub( center );

        particle.pos.copy( center.add( delta.setLength( this.radius ) ) );

    }

}
