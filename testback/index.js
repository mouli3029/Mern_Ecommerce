const express = require('express');
const app = express();

const port = 8000;

app.get('/',(req,res)=>{
    return res.send('You are visiting a login route');
});

app.get('/signup',(req,res)=>{
    return res.send('You are visiting a signup route');
});
app.listen(port,()=>{
    console.log('Server is up and running...');
})


/* 
app.get('/', (req, res) => {
    res.send('Hello World!')
  });
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}) */