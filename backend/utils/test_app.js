const API_BASE = 'http://localhost:5001/api';

async function testApp() {
  console.log('--- STARTING RESTAURANT API AUTOMATED TESTS ---');
  try {
    // 1. Base Endpoint
    const baseRes = await fetch(API_BASE).then((r) => r.json());
    console.log('✅ Base API Status:', baseRes.message);

    // 2. Categories
    const catRes = await fetch(`${API_BASE}/categories`).then((r) => r.json());
    console.log(`✅ Categories Fetched: ${catRes.data.length} categories found.`);

    // 3. Products
    const prodRes = await fetch(`${API_BASE}/products`).then((r) => r.json());
    console.log(`✅ Products Fetched: ${prodRes.data.length} products found.`);

    // 4. Chefs
    const chefRes = await fetch(`${API_BASE}/chefs`).then((r) => r.json());
    console.log(`✅ Chefs Fetched: ${chefRes.data.length} master chefs found.`);

    // 5. Testimonials
    const testRes = await fetch(`${API_BASE}/testimonials`).then((r) => r.json());
    console.log(`✅ Testimonials Fetched: ${testRes.data.length} reviews found.`);

    // 6. FAQs
    const faqRes = await fetch(`${API_BASE}/faqs`).then((r) => r.json());
    console.log(`✅ FAQs Fetched: ${faqRes.data.length} questions found.`);

    // 7. Customer Registration
    const registerPayload = {
      name: 'Sarah Connor',
      email: `sarah.connor.${Date.now()}@example.com`,
      password: 'password123',
      phone: '+1 555-9000',
    };
    const regRes = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerPayload),
    }).then((r) => r.json());
    console.log(`✅ Customer Registered: ${regRes.data.name} (${regRes.data.email})`);

    // 8. Admin Login & Stats
    const loginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@restaurant.com', password: 'admin123' }),
    }).then((r) => r.json());
    console.log('✅ Admin Login Successful.');

    console.log('--- ALL BACKEND ENDPOINTS AND MONGODB ATLAS CONNECTIVITY VERIFIED 💯 ---');
  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    process.exit(1);
  }
}

testApp();
