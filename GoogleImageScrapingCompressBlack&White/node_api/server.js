var express = require('express');
var fs = require('fs');
var app = express();

var Scraper = require('images-scraper')
	, google = new Scraper.Google();
const download = require('image-downloader');
var Jimp = require("jimp");

var bodyParser = require('body-parser');
var databaseFile = require('./db');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '2048kb' }));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/googleSearch', { useNewUrlParser: true, useCreateIndex: true })
	.then(() => console.log("Database Created"))
	.catch(err => console.log(err));

var storage = [];

//get all keyword from database
app.get('/getsaveRcnSrch', (req, res) => {
	databaseFile.find({}, (err, item) => {
		if (err)
			return res.send("can not get database");
		res.send(item);
	});
});


app.post('/display', (req, res) => {
	let type = req.body.keyword;
	var dir = `../src/assets/images/${type}`;
	var images = fs.readdirSync(dir);
		for (i = 0; i < images.length; i++) {
			// console.log(dir + "/" + images[i]);
			storage.push(dir + "/" + images[i]);
		}//for loop
		var response = {
			data: images,
			message: type,
			responseCode: 200
		}
		res.send(response);
})

//save images' keyword
function saveRcnSrch(key) {
	databaseFile.create({ keyword: key }, (err, item) => {
		if (err) {
			return res.send(err);
		}
	})
}

// images download from google
app.post('/imagedownload', (req, res) => {
	let type = req.body.gShrch;
	var dir = `../src/assets/images/${type}`;
	console.log(type);

	if (!fs.existsSync(dir)) {
		google.list({
			keyword: req.body.gShrch,
			num: 10,
			detail: false,
			nightmare: {
				show: false
			}
		}).then((item) => {
			for (var i = 0; i < item.length; i++) {
				storage.push(item[i].url);
			}//for loop
			if (item) {
				var response = {
					keyword: req.body.gShrch,
					data: item,
					message: 'google',
					responseCode: 200
				}
				res.send(response);
			}
		}).catch((err) => {
			console.log('Wait for image');
		});
	}
	else {
		var images = fs.readdirSync(dir);
		for (i = 0; i < images.length; i++) {
			console.log(dir + "/" + images[i]);
			storage.push(dir + "/" + images[i]);
		}//for loop
		var response = {
			keyword: req.body.gShrch,
			data: images,
			message: 'local',
			responseCode: 200
		}
		res.send(response);
	}
});

app.post('/imagescraper', (req, res) => {

	let type = req.body.gShrch;
	console.log(type);
	var dir = `../src/assets/images/${type}`;
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
		console.log(dir, "folder created");
	}
	for (var i = 0; i < 10; i++) {
		var fNm = '../src/assets/images/' + `${type}/` + type + "_" + i + '.jpg';
		const options = {
			url: storage.pop(),
			dest: fNm
		}
		download.image(options)
			.then(({ filename }) => {
				console.log('File saved to', filename)
				Jimp.read(filename)
					.then(lenna => {
						console.log('Compress file path ===>' + filename);
						return lenna
							.resize(300, 300) // resize
							.quality(60) // set JPEG quality
							.greyscale() // set greyscale
							.write(filename) // save
					})
					.catch(err => {
						console.error("image not found");
					});
			}).catch((err) => {
				throw err
			})
	}//for loop
	saveRcnSrch(req.body.gShrch);
	var response = {
		keyword: req.body.gShrch,
		message: 'success',
		responseCode: 200
	}
	res.send(response);
});

// set server port address
var port = process.env.PORT || 8000;
app.listen(port);
console.log('Server Running on port ' + port);
