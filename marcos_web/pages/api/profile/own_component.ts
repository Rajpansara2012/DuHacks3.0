import { connectDB } from '@/utils/dbconnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import Components from "@/models/components";
import { getSession } from 'next-auth/react';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
         try{
            const text = req.body;
            await connectDB();
            const comp = await Components.find({user: text.user});

            res.status(200).json({ components: comp });
        }catch (e) {
            console.error(e);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }

    else {
        res.status(200).json({ text: 'Bye' });
        console.log("helloa");

    }
}