const https = require('https');
const checksum_lib = require('../Paytm/checksum');
const config = require('../Paytm/config');

const PORT = process.env.PORT || 3000;
const version = process.env.VERSION;

const pay_now = async function (req, res, next) {
  const paymentDetails = {
    amount: req.body.amount,
    customerId: req.body.name,
    customerEmail: req.body.email,
    customerPhone: req.body.phone,
  };
  if (!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone) {
    res.status(400).send('Payment failed');
  } else {
    const params = {};
    params.MID = config.PaytmConfig.mid;
    params.WEBSITE = config.PaytmConfig.website;
    params.CHANNEL_ID = 'WEB';
    params.INDUSTRY_TYPE_ID = 'Retail';
    params.ORDER_ID = `TEST_${new Date().getTime()}`;
    params.CUST_ID = paymentDetails.customerId;
    params.TXN_AMOUNT = paymentDetails.amount;
    params.CALLBACK_URL = `http://localhost:${PORT}${version}/payment/callback`;
    params.EMAIL = paymentDetails.customerEmail;
    params.MOBILE_NO = paymentDetails.customerPhone;

    checksum_lib.genchecksum(params, config.PaytmConfig.key, (err, checksum) => {
      const txn_url = 'https://securegw-stage.paytm.in/theia/processTransaction'; // for staging
      // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
      let form_fields = '';
      for (const x in params) {
        form_fields += `<input type='hidden' name='${x}' value='${params[x]}' >`;
      }
      form_fields += `<input type='hidden' name='CHECKSUMHASH' value='${checksum}' >`;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="${txn_url}" name="f1">${form_fields}</form><script type="text/javascript">document.f1.submit();</script></body></html>`);
      res.end();
    });
  }
};

exports.paynow = pay_now;
