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

describe('Create a function called "groceries" which takes nothing and always returns array any 3 grocery items', function (){
  it('groceries()', function (){
    expect(groceries().length).to.equal(3);
  });
  it('always3(4) should equal 3', function (){
    expect(always3(4)).to.equal(3);
  });
});
