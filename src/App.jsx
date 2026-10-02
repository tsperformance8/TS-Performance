import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";
import { useAuth, signUp, signIn, signOut, MANAGER_EMAIL } from "./Auth";

const B = {
  green:"#3A7D44",greenLt:"#4CAF5A",greenDim:"rgba(58,125,68,0.12)",
  dark:"#1C1C1C",darker:"#141414",card:"#242424",border:"#333333",borderLt:"#444444",
  grey:"#888888",greyLt:"#BBBBBB",white:"#F5F5F5",text:"#EEEEEE",
  alert:"#E05050",amber:"#D4A020",blue:"#4A90D9",
};

const G = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{background:${B.darker};color:${B.text};font-family:'Barlow',sans-serif;font-size:15px;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${B.dark}}::-webkit-scrollbar-thumb{background:${B.border};border-radius:2px}
.app{min-height:100vh;display:flex;flex-direction:column}
.nav{background:${B.dark};border-bottom:3px solid ${B.green};display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:64px;position:sticky;top:0;z-index:200}
.logo{display:flex;align-items:center;gap:0.75rem}
.logo-box{width:44px;height:44px;background:${B.green};display:flex;align-items:center;justify-content:center;border-radius:4px;position:relative;overflow:hidden}
.logo-ts{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:1.2rem;color:white;letter-spacing:-0.02em;line-height:1}
.logo-slash{position:absolute;right:-4px;top:0;width:12px;height:100%;background:${B.dark};transform:skewX(-8deg)}
.logo-text{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.1rem;letter-spacing:0.1em;text-transform:uppercase;color:${B.white}}
.logo-text span{color:${B.green}}
.nav-pills{display:flex;gap:0.25rem;background:${B.darker};border-radius:8px;padding:0.3rem;border:1px solid ${B.border}}
.pill{padding:0.4rem 1.2rem;border-radius:6px;border:none;background:transparent;color:${B.grey};font-family:'Barlow Condensed',sans-serif;font-size:0.85rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;transition:all 0.2s}
.pill.active{background:${B.green};color:white}.pill:hover:not(.active){color:${B.greyLt}}
.nav-av{width:36px;height:36px;border-radius:50%;background:${B.green};border:2px solid ${B.greenLt};display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:0.85rem;color:white}
.main{flex:1;display:flex}
.sidebar{width:220px;flex-shrink:0;background:${B.dark};border-right:1px solid ${B.border};padding:1.25rem 0;display:flex;flex-direction:column}
.s-section{font-family:'Barlow Condensed',sans-serif;font-size:0.68rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${B.grey};padding:0.85rem 1.25rem 0.3rem}
.slink{display:flex;align-items:center;gap:0.65rem;padding:0.6rem 1.25rem;margin:0.1rem 0.5rem;border-radius:7px;cursor:pointer;color:${B.grey};font-size:0.88rem;font-weight:500;border:1px solid transparent;background:transparent;width:calc(100% - 1rem);text-align:left;transition:all 0.15s;font-family:'Barlow',sans-serif}
.slink:hover{background:rgba(58,125,68,0.12);color:${B.greyLt}}
.slink.active{background:rgba(58,125,68,0.12);color:${B.green};border-color:${B.border}}
.slink-icon{width:18px;text-align:center;font-size:0.9rem}
.content{flex:1;padding:2rem;overflow-y:auto;max-height:calc(100vh - 64px)}
.ph{font-family:'Barlow Condensed',sans-serif;font-size:2rem;font-weight:700;color:${B.white};letter-spacing:0.02em;text-transform:uppercase;margin-bottom:0.2rem}
.ph em{color:${B.green};font-style:normal}
.psub{font-size:0.85rem;color:${B.grey};margin-bottom:1.75rem}
.card{background:${B.card};border:1px solid ${B.border};border-radius:12px;padding:1.4rem;margin-bottom:1.1rem}
.card-hd{font-family:'Barlow Condensed',sans-serif;font-size:0.78rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${B.green};margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem}
.card-hd::after{content:'';flex:1;height:1px;background:${B.border}}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.1rem}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
.g5{display:grid;grid-template-columns:repeat(5,1fr);gap:0.75rem}
.banner{background:linear-gradient(135deg,${B.dark} 0%,#1A2F1C 100%);border:1px solid ${B.border};border-left:4px solid ${B.green};border-radius:12px;padding:1.75rem 2rem;margin-bottom:1.1rem;position:relative;overflow:hidden}
.banner::after{content:'TS';position:absolute;right:1.5rem;top:50%;transform:translateY(-50%);font-family:'Barlow Condensed',sans-serif;font-size:6rem;font-weight:800;color:rgba(58,125,68,0.08);letter-spacing:-0.05em;line-height:1}
.banner-label{font-family:'Barlow Condensed',sans-serif;font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${B.green};margin-bottom:0.4rem}
.banner-title{font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:700;color:${B.white};text-transform:uppercase;margin-bottom:0.25rem;letter-spacing:0.02em}
.banner-sub{font-size:0.85rem;color:${B.grey}}
.pl{display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:0.3rem;color:${B.greyLt}}
.pt{height:7px;background:${B.border};border-radius:99px;margin-bottom:0.85rem;overflow:hidden}
.pf{height:100%;border-radius:99px;transition:width 0.6s ease}
.p-green{background:linear-gradient(90deg,${B.green},${B.greenLt})}
.p-amber{background:${B.amber}}.p-alert{background:${B.alert}}.p-blue{background:${B.blue}}
.badge{display:inline-flex;align-items:center;gap:0.3rem;padding:0.2rem 0.7rem;border-radius:4px;font-size:0.68rem;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:0.06em;text-transform:uppercase}
.badge-green{background:rgba(58,125,68,0.2);color:${B.greenLt};border:1px solid rgba(58,125,68,0.4)}
.badge-amber{background:rgba(212,160,32,0.15);color:${B.amber};border:1px solid rgba(212,160,32,0.3)}
.badge-blue{background:rgba(74,144,217,0.15);color:${B.blue};border:1px solid rgba(74,144,217,0.3)}
.badge-red{background:rgba(224,80,80,0.15);color:${B.alert};border:1px solid rgba(224,80,80,0.3)}
.tag{display:inline-block;padding:0.2rem 0.6rem;border-radius:4px;font-size:0.72rem;background:${B.border};color:${B.greyLt};margin:0.15rem 0.1rem}
.btn{padding:0.6rem 1.4rem;border-radius:7px;border:none;font-family:'Barlow Condensed',sans-serif;font-size:0.82rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;transition:all 0.2s}
.btn-g{background:${B.green};color:white}.btn-g:hover{background:${B.greenLt}}
.btn-o{background:${B.border};color:${B.greyLt}}.btn-o:hover{background:${B.borderLt};color:${B.white}}
.btn-sm{padding:0.35rem 0.9rem;font-size:0.72rem}
.btn-ghost{background:transparent;border:1px solid ${B.border};color:${B.grey}}.btn-ghost:hover{border-color:${B.green};color:${B.green}}
.btn-full{width:100%;padding:0.85rem;font-size:0.9rem}
.inp{width:100%;background:${B.darker};border:1px solid ${B.border};border-radius:7px;color:${B.text};font-family:'Barlow',sans-serif;font-size:0.88rem;padding:0.65rem 0.9rem;outline:none;transition:border-color 0.2s}
.inp:focus{border-color:${B.green}}.inp::placeholder{color:${B.grey}}
.inp-label{font-size:0.72rem;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${B.grey};margin-bottom:0.35rem;display:block}
.inp-group{margin-bottom:1rem}
select.inp option{background:${B.dark}}
.fb{display:flex;align-items:center;justify-content:space-between}
.fg{display:flex;align-items:center;gap:0.6rem}
.div{height:1px;background:${B.border};margin:1rem 0}
.scroll{overflow-y:auto}.mh300{max-height:300px}.mh400{max-height:400px}
.auth-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:${B.darker};padding:2rem}
.auth-box{background:${B.card};border:1px solid ${B.border};border-top:4px solid ${B.green};border-radius:12px;padding:2.5rem;width:100%;max-width:440px}
.auth-title{font-family:'Barlow Condensed',sans-serif;font-size:1.4rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:${B.white};margin-bottom:0.35rem;text-align:center}
.auth-sub{font-size:0.84rem;color:${B.grey};text-align:center;margin-bottom:1.75rem}
.auth-switch{text-align:center;font-size:0.82rem;color:${B.grey};margin-top:1rem}
.auth-switch span{color:${B.green};cursor:pointer;font-weight:600}
.err{background:rgba(224,80,80,0.1);border:1px solid rgba(224,80,80,0.3);border-radius:7px;padding:0.75rem 1rem;font-size:0.82rem;color:${B.alert};margin-bottom:1rem}
.success{background:rgba(58,125,68,0.1);border:1px solid rgba(58,125,68,0.3);border-radius:7px;padding:0.75rem 1rem;font-size:0.82rem;color:${B.greenLt};margin-bottom:1rem}
.loading-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:${B.darker};flex-direction:column;gap:1rem}
.spinner{width:40px;height:40px;border:3px solid ${B.border};border-top-color:${B.green};border-radius:50%;animation:spin 0.8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.assess-step{background:${B.card};border:1px solid ${B.border};border-radius:12px;padding:2rem}
.assess-title{font-family:'Barlow Condensed',sans-serif;font-size:1.5rem;font-weight:700;color:${B.white};text-transform:uppercase;margin-bottom:0.35rem}
.assess-sub{font-size:0.85rem;color:${B.grey};margin-bottom:1.75rem}
.progress-steps{display:flex;gap:0.5rem;margin-bottom:2rem}
.step-dot{flex:1;height:4px;border-radius:99px;background:${B.border};transition:background 0.3s}
.step-dot.done{background:${B.green}}.step-dot.active{background:${B.greenLt}}
.checkbox-group{display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-bottom:1rem}
.checkbox-item{display:flex;align-items:center;gap:0.5rem;padding:0.6rem 0.85rem;background:${B.darker};border:1px solid ${B.border};border-radius:7px;cursor:pointer;transition:all 0.15s;font-size:0.85rem}
.checkbox-item:hover{border-color:${B.green}}.checkbox-item.checked{border-color:${B.green};background:rgba(58,125,68,0.12);color:${B.greenLt}}
.radio-group{display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1rem}
.radio-item{display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;background:${B.darker};border:1px solid ${B.border};border-radius:7px;cursor:pointer;transition:all 0.15s;font-size:0.88rem}
.radio-item:hover{border-color:${B.green}}.radio-item.selected{border-color:${B.green};background:rgba(58,125,68,0.12);color:${B.greenLt}}
.crow{display:flex;align-items:center;gap:0.85rem;padding:0.75rem;border-radius:8px;cursor:pointer;border:1px solid transparent;transition:all 0.15s}
.crow:hover{background:rgba(58,125,68,0.12)}.crow.sel{background:rgba(58,125,68,0.12);border-color:${B.border}}
.cav{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-size:0.85rem;font-weight:700;color:white;flex-shrink:0}
.cname{font-size:0.9rem;font-weight:600;color:${B.white}}.cmeta{font-size:0.74rem;color:${B.grey}}
.msg-wrap{display:flex;flex-direction:column;gap:0.75rem;height:320px;overflow-y:auto;padding:0.75rem;background:${B.darker};border:1px solid ${B.border};border-radius:8px;margin-bottom:0.75rem}
.msg-row{display:flex;flex-direction:column}
.msg-row.mine{align-items:flex-end}.msg-row.theirs{align-items:flex-start}
.msg-bubble{max-width:75%;padding:0.65rem 1rem;border-radius:10px;font-size:0.85rem;line-height:1.5;word-break:break-word}
.msg-bubble.mine{background:${B.green};color:white;border-bottom-right-radius:3px}
.msg-bubble.theirs{background:${B.border};color:${B.text};border-bottom-left-radius:3px}
.msg-time{font-size:0.65rem;color:${B.grey};margin-top:0.25rem;padding:0 0.25rem}
.wcup{width:26px;height:32px;border-radius:3px 3px 6px 6px;border:2px solid ${B.borderLt};cursor:pointer;transition:all 0.2s}
.wcup.full{background:${B.green};border-color:${B.greenLt}}.wcup:hover{transform:translateY(-2px)}
.macro-bar{margin-bottom:0.6rem}
.ai-box{background:${B.darker};border:1px solid ${B.green};border-radius:8px;padding:1rem;font-size:0.84rem;line-height:1.7;color:${B.greyLt};white-space:pre-wrap;min-height:60px}
.ai-cursor{display:inline-block;width:2px;height:14px;background:${B.green};animation:blink 0.8s infinite;vertical-align:middle;margin-left:1px}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.dot-pulse span{display:inline-block;width:6px;height:6px;border-radius:50%;background:${B.green};animation:pulse 1.2s ease-in-out infinite;margin:0 2px}
.dot-pulse span:nth-child(2){animation-delay:0.2s}.dot-pulse span:nth-child(3){animation-delay:0.4s}
@keyframes pulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}
.mp-table{width:100%;border-collapse:collapse;font-size:0.82rem}
.mp-table th{background:${B.green};color:white;padding:0.6rem 0.8rem;text-align:left;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:0.06em;text-transform:uppercase}
.mp-table td{padding:0.6rem 0.8rem;border-bottom:1px solid ${B.border};color:${B.greyLt};vertical-align:top}
.mp-table tr:hover td{background:rgba(58,125,68,0.08)}
.supp-row{display:flex;align-items:center;gap:0.85rem;padding:0.7rem 0;border-bottom:1px solid ${B.border}}
.supp-row:last-child{border:none}
.supp-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.supp-check{width:22px;height:22px;border-radius:5px;border:2px solid ${B.border};cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;margin-left:auto;flex-shrink:0}
.supp-check.done{background:${B.green};border-color:${B.green}}

