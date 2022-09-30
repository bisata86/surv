// ** LOAD NODE MODULES **
var app = require('express')();
var http = require('http').Server(app);
var express = require('express');
var cheerio = require('cheerio')
/*var iconv = require('iconv-lite')
iconv.skipDecodeWarning = true;*/
var request = require("request");

var port = process.env.PORT || 3000;




app.use(express.static(__dirname + '/', {
    maxage: process.env.IS_STAGING == 'true' ? '1m' : '1d'
}))
// ** HANDLES SERVER ROUTING **
app.get('/', function(req, res){
  res.sendfile('index.html');
});
app.get('/res', function(req, res){
	var url = "https://9gag.com/";
	//var url = "https://9gag.com/tag/avengers";
	var cEncoding = 'utf-8';
	var urls = [], next;
	request({ url:url,encoding: cEncoding}, function(error, response, body) {
		if(body!=undefined) {
			//console.log(body)
			$ = cheerio.load(body);
			var theScript = $('script:contains("window._config")').html()
			var content;
			var window = {};
			eval(theScript)
			content = window._config;
			next = content.data.nextCursor;
			for (var i in content.data.posts) {
				var currentTitle = content.data.posts[i].title;
				var isVideo = false;
				for (var k in content.data.posts[i].images) {
					if(content.data.posts[i].images[k].url.indexOf('mp4')!=-1) {
						urls.push({title:currentTitle,url:content.data.posts[i].images[k].url});
						isVideo = true;
						break;
					}
				}
				if(!isVideo) {
					for (var k in content.data.posts[i].images) {
						if(content.data.posts[i].images[k].url.indexOf('jpg')!=-1 || content.data.posts[i].images[k].url.indexOf('gif')!=-1) {
							urls.push({title:currentTitle,url:content.data.posts[i].images[k].url});
							break;
						}
					}
				}
			}
			res.jsonp({urls:urls,next:next})
		} 
	}); 
});
app.get('/restag', function(req, res){
	console.log(req.query)
	var url = req.query.url;

	var cEncoding = 'utf-8';
	var urls = [], next;
	request({ url:url,encoding: cEncoding}, function(error, response, body) {
		if(body!=undefined) {
			//console.log(body)
			$ = cheerio.load(body);
			var theScript = $('script:contains("window._config")').html()
			var content;
			var window = {};
			eval(theScript)
			content = window._config;
			next = content.data.nextCursor;
			for (var i in content.data.posts) {
				var currentTitle = content.data.posts[i].title;
				var isVideo = false;
				for (var k in content.data.posts[i].images) {
					if(content.data.posts[i].images[k].url.indexOf('mp4')!=-1) {
						urls.push({title:currentTitle,url:content.data.posts[i].images[k].url});
						isVideo = true;
						break;
					}
				}
				if(!isVideo) {
					for (var k in content.data.posts[i].images) {
						if(content.data.posts[i].images[k].url.indexOf('jpg')!=-1 || content.data.posts[i].images[k].url.indexOf('gif')!=-1) {
							urls.push({title:currentTitle,url:content.data.posts[i].images[k].url});
							break;
						}
					}
				}
			}
			res.jsonp({urls:urls,next:next,tags:content.data.tags})
		} 
	}); 
});

