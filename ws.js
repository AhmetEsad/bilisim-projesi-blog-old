const ws = require('ws');
const server = new ws.Server({ port: 8080 });

server.on('connection', (client) => { // birisi bağlandığında
	console.log('🔌 bir kişi bağlandı');
	client.on('message', (message) => { // bağlanan kişiden mesaj alındığında
		console.log(`💬 bir kişi tarafından "${message}" mesajı gönderildi`);
		client.send(`👋👋👋 sunucudan merhaba!`)
	});
	client.on('close', (code, reason) => { // bağlanan kişiyle sunucu arasında bağlantı koptuğunda
		console.log(`❌ bir kişiyle kurulan bağlantı ${code} numaralı sebepten dolayı koptu`);
	});
});

server.on('listening', () => {
	console.log('💻 sunucu başlatıldı');
});