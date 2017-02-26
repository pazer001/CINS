const pg            =   require('pg');
const moment        =   require('moment');
const TopicsModel   =   require('../../Models/TopicsModel');
const Logger        =   require('../../Utils/Logger');
const request       =   require('request');
const cheerio       =   require('cheerio');
const striptags     =   require('striptags');
const LanguageDetect    =   require('languagedetect');
const config        =   require('../../../config.json');
const C             =   require('./SubTopics/C');
const Cpp           =   require('./SubTopics/Cpp');
const React           =   require('./SubTopics/React');
const ReactNative           =   require('./SubTopics/ReactNative');
const ES6           =   require('./SubTopics/ES6');
const Angular           =   require('./SubTopics/Angular');

const GeneralArticles   =   require('./GeneralArticles');
const GeneralVideos   =   require('./GeneralVideos');

class Media {
    constructor() {
        this.pgClient   = new pg.Pool(config[process.env.NODE_ENV].PostgreSQL);
        this.pgClient.connect();
        this.subTopics  =   null;
        this.media      =   [];
    }
    async init() {
        this.subTopics  = this.subTopics || await TopicsModel.getAllTopics();

        try {
            //C
            console.log(`drdobbs...`); this.setMedia(await C.drdobbs());

            //C++
            console.log(`isocpp...`); this.setMedia(await Cpp.isocpp());
            console.log(`msdn...`); this.setMedia(await Cpp.msdn());
            console.log(`cppSoup...`); this.setMedia(await Cpp.cppSoup());
            console.log(`cppTruth...`); this.setMedia(await Cpp.cppTruth());
            console.log(`oldNewThing...`); this.setMedia(await Cpp.oldNewThing());
            console.log(`cppSource...`); this.setMedia(await Cpp.cppSource());
            console.log(`theViewFromAristeia...`); this.setMedia(await Cpp.theViewFromAristeia());
            console.log(`herbSutter...`); this.setMedia(await Cpp.herbSutter());
            console.log(`thinkingAsynchronouslyInCpp...`); this.setMedia(await Cpp.thinkingAsynchronouslyInCpp());
            console.log(`reddit...`); this.setMedia(await Cpp.reddit());
            console.log(`mrEdd...`); this.setMedia(await Cpp.mrEdd());
            console.log(`ramblingComments...`); this.setMedia(await Cpp.ramblingComments());
            console.log(`attractiveChaos...`); this.setMedia(await Cpp.attractiveChaos());
            console.log(`lightSleeper...`); this.setMedia(await Cpp.lightSleeper());
            console.log(`lightSleeper...`); this.setMedia(await Cpp.theFastwareProject());
            console.log(`theACCUOverloadJournals...`); this.setMedia(await Cpp.theACCUOverloadJournals());
            console.log(`learningCpp...`); this.setMedia(await Cpp.learningCpp());

            //React
            console.log(`reactjsNews...`); this.setMedia(await React.reactjsNews());
            console.log(`reactjsNewsIO...`); this.setMedia(await React.reactjsNewsIO());
            console.log(`reactjsNewsTwitter...`); this.setMedia(await React.reactjsNewsTwitter());
            console.log(`scotch...`); this.setMedia(await React.scotch());
            console.log(`codementor...`); this.setMedia(await React.codementor());
            console.log(`tutorialzine...`); this.setMedia(await React.tutorialzine());
            console.log(`thinkster...`); this.setMedia(await React.thinkster());
            console.log(`thebluecoder...`); this.setMedia(await React.thebluecoder());
            console.log(`hashbangweekly...`); this.setMedia(await React.hashbangweekly());
            console.log(`daveceddia...`); this.setMedia(await React.daveceddia());

            //React Native
            console.log(`facebook...`); this.setMedia(await ReactNative.facebook());
            console.log(`reactNativeNewsTwitter...`); this.setMedia(await ReactNative.reactNativeNewsTwitter());
            console.log(`facebookDocs...`); this.setMedia(await ReactNative.facebookDocs());
            console.log(`tutorialsPoint...`); this.setMedia(await ReactNative.tutorialsPoint());

            //ES6
            console.log(`es6Features...`); this.setMedia(await ES6.es6Features());
            console.log(`exploringjs...`); this.setMedia(await ES6.exploringjs());
            console.log(`babel...`); this.setMedia(await ES6.babel());
            console.log(`qnimate...`); this.setMedia(await ES6.qnimate());
            console.log(`nczOnline...`); this.setMedia(await ES6.nczOnline());
            console.log(`tutorialsPoint...`); this.setMedia(await ES6.tutorialsPoint());
            console.log(`mozilla...`); this.setMedia(await ES6.mozilla());
            console.log(`jsNext...`); this.setMedia(await ES6.jsNext());
            console.log(`youDontKnowJS...`); this.setMedia(await ES6.youDontKnowJS());

            //General Articles
            console.log(`medium...`); this.setMedia(await GeneralArticles.medium(this.subTopics));
            console.log(`techbeacon...`); this.setMedia(await GeneralArticles.techbeacon(this.subTopics));
            console.log(`infoq...`); this.setMedia(await GeneralArticles.infoq(this.subTopics));
            // console.log(`rayWenderlich...`); this.setMedia(await GeneralArticles.rayWenderlich(this.subTopics));
            console.log(`frontendEront...`); this.setMedia(await GeneralArticles.frontendEront(this.subTopics));
            console.log(`infoWorld...`); this.setMedia(await GeneralArticles.infoWorld(this.subTopics));

            //Angular
            console.log(`angular...`); this.setMedia(await Angular.angular());
            console.log(`angualrTwitter...`); this.setMedia(await Angular.angualrTwitter());
            console.log(`reddit...`); this.setMedia(await Angular.reddit());
            console.log(`blogspot...`); this.setMedia(await Angular.blogspot());
            console.log(`angularNews...`); this.setMedia(await Angular.angularNews());
            console.log(`tutorialsPoint...`); this.setMedia(await Angular.tutorialsPoint());
            console.log(`tutorialsPoint...`); this.setMedia(await Angular.thoughtram());

            //General Video
            console.log(`youtube...`); this.setMedia(await GeneralVideos.youtube());

        } catch (e) {
            console.log(e)
        }

    }

    setMedia(data) {
        for(let media of data) {
            this.insertMedia(media);
        }
    }

    insertMedia(media) {
        let data = [
            media.PublishedAt || moment().format(),
            striptags(media.Title),
            striptags(media.Description),
            media.ImageUrl || null,
            media.ImageWidth || null,
            media.ImageHeight || null,
            media.SubTopicsId,
            media.Source,
            media.Url,
            media.Type
        ];

        //Check for good parameters
        if(!media.Url || !media.Title) return;

        let lngDetector             =   new LanguageDetect(),
            languageDetect          =   lngDetector.detect(media.Title),
            languageDetectFilter    =   languageDetect.filter(languageDetail => languageDetail[0] === 'english');

        //Filter english characters
        if(!languageDetect || !languageDetectFilter || !languageDetectFilter[0] || !languageDetectFilter[0][1] > 0.1) return;


        const query = `INSERT INTO "CINS"."Media"
                                        ("PublishedAt", "Title", "Description", "ImageUrl", "ImageWidth", "ImageHeight", "SubTopicsId", "Source", "Url", "Type")
                                        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                                        ON CONFLICT ("Url") DO NOTHING`;

        this.pgClient.query(query, data, error => {
            if (error) Logger.toDB(JSON.stringify(error), query, JSON.stringify(data));
        });
    }
}


module.exports  =   new Media();