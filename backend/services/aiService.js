import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Setting from '../models/Setting.js';

/**
 * Local Smart Recommendation Engine Fallback
 */
const generateLocalRecommendation = (userMessage, products = []) => {
  const budgetMatch = userMessage.match(/\d+[\s\d]*/);
  let budget = budgetMatch ? parseInt(budgetMatch[0].replace(/\s/g, ''), 10) : 0;
  if (budget > 0 && budget < 1000) budget *= 1000; // E.g. "100k" or "100" -> 100000

  if (budget > 0 && products.length > 0) {
    const sorted = [...products].sort((a, b) => b.price - a.price);
    const selected = [];
    let currentTotal = 0;

    for (const p of sorted) {
      if (currentTotal + p.price <= budget) {
        selected.push(p);
        currentTotal += p.price;
      }
    }

    if (selected.length > 0) {
      const itemsList = selected
        .map((item) => `• 🍽️ **${item.name}** — ${item.price.toLocaleString('uz-UZ')} so‘m`)
        .join('\n');
      return `Salom! Ajoyib tanlov. Budjetingiz (${budget.toLocaleString(
        'uz-UZ'
      )} so‘m) uchun quyidagi ideal menyu setini taklif qilaman:\n\n${itemsList}\n\n📌 **Jami**: ${currentTotal.toLocaleString(
        'uz-UZ'
      )} so‘m.\nYoqimli ishtaha! 😋`;
    }
  }

  const populars = products.filter((p) => p.isPopular).slice(0, 3);
  const popularList = (populars.length > 0 ? populars : products.slice(0, 3))
    .map((p) => `• ⭐️ **${p.name}** — ${p.price.toLocaleString('uz-UZ')} so‘m`)
    .join('\n');

  return `Salom! FAZO Restoranimizga xush kelibsiz! 🍽️\nSizga eng ommabop taomlarimizni taklif qilamiz:\n\n${popularList}\n\nAgarda ma'lum bir budjet (masalan, 100,000 so‘m) yozsangiz, mos set yig‘ib beraman! 😊`;
};

/**
 * Generates an intelligent response using Google Gemini API based on live DB context
 * @param {string} userMessage - User's query or recommendation request
 * @param {Array} history - Previous conversation messages
 * @returns {Promise<string>} AI Response in Uzbek
 */
export const generateAIResponse = async (userMessage, history = []) => {
  const apiKey = process.env.GEMINI_API_KEY;

  // Fetch live restaurant data context from MongoDB
  const products = await Product.find({ isAvailable: true }).populate('category', 'name');
  const categories = await Category.find();
  const settings = (await Setting.findOne()) || { isRestaurantOpen: true };

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

  if (!apiKey) {
    return generateLocalRecommendation(userMessage, products);
  }

  const contents = [
    {
      role: 'user',
      parts: [{ text: `${systemInstruction}\n\nMijoz Xabari: ${userMessage}` }],
    },
  ];

  const modelsToTry = [
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-2.0-flash',
  ];

  for (const modelName of modelsToTry) {
    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } else {
        const errText = await response.text();
        console.warn(`Model ${modelName} returned status ${response.status}: ${errText}`);
      }
    } catch (err) {
      console.warn(`Failed call to ${modelName}:`, err.message);
    }
  }

  // Fallback to Local Smart Recommendation Engine if API calls fail
  return generateLocalRecommendation(userMessage, products);
};
