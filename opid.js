
var uuid = require('node-uuid');

var sessionIdGen = function() {
  return uuid.v1().substring(24);
};

// Creates a new session
module.exports = function(session) {

  var client = (session && session.id) || sessionIdGen();

  var opt = {
    // we can't assume that client id is uuid compatible
    // but we can attempt to uuid.parse('00000000-0000-0000-0000-' + client) and use the trailing bytes
    node: [0x00,0x00,0x00,0x00,0x00,0x00],
    clockseq: 0,
    clockseqLimit: 1 * 16 * 16 * 16 * 16
  };

  var op = this.op = function() {
    if (opt.clockseq === opt.clockseqLimit) {
      throw new Error('Reached max operation count per session');
    }
    return opt.clockseq++;
  };

  var tick = function() {
    if (opt.clockseq === opt.clockseqLimit) {
      throw new Error('Reached max operation count per session');
    }
    var u = uuid.v1(opt);
    op();
    return u;
  };

  this.woot = function() {
    var uuid = tick();
    return (uuid.substring(19,23) + '-' + client);
  };

};
