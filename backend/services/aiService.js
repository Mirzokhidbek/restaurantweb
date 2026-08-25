import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Setting from '../models/Setting.js';

/**
 * Generates an intelligent response using Google Gemini API based on live DB context
 * @param {string} userMessage - User's query or recommendation request
 * @param {Array} history - Previous conversation messages
 * @returns {Promise<string>} AI Response in Uzbek
 */
export const generateAIResponse = async (userMessage, history = []) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in backend/.env');
  }

  // Fetch live restaurant data context from MongoDB
  const products = await Product.find({ isAvailable: true }).populate('category', 'name');
  const categories = await Category.find();
  const settings = await Setting.findOne() || { isRestaurantOpen: true };

  const menuContext = products.map((p) => ({
    name: p.name,
    price: p.price,
    category: p.category?.name || 'Boshqa',
    description: p.description,
    isPopular: p.isPopular,
  }));

  const systemInstruction = `Siz "FAZO Restorani" (Namangan shahri) ning rasmiy va aqlli Sun'iy Intellektli Afitsiantisiz! Ismingiz: "FAZO AI Afitsiant".
Sizning vazifangiz mijozlarga taomlar tanlashda yordam berish, ularning budjetiga mos to'plamlar (setlar) tavsiya qilish, menyu narxlari va yetkazib berish bo'yicha do'stona va xushmuomala javob berishdir.

Hozirgi Restoran Ma'lumotlari:
- Restoran Holati: ${settings.isRestaurantOpen ? '🟢 OCHIQ (Faol)' : '🔴 YOPIQ'}
- Mavjud Kategoriyalar: ${categories.map((c) => c.name).join(', ')}
- Menyu Mahsulotlari va Narxlari:
${JSON.stringify(menuContext, null, 2)}

Qoidalaringiz:
1. Har doim 100% o'zbek tilida, nihoyatda xushmuomala, mehmondost va madaniyatli javob bering.
2. Mijoz budjet (masalan, 100,000 so'm) yozsa, yuqoridagi menyu narxlaridan aniq hisoblab ideal taom setini taklif qiling.
3. Taomlar nomini, narxlarini aniq ko'rsating va emojilardan unumli foydalaning (🍽️, 🍔, 🥩, 🥤, ⭐).
4. Javoblaringiz qisqa, tushunarli va chiroyli formatlangan bo'lsin.`;

  // Prepare Gemini API request payload
  const contents = [
    {
      role: 'user',
      parts: [{ text: `${systemInstruction}\n\nMijoz Xabari: ${userMessage}` }],
    },
  ];

  // Call Gemini REST API (gemini-2.0-flash / gemini-1.5-flash fallback)
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`Gemini 2.0 Flash API warning (${response.status}): ${errorText}. Trying gemini-1.5-flash...`);
      
      // Fallback to gemini-1.5-flash
      const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const fallbackRes = await fetch(fallbackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      });
      
      if (!fallbackRes.ok) {
        throw new Error(`Gemini API error: ${fallbackRes.statusText}`);
      }
      
      const fallbackData = await fallbackRes.json();
      return fallbackData.candidates?.[0]?.content?.parts?.[0]?.text || 'Kechirasiz, javob shakllantirishda xatolik yuz berdi.';
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Kechirasiz, javob shakllantirishda xatolik yuz berdi.';
  } catch (error) {
    console.error('Error generating Gemini AI response:', error);
    throw error;
  }
};
