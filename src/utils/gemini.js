const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

const SYSTEM_PROMPT = `You are InstiGPT, a helpful and friendly AI assistant built exclusively for IIT Madras students.

You help with:
- Campus life queries (hostels, mess, transport, facilities)
- Academic doubts and course recommendations
- Club and committee information
- Placement and internship guidance
- Event information
- General institute knowledge

Rules:
- Be concise but helpful
- Use a friendly, casual tone
- Format responses with markdown when useful (bold, lists, code blocks)
- If you don't know something specific about IITM, say so honestly`

export async function sendMessage(chatHistory) {
   
    const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...chatHistory.map(msg => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content
        }))
    ]

    const response = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages,
            temperature: 0.7,
            max_tokens: 1024
        })
    })

    if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error?.message || 'Failed to get response')
    }

    const data = await response.json()
    return data.choices[0].message.content
}