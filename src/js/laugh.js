export default function laugh() {
	var elPr = document.createElement('p');
	elPr.innerText = 'this para is added by laugh.js';
	document.getElementById('div2').appendChild(elPr);
}