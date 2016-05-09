var suite = mocha.run();
suite.on('end', function (a){
  window.jsCamelHandleResult((this.total - this.failures) / this.total * 100);
});