mocha.setup('bdd');
var expect = chai.expect;
window.jsCamelNotUpToDate = function (){
  var notUpToDate = document.getElementById('not-up-to-date');
  notUpToDate.innerHTML = '<h1>Something got broken, but this is how the result looked like last time when the code worked</h1>';
  notUpToDate.style.display = 'block';
};