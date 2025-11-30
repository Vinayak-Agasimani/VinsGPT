import "dotenv/config";

const getOpenAIAPIResponse = async(message) => {
    const options = {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
        },
        body: JSON.stringify({
            model: "tngtech/deepseek-r1t2-chimera:free",
            messages: [{ role: "user", content: message }]
        })
    };

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
        const data = await response.json();

        // ------- FIX: Prevent crash -------
        if (!data?.choices || !data.choices[0]?.message?.content) {
            console.log("OpenRouter API Error:", data);
            return "Sorry, I couldn't generate a response.";
        }
        // ----------------------------------

        return data.choices[0].message.content;

    } catch(err){
        console.log(err);
        return "Sorry, something went wrong.";
    }
}

export default getOpenAIAPIResponse;
