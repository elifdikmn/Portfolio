/*
  This array is the only thing you need to touch to add, edit, or reorder projects.
  Each object becomes one project card, rendered by main.js.

  Fields:
    title     - project name
    period    - year or year range, shown as a small label
    featured  - true for exactly one project = gets the big "lead story" layout.
                Set a different project's featured to true to swap which one leads.
    tagline   - one sentence, shown under the title everywhere
    problem   - 1-3 sentences: what problem you were solving and why it's hard
    approach  - array of strings, one per bullet point, on how you solved it
    tools     - array of strings, shown as small tags
    results   - array of strings, one per bullet point, on what happened / what you found
    highlight - one short phrase with the headline number or outcome, shown in large type
    link      - URL to the project (GitHub repo, live site, etc.)
    linkLabel - text for the link button, e.g. "View on GitHub" or "View live site"

  To add a new project, copy one of the objects below (including the curly braces),
  paste it into the array, and edit the fields. Order in this array = order on the page,
  except the featured:true project always renders first.
*/

const PROJECTS = [
  {
    title: "Football Match Prediction",
    period: "2024–2025",
    featured: true,
    tagline: "Predicting Home/Draw/Away outcomes across 8 major leagues with a full ML pipeline, served to an iOS app.",
    problem: "Football outcomes are noisy and multi-causal — form, injuries, market sentiment, and plain chance all blend together. Most casual predictions lean on gut feel or a single stat, so I wanted to see how far a properly engineered ML pipeline could push real accuracy across many leagues at once, not just one.",
    approach: [
      "Collected and cleaned match data from 2014–2025 across 8 leagues (Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Turkish Süper Lig, plus international tournaments) from Kaggle and football APIs.",
      "Web-scraped expected goals (xG), team form, and betting-market odds to enrich the raw results data.",
      "Engineered features per match: recent form (win/draw/loss rate, goal differential), ELO-style momentum, head-to-head history, and market-implied probabilities from odds.",
      "Trained and tuned Random Forest, Logistic Regression, and XGBoost per league with GridSearchCV and stratified cross-validation, then kept the best model per league.",
      "Wrapped the winning models in a Flask REST API and built a Swift/iOS front end to serve live predictions."
    ],
    tools: ["Python", "scikit-learn", "TensorFlow", "Pandas", "NumPy", "Flask", "SQLite", "Swift / Xcode"],
    results: [
      "57.5% overall accuracy and 54.3% macro F1 across all 8 leagues on a 3-way (home/draw/away) prediction task — well above the ~33% random baseline.",
      "Random Forest was the strongest model in 6 of 8 leagues; Logistic Regression edged it out for the Premier League and Turkish Süper Lig.",
      "Held up on unseen 2023+ matches, which mattered more to me than a good backtest. Draws stayed the hardest class to call (34% precision) — which tracks, since draws are notoriously hard to predict even for human pundits."
    ],
    highlight: "57.5% accuracy · 54.3% macro F1 across 8 leagues",
    link: "https://github.com/elifdikmn/FootballMatchPrediction",
    linkLabel: "View on GitHub"
  },
  {
    title: "Data Analyst Job Market Analysis",
    period: "2023",
    featured: false,
    tagline: "A SQL-only deep dive into what actually gets a data analyst hired at the top of the pay scale.",
    problem: "Everyone has an opinion about which skills “you need” for a data job. I wanted an answer backed by real job-posting data instead of anecdotes: which roles pay the most, which skills show up in those roles, and where demand and pay genuinely overlap.",
    approach: [
      "Queried a 2023 job-postings database directly in PostgreSQL — no pandas, no notebooks, just SQL end to end.",
      "Used CTEs, multi-table joins, and GROUP BY aggregations to isolate remote data-analyst roles with disclosed salaries.",
      "Cross-referenced skill frequency against average salary to separate “in-demand” from “high-paying” — they turned out not to be the same list.",
      "Ranked the highest-paying and most-requested skills to find where the two actually intersect."
    ],
    tools: ["SQL", "PostgreSQL", "VS Code", "Git / GitHub"],
    results: [
      "Top-paying remote analyst roles ranged from $184K up to $650K.",
      "SQL was the most-requested skill overall, appearing in 8 of the top 10 highest-paying postings, with Python and Tableau close behind.",
      "By volume, demand was led by SQL, Excel, Python, Tableau, and Power BI — but the highest average salaries went to less common tools like PySpark, Bitbucket, and Couchbase, suggesting cloud and engineering-adjacent skills are where the real premium is heading."
    ],
    highlight: "Top salaries up to $650K · SQL in 8/10 top-paying postings",
    link: "https://github.com/elifdikmn/SQL_Analyze_Job",
    linkLabel: "View on GitHub"
  },
  {
    title: "Data Privacy Assistant",
    period: "2024",
    featured: false,
    tagline: "A full-stack tool that checks what GPT Actions actually collect against what their privacy policies claim.",
    problem: "Privacy policies for LLM plugins and GPT Actions are long, vague, and rarely match what's actually being collected in practice. I wanted to make that gap visible and explorable instead of theoretical.",
    approach: [
      "Analyzed GPT Action metadata and datasets to find patterns in what sensitive data types actually get requested.",
      "Built a conversational assistant (LLM-backed) so users can just ask what a given action collects, instead of parsing legal text themselves.",
      "Added interactive visualizations of data-type distributions, plus a small game to make the topic less dry.",
      "Built the backend as a REST API and the frontend as a React app talking to it."
    ],
    tools: ["Python", "FastAPI", "Together AI API", "React", "npm"],
    results: [
      "Shipped a working end-to-end app — chatbot + live visualizations + a privacy-awareness mini-game — not just a notebook analysis.",
      "Surfaced concrete gaps between what GPT Actions claim to collect and the sensitive data types that show up most often in practice.",
      "First project where I owned the full stack — LLM integration, API, and frontend — rather than just the analysis layer."
    ],
    highlight: "End-to-end app: LLM chatbot + live visual analytics",
    link: "https://github.com/elifdikmn/DataPrivacy",
    linkLabel: "View on GitHub"
  }
];
