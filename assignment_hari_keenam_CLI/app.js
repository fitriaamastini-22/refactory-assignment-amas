#!/usr/bin/env node

const { program } = require("@caporal/core");

// program.action(({logger}) => {
// 	logger.info("hello world");
// });
program
.command("lowercase","Fungsi Lower Case")
.argument("<text>","Text String untuk di-lowercase")
.action( ({logger, args}) => {
	console.log("%s",args.text.toLowerCase());
})

.command("uppercase","Fungsi Upper Case")
.argument("<text>","Text String untuk di-uppercase")
.action( ({logger, args}) => {
	console.log("%s",args.text.toUpperCase());
})

.command("capitalize","Fungsi Capitalize Case")
.argument("<text>","Text String untuk di-capitalize")
.action( ({logger, args}) => {
	const textstr = args.text;
	let arr_word = textstr.split(" ");
	for(idx in arr_word){
		arr_word[idx] = arr_word[idx].charAt(0).toUpperCase() + arr_word[idx].slice(1).toLowerCase();
	}
    const newtext = arr_word.join(" ");
	console.log("%s",newtext);
})

.command("add","Fungsi Tambah")
.argument("<numbers...>","List Number untuk ditambah")
.action( ({logger, args}) => {
	const sum = args.numbers.reduce((acc, curval) => acc+ curval, 0);
	console.log("%s",sum);
})

.command("subtract","Fungsi Kurang")
.argument("<numbers...>","List Number untuk dikurang")
.action( ({logger, args}) => {
	// const newnumber = args.numbers.sort( (a,b)=> b-a);
	// logger.info("%s",newnumber);
	const newnumber = args.numbers;
	const res = newnumber.reduce((acc, curval) => acc - curval);
	console.log("%s",res);
})

.command("multiply","Fungsi Kali")
.argument("<numbers...>","List Number untuk perkalian")
.action( ({logger, args}) => {
	const res = args.numbers.reduce((acc, curval) => acc * curval);
	console.log("%s",res);
})

.command("divide","Fungsi Bagi")
.argument("<numbers...>","List Number untuk pembagian")
.action( ({logger, args}) => {
	const newnumber = args.numbers;
	const res = newnumber.reduce((acc, curval) => acc / curval);
	console.log("%s",res);
})

.command("palindrome","Fungsi Pengecekan apakah string adalah Palindrom")
.argument("<text>","Text string")
.action( ({logger, args}) => {
	console.log("String: %s",args.text);
	const text = args.text.replace(/[^a-zA-Z]/g,"").toLowerCase();
	
	const reverse_text = text.split("").reverse().join("");
	let is_palindrome = "No";
	if( text === reverse_text){
	    is_palindrome = "Yes";
	}
	console.log("Is palindrome? %s",is_palindrome);

})

.command("obfuscate","Mengkonversi string menjadi unicode")
.argument("<text>","Text string")
.action( ({logger, args}) => {
	const text = args.text;

	let obfuscatetext = '';
	for (let i =0; i<text.length; i++){
		obfuscatetext += `&#${ text.charCodeAt(i)};`;
	}
	console.log("%s",obfuscatetext);

})

