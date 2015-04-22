//Getting started comments on hello.js file
var Studio = require('../../compiled/core/studio'); //Studio namespace
var app = require('./app');
var driver = new Studio.Driver({
  initialize: function() {
    app.get('/user/:username', function*() {
      try{
        this.body = yield driver.send(this);
      }catch (err){
        this.body = 'Sorry, try again later => ' + err;
      }
    });
  },
  parser: function(ctx) {
    return {
      sender: 'expressDriver',
      receiver: 'helloActorFiltered',
      /* Now we are reading the username param and
      delivering to the actor as body*/
      body: ctx.params.username,
      headers: null
    };
  }
});