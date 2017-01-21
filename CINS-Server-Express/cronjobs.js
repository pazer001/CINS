var fetch = require('node-fetch');
var fs = require('fs');
var YouTube = require('youtube-node');

const YOUTUBE_KEY   =   `AIzaSyAxnEEv4XhBz25KyiGRnb8BGOCFi9_dDV8`;

class Cronjobs {
    getYoutube(topic) {
        var youTube = new YouTube();
        youTube.setKey(YOUTUBE_KEY);
        youTube.search(topic, 10, function(error, result) {
            if (error) console.log(error);
            fs.writeFileSync('test.json', JSON.stringify(result));
        });
    }
}

const cronjobs  =   new Cronjobs();
cronjobs.getYoutube('PHP');