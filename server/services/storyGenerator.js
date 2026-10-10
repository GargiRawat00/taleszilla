const generateWithAI = async ({
  theme,
  emotion,
  ageGroup,
  characters,
  storyLength,
}) => {
  const prompt = `
Create a safe children's story.

Age group: ${ageGroup}
Theme: ${theme}
Emotion: ${emotion}
Characters: ${characters.join(", ")}
Length: ${storyLength}

The story should:
- be age appropriate
- teach empathy
- help understand ${emotion}
- show healthy emotional regulation
- end positively

Return ONLY valid JSON:

{
  "title": "",
  "content": "",
  "eqLesson": "",
  "eqSkills": [
    "self-awareness",
    "empathy",
    "emotion regulation"
  ],
  "reflectionQuestions": [
    "",
    "",
    ""
  ]
}
`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "X-Title": "TalesZilla",
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "openrouter/free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "OpenRouter request failed");
  }

  let text = data.choices?.[0]?.message?.content || "";

  text = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("AI did not return valid JSON");
  }

  const result = JSON.parse(text.slice(start, end + 1));

  return {
    ...result,
    theme,
    emotion,
    ageGroup,
    characters,
    storyLength,
  };
};

module.exports = {
  generateWithAI,
};
