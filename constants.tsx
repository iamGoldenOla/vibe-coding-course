
import { ModuleId, ModuleData, Tool, PromptTemplate, GlossaryItem, CaseStudy } from './types';

export const PROMPT_LIBRARY: PromptTemplate[] = [
  {
    title: 'The UI Skeleton',
    category: 'Design',
    scenario: 'Starting a new frontend project',
    template: 'Build a modern, minimalist [APP_TYPE] dashboard using Tailwind CSS. Use a [COLOR_PALETTE] color scheme. Focus on high whitespace and accessible typography.'
  },
  {
    title: 'Logical Bridge',
    category: 'Logic',
    scenario: 'Connecting frontend to a database',
    template: 'Create a TypeScript function to fetch all [TABLE_NAME] from Supabase. Handle loading states and provide a descriptive error if the connection fails.'
  },
  {
    title: 'The Bug Hunter',
    category: 'Debugging',
    scenario: 'Fixing a cryptic error',
    template: 'I am getting a "[ERROR_NAME]" error in my [FILE_NAME]. Here is the code context. Explain why this is happening and provide the corrected version.'
  }
];

export const GLOSSARY: GlossaryItem[] = [
  { term: 'Context Window', definition: 'The amount of information an AI can "remember" or consider at one time during a conversation.' },
  { term: 'Token', definition: 'The basic unit of text that an AI processes (roughly 4 characters).' },
  { term: 'Inference', definition: 'The process of the AI generating a response based on your prompt.' },
  { term: 'Hallucination', definition: 'When an AI confidently provides incorrect or non-existent information.' },
  { term: 'Agentic Workflow', definition: 'Software that can use tools (like a browser or terminal) to accomplish multi-step goals on its own.' }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: 'FitVibe Tracker',
    description: 'A full-stack fitness app built in 4 hours.',
    vibe: 'Modern, energizing, data-heavy but clean.',
    outcome: '1,200 active users in the first week, zero manual code written for the UI.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'AutoLegal AI',
    description: 'Document automation for small law firms.',
    vibe: 'Professional, trustworthy, high-contrast.',
    outcome: 'Reduced document processing time by 80% using Make.com integrations.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600'
  }
];

export const TOOLKIT: Tool[] = [
  { name: 'Cursor', category: 'IDEs', description: 'AI-first code editor that understands your entire codebase.' },
  { name: 'Windsurf', category: 'IDEs', description: 'Agentic IDE designed for flow and deep AI collaboration.' },
  { name: 'v0.dev', category: 'Frontend', description: 'Vercel\'s UI component generator for rapid interface development.' },
  { name: 'Lovable', category: 'Frontend', description: 'GPT-engineer specialized in full-stack web applications.' },
  { name: 'Supabase', category: 'Backend', description: 'Open-source Firebase alternative for databases, auth, and edge functions.' },
  { name: 'Make.com', category: 'Automation', description: 'Visual automation platform for complex workflows.' },
  { name: 'Bolt.new', category: 'Frontend', description: 'Prompt-to-app generator by StackBlitz.' },
  { name: 'Replit Agent', category: 'Backend', description: 'AI agent that builds and deploys your backend services.' }
];

