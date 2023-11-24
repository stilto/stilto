import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { peanut } from "@squirrel-labs/peanut-sdk";
const app = express();
const port = 5001;
dotenv.config();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/getclaimurl", async (req, res) => {
  try {
    const { query } = req;
    const allGifts = await prisma.gift.findMany({
      where: {
        id: query.id,
      },
    });

    return res.status(200).json(allGifts);
  } catch (e) {
    console.log("error", e);
    return res.status(400).json();
  }
});

app.post("/createclaimurl", async (req, res) => {
  const { body } = req;

  const createLinkResponse = await peanut.createLink({
    structSigner: body.signer,
    linkDetails: {
      chainId: body.chainId,
      tokenAmount: body.amount,
      tokenType: body.tokenType,
    },
  });

  const newGift = await prisma.gift.create({
    data: {
      sender: body.sender ? body.sender : "",
      gif: body.gif ? body.gif : "",
      card: body.card ? body.card : "",
      title: body.title ? body.title : "",
      message: body.message ? body.message : "",
      amount: body.amount,
      chain: body.chain,
      claimLink: createLinkResponse.link[0],
      claimed: false,
    },
  });

  return res.json(newGift.id);
});

app.post("/setgiftclaimed", async (req, res) => {
  const { body } = req;
  await prisma.gift.update({
    where: {
      id: body.id,
    },
    data: {
      claimed: true,
    },
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
