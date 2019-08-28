(function() {
  'use strict';
  var algorithm, crypto, decrypt, encrypt, iv, key, setPassword;

  crypto = require('crypto');

  algorithm = 'aes-256-ctr';

  key = Buffer.alloc(32);

  iv = Buffer.alloc(16, 0);

  setPassword = function(password) {
    return key = Buffer.concat([Buffer.from(password)], key.length);
  };

  encrypt = function(text) {
    return new Promise(function(resolve, reject) {
      var cipher, encrypted;
      cipher = crypto.createCipheriv(algorithm, key, iv);
      encrypted = '';
      cipher.on('readable', function() {
        var chunk, results;
        chunk = null;
        results = [];
        while (null !== (chunk = cipher.read())) {
          results.push(encrypted += chunk.toString('hex'));
        }
        return results;
      });
      cipher.on('end', function() {
        return resolve(encrypted);
      });
      cipher.write(text);
      return cipher.end();
    });
  };

  decrypt = function(text) {
    return new Promise(function(resolve, reject) {
      var decipher, encrypted;
      decipher = crypto.createDecipheriv(algorithm, key, iv);
      encrypted = '';
      decipher.on('readable', function() {
        var chunk, results;
        chunk = null;
        results = [];
        while (null !== (chunk = decipher.read())) {
          results.push(encrypted += chunk.toString('utf8'));
        }
        return results;
      });
      decipher.on('end', function() {
        return resolve(encrypted);
      });
      decipher.write(text, 'hex');
      return decipher.end();
    });
  };

  module.exports = {
    setPassword: setPassword,
    encrypt: encrypt,
    decrypt: decrypt
  };

}).call(this);

//# sourceMappingURL=index.js.map
