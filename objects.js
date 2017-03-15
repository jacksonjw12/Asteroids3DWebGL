
function cubeObject(size, position, rotation,velocity, rotVel){
	

	var vertices = [
	  // Front face
	  1.0*size, -1.0*size,  -1.0*size,
	   1.0*size, -1.0*size,  1.0*size,
	   -1.0*size,  -1.0*size,  1.0*size,
	  -1.0*size,  -1.0*size,  -1.0*size,
	  
	  // Back face
	  1.0*size, 1.0*size, -1.0*size,
	  1.0*size,  1.0*size, 1.0*size,
	  -1.0*size,  1.0*size, 1.0*size,
	  -1.0*size, 1.0*size, -1.0*size,
	  
	];
	var colors = []
	for (var i=0; i < 8; i++) {
	  colors = colors.concat([Math.random(), Math.random(), Math.random(), 1.0]);
	}

	var cubeVertexIndices = [
	  0,  1,  2,      0,  2,  3,    // front
	  4,  5,  6,      4,  6,  7,    // back
	  0,  4,  5,     0,  5, 1,   // top
	  1, 5, 6,     1, 6, 2,   // bottom
	  2, 6, 7,     2, 7, 3,   // right
	  4, 0, 3,     4, 3, 7    // left
	];

	var cube = new gameObject(position,rotation,velocity,rotVel,vertices,cubeVertexIndices,colors);
	

	return cube;

}

function bullet(size, position, rotation,velocity, rotVel, timeToDeath){
	var vertices = [
	  // Front face
	  1.0*size, -1.0*size,  -1.0*size,
	   1.0*size, -1.0*size,  1.0*size,
	   -1.0*size,  -1.0*size,  1.0*size,
	  -1.0*size,  -1.0*size,  -1.0*size,
	  
	  // Back face
	  1.0*size, 1.0*size, -1.0*size,
	  1.0*size,  1.0*size, 1.0*size,
	  -1.0*size,  1.0*size, 1.0*size,
	  -1.0*size, 1.0*size, -1.0*size,
	  
	];
	var colors = []

	for (var i=0; i < 2; i++) {
	  colors = colors.concat([0,Math.random()/5,1-Math.random()/2, 1.0]);
	}
	for (var i=0; i < 2; i++) {
	  colors = colors.concat([1-Math.random()/2,Math.random()/5,0, 1.0]);
	}
	for (var i=0; i < 2; i++) {
	  colors = colors.concat([0,Math.random()/5,1-Math.random()/2, 1.0]);
	}
	for (var i=0; i < 2; i++) {
	  colors = colors.concat([1-Math.random()/2,Math.random()/5,0, 1.0]);
	  
	}

	var cubeVertexIndices = [
	  0,  1,  2,      0,  2,  3,    // front
	  4,  5,  6,      4,  6,  7,    // back
	  0,  4,  5,     0,  5, 1,   // top
	  1, 5, 6,     1, 6, 2,   // bottom
	  2, 6, 7,     2, 7, 3,   // right
	  4, 0, 3,     4, 3, 7    // left
	];

	var cube = new gameObject(position,rotation,velocity,rotVel,vertices,cubeVertexIndices,colors,timeToDeath);
	

	return cube;
}


