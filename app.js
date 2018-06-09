// set up a cron job or some kind of schedule to run this whenever

// var declartions and includes

var twitter = require('twitter')
   ,cheerio = require('cheerio')
   ,fs      = require('fs')
   ,request = require('sync-request')
   ,slugurl = 'https://slugmag.com'
 //twitter vars
 // https://stackoverflow.com/questions/800827/twitter-oauth-callbackurl-localhost-development
   ,consumer_key        = ''
   ,consumer_secret     = ''
   ,access_secret       = ''
   ,access_token_secret = ''
   ;

var slughtml = '';
// go to slug homepage and download if needed otherwise get from filedb
if (!fs.existsSync('filedb/slughtml')) {
  console.log('Downloading slug home page...');
  slughtml = request('GET',slugurl);
  console.log('Download complete.');
  console.log('Writing file...');
  slughtml = slughtml.getBody().toString();
  fs.writeFileSync('filedb/slughtml',slughtml);
  console.log('File written to filedb/slughtml');
} else {
  console.log('File already exists.  Reading in file.');
  slughtml = fs.readFileSync('filedb/slughtml').toString();
  console.log('File has been read.')
};

//console.log(slughtml);

// <section id="primary seems to isolate entire body of articles
// <div id="post-#####" identifies specific article
// first instance of a href tag after 
// <div class="entry-utility" identifies the article url

// load html into cheerio
var $ = cheerio.load(slughtml);

var articleurls = new Set();
var articleurl = ''
// // begin loop that checks each article url on the home page
var c = 0;
while (c<100) {
  try {
//console.log($(".post a[href]")[c].attribs.href);
articleurl = $(".post a[href]")[c].attribs.href
console.log(c,articleurl);
articleurls.add(articleurl);
  }
  catch(err) {
console.log('error',c);
  }
c++;
};

articleurls = [...articleurls];

articleurls.forEach( (articleurl) => fs.appendFileSync('filedb/newarticles',articleurl + '\n'));



console.log('still executing?');
// if article does not exist in /filedb/articlelog
// // then add it to the log



// // download the article text



// // strip out text and settify



// // write settified words to file repping the article



// // if master doesn't exist, create it and copy settified words to it



// if master does exist do a diff to find new words if any



// if there are new words tweet them



// add new words to master doc



// if loop makes it to end of page and still not found in article log
// // then click the more button




// loop through the additional articles




// if article appears in the articlelog then stop looping
// // assumption is articles are published in order like a stack



// if no new articles were found send an email stating the check was made and
// nothing was found.  use this information to find out when content is
// published maybe.





