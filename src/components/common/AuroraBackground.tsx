export default function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute right-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[30%] h-[520px] w-[520px] rounded-full bg-sky-400/10 blur-[140px]" />
    </div>
  );
}