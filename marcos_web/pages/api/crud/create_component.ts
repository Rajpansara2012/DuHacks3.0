import { connectDB } from '@/utils/dbconnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import Components from '@/models/components';
// import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // const session = await getSession({ req });
      console.log("in api")

      // if (!session) {
      //   return res.status(401).json({ error: 'Unauthorized' });
      // }

      
        const { htmlContent, cssContent, jsContent, category, user } = req.body;
        await connectDB();
        await Components.create({
            html: htmlContent,
            css: cssContent,
            js: jsContent,
            category: category,
            user: user,
        });
    //   const comp = new Components();
    //   comp.html = htmlContent;
    //   comp.css = cssContent;
    //   comp.js = jsContent;
    //   comp.category = category;
    //   comp.user = user;

    //   console.log(comp);
    //   await comp.save();
      console.log("saved");
      res.status(200).json({ message: 'Component added successfully!' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(200).json({ message: 'Bye' });
    console.log('helloa');
  }
}