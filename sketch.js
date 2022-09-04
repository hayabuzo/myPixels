function addimg(file) {
  if (file.type === 'image') src = loadImage(file.data, src => { 
		fileName = getFileName(file.name);
		calculate();
	});
}

function sleep(millisecondsDuration) {  return new Promise((resolve) => { 
	push(); rectMode(CENTER);
	//fill(50).stroke(200).rect(width-20-350,height/2,100,100);
	//textStyle(BOLDITALIC);
	noFill().stroke(200).textSize(70).textAlign(CENTER,CENTER).text("⌛",width-20-350,height/2);
	setTimeout(resolve, millisecondsDuration);  
	pop();
}) }

function drawLogo() {
  push(); textAlign(LEFT,TOP); textStyle(BOLDITALIC); textSize(35).stroke(150).noFill().text('myPixels',20,20); pop();
}

function setup() { 
	
	extLoad = false;
	url = getURL().split("?img=")[1];
	if (getURL().split("?img=")[1]=="") fileName = "";
	else if (url!==undefined) { fileName = url; extLoad = true; }
	else fileName = "";
	if (extLoad) {
		src = loadImage(url, src => { 
		fileName = getFileName(file.name);
		calculate();
	});
	} else {
		src = createGraphics(700,700);	src.background(0);
	}
	
	firstCalc = true;
	
  canvas = createCanvas(1024, 740); 	cnv = {};
	background(50);
	
	vs = 700;
	vx = width - 20 - vs;
	vy = 20;
	
	drawLogo();
	fill(0).stroke(255).rect(vx,vy,vs,vs);
	
	cr = color(231, 76, 60);
	cg = color(23, 165, 137);
	cb = color(52, 152, 219);
	cy = color(241, 196, 15 );
	cv = color(108, 52, 131 );
	cw = color(255);
	
	options = ["Off","Lightness","Details","Saturation","Average"];
	colors = [0,cy,cg,cr,cw];
	
	file_input = createFileInput(addimg); 	
	setstyle(file_input);
	
	crop_black = createSelect();            
	setstyle(crop_black);    
	crop_black.id("c_black");
  for (let i in options) { crop_black.option(options[i]); }
	crop_black.selected(options[4]);
	crop_black.changed(vis);
	
	chanmodes = ["BW: 0.2126R + 0.7152G + 0.0722B","Grayscale: R/3 + G/3 + B/3", "HSB: Brightness", "HSL: Lightness"];
	chan_mode = createSelect();  
	setstyle(chan_mode);
  for (let i in chanmodes) { chan_mode.option(chanmodes[i]); }
	chan_mode.selected(options[0]);
	chan_mode.changed(calculate);
	
	check_all   = createButton('ⵙ check all');    check_all.mousePressed(checkAll);      setstyle(check_all);    check_all.style('text-align: center'); 
	uncheck_all = createButton('ⵔ uncheck all');  uncheck_all.mousePressed(uncheckAll);  setstyle(uncheck_all);  uncheck_all.style('text-align: center'); 
	
	preview = createSelect();            preview.id("prev");
	setstyle(preview);    
	preview.option("Original RGB");
  for (let i=1; i<options.length-1; i++) { preview.option(options[i]); }
	preview.selected("Original RGB");
	preview.changed(vis);
	
	resolution = createSelect();  	setstyle(resolution);
  for (let i=700; i>0; i-=100) { resolution.option(i); }
	resolution.selected("300");
	resolution.changed(calculate);
	
	save_mode = createSelect();  	setstyle(save_mode);
  save_mode.option("Preview");
  save_mode.option("Image");
	save_mode.selected("Image");
	
	crop_button   = createButton('Crop');    crop_button.mousePressed(showCrop);      setstyle(crop_button); 
	crop_button.style('text-align: center'); 
	
	save_button   = createButton('Save');    save_button.mousePressed(save_image);      setstyle(save_button); 
	save_button.style('text-align: center'); 
	

	text_reso  = createP(' ■ Resolution:');          setstyle(text_reso,"txt");
	text_chan  = createP(' ■ Lightness calculation mode:');          setstyle(text_chan,"txt");
	text_open  = createP(' ■ Open or drag and drop an image:');      setstyle(text_open,"txt");
	text_crop  = createP(' ■ Balance / Histogram / Crop');           setstyle(text_crop,"txt"); 
	text_prev  = createP(' ■ Preview Mode:');                        setstyle(text_prev,"txt"); 
	text_save  = createP(' ■ Processing:');                          setstyle(text_save,"txt"); 
	
	text_info  = createP(' Value         Amount    Balance ');    setstyle(text_info,"txt"); 
	
	info_l  = createP('');   info_l.id("infoL"); 	  setstyle(info_l); 
	info_d  = createP('');   info_d.id("infoD"); 	  setstyle(info_d); 
	info_s  = createP('');   info_s.id("infoS"); 	  setstyle(info_s); 
	info_t  = createP('');   info_t.id("infoT"); 	  setstyle(info_t); 
	
	

	crop = []; hist = [];	mass = [];
	for (let i=1; i<options.length; i++) { 
		crop[i] = createCheckbox(" "+options[i], true); crop[i].changed(vis); setstyle(crop[i]);
		hist[i] = createCheckbox(" ", true);            hist[i].changed(vis); setstyle(hist[i]); 
		mass[i] = createCheckbox(" ", true);            mass[i].changed(vis); setstyle(mass[i]);
	}
	
	setpos();
	
	centerCanvas();
  canvas.drop(addimg);
	
	del = 300;
  calculate();
	
}

