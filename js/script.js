function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}

function ApiCorona(){
	$.ajax({
		url: "https://covid19.mathdro.id/api/countries/indonesia/confirmed",
	    success: function(res) {
	        $("#positif").text(formatNumber(res[0].confirmed))
	        $("#recovered").text(formatNumber(res[0].recovered))
	        $("#dead").text(formatNumber(res[0].deaths))
	        $("#active").text(formatNumber(res[0].active))
	    }
	})
}

function ApiInstagram(){
	$.ajax({
		url: "https://v1.nocodeapi.com/apitest1414/instagram/hfDFJjlXpdYWnwJk?limit=9",
	    success: function(res) {
	    	for(var i=0; i < res.data.length; i++){
				var ig = res.data[i];
				var div = $('<div class="col-sm-4 col-4" style="padding: 0px;"></div>'); 
				
				var tag = "";
				tag += "<abbr title='"+ ig.caption +"'><a href='"+ ig.permalink +"' target='_blank'><img src='"+ ig.media_url +"' width='100%' height='100%'></a></abbr>";
				let su = $('#media-ig').append(div.html(tag));
			}   	
	    }
	})
}

function ApiTrip(){
	let lokasi = $("#lokasi").text();
	let daerah = $("#daerah").text();
	console.log(lokasi, daerah)
	$.ajax({
		async: true,
		crossDomain: true,
		url: "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=id_US&currency=USD&units=km&query="+lokasi+" "+daerah+" Indonesia",
		method: "GET",
		headers: {
			"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
			"x-rapidapi-key": "a460231e1cmsh0f7f9dc0d4871a5p15f384jsn87f0d52e2034"
		},
		success : function(res){
			let idLokasi = res.data[1].result_object.location_id;
			$.ajax({
				async: true,
				crossDomain: true,
				url: "https://tripadvisor1.p.rapidapi.com/reviews/list?limit=5&currency=USD&lang=id_US&location_id="+idLokasi,
				method: "GET",
				headers: {
					"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
					"x-rapidapi-key": "a460231e1cmsh0f7f9dc0d4871a5p15f384jsn87f0d52e2034"
				},
				success : function(res){
					console.log(res)
					let review = res.data
					$.each(review, function(i, data){
						// formating tanggal
						var d = new Date(data.published_date);
						var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
						var dt = d.getUTCDate()+" "+months[d.getUTCMonth()]+" "+d.getFullYear();

						$('#review-list').append(`
							<div class="row" style="margin-top: 25px;">
								<div class="col-sm-3 col-3">
									<img src="`+data.user.avatar.small.url+`" class="img-fluid rounded-circle" alt="Responsive image" style="display: block; margin-left: auto; margin-right: auto;">
									<p class="text-center oswaldlight" style="font-size: 14px; margin-top: 5px;">`+data.user.username+`</p>
								</div>
								<div class="col-sm-9 col-9">
									<h4 style="font-size: 16px;">`+data.title+`</h4>
									<span><img src="https://static.tacdn.com/img2/ratings/traveler/ss`+data.rating+`.0.gif"></span>
									<span class="oswaldlight" style="font-size: 12px;">Reviewed `+dt+`</span>
									<p class="oswaldlight" style="font-size: 14px; margin-top: 10px;">`+data.text+`</p>
								</div>
								<div style="display: block; background: #FFFFFF; width: 90%; height: 2px; border-radius: 10px; margin-left: auto; margin-right: auto;"></div>
							</div>
						`)
					})
				}
			})
		}
	})
}

