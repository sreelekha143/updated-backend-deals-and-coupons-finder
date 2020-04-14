const express=require('express');
const bodyparser = require('body-parser')
const mongoose=require('mongoose');
const cors=require('cors');
//const config=require('config');
const app=express();
const user=require('./router/user');
app.use(bodyparser.json());

app.use('/user',user)
app.get('/',function(req,res){
    res.send('Hello from the server');
});

//Router connection
const itemRouter=require('./router/item.route');
const cartRouter=require('./router/cart.router');
const orderRouter=require('./router/order.router');


//mongoose connection
mongoose.connect('mongodb://localhost:27017/capgemini')
mongoose.connection.on("connected",()=>{
    console.log('connected to mongodb port 27017')
})
mongoose.connection.on('error',(error)=>{
    console.log(error)
})


app.use(cors());


app.use(express.json());
app.use('/sree',itemRouter);
app.use('/cart',cartRouter);
app.use('/api',orderRouter);


//For port connection
const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
