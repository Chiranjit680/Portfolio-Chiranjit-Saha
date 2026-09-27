// Single source of truth for all site content.
// Anything marked TODO is a placeholder waiting for real data.

// Resume: drop a single PDF (any filename) into the /resume folder at the project root.
// Vite bundles it at build time; download buttons hide themselves if the folder is empty.
const resumeFiles = import.meta.glob('/resume/*.pdf', { eager: true, query: '?url', import: 'default' })

export const profile = {
  name: 'Chiranjit Saha',
  role: 'Backend & AI Systems Engineer',
  focus: ['Retrieval-Augmented Generation', 'Distributed Systems', 'Multi-Agent Architectures'],
  location: 'India',
  email: 'chiranjitsaha.official680@gmail.com',
  resumeUrl: Object.values(resumeFiles)[0] ?? null,
  resumeFileName: 'Chiranjit_Saha_Resume.pdf', // name the visitor's download is saved as
  photo: '/images/Chiranjit.jpeg',
  openTo: 'AI engineering, backend, and full-stack roles',
  // TODO: replace with your own words — draft based on the resume
  about: [
    "I build the systems that sit between large language models and the people who depend on them — retrieval pipelines, agent orchestration layers, and the backend infrastructure that keeps them fast and reliable.",
    "Most recently at Oracle, I led a four-person intern team building an agentic knowledge platform for 5,000+ support engineers: a Go API gateway, a hybrid + graph retrieval stack on Oracle AI Database 26ai, and a multi-agent pipeline with guardrails for citation-validated answers.",
    "Outside of work I research multi-agent debate for high-stakes decision-making, train small language models from scratch to understand them properly, and keep my problem-solving sharp with 700+ competitive programming problems.",
  ],
}

export const socials = {
  github: 'https://github.com/Chiranjit680',
  linkedin: 'https://www.linkedin.com/in/', // TODO
  leetcode: 'https://leetcode.com/u/', // TODO
}

// Contact form: create a free form at https://formspree.io and paste its ID (the part after /f/).
// Left empty, the form falls back to opening the visitor's mail client.
export const formspreeId = '' // TODO

export const highlights = [
  { value: '95.4%', label: 'Signal recall on enterprise RAG' },
  { value: '5,000+', label: 'Support engineers served' },
  { value: '700+', label: 'Competitive programming problems' },
  { value: '8.02', label: 'CGPA at IIIT Guwahati' },
]

export const education = [
  {
    school: 'Indian Institute of Information Technology Guwahati',
    degree: 'B.Tech in Electronics and Communications Engineering',
    period: 'Jul 2023 – Aug 2027',
    location: 'Guwahati, India',
    detail: 'CGPA: 8.02',
    // TODO (optional): relevant coursework, e.g. ['Data Structures', 'Machine Learning', ...]
    coursework: [],
  },
]

export const skills = [
  { group: 'Languages', items: ['Python', 'Go', 'C++', 'Java', 'SQL', 'JavaScript'] },
  { group: 'AI / ML', items: ['RAG', 'GraphRAG', 'LangChain', 'LangGraph', 'PyTorch', 'TensorFlow', 'NLP', 'Computer Vision'] },
  { group: 'Backend & APIs', items: ['FastAPI', 'Go Gin', 'Django', 'Flask', 'Express', 'WebSockets', 'REST', 'Microservices'] },
  {
    group: 'Data, Cloud & Infra',
    items: ['OCI', 'Oracle AI Database 26ai', 'PostgreSQL', 'MongoDB', 'Redis', 'ChromaDB', 'FAISS', 'Docker', 'Podman'],
  },
  { group: 'Specializations', items: ['Distributed Systems', 'System Design', 'Multi-Agent Systems', 'Agent Orchestration'] },
  { group: 'Frontend & Tools', items: ['React', 'Streamlit', 'Git', 'Linux'] },
]

export const achievements = [
  { title: '700+ problems solved', detail: 'LeetCode, CodeChef, Codeforces' },
  { title: 'Runner-Up — Inspirathon 2026', detail: 'IIIT Guwahati', year: '2026' },
  { title: 'Finalist (200+ teams)', detail: 'IIT Guwahati Science & Technology Hackathon', year: '2024' },
]

export const leadership = [
  { title: 'PR & Corporate Relations Head', org: 'I&E Cell, IIIT Guwahati', period: 'Nov 2024 – Dec 2025' },
  { title: 'Coordinator', org: 'Mavericks (ML Society), IIIT Guwahati', period: 'Aug 2024' },
]

