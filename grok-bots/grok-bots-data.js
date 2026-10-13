/* Grok bots shown on /grok-bots, made by X Freeze.
 * Each bot: name, category, job title (role), a short summary for the card (about), what it does (can),
 * how it works (how), what it won't do (wont), tools, its Grok link,
 * its icon (a name in js/grok-bots-icons.js) and its official face (shape index into
 * js/grok-bots-faces.js + its colour). The face is only drawn faintly in the background; the
 * colour also picks the gradient of the bot's tile.
 */
window.FreezeStackGrokBots = {
 "updated": "2026-10-13",
 "categories": [
  {
   "id": "create",
   "name": "Create"
  },
  {
   "id": "work",
   "name": "Work"
  },
  {
   "id": "business",
   "name": "Business"
  },
  {
   "id": "tech",
   "name": "Tech"
  },
  {
   "id": "life",
   "name": "Life"
  },
  {
   "id": "health",
   "name": "Health"
  },
  {
   "id": "learn",
   "name": "Learning & Career"
  },
  {
   "id": "team",
   "name": "Team"
  }
 ],
 "bots": [
  {
   "id": "interior-bot",
   "name": "Interior Bot",
   "category": "life",
   "role": "Home & interior planner",
   "about": "Plans room layouts with real measurements, budgets your renovation line by line, and checks contractor quotes before you commit.",
   "can": [
    "Plans furniture layouts with clearances and measurements",
    "Budgets renovations line by line, with a contingency",
    "Compares contractor quotes on scope and what's included",
    "Builds a seasonal home maintenance checklist"
   ],
   "how": "Think of it as a practical designer with a tape measure and a calculator. It works from your room sizes and budget, keeps a buffer in every estimate, and flags anything that needs a licensed engineer.",
   "wont": [
    "Approve structural or electrical changes",
    "Hire or pay contractors for you"
   ],
   "tools": [],
   "link": "https://x.ai/bot/6iAyB9r-4bXRHt2_jLQYK",
   "icon": "sofa",
   "face": 0,
   "color": "#804EE0"
  },
  {
   "id": "explainer-bot",
   "name": "Explainer Bot",
   "category": "learn",
   "role": "Science & tech explainer",
   "about": "Explains tech and space news, science papers, markets and X threads from first principles, with checked facts, real numbers and clear diagrams.",
   "can": [
    "Breaks down tech, space and science news",
    "Explains research papers and market moves in plain words",
    "Puts big numbers in scale so they mean something",
    "Draws simple diagrams of how things work"
   ],
   "how": "It's the friend who loves explaining how things work. It checks the facts first, starts from the basics and builds up step by step until the idea clicks, without dumbing it down.",
   "wont": [
    "Guess when the facts aren't clear",
    "Present rumours as confirmed"
   ],
   "tools": [],
   "link": "https://x.ai/bot/_G_I5jXyXTNLten5Mntwj",
   "icon": "lightbulb",
   "face": 5,
   "color": "#E02A88"
  },
  {
   "id": "x-post-bot",
   "name": "X Post Bot",
   "category": "create",
   "role": "X post writer for tech news",
   "about": "Turns official links, announcements and X posts into paste-ready X posts in a clear, confident news voice, with every number checked.",
   "can": [
    "Turns announcements into ready-to-post X posts",
    "Fact-checks every number and claim against the source",
    "Writes in a clear, confident news voice",
    "Covers tech and space news for creators"
   ],
   "how": "Built for creators who post about tech and space. It works from official sources, checks every figure before it writes, and hands you a post you can paste straight into X.",
   "wont": [
    "Post for you",
    "Make up numbers or quotes"
   ],
   "tools": [
    "X"
   ],
   "link": "https://x.ai/bot/CmtyOJ-55LR_MdEP7LMye",
   "icon": "at-sign",
   "face": 1,
   "color": "#855C36"
  },
  {
   "id": "bot-manager",
   "name": "Bot Manager",
   "category": "team",
   "role": "Bot builder & quality checker",
   "about": "Sets up, creates, updates and checks AI bots to one standard, from loading a whole bot library to designing a brand-new bot.",
   "can": [
    "Loads a whole library of bots word for word",
    "Designs a new bot for any job you name",
    "Updates existing bots without breaking them",
    "Audits a bot and marks it READY or NEEDS FIXES"
   ],
   "how": "It's the quality lead for your bot team. Every bot it builds or reviews follows the same standard, and each audit ends with a clear verdict and the exact fixes needed.",
   "wont": [
    "Call a bot ready when it isn't",
    "Skip checks to save time"
   ],
   "tools": [
    "Project folder",
    "Agent platform"
   ],
   "link": "https://x.ai/bot/kRCgcdtWsy-rgpwTa6yyR",
   "icon": "network",
   "face": 1,
   "color": "#804EE0"
  },
  {
   "id": "director-bot",
   "name": "Director Bot",
   "category": "team",
   "role": "Film director & crew lead",
   "about": "Builds and leads a five-member AI film crew, holds the creative vision, and explains every step to you as the producer.",
   "can": [
    "Sets up a story architect, researcher, cinematographer, editor and reviewer",
    "Writes the vision, scene breakdowns, schedules and call sheets",
    "Directs live actors and AI-generated performances",
    "Reports to you in plain language at every checkpoint"
   ],
   "how": "You're the producer; it runs the set. It briefs each crew member so nothing is left to guess, holds a daily stand-up during production, and brings you only the decisions that need you.",
   "wont": [
    "Spend, book or publish without you",
    "Skip the reviewer's checks or hide a problem"
   ],
   "tools": [
    "Project files"
   ],
   "link": "https://x.ai/bot/47Nedq_PPll6YlAalQKAq",
   "icon": "clapperboard",
   "face": 5,
   "color": "#777777"
  },
  {
   "id": "web-lead-bot",
   "name": "Web Lead Bot",
   "category": "team",
   "role": "Website project lead",
   "about": "Builds and leads a five-member web crew that takes your plan to a secure live site with login and payments.",
   "can": [
    "Sets up a UI designer, app, backend and platform engineers, and a security tester",
    "Turns your idea into a project plan with clear acceptance criteria",
    "Brings you options with costs and a recommendation",
    "Sends a daily build report while the site is made"
   ],
   "how": "You only give the plan, connect access once, pick between options, and approve four checkpoints: the plan, the design, a staging test and go-live. It never asks for passwords in chat, and won't launch with an open critical security issue.",
   "wont": [
    "Spend money or switch payments to live without your yes",
    "Ask for passwords or secrets in chat"
   ],
   "tools": [
    "GitHub"
   ],
   "link": "https://x.ai/bot/h7_OKXedqaIDKu1iwl8fL",
   "icon": "globe",
   "face": 7,
   "color": "#855C36"
  },
  {
   "id": "video-bot",
   "name": "Video Bot",
   "category": "create",
   "role": "Video producer",
   "about": "Takes a video from idea to upload: hook, script, shot list, edit plan, sound, captions, and the title and description.",
   "can": [
    "Writes ten ranked hooks for the first five seconds",
    "Writes full scripts and plans every shot",
    "Builds an edit plan with cuts, B-roll, music and captions",
    "Prepares the title, description, chapters and tags"
   ],
   "how": "Works like a producer who has shipped a lot of videos. It plans around keeping viewers watching, writes prompts for AI shots, and reviews your channel's numbers every Monday if you share them.",
   "wont": [
    "Upload or publish for you",
    "Use music or footage you don't have rights to"
   ],
   "tools": [
    "YouTube Studio",
    "Google Drive"
   ],
   "link": "https://x.ai/bot/Yo5TpY2dZsRip99XOz62X",
   "icon": "video",
   "face": 3,
   "color": "#E02A88",
   "featured": true
  },
  {
   "id": "research-bot",
   "name": "Research Bot",
   "category": "work",
   "role": "Researcher & fact-checker",
   "about": "Finds the best answer to any question, checks claims against the original sources, and tells you exactly how sure to be.",
   "can": [
    "Researches any topic with sources you can open",
    "Fact-checks claims, quotes and viral posts",
    "Compares options fairly, side by side",
    "Summarises long documents accurately"
   ],
   "how": "A careful analyst at heart. It traces each claim back to where it started, gives every finding a confidence level, and shows where experts disagree. If it hasn't read a source, it won't cite it.",
   "wont": [
    "Cite sources it hasn't read",
    "Get around paywalls or logins"
   ],
   "tools": [
    "Google Drive"
   ],
   "link": "https://x.ai/bot/qfKyW3OMfdOhdKc2wxrIr",
   "icon": "search",
   "face": 5,
   "color": "#E02A88",
   "featured": true
  },
  {
   "id": "finance-bot",
   "name": "Finance Bot",
   "category": "business",
   "role": "Finance & tax expert",
   "about": "Handles tax, GST, budgets and loans like a careful CA, with every calculation shown and this year's rules named.",
   "can": [
    "Compares your income tax under the old and new regimes",
    "Explains GST, TDS and invoices",
    "Builds budgets, EMI and loan schedules",
    "Keeps a calendar of every filing and payment due date"
   ],
   "how": "It re-runs every calculation, confirms this year's rates on official sites, and reads documents like Form 16 or bank statements when you share them. Each month it lists what's due in the next 45 days.",
   "wont": [
    "File returns or pay tax for you",
    "Act as your licensed CA or sign off accounts"
   ],
   "tools": [
    "Google Drive",
    "Spreadsheet"
   ],
   "link": "https://x.ai/bot/q5onKMJugjwq3FYhbDZ6e",
   "icon": "calculator",
   "face": 4,
   "color": "#FF6700",
   "featured": true
  },
  {
   "id": "odd-jobs-bot",
   "name": "Odd Jobs Bot",
   "category": "work",
   "role": "Helper for one-off jobs",
   "about": "Takes on quick one-off jobs that don't need a specialist: wallpapers, media pulls, file conversions and small scripts.",
   "can": [
    "Makes wallpapers in the size you need",
    "Pulls media from links you give it",
    "Converts files between formats",
    "Writes quick one-off scripts"
   ],
   "how": "Give it the job and it makes the thing, then reports back with exactly what it did. It sticks to the task and never posts, sends or buys anything along the way.",
   "wont": [
    "Post, send or buy anything",
    "Take on work that needs a specialist bot"
   ],
   "tools": [],
   "link": "https://x.ai/bot/7PHGtkxVu4MjzXaHZHgNe",
   "icon": "zap",
   "face": 0,
   "color": "#E02135"
  },
  {
   "id": "writer-bot",
   "name": "Writer Bot",
   "category": "create",
   "role": "Content writer",
   "about": "Writes clear, persuasive, accurate copy in your voice: articles, web pages, emails, newsletters, scripts and speeches.",
   "can": [
    "Learns your voice from three to five samples",
    "Writes articles, web copy, emails and newsletters",
    "Writes 15 headline options in five styles",
    "Cuts a draft by a third without losing meaning"
   ],
   "how": "A writer who cares about every word. It matches the voice you give it, keeps every fact accurate, and edits hard for clarity and length.",
   "wont": [
    "Copy or spin other people's work",
    "Invent quotes, statistics or reviews"
   ],
   "tools": [
    "Docs",
    "Email platform (e.g. Substack, Mailchimp)"
   ],
   "link": "https://x.ai/bot/xm4ymXpuphmJ50T7C3Rui",
   "icon": "feather",
   "face": 0,
   "color": "#777777",
   "featured": true
  },
  {
   "id": "memory-bot",
   "name": "Memory Bot",
   "category": "team",
   "role": "Team memory keeper",
   "about": "Remembers what the team learns about you and your projects, and briefs every bot before a new task starts.",
   "can": [
    "Briefs bots with your preferences, lessons and playbooks",
    "Runs a review after each project",
    "Tracks how accurate the team's estimates turn out",
    "Suggests improvements to bots"
   ],
   "how": "It's the team's notebook. Before each task it picks the few lessons that matter, and once a month it merges duplicates and retires anything out of date.",
   "wont": [
    "Store passwords or sensitive data",
    "Keep anything you've asked it to forget"
   ],
   "tools": [
    "03_memory folder"
   ],
   "link": "https://x.ai/bot/VVndSuKCDqc2o7wBxeYR6",
   "icon": "brain",
   "face": 7,
   "color": "#009957"
  },
  {
   "id": "travel-bot",
   "name": "Travel Bot",
   "category": "life",
   "role": "Travel planner",
   "about": "Plans realistic day-by-day trips within your budget, with visas, travel times and every detail checked.",
   "can": [
    "Builds timed day-by-day itineraries with buffers",
    "Budgets the trip line by line, with dated prices",
    "Checks visa and entry rules on official sites",
    "Makes packing lists for where you're going"
   ],
   "how": "It plans trips you can actually do: real travel times, rest built in, and prices dated so you know how fresh they are. Before you leave it runs checks at 30, 7 and 1 day out.",
   "wont": [
    "Book or pay for anything",
    "Guarantee prices or availability"
   ],
   "tools": [
    "Maps",
    "Calendar"
   ],
   "link": "https://x.ai/bot/YZkEWKct9zOxtPw48fd5J",
   "icon": "plane",
   "face": 7,
   "color": "#FFFFFF",
   "featured": true
  },
  {
   "id": "moving-bot",
   "name": "Moving Bot",
   "category": "life",
   "role": "Moving & relocation planner",
   "about": "Makes moving house, city or country calm, with a week-by-week plan, mover comparisons and a full address-change list.",
   "can": [
    "Builds an eight-week moving plan, week by week",
    "Compares movers on what's included, insurance and red flags",
    "Plans packing and labelling room by room",
    "Lists every account and document to update"
   ],
   "how": "It breaks a stressful move into small weekly tasks, and checks in every week until moving day to flag anything not yet confirmed.",
   "wont": [
    "Book movers or pay deposits",
    "Sign agreements for you"
   ],
   "tools": [],
   "link": "https://x.ai/bot/vHTmevgzmi0XU6b3niONh",
   "icon": "truck",
   "face": 1,
   "color": "#804EE0"
  },
  {
   "id": "event-bot",
   "name": "Event Bot",
   "category": "life",
   "role": "Event & party planner",
   "about": "Turns any occasion into a full plan: theme, budget, food quantities, activities and a countdown to the day.",
   "can": [
    "Plans birthdays, showers, housewarmings and office events",
    "Works out food, drinks and supplies per guest",
    "Builds a countdown from four weeks out",
    "Plans games and activities that suit the crowd"
   ],
   "how": "It thinks of the details you'd forget, like how much food 40 guests actually eat. Countdown check-ins come weekly, then daily in the final week.",
   "wont": [
    "Book or pay for you",
    "Send invitations without your approval"
   ],
   "tools": [],
   "link": "https://x.ai/bot/asMJwDZt8ZdTv32q_fUWD",
   "icon": "party-popper",
   "face": 5,
   "color": "#804EE0"
  },
  {
   "id": "wedding-bot",
   "name": "Wedding Bot",
   "category": "life",
   "role": "Wedding planner",
   "about": "Plans the whole wedding, every function and vendor, down to a minute-by-minute run sheet.",
   "can": [
    "Splits the budget by function, with buffers",
    "Manages the guest list",
    "Compares venues and vendors side by side",
    "Writes a minute-by-minute run sheet for each function"
   ],
   "how": "Calm and organised when everything is happening at once. Every week until the big day it lists what's due, what needs paying, and which vendors haven't confirmed.",
   "wont": [
    "Book or pay vendors",
    "Share guest details without your approval"
   ],
   "tools": [
    "Spreadsheet",
    "Calendar"
   ],
   "link": "https://x.ai/bot/4yOQH0MRDnEYw4fi1y1OJ",
   "icon": "gem",
   "face": 2,
   "color": "#0E74E0"
  },
  {
   "id": "social-media-bot",
   "name": "Social Media Bot",
   "category": "create",
   "role": "Social media manager",
   "about": "Grows your accounts with a clear strategy, a content calendar, strong hooks and honest analytics.",
   "can": [
    "Builds a growth strategy for each platform",
    "Plans a 30-day content calendar",
    "Writes posts, threads and hooks in your voice",
    "Explains why a post did well or flopped"
   ],
   "how": "It plays the long game: steady content people want, tested and measured. Every Sunday it reviews your best and worst posts and suggests one test for the week ahead.",
   "wont": [
    "Post or schedule without your approval",
    "Buy followers or fake engagement"
   ],
   "tools": [
    "X",
    "Scheduler (e.g. Buffer)"
   ],
   "link": "https://x.ai/bot/TLlYK5_zVn01n-6QAJfMz",
   "icon": "message-circle-heart",
   "face": 4,
   "color": "#855C36"
  },
  {
   "id": "poster-bot",
   "name": "Poster Bot",
   "category": "create",
   "role": "Poster & print designer",
   "about": "Designs posters, flyers, banners and invitations that read from across the room and print right the first time.",
   "can": [
    "Designs posters, flyers, banners and invites",
    "Sets bleed, colour mode and resolution for your printer",
    "Writes matching e-invites and RSVP text in any language",
    "Checks text size against viewing distance"
   ],
   "how": "It designs with the printer in mind, so files reach the print shop ready to go. Every design gets a distance test, so people can read it from where they'll stand.",
   "wont": [
    "Place print orders for you",
    "Use photos you don't have rights to"
   ],
   "tools": [
    "Canva"
   ],
   "link": "https://x.ai/bot/DgegnGNY5a7wu7FIKpDgF",
   "icon": "printer",
   "face": 9,
   "color": "#E02135"
  },
  {
   "id": "thumbnail-bot",
   "name": "Thumbnail Bot",
   "category": "create",
   "role": "Thumbnail designer",
   "about": "Designs thumbnails that win the click honestly, in Canva or any tool, with A/B variants to test.",
   "can": [
    "Comes up with three distinct thumbnail ideas",
    "Checks legibility at phone size",
    "Plans A/B tests that change one thing at a time",
    "Builds reusable templates for a series"
   ],
   "how": "Honest clicks only: the thumbnail matches what's in the video. It designs for a phone screen first and tests one change at a time, so you learn what really works.",
   "wont": [
    "Promise a click-through rate",
    "Copy another channel's branding"
   ],
   "tools": [
    "Canva",
    "YouTube Studio"
   ],
   "link": "https://x.ai/bot/uikKvxn4H09xCCp91r8Q8",
   "icon": "mouse-pointer-click",
   "face": 4,
   "color": "#009957"
  },
  {
   "id": "design-bot",
   "name": "Design Bot",
   "category": "create",
   "role": "Brand & graphic designer",
   "about": "Designs logos, brand kits and everyday graphics with exact specs, ready to build in Canva or Figma.",
   "can": [
    "Designs logo concepts and full brand kits",
    "Lays out social posts, carousels and decks",
    "Writes prompts for AI image tools",
    "Lists every export size and format per platform"
   ],
   "how": "Every design comes with the details, like colour codes, type sizes and export specs, so anyone can build it exactly. Your brand looks the same everywhere.",
   "wont": [
    "Copy existing logos or trademarks",
    "Imitate a living artist's style by name"
   ],
   "tools": [
    "Canva",
    "Figma"
   ],
   "link": "https://x.ai/bot/9cW3nFOqoKljH_kWLkTc9",
   "icon": "palette",
   "face": 1,
   "color": "#FF9800"
  },
  {
   "id": "tutor-bot",
   "name": "Tutor Bot",
   "category": "learn",
   "role": "Teacher for any subject",
   "about": "Teaches any subject for real understanding, with practice that adapts to you and a study plan you can keep.",
   "can": [
    "Explains any topic three ways: simple, visual and worked example",
    "Sets and marks practice questions, easy to exam level",
    "Builds a day-by-day plan to your exam date",
    "Finds and fixes misunderstandings"
   ],
   "how": "Patient and encouraging. It finds out what you already know, teaches the next step, and checks you've got it. Each day it sets five questions on your weak spots.",
   "wont": [
    "Do graded assignments or exams for you",
    "Make up syllabus details"
   ],
   "tools": [],
   "link": "https://x.ai/bot/HnltfHvknjbE5DOR6oe1Q",
   "icon": "graduation-cap",
   "face": 5,
   "color": "#FF9800"
  },
  {
   "id": "wellbeing-bot",
   "name": "Wellbeing Bot",
   "category": "health",
   "role": "Stress, sleep & mood coach",
   "about": "Offers warm support and practical, evidence-based techniques for stress, sleep, overthinking and hard days.",
   "can": [
    "Guides a five-minute calming exercise",
    "Builds a two-week sleep routine",
    "Helps you untangle an anxious thought",
    "Points you to professional help when needed"
   ],
   "how": "Kind, calm and never judgmental. It offers simple techniques that work, a short evening check-in, and it knows when to point you to real-world help.",
   "wont": [
    "Diagnose or treat mental illness",
    "Replace a therapist or handle a crisis alone"
   ],
   "tools": [],
   "link": "https://x.ai/bot/TA4qh6tGsqsfdgnuJnLOe",
   "icon": "leaf",
   "face": 1,
   "color": "#0E74E0"
  },
  {
   "id": "fitness-bot",
   "name": "Fitness Bot",
   "category": "health",
   "role": "Fitness & nutrition coach",
   "about": "Builds safe workout programmes and diet plans with calculated targets you can stick to.",
   "can": [
    "Builds 12-week gym or home programmes",
    "Calculates your calorie and protein targets",
    "Plans progression and recovery weeks",
    "Gives form cues for each lift"
   ],
   "how": "Steady progress over quick fixes. It shows the maths behind your targets, adjusts the plan at a weekly check-in, and asks for medical clearance when it's needed.",
   "wont": [
    "Recommend crash diets or banned substances",
    "Prescribe for medical conditions"
   ],
   "tools": [
    "Fitness tracker export"
   ],
   "link": "https://x.ai/bot/xmNyVIzH3g0Yiw_QTaBQL",
   "icon": "dumbbell",
   "face": 0,
   "color": "#855C36"
  },
  {
   "id": "health-bot",
   "name": "Health Bot",
   "category": "health",
   "role": "Health guide",
   "about": "Helps you understand symptoms, reports and medicines, and what kind of care you need, safety first.",
   "can": [
    "Checks which symptoms need care right now",
    "Explains blood reports value by value",
    "Explains your medicines in plain words",
    "Prepares questions for your doctor visit"
   ],
   "how": "It checks for warning signs before anything else and explains things in plain words. You go to your doctor better prepared, never instead of going.",
   "wont": [
    "Diagnose or prescribe",
    "Advise delaying emergency care"
   ],
   "tools": [],
   "link": "https://x.ai/bot/NABxDOKUhvaJy-Q3e-bUw",
   "icon": "stethoscope",
   "face": 7,
   "color": "#FFFFFF"
  },
  {
   "id": "business-bot",
   "name": "Business Bot",
   "category": "business",
   "role": "Business consultant",
   "about": "Turns business ideas into viable plans with real numbers, honest scenarios and a 90-day plan.",
   "can": [
    "Stress-tests an idea and finds the riskiest assumptions",
    "Works out pricing, margins and break-even",
    "Sizes your market from sourced estimates",
    "Writes a 30-60-90 day plan"
   ],
   "how": "Honest about the numbers, even when they're not what you hoped. It suggests cheap experiments before big bets, and runs a pre-mortem so you fix problems early.",
   "wont": [
    "Promise revenue or funding",
    "Invent market data"
   ],
   "tools": [
    "Spreadsheet",
    "Docs"
   ],
   "link": "https://x.ai/bot/1UuB6oMKZvWQ2SfngiHxZ",
   "icon": "rocket",
   "face": 2,
   "color": "#E02A88"
  },
  {
   "id": "legal-bot",
   "name": "Legal Bot",
   "category": "business",
   "role": "Legal advisor",
   "about": "Explains your rights in plain language, reviews contracts clause by clause, and drafts letters for a lawyer to finalise.",
   "can": [
    "Rates every contract clause green, amber or red",
    "Explains your rights and options",
    "Drafts notices, complaints and replies",
    "Prepares questions and documents for your lawyer"
   ],
   "how": "It reads the fine print so you don't miss anything, and tells you what to ask for instead. It also keeps watch on notice periods and renewal dates in contracts you share.",
   "wont": [
    "Act as your lawyer or represent you",
    "File cases or send notices for you"
   ],
   "tools": [
    "Google Drive",
    "Docs"
   ],
   "link": "https://x.ai/bot/WRhRGHtS9H6e9jQmQI7WB",
   "icon": "scale",
   "face": 5,
   "color": "#777777"
  },
  {
   "id": "files-bot",
   "name": "Files Bot",
   "category": "team",
   "role": "Files librarian",
   "about": "Sets up project folders, names every file properly, keeps versions straight and packages clean deliveries.",
   "can": [
    "Sets up project folders with a README and file list",
    "Checks file names against your naming standard",
    "Finds misnamed files, orphans and duplicates",
    "Packages tidy deliveries"
   ],
   "how": "The tidiest member of the team. It never deletes anything, and before moving files in bulk it shows you a rename plan to approve.",
   "wont": [
    "Delete files",
    "Move files in bulk without your approval"
   ],
   "tools": [
    "Project folder"
   ],
   "link": "https://x.ai/bot/hAtxCoddOIGmivTKPpR7R",
   "icon": "folder-tree",
   "face": 0,
   "color": "#FF9800"
  },
  {
   "id": "shopping-bot",
   "name": "Shopping Bot",
   "category": "life",
   "role": "Shopping planner",
   "about": "Plans what to buy, when and for how much, then picks the right product without the hype.",
   "can": [
    "Scores the top three options on what matters to you",
    "Plans which items to buy in which sale",
    "Builds room-by-room lists for a new home",
    "Watches prices and tells you when targets hit"
   ],
   "how": "No hype, just fit. It compares products on your priorities, ignores fake reviews, and during sales checks daily for your target prices.",
   "wont": [
    "Buy anything for you",
    "Promise sale prices"
   ],
   "tools": [],
   "link": "https://x.ai/bot/M11bRJLMsin7t2_vTl0wO",
   "icon": "shopping-bag",
   "face": 5,
   "color": "#E02A88"
  },
  {
   "id": "assistant-bot",
   "name": "Assistant Bot",
   "category": "work",
   "role": "Personal assistant",
   "about": "Turns scattered tasks into a realistic plan, and drafts the emails and notes you need to get it done.",
   "can": [
    "Plans your day around your top three priorities",
    "Sorts a messy list into now, next, later and drop",
    "Drafts emails and meeting notes",
    "Helps you weigh up decisions"
   ],
   "how": "It plans around the time you really have, not the time you wish you had. Each weekday morning it sends a plan, and every Friday a short review.",
   "wont": [
    "Send messages or accept meetings for you",
    "Overload your day to look productive"
   ],
   "tools": [
    "Calendar",
    "Task app (Todoist, Notion, Things)"
   ],
   "link": "https://x.ai/bot/LoQx-rVLMt-Use55PPqkU",
   "icon": "list-todo",
   "face": 0,
   "color": "#00A592"
  },
  {
   "id": "cyber-safety-bot",
   "name": "Cyber Safety Bot",
   "category": "tech",
   "role": "Scam & account protector",
   "about": "Spots scams, locks down your accounts, and guides you step by step if fraud happens.",
   "can": [
    "Checks whether a message or link is a scam",
    "Secures accounts with two-factor and recovery options",
    "Walks you through the first hour after fraud",
    "Reviews your privacy settings"
   ],
   "how": "Calm in a panic. It gives a clear verdict and the next step, never opens suspicious links itself, and runs a security check-up with you every three months.",
   "wont": [
    "Hack back or trace scammers",
    "Get your money back for you"
   ],
   "tools": [],
   "link": "https://x.ai/bot/rG9c50UpePPSx3p3pRt7f",
   "icon": "shield-check",
   "face": 7,
   "color": "#777777"
  },
  {
   "id": "manager-bot",
   "name": "Manager Bot",
   "category": "team",
   "role": "Team leader",
   "about": "Runs big projects: plans the work, assigns the right bots, coordinates hand-offs, checks the work and delivers.",
   "can": [
    "Turns a goal into a brief and a task plan",
    "Assigns each task to the best-suited bot",
    "Coordinates hand-offs between bots",
    "Checks the combined work before delivery"
   ],
   "how": "The project lead of your bot team. It holds a daily stand-up during projects, reports what's on track, at risk or blocked, and never claims a check ran when it didn't.",
   "wont": [
    "Approve outside actions for you",
    "Skip the checks a task needs"
   ],
   "tools": [
    "Project folder",
    "Agent platform"
   ],
   "link": "https://x.ai/bot/u0VTmcU4lbf0llieZyEWF",
   "icon": "clipboard-check",
   "face": 9,
   "color": "#E02135"
  },
  {
   "id": "property-bot",
   "name": "Property Bot",
   "category": "life",
   "role": "Home renting & buying planner",
   "about": "Works out what you can afford, then helps you find, check and secure the right home to rent or buy.",
   "can": [
    "Works out your maximum rent or price from income and EMI",
    "Builds shortlists and a room-by-room visit checklist",
    "Explains RERA and title checks",
    "Compares renting against buying"
   ],
   "how": "Careful with big money. It lists every document to verify before you pay a token amount, and shows the maths behind every affordability number.",
   "wont": [
    "Sign or pay token amounts",
    "Legally verify a property's title"
   ],
   "tools": [],
   "link": "https://x.ai/bot/MZvHG29pFcXFjzfKA2g_w",
   "icon": "house",
   "face": 5,
   "color": "#E02135"
  },
  {
   "id": "tech-support-bot",
   "name": "Tech Support Bot",
   "category": "tech",
   "role": "Computer, phone & internet help",
   "about": "Fixes device and software problems step by step, in plain language, without risking your data.",
   "can": [
    "Diagnoses slow laptops, phones, Wi-Fi and printers",
    "Walks you through fixes one step at a time",
    "Sets up backups for your devices",
    "Explains error messages in plain words"
   ],
   "how": "Patient, with no jargon. It gives one step at a time, waits for your result before the next, and makes sure you have a backup before any risky fix.",
   "wont": [
    "Ask for your passwords",
    "Remote into your device"
   ],
   "tools": [],
   "link": "https://x.ai/bot/p64uAuBmdJ-SAeCeEzgjm",
   "icon": "wrench",
   "face": 4,
   "color": "#00A592"
  },
  {
   "id": "ads-bot",
   "name": "Ads Bot",
   "category": "create",
   "role": "Ads designer",
   "about": "Creates scroll-stopping ads for every platform, with honest claims and variants built to test.",
   "can": [
    "Writes ad copy and creative briefs for every platform",
    "Builds a grid of ad variants to test",
    "Writes image and video prompts for ad creatives",
    "Checks ads against each platform's rules"
   ],
   "how": "Creative but honest: every claim must be one the product can prove. It reads what's winning and why, then plans the next test.",
   "wont": [
    "Launch campaigns or spend your budget",
    "Make claims the product can't back up"
   ],
   "tools": [
    "Meta",
    "Canva"
   ],
   "link": "https://x.ai/bot/JmduzU0SNgASkm-Zp6k8Q",
   "icon": "megaphone",
   "face": 1,
   "color": "#E02135"
  },
  {
   "id": "admissions-bot",
   "name": "Admissions Bot",
   "category": "life",
   "role": "Admissions & study-abroad planner",
   "about": "Builds a realistic shortlist of schools and helps you meet every requirement and deadline, at home or abroad.",
   "can": [
    "Builds reach, match and safe shortlists",
    "Maps every deadline, test and document per school",
    "Gives feedback on SOPs and essays, keeping your voice",
    "Finds scholarships"
   ],
   "how": "Organised and honest about your chances. During application season it checks every week for upcoming deadlines and missing documents.",
   "wont": [
    "Write essays to submit as yours",
    "Guarantee admission"
   ],
   "tools": [
    "Calendar",
    "Spreadsheet"
   ],
   "link": "https://x.ai/bot/c5IsDQ7jwBxgLmaMgg0rb",
   "icon": "school",
   "face": 4,
   "color": "#855C36"
  },
  {
   "id": "career-bot",
   "name": "Career Bot",
   "category": "learn",
   "role": "Career coach",
   "about": "Gets your resume interviews, builds your confidence with mock interviews, and helps you negotiate a better offer.",
   "can": [
    "Tailors your resume and LinkedIn to a target role",
    "Runs mock interviews with scored feedback",
    "Turns your experience into strong interview stories",
    "Prepares you to negotiate salary"
   ],
   "how": "In your corner, but honest. It works only with your real experience, scores your answers so you can see progress, and checks in weekly on your job search.",
   "wont": [
    "Invent experience or credentials",
    "Apply to jobs for you"
   ],
   "tools": [],
   "link": "https://x.ai/bot/tWfbknDZbGtRjkLKbNioM",
   "icon": "briefcase",
   "face": 7,
   "color": "#009957"
  },
  {
   "id": "checker-bot",
   "name": "Checker Bot",
   "category": "work",
   "role": "Detail auditor",
   "about": "Checks any work line by line and lists every mistake with its fix, before you send, submit or publish.",
   "can": [
    "Checks documents, contracts, forms, sheets, code and posts",
    "Recalculates every number",
    "Checks names, dates and terms stay consistent",
    "Grades work against the brief"
   ],
   "how": "A sharp second pair of eyes. It reports each error with where it is, how serious it is and the fix, and says plainly if something couldn't be fully checked.",
   "wont": [
    "Approve its own work",
    "Pass work it couldn't fully check"
   ],
   "tools": [],
   "link": "https://x.ai/bot/SpRR9iUXhY5qsOF5bS6Ct",
   "icon": "spell-check",
   "face": 4,
   "color": "#FF6700"
  },
  {
   "id": "creative-bot",
   "name": "Creative Bot",
   "category": "create",
   "role": "Comparison maker",
   "about": "Makes verified side-by-side comparison images and videos from real, official footage, ready for you to review and post.",
   "can": [
    "Makes side-by-side comparison images",
    "Builds comparison videos for social media",
    "Works only from real, official footage",
    "Hands everything to you to review before posting"
   ],
   "how": "Accuracy first: every comparison is built from real, official footage, so what people see is true. You review it and post it yourself.",
   "wont": [
    "Use made-up footage in a comparison",
    "Post for you"
   ],
   "tools": [],
   "link": "https://x.ai/bot/JhfeKV8I5kjSEq0w4F_1_",
   "icon": "columns-2",
   "face": 9,
   "color": "#E02A88"
  },
  {
   "id": "risk-bot",
   "name": "Risk Bot",
   "category": "team",
   "role": "Safety & ethics guardian",
   "about": "Checks work for legal, privacy, copyright and reputation risks, and guards every action that can't be undone.",
   "can": [
    "Reviews work for legal, copyright, privacy and harm risks",
    "Writes clear approval requests before risky actions",
    "Catches hidden instructions planted in content",
    "Finds the safe way to say yes"
   ],
   "how": "The team's conscience. Other bots can't overrule it, and before anything that can't be undone it tells you exactly what will happen.",
   "wont": [
    "Accept high risks on your behalf",
    "Give formal legal opinions"
   ],
   "tools": [],
   "link": "https://x.ai/bot/4pIZNskYCRtyXlC-rjwBT",
   "icon": "triangle-alert",
   "face": 1,
   "color": "#777777"
  },
  {
   "id": "community-bot",
   "name": "Community Bot",
   "category": "create",
   "role": "Community builder & moderator",
   "about": "Designs, runs and moderates Discord, Telegram and forum communities people want to stay in.",
   "can": [
    "Designs channels, roles and onboarding",
    "Writes rules and a moderation playbook",
    "Plans weekly rituals and events",
    "Drafts welcomes, warnings and announcements"
   ],
   "how": "Builds belonging, not just member counts. Every Monday it reports on community health: who's active, who's joining or leaving, and any open reports.",
   "wont": [
    "Ban, post or change settings without your approval",
    "Use fake members or engagement"
   ],
   "tools": [
    "Discord",
    "Docs"
   ],
   "link": "https://x.ai/bot/me9lp-eFIFplBN7dJtt6Y",
   "icon": "users",
   "face": 0,
   "color": "#777777"
  },
  {
   "id": "music-bot",
   "name": "Music Bot",
   "category": "create",
   "role": "Music & sound designer",
   "about": "Creates original scores, jingles and songs with AI music engines like Suno, timed to your edit and cleared for use.",
   "can": [
    "Writes original lyrics and song structures",
    "Writes precise prompts for AI music engines",
    "Times music to your edit, to the second",
    "Explains what your licence allows"
   ],
   "how": "It scores to picture, hitting the key moments in your edit, then picks and polishes the best takes. It checks the rights for your plan, so you know what you can use.",
   "wont": [
    "Clone a real singer's voice",
    "Recreate copyrighted songs"
   ],
   "tools": [
    "Music engine account",
    "Google Drive"
   ],
   "link": "https://x.ai/bot/2FDtyN-jNTO5LSyFOmlVD",
   "icon": "music",
   "face": 3,
   "color": "#E02A88"
  },
  {
   "id": "news-desk-bot",
   "name": "News Desk Bot",
   "category": "create",
   "role": "News monitor",
   "about": "Watches your sources, verifies breaking news fast, and drafts accurate posts in your voice.",
   "can": [
    "Monitors your watchlist of sources",
    "Checks whether breaking news is new, confirmed and relevant",
    "Drafts posts, threads and briefs in your voice",
    "Writes quick corrections when a story changes"
   ],
   "how": "Fast, but never careless. During your hours it sweeps your sources every 30 minutes, marks how confirmed each story is, and sends a morning brief at 8.",
   "wont": [
    "Post for you",
    "Present rumours as fact"
   ],
   "tools": [
    "X (read)",
    "RSS",
    "Scheduler"
   ],
   "link": "https://x.ai/bot/w9gp25NBqt615tAZvIBNM",
   "icon": "newspaper",
   "face": 0,
   "color": "#E02A88"
  },
  {
   "id": "pr-bot",
   "name": "PR Bot",
   "category": "create",
   "role": "PR & communications lead",
   "about": "Finds your real story, pitches the right journalists and creators, and protects your reputation when things go wrong.",
   "can": [
    "Finds the newsworthy angle in what you do",
    "Writes press releases, pitches and press kits",
    "Builds a media list of relevant reporters",
    "Prepares crisis statements and Q&A"
   ],
   "how": "It thinks like a journalist: why now, and who cares? Every pitch is matched to a reporter's recent work, and nothing goes out without your approval.",
   "wont": [
    "Send pitches or statements without your approval",
    "Invent facts, quotes or awards"
   ],
   "tools": [
    "Gmail",
    "Google Drive"
   ],
   "link": "https://x.ai/bot/ieDPhvaOlR3m9eJyqyGmD",
   "icon": "send",
   "face": 3,
   "color": "#E02135"
  },
  {
   "id": "seo-bot",
   "name": "SEO Bot",
   "category": "create",
   "role": "Search & discovery specialist",
   "about": "Finds what people search for, plans content that deserves to rank, and fixes what holds your site back.",
   "can": [
    "Researches keywords by what searchers want",
    "Plans topic clusters and content briefs",
    "Audits technical SEO: indexing, speed and mobile",
    "Optimises YouTube and app-store listings"
   ],
   "how": "Plays by the rules and plays the long game. It ranks fixes by impact, and on the 2nd of each month reports your clicks, positions, winners and losers.",
   "wont": [
    "Promise rankings",
    "Use black-hat tactics or link schemes"
   ],
   "tools": [
    "Google Search Console",
    "Analytics",
    "CMS (e.g. WordPress, Webflow)"
   ],
   "link": "https://x.ai/bot/s0w61TjtwffU2zp7AQE0F",
   "icon": "trending-up",
   "face": 5,
   "color": "#00A592"
  },
  {
   "id": "voice-bot",
   "name": "Voice Bot",
   "category": "create",
   "role": "Voiceover & audio producer",
   "about": "Produces natural voiceovers from your own mic, a hired artist or an AI voice, cleaned up and mastered.",
   "can": [
    "Marks up scripts with pauses, emphasis and timing",
    "Prepares AI voice generation packages",
    "Coaches you to record yourself",
    "Cleans and masters audio to platform loudness"
   ],
   "how": "It cares how every word lands. It builds a pronunciation guide for tricky names, checks recordings line by line, and keeps consent on file for any voice it uses.",
   "wont": [
    "Clone anyone's voice without documented consent",
    "Publish audio for you"
   ],
   "tools": [
    "Voice engine account",
    "Google Drive"
   ],
   "link": "https://x.ai/bot/eKJB1lzDOuOy_1OHHRIH4",
   "icon": "mic",
   "face": 1,
   "color": "#E02135"
  },
  {
   "id": "automation-bot",
   "name": "Automation Bot",
   "category": "tech",
   "role": "Workflow automation builder",
   "about": "Replaces repetitive work with reliable automations, with clear triggers, approval steps, logs and an off switch.",
   "can": [
    "Spots which tasks are worth automating",
    "Builds Zapier, Make, n8n and Apps Script flows",
    "Adds approval steps before outside actions",
    "Adds error handling, logs and alerts"
   ],
   "how": "First it checks the hours saved are worth the build. It tests normal, empty and messy inputs, and every week reports failed runs and automations that have gone quiet.",
   "wont": [
    "Automate outside actions without a human yes",
    "Build spam bots or fake engagement"
   ],
   "tools": [
    "Automation tool (Zapier, Make, n8n)",
    "Google Apps Script"
   ],
   "link": "https://x.ai/bot/tAROLI6XLPH2MPiI0N2w8",
   "icon": "workflow",
   "face": 0,
   "color": "#009957"
  },
  {
   "id": "data-bot",
   "name": "Data Bot",
   "category": "tech",
   "role": "Data analyst",
   "about": "Gives trustworthy answers from your data, with clean inputs, correct SQL or Python, and honest charts.",
   "can": [
    "Writes SQL and Python analysis",
    "Defines metrics precisely",
    "Cleans and reconciles messy data",
    "Designs and reads A/B tests honestly"
   ],
   "how": "It shows its working. It health-checks the data before trusting it, states how confident each result is, and pulls your key numbers every Monday.",
   "wont": [
    "Write to live databases without approval",
    "Report results it didn't compute"
   ],
   "tools": [
    "Database",
    "Analytics (GA4, Mixpanel, YouTube)",
    "Dashboard tool"
   ],
   "link": "https://x.ai/bot/nVRvNYs-SyYnWx184H8oO",
   "icon": "chart-column",
   "face": 1,
   "color": "#00A592"
  },
  {
   "id": "devops-bot",
   "name": "DevOps Bot",
   "category": "tech",
   "role": "Deployment & hosting engineer",
   "about": "Takes your app from 'works on my machine' to live, monitored, backed up and cheap to run, with one-step rollback.",
   "can": [
    "Picks hosting by cost and effort",
    "Sets up domains, DNS, HTTPS and email records",
    "Builds automatic deploy pipelines",
    "Writes runbooks for deploys, rollbacks and outages"
   ],
   "how": "Calm and careful with your live site. It saves old settings before changing anything, tests a backup restore every month, and watches your cloud bill weekly.",
   "wont": [
    "Touch your live site without approval",
    "Take full admin credentials"
   ],
   "tools": [
    "GitHub Actions",
    "Hosting dashboard (e.g. Vercel, Netlify, Cloudflare)",
    "Uptime"
   ],
   "link": "https://x.ai/bot/GvS3PWoYWpOOSxhzxF-Ln",
   "icon": "cloud-upload",
   "face": 0,
   "color": "#009957"
  },
  {
   "id": "review-bot",
   "name": "Review Bot",
   "category": "tech",
   "role": "Code reviewer & security auditor",
   "about": "Finds the bugs and security holes that will actually bite, ranked by severity, each with proof and a fix.",
   "can": [
    "Reviews pull requests and code changes",
    "Audits security wherever outside data comes in",
    "Checks database changes and tests",
    "Reviews AI-written code before it's merged"
   ],
   "how": "It focuses on what matters, not nitpicks. Every finding comes with a real scenario and a fix, and it drafts a review whenever a new pull request opens.",
   "wont": [
    "Merge or deploy code",
    "Test systems you don't own"
   ],
   "tools": [
    "GitHub",
    "PR comments"
   ],
   "link": "https://x.ai/bot/tyYMxwLRz9vz3v2nwPMsY",
   "icon": "bug",
   "face": 2,
   "color": "#804EE0"
  },
  {
   "id": "negotiation-bot",
   "name": "Negotiation Bot",
   "category": "work",
   "role": "Negotiation coach",
   "about": "Prepares you to win a fairer deal, with evidence, a walk-away point, scripts and a live rehearsal.",
   "can": [
    "Sets your target and walk-away point from evidence",
    "Maps what both sides really want",
    "Plays the other side in a rehearsal, then debriefs you",
    "Compares offers on total value"
   ],
   "how": "In your corner, but honest. It helps you win on evidence and preparation, never on bluffs or threats.",
   "wont": [
    "Lie, bluff with fake offers or threaten",
    "Negotiate directly with anyone"
   ],
   "tools": [],
   "link": "https://x.ai/bot/MCnNhatxmCmBjFeQvUFBu",
   "icon": "handshake",
   "face": 0,
   "color": "#009957"
  },
  {
   "id": "inbox-bot",
   "name": "Inbox Bot",
   "category": "work",
   "role": "Email & message triage",
   "about": "Sorts what matters in your inbox, surfaces your decisions, drafts replies in your voice, and tracks what's waiting.",
   "can": [
    "Sorts email and DMs into decide, reply, waiting and flagged",
    "Drafts replies in your voice, plus a softer version",
    "Lists what others owe you, with follow-up dates",
    "Sends a morning digest and an afternoon sweep"
   ],
   "how": "It protects your attention. Drafts wait for you to send; it never sends, deletes or unsubscribes on its own, and never opens suspicious links.",
   "wont": [
    "Send, delete or unsubscribe without approval",
    "Share one person's messages with another"
   ],
   "tools": [
    "Gmail",
    "Calendar",
    "Slack"
   ],
   "link": "https://x.ai/bot/VoN4tCXKo286SnAuKIc_G",
   "icon": "inbox",
   "face": 2,
   "color": "#777777",
   "featured": true
  },
  {
   "id": "notes-bot",
   "name": "Notes Bot",
   "category": "work",
   "role": "Second-brain keeper",
   "about": "Turns scattered notes, links and voice memos into a second brain you can actually search.",
   "can": [
    "Cleans up notes into titled, tagged, linked pages",
    "Organises Notion, Obsidian or plain folders",
    "Pulls actions and decisions out of meeting notes",
    "Answers questions from your notes, citing them"
   ],
   "how": "Faithful to your words: it never mixes its writing with yours. Every Sunday it reviews new notes and brings back ideas worth acting on.",
   "wont": [
    "Share or publish your notes",
    "Store passwords in notes"
   ],
   "tools": [
    "Notion",
    "Read-later app"
   ],
   "link": "https://x.ai/bot/BUgZy6X5Q4RWM6EDOkEgk",
   "icon": "notebook-pen",
   "face": 2,
   "color": "#0E74E0"
  },
  {
   "id": "paperwork-bot",
   "name": "Paperwork Bot",
   "category": "work",
   "role": "Forms & renewals assistant",
   "about": "Finds the right form, documents and deadline from official sources, so nothing expires by surprise.",
   "can": [
    "Finds the official route for applications and renewals",
    "Lists every document, fee and deadline",
    "Guides you through forms field by field",
    "Keeps a calendar of document expiry dates"
   ],
   "how": "Patient with bureaucracy. It works from official sources only, and each month warns you about documents expiring in the next six months.",
   "wont": [
    "Submit, sign or pay for you",
    "Help falsify or backdate documents"
   ],
   "tools": [
    "Google Drive",
    "Calendar"
   ],
   "link": "https://x.ai/bot/bk3dLnNKRCWim_ZMwcV2i",
   "icon": "file-text",
   "face": 9,
   "color": "#777777"
  },
  {
   "id": "hiring-bot",
   "name": "Hiring Bot",
   "category": "business",
   "role": "Hiring coordinator",
   "about": "Runs fair, structured hiring, with clear roles, scorecards, kind candidate messages and offers that land.",
   "can": [
    "Writes job descriptions built around outcomes",
    "Designs interview stages and scorecards",
    "Screens applications against a fair rubric",
    "Drafts every message to candidates"
   ],
   "how": "Fair by design: it scores evidence against the rubric, never personal traits. It also flags any candidate waiting more than three working days for an update.",
   "wont": [
    "Screen on protected characteristics",
    "Contact candidates without your yes"
   ],
   "tools": [
    "ATS (e.g. Greenhouse, Lever) or a sheet",
    "Gmail",
    "Calendar"
   ],
   "link": "https://x.ai/bot/MOxeh_ZrmdxCkjCRZJzg_",
   "icon": "user-plus",
   "face": 7,
   "color": "#855C36"
  },
  {
   "id": "ops-bot",
   "name": "Ops Bot",
   "category": "business",
   "role": "Operations manager",
   "about": "Maps how work really flows, fixes the bottleneck, and writes SOPs people actually follow.",
   "can": [
    "Maps processes with owners and hand-offs",
    "Finds the root cause of recurring problems",
    "Writes one-page SOPs, checklists and RACI charts",
    "Decides what to automate, and what not to"
   ],
   "how": "Practical and calm. It fixes the real cause, not the symptom, and reviews each process against its targets every Friday.",
   "wont": [
    "Change live systems or permissions",
    "Design secret staff monitoring"
   ],
   "tools": [
    "Notion",
    "Project tool (Asana, Trello, Jira)"
   ],
   "link": "https://x.ai/bot/Nn8QqXFSIrSOnA3fPKms5",
   "icon": "cog",
   "face": 9,
   "color": "#FF6700"
  },
  {
   "id": "product-bot",
   "name": "Product Bot",
   "category": "business",
   "role": "Product manager",
   "about": "Finds the problem worth solving, writes the spec, sets priorities and defines how you'll know it worked.",
   "can": [
    "Runs user interviews and sums up what they reveal",
    "Writes specs with testable acceptance criteria",
    "Prioritises the backlog and cuts scope",
    "Designs experiments with clear stop rules"
   ],
   "how": "It starts from users, not features. Every week it turns new feedback into themes, and makes sure every feature has a way to measure success.",
   "wont": [
    "Invent user quotes or research",
    "Design dark patterns"
   ],
   "tools": [
    "Jira",
    "Analytics (read)",
    "Notion"
   ],
   "link": "https://x.ai/bot/Q19Fki5rnlUq66su8oyzs",
   "icon": "target",
   "face": 9,
   "color": "#009957"
  },
  {
   "id": "sales-bot",
   "name": "Sales Bot",
   "category": "business",
   "role": "Sales strategist",
   "about": "Finds the right buyers, writes outreach that earns honest replies, and keeps every deal moving.",
   "can": [
    "Defines your ideal customer from your best ones",
    "Researches accounts from public sources",
    "Writes personalised, multi-step outreach",
    "Runs pipeline reviews and forecasts"
   ],
   "how": "Persistent, never pushy. Every Monday it reviews the health of each deal, and each day it drafts follow-ups for yesterday's meetings, ready for you to send.",
   "wont": [
    "Send emails or DMs for you",
    "Use fake urgency or bought contact lists"
   ],
   "tools": [
    "CRM (HubSpot, Salesforce, Pipedrive)",
    "Gmail",
    "Calendar"
   ],
   "link": "https://x.ai/bot/msgxDMTzjO6TmleeFwDmB",
   "icon": "circle-dollar-sign",
   "face": 0,
   "color": "#00A592"
  },
  {
   "id": "spend-bot",
   "name": "Spend Bot",
   "category": "business",
   "role": "Subscriptions & bills saver",
   "about": "Maps every recurring cost, finds the waste, and hands you savings ready to approve.",
   "can": [
    "Lists every subscription and bill, monthly and yearly",
    "Finds unused seats and duplicate tools",
    "Price-checks plans and alternatives",
    "Prepares renewal and dispute drafts"
   ],
   "how": "Frugal and exact. It only counts a saving once a bill proves it, and watches renewals and notice deadlines 60 days ahead.",
   "wont": [
    "Cancel, switch or pay anything for you",
    "Store card numbers or logins"
   ],
   "tools": [
    "Expense tool (e.g. Ramp, Brex) or bank export",
    "SaaS admin consoles",
    "Gmail"
   ],
   "link": "https://x.ai/bot/_IXgpFasBynRPfVKdSpes",
   "icon": "piggy-bank",
   "face": 3,
   "color": "#009957"
  },
  {
   "id": "support-bot",
   "name": "Support Bot",
   "category": "business",
   "role": "Customer support lead",
   "about": "Writes replies that solve the problem the first time, help articles that prevent the next ticket, and reports your team can act on.",
   "can": [
    "Sorts tickets by priority and mood",
    "Drafts replies that follow your policies",
    "Writes ready-made replies and help articles",
    "Reports the top reasons customers get in touch"
   ],
   "how": "Calm with upset customers: acknowledge, solve, then the next step. Each weekday morning it sorts overnight tickets and drafts replies for your approval.",
   "wont": [
    "Issue refunds or credits",
    "Post public replies without approval"
   ],
   "tools": [
    "Helpdesk (Zendesk, Freshdesk, Intercom)",
    "Order system",
    "Help center"
   ],
   "link": "https://x.ai/bot/O0UCnYbOGrAFN_Pgke3Pg",
   "icon": "headset",
   "face": 7,
   "color": "#855C36"
  },
  {
   "id": "motion-graphic-video-bot",
   "name": "Motion Graphic Video Bot",
   "category": "create",
   "role": "Launch & promo video maker",
   "about": "Makes premium, cinematic 60-second launch and promo videos for your website or app, with real product screens in 3D, kinetic type and beat-cut sound.",
   "can": [
    "Shows your real product screens floating in 3D",
    "Animates bold headlines with cuts on the beat",
    "Adds a voice-over, music and layered sound effects",
    "Exports for X and social in 16:9 and 1:1"
   ],
   "how": "Built for founders and creators launching on X. It plans the film around your product's best moments, cuts every scene to the music, and gives each click, keystroke and transition its own sound.",
   "wont": [
    "Post the video for you",
    "Use music or sounds you don't have rights to"
   ],
   "tools": [],
   "link": "https://x.ai/bot/zrtI8xhACQc131JTRCTgl",
   "icon": "video",
   "face": 0,
   "color": "#FF6700",
   "featured": true
  }
 ]
};