function asteroid(size, position,velocity, rotation, vel, rotVel){

	var rand = Math.random();
	var vertices = [
	  1.0+size*rand, -1.0-size*rand,  -1.0-size*rand,
	]
	rand = Math.random();
	vertices = vertices.concat([
	   1.0+size*rand, -1.0-size*rand,  1.0+size*rand,
	])
	rand = Math.random();
	vertices = vertices.concat([
	  -1.0-size*rand,  -1.0-size*rand,  1.0+size*rand,
	])
	rand = Math.random();
	vertices = vertices.concat([
	   -1.0-size*rand,  -1.0-size*rand,  -1.0-size*rand
	])
	rand = Math.random();
	vertices = vertices.concat([
	  1.0+size*rand, 1.0+size*rand, -1.0-size*rand
	])
	rand = Math.random();
	vertices = vertices.concat([
	   1.0+size*rand,  1.0+size*rand, 1.0+size*rand,
	])
	rand = Math.random();
	vertices = vertices.concat([
	  -1.0-size*rand,  1.0+size*rand, 1.0+size*rand,
	])
	rand = Math.random();
	vertices = vertices.concat([
	   -1.0-size*rand, 1.0+size*rand, -1.0-size*rand,
	])



	
	var colors = []
	for (var i=0; i < 8; i++) {
	  colors = colors.concat([.5-Math.random()/5, Math.random()/2, .8-Math.random()/3, 1.0]);
	}

	var cubeVertexIndices = [
	  0,  1,  2,      0,  2,  3,    // front
	  4,  5,  6,      4,  6,  7,    // back
	  0,  4,  5,     0,  5, 1,   // top
	  1, 5, 6,     1, 6, 2,   // bottom
	  2, 6, 7,     2, 7, 3,   // right
	  4, 0, 3,     4, 3, 7    // left
	];

	var a = new gameObject(position,rotation,velocity,rotVel,vertices,cubeVertexIndices,colors);
	

	return a;

}

function gameObject(position, rotation,velocity,rotationalVelocity, vertices,indices,colors, timeToDeath){
	this.position = position;
	this.rotation = rotation;
	this.velocity = velocity;
	this.rotVel = rotationalVelocity;
	this.renderObject = new renderObject();
	this.renderObject.setup(gl,vertices,indices,colors);
	this.timeToDeath = timeToDeath;
	this.isBullet = false;
	this.hits = 0;
	this.getRanges = function(){
		var xMax = this.renderObject.vertices[0]+this.position.x;
		var yMax = this.renderObject.vertices[1]+this.position.y
		var zMax = this.renderObject.vertices[2] +this.position.z;
		var xMin = this.renderObject.vertices[0]+this.position.x;
		var yMin = this.renderObject.vertices[1] +this.position.y;
		var zMin = this.renderObject.vertices[2]+this.position.z;
		for(var p = 3; p<this.renderObject.vertices.length; p+=3){
			if(this.renderObject.vertices[p]+this.position.x > xMax){xMax = this.renderObject.vertices[p]+this.position.x}
			else if(this.renderObject.vertices[p]+this.position.x < xMin){xMin = this.renderObject.vertices[p]+this.position.x}
			if(this.renderObject.vertices[p+1] + this.position.y > yMax){yMax = this.renderObject.vertices[p+1] + this.position.y}
			else if(this.renderObject.vertices[p+1] + this.position.y < yMin){yMin = this.renderObject.vertices[p+1] + this.position.y}
			if(this.renderObject.vertices[p+2] +this.position.z> zMax){zMax = this.renderObject.vertices[p+2]+this.position.z}
			else if(this.renderObject.vertices[p+2] +this.position.z< zMin){zMin = this.renderObject.vertices[p+2]+this.position.z}

		}
		this.xRange = [xMin,xMax];
		this.yRange = [yMin,yMax];
		this.zRange = [zMin,zMax];

	}
	this.scale = function(factor){
		this.renderObject.scale(factor);
	}


	this.getRanges();
}





