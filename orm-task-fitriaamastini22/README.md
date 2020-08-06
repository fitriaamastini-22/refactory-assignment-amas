===================================================

Jangan lupa untuk menjalankannya memerlukan npm install terlebih dahulu 
karena ada package 3rd party yang digunakan:
1. Sequelize : sebagai ORM untuk ke database

2. Sequelize-cli : untuk melakukan migrasi database
	-> Langkah-langkah yang dilakukan:

		1. setelah menginstall sequelize, jalankan command:
		npx sequelize-cli init
		untuk membuat folder config, migration, seeder dsbnya

		2. Install terlebih dahulu db yang digunakan:
		misal jika mysql:
			npm install mysql2
		etc....
		Sumber: https://www.npmjs.com/package/sequelize

		3. Untuk melihat perintah2 sequelize cli:
		npx sequelize --help

		4. Cara create db berdasarkan konfigurasi yang sudah dibuat:
			npx sequelize db:create
		Secara default akan terbuat db development. Jika ingin mengganti:
		sumber: 
			https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html
			https://stackoverflow.com/questions/11104028/process-env-node-env-is-undefined

		5. Melakukan migrasi db:
		Buat model
			npx sequelize model:generate --name Todo --attributes todo_desc:string,is_completed:boolean
		Migrasi tabel
			npx sequelize db:migrate
		Buat Seeder
			npx sequelize seed:generate --name demo-todo
			buat datanya
			load datanya ke db:
			npx sequelize db:seed:all
		Sumber: 
		https://medium.com/extra-integer/install-sequelize-d4125fa34d08
		https://sequelize.org/master/manual/migrations.html


3. @caporal/core : untuk membuat aplikasi cli

===================================================

Memelajari cara menggunakan ORM menggunakan sequelize (database yang digunakan menggunakan mysql)

Untuk menjawab soal di:
https://gist.github.com/mprambadi/fbf318e4170e2ea0b3b48dad21204823

Thanks

============================

cara membuat link command:
https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e

1. package.json
	-> tambahkan script berikut di package.json
	"bin": {
	  "todo": "./todo"
	}
2. npm link
3. Taraa, anda bisa menggunakannya :D

=============================

Referensi belajar:
http://zetcode.com/javascript/sequelize/