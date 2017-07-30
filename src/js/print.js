console.log('print.js has been loaded');
export default function printMe() {
	var elPr = document.createElement('p');
	elPr.innerText = 'this para is added by print.js';
	document.getElementById('div2').appendChild(elPr);
}