# تقرير متطلبات الواجهة الخلفية (Backend API) لصفحات السوبر أدمن

هذا التقرير يفصل جميع نقاط الاتصال (Endpoints) المطلوبة لتشغيل صفحات السوبر أدمن، مع تحديد هيكل البيانات المتوقع لكل منها.

---

## 1. لوحة التحكم الرئيسية (Dashboard)
**المسار:** `/super-admin`

### [GET] `/api/super-admin/stats`
لجلب الإحصائيات الحيوية في أعلى الصفحة.
- **الاستجابة:**
  ```json
  {
    "revenue": { "value": 45280.00, "trend": "+12.5%", "status": "up" },
    "activeUsers": { "value": 12840, "trend": "+5.2%", "status": "up" },
    "churnRate": { "value": 2.41, "trend": "0.8%", "status": "down" },
    "cac": { "value": 1150.32, "trend": "14%", "status": "down" }
  }
  ```

### [GET] `/api/super-admin/subscriptions/distribution`
لتوزيع باقات الاشتراك (الرسم البياني الدائري/الأعمدة).
- **الاستجابة:** `[ { "plan": "Free", "percent": 45 }, { "plan": "Pro", "percent": 38 }, ... ]`

### [GET] `/api/super-admin/activities/recent`
لجدول "آخر العمليات والنشاطات".
- **الاستجابة:** قائمة من الكائنات تحتوي على `type`, `actor`, [action](file:///d:/entity-board/src/app/super-admin/plans/page.tsx#19-28), `status`, [at](file:///d:/entity-board/src/app/super-admin/page.tsx#7-17).

---

## 2. إدارة الشركات والمستأجرين (Users & Teams)
**المسار:** `/super-admin/users-teams`

### [GET] `/api/super-admin/tenants`
جلب قائمة الشركات مع دعم التصفية والبحث والترقيم.
- **المعلمات:** `page`, `search`, `plan`, `status`.

### [POST] `/api/super-admin/tenants`
إنشاء شركة (Tenant) جديدة.
- **الجسم:** `companyName`, `domain`, `ownerName`, `ownerEmail`, `plan`, `status`.

### [POST] `/api/super-admin/tenants/:id/impersonate`
للدخول المباشر لحساب العميل (Login as Tenant).
- **الاستجابة:** توكن مؤقت أو توجيه للجلسة.

---

## 3. الشؤون المالية والفوترة (Plans & Billing)
**المسار:** `/super-admin/plans`

### [GET] `/api/super-admin/finance/transactions`
سجل المعاملات المالية.
- **الاستجابة:** قائمة تحتوي على `customerName`, `amount`, `status`, `ref`, `date`.

### [POST] `/api/super-admin/finance/invoices/manual`
إصدار فاتورة يدوية لعميل محدد.

---

## 4. مراقبة الذكاء الاصطناعي (AI Monitoring)
**المسار:** `/super-admin/ai`

### [GET] `/api/super-admin/ai/stats`
مؤشرات الأداء الحيوية (Throughput, Latency, Failure Rate).

### [GET] `/api/super-admin/ai/costs`
جدول استهلاك التوكنات والتكاليف لكل منظمة.

### [PATCH] `/api/super-admin/ai/limits/:orgId`
تعديل السقف المالي (Hard Limit) لاستهلاك الذكاء الاصطناعي لمنظمة ما.

---

## 5. مكتبة القوالب العالمية (Templates)
**المسار:** `/super-admin/templates`

### [GET | POST | PUT | DELETE] `/api/super-admin/templates`
العمليات الأساسية (CRUD) للقوالب العالمية التي تظهر لجميع الشركات.
- **هيكل القالب:** `name`, `tag`, `elements` (قائمة من العناصر مثل `text`, `chart`, `table`).

---

## 6. إدارة التكاملات (Integrations)
**المسار:** `/super-admin/integrations`

### [GET] `/api/super-admin/integrations`
حالة الخدمات الخارجية (Stripe, OpenAI, SendGrid).

### [GET] `/api/super-admin/integrations/webhooks/logs`
سجل أحداث الـ Webhooks الواردة والصادرة.

---

## 7. الإشعارات والتقارير (Notifications & Reports)
**المسارات:** `/super-admin/notifications`, `/super-admin/reports`

### [GET] `/api/super-admin/notifications`
جلب تنبيهات النظام الحرجة والمالية.

### [POST] `/api/super-admin/reports`
طلب توليد تقرير تنفيذي (Operational/Financial) جديد.
