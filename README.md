# 📋 Gerçek Zamanlı Görev Yönetim Uygulaması

**HTML, CSS ve JavaScript** ile oluşturulmuş basit ve dinamik bir görev yönetim uygulaması. Bu uygulama, kullanıcıların sayfa yenilenmeden görev ekleyip yönetmesini ve filtrelemesini sağlar.

## 🌐 Canlı Önizleme
[Proje Canlı Demo](https://simgepolat0.neocities.org/)

## 🚀 Özellikler

1. **Görev Listesi Arayüzü**
   - Sayfa yüklendiğinde boş bir görev listesi gösterir.
   - Kullanıcılar, yeni görevler ekleyebilir ve görev detaylarını belirtebilir:
     - **Başlık:** Zorunlu alan.
     - **Açıklama:** Opsiyonel alan.
     - **Öncelik:** Düşük, Orta veya Yüksek (radio butonları ile).
     - **Tamamlandı mı?:** Varsayılan olarak tamamlanmamış.

2. **Görev Ekleme & DOM Manipülasyonu**
   - "Ekle" butonuna basıldığında yeni görev dinamik olarak listeye eklenir.
   - Görev eklendikten sonra form temizlenir.
   - Sayfa yenilendiğinde görevler sıfırlanır.

3. **Olay Yönetimi & Event Delegation**
   - Kullanıcılar:
     - Görevleri tamamlandı olarak işaretleyebilir.
     - Görevleri silebilir.
   - Dinamik elemanları dinlemek için `event.target` kullanır.
   - İstenmeyen olay yayılmalarını önlemek için `stopPropagation()` kullanır.

4. **Form Doğrulama ve Hata Yönetimi**
   - Boş görev eklenmesini engeller.
   - Öncelik seçilmezse hata mesajı gösterir.
   - Beklenmedik hatalar için `try-catch` bloğu kullanır.

5. **Filtreleme & Sıralama (Opsiyonel)**
   - "Tamamlananları göster" butonu ile görevleri filtreleme yapar.
   - Önceliğe göre sıralama seçeneği bulunur.

## 🛠️ Kullanılan Teknolojiler

- **HTML5** 
- **CSS3**
- **JavaScript**
