let http = require('http');
const log4js = require('./log4js');
const emailjs = require('./email');
const  logger = log4js.logger_domains;

let domains = "www.taofenq.com,1.taofenquan11.com,www.baidu.com,c.com,d.com,e.com";
let lastDomains = domains.split(",");
logger.info('Start Scanner...');
let scannerInterval = setInterval(function(){
    scanner(lastDomains[0]);
},5000);
function scanner(domain){
    //console.log("检查域名:" + domain + "," + lastDomains.indexOf(domain));
    let options = {
        hostname: '1.taofenquan11.com',
        port: '80',
        path: '/api/?token=50fe08567f49300279e7b22466bfc31d&url=http://'+domain,
        timeout: 1500
    };
    const req = http.request(options, (res) => {
        let serverData = "";
        res.on('data',(chunk) => {
            serverData += chunk;
        });
        res.on('end',() => {
            parseApiResult(serverData,domain);
        });
    });
    req.on('timeout', (res) => {
        logger.error('Connect timeout from:'+options.hostname);
    });
    req.on('error', (e) => {
        logger.error(e.name + ',message:'+ e.message);
    });
    req.end();
}
function parseApiResult(serverData,domain){
    try{
        //console.log(serverData);
        var result = JSON.parse(serverData);
    }catch(e){
        logger.error(e.name + ":JSON parse error at domains.parseApiResult,message:" + e.message);
        return;
    }
    if(result.code=='201'){
       let index =  lastDomains.indexOf(domain);
       if(index>-1){
           lastDomains.splice( index,1);
           logger.info('remove : '+ domain  + ', as the domain is banned.');
       }
       if(lastDomains.length == 0){
           clearInterval(scannerInterval);
           logger.info('All domains is banned, stop scanning.');
       }
       let total = domains.split(',').length;
       if(lastDomains.length <= total / 2 ){
           let message = '域名:'+ domain + '已被封，当前域名列表被封过半；当前域名情况：活跃：' + lastDomains.length + ',共:' + total;
           emailjs.sendEmail('crelife@sina.com','域名列表被封过半警示',message);
       }
    }else if(result.code=='200'){
        lastDomains.push(lastDomains.shift());
    }else{
        logger.warn('API is not reliable,the code is :' + result.code);
    }
}
exports.lastDomains = lastDomains;
exports.domains = domains.split(",");