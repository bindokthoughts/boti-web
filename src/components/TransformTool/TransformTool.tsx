"use client";

import React, {useEffect, useMemo, useRef, useState} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {OrbitControls, TransformControls} from "@react-three/drei";
import * as THREE from "three";

/**
 * TransformInspector — A reusable inspector to VIEW + UPDATE position & rotation
 * of any 3D object in a React-Three-Fiber (Next.js) scene using Drei's TransformControls.
 *
 * Features
 * - Floating UI with numeric inputs for position (x,y,z) and rotation (deg)
 * - Click/drag gizmo in the viewport (translate/rotate/scale) via Drei TransformControls
 * - Optional snapping, mode switching, space switching, reset, copy/paste
 * - Disables OrbitControls while transforming (pass its ref)
 * - Pure client component; drop into any Next.js app route/page
 *
 * Usage (minimal)
 * ------------------------------------------------------
 * import TransformInspector, {Transformable} from "./TransformInspector";
 *
 * function Example() {
 *   const orbitRef = useRef<any>(null);
 *   return (
 *     <Canvas camera={{ position: [3, 3, 6], fov: 50 }}>
 *       <ambientLight intensity={0.5} />
 *       <directionalLight position={[5, 8, 5]} intensity={1} />
 *       <OrbitControls ref={orbitRef} makeDefault />
 *
 *       <Transformable orbitControlsRef={orbitRef} initial={{ position: [0,0,0], rotationDeg: [0,0,0] }}>
 *         <mesh castShadow receiveShadow>
 *           <boxGeometry args={[1,1,1]} />
 *           <meshStandardMaterial color="#12a39b" />
 *         </mesh>
 *       </Transformable>
 *     </Canvas>
 *   );
 * }
 * ------------------------------------------------------
 */

// ---------- Types ----------
export type Vec3 = [number, number, number];
export type Mode = "translate" | "rotate" | "scale";

export type InspectorProps = {
  /** ref to the target THREE.Object3D */
  target: React.MutableRefObject<THREE.Object3D | null>;
  /** optional OrbitControls ref to auto-disable while dragging */
  orbitControlsRef?: React.MutableRefObject<any | null>;
  /** starting values if target starts at identity */
  initial?: { position?: Vec3; rotationDeg?: Vec3 };
  /** gizmo mode */
  mode?: Mode;
  /** world vs local space for gizmo */
  space?: "world" | "local";
  /** snapping values in world units / degrees (null = off) */
  snap?: { translate?: number | null; rotateDeg?: number | null; scale?: number | null };
  /** called after any change (drag or input) */
  onChange?: (state: { position: Vec3; rotationDeg: Vec3 }) => void;
  /** show/hide the small floating panel */
  panel?: boolean;
};

