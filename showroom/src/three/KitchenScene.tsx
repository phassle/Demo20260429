import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment, PerspectiveCamera, OrthographicCamera } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import type { Configuration } from '../data/catalog'
import { getOption } from '../data/catalog'

interface KitchenSceneProps {
  config: Configuration
  view: '3d' | 'top'
}

/**
 * Stylized low-poly kitchen.
 * - Floor + 2 walls forming an L
 * - Base cabinets along the back wall, optionally also along the side wall (U / island)
 * - Wall cabinets above
 * - Countertop on top of base cabinets
 * - Fridge, oven, sink as primitives
 *
 * Production runs Unity. This is a stand-in viewer for the web prototype.
 */
export function KitchenScene({ config, view }: KitchenSceneProps) {
  return (
    <Canvas shadows dpr={[1, 2]} style={{ background: '#EFE9E1' }}>
      {view === '3d' ? (
        <PerspectiveCamera makeDefault position={[5.5, 4, 6.5]} fov={42} />
      ) : (
        <OrthographicCamera makeDefault position={[0, 12, 0]} zoom={70} near={0.1} far={100} />
      )}

      {/* Lighting — soft, natural */}
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <directionalLight position={[-4, 6, -3]} intensity={0.25} />

      {/* Soft env for material reflection */}
      <Environment preset="apartment" />

      <Room />
      <Kitchen config={config} />

      <ContactShadows
        position={[0, 0.005, 0]}
        opacity={0.35}
        scale={20}
        blur={2.4}
        far={6}
      />

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={14}
        minPolarAngle={view === 'top' ? 0 : 0.1}
        maxPolarAngle={view === 'top' ? 0 : Math.PI / 2.1}
        target={[0, 1, 0]}
      />
    </Canvas>
  )
}

/** Floor + two walls forming an L-shaped corner */
function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#D9CFC0" roughness={0.95} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.4, -3.5]} receiveShadow>
        <planeGeometry args={[12, 4.8]} />
        <meshStandardMaterial color="#FAFAF8" roughness={1} />
      </mesh>

      {/* Side wall (left) */}
      <mesh position={[-5, 2.4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[7, 4.8]} />
        <meshStandardMaterial color="#F4F0EA" roughness={1} />
      </mesh>

      {/* Subtle floor grid */}
      <gridHelper args={[14, 14, '#C5BDB0', '#D9CFC0']} position={[0, 0.001, 0]} />
    </group>
  )
}

/** The actual cabinetry, countertop, and appliances — driven by config */
function Kitchen({ config }: { config: Configuration }) {
  const cabinet = getOption('cabinets', config.cabinets)
  const counter = getOption('countertop', config.countertop)
  const hardware = getOption('hardware', config.hardware)

  const cabColor = cabinet?.color || '#F2EEE6'
  const counterColor = counter?.color || '#E8E5DE'
  const hardwareColor = hardware?.swatch || '#B5984F'

  const layout = config.layout
  const showSideRun = layout === 'u-shape' || layout === 'island'
  const showIsland = layout === 'island'

  return (
    <group>
      {/* Back run of base cabinets */}
      <CabinetRun
        position={[-3, 0, -3.1]}
        length={6}
        cabColor={cabColor}
        counterColor={counterColor}
        hardwareColor={hardwareColor}
        showHandles={config.hardware !== 'no-handles'}
        orientation="back"
      />

      {/* Wall cabinets above back run */}
      <WallCabinetRun
        position={[-3, 2.0, -3.4]}
        length={6}
        cabColor={cabColor}
        hardwareColor={hardwareColor}
        showHandles={config.hardware !== 'no-handles'}
        orientation="back"
      />

      {/* Side run for U-shape / island layouts */}
      {showSideRun && (
        <>
          <CabinetRun
            position={[-3.4, 0, -2.6]}
            length={4}
            cabColor={cabColor}
            counterColor={counterColor}
            hardwareColor={hardwareColor}
            showHandles={config.hardware !== 'no-handles'}
            orientation="side"
          />
        </>
      )}

      {/* Island */}
      {showIsland && (
        <Island
          position={[0.3, 0, 0.5]}
          cabColor={cabColor}
          counterColor={counterColor}
          hardwareColor={hardwareColor}
          showHandles={config.hardware !== 'no-handles'}
        />
      )}

      {/* Fridge — tall on the right side of back wall */}
      <Fridge position={[2.5, 0, -3.05]} />

      {/* Oven — embedded in the back run */}
      <Oven position={[-1.0, 0.55, -3.05]} />

      {/* Sink — embedded in the back run */}
      <Sink position={[0.6, 0.93, -3.05]} counterColor={counterColor} />

      {/* Pendants for layouts with island and pendant lighting */}
      {showIsland && (config.lighting === 'pendant' || config.lighting === 'full') && (
        <Pendants position={[0.3, 2.6, 0.5]} />
      )}
    </group>
  )
}

