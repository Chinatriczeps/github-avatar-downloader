var input1 = process.argv[2];
var input2 = process.argv[3];
var request = require('request');
var fs = require('fs');
var secrets = require('./secrets.js');


console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb){
	if( repoOwner === undefined || repoName === undefined){
		throw err;
	} 
	var options = {
	url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
	headers: {
		'User-Agent': 'request',
		'code': 'token' + secrets.GITHUB_TOKEN
	   }
	};

	request(options, function(err, res, body){
		var parsedBody = JSON.parse(body);
		cb(err, parsedBody);
	});
};

function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream(filePath));
}

getRepoContributors(input1, input2, function(err, result) {
  result.forEach(function(element){
	var url = element.avatar_url;
	var filePath = 'avatars/' + element.login + '.jpg';
	downloadImageByURL(url, filePath);
  })

});