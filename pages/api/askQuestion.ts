import { NextApiRequest, NextApiResponse } from 'next'
import queryApi from '../../utils/queryApi'

type Data = {
   answer: string
}

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   const { prompt, model, id } = req.body

   if (!prompt) {
      res.status(400).json({ answer: 'Please provide a prompt!' })
      return
   }
   if (!id) {
      res.status(400).json({ answer: 'Please provide a valid chat id!' })
      return
   }

   const response = await queryApi(prompt, model)
   console.log(response)
}
