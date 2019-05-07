var request = require('request');
var fs = require('fs');
var TOKEN = require('./secret.js');
var userInput = process.argv.slice(2);

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

  
 
