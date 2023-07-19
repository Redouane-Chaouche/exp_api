const express = require('express');
const app = express();  
let PORT=4000;
app.use(express.json());
app.get('/',async(req,res) => {
    res.json({
        msg:"hello im the new app from redouane chaouche"
    })
});
app.get("/api",async(req,res) => {
    res.json({
        msg:'im the api'
    })
})

app.listen(PORT,() => { console.log(`http://localhost:${PORT || 4000}`) });