function renderObject(gl, positionBuffer, colorBuffer, indexBuffer){//object space
	this.positionBuffer = null;//gl.createBuffer();
	this.colorBuffer = null//gl.createBuffer();
	this.indexBuffer = null//gl.createBuffer();

	if(positionBuffer != undefined){
		this.positionBuffer = positionBuffer;
		
	}
	if(colorBuffer != undefined){
		this.colorBuffer = colorBuffer;
		
	}
	if(indexBuffer != undefined){
		this.indexBuffer = indexBuffer;
		
	}
	this.scale = function(factor){
		for(var i = 0; i<this.vertices.length; i++){
			this.vertices[i]*=factor;

		}
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STREAM_DRAW);

	}

	this.setup = function(gl, vertices, indexes, colors){
		this.vertices = vertices;
		this.indexes = indexes;
		this.colors = colors;
		this.gl = gl

		this.positionBuffer = gl.createBuffer();
		

		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STREAM_DRAW);
		
		this.positionBuffer.itemSize = 3;
        this.positionBuffer.numItems = vertices.length;

        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STREAM_DRAW);

        this.colorBuffer.itemSize = 4;
        this.colorBuffer.numItems = colors.length;

       	this.indexBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), gl.STATIC_DRAW);

	}
	this.delete = function(){
		gl.delete(this.positionBuffer);
		gl.delete(this.colorBuffer);
		gl.delete(this.indexBuffer);

	}



}




function Camera(pos,rot,fov){

	this.gotHit = false;
	this.gotHitPunish = 0;
	this.fireBullet = false;
	this.position = new point3d(-1.5,0,-7);//new point3d(-10,-40,20);
	this.rotation = new point3d(0,0,0)
	this.fov = Math.PI/2;
	this.stepsSinceBullet = 10;
	this.vel = new point3d(0,0,0);
	this.rotVel = new point3d(0,0,0)
	if(pos != undefined){
		this.position = pos;
		this.rotation = rot;
		this.fov = fov;
	}
//rcos

	this.forward = function(){
		return new point3d(Math.cos(this.rotation.x)*Math.sin(-this.rotation.y),Math.sin(this.rotation.x),Math.cos(this.rotation.x)*Math.cos(this.rotation.y))
		
	}
	this.left = function(){
		return new point3d(Math.cos(this.rotation.x)*Math.sin(-Math.PI/2-this.rotation.y),Math.sin(this.rotation.x),Math.cos(this.rotation.x)*Math.cos(-Math.PI/2-this.rotation.y))

	}
	this.up = function(){
		//return new point3d(-Math.cos(Math.PI/2-this.rotation.z)*Math.cos(Math.PI/2-this.rotation.x),Math.sin(Math.PI/2-this.rotation.z)*Math.sin(Math.PI/2-this.rotation.x),Math.sin(this.rotation.x));
		return new point3d(Math.cos(this.rotation.x-Math.PI/2)*Math.sin(-this.rotation.y),Math.sin(this.rotation.x-Math.PI/2),Math.cos(this.rotation.x-Math.PI/2)*Math.cos(this.rotation.y))

	}
	

	this.vel = new point3d(0,0,0);

}


