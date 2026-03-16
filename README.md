# Zopia Project

مشروع تطبيق ويب متكامل مع المصادقة والبيانات والتخزين السحابي باستخدام Firebase و Manus OAuth.

## الميزات الرئيسية

- **المصادقة الآمنة**: تكامل مع Manus OAuth للمصادقة الموثوقة
- **إدارة البيانات**: نظام CRUD كامل لإدارة البيانات
- **قاعدة بيانات قوية**: MySQL مع Drizzle ORM
- **Firebase Integration**: تكامل كامل مع Firebase Admin SDK
- **واجهة مستخدم حديثة**: React مع TailwindCSS و Radix UI
- **API قوية**: tRPC للاتصال الآمن بين Frontend و Backend

## المتطلبات

- Node.js 20+
- pnpm 10.4.1+
- MySQL 8.0+
- Firebase Account
- Manus Account

## التثبيت

### 1. استنساخ المستودع

```bash
git clone https://github.com/abualkarar/zopia-project.git
cd zopia-project
```

### 2. تثبيت المكتبات

```bash
pnpm install
```

### 3. إعداد متغيرات البيئة

انسخ ملف `.env.example` إلى `.env` وقم بملء البيانات:

```bash
cp .env.example .env
```

ثم قم بتحديث القيم التالية في ملف `.env`:

```env
DATABASE_URL=mysql://user:password@localhost:3306/zopia
FIREBASE_PROJECT_ID=zopia-project-1773520629
FIREBASE_CLIENT_EMAIL=your-firebase-email@iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=your-firebase-private-key
OAUTH_SERVER_URL=https://oauth.manus.im
APP_ID=your-app-id
OWNER_OPEN_ID=your-owner-id
COOKIE_SECRET=your-secret-key-min-32-characters
```

### 4. إعداد قاعدة البيانات

```bash
pnpm run db:push
```

### 5. إعداد Firebase

ضع ملف `firebase-adminsdk.json` في جذر المشروع:

```bash
# تأكد من أن الملف موجود في:
./firebase-adminsdk.json
```

## التطوير

### تشغيل الخادم في وضع التطوير

```bash
pnpm run dev
```

سيتم تشغيل الخادم على `http://localhost:3000`

### البناء للإنتاج

```bash
pnpm run build
```

### تشغيل الخادم في وضع الإنتاج

```bash
pnpm run start
```

## الاختبار

### تشغيل جميع الاختبارات

```bash
pnpm run test
```

### اختبار Firebase

```bash
pnpm run test -- firebase.test.ts
```

### اختبار المصادقة

```bash
pnpm run test -- auth.logout.test.ts
```

## هيكل المشروع

```
zopia-project/
├── client/                 # تطبيق React Frontend
│   ├── src/
│   │   ├── components/    # مكونات React
│   │   ├── pages/         # الصفحات
│   │   ├── hooks/         # Custom hooks
│   │   ├── contexts/      # React contexts
│   │   └── lib/           # مكتبات مساعدة
│   └── index.html
├── server/                 # Backend Express
│   ├── _core/             # ملفات التهيئة الأساسية
│   ├── routers.ts         # تعريف الـ API endpoints
│   ├── db.ts              # وظائف قاعدة البيانات
│   ├── dataApi.ts         # وظائف CRUD للبيانات
│   └── firebase.ts        # تهيئة Firebase
├── shared/                 # الكود المشترك
│   ├── types.ts           # الأنواع المشتركة
│   └── const.ts           # الثوابت
├── drizzle/               # تكوين Drizzle ORM
│   ├── schema.ts          # تعريف الجداول
│   └── migrations/        # ملفات الهجرة
├── firebase.json          # تكوين Firebase Hosting
├── .firebaserc            # إعدادات مشروع Firebase
├── firestore.rules        # قواعد أمان Firestore
└── package.json           # المكتبات والـ scripts
```

## API Endpoints

### المصادقة

- `auth.me` - الحصول على معلومات المستخدم الحالي
- `auth.logout` - تسجيل الخروج

### إدارة البيانات

- `data.list` - الحصول على جميع البيانات
- `data.create` - إنشاء بيانات جديدة
- `data.get` - الحصول على بيانات محددة
- `data.update` - تحديث البيانات
- `data.delete` - حذف البيانات
- `data.archive` - أرشفة البيانات

## الرفع على Firebase

### 1. تثبيت Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. تسجيل الدخول إلى Firebase

```bash
firebase login
```

### 3. بناء المشروع

```bash
pnpm run build
```

### 4. نشر المشروع

```bash
firebase deploy
```

## الأمان

- جميع البيانات مشفرة أثناء النقل (HTTPS)
- المصادقة محمية بـ JWT tokens
- قواعد Firestore تحمي البيانات من الوصول غير المصرح
- متغيرات البيئة الحساسة لا تُخزن في Git

## المساهمة

نرحب بالمساهمات! يرجى:

1. عمل Fork للمستودع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى الفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## الدعم

للمساعدة والدعم، يرجى:

- فتح Issue في GitHub
- التواصل عبر البريد الإلكتروني: support@zopia.dev

## التحديثات والتطوير المستقبلي

- [ ] إضافة نظام الإشعارات
- [ ] تحسين الأداء والـ Caching
- [ ] إضافة المزيد من الميزات
- [ ] تحسين واجهة المستخدم

---

تم إنشاء هذا المشروع بواسطة فريق Zopia
