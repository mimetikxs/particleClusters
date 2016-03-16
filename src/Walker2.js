APP.Walker = function( speed ) {

    this.particle = new APP.Particle(0, 0, 0);
    this.particle.isFixed = true;

    this.attractions = [];
    this.attractionStrength = -16;

    this.springs = [];
    this.springsStrength = 0.03;

    this.vx = speed;
    this.vy = 0;
    //amplitud de giros
    this.amp = 2.5; //3.5; // amplitud maximo del angulo
    this.ta = 3;    // amplitud del angulo (empieza desde 6)
    this.i;         // incremento del angulo

    this.constraint;

}


APP.Walker.prototype = {


    setup : function( particlesArray, sphereConstraint ) {

        this.constraint = sphereConstraint;

        // place in random pos
        var center = sphereConstraint.center;
        var radius = sphereConstraint.radius;
        this.particle.pos.x = center.x + ( -radius + Math.random() * ( radius * 2 ) );
        this.particle.pos.y = center.y + ( -radius + Math.random() * ( radius * 2 ) );

        for ( var i = 0; i < particlesArray.length; i++ ) {
            var attraction = new APP.Attraction( this.particle, particlesArray[ i ], this.attractionStrength );
            attraction.distMin = 5;
            attraction.distMax = self.clusterRadius/10;

            this.attractions.push( attraction );
        }

    },


    update : function() {

        if ( this.ta > this.amp ) {
            this.i = -0.5;
        }
        else if ( this.ta < -this.amp ) {
            this.i = 0.5;
        }
        else{
            this.i = -1.5 + Math.random() * 3;
        }

        this.ta += this.i;
        var a = this.ta * Math.PI/180;

        //rotacion velocidades
        var nvx = this.vx*Math.cos(a) - this.vy*Math.sin(a);
        var nvy = this.vx*Math.sin(a) + this.vy*Math.cos(a);
        this.vx = nvx;
        this.vy = nvy;

        //movimiento final
        // x += vx;
        // y += vy;

        var pos = this.particle.pos;
        pos.x += this.vx;
        pos.y += this.vy;
        pos.z = 0;

        var left = this.constraint.center.x - this.constraint.radius*0.7;
        var right = this.constraint.center.x + this.constraint.radius*0.7;
        var top = this.constraint.center.y + this.constraint.radius*0.7;
        var bottom = this.constraint.center.y - this.constraint.radius*0.7;

        //rebotes en límites
        if(pos.x < left){
            pos.x = left;
            this.vx = -this.vx;
        }
        else if(pos.x > right){
            pos.x = right;
            this.vx = -this.vx;
        }
        if(pos.y > top){
            pos.y = top;
            this.vy = -this.vy;
        }
        else if(pos.y < bottom){
            pos.y = bottom;
            this.vy = -this.vy;
        }

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
