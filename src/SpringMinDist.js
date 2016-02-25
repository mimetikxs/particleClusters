APP.SpringMinDist = function(a, b, length, strength) {

    this.a = a;
	this.b = b;
	this.restLength = (typeof length !== 'undefined') ? length : this.a.pos.distanceTo(this.b.pos);
    this.restLengthSquared = this.restLength * this.restLength;
    this.strength = (typeof strength !== 'undefined') ? strength : 1;

    // TODO fix this
    this.percent = 1;

}


APP.SpringMinDist.prototype = {

    setLength : function( length ) {

        this.restLength = length;
        this.restLengthSquared = length * length;

    },

    update : function() {

        var a = this.a.pos,
            b = this.b.pos,
            delta = b.clone().sub( a );

        if ( delta.lengthSq() < this.restLengthSquared ) {
            var deltaLength = delta.length(),
                ratio = (this.restLength - deltaLength) / deltaLength;

            //ratio *= this.strength;
            // TODO fix this
            ratio *= this.strength * this.percent;

    		if ( !this.a.isFixed ) {
    			a.addScaledVector( delta, -ratio );
    			this.a.applyConstraints();
    		}

    		if ( !this.b.isFixed ) {
    			b.addScaledVector( delta, ratio );
    			this.b.applyConstraints();
    		}
        }

    }

}
