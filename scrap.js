var request = require('request');
var cheerio = require('cheerio');
//importar csv
var json2csv = require('json2csv');
var fs = require('fs');
var src = {nameCapital:"Madrid",nameLow:"madrid"},dst={nameCapital:"Barcelona",nameLow:"barcelona"};


request('https://www.blablacar.es/coche-compartido/'+src.nameLow+'/'+dst.nameLow+'/#?fn='+src.nameCapital+'&fc=40.416775%7C-3.70379&fcc=ES&fp=0&tn='+dst.nameCapital+'&tc=41.385064%7C2.173403&tcc=ES&tp=0&db=28/05/2017&sort=trip_date&order=asc&radius=51.544&limit=10&page=1', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var nameCSV="lista.csv";
    var listElements=[];
    var fields =['srcNameCapital','dstNameCapital','conductorName','addressSRC','addressDST','priceTrip'];

    const lis = $('li.trip.relative').get();

    
    
    lis.forEach(function(li){
        const $li = $(li);
        //with trim() we remove the white spaces and the /n
        const nameTitle = $li.find('h2.ProfileCard-info.ProfileCard-info--name.u-truncate').text().trim(); 
        const addressSRC = $li.find('dl.geo-from').text().trim();
        const addressDST = $li.find('dl.geo-to').text().trim(); 
        const conductorAge = $li.find('div.ProfileCard-info').text().trim();
        const priceTrip = $li.find('div.price.price-black').text().trim();


        //  console.log(element)
       
        listElements.push({
            srcNameCapital:src.nameCapital,
            dstNameCapital:dst.nameCapital,
            conductorName:nameTitle,
            addressSRC:addressSRC,
            addressDST:addressDST,
            conductorAge:conductorAge,
            priceTrip:priceTrip,
        });
        //listElements.push({addressSRC:addressSRC});
        //listElements.push({addressDST:addressDST});




    });
    console.log(listElements);
    /*
    var csv = json2csv({ data: listElements, fields: fields });
     
    fs.writeFile(nameCSV, csv, function(err) {
      if (err) throw err;
      console.log('file saved');
    });
    */



  }
});