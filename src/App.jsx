import { useState, useEffect, useRef } from "react";

/* ─── BRAND ─────────────────────────────────────────────────────────────── */
const B = {
  black:     "#0D0F0E",
  dark:      "#161A18",
  card:      "#1C211F",
  border:    "#2A3230",
  borderLt:  "#344039",
  grey:      "#8A9E94",
  greyLt:    "#B0C4B8",
  green:     "#4CAF7D",
  greenDark: "#35845C",
  greenGlow: "rgba(76,175,125,0.15)",
  greenDim:  "rgba(76,175,125,0.08)",
  white:     "#F0F5F2",
  offwhite:  "#D8E8DE",
  alert:     "#E07060",
  amber:     "#D4A84B",
  text:      "#E8F0EC",
};

/* ─── GLOBAL CSS ─────────────────────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Epilogue:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: ${B.black}; color: ${B.text}; font-family: 'Epilogue', sans-serif; font-size: 15px; -webkit-font-smoothing: antialiased; }

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: ${B.dark}; }
::-webkit-scrollbar-thumb { background: ${B.border}; border-radius: 2px; }

.app { min-height: 100vh; display: flex; flex-direction: column; background: ${B.black}; }

/* NAV */
.nav {
  background: ${B.dark};
  border-bottom: 1px solid ${B.border};
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 2rem; height: 60px; position: sticky; top: 0; z-index: 200;
}
.logo {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.05rem;
  letter-spacing: 0.08em; text-transform: uppercase; color: ${B.white};
  display: flex; align-items: center; gap: 0.5rem;
}
.logo-dot { color: ${B.green}; }
.logo-sub { font-size: 0.6rem; font-weight: 400; color: ${B.grey}; letter-spacing: 0.12em; text-transform: uppercase; margin-left: 0.1rem; }
.nav-pills { display: flex; gap: 0.25rem; background: ${B.black}; border-radius: 10px; padding: 0.3rem; border: 1px solid ${B.border}; }
.pill { padding: 0.4rem 1.1rem; border-radius: 7px; border: none; background: transparent; color: ${B.grey}; font-family: 'Syne', sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
.pill.active { background: ${B.green}; color: ${B.black}; }
.pill:hover:not(.active) { color: ${B.greyLt}; }
.nav-right { display: flex; align-items: center; gap: 0.75rem; }
.nav-badge { background: ${B.green}; color: ${B.black}; font-size: 0.65rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 99px; font-family: 'Syne', sans-serif; }
.nav-av { width: 32px; height: 32px; border-radius: 50%; background: ${B.greenDark}; border: 2px solid ${B.green}; display: flex; align-items: center; justify-content: center; font-size: 0.72rem; font-weight: 700; color: ${B.white}; font-family: 'Syne', sans-serif; }

/* LAYOUT */
.main { flex: 1; display: flex; }
.sidebar { width: 220px; flex-shrink: 0; background: ${B.dark}; border-right: 1px solid ${B.border}; padding: 1.5rem 0; display: flex; flex-direction: column; gap: 0.25rem; }
.sidebar-section { font-size: 0.62rem; font-family: 'Syne', sans-serif; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${B.grey}; padding: 0.75rem 1.25rem 0.35rem; }
.slink { display: flex; align-items: center; gap: 0.65rem; padding: 0.6rem 1.25rem; margin: 0 0.5rem; border-radius: 8px; cursor: pointer; transition: all 0.15s; color: ${B.grey}; font-size: 0.85rem; font-weight: 400; border: none; background: transparent; width: calc(100% - 1rem); text-align: left; }
.slink:hover { background: ${B.greenDim}; color: ${B.greyLt}; }
.slink.active { background: ${B.greenGlow}; color: ${B.green}; border: 1px solid ${B.border}; }
.slink-icon { font-size: 0.9rem; width: 18px; text-align: center; }

/* CONTENT */
.content { flex: 1; padding: 2rem; overflow-y: auto; max-height: calc(100vh - 60px); }
.ph { font-family: 'Syne', sans-serif; font-size: 1.8rem; font-weight: 700; color: ${B.white}; margin-bottom: 0.2rem; }
.ph em { color: ${B.green}; font-style: normal; }
.psub { font-size: 0.82rem; color: ${B.grey}; margin-bottom: 1.75rem; }

/* CARDS */
.card { background: ${B.card}; border: 1px solid ${B.border}; border-radius: 14px; padding: 1.4rem; }
.card-hd { font-family: 'Syne', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: ${B.greyLt}; margin-bottom: 1.1rem; }
.card + .card { margin-top: 1.1rem; }

/* GRID */
.g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }
.g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.1rem; }
.g4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; }

/* STAT */
.stat { background: ${B.card}; border: 1px solid ${B.border}; border-radius: 14px; padding: 1.1rem 1.25rem; }
.stat-lbl { font-size: 0.68rem; font-family: 'Syne', sans-serif; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: ${B.grey}; margin-bottom: 0.5rem; }
.stat-val { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 700; color: ${B.white}; line-height: 1; }
.stat-unit { font-size: 0.8rem; font-weight: 400; color: ${B.grey}; margin-left: 0.2rem; }
.stat-delta { font-size: 0.75rem; margin-top: 0.3rem; }
.up { color: ${B.green}; }
.dn { color: ${B.alert}; }
.am { color: ${B.amber}; }

