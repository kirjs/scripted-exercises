describe('Create a function called "min" which takes two numbers and returns the larger one', function (){
  it('min(1,2) should equal 2', function (){
    expect(min(1,2)).to.equal(1);
  });
  it('min(10,1) should equal 10', function (){
    expect(min(10, 1)).to.equal(1);
  });
  it('min(12,12) should equal 12', function (){
    expect(min(12,12)).to.equal(12);
  });
});



describe('Create a function called "isEven", which takes a number and returns true if the number is even (you may have to google how to do that)', function (){

  it('isEven(2) should equal true', function (){
    expect(isEven(2)).to.equal(true);
  });
  it('isEven(222) should equal true', function (){
    expect(isEven(222)).to.equal(true);
  });
  it('isEven(231) should equal true', function (){
    expect(isEven(231)).to.equal(false);
  });
  it('isEven(2) should equal true', function (){
    expect(isEven(1717)).to.equal(false);
  });


});


describe('Create a function called "numberName" which takes a number (less than 10) and returns the name for this number', function (){
  it('numberName(1) should equal "one"', function (){
    expect(numberName(1)).to.equal('one');
  });
  it('numberName(4) should equal "four"', function (){
    expect(numberName(4)).to.equal('four');
  });
  it('numberName(6) should equal "six"', function (){
    expect(numberName(6)).to.equal('six');
  });
  it('numberName(7) should equal "seven"', function (){
    expect(numberName(7)).to.equal('seven');
  });
  it('numberName(9) should equal "nine"', function (){
    expect(numberName(9)).to.equal('nine');
  });
});