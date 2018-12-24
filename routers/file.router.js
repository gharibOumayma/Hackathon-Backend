let express = require('express');
let router = express.Router();
let upload = require('../multer.config.js');
let dataLoader = require('../controllers/loadData.js')
let bodyParser = require('body-parser')
let fileWorker = require('../controllers/file.controller.js');

router.post('/api/file/upload', upload.single("file"), fileWorker.uploadFile);

router.get('/api/file/all', fileWorker.listUrlFiles);

// router.get('/api/file/:filename', fileWorker.downloadFile);
router.get("/filedata", function (req, res) {
	dataLoader.loadData(req.query.name, '').then((data) => {
		res.send(data)
	})
});

// router.post("/resultdata", function (req, res) {
// 	// console.log('req.query.array', req.query.array);
// 	req.query.array.forEach(e => {
// 		e = JSON.parse(e);
// 		console.log('eeeeeeeeee514654654554545', e.content)
// 		dataLoader.loadResult(e.content, e.colsQuery, e.query).then((data) => {
// 			res.send(data)
// 		})
// 	});
// });
router.post('/resultdata', bodyParser.json(), (req, res) => {
	// console.log('req.body[0]', req.body[0])
	var e = req.body;
	var cols = e.colsQuery;
	dataLoader.loadResult(e.content, e.colsQuery, e.query).then((data) => {
		console.log('selectData', data);
		res.send({ columnsQuery: cols, data: data })
	})
})

router.post('/combinedata', bodyParser.json(), (req, res) => {
	console.log('req.body', req.body)
	dataLoader.combine(req.body.content1, req.body.content2, req.body.onQuery).then((data) => {
		// dataLoader.combine(req.body.onQuery).then((data) => {
		res.send(data)
	})
});

router.post('/combineSlice1', bodyParser.json(), (req, res) => {
	console.log('req.body', req.body)
	dataLoader.joinSlices1(req.body.content, req.body.length, req.body.onQuery).then((data) => {
		res.send(data)
	})
});

router.post('/combineSlice2', bodyParser.json(), (req, res) => {
	console.log('req.body', req.body)
	dataLoader.joinSlices2(req.body.content, req.body.length, req.body.onQuery).then((data) => {
		res.send(data)
	})
});






module.exports = router;