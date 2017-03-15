
function cubeObject(size, position, rotation){
	var vertices = [
	  // Front face
	  -1.0*size, -1.0*size,  1.0*size,
	   1.0*size, -1.0*size,  1.0*size,
	   1.0*size,  1.0*size,  1.0*size,
	  -1.0*size,  1.0*size,  1.0*size,
	  
	  // Back face
	  -1.0*size, -1.0*size, -1.0*size,
	  -1.0*size,  1.0*size, -1.0*size,
	   1.0*size,  1.0*size, -1.0*size,
	   1.0*size, -1.0*size, -1.0*size,
	  
	  // Top face
	  -1.0*size,  1.0*size, -1.0*size,
	  -1.0*size,  1.0*size,  1.0*size,
	   1.0*size,  1.0*size,  1.0*size,
	   1.0*size,  1.0*size, -1.0*size,
	  
	  // Bottom face
	  -1.0*size, -1.0*size, -1.0*size,
	   1.0*size, -1.0*size, -1.0*size,
	   1.0*size, -1.0*size,  1.0*size,
	  -1.0*size, -1.0*size,  1.0*size,
	  
	  // Right face
	   1.0*size, -1.0*size, -1.0*size,
	   1.0*size,  1.0*size, -1.0*size,
	   1.0*size,  1.0*size,  1.0*size,
	   1.0*size, -1.0*size,  1.0*size,
	  
	  // Left face
	  -1.0*size, -1.0*size, -1.0*size,
	  -1.0*size, -1.0*size,  1.0*size,
	  -1.0*size,  1.0*size,  1.0*size,
	  -1.0*size,  1.0*size, -1.0*size
	];
	var colors = []
	for (var i=0; i < 72; i++) {
	  colors = colors.concat([Math.random(), Math.random(), Math.random(), 1.0]);
	}

	var cubeVertexIndices = [
	  0,  1,  2,      0,  2,  3,    // front
	  4,  5,  6,      4,  6,  7,    // back
	  8,  9,  10,     8,  10, 11,   // top
	  12, 13, 14,     12, 14, 15,   // bottom
	  16, 17, 18,     16, 18, 19,   // right
	  20, 21, 22,     20, 22, 23    // left
	];

	var cube = new gameObject(position,rotation,vertices,cubeVertexIndices,colors);
	

	return cube;

}

function gameObject(position, rotation, vertices,indices,colors){
	this.position = position;
	this.rotation = rotation;


	this.renderObject = new renderObject();
	this.renderObject.setup(gl,vertices,indices,colors);



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

	this.setup = function(gl, vertices, indexes, colors){
		this.positionBuffer = gl.createBuffer();
		

		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		
		this.positionBuffer.itemSize = 3;
        this.positionBuffer.numItems = vertices.length;

        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        this.colorBuffer.itemSize = 4;
        this.colorBuffer.numItems = colors.length;

       	this.indexBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), gl.STATIC_DRAW);

       




	}




}




