class Log{
	static _logs = [];

	static createLogObject(date, level, keyword, message){
		if (date === null || date === ""){
			date = new Date().toISOString();
		}
		let log =  {date: date, level: level , keyword: keyword, message: message};
		this._logs.push(log);
	}

	static levelLog(keyword){
		let level = -1;
		switch (keyword) {
			case 'EMERGENCY':
				level = 0;
				break;
			case 'ALERT':
				level = 1;
				break;
			case 'CRITICAL':
				level = 2;
				break;
			case 'ERROR':
				level = 3;
				break;
			case 'WARNING':
				level = 4;
				break;
			case 'NOTICE':
				level = 5;
				break;
			case 'INFO':
				level = 6;
				break;
			case 'DEBUG':
				level = 7;
				break;

	}

		return level;
	}

	static info(message, date = null){
		this.createLogObject(date, this.levelLog('INFO'), 'INFO' , message);
	}

	static error(message, date = null){
		this.createLogObject(date, this.levelLog('ERROR'), 'ERROR' , message);
	}

	static notice(message, date = null){
		this.createLogObject(date, this.levelLog('NOTICE'), 'NOTICE' , message);
	}

	static warning(message, date = null){
		this.createLogObject(date, this.levelLog('WARNING'), 'WARNING' , message);
	}

	static debug(message, date = null){
		this.createLogObject(date, this.levelLog('DEBUG'), 'DEBUG' , message);
	}

	static alert(message, date = null){
		this.createLogObject(date, this.levelLog('ALERT'),'ALERT' , message);
	}

	static critical(message, date = null){
		this.createLogObject(date, this.levelLog('CRITICAL'), 'CRITICAL' , message);
	}

	static emergency(message, date = null){
		this.createLogObject(date, this.levelLog('EMERGENCY'), 'EMERGENCY' , message);
	}

	static showLog(){
		let str_log = this._logs.reduce( (a, log) => { 
			return a+=`[${log.date}] ${log.keyword}: ${log.message}\r\n`; 
		}, '' );
		return str_log;
	}



	static filterLogByField(search, filterby){
		let filters = null;
		filterby = filterby.toLowerCase();
		if( filterby === 'level' || filterby === 'date' || filterby === 'message'){
			if(filterby === 'level'){
				if ( typeof search === 'string'){
					if ( isNaN( Number(search) )  ){
						search = this.levelLog(search.toUpperCase());
						if( search < 0 ){
							return filters;
						}
					}
				}
				search = Number(search);

			}

			filters = this._logs.filter(log => log[filterby].toString().includes(search) === true );
		}

		return filters;
	}

	static filterLog(level=null, date=null, message=null){
		let filters = null;

		if(level === null ){
			level = '';
		}

		if(date === null ){
			date = '';
		}

		if(message === null ){
			message = '';
		}

		if(level !== ''){
			if ( typeof level === 'string'){
				if ( isNaN( Number(level) )  ){
					level = this.levelLog(level.toUpperCase());
					if( level < 0 ){
						return filters;
					}
				}
			}
			level = Number(level);

		}

		filters = this._logs.filter(log => {
			let search1 = true;
			let search2 = true;
			let search3 = true;

			if(level !== '' ){
				search1 = log.level.toString().includes(level);
			}

			if(date !== '' ){
				search2 = log.date.toString().includes(date);
			}

			if(message !== '' ){
				search3 = log.message.toString().toLowerCase().includes(message.toLowerCase());
			}

			return search1 === true &&  search2 === true && search3 === true;
		} );

		return filters;
	}
}

Log.info("This is an information about something.", "2018-04-03T12:10:36.100Z");
// console.log(Log._logs);

Log.error("We can't divide any numbers by zero.", "2018-04-03T13:21:36.201Z");
// console.log(Log._logs);

Log.notice("Someone loves your status.", "2018-04-03T16:45:36.210Z");
// console.log(Log._logs);

Log.warning("Insufficient funds.", "2018-04-03T23:40:36.215Z");
// console.log(Log._logs);

Log.debug("This is debug message.", "2018-04-03T23:56:36.215Z");
// console.log(Log._logs);

Log.alert("Achtung! Achtung!", "2018-04-04T04:54:36.102Z");
// console.log(Log._logs);

Log.critical("Medic!! We've got critical damages.", "2018-04-04T05:01:36.103Z");
// console.log(Log._logs);

Log.emergency("System hung. Contact system administrator", "2018-04-04T05:05:36.104Z");
// console.log(Log._logs);

console.log(Log.showLog());

console.log("Search By One Field");

console.log(Log.filterLogByField("INFO", "level"));

console.log("Search By Multiple Field");
console.log(Log.filterLog("CRITICAL","2018-04-04"));

console.log(Log.filterLog(null, null, "We"));

console.log(Log.filterLog(null, "2018-04-04", null));