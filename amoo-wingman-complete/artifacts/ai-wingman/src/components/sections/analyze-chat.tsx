import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReplyOption {
  type: string;
  reply: string;
  why: string;
}

interface AnalysisResult {
  detectedLanguage: string;
  vibe: string;
  replies: ReplyOption[];
}

const replyColors = [
  { border: "border-primary", label: "bg-primary", text: "text-primary", glow: "box-glow" },
  { border: "border-secondary", label: "bg-secondary", text: "text-secondary", glow: "box-glow-secondary" },
  { border: "border-accent", label: "bg-accent", text: "text-accent", glow: "" },
];

const replyIcons = ["01", "02", "03"];

export function AnalyzeChat() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(selected: File) {
    setFile(selected);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selected);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const selected = e.dataTransfer.files?.[0];
    if (selected && selected.type.startsWith("image/")) handleFile(selected);
  }

  async function analyze() {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
     const res = await fetch("https://wingman-api-us.onrender.com/api/analyze", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <section id="analyze" className="py-24 relative bg-background border-t border-primary/20 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[200px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-primary/30 bg-primary/10 pixel-corners">
              <div className="w-2 h-2 bg-primary animate-pulse pixel-corners" />
              <span className="text-xs text-primary font-pixel tracking-widest">WINGMAN_MODULE_ACTIVE</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-pixel mb-4 text-glow uppercase">Analyze Chat</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload a chat screenshot. Your Amoo Wingman will detect the vibe and generate 3 strategic reply options.
            </p>
          </div>

          <div className="bg-card border-2 border-card-border pixel-corners p-8 relative">
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-secondary" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-secondary" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-secondary" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-secondary" />

            {!preview ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={`relative border-2 border-dashed transition-colors cursor-pointer pixel-corners p-12 flex flex-col items-center justify-center gap-4 
                  ${dragOver ? "border-secondary bg-secondary/10" : "border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5"}`}
              >
                <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onInputChange} />

                <div className="w-16 h-16 border-2 border-primary pixel-corners flex items-center justify-center box-glow">
                  <div className="flex flex-col gap-1 items-center">
                    <div className="w-6 h-1 bg-primary pixel-corners" />
                    <div className="w-1 h-6 bg-primary pixel-corners" />
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-pixel text-sm text-foreground mb-1">DROP_SCREENSHOT_HERE</p>
                  <p className="text-xs text-muted-foreground">or click to browse &mdash; PNG, JPG, WEBP</p>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="h-px w-12 bg-border" />
                  <span className="text-xs font-pixel text-muted-foreground">MAX 10MB</span>
                  <div className="h-px w-12 bg-border" />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative border-2 border-primary/30 pixel-corners overflow-hidden">
                  <img src={preview} alt="Chat screenshot" className="w-full max-h-64 object-contain bg-muted/10" />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={reset}
                      className="text-[10px] font-pixel text-foreground bg-background border border-border px-2 py-1 pixel-corners hover:border-destructive hover:text-destructive transition-colors"
                    >
                      [X] CLEAR
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary animate-pulse pixel-corners" />
                  <span className="text-xs text-muted-foreground font-pixel truncate">{file?.name}</span>
                </div>

                <motion.button
                  onClick={analyze}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full py-4 bg-primary text-primary-foreground font-pixel text-sm uppercase tracking-wider pixel-corners box-glow hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-primary-foreground pixel-corners"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                      <span>ANALYZING...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyze Chat &gt;</span>
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 border-2 border-destructive bg-destructive/10 pixel-corners flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-destructive pixel-corners flex-shrink-0" />
                <p className="text-sm text-destructive font-pixel">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 space-y-6"
              >
                <div className="bg-card border border-secondary/30 pixel-corners p-5 flex flex-col sm:flex-row gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-2 h-2 bg-secondary pixel-corners mt-1 flex-shrink-0 box-glow-secondary" />
                    <div>
                      <span className="text-xs font-pixel text-secondary tracking-widest block mb-1">LANGUAGE_DETECTED</span>
                      <span className="text-sm text-foreground">{result.detectedLanguage}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-2 h-2 bg-primary pixel-corners mt-1 flex-shrink-0 box-glow" />
                    <div>
                      <span className="text-xs font-pixel text-primary tracking-widest block mb-1">CONVERSATION_VIBE</span>
                      <span className="text-sm text-muted-foreground">{result.vibe}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.replies.map((reply, idx) => {
                    const colors = replyColors[idx] ?? replyColors[0];
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.15 }}
                        className={`bg-card border-2 ${colors.border} pixel-corners p-5 flex flex-col gap-4 relative overflow-hidden group`}
                      >
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />

                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-pixel ${colors.text} px-2 py-1 border ${colors.border} bg-card pixel-corners`}>
                            [{replyIcons[idx]}]
                          </span>
                          <span className={`text-[9px] font-pixel ${colors.text} tracking-widest uppercase`}>
                            {reply.type}
                          </span>
                        </div>

                        <div className={`border-l-2 ${colors.border} pl-3`}>
                          <p className="text-sm text-foreground leading-relaxed">"{reply.reply}"</p>
                        </div>

                        <div className="mt-auto pt-3 border-t border-border/50">
                          <p className="text-xs font-pixel text-muted-foreground mb-1 tracking-wider">WHY:</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{reply.why}</p>
                        </div>

                        <button
                          onClick={() => navigator.clipboard.writeText(reply.reply)}
                          className={`text-[10px] font-pixel ${colors.text} border ${colors.border} px-3 py-1.5 pixel-corners hover:opacity-80 transition-opacity w-full text-center`}
                        >
                          COPY_REPLY
                        </button>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    onClick={reset}
                    className="text-xs font-pixel text-muted-foreground hover:text-primary transition-colors border border-border hover:border-primary px-4 py-2 pixel-corners"
                  >
                    ANALYZE_NEW_SCREENSHOT
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