/* ACTIVITY DAY SELECTOR */
.act-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.65rem}
.act-card{background:${B.darker};border:2px solid ${B.border};border-radius:10px;padding:0.85rem;cursor:pointer;transition:all 0.2s;text-align:center}
.act-card:hover{border-color:${B.green};transform:translateY(-1px)}
.act-card.sel{border-color:${B.green};background:rgba(58,125,68,0.12)}
.act-icon{font-size:1.6rem;margin-bottom:0.35rem}
.act-name{font-family:'Barlow Condensed',sans-serif;font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${B.white};margin-bottom:0.2rem}
.act-mult{font-size:0.7rem;color:${B.green};font-weight:600;margin-bottom:0.15rem}
.act-desc{font-size:0.68rem;color:${B.grey};line-height:1.3}

/* TARGET DISPLAY */
.target-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;margin-bottom:1rem}
.tcard{background:${B.darker};border:1px solid ${B.border};border-radius:10px;padding:1rem 0.75rem;text-align:center;border-top:3px solid transparent}
.tcard.green-t{border-top-color:${B.green}}
.tcard.amber-t{border-top-color:${B.amber}}
.tcard.blue-t{border-top-color:${B.blue}}
.tcard-num{font-family:'Barlow Condensed',sans-serif;font-size:2rem;font-weight:800;color:${B.white};line-height:1}
.tcard-unit{font-size:0.72rem;color:${B.grey}}
.tcard-lbl{font-family:'Barlow Condensed',sans-serif;font-size:0.62rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${B.grey};margin-top:0.3rem}

/* WEEK PLANNER */
.week-row{display:flex;align-items:center;gap:0.6rem;padding:0.6rem 0.75rem;background:${B.darker};border:1px solid ${B.border};border-radius:8px;margin-bottom:0.4rem}
.week-day{font-family:'Barlow Condensed',sans-serif;font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${B.greyLt};width:36px;flex-shrink:0}
.week-sel{flex:1;font-size:0.82rem}
.week-result{font-family:'Barlow Condensed',sans-serif;font-size:0.88rem;font-weight:700;color:${B.green};width:75px;text-align:right;flex-shrink:0}
.week-protein{font-size:0.72rem;color:${B.grey};width:55px;text-align:right;flex-shrink:0}

/* BF SELECTOR */
.bf-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:0.5rem;margin-bottom:1rem}
.bf-card{background:${B.darker};border:2px solid ${B.border};border-radius:8px;padding:0.6rem 0.4rem;cursor:pointer;transition:all 0.2s;text-align:center}
.bf-card:hover{border-color:${B.green}}.bf-card.sel{border-color:${B.green};background:rgba(58,125,68,0.15)}
.bf-figure{font-size:1.8rem;line-height:1;margin-bottom:0.25rem}
.bf-pct{font-family:'Barlow Condensed',sans-serif;font-size:0.85rem;font-weight:700;color:${B.white}}
.bf-lbl{font-size:0.6rem;color:${B.grey};margin-top:0.1rem}

