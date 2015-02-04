# apad: A Problem A Day
This application randomly generates uVa problem everyday from CP3 problem list via uHunt API.

[Demo](http://kenrick95.github.io/apad/)

## Note
* If connecting through HTTPS page, the connection to uHunt will be blocked by browser (although can be turned off) as uHunt is only served in HTTP connection. Please visit through non-HTTPS page.
* Using [seedrandom](https://github.com/davidbau/seedrandom), I was able to generate same "random" number with the same seed, which is the date (although I observed different "random" number at Chrome, will look into this later). 

## Credits
* [davidbau/seedrandom](https://github.com/davidbau/seedrandom) v2.3.11
* [jQuery](http://jquery.com/) v1.11.2
* [uHunt API](http://uhunt.felix-halim.net/api)
