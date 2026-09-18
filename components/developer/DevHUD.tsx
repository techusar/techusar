'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import {
  Terminal,
  Activity,
  Sliders,
  Volume2,
  VolumeX,
  X,
  Code2,
  Zap,
  Layers,
  Sparkles,
  Check,
  Copy,
  Flame,
  Shield,
  Send,
  Compass
} from 'lucide-react';

interface CommandOutput {
  id: string;
  command: string;
  response: React.ReactNode;
  timestamp: string;
}

export function DevHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'terminal' | 'telemetry' | 'wireframe' | 'api'>('terminal');
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      command: 'techusar --version',
      response: 'TechUsar Architecture Engine v2.4.0 (Next.js 15.5 • React 19 • TypeScript 5.7 • Tailwind v4)',
      timestamp: '00:00:01',
    },
    {
      id: 'init-2',
      command: 'status',
      response: (
        <div className="space-y-1 text-[11px]">
          <div className="text-emerald-400 font-semibold">● SYSTEM METRICS: OPTIMAL</div>
          <div className="text-neutral-400">Design Fidelity: 100% Vector Precision | Architecture: Edge-Distributed</div>
          <div className="text-neutral-400">Type <span className="text-blue-400 font-bold">&quot;help&quot;</span> to view available developer commands.</div>
        </div>
      ),
      timestamp: '00:00:02',
    },
  ]);

  // Telemetry metrics
  const [fps, setFps] = useState(60);
  const [domNodes, setDomNodes] = useState(0);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [wireframeActive, setWireframeActive] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [copiedApi, setCopiedApi] = useState(false);

  const { theme, setTheme } = useTheme();
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Audio Context for mechanical clicks
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClickSound = () => {
    if (!soundActive) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // audioContext not allowed or silent
    }
  };

  // FPS calculation loop
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Update viewport & DOM nodes
  useEffect(() => {
    const updateStats = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
      setDomNodes(document.getElementsByTagName('*').length);
    };

    updateStats();
    window.addEventListener('resize', updateStats);
    const interval = setInterval(updateStats, 3000);
    return () => {
      window.removeEventListener('resize', updateStats);
      clearInterval(interval);
    };
  }, []);

  // Keyboard shortcut listener (`~` or backtick or Alt+D)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) ||
        (e.altKey && e.key.toLowerCase() === 'd')
      ) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    const handleToggleHud = () => setIsOpen((prev) => !prev);
    window.addEventListener('keydown', handleKey);
    window.addEventListener('toggle-dev-hud', handleToggleHud);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('toggle-dev-hud', handleToggleHud);
    };
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (isOpen && activeTab === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [outputs, isOpen, activeTab]);

  // Wireframe toggle effect
  useEffect(() => {
    if (wireframeActive) {
      document.body.classList.add('debug-wireframe');
    } else {
      document.body.classList.remove('debug-wireframe');
    }
    return () => {
      document.body.classList.remove('debug-wireframe');
    };
  }, [wireframeActive]);

  // Command handler
  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    playClickSound();
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInputVal('');

    const now = new Date().toTimeString().split(' ')[0];
    const lower = cmd.toLowerCase();

    let res: React.ReactNode = '';

    if (lower === 'help') {
      res = (
        <div className="space-y-1.5 text-[11px] text-neutral-300">
          <div className="text-blue-400 font-bold uppercase tracking-wider">Available Dev Commands:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 font-mono text-[11px]">
            <div><span className="text-emerald-400 font-semibold">skills</span> - Full-stack & design stack</div>
            <div><span className="text-emerald-400 font-semibold">theme [dark|light|matrix]</span> - Switch theme</div>
            <div><span className="text-emerald-400 font-semibold">wireframe [on|off]</span> - Toggle X-ray grid</div>
            <div><span className="text-emerald-400 font-semibold">sound [on|off]</span> - Toggle audio haptics</div>
            <div><span className="text-emerald-400 font-semibold">curl profile</span> - Output developer JSON</div>
            <div><span className="text-emerald-400 font-semibold">whoami</span> - Identity & credentials</div>
            <div><span className="text-emerald-400 font-semibold">ping</span> - Measure edge response</div>
            <div><span className="text-emerald-400 font-semibold">clear</span> - Clear terminal screen</div>
          </div>
        </div>
      );
    } else if (lower === 'skills') {
      res = (
        <div className="space-y-2 text-[11px] font-mono">
          <div className="text-purple-400 font-bold uppercase">✦ ARCHITECTURE & DESIGN TAXONOMY:</div>
          <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 space-y-1 text-neutral-300">
            <div><span className="text-blue-400 font-semibold">Frontend:</span> Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion</div>
            <div><span className="text-indigo-400 font-semibold">Backend:</span> Node.js, C# .NET Core, PostgreSQL, REST/GraphQL, Edge Functions</div>
            <div><span className="text-purple-400 font-semibold">Design:</span> Figma Auto-Layout Tokens, Adobe Illustrator Vectors, Typography Systems</div>
            <div><span className="text-emerald-400 font-semibold">Performance:</span> Sub-100ms LCP, Zero-Drift Tokens, WCAG AAA Contrast Compliance</div>
          </div>
        </div>
      );
    } else if (lower.startsWith('theme')) {
      const parts = lower.split(' ');
      const mode = parts[1];
      if (mode === 'dark' || mode === 'light' || mode === 'matrix') {
        setTheme(mode);
        res = <span className="text-emerald-400">✔ Theme switched to &quot;{mode}&quot; mode.</span>;
      } else {
        res = <span className="text-amber-400">Usage: theme dark | theme light | theme matrix</span>;
      }
    } else if (lower.startsWith('wireframe')) {
      const parts = lower.split(' ');
      const arg = parts[1];
      if (arg === 'on') {
        setWireframeActive(true);
        res = <span className="text-emerald-400">✔ CSS Wireframe X-Ray mode activated. Inspect page bounding boxes.</span>;
      } else if (arg === 'off') {
        setWireframeActive(false);
        res = <span className="text-neutral-400">✔ CSS Wireframe X-Ray mode disabled.</span>;
      } else {
        setWireframeActive((prev) => !prev);
        res = <span className="text-blue-400">✔ Toggled CSS Wireframe mode.</span>;
      }
    } else if (lower.startsWith('sound')) {
      const parts = lower.split(' ');
      const arg = parts[1];
      if (arg === 'on') {
        setSoundActive(true);
        res = <span className="text-emerald-400">✔ Synthesizer Audio Haptics enabled. Click buttons to test.</span>;
      } else if (arg === 'off') {
        setSoundActive(false);
        res = <span className="text-neutral-400">✔ Audio Haptics disabled.</span>;
      } else {
        setSoundActive((prev) => !prev);
        res = <span className="text-blue-400">✔ Toggled Audio Haptics.</span>;
      }
    } else if (lower === 'curl profile' || lower === 'curl' || lower === 'api') {
      res = (
        <div className="p-3 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-blue-300 font-mono overflow-x-auto whitespace-pre">
{`{
  "brand": "TechUsar",
  "archetype": "Graphic Designer & Full-Stack Developer",
  "status": "Available for Select Contracts",
  "location": "Global / Remote",
  "stack": {
    "languages": ["TypeScript", "C#", "SQL", "HTML5/CSS3"],
    "frameworks": ["Next.js 15", "React 19", "Tailwind CSS v4"],
    "creative": ["Figma Token Systems", "Adobe Suite", "Vector Geometry"]
  },
  "metrics": {
    "themeDownloads": 15400,
    "uptime": "99.98%",
    "avgLCP": "84ms"
  }
}`}
        </div>
      );
    } else if (lower === 'whoami') {
      res = (
        <span className="text-purple-300 font-semibold">
          TechUsar // Dual-discipline practitioner: Graphic Designer & Full-Stack Web Architect.
        </span>
      );
    } else if (lower === 'ping') {
      res = <span className="text-emerald-400">🏓 Pong! Edge Round-trip Latency: 14.2ms | Cache: HIT</span>;
    } else if (lower === 'clear') {
      setOutputs([]);
      return;
    } else if (lower.includes('sudo') || lower.includes('rm -rf')) {
      res = (
        <span className="text-rose-400 font-semibold">
          ⚠ Permission Denied: Nice try! You are operating within the client-side sandbox container.
        </span>
      );
    } else {
      res = (
        <span className="text-neutral-400">
          Command not recognized: &quot;{cmd}&quot;. Type <strong className="text-blue-400">&quot;help&quot;</strong> for valid developer commands.
        </span>
      );
    }

    setOutputs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmd,
        response: res,
        timestamp: now,
      },
    ]);
  };

  const copyProfileCurl = () => {
    navigator.clipboard.writeText('curl -s https://techusar.dev/api/developer | jq .');
    setCopiedApi(true);
    playClickSound();
    setTimeout(() => setCopiedApi(false), 2000);
  };

  return (
    <>
      {/* Floating Developer Pill Trigger (Bottom-Right) */}
      <div className="fixed bottom-5 right-5 z-40 print:hidden flex items-center gap-2">
        <button
          id="open-dev-hud-btn"
          type="button"
          onClick={() => {
            playClickSound();
            setIsOpen((prev) => !prev);
          }}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full border border-blue-500/40 dark:border-purple-500/50 bg-neutral-950/90 text-white text-xs font-mono backdrop-blur-md shadow-xl hover:border-blue-400 dark:hover:border-purple-400 transition-all duration-200 active:scale-95"
          title="Open Developer HUD Terminal (` or Alt+D)"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-purple-400 transition-colors animate-pulse" />
            <span className="w-3.5 h-3.5 rounded-full bg-blue-500/30 absolute animate-ping" />
          </div>
          <span className="font-bold tracking-wider text-blue-400 group-hover:text-purple-300 transition-colors">
            DEV HUD
          </span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400 border border-neutral-700 hidden sm:inline">
            ~ / Alt+D
          </span>
        </button>
      </div>

      {/* Developer HUD Modal Drawer */}
      {isOpen && (
        <div
          id="dev-hud-backdrop"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div
            id="dev-hud-drawer"
            className="w-full sm:max-w-3xl h-[85vh] sm:h-[620px] bg-[#07090e] border border-blue-500/30 dark:border-purple-500/40 sm:rounded-2xl shadow-2xl flex flex-col text-neutral-100 font-mono text-xs overflow-hidden animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-950">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 cursor-pointer" onClick={() => setIsOpen(false)} />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span className="gradient-text-blue-purple font-extrabold">TECHUSAR DEV-HUD</span>
                  <span className="text-[10px] text-neutral-500 font-normal">v2.4.0 (Edge Node)</span>
                </div>
              </div>

              {/* Top Navigation Tabs */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setActiveTab('terminal');
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-colors flex items-center gap-1.5 ${
                    activeTab === 'terminal'
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  <span>Terminal</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setActiveTab('telemetry');
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-colors flex items-center gap-1.5 ${
                    activeTab === 'telemetry'
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Activity className="w-3 h-3" />
                  <span>Telemetry</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setActiveTab('wireframe');
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-colors flex items-center gap-1.5 ${
                    activeTab === 'wireframe'
                      ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>X-Ray</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded text-neutral-400 hover:text-white transition-colors ml-2"
                  aria-label="Close HUD"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Diagnostic Tickers */}
            <div className="px-4 py-2 border-b border-neutral-800/80 bg-neutral-950/60 flex flex-wrap items-center justify-between text-[11px] text-neutral-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${fps >= 50 ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span>FPS: <strong className="text-white font-mono">{fps}</strong></span>
                </span>
                <span>DOM Nodes: <strong className="text-white font-mono">{domNodes}</strong></span>
                <span>Viewport: <strong className="text-white font-mono">{viewport.w}×{viewport.h}</strong></span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSoundActive((prev) => !prev);
                    playClickSound();
                  }}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded border transition-colors ${
                    soundActive
                      ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400'
                      : 'border-neutral-800 text-neutral-500 hover:text-neutral-300'
                  }`}
                  title="Toggle Web Audio clicks"
                >
                  {soundActive ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                  <span>{soundActive ? 'SFX ON' : 'SFX OFF'}</span>
                </button>

                <span className="text-[10px] text-neutral-500 uppercase">
                  Theme: <strong className="text-blue-400">{theme}</strong>
                </span>
              </div>
            </div>

            {/* Body Tabs */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono">
              {activeTab === 'terminal' && (
                <div className="space-y-4">
                  {/* Outputs */}
                  <div className="space-y-3">
                    {outputs.map((item) => (
                      <div key={item.id} className="space-y-1">
                        <div className="flex items-center gap-2 text-neutral-500 text-[10px]">
                          <span className="text-blue-400 font-bold">techusar@edge:~$</span>
                          <span className="text-neutral-200 font-semibold">{item.command}</span>
                          <span className="ml-auto opacity-40">{item.timestamp}</span>
                        </div>
                        <div className="pl-4 border-l-2 border-neutral-800 text-neutral-300">
                          {item.response}
                        </div>
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleCommand} className="pt-2 flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">techusar@edge:~$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder="Type a command (e.g., 'help', 'skills', 'theme matrix', 'curl profile')..."
                      className="flex-1 bg-transparent border-none outline-hidden text-neutral-100 placeholder:text-neutral-600 font-mono text-xs focus:ring-0"
                    />
                    <button
                      type="submit"
                      className="p-1 rounded bg-blue-600/40 text-blue-300 hover:bg-blue-600 hover:text-white transition-colors"
                      title="Run Command"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'telemetry' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 space-y-1">
                      <div className="text-[10px] text-neutral-500 uppercase">LCP Benchmark</div>
                      <div className="text-2xl font-bold font-mono text-emerald-400">84 ms</div>
                      <p className="text-[10px] text-neutral-400">Core Web Vitals Top 1%</p>
                    </div>

                    <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 space-y-1">
                      <div className="text-[10px] text-neutral-500 uppercase">Framework Engine</div>
                      <div className="text-2xl font-bold font-mono text-blue-400">Next.js 15</div>
                      <p className="text-[10px] text-neutral-400">React Server Components</p>
                    </div>

                    <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 space-y-1">
                      <div className="text-[10px] text-neutral-500 uppercase">CSS Compiler</div>
                      <div className="text-2xl font-bold font-mono text-purple-400">Tailwind v4</div>
                      <p className="text-[10px] text-neutral-400">Zero-Runtime Overhead</p>
                    </div>
                  </div>

                  {/* Active Palette Tokens */}
                  <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-300">
                      <span>ACTIVE BRAND CSS VARIABLES</span>
                      <span className="text-blue-400 text-[10px]">Computed in DOM</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                      <div className="p-2.5 rounded bg-black border border-neutral-800 space-y-1">
                        <div className="w-full h-3 rounded bg-blue-600" />
                        <div className="text-neutral-400 text-[10px]">--accent-blue</div>
                        <div className="font-semibold text-white">#2563eb / #3b82f6</div>
                      </div>

                      <div className="p-2.5 rounded bg-black border border-neutral-800 space-y-1">
                        <div className="w-full h-3 rounded bg-purple-600" />
                        <div className="text-neutral-400 text-[10px]">--accent-purple</div>
                        <div className="font-semibold text-white">#7c3aed / #a855f7</div>
                      </div>

                      <div className="p-2.5 rounded bg-black border border-neutral-800 space-y-1">
                        <div className="w-full h-3 rounded bg-[#050508] border border-neutral-700" />
                        <div className="text-neutral-400 text-[10px]">--bg-primary (Dark)</div>
                        <div className="font-semibold text-white">#050508 (Obsidian)</div>
                      </div>

                      <div className="p-2.5 rounded bg-black border border-neutral-800 space-y-1">
                        <div className="w-full h-3 rounded bg-white" />
                        <div className="text-neutral-400 text-[10px]">--bg-primary (Light)</div>
                        <div className="font-semibold text-white">#ffffff (Snow)</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wireframe' && (
                <div className="space-y-6">
                  <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <Layers className="w-4 h-4 text-emerald-400" />
                          <span>CSS Wireframe / X-Ray Layout Inspector</span>
                        </h3>
                        <p className="text-xs text-neutral-400">
                          Toggle neon bounding boxes across all DOM containers, buttons, and sections to inspect geometric alignment and padding rhythm.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setWireframeActive((prev) => !prev);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          wireframeActive
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                            : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                        }`}
                      >
                        {wireframeActive ? 'WIREFRAME: ACTIVE' : 'ENABLE WIREFRAME'}
                      </button>
                    </div>

                    <div className="pt-2 text-[11px] text-neutral-400 space-y-1 border-t border-neutral-800">
                      <div>• Cyan 1px outlines = Generic layout elements & grid columns</div>
                      <div>• Purple dashed lines = Full-width page sections</div>
                      <div>• Green 1px solid lines = Interactive links, buttons, and form inputs</div>
                    </div>
                  </div>

                  {/* Developer API Curl Card */}
                  <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-200">DEVELOPER API ENDPOINT</span>
                      <button
                        type="button"
                        onClick={copyProfileCurl}
                        className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:underline"
                      >
                        {copiedApi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedApi ? 'Copied Curl!' : 'Copy cURL'}</span>
                      </button>
                    </div>
                    <div className="p-3 rounded-lg bg-black border border-neutral-800 text-[11px] text-emerald-400 font-mono select-all">
                      curl -s https://techusar.dev/api/developer | jq .
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="px-4 py-2 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-[10px] text-neutral-500">
              <span>Press ` or Alt+D to toggle • Type &quot;help&quot; for CLI options</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Client Engine Ready</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
