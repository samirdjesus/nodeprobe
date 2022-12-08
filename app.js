const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000

app.get('/api', (req,res)=>{
    res.json({
        mensaje: "Nodejs en jwt"
    });
});

app.post('/api/login', (req,res)=>{
    const user = {
        id: 1,
        nombre: "samirdejesus",
        email: "samirdejesus@gmail.com"
    };
    jwt.sign({user}, 'secretkey',{expiresIn: '32s'}, (err, token) => {
        res.json({
            token
        });
    });
    
});

app.post('/api/post', verifyToken, (req,res)=>{
   
    jwt.verify(req.token, 'secretkey', (error, authData) =>{
            if(error){
                res.sendStatus(403);
            }else{
                res.json({
                    mensaje: "post fue creado",
                    authData
                });
            }
    });
});

//Authorization: Bearer <token>
function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
  }else{
    res.sendStatus(403);

  }
}

app.listen(port, ()=>{
    console.log(`example app listen on ${port}`);
});