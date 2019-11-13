const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uri = "mongodb+srv://mjwaied:sob7analla@cluster0-peou0.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
});

let ProductSchema = new Schema({
    name:{unique:true, type:String,required:true},
    type:{type:String,enum:['book','CD','cd','book'],required:true},
    loanPeriod:Number,
    quantity:{type:Number,default:1}
})



console.log('Connected to the database (mongoose)')

module.exports = mongoose.model('Product', ProductSchema);