export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { services as staticServices } from "@/data";
import { ServicesClient } from "./ServicesClient";

export default async function ServicesPage() {
  const dbServices = await prisma.service.findMany({
    where: { active: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return <ServicesClient dbServices={dbServices} staticServices={staticServices} />;
}
