import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def build_pdf():
    pdf_filename = "/Users/macbook/myresto/FAZO_Restorani_Interview_Guide.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#064e3b'),
        alignment=1, # Center
        spaceAfter=10
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#d97706'),
        alignment=1,
        spaceAfter=20
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#064e3b'),
        spaceBefore=14,
        spaceAfter=6
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#d97706'),
        spaceBefore=8,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=6
    )

    code_style = ParagraphStyle(
        'Code_Custom',
        parent=styles['Normal'],
        fontName='Courier-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#0f172a'),
        backColor=colors.HexColor('#f1f5f9'),
        borderColor=colors.HexColor('#cbd5e1'),
        borderWidth=0.5,
        borderPadding=4,
        spaceAfter=6
    )

    qa_question = ParagraphStyle(
        'QA_Q',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=6,
        spaceAfter=2
    )

    qa_answer = ParagraphStyle(
        'QA_A',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#334155'),
        spaceAfter=8
    )

    story = []

    # Title & Header
    story.append(Paragraph("🌙 FAZO Restorani Namangan — Full-Stack Intervyu Qo'llanmasi", title_style))
    story.append(Paragraph("Dasturchilar va Texnik Intervyular uchun Mukammal Loyiha Hujjati", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#d97706'), spaceAfter=15))

    # Section 1
    story.append(Paragraph("1. Loyiha Haqida Umumiy Ma'lumot (Project Overview)", h1_style))
    story.append(Paragraph(
        "FAZO Restorani Namangan loyihasi — bu Namangan shahri uchun maxsus qurilgan to'liq sotsial RESTful e-commerce platformasidir. "
        "Loyiha arxitekturasi <b>MERN Stack</b> (MongoDB Atlas Cloud, Express.js, React 18, Node.js) tamoyillariga asoslangan. "
        "Ushbu platforma restoran menyusini ko'rish, taomlarni filterlash, savatcha boshqaruvi, tezkor buyurtma rasmiylashtirish, "
        "100% O'zbek tili va O'zbek so'mi (so'm) valyutasida xarid qilish imkonini beradi.", body_style
    ))

    # Section 2
    story.append(Paragraph("2. Texnologiyalar Steki va Kutubxonalar (Tech Stack & Libraries)", h1_style))
    
    tech_data = [
        [Paragraph("<b>Qatlam (Layer)</b>", body_style), Paragraph("<b>Kutubxona / Texnologiya</b>", body_style), Paragraph("<b>Vazifasi (Purpose)</b>", body_style)],
        [Paragraph("Frontend Core", body_style), Paragraph("React 18 + Vite", body_style), Paragraph("Component-driven UI, tezkor HMR builder va SPA routing.", body_style)],
        [Paragraph("Routing & State", body_style), Paragraph("React Router DOM v6, Context API", body_style), Paragraph("Global Auth, Cart va Language state boshqaruvi.", body_style)],
        [Paragraph("Styling & Icons", body_style), Paragraph("Bootstrap 5, Lucide React, Custom CSS", body_style), Paragraph("Glassmorphism, 3D float animatsiyalar, responsive UI.", body_style)],
        [Paragraph("HTTP Client", body_style), Paragraph("Axios", body_style), Paragraph("API so'rovlar, Request/Response Interceptors, Bearer Auth.", body_style)],
        [Paragraph("Backend Core", body_style), Paragraph("Node.js, Express.js", body_style), Paragraph("REST API server, Middleware chain, Route controllers.", body_style)],
        [Paragraph("Database", body_style), Paragraph("MongoDB Atlas Cloud, Mongoose ODM", body_style), Paragraph("Bulutli NoSQL ma'lumotlar bazasi, Schema validation va Population.", body_style)],
        [Paragraph("Security & Auth", body_style), Paragraph("JWT (JSON Web Token), bcryptjs", body_style), Paragraph("Xavfsiz autentifikatsiya, parollarni xeshlashtirish va RBAC.", body_style)]
    ]

    t = Table(tech_data, colWidths=[110, 150, 280])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f8fafc')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor('#064e3b')),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
    ]))
    story.append(t)
    story.append(Spacer(1, 12))

    # Section 3
    story.append(Paragraph("3. Ishlatilgan Asosiy Funksiyalar va Kod Logikasi (Core Functions)", h1_style))

    story.append(Paragraph("a) Database Connection (`backend/config/db.js`)", h2_style))
    story.append(Paragraph("MongoDB Atlas bulutli bazasiga Mongoose orqali asinxron ulanish funksiyasi:", body_style))
    story.append(Paragraph("const connectDB = async () => { await mongoose.connect(process.env.MONGO_URI); };", code_style))

    story.append(Paragraph("b) Autentifikatsiya va Middleware (`backend/middleware/authMiddleware.js`)", h2_style))
    story.append(Paragraph("JWT Bearer tokenni tekshiruvchi va foydalanuvchini sorovga biriktiruvchi middleware:", body_style))
    story.append(Paragraph("export const protect = async (req, res, next) => { const token = req.headers.authorization.split(' ')[1]; ... };", code_style))

    story.append(Paragraph("c) Sof Valyuta Formatlash (`frontend/src/utils/formatCurrency.js`)", h2_style))
    story.append(Paragraph("Narxlarni O'zbek so'mi formatiga o'tkazuvchi regex yordamida yozilgan utility funksiya:", body_style))
    story.append(Paragraph("export const formatCurrency = (amount) => amount.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ' ') + \" so'm\";", code_style))

    story.append(Paragraph("d) Savatcha Boshqaruvi (`frontend/src/context/CartContext.jsx`)", h2_style))
    story.append(Paragraph("React Context API yordamida savatcha miqdorini va umumiy narxni hisoblash logikasi:", body_style))
    story.append(Paragraph("const addToCart = (product, quantity) => { ... setTotalPrice(prev => prev + product.price * quantity); };", code_style))

    # Section 4
    story.append(Paragraph("4. Intervyuda Beriladigan Top 10 Savol va Javoblar (Interview QA)", h1_style))

    qa_list = [
        ("1. S: Frontend va Backend o'rtasida autentifikatsiya jarayoni qanday tashkil etilgan?",
         "J: JWT (JSON Web Token) yordamida. Foydalanuvchi login qilganda backend JWT hosil qiladi va frontend ga yuboradi. Frontend tokenni localStorage ga saqlaydi. Axios Request Interceptor har bir keyingi so'rovga 'Authorization: Bearer <token>' sarlavhasini avtomatik qo'shadi. Backenddagi 'protect' middleware tokenni deshiraydi va user id bo'yicha foydalanuvchini aniqlaydi."),

        ("2. S: MongoDB Atlas va Mongoose modellari o'rtasidagi bog'liqlik (Relationships) qanday yo'lga qo'yilgan?",
         "J: Mongoose Schema 'ref' atributi yordamida. Masalan, Product modelida 'category' maydoni Schema.Types.ObjectId bo'lib, Category modeliga ishora qiladi (ref: 'Category'). Ma'lumotlarni olishda '.populate('category')' yordamida to'liq kategoriya obyektlari birlashtirib olinadi."),

        ("3. S: Loyihada Clean Code va Optimizatsiya bo'yicha qanday amaliyotlar qo'llanilgan?",
         "J: Single Responsibility Principle (SRP) tamoyiliga amal qilingan — har bir servis, controller va komponent alohida modullarda joylashgan. Frontend da 'isMounted' indikatori orqali asinxron useEffect larda Memory Leak xavfi bartaraf etilgan. DRY (Don't Repeat Yourself) qoidasi bo'yicha barcha takroriy kodlar util funksiyalarga o'tkazilgan."),

        ("4. S: O'zbek So'mi valyutasini formatlash qanday amalga oshirilgan?",
         "J: Custom 'formatCurrency' yordamchi funksiyasi orqali. Regex regex '\\B(?=(\\d{3})+(?!\\d))' yordamida har uchta raqam oralig'iga bo'sh joy tashlanadi va oxiriga 'so'm' qo'shiladi (masalan: 45000 -> '45 000 so'm')."),

        ("5. S: Dynamic Glassmorphism UI va Custom CSS qanday yaratilgan?",
         "J: CSS Custom Variables (:root), backdrop-filter: blur(16px), va 3D float keyframe animatsiyalari yordamida. Bu orqali yuqori sifatli responsive interfeys va silliq hover effektlari ta'minlangan.")
    ]

    for q, a in qa_list:
        story.append(Paragraph(q, qa_question))
        story.append(Paragraph(a, qa_answer))

    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#cbd5e1'), spaceAfter=10))
    story.append(Paragraph("<b>Tayyorladi:</b> FAZO Restorani Namangan Dasturchilar Jamoasi | 2026", ParagraphStyle('Footer', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=8, alignment=1, textColor=colors.HexColor('#64748b'))))

    doc.build(story)
    print(f"PDF successfully generated at: {pdf_filename}")

if __name__ == '__main__':
    build_pdf()
