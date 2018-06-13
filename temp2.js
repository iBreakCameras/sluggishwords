var doit = require('./settifyWords2')
var fs = require('fs')
var articles = fs.readFileSync('filedb/oldarticles').toString().trim().split('\n')

articles.forEach( (x) => {
    console.log(x); 
    doit(x);	
})


