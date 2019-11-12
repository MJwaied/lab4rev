var express = require('express');
var app = express();  

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var Product = require('./models/product.model.js');

const { check, validationResult } = require('express-validator');

// serve files in static' folder at root URL '/views'
app.use('/', express.static('./'));
app.use(urlencodedParser);



app.post('/', [
  check('name').isLength({ min: 2 }).trim().escape(),check('type').isLength({ min: 2 }).trim().escape(),
  check('loanPeriod').if(check('loanPeriod').exists({checkFalsy:true})).isNumeric().trim().escape()],function(req,res){
    
const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
    if(!req.body)
        return res.status(404).send('Not found');
    var product = new Product(req.body);
    
    product.save()
        .then(function(item){
            if(!item||item.length===0)
                return res.send(item);
            res.redirect('/'); 
        })
        .catch(function(err){
            return res.json(err);
        });
});

//should be put
app.post('/update',function(req,res,next){
      if(!req.body)
        return res.status(404).send('Not found');
    Product.findOneAndUpdate({'name':req.body.name},{"$set":{'quantity':req.body.quantity}},function(err){
        if(err)
            return next(err);
        res.redirect('/');
    });
    
});

app.post('/period',function(req,res,next){
      if(!req.body)
        return res.status(404).send('Not found');
   Product.findOneAndUpdate({'name':req.body.name},{"$set":{'loanPeriod':req.body.loanPeriod}},function(err){
        if(err)
            return next(err);
        res.redirect('/');
    });
});


app.post('/delete',function(req,res,next){
      if(!req.body)
        return res.status(404).send('Not found');
   Product.findOneAndDelete({'name':req.body.name},function(err){
        if(err)
            return next(err);
        res.redirect('/');
    });
});

app.get('/products',function(req,res,next){
   Product.find({},['name','type','loanPeriod','quantity','-_id'],function(err,products){
       if(err)
        return next(err);
    res.json(products);
   }); 
});

//Should be get
app.post('/product',function(req,res,next){
     Product.findOne({'name':req.body.name},['type','loanPeriod','quantity','-_id'],function(err,product){
       if(err)
        return next(err);
        res.json(product);
     });

});

app.listen(8080); // start server