interface CabinetRunProps {
  position: [number, number, number]
  length: number
  cabColor: string
  counterColor: string
  hardwareColor: string
  showHandles: boolean
  orientation: 'back' | 'side'
}

function CabinetRun({
  position,
  length,
  cabColor,
  counterColor,
  hardwareColor,
  showHandles,
  orientation,
}: CabinetRunProps) {
  const depth = 0.65
  const height = 0.9
  const numUnits = Math.round(length / 0.6)
  const unitWidth = length / numUnits

  const groupRotation: [number, number, number] =
    orientation === 'side' ? [0, Math.PI / 2, 0] : [0, 0, 0]

  return (
    <group position={position} rotation={groupRotation}>
      {/* Cabinet bodies */}
      {Array.from({ length: numUnits }).map((_, i) => {
        const x = i * unitWidth + unitWidth / 2
        return (
          <group key={i}>
            <mesh position={[x, height / 2, depth / 2]} castShadow receiveShadow>
              <boxGeometry args={[unitWidth - 0.02, height, depth]} />
              <meshStandardMaterial color={cabColor} roughness={0.6} metalness={0.05} />
            </mesh>
            {/* Handle */}
            {showHandles && (
              <mesh position={[x, height - 0.12, depth + 0.005]} castShadow>
                <boxGeometry args={[unitWidth * 0.4, 0.025, 0.025]} />
                <meshStandardMaterial color={hardwareColor} roughness={0.3} metalness={0.7} />
              </mesh>
            )}
          </group>
        )
      })}
      {/* Countertop */}
      <mesh position={[length / 2, height + 0.02, depth / 2]} castShadow receiveShadow>
        <boxGeometry args={[length, 0.04, depth + 0.04]} />
        <meshStandardMaterial color={counterColor} roughness={0.35} metalness={0.05} />
      </mesh>
      {/* Toe-kick shadow line */}
      <mesh position={[length / 2, 0.05, depth / 2 + 0.02]}>
        <boxGeometry args={[length, 0.1, 0.02]} />
        <meshStandardMaterial color="#1A1A1A" roughness={1} />
      </mesh>
    </group>
  )
}

interface WallCabinetRunProps {
  position: [number, number, number]
  length: number
  cabColor: string
  hardwareColor: string
  showHandles: boolean
  orientation: 'back' | 'side'
}

function WallCabinetRun({
  position,
  length,
  cabColor,
  hardwareColor,
  showHandles,
  orientation,
}: WallCabinetRunProps) {
  const depth = 0.32
  const height = 0.7
  const numUnits = Math.round(length / 0.6)
  const unitWidth = length / numUnits

  const groupRotation: [number, number, number] =
    orientation === 'side' ? [0, Math.PI / 2, 0] : [0, 0, 0]

  return (
    <group position={position} rotation={groupRotation}>
      {Array.from({ length: numUnits }).map((_, i) => {
        const x = i * unitWidth + unitWidth / 2
        return (
          <group key={i}>
            <mesh position={[x, height / 2, depth / 2]} castShadow receiveShadow>
              <boxGeometry args={[unitWidth - 0.02, height, depth]} />
              <meshStandardMaterial color={cabColor} roughness={0.6} metalness={0.05} />
            </mesh>
            {showHandles && (
              <mesh position={[x, 0.08, depth + 0.005]} castShadow>
                <boxGeometry args={[unitWidth * 0.4, 0.02, 0.02]} />
                <meshStandardMaterial color={hardwareColor} roughness={0.3} metalness={0.7} />
              </mesh>
            )}
          </group>
        )
      })}
    </group>
  )
}