function Keyboard(){
	this.keysDown = [];
	var keys = this.keysDown
	this.prevTime = new Date();
	document.addEventListener('keydown', function(event){
	
		var keyChar = String.fromCharCode(event.keyCode);
		if(keys.indexOf(keyChar) == -1){
			
			keys.push(keyChar);
		}


		});

	document.addEventListener('keyup', function(event){
		
		var keyChar = String.fromCharCode(event.keyCode);
		
		if(keys.indexOf(keyChar) > -1){

			keys.splice(keys.indexOf(keyChar),1);
		}


	})
	
	
	this.rotWay = 1;
	camera.vel = new point3d(0,0,0)
	this.doMovement = function(camera){
		var dC = new Date();
		var dt = dC-this.prevTime

		var rotSp =.05
		var movement = new point3d(0,0,0)
		if(this.keysDown.indexOf("Q") > -1){
			//camera.position.z+=10;
			movement.y++;

		}
		if(this.keysDown.indexOf("E") > -1){
			//camera.position.z-=10;
			movement.y--;

		}

		if(this.keysDown.indexOf("W") > -1){
			//camera.position.y+=10;
			movement.z++;

		}

		if(this.keysDown.indexOf("S") > -1){
			//camera.position.y-=10;
			movement.z--;
		}
		if(this.keysDown.indexOf("A") > -1){
			//camera.position.x+=10;
			movement.x--;
		}
		if(this.keysDown.indexOf("D") > -1){
			//camera.position.x-=10;
			movement.x++;
		}
		var prevRot = camera.rotation.copyScale(1);
		if(this.keysDown.indexOf("&") > -1){
			camera.rotation.x-=.05*rotSp;
			
		}
		if(this.keysDown.indexOf("(") > -1){
			camera.rotation.x+=.05*rotSp;
			
		}
		if(this.keysDown.indexOf("%") > -1){
			camera.rotation.y-=.05*rotSp * this.rotWay;
			
		}
		if(this.keysDown.indexOf("'") > -1){
			camera.rotation.y+=.05*rotSp * this.rotWay;
			
		}
		if(this.keysDown.indexOf(" ") > -1 && camera.stepsSinceBullet > 1000){
			camera.stepsSinceBullet = 0;
			spawnBullet();
		}
		camera.rotVel.add( camera.rotation.vectorTo(prevRot));

		//console.log(this.keysDown)

		movement.normalize();
		var speed = .8

		var forward = camera.forward();
		var left = camera.left();
		var up = camera.up();
		forward.normalize();
		left.normalize();
		up.normalize();
		var deltaf = forward//.scale(movement.x)
		deltaf.scale(speed*movement.z/10)
		
		var deltal = left
		deltal.scale(speed*movement.x/20)
		
		var deltau = up
		deltau.scale(speed*movement.y/20)

		deltaf.add(deltau)
		deltaf.add(deltal)
		deltaf.scale(1/10)

		var moveSpeed = 60;
		camera.vel.add( deltaf )
		
		camera.rotation = prevRot;
		
		camera.position.add(camera.vel.copyScale(dt/1000*moveSpeed))
		//camera.position.add(new point3d(camera.rotation.x,camera.rotation));
		//camera.vel = camera.vel.copyScale(1000/30*moveSpeed)
		camera.vel.scale(.99)
		camera.rotVel.cap(.04);
		camera.rotation.add(camera.rotVel.copyScale(dt/30))
		camera.rotVel.scale(.99)
		this.prevTime = dC

		

	}




}





function point2d(x,y){
	this.x = x;
	this.y = y;
}

