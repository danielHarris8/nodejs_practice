
var linebot = require('linebot');
var getWeather =  require('./getWeather');

var bot = linebot({
  channelId: '',
  channelSecret: '',
  channelAccessToken: ''
});


var isInputCorrect = (str) =>{
    let location = ["臺北市","新北市","桃園市","臺中市","臺南市","高雄市","基隆市","新竹市","嘉義市","新竹縣","苗栗縣","彰化縣","南投縣","雲林縣","嘉義縣","屏東縣","宜蘭縣","花蓮縣","臺東縣","澎湖縣","金門縣","連江縣"]
    for(let i =0 ; i< location.length; i++){
        if(str===location[i])
            return location[i]
    }
    return null;
    
}

// 當有人傳送訊息給Bot時
bot.on('message', async (event) => {
    // event.message.text是使用者傳給bot的訊息
    let str =  event.message.text
    
    if(isInputCorrect(str)){
        var search = isInputCorrect(str);
        console.log(search);
        const url =`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-4F688308-AB0B-40C3-9756-CB57A6FE576C&locationName=${search}`
        const encodedURI = encodeURI(url);
        await getWeather(encodedURI,(err , value)=>{
            if(err) throw err;
            var response = search+' 今天天氣'+ '\n'+value.Wx.parameterName +' '+ value.CI.parameterName +'\n下雨機率'+value.PoP.parameterName+'%\n最高溫'+value.MaxT.parameterName+' °C \n最低溫'+ value.MinT.parameterName+' °C';
            console.log(response);
            // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者
            event.reply(response).then(function (data) {
                // 當訊息成功回傳後的處理

                // console.log(event.message);
            }).catch(function (error) {
                // 當訊息回傳失敗後的處理
            });
        })
    }
    
    // 準備要回傳的內容
    var replyMsg = `Hello你剛才說的是:${event.message.text}`;
    
    
    
});

// Bot所監聽的webhook路徑與port
bot.listen('/linewebhook', 3000, function () {
    console.log('[BOT已準備就緒]');
});