/* ROUTINE */
.routine-section{border:1px solid ${B.border};border-radius:10px;overflow:hidden;margin-bottom:0.75rem}
.routine-header{background:${B.dark};padding:0.75rem 1rem;display:flex;align-items:center;gap:0.6rem;border-bottom:1px solid ${B.border}}
.routine-header-icon{font-size:1rem}
.routine-header-title{font-family:'Barlow Condensed',sans-serif;font-size:0.82rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${B.white}}
.routine-body{padding:0.85rem 1rem;background:${B.darker}}
.routine-item{display:flex;align-items:flex-start;gap:0.6rem;padding:0.45rem 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.84rem;color:${B.greyLt};line-height:1.5}
.routine-item:last-child{border:none}
.routine-dot{width:6px;height:6px;border-radius:50%;background:${B.green};flex-shrink:0;margin-top:0.5rem}
.routine-time-tag{font-family:'Barlow Condensed',sans-serif;font-size:0.68rem;font-weight:700;letter-spacing:0.06em;color:${B.green};background:rgba(58,125,68,0.15);border:1px solid rgba(58,125,68,0.3);border-radius:4px;padding:0.1rem 0.45rem;margin-left:auto;flex-shrink:0}
`;

/* ─── ACTIVITY TYPES ─────────────────────────────────────────────────────── */
const ACTIVITIES = [
  {id:"rest",icon:"😴",name:"Rest Day",mult:1.2,desc:"No planned exercise"},
  {id:"light_walk",icon:"🚶",name:"Light Walk",mult:1.3,desc:"30 min walk or light stretch"},
  {id:"moderate_walk",icon:"🏃",name:"Moderate Walk",mult:1.35,desc:"45-60 min brisk walk"},
  {id:"yoga",icon:"🧘",name:"Yoga / Mobility",mult:1.35,desc:"60 min yoga or mobility work"},
  {id:"gym_light",icon:"🏋️",name:"Light Gym",mult:1.45,desc:"30-40 min weights session"},
  {id:"gym_moderate",icon:"💪",name:"Gym Session",mult:1.55,desc:"45-60 min weights session"},
  {id:"gym_heavy",icon:"🔥",name:"Heavy Gym",mult:1.6,desc:"60-75 min intense weights"},
  {id:"run_5k",icon:"🏃‍♂️",name:"5K Run",mult:1.5,desc:"30-35 min run"},
  {id:"run_10k",icon:"👟",name:"10K Run",mult:1.6,desc:"50-65 min run"},
  {id:"run_half",icon:"🎽",name:"Half Marathon",mult:1.75,desc:"90+ min run"},
  {id:"cycle_mod",icon:"🚴",name:"Cycling",mult:1.55,desc:"45-60 min moderate cycling"},
  {id:"cycle_hard",icon:"⚡",name:"Hard Cycling",mult:1.65,desc:"60+ min intense cycling"},
  {id:"swim",icon:"🏊",name:"Swimming",mult:1.55,desc:"45-60 min swim"},
  {id:"football",icon:"⚽",name:"Football / Sport",mult:1.65,desc:"90 min game or training"},
  {id:"hiit",icon:"🌪️",name:"HIIT Session",mult:1.6,desc:"30-45 min HIIT"},
  {id:"double_mod",icon:"2️⃣",name:"Two Sessions",mult:1.75,desc:"Two moderate sessions"},
  {id:"double_hard",icon:"💥",name:"Double Hard",mult:1.9,desc:"Two intense sessions"},
  {id:"run_gym",icon:"🏅",name:"Run + Gym",mult:1.8,desc:"Run AND weights same day"},
  {id:"comp",icon:"🏆",name:"Competition",mult:1.9,desc:"Match day / competition"},
  {id:"custom",icon:"✏️",name:"Custom",mult:null,desc:"Enter your own multiplier"},
];

const GOAL_ADJUSTMENTS = {
  "Rapid fat loss (0.5kg/week)":{mult:0.85,label:"−15% deficit"},
  "Gradual fat loss (0.25kg/week)":{mult:0.9,label:"−10% deficit"},
  "Body recomposition":{mult:1.0,label:"Maintenance"},
  "Gradually build muscle":{mult:1.1,label:"+10% surplus"},
  "Bulk (fast muscle gain)":{mult:1.15,label:"+15% surplus"},
  "Lose body fat":{mult:0.9,label:"−10% deficit"},
  "Build muscle":{mult:1.1,label:"+10% surplus"},
  "Improve energy & performance":{mult:1.0,label:"Maintenance"},
  "Recovery & wellness":{mult:1.0,label:"Maintenance"},
  "Gut health":{mult:1.0,label:"Maintenance"},
};

const BF_OPTIONS_MALE = [
  {pct:8,figure:"🧍",label:"Very lean",desc:"Visible abs, very low fat"},
  {pct:12,figure:"🧍",label:"Lean",desc:"Some ab definition"},
  {pct:16,figure:"🧍",label:"Average fit",desc:"Athletic but not defined"},
  {pct:22,figure:"🧍",label:"Average",desc:"Soft, minimal definition"},
  {pct:28,figure:"🧍",label:"Above average",desc:"Carrying excess fat"},
  {pct:35,figure:"🧍",label:"High body fat",desc:"Significant excess fat"},
];

const BF_OPTIONS_FEMALE = [
  {pct:15,figure:"🧍‍♀️",label:"Very lean",desc:"Visible muscle, very low fat"},
  {pct:20,figure:"🧍‍♀️",label:"Lean",desc:"Toned, some definition"},
  {pct:25,figure:"🧍‍♀️",label:"Average fit",desc:"Healthy, athletic build"},
  {pct:30,figure:"🧍‍♀️",label:"Average",desc:"Soft, healthy range"},
  {pct:36,figure:"🧍‍♀️",label:"Above average",desc:"Carrying some excess fat"},
  {pct:42,figure:"🧍‍♀️",label:"High body fat",desc:"Significant excess fat"},
];

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

/* ─── CALCULATIONS ───────────────────────────────────────────────────────── */
// Harris-Benedict, revised (Roza & Shizgal, 1984)
function calcBMR(weight, height, age, sex){
  if(!weight||!height||!age) return 0;
  if(sex==="female") return 447.593 + 9.247*weight + 3.098*height - 4.330*age;
  return 88.362 + 13.397*weight + 4.799*height - 5.677*age;
}

function calcTargets(profile, activityMult){
  const {weight, height, age, sex="male", bodyFatPct=20, goal=""} = profile;
  const bmr = calcBMR(weight, height, age, sex);
  const tdee = bmr * activityMult;
  const goalAdj = GOAL_ADJUSTMENTS[goal] || {mult:1.0};
  const calories = Math.round(tdee * goalAdj.mult);
  const lbm = weight * (1 - bodyFatPct/100);
  const protein = Math.round(1.6 * lbm);
  const hydration = Math.round((35 * lbm) / 1000 * 2) / 2;
  const carbs = Math.round((calories * 0.4) / 4);
  const fats = Math.round((calories * 0.3) / 9);
  return { calories, protein, hydration, carbs, fats, bmr: Math.round(bmr), tdee: Math.round(tdee), lbm: Math.round(lbm) };
}

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
function TSLogo(){
  return <div className="logo">
    <div className="logo-box"><span className="logo-ts">TS</span><div className="logo-slash"/></div>
    <div className="logo-text">Tom Saunders <span>Nutrition</span></div>
  </div>;
}
function Prog({label,val,max,col="p-green",unit=""}){
  const p=Math.min(((val||0)/(max||1))*100,100);
  return <div className="macro-bar">
    <div className="pl"><span>{label}</span><span style={{color:B.grey}}>{val}{unit} / {max}{unit}</span></div>
    <div className="pt"><div className={`pf ${col}`} style={{width:`${p}%`}}/></div>
  </div>;
}
function Badge({status}){
  if(status==="on-track") return <span className="badge badge-green">● On Track</span>;
  if(status==="needs-attention") return <span className="badge badge-amber">● Attention</span>;
  if(status==="new") return <span className="badge badge-blue">● New</span>;
  return <span className="badge badge-red">● Off Track</span>;
}
function fmtTime(ts){
  if(!ts) return "";
  const d=new Date(ts);
  return d.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})+" · "+d.toLocaleDateString([],{weekday:"short",day:"numeric",month:"short"});
}

/* ─── MESSAGING ──────────────────────────────────────────────────────────── */
function Messaging({myEmail,otherEmail,myId}){
  const [messages,setMessages]=useState([]);
  const [draft,setDraft]=useState("");
  const [sending,setSending]=useState(false);
  const bottomRef=useRef(null);

  useEffect(()=>{
    if(!otherEmail) return;
    loadMessages();
    const channel=supabase.channel("msg_"+otherEmail)
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"messages"},payload=>{
        const m=payload.new;
        if((m.sender_email===myEmail&&m.receiver_email===otherEmail)||(m.sender_email===otherEmail&&m.receiver_email===myEmail)){
          setMessages(prev=>[...prev,m]);
        }
      }).subscribe();
    return ()=>supabase.removeChannel(channel);
  },[otherEmail]);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);

  async function loadMessages(){
    const {data}=await supabase.from("messages").select("*")
      .or(`and(sender_email.eq.${myEmail},receiver_email.eq.${otherEmail}),and(sender_email.eq.${otherEmail},receiver_email.eq.${myEmail})`)
      .order("created_at",{ascending:true});
    if(data) setMessages(data);
  }

  async function send(){
    if(!draft.trim()||!otherEmail) return;
    setSending(true);
    const newMsg={sender_id:myId,sender_email:myEmail,receiver_email:otherEmail,message:draft.trim(),created_at:new Date().toISOString(),read:false};
    setMessages(prev=>[...prev,newMsg]);
    setDraft("");
    await supabase.from("messages").insert(newMsg);
    setSending(false);
  }

  if(!otherEmail) return <div style={{color:B.grey,fontSize:"0.85rem",padding:"1rem"}}>Select a client to message.</div>;
  return <div>
    <div className="msg-wrap">
      {messages.length===0
        ?<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",flexDirection:"column",gap:"0.5rem",color:B.grey}}><div style={{fontSize:"1.5rem"}}>💬</div><div style={{fontSize:"0.85rem"}}>No messages yet.</div></div>
        :messages.map((m,i)=>{
          const mine=m.sender_email===myEmail;
          return <div key={i} className={`msg-row ${mine?"mine":"theirs"}`}>
            <div className={`msg-bubble ${mine?"mine":"theirs"}`}>{m.message}</div>
            <div className="msg-time">{fmtTime(m.created_at)}</div>
          </div>;
        })
      }
      <div ref={bottomRef}/>
    </div>
    <div className="fg">
      <input className="inp" style={{flex:1}} placeholder="Type a message…" value={draft}
        onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()}/>
      <button className="btn btn-g btn-sm" onClick={send} disabled={sending||!draft.trim()}>{sending?"…":"Send →"}</button>
    </div>
  </div>;
}

/* ─── DAILY TARGET SELECTOR ──────────────────────────────────────────────── */
function DailyTargets({profile}){
  const [selActivity,setSelActivity]=useState(ACTIVITIES[5]);
  const [customMult,setCustomMult]=useState(1.5);
  const mult = selActivity.id==="custom" ? customMult : selActivity.mult;
  const targets = profile?.weight ? calcTargets(profile, mult) : null;
  const goalLabel = GOAL_ADJUSTMENTS[profile?.goal]?.label || "Maintenance";

  return <div className="card">
    <div className="card-hd">📊 Today's Nutrition Targets</div>

    <div style={{marginBottom:"1rem"}}>
      <div style={{fontSize:"0.72rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.6rem"}}>
        Select today's activity level:
      </div>
      <div className="act-grid">
        {ACTIVITIES.map(a=>(
          <div key={a.id} className={`act-card ${selActivity.id===a.id?"sel":""}`} onClick={()=>setSelActivity(a)}>
            <div className="act-icon">{a.icon}</div>
            <div className="act-name">{a.name}</div>
            <div className="act-mult">{a.mult ? `×${a.mult} TDEE` : "Custom"}</div>
            <div className="act-desc">{a.desc}</div>
          </div>
        ))}
      </div>
      {selActivity.id==="custom"&&(
        <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginTop:"0.75rem",padding:"0.75rem",background:B.darker,borderRadius:"8px",border:`1px solid ${B.border}`}}>
          <label className="inp-label" style={{margin:0,whiteSpace:"nowrap"}}>Activity Multiplier:</label>
          <input type="range" min="1.2" max="2.0" step="0.05" value={customMult} onChange={e=>setCustomMult(parseFloat(e.target.value))} style={{flex:1,accentColor:B.green}}/>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,color:B.green,fontSize:"1rem",minWidth:30}}>×{customMult}</span>
        </div>
      )}
    </div>

    {targets ? <>
      <div className="div"/>
      <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.85rem"}}>
        <div style={{fontSize:"0.72rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey}}>
          {selActivity.name} · Goal: {profile.goal||"General"} · <span style={{color:B.green}}>{goalLabel}</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.75rem",marginBottom:"1rem"}}>
        <div className="tcard green-t">
          <div className="tcard-num">{targets.calories.toLocaleString()}</div>
          <div className="tcard-unit">kcal</div>
          <div className="tcard-lbl">Calories</div>
        </div>
        <div className="tcard amber-t">
          <div className="tcard-num">{targets.protein}</div>
          <div className="tcard-unit">grams</div>
          <div className="tcard-lbl">Protein</div>
        </div>
        <div className="tcard" style={{borderTopColor:B.blue}}>
          <div className="tcard-num">{targets.hydration}</div>
          <div className="tcard-unit">litres</div>
          <div className="tcard-lbl">Hydration</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.75rem",marginBottom:"1rem"}}>
        <div style={{background:B.darker,border:`1px solid ${B.border}`,borderRadius:"8px",padding:"0.75rem",textAlign:"center"}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.2rem",fontWeight:700,color:B.white}}>{targets.carbs}g</div>
          <div style={{fontSize:"0.65rem",color:B.grey,textTransform:"uppercase",letterSpacing:"0.08em"}}>Carbohydrates</div>
        </div>
        <div style={{background:B.darker,border:`1px solid ${B.border}`,borderRadius:"8px",padding:"0.75rem",textAlign:"center"}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.2rem",fontWeight:700,color:B.white}}>{targets.fats}g</div>
          <div style={{fontSize:"0.65rem",color:B.grey,textTransform:"uppercase",letterSpacing:"0.08em"}}>Fats</div>
        </div>
        <div style={{background:B.darker,border:`1px solid ${B.border}`,borderRadius:"8px",padding:"0.75rem",textAlign:"center"}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.2rem",fontWeight:700,color:B.white}}>{targets.bmr}</div>
          <div style={{fontSize:"0.65rem",color:B.grey,textTransform:"uppercase",letterSpacing:"0.08em"}}>BMR</div>
        </div>
      </div>
      <div style={{background:B.darker,border:`1px solid ${B.border}`,borderRadius:"8px",padding:"0.75rem",fontSize:"0.78rem",color:B.grey}}>
        Based on: <strong style={{color:B.greyLt}}>{profile.weight}kg body weight</strong> · <strong style={{color:B.greyLt}}>{profile.bodyFatPct||20}% body fat</strong> · <strong style={{color:B.greyLt}}>{targets.lbm}kg lean body mass</strong>
      </div>
    </> : <div style={{textAlign:"center",padding:"2rem",color:B.grey,fontSize:"0.85rem"}}>Complete your assessment to see personalised targets.</div>}
  </div>;
}

/* ─── WEEKLY PLAN TARGETS ────────────────────────────────────────────────── */
const DEFAULT_WEEK={Mon:"rest",Tue:"rest",Wed:"rest",Thu:"rest",Fri:"rest",Sat:"rest",Sun:"rest"};

function WeeklyTargets({profile, clientEmail}){
  const [weekPlan,setWeekPlan]=useState(DEFAULT_WEEK);
  const [saveState,setSaveState]=useState("");
  const canSave = clientEmail && !clientEmail.includes("@demo.com");

  useEffect(()=>{ loadPlan(); },[clientEmail]);

  async function loadPlan(){
    if(!canSave){ setWeekPlan(DEFAULT_WEEK); return; }
    const {data}=await supabase.from("week_plans").select("plan").eq("client_email",clientEmail).maybeSingle();
    setWeekPlan(data?.plan ? {...DEFAULT_WEEK,...data.plan} : DEFAULT_WEEK);
  }

  async function setDay(day,actId){
    const next={...weekPlan,[day]:actId};
    setWeekPlan(next);
    if(!canSave) return;
    setSaveState("Saving…");
    const {error}=await supabase.from("week_plans").upsert({client_email:clientEmail,plan:next,updated_at:new Date().toISOString()});
    setSaveState(error ? "Couldn't save — please try again" : "Saved ✓");
    if(!error) setTimeout(()=>setSaveState(""),1500);
  }

  return <div className="card">
    <div className="fb" style={{marginBottom:"0.85rem"}}>
      <div className="card-hd" style={{margin:0}}>📅 Weekly Target Planner</div>
      {saveState&&<span style={{fontSize:"0.75rem",color:saveState.startsWith("Couldn't")?B.alert:B.greenLt}}>{saveState}</span>}
    </div>
    <div style={{fontSize:"0.78rem",color:B.grey,marginBottom:"1rem"}}>
      Set your activity for each day to see your personalised calorie and protein targets across the week.
    </div>
    {DAYS.map(day=>{
      const actId=weekPlan[day]||"rest";
      const act=ACTIVITIES.find(a=>a.id===actId)||ACTIVITIES[0];
      const targets=profile?.weight ? calcTargets(profile, act.mult||1.2) : null;
      return <div className="week-row" key={day}>
        <div className="week-day">{day}</div>
        <div className="week-sel">
          <select className="inp" style={{padding:"0.4rem 0.6rem",fontSize:"0.8rem"}} value={actId} onChange={e=>setDay(day,e.target.value)}>
            {ACTIVITIES.filter(a=>a.id!=="custom").map(a=>(
              <option key={a.id} value={a.id}>{a.icon} {a.name}</option>
            ))}
          </select>
        </div>
        {targets && <>
          <div className="week-result">{targets.calories.toLocaleString()} <span style={{fontSize:"0.65rem",color:B.grey}}>kcal</span></div>
          <div className="week-protein">{targets.protein}g <span style={{fontSize:"0.65rem",color:B.grey}}>protein</span></div>
        </>}
      </div>;
    })}
  </div>;
}

/* ─── MORNING / EVENING ROUTINES ─────────────────────────────────────────── */
function Routines({clientEmail, isManager}){
  const [routine,setRoutine]=useState(null);
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState({morning:"",evening:"",amSupps:"",pmSupps:""});
  const [saving,setSaving]=useState(false);

  useEffect(()=>{ loadRoutine(); },[clientEmail]);

  async function loadRoutine(){
    if(!clientEmail) return;
    const {data}=await supabase.from("routines").select("*").eq("client_email",clientEmail).single();
    if(data){ setRoutine(data); setDraft({morning:data.morning||"",evening:data.evening||"",amSupps:data.am_supps||"",pmSupps:data.pm_supps||""}); }
  }

  async function save(){
    setSaving(true);
    await supabase.from("routines").upsert({client_email:clientEmail,morning:draft.morning,evening:draft.evening,am_supps:draft.amSupps,pm_supps:draft.pmSupps,updated_at:new Date().toISOString()});
    setSaving(false);
    setEditing(false);
    loadRoutine();
  }

  function parseItems(text){ return text ? text.split("\n").filter(l=>l.trim()) : []; }

  if(isManager && editing) return <div className="card">
    <div className="card-hd">✏️ Edit Routines & Supplements</div>
    <div style={{fontSize:"0.78rem",color:B.grey,marginBottom:"1rem"}}>Enter each item on a new line. You can include times e.g. "07:00 — Drink 500ml water with salt and lemon"</div>
    <div className="g2" style={{marginBottom:"1rem"}}>
      <div>
        <div className="inp-group"><label className="inp-label">☀️ Morning Routine</label><textarea className="inp" rows={6} value={draft.morning} onChange={e=>setDraft(d=>({...d,morning:e.target.value}))} placeholder={"07:00 — Get morning sunlight\n07:05 — Drink 500ml water with salt and lemon\n07:10 — Breathwork (5 minutes)\n07:15 — Cold shower"}/></div>
        <div className="inp-group"><label className="inp-label">💊 AM Supplements</label><textarea className="inp" rows={4} value={draft.amSupps} onChange={e=>setDraft(d=>({...d,amSupps:e.target.value}))} placeholder={"Vitamin D3 K2 — 2000 IU\nOmega-3 — 1000mg EPA/DHA\nCreatine Monohydrate — 5g"}/></div>
      </div>
      <div>
        <div className="inp-group"><label className="inp-label">🌙 Evening Routine</label><textarea className="inp" rows={6} value={draft.evening} onChange={e=>setDraft(d=>({...d,evening:e.target.value}))} placeholder={"21:00 — Remove blue light / screens off\n21:15 — Foam roll and stretch\n21:30 — Read or journal\n22:00 — Floss, tongue scrape and brush teeth"}/></div>
        <div className="inp-group"><label className="inp-label">💊 PM Supplements</label><textarea className="inp" rows={4} value={draft.pmSupps} onChange={e=>setDraft(d=>({...d,pmSupps:e.target.value}))} placeholder={"Magnesium Glycinate — 400mg\nLion's Mane — 1000mg\nL-Theanine — 200mg"}/></div>
      </div>
    </div>
    <div className="fg">
      <button className="btn btn-g" onClick={save} disabled={saving}>{saving?"Saving…":"Save Routine ✓"}</button>
      <button className="btn btn-o" onClick={()=>setEditing(false)}>Cancel</button>
    </div>
  </div>;

  const morningItems=parseItems(routine?.morning);
  const eveningItems=parseItems(routine?.evening);
  const amSuppItems=parseItems(routine?.am_supps);
  const pmSuppItems=parseItems(routine?.pm_supps);
  const hasContent=morningItems.length||eveningItems.length||amSuppItems.length||pmSuppItems.length;

  return <div className="card">
    <div className="fb" style={{marginBottom:"1rem"}}>
      <div className="card-hd" style={{margin:0}}>🌅 Daily Routines & Supplements</div>
      {isManager&&<button className="btn btn-ghost btn-sm" onClick={()=>setEditing(true)}>✏️ Edit</button>}
    </div>
    {!hasContent ? <div style={{textAlign:"center",padding:"2rem",color:B.grey,fontSize:"0.85rem"}}>
      {isManager?"Click Edit to add this client's morning and evening routines.":"Your coach will add your daily routines here soon."}
    </div> : <div className="g2">
      <div>
        <div style={{fontSize:"0.72rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.green,marginBottom:"0.5rem"}}>☀️ Morning Routine</div>
        {morningItems.map((item,i)=>{
          const parts=item.split("—");
          const time=parts.length>1?parts[0].trim():null;
          const text=parts.length>1?parts.slice(1).join("—").trim():item;
          return <div key={i} className="routine-item">
            <div className="routine-dot"/>
            <div style={{flex:1}}>{text}</div>
            {time&&<div className="routine-time-tag">{time}</div>}
          </div>;
        })}
        {amSuppItems.length>0&&<>
          <div style={{fontSize:"0.72rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.amber,margin:"0.85rem 0 0.5rem"}}>💊 AM Supplements</div>
          {amSuppItems.map((item,i)=>{
            const parts=item.split("—");
            const name=parts[0].trim();
            const dose=parts.length>1?parts[1].trim():"";
            return <div key={i} className="supp-row">
              <div className="supp-dot" style={{background:B.green}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:"0.86rem",fontWeight:500,color:B.white}}>{name}</div>
                {dose&&<div style={{fontSize:"0.72rem",color:B.grey}}>{dose}</div>}
              </div>
            </div>;
          })}
        </>}
      </div>
      <div>
        <div style={{fontSize:"0.72rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.blue,marginBottom:"0.5rem"}}>🌙 Evening Routine</div>
        {eveningItems.map((item,i)=>{
          const parts=item.split("—");
          const time=parts.length>1?parts[0].trim():null;
          const text=parts.length>1?parts.slice(1).join("—").trim():item;
          return <div key={i} className="routine-item">
            <div className="routine-dot" style={{background:B.blue}}/>
            <div style={{flex:1}}>{text}</div>
            {time&&<div className="routine-time-tag" style={{color:B.blue,background:"rgba(74,144,217,0.1)",borderColor:"rgba(74,144,217,0.3)"}}>{time}</div>}
          </div>;
        })}
        {pmSuppItems.length>0&&<>
          <div style={{fontSize:"0.72rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.amber,margin:"0.85rem 0 0.5rem"}}>💊 PM Supplements</div>
          {pmSuppItems.map((item,i)=>{
            const parts=item.split("—");
            const name=parts[0].trim();
            const dose=parts.length>1?parts[1].trim():"";
            return <div key={i} className="supp-row">
              <div className="supp-dot" style={{background:B.amber}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:"0.86rem",fontWeight:500,color:B.white}}>{name}</div>
                {dose&&<div style={{fontSize:"0.72rem",color:B.grey}}>{dose}</div>}
              </div>
            </div>;
          })}
        </>}
      </div>
    </div>}
  </div>;
}

/* ─── LOGIN ──────────────────────────────────────────────────────────────── */
function LoginPage(){
  const [isSignup,setIsSignup]=useState(false);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [error,setError]=useState("");
  const [success,setSuccess]=useState("");
  const [loading,setLoading]=useState(false);

  async function handleSubmit(){
    setError("");setSuccess("");setLoading(true);
    if(isSignup){
      const {error}=await signUp(email,pass,name);
      if(error){setError(error.message);}
      else{setSuccess("Account created! Signing you in...");}
    } else {
      const {error}=await signIn(email,pass);
      if(error){setError("Incorrect email or password.");}
    }
    setLoading(false);
  }

  return <div className="auth-wrap">
    <div className="auth-box">
      <div style={{display:"flex",justifyContent:"center",marginBottom:"2rem"}}><TSLogo/></div>
      <div className="auth-title">{isSignup?"Create Your Account":"Welcome Back"}</div>
      <div className="auth-sub">{isSignup?"Sign up to access your personalised nutrition plan":"Sign in to your Tom Saunders Nutrition account"}</div>
      {error&&<div className="err">{error}</div>}
      {success&&<div className="success">{success}</div>}
      {isSignup&&<div className="inp-group"><label className="inp-label">Full Name</label><input className="inp" value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name"/></div>}
      <div className="inp-group"><label className="inp-label">Email Address</label><input className="inp" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" onKeyDown={e=>e.key==="Enter"&&handleSubmit()}/></div>
      <div className="inp-group"><label className="inp-label">Password</label><input className="inp" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&handleSubmit()}/></div>
      <button className="btn btn-g btn-full" onClick={handleSubmit} disabled={loading}>{loading?"Please wait…":isSignup?"Create Account →":"Sign In →"}</button>
      <div className="auth-switch">
        {isSignup?"Already have an account? ":"New client? "}
        <span onClick={()=>{setIsSignup(s=>!s);setError("");}}>{isSignup?"Sign in":"Sign up here"}</span>
      </div>
    </div>
  </div>;
}

/* ─── ASSESSMENT ─────────────────────────────────────────────────────────── */
function Assessment({user,onComplete}){
  const [step,setStep]=useState(0);
  const [saving,setSaving]=useState(false);
  const [data,setData]=useState({
    firstName:"",lastName:"",age:"",height:"",weight:"",sex:"male",bodyFatPct:20,goal:"",
    activityLevel:"",workSchedule:"",mealPrepTime:"",
    sleepWake:"",sleepBed:"",sleepQuality:"",
    conditions:"",medications:"",intolerances:"",dietPrefs:[],
    barriers:[],recoveryMethods:[],notes:""
  });
  const total=8;
  const set=(k,v)=>setData(d=>({...d,[k]:v}));
  const toggle=(k,v)=>setData(d=>({...d,[k]:d[k].includes(v)?d[k].filter(x=>x!==v):[...d[k],v]}));

  const bfOptions = data.sex==="female" ? BF_OPTIONS_FEMALE : BF_OPTIONS_MALE;

  async function submit(){
    setSaving(true);
    try{
      await supabase.from("assessments").upsert({user_id:user.id,email:user.email,data:data,completed_at:new Date().toISOString()});
    }catch(e){console.log(e);}
    setSaving(false);
    onComplete(data);
  }

  const steps=[
    // 0 Personal
    <div key={0}>
      <div className="assess-title">Personal Details</div>
      <div className="assess-sub">Let's start with the basics to build your profile.</div>
      <div className="g2">
        <div className="inp-group"><label className="inp-label">First Name</label><input className="inp" value={data.firstName} onChange={e=>set("firstName",e.target.value)} placeholder="e.g. Tom"/></div>
        <div className="inp-group"><label className="inp-label">Last Name</label><input className="inp" value={data.lastName} onChange={e=>set("lastName",e.target.value)} placeholder="e.g. Saunders"/></div>
      </div>
      <div className="g3">
        <div className="inp-group"><label className="inp-label">Age</label><input className="inp" type="number" value={data.age} onChange={e=>set("age",e.target.value)} placeholder="25"/></div>
        <div className="inp-group"><label className="inp-label">Height (cm)</label><input className="inp" type="number" value={data.height} onChange={e=>set("height",e.target.value)} placeholder="178"/></div>
        <div className="inp-group"><label className="inp-label">Weight (kg)</label><input className="inp" type="number" value={data.weight} onChange={e=>set("weight",e.target.value)} placeholder="80"/></div>
      </div>
      <div className="inp-group"><label className="inp-label">Sex</label>
        <div className="fg">
          {["male","female"].map(s=>(
            <div key={s} className={`radio-item ${data.sex===s?"selected":""}`} style={{flex:1}} onClick={()=>set("sex",s)}>
              <div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${data.sex===s?B.green:B.border}`,background:data.sex===s?B.green:"transparent",flexShrink:0}}/>
              {s.charAt(0).toUpperCase()+s.slice(1)}
            </div>
          ))}
        </div>
      </div>
      <div className="inp-group"><label className="inp-label">Primary Goal</label>
        <select className="inp" value={data.goal} onChange={e=>set("goal",e.target.value)}>
          <option value="">Select your goal...</option>
          <option>Rapid fat loss (0.5kg/week)</option>
          <option>Gradual fat loss (0.25kg/week)</option>
          <option>Body recomposition</option>
          <option>Gradually build muscle</option>
          <option>Bulk (fast muscle gain)</option>
          <option>Improve energy & performance</option>
          <option>Recovery & wellness</option>
        </select>
      </div>
    </div>,

    // 1 Body fat selector
    <div key={1}>
      <div className="assess-title">Body Composition</div>
      <div className="assess-sub">Select the image that best represents your current body fat level. This is used to precisely calculate your protein and hydration targets.</div>
      <div className="bf-grid">
        {bfOptions.map(opt=>(
          <div key={opt.pct} className={`bf-card ${data.bodyFatPct===opt.pct?"sel":""}`} onClick={()=>set("bodyFatPct",opt.pct)}>
            <div className="bf-figure">{opt.figure}</div>
            <div className="bf-pct">{opt.pct}%</div>
            <div className="bf-lbl">{opt.label}</div>
            <div style={{fontSize:"0.58rem",color:B.grey,marginTop:"0.1rem",lineHeight:1.2}}>{opt.desc}</div>
          </div>
        ))}
      </div>
      <div style={{background:B.darker,border:`1px solid ${B.border}`,borderRadius:"8px",padding:"0.85rem",fontSize:"0.82rem",color:B.grey}}>
        Selected: <strong style={{color:B.white}}>{data.bodyFatPct}% body fat</strong>
        {data.weight&&<> · Estimated lean body mass: <strong style={{color:B.green}}>{Math.round(data.weight*(1-data.bodyFatPct/100))}kg</strong></>}
      </div>
    </div>,

    // 2 Training
    <div key={2}>
      <div className="assess-title">Training & Activity</div>
      <div className="assess-sub">Tell us about your exercise habits.</div>
      <div className="inp-group"><label className="inp-label">General Activity Level</label>
        <div className="radio-group">
          {["Sedentary (desk job, little exercise)","Lightly active (1-2 sessions/week)","Moderately active (3-4 sessions/week)","Very active (5+ sessions/week)","Athlete (training twice daily)"].map(o=>(
            <div key={o} className={`radio-item ${data.activityLevel===o?"selected":""}`} onClick={()=>set("activityLevel",o)}>
              <div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${data.activityLevel===o?B.green:B.border}`,background:data.activityLevel===o?B.green:"transparent",flexShrink:0}}/>
              {o}
            </div>
          ))}
        </div>
      </div>
      <div className="inp-group"><label className="inp-label">Work Schedule & how it affects training</label><textarea className="inp" rows={3} value={data.workSchedule} onChange={e=>set("workSchedule",e.target.value)} placeholder="e.g. I work 9-5 Mon-Fri, train before work..."/></div>
      <div className="inp-group"><label className="inp-label">Time for meal prep per week</label>
        <select className="inp" value={data.mealPrepTime} onChange={e=>set("mealPrepTime",e.target.value)}>
          <option value="">Select...</option>
          <option>Less than 30 minutes</option><option>30-60 minutes</option><option>1-2 hours</option><option>2-3 hours</option><option>3+ hours</option>
        </select>
      </div>
    </div>,

    // 3 Sleep
    <div key={3}>
      <div className="assess-title">Sleep Patterns</div>
      <div className="assess-sub">Sleep is critical for recovery and body composition.</div>
      <div className="g2">
        <div className="inp-group"><label className="inp-label">Typical Wake Time</label><input className="inp" value={data.sleepWake} onChange={e=>set("sleepWake",e.target.value)} placeholder="e.g. 07:00"/></div>
        <div className="inp-group"><label className="inp-label">Typical Bedtime</label><input className="inp" value={data.sleepBed} onChange={e=>set("sleepBed",e.target.value)} placeholder="e.g. 22:30"/></div>
      </div>
      <div className="inp-group"><label className="inp-label">Sleep Quality</label>
        <div className="radio-group">
          {["Poor — I rarely feel rested","Average — some nights are good","Good — I usually sleep well","Excellent — I sleep very well"].map(o=>(
            <div key={o} className={`radio-item ${data.sleepQuality===o?"selected":""}`} onClick={()=>set("sleepQuality",o)}>
              <div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${data.sleepQuality===o?B.green:B.border}`,background:data.sleepQuality===o?B.green:"transparent",flexShrink:0}}/>
              {o}
            </div>
          ))}
        </div>
      </div>
    </div>,

    // 4 Diet
    <div key={4}>
      <div className="assess-title">Dietary Preferences</div>
      <div className="assess-sub">This helps us build a plan that works for your lifestyle.</div>
      <div className="inp-group"><label className="inp-label">Food allergies or intolerances</label><input className="inp" value={data.intolerances} onChange={e=>set("intolerances",e.target.value)} placeholder="e.g. Lactose intolerant, nut allergy... or None"/></div>
      <div className="inp-group"><label className="inp-label">Dietary preferences</label>
        <div className="checkbox-group">
          {["None","Vegetarian","Vegan","Gluten-free","Dairy-free","Low FODMAP","Halal","Kosher"].map(o=>(
            <div key={o} className={`checkbox-item ${data.dietPrefs.includes(o)?"checked":""}`} onClick={()=>toggle("dietPrefs",o)}>
              <span>{data.dietPrefs.includes(o)?"✓":"○"}</span>{o}
            </div>
          ))}
        </div>
      </div>
    </div>,

    // 5 Health
    <div key={5}>
      <div className="assess-title">Health & Medications</div>
      <div className="assess-sub">All information is strictly confidential.</div>
      <div className="inp-group"><label className="inp-label">Current health conditions</label><textarea className="inp" rows={3} value={data.conditions} onChange={e=>set("conditions",e.target.value)} placeholder="e.g. Type 2 diabetes, IBS... or None"/></div>
      <div className="inp-group"><label className="inp-label">Current medications or supplements</label><textarea className="inp" rows={3} value={data.medications} onChange={e=>set("medications",e.target.value)} placeholder="e.g. Metformin 500mg, Vitamin D3... or None"/></div>
    </div>,

    // 6 Recovery
    <div key={6}>
      <div className="assess-title">Recovery Methods</div>
      <div className="assess-sub">What recovery tools do you currently use?</div>
      <div className="checkbox-group">
        {["Red light therapy","Hyperbaric oxygen","Cold water immersion","Hot sauna","Foam rolling","Stretching/yoga","Breathwork","Massage","None currently"].map(o=>(
          <div key={o} className={`checkbox-item ${data.recoveryMethods.includes(o)?"checked":""}`} onClick={()=>toggle("recoveryMethods",o)}>
            <span>{data.recoveryMethods.includes(o)?"✓":"○"}</span>{o}
          </div>
        ))}
      </div>
    </div>,

    // 7 Barriers
    <div key={7}>
      <div className="assess-title">Barriers & Notes</div>
      <div className="assess-sub">What might make it hard to stick to a nutrition plan?</div>
      <div className="checkbox-group">
        {["Busy work schedule","Family commitments","Social events","Eating out frequently","Travel","Stress & emotional eating","Lack of cooking skills","Budget constraints","Lack of motivation","Inconsistent routine"].map(o=>(
          <div key={o} className={`checkbox-item ${data.barriers.includes(o)?"checked":""}`} onClick={()=>toggle("barriers",o)}>
            <span>{data.barriers.includes(o)?"✓":"○"}</span>{o}
          </div>
        ))}
      </div>
      <div className="inp-group" style={{marginTop:"1rem"}}>
        <label className="inp-label">Anything else you'd like Tom to know?</label>
        <textarea className="inp" rows={4} value={data.notes} onChange={e=>set("notes",e.target.value)} placeholder="Any other information that would help us build the best plan for you..."/>
      </div>
    </div>
  ];

  return <div style={{maxWidth:680,margin:"0 auto"}}>
    <div className="banner" style={{marginBottom:"1.5rem"}}>
      <div className="banner-label">Tom Saunders Nutrition</div>
      <div className="banner-title">Client Assessment</div>
      <div className="banner-sub">Complete all sections so Tom can build your personalised plan.</div>
    </div>
    <div className="progress-steps">{Array.from({length:total}).map((_,i)=><div key={i} className={`step-dot ${i<step?"done":i===step?"active":""}`}/>)}</div>
    <div className="assess-step">
      {steps[step]}
      <div className="div"/>
      <div className="fb">
        <div style={{fontSize:"0.78rem",color:B.grey}}>Step {step+1} of {total}</div>
        <div className="fg">
          {step>0&&<button className="btn btn-o btn-sm" onClick={()=>setStep(s=>s-1)}>← Back</button>}
          {step<total-1?<button className="btn btn-g btn-sm" onClick={()=>setStep(s=>s+1)}>Continue →</button>:<button className="btn btn-g" onClick={submit} disabled={saving}>{saving?"Saving…":"Submit Assessment ✓"}</button>}
        </div>
      </div>
    </div>
  </div>;
}