.command("random","membuat random string")
.option("--length <length>","Panjang Character", {
	default: "32",
})
.option("--letters [letters]","Set hanya random alphabet saja", {
	default: "true",
})
.option("--numbers [numbers]","Set hanya random numeric saja" , {
	default: "true",
})
.option("--uppercase","Set hanya random alphabet untuk uppercase saja")
.option("--lowercase","Set hanya random alphabet untuk lowercase saja")
.cast(false)
.action( ({logger, options}) => {
	const length = Number(options.length);
	let isLettersInclude = (options.letters == 'true');
	let isNumbersInclude = (options.numbers == 'true');
	let isUppercaseOnly = (options.uppercase == true );
	let isLowercaseOnly = (options.lowercase == true );
	// logger.info("%s", options);
	// logger.info("%s %s %s %s", isLettersInclude, isNumbersInclude, isUppercaseOnly, isLowercaseOnly);
	
	if(!isLettersInclude){
		isNumbersInclude = true;
	}

	if(!isNumbersInclude){
		isLettersInclude = true;
	}

	if(isUppercaseOnly){
		isLowercaseOnly = false;
	}

	if(isLowercaseOnly){
		isUppercaseOnly = false;
	}

	const alphalowercase = "abcdefghijklmnopqrstuvwxyz";
	const alphauppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const numeric = "0123456789";

	let chars = '';

	if(isLettersInclude && isNumbersInclude && isUppercaseOnly ){
		chars += numeric + alphauppercase;
	}else if(isLettersInclude && isNumbersInclude && isLowercaseOnly ){
		chars += numeric + alphalowercase;
	}else if(!isLettersInclude && isNumbersInclude){
		chars += numeric;
	}else if(isLettersInclude && !isNumbersInclude){
		if(isUppercaseOnly){
			chars +=alphauppercase;
		}

		if(isLowercaseOnly){
			chars +=alphalowercase;
		}

		if(!isUppercaseOnly && !isLowercaseOnly){
			chars +=alphalowercase+alphauppercase;
		}
	}else{
		chars += numeric+alphalowercase+alphauppercase;
	}

	let result = '';
	for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

	// logger.info("%s", chars);
	// logger.info("%s", options);
	// logger.info("%s %s %s %s", isLettersInclude, isNumbersInclude, isUppercaseOnly, isLowercaseOnly);
	console.log("%s", result);
})

.command("ip","Mendapatkan Private IP Address")
.action( ({logger}) => {
	const os = require( 'os' );

	const networkInterfaces = os.networkInterfaces();
	// logger.info("%s", networkInterfaces['Wi-Fi'][0]);

	for( key in networkInterfaces){
		// logger.info("%s, %s", key, networkInterfaces[key][0]);
		console.log("%s", networkInterfaces[key][0].address);
		break;
	}

})

.command("ip-external","Mendapatkan External/Public IP Address")
.action( ({logger}) => {
	const http = require('http');
	const url = 'http://myexternalip.com/raw';
	http.get(url, function(r) {
	  r.setEncoding('utf8');
	  r.on('data', console.log.bind(console));
	});

})

.command("headlines","Mendapatkan Headline dari kompas")
.action( ({logger}) => {
	const cheerio = require('cheerio');
	const puppeteer = require('puppeteer');

	const url = 'https://www.kompas.com/';
	let myBrowser;
	let newsHeadlines = [];

	puppeteer
	 .launch()
	 .then(browser => {
	 	myBrowser = browser;
	 	return myBrowser.newPage();
	 })
	 .then(page => {
	   return page.goto(url).then(function() {
	     return page.content();
	   });
	 })
	 .then(html => {
	   const $ = cheerio.load(html);

	   let titles = []
	   $('h2.headline__big__title').each(function() {
	   		titles.push($(this).text());
	   });
	   $('h2.headline__thumb__title').each(function() {
	     	titles.push($(this).text());
	   });

	   let urls = []
	   $('a.headline__big__link').each(function() {
	   		urls.push($(this).attr('href'));
	   });

	   $('a.headline__thumb__link').each(function() {
	   		urls.push($(this).attr('href'));
	   });

	   for(i in titles){
	   		newsHeadlines.push({title: titles[i], url: urls[i]});
	   }

	   // console.log(newsHeadlines);

	   for(headline of newsHeadlines){
	   	console.log(`Title: ${headline.title}`);
	   	console.log(`URL: ${headline.url}`);
	   	console.log();
	   }

	   myBrowser.close();
	 })
	 .catch(console.error);
})

.command("convert","Mengkonversi file excel/csv")
.argument("<file1>","File jenis 1")
.argument("<file2>","File jenis 2")
.action( ({logger, args}) => {
	const fs = require('fs');
	const path = require('path');
	const convertCsvToXlsx = require('@aternus/csv-to-xlsx');
	const XLSX = require('xlsx');

	const file1 = args.file1;
	const file2 = args.file2;

	const extfile1 = file1.split('.').pop();

	if( extfile1 == 'xlsx'){
		const workBook = XLSX.readFile(file1);
		XLSX.writeFile(workBook, file2, { bookType: "csv" });
	}else if(extfile1 == 'csv'){
		if (fs.existsSync(file2)) {
		  fs.unlinkSync(file2);
		}
		let source = path.join(__dirname, file1);
		let destination = path.join(__dirname, file2);
		convertCsvToXlsx(source, destination);
	}


	// console.log(file1);
	// console.log(file2);
});


program.run();
