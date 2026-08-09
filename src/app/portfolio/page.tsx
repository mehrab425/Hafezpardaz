export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { PortfolioClient } from "./PortfolioClient";

export default async function PortfolioPage() {
  const dbItems = await prisma.portfolio.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return <PortfolioClient dbItems={dbItems} />;
}
