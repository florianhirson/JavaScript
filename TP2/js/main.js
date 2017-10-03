function showDiv(event) {
	event.preventDefault();
	let apropos = document.querySelector('div.modal');
	apropos.style.display = "initial";

}

let apropos = {
	link: document.querySelector('.navbar-right a'),
	init: function(){
		this.link.addEventListener(
			'click',
			(event)=>{
				event.preventDefault();
				console.log('click Apropos !');
				showDiv(event);
			}
		);
	}
}

apropos.init();




