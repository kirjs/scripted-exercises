describe('Objects', function (){
  it('Create an object called "phone"', function (){
    expect(typeof phone).to.equal('object');
  });

  it('Set phone "model" to "iphone"', function (){
    expect(phone.model).to.equal('iphone');
  });

  it('Set phone "version" to "s7"', function (){
    expect(phone.version).to.equal('s7');
  });

  it('Set phone "year" to 2016', function (){
    expect(phone.year).to.equal(2016);
  });

  it('Add a new "apps" property to the phone, make it an array.', function (){
    expect(phone.apps).to.be.instanceof(Array);
  });

  it('Add "facebook" to the array of phone apps', function (){
    expect(phone.apps).to.include('facebook');
  });

  it('Add "whatsup" to the array of phone apps', function (){
    expect(phone.apps).to.include('whatsup');
  });

  it('Add "instagram" to the array of phone apps', function (){
    expect(phone.apps).to.include('instagram');
  });

  it('Add a new "games" property to the phone, make it an array.', function (){
    expect(phone.games).to.be.instanceof(Array);
  });

  it('Add "angry birds" to the array of phone apps', function (){
    expect(phone.games).to.include('angry birds');
  });

  it('Add "candy crush" to the array of phone apps', function (){
    expect(phone.games).to.include('candy crush');
  });

  it('Add "screen" to the array of phone apps', function (){
    expect(phone.screen).to.be.instanceof(Object);
  });

  it('Add "size" property to the phone "screen", and set it to 6', function (){
    expect(phone.screen && phone.screen.size).to.equal(6);
  });

  it('Add "resolution" property to the phone "screen", and set it to 480', function (){
    expect(phone.screen && phone.screen.size).to.equal(480);
  });
});