export default function TransformInspector({
  target,
  orbitControlsRef,
  initial,
  mode = "translate",
  space = "world",
  snap,
  onChange,
  panel = true,
}: InspectorProps) {
  const { camera, gl } = useThree();
  const tRef = useRef<THREE.Object3D | null>(null);
  const [active, setActive] = useState(false);
  const [currMode, setCurrMode] = useState<Mode>(mode);
  const [currSpace, setCurrSpace] = useState<"world" | "local">(space);
  const [p, setP] = useState<Vec3>(initial?.position ?? [0, 0, 0]);
  const [rDeg, setRDeg] = useState<Vec3>(initial?.rotationDeg ?? [0, 0, 0]);

  // Sync incoming initial when it changes
  useEffect(() => {
    if (initial?.position) setP(initial.position);
    if (initial?.rotationDeg) setRDeg(initial.rotationDeg);
  }, [initial?.position?.join(","), initial?.rotationDeg?.join(",")]);

  // Apply UI -> Object
  useEffect(() => {
    const obj = target.current;
    if (!obj) return;
    obj.position.set(p[0], p[1], p[2]);
    obj.rotation.set(THREE.MathUtils.degToRad(rDeg[0]), THREE.MathUtils.degToRad(rDeg[1]), THREE.MathUtils.degToRad(rDeg[2]));
    obj.updateMatrixWorld();
    onChange?.({ position: p, rotationDeg: rDeg });
  }, [p, rDeg]);

  // Object -> UI (when dragged)
  const pullFromObject = () => {
    const obj = target.current;
    if (!obj) return;
    const pos: Vec3 = [obj.position.x, obj.position.y, obj.position.z];
    const rot: Vec3 = [obj.rotation.x, obj.rotation.y, obj.rotation.z].map(THREE.MathUtils.radToDeg) as Vec3;
    setP(pos);
    setRDeg(rot);
    onChange?.({ position: pos, rotationDeg: rot });
  };

  // Handle orbit disable while using gizmo
  useEffect(() => {
    if (!orbitControlsRef?.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (orbitControlsRef.current as any).enabled = !active;
  }, [active, orbitControlsRef?.current]);

  // Keyboard helpers: 1/2/3 to switch modes, X switches space, R resets
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === "INPUT") return;
      if (e.key === "1") setCurrMode("translate");
      if (e.key === "2") setCurrMode("rotate");
      if (e.key === "3") setCurrMode("scale");
      if (e.key.toLowerCase() === "x") setCurrSpace((s) => (s === "world" ? "local" : "world"));
      if (e.key.toLowerCase() === "r") {
        setP(initial?.position ?? [0, 0, 0]);
        setRDeg(initial?.rotationDeg ?? [0, 0, 0]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [initial?.position?.join(","), initial?.rotationDeg?.join(",")]);

  // Keep UI in sync even if something else moves the object each frame
  useFrame(() => {
    if (!target.current) return;
    // Only pull when not actively dragging to avoid jitter
    if (!active) {
      const obj = target.current;
      if (!obj) return;
      const pos = obj.position;
      const rot = obj.rotation;
      if (
        Math.abs(pos.x - p[0]) > 1e-6 ||
        Math.abs(pos.y - p[1]) > 1e-6 ||
        Math.abs(pos.z - p[2]) > 1e-6 ||
        Math.abs(rot.x - THREE.MathUtils.degToRad(rDeg[0])) > 1e-6 ||
        Math.abs(rot.y - THREE.MathUtils.degToRad(rDeg[1])) > 1e-6 ||
        Math.abs(rot.z - THREE.MathUtils.degToRad(rDeg[2])) > 1e-6
      ) {
        pullFromObject();
      }
    }
  });

  return (
    <>
      {/* Drei TransformControls gizmo */}
      {target.current && (
        <TransformControls
          ref={tRef as any}
          object={target.current!}
          mode={currMode}
          space={currSpace}
          camera={camera}
          domElement={gl.domElement}
          enabled
          onMouseDown={() => setActive(true)}
          onMouseUp={() => setActive(false)}
          onChange={() => pullFromObject()}
          translationSnap={snap?.translate ?? undefined}
          rotationSnap={snap?.rotateDeg ? THREE.MathUtils.degToRad(snap.rotateDeg) : undefined}
          scaleSnap={snap?.scale ?? undefined}
        />
      )}

      {/* Minimal floating panel */}
      {panel && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            padding: 12,
            background: "rgba(20,20,25,0.9)",
            borderRadius: 12,
            color: "#fff",
            fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
            fontSize: 12,
            display: "grid",
            gap: 8,
            width: 280,
            boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ fontSize: 13 }}>Transform Inspector</strong>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => setCurrMode("translate")} style={btn(currMode === "translate")}>T</button>
              <button onClick={() => setCurrMode("rotate")} style={btn(currMode === "rotate")}>R</button>
              <button onClick={() => setCurrMode("scale")} style={btn(currMode === "scale")}>S</button>
              <button onClick={() => setCurrSpace((s)=> (s === "world" ? "local" : "world"))} style={btn(false)}>
                {currSpace === "world" ? "World" : "Local"}
              </button>
            </div>
          </div>

          <Row label="Position">
            <XYZInputs values={p} onChange={setP} step={0.1} />
          </Row>
          <Row label="Rotation (deg)">
            <XYZInputs values={rDeg} onChange={setRDeg} step={1} />
          </Row>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={fullBtn}
              onClick={() => {
                setP([0, 0, 0]);
                setRDeg([0, 0, 0]);
              }}
            >
              Reset
            </button>
            <button
              style={fullBtn}
              onClick={() => {
                navigator.clipboard?.writeText(
                  JSON.stringify({ position: p, rotationDeg: rDeg }, null, 2)
                );
              }}
            >
              Copy
            </button>
            <button
              style={fullBtn}
              onClick={async () => {
                const txt = await navigator.clipboard.readText();
                try {
                  const data = JSON.parse(txt);
                  if (Array.isArray(data.position)) setP(data.position as Vec3);
                  if (Array.isArray(data.rotationDeg)) setRDeg(data.rotationDeg as Vec3);
                } catch {}
              }}
            >
              Paste
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ---------- Small helpers ----------
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div style={{ opacity: 0.7 }}>{label}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>{children}</div>
    </div>
  );
}

