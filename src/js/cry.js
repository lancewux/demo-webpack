export default function cry() {
	var elPr = document.createElement('p');
	elPr.innerText = 'this para is added by cry.js';
	document.getElementById('div2').appendChild(elPr);
}