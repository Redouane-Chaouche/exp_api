const binance=require("binance-api-node").default;
require('dotenv').config()


const client= binance({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.SECRET_KRY,
})

const fun=async() => {
    let off=true;
    console.log("hello")
    const clean = client.ws.depth('ETHBTC', depth => {
        let prix=depth.bidDepth[0];
        if(prix?.price!=undefined){
            if(prix.price > 0.0635){
                console.log('------vendre votre node-----',prix.price)
                let sellord=async(pr) => {
                    await client.orderTest({
                        symbol: 'ETHBTC',
                        side: 'SELL',
                        quantity: '1',
                        price: pr,
                    }).then((data) => {
                        console.log("sell order ID:",data.orderId)
                    }).catch((err) => {
                        console.log('cant sell',{msg:err.message})
                    })
                }
                sellord(prix.price);
            }else if(prix.price < 0.063){
                console.log("------achter des node------",prix.price)
                let buyord=async(pr) => {
                    await client.orderTest({
                        symbol: 'ETHBTC',
                        side: 'BUY',
                        quantity: '1',
                        price: pr,
                    }).then((data) => {
                        console.log("buy order ID:",data.orderId)
                    }).catch((err) => {
                        console.log('cant buy',{msg:err.message})
                    })
                }
                buyord(prix.price);
            }else{
                console.log('----pase de order----',prix.price)
            }
        }
        
    })
    if(off===true){
        setTimeout(() => {
            clean();
        },20*1000);
    }
}
fun();


