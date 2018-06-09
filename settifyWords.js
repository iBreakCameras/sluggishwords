// CSS class notes
// <section id="primary" seems to capture the content of the page not the ads
// example URL https://www.slugmag.com/beer-reviews/beer-month-rino-apa/
/*
const url = 'https://www.slugmag.com/beer-reviews/beer-month-rino-apa/'
//const fs = require('fs');
//const body = fs.readFileSync('beer.html').toString();

const stringStart = '<section id="primary"';
const stringEnd = '</section';
const posStart = body.indexOf(stringStart);
const posEnd = body.indexOf(stringEnd);
const sectionLength = posEnd - posStart
const sectionHTML = body.substr(posStart,sectionLength); 

var removeTags = (HTML) => {
  HTML = HTML.toLowerCase();
  var output = '';
  var c = 0;
  var char = '';
  var appendFlag = true;
  while (char !== undefined) {
    char = HTML[c];
    if (char === '<') {appendFlag = false;};
    if (char === '>') {appendFlag = true;};
    if (appendFlag && char !== '>') {output += char};
    c++;
  };
  return output
};

var filterForLetters = (text) => {
  var c = 0;
  var ascii = 0;
  var output = '';
  while (c < text.length) {
    ascii = text.charCodeAt(c);
    if (ascii >= 97 && ascii <= 122) {
      output += text[c];
    } else {
      output += ' ';
    };
//    console.log(c,text[c], ascii);
    c++;
  };
  return output;
};
//console.log(filterForLetters('asd8f8asdmfisov sdifosdij9'));

var settifyWords = (text) => {
  var output = ''
  var text = text.trim();
  var c = 0;
  var len = text.length;
  var isLetter = true; 
  var currentWord = '';
  var words = [];
  while (c < len) {
    if (text[c] != ' ') {
     currentWord += text[c]; 
    } else {
      if (currentWord != '') {words.push(currentWord); currentWord = '';};
    }
  c++;
  };
  return new Set(words);
};

console.log(settifyWords(filterForLetters(removeTags(sectionHTML))));
*/
const url = 'https://www.slugmag.com/beer-reviews/beer-month-rino-apa/'
const cheerio = require('cheerio');
const request = require('sync-request');
const fs = require ('fs');
let article = '';

var path = url.substr('https://www.slugmag.com/'.length,url.length - 'https://www.slugmag.com/'.length);
filename = path.replace(/\//g,'__');

if (!fs.existsSync('./filedb/'+filename)) {
  article = request('GET',url);
  console.log(filename);
  console.log('Article downloaded.');
  fs.writeFileSync('./filedb/'+filename,article);
} else {
  article = fs.readFileSync('./filedb/'+filename);
  console.log('Article read from file system.')
}
console.log(article.length);
console.info(article.length);


