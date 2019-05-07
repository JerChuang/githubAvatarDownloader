var request = require('request');
var TOKEN = require('./secret.js');
function getRepoContributors(repoOwner, repoName, cb) {

    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        
        headers: {
          'User-Agent': 'request',
          'Authorization': 'Token '+ TOKEN.GITHUB_TOKEN
        }
      };
    
    request(options, function(err, res, body) {
      cb(err, body);
    });
  }

  getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Welcome to the GitHub Avatar Downloader!")
    if (err){
    console.log("Errors:", err);
    };
    // parse JSON string
    let object = JSON.parse(result);
    // loop over the result
    // console.log the avatarURL
    object.forEach((element) => console.log(element.avatar_url));


  });