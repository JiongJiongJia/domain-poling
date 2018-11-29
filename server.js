let express = require('express');
let http = require('http');
let domain = require('./domains');
let app = express();
http.createServer(app).listen(8088);
app.get('/', (req,res) => {
    res.send('<h3>Welcome!</h3>');
});
app.get('/org',function(req,res){
    let len = domain.lastDomains.length;
    if(len > 0){
        if(len > 1){
            var domn = domain.lastDomains[Math.round(Math.random() * (len-1)) ];
        }else{
            domn = domain.lastDomains[0];
        }
    }else{
        domn = domain.domains[0];
    }
    res.send(domn);
});

app.get('/status',function(req,res){
    res.send("<h3>current/total:"+ domain.lastDomains.length + "/" + domain.domains.length +"</h3><p>update:"+ new Date().toUTCString() +"</p>");
});