/* ─── AI MEAL GEN ────────────────────────────────────────────────────────── */
function AIMealGen({client}){
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState("");
  const [prompt,setPrompt]=useState(`Create a 3-day meal plan for ${client.name||"this client"}. Goal: ${client.goal||"general health"}. Conditions: ${client.conditions?.join(", ")||"None"}. Dietary: ${client.tags?.join(", ")||"None"}.`);
  async function generate(){
    setLoading(true);setResult("");
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:"You are Tom Saunders, a professional nutritionist. Create practical, science-led meal plans with specific portions, calories and protein per meal.",messages:[{role:"user",content:prompt}]})});
      const d=await res.json();
      const text=d.content?.find(b=>b.type==="text")?.text||"No response.";
      let i=0;const iv=setInterval(()=>{i=Math.min(i+10,text.length);setResult(text.slice(0,i));if(i>=text.length){clearInterval(iv);setLoading(false);}},20);
    }catch(e){setResult("Error. Please try again.");setLoading(false);}
  }
  return <div>
    <div className="card-hd">✦ AI Meal Plan Generator</div>
    <textarea className="inp" rows={4} value={prompt} onChange={e=>setPrompt(e.target.value)} style={{marginBottom:"0.75rem"}}/>
    <div className="fg" style={{marginBottom:"0.75rem"}}>
      <button className="btn btn-g btn-sm" onClick={generate} disabled={loading}>{loading?"Generating…":"✦ Generate Plan"}</button>
      {result&&<button className="btn btn-o btn-sm" onClick={()=>setResult("")}>Clear</button>}
    </div>
    {loading&&!result&&<div style={{display:"flex",alignItems:"center",gap:"0.5rem",color:B.grey,fontSize:"0.8rem"}}><div className="dot-pulse"><span/><span/><span/></div><span>Building plan…</span></div>}
    {result&&<div className="ai-box scroll mh300">{result}{loading&&<span className="ai-cursor"/>}</div>}
  </div>;
}

