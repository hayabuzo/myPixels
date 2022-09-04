function mvis(p,f,c) {
	let k = color(0);
	p.strokeWeight(4);
	p.stroke(c).line(f[0]*ksize,f[1]*ksize,p.width/2,p.height/2);
	p.stroke(c).fill(c).circle(f[0]*ksize,f[1]*ksize,10);
	p.strokeWeight(1);
	p.stroke(k).line(f[0]*ksize,f[1]*ksize,p.width/2,p.height/2);
	p.stroke(k).fill(k).circle(f[0]*ksize,f[1]*ksize,10);
}

function hvis(p,f,c) {
	let l = f[2];
	let k = color(0);
	p.stroke(k); p.strokeWeight(4); for(let i=0; i<l.length-1; i++) { p.line(i*ksize,p.height-l[i]/255*ksize,(i+1)*ksize,p.height-l[i+1]/255*ksize);	}
	p.stroke(c); p.strokeWeight(2); for(let i=0; i<l.length-1; i++) { p.line(i*ksize,p.height-l[i]/255*ksize,(i+1)*ksize,p.height-l[i+1]/255*ksize);	}
}

function cvis(p,f,c) {
	p.push();
	p.strokeWeight(3);
	p.drawingContext.setLineDash([5, 15]);
	let w = f[0]*ksize < p.width /2 ? f[0]*ksize : (p.width -f[0]*ksize); 
	let h = f[1]*ksize < p.height/2 ? f[1]*ksize : (p.height-f[1]*ksize); 
  w -= 6; w *= 2;
  h -= 6; h *= 2;
	p.noFill().stroke(0).rectMode(CENTER).rect(f[0]*ksize+1,f[1]*ksize+1,w,h);
	p.noFill().stroke(c).rectMode(CENTER).rect(f[0]*ksize,  f[1]*ksize,  w,h);
	p.pop();
}

function bvis(p,f,c) {
	p.push();
	let x = f[0]*ksize;
	let y = f[1]*ksize;
	let w = x < p.width /2 ? x : p.width -x; 
	let h = y < p.height/2 ? y : p.height-y; 
	p.noStroke().fill(0,200).rectMode(CORNERS);
	p.rect(0,0,x-w,height);
	p.rect(x-w,0,x+w,y-h);
	p.rect(x+w,0,p.width,p.height);
	p.rect(x-w,y+h,x+w,p.height);
	p.pop();
}

function imgfrom(inp) {
	let img = createGraphics(inp.width,inp.height);
	img.image(inp,0,0);
	return img;
}
