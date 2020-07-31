const countWord = (sentence, containWords) =>{
	sentence = sentence.trim().replace(/[^a-zA-Z]/g," ").toLowerCase().trim();
	// console.log(sentence);
	let arr_words = sentence.split(" ");

	let occurence = {};
	for(idx in containWords){
	 	occurence[containWords[idx]] = 0;
	}

	for( word of arr_words){
		if (word !== ''){
			if(word in occurence){
				occurence[word] += 1;
			}
		}
	}
	console.log(occurence);
}

const sentence = `Aku ingin begini
Aku ingin begitu
Ingin ini itu banyak sekali

Semua semua semua
Dapat dikabulkan
Dapat dikabulkan
Dengan kantong ajaib

Aku ingin terbang bebas
Di angkasa
Hei… baling baling bambu

La... la... la...
Aku sayang sekali
Doraemon

La... la... la...
Aku sayang sekali`;

const containWords = ['aku', 'ingin', 'dapat']

console.log(countWord(sentence, containWords));