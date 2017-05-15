var request = require('request');
var cheerio = require('cheerio');
//importar csv
var json2csv = require('json2csv');
var fs = require('fs');
var src = {nameCapital:"Madrid",nameLow:"madrid"},dst={nameCapital:"Barcelona",nameLow:"barcelona"};
    console.log("holaaa");


request('https://www.blablacar.es/coche-compartido/'+src.nameLow+'/'+dst.nameLow+'/#?fn='+src.nameCapital+'&fc=40.416775%7C-3.70379&fcc=ES&fp=0&tn='+dst.nameCapital+'&tc=41.385064%7C2.173403&tcc=ES&tp=0&db=14/05/2017&sort=trip_date&order=asc&radius=51.544&limit=10&page=1', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var nameCSV="lista.csv";
    var listElements=[];
    var fields =['NAME','ORI','SRC'];
    const lis = $('li.trip.relative').get();
    console.log(lis);
    
    lis.forEach(function(li){
    	const $li = $(li);
        //with trim() we remove the white spaces and the /n
    	const nameTitle = $li.find('h2.ProfileCard-info.ProfileCard-info--name.u-truncate').text().trim(); 
        const exactSRC = $li.find('dd.js-tip-custom').text().trim(); 
        const exactDST = $li.find('dl.geo-to.dd.js-tip-custom').text().trim(); 

    	//	console.log(element)
        listElements.push({name:nameTitle});
        listElements.push({exactSRC:exactSRC});
    	listElements.push({exactDST:exactDST});


    });
    console.log(listElements);
    /*
	var csv = json2csv({ data: listElements, fields: fields });
	 
	fs.writeFile('file.csv', csv, function(err) {
	  if (err) throw err;
	  console.log('file saved');
	});*/



  }
});