function Camera(pos,rot,fov){

	this.gotHit = false;
	this.gotHitPunish = 0;
	this.fireBullet = false;
	this.position = new point3d(0,0,0);//new point3d(-10,-40,20);
	this.rotation = new point3d(0,0,0)
	this.fov = Math.PI/2;
	this.stepsSinceBullet = 10;
	this.vel = new point3d(0,0,0);
	if(pos != undefined){
		this.position = pos;
		this.rotation = rot;
		this.fov = fov;
	}
	this.forward = function(){
		//return new point3d(-Math.cos(Math.PI/2-this.rotation.z)*Math.sin(this.rotation.x),Math.sin(Math.PI/2-this.rotation.z)*Math.sin(this.rotation.x),Math.sin(-Math.PI/2+this.rotation.x));
		return new point3d(Math.sin(Math.PI/2-this.rotation.x)*Math.sin(this.rotation.z),Math.sin(Math.PI/2-this.rotation.z)*Math.sin(this.rotation.x),-Math.cos(this.rotation.x)*Math.cos(this.rotation.z));
		
	}
	this.left = function(){
		//return new point3d(-Math.cos(-this.rotation.z)+Math.sin(this.rotation.x),0,Math.sin(-this.rotation.z)+Math.sin(this.rotation.x));
		return new point3d(-Math.sin(Math.PI/2-this.rotation.x)*Math.sin(this.rotation.z + Math.PI/2),Math.sin(Math.PI-this.rotation.z)*Math.sin(this.rotation.x),Math.cos(this.rotation.x)*Math.cos(this.rotation.z + Math.PI/2));

	}
	this.up = function(){
		//return new point3d(-Math.cos(Math.PI/2-this.rotation.z)*Math.cos(Math.PI/2-this.rotation.x),Math.sin(Math.PI/2-this.rotation.z)*Math.sin(Math.PI/2-this.rotation.x),Math.sin(this.rotation.x));
		return new point3d(Math.sin(Math.PI-this.rotation.x)*Math.sin(this.rotation.z),Math.sin(Math.PI/2-this.rotation.z)*Math.sin(Math.PI/2+ this.rotation.x),-Math.cos(Math.PI/2+this.rotation.x)*Math.cos(this.rotation.z));

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
	
	this.vel = new point3d(0,0,0)
	this.rotVel = new point3d(0,0,0)
	this.rotWay = 1;
	this.doMovement = function(camera){
		var dC = new Date();
		var dt = dC-this.prevTime

		var rotSp =5
		var movement = new point3d(0,0,0)
		if(this.keysDown.indexOf("Q") > -1){
			//camera.position.z+=10;
			movement.z++;

		}
		if(this.keysDown.indexOf("E") > -1){
			//camera.position.z-=10;
			movement.z--;

		}

		if(this.keysDown.indexOf("W") > -1){
			//camera.position.y+=10;
			movement.y++;

		}

		if(this.keysDown.indexOf("S") > -1){
			//camera.position.y-=10;
			movement.y--;
		}
		if(this.keysDown.indexOf("A") > -1){
			//camera.position.x+=10;
			movement.x++;
		}
		if(this.keysDown.indexOf("D") > -1){
			//camera.position.x-=10;
			movement.x--;
		}
		var prevRot = camera.rotation.copyScale(1);
		if(this.keysDown.indexOf("&") > -1){
			camera.rotation.x+=.05*rotSp;
			
		}
		if(this.keysDown.indexOf("(") > -1){
			camera.rotation.x-=.05*rotSp;
			
		}
		if(this.keysDown.indexOf("%") > -1){
			camera.rotation.z-=.05*rotSp * this.rotWay;
			
		}
		if(this.keysDown.indexOf("'") > -1){
			camera.rotation.z+=.05*rotSp * this.rotWay;
			
		}
		if(this.keysDown.indexOf(" ") > -1 && camera.stepsSinceBullet > 10){
			camera.fireBullet = true;
		}
		this.rotVel.add( camera.rotation.vectorTo(prevRot));

		//console.log(this.keysDown)

		movement.normalize();
		var speed = -.8

		var forward = camera.forward();
		var left = camera.left();
		var up = camera.up();

		var deltaf = forward//.scale(movement.x)
		deltaf.scale(speed*movement.y/10)
		camera.position.add(deltaf);
		var deltal = left
		//console.log(up)
		deltal.scale(speed*movement.x/10)
		camera.position.add(deltal)
		var deltau = up
		deltau.scale(speed*movement.z/10)

		camera.position.add(deltau)
		deltaf.add(deltau)
		deltaf.add(deltal)
		deltaf.scale(1/10)
		var moveSpeed = 2;
		this.vel.add( deltaf )
		//console.log(this.vel)
		// this.vel.scale(1/deltaf.magnitude())
		camera.rotation = prevRot;
		//console.log(dt)
		camera.position.add(this.vel.copyScale(dt/30*moveSpeed))
		//camera.position.add(new point3d(movement.x,movement.z,movement.y).copyScale(dt/30))
		camera.vel =this.vel.copyScale(1000/30*moveSpeed)
		this.vel.scale(0)
		this.rotVel.cap(.04);
		camera.rotation.add(this.rotVel.copyScale(dt/30))
		this.rotVel.scale(0)
		this.prevTime = dC

		if(camera.rotation.x > Math.PI){
			this.rotWay = -1;
			camera.rotation.x = -Math.PI

		}
		if(camera.rotation.x > 0 && this.rotWay == -1){
			this.rotWay = 1;
			
		}

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
