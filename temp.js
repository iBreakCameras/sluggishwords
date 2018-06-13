var doit = require('./settifyWords')
var fs = require('fs')
var articles = fs.readFileSync('filedb/newarticles').toString().trim().split('\n')
articles.forEach( (x) => {
	console.log(x); 
doit(x);	
})