function destinasiBanten(){
	let data = [
		{
			id : 'btn01',
			title : 'Pantai Anyer',
			city : 'Banten',
			image : 'img/pantai-anyer.jpg',
			description : 'Lokasi dari pantai ini adalah Kecamatan Anyer, Serang, Banten. Karena sebagian besar wilayah di daerah ini adalah pantai, maka pantai-pantai di sepanjang kecamatan ini akrab disebut dengan Pantai Anyer. Pantai Anyer bukanlah pantai tunggal, melainkan kumpulan pantai-pantai yang membentang di sepanjang kawasan Anyer itu sendiri. Setidaknya, ada tujuh pantai yang ada di satu garis Pantai Anyer yaitu: Pantai Sambolo: Pantai ini yang paling cocok untuk Anda yang ingin melakukan olahraga air, berenang atau berselancar. Pantai Marbella: Letak pantai ini ada di depan Hotel Marbella. Pantai Cibeureum: Cari tempat untuk bersantai? Pilih saja pantai ini karena udaranya yang paling sejuk. Pantai Marina: Ada permainan air dan olahraga air yang ditawarkan di pantai ini. Variasinya juga lebih banyak dibandingkan Pantai Sambolo. Pantai Pasir Putih Florida: Pantai paling romantis karena hamparan pasirnya yang putih dan halus. Anda bisa jalan-jalan di pantai ini. Pantai Karang Bolong: Letaknya di Jalan Raya Anyer-Carita. Yang unik dari pantai ini adalah karang besar yang bolong alias berlubang karena proses alami terkena deburan ombak. Pantai Karang Suraga: Ombak di pantai ini tidak terlalu besar, cocok untuk anak-anak. Terdapat banyak warung-warung makanan enak di sepanjang tepi pantai ini.',
			open_gate : 'Kawasan wisata Anyer memiliki waktu operasional selama 24 jam setiap harinya.',
			ticket : 'Di kawasan wisata anyer terdapat beberapa pantai. Namun yang paling ramai di kunjungi adalah Pantai Sambolo Anyer. Harga tiket masuk ke kawasan pantai relatif mahal untuk ukuran tempat wisata pantai. Harga tiket masuk mulai dari 25.000 – 800.000 Rupiah tergantung dari paket wisata yang Anda ambil.'
		},
		{
			id : 'btn02',
			title : 'Taman Nasional Ujung Kulon',
			city : 'Banten',
			image : 'img/ujung-kulon.jpg',
			description : 'Gelar sebagai Natural World Heritage Site memang layak disandang Taman Nasional Ujung Kulon. Pasalnya, kawasan wisata ini menyuguhkan tiga ekosistem, yaitu daratan, laut, dan pantai. Wilayah daratan terdiri dari Gunung Honje, Semenanjung Kulon, serta dua pulau kecil. Sementara itu, area laut meliputi terumbu karang dan padang lamun. Kawasan yang tidak kalah menarik adalah pantainya. Di zona ini, Pengunjung bisa menikmati suasana hutan pantai dan mangrove. Eksosistem pesisir tersebut ditumbuhi beberapa jenis vegetasi, antara lain pes-caprae, katang-katang, jukut kiara, tarum laut, serta pandan bidur. Panorama Taman Nasional Ujung Kulon akan semakin menarik jika masuk ke area belantaranya. Pengunjung bisa melihat keunikan badak bercula satu, owa jawa, dan anjing hutan. Tak hanya itu, satwa endemik jenis burung, amfibi, serta insekta pun mendiami kawasan Ujung Kulon.',
			open_gate : 'Kawasan wisata Taman Nasionla Ujung Kulon memiliki waktu operasional selama 24 jam setiap harinya.',
			ticket : 'Supaya bisa masuk ke Taman Nasional Ujung Kulon, Anda harus membeli tiket masuk senilai Rp5.000-7.500 per orang. Biaya tersebut belum termasuk untuk kegiatan di sekitar area, seperti berkemah, menjelajahi hutan, atau memancing. Karena itu, persiapkan tenaga dan bujet secukupnya agar dapat menyusuri seluruh zona yang ditawarkan tempat wisata di Pandeglang ini.'
		},
		{
			id : 'btn03',
			title : 'Pantai Tanjung Lesung',
			city : 'Banten',
			image : 'img/tanjung-lesung.jpg',
			description : 'Tanjung Lesung merupakan sebuah pantai berpasir putih dan berombak kecil. Luas kawasan pantai dengan bentuk melengkung mirip lumpang penumbuk padi ini adalah sekitar 150 hektare. Beberapa bagian dari tempat wisata di Pandeglang ini ditumbuhi pepohonan hijau sehingga menciptakan perpaduan pantai yang indah. Di samping itu, tersedia jembatan kayu yang memanjang ke tengah laut sebagai tempat menikmati pemandangan. Tanjung Lesung memiliki kontur landai dengan garis pantai mencapai 15 km. Kondisi tersebut sangat menguntungkan karena pengunjung bisa melakukan berbagai macam kegiatan. Mulai dari duduk di tepi pantai, voli pantai, memancing, bermain banana boat, hingga menjajal jet ski. Tidak hanya itu, Anda pun diperbolehkan menyelam ke dasar laut untuk melihat keindahannya. Tertarik untuk berkunjung ke Tanjung Lesung? Anda dapat memulai perjalanan dari Kota Serang, Banten. Jika tidak ada hambatan, lama perjalanan hanya akan memakan waktu sekitar 2 jam dengan kendaraan pribadi. Pun bisa menaiki bus yang bertujuan ke Terminal Labuan. Dari sini, pengunjung harus menyewa ojek atau taksi untuk mengantar ke lokasi pantai.',
			open_gate : 'Objek wisata ini dibuka untuk wisatawan setiap hari. Jam bukanya pun selama 24 jam, sehingga pengunjung dapat menikmati banyak waktu di sini.',
			ticket : 'Meskipun berdiri resort mewah di dekatnya, namun tiket masuk objek wisata tetap murah. Untuk menikmati keindahan pantai, harga yang dipatok pun sesuai dengan yang ditawarkan yaitu 30.000. Harga parkir pun tidak terlampau mahal yaitu 5.000.'
		},
		{
			id : 'btn04',
			title : 'Pantai Sawarna',
			city : 'Banten',
			image : 'img/sawarna.jpg',
			description : 'Pantai Sawarna adalah sebuah pantai yang menghadap ke Samudera Hindia, sehingga mempunyai ombak khas pantai selatan yaitu berombak besar dan berarus kuat, menjadikannya sangat cocok untuk wisata selancar. Memang wisata selancar belum terlalu populer di Indonesia, tapi di luar negeri banyak sekali orang yang menyukai kegiatan air ini. Di Pantai Sawarna banyak wisatawan asing yang betah berlama-lama berada di sini untuk berselancar, dan juga berkunjung ke tempat wisata lain di Desa Sawarna. Pantai Sawarna yang mempunyai panjang 65 KM, dengan air laut yang jernih, pasir yang putih, berbukit hijau, dihiasi karang, dan tidak terlalu ramai pengunjung adalah pantai yang paling indah di Banten sehingga anda tidak perlu ragu untuk datang berkunjung dan menikmati pesona wisata yang tersembunyi ini. Berlokasi di sebuah desa pesisir selatan, Pantai Sawarna selalu dihubungkan dengan kisah sang penguasa laut selatan, Nyai Roro Kidul. Pantai Sawarna yang berjarak sekitar 150 KM dari kota Rangkasbitung banyak didatangi wisatawan yang berasal dari Bandung, Jakarta, dan sekitarnya karena dari kota-kota tersebut jaraknya tidak terlalu jauh. Selain itu jalanan menuju Pantai Sawarna juga sudah lumayan baik, dan terus diperbaiki sehingga bisa saya pastikan dalam waktu beberapa tahun ke depan, tempat wisata di Banten ini akan menjadi salah satu primadona wisata bagi warga Bandung, Jakarta, dan sekitarnya. Waktu perjalanan dari Jakarta menuju Pantai Sawarna adalah sekitar 7 jam dengan jarak tempuh sekitar 270 KM.',
			open_gate : 'Pantai terbuka untuk umum dan bisa dikunjungi setiap hari. Buka selama 24 jam.',
			ticket : 'Tiket masuk wisata pantai ini terbilang cukup murah. Cukup dengan beberapa ribu pengunjung sudah bisa menikmati keindahan kawasan pantai.'
		},
	]

	$.each(data, function(i, loc){
		$('#location').append(`
			<div class="col-md-6 col-sm-12">
				<div class="card">
					<a href="#">
				  		<img src="`+loc.image+`" class="card-img-top" alt="">
			  		</a>
				  	<div class="card-body">
				  		<a href="">
				    		<h5 class="card-title">`+loc.title+` - `+loc.city+`</h5>
				    	</a>
				    		<p class="card-text">`+loc.description.slice(0,200)+`...</p>
				    	<a href="detail-banten.html" class="btn btn-primary">Baca lebih lanjut...</a>
				  	</div>
				</div>
			</div>
		`)
	})
}

