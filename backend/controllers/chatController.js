const getChatResponse = async (req, res) => {
    try {
        const { message } = req.body;
        const lowerMsg = message.toLowerCase();

        // --- 1. Knowledge Base (Mirrors Analytics.vue) ---
        const dashboardData = {
            overview: {
                impressions: "1.2M (+18.2% vs last month)",
                reach: "450K (+5.4%)",
                visits: "22K (-1.2%)",
                followers: "12.3k (Total)"
            },
            bestPost: {
                title: "Summer Campaign Launch",
                platform: "Instagram",
                stats: "45k Reach, 12% Engagement"
            },
            platforms: {
                instagram: "Instagram is your top performer with 18% growth and high engagement.",
                linkedin: "LinkedIn has seen a slight dip (-2% engagement). It needs more professional content.",
                twitter: "Twitter is steady. Good for quick updates.",
                facebook: "Facebook reach is low but stable."
            }
        };

        let reply = "";

        // --- 2. Smart Matching Logic ---
        const contains = (keywords) => keywords.some(k => lowerMsg.includes(k));

        // Identity & Capabilities
        if (contains(['who are you', 'tum kaun ho', 'what can you do', 'intro'])) {
            reply = "I am **DashBot AI**, your smart analytics assistant. I know everything about your dashboard.\n\n" +
                "Dataset I have access to:\n" +
                "• Total Reach & Impressions\n" +
                "• Platform Performance (Instagram, LinkedIn, etc.)\n" +
                "• Top Performing Posts\n" +
                "\nTry asking: 'How is my reach?' or 'What is my best post?'";
        }

        // Specific Metrics: Reach
        else if (contains(['reach', 'people', 'audience size'])) {
            reply = `Your **Average Reach** is currently **${dashboardData.overview.reach}**. It's trending up! 📈`;
        }

        // Specific Metrics: Impressions
        else if (contains(['impression', 'view', 'seen'])) {
            reply = `You have generated **${dashboardData.overview.impressions}** total impressions. That's a massive +18.2% jump! 🚀`;
        }

        // Specific Metrics: Visits / Profile
        else if (contains(['visit', 'profile', 'click'])) {
            reply = `Profile visits are at **${dashboardData.overview.visits}**. They are slightly down (-1.2%), maybe try updating your bio link?`;
        }

        // Best Post Analysis
        else if (contains(['best post', 'top post', 'viral', 'most popular'])) {
            reply = `Your best performing post is **"${dashboardData.bestPost.title}"** on ${dashboardData.bestPost.platform}.\n` +
                `Stats: ${dashboardData.bestPost.stats}. 🔥`;
        }

        // Platform Specific: Instagram
        else if (contains(['instagram', 'insta', 'ig'])) {
            reply = dashboardData.platforms.instagram;
        }

        // Platform Specific: LinkedIn
        else if (contains(['linkedin', 'linked'])) {
            reply = dashboardData.platforms.linkedin;
        }

        // General "How am I doing?"
        else if (contains(['how am i doing', 'performance', 'summary', 'report', 'overall', 'kaisa chal raha hai'])) {
            reply = `Here is your **Executive Summary**:\n` +
                `• Reach: ${dashboardData.overview.reach}\n` +
                `• Impressions: ${dashboardData.overview.impressions}\n` +
                `• Top Platform: Instagram\n` +
                `Overall, you are crushing it! 💪`;
        }

        // Greetings
        else if (contains(['hello', 'hi', 'hey', 'namaste'])) {
            reply = "Hello! 👋 I'm ready to analyze your data. Ask me 'What is my total reach?'";
        }

        // Gratitude
        else if (contains(['thank', 'good', 'nice', 'mast'])) {
            reply = "You're welcome! Let me know if you need more insights. 😊";
        }

        // --- 3. Better Fallback (No more "Learning") ---
        else {
            const helpfulPrompts = [
                "I can tell you about your **Reach**, **Impressions**, or **Top Posts**. Which one?",
                "Ask me specifically about 'Instagram' or 'LinkedIn' to see how they compare.",
                "Would you like a summary of your performance? Just say 'Report'.",
                "I didn't quite catch that, but I know your stats inside out. Try asking 'Show me my best post'."
            ];
            reply = helpfulPrompts[Math.floor(Math.random() * helpfulPrompts.length)];
        }

        // Simulate thinking delay
        setTimeout(() => {
            res.json({ reply });
        }, 600);

    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "My brain is offline briefly (Server Error). Check the console." });
    }
};

module.exports = { getChatResponse };
