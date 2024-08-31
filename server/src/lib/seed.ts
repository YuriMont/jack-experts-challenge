import { prisma } from "./prisma";

async function main() {
  await prisma.color.deleteMany();

  const colors = [
    { name: "red", code: "#ef4444" },
    { name: "green", code: "#22c55e" },
    { name: "blue", code: "#3b82f6" },
    { name: "yellow", code: "#facc15" },
    { name: "cyan", code: "#06b6d4" },
    { name: "fuchsia", code: "#d946ef" },
    { name: "white", code: "#fffff" },
    { name: "orange", code: "#FFA500" },
    { name: "purple", code: "#a855f7" },
    { name: "stone", code: "#d6d3d1" },
  ];

  await prisma.$transaction(
    colors.map((color) =>
      prisma.color.create({
        data: color,
      })
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Erro ao inserir seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