async function calculate() {

	await sleep(del);
	del = 100;
	
	picsize = (!extLoad&&firstCalc)?10:resolution.value();
	ksize = 700/picsize;
	
	p = imgfrom(src);
	scl = picsize/(max(p.width,p.height));
	p = img2res(p,min(1.0,scl));
	
			 if (chan_mode.value() == chanmodes[0]) { a = img2rgb(p, 0.2126, 0.7152, 0.0722); }
	else if (chan_mode.value() == chanmodes[1]) { a = img2rgb(p, 0.3333, 0.3333, 0.3333); }
	else if (chan_mode.value() == chanmodes[2]) { a = img2hsb(p, "b"); }
	else if (chan_mode.value() == chanmodes[3]) { a = img2hsb(p, "l"); }
	
	l = arr2med(a);
	d = arr2med(arr2edg(a));
	s = arr2med(img2hsb(p, "sb"));
	t = [ (l[0]+d[0]+s[0])/3 , (l[1]+d[1]+s[1])/3 ];
	t[2] = []; for (let i in l[2]) { t[2][i] = (l[2][i]+d[2][i]+s[2][i])/3; }
	t[3] = []; for (let i in l[3]) { t[3][i] = (l[3][i]+d[3][i]+s[3][i])/3; }
	
	sels = [0,l,d,s,t];
	
	firstCalc = false;
	
	vis();

}

function draw() {	
}

function vis() {
	
	la = int(l[4]*1000)/10;                 la = nf(la,2,1);
	lb = int((l[0]/p.width-0.5)*1000)/10; 	lb = lb>=0?'+'+nf(lb,2,1):nf(lb,2,1);
	document.getElementById("infoL").innerHTML = (' Lightness     '+la+'%     '+lb+'%');
	
	da = int(d[4]*1000)/10;                 da = nf(da,2,1);
	db = int((d[0]/p.width-0.5)*1000)/10; 	db = db>=0?'+'+nf(db,2,1):nf(db,2,1);
	document.getElementById("infoD").innerHTML = (' Details       '+da+'%     '+db+'%');
	
	sa = int(s[4]*1000)/10;                 sa = nf(sa,2,1);
	sb = int((s[0]/p.width-0.5)*1000)/10; 	sb = sb>=0?'+'+nf(sb,2,1):nf(sb,2,1);
	document.getElementById("infoS").innerHTML = (' Saturation    '+sa+'%     '+sb+'%');
	
	tb = int((t[0]/p.width-0.5)*1000)/10; 	tb = tb>=0?'+'+nf(tb,2,1):nf(tb,2,1);
	document.getElementById("infoT").innerHTML = (' Average                 '+tb+'%');
	

	
	if (prev.selectedIndex==0) { v = imgfrom(src); scl = 700/(max(v.width,v.height)); 	v = img2res(v,min(1.0,scl)); }
	if (prev.selectedIndex==1) { v = arr2img(a);                v = img2res(v,ksize); }
	if (prev.selectedIndex==2) { v = arr2img(arr2edg(a));       v = img2res(v,ksize); }
	if (prev.selectedIndex==3) { v = arr2img(img2hsb(p, "sb")); v = img2res(v,ksize); }
	
	
	
	let g = c_black.selectedIndex;
	if (g != 0) bvis(v,sels[g],colors[g]); //
	
	mass[5] = 0
	for (let i=1; i<options.length; i++) { 
		if(crop[i].checked()) cvis(v,sels[i],colors[i]); 
		if(hist[i].checked()) hvis(v,sels[i],colors[i]);
		if(mass[i].checked()) { mvis(v,sels[i],colors[i]); mass[5]++; }
	}
	
	if (mass[5]>0) v.noStroke().fill(cb).circle(p.width/2*ksize,p.height/2*ksize,5)

	background(50);

  drawLogo();
	
	imageMode(CENTER);
	image(v,vx+vs/2,vy+vs/2);
	
	noFill().stroke(255).rect(vx,vy,vs,vs);
	

}

function save_image() {
	if (save_mode.value()=="Preview") {
		let txt = "";
		if(mass[1].checked()) txt+="L"+lb+" ";
		if(mass[2].checked()) txt+="D"+db+" ";
		if(mass[3].checked()) txt+="S"+sb+" ";
		if(mass[4].checked()) txt+="T"+tb+" ";
		save(v,txt+fileName,"jpg");
	}
	if (save_mode.value()=="Image") {
		cr = doCrop();
		save(cr,fileName+" Cropped","jpg");
		src = cr;
		calculate();
	}
}

function doCrop() {
	if (crop_black.value()!="Off") {
		let f = sels[c_black.selectedIndex];
		let k = 1.0/scl; 
		let w = f[0] < p.width /2 ? f[0] : p.width -f[0]; 
		let h = f[1] < p.height/2 ? f[1] : p.height-f[1]; 
		let cr = createGraphics(w*2*k*ksize,h*2*k*ksize);
		sx = -(f[0]-w)*k*ksize;
		sy = -(f[1]-h)*k*ksize;
		cr.image(src,sx,sy);
		crop_black.selected(options[0]);
		return cr;
	} else return src;
}

function showCrop() {
		src = doCrop();
		calculate();
}