export const MODULES: ModuleData[] = [
  {
    id: ModuleId.Intro,
    title: 'Introduction: The Era of Intent',
    description: 'The gatekeepers of code are gone. Master the mindset shift from a bricklayer (syntax-obsessed) to an architect (intent-obsessed).',
    lessons: [
      {
        title: 'Manifesting Intent',
        conceptTitle: 'Architecture vs. Bricklaying',
        conceptAnalogy: 'Vibe Coding is being the architect: you define the rooms, the mood, and the flow, while a robotic construction crew (AI) handles the precision work.',
        conceptDescription: 'Vibe Coding isn\'t "no-code"—it\'s "high-level-code". You are the conductor of an orchestra. You don\'t need to play the violin, you need to know how the violin should sound in the symphony. Your intent (the "What") is the primary driver; the syntax (the "How") is delegated.',
        instructions: [
          '➡ Stop thinking about loops and variables; start thinking about systems and experiences.',
          '➡ Practice "High-Level Specification": Describe a feature as if you were explaining it to a very smart, tireless intern.',
          '➡ Define the boundaries: What data comes in? What value goes out?'
        ],
        visualGuideDescription: 'Action: Sketch a 3-tier pyramid. At the base is "Syntax" (The bricks), in the middle is "Logic" (The frame), and at the peak is "Intent" (The blueprint). In Vibe Coding, you sit at the peak and command the layers below.'
      },
      {
        title: 'The Feedback Loop',
        conceptTitle: 'The Echo Chamber',
        conceptAnalogy: 'Talking to an AI is like throwing a ball against a wall. The way it bounces back tells you if the wall is straight or slanted.',
        conceptDescription: 'Software creation is now iterative conversation. You prompt, the AI builds, you review, and you refine. This loop is where the "Vibe" is polished until it matches your vision perfectly.',
        instructions: [
          '➡ Never expect perfection on the first prompt.',
          '➡ Use the "Refine and Correct" pattern: build a small part, verify it works, then move to the next.',
          '➡ Treat errors as conversation starters, not roadblocks.'
        ],
        visualGuideDescription: 'Action: Visualize a circular path with four stops: Prompt -> Generate -> Test -> Refine. This circle is your engine of progress. Each rotation makes your app stronger.'
      }
    ],
    quiz: [
      { question: 'What is the primary role of a Vibe Coder?', options: ['Writing every line of code by hand', 'Designing the intent and architecture', 'Fixing low-level compiler bugs', 'Drawing icons'], correctIndex: 1 },
      { question: 'What is the "Syntax" in our pyramid analogy?', options: ['The Blueprint', 'The Architect', 'The Bricks', 'The Building Owner'], correctIndex: 2 },
      { question: 'How should you treat an AI\'s mistake?', options: ['Start over from scratch', 'Give up on Vibe Coding', 'A conversation starter to refine your intent', 'Report a bug to the developers'], correctIndex: 2 }
    ]
  },
  {
    id: ModuleId.Workspace,
    title: 'Module 2: The Pilot’s Seat',
    description: 'Setting up your cockpit. Learn how to feed your AI the "Context" it needs to be your most powerful ally.',
    lessons: [
      {
        title: 'The Power of Context',
        conceptTitle: 'The Informed Pilot',
        conceptAnalogy: 'Imagine trying to land a plane if you couldn\'t see the runway or the instruments. Context is the radar that tells the AI exactly where your project is.',
        conceptDescription: 'Modern IDEs like Cursor don\'t just look at one file; they look at your whole folder. If you ask "How do I add a login button?", the AI knows which files to change because it has the "Context" of your entire app.',
        instructions: [
          '➡ Use the "@" symbol in Cursor to point the AI to specific files, documentation, or folders.',
          '➡ Keep your folder structure clean; it helps the AI navigate your intent.',
          '➡ Index your project so the AI can search through your code in milliseconds.'
        ],
        visualGuideDescription: 'Action: Picture your IDE as a central hub. Lines of "Context" are streaming in from your files, your documentation, and your database schema, focusing into a single point of intelligence: the Chat Sidebar.'
      }
    ],
    quiz: [
      { question: 'What is "Context" in an AI IDE?', options: ['The font size of the editor', 'Information about your entire project structure', 'The brightness of your monitor', 'The speed of your internet'], correctIndex: 1 },
      { question: 'How do you explicitly point an AI to a file in Cursor?', options: ['Copy-pasting the whole file', 'Using the "@" symbol', 'Sending an email', 'Typing the file path manually every time'], correctIndex: 1 },
      { question: 'Why is a clean folder structure important?', options: ['It makes the AI faster', 'It helps the AI navigate and understand your intent', 'It saves disk space', 'It makes the code run faster'], correctIndex: 1 }
    ]
  },
  {
    id: ModuleId.Frontend,
    title: 'Module 3: Frontend Magic',
    description: 'Manifesting visual beauty. Stop fighting with CSS and start directing user experiences through intent.',
    lessons: [
      {
        title: 'Component Thinking',
        conceptTitle: 'Lego Block Interfaces',
        conceptAnalogy: 'A frontend isn\'t one giant screen; it\'s a box of Legos. A button is a block. A menu is a block. A dashboard is an assembly of these blocks.',
        conceptDescription: 'Tools like v0 and Lovable are masters of "Componentization". Instead of writing 1000 lines of code, you describe the components you need and how they should look together.',
        instructions: [
          '➡ Break your UI down: "I need a Header, a Sidebar, and a Content Grid."',
          '➡ Prompt for specific components: "Give me a responsive navigation bar with a dark mode toggle."',
          '➡ Focus on state: What happens when I click this? How does it change?'
        ],
        visualGuideDescription: 'Action: Imagine your screen divided into a grid. Each cell contains a "Lego Block" (Component). Your job is to describe the block that goes in each cell.'
      }
    ],
    quiz: [
      { question: 'What is a "Component" in web development?', options: ['The computer power supply', 'A reusable building block of a UI', 'A type of database', 'The website URL'], correctIndex: 1 },
      { question: 'What is the benefit of "Component Thinking"?', options: ['It makes the code harder to read', 'It allows you to build complex apps from simple parts', 'It makes images load faster', 'It prevents internet outages'], correctIndex: 1 },
      { question: 'Which tool is great for generating individual UI blocks?', options: ['Supabase', 'v0.dev', 'Make.com', 'Excel'], correctIndex: 1 }
    ]
  },
  {
    id: ModuleId.Backend,
    title: 'Module 4: The Engine Room',
    description: 'Making it "Real". Learn to build the hidden logic and data storage that turns a pretty picture into a functional tool.',
    lessons: [
      {
        title: 'Data Persistence',
        conceptTitle: 'The Memory Bank',
        conceptAnalogy: 'If the frontend is the actor on stage, the backend is the script and the memory of everything that happened in the previous act.',
        conceptDescription: 'Without a backend, your app is like a goldfish—it forgets everything when the page refreshes. Data persistence means your users can log back in and find their tasks exactly where they left them.',
        instructions: [
          '➡ Define your Schema: What pieces of data do you need to remember? (e.g., Name, Date, Status)',
          '➡ Use AI to write SQL or API calls: "Write a function to save a new task to my Supabase database."',
          '➡ Always verify security: Ensure only the logged-in user can see their own data.'
        ],
        visualGuideDescription: 'Action: Visualize a secure vault (The Database). Every time a user types something on the screen, a digital messenger carries that data to the vault for safekeeping.'
      }
    ],
    quiz: [
      { question: 'What is the main purpose of "Persistence"?', options: ['To make the app pretty', 'To ensure data is saved even after a page refresh', 'To speed up the internet', 'To display ads'], correctIndex: 1 },
      { question: 'What is a "Schema"?', options: ['A secret plan', 'The structure and rules of your data', 'The color scheme of your UI', 'The name of your project'], correctIndex: 1 },
      { question: 'Which tool handles data storage in our toolkit?', options: ['v0.dev', 'Supabase', 'Cursor', 'Photoshop'], correctIndex: 1 }
    ]
  },
  {
    id: ModuleId.Automation,
    title: 'Module 5: The Glue',
    description: 'Connecting the world. Learn to build workflows that stitch different services together into one powerful "Agentic" system.',
    lessons: [
      {
        title: 'Workflow Orchestration',
        conceptTitle: 'The Rube Goldberg Machine',
        conceptAnalogy: 'Imagine a marble rolling. It hits a switch, which turns on a fan, which blows a sail, which moves a boat. Automation is setting up these chain reactions digitally.',
        conceptDescription: 'Your app shouldn\'t live on an island. It should talk to Google Calendar, Slack, Email, and AI services automatically. Automation tools are the "Glue" that makes these connections.',
        instructions: [
          '➡ Identify "Triggers": What starts the process? (e.g., A new database entry)',
          '➡ Define "Actions": What should happen next? (e.g., Send a notification)',
          '➡ Use Make.com to visually map these paths without writing a single line of logic.'
        ],
        visualGuideDescription: 'Action: Visualize a series of connected gears. When the first gear (The Trigger) turns, it forces all the other gears (The Actions) to turn in sequence.'
      }
    ],
    quiz: [
      { question: 'What is a "Trigger" in automation?', options: ['The end of a process', 'The event that starts a workflow', 'A type of computer mouse', 'An error message'], correctIndex: 1 },
      { question: 'What is "The Glue" in Vibe Coding?', options: ['Actual physical glue', 'The tools that connect different apps and services', 'The CSS code', 'The browser window'], correctIndex: 1 },
      { question: 'Which tool is best for visual automation?', options: ['Supabase', 'Make.com', 'Cursor', 'v0.dev'], correctIndex: 1 }
    ]
  },
  {
    id: ModuleId.FinalProject,
    title: 'Module 6: The Final Build',
    description: 'Assembling the Masterpiece. Bring your Frontend, Backend, and Glue together into one unified manifest of your intent.',
    lessons: [
      {
        title: 'The Great Assembly',
        conceptTitle: 'The Ribbon Cutting',
        conceptAnalogy: 'It\'s time to take your blueprint, your bricks, and your engine and finally open the doors to your creation.',
        conceptDescription: 'In this final phase, you aren\'t learning new tools—you are orchestrating the ones you already know. You will link your Lovable UI to your Supabase backend and add a final automation layer for that "wow" factor.',
        instructions: [
          '➡ Deploy your Frontend: Get your app live on the web so others can see it.',
          '➡ Wire up the "Real" data: Replace static placeholder text with real data from your database.',
          '➡ Final Vibe Check: Test the entire flow from a user\'s perspective. Does it feel right?'
        ],
        visualGuideDescription: 'Action: Picture all your previous "Building Blocks" merging into a single, glowing, functional orb. This orb is your finished Application.'
      }
    ],
    quiz: [
      { question: 'What is the focus of the Final Build?', options: ['Learning a new programming language', 'Synthesizing all tools into one working product', 'Buying a domain name', 'Deleting your old code'], correctIndex: 1 },
      { question: 'What does it mean to "Wire up real data"?', options: ['Plugging in more power cables', 'Connecting the UI to the Database storage', 'Typing faster', 'Using more colors'], correctIndex: 1 },
      { question: 'What is the "Final Vibe Check"?', options: ['A grammar check', 'Testing the user experience flow', 'Checking your computer battery', 'Measuring the download speed'], correctIndex: 1 }
    ]
  }
];