function XYZInputs({
  values,
  onChange,
  step = 0.1,
}: {
  values: Vec3;
  onChange: (v: Vec3) => void;
  step?: number;
}) {
  const [x, y, z] = values;
  const upd = (i: number, val: number) => {
    const next: Vec3 = [x, y, z];
    next[i] = val;
    onChange(next);
  };
  return (
    <>
      <NumInput value={x} step={step} onChange={(v) => upd(0, v)} label="X" />
      <NumInput value={y} step={step} onChange={(v) => upd(1, v)} label="Y" />
      <NumInput value={z} step={step} onChange={(v) => upd(2, v)} label="Z" />
    </>
  );
}

function NumInput({
  value,
  onChange,
  step,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  step?: number;
  label?: string;
}) {
  return (
    <label style={{ display: "grid", gridTemplateColumns: "18px 1fr", alignItems: "center", gap: 6 }}>
      <span style={{ opacity: 0.65 }}>{label}</span>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          width: "100%",
          padding: "6px 8px",
          background: "#0f1220",
          border: "1px solid #2b2e3a",
          borderRadius: 8,
          color: "#fff",
          outline: "none",
        }}
      />
    </label>
  );
}

const btn = (active: boolean) => ({
  padding: "6px 8px",
  borderRadius: 8,
  border: "1px solid #2b2e3a",
  background: active ? "#2b89ff" : "#0f1220",
  color: active ? "#fff" : "#ccd7ff",
  fontSize: 11,
  cursor: "pointer",
});

const fullBtn: React.CSSProperties = {
  flex: 1,
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid #2b2e3a",
  background: "#0f1220",
  color: "#ccd7ff",
  fontSize: 12,
  cursor: "pointer",
};

// ---------- Convenience wrapper: Transformable ----------
// Wrap your object(s) with this to get gizmo + panel without managing refs.
export function Transformable({
  children,
  orbitControlsRef,
  initial,
  mode,
  space,
  snap,
  onChange,
  panel,
}: React.PropsWithChildren<{
  orbitControlsRef?: React.MutableRefObject<any | null>;
  initial?: { position?: Vec3; rotationDeg?: Vec3 };
  mode?: Mode;
  space?: "world" | "local";
  snap?: { translate?: number | null; rotateDeg?: number | null; scale?: number | null };
  onChange?: (state: { position: Vec3; rotationDeg: Vec3 }) => void;
  panel?: boolean;
}>) {
  const groupRef = useRef<THREE.Group | null>(null);

  // Ensure group exists & initial transform applied immediately
  useEffect(() => {
    if (!groupRef.current) return;
    if (initial?.position) groupRef.current.position.fromArray(initial.position);
    if (initial?.rotationDeg) {
      const [x, y, z] = initial.rotationDeg.map(THREE.MathUtils.degToRad) as Vec3;
      groupRef.current.rotation.set(x, y, z);
    }
  }, []);

  return (
    <>
      <group ref={groupRef}>{children}</group>
      <TransformInspector
        target={groupRef as any}
        orbitControlsRef={orbitControlsRef}
        initial={initial}
        mode={mode}
        space={space}
        snap={snap}
        onChange={onChange}
        panel={panel}
      />
    </>
  );
}

/*
Notes & Tips
- There is no *inbuilt* three.js GUI to edit transforms. The common options are:
  - drei/TransformControls (this file uses it) for viewport manipulation.
  - External UIs like Leva or Dat.GUI for numeric inputs. Here we ship a minimal custom panel to avoid extra deps.
- If you already use <OrbitControls makeDefault />, pass its ref to TransformInspector/Transformable.
- Snapping example: snap={{ translate: 0.5, rotateDeg: 15, scale: 0.1 }}
- Persisting values: use the onChange callback to save into your app state or localStorage.
*/

// ============================================================================
// OPTIONAL: LEVA-BASED INSPECTOR (Leva ^0.10 compatible)
// Install: npm i leva
// ============================================================================
import { Leva, useControls } from "leva";