export const featuredExperience = {
  role: 'Project Intern',
  company: 'Oracle India Private Limited',
  location: 'Bengaluru, India',
  period: 'May 2026 – Jul 2026',
  project: 'Oracle SaaS Support Assist',
  projectTagline: 'Enterprise RAG support platform',
  stack: ['Python', 'Go', 'OCI', 'Oracle AI Database 26ai', 'Wayflow', 'MCP'],
  metrics: [
    { value: '5,000+', label: 'support engineers' },
    { value: '95.4%', label: 'signal recall' },
    { value: '4', label: 'person team led' },
  ],
  points: [
    {
      title: 'Team lead',
      text: 'Led a 4-person intern team building an enterprise agentic knowledge platform that delivers context-aware ticket-resolution recommendations to 5,000+ support engineers.',
    },
    {
      title: 'Go API gateway',
      text: 'Built a high-performance gateway in Go (Gin) with middleware for authentication, rate limiting, request tracing, and structured logging, sustaining very low routing latency across downstream services.',
    },
    {
      title: 'Novel retrieval layer',
      text: 'Architected semantically-clustered vector DB clusters with decay-weighted bandit re-ranking at the partition level — a pattern outside standard RAG literature — layered with hybrid search, hierarchical retrieval, and a GraphRAG module on Oracle’s native SQL/PGQ property graphs, reaching 95.4% signal recall.',
    },
    {
      title: 'Multi-agent pipeline & guardrails',
      text: 'Designed a Wayflow multi-agent architecture (retrieval, planning, validation, response generation) with MCP-based tool calling for evidence-backed, citation-validated responses, plus Presidio PII scrubbing, response validation, and safety filtering.',
    },
  ],
  // position = CSS object-position for the thumbnail crop (the lightbox always shows the full photo)
  photos: [
    { src: '/images/oracle/team.jpeg', caption: 'With the intern cohort at Oracle Bengaluru', position: 'center 40%' },
    { src: '/images/oracle/campus.jpeg', caption: 'On campus in Bengaluru', position: 'center 25%' },
    { src: '/images/oracle/workstations.jpeg', caption: 'The team’s workstations', position: 'center 70%' },
    { src: '/images/oracle/badge.jpeg', caption: 'Badge in hand', position: 'center 45%' },
  ],
}

export const otherExperience = [
  {
    role: 'Undergraduate Researcher',
    org: 'IIIT Guwahati',
    supervisor: 'Dr. Sovan Barma',
    period: 'Jan 2026 – Present',
    location: 'Guwahati, India',
    text: 'Designing a debate-based multi-agent system where adversarial LLM agents reason through high-stakes decisions, targeting better factual consistency and fewer hallucinations than single-agent baselines.',
    stack: ['LangGraph', 'PyTorch'],
  },
  {
    role: 'Summer Research Intern',
    org: 'Indian Institute of Technology Guwahati',
    supervisor: 'Dr. Ayon Borthakur',
    period: 'May 2025 – Jul 2025',
    location: 'Guwahati, India',
    text: 'Built minRev, a memory-efficient Reversible Vision Transformer that cuts GPU memory by 50% versus a standard ViT baseline while matching classification performance.',
    stack: ['PyTorch'],
  },
  {
    role: 'Summer Intern',
    org: 'IIIT Guwahati',
    supervisor: 'Dr. Sudip Biswas',
    period: 'May 2024 – Jul 2024',
    location: 'Guwahati, India',
    text: 'Built a full-stack IoT management platform with Django REST Framework, integrating NodeMCU, Arduino, and Raspberry Pi for real-time remote monitoring and control of an automated cooking machine.',
    stack: ['Django REST Framework', 'IoT'],
  },
]

export const projectCategories = ['All', 'AI / ML', 'Backend', 'Full-stack', 'Research']

