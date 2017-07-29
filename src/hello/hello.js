console.log('hello.js has been loaded');
var elPara = document.createElement('p');
elPara.innerText = 'para created by hello.js';
document.body.appendChild(elPara);
export default function logMe() {
	console.log('I get called from log.js');
}