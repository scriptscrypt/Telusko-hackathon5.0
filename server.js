const express = require("express");
const app = express();
const User = require("./models/user")
const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const session = require('express-session') 


// const selectedUser = document.querySelector('input[name="userType"]:checked').value;
//console.log(selectedUser);

mongoose.connect('mongodb://0.0.0.0:27017/Dapp',{
    useNewUrlParser: true,
  }) 
.then(()=>{
    console.log("Connection to mongodb established")
})
.catch((err) => console.log(`No connection to DB${err}`))
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({extended: true}));
app.use(session({secret: 'notagoodsecret'}))

app.use(express.static(__dirname + '/frontend'));

//require Login
const requireLogin = (req,res,next) =>{
    if(!req.session.user_id){
        return res.redirect('/login')
        next();
    }
}
app.get('/', (req,res)=>{
    res.render('index')
})



//registration
app.get('/register', (req,res) =>{
    res.render('register')
})
app.post('/register', async (req,res)=>{
   const {password, username,} = req.body;
   const hash = await bcrypt.hash(password, 12);
  
   const user = new User({
    username, 
    password : hash,
    // userType
        
   })
   await user.save();
   req.session.user_id = user._id;
   console.log("In app post")
//    if(userType === 'cc'){
//     res.redirect('/ccDashboard')
//    }
//     else{
        res.redirect('/userDashboard')
    // }
})
//Login

app.get('/login', (req,res)=>{
    res.render('login')
})

app.post('/login', async (req,res)=>{
    const {username, password} = (req.body);
    const user1 = await User.findOne({username})
    const validPassword = await bcrypt.compare(password, user1.password)
    if(validPassword){
        req.session.user_id = user1._id;
    //     if(userType == 'cc'){
    //     res.redirect('/ccDashboard')
    //    }
    //     else{
            res.redirect('/userDashboard')
        // }
        //correct
    }
    else{
        //incorrect 
        // alert("Please Signup")
        res.redirect('/login');
       
    }
})
//user dashboard
app.get('/userDashboard', (req,res)=>{
    res.render('userDashboard')
})

//cc dashboard
app.get('/ccDashboard', (req,res)=>{
    res.render('ccDashboard')
})

//secret
app.get('/secret', requireLogin, (req,res) =>{
    if(! req.session.user_id == user._id){
        return res.redirect('/login')
    }
    else{
        res.render('secret');
}})


//logout 
app.post('/logout', (req,res)=>{
   
    req.session.destroy();    
    res.redirect('/login')

})

//middleware


app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})   