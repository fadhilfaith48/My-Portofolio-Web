// Shown while the 3D chunk loads and whenever WebGL is unavailable. The real
// aurora/snow background still renders behind this, so the page never looks
// broken — the fallback only adds a soft themed glow where the keyboard would
// be, instead of a flat empty rectangle.
export default function SceneFallback() {
  return (
    <div className="scene-fallback absolute inset-0" aria-hidden>
      <div className="scene-fallback__glow" />
    </div>
  );
}
