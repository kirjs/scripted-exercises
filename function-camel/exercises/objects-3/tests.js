describe('variables', function (){
  it('create a variable, call it "year" and set to 2016 ', function (){
    expect(year).to.equal(2016);
  });
  it('create a variable, call it "name" and set to "Ashish" ', function (){
    expect(name).to.equal('Ashish');
  });
  it('create an array, call it "numbers", and put there numbers 1,2,3', function (){
    expect(numbers).to.deep.equal([1,2,3]);
  });
});

describe('Create an "add" function which takes 2 parameters and adds them', function (){
  it('add(2,2) should equal 4', function (){
    expect(add(2, 2)).to.equal(4);
  });
  it('add(10,0) should equal 10', function (){
    expect(add(2, 2)).to.equal(4);
  });
  it('add(10,1) should equal 11', function (){
    expect(add(2, 2)).to.equal(4);
  });
});

describe('Create a "subtract" function which takes 2 parameters and subtracts them', function (){
  it('subtract(4, 1) should equal 3', function (){
    expect(subtract(4, 1)).to.equal(3);
  });
  it('subtract(10, 0) should equal 3', function (){
    expect(subtract(10, 0)).to.equal(10);
  });
  it('subtract(10, 1) should equal 3', function (){
    expect(subtract(10, 1)).to.equal(9);
  });
});

describe('Create a function called "always3" which takes nothing and always returns 3', function (){
  it('always3() should equal 3', function (){
    expect(always3()).to.equal(3);
  });
  it('always3(4) should equal 3', function (){
    expect(always3(4)).to.equal(3);
  });
});

describe('Create a function called "max" which takes two numbers and returns the larger one', function (){
  it('max(1,2) should equal 2', function (){
    expect(max(1,2)).to.equal(2);
  });
  it('max(10,1) should equal 10', function (){
    expect(max(10, 1)).to.equal(10);
  });
  it('max(12,12) should equal 12', function (){
    expect(max(12,12)).to.equal(12);
  });
});