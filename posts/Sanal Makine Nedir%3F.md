# Sanal Makine Nedir?
> Sanal makine, bilgisayar biliminde programları gerçek bir bilgisayar sistemindeki gibi çalıştıran mekanizmaların yazılım uyarlamasıdır. Sanal Makine, işletim sistemi ile bilgisayar platformu arasında bir sanal ortam yaratır ve bu sanal ortam üzerinde yazılımların çalıştırabilmesine imkân verir.

Kısaca bir sanal makine, işletim sisteminizin içinde çalışan bir işletim sistemidir.

Bilgisayarımızın içinde bir sanal makine çalıştırmak için kullanabileceğimiz bir sürü farklı program ([Hyper-V](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v), [VMWare Player](https://my.vmware.com/en/web/vmware/downloads/details?downloadGroup=WKST-PLAYER-1611&productId=1039&rPId=63655) gibi) ve bir sürü farklı işletim sistemi var ama bu yazımda [VirtualBox](https://www.virtualbox.org/) kullanarak [Ubuntu](https://ubuntu.com/#download) yüklü bir sanal makine yapımını göstereceğim.

![](http://localhost:2057/assets/images/virtualbox.png "VirtualBox kurulumu")
<center><i>VirtualBox kurulumu</i></center>

Kurulum tamamladıktan sonra bizi şöyle bir arayüz karşılıyor:

![](http://localhost:2057/assets/images/virtualbox-ilk.png)
<center><i>VirtualBox kurulumu</i></center>

Yeni bir sanal makine oluşturmak için New'e basıyoruz.

![](http://localhost:2057/assets/images/virtualbox-2.png)
<center><i>Sanal makinemize isim verip kullanacağımız işletim sistemini seçiyoruz.</i></center>

![](http://localhost:2057/assets/images/virtualbox-3.png)
<center><i>Ne kadar RAM vermek istediğimizi seçiyoruz.</i></center>

![](http://localhost:2057/assets/images/virtualbox-4.png)

![](http://localhost:2057/assets/images/virtualbox-5.png)
<center><i>"Dynamically allocated" seçeneğini seçtiğimizde 25 GB'lık bir sanal disk oluşturduysak bile sadece ihtiyaç duyulan kadarı kullanılıyor, "Fixed size" ise oluşturduğumuz sanal diskin tamamı kadar alan kullanıyor.</i></center>

![](http://localhost:2057/assets/images/virtualbox-6.png)
<center><i>40 GB boyutunda bir sanal disk oluşturuyoruz.</i></center>

Eğer şu ana kadar her şey sorunsuz ilerlediyse karşınıza şu ekran çıkacak:

![](http://localhost:2057/assets/images/virtualbox-7.png)
<center><i>VirtualBox arayüzü</i></center>

Şimdi sıra Ubuntu kurulum dosyamızı seçmeye geldi. "Settings" basarak ayarlara giriyoruz ve ardından "Storage" sekmesine atlıyoruz.

![](http://localhost:2057/assets/images/virtualbox-8.png)
<center><i>Storage sekmesi</i></center>

"Empty"i seçiyoruz.

![](http://localhost:2057/assets/images/virtualbox-9.png)
<center><i>CD ikonuna tıkladıktan sonra "Choose a disk file" üstüne tıklıyoruz.</i></center>

İndirdiğimiz .iso dosyasını seçiyoruz.

![](http://localhost:2057/assets/images/virtualbox-10.png)
<center><i>ISO dosyası seçimi</i></center>

Burada işimiz bitti, OK basıp çıkıyoruz.

![](http://localhost:2057/assets/images/virtualbox-11.png)
<center><i>Storage sekmesi</i></center>

Karşımıza çıkan ekranda doğru ISO seçiliyse start basıyoruz. Değilse seçiyoruz.

![](http://localhost:2057/assets/images/virtualbox-12.png)
<center><i>Seçtiğimiz ISO dosyası</i></center>

Ubuntu'yu denemek değil kurmak istediğimiz için "Install Ubuntu" basıyoruz.

![](http://localhost:2057/assets/images/virtualbox-13.png)
<center><i>Dil seçme ekranı</i></center>

Klavye düzeni olarak Türkçe Q kullandığım için Türkçe seçtim, hangisini kullanıyorsanız onu seçin.

![](http://localhost:2057/assets/images/virtualbox-14.png)
<center><i>Klavye düzeni</i></center>

Ben kurulumun kısa sürmesi için "Minimal Installation" seçeneğini seçeceğim, siz "Normal Installation" da seçebilirsiniz. (Aynı şekilde güncellemeleri Ubuntu kurulurken yüklemeyi de seçebilirsiniz).

![](http://localhost:2057/assets/images/virtualbox-15.png)
<center><i>Kurulum tipi</i></center>

"Diski sil ve Ubuntu kur" bir sanal makineye kurarken seçmesi en mantıklı olan seçenek. (Kendi bilgisayarınıza Ubuntu kuruyorsanız ve bütün disklerinizin temizlenmesini istemiyorsanız bu seçeneği seçmeyin).

![](http://localhost:2057/assets/images/virtualbox-16.png)
<center><i>Disk seçimi</i></center>

Yaşadığınız yeri seçin.

![](http://localhost:2057/assets/images/virtualbox-17.png)
<center><i>Yer seçimi - saat dilimi için</i></center>

Bir kullanıcı adı ve şifre girin.

![](http://localhost:2057/assets/images/virtualbox-18.png)
<center><i>Kullanıcı oluşturma ekranı</i></center>

Kurulumun tamamlanmasını bekleyin.

![](http://localhost:2057/assets/images/virtualbox-19.png)
<center><i>Ubuntu kurulumu</i></center>

Kurulum tamamlandığında yeniden başlatın.

![](http://localhost:2057/assets/images/virtualbox-20.png)
<center><i>Kurulum başarılı</i></center>

Sanal makine yeniden başlamadan önce sizden kurulum diskini çıkarıp CTRL-C basmanızı isteyecek, VirtualBox bunu kendi hallettiği için CTRL-C basmanız yeterli olacaktır. Yeniden başlatıldığında Ubuntu'ya giriş yapabilirsiniz.

![](http://localhost:2057/assets/images/virtualbox-21.png)
<center><i>Kullanıcı seçme ve giriş ekranı</i></center>

![](http://localhost:2057/assets/images/virtualbox-22.png)
<center><i>Ubuntu</i></center>

Artık hazırsınız! Ubuntu kullanmaya başlayabilirsiniz!

VirtualBox indirme linki: https://www.virtualbox.org

Ubuntu indirme linki: https://ubuntu.com/#download
Sun Apr 11 2021 05:04:26 GMT+0300 (GMT+03:00)