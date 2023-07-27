const binance=require("binance-api-node").default;

const client= binance({
    apiKey: 'NRqx3aGZ8xvQy00FJkxKjrddHIbwOSpmkqnl06165rSPbkPjNHSOFr98ZyKWGPO1',
    apiSecret: 'NRqx3aGZ8xvQy00FJkxKjrddHIbwOSpmkqnl06165rSPbkPjNHSOFr98ZyKWGPO1',
})
/*const clean = client.ws.depth('ETHBTC', depth => {
    console.log("wsclient",depth)
})*/

const fun=async() => {
    let off=true;
    console.log("hello")
    /*const clean2 = await client.ws.marginUser(msg => {
        console.log(msg.balances)
    })*/
    const clean = client.ws.depth('ETHBTC', depth => {
        //console.log("wsclient",depth.bidDepth[0].price)
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
            //clean2();
        },20*1000);
    }
}
fun();




// After you're done
/*try{
    client.ws.depth('ETHBTC@1000ms', depth => {
        console.log("wsclient",depth)
    })
    
}catch{
    console.log("failled")
}*/