function destinasiJakarta(){
	let data = [
		{
			id : 'jkt01',
			title : 'Taman Mini Indonesia Indah',
			city : 'Jakarta',
			image : 'img/tmii.jpg',
			description : 'Taman Mini Indonesia Indah atau yang biasa disingkat dengan TMII adalah salah satu tempat wisata yang terletak di Jakarta Timur. Dibangun di atas tanah seluas 150 hektar, Taman Mini Indonesia Indah adalah salah satu taman rekreasi terbesar di Indonesia. Taman Mini Indonesia Indah merupakan sebuah taman rekreasi yang berisi gambaran kebudayaan nusantara. Di sini, Anda bisa melihat sebuah danau dengan miniatur kepulauan Indonesia dari Sabang sampai Merauke. Tak hanya itu, masih ada banyak kebudayaan khas tiap provinsi di Indonesia yang dipamerkan di sini mulai dari tarian daerah, pakaian adat, rumah ibadah tiap agama resmi di Indonesia, berbagai museum dan lain-lain. TMII Rencana pembangunan diawali dari pertemuan di rumah Soeharto, mantan presiden Indonesia, di Jalan Cendana Nomor 8, Jakarta, pada tanggal 13 Maret 1970. Dalam pertemuan tersebut, Siti Hartinah atau yang lebih dikenal dengan panggilan Ibu Tien yang merupakan istri mantan Presiden Soeharto mengusulkan akan dibangun sebuah lokasi yang memuat wisata budaya untuk membangkitkan kebanggaan rakyat Indonesia terhadap budaya nusantara. Kemudian dimulailah proyek miniatur Indonesia ‘Indonesia Indah’ di bawah Yayasan Harapan Indah. Pembangunan dimulai pada tahun 1972 dan pada tanggal 20 April 1975, TMII resmi dibuka. Pada tahun 1991, dibuat maskot untuk tempat wisata ini berupa tokoh wayang Hanoman yang diberi nama NITRA (Anjani Putra).',
			open_gate : 'Jam operasional Taman Mini Indonesia Indah pada weekdays dari pintu masuk adalah dari 07.00 – 22.00 WIB. Hal itu sama dengan weekend, yaitu pada hari Sabtu dan Minggu dengan jam yang sama. Begitu juga dengan hari libur atau tanggal merah, jam operasional yang sama juga berlaku sama. Namun, untuk jam operasional wahana Istana Anak-anak Indonesia, dimulai dari 08.30 WIB hingga 17.00 WIB. Sementara itu, untuk wahana Istana Anak-anak Indonesia jam operasional agak sedikit berbeda. Setiap hari seluruh wahana ini dimulai dari pukul 08.30 WIB hingga pukul 17.00 WIB. Untuk wahana Rekreasi, rata-rata dimulai dari pukul 09.00 hingga 17.00 WIB pada weekdays. Dan dibuka dari pukul 08.30 WIB hingga 18.00 WIB selama weekend.',
			ticket : 'Harap diperhatikan harga tiket taman mini libur lebaran & high season dapat mengalami perubahan. Ada baiknya langsung menghubungi TMII untuk kepastian harga tiket. Periode libur lebaran & high season Taman Mini mulai tanggal 15 Juni s/d 01 Juli 2018 dengan harga tiket pintu masuk TMII Rp20.000'
		},
		{
			id : 'jkt02',
			title : 'Pantai Ancol',
			city : 'Jakarta',
			image : 'img/ancol.jpeg',
			description : 'Ancol merupakan salah satu ikon wahana wisata pantai di kota Jakarta. Tempat wisata ini sangat terkenal sehingga tidak heran jika mereka yang berasal dari luar kota Jakarta ataupun dari dalam kota sendiri gemar berkunjung ke Ancol. Saat musim liburan, Ancol selalu penuh dengan pengunjung. Ini disebabkan oleh banyaknya hiburan yang ditawarkan oleh Ancol, seperti gelanggang samudera, dunia fantasi (dufan) dan masih banyak lainnya.',
			open_gate : 'Jam operasional Pantai Ancol pada weekdays dari pintu masuk adalah dari 06.00 – 18.00 WIB. Hal itu sama dengan weekend, yaitu pada hari Sabtu dan Minggu dengan jam yang sama.',
			ticket : 'Untuk memasuki kawasan wisata ini pengunjung akan dikenakan biaya tiket pintu gerbang ancol. Harga tiket berlaku sama setiap hari yaitu 25.000'
		},
		{
			id : 'jkt03',
			title : 'Seaworld Ancol',
			city : 'Jakarta',
			image : 'img/seaworld.jpg',
			description : 'Sekarang berwisata tidak hanya hiburan tetapi juga sebagai sarana belajar atau sering dikenal dengan ‘Edutainment’. Tidak hanya sebagai hiburan, tetapi juga memberi edukasi bermanfaat kepada pengunjung, salah satunya yaitu SeaWorld Ancol. SeaWorld Ancol merupakan wisata populer di kawasan Ancol Jakarta Baycity yang mengusung 3 tujuan utama. Yaitu, tidak hanya menghibur, juga memberikan edukasi tentang biota laut, dan pengalaman konservasi yang memanjakan mata. Tempat wisata yang menyuguhkan 3 zona perairan yaitu zona perairan tawar, zona pesisir, dan zona perairan laut. SeaWorld menyuguhkan keindahan 7.300 biota air tawar dengan 48 jenis ikan dan 1 jenis reptil. Di zona pesisir, pengunjung akan dimanjakan dengan akuarium yang dibuat mirip dengan biota pesisir aslinya. Dan zona laut menampilkan 11.500 biota dengan 138 jenis ikan dan avertebrata serta 3 jenis reptil. reptilia kura-kura di aquarium seaworld ancol Melihat hewan reptil di dalam aquarium Seaworld Ancol menjadi salah satu atraksi yang seru dan menyenangkan. foto: Haris Chairudin Ketiganya disuguhkan dalam 28 display dengan 19 akuarium laut, 9 akuarium tawar dan 4 kolam terbuka. Masing – masing display akan memberi tema khusus dan nuansa berbeda dengan pesan edukasi untuk pengunjung. Seaworld Ancol dengan luas ±3 hektar, menyuguhkan berbagai wahana hiburan dunia air yang memanjakan mata. Di sini juga memberi program edukasi tentang kehidupan biota laut, khususnya untuk rombongan study tour sekolah. Untuk beberapa binatang laut hampir punah seperti penyu laut bahkan dilakukan konservasi khusus.',
			open_gate : 'Jika pengunjung ingin menikmati segala keseruan atraksi di di sini, datanglah dari pukul 09.00 WIB. Atraksi – atraksi dapat dinikmati dari pukul 09.00 sampai pukul 17.00 WIB.',
			ticket : 'Harga tiket masuk Seaworld Ancol memang tergolong lebih murah dibanding area wisata lain di ancol. Namun atraksi biota laut di tempat tidak kalah seru dibanding area wisata lain, dimulai dari 80.000 – 300.000'
		},
		{
			id : 'jkt04',
			title : 'Dunia Fantasi',
			city : 'Jakarta',
			image : 'img/dufan.jpg',
			description : 'Dunia Fantasi adalah taman hiburan keluarga di area Taman Impian Jaya Ancol. Taman ini menawarkan beragam wahana, mulai dari yang menegangkan seperti Tornado, Halilintar dan Hysteria, hingga yang cocok untuk semua umur seperti Rumah Miring, Poci-Poci, Turangga Rangga, dan Pontang-Pontang. Tempat wisata di Jakarta ini juga menawarkan wahana dengan tema khusus, misalnya Ice Age Arctic Adventure, Treasureland, Dufan Glow, Fantasy Lights: Magic of Dufan, dan Hello Kitty Adventure. Efek suara, cahaya, dan penampilan dari robot animatronik serta aktor akan membuat wahana-wahana ini semakin meriah. Tiket untuk wahana-wahana bertema ini bisa dipesan secara online, untuk menghindari antrean.',
			open_gate : 'Pengunjung bisa mencapai Dunia Fantasi dengan cara yang sama dengan menuju ke Taman Impian Jaya Ancol dan Ocean Dream Samudra. Dunia Fantasi buka setiap hari dari pukul 10:00 hingga 18:00. Pada akhir pekan, Dufan buka hingga pukul 20:00.',
			ticket : 'Harga tiket masuk Dufan masih tergolong terjangkau, jika dibandingkan dengan berbagai keseruan yang dapat dirasakan. Untuk masuk kawasan Dunia Fantasi , pengunjung harus melewati pintu gerbang Ancol dengan membayar tiket masuk Rp25.000.'
		},
	]

	$.each(data, function(i, loc){
		$('#location').append(`
			<div class="col-md-6 col-sm-12">
				<div class="card">
					<a href="#">
				  		<img src="`+loc.image+`" class="card-img-top" alt="">
			  		</a>
				  	<div class="card-body">
				  		<a href="">
				    		<h5 class="card-title">`+loc.title+` - `+loc.city+`</h5>
				    	</a>
				    		<p class="card-text">`+loc.description.slice(0,200)+`...</p>
				    	<a href="detail-jakarta.html" class="btn btn-primary">Baca lebih lanjut...</a>
				  	</div>
				</div>
			</div>
		`)
	})
}

