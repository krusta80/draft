var fs = require('fs');
var FuzzyMatching = require('fuzzy-matching');

function extractName(str){
	var re = /(.*) [A-Z]+ \(\d+\)/;
	var arr = re.exec(str);
	if(arr && arr.length > 1)
		return arr[1];
	return str;
}
	
var csvs = {};

fs.readdirSync('../csvs/').forEach(function(file){
	var sheet = {};
	var rows = fs.readFileSync('../csvs/'+file,"utf-8").split("\r\n");
	
	var fieldNames = rows.shift().split(",");

	rows.forEach(function(row){
		var cols = row.split(",").map(function(col){
			return col.replace('"','');
		});

		var fullName = cols[0];
		cols[0] = extractName(cols[0]);
		sheet[cols[0]] = {};

		for(var i = 0; i < fieldNames.length; i++){
			if(cols[i] && fieldNames[i].indexOf('Tier') === 0)
				cols[i] = cols[i].substring(cols[i].indexOf(" "));
			if(!isNaN(Number(cols[i])))
				sheet[cols[0]][fieldNames[i]] = Number(cols[i]);
			else
				sheet[cols[0]][fieldNames[i]] = cols[i];
		}
		sheet[cols[0]].PlayerFull = fullName;
	});

	csvs[file] = sheet;
	csvs[file].fm = new FuzzyMatching(Object.keys(csvs[file]));
});

// console.log(csvs["te.csv"].fm.get("Dwa9ne Allen"));
// console.log(csvs["te.csv"].fm.get("Eric Ebror,"));
// console.log(csvs["te.csv"].fm.get("Jimm9 Graham"));
// console.log(csvs["rb.csv"].fm.get("Ci. Anderson"));
// console.log(csvs["wr.csv"].fm.get("iulian Edelman"));

//console.log(csvs);

module.exports = csvs;