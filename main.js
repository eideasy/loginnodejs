//!!!!!!!!!!!!!!! Following variables need changing !!!!!!!!!!!!!!!!!!!!!!
var clientId = 'here_put_your_public_key';
var clientSecret = 'here_put_your_secret_key';
var redirect_uri = "http://mydomen.ee/samplescript";
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var express = require('express')
  , app = express()
  , request = require('request')

var oauth2 = require('simple-oauth2')({
    clientID: clientId,
    clientSecret: clientSecret,
    site: 'https://id.smartid.ee',
    tokenPath: '/oauth/access_token',
    authorizationPath: '/oauth/authorize'
});

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
    redirect_uri: redirect_uri
});


//Make it possible to show the image
app.use(express.static('public'));


// Initial page redirecting to Smart ID 
app.get('/auth', function (req, res) {

});

// Callback service parsing the authorization token and asking for the access token
app.get('/', function (req, res) {
    var code = req.query.code;
    var login = req.query.login;
    console.log(code + ", " + login);
    if (typeof code === 'undefined' && typeof login !== 'undefined') {
        res.redirect(authorization_uri);
        return;
    } else if (typeof code !== 'undefined') {
        oauth2.authCode.getToken({
            code: code,
            redirect_uri: redirect_uri
        }, saveToken);
    } else {
        var url = req.protocol + '://' + req.get('host')
        var pageHtml = '<strong>Click the image below to start login</strong><br>'
                + '<a href="?login=true"><img src="'+url+'/eidas.jpg"></img></a>';
        res.send(pageHtml);
    }


    function saveToken(error, result) {
        if (error) {
            console.log('Access Token Error', error.message);
        }
        console.log("Saving token");
        token = oauth2.accessToken.create(result);
        request({
            url: 'https://id.smartid.ee/api/v2/user_data',
            headers: {
                "Authorization": "Bearer " + token.token.access_token
            }

        }, function (err, userResult) {
            console.log("Got result");
            console.log(userResult.body);
            res.send(userResult.body);
        });
    }

});

var port = 3000;
app.listen(port);

console.log('Express server started on port ' + port);
