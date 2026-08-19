import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Chef from '../models/Chef.js';
import Testimonial from '../models/Testimonial.js';
import FAQ from '../models/FAQ.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing database collections for FAZO Restorani Namangan...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Chef.deleteMany({});
    await Testimonial.deleteMany({});
    await FAQ.deleteMany({});

    console.log('Seeding Default Admin & Customer users...');
    const adminUser = new User({
      name: 'FAZO Restorani Menejeri',
      email: 'admin@restaurant.com',
      password: 'admin123',
      role: 'admin',
      phone: '+998 77 301 00 05',
    });
    await adminUser.save();

    const sampleCustomer = new User({
      name: 'Anvarjon Alimov',
      email: 'customer@example.com',
      password: 'customer123',
      role: 'customer',
      phone: '+998 90 275 55 55',
      addresses: [
        {
          title: 'Uygay',
          street: 'Namangan shahri, Islom Karimov ko‘chasi, 25-uy',
          city: 'Namangan',
          phone: '+998 90 275 55 55',
          isDefault: true,
        },
      ],
    });
    await sampleCustomer.save();
    console.log('Admin & Customer accounts created.');

    console.log('Seeding FAZO Restorani Categories...');
    const categoriesData = [
      {
        name: 'Milliy Taomlar',
        description: 'Namangan to‘y oshi, Qozon Kebab, Manti va tandir somsa',
        image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Shashliklar',
        description: 'Namangan jaz shashlik, qiyma, bedana va tovuq shashliklar',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Turk Oshxonasi',
        description: 'Adana kabob, Iskandar kabob, pishloqli Pide va Lahmacun',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Steyk va Gril',
        description: 'Ribeye steyklar va Fazo Special sharbatli burgerlar',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Pizzalar',
        description: 'Yog‘och olovida pishirilgan haqiqiy Pepperoni va Formaggi',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Salatlar',
        description: 'Yangi uzilgan sabzavotlardan Choban salati va Caesar',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Ichimliklar & Choy',
        description: 'Namangan ko‘k choyi, Turk choyi va tabiiy sharbatlar',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Shirinliklar',
        description: 'Mashhur Turk Baklavasi, Kunefe va Molten Lava Cake',
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
      },
    ];
    const createdCategories = await Category.insertMany(categoriesData);

    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    console.log('Seeding FAZO Restorani Products with Uzbek So\'m prices...');
    const productsData = [
      {
        name: 'Namangan Maqom To‘y Oshi',
        description: 'Devzira guruch, sariosiyyo go‘shti, bedana tuxumi, qazi va noxat bilan tayyorlangan afsonaviy Namangan palovi.',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
        category: categoryMap['Milliy Taomlar'],
        isAvailable: true,
        isPopular: true,
      },
      {
        name: 'Qozon Kebab Special Fazo',
        description: 'Qozonda dimlangan yumshoq qo‘y go‘shti va oltinrang qovurilgan kartoshka fresh ko‘katlar bilan.',
        price: 75000,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        category: categoryMap['Milliy Taomlar'],
        isAvailable: true,
        isPopular: true,
      },
      {
        name: 'Namangan Jaz Shashlik (1 siqim)',
        description: 'Ko‘mir cho‘g‘ida pishirilgan mazzali qo‘y go‘shti jaz shashligi, piyoz va smorodina sousi bilan.',
        price: 18000,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
        category: categoryMap['Shashliklar'],
        isAvailable: true,
        isPopular: true,
      },
      {
        name: 'Qiyma Shashlik Special (1 siqim)',
        description: 'Sirli ziravorlar va dumba bilan tayyorlangan shira-sharbatli qiyma kabob.',
        price: 16000,
        image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
        category: categoryMap['Shashliklar'],
        isAvailable: true,
        isPopular: false,
      },
      {
        name: 'Turkcha Adana Kabob',
        description: 'Olovda pishirilgan achchiqqina Turk Adana kabobi, lavaş, qovurilgan pomidor va qalampir bilan.',
        price: 65000,
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
        category: categoryMap['Turk Oshxonasi'],
        isAvailable: true,
        isPopular: true,
      },
      {
        name: 'Kushbashili Pide (Pishloqli)',
        description: 'Turkcha yog‘och pechda pishirilgan, maydalangan mol go‘shti va erigan kashkaval pishloqli Pide.',
        price: 55000,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
        category: categoryMap['Turk Oshxonasi'],
        isAvailable: true,
        isPopular: true,
      },
      {
        name: 'Lahmacun (2 dona)',
        description: 'Juda yupqa xamirda tayyorlangan, ziravorli qiymali va limonli turk lahmasuni.',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        category: categoryMap['Turk Oshxonasi'],
        isAvailable: true,
        isPopular: false,
      },
      {
        name: 'Ribeye Steyk Gril Fazo',
        description: 'Grilda pishirilgan mermer mol go‘shti steyki, roflen kartoshka va trufel sousi bilan.',
        price: 120000,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        category: categoryMap['Steyk va Gril'],
        isAvailable: true,
        isPopular: true,
      },
      {
        name: 'Fazo Angus Burger Special',
        description: 'Double Angus kotleti, erigan cheddar, bekon va mahsus Fazo sousi toster nonida.',
        price: 48000,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        category: categoryMap['Steyk va Gril'],
        isAvailable: true,
        isPopular: false,
      },
      {
        name: 'Pepperoni Supreme Pizza',
        description: 'San-Marzano sousi, Mozzarella pishlog‘i va haqiqiy pishloqli achchiq Pepperoni.',
        price: 78000,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
        category: categoryMap['Pizzalar'],
        isAvailable: true,
        isPopular: true,
      },
      {
        name: 'Turkcha Choban Salati',
        description: 'Yangi pomidor, bodring, bulg‘or qalampiri, pishloq va zaytun yog‘ili Turk salati.',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
        category: categoryMap['Salatlar'],
        isAvailable: true,
        isPopular: false,
      },
      {
        name: 'Fresh Caesar Tovuq Salat',
        description: 'Gril tovuq ko‘kragi, Parmesan, krutonlar va klassik Caesar sousi.',
        price: 32000,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        category: categoryMap['Salatlar'],
        isAvailable: true,
        isPopular: true,
      },
      {
        name: 'Haqiqiy Turk Baklavasi (Pista bilan)',
        description: 'Gaziantep usulida tayyorlangan 40 qavat yupqa xamirli, pista va sharbatli Turk Baklavasi.',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        category: categoryMap['Shirinliklar'],
        isAvailable: true,
        isPopular: true,
      },
      {
        name: 'Issiq Kunefe Dondurma bilan',
        description: 'Eritilgan Pishloqli issiq Kunefe ustida Turkcha Maraş muzqaymog‘i bilan.',
        price: 40000,
        image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
        category: categoryMap['Shirinliklar'],
        isAvailable: true,
        isPopular: true,
      },
    ];

    await Product.insertMany(productsData);

    console.log('Seeding FAZO Restorani Chefs...');
    const chefsData = [
      {
        name: 'Chef Ahmadjon Yoqubov',
        title: 'Namangan Milliy Taomlar Bosh Oshpazi',
        bio: '22 yillik tajribaga ega Namangan osh va milliy taomlar ustasi. Devzira oshi va Qozon kebab tayyorlash sirining bilimdoni.',
        image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
        experienceYears: 22,
        specialties: ['Namangan To‘y Oshi', 'Qozon Kebab', 'Jaz Shashlik'],
        rating: 4.98,
      },
      {
        name: 'Chef Mehmet Yılmaz',
        title: 'Turk Oshxonasi va Pide Ustasi',
        bio: 'Turkiyaning Istanbul va Gaziantep shaharlaridan taklif etilgan mazzali Adana kabob hamda Pide mutaxassisi.',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
        experienceYears: 16,
        specialties: ['Adana Kabob', 'Kushbashili Pide', 'Turk Baklavasi'],
        rating: 4.95,
      },
      {
        name: 'Chef Jamshid Karimov',
        title: 'Gril va Steyklar Mutaxassisi',
        bio: 'Premium mol go‘shti steyklari va mualliflik burgerlarini tayyorlovchi tajribali oshpaz.',
        image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=600&q=80',
        experienceYears: 11,
        specialties: ['Ribeye Steyk', 'Special Burger', 'Gril Taomlar'],
        rating: 4.89,
      },
    ];
    await Chef.insertMany(chefsData);

    console.log('Seeding FAZO Restorani Testimonials...');
    const testimonialsData = [
      {
        customerName: 'Sardorbek Rahimov',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        reviewText: 'Namangandagi eng fayzli va mazali restoran! Osh va Adana kaboblari shunchaki ajoyib. Yetkazib berish juda tez.',
        position: 'Tadbirkor (Namangan)',
        isFeatured: true,
      },
      {
        customerName: 'Gulnora Umarova',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        reviewText: 'Oila bilan kelib dam olish uchun eng zo‘r maskan. Oshpazlarga va xodimlarga katta rahmat!',
        position: 'Shifokor',
        isFeatured: true,
      },
    ];
    await Testimonial.insertMany(testimonialsData);

    console.log('Seeding FAZO Restorani FAQs...');
    const faqsData = [
      {
        question: 'Fazo restorani qayerda joylashgan va mo‘ljal nimasi?',
        answer: 'Restoranimiz Namangan shahri, 2-mikrorayon, Islom Karimov ko‘chasi 17-uyda joylashgan. Mo‘ljal: "Buyuk Ipak Yo‘li" mehmonxonasi.',
        category: 'Manzil',
        orderIndex: 1,
      },
      {
        question: 'Yetkazib berish xizmati mavjudmi va u qancha vaqt oladi?',
        answer: 'Ha, Namangan shahri bo‘ylab tezkor yetkazib berish xizmatimiz bor. Taomlar 25-35 daqiqada issiq holda yetkaziladi.',
        category: 'Delivery',
        orderIndex: 2,
      },
      {
        question: 'Barcha taomlar Halol sertifikatiga egami?',
        answer: 'Ha! FAZO restoranida barcha go‘sht va masalliqlar 100% Halol sertifikatlangan va pokiza tayyorlanadi.',
        category: 'Sifat',
        orderIndex: 3,
      },
      {
        question: 'Stol va VIP xonalarni oldindan band qilsa bo‘ladimi?',
        answer: 'Albatta! +998 77 301 00 05 telefon raqamiga qo‘ng‘iroq qilib yoki sayt orqali VIP xonalar va stollarni bron qilishingiz mumkin.',
        category: 'Bron',
        orderIndex: 4,
      },
    ];
    await FAQ.insertMany(faqsData);

    console.log('FAZO Restorani Namangan complete database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedData();
