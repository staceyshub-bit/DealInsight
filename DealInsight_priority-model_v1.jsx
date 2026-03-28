import { useState } from "react";

/* ── brand tokens ── */
const C = {
  pink: "#D4537E", amber: "#EF9F27", purple: "#7F77DD", teal: "#1D9E75",
  bg: "#F8F7F4", midnight: "#1B1F3B", muted: "#777", border: "#E5E7EB",
  cardBg: "#FFFFFF",
};
function scoreColor(s) {
  if (s >= 80) return C.teal;
  if (s >= 60) return C.purple;
  if (s >= 40) return C.amber;
  return C.pink;
}

/* ── evidence labels ── */
const EV_LABEL = {
  Assertion: "REP ASSERTION",
  Quote: "PROSPECT QUOTE",
  Quantified: "QUANTIFIED",
  "Decision Indicator": "DECISION INDICATOR",
};

/* ── sample analysis ── */
const SAMPLE = JSON.stringify({
  "signals": [
    {"name":"The Pain","score":74,"statements":[
      {"text":"Reps flying blind with spreadsheets and Salesforce nobody trusts","evidence_type":"Quote"},
      {"text":"VP Sales spends 4-5 hours weekly rebuilding forecast manually","evidence_type":"Quantified"},
      {"text":"Missed forecast by 18% last quarter, delayed warehouse expansion","evidence_type":"Quantified"}
    ]},
    {"name":"The Payoff","score":52,"statements":[
      {"text":"Real-time pipeline health so reps know which deals to focus on","evidence_type":"Quote"},
      {"text":"Recover 3-4 hours per rep per week","evidence_type":"Quantified"},
      {"text":"CRM updates without it feeling like homework","evidence_type":"Quote"}
    ]},
    {"name":"The People","score":58,"statements":[
      {"text":"Sarah Chen, VP Ops, is the champion driving evaluation","evidence_type":"Quote"},
      {"text":"CFO David Park must sign off on anything over 50K annually","evidence_type":"Quote"},
      {"text":"David has not directly participated in any conversation","evidence_type":"Assertion"},
      {"text":"IT Director James Walsh needed for technical review","evidence_type":"Quote"}
    ]},
    {"name":"The Process","score":45,"statements":[
      {"text":"Want decision by end of April before Q3 planning","evidence_type":"Quote"},
      {"text":"Next step is demo with the full team next week","evidence_type":"Quote"},
      {"text":"No procurement path or approval milestones defined","evidence_type":"Assertion"}
    ]}
  ],
  "deal_score":58,"deal_score_rationale":"Pain is real and quantified but you don't have a buyer or a path to close.",
  "confidence":42,"confidence_rationale":"Strong champion, no buyer in the deal, no decision step scheduled.",
  "velocity":55,"velocity_rationale":"April deadline stated but nothing on the calendar moves this toward a signature.",
  "value":48,"value_rationale":"Hours quantified, dollars not. The 18% forecast miss has no price tag yet.",
  "gaps":[
    {"title":"Economic buyer not engaged","signal":"The People","description":"David Park is named as budget authority but has not participated in any conversation or been scheduled to.","suggested_language":["Sarah, what would it take to get 20 minutes with David before we scope the pilot?","Would David want to see the forecast accuracy data before your team demo, or after?"]},
    {"title":"Team demo is not a decision step","signal":"The Process","description":"Demo with the full team is evaluation, not procurement. No approval criteria or procurement milestones defined.","suggested_language":["What happens after the team sees it? Walk me through the steps between demo and a signed agreement.","Is there a formal approval process, or is this David's call once you and Mike recommend?"]},
    {"title":"Pain not quantified in dollars","signal":"The Pain","description":"18% forecast miss and delayed warehouse expansion are strong but the dollar impact is unstated.","suggested_language":["What did that warehouse delay cost the business?","If forecast accuracy improved by even half, what does that mean in revenue you can plan around?"]}
  ],
  "decision_layer":{"status":"Pipeline","why":"David Park controls the budget but hasn't shown up to a single conversation. The only next step is a team demo with no decision criteria or defined path to a purchase.","next_step":"Do not run that team demo until you've sat down with David Park. Call Sarah today, use the 18% forecast miss to get the meeting, and ask David what he needs to sign off by end of April."}
}, null, 2);

/* ── sub-components ── */
function SignalBar({ score }) {
  const c = scoreColor(score);
  return (
    <div style={{ flex: 1, height: 8, borderRadius: 4, background: "#E8E8E4", overflow: "hidden" }}>
      <div style={{
        width: `${score}%`, height: "100%", borderRadius: 4,
        background: `linear-gradient(to right, ${c}66, ${c})`,
        transition: "width .6s ease",
      }} />
    </div>
  );
}

