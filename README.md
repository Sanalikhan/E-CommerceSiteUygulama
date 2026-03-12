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



