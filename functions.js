// ************************************************
// *                                              *
// *              RESIZE of IMAGE                 *
// *                                              *
// ************************************************

function img2res(inp, s) {
	let img = createGraphics(inp.width*s,inp.height*s);
	img.image(inp,0,0,img.width,img.height);
	return img;
}


// ************************************************
// *                                              *
// *            CHANEL MIXER of IMAGE             *
// *                                              *
// ************************************************

function img2rgb(inp, kr, kg, kb) {
	let img = createGraphics(inp.width,inp.height);
	img.image(inp,0,0);
	img.loadPixels();
	let a = [];
	for (let x = 0; x < img.width; x++) { a[x] = []; for (let y = 0; y < img.height; y++) {  let c = img.get(x,y);  a[x][y] = red(c)*kr + green(c)*kg + blue(c)*kb;  }	}
	return a;
}


// ************************************************
// *                                              *
// *                HSB of IMAGE                  *
// *                                              *
// ************************************************

function img2hsb(inp, mode) {
	let img = createGraphics(inp.width,inp.height);
	img.image(inp,0,0);
	img.loadPixels();
	let a = [];
	for (let x = 0; x < img.width; x++) { a[x] = []; for (let y = 0; y < img.height; y++) {  
		let c = img.get(x,y);  
		     if (mode == "h") a[x][y] = hue(c); 
		else if (mode == "s") a[x][y] = saturation(c); 
		else if (mode == "b") a[x][y] = brightness(c); 
		else if (mode == "l") a[x][y] = lightness(c); 
		else if (mode == "sb") a[x][y] = saturation(c) * brightness(c)/255 * 2.0; 
	}	}
	return a;
}


// ************************************************
// *                                              *
// *          EDGES DETECTION of ARRAY            *
// *                                              *
// ************************************************

function arr2edg(a) {	 let w = a.length;	let h = a[0].length;
										 
	let o = []; for (let x = 0; x < w; x++) { o[x] = []; for (let y = 0; y < h; y++) { o[x][y] = 0; } }
	
	let k1 = [[-1,  0,  1], [-2, 0, 2], [-1, 0, 1]];		 
	let k2 = [[-1, -2, -1], [ 0, 0, 0], [ 1, 2, 1]];
										 
	for (let x = 1; x < w-1; x++) {
    	for (let y = 1; y < h-1; y++) {
				
			let s1 = 0;  for (let sx = -1; sx <=1 ; sx++) {  for (let sy = -1; sy <=1; sy++) {  s1 += a[x+sx][y+sy]*k1[sx+1][sy+1];  }  }
			let s2 = 0;  for (let sx = -1; sx <=1 ; sx++) {  for (let sy = -1; sy <=1; sy++) {  s2 += a[x+sx][y+sy]*k2[sx+1][sy+1];  }  }
			o[x][y] = map(sqrt(s1*s1+s2*s2),0,1414,0,255);
			
		}
	}	
	
	return(o);

}


// ************************************************
// *                                              *
// *              MEDIAN of ARRAY                 *
// *                                              *
// ************************************************

function arr2med(a) { let w = a.length;	let h = a[0].length;

  let d = 1000;
	
	let xm = []; for (let x = 0; x < w; x++) { xm[x] = 0; }
	let ym = []; for (let y = 0; y < h; y++) { ym[y] = 0; }

  let s = 0;
										 
	for (let x = 0; x < w; x++) { for (let y = 0; y < h; y++) {  xm[x] += a[x][y]; s+=a[x][y];	}	}
	for (let y = 0; y < h; y++) { for (let x = 0; x < w; x++) {  ym[y] += a[x][y]; 	}	}
	
	let xl = 0; let xr = 0; let il = 0;	let ir = xm.length-1;
	let yu = 0; let yd = 0; let iu = 0;	let id = ym.length-1;
										 
	for (let i = 0; i < xm.length; i++) { if (il<ir) { if (xl<=xr+d) { xl += xm[il]; il++; } if (xl>=xr-d) { xr += xm[ir]; ir--; }	}  }
	for (let i = 0; i < ym.length; i++) { if (iu<id) { if (yu<=yd+d) { yu += ym[iu]; iu++; } if (yu>=yd-d) { yd += ym[id]; id--; }	}  }
	
	return([il,iu,xm,ym,s/xm.length/ym.length/255]);
	
}


// ************************************************
// *                                              *
// *               WEIGHT of ARRAY                *
// *                                              *
// ************************************************

function arr2bal(a) { let w = a.length;	let h = a[0].length;
	let sum = 0;
	for (let x = 0; x < w; x++) { for (let y = 0; y < h; y++) {  sum += a[x][y]; 	}	}
	sum = sum/(w*h*255);
	return(sum);
}


// ************************************************
// *                                              *
// *               ARRAY to IMAGE                 *
// *                                              *
// ************************************************

function arr2img(a) {	let w = a.length;	let h = a[0].length;
										 
	let img = createGraphics(w,h);
	img.loadPixels();
	for (let x = 0; x < w; x++) { for (let y = 0; y < h; y++) {  img.set(x,y,a[x][y]);  }  }
	img.updatePixels();
	return(img);
}