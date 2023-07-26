const express = require('express');
const binance=require("binance-api-node").default;
const app = express();  
const PORT=4000;
app.use(express.json());
app.get('/',async(req,res) => 
    res.json({msg:"hello "})
});
app.get("/api",async(req,res) => {
    res.json({msg:"hello "})
})

app.get("/bin",async(req,res) => {
    const client= binance({
        apiKey: 'API_key',
        apiSecret: 'API_secret',
    })
    let is_connect=await client.ping();
    let server_time=await client.time();
    let price=await client.prices({"symbol":"ETHBTC"});

    res.json({is_connect,server_time,price});
})

app.listen(PORT,() => { console.log(`http://localhost:${PORT || 4000}`) });
