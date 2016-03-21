APP.Attraction = function(a, b, strength) {

    this.a = a;
    this.b = b;
    this.strength = (typeof strength !== 'undefined') ? strength : 1;

    this.dist = 0;           // current distance between particles
    this.distMin = 0;       // force will stop growing when distance < minDist
    this.distMax = 1000;     // force will be 0 if distance is greather than this value

    this.enabled = true;
    
}

APP.Attraction.prototype = {

    update : function() {

        if ( !this.enabled ) {
            return;
        }

        // 3d attraction
        // var delta = this.b.pos.clone().sub( this.a.pos );
        //
        // this.dist = delta.length();
        //
        // this.dist = (this.dist > 30) ? this.dist : 30;
        //
        // var force = this.strength / (this.dist * this.dist);
        //
        // var deltaForce = delta.multiplyScalar( force );
        //
        // if ( !this.a.isFixed ) this.a.pos.add( deltaForce );
        // if ( !this.b.isFixed ) this.b.pos.sub( deltaForce );


        // 2d attraction
        // ignore the z component of vectors
        var a = new THREE.Vector2(this.a.pos.x, this.a.pos.y),
            b = new THREE.Vector2(this.b.pos.x, this.b.pos.y),
            delta = b.sub( a );

        this.dist = delta.length();
        this.dist = (this.dist < this.distMin) ? this.distMin : this.dist;
        this.dist = (this.dist > this.distMax) ? 0 : this.dist;

        var force = this.strength / (this.dist * this.dist);

        var deltaForce = delta.multiplyScalar( force );

        if ( !this.a.isFixed ) {
            this.a.pos.x +=  deltaForce.x;
            this.a.pos.y +=  deltaForce.y;
        }
        if ( !this.b.isFixed ) {
            this.b.pos.x -= deltaForce.x;
            this.b.pos.y -= deltaForce.y;
        }

    }

}
