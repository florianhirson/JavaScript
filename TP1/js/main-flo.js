function slideNext(){
	var tmp = lien[0];
    for(var n=0;n<lien.length-1;n++){
        lien[n]=lien[n+1];    
    }
	lien[lien.length-1]=tmp;

	html=lien[0]+"\n"+lien[1]+"\n"+lien[2];
	document.getElementById('slideshow').innerHTML=html;
	return setTimeout(slideNext, 2000);
}

function slidePrev(){
    clearTimout(stop);
	var tmp = lien[lien.length-1];
    for(var p = lien.length-1;p>0;p--){
	   lien[p]=lien[p-1];
    }
	lien[0]=tmp;

	html=lien[0]+"\n"+lien[1]+"\n"+lien[2];
	document.getElementById('slideshow').innerHTML=html;
	return setTimeout(slidePrev, 2000);
}

var html = document.getElementById('slideshow').innerHTML;
var final=html.split('</span>');

html = "";
var lien=[];
for(var i = 0; i < final.length-1;i++){
	lien[i]='<a href="'+final[i].replace('<span>','')+'">'+final[i].replace('<span>','<img src="'+final[i].replace('<span>','')+'"')+"/></a>";
    console.log(lien[i]);
    html += lien[i];
}
console.log(lien[0],"\n---------------\n",html);
document.getElementById('slideshow').innerHTML=html;

var stop = slideNext();

