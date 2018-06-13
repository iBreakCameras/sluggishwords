module.exports = (path) => {
		//let url = 'https://www.slugmag.com/beer-reviews/beer-month-rino-apa/'
		const cheerio = require('cheerio');
		const request = require('sync-request');
		const fs = require ('fs');
		let article = '';

    let filename = path.replace('/index.html','__').replace('~/dev/sluggishwords/scrape/www.slugmag.com/','').replace('/','__');
    
        let filepath = path;
        console.log(filename,'\n\n\n',filepath)
        article = fs.readFileSync(filepath).toString();
        console.log('Article read from file system.')
		filename += 'set'

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

		var master = new Set(fs.readFileSync('./filedb/master').toString().trim().split(','));

		//article = new Set([...article].slice(0,3))
		//master = new Set([...master].slice(0,3))
		//console.log(article,master)

		function leftdiff(setA, setB) {
			setB.forEach( (x) => {
				setA.delete(x);
			});
			return setA;
		};

		var setA = article;
		var setB = master;
		setA = leftdiff(setA,setB);
		
		if (setA.size > 0) {
			setA.forEach( (x) => setB.add(x) );
			setA.forEach( (x) => fs.appendFileSync('./filedb/queue',x + '\n'));
			setA.forEach( (x) => console.log(`new word found: ${x}`));		
			fs.writeFileSync('./filedb/master',[...setB])
		    setA.forEach( (x) => fs.appendFileSync('filedb/master',','+x)  );
		}
}
