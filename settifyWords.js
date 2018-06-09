let url = 'https://www.slugmag.com/beer-reviews/beer-month-rino-apa/'
const cheerio = require('cheerio');
const request = require('sync-request');
const fs = require ('fs');
let article = '';

var path = url.substr('https://www.slugmag.com/'.length,url.length - 'https://www.slugmag.com/'.length);
filename = path.replace(/\//g,'__');
let filepath = './filedb/'+filename

if (!fs.existsSync('./filedb/'+filename)) {
  article = request('GET',url);
  article = article.getBody();
  console.log(filename);
  console.log('Article downloaded.');
  fs.writeFileSync('./filedb/'+filename,article);
} else {
  article = fs.readFileSync('./filedb/'+filename).toString();
  console.log('Article read from file system.')
}
filepath += 'set'

let stringStart = '<section id="primary"';
let stringEnd = '</section';


let posStart = article.indexOf(stringStart);
if (posStart === -1) {posStart = 0;};
let posEnd = article.indexOf(stringEnd);
if (posEnd === -1) {posEnd = article.length;};
let sectionLength = posEnd - posStart
let sectionHTML = article.substr(posStart,sectionLength);

if (sectionHTML.indexOf('adsbygoogle') > -1) {
  sectionHTML = sectionHTML.substr(0,sectionHTML.indexOf('adsbygoogle'));
};


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

var theSet = settifyWords(filterForLetters(removeTags(sectionHTML)));
article = theSet;
if (!fs.existsSync(filepath)) {
  fs.writeFileSync(filepath,theSet=[...theSet]);
}

//var hi = fs.readFileSync(filepath).toString().split(',');

var master = fs.readFileSync('./filedb/_master').toString().trim().split(',');

function leftdiff(setA, arrayB) {
    for (var i = 0; i < arrayB.length; i++) {
        setA.delete(arrayB[i]); 
        console.log([...setA].length);

//        console.log(arrayB[i],' deleted from setA');
    }
    return setA;
}

var setA = new Set([1,2,3]);
var arrayB = [2,3,4];
console.log(leftdiff(setA, arrayB));
console.log(leftdiff(article,master));

console.log(master)