export function LevaTransformInspector({
  target,
  orbitControlsRef,
  initial,
  snap = { translate: 0.1, rotateDeg: 1, scale: 0.1 },
  withGizmo = true,
  onChange,
}: {
  target: React.MutableRefObject<THREE.Object3D | null>;
  orbitControlsRef?: React.MutableRefObject<any | null>;
  initial?: { position?: Vec3; rotationDeg?: Vec3 };
  snap?: { translate?: number | null; rotateDeg?: number | null; scale?: number | null };
  withGizmo?: boolean;
  onChange?: (state: { position: Vec3; rotationDeg: Vec3 }) => void;
}) {
  const { camera, gl } = useThree();
  const gizmoRef = useRef<any>(null);
  const [active, setActive] = useState(false);

  const controls = useControls("Transform", {
    posX: { value: initial?.position?.[0] ?? 0, step: snap.translate ?? 0.1 },
    posY: { value: initial?.position?.[1] ?? 0, step: snap.translate ?? 0.1 },
    posZ: { value: initial?.position?.[2] ?? 0, step: snap.translate ?? 0.1 },
    rotX: { value: initial?.rotationDeg?.[0] ?? 0, step: snap.rotateDeg ?? 1 },
    rotY: { value: initial?.rotationDeg?.[1] ?? 0, step: snap.rotateDeg ?? 1 },
    rotZ: { value: initial?.rotationDeg?.[2] ?? 0, step: snap.rotateDeg ?? 1 },
  });

  const { posX, posY, posZ, rotX, rotY, rotZ } = controls;

  // Apply UI -> Object
  useEffect(() => {
    const obj = target.current;
    if (!obj) return;
    obj.position.set(posX, posY, posZ);
    obj.rotation.set(
      THREE.MathUtils.degToRad(rotX),
      THREE.MathUtils.degToRad(rotY),
      THREE.MathUtils.degToRad(rotZ)
    );
    obj.updateMatrixWorld();
    onChange?.({ position: [posX, posY, posZ], rotationDeg: [rotX, rotY, rotZ] });
  }, [posX, posY, posZ, rotX, rotY, rotZ, onChange]);

  useEffect(() => {
    if (!orbitControlsRef?.current) return;
    orbitControlsRef.current.enabled = !active;
  }, [active, orbitControlsRef]);

  return (
    withGizmo && target.current ? (
      <TransformControls
        ref={gizmoRef}
        object={target.current}
        camera={camera}
        domElement={gl.domElement}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
        translationSnap={snap?.translate ?? undefined}
        rotationSnap={snap?.rotateDeg ? THREE.MathUtils.degToRad(snap.rotateDeg) : undefined}
        scaleSnap={snap?.scale ?? undefined}
      />
    ) : null
  );
}

export function LevaTransformable({
  children,
  orbitControlsRef,
  initial,
  snap,
  withGizmo = true,
  onChange,
}: React.PropsWithChildren<{
  orbitControlsRef?: React.MutableRefObject<any | null>;
  initial?: { position?: Vec3; rotationDeg?: Vec3 };
  snap?: { translate?: number | null; rotateDeg?: number | null; scale?: number | null };
  withGizmo?: boolean;
  onChange?: (state: { position: Vec3; rotationDeg: Vec3 }) => void;
}>) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    if (initial?.position) groupRef.current.position.fromArray(initial.position);
    if (initial?.rotationDeg) {
      const [x, y, z] = initial.rotationDeg.map(THREE.MathUtils.degToRad) as Vec3;
      groupRef.current.rotation.set(x, y, z);
    }
  }, [initial]);

  return (
    <>
      <group ref={groupRef}>
        {children}
      </group>
      <LevaTransformInspector
        target={groupRef as any}
        orbitControlsRef={orbitControlsRef}
        initial={initial}
        snap={snap}
        withGizmo={withGizmo}
        onChange={onChange}
      />
    </>
  );
}

/*
Usage Example:
------------------------------------------------------
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { LevaTransformable } from "./TransformTool";

function Example() {
  const orbitRef = useRef<any>(null);
  return (
    <Canvas camera={{ position: [3, 3, 6], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5,8,5]} intensity={1} />
      <OrbitControls ref={orbitRef} makeDefault />

      <LevaTransformable 
        orbitControlsRef={orbitRef} 
        initial={{ position: [0,0,0], rotationDeg: [0,0,0] }} 
        withGizmo
      >
        <mesh>
          <boxGeometry args={[1,1,1]} />
          <meshStandardMaterial color="#e07a5f" />
        </mesh>
      </LevaTransformable>
    </Canvas>
  );
}
*/