app.get('/next', function(req, res){
  if(req.query.after) {
  	var url = "https://9gag.com/gag/ap9KGyW/";
	var cEncoding = 'utf-8';
	var urls = [], next;
	request({ url:url,encoding: cEncoding}, function(error, response, body) {
		if(body!=undefined) {
			console.log(body)
			$ = cheerio.load(body);
			var theScript = $('script:contains("window._config")').html()
			var content;
			var window = {};
			eval(theScript)
			content = window._config;
			next = content.data.nextCursor;
			for (var i in content.data.posts) {
				var currentTitle = content.data.posts[i].title;
				var isVideo = false;
				for (var k in content.data.posts[i].images) {
					if(content.data.posts[i].images[k].url.indexOf('mp4')!=-1) {
						urls.push({title:currentTitle,url:content.data.posts[i].images[k].url});
						isVideo = true;
						break;
					}
				}
				if(!isVideo) {
					for (var k in content.data.posts[i].images) {
						if(content.data.posts[i].images[k].url.indexOf('jpg')!=-1 || content.data.posts[i].images[k].url.indexOf('gif')!=-1) {
							urls.push({title:currentTitle,url:content.data.posts[i].images[k].url});
							break;
						}
					}
				}
			}
			res.jsonp({urls:urls,next:next})
		} 
	}); 
  }
  else if(req.query.c && req.query.tag) {
  	var url = "https://9gag.com/v1/tag-posts/tag/"+req.query.tag+"/type/hot?c="+req.query.c;
	var cEncoding = 'utf-8';
	var urls = [], next;
	request({ url:url,encoding: cEncoding}, function(error, response, body) {
		if(body!=undefined) {
			//console.log(JSON.parse(body).data)
			//$ = cheerio.load(body);
			// var theScript = $('script:contains("GAG.App.loadConfigs")').html()
			// //console.log(theScript)
			var content = JSON.parse(body);
			// var GAG = { App: { loadConfigs : function(a) {content=a; return { content : a, loadAsynScripts: function(a) { return a } }} }}
			// eval(theScript)
			next = content.data.nextCursor;
			for (var i in content.data.posts) {
				var currentTitle = content.data.posts[i].title;
				var isVideo = false;
				for (var k in content.data.posts[i].images) {
					if(content.data.posts[i].images[k].url.indexOf('mp4')!=-1) {
						urls.push({title:currentTitle,url:content.data.posts[i].images[k].url});
						isVideo = true;
						break;
					}
				}
				if(!isVideo) {
					for (var k in content.data.posts[i].images) {
						if(content.data.posts[i].images[k].url.indexOf('jpg')!=-1 || content.data.posts[i].images[k].url.indexOf('gif')!=-1) {
							urls.push({title:currentTitle,url:content.data.posts[i].images[k].url});
							break;
						}
					}
				}
			}
			res.jsonp({urls:urls,next:next})
		} 
	});
  }
  else {
  	res.jsonp([0])
  }
});
// app.get('/query', function(req, res){
//   if(req.query.after) {
//   	var url = "https://9gag.com/v1/search-posts?query="+req.query.after;
// 	var cEncoding = 'utf-8';
// 	var urls = [], next;
// 	request({ url:url,encoding: cEncoding}, function(error, response, body) {
// 		if(body!=undefined) {
// 			//console.log(JSON.parse(body).data)
// 			//$ = cheerio.load(body);
// 			// var theScript = $('script:contains("GAG.App.loadConfigs")').html()
// 			// //console.log(theScript)
// 			var content = JSON.parse(body);
// 			// var GAG = { App: { loadConfigs : function(a) {content=a; return { content : a, loadAsynScripts: function(a) { return a } }} }}
// 			// eval(theScript)
// 			next = content.data.nextCursor;
// 			for (var i in content.data.posts) {
// 				var currentTitle = content.data.posts[i].title;
// 				var isVideo = false;
// 				for (var k in content.data.posts[i].images) {
// 					if(content.data.posts[i].images[k].url.indexOf('mp4')!=-1) {
// 						urls.push({title:currentTitle,url:content.data.posts[i].images[k].url});
// 						isVideo = true;
// 						break;
// 					}
// 				}
// 				if(!isVideo) {
// 					for (var k in content.data.posts[i].images) {
// 						if(content.data.posts[i].images[k].url.indexOf('jpg')!=-1 || content.data.posts[i].images[k].url.indexOf('gif')!=-1) {
// 							urls.push({title:currentTitle,url:content.data.posts[i].images[k].url});
// 							break;
// 						}
// 					}
// 				}
// 			}
// 			res.jsonp({urls:urls,next:next,tags:content.data.tags})
// 		} 
// 	});
//   }
//   else {
//   	res.jsonp([0])
//   }
// });
app.listen(port, function() {
    console.log('scraper connection on port: ' + port)
});