function EvTag({ type }) {
  return (
    <span style={{
      display: "inline-block", fontSize: 9, fontWeight: 700, letterSpacing: ".06em",
      padding: "2px 6px", borderRadius: 3, background: "#F0EFEB", color: C.muted,
      marginRight: 6, verticalAlign: "middle", whiteSpace: "nowrap",
    }}>
      {EV_LABEL[type] || type}
    </span>
  );
}

function Chev({ open }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform .2s", flexShrink: 0 }}>
      <path d="M5 3L9 7L5 11" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Logo() {
  const bars = [
    { color: C.pink, h: 16, o: 0.6 },
    { color: C.amber, h: 26, o: 0.75 },
    { color: C.purple, h: 38, o: 0.85 },
    { color: C.teal, h: 50, o: 1 },
  ];
  return (
    <svg width={60} height={36} viewBox="0 0 60 50">
      {bars.map((b, i) => (
        <rect key={i} x={i * 16} y={50 - b.h} width={12} height={b.h} rx={3} fill={b.color} opacity={b.o} />
      ))}
    </svg>
  );
}

function RainbowBar() {
  return (
    <div style={{
      height: 4, width: "100%",
      background: `linear-gradient(to right, ${C.amber} 20%, ${C.pink} 40%, ${C.purple} 65%, ${C.teal} 90%)`,
      borderRadius: 2,
    }} />
  );
}

/* ════════════════════════════════════════
   MAIN
   ════════════════════════════════════════ */
export default function DealInsightAnalyzer() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [openItem, setOpenItem] = useState(null);

  const toggle = (id) => setOpenItem((s) => s === id ? null : id);

  const renderAnalysis = () => {
    if (!input.trim()) { setError("Paste analysis JSON from Claude"); return; }
    setError(""); setResult(null);
    setOpenItem(null);
    try {
      const parsed = JSON.parse(input.replace(/```json|```/g, "").trim());
      setResult(parsed);
    } catch (e) {
      setError("JSON parse failed. Make sure you pasted the full analysis output from Claude.");
    }
  };

  const F = "'Inter', -apple-system, sans-serif";
  const card = {
    background: C.cardBg, borderRadius: 10, border: `1px solid ${C.border}`, marginBottom: 12,
  };
  const lbl = {
    fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
    color: C.muted, marginBottom: 6,
  };

  return (
    <div style={{ fontFamily: F, background: C.bg, minHeight: "100vh", color: C.midnight }}>

      {/* HEADER */}
      <div style={{ padding: "20px 28px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <Logo />
        <div>
          <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 20, lineHeight: 1 }}>
            <span style={{ color: C.pink }}>deal</span>
            <span style={{ color: C.purple }}>insight</span>
          </div>
          <div style={{ fontSize: 11, color: C.muted, letterSpacing: ".04em", marginTop: 2 }}>
            Pipeline Intelligence
          </div>
        </div>
      </div>
      <div style={{ padding: "10px 28px 0" }}><RainbowBar /></div>

      {/* INPUT */}
      <div style={{ padding: "16px 28px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={lbl}>Paste Analysis JSON from Claude</div>
          <button onClick={() => { setInput(SAMPLE); setResult(null); setError(""); }}
            style={{ fontSize: 11, color: C.purple, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
            Load sample analysis
          </button>
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Paste the JSON analysis output here..."
          rows={8}
          style={{
            width: "100%", padding: "12px 14px", borderRadius: 8, border: `1px solid ${C.border}`,
            fontSize: 13, fontFamily: F, lineHeight: 1.6, resize: "vertical",
            background: "#fff", outline: "none", boxSizing: "border-box",
          }} />
      </div>

      {/* BUTTON */}
      <div style={{ padding: "16px 28px 0" }}>
        <button onClick={renderAnalysis} style={{
          width: "100%", padding: "12px 0", borderRadius: 8, border: "none",
          background: C.pink, color: "#fff",
          fontSize: 14, fontWeight: 700, cursor: "pointer",
          letterSpacing: ".03em", transition: "background .2s",
        }}>
          Render Analysis
        </button>
        {error && <div style={{ color: C.pink, fontSize: 12, marginTop: 8, fontWeight: 500 }}>{error}</div>}
      </div>

      {/* ═══════ RESULTS ═══════ */}
      {result && (
        <div style={{ padding: "20px 28px 40px" }}>

          {/* SCORES — always visible */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
            {[
              { key: "deal_score", label: "Deal Score", rat: "deal_score_rationale" },
              { key: "confidence", label: "Confidence", rat: "confidence_rationale" },
              { key: "velocity", label: "Velocity", rat: "velocity_rationale" },
              { key: "value", label: "Value", rat: "value_rationale" },
            ].map(({ key, label, rat }) => {
              const val = result[key] ?? 0;
              const sc = scoreColor(val);
              return (
                <div key={key} style={{
                  ...card, textAlign: "center", padding: "20px 12px",
                  borderTop: `3px solid ${sc}`, marginBottom: 0,
                }}>
                  <div style={{ ...lbl, marginBottom: 8 }}>{label}</div>
                  <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1, color: sc, marginBottom: 6 }}>
                    {val}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>
                    {result[rat] || ""}
                  </div>
                </div>
              );
            })}
          </div>

          {/* EVIDENCE — each signal independently expandable */}
          <div style={{ ...lbl, marginTop: 20 }}>Evidence</div>
          {result.signals?.map((sig, i) => {
            const id = "sig-" + i;
            const open = openItem === id;
            const sc = scoreColor(sig.score);
            return (
              <div key={i} style={{
                ...card, padding: 0, overflow: "hidden", cursor: "pointer",
                opacity: openItem && !open ? 0.7 : 1, transition: "opacity .2s",
              }}
                onClick={() => toggle(id)}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, width: 100, flexShrink: 0 }}>{sig.name}</span>
                  <SignalBar score={sig.score} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: sc, width: 36, textAlign: "right" }}>{sig.score}</span>
                  <Chev open={open} />
                </div>
                {open && sig.statements?.length > 0 && (
                  <div style={{ borderTop: `1px solid ${C.border}`, padding: "14px 20px", background: "#FAFAF8" }}>
                    <div style={{ ...lbl, marginBottom: 10 }}>Evidence</div>
                    {sig.statements.map((st, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
                        <EvTag type={st.evidence_type} />
                        <span style={{ fontSize: 13, lineHeight: 1.5 }}>{st.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* WHAT'S MISSING — each gap independently expandable */}
          <div style={{ ...lbl, marginTop: 20 }}>What's Missing</div>
          {result.gaps?.map((gap, i) => {
            const id = "gap-" + i;
            const open = openItem === id;
            return (
              <div key={i} style={{
                ...card, padding: 0, overflow: "hidden", cursor: "pointer",
                opacity: openItem && !open ? 0.7 : 1, transition: "opacity .2s",
              }}
                onClick={() => toggle(id)}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.pink, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{gap.title}</span>
                  <span style={{ fontSize: 11, color: C.muted, fontWeight: 500 }}>{gap.signal}</span>
                  <Chev open={open} />
                </div>
                {open && (
                  <div style={{ borderTop: `1px solid ${C.border}`, padding: "14px 20px", background: "#FAFAF8" }}>
                    <div style={{ fontSize: 13, color: C.muted, marginBottom: 12, lineHeight: 1.5 }}>
                      {gap.description}
                    </div>
                    <div style={{ ...lbl, marginBottom: 8 }}>Suggested Language</div>
                    {gap.suggested_language?.map((q, j) => (
                      <div key={j} style={{
                        fontSize: 13, lineHeight: 1.5, padding: "8px 12px",
                        background: "#fff", borderRadius: 6, border: `1px solid ${C.border}`,
                        marginBottom: 6, fontStyle: "italic",
                      }}>"{q}"</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* DECISION LAYER — compact, at bottom */}
          {result.decision_layer && (() => {
            const dl = result.decision_layer;
            const statusColors = {
              Commit: C.teal, Likely: C.purple, Pipeline: C.amber, Nurture: C.pink, Dead: C.pink,
            };
            const sc = statusColors[dl.status] || C.muted;
            return (
              <div style={{ marginTop: 20, borderRadius: 10, overflow: "hidden", border: `1.5px solid ${C.border}` }}>
                <div style={{
                  background: C.midnight, padding: "12px 20px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                  }}>Decision Layer</span>
                  <span style={{
                    fontSize: 10, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase",
                    padding: "3px 10px", borderRadius: 4,
                    background: sc, color: dl.status === "Dead" ? "#fff" : C.midnight,
                  }}>{dl.status}</span>
                </div>
                <div style={{ padding: "16px 20px", background: "#FAFAF8" }}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
                      color: C.muted, marginBottom: 4,
                    }}>Why</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: "#333" }}>{dl.why}</div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
                      color: C.muted, marginBottom: 4,
                    }}>Do Next</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: C.midnight, fontWeight: 600 }}>{dl.next_step}</div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* LEGEND */}
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 28, fontSize: 11, color: C.muted }}>
            {[
              { c: C.teal, l: "Strong 80-100" },
              { c: C.purple, l: "In Progress 60-79" },
              { c: C.amber, l: "Gaps 40-59" },
              { c: C.pink, l: "Needs Work 0-39" },
            ].map(({ c, l }) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} /> {l}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
