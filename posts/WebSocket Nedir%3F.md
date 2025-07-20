# WebSocket Nedir?
> *WebSocket, tek bir TCP bağlantısı üzerinden tam çift yönlü iletişim kanalı sağlayan bir bilgisayar iletişim protokolüdür. WebSocket protokolü IETF tarafından 2011 yılında RFC 6455 ile standart hale getirilmiş ve WebIDL içerisindeki WebSocket API W3C tarafından standart hale getirilmektedir.*

> *WebSocket, web tarayıcılarında ve web sunucularında uygulanmak üzere tasarlanmıştır, fakat herhangi bir istemci veya sunucu uygulaması tarafından uygulanabilmektedir. WebSocket protokolü, TCP tabanlı bağımsız bir protokoldür. HTTP ile tek ilişkisi, HTTP sunucuları tarafından bir Upgrade isteği olarak yorumlanmasıdır. **WebSocket protokolü, sunucuya ve sunucudan gerçek zamanlı veri aktarımını sağlayarak, tarayıcı ile web sunucusu arasında etkileşimi sağlamaktadır. Bu, sunucunun istemci istemeden tarayıcıya içerik gönderebileceği ve bağlantıyı açık tutarak istediği zaman mesaj alabilmesini veya gönderebilmesini sağlayan standart bir yöntem ile sağlanmaktadır.** Bu şekilde, tarayıcı ile sunucu arasında iki yönlü devam eden bir iletişim gerçekleşebilmektedir. İletişim TCP 80 portu (veya TLS ile şifrelenmiş bağlantılarda 443 portu) üzerinden gerçekleşmektedir ve bu, güvenlik duvarı kullanarak Internet web trafiğini engelleyen ortamlar için bir avantaj olmaktadır. Benzer iki yönlü sunucu-tarayıcı iletişimi Comet gibi standart olmayan stopgap teknolojileri tarafından sağlanmaktaydı.*

> *WebSocket protokolü, Google Chrome, Microsoft Edge, Internet Explorer, Firefox, Safari ve Opera dahil pek çok tarayıcı tarafından desteklenmektedir. WebSocket ayrıca sunucu üzerindeki web uygulamalarının da desteğini gerektirmektedir.*

Kısaca WebSocketler, gerçek zamanlı veri aktarımı için kullanılmaktadır. Örneğin online bir oyun yapıyorsanız, WebSocket kullanmanız gerekecektir. Aşağıda bununla ilgili birkaç örnek gösterdim.

**Sunucu (NodeJS)**
> ```js
const ws = require('ws');
const server = new ws.Server({ port: 8080 });
server.on('connection', (client) => { // birisi bağlandığında
	console.log('🔌 bir kişi bağlandı');
	client.on('message', (message) => { // bağlanan kişiden mesaj alındığında
		console.log(`💬 bir kişi tarafından "${message}" mesajı gönderildi`);
	});
	client.on('close', (code) => { // bağlanan kişiyle sunucu arasında bağlantı koptuğunda
		console.log(`❌ bir kişiyle kurulan bağlantı ${code} numaralı sebepten dolayı koptu`);
	})
});
server.on('listening', () => {
	console.log('💻 sunucu başlatıldı');
})

Kodu çalıştırdığımızda sunucunun başladığını görebiliyoruz.

![](http://localhost:2057/assets/images/nodews.png "\"💻 sunucu başlatıldı\"")
<center><i>"💻 sunucu başlatıldı"</i></center>

\
**Alıcı / Client (Web sayfalarının içinde WebSocket varsayılan olarak bulunuyor)**
> ```js
const server = new WebSocket('ws://localhost:8080');
server.onopen = () => { // sunucu ile bağlantı kurulduğunda
	console.log('🔌 sunucu ile bağlantı kuruldu');
}

![](http://localhost:2057/assets/images/sunucuyla-baglanti.png "\"🔌 sunucu ile bağlantı kuruldu\"")
<center><i>"🔌 sunucu ile bağlantı kuruldu"</i></center>

![](http://localhost:2057/assets/images/birkisibaglandi.png "\"🔌 bir kişi bağlandı\"")
<center><i>"🔌 bir kişi bağlandı"</i></center>

Şimdi bir mesaj göndermeyi deneyelim.

> ```js
server.send('👋 merhaba');

![](http://localhost:2057/assets/images/merhaba.png "👋")
<center><i>"💬 bir kişi tarafından "👋 merhaba" mesajı gönderildi"</i></center>

Sunucu ve alıcı arasındaki bağlantı koptuğunda sadece sunucunun değil, alıcının da haberi olması için bir şey daha ekleyelim.

> ```js
server.onclose = () => { // sunucuyla bağlantı kesildiğinde
    console.log('❌ sunucuyla bağlantı kesildi')
}

Sunucuyu kapatınca alıcımızda konsola şu mesajın yazıldığını görüyoruz:

![](http://localhost:2057/assets/images/sunucuyla-baglanti-x.png "\"❌ sunucuyla bağlantı kesildi\"")
<center><i>"❌ sunucuyla bağlantı kesildi"</i></center>

Şimdi tam tersini deneyip sunucu açıkken alıcının bağlantısını keselim.

![](http://localhost:2057/assets/images/server-baglanti.png "\"❌ bir kişiyle kurulan bağlantı 1005 numaralı sebepten dolayı koptu\"")
<center><i>"❌ bir kişiyle kurulan bağlantı 1005 numaralı sebepten dolayı koptu"</i></center>

Alternatif olarak sunucuyu kullanarak alıcıya mesaj da gönderebiliriz.

Alıcıya şu eventi ekliyoruz:
> ```js
server.onmessage = (msg) => { // mesaj geldiğinde
	console.log(`📪 sunucudan mesaj geldi: ${msg.data}`)}
});

Sunucuya da şu satırı:
> ```js
client.send(`👋👋👋 sunucudan merhaba!`)

![](http://localhost:2057/assets/images/sunucudan-merhaba.png "\"📪 sunucudan mesaj geldi: 👋👋👋 sunucudan merhaba!\"")
<center><i>"📪 sunucudan mesaj geldi: 👋👋👋 sunucudan merhaba!"</i></center>

Gördüğünüz gibi WebSocketler gerçek zamanlı veri aktarımı için kullanılabiliyor.

![](http://localhost:2057/assets/images/whatsapp.png)
<center><i>WhatsApp WebSocket kullanıyor!</i></center>

![](http://localhost:2057/assets/images/twitch.png)
<center><i>Twitch sohbet için WebSocket kullanıyor!</i></center>

![](http://localhost:2057/assets/images/discord.png)
<center><i>Discord WebSocket kullanıyor!</i></center>

![](http://localhost:2057/assets/images/spotify.png)
<center><i>Spotify bile WebSocket kullanıyor!</i></center>

Sat Apr 10 2021 22:33:12 GMT+0300 (GMT+03:00)