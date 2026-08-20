import React from 'react';
import { FileText } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="terms-page py-5 bg-light min-vh-100">
      <div className="container">
        <div className="card border-0 rounded-4 shadow-sm bg-white p-4 p-md-5 mx-auto" style={{ maxWidth: '800px' }}>
          <div className="d-flex align-items-center gap-2 mb-3 text-warning fw-bold">
            <FileText size={24} /> Restoran Qoidalari
          </div>
          <h1 className="fw-extrabold text-dark mb-4">Qoidalar va Shartlar</h1>
          <small className="text-muted d-block mb-4">Oxirgi Yangilanish: Avgust 2026</small>

          <h5 className="fw-bold text-dark mt-3">1. Buyurtma va Yetkazib Berish Qoidasi</h5>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            FAZO Restorani veb-saytida buyurtma berish orqali kiritilgan yetkazish manzili va telefon raqami to‘g‘riligini tasdiqlaysiz. Yetkazish vaqti ob-havo va yo‘l holatiga qarab o‘rtacha 25-35 daqiqani tashkil qiladi.
          </p>

          <h5 className="fw-bold text-dark mt-4">2. Taomlar Sifati va Xavfsizlik</h5>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            Restoranimizda barcha taomlar yangi va sifatli masalliqlardan, pokiza oshxonada tayyorlanadi. Mahsus allergiyasi bor mijozlarimiz buyurtma berishda izoh qoldirishlari so‘raladi.
          </p>

          <h5 className="fw-bold text-dark mt-4">3. To‘lov va Qaytarish Siyosati</h5>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            To‘lovlar Naqd pul ko‘rinishida yoki yetkazib berilganda onlayn qabul qilinadi. Taom sifatidan norozilik bo‘lsa, 30 daqiqa ichida almashtirib beriladi.
          </p>

          <h5 className="fw-bold text-dark mt-4">4. Maxfiylik va Ma’lumotlar Himoyasi</h5>
          <p className="text-secondary" style={{ lineHeight: '1.8' }}>
            Foydalanuvchilarning telefon raqamlari va manzillari uchinchi shaxslarga berilmaydi hamda faqat yetkazib berish xizmati uchun ishlatiladi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
