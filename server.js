
var express = require('express');
var path = require('path');
var fs = require('fs');
var mustacheExpress = require('mustache-express');
var dynamicJsonResume = require('json-resume-dynamic');
var app = express()

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'node_modules/json-resume-dynamic/static')));

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');


app.get('/', function(request, response) {
    var resumeJsonFile = fs.readFileSync(__dirname + "/my-resume.json", 'utf-8', function (err, data) {
    });

    var resume = dynamicJsonResume.getResumeWithExtras(resumeJsonFile);
	
	if (resume) {
		response.render(dynamicJsonResume.getTemplatePath('cv'), resume);
	}
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
	console.log("Listening on " + port);
});

