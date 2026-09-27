// The system drawn in the hero: clients → gateway → orchestrator → agents → data layer.
// Positions are in scene units; the whole graph is centred on the origin.

const ring = (radius, y, count, offset = 0) =>
  Array.from({ length: count }, (_, i) => {
    const a = offset + (i / count) * Math.PI * 2
    return [Math.cos(a) * radius, y, Math.sin(a) * radius]
  })

const agentPos = ring(1.9, 0, 4, Math.PI / 4)
const dataPos = ring(2.3, -1.55, 5, Math.PI / 10)

export const tiers = [
  { y: 2.6, radius: 1.8 },
  { y: 1.45, radius: 0.9 },
  { y: 0, radius: 1.9 },
  { y: -1.55, radius: 2.3 },
]

export const nodes = [
  { id: 'c1', kind: 'client', pos: [-1.5, 2.6, 0.5], label: 'Client', sub: 'Support engineer' },
  { id: 'c2', kind: 'client', pos: [0, 2.6, -0.7], label: 'Client', sub: 'Web console' },
  { id: 'c3', kind: 'client', pos: [1.5, 2.6, 0.5], label: 'Client', sub: 'Service integration' },

  { id: 'gw', kind: 'gateway', pos: [0, 1.45, 0], label: 'API Gateway', sub: 'Go · Gin — auth, rate limiting, tracing' },
  { id: 'orch', kind: 'orchestrator', pos: [0, 0, 0], label: 'Orchestrator Agent', sub: 'Plans, routes and merges work' },

  { id: 'retrieval', kind: 'agent', pos: agentPos[0], label: 'Retrieval Agent', sub: 'Hybrid search + GraphRAG' },
  { id: 'planning', kind: 'agent', pos: agentPos[1], label: 'Planning Agent', sub: 'Decomposes the request' },
  { id: 'validation', kind: 'agent', pos: agentPos[2], label: 'Validation Agent', sub: 'Citations · PII guardrails' },
  { id: 'response', kind: 'agent', pos: agentPos[3], label: 'Response Agent', sub: 'Evidence-backed answer' },

  { id: 's1', kind: 'shard', pos: dataPos[0], label: 'Vector Shard 1', sub: 'Semantic cluster · bandit re-ranking' },
  { id: 's2', kind: 'shard', pos: dataPos[1], label: 'Vector Shard 2', sub: 'Semantic cluster · bandit re-ranking' },
  { id: 's3', kind: 'shard', pos: dataPos[2], label: 'Vector Shard 3', sub: 'Semantic cluster · bandit re-ranking' },
  { id: 'graph', kind: 'graph', pos: dataPos[3], label: 'Graph Store', sub: 'SQL/PGQ property graph' },
  { id: 'cache', kind: 'cache', pos: dataPos[4], label: 'Cache', sub: 'Redis · session state' },
]

export const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]))

const agents = ['retrieval', 'planning', 'validation', 'response']
const stores = ['s1', 's2', 's3', 'graph']

export const edges = [
  ['c1', 'gw'],
  ['c2', 'gw'],
  ['c3', 'gw'],
  ['gw', 'orch'],
  ['gw', 'cache'],
  ...agents.map((a) => ['orch', a]),
  // agents talk to each other around the ring
  ...agents.map((a, i) => [a, agents[(i + 1) % agents.length]]),
  ...stores.map((s) => ['retrieval', s]),
  ['planning', 'cache'],
]

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

// A random request's journey through the system, as a list of node ids.
export function randomRoute() {
  const r = Math.random()
  if (r < 0.2) {
    // agent-to-agent chatter around the ring
    const i = Math.floor(Math.random() * agents.length)
    return [agents[i], agents[(i + 1) % agents.length], agents[(i + 2) % agents.length]]
  }
  const client = pick(['c1', 'c2', 'c3'])
  if (r < 0.35) return [client, 'gw', 'cache', 'gw', client]

  const store = pick(stores)
  const route = [client, 'gw', 'orch']
  if (Math.random() < 0.5) route.push('planning', 'orch')
  route.push('retrieval', store, 'retrieval', 'orch', 'validation', 'response', 'orch', 'gw', client)
  return route
}
