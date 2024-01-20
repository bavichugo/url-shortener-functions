import { onRequest } from "firebase-functions/v2/https";
import express, { Request, Response } from "express";
import { connectMongoose } from "./helper/database";
import User from "./model/user";
import UrlRecord from "./model/url";

const app = express();
app.use(express.json());
app.use(connectMongoose);

app.post("/user", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.send("Creation successful!");
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send(err.message)
    }
    res.status(401).send("Failed creating user")
  }
});

app.post("/url", async (req: Request, res: Response) => {
  try {
    const { long_url, short_url, user } = req.body;
    const urlRecord = new UrlRecord({ long_url, short_url, user });
    await urlRecord.save();
    res.send("Creation successful!");
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send(err.message)
    }
    res.status(401).send("Failed creating user")
  }
});

export const api = onRequest(app);
