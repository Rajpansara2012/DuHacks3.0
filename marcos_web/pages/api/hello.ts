// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/dbconnect";
import Temp from "@/models/templates";

type Data = {
  components: object
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let components = [
  {
    id: "abc",
    html: "<h2>Hello SIr</h2>",
    css: "h2 {color: red}",
    js: "",
  },
  {
    id: "abc",
    html: "<h1>Hello Madam</h1>",
    css: "h1 {color: blue}",
    js: "",
  },
  
]

  res.status(200).json({ components });
}