/* PROGRESS */
.pl { display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 0.35rem; color: ${B.greyLt}; }
.pt { height: 5px; background: ${B.border}; border-radius: 99px; margin-bottom: 0.85rem; overflow: hidden; }
.pf { height: 100%; border-radius: 99px; }
.p-green { background: ${B.green}; }
.p-amber { background: ${B.amber}; }
.p-alert { background: ${B.alert}; }
.p-grey  { background: ${B.greyLt}; }

/* BADGE */
.badge { display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.18rem 0.65rem; border-radius: 99px; font-size: 0.66rem; font-family: 'Syne', sans-serif; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
.badge-green { background: rgba(76,175,125,0.15); color: ${B.green}; border: 1px solid rgba(76,175,125,0.3); }
.badge-amber { background: rgba(212,168,75,0.15); color: ${B.amber}; border: 1px solid rgba(212,168,75,0.3); }
.badge-red   { background: rgba(224,112,96,0.15); color: ${B.alert}; border: 1px solid rgba(224,112,96,0.3); }

/* TAG */
.tag { display: inline-block; padding: 0.18rem 0.55rem; border-radius: 5px; font-size: 0.68rem; background: ${B.border}; color: ${B.greyLt}; margin: 0.15rem 0.1rem; }

/* BUTTON */
.btn { padding: 0.55rem 1.2rem; border-radius: 8px; border: none; font-family: 'Syne', sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
.btn-g { background: ${B.green}; color: ${B.black}; }
.btn-g:hover { background: #5DC98E; }
.btn-o { background: ${B.border}; color: ${B.greyLt}; }
.btn-o:hover { background: ${B.borderLt}; color: ${B.white}; }
.btn-sm { padding: 0.35rem 0.85rem; font-size: 0.68rem; }
.btn-ghost { background: transparent; border: 1px solid ${B.border}; color: ${B.grey}; }
.btn-ghost:hover { border-color: ${B.green}; color: ${B.green}; }

/* DIVIDER */
.div { height: 1px; background: ${B.border}; margin: 1rem 0; }

/* INPUT */
.inp { width: 100%; background: ${B.black}; border: 1px solid ${B.border}; border-radius: 8px; color: ${B.text}; font-family: 'Epilogue', sans-serif; font-size: 0.85rem; padding: 0.65rem 0.9rem; outline: none; transition: border-color 0.2s; resize: none; }
.inp:focus { border-color: ${B.green}; }
.inp::placeholder { color: ${B.grey}; }

/* FLEX UTILS */
.fb { display: flex; align-items: center; justify-content: space-between; }
.fg { display: flex; align-items: center; gap: 0.6rem; }

/* CLIENT ROW */
.crow { display: flex; align-items: center; gap: 0.85rem; padding: 0.75rem; border-radius: 10px; cursor: pointer; border: 1px solid transparent; transition: all 0.15s; }
.crow:hover { background: ${B.greenDim}; }
.crow.sel { background: ${B.greenGlow}; border-color: ${B.border}; }
.cav { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 0.78rem; font-weight: 700; color: ${B.black}; flex-shrink: 0; }
.cname { font-size: 0.88rem; font-weight: 500; color: ${B.white}; }
.cmeta { font-size: 0.72rem; color: ${B.grey}; }

/* MEAL ROW */
.mrow { display: flex; align-items: center; gap: 0.8rem; padding: 0.65rem 0; border-bottom: 1px solid ${B.border}; }
.mrow:last-child { border-bottom: none; }
.micon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }

/* CHAT */
.chat-wrap { display: flex; flex-direction: column; gap: 0.75rem; max-height: 320px; overflow-y: auto; padding: 0.5rem 0; }
.msg { max-width: 80%; padding: 0.65rem 1rem; border-radius: 12px; font-size: 0.84rem; line-height: 1.5; }
.msg-me { background: ${B.green}; color: ${B.black}; align-self: flex-end; border-bottom-right-radius: 4px; }
.msg-them { background: ${B.border}; color: ${B.text}; align-self: flex-start; border-bottom-left-radius: 4px; }
.msg-ts { font-size: 0.65rem; color: ${B.grey}; margin-top: 0.2rem; }

/* SUPPLEMENT */
.supp { display: flex; align-items: center; gap: 0.85rem; padding: 0.75rem 0; border-bottom: 1px solid ${B.border}; }
.supp:last-child { border-bottom: none; }
.supp-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.supp-name { font-size: 0.88rem; color: ${B.white}; font-weight: 500; }
.supp-time { font-size: 0.74rem; color: ${B.grey}; }
.supp-check { width: 22px; height: 22px; border-radius: 6px; border: 2px solid ${B.border}; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; margin-left: auto; flex-shrink: 0; }
.supp-check.done { background: ${B.green}; border-color: ${B.green}; }

/* AI STREAM */
.ai-box { background: ${B.black}; border: 1px solid ${B.green}; border-radius: 10px; padding: 1rem; font-size: 0.84rem; line-height: 1.7; color: ${B.greyLt}; white-space: pre-wrap; min-height: 60px; position: relative; }
.ai-cursor { display: inline-block; width: 2px; height: 14px; background: ${B.green}; animation: blink 0.8s infinite; vertical-align: middle; margin-left: 1px; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
.ai-loading { display: flex; align-items: center; gap: 0.5rem; color: ${B.grey}; font-size: 0.8rem; }
.dot-pulse span { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${B.green}; animation: pulse 1.2s ease-in-out infinite; margin: 0 2px; }
.dot-pulse span:nth-child(2) { animation-delay: 0.2s; }
.dot-pulse span:nth-child(3) { animation-delay: 0.4s; }
@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }

/* WATER */
.wcup { width: 28px; height: 34px; border-radius: 3px 3px 7px 7px; border: 2px solid ${B.borderLt}; cursor: pointer; transition: all 0.2s; }
.wcup.full { background: ${B.green}; border-color: ${B.greenDark}; }
.wcup:hover { transform: translateY(-2px); }

/* BANNER */
.banner { background: linear-gradient(135deg, ${B.dark} 0%, #1A2C22 100%); border: 1px solid ${B.border}; border-radius: 16px; padding: 1.75rem 2rem; margin-bottom: 1.75rem; position: relative; overflow: hidden; }
.banner::after { content:''; position:absolute; right:-30px; top:-30px; width:180px; height:180px; border-radius:50%; background:${B.greenDim}; }
.banner-title { font-family:'Syne',sans-serif; font-size:1.6rem; font-weight:700; color:${B.white}; margin-bottom:0.25rem; }
.banner-sub { font-size:0.82rem; color:${B.grey}; }
.banner-mark { font-family:'Syne',sans-serif; font-size:0.65rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:${B.green}; margin-bottom:0.4rem; }

/* PLAN DAY */
.pday { background: ${B.black}; border: 1px solid ${B.border}; border-radius: 10px; padding: 0.9rem; }
.pday-lbl { font-size:0.62rem; font-family:'Syne',sans-serif; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:${B.grey}; margin-bottom:0.6rem; }
.pmeal { font-size:0.8rem; padding:0.28rem 0; border-bottom:1px solid ${B.border}; color:${B.greyLt}; }
.pmeal:last-child { border:none; }
.pmeal strong { color:${B.green}; font-size:0.63rem; text-transform:uppercase; letter-spacing:0.06em; margin-right:0.35rem; }

/* SCROLL */
.scroll { overflow-y:auto; }
.mh300 { max-height:300px; }
.mh360 { max-height:360px; }
`;

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const CLIENTS = [
  { id:1, name:"Sarah Mitchell", ini:"SM", col:"#4CAF7D", goal:"Weight Management", status:"on-track",   cals:1650, target:1800, water:6, wgoal:8,  weight:68.2, wchg:-0.8, comp:87, conditions:["Anxiety","IBS"],           tags:["Dairy-free","High protein"], msgs:[{from:"them",text:"Feeling great this week, energy is much better!",ts:"Mon 9:12am"},{from:"me",text:"Brilliant Sarah, keep following the plan. Let's check in Friday.",ts:"Mon 9:40am"}], supps:[{name:"Omega-3",time:"With breakfast",col:"#4CAF7D",done:true},{name:"Probiotic",time:"With lunch",col:"#4CAF7D",done:false},{name:"Magnesium",time:"Before bed",col:"#D4A84B",done:false}] },
  { id:2, name:"James O'Brien",  ini:"JO", col:"#D4A84B", goal:"Recovery Support",  status:"needs-attention", cals:1920, target:2200, water:3, wgoal:10, weight:84.5, wchg:+1.2, comp:62, conditions:["Addiction Recovery"], tags:["No caffeine","High fibre"],  msgs:[{from:"them",text:"Struggling with appetite this week, not managing full meals.",ts:"Tue 2:05pm"},{from:"me",text:"Thanks for letting me know James. Let's simplify meals for now — I'll send an adjusted plan.",ts:"Tue 2:30pm"}], supps:[{name:"B-Complex",time:"With breakfast",col:"#D4A84B",done:false},{name:"Zinc",time:"With lunch",col:"#4CAF7D",done:false},{name:"L-Theanine",time:"Evening",col:"#D4A84B",done:false}] },
  { id:3, name:"Priya Sharma",   ini:"PS", col:"#7EB8D4", goal:"Energy & Vitality",  status:"on-track",   cals:1780, target:1900, water:7, wgoal:8,  weight:58.1, wchg:-0.2, comp:94, conditions:["Hypothyroidism"],       tags:["Gluten-free","Iron-rich"],   msgs:[{from:"me",text:"Priya, your latest bloods look great — iron levels up 18%. Keep up the diet!",ts:"Wed 10:00am"}],                                                                                                               supps:[{name:"Iron + Vit C",time:"Away from food",col:"#7EB8D4",done:true},{name:"Selenium",time:"With breakfast",col:"#4CAF7D",done:true},{name:"Vit D3",time:"Morning",col:"#D4A84B",done:false}] },
  { id:4, name:"Tom Gallagher",  ini:"TG", col:"#E07060", goal:"Muscle Gain",        status:"off-track",  cals:2100, target:2800, water:5, wgoal:12, weight:76.3, wchg:+0.5, comp:48, conditions:["Depression"],           tags:["High protein","No soy"],     msgs:[{from:"them",text:"I've been skipping meals again, just not feeling motivated.",ts:"Thu 8:15am"},{from:"me",text:"That's okay Tom, let's not be hard on ourselves. Try the snack swaps I mentioned — small wins count.",ts:"Thu 8:50am"}], supps:[{name:"Creatine",time:"Post-workout",col:"#4CAF7D",done:false},{name:"Vit D",time:"Morning",col:"#D4A84B",done:false},{name:"Ashwagandha",time:"Evening",col:"#7EB8D4",done:false}] },
  { id:5, name:"Emma Walsh",     ini:"EW", col:"#C9A84C", goal:"Gut Health",         status:"on-track",   cals:1590, target:1700, water:8, wgoal:8,  weight:61.4, wchg:-1.1, comp:91, conditions:["Crohn's Disease"],     tags:["Low FODMAP","Probiotic"],    msgs:[{from:"them",text:"Symptom diary has been really positive, best 2 weeks in months!",ts:"Fri 11:30am"},{from:"me",text:"That's amazing Emma! The low-FODMAP adjustments are clearly working.",ts:"Fri 12:00pm"}], supps:[{name:"Probiotic",time:"With breakfast",col:"#4CAF7D",done:true},{name:"L-Glutamine",time:"Before meals",col:"#4CAF7D",done:true},{name:"Digestive Enzymes",time:"With meals",col:"#D4A84B",done:false}] },
];

const MEAL_PLAN = {
  Mon:[{t:"Breakfast",m:"Overnight oats, blueberries & chia"},{t:"Snack",m:"Apple + almond butter"},{t:"Lunch",m:"Grilled chicken quinoa bowl"},{t:"Dinner",m:"Salmon, sweet potato & wilted greens"}],
  Tue:[{t:"Breakfast",m:"Spinach egg scramble + rye toast"},{t:"Snack",m:"Greek yogurt + walnuts"},{t:"Lunch",m:"Lentil & root veg soup"},{t:"Dinner",m:"Turkey stir-fry, brown rice"}],
  Wed:[{t:"Breakfast",m:"Banana protein smoothie"},{t:"Snack",m:"Hummus & veggie sticks"},{t:"Lunch",m:"Tuna avocado wrap"},{t:"Dinner",m:"Chicken & chickpea curry"}],
  Thu:[{t:"Breakfast",m:"Porridge, seeds & honey"},{t:"Snack",m:"Boiled eggs x2"},{t:"Lunch",m:"Roasted veg & feta salad"},{t:"Dinner",m:"Beef & broccoli, soba noodles"}],
  Fri:[{t:"Breakfast",m:"Açaí bowl with granola"},{t:"Snack",m:"Rice cakes + cottage cheese"},{t:"Lunch",m:"Prawn & mango salad"},{t:"Dinner",m:"Baked cod, peas & potato"}],
};

const TODAY_LOG = [
  {icon:"🌅",bg:"#1C2A1E",name:"Overnight oats with berries",time:"7:32 AM",cals:380},
  {icon:"🍎",bg:"#1A261A",name:"Apple & almond butter",time:"10:15 AM",cals:210},
  {icon:"🥗",bg:"#1A261A",name:"Grilled chicken quinoa bowl",time:"1:00 PM",cals:520},
  {icon:"🥤",bg:"#1C2030",name:"Protein shake",time:"3:45 PM",cals:180},
];

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
function Prog({label, val, max, col="p-green", unit=""}) {
  const p = Math.min((val/max)*100,100);
  return <div>
    <div className="pl"><span>{label}</span><span style={{color:B.grey}}>{val}{unit} / {max}{unit}</span></div>
    <div className="pt"><div className={`pf ${col}`} style={{width:`${p}%`}}/></div>
  </div>;
}

function Badge({status}) {
  if(status==="on-track")        return <span className="badge badge-green">● On Track</span>;
  if(status==="needs-attention") return <span className="badge badge-amber">● Attention</span>;
  return <span className="badge badge-red">● Off Track</span>;
}

/* ─── AI MEAL PLAN GENERATOR ─────────────────────────────────────────────── */
function AIMealGen({client}) {
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState("");
  const [prompt,setPrompt]=useState(`Generate a 3-day meal plan for ${client.name}. Goals: ${client.goal}. Conditions: ${client.conditions.join(", ")}. Dietary needs: ${client.tags.join(", ")}. Target calories: ${client.target}kcal/day. Be concise and practical.`);

  async function generate() {
    setLoading(true); setResult("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:"You are Tom Saunders, a professional nutritionist. Create clear, evidence-based meal plans. Format with Day 1/2/3 headings, Breakfast/Lunch/Dinner/Snacks. Include approximate calories per meal. Be practical and specific.",
          messages:[{role:"user",content:prompt}]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b=>b.type==="text")?.text || "No response generated.";
      // Simulate streaming for effect
      let i=0;
      const interval = setInterval(()=>{
        i = Math.min(i+8, text.length);
        setResult(text.slice(0,i));
        if(i>=text.length) clearInterval(interval);
      },16);
    } catch(e) {
      setResult("Error connecting to AI. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="card-hd">AI Meal Plan Generator</div>
      <textarea className="inp" rows={4} value={prompt} onChange={e=>setPrompt(e.target.value)} style={{marginBottom:"0.75rem"}}/>
      <div className="fg" style={{marginBottom:"0.75rem"}}>
        <button className="btn btn-g btn-sm" onClick={generate} disabled={loading}>
          {loading ? "Generating…" : "✦ Generate Plan"}
        </button>
        {result && <button className="btn btn-o btn-sm" onClick={()=>setResult("")}>Clear</button>}
      </div>
      {loading && !result && (
        <div className="ai-loading">
          <div className="dot-pulse"><span/><span/><span/></div>
          <span>Tom Saunders AI is building the plan…</span>
        </div>
      )}
      {result && (
        <div className="ai-box scroll mh300">
          {result}
          {loading && <span className="ai-cursor"/>}
        </div>
      )}
    </div>
  );
}

/* ─── SUPPLEMENTS ─────────────────────────────────────────────────────────── */
function Supplements({supps, client}) {
  const [checked, setChecked] = useState(supps.map(s=>s.done));
  const toggle = i => setChecked(c=>c.map((v,j)=>j===i?!v:v));
  const done = checked.filter(Boolean).length;

  return (
    <div>
      <div className="fb" style={{marginBottom:"0.85rem"}}>
        <div className="card-hd" style={{margin:0}}>Supplement Schedule</div>
        <span className="badge badge-green">{done}/{supps.length} taken</span>
      </div>
      {supps.map((s,i)=>(
        <div className="supp" key={i}>
          <div className="supp-dot" style={{background:s.col}}/>
          <div style={{flex:1}}>
            <div className="supp-name">{s.name}</div>
            <div className="supp-time">{s.time}</div>
          </div>
          <div className={`supp-check ${checked[i]?"done":""}`} onClick={()=>toggle(i)}>
            {checked[i] && <span style={{color:B.black,fontSize:"0.65rem",fontWeight:700}}>✓</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── MESSAGING ───────────────────────────────────────────────────────────── */
function Messaging({client}) {
  const [msgs, setMsgs] = useState(client.msgs);
  const [draft, setDraft] = useState("");
  const ref = useRef();

  function send() {
    if(!draft.trim()) return;
    setMsgs(m=>[...m,{from:"me",text:draft.trim(),ts:"Just now"}]);
    setDraft("");
    setTimeout(()=>ref.current?.scrollTo(0,ref.current.scrollHeight),50);
  }

  return (
    <div>
      <div className="card-hd fb">
        <span>Messages — {client.name}</span>
        <span style={{color:B.grey,fontSize:"0.72rem",fontWeight:400,textTransform:"none",letterSpacing:0}}>End-to-end encrypted</span>
      </div>
      <div className="chat-wrap scroll mh300" ref={ref}>
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.from==="me"?"flex-end":"flex-start"}}>
            <div className={`msg msg-${m.from==="me"?"me":"them"}`}>{m.text}</div>
            <div className="msg-ts">{m.ts}</div>
          </div>
        ))}
      </div>
      <div className="div"/>
      <div className="fg">
        <input className="inp" placeholder="Type a message…" value={draft}
          onChange={e=>setDraft(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}
          style={{flex:1}}/>
        <button className="btn btn-g btn-sm" onClick={send}>Send</button>
      </div>
    </div>
  );
}

/* ─── PDF EXPORT ─────────────────────────────────────────────────────────── */
function ExportReport({client}) {
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(false);

  function exportPDF() {
    setLoading(true);
    // Generate a printable HTML report in new window
    const html = `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<title>TS Nutrition — ${client.name} Report</title>
<style>
  body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;color:#111;line-height:1.6}
  h1{font-size:1.6rem;border-bottom:3px solid #4CAF7D;padding-bottom:8px;margin-bottom:4px}
  h2{font-size:1rem;color:#4CAF7D;margin-top:24px;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.06em}
  .meta{color:#666;font-size:0.85rem;margin-bottom:24px}
  .row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee}
  .highlight{background:#f0faf4;padding:12px 16px;border-left:4px solid #4CAF7D;border-radius:4px;margin:12px 0}
  .tag{display:inline-block;background:#eee;padding:2px 8px;border-radius:4px;font-size:0.78rem;margin:2px}
  .footer{margin-top:40px;font-size:0.78rem;color:#999;border-top:1px solid #eee;padding-top:16px}
  @media print{body{margin:20px}}
</style>
</head><body>
<h1>Tom Saunders Nutrition</h1>
<div class="meta">Client Progress Report &nbsp;|&nbsp; Generated ${new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</div>

<h2>Client Overview</h2>
<div class="row"><span><strong>Name</strong></span><span>${client.name}</span></div>
<div class="row"><span><strong>Goal</strong></span><span>${client.goal}</span></div>
<div class="row"><span><strong>Status</strong></span><span>${client.status==="on-track"?"✅ On Track":client.status==="needs-attention"?"⚠️ Needs Attention":"❌ Off Track"}</span></div>
<div class="row"><span><strong>Health Conditions</strong></span><span>${client.conditions.join(", ")}</span></div>

<h2>Nutrition Metrics</h2>
<div class="row"><span>Daily Calorie Target</span><span>${client.target} kcal</span></div>
<div class="row"><span>Current Intake</span><span>${client.cals} kcal</span></div>
<div class="row"><span>Hydration</span><span>${client.water} / ${client.wgoal} cups</span></div>
<div class="row"><span>Plan Compliance</span><span>${client.comp}%</span></div>

<h2>Progress</h2>
<div class="row"><span>Current Weight</span><span>${client.weight} kg</span></div>
<div class="row"><span>Weekly Change</span><span>${client.wchg > 0 ? "+" : ""}${client.wchg} kg</span></div>

<div class="highlight">
  <strong>Practitioner Note:</strong> Client is ${client.comp >= 80 ? "showing strong adherence to the plan" : "struggling with plan adherence — additional support recommended"}. 
  Compliance at ${client.comp}% ${client.comp >= 80 ? "— continue current approach." : "— review plan complexity and motivation factors."}
</div>

<h2>Dietary Requirements</h2>
${client.tags.map(t=>`<span class="tag">${t}</span>`).join("")}

<h2>Supplement Schedule</h2>
${client.supps.map(s=>`<div class="row"><span>${s.name}</span><span>${s.time}</span></div>`).join("")}

<div class="footer">
  <strong>Tom Saunders Nutrition</strong> &nbsp;|&nbsp; Professional Nutrition & Wellness Coaching<br>
  This report is confidential and intended for the named client and their care team only.
</div>
</body></html>`;

    const win = window.open("","_blank");
    win.document.write(html);
    win.document.close();
    setTimeout(()=>{ win.print(); setLoading(false); setDone(true); setTimeout(()=>setDone(false),3000); },400);
  }

  return (
    <div className="fg">
      <button className="btn btn-ghost btn-sm" onClick={exportPDF} disabled={loading}>
        {loading?"Preparing…":done?"✓ Report Ready":"⬇ Export PDF Report"}
      </button>
    </div>
  );
}

/* ─── CLIENT DASHBOARD (client-facing) ──────────────────────────────────── */
function ClientDash() {
  const me = CLIENTS[0];
  const [water,setWater]=useState(me.water);
  const [day,setDay]=useState("Thu");
  const days = Object.keys(MEAL_PLAN);
  const totalCals = TODAY_LOG.reduce((a,m)=>a+m.cals,0);

  return (
    <div>
      <div className="banner">
        <div className="banner-mark">Tom Saunders Nutrition</div>
        <div className="banner-title">Good morning, Sarah 👋</div>
        <div className="banner-sub">Thursday — you've logged 4 meals today. You're doing great.</div>
      </div>

      {/* Stats */}
      <div className="g4" style={{marginBottom:"1.1rem"}}>
        <div className="stat">
          <div className="stat-lbl">Calories Today</div>
          <div className="stat-val">{totalCals}<span className="stat-unit">kcal</span></div>
          <div className="stat-delta up">↓ {me.target-totalCals} remaining</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Current Weight</div>
          <div className="stat-val">{me.weight}<span className="stat-unit">kg</span></div>
          <div className="stat-delta up">↓ {Math.abs(me.wchg)}kg this week</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Hydration</div>
          <div className="stat-val">{water}<span className="stat-unit">/{me.wgoal}</span></div>
          <div className={`stat-delta ${water>=me.wgoal?"up":"am"}`}>{water>=me.wgoal?"Goal reached ✓":`${me.wgoal-water} cups to go`}</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Compliance</div>
          <div className="stat-val">{me.comp}<span className="stat-unit">%</span></div>
          <div className="stat-delta up">↑ 5% vs last week</div>
        </div>
      </div>

      <div className="g2" style={{marginBottom:"1.1rem"}}>
        {/* Macros */}
        <div className="card">
          <div className="card-hd">Today's Macros</div>
          <Prog label="Protein" val={98} max={130} col="p-green" unit="g"/>
          <Prog label="Carbohydrates" val={187} max={225} col="p-grey" unit="g"/>
          <Prog label="Fats" val={44} max={60} col="p-amber" unit="g"/>
          <Prog label="Fibre" val={18} max={25} col="p-green" unit="g"/>
          <div className="div"/>
          <Prog label="Calories" val={totalCals} max={me.target} col="p-green" unit=" kcal"/>
        </div>

        {/* Meal Log */}
        <div className="card">
          <div className="fb" style={{marginBottom:"1rem"}}>
            <div className="card-hd" style={{margin:0}}>Today's Meal Log</div>
            <button className="btn btn-g btn-sm">+ Log Meal</button>
          </div>
          {TODAY_LOG.map((m,i)=>(
            <div className="mrow" key={i}>
              <div className="micon" style={{background:m.bg}}>{m.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:"0.86rem",color:B.white,fontWeight:500}}>{m.name}</div>
                <div style={{fontSize:"0.72rem",color:B.grey}}>{m.time}</div>
              </div>
              <div style={{fontSize:"0.86rem",fontWeight:600,color:B.green}}>{m.cals} kcal</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hydration */}
      <div className="card" style={{marginBottom:"1.1rem"}}>
        <div className="fb" style={{marginBottom:"0.9rem"}}>
          <div className="card-hd" style={{margin:0}}>💧 Hydration Tracker</div>
          <span style={{fontSize:"0.8rem",color:B.grey}}>{water} of {me.wgoal} cups today</span>
        </div>
        <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
          {Array.from({length:me.wgoal}).map((_,i)=>(
            <div key={i} className={`wcup ${i<water?"full":""}`}
              onClick={()=>setWater(i<water?i:i+1)}/>
          ))}
        </div>
        <div style={{fontSize:"0.72rem",color:B.grey,marginTop:"0.6rem"}}>Tap to log each cup</div>
      </div>

      {/* Supplements */}
      <div className="g2" style={{marginBottom:"1.1rem"}}>
        <div className="card">
          <Supplements supps={me.supps} client={me}/>
        </div>

        {/* Meal Plan */}
        <div className="card">
          <div className="card-hd">This Week's Plan</div>
          <div className="fg" style={{marginBottom:"1rem",flexWrap:"wrap"}}>
            {days.map(d=>(
              <button key={d} onClick={()=>setDay(d)}
                style={{padding:"0.3rem 0.8rem",borderRadius:"6px",border:"none",cursor:"pointer",fontFamily:"'Syne',sans-serif",fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",background:day===d?B.green:B.border,color:day===d?B.black:B.grey,transition:"all 0.2s"}}>
                {d}
              </button>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.6rem"}}>
            {MEAL_PLAN[day].map((m,i)=>(
              <div className="pday" key={i}>
                <div className="pday-lbl">{m.t}</div>
                <div style={{fontSize:"0.82rem",color:B.greyLt}}>{m.m}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Messages from coach */}
      <div className="card">
        <Messaging client={me}/>
      </div>
    </div>
  );
}

/* ─── MANAGER DASHBOARD ──────────────────────────────────────────────────── */
function ManagerDash() {
  const [sel, setSel] = useState(CLIENTS[0]);
  const [tab, setTab] = useState("overview");
  const onTrack = CLIENTS.filter(c=>c.status==="on-track").length;
  const avgComp = Math.round(CLIENTS.reduce((a,c)=>a+c.comp,0)/CLIENTS.length);

  return (
    <div>
      {/* Top Stats */}
      <div className="g4" style={{marginBottom:"1.1rem"}}>
        <div className="stat">
          <div className="stat-lbl">Total Clients</div>
          <div className="stat-val">{CLIENTS.length}</div>
          <div className="stat-delta up">↑ 2 this month</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">On Track</div>
          <div className="stat-val">{onTrack}<span className="stat-unit">/{CLIENTS.length}</span></div>
          <div className="stat-delta up">{Math.round(onTrack/CLIENTS.length*100)}% success rate</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Avg Compliance</div>
          <div className="stat-val">{avgComp}<span className="stat-unit">%</span></div>
          <div className="stat-delta up">↑ 8% vs last month</div>
        </div>
        <div className="stat">
          <div className="stat-lbl">Flagged</div>
          <div className="stat-val" style={{color:B.alert}}>{CLIENTS.filter(c=>c.status!=="on-track").length}</div>
          <div className="stat-delta dn">Needs follow-up</div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:"1.1rem"}}>
        {/* Client List */}
        <div className="card" style={{padding:"1rem"}}>
          <div className="fb" style={{marginBottom:"0.85rem",padding:"0 0.25rem"}}>
            <div className="card-hd" style={{margin:0}}>Clients</div>
            <button className="btn btn-g btn-sm">+ Add</button>
          </div>
          <div className="scroll mh360">
            {CLIENTS.map(c=>(
              <div key={c.id} className={`crow ${sel.id===c.id?"sel":""}`} onClick={()=>{setSel(c);setTab("overview");}}>
                <div className="cav" style={{background:c.col}}>{c.ini}</div>
                <div style={{flex:1}}>
                  <div className="cname">{c.name}</div>
                  <div className="cmeta">{c.goal}</div>
                </div>
                <Badge status={c.status}/>
              </div>
            ))}
          </div>
        </div>

        {/* Client Detail */}
        <div className="card">
          {/* Header */}
          <div className="fg" style={{marginBottom:"1.25rem",flexWrap:"wrap",gap:"0.75rem"}}>
            <div className="cav" style={{background:sel.col,width:52,height:52,fontSize:"0.9rem"}}>{sel.ini}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.15rem",fontWeight:700,color:B.white}}>{sel.name}</div>
              <div style={{fontSize:"0.78rem",color:B.grey}}>Goal: {sel.goal}</div>
            </div>
            <Badge status={sel.status}/>
            <ExportReport client={sel}/>
          </div>

          {/* Sub-tabs */}
          <div className="fg" style={{marginBottom:"1.25rem",background:B.black,borderRadius:"8px",padding:"0.3rem",border:`1px solid ${B.border}`,display:"inline-flex"}}>
            {["overview","meal plan","supplements","messages"].map(t=>(
              <button key={t} onClick={()=>setTab(t)}
                style={{padding:"0.35rem 0.9rem",borderRadius:"6px",border:"none",cursor:"pointer",fontFamily:"'Syne',sans-serif",fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",background:tab===t?B.green:B.black,color:tab===t?B.black:B.grey,transition:"all 0.2s"}}>
                {t}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {tab==="overview" && (
            <div>
              <div className="g3" style={{marginBottom:"1.1rem"}}>
                {[
                  {lbl:"Calories Today",val:`${sel.cals}`,unit:`/ ${sel.target} kcal`,col: sel.cals/sel.target<0.85?B.alert:B.green},
                  {lbl:"Hydration",val:`${sel.water}`,unit:`/ ${sel.wgoal} cups`,col:sel.water>=sel.wgoal?B.green:B.amber},
                  {lbl:"Compliance",val:`${sel.comp}%`,unit:"",col:sel.comp>=80?B.green:B.alert},
                ].map((s,i)=>(
                  <div key={i} style={{background:B.black,border:`1px solid ${B.border}`,borderRadius:"10px",padding:"1rem",textAlign:"center"}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:"1.6rem",fontWeight:700,color:s.col}}>{s.val}</div>
                    <div style={{fontSize:"0.7rem",color:B.grey,textTransform:"uppercase",letterSpacing:"0.07em"}}>{s.lbl}</div>
                    <div style={{fontSize:"0.75rem",color:B.grey,marginTop:"0.2rem"}}>{s.unit}</div>
                  </div>
                ))}
              </div>
              <Prog label="Plan Compliance" val={sel.comp} max={100} col={sel.comp>=80?"p-green":"p-alert"} unit="%"/>
              <Prog label="Calorie Target" val={sel.cals} max={sel.target} col="p-green" unit=" kcal"/>
              <Prog label="Hydration" val={sel.water} max={sel.wgoal} col="p-grey" unit=" cups"/>
              <div className="div"/>
              <div style={{marginBottom:"0.75rem"}}>
                <div style={{fontSize:"0.65rem",fontFamily:"'Syne',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.4rem"}}>Health Conditions</div>
                {sel.conditions.map(c=><span key={c} className="tag">{c}</span>)}
              </div>
              <div>
                <div style={{fontSize:"0.65rem",fontFamily:"'Syne',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.4rem"}}>Dietary Requirements</div>
                {sel.tags.map(t=><span key={t} className="tag" style={{background:"rgba(76,175,125,0.1)",color:B.green}}>{t}</span>)}
              </div>
            </div>
          )}

          {/* Meal Plan Tab */}
          {tab==="meal plan" && <AIMealGen client={sel}/>}

          {/* Supplements Tab */}
          {tab==="supplements" && <Supplements supps={sel.supps} client={sel}/>}

          {/* Messages Tab */}
          {tab==="messages" && <Messaging client={sel}/>}
        </div>
      </div>
    </div>
  );
}

/* ─── ROOT APP ────────────────────────────────────────────────────────────── */
export default function App() {
  const [view, setView] = useState("manager");

  return (
    <div className="app">
      <style>{G}</style>

      <nav className="nav">
        <div className="logo">
          <span>TS<span className="logo-dot">·</span>Nutrition</span>
          <span className="logo-sub">Tom Saunders</span>
        </div>
        <div className="nav-pills">
          <button className={`pill ${view==="client"?"active":""}`} onClick={()=>setView("client")}>My Dashboard</button>
          <button className={`pill ${view==="manager"?"active":""}`} onClick={()=>setView("manager")}>Manager</button>
        </div>
        <div className="nav-right">
          {view==="manager" && <span className="nav-badge">2 flagged</span>}
          <div className="nav-av">{view==="manager"?"TS":"SM"}</div>
        </div>
      </nav>

      <div className="main">
        {/* Sidebar */}
        <aside className="sidebar">
          {view==="client" ? <>
            <div className="sidebar-section">My Health</div>
            {[["📊","Dashboard"],["🍽","Meal Log"],["📅","My Plan"],["💊","Supplements"],["💧","Hydration"],["📈","Progress"]].map(([ic,lb])=>(
              <button key={lb} className={`slink ${lb==="Dashboard"?"active":""}`}>
                <span className="slink-icon">{ic}</span>{lb}
              </button>
            ))}
          </> : <>
            <div className="sidebar-section">Practice</div>
            {[["👥","All Clients"],["📊","Analytics"],["📅","Schedule"],["📋","Plans Library"]].map(([ic,lb])=>(
              <button key={lb} className={`slink ${lb==="All Clients"?"active":""}`}>
                <span className="slink-icon">{ic}</span>{lb}
              </button>
            ))}
            <div className="sidebar-section">Tools</div>
            {[["✦","AI Meal Planner"],["📄","Reports"],["💬","Messages"],["⚙️","Settings"]].map(([ic,lb])=>(
              <button key={lb} className="slink">
                <span className="slink-icon">{ic}</span>{lb}
              </button>
            ))}
          </>}
        </aside>

        {/* Main Content */}
        <main className="content">
          {view==="client" ? (
            <>
              <div className="ph">My <em>Wellness</em> Dashboard</div>
              <div className="psub">Track your nutrition, hydration and progress — powered by Tom Saunders Nutrition</div>
              <ClientDash/>
            </>
          ) : (
            <>
              <div className="ph"><em>TS Nutrition</em> — Client Management</div>
              <div className="psub">Monitor, message and manage all your clients in one place</div>
              <ManagerDash/>
            </>
          )}
        </main>
      </div>
    </div>
  );
}