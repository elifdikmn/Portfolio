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
    flow      - optional array of {label, detail} steps, rendered as a "how it works"
                left-to-right diagram. Omit the field to skip the diagram entirely.
    tools     - array of strings, shown as small tags
    results   - array of strings, one per bullet point, on what happened / what you found
    chart     - optional single chart object, or array of chart objects (rendered side by
                side). Omit to skip the "Plots" section. Chart types:
                  { type: "grouped-bar", title, unit, categories: [...], series: [{name, color, values:[...]}] }
                  { type: "ranked-bar", title, items: [{label, value, displayValue?}] }
                  { type: "stat", title?, value, label, detail }
                  { type: "icon-row", title, items: [{icon: "treemap"|"sunburst"|"heatmap"|"table", label}] }
    highlight - one short phrase with the headline number or outcome, shown in large type
    link      - URL to the project (GitHub repo, live site, etc.) — omit if there isn't one
                yet (e.g. coursework not on GitHub); the link button just won't render.
    linkLabel - text for the link button, e.g. "View on GitHub" or "View live site"

  To add a new project, copy one of the objects below (including the curly braces),
  paste it into the array, and edit the fields. Order in this array = order on the page,
  except the featured:true project always renders first.
*/

const PROJECTS = [
  {
    title: "Football Match Prediction",
    period: "Mar–Jun 2025",
    featured: true,
    tagline: "A full ML pipeline predicting Home/Draw/Away outcomes, with a real-time in-match engine and an iOS client with an explainability view.",
    problem: "Football outcomes are noisy and multi-causal — form, injuries, market sentiment, and plain chance all blend together. Most casual predictions lean on gut feel or a single stat, so I wanted to see how far a properly engineered ML pipeline could push real accuracy, end to end, from raw data to a live mobile app.",
    approach: [
      "Aggregated match data from API-Football and Kaggle historical datasets, supplemented with web scraping (BeautifulSoup/requests); normalized timestamps to ISO-8601 and standardized team names across sources.",
      "Cleaned and engineered features: label-encoded categoricals, imputed residual gaps, and built recent-form, ELO-style momentum, and head-to-head signals.",
      "Trained Logistic Regression, Random Forest, and XGBoost per league, tuning via GridSearchCV (n_estimators, max_depth, min_samples_split/leaf) with class_weight=\"balanced\" and stratified 5-fold CV — using a time-based split so future matches never leak into training.",
      "Built a real-time in-match model that refreshes predictions every minute from live score, minute, and half-time status, logging outputs to SQLite.",
      "Shipped a Swift/iOS client with Match Details and Standings panels, plus an explainability view surfacing the key drivers behind each prediction."
    ],
    flow: [
      { label: "Data Collection", detail: "API-Football + Kaggle + BeautifulSoup scraping, normalized & deduplicated" },
      { label: "Feature Engineering", detail: "Form, ELO momentum, encoding, imputation, time-based split" },
      { label: "Model Training", detail: "LogReg / Random Forest / XGBoost, GridSearchCV, 5-fold CV" },
      { label: "Real-Time Engine", detail: "Per-minute refresh from live match state, logged to SQLite" },
      { label: "iOS App", detail: "Swift client: match details, standings, explainability view" }
    ],
    tools: ["Python", "scikit-learn", "XGBoost", "Pandas", "NumPy", "joblib", "BeautifulSoup", "Flask", "SQLite", "Matplotlib", "Seaborn", "Swift / Xcode"],
    results: [
      "Improved overall accuracy from 55% to 63% and macro-F1 from 54% to 62% through feature engineering and per-league model tuning.",
      "Selected the best-performing model per league and persisted it with joblib for production use.",
      "Real-time in-match predictions refresh every minute during live matches, driven by score, minute, and half-time status.",
      "Added an explainability view in the iOS app so predictions aren't just a black-box output."
    ],
    chart: {
      type: "grouped-bar",
      title: "Precision & recall by outcome (final model)",
      unit: "%",
      categories: ["Home", "Draw", "Away"],
      series: [
        { name: "Precision", color: "var(--color-accent)", values: [64, 34, 62] },
        { name: "Recall", color: "var(--color-chart-2)", values: [59, 40, 57] }
      ]
    },
    highlight: "Accuracy 55% → 63% · Macro-F1 54% → 62%",
    link: "https://github.com/elifdikmn/FootballMatchPrediction",
    linkLabel: "View on GitHub"
  },
  {
    title: "Data Privacy Assistant",
    period: "2025 – Present",
    featured: false,
    tagline: "Research internship project at Università di Bologna: an LLM-powered pipeline and dashboard suite auditing what GPT Actions actually collect.",
    problem: "Privacy policies for LLM plugins and GPT Actions are long, vague, and rarely reflect what's actually collected in practice. As part of my research internship at Università di Bologna, I set out to make that gap visible and explorable instead of theoretical.",
    approach: [
      "Built an end-to-end ingestion pipeline: pulled GPT app manifests and Action specs, fetched their privacy policies, and normalized everything to JSON/Parquet.",
      "Aligned the taxonomy against a published University of Washington dataset to seed categories and keep provenance consistent across data versions.",
      "Linked policies back to their apps/actions via IDs and domains, then computed coverage and consistency metrics to flag gaps and outliers.",
      "Built an LLM-based chatbot (OpenAI API + LangChain) that answers user questions about what an action collects and visualizes the answer directly in the UI.",
      "Shipped interactive dashboards — treemap, sunburst, pie chart, heatmaps, and a searchable table — plus a small privacy-awareness game."
    ],
    flow: [
      { label: "Ingestion", detail: "GPT manifests + Action specs → fetched privacy policies" },
      { label: "Normalization", detail: "JSON/Parquet, aligned to a UW-seeded taxonomy" },
      { label: "Analysis", detail: "Coverage & consistency metrics, gap/outlier flags" },
      { label: "Chatbot + Dashboards", detail: "LLM Q&A (OpenAI + LangChain) + treemap/sunburst/heatmap views" }
    ],
    tools: ["Python", "Plotly / Dash", "OpenAI API", "LangChain", "Pandas", "NumPy", "Selenium", "FastAPI", "React"],
    results: [
      "Shipped a working research tool, not just an analysis: ingestion pipeline + LLM chatbot + multi-view dashboards, now part of ongoing work at Università di Bologna.",
      "Coverage/consistency metrics surface concrete gaps between what GPT Actions claim to collect and what their policies actually document.",
      "First project where I owned the full stack end to end — data pipeline, LLM integration, and the visualization layer."
    ],
    chart: {
      type: "icon-row",
      title: "Dashboard views shipped",
      items: [
        { icon: "treemap", label: "Treemap" },
        { icon: "sunburst", label: "Sunburst" },
        { icon: "heatmap", label: "Heatmap" },
        { icon: "table", label: "Searchable table" }
      ]
    },
    highlight: "Research @ Università di Bologna — ingestion pipeline + LLM chatbot + 5 dashboard views",
    link: "https://github.com/elifdikmn/DataPrivacy",
    linkLabel: "View on GitHub"
  },
  {
    title: "Atlanta Braves Attendance Forecast",
    period: "2024",
    featured: false,
    tagline: "Forecasting 2024 Atlanta Braves game attendance from team performance and weather data.",
    problem: "Game attendance swings on a lot more than the schedule — team performance, weather, and other externalities all move it. I wanted to see how accurately that could be forecast ahead of time, using rigorous regression rather than guesswork.",
    approach: [
      "Collected and merged datasets from Baseball Reference (team/game performance) and Weather Underground (game-day weather) for the 2024 season.",
      "Built forecasting models with multiple linear regression, time series regression, and exponential smoothing.",
      "Optimized feature selection with backward-step elimination and validated with 5-fold cross-validation to control overfitting."
    ],
    flow: [
      { label: "Data Collection", detail: "Baseball Reference (team/game stats) + Weather Underground" },
      { label: "Feature Selection", detail: "Backward-step elimination across performance + weather variables" },
      { label: "Forecasting Models", detail: "Multiple linear regression, time series regression, exponential smoothing" },
      { label: "Validation", detail: "5-fold cross-validation to control overfitting" }
    ],
    tools: ["R", "Regression Modeling", "Time Series Forecasting"],
    results: [
      "Achieved an adjusted R² of 0.973 on the final model — the large majority of game-to-game attendance variation explained by the selected features.",
      "Backward-step feature selection plus 5-fold CV kept the model from overfitting to a single season's quirks.",
      "Completed as coursework for Georgia Tech's GTx ISYE6501x (Analytics Modeling)."
    ],
    chart: {
      type: "stat",
      value: "0.973",
      label: "Adjusted R²",
      detail: "Multiple linear regression + time series regression + exponential smoothing, optimized via backward-step feature selection with 5-fold cross-validation."
    },
    highlight: "Adjusted R² = 0.973"
    // No public repo for this one yet — add a `link` field here once/if you publish the code.
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
    flow: [
      { label: "Job Postings DB", detail: "2023 data-analyst postings loaded into PostgreSQL" },
      { label: "SQL Analysis", detail: "CTEs, multi-table joins, GROUP BY aggregations" },
      { label: "Two Rankings", detail: "Skill demand (frequency) vs. skill pay (avg. salary)" },
      { label: "Insights", detail: "Where high demand and high pay actually overlap" }
    ],
    tools: ["SQL", "PostgreSQL", "VS Code", "Git / GitHub"],
    results: [
      "Top-paying remote analyst roles ranged from $184K up to $650K.",
      "SQL was the most-requested skill overall, appearing in 8 of the top 10 highest-paying postings, with Python and Tableau close behind.",
      "By volume, demand was led by SQL, Excel, Python, Tableau, and Power BI — but the highest average salaries went to less common tools like PySpark, Bitbucket, and Couchbase, suggesting cloud and engineering-adjacent skills are where the real premium is heading."
    ],
    chart: [
      {
        type: "ranked-bar",
        title: "Most in-demand skills (job postings)",
        items: [
          { label: "SQL", value: 7291 },
          { label: "Excel", value: 4611 },
          { label: "Python", value: 4330 },
          { label: "Tableau", value: 3745 },
          { label: "Power BI", value: 2609 }
        ]
      },
      {
        type: "ranked-bar",
        title: "Highest average salary by skill",
        items: [
          { label: "PySpark", value: 208, displayValue: "$208K" },
          { label: "Bitbucket", value: 189, displayValue: "$189K" },
          { label: "Couchbase", value: 160.5, displayValue: "$160.5K" }
        ]
      }
    ],
    highlight: "Top salaries up to $650K · SQL in 8/10 top-paying postings",
    link: "https://github.com/elifdikmn/SQL_Analyze_Job",
    linkLabel: "View on GitHub"
  }
];
