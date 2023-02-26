import { NextApiRequest, NextApiResponse } from 'next'
import openai from '../../utils/chatgpt'

type Option = {
   value: string
   label: string
}

export type Data = {
   modelOptions: Option[]
}

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   const models = await openai
      .listModels()
      .then((response) => response.data.data)

   const modelOptions: Option[] = models.map((model) => ({
      value: model.id,
      label: model.id,
   }))

   res.status(200).json({ modelOptions })
}
