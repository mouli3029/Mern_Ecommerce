const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment:  braintree.Environment.Sandbox,
    merchantId:   'bp5n2hgdsdv249p6',
    publicKey:    'nzpqtjnjmrtv9m2x',
    privateKey:   'a2b93eaf484c95d74b90d829e02cf716'

});

exports.getToken = (req,res) => {
    gateway.clientToken.generate({}, function (err, response) {
        // pass clientToken to your front-end
        if(err){
            res.status(500).send(err)
        }
        else{
            res.send(response)
        }
      });
}

exports.processPayment = (req,res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
              res.status(500).json(err)
          }
          else{
              res.json(result)
          }
      });
}