/* ─── CLIENT DASHBOARD ───────────────────────────────────────────────────── */
function ClientDash({user,assessmentData}){
  const [water,setWater]=useState(0);
  const firstName=assessmentData?.firstName||user?.email?.split("@")[0]||"there";
  const goal=assessmentData?.goal||"Your personalised goal";

  const profile = assessmentData ? {
    weight: parseFloat(assessmentData.weight)||0,
    height: parseFloat(assessmentData.height)||0,
    age: parseFloat(assessmentData.age)||0,
    sex: assessmentData.sex||"male",
    bodyFatPct: parseFloat(assessmentData.bodyFatPct)||20,
    goal: assessmentData.goal||"",
  } : null;

  const hydrationTarget = profile ? Math.round((35 * profile.weight * (1 - profile.bodyFatPct/100)) / 1000 * 2) / 2 : 2.5;
  const cupSize = 0.25;
  const totalCups = Math.round(hydrationTarget / cupSize);

  return <div>
    <div className="banner">
      <div className="banner-label">Tom Saunders Nutrition</div>
      <div className="banner-title">Welcome back, {firstName}</div>
      <div className="banner-sub">Goal: {goal}{profile?.bodyFatPct ? ` · ${profile.bodyFatPct}% body fat · ${Math.round(profile.weight*(1-profile.bodyFatPct/100))}kg lean mass` : ""}</div>
    </div>

    {/* Routines first */}
    <Routines clientEmail={user?.email} isManager={false}/>

    {/* Daily Targets */}
    {profile ? <DailyTargets profile={profile}/> : <div className="card"><div style={{textAlign:"center",padding:"1.5rem",color:B.grey,fontSize:"0.85rem"}}>Complete your assessment to unlock personalised calorie targets.</div></div>}

    {/* Weekly Planner */}
    {profile && <WeeklyTargets profile={profile} clientEmail={user?.email}/>}

    {/* Hydration */}
    <div className="card">
      <div className="fb" style={{marginBottom:"0.85rem"}}>
        <div className="card-hd" style={{margin:0}}>💧 Hydration Tracker</div>
        <span style={{fontSize:"0.78rem",color:B.grey}}>{(water*cupSize).toFixed(2)}L / {hydrationTarget}L target</span>
      </div>
      <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap",marginBottom:"0.5rem"}}>
        {Array.from({length:totalCups}).map((_,i)=>(
          <div key={i} className={`wcup ${i<water?"full":""}`} onClick={()=>setWater(i<water?i:i+1)}/>
        ))}
      </div>
      <div style={{fontSize:"0.72rem",color:B.grey}}>Each cup = 250ml · Tap to log</div>
    </div>

    {/* Messages */}
    <div className="card">
      <div className="card-hd">💬 Messages from Tom</div>
      <Messaging myEmail={user?.email} otherEmail={MANAGER_EMAIL} myId={user?.id}/>
    </div>
  </div>;
}

