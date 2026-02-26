export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { model, prompt, temperature } = req.body || {};
    if (!model || !prompt) return res.status(400).json({ error: "Missing model/prompt" });

    const apiKey = process.env.DASHSCOPE_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "Missing DASHSCOPE_API_KEY env var on server" });

    const resp = await fetch(
      "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          input: { messages: [{ role: "user", content: prompt }] },
          parameters: {
            result_format: "message",
            temperature: typeof temperature === "number" ? temperature : 0.2,
          },
        }),
      }
    );

    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) return res.status(resp.status).json(data);

    const content =
      data?.output?.choices?.[0]?.message?.content ??
      data?.output?.text ??
      "";

    return res.status(200).json({ content });
  } catch (e) {
    return res.status(500).json({ error: "Server error", detail: String(e) });
  }
}
