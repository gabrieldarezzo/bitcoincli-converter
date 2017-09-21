const expect = require('chai').expect;

const exec = require('child_process').exec;
const btcConverter = 'node.exe ./src/main.js';
const pkg = require('../package.json');

describe('Main CLI', () => {
  it('should return version of bitcoincli-converter', (done) => {
    exec(`${btcConverter} --version`, (err, stdOut, stdErr) => {
      if (err) {
        throw err;
      }

      expect(stdOut.replace('\n', '')).to.be.equal(pkg.version);

      done();
    });
  });


  it('should return description of bitcoincli-converter', (done) => {
    exec(`${btcConverter} --help`, (err, stdOut, stdErr) => {
      if (err) {
        throw err;
      }

      expect(stdOut.includes('bitcoin cli to any currency provider.')).to.be.true;

      done();
    });
  });

  it('should return currency option when btc-converter --help', (done) => {
    exec(`${btcConverter} --help`, (err, stdOut, stdErr) => {
      if (err) {
        throw err;
      }

      expect(stdOut.includes('--currency')).to.be.true;

      done();
    });
  });

  it('should return amount option when btc-converter --help', (done) => {
    exec(`${btcConverter} --help`, (err, stdOut, stdErr) => {
      if (err) {
        throw err;
      }

      expect(stdOut.includes('--amount')).to.be.true;

      done();
    });
  });
});
