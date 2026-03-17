# 🚀 Zoob-hub (Zopia Project)

[![CI](https://github.com/abualkarar/Zoob-hub/actions/workflows/ci.yml/badge.svg)](https://github.com/abualkarar/Zoob-hub/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Zoob-hub** هو تطبيق ويب متكامل (Full-stack) مبني بأحدث التقنيات لضمان السرعة، الأمان، وسهولة التطوير. يهدف المشروع إلى توفير منصة قوية لإدارة البيانات مع نظام مصادقة متطور.

---

## 🛠 التقنيات المستخدمة (Tech Stack)

### الواجهة الأمامية (Frontend)
- **React 19** & **TypeScript**
- **Vite** (أداة البناء)
- **Tailwind CSS** & **Shadcn UI** (للتصميم)
- **TanStack Query** (لإدارة البيانات)
- **Framer Motion** (للتحريك)

### الواجهة الخلفية (Backend)
- **Node.js** & **Express**
- **tRPC** (للتواصل الآمن بين الأمامية والخلفية)
- **Drizzle ORM** (للتعامل مع قاعدة البيانات)

### الخدمات السحابية (Cloud Services)
- **Firebase** (المصادقة وقاعدة البيانات)
- **AWS S3** (تخزين الملفات)

---

## 📁 هيكلية المشروع (Project Structure)

```text
├── client/          # كود الواجهة الأمامية (React)
├── server/          # كود الواجهة الخلفية (Express + tRPC)
├── shared/          # الأكواد المشتركة والأنواع (Types)
├── .github/         # إعدادات GitHub Actions (CI/CD)
└── drizzle/         # ملفات تهجير قاعدة البيانات (Migrations)
```

---

## 🚀 طريقة التشغيل (Getting Started)

### المتطلبات
- **Node.js** (v22+)
- **pnpm** (مدير الحزم)

### الخطوات
1. قم بنسخ المستودع:
   ```bash
   git clone https://github.com/abualkarar/Zoob-hub.git
   ```
2. تثبيت الحزم:
   ```bash
   pnpm install
   ```
3. إعداد متغيرات البيئة:
   قم بإنشاء ملف `.env` بناءً على `.env.example`.
4. تشغيل المشروع في وضع التطوير:
   ```bash
   pnpm dev
   ```

---

## 🧪 الاختبارات (Testing)
المشروع مجهز بـ **Vitest** للاختبارات. يمكنك تشغيلها عبر:
```bash
pnpm test
```

---

## 📄 الترخيص (License)
هذا المشروع مرخص تحت رخصة **MIT**.
