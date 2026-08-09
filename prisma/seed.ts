import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("admin123456", 12);

  await prisma.user.upsert({
    where: { email: "admin@hafezpardaz.ir" },
    update: {},
    create: {
      email: "admin@hafezpardaz.ir",
      password: hashed,
      name: "مدیر سیستم",
      role: "ADMIN",
    },
  });

  console.log("✓ Admin user seeded: admin@hafezpardaz.ir / admin123456");

  // Seed initial site content keys
  const contentItems = [
    { key: "hero_title", value: "راهکارهای دیجیتال", label: "تیتر اصلی هیرو", type: "TEXT" },
    { key: "hero_subtitle", value: "خلاقانه برای کسب‌وکار شما", label: "زیرتیتر هیرو", type: "TEXT" },
    { key: "hero_description", value: "ما با تیم متخصص خود، وب‌سایت‌های حرفه‌ای، اپلیکیشن‌های موبایل و راهکارهای دیجیتال ارائه می‌دهیم.", label: "توضیحات هیرو", type: "TEXT" },
    { key: "about_title", value: "درباره حافظ پرداز سپهر", label: "تیتر درباره ما", type: "TEXT" },
    { key: "about_description", value: "با بیش از ۱۴ سال تجربه در حوزه طراحی و توسعه وب", label: "توضیحات درباره ما", type: "TEXT" },
    { key: "contact_phone", value: "021-12345678", label: "شماره تلفن", type: "TEXT" },
    { key: "contact_email", value: "info@hafezpardaz.ir", label: "ایمیل تماس", type: "TEXT" },
    { key: "contact_address", value: "تهران، خیابان ولیعصر", label: "آدرس", type: "TEXT" },
    { key: "footer_description", value: "ارائه‌دهنده خدمات حرفه‌ای طراحی و توسعه وب", label: "توضیحات فوتر", type: "TEXT" },
  ];

  for (const item of contentItems) {
    await prisma.siteContent.upsert({
      where: { key: item.key },
      update: {},
      create: item,
    });
  }

  console.log("✓ Site content keys seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
