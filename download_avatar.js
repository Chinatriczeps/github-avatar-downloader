var request = require('request');
var secrets = require('./secrets.js');


console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb){
	var options = {
	url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
	headers: {
		'User-Agent': 'request',
		'code': 'token' + secrets.GITHUB_TOKEN
	   }
	};

	request(options, function(err, res, body){
		var parsedBody = JSON.parse(body);
		parsedBody.forEach(function(element){
			cb(err, element);
		})
		
	});
};

	


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log(result.avatar_url);
  // console.log("Errors:", err);
  // console.log("Result:", result);
});