// links: { github, demo } — leave a key out (or empty) to hide that button.
export const projects = [
  {
    title: 'Blind Date',
    subtitle: 'Real-time anonymous matchmaking platform',
    period: 'Aug 2026 – Present',
    collaborative: true,
    categories: ['Backend'],
    stack: ['Go', 'Cassandra', 'Redis', 'WebSockets', 'H3'],
    points: [
      'H3-based geospatial matchmaking using gridDisk neighbour search and hierarchical roll-up for scalable, location-aware matching.',
      'Go WebSocket engine for anonymous 1:1 chat: per-connection reader/writer goroutines, RWMutex-guarded hub, non-blocking fan-out, cursor-based sync, and idempotent reconnects.',
    ],
    links: { github: '' }, // TODO
  },
  {
    title: 'VoiceCart 2.0',
    subtitle: 'Voice-driven agentic e-commerce platform',
    period: 'Jun 2025 – Aug 2026',
    collaborative: true,
    categories: ['AI / ML', 'Full-stack'],
    stack: ['FastAPI', 'LangGraph', 'faster-whisper', 'WebSockets', 'PostgreSQL', 'React', 'TypeScript'],
    points: [
      'Speak to shop: audio streams over WebSockets to a gateway, gets transcribed by a faster-whisper STT service, and is routed by a LangGraph router to shopping or cart/checkout agents.',
      'Independently deployable services (gateway, STT, agents, FastAPI commerce API on PostgreSQL) with pluggable LLMs: local Ollama or Gemini.',
    ],
    links: { github: 'https://github.com/Chiranjit680/VoiceCart-2.0' },
  },
  {
    title: 'Clinical Lab Result Analyzer',
    subtitle: 'Explainable AI triage for lab results',
    period: 'Sep 2026',
    categories: ['AI / ML', 'Full-stack'],
    stack: ['FastAPI', 'LangGraph', 'MCP', 'React', 'PubMed API', 'WebSockets'],
    points: [
      'LangGraph pipeline (validate → translate → classify → route → explain) that sorts results into Normal / Warning / Critical and surfaces critical ones first.',
      'Every tool call runs over a separate MCP server via JSON-RPC; explanations are grounded in PubMed sources with next steps and a follow-up chat.',
    ],
    links: {
      github: 'https://github.com/Chiranjit680/Clinical-Lab-Result-Analyzer-Aragen-',
      demo: 'https://youtu.be/91TMwreZPQo',
    },
  },
  {
    title: 'Multi-Agent Debate Framework',
    subtitle: 'Adversarial LLM agents for critical decision-making',
    period: 'Jan 2026 – Jul 2026',
    categories: ['AI / ML', 'Research'],
    stack: ['LangGraph', 'PyTorch'],
    points: [
      'Debate-based multi-agent system where adversarial LLM agents reason through high-stakes decisions.',
      'Targets improved factual consistency and reduced hallucination over single-agent baselines.',
    ],
    links: { github: 'https://github.com/Chiranjit680/MAD-CoT' },
  },
  {
    title: 'DisasterLM',
    subtitle: '14.3M-parameter decoder-only language model',
    period: 'May 2025 – Jun 2025',
    categories: ['AI / ML'],
    stack: ['PyTorch', 'Transformers'],
    points: [
      'Decoder-only Transformer built from scratch with the full training pipeline: preprocessing, BPE tokenization, causal LM, cosine LR schedule, gradient clipping.',
      'Pretrained on BookCorpus and fine-tuned on disaster-response data, reaching a perplexity of 174 on domain-specific benchmarks.',
    ],
    links: { github: 'https://github.com/Chiranjit680/DisasterResponse-LM' },
  },
  {
    title: 'minRev',
    subtitle: 'Memory-efficient Reversible Vision Transformer',
    period: 'May 2025 – Jul 2025',
    categories: ['AI / ML', 'Research'],
    stack: ['PyTorch', 'Vision Transformers'],
    points: [
      'Reversible ViT that recomputes activations in the backward pass instead of storing them.',
      '50% reduction in GPU memory versus a standard ViT baseline while matching classification performance.',
    ],
    links: { github: 'https://github.com/Chiranjit680/Reversible-ViT' },
  },
  {
    title: 'FinAdvisor',
    subtitle: 'AI personal finance & investment advisor',
    period: 'Jun 2025',
    categories: ['AI / ML', 'Backend'],
    stack: ['FastAPI', 'LangChain', 'SQLModel', 'yFinance', 'Streamlit'],
    points: [
      'LangChain ReAct agent that reasons over a user’s portfolio, preferences, and risk appetite to give contextual investment suggestions.',
      'Stock data cached in SQLModel with a live yFinance fallback, plus scraped news with sentiment analysis, all exposed through a FastAPI REST API.',
    ],
    links: { github: 'https://github.com/Chiranjit680/FinAdvisor' },
  },
  {
    title: 'DeepLense',
    subtitle: 'Visual similarity search engine',
    period: 'Jul 2025',
    categories: ['AI / ML'],
    stack: ['PyTorch', 'FAISS', 'FastAPI', 'Streamlit'],
    points: [
      'Upload a fashion image and retrieve visually similar items using VGG16 embeddings.',
      'FAISS nearest-neighbour index for fast search over high-dimensional vectors, with a Streamlit front end.',
    ],
    links: { github: 'https://github.com/Chiranjit680/DeepLense' },
  },
  {
    title: 'Adaptive Braking System',
    subtitle: 'LSTM-based braking control on embedded hardware',
    period: 'Apr 2026',
    categories: ['AI / ML'],
    stack: ['LSTM', 'Raspberry Pi', 'ESP32', 'C++'],
    points: [
      'Adaptive braking system driven by an LSTM model.',
      'Deployed across a Raspberry Pi and an ESP32.',
    ],
    links: { github: 'https://github.com/Chiranjit680/Adaptive-Breaking-System-ABS-EC382-' },
  },
  {
    title: 'Facial Recognition',
    subtitle: 'One-shot face verification with Siamese networks',
    period: 'Jun 2025',
    categories: ['AI / ML'],
    stack: ['PyTorch', 'OpenCV'],
    points: [
      'Siamese neural network for one-shot recognition, based on Koch et al.’s one-shot learning paper.',
      'Anchor/positive images captured with OpenCV, LFW as negatives, trained with contrastive loss and a similarity threshold.',
    ],
    links: { github: 'https://github.com/Chiranjit680/FacialRecognition' },
  },
  {
    title: 'IoT Cooking Platform',
    subtitle: 'Remote monitoring & control for an automated cooking machine',
    period: 'May 2024 – Jul 2024',
    categories: ['Full-stack'],
    stack: ['Django REST Framework', 'NodeMCU', 'Arduino', 'Raspberry Pi'],
    points: [
      'Full-stack management platform integrating NodeMCU, Arduino, and Raspberry Pi devices.',
      'Real-time remote monitoring and control of the machine’s cooking process.',
    ],
    links: { github: 'https://github.com/Chiranjit680/SCAL' },
  },
]
