Aplikasi Booking Ruang Rapat
Fitria Amastini

Fungsi yang dibuat:
Login
CRUD User
CRUD Room
CRUD Booking

Booking ruang rapat tidak dapat dilakukan jika:
1. Melakukan booking di ruangan yang sama, pada hari yang sama, di mana jam mulai dan jam berakhir rapat berada di rentang waktu yang telah dibooking terlebih dahulu

	misal: Charles sudah booking ruang 1 pada pukul 13:00 s/d 17:00 

	Rani tidak dapat membooking ruang 1 pada pukul 14:00 s/d 16:00

2. Melakukan booking di ruangan yang sama, pada hari yang sama, di mana jam mulai berada di rentang waktu yang telah dibooking terlebih dahulu

		misal: Charles sudah booking ruang 1 pada pukul 13:00 s/d 17:00 

		Rani tidak dapat membooking ruang 1 pada pukul 16:00 s/d 20:00

3. Melakukan booking di ruangan yang sama, pada hari yang sama, di mana jam berakhir berada di rentang waktu yang telah dibooking terlebih dahulu

		misal: Charles sudah booking ruang 1 pada pukul 13:00 s/d 17:00 

		Rani tidak dapat membooking ruang 1 pada pukul 10:00 s/d 14:00

4. Melakukan booking di ruangan yang sama, pada hari yang sama, di mana dalam kurun waktu dari jam mulai dan jam berakhir, terdapat bookingan lain

		misal: Charles sudah booking ruang 1 pada pukul 13:00 s/d 17:00 

		Rani tidak dapat membooking ruang 1 pada pukul 10:00 s/d 18:00

5. Melakukan booking di ruangan yang sama, pada hari yang sama, dengan jam mulai atau jam akhir yang sama

		misal: Charles sudah booking ruang 1 pada pukul 13:00 s/d 17:00 

		Rani tidak dapat membooking ruang 1 pada pukul 17:00 s/d 18:00

		Rani bisa membooking ruang 1 pada pukul 17:01 s/d 18:00

		Begitu juga sebaliknya

Aturan bookingan tersebut hanya berlaku untuk yang berstatus reserved saja.


================================================================================
NOTES:
================================================================================
Department: "IT", "Finance", "Marketing", "Research and Development", "Executive"

Role: "admin", "CEO", "manager", "secretary", "staff"

Booking status: "reserved", "finished", "cancel"

date: 2020-09-21

time start and time end format example : 00:00, 12:00, 16:00, 24:00