function point3d(x,y,z){
	this.x = x;
	this.y = y;
	this.z = z;
	this.latestProject;
	this.project = function(camera){
		projectX = Math.cos(camera.rotation.y) * (Math.sin(camera.rotation.z) * (this.y - camera.position.y) + Math.cos(camera.rotation.z) * (this.x - camera.position.x)) - Math.sin(camera.rotation.y) * (this.z - camera.position.z);
		projectY = Math.sin(camera.rotation.x) * (Math.cos(camera.rotation.y) * (this.z - camera.position.z) + Math.sin(camera.rotation.y) * (Math.sin(camera.rotation.z) * (this.y - camera.position.y) + Math.cos(camera.rotation.z) * (this.x - camera.position.x))) + Math.cos(camera.rotation.x) * (Math.cos(camera.rotation.z) * (this.y - camera.position.y) - Math.sin(camera.rotation.z) * (this.x - camera.position.x)) ;
		projectZ = Math.cos(camera.rotation.x) * (Math.cos(camera.rotation.y) * (this.z - camera.position.z) + Math.sin(camera.rotation.y) * (Math.sin(camera.rotation.z) * (this.y - camera.position.y) + Math.cos(camera.rotation.z) * (this.x - camera.position.x))) - Math.sin(camera.rotation.x) * (Math.cos(camera.rotation.z) * (this.y - camera.position.y) - Math.sin(camera.rotation.z) * (this.x - camera.position.x));
		var ez = 1 / Math.tan(camera.fov / 2);
		var screenX = (projectX ) * (ez / projectZ) ;
		var screenY = -(projectY) * (ez / projectZ);
		screenX *= canvas.height;
		screenY *= -canvas.height;
		screenX += canvas.width/2
		screenY += canvas.height/2

		if(projectZ > 0 ){
			this.latestProject = new point3d(-100,-100,-100)
		}
		else{
			this.latestProject = new point3d(screenX,screenY,projectZ)
		}
		return this.latestProject;
		
	}

	this.difference = function(otherPoint){
		var dx = this.x-otherPoint.x;
		var dy = this.y-otherPoint.y;
		var dz = this.z-otherPoint.z;

		var p = new point3d(dx,dy,dz);
		return p.magnitude();

	}
	this.vectorTo = function(otherPoint){
		var dx = this.x-otherPoint.x;
		var dy = this.y-otherPoint.y;
		var dz = this.z-otherPoint.z;

		var p = new point3d(dx,dy,dz);
		return p;
	}

	this.magnitude = function(){
		return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)
	}

	this.normalize = function(){
		var magnitude = Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
		if(magnitude != 0){
			this.x = this.x/magnitude;
			this.y = this.y/magnitude;
			this.z = this.z/magnitude;
		}
		

	}
	this.cap = function(num){
		if(this.x > num){
			this.x = num;
		}if(this.y > num){
			this.y = num;
		}if(this.z > num){
			this.z = num;
		}
		if(this.x < -num){
			this.x = -num;
		}if(this.y < -num){
			this.y = -num;
		}if(this.z < -num){
			this.z = -num;
		}
	}
	this.add = function(otherpoint){
		this.x += otherpoint.x;
		this.y += otherpoint.y;
		this.z += otherpoint.z;
	}
	this.times = function(otherpoint){//dot product
		return new point3d(this.x*otherpoint.x,this.y*otherpoint.y,this.z*otherpoint.z)
	}

	this.scale = function(scalar){
		this.x *=scalar;
		this.y *=scalar;
		this.z *=scalar;
	}
	this.copyScale = function(scalar){
		var x_ = this.x* scalar;
		var y_ = this.y* scalar;
		var z_ = this.z* scalar;
		return new point3d(x_,y_,z_);
	}

}








function modelFromObj(obj, sideWays, centerPoint,isBullet=false){
	var points = []
	var faces = []
	var currentColor = "#000000";
	for(var l = 0; l<obj.length; l++){
		if(obj[l].charAt(0) == "v"){
			var coords = obj[l].split(" ");
			if(sideWays){
				var x = 1*(coords[1])
				var z = 1*(coords[2])
				var y = 1*(coords[3])
				points.push(new point3d(x,y,z))
			}
			else{
				var x = 1*(coords[1])
				var y = 1*(coords[2])
				var z = 1*(coords[3])
				points.push(new point3d(x,y,z))
			}
			
		}
		else if(obj[l].charAt(0) == "u"){
			var lineSplit = obj[l].split(" ");
			var color = "#" + lineSplit[1]
			currentColor = color;
		}
		else if(obj[l].charAt(0) == "f"){
			var pointIndexes = obj[l].split(" ");
			var a = 1*(pointIndexes[1]);
			var b = 1*(pointIndexes[2]);
			var c = 1*(pointIndexes[3]);
			//console.log(pointIndexes[1])
			if(pointIndexes.length == 5){
				var d = 1*(pointIndexes[4]);
				var ps = [points[a-1],points[b-1],points[c-1],points[d-1]]
				console.log(currentColor)

				faces.push(new Face(ps,a,b,c,currentColor,d))
			}
			else{
				var ps = [points[a-1],points[b-1],points[c-1]]
				faces.push(new Face(ps,a,b,c,currentColor))
			}
			
		}
		
	}
	//console.log(points[0])

	if(centerPoint != undefined){
		return new Model(faces, points, centerPoint,isBullet)
	}
	return new Model(faces,points,new point3d(0,0,0),isBullet)
}




