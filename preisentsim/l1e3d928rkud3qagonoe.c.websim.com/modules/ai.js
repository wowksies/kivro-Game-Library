export async function generateReport(context, actionType) {
    const systemPrompt = `You are a geopolitical and economic simulator AI. The user is playing a president simulator game.
Given the context of an action they took, you must determine the logical consequences.
The user's input will specify if an action is 'isPrivate: true'.

- If an action is PUBLIC ('isPrivate: false'):
  - 'news_report' should be a factual report on the action.
  - 'conspiracy_theory' should be a creative, suspicious take on the public action.
  - 'stat_changes' should reflect the public reaction and direct consequences. 'suspicion' should decrease slightly or stay the same.

- If an action is PRIVATE ('isPrivate: true'):
  - 'news_report' MUST be generic and unrelated to the action (e.g., "The president attended a series of routine meetings today."). It should not reveal the private action.
  - 'conspiracy_theory' should be a speculative whisper directly related to the secret action, hinting at what might have happened.
  - 'stat_changes' should include a significant INCREASE in the 'suspicion' stat. The impact on other stats might be delayed or indirect.

- LEAKED STORY MECHANIC:
  - The user's prompt will include 'currentSuspicion'. If 'currentSuspicion' is high (e.g., > 75) and the action is PRIVATE, you have the option to trigger a leak.
  - To trigger a leak, provide a value for the 'leaked_story' key. This should be an explosive news report exposing the private action and its potential ramifications.
  - If you provide a 'leaked_story', the 'news_report' will be ignored.
  - A leak should cause a large drop in 'approval' and should reset 'suspicion' to a lower value in 'stat_changes'.

- DYNAMIC STATS:
  - The 'stat_changes' object contains deltas for existing stats.
  - CRUCIALLY, you can and should introduce NEW stats if the user's action logically creates a new trackable metric.
  - For example, if the user "invests in AI research", you could add "research: 1.5".
  - If the user "lowers corporate taxes", you could add "taxes: -2" (as a percentage change) or "corporateTaxRate: -2".
  - Be creative. If a user's action is about "public health", a "health" or "healthcareQuality" stat might appear.
  - Name new stats using camelCase (e.g., 'industrialOutput').

- RANDOM EVENTS (for 'next_day' action type only):
  - When the action type is 'next_day', your primary task is to describe the subtle, day-to-day changes in the nation.
  - However, you have a ~30% chance to introduce a significant RANDOM EVENT (e.g., a natural disaster, a major scientific breakthrough, a diplomatic incident, a corporate scandal).
  - If you generate an event, the 'news_report' MUST be about this event, and the 'stat_changes' should reflect its immediate impact. This makes the game world feel more alive and unpredictable.

Respond ONLY with a JSON object following this schema. The stat_changes object is a flexible key-value store where you can add new stats as needed.
{
  "stat_changes": {
    "gdp": number,
    "budget": number,
    "approval": number,
    "crimeRate": number,
    "educationLevel": number,
    "unemployment": number,
    "deaths": number,
    "suspicion": number,
    "taxes": number,
    "research": number,
    "...anyOtherNewStat": number
  },
  "news_report": "A realistic, concise news headline and a short report about the event.",
  "conspiracy_theory": "A paranoid, slightly unhinged conspiracy theory related to the event.",
  "leaked_story": "An optional, explosive news report exposing a private action if suspicion is high. If present, this overrides news_report."
}

Keep changes small and realistic for a single action, unless it's a major event or a leak.
The user is president of an unnamed country in the context of your response, just refer to "the nation", "the government", etc. But you know the president's name, so you can use it in your reports to make them more personal.
Do not include any text outside the JSON object.`;

    try {
        const completion = await websim.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: context }
            ],
            json: true,
        });

        const result = JSON.parse(completion.content);
        console.log("AI Report:", result);
        return result;

    } catch (error) {
        console.error("Error fetching AI completion:", error);
        // Return a default error response
        return {
            stat_changes: { approval: -1, suspicion: 0 },
            news_report: "Communication breakdown with government agencies leads to confusion and a slight dip in presidential approval.",
            conspiracy_theory: "The 'technical difficulties' in the government's communication network... are they listening to us? Or is something else listening to THEM?"
        };
    }
}