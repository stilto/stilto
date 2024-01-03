import express from "express";
import Moralis from "moralis";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
const port = 5001;
dotenv.config();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

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

app.get("/getwalletnfts", async (req, res) => {
  try {
    const { query } = req;
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: "0x1",
      format: "decimal",
      mediaItems: true,
      address: query.address,
    });

    return res.status(200).json(response);
  } catch (e) {
    console.log(`Something went wrong ${e}`);
    return res.status(400).json();
  }
});

app.post("/createclaimurl", async (req, res) => {
  const { body } = req;
  const newGift = await prisma.gift.create({
    data: {
      sender: body.sender ? body.sender : "",
      gif: body.gif ? body.gif : "",
      card: body.card ? body.card : "",
      title: body.title ? body.title : "",
      message: body.message ? body.message : "",
      amount: body.amount,
      chain: body.chain,
      chainId: body.chainId,
      claimLink: body.claimLink,
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

Moralis.start({
  apiKey: MORALIS_API_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