/* ─── MANAGER DASHBOARD ──────────────────────────────────────────────────── */
function ManagerDash({managerUser}){
  const [sel,setSel]=useState(null);
  const [tab,setTab]=useState("assessment");
  const [dbClients,setDbClients]=useState([]);

  useEffect(()=>{ loadClients(); },[]);

  async function loadClients(){
    const {data}=await supabase.from("assessments").select("*").order("completed_at",{ascending:false});
    if(data) setDbClients(data);
  }

  const realClients=dbClients.map((a,i)=>({
    id:"db_"+i,
    name:`${a.data?.firstName||""} ${a.data?.lastName||""}`.trim()||a.email,
    ini:((a.data?.firstName?.[0]||a.email?.[0]||"?").toUpperCase())+((a.data?.lastName?.[0]||"").toUpperCase()),
    col:"#3A7D44",goal:a.data?.goal||"Assessment Complete",
    status:"new",assessed:true,assessmentData:a.data,email:a.email,
    weight:a.data?.weight,conditions:[a.data?.conditions||"None"],tags:a.data?.dietPrefs||[]
  }));

  const DEMO=[
    {id:"d1",name:"Sarah Mitchell",ini:"SM",col:"#4A90D9",goal:"Gradual fat loss (0.25kg/week)",status:"on-track",assessed:true,email:"sarah@demo.com",weight:68,assessmentData:{weight:68,height:165,age:32,sex:"female",bodyFatPct:28,goal:"Gradual fat loss (0.25kg/week)"}},
    {id:"d2",name:"James O'Brien",ini:"JO",col:"#D4A020",goal:"Body recomposition",status:"needs-attention",assessed:true,email:"james@demo.com",weight:84,assessmentData:{weight:84,height:180,age:28,sex:"male",bodyFatPct:22,goal:"Body recomposition"}},
  ];

  const allClients=[...realClients,...DEMO];
  const currentSel=sel||allClients[0];

  const profile = currentSel?.assessmentData ? {
    weight: parseFloat(currentSel.assessmentData.weight)||0,
    height: parseFloat(currentSel.assessmentData.height)||0,
    age: parseFloat(currentSel.assessmentData.age)||0,
    sex: currentSel.assessmentData.sex||"male",
    bodyFatPct: parseFloat(currentSel.assessmentData.bodyFatPct)||20,
    goal: currentSel.assessmentData.goal||"",
  } : null;

  return <div>
    <div className="g4" style={{marginBottom:"1.1rem"}}>
      <div style={{background:B.card,border:`1px solid ${B.border}`,borderLeft:`3px solid ${B.green}`,borderRadius:12,padding:"1.1rem 1.25rem"}}><div style={{fontSize:"0.68rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.4rem"}}>Total Clients</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"2.1rem",fontWeight:700,color:B.white,lineHeight:1}}>{allClients.length}</div></div>
      <div style={{background:B.card,border:`1px solid ${B.border}`,borderLeft:`3px solid ${B.green}`,borderRadius:12,padding:"1.1rem 1.25rem"}}><div style={{fontSize:"0.68rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.4rem"}}>Real Signups</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"2.1rem",fontWeight:700,color:B.white,lineHeight:1}}>{realClients.length}</div></div>
      <div style={{background:B.card,border:`1px solid ${B.border}`,borderLeft:`3px solid ${B.amber}`,borderRadius:12,padding:"1.1rem 1.25rem"}}><div style={{fontSize:"0.68rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.4rem"}}>Demo Clients</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"2.1rem",fontWeight:700,color:B.white,lineHeight:1}}>{DEMO.length}</div></div>
      <div style={{background:B.card,border:`1px solid ${B.border}`,borderLeft:`3px solid ${B.alert}`,borderRadius:12,padding:"1.1rem 1.25rem"}}><div style={{fontSize:"0.68rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.4rem"}}>Need Attention</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"2.1rem",fontWeight:700,color:B.alert,lineHeight:1}}>{DEMO.filter(c=>c.status==="needs-attention").length}</div></div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:"1.1rem"}}>
      <div className="card" style={{padding:"1rem"}}>
        {realClients.length>0&&<div style={{fontSize:"0.65rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.green,padding:"0.3rem 0.5rem 0.6rem"}}>Real Clients</div>}
        <div className="scroll mh400">
          {allClients.map(c=>(
            <div key={c.id} className={`crow ${currentSel?.id===c.id?"sel":""}`} onClick={()=>{setSel(c);setTab("assessment");}}>
              <div className="cav" style={{background:c.col}}>{c.ini}</div>
              <div style={{flex:1}}><div className="cname">{c.name}</div><div className="cmeta">{c.goal}</div></div>
              <Badge status={c.status}/>
            </div>
          ))}
        </div>
      </div>

      {currentSel&&<div className="card">
        <div className="fg" style={{marginBottom:"1.25rem",gap:"0.75rem"}}>
          <div className="cav" style={{background:currentSel.col,width:50,height:50}}>{currentSel.ini}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.2rem",fontWeight:700,color:B.white,textTransform:"uppercase"}}>{currentSel.name}</div>
            <div style={{fontSize:"0.78rem",color:B.grey}}>{currentSel.goal}{currentSel.email?` · ${currentSel.email}`:""}</div>
          </div>
          <Badge status={currentSel.status}/>
        </div>

        <div style={{display:"flex",gap:"0.25rem",background:B.darker,borderRadius:"8px",padding:"0.3rem",border:`1px solid ${B.border}`,marginBottom:"1.25rem",flexWrap:"wrap"}}>
          {["assessment","targets","routines","meal plan","messages","progress"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"0.35rem 0.9rem",borderRadius:"6px",border:"none",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",background:tab===t?B.green:B.darker,color:tab===t?"white":B.grey,transition:"all 0.2s"}}>{t}</button>
          ))}
        </div>

        {tab==="assessment"&&(currentSel.assessed&&currentSel.assessmentData
          ?<div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.75rem",marginBottom:"1rem"}}>
              {[["Age",currentSel.assessmentData.age+"yrs"],["Height",currentSel.assessmentData.height+"cm"],["Weight",currentSel.assessmentData.weight+"kg"],["Body Fat",currentSel.assessmentData.bodyFatPct+"%"],["Sex",currentSel.assessmentData.sex||"—"],["LBM",profile?Math.round(profile.weight*(1-profile.bodyFatPct/100))+"kg":"—"]].map(([l,v])=>(
                <div key={l} style={{background:B.darker,border:`1px solid ${B.border}`,borderRadius:"8px",padding:"0.75rem",textAlign:"center"}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.1rem",fontWeight:700,color:B.white}}>{v||"—"}</div>
                  <div style={{fontSize:"0.65rem",color:B.grey,textTransform:"uppercase",letterSpacing:"0.08em"}}>{l}</div>
                </div>
              ))}
            </div>
            {currentSel.assessmentData.goal&&<div style={{marginBottom:"0.75rem"}}><span style={{fontSize:"0.65rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey}}>Goal: </span><span style={{color:B.greenLt,fontWeight:600}}>{currentSel.assessmentData.goal}</span></div>}
            {currentSel.assessmentData.conditions&&<div style={{marginBottom:"0.75rem"}}><div style={{fontSize:"0.65rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.3rem"}}>Conditions</div><span className="tag">{currentSel.assessmentData.conditions}</span></div>}
            {currentSel.assessmentData.barriers?.length>0&&<div style={{marginBottom:"0.75rem"}}><div style={{fontSize:"0.65rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.3rem"}}>Barriers</div>{currentSel.assessmentData.barriers.map(b=><span key={b} className="tag">{b}</span>)}</div>}
            {currentSel.assessmentData.notes&&<div><div style={{fontSize:"0.65rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.3rem"}}>Notes</div><div style={{background:B.darker,border:`1px solid ${B.border}`,borderRadius:"7px",padding:"0.75rem",fontSize:"0.84rem",color:B.greyLt}}>{currentSel.assessmentData.notes}</div></div>}
          </div>
          :<div style={{textAlign:"center",padding:"3rem",color:B.grey}}>
            <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>📋</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1rem",fontWeight:700,color:B.greyLt,textTransform:"uppercase",marginBottom:"0.35rem"}}>Assessment Pending</div>
          </div>
        )}

        {tab==="targets"&&profile&&<div>
          <div style={{marginBottom:"1rem"}}>
            <div style={{fontSize:"0.72rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.6rem"}}>BMR: {Math.round(calcBMR(profile.weight,profile.height,profile.age,profile.sex))} kcal · LBM: {Math.round(profile.weight*(1-profile.bodyFatPct/100))}kg · Goal adjustment: {GOAL_ADJUSTMENTS[profile.goal]?.label||"Maintenance"}</div>
            <WeeklyTargets profile={profile} clientEmail={currentSel.email}/>
          </div>
        </div>}
        {tab==="targets"&&!profile&&<div style={{color:B.grey,fontSize:"0.85rem",padding:"1rem"}}>No assessment data available for this client.</div>}

        {tab==="routines"&&<Routines clientEmail={currentSel.email} isManager={true}/>}
        {tab==="meal plan"&&<AIMealGen client={currentSel}/>}

        {tab==="messages"&&<div>
          <div className="card-hd">💬 Messages with {currentSel.name}</div>
          {currentSel.email&&!currentSel.email.includes("demo")
            ?<Messaging myEmail={managerUser.email} otherEmail={currentSel.email} myId={managerUser.id}/>
            :<div style={{color:B.grey,fontSize:"0.85rem",padding:"1rem 0"}}>Messaging only available for real clients.</div>
          }
        </div>}

        {tab==="progress"&&<div>
          <div className="card-hd">📈 Progress Tracking</div>
          <div style={{color:B.grey,fontSize:"0.85rem",padding:"1rem 0"}}>Progress tracking coming in Phase 5.</div>
        </div>}
      </div>}
    </div>
  </div>;
}

/* ─── ROOT APP ────────────────────────────────────────────────────────────── */
export default function App(){
  const {session,loading}=useAuth();
  const [view,setView]=useState("dashboard");
  const [assessmentData,setAssessmentData]=useState(null);
  const [needsAssessment,setNeedsAssessment]=useState(false);
  const isManager=session?.user?.email===MANAGER_EMAIL;

  useEffect(()=>{
    if(session&&!isManager){
      supabase.from("assessments").select("*").eq("user_id",session.user.id).single()
        .then(({data})=>{
          if(data){setAssessmentData(data.data);setNeedsAssessment(false);}
          else{setNeedsAssessment(true);}
        });
    }
  },[session]);

  if(loading) return <><style>{G}</style><div className="loading-wrap"><div className="spinner"/><div style={{color:B.grey,fontSize:"0.85rem"}}>Loading...</div></div></>;
  if(!session) return <><style>{G}</style><LoginPage/></>;

  const initials=isManager?"TS":(session.user.email[0].toUpperCase());
  const clientLinks=[["📊","Dashboard","dashboard"],["📊","My Targets","targets"],["💬","Messages","messages"],["📈","Progress","progress"]];
  const managerLinks=[["👥","All Clients","dashboard"],["📊","Analytics","analytics"],["💬","Messages","messages"],["⚙️","Settings","settings"]];
  const links=isManager?managerLinks:clientLinks;

  return <div className="app">
    <style>{G}</style>
    <nav className="nav">
      <TSLogo/>
      {isManager&&<div className="nav-pills">
        <button className={`pill ${view==="dashboard"?"active":""}`} onClick={()=>setView("dashboard")}>Manager</button>
        <button className={`pill ${view==="preview"?"active":""}`} onClick={()=>setView("preview")}>Client Preview</button>
      </div>}
      <div className="fg">
        <div className="nav-av">{initials}</div>
        <span style={{fontSize:"0.78rem",color:B.grey,maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{session.user.email}</span>
        <button className="btn btn-ghost btn-sm" onClick={signOut}>Sign Out</button>
      </div>
    </nav>
    <div className="main">
      <aside className="sidebar">
        <div className="s-section">{isManager?"Practice":"My Plan"}</div>
        {links.map(([ic,lb,v])=>(
          <button key={lb} className={`slink ${view===v?"active":""}`} onClick={()=>setView(v)}>
            <span className="slink-icon">{ic}</span>{lb}
          </button>
        ))}
      </aside>
      <main className="content">
        {!isManager&&needsAssessment&&<Assessment user={session.user} onComplete={(d)=>{setAssessmentData(d);setNeedsAssessment(false);}}/>}
        {!isManager&&!needsAssessment&&view==="dashboard"&&<>
          <div className="ph">My <em>Dashboard</em></div>
          <div className="psub">Your personalised plan from Tom Saunders Nutrition</div>
          <ClientDash user={session.user} assessmentData={assessmentData}/>
        </>}
        {!isManager&&!needsAssessment&&view==="targets"&&<>
          <div className="ph">My <em>Targets</em></div>
          <div className="psub">Your weekly calorie, protein and hydration targets</div>
          {assessmentData?.weight ? <WeeklyTargets profile={{weight:parseFloat(assessmentData.weight),height:parseFloat(assessmentData.height),age:parseFloat(assessmentData.age),sex:assessmentData.sex||"male",bodyFatPct:parseFloat(assessmentData.bodyFatPct)||20,goal:assessmentData.goal}} clientEmail={session.user.email}/> : <div className="card"><div style={{textAlign:"center",padding:"2rem",color:B.grey}}>Complete your assessment to see your targets.</div></div>}
        </>}
        {!isManager&&!needsAssessment&&view==="messages"&&<>
          <div className="ph">My <em>Messages</em></div>
          <div className="psub">Direct messages with Tom Saunders</div>
          <div className="card"><div className="card-hd">💬 Messages from Tom</div><Messaging myEmail={session.user.email} otherEmail={MANAGER_EMAIL} myId={session.user.id}/></div>
        </>}
        {isManager&&view==="dashboard"&&<>
          <div className="ph"><em>TS Nutrition</em> — Client Management</div>
          <div className="psub">View assessments, set targets, assign routines and message clients</div>
          <ManagerDash managerUser={session.user}/>
        </>}
        {isManager&&view==="preview"&&<>
          <div className="ph">Client <em>Preview</em></div>
          <div className="psub">This is what a client sees when logged in</div>
          <ClientDash user={session.user} assessmentData={assessmentData}/>
        </>}
        {!["dashboard","preview","messages","targets"].includes(view)&&!needsAssessment&&<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"60vh",flexDirection:"column",gap:"1rem",color:B.grey}}>
          <div style={{fontSize:"3rem"}}>🚧</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.2rem",fontWeight:700,color:B.greyLt,textTransform:"uppercase"}}>Coming Soon</div>
          <div style={{fontSize:"0.85rem"}}>This section is being built step by step.</div>
        </div>}
      </main>
    </div>
  </div>;
}