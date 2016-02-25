APP.Spring = function(a, b, length, strength) {

    this.a = a;
	this.b = b;
	this.restLength = (typeof length !== 'undefined') ? length : this.a.pos.distanceTo(this.b.pos);
    this.restLengthSquared = this.restLength * this.restLength;
    this.strength = (typeof strength !== 'undefined') ? strength : 1;

}


APP.Spring.prototype = {

    update : function() {

        var a = this.a.pos,
            b = this.b.pos,
            delta = b.clone().sub( a ),
		    deltaLength = delta.length(),
		    ratio = (this.restLength - deltaLength) / deltaLength;

		ratio *= this.strength;

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