function destinasiJabar(){
	let data = [
		{
			id : 'jbr01',
			title : 'Kawah Putih',
			city : 'Bandung',
			image : 'img/kawah-putih.jpg',
			description : 'Kawah Putih adalah tempat wisata di Bandung yang paling terkenal. Berlokasi di Ciwidey, Jawa Barat, kurang lebih sekitar 50 KM arah selatan kota Bandung, Kawah Putih adalah sebuah danau yang terbentuk akibat dari letusan Gunung Patuha. Sesuai dengan namanya, tanah yang ada di kawasan ini berwarna putih akibat dari pencampuran unsur belerang. Selain tanahnya yang berwarna putih, air danau kawasan Kawah Putih juga mempunyai warna yang putih kehijauan dan dapat berubah warna sesuai dengan kadar belerang yang terkandung, suhu, dan cuaca. Kawah Putih Ciwidey berada di kawasan pegunungan yang mempunyai ketinggian lebih dari 2.400 meter di atas permukaan laut. Dengan ketinggian tersebut, suhu udara di kawasan Kawah Putih tentu saja dingin dengan suhu 8 derajat Celsius sampai dengan 22 derajat Celsius, oleh karena itu jangan lupa membawa jaket atau memakai pakaian yang tebal. Selain untuk dinikmati keindahannya oleh para wisatawan, Kawah Putih Ciwidey juga sering kali menjadi tempat kegiatan lain, misalnya pengambilan gambar film, melukis, foto pengantin, sampai dengan kegiatan mendaki dan berkuda',
			open_gate : 'Tempat wisata ini buka setiap hari dari jam 7 pagi sampai dengan jam 5 sore.',
			ticket : 'Harga tiket masuk Kawah Putih pada hari biasa dan hari libur serta akhir pekan adalah sama yaitu 15.000 Rupiah per orang.'
		},
		{
			id : 'jbr02',
			title : 'Stone Garden',
			city : 'Padalarang',
			image : 'img/stone.jpg',
			description : 'Tidak banyak orang mengetahui keindahan yang disuguhkan oleh pemandangan di atas bukit Stone Garden ini. Apalagi bila wisatawan berkunjung di padang bertabur bebatuan ini pada pagi hari saat matahari muncul atau di senja hari saat matahari tenggelam. Pemandangan yang disuguhkan di tempat wisata di Bandung yang satu ini tampak fenomenal mengundang decak kekaguman pengunjung, setelah menjelajah bebatuan yang terbentuk secara alamiah bekas danau di zaman purba. Tentu tidak disangkal bila dikatakan Taman Batu yang terletak di dataran tinggi di atas bukit ini tidak kalah indahnya dari tempat wisata yang ada di luar negeri. Setelah sedikit treking melewati bebatuan yang menanjak, Anda bisa menapak dan melihat padang rumput tempat bebatuan yang tegak dengan formasi yang begitu artistik. Keindahan pemandangan yang terhampar luas di antara tanah pertanian penduduk serta langit lepas sejauh mata memandang ini tidak kalah bila dibandingkan dengan Grand Canyon di Amerika yang viral itu.',
			open_gate : 'Untuk berkunjung ke kawasan wisata ini dapat memilih hari apapun. Karena objek wisata ini buka setiap hari. Buka mulai pukul 8 pagi hingga 5 sore.',
			ticket : 'Tiket untuk memasuki kawasan wisata ini sangat murah. Harga tiket bisa didapat dengan membayar hanya Rp5.000 saja. Selain itu jika pengunjung ingin berkemah dikenakan tarif khusus. Besarannya disesuaikan dengan lama waktu yang dihabiskan selama berkemah'
		},
		{
			id : 'jbr03',
			title : 'Green Canyon',
			city : 'Pangandaran',
			image : 'img/green-canyon.jpg',
			description : 'Wisata di Jawa Barat identik dengan mall, adventure park, dan pusat perbelanjaan. Siapa sangka kalau ternyata Jawa Barat juga memiliki wisata alam yang menakjubkan yaitu Green Canyon. Green Canyon atau lebih dikenal sebagai Cukang Taneuh oleh warga sekitar, berlokasi di Desa Kertayasa, Kecamatan Cijulang, Kabupaten Ciamis. Kurang lebih 31 km dari Kota Pangandaran. Asal muasal nama Green Canyon sendiri adalah dari seorang turis Perancis yang datang pada tahun 1993. Hal ini dikarenakan airnya yang jernih kehijauan dari sungai dan lumut hijau berlimpah di sisi tebing yang membuatnya populer dengan nama Green Canyon. Bagi penduduk lokal, Cukang Taneuh memiliki makna jembatan tanah. Hal ini karena di atas lembah dan jurang dari Green Canyon terdapat sebuah jembatan dari tanah yang digunakan oleh para petani setempat untuk menuju kebun mereka.',
			open_gate : 'Jam operasional tempat wisata ini berlangsung mulai pukul 07.00 sampai dengan 17.00 WIB. Khusus di hari Jumat, Green Canyon baru dibuka pukul 13.00, setelah shalat Jumat.',
			ticket : 'Harga tiket masuk ke Green Canyon mulai dari 150.000 – 250.000 Rupiah tergantung dari paket wisata yang Anda ambil.'
		},
		{
			id : 'jbr04',
			title : 'Gunung Pancar',
			city : 'Bogor',
			image : 'img/pancar.jpg',
			description : 'Gunung Pancar adalah salah satu destinasi yang memenuhi kriteria tersebut dengan sempurna. Kawasan ini menyuguhkan panorama hutan pinus dan nuansa damai khas pegunungan. Selain itu, tempat wisata di Sentul ini juga menawarkan wahana lain yang tidak kalah menarik. Pertama, ada zona camping di tengah hutan pinus. Anda dapat menginap di area ini dengan mendirikan tenda. Kalau enggan membawa perlengkapan sendiri, zona glamping bisa menjadi solusi. Di zona glamping sudah disediakan tenda lengkap dengan tempat tidur, dapur, serta kamar mandi. Namun, Anda harus menyiapkan bujet lebih banyak untuk menikmati akomodasi di wahana ini. Selain kedua wahana tersebut, ada pula zona Fun Games dan Corporate Team Building. Kegiatannya dilakukan selama satu hari penuh dengan berbagai permainan. Anda bisa mengikuti aktivitas ini bersama teman-teman, tim, komunitas, atau karyawan perusahaan. Khusus untuk anak-anak sekolah, disediakan paket School Program. Mengusung tema kerja sama, tanggung jawab, dan kepedulian terhadap alam, mereka harus melakukan beberapa aktivitas mulai dari trekking, character building games, hingga pentas seni.',
			open_gate : 'Kawasan wisata hutan pinus Gunung Pancar ini buka setiap hari selama 24 Jam',
			ticket : 'Untuk bisa menikmati keindahan hijau kawasan hutan pinus ini pengunjung akan dikenakan biaya tiket yang sangat murah. Cukup mengeluarkan beberapa ribu sudah bisa berkeliling kawasan wisata ini. THarga tiket masuk ke Green Canyon mulai dari 5.000 – 10.000 Rupiah tergantung usia.'
		},
	]

	$.each(data, function(i, loc){
		$('#location').append(`
			<div class="col-md-6 col-sm-12">
				<div class="card">
					<a href="#">
				  		<img src="`+loc.image+`" class="card-img-top" alt="">
			  		</a>
				  	<div class="card-body">
				  		<a href="">
				    		<h5 class="card-title">`+loc.title+` - `+loc.city+`</h5>
				    	</a>
				    		<p class="card-text">`+loc.description.slice(0,200)+`...</p>
				    	<a href="detail-jabar.html" class="btn btn-primary">Baca lebih lanjut...</a>
				  	</div>
				</div>
			</div>
		`)
	})
}

