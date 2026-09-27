import { edges, nodeById, nodes } from './architecture'

// Flat oblique projection of the same graph, shown while three.js loads,
// for reduced-motion users, and if WebGL fails.
const project = ([x, y, z]) => [x + z * 0.35, -y + z * 0.3]

const radius = { client: 0.1, gateway: 0.3, orchestrator: 0.3, agent: 0.17, shard: 0.18, graph: 0.18, cache: 0.16 }

export default function StaticArchitecture() {
  return (
    <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-[8%]">
      <svg viewBox="-3.4 -3.3 6.8 5.6" className="h-[80%] max-h-[560px] w-auto opacity-80">
        {edges.map(([a, b]) => {
          const [x1, y1] = project(nodeById[a].pos)
          const [x2, y2] = project(nodeById[b].pos)
          return <line key={a + b} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4f4f6b" strokeWidth="0.015" />
        })}
        {nodes.map((n) => {
          const [cx, cy] = project(n.pos)
          return (
            <circle
              key={n.id}
              cx={cx}
              cy={cy}
              r={radius[n.kind]}
              fill={n.kind === 'orchestrator' ? '#a78bfa' : '#818cf8'}
              fillOpacity={n.kind === 'client' ? 0.9 : 0.35}
              stroke="#a5b4fc"
              strokeWidth="0.015"
            />
          )
        })}
      </svg>
    </div>
  )
}
