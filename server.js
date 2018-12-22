var dns = require('dns');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.use(express.static(__dirname + '/dist'));


// Catch all other routes and return the index file
//app.get('/*', (req, res) => {
  //res.sendFile(path.join(__dirname, 'dist/index.html'));
//});


app.post('/dnslookups', function (req, res) {
  console.log('arr ip: ',req.body);
  var arr = req.body;

if(arr != undefined) {

  async function main () {
    return arr.map(async (item) => {
      item['fqdn'] = await reverseLookup(item.c_ip)
      return item;
    })
  }

  main()
  .then(v => Promise.all(v))
  .then(data =>  res.status(200).json(data))
  .catch(err => res.status(400).json({error: err}))

}else{
   res.status(400).json({body:req.body, error: 'The request body is malformed/missing!'})
}

})

const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
	console.log('Listening on port ' + port);
});


//reverseLookup('213.46.228.196');
//reverseLookup('83.150.38.202');
//reverseLookup('172.217.7.163');


function reverseLookup(ip) {
   return new Promise((resolve, reject) => {
      dns.reverse(ip,function(err,domains){
        if(err==null)	{
          domains.forEach(function(domain){
            dns.lookup(domain,function(err, address, family){
              console.log('domain',domain)
              resolve(domain)
            });
          });
        }else{
          console.log('err.hostname',err.hostname)
          resolve(err.hostname)
        }
      });
  })
}