function destinasiJateng(){
	let data = [
		{
			id : 'jtg01',
			title : 'Candi Borobudur',
			city : 'Magelang',
			image : 'img/borobudur.jpg',
			description : 'Borobudur adalah sebuah candi Buddha yang terletak di Borobudur, Magelang, Jawa Tengah, Indonesia. Candi ini terletak kurang lebih 100 km di sebelah barat daya Semarang, 86 km di sebelah barat Surakarta, dan 40 km di sebelah barat laut Yogyakarta. Candi berbentuk stupa ini didirikan oleh para penganut agama Buddha Mahayana sekitar tahun 800-an Masehi pada masa pemerintahan wangsa Syailendra. Borobudur adalah candi atau kuil Buddha terbesar di dunia, sekaligus salah satu monumen Budha terbesar di dunia. Monumen ini merupakan model alam semesta dan dibangun sebagai tempat suci untuk memuliakan Buddha sekaligus berfungsi sebagai tempat ziarah untuk menuntun umat manusia beralih dari alam nafsu duniawi menuju pencerahan dan kebijaksanaan sesuai ajaran Buddha. Para peziarah masuk melalui sisi timur dan memulai ritual di dasar candi dengan berjalan melingkari bangunan suci ini searah jarum jam, sambil terus naik ke undakan berikutnya melalui tiga tingkatan ranah dalam kosmologi Buddha. Ketiga tingkatan itu adalah Kāmadhātu (ranah hawa nafsu), Rupadhatu (ranah berwujud), dan Arupadhatu (ranah tak berwujud). Dalam perjalanannya para peziarah berjalan melalui serangkaian lorong dan tangga dengan menyaksikan tak kurang dari 1.460 panel relief indah yang terukir pada dinding dan pagar langkan.Proyek pemugaran terbesar digelar pada kurun waktu 1975 hingga 1982 atas upaya Pemerintah Republik Indonesia dan UNESCO, kemudian situs bersejarah ini masuk dalam daftar Situs Warisan Dunia',
			open_gate : 'Wisatawan bisa berkunjung ke candi ini setiap hari. Taman Wisata Candi sudah dibuka mulai dari pagi hingga sore hari dari jam 08.00 sampai 16.00 WIB',
			ticket : 'Harga tiket masuk ke dalam kawasan candi dibedakan menjadi beberapa jenis. Tiket individu dan tiket rombongan sekolah (lebih murah) serta paket beberapa candi yaitu 25.000-30.000'
		},
		{
			id : 'jtg02',
			title : 'Lawang Sewu',
			city : 'Semarang',
			image : 'img/lawang.jpg',
			description : 'Gedung bersejarah di Indonesia yang berlokasi di Kota Semarang, Jawa Tengah. Gedung ini, dahulu yang merupakan kantor dari Nederlands-Indische Spoorweg Maatschappij atau NIS. Dibangun pada tahun 1904 dan selesai pada tahun 1907. Terletak di bundaran Tugu Muda yang dahulu disebut Wilhelminaplein. Masyarakat setempat menyebutnya Lawang Sewu karena bangunan tersebut memiliki pintu yang sangat banyak, meskipun kenyataannya, jumlah pintunya tidak mencapai seribu. Bangunan ini memiliki banyak jendela yang tinggi dan lebar, sehingga masyarakat sering menganggapnya sebagai pintu (lawang). Bangunan kuno dan megah berlantai dua ini setelah kemerdekaan dipakai sebagai kantor Djawatan Kereta Api Repoeblik Indonesia (DKARI) atau sekarang PT Kereta Api Indonesia. Selain itu pernah dipakai sebagai Kantor Badan Prasarana Komando Daerah Militer (Kodam IV/Diponegoro) dan Kantor Wilayah (Kanwil) Kementerian Perhubungan Jawa Tengah. Pada masa perjuangan gedung ini memiliki catatan sejarah tersendiri yaitu ketika berlangsung peristiwa Pertempuran lima hari di Semarang (14 Oktober - 19 Oktober 1945). Gedung tua ini menjadi lokasi pertempuran yang hebat antara pemuda AMKA atau Angkatan Muda Kereta Api melawan Kempetai dan Kidobutai, Jepang. Maka dari itu Pemerintah Kota Semarang dengan Surat Keputusan Walikota Nomor. 650/50/1992, memasukan Lawang Sewu sebagai salah satu dari 102 bangunan kuno atau bersejarah di Kota Semarang yang patut dilindungi',
			open_gate : 'Saat ini bangunan tua tersebut telah mengalami tahap konservasi dan revitalisasi yang dilakukan oleh Unit Pelestarian benda dan bangunan bersejarah PT Kereta Api Persero. Jam operasionalnya sendiri akan buka pada pukul 7 pagi dan akan ditutup kembali pada pukul 9 malam.',
			ticket : 'Untuk bisa masuk ke dalam anda akan di tarik harga tiket masuk Lawang Sewu sebesar 10 ribu rupiah untuk orang dewasa. Bagi anak-anak akan dikenakan biaya sebesar 5 ribu rupiah'
		},
		{
			id : 'jtg03',
			title : 'Umbul Ponggok',
			city : 'Klaten',
			image : 'img/umbul.jpg',
			description : 'Umbul Ponggok merupakan wisata air yang terletak di desa Ponggok, Klaten, Jawa Tengah. Umbul Ponggok merupakan mata air yang dimanfaatkan menjadi objek wisata, pemandian dan snorkeling. Kolam Umbul Ponggok berukuran panjang 70 m dan lebar 40 m, mata air terletak pada dasar kolam dan terus mengalirkan air sehingga kolam Umbul Ponggok cenderung jernih. Pada dasar kolam terdapat ikan dan batu-batuan sehingga kolam Umbul Ponggok kerap digunakan sebagai lokasi foto dibawah air. Dahulu Umbul Ponggok adalah mata air yang dijadikan sebuah water reservoir yang berfungsi sebagai tampungan air untuk kebutuhan operasional Pabrik Gula Ponggok dan Pabrik Gula Karanganom, selain itu untuk pengairan perkebunan tebu di wilayah Polanharjo, Karanganom, Ceper. Setelah pabrik gula tidak beroperasional lagi, keberadaan water reservoir Ponggok masih difungsikan sebagai pengairan sawah dan perkebunan sampai sekarang. Masyarakat sekitar lebih sering menyebutnya Umbul Ponggok (mata air Ponggok) karena sumber airnya memang berasal dari mata air alami yang mempunyai kualitas bagus dan untuk kebutuhan air minum warga sekitar. Seiring dengan perkembangan zaman, Umbul Ponggok merupakan objek yang memiliki potensi luar biasa, selain untuk kebutuhan seperti pengairan sawah dan air minum, dapat juga sebagai objek wisata. Pemerintah Desa Ponggok bersama masyarakat kemudian berinovasi dan berkreasi dengan mengubah umbul tersebut menjadi objek wisata yang unik dengan tema snorkeling, diving dan foto bawah air. Untuk menarik minat wisatawan maka umbul ponggok mengiklankan dirinya dengan slogan “Bunaken van Klaten“ - sensasi menyelam dalam air, menikmati keindahan bawah air dengan rasa air tawar yang segar dan dingin seperti snorkeling dan diving di Bunaken',
			open_gate : 'Umbul Ponggok sendiri buka setiap hari mulai jam 07.00 – 17.00 WIB.',
			ticket : 'Untuk masuk ke tempat wisata klaten yang satu ini, kalian perlu membayar tiket sebesar IDR 15.000 per orang.'
		},
		{
			id : 'jtg04',
			title : 'Dataran Tinggi Dieng',
			city : 'Wonosobo',
			image : 'img/dieng.jpg',
			description : 'Gambaran tentang negeri tempat bersemayamnya dewa dewi selama ini mungkin hanya bisa kita dapatkan dalam cerita dongeng saja. Namun mimpi itu akan menjadi nyata bila kita mau menyempatkan diri untuk untuk berkunjung ke Dieng yang berada di Kabupaten Wonosobo dan Banjarnegara, Jawa Tengah yang bisa dijangkau dari Jogja kurang lebih selama 3 jam perjalanan dengan menggunakan kendaraan pribadi. Nama Dieng Plateau sendiri berasal dari Bahasa Sanskerta yaitu “Di” yang berarti gunung dan “Hyang” yang berarti gunung. Namun ada pendapat lain yang mengatakan bahwa kata Dieng berasal dari Bahasa Sunda dengan kata yang sama “Di”dan “Hyang” karena pada sekitar abad ke-7 Dieng pernah berada dalam pengaruh politik Kerajaan Galuh yang ada di Jawa Barat. Keindahan alam di Dieng selalu diidentikan dengan gunung atau tempat bersemayamnya para dewa dewi. Kecantikan alam tersebut masih bisa kita saksikan sampai saat ini. Tidak hanya kecantikan pemandangan alamnya saja yang menjadi alasan kita harus berkunjung kesana, tetapi juga karena sejarah dan budayanya.',
			open_gate : 'Jam operasional dataran tinggi dieng buka 24 jam kecuali untuk kawasan wisata yang hanya buka sampai sore.',
			ticket : 'Untuk memasuki kawasan wisata Dataran Tinggi Dieng pengunjung dikenakan biaya tiket 10 ribu rupiah. Harga tiket ini belum termasuk tiket-tiket aktivitas, situs-situs yang terdapat di sekitar kawasan wisata Dieng dari harga 5 ribu sampai 10 ribu rupiah'
		},
	]

	$.each(data, function(i, loc){
		$('#location').append(`
			<div class="col-md-6 col-sm-12">
				<div class="card">
					<a href="#">
				  		<img src="`+loc.image+`" class="card-img-top" alt="">
			  		</a>
				  	<div class="card-body">
				  		<a href="">
				    		<h5 class="card-title">`+loc.title+` - `+loc.city+`</h5>
				    	</a>
				    		<p class="card-text">`+loc.description.slice(0,200)+`...</p>
				    	<a href="detail-jateng.html" class="btn btn-primary">Baca lebih lanjut...</a>
				  	</div>
				</div>
			</div>
		`)
	})
}

