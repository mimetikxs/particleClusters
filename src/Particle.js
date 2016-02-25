APP.Particle = function( x, y, z, drag ) {

    this.pos = new THREE.Vector3( x,y,z );
    this.prevPos = this.pos.clone();
    this.tempPos = new THREE.Vector3();
    this.vel = new THREE.Vector3();    // velocity of the current step
    this.isFixed = false;
    this.constraints = [];
    this.drag = (typeof drag !== 'undefined') ? drag : 0.9;;   // 1 = no drag, 0 = max drag. default is 0.9

}

APP.Particle.prototype = {

    update : function( gravity ) {

        // verlet integration
        if ( !this.isFixed ) {

            this.tempPos.copy( this.pos );

            this.vel.subVectors( this.pos, this.prevPos );

            this.pos.add( this.vel.add( gravity ).multiplyScalar( this.drag ) );

            this.prevPos.copy( this.tempPos );

            if ( this.constraints.length > 0 ) {
                this.applyConstraints();
            }
        }

    },

    applyConstraints : function() {

        var i = 0,
            numConstraints = this.constraints.length;
        for (i; i<numConstraints; i++) {
            this.constraints[i].apply( this );
        }

    }
}
