document.getElementById('reportBtn').addEventListener('click', ()=>{
	document.querySelector('.bg-modal').style.display='flex';
});

document.getElementById('purchaseBtn').addEventListener('click', ()=> {
	document.querySelector('.po-modal').style.display='flex';
});

document.getElementById('contactBtn').addEventListener('click', ()=> {
	document.querySelector('.contact-modal').style.display='flex';
});

document.querySelector('.close').addEventListener('click', function(){
	document.querySelector('.bg-modal').style.display='none';
});

document.querySelector('.close2').addEventListener('click', function(){
	document.querySelector('.po-modal').style.display='none';
});

document.querySelector('.close3').addEventListener('click', function(){
	document.querySelector('.contact-modal').style.display='none';
});