function destinasiJogja(){
	let data = [
		{
			id : 'jog01',
			title : 'Candi Prambanan',
			city : 'Yogyakarta',
			image : 'img/prambanan.jpg',
			description : "Candi Prambanan atau Candi Roro Jonggrang adalah kompleks candi Hindu terbesar di Indonesia yang dibangun pada abad ke-9 masehi. Candi ini dipersembahkan untuk Trimurti, tiga dewa utama Hindu yaitu Brahma sebagai dewa pencipta, Wisnu sebagai dewa pemelihara, dan Siwa sebagai dewa pemusnah. Berdasarkan prasasti Siwagrha nama asli kompleks candi ini adalah Siwagrha (bahasa Sanskerta yang bermakna 'Rumah Siwa'), dan memang di garbagriha (ruang utama) candi ini bersemayam arca Siwa Mahadewa setinggi tiga meter yang menunjukkan bahwa di candi ini dewa Siwa lebih diutamakan. Kompleks candi ini terletak di kecamatan Prambanan, Sleman, DI Yogyakarta dan kecamatan Prambanan, Kabupaten Klaten, Jawa Tengah kurang lebih 17 kilometer timur laut Yogyakarta, 50 kilometer barat daya Surakarta dan 120 kilometer selatan Semarang, persis di perbatasan antara provinsi Jawa Tengah dan Daerah Istimewa Yogyakarta. Letaknya sangat unik, Candi Prambanan terletak di wilayah administrasi desa Bokoharjo, Prambanan, Sleman, sedangkan pintu masuk kompleks Candi Prambanan terletak di wilayah administrasi desa Tlogo, Prambanan, Klaten. Candi ini adalah termasuk Situs Warisan Dunia UNESCO, candi Hindu terbesar di Indonesia, sekaligus salah satu candi terindah di Asia Tenggara. Arsitektur bangunan ini berbentuk tinggi dan ramping sesuai dengan arsitektur Hindu pada umumnya dengan candi Siwa sebagai candi utama memiliki ketinggian mencapai 47 meter menjulang di tengah kompleks gugusan candi-candi yang lebih kecil.  Sebagai salah satu candi termegah di Asia Tenggara, candi Prambanan menjadi daya tarik kunjungan wisatawan dari seluruh dunia.",
			open_gate : 'Candi Prambanan buka setiap hari mulai dari jam 07.00 – 17.00 WIB',
			ticket : 'Untuk pengunjung wisata orang dewasa dibanderol dengan harga Rp 50.000 sedangkan untuk anak dibandrol dengan harga 25.000 berlaku untuk weekday dan weekend.'
		},
		{
			id : 'jog02',
			title : 'Pantai Parangtritis',
			city : 'Yogyakarta',
			image : 'img/parangtritis.jpg',
			description : 'Pantai Parangtritis merupakan destinasi wisata pantai yang populer di antara pantai-pantai lainnya di Yogyakarta. Pantai yang terkenal dengan mitos Nyi Roro Kidul tersebut berjarak 25 km dari pusat kota. Objek wisata ini menjadi salah satu yang mendapat kunjungan tertinggi di Yogyakarta.Kawasan Pantai Parangtritis mendapat kunjungan paling banyak diantara objek wisata lainnya. Jumlah wisatawan pada musim liburan mencapai sekitar 94 ribu orang per hari. Mayoritas wisatawan berasal dari luar daerah Yogyakarta. Di sepanjang pantai tersedia berbagai fasilitas wisata, olahraga pantai, dan spot menarik. Seperti kolam renang, pemandian air hangat, serta penyewaan payung. Tersedia juga wahana ATV, motor trail, jip wisata, paralayang hingga jasa sewa kuda. Pantai Parangtritis memiliki panorama unik yaitu adanya gunung-gunung pasir di sekitar kawasan. Gunung-gunung pasir itu disebut dengan ‘gumuk’. Pantai ini memiliki deburan ombak yang besar karena menghadap langsung ke Samudera Hindia. Di siang hari saat cuaca cerah, disarankan wisatawan melengkapi diri dengan  topi. Untuk mengatasi kilauan cahaya, wisatawan dapat menggunakan kacamata.',
			open_gate : 'Seperti kebanyakan wisata alam lainnya, jam buka pantai ini juga 24 jam senin sampai minggu. Pengunjung bahkan bisa datang malam hari untuk sekedar menikmati suasana pantai pada saat matahari sudah tenggelam.',
			ticket : 'Untuk memasuki kawasan pantai yang cukup populer di Yogyakarta ini pengunjung tidak perlu mengeluarkan biaya sebesar Rp 10.000. Harga tiket masuk yang ditawarkan relatif murah dan berlaku setiap hari.'
		},
		{
			id : 'jog03',
			title : 'Jalan Malioboro',
			city : 'Yogyakarta',
			image : 'img/malioboro.jpg',
			description : 'Jalan Malioboro adalah nama salah satu kawasan jalan dari tiga jalan di Kota Yogyakarta yang membentang dari Tugu Yogyakarta hingga ke perempatan Kantor Pos Yogyakarta. Secara keseluruhan terdiri dari Jalan Margo Utomo, Jalan Malioboro, dan Jalan Margo Mulyo. Jalan ini merupakan poros Garis Imajiner Kraton Yogyakarta. Pada tanggal 20 Desember 2013, pukul 10.30 oleh Sri Sultan Hamengkubuwono X nama dua ruas jalan Malioboro dikembalikan ke nama aslinya, Jalan Pangeran Mangkubumi menjadi jalan Margo Utomo, dan Jalan Jenderal Achmad Yani menjadi jalan Margomulyo. Terdapat beberapa objek bersejarah di kawasan tiga jalan ini antara lain Tugu Yogyakarta, Stasiun Tugu, Gedung Agung, Pasar Beringharjo, Benteng Vredeburg, dan Monumen Serangan Oemoem 1 Maret. Jalan Malioboro sangat terkenal dengan para pedagang kaki lima yang menjajakan kerajinan khas Jogja dan warung-warung lesehan di malam hari yang menjual makanan gudeg Jogja serta terkenal sebagai tempat berkumpulnya para seniman yang sering mengekspresikan kemampuan mereka seperti bermain musik, melukis, happening art, pantomim, dan lain-lain di sepanjang jalan ini. Saat ini, Jalan Malioboro tampak lebih lebar karena tempat parkir yang ada di pinggir jalan sudah dipindahkan ke kawasan parkir Abu Bakar Ali. Karena Kedepan Malioboro Akan Menjadi Semi Pedestrian',
			open_gate : 'Jam operasional di daerah jalan malioboro 24 jam jadi tidak ada pembatasan waktu untuk berjalan-jalan di daerah malioboro yang penuh cerita',
			ticket : 'Tarif biaya untuk kawasan jalan malioboro tidak dipungut biaya hanya saja membayar parkir.'
		},
		{
			id : 'jog04',
			title : 'Goa Jomblang',
			city : 'Yogyakarta',
			image : 'img/jomblang.jpg',
			description : 'Goa Jomblang merupakan sebuah tempat wisata yang terkenal di Gunungkidul, Yogyakarta. Goa Jomblang ini juga tergolong salah satu Goa purba lho. Selain menawarkan keindahannya goa disini juga cocok buat kamu yang ingin memacu adrenalin. Dari dalam goa kamu akan disuguhkan beberapa keindahan Goa Jomblang ini, diantaranya adalah cahaya yang masuk dari mulut Gua. Satu wisata di Gunung Kidul ini memang sudah lama terkenal di kalangan traveler dalam maupun luar daerah. Di Goa Jomblang ini wisatawan akan menuruni mulut Goa sedalam 15 meter sampai 80 meter. Untuk wisatawan yang memiliki keahlian caving pastinya sangat mudah untuk mencapai dasar gua ini. Untuk pemula tenang saja nanti oleh pemandu wisata akan diberikan pelantikan bagaimana cara caving ini sendiri',
			open_gate : 'Sedangkan Jam buka Goa jomblang ini mulai pada pukul 08.00 sampai 14.00 WIB',
			ticket : 'Untuk harga tiket masuk ke Goa Jomblang  ini kamu akan dikenakan tarif Rp. 450.000 sampai Rp.1.000.000. Memang tergolong mahal untuk harga tiket, karena kamu harus menyewa pemandu serta peralatan yang tak sedikit.'
		},
	]

	$.each(data, function(i, loc){
		$('#location').append(`
			<div class="col-md-6 col-sm-12">
				<div class="card">
					<a href="#">
				  		<img src="`+loc.image+`" class="card-img-top" alt="">
			  		</a>
				  	<div class="card-body">
				  		<a href="">
				    		<h5 class="card-title">`+loc.title+` - `+loc.city+`</h5>
				    	</a>
				    		<p class="card-text">`+loc.description.slice(0,200)+`...</p>
				    	<a href="detail-jogja.html" class="btn btn-primary">Baca lebih lanjut...</a>
				  	</div>
				</div>
			</div>
		`)
	})

	console.log(data.findIndex(x => x.id ==="jog02"))
}

