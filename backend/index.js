import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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
    console.log("query in server", query);
    const allGifts = await prisma.gift.findMany({
      where: {
        sender: query.sender,
        title: query.title,
        message: query.message,
      },
    });

    console.log("gifts", allGifts);
    return res.status(200).json(allGifts);
  } catch (e) {
    console.log("error", e);
    return res.status(400).json();
  }
});

app.post("/createclaimurl", async (req, res) => {
  const { body } = req;
  console.log("body", body);
  const newGift = await prisma.gift.create({
    data: {
      sender: body.sender ? body.sender : "",
      gif: body.gif ? body.gif : "",
      card: body.card ? body.card : "",
      title: body.title ? body.title : "",
      message: body.message ? body.message : "",
      claimLink: body.claimLink,
      claimed: false,
    },
  });

  console.log("db here", prisma.gift.findMany());
  console.log("new giiiift", newGift);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
