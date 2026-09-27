import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Edges, Html } from '@react-three/drei'
import * as THREE from 'three'
import { edges, nodeById, nodes, randomRoute, tiers } from './architecture'

const COLORS = {
  client: '#e4e4e7',
  gateway: '#818cf8',
  orchestrator: '#a78bfa',
  agent: '#8b93f8',
  shard: '#6366f1',
  graph: '#c4b5fd',
  cache: '#94a3b8',
  line: '#4f4f6b',
  lineHot: '#a5b4fc',
  packet: '#e0e7ff',
}

function NodeShape({ kind }) {
  switch (kind) {
    case 'client':
      return <sphereGeometry args={[0.11, 20, 20]} />
    case 'gateway':
      return <cylinderGeometry args={[0.45, 0.45, 0.14, 6]} />
    case 'orchestrator':
      return <icosahedronGeometry args={[0.36, 0]} />
    case 'agent':
      return <octahedronGeometry args={[0.2, 0]} />
    case 'shard':
      return <cylinderGeometry args={[0.2, 0.2, 0.34, 24]} />
    case 'graph':
      return <dodecahedronGeometry args={[0.22, 0]} />
    default:
      return <boxGeometry args={[0.28, 0.28, 0.28]} />
  }
}

function Node({ node, hovered, onHover }) {
  const ref = useRef()
  const color = COLORS[node.kind]
  const spins = node.kind === 'orchestrator' || node.kind === 'agent' || node.kind === 'graph'

  useFrame((_, dt) => {
    if (spins && ref.current) ref.current.rotation.y += dt * (node.kind === 'orchestrator' ? 0.4 : 0.7)
  })

  return (
    <group position={node.pos}>
      <mesh ref={ref} scale={hovered ? 1.25 : 1}>
        <NodeShape kind={node.kind} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.9 : node.kind === 'orchestrator' ? 0.55 : 0.3}
          roughness={0.35}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
        {node.kind !== 'client' && <Edges color={hovered ? '#ffffff' : COLORS.lineHot} threshold={15} />}
      </mesh>

      {/* Larger invisible sphere so small nodes are easy to hover */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(node.id)
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.42, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {hovered && (
        <Html position={[0, 0.5, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
          <div className="whitespace-nowrap rounded-lg border border-line bg-ink/90 px-3 py-1.5 text-center shadow-xl backdrop-blur">
            <p className="text-xs font-medium text-white">{node.label}</p>
            <p className="font-mono text-[10px] text-muted">{node.sub}</p>
          </div>
        </Html>
      )}
    </group>
  )
}

function EdgeLines({ hovered }) {
  const [base, hot] = useMemo(() => {
    const toGeo = (list) => {
      const pts = list.flatMap(([a, b]) => [...nodeById[a].pos, ...nodeById[b].pos])
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
      return g
    }
    const touching = hovered ? edges.filter(([a, b]) => a === hovered || b === hovered) : []
    return [toGeo(edges), toGeo(touching)]
  }, [hovered])

  return (
    <>
      <lineSegments geometry={base}>
        <lineBasicMaterial color={COLORS.line} transparent opacity={0.55} />
      </lineSegments>
      <lineSegments geometry={hot}>
        <lineBasicMaterial color={COLORS.lineHot} />
      </lineSegments>
    </>
  )
}

function TierRings() {
  return tiers.map((t) => (
    <mesh key={t.y} position={[0, t.y - 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[t.radius + 0.35, t.radius + 0.37, 96]} />
      <meshBasicMaterial color={COLORS.lineHot} transparent opacity={0.12} side={THREE.DoubleSide} />
    </mesh>
  ))
}

function makePacket() {
  const pts = randomRoute().map((id) => new THREE.Vector3(...nodeById[id].pos))
  const lengths = pts.slice(1).map((p, i) => p.distanceTo(pts[i]))
  return { pts, lengths, total: lengths.reduce((a, b) => a + b, 0), d: 0, speed: 0.9 + Math.random() * 0.8 }
}

// Request packets travelling along random routes, drawn as one instanced mesh.
function Packets({ count }) {
  const core = useRef()
  const halo = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const packets = useRef(null)

  useFrame((_, dt) => {
    // Routes are random, so they're created on the first frame rather than during render.
    packets.current ??= Array.from({ length: count }, () => {
      const p = makePacket()
      p.d = Math.random() * p.total // stagger so they don't all start together
      return p
    })

    const step = Math.min(dt, 0.05)
    packets.current.forEach((p, i) => {
      p.d += step * p.speed
      if (p.d >= p.total) Object.assign(p, makePacket())

      let d = p.d
      let seg = 0
      while (seg < p.lengths.length - 1 && d > p.lengths[seg]) d -= p.lengths[seg++]
      const t = p.lengths[seg] ? Math.min(d / p.lengths[seg], 1) : 0
      dummy.position.lerpVectors(p.pts[seg], p.pts[seg + 1], t)

      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      core.current.setMatrixAt(i, dummy.matrix)
      dummy.scale.setScalar(2.6)
      dummy.updateMatrix()
      halo.current.setMatrixAt(i, dummy.matrix)
    })
    core.current.instanceMatrix.needsUpdate = true
    halo.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <instancedMesh ref={core} args={[null, null, count]} frustumCulled={false}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial color={COLORS.packet} toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={halo} args={[null, null, count]} frustumCulled={false}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial
          color={COLORS.gateway}
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </instancedMesh>
    </>
  )
}

function System({ lite }) {
  const group = useRef()
  const [hovered, setHovered] = useState(null)
  const { size, viewport } = useThree()

  // Desktop: sit to the right of the hero text. Mobile: centred behind it.
  const wide = size.width >= 1024
  const scale = Math.min(1, viewport.width / 7.5)
  const offsetX = wide ? viewport.width * 0.2 : 0

  useFrame((state) => {
    const g = group.current
    const t = state.clock.elapsedTime
    const targetY = Math.sin(t * 0.12) * 0.45 + state.pointer.x * 0.3
    const targetX = 0.28 - state.pointer.y * 0.12
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.04)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.04)
  })

  return (
    <group ref={group} position={[offsetX, -0.2, 0]} scale={scale}>
      <TierRings />
      <EdgeLines hovered={hovered} />
      {nodes.map((n) => (
        <Node key={n.id} node={n} hovered={hovered === n.id} onHover={setHovered} />
      ))}
      <Packets count={lite ? 14 : 36} />
    </group>
  )
}

export default function ArchitectureScene({ eventSource, active, lite }) {
  const [ready, setReady] = useState(false)

  return (
    <Canvas
      onCreated={() => setReady(true)}
      className={`transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
      camera={{ position: [0, 0.4, 9], fov: 42 }}
      dpr={lite ? [1, 1.5] : [1, 2]}
      frameloop={active ? 'always' : 'never'}
      eventSource={eventSource}
      eventPrefix="client"
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 5, 5]} intensity={40} color="#c7d2fe" />
      <pointLight position={[-5, -3, 2]} intensity={20} color="#a78bfa" />
      <System lite={lite} />
    </Canvas>
  )
}
