// import type { NextApiRequest, NextApiResponse } from 'next';
// import OpenAI from 'openai';

// const token = process.env.GITHUB_TOKEN;

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse,
// ) {
// 	const { prompt } = req.body;
// 	if (!prompt) {
// 		return res.status(400).json({ error: 'Missing prompt' });
// 	}
// 	console.log(req.body);
// 	try {
// 		const client = new OpenAI({
// 			baseURL: 'https://models.inference.ai.azure.com', // Change if using OpenAI directly
// 			apiKey: token!,
// 		});

// 		const response = await client.chat.completions.create({
// 			model: 'gpt-4o',
// 			messages: [
// 				{ role: 'system', content: '' },
// 				{ role: 'user', content: prompt },
// 			],
// 			temperature: 1,
// 			max_tokens: 4096,
// 			top_p: 1,
// 		});

// 		const summary = response.choices[0]?.message?.content || '';
// 		res.status(200).json({ summary });
// 	} catch (err) {
// 		console.error('Error summarizing:', err);
// 		res.status(500).json({ error: 'Failed to summarize comments' });
// 	}
// }

import OpenAI from "openai"

export async function POST(req: Request, res: Response) {
  try {
    // Property 'prompt' does not exist on type 'ReadableStream<Uint8Array<ArrayBufferLike>> | null'.ts(2339)
    const { prompt } = res.body

    if (!prompt) {
      return Response.json({ error: "Missing Prompt" }, { status: 400 })
    }

    const { user: loggedInUser } = { user: { id: "fakeid" } }

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }
    const token = process.env.OPENAI_TOKEN!

    const client = new OpenAI({
      baseURL: "https://models.inference.ai.azure.com",
      apiKey: token,
    })

    const response = await client?.chat?.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "" },
        { role: "user", content: prompt },
      ],
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
    })

    const summary = response.choices[0]?.message?.content ?? ""
    // res.status(200).json({ summary })

    return new Response({ summary }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
