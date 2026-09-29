# 🛒 E-Ticaret Frontend Projesi

## Proje Açıklaması
Bu proje **React, Vite, Redux ve Tailwind CSS** kullanılarak geliştirilmiş bir **e-ticaret ana sayfa arayüzü** uygulamasıdır.  
Projede kullanıcıların ürünleri görüntüleyebileceği, arayabileceği, filtreleyebileceği ve sepete ekleyebileceği bir yapı oluşturulmuştur.

## Özellikler

### Ana Sayfa
E-ticaret sitesinin ana sayfa tasarımı oluşturulmuştur.  
Ana sayfa üzerinde ürünler listelenmektedir.

### Yeniden Kullanılabilir Ürün Kartları
Ürünleri göstermek için **reusable (tekrar kullanılabilir) product card bileşenleri** oluşturulmuştur.  
Bu bileşenler farklı bölümlerde tekrar kullanılabilecek şekilde tasarlanmıştır.

### Ürün Arama
Ana sayfa üzerinde ürün arama özelliği bulunmaktadır.  
Kullanıcılar ürün isimlerine göre arama yapabilir.

### Ürün Filtreleme
Ürünler **fiyat aralıklarına göre filtrelenebilmektedir**.  
Filtre uygulandığında ürün listesi dinamik olarak güncellenir.

### Sepet (Cart) Sistemi
Projede bir **alışveriş sepeti sistemi** bulunmaktadır.

Sepet üzerinde şu işlemler yapılabilir:

- Sepete ürün ekleme
- Sepetten ürün silme
- Sepette ürün miktarını değiştirme
- Sepetteki ürünleri güncelleme

Bu işlemler **CRUD (Create, Read, Update, Delete)** mantığı ile çalışmaktadır.

### State Management
Uygulamada **Redux** kullanılarak state yönetimi yapılmıştır.  
Sepet verileri ve uygulama durumu merkezi bir store üzerinden yönetilmektedir.

## Kullanılan Teknolojiler

- React
- Vite
- Redux Toolkit
- Tailwind CSS
- JavaScript (ES6)

## WhatsApp Destek Butonu

Uygulamanın tüm sayfalarında sağ altta sabit bir WhatsApp destek butonu bulunur. Buton, müşteriyi WhatsApp'ta destek numarasına yönlendirir ve hazır bir mesaj açar.

Farklı bir WhatsApp numarası kullanmak için proje kökünde `.env` dosyasında ülke kodu dahil yalnızca rakamlardan oluşan `VITE_WHATSAPP_NUMBER` değerini ayarlayın:


To enable visitor-submitted WhatsApp messages, configure these variables in the backend environment (for example, `backend/.env`). Never prefix these with `VITE_` or put the access token in frontend configuration:

```env
WHATSAPP_ACCESS_TOKEN=your_cloud_api_access_token
WHATSAPP_PHONE_NUMBER_ID=your_cloud_api_phone_number_id
```

The public `/api/send-whatsapp` endpoint accepts `phoneNumber` and `message` and limits each IP address to five sends per minute.



