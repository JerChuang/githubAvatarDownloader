//Including request and fs module
var request = require('request');
var fs = require('fs');
//Including token from secret file
var TOKEN = require('./secret.js');
//Requireing user input
var userInput = process.argv.slice(2);




//Function that sends request to api.github.com and calls a callback function
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'Token' + TOKEN.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByURL(url, filePath) {
// for a given url, download the file to filePath
request.get(url)
       .on('error', function (err) {                                   
        console.log("Errors:", err);
       })
       .pipe(fs.createWriteStream(filePath)); 
}
//Making sure the user inputs 2 parameters
if (userInput.length === 2) {
//Invoking getRepoContributors, with a call back function that parse the JSON string, then use donwloadImagebyURL to download to filepath
  getRepoContributors(userInput[0], userInput[1], function(err, result) {
      //In case of errors
      if (err){
        console.log("Errors:", err);
      };
      // parse JSON string
      let object = JSON.parse(result);
      // loop over the result
      // create file path with element.login
      // pass avatar_url and file path to downloadImageByURL
      object.forEach((element) => downloadImageByURL(element.avatar_url, "avatars/" + element.login +".jpg"));
    });
} else {
    console.log("Please enter the repo owner followed by repo name (e.g. RepoOwner RepoName)");
}

  
 
