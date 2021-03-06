var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = (function(){
    return{
        show: function(req, res){
            Customer.find({}, function(err, results){
                if(err){
                    console.log(err);
                } else{
                    res.json(results);
                }
            });
        },
        create: function(req, res){
            var newCust = new Customer({name: req.body.name, date: req.body.date});
            newCust.save(function(err, results){
                if(err && (11000 === err.code || 11001 === err.code)){
                    Customer.find({}, function(err, results){
                        if(err){
                            console.log(err);
                        } else{
                            res.json({error: 'Customer already exists!', results: results});
                        }
                    });
//                    res.json({error: 'Customer already exists!'});
                } else{
                    Customer.find({}, function(err, results){
                        if(err){
                            console.log(err);
                        } else{
                            res.json({results: results});
                        }
                    });
                }
            });
        },
        destroy: function(req, res){
            Customer.remove({_id: req.body.id}, function(err, results){
                if(err){
                    console.log(err);
                } else{
                    Customer.find({}, function(err, results){
                        if(err){
                            console.log(err);
                        } else{
                            res.json(results);
                        }
                    });
                }
            });
        },
        exists: function(req, res){
            Customer.find({name: req.body.name}, function(err, results){
                if(err){
                    Customer
                }
            })
        }
    }
})();