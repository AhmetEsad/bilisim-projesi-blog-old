# ffmpeg ile Video Dönüştürme
Bir video göndermek istiyorsunuz fakat formatı uygulama desteklenmiyor mu? ffmpeg ile uygun formata dönüştürebilirsiniz.

- .mkv => .mp4 dönüştürmesi için:
> `ffmpeg -i video.mkv -codec copy video.mp4`

![](http://localhost:2057/assets/images/hocalara-geldik-mkv.png)
<center><i>hocalara-geldik.mkv</i></center>


![](http://localhost:2057/assets/images/hocalara-geldik-mp4.png)
<center><i>hocalara-geldik.mkv ve hocalara-geldik.mp4</i></center>

ffmpeg: https://ffmpeg.org/download.html
Sun Apr 11 2021 03:39:41 GMT+0300 (GMT+03:00)