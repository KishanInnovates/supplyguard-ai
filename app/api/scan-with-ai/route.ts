import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const { dependencies } = await req.json()

        if (!dependencies || typeof dependencies !== "object") {
            return NextResponse.json({ error: "Invalid dependencies" }, { status: 400 })
        }

        const prompt = `
You are a software security expert.

Given the following npm dependencies:

${JSON.stringify(dependencies, null, 2)}

Check each dependency against known vulnerabilities. If any version listed below has a known vulnerability, return an array of affected packages in the following JSON format. Otherwise, return an empty array. Do not include any explanation or extra text.

[
  {
    "package": "express",
    "currentVersion": "4.17.1",
    "vulnerability": "Open Redirect",
    "severity": "low",
    "suggestedFix": "4.18.2",
    "description": "Fixes open redirect vulnerability"
  }
]
Only respond with a valid JSON array. Do not return markdown or code blocks.
`


        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-002:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: prompt }],
                        },
                    ],
                    generationConfig: {
                        temperature: 0, // ensures consistency
                        topK: 1,
                        topP: 1,
                    },
                }),
            }
        )



        const result = await res.json()
        console.log(result)
        const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || ""
        console.log("⚠️ Gemini Raw Response:\n", text)

        // Handle empty or invalid response
        const jsonStart = text.indexOf("[")
        const jsonEnd = text.lastIndexOf("]")

        if (jsonStart === -1 || jsonEnd === -1 || jsonEnd < jsonStart) {
            return NextResponse.json({
                error: "Gemini returned invalid output.",
                raw: text,
            }, { status: 500 })
        }

        const suggestions = JSON.parse(text.substring(jsonStart, jsonEnd + 1))
        return NextResponse.json({ suggestions })

    } catch (err: any) {
        console.error("❌ AI Scan error:", err)
        return NextResponse.json({ error: "Scan failed", message: err.message }, { status: 500 })
    }
}
