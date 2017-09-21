const nock = require('nock');
const chalk = require('chalk');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const ora = require('ora');

const expect = chai.expect;

chai.use(sinonChai);

const convertBTC = require('../src/ConvertBTC.js');

describe('ConvertBTC', () => {
  // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
  let consoleStub;
  const responseMock = {
    success: true,
    time: '2017-09-21 17:55:29',
    price: 3682.81,
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  it('should use currency USD and 1 as amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({
        from: 'BTC',
        to: 'USD',
        amount: 1,
      })
      .reply(200, responseMock);

    convertBTC();
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('USD')} = ${chalk.green(3682.81)}`);
      done();
    }, 300);
  });

  it('should use currency USD and 10 as amount', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({
        from: 'BTC',
        to: 'USD',
        amount: 10,
      })
      .reply(200, responseMock);

    convertBTC('USD', '10');
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.red(10)} BTC to ${chalk.cyan('USD')} = ${chalk.green(3682.81)}`);
      done();
    }, 300);
  });

  it('should use currency BRL and 1 as amount (default)', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({
        from: 'BTC',
        to: 'BRL',
        amount: 1,
      })
      .reply(200, responseMock);

    convertBTC('BRL');
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.green(3682.81)}`);
      done();
    }, 300);
  });

  it('should message user when api reply with error', (done) => {
    nock('https://apiv2.bitcoinaverage.com')
      .get('/convert/global')
      .query({
        from: 'BTC',
        to: 'BRL',
        amount: 1,
      })
      .replyWithError('ERROR');

    convertBTC('BRL');
    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith(chalk.red('Something weet wrong in the API. Try in a few minutes.'));
      done();
    }, 300);
  });
});
