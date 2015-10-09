var expect = require('chai').expect;

var OPID = require('../');

describe("OPID", function() {

  describe("configuration", function() {

    it("Is initialized with OPID(session)" , function() {
      expect(OPID).to.be.a('function');
    });

  });

  xdescribe("#uuid", function() {

    it("Increments the local clock", function() {
    });

    it("Is a variant of UUID v1", function() {

    });

    it("UUID v1 already identifies clients", function() {

    });

    it("Is a feature that ID contains a client's clock timestamp", function() {

    });

    it("Also contains the op", function() {

    });

    it("Validates that provided session id matches uuid requirements", function() {

    });

  });

  describe("#woot", function() {

    it("Increments the local clock", function() {
      var opid = new OPID({id: 'Xy1'});
      var w1 = opid.woot();
      expect(w1).to.be.a('string');
      var w2 = opid.woot();
      expect(w1).to.not.equal(w2);
      // the 8 is a remnant of uuid.v1()
      expect(w1).to.equal('8000-Xy1');
    });

    it("Returns ID sequence per client", function() {
      var opid = new OPID();
      expect(opid.woot()).to.match(/^[08]000-[0-9a-f]{12}$/);
      expect(opid.woot()).to.match(/^[08]001-[0-9a-f]{12}$/);
      expect(opid.woot()).to.match(/^[08]002-[0-9a-f]{12}$/);
    });

    xit("Uses the same ID as uuid (hence the use for instantiation)", function() {
      // .uuid not implemented
    });

    it("Varies on nothing but the local clock part", function() {
      var opid = new OPID();
      var match = new RegExp('^[08]00\\d-' + opid.woot().substring(5) + '$');
      expect(opid.woot()).to.match(match);
      expect(opid.woot()).to.match(match);
    });

  });

  describe("#op", function() {

    it("Increments the local clock", function() {
      var opid = new OPID();
      expect(opid.op()).to.equal(0);
      expect(opid.op()).to.equal(1);
    });

    it("Is only unique within a session", function() {
      var opid = new OPID({id: 'X'});
      expect(opid.op()).to.equal(0);
      expect(opid.woot()).to.match(/^[08]001-X$/);
      expect(opid.op()).to.equal(2);
      expect(opid.woot()).to.match(/^[08]003-X$/);
    });

  });

});
