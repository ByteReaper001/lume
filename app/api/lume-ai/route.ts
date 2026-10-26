import { NextResponse } from 'next/server'
import { products } from '@/lib/data'

const systemPrompt = `You are LUME AI, a thoughtful photography curator for the LUME marketplace.
Answer the visitor's actual question directly and naturally. Do not repeat a canned fallback.
You can help with choosing photographs by mood, subject, room, color, artist, price, format, and gift ideas.
Only recommend products and facts from the supplied catalog. If the question is unrelated to LUME, answer briefly and redirect toward photography.
Keep replies warm, specific, and concise (2-4 short sentences). Mention product titles and photographers when useful. Never invent stock, shipping, discounts, policies, or product details.
Catalog:
${products.map((product) => `- ${product.title} by ${product.photographer}; category: ${product.category}; price: ${product.price}; tags: ${product.tags.join(', ')}; description: ${product.description}`).join('\n')}`

export async function POST(request: Request) {
  // Support the project setting name as well as conventional aliases used by Groq.
  // The key remains server-only and is never exposed to the browser.
  const groqKey = (
    process.env.LumeAI ||
    process.env.LUME_AI ||
    process.env.LUMEAI ||
    process.env.GROQ_API_KEY
  )?.trim()
  const gatewayKey = process.env.AI_GATEWAY_API_KEY?.trim()

  if (!groqKey && !gatewayKey) {
    return NextResponse.json({ error: 'Lume AI is not configured.' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const message = typeof body?.message === 'string' ? body.message.trim() : ''

    if (!message || message.length > 1000) {
      return NextResponse.json({ error: 'Please send a question under 1000 characters.' }, { status: 400 })
    }

    const response = await fetch(
      groqKey ? 'https://api.groq.com/openai/v1/chat/completions' : 'https://ai-gateway.vercel.sh/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${groqKey || gatewayKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        model: groqKey ? 'llama-3.3-70b-versatile' : 'openai/gpt-4o-mini',
        temperature: 0.75,
        max_tokens: 220,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Lume AI could not respond right now.' }, { status: 502 })
    }

    const result = await response.json()
    const answer = result?.choices?.[0]?.message?.content?.trim()
    if (!answer) return NextResponse.json({ error: 'Lume AI returned an empty response.' }, { status: 502 })

    return NextResponse.json({ answer })
  } catch {
    return NextResponse.json({ error: 'Lume AI could not respond right now.' }, { status: 500 })
  }
}
