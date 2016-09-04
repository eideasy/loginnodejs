# README #

This sample application is one of the easiest ways to get up and running with Smart-ID secure login service.

### How do I get set up? ###

For beginners only, sorry coders!

* Open terminal, login to your server 
* Upload the files from repository  with command
```
#!bash

git clone https://bitbucket.org/smartid/loginnodejs
```

* Go to https://api.smartid.ee and register your website http://mydomain.ee or https://mydomain.ee. Oauth redirect_uri must be http://mydomain.ee/loginnodejs or https://mydomain.ee/loginnodejs
* Open file mydomain.ee/loginnodejs/main.js and copy/paste the "OAuth clientId/secret" keys and write to redirectUri mydomain.ee/loginnodejs
```
#!bash

nano loginnodejs/main.js
```

* Start the nodejs process and open the application at mydomen.ee/ and click on eIDAS logo to start the login process!

### Who do I talk to? ###

* With all questions please turn to help@smartid.ee