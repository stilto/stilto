const { PrismaClient } = require("@prisma/client");

export const prisma = new PrismaClient();

// async function main() {
//   // ... you will write your Prisma Client queries here
//   const newGift = await prisma.gift.create({
//     data: {
//       id: "",
//       address: "",
//       title: "",
//       message: "",
//       gif: "",
//       card: "",
//       claimed: false,
//     },
//   })

//   const allGifts = await prisma.gift.findMany();
//   console.log(allGifts);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
