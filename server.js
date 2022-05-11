
var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var port = process.env.PORT || 4000;
const { ComputerVisionClient } = require("@azure/cognitiveservices-computervision");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");
var cors = require('cors')

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

const computerVisionKey = '76e6fdbd3db84e93adf1c5d8b5b5d86f';//process.env["computerVisionKey"] || "<computerVisionKey>";
const computerVisionEndPoint = 'https://computervision-api-letc.cognitiveservices.azure.com/';
    //process.env["computerVisionEndPoint"] || "<computerVisionEndPoint>";
const cognitiveServiceCredentials = new CognitiveServicesCredentials(computerVisionKey);
const client = new ComputerVisionClient(cognitiveServiceCredentials, computerVisionEndPoint);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/describe', async (req, res)=> {
    console.log(req.body);
    console.log(req.data);
    //const description = await describeImage(req.body.data)
})

http.listen(port, function() {
    console.log('listening on *: ' + port);
    //describeImage();
});

const describeImage = (file) => {
    //const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Ba3-pH1Wp-3bmDAb9PUozHHYrtopkqMOSQ&usqp=CAU";
    const options = {
        maxCandidates: 1,
        language: "en"
    };
    new Promise((resolve, reject) => {
        client.describeImage(file, options)
        .then((result) => {
            console.log(result.captions[0].text);
            resolve(result.captions[0].text);
        })
        .catch((err) => {
            console.error(err);
            reject(err);
        });
    })
}