interface IslandProps {
  position: [number, number, number]
  cabColor: string
  counterColor: string
  hardwareColor: string
  showHandles: boolean
}

function Island({ position, cabColor, counterColor, hardwareColor, showHandles }: IslandProps) {
  const w = 2.4
  const d = 1.0
  const h = 0.9
  return (
    <group position={position}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={cabColor} roughness={0.6} />
      </mesh>
      {/* Countertop with overhang */}
      <mesh position={[0, h + 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[w + 0.1, 0.04, d + 0.4]} />
        <meshStandardMaterial color={counterColor} roughness={0.35} />
      </mesh>
      {/* Handles on front face */}
      {showHandles && (
        <>
          <mesh position={[-0.5, h - 0.12, d / 2 + 0.005]} castShadow>
            <boxGeometry args={[0.3, 0.025, 0.025]} />
            <meshStandardMaterial color={hardwareColor} metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0.5, h - 0.12, d / 2 + 0.005]} castShadow>
            <boxGeometry args={[0.3, 0.025, 0.025]} />
            <meshStandardMaterial color={hardwareColor} metalness={0.7} roughness={0.3} />
          </mesh>
        </>
      )}
    </group>
  )
}

function Fridge({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.05, 0.35]} castShadow receiveShadow>
        <boxGeometry args={[0.85, 2.1, 0.7]} />
        <meshStandardMaterial color="#D8D8D8" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Seam line */}
      <mesh position={[0, 1.4, 0.71]}>
        <boxGeometry args={[0.85, 0.005, 0.001]} />
        <meshStandardMaterial color="#A8A8A8" />
      </mesh>
      {/* Handle */}
      <mesh position={[0.35, 1.6, 0.72]}>
        <boxGeometry args={[0.025, 0.4, 0.025]} />
        <meshStandardMaterial color="#666" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.35, 0.7, 0.72]}>
        <boxGeometry args={[0.025, 0.3, 0.025]} />
        <meshStandardMaterial color="#666" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

function Oven({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0, 0.32]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#1A1A1A" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Glass door */}
      <mesh position={[0, 0, 0.625]}>
        <boxGeometry args={[0.5, 0.42, 0.005]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.8} roughness={0.1} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, 0.22, 0.64]}>
        <boxGeometry args={[0.42, 0.025, 0.025]} />
        <meshStandardMaterial color="#888" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

function Sink({
  position,
  counterColor,
}: {
  position: [number, number, number]
  counterColor: string
}) {
  return (
    <group position={position}>
      {/* Sink basin (inset) */}
      <mesh position={[0, 0, 0.32]}>
        <boxGeometry args={[0.55, 0.04, 0.4]} />
        <meshStandardMaterial color="#9E9E9E" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.08, 0.32]}>
        <boxGeometry args={[0.45, 0.12, 0.32]} />
        <meshStandardMaterial color="#888" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Faucet */}
      <mesh position={[0, 0.12, 0.18]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.24, 12]} />
        <meshStandardMaterial color="#666" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.24, 0.25]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.018, 0.16, 12]} />
        <meshStandardMaterial color="#666" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function Pendants({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {[-0.7, 0, 0.7].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          {/* Cord */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 1, 6]} />
            <meshStandardMaterial color="#1A1A1A" />
          </mesh>
          {/* Shade */}
          <mesh position={[0, -0.05, 0]} castShadow>
            <coneGeometry args={[0.18, 0.22, 16, 1, true]} />
            <meshStandardMaterial color="#1A1A1A" side={THREE.DoubleSide} />
          </mesh>
          <pointLight position={[0, -0.15, 0]} intensity={0.4} distance={3} color="#FFE9C4" />
        </group>
      ))}
    </group>
  )
}
