function windowResized() { 	centerCanvas();	setpos(); }

function centerCanvas() {  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2); }

function setpos() {
	cnv.x = (windowWidth-width)/2; 
	cnv.y = (windowHeight-height)/2;
	let h = 50;
	
	text_open.position(cnv.x+20, cnv.y+h).size(270,26);
	h += 43;
	
	file_input.position(cnv.x+20, cnv.y+h).size(270,22);
	h += 25;
	
	text_chan.position(cnv.x+20, cnv.y+h).size(270,26);
	h += 43;
	
	chan_mode.position(cnv.x+20, cnv.y+h).size(270,22);
	h += 30;
	
	text_crop.position(cnv.x+20, cnv.y+h).size(270,26);
	h += 13;
	
	for (let i=1; i<options.length; i++) { 
		crop[i].position(cnv.x+80, cnv.y+h+i*30).size(210,27); crop[i].style("color", colors[i]); 
		hist[i].position(cnv.x+50, cnv.y+h+i*30).size(040,27); hist[i].style("color", colors[i]); 
		mass[i].position(cnv.x+20, cnv.y+h+i*30).size(040,27); mass[i].style("color", colors[i]); 
	}	h += 150; 
	
	check_all  .position(cnv.x+20,     cnv.y+h).size(133,25);
	uncheck_all.position(cnv.x+20+136, cnv.y+h).size(133,25);
	h += 30;

	text_reso.position(cnv.x+20, cnv.y+h).size(132,26);
	resolution.position(cnv.x+20+135, cnv.y+h+15).size(135,25);
	h += 33;
	
	text_prev.position(cnv.x+20, cnv.y+h).size(132,26);
	preview.position(cnv.x+20+135, cnv.y+h+15).size(135,25);
	h += 43;
	
	text_info.position(cnv.x+20, cnv.y+h).size(270,26);                          	h += 30;
	info_l.position(cnv.x+20, cnv.y+h).size(270,26).style("color", colors[1]);   	h += 30;
	info_d.position(cnv.x+20, cnv.y+h).size(270,26).style("color", colors[2]);   	h += 30;
	info_s.position(cnv.x+20, cnv.y+h).size(270,26).style("color", colors[3]);   	h += 30;
	info_t.position(cnv.x+20, cnv.y+h).size(270,26).style("color", colors[4]);   	h += 30;
	h += 13;
	
	text_save.position(cnv.x+20, cnv.y+h).size(270,26);
	h += 44;
	
	crop_black.position(cnv.x+20, cnv.y+h).size(200,25);
	crop_button.position(cnv.x+20+135+70, cnv.y+h).size(65,25);
	h += 28;
	save_mode.position(cnv.x+20, cnv.y+h).size(200,25);
	save_button.position(cnv.x+20+135+70, cnv.y+h).size(65,25);
	
	
}

function setstyle(e,t="") {
	e.style('font-family: monospace; font-size: 14px; text-align: left; background-color: black; color: white');
	if (t=="txt") { e.style('background-color', cv); }
}

function checkAll() {
	for (let i=1; i<options.length; i++) { 
		crop[i].checked(true);
		hist[i].checked(true);
		mass[i].checked(true);
	} vis();
}

function uncheckAll() {
	for (let i=1; i<options.length; i++) { 
		crop[i].checked(false);
		hist[i].checked(false);
		mass[i].checked(false);
	} vis();
}

function getFileName(s) {	return s.split(".").slice(0,-1).join(""); }