# 📘 FAZO Restorani Namangan - Clean Code Architecture & Developer Guide

Ushbu hujjat **FAZO Restorani** loyihasidagi barcha dasturchilar uchun to‘liq tushunarli, toza va tartibli kod arxitekturasi va standartlarini belgilaydi.

---

## 🏗️ 1. Loyiha Arxitekturasi (Project Architecture)

Loyiha ikkita asosiy qismdan tashkil topgan:

```
myresto/
├── backend/                  # Node.js + Express + MongoDB Backend Service
│   ├── config/               # Ma'lumotlar bazasi va muhit sozlamalari (db.js)
│   ├── controllers/          # Biznes-logika va API ishlovchilar (MVC Controllers)
│   ├── middleware/           # Autentifikatsiya, JWT va xatoliklar middleware-lari
│   ├── models/               # Mongoose ma'lumotlar bazasi sxemalari (Data Models)
│   ├── routes/               # API marshrutlari (Express Routes)
│   └── server.js             # Markaziy backend server fayli
│
└── frontend/                 # React 18 + Vite + Bootstrap Web Application
    ├── public/assets/        # Premium fotosuratlar va resurslar
    ├── src/
    │   ├── components/       # Qayta ishlatiluvchi UI komponentlar (Navbar, Footer, Hero, Cards)
    │   ├── context/          # Markaziy Context-lar (AuthContext, CartContext, ToastContext, LanguageContext)
    │   ├── pages/            # Sahifalar (Home, Menu, Checkout, Contact, Testimonials, Profile)
    │   ├── routes/           # AppRoutes marshrutlash arxitekturasi
    │   ├── services/         # Axios API so'rov xizmatlari (authService, orderService, etc.)
    │   └── utils/            # Yordamchi yordamchi funksiyalar (formatCurrency, translations)
```

---

## 💎 2. Toza Kod Standartlari (Clean Code Standards)

### A. API Natijalari Standarti (Standardized API Response Schema)
Barcha Backend Controller-lar standart va bir xil formatdagi JSON natija qaytaradi:
```json
{
  "success": true,
  "message": "Operatsiya muvaffaqiyatli bajarildi",
  "data": { ... }
}
```

### B. Nomlash Standartlari (Naming Conventions)
- **Fayllar va Komponentlar**: `PascalCase` (masalan: `CategoryCard.jsx`, `TestimonialPage.jsx`).
- **O‘zgaruvchi va Funksiyalar**: `camelCase` (masalan: `fetchTestimonials`, `calculateTotal`).
- **Mongoose Modellari**: `PascalCase` birlikda (masalan: `User.js`, `Product.js`, `Order.js`).
- **Konstantalar va Enumlari**: `UPPER_SNAKE_CASE` (masalan: `MONGO_URI`, `JWT_SECRET`).

---

## 🔌 3. Asosiy Xizmatlar (Core Context Services)

1. **`ToastContext`**:
   - Dasturning ixtiyoriy joyida instant xabarnoma chiqaradi:
   - `toast.success(message, title)`, `toast.error(message, title)`, `toast.info(message, title)`.
2. **`AuthContext`**:
   - `login(email, password)`, `register(name, email, password, phone)`, `logout()`.
   - Avtomatik JWT tokenlarni saqlash hamda `user` obyektini profil holatida boshqarish.
3. **`CartContext`**:
   - Savatchaga taom qo'shish, o'chirish, miqdorini o'zgartirish va yetkazib berish narxini avto-hisoblash.

---

## 🚀 4. Ishga Tushirish (How to Run)

```bash
# Backend Server (Port 5001)
cd backend
npm start

# Frontend Dev Server (Port 3000)
cd frontend
npm run dev
```
