const { ComputerVisionClient } = require("@azure/cognitiveservices-computervision");
const { CognitiveServicesCredentials } = require("@azure/ms-rest-azure-js");

const computerVisionKey = '76e6fdbd3db84e93adf1c5d8b5b5d86f';//process.env["computerVisionKey"] || "<computerVisionKey>";
const computerVisionEndPoint = 'https://computervision-api-letc.cognitiveservices.azure.com/';
    //process.env["computerVisionEndPoint"] || "<computerVisionEndPoint>";
const cognitiveServiceCredentials = new CognitiveServicesCredentials(computerVisionKey);
const client = new ComputerVisionClient(cognitiveServiceCredentials, computerVisionEndPoint);

window.describeImage = (file) => {
    console.log(file);
    //const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Ba3-pH1Wp-3bmDAb9PUozHHYrtopkqMOSQ&usqp=CAU";
    const options = {
        maxCandidates: 1,
        language: "en"
    };
    new Promise((resolve, reject) => {
        client.describeImage(file, options)
        .then((result) => {
            //console.log(result.captions[0].text);
            resolve(result);
        })
        .catch((err) => {
            //console.error(err);
            reject(err);
        });
    })
}