function destinasiJatim(){
	let data = [
		{
			id : 'jtm01',
			title : 'Gunung Bromo',
			city : 'Jawa Timur',
			image : 'img/bromo.jpg',
			description : 'Gunung Bromo (dari bahasa Sanskerta: Brahma, salah seorang Dewa Utama dalam agama Hindu) atau dalam bahasa Tengger dieja "Brama", adalah sebuah gunung berapi aktif di Jawa Timur, Indonesia. Gunung ini memiliki ketinggian 2.329 meter di atas permukaan laut dan berada dalam empat wilayah kabupaten, yakni Kabupaten Probolinggo, Kabupaten Pasuruan, Kabupaten Lumajang, dan Kabupaten Malang. Gunung Bromo terkenal sebagai objek wisata utama di Jawa Timur. Sebagai sebuah objek wisata, Bromo menjadi menarik karena statusnya sebagai gunung berapi yang masih aktif. Gunung Bromo termasuk dalam kawasan Taman Nasional Bromo Tengger Semeru. Bentuk tubuh Gunung Bromo bertautan antara lembah dan ngarai dengan kaldera atau lautan pasir seluas sekitar 10 kilometer persegi. Ia mempunyai sebuah kawah dengan garis tengah ± 800 meter (utara-selatan) dan ± 600 meter (timur-barat). Sedangkan daerah bahayanya berupa lingkaran dengan jari-jari 4 km dari pusat kawah Bromo. Bagi penduduk sekitar Gunung Bromo, suku Tengger, Gunung Bromo/Gunung Brahma dipercaya sebagai gunung suci. Setiap setahun sekali masyarakat Tengger mengadakan upacara Yadnya Kasada atau Kasodo. Upacara ini bertempat di sebuah pura yang berada di bawah kaki Gunung Bromo dan dilanjutkan ke puncak Bromo. Upacara diadakan pada tengah malam hingga dini hari setiap bulan purnama sekitar tanggal 14 atau 15 di bulan Kasodo (kesepuluh) menurut penanggalan Jawa.',
			open_gate : 'Gunung Bromo buka 24 jam. Sebaiknya para wisatawan memilih bulan dimana cuaca masih cerah agar pendakian berjalan lancar',
			ticket : 'Tiket masuk wisatawan mancanegara ke Gunung Bromo Rp 220.000 pada hari kerja dan untuk hari libur dengan harga Rp 320.000'
		},
		{
			id : 'jtm02',
			title : 'Kawah Ijen',
			city : 'Jawa Timur',
			image : 'img/ijen.jpg',
			description : 'Kawah Ijen merupakan sebuah kawah dari Gunung Ijen yang memiliki pemandangan indah. Kawah ini membentuk danau yang sangat indah akibat letusan Gunung Ijen. Lokasi ini merupakan salah satu geowisata yang berpotensi menjadi andalan di Banyuwangi. Berada di ketinggian 2.386 mdpl, dengan kabut dan asap belerang membuat Kawah Ijen semakin eksotis. Dengan pesona ‘Api Biru’, Kawah Ijen banyak diburu wisatawan domestik maupun mancanegara.  Menuju lokasi Kawah Ijen, wisatawan harus mendaki sepanjang 3 km atau sekitar 3 jam. Dari area parkir (Paltuding), sekitar 1,5 km awal jalannya menanjak lalu sisanya cukup landai. Dengan suhu mencapai 2°C,  diperlukan stamina prima saat mendaki dan barang bawaan seefektif mungkin.',
			open_gate : 'Kawah ini sangat bagus jika dikunjungi malam hari. Karena bisa melihat api biru di kawah. Jam buka loketnya sendiri mulai dari subuh sampai siang hari. Senin sampai minggu dari jam 01.00 - sampai 12.00',
			ticket : 'Tiket ditetapkan sama untuk semua hari dan tidak ada perbedaan dari segi usia. Hanya saja perbedaan domestik dengan harga Rp 10.000 dan mancanegara Rp 200.000'
		},
		{
			id : 'jtm03',
			title : 'Jatim Park',
			city : 'Jawa Timur',
			image : 'img/jatim.jpg',
			description : 'Jatim Park adalah sebuah tempat rekreasi dan taman belajar yang terdapat di Kota Batu, Jawa Timur. Objek wisata ini berada sekitar 20 km barat Kota Malang, dan kini menjadi salah satu icon wisata Jawa Timur. Objek wisata ini memiliki 36 wahana, di antaranya kolam renang raksasa (dengan latar belakang patung Ken Dedes, Ken Arok, dan Mpu Gandring), spinning coaster, dan drop zone. Wahana pendidikan yang menjadi pusat perhatian di antaranya adalah Volcano dan Galeri Nusantara yang juga terdapat tanaman agro, diorama binatang langka, dan miniatur candi-candi. Jatim Park 1 beralamat di Jalan Kartika no. 2, yang berdekatan dengan Klub Bunga',
			open_gate : 'Untuk jam operasional sendiri mulai dari jam 08.00 sampai jam 17.00 WIB',
			ticket : 'Berkunjung ke taman hiburan ini atau ke Zona Rekreasi lainnya, untuk tiket masuknya bisa membeli per zona rekreasi atau langsung membeli tiket paket bundling. Untuk tiket masuk jatim park 1 di hari kerja Rp 75.000 dan jatim park 2 di hari kerja Rp 100.000 ketika hari libur menjadi Rp 130.000'
		},
		{
			id : 'jtm04',
			title : 'Pantai Klayar',
			city : 'Jawa Timur',
			image : 'img/klayar.jpg',
			description : 'Pantai Klayar memiliki Pasir Putih kecoklatan yang sangat lembut dan bersih. Pantai yang tepatnya terletak di desa Kalak, kecamatan Donorejo, kabupaten Pacitan, provinsi Jawa timur.Pantai ini telah menjadi Pantai komersial yang dikembangkan dan dipromosikan oleh pemerintah Pacitan sebagai destinasi. Keberadaan Pantai Klayar ini tidak lepas dari kisah yang terjadi dahulunya di Pantai tersebut. Ada dua versi yang mengungkapkan asal-usul nama Klayar.  Versi pertama mengungkapkan bahwa dahulu kala ada sebuah Perahu yang diterjang Ombak besar dan terdampar di Pantai ini. Perahu yang terombang ambing diterjang Ombak sebelum terdampar disebut dengan istilah “Glayar” yang kemudian lama kelamaan kata “Glayar” berubah menjadi kata “Klayar” yang kini menjadi nama Pantai tersebut. Versi kedua asal mula penamaan Pantai Klayar yakni dulunya memang Pantai ini seringkali dijadikan dikunjungi penduduk untuk berjalan-jalan baik di Pagi maupun Sore Hari. Klayar berasal dari istilah bahasa jawa yakni “klayar-kluyur” yang artinya berjalan-jalan, lama kelamaan kata tersebut lebih di singkatkan menjadi Klayar untuk mempermudah penyebutan',
			open_gate : 'Jam operasional untuk pantai klayar sendiri buka 24 jam jadi kalau ada yang mau camping juga bisa.',
			ticket : 'Harga tiket masuk untuk menikmati keindahan Pantai Klayar cukup terjangkau, yakni Rp 10.000 untuk dewasa dan Rp 5.000 untuk anak-anak'
		},
	]

	$.each(data, function(i, loc){
		$('#location').append(`
			<div class="col-md-6 col-sm-12">
				<div class="card">
					<a href="#">
				  		<img src="`+loc.image+`" class="card-img-top" alt="">
			  		</a>
				  	<div class="card-body">
				  		<a href="">
				    		<h5 class="card-title">`+loc.title+` - `+loc.city+`</h5>
				    	</a>
				    		<p class="card-text">`+loc.description.slice(0,200)+`...</p>
				    	<a href="detail-jatim.html" class="btn btn-primary">Baca lebih lanjut...</a>
				  	</div>
				</div>
			</div>
		`)
	})
}

$(document).ready(function(){
	ApiCorona();
	ApiInstagram();
	ApiTrip();
})