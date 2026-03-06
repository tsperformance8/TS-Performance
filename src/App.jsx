import { useState } from "react";

/* ─── BRAND COLOURS (from PDF) ─────────────────────────────────────────── */
const B = {
  green:     "#3A7D44",
  greenLt:   "#4CAF5A",
  greenDim:  "rgba(58,125,68,0.12)",
  greenGlow: "rgba(58,125,68,0.25)",
  dark:      "#1C1C1C",
  darker:    "#141414",
  card:      "#242424",
  border:    "#333333",
  borderLt:  "#444444",
  grey:      "#888888",
  greyLt:    "#BBBBBB",
  white:     "#F5F5F5",
  offwhite:  "#E8E8E8",
  text:      "#EEEEEE",
  alert:     "#E05050",
  amber:     "#D4A020",
  blue:      "#4A90D9",
};

/* ─── CSS ───────────────────────────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{background:${B.darker};color:${B.text};font-family:'Barlow',sans-serif;font-size:15px;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:${B.dark}}
::-webkit-scrollbar-thumb{background:${B.border};border-radius:2px}

.app{min-height:100vh;display:flex;flex-direction:column}

/* NAV */
.nav{background:${B.dark};border-bottom:3px solid ${B.green};display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:64px;position:sticky;top:0;z-index:200}
.logo{display:flex;align-items:center;gap:0.75rem}
.logo-box{width:44px;height:44px;background:${B.green};display:flex;align-items:center;justify-content:center;border-radius:4px;position:relative;overflow:hidden}
.logo-ts{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:1.2rem;color:white;letter-spacing:-0.02em;line-height:1}
.logo-slash{position:absolute;right:-4px;top:0;width:12px;height:100%;background:${B.dark};transform:skewX(-8deg)}
.logo-text{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.1rem;letter-spacing:0.1em;text-transform:uppercase;color:${B.white}}
.logo-text span{color:${B.green}}
.nav-pills{display:flex;gap:0.25rem;background:${B.darker};border-radius:8px;padding:0.3rem;border:1px solid ${B.border}}
.pill{padding:0.4rem 1.2rem;border-radius:6px;border:none;background:transparent;color:${B.grey};font-family:'Barlow Condensed',sans-serif;font-size:0.85rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;transition:all 0.2s}
.pill.active{background:${B.green};color:white}
.pill:hover:not(.active){color:${B.greyLt}}
.nav-av{width:36px;height:36px;border-radius:50%;background:${B.green};border:2px solid ${B.greenLt};display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:0.85rem;color:white}

/* LAYOUT */
.main{flex:1;display:flex}
.sidebar{width:220px;flex-shrink:0;background:${B.dark};border-right:1px solid ${B.border};padding:1.25rem 0;display:flex;flex-direction:column}
.s-section{font-family:'Barlow Condensed',sans-serif;font-size:0.68rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${B.grey};padding:0.85rem 1.25rem 0.3rem}
.slink{display:flex;align-items:center;gap:0.65rem;padding:0.6rem 1.25rem;margin:0.1rem 0.5rem;border-radius:7px;cursor:pointer;color:${B.grey};font-size:0.88rem;font-weight:500;border:1px solid transparent;background:transparent;width:calc(100% - 1rem);text-align:left;transition:all 0.15s;font-family:'Barlow',sans-serif}
.slink:hover{background:${B.greenDim};color:${B.greyLt}}
.slink.active{background:${B.greenDim};color:${B.green};border-color:${B.border}}
.slink-icon{width:18px;text-align:center;font-size:0.9rem}

/* CONTENT */
.content{flex:1;padding:2rem;overflow-y:auto;max-height:calc(100vh - 64px)}
.ph{font-family:'Barlow Condensed',sans-serif;font-size:2rem;font-weight:700;color:${B.white};letter-spacing:0.02em;text-transform:uppercase;margin-bottom:0.2rem}
.ph em{color:${B.green};font-style:normal}
.psub{font-size:0.85rem;color:${B.grey};margin-bottom:1.75rem}

/* CARDS */
.card{background:${B.card};border:1px solid ${B.border};border-radius:12px;padding:1.4rem}
.card-hd{font-family:'Barlow Condensed',sans-serif;font-size:0.78rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${B.green};margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem}
.card-hd::after{content:'';flex:1;height:1px;background:${B.border}}

/* GRID */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.1rem}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}

/* STAT */
.stat{background:${B.card};border:1px solid ${B.border};border-radius:12px;padding:1.1rem 1.25rem;border-left:3px solid ${B.green}}
.stat-lbl{font-size:0.68rem;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${B.grey};margin-bottom:0.4rem}
.stat-val{font-family:'Barlow Condensed',sans-serif;font-size:2.1rem;font-weight:700;color:${B.white};line-height:1}
.stat-unit{font-size:0.85rem;font-weight:400;color:${B.grey};margin-left:0.2rem}
.stat-delta{font-size:0.75rem;margin-top:0.3rem}
.up{color:${B.green}}.dn{color:${B.alert}}.am{color:${B.amber}}

/* PROGRESS */
.pl{display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:0.3rem;color:${B.greyLt}}
.pt{height:6px;background:${B.border};border-radius:99px;margin-bottom:0.85rem;overflow:hidden}
.pf{height:100%;border-radius:99px;transition:width 0.6s ease}
.p-green{background:${B.green}}.p-amber{background:${B.amber}}.p-alert{background:${B.alert}}.p-grey{background:${B.greyLt}}

/* BADGE */
.badge{display:inline-flex;align-items:center;gap:0.3rem;padding:0.2rem 0.7rem;border-radius:4px;font-size:0.68rem;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:0.06em;text-transform:uppercase}
.badge-green{background:rgba(58,125,68,0.2);color:${B.greenLt};border:1px solid rgba(58,125,68,0.4)}
.badge-amber{background:rgba(212,160,32,0.15);color:${B.amber};border:1px solid rgba(212,160,32,0.3)}
.badge-red{background:rgba(224,80,80,0.15);color:${B.alert};border:1px solid rgba(224,80,80,0.3)}
.badge-blue{background:rgba(74,144,217,0.15);color:${B.blue};border:1px solid rgba(74,144,217,0.3)}

/* TAG */
.tag{display:inline-block;padding:0.2rem 0.6rem;border-radius:4px;font-size:0.72rem;background:${B.border};color:${B.greyLt};margin:0.15rem 0.1rem;font-family:'Barlow',sans-serif}

/* BUTTON */
.btn{padding:0.6rem 1.4rem;border-radius:7px;border:none;font-family:'Barlow Condensed',sans-serif;font-size:0.82rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;transition:all 0.2s}
.btn-g{background:${B.green};color:white}.btn-g:hover{background:${B.greenLt}}
.btn-o{background:${B.border};color:${B.greyLt}}.btn-o:hover{background:${B.borderLt};color:${B.white}}
.btn-sm{padding:0.35rem 0.9rem;font-size:0.72rem}
.btn-ghost{background:transparent;border:1px solid ${B.border};color:${B.grey}}.btn-ghost:hover{border-color:${B.green};color:${B.green}}
.btn-full{width:100%;padding:0.85rem;font-size:0.9rem}

/* INPUT */
.inp{width:100%;background:${B.darker};border:1px solid ${B.border};border-radius:7px;color:${B.text};font-family:'Barlow',sans-serif;font-size:0.88rem;padding:0.65rem 0.9rem;outline:none;transition:border-color 0.2s}
.inp:focus{border-color:${B.green}}
.inp::placeholder{color:${B.grey}}
.inp-label{font-size:0.72rem;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${B.grey};margin-bottom:0.35rem;display:block}
.inp-group{margin-bottom:1rem}
select.inp option{background:${B.dark}}

/* FLEX */
.fb{display:flex;align-items:center;justify-content:space-between}
.fg{display:flex;align-items:center;gap:0.6rem}
.div{height:1px;background:${B.border};margin:1rem 0}

/* CLIENT ROW */
.crow{display:flex;align-items:center;gap:0.85rem;padding:0.75rem;border-radius:8px;cursor:pointer;border:1px solid transparent;transition:all 0.15s}
.crow:hover{background:${B.greenDim}}
.crow.sel{background:${B.greenDim};border-color:${B.border}}
.cav{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-size:0.85rem;font-weight:700;color:white;flex-shrink:0}
.cname{font-size:0.9rem;font-weight:600;color:${B.white};font-family:'Barlow',sans-serif}
.cmeta{font-size:0.74rem;color:${B.grey}}

/* SCHEDULE GRID */
.sched-grid{display:grid;grid-template-columns:100px repeat(7,1fr);gap:2px;font-size:0.75rem}
.sched-head{background:${B.green};color:white;padding:0.5rem 0.3rem;text-align:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;border-radius:4px}
.sched-row-label{background:${B.border};color:${B.greyLt};padding:0.5rem 0.6rem;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;border-radius:4px;display:flex;align-items:center}
.sched-cell{background:${B.darker};border:1px solid ${B.border};border-radius:4px;padding:0.4rem;min-height:52px;font-size:0.72rem;color:${B.greyLt};line-height:1.4}
.sched-cell.green{background:rgba(58,125,68,0.15);border-color:${B.green};color:${B.greenLt}}
.sched-cell.amber{background:rgba(212,160,32,0.1);border-color:${B.amber};color:${B.amber}}
.sched-cell.blue{background:rgba(74,144,217,0.1);border-color:${B.blue};color:${B.blue}}

/* ASSESSMENT */
.assess-step{background:${B.card};border:1px solid ${B.border};border-radius:12px;padding:2rem}
.assess-title{font-family:'Barlow Condensed',sans-serif;font-size:1.5rem;font-weight:700;color:${B.white};text-transform:uppercase;margin-bottom:0.35rem}
.assess-sub{font-size:0.85rem;color:${B.grey};margin-bottom:1.75rem}
.progress-steps{display:flex;gap:0.5rem;margin-bottom:2rem}
.step-dot{flex:1;height:4px;border-radius:99px;background:${B.border};transition:background 0.3s}
.step-dot.done{background:${B.green}}
.step-dot.active{background:${B.greenLt}}
.checkbox-group{display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-bottom:1rem}
.checkbox-item{display:flex;align-items:center;gap:0.5rem;padding:0.6rem 0.85rem;background:${B.darker};border:1px solid ${B.border};border-radius:7px;cursor:pointer;transition:all 0.15s;font-size:0.85rem}
.checkbox-item:hover{border-color:${B.green}}
.checkbox-item.checked{border-color:${B.green};background:${B.greenDim};color:${B.greenLt}}
.radio-group{display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1rem}
.radio-item{display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;background:${B.darker};border:1px solid ${B.border};border-radius:7px;cursor:pointer;transition:all 0.15s;font-size:0.88rem}
.radio-item:hover{border-color:${B.green}}
.radio-item.selected{border-color:${B.green};background:${B.greenDim};color:${B.greenLt}}

/* MEAL PLAN TABLE */
.mp-table{width:100%;border-collapse:collapse;font-size:0.82rem}
.mp-table th{background:${B.green};color:white;padding:0.6rem 0.8rem;text-align:left;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:0.06em;text-transform:uppercase}
.mp-table td{padding:0.6rem 0.8rem;border-bottom:1px solid ${B.border};color:${B.greyLt};vertical-align:top}
.mp-table tr:hover td{background:${B.greenDim}}

/* BANNER */
.banner{background:linear-gradient(135deg,${B.dark} 0%,#1A2F1C 100%);border:1px solid ${B.border};border-left:4px solid ${B.green};border-radius:12px;padding:1.75rem 2rem;margin-bottom:1.75rem;position:relative;overflow:hidden}
.banner::after{content:'TS';position:absolute;right:1.5rem;top:50%;transform:translateY(-50%);font-family:'Barlow Condensed',sans-serif;font-size:6rem;font-weight:800;color:rgba(58,125,68,0.08);letter-spacing:-0.05em;line-height:1}
.banner-label{font-family:'Barlow Condensed',sans-serif;font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${B.green};margin-bottom:0.4rem}
.banner-title{font-family:'Barlow Condensed',sans-serif;font-size:1.8rem;font-weight:700;color:${B.white};text-transform:uppercase;margin-bottom:0.25rem;letter-spacing:0.02em}
.banner-sub{font-size:0.85rem;color:${B.grey}}

/* SCROLL */
.scroll{overflow-y:auto}.mh300{max-height:300px}.mh400{max-height:400px}

/* CHAT */
.chat-wrap{display:flex;flex-direction:column;gap:0.75rem;max-height:280px;overflow-y:auto;padding:0.5rem 0}
.msg{max-width:80%;padding:0.6rem 1rem;border-radius:8px;font-size:0.84rem;line-height:1.5}
.msg-me{background:${B.green};color:white;align-self:flex-end;border-bottom-right-radius:3px}
.msg-them{background:${B.border};color:${B.text};align-self:flex-start;border-bottom-left-radius:3px}
.msg-ts{font-size:0.65rem;color:${B.grey};margin-top:0.2rem}

/* SUPP */
.supp-row{display:flex;align-items:center;gap:0.85rem;padding:0.7rem 0;border-bottom:1px solid ${B.border}}
.supp-row:last-child{border:none}
.supp-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.supp-check{width:22px;height:22px;border-radius:5px;border:2px solid ${B.border};cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;margin-left:auto;flex-shrink:0}
.supp-check.done{background:${B.green};border-color:${B.green}}

/* MACRO ROW */
.macro-bar{margin-bottom:0.5rem}

/* CALORIE TARGETS */
.cal-row{display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem;background:${B.darker};border:1px solid ${B.border};border-radius:8px;margin-bottom:0.5rem}
.cal-row.active{border-color:${B.green};background:${B.greenDim}}
.cal-label{font-family:'Barlow Condensed',sans-serif;font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${B.greyLt}}
.cal-val{font-family:'Barlow Condensed',sans-serif;font-size:1.1rem;font-weight:700;color:${B.white}}

/* WATER */
.wcup{width:26px;height:32px;border-radius:3px 3px 6px 6px;border:2px solid ${B.borderLt};cursor:pointer;transition:all 0.2s}
.wcup.full{background:${B.green};border-color:${B.greenLt}}
.wcup:hover{transform:translateY(-2px)}

/* PLAN DAY */
.pday{background:${B.darker};border:1px solid ${B.border};border-radius:8px;padding:0.85rem}
.pday-lbl{font-size:0.62rem;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${B.green};margin-bottom:0.5rem}

/* AI BOX */
.ai-box{background:${B.darker};border:1px solid ${B.green};border-radius:8px;padding:1rem;font-size:0.84rem;line-height:1.7;color:${B.greyLt};white-space:pre-wrap;min-height:60px}
.ai-cursor{display:inline-block;width:2px;height:14px;background:${B.green};animation:blink 0.8s infinite;vertical-align:middle;margin-left:1px}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.dot-pulse span{display:inline-block;width:6px;height:6px;border-radius:50%;background:${B.green};animation:pulse 1.2s ease-in-out infinite;margin:0 2px}
.dot-pulse span:nth-child(2){animation-delay:0.2s}
.dot-pulse span:nth-child(3){animation-delay:0.4s}
@keyframes pulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}

/* LOGIN / SIGNUP */
.auth-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:${B.darker};padding:2rem}
.auth-box{background:${B.card};border:1px solid ${B.border};border-top:4px solid ${B.green};border-radius:12px;padding:2.5rem;width:100%;max-width:440px}
.auth-logo{display:flex;align-items:center;gap:0.75rem;margin-bottom:2rem;justify-content:center}
.auth-title{font-family:'Barlow Condensed',sans-serif;font-size:1.4rem;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:${B.white};margin-bottom:0.35rem;text-align:center}
.auth-sub{font-size:0.84rem;color:${B.grey};text-align:center;margin-bottom:1.75rem}
.auth-switch{text-align:center;font-size:0.82rem;color:${B.grey};margin-top:1rem}
.auth-switch span{color:${B.green};cursor:pointer;font-weight:600}
.auth-switch span:hover{text-decoration:underline}
`;

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const CLIENTS = [
  {id:1,name:"Tom Saunders",ini:"TS",col:"#3A7D44",goal:"Body Recomposition",status:"on-track",age:25,height:178,weight:80,targetWeight:75,cals:2500,targetCals:2500,protein:128,water:6,wgoal:9,comp:89,activityLevel:"Very Active",conditions:["None"],tags:["High protein","No dairy"],assessed:true,
    supps:[{name:"Vitamin D3 K2",time:"Morning",dose:"1000-2000 IU",col:"#3A7D44",done:true},{name:"Omega-3",time:"Morning",dose:"1000mg EPA/DHA",col:"#3A7D44",done:true},{name:"Creatine",time:"Morning",dose:"3-5g",col:"#4A90D9",done:false},{name:"Magnesium Glycinate",time:"Evening",dose:"200-400mg",col:"#D4A020",done:false},{name:"Lion's Mane",time:"Evening",dose:"500-1000mg",col:"#D4A020",done:false},{name:"L-Theanine",time:"Evening",dose:"As directed",col:"#D4A020",done:false}],
    msgs:[{from:"them",text:"Feeling strong this week, hit all my protein targets!",ts:"Mon 8:20am"},{from:"me",text:"Brilliant Tom, keep it up. How's the creatine sitting with you?",ts:"Mon 9:00am"},{from:"them",text:"Going down fine, no issues.",ts:"Mon 9:15am"}],
    schedule:{Mon:{cardio:"Hypoxic Session",strength:"",recovery:"Red Light 12 mins",nutrition:"07:30 / 09:30 / 12:00 / 15:00 / 18:00",sleep:"Wake 07:15 / Bed 22:30"},Tue:{cardio:"Incline Walk 30 min",strength:"Uppers — Before work",recovery:"Red Light + Hyperbaric 90 min",nutrition:"07:30 / 09:30 / 12:00 / 15:00 / 18:00",sleep:"Wake 06:00 / Bed 22:30"},Wed:{cardio:"",strength:"Football 19:00-21:00",recovery:"Red Light 12 mins",nutrition:"08:00 / 09:30 / 12:00 / 15:00 / 18:00",sleep:"Wake 07:45 / Bed 22:30"},Thu:{cardio:"Incline Walk 30 min",strength:"Lowers — Midday",recovery:"Hot & Cold",nutrition:"07:30 / 09:30 / 12:00 / 15:00 / 18:00",sleep:"Wake 07:15 / Bed 22:30"},Fri:{cardio:"",strength:"Full Body — Before work",recovery:"Hyperbaric 60 min",nutrition:"07:30 / 09:30 / 12:00 / 15:00 / 18:00",sleep:"Wake 06:00 / Bed 22:30"},Sat:{cardio:"Zone 2 Run / Long Walk",strength:"Football",recovery:"Red Light or Hyperbaric",nutrition:"10:00 / 12:30 / 15:00 / 17:00",sleep:"Wake 09:30 / Bed 23:15"},Sun:{cardio:"Rest / Walk",strength:"Arms + Abs",recovery:"Stretching",nutrition:"10:00 / 13:00 / 16:00",sleep:"Wake 09:00 / Bed 22:30"}}},
  {id:2,name:"Sarah Mitchell",ini:"SM",col:"#4A90D9",goal:"Weight Management",status:"on-track",age:32,height:165,weight:68,targetWeight:63,cals:1650,targetCals:1800,protein:110,water:6,wgoal:8,comp:87,activityLevel:"Active",conditions:["IBS"],tags:["Dairy-free","High protein"],assessed:true,supps:[{name:"Probiotic",time:"Morning",dose:"10 billion CFU",col:"#3A7D44",done:true},{name:"Magnesium",time:"Evening",dose:"300mg",col:"#D4A020",done:false}],msgs:[{from:"them",text:"Feeling great this week!",ts:"Mon 9:12am"}],schedule:{}},
  {id:3,name:"James O'Brien",ini:"JO",col:"#D4A020",goal:"Recovery Support",status:"needs-attention",age:28,height:180,weight:84,targetWeight:80,cals:1920,targetCals:2200,protein:120,water:3,wgoal:10,comp:62,activityLevel:"Sedentary",conditions:["Addiction Recovery"],tags:["No caffeine","High fibre"],assessed:true,supps:[{name:"B-Complex",time:"Morning",dose:"1 tablet",col:"#D4A020",done:false},{name:"Zinc",time:"Lunch",dose:"25mg",col:"#3A7D44",done:false}],msgs:[{from:"them",text:"Struggling with appetite this week.",ts:"Tue 2:05pm"}],schedule:{}},
  {id:4,name:"New Client",ini:"NC",col:"#888888",goal:"Awaiting Assessment",status:"new",age:null,height:null,weight:null,targetWeight:null,cals:0,targetCals:0,protein:0,water:0,wgoal:8,comp:0,activityLevel:"",conditions:[],tags:[],assessed:false,supps:[],msgs:[],schedule:{}},
];

const MEAL_PLAN = {
  Mon:[{t:"Breakfast",m:"Scrambled eggs, avocado & tomato + kiwi",c:450,p:20},{t:"Mid-morning",m:"Greek yoghurt bowl with whey, blueberries & walnuts",c:450,p:30},{t:"Lunch",m:"Chicken salad bowl with sweet potato",c:480,p:40},{t:"Snack",m:"Whey shake + trail mix + apple",c:400,p:35},{t:"Dinner",m:"Sirloin steak, sweet potato fries & tenderstem broccoli",c:650,p:45}],
  Tue:[{t:"Breakfast",m:"Scrambled eggs, avocado & tomato + kiwi",c:450,p:20},{t:"Mid-morning",m:"Greek yoghurt bowl",c:450,p:30},{t:"Lunch",m:"Salmon & avocado salad",c:530,p:38},{t:"Snack",m:"Whey shake + trail mix",c:400,p:35},{t:"Dinner",m:"Butterflied chicken breast, wild rice & fajita veg",c:550,p:45}],
  Wed:[{t:"Breakfast",m:"Scrambled eggs, avocado & tomato",c:450,p:20},{t:"Mid-morning",m:"Greek yoghurt bowl",c:450,p:30},{t:"Lunch",m:"Tuna salad with new potatoes",c:430,p:35},{t:"Snack",m:"Whey shake + fruit",c:400,p:35},{t:"Dinner",m:"Chicken Thai curry with wild rice",c:580,p:40}],
  Thu:[{t:"Breakfast",m:"Scrambled eggs, avocado & tomato",c:450,p:20},{t:"Mid-morning",m:"Greek yoghurt bowl",c:450,p:30},{t:"Lunch",m:"Chicken salad bowl",c:480,p:40},{t:"Snack",m:"Whey shake + trail mix",c:400,p:35},{t:"Dinner",m:"Tuna steak, green beans & couscous",c:580,p:40}],
  Fri:[{t:"Breakfast",m:"Scrambled eggs, avocado & tomato",c:450,p:20},{t:"Mid-morning",m:"Greek yoghurt bowl",c:450,p:30},{t:"Lunch",m:"Salmon & avocado salad",c:530,p:38},{t:"Snack",m:"Whey shake + fruit",c:400,p:35},{t:"Dinner",m:"Sea bass with veg & quinoa",c:520,p:35}],
  Sat:[{t:"Breakfast",m:"Scrambled eggs & avocado",c:400,p:18},{t:"Lunch",m:"Chicken salad bowl",c:480,p:40},{t:"Snack",m:"Trail mix & fruit",c:300,p:15},{t:"Dinner",m:"Sirloin steak & sweet potato",c:650,p:45}],
  Sun:[{t:"Breakfast",m:"Greek yoghurt bowl",c:450,p:30},{t:"Lunch",m:"Tuna salad",c:430,p:35},{t:"Snack",m:"Whey shake",c:250,p:25},{t:"Dinner",m:"Butterflied chicken & wild rice",c:550,p:45}],
};

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
function Prog({label,val,max,col="p-green",unit=""}){
  const p=Math.min((val/max)*100,100);
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
function TSLogo(){
  return <div className="logo">
    <div className="logo-box"><span className="logo-ts">TS</span><div className="logo-slash"/></div>
    <div className="logo-text">Tom Saunders <span>Nutrition</span></div>
  </div>;
}

/* ─── CLIENT ASSESSMENT ─────────────────────────────────────────────────── */
function Assessment({onComplete}){
  const [step,setStep]=useState(0);
  const [data,setData]=useState({
    firstName:"",lastName:"",age:"",height:"",weight:"",goal:"",
    activityLevel:"",workSchedule:"",mealPrepTime:"",
    sleepWake:"",sleepBed:"",sleepQuality:"",
    conditions:"",medications:"",intolerances:"",
    barriers:[],recoveryMethods:[],
    notes:""
  });
  const total=7;
  const set=(k,v)=>setData(d=>({...d,[k]:v}));
  const toggle=(k,v)=>setData(d=>({...d,[k]:d[k].includes(v)?d[k].filter(x=>x!==v):[...d[k],v]}));

  const steps=[
    // 0 - Personal
    <div key={0}>
      <div className="assess-title">Personal Details</div>
      <div className="assess-sub">Let's start with the basics — this helps us build your profile.</div>
      <div className="g2">
        <div className="inp-group"><label className="inp-label">First Name</label><input className="inp" value={data.firstName} onChange={e=>set("firstName",e.target.value)} placeholder="e.g. Tom"/></div>
        <div className="inp-group"><label className="inp-label">Last Name</label><input className="inp" value={data.lastName} onChange={e=>set("lastName",e.target.value)} placeholder="e.g. Saunders"/></div>
      </div>
      <div className="g3">
        <div className="inp-group"><label className="inp-label">Age</label><input className="inp" type="number" value={data.age} onChange={e=>set("age",e.target.value)} placeholder="25"/></div>
        <div className="inp-group"><label className="inp-label">Height (cm)</label><input className="inp" type="number" value={data.height} onChange={e=>set("height",e.target.value)} placeholder="178"/></div>
        <div className="inp-group"><label className="inp-label">Weight (kg)</label><input className="inp" type="number" value={data.weight} onChange={e=>set("weight",e.target.value)} placeholder="80"/></div>
      </div>
      <div className="inp-group"><label className="inp-label">Primary Goal</label>
        <select className="inp" value={data.goal} onChange={e=>set("goal",e.target.value)}>
          <option value="">Select your goal...</option>
          <option>Lose body fat</option><option>Build muscle</option><option>Body recomposition</option>
          <option>Improve energy & performance</option><option>Recovery & wellness</option><option>Gut health</option>
        </select>
      </div>
    </div>,

    // 1 - Training & Activity
    <div key={1}>
      <div className="assess-title">Training & Activity</div>
      <div className="assess-sub">Tell us about your current activity levels and exercise habits.</div>
      <div className="inp-group"><label className="inp-label">Overall Activity Level</label>
        <div className="radio-group">
          {["Sedentary (desk job, little exercise)","Lightly active (1-2 sessions/week)","Moderately active (3-4 sessions/week)","Very active (5+ sessions/week)","Athlete (training twice daily)"].map(o=>(
            <div key={o} className={`radio-item ${data.activityLevel===o?"selected":""}`} onClick={()=>set("activityLevel",o)}>
              <div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${data.activityLevel===o?B.green:B.border}`,background:data.activityLevel===o?B.green:"transparent",flexShrink:0}}/>
              {o}
            </div>
          ))}
        </div>
      </div>
      <div className="inp-group"><label className="inp-label">Work Schedule (how does it affect training?)</label>
        <textarea className="inp" rows={3} value={data.workSchedule} onChange={e=>set("workSchedule",e.target.value)} placeholder="e.g. I work 9-5 Mon-Fri, can train before work or at lunch..."/>
      </div>
      <div className="inp-group"><label className="inp-label">How much time do you have for meal prep per week?</label>
        <select className="inp" value={data.mealPrepTime} onChange={e=>set("mealPrepTime",e.target.value)}>
          <option value="">Select...</option>
          <option>Less than 30 minutes</option><option>30-60 minutes</option>
          <option>1-2 hours</option><option>2-3 hours</option><option>3+ hours</option>
        </select>
      </div>
    </div>,

    // 2 - Sleep
    <div key={2}>
      <div className="assess-title">Sleep Patterns</div>
      <div className="assess-sub">Sleep is critical for recovery and body composition. Be honest!</div>
      <div className="g2">
        <div className="inp-group"><label className="inp-label">Typical Wake Time</label><input className="inp" value={data.sleepWake} onChange={e=>set("sleepWake",e.target.value)} placeholder="e.g. 07:00"/></div>
        <div className="inp-group"><label className="inp-label">Typical Bedtime</label><input className="inp" value={data.sleepBed} onChange={e=>set("sleepBed",e.target.value)} placeholder="e.g. 22:30"/></div>
      </div>
      <div className="inp-group"><label className="inp-label">How would you rate your sleep quality?</label>
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

    // 3 - Diet & Allergies
    <div key={3}>
      <div className="assess-title">Dietary Preferences</div>
      <div className="assess-sub">This helps us build a plan that works for your lifestyle and health.</div>
      <div className="inp-group"><label className="inp-label">Any food allergies or intolerances?</label>
        <input className="inp" value={data.intolerances} onChange={e=>set("intolerances",e.target.value)} placeholder="e.g. Lactose intolerant, nut allergy..."/>
      </div>
      <div className="inp-group"><label className="inp-label">Any dietary preferences or restrictions?</label>
        <div className="checkbox-group">
          {["None","Vegetarian","Vegan","Gluten-free","Dairy-free","Low FODMAP","Halal","Kosher"].map(o=>(
            <div key={o} className={`checkbox-item ${data.barriers.includes("diet_"+o)?"checked":""}`} onClick={()=>toggle("barriers","diet_"+o)}>
              <span style={{fontSize:"0.9rem"}}>{data.barriers.includes("diet_"+o)?"✓":"○"}</span>{o}
            </div>
          ))}
        </div>
      </div>
    </div>,

    // 4 - Health & Medications
    <div key={4}>
      <div className="assess-title">Health & Medications</div>
      <div className="assess-sub">All information is confidential and used only to personalise your plan safely.</div>
      <div className="inp-group"><label className="inp-label">Any current health conditions?</label>
        <textarea className="inp" rows={3} value={data.conditions} onChange={e=>set("conditions",e.target.value)} placeholder="e.g. Type 2 diabetes, IBS, hypothyroidism... or 'None'"/>
      </div>
      <div className="inp-group"><label className="inp-label">Any current medications or supplements?</label>
        <textarea className="inp" rows={3} value={data.medications} onChange={e=>set("medications",e.target.value)} placeholder="e.g. Metformin 500mg, Vitamin D3... or 'None'"/>
      </div>
    </div>,

    // 5 - Recovery
    <div key={5}>
      <div className="assess-title">Recovery Methods</div>
      <div className="assess-sub">What recovery tools or practices do you currently use?</div>
      <div className="checkbox-group" style={{gridTemplateColumns:"1fr 1fr"}}>
        {["Red light therapy","Hyperbaric oxygen","Cold water immersion","Hot sauna","Foam rolling","Stretching/yoga","Breathwork","Massage","None currently"].map(o=>(
          <div key={o} className={`checkbox-item ${data.recoveryMethods.includes(o)?"checked":""}`} onClick={()=>toggle("recoveryMethods",o)}>
            <span style={{fontSize:"0.9rem"}}>{data.recoveryMethods.includes(o)?"✓":"○"}</span>{o}
          </div>
        ))}
      </div>
    </div>,

    // 6 - Barriers
    <div key={6}>
      <div className="assess-title">Barriers & Notes</div>
      <div className="assess-sub">What do you think could make it hard to stick to a nutrition plan?</div>
      <div className="checkbox-group">
        {["Busy work schedule","Family commitments","Social events","Eating out frequently","Travel","Stress & emotional eating","Lack of cooking skills","Budget constraints","Lack of motivation","Inconsistent routine"].map(o=>(
          <div key={o} className={`checkbox-item ${data.barriers.includes(o)?"checked":""}`} onClick={()=>toggle("barriers",o)}>
            <span style={{fontSize:"0.9rem"}}>{data.barriers.includes(o)?"✓":"○"}</span>{o}
          </div>
        ))}
      </div>
      <div className="inp-group" style={{marginTop:"1rem"}}>
        <label className="inp-label">Anything else you'd like Tom to know?</label>
        <textarea className="inp" rows={4} value={data.notes} onChange={e=>set("notes",e.target.value)} placeholder="Any other information that would help us build the best plan for you..."/>
      </div>
    </div>
  ];

  return (
    <div style={{maxWidth:680,margin:"0 auto"}}>
      <div className="banner" style={{marginBottom:"1.5rem"}}>
        <div className="banner-label">Tom Saunders Nutrition</div>
        <div className="banner-title">Client Assessment</div>
        <div className="banner-sub">Complete all sections so Tom can build your personalised plan. Takes about 5 minutes.</div>
      </div>
      <div className="progress-steps">
        {Array.from({length:total}).map((_,i)=>(
          <div key={i} className={`step-dot ${i<step?"done":i===step?"active":""}`}/>
        ))}
      </div>
      <div className="assess-step">
        {steps[step]}
        <div className="div"/>
        <div className="fb">
          <div style={{fontSize:"0.78rem",color:B.grey}}>Step {step+1} of {total}</div>
          <div className="fg">
            {step>0 && <button className="btn btn-o btn-sm" onClick={()=>setStep(s=>s-1)}>← Back</button>}
            {step<total-1
              ? <button className="btn btn-g btn-sm" onClick={()=>setStep(s=>s+1)}>Continue →</button>
              : <button className="btn btn-g" onClick={()=>onComplete(data)}>Submit Assessment ✓</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── AI MEAL PLAN ───────────────────────────────────────────────────────── */
function AIMealGen({client}){
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState("");
  const [prompt,setPrompt]=useState(`Create a 3-day meal plan for ${client.name}. Goal: ${client.goal}. Activity: ${client.activityLevel}. Calorie target: ${client.targetCals}kcal. Protein target: ${client.protein}g. Conditions: ${client.conditions?.join(", ")||"None"}. Dietary needs: ${client.tags?.join(", ")||"None"}. Format clearly with Day 1/2/3, meals with approximate calories and protein per meal.`);
  async function generate(){
    setLoading(true);setResult("");
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:"You are Tom Saunders, a professional nutritionist specialising in body composition and performance. Create practical, science-led meal plans. Be specific with portion sizes, include rough calories and protein per meal. Keep meals realistic and enjoyable.",messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      const text=data.content?.find(b=>b.type==="text")?.text||"No response.";
      let i=0;const iv=setInterval(()=>{i=Math.min(i+10,text.length);setResult(text.slice(0,i));if(i>=text.length){clearInterval(iv);setLoading(false);}},20);
    }catch(e){setResult("Connection error. Please try again.");setLoading(false);}
  }
  return <div>
    <div className="card-hd">AI Meal Plan Generator</div>
    <textarea className="inp" rows={5} value={prompt} onChange={e=>setPrompt(e.target.value)} style={{marginBottom:"0.75rem"}}/>
    <div className="fg" style={{marginBottom:"0.75rem"}}>
      <button className="btn btn-g btn-sm" onClick={generate} disabled={loading}>{loading?"Generating…":"✦ Generate Plan"}</button>
      {result&&<button className="btn btn-o btn-sm" onClick={()=>setResult("")}>Clear</button>}
    </div>
    {loading&&!result&&<div style={{display:"flex",alignItems:"center",gap:"0.5rem",color:B.grey,fontSize:"0.8rem"}}><div className="dot-pulse"><span/><span/><span/></div><span>Building personalised plan…</span></div>}
    {result&&<div className="ai-box scroll mh300">{result}{loading&&<span className="ai-cursor"/>}</div>}
  </div>;
}

/* ─── SCHEDULE VIEW ──────────────────────────────────────────────────────── */
function ScheduleView({client}){
  const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const rows=["cardio","strength","nutrition","sleep","recovery"];
  const rowLabels={cardio:"Cardio",strength:"Strength",nutrition:"Nutrition",sleep:"Sleep",recovery:"Recovery"};
  const rowCols={cardio:"green",strength:"blue",nutrition:"green",sleep:"",recovery:"amber"};
  const sched=client.schedule||{};
  return <div style={{overflowX:"auto"}}>
    <div className="sched-grid">
      <div className="sched-head" style={{background:"transparent"}}/>
      {days.map(d=><div key={d} className="sched-head">{d}</div>)}
      {rows.map(r=>[
        <div key={r+"label"} className="sched-row-label">{rowLabels[r]}</div>,
        ...days.map(d=>{
          const val=sched[d]?.[r]||"";
          return <div key={d+r} className={`sched-cell ${val?rowCols[r]:""}`}>{val||<span style={{color:B.border,fontSize:"0.68rem"}}>—</span>}</div>;
        })
      ])}
    </div>
  </div>;
}

/* ─── CLIENT DASHBOARD ───────────────────────────────────────────────────── */
function ClientDash({client}){
  const [water,setWater]=useState(client.water);
  const [day,setDay]=useState("Mon");
  const [suppChecked,setSuppChecked]=useState(client.supps.map(s=>s.done));
  const [msgs,setMsgs]=useState(client.msgs);
  const [draft,setDraft]=useState("");
  const days=Object.keys(MEAL_PLAN);
  const todayMeals=MEAL_PLAN[day]||[];
  const totalCals=todayMeals.reduce((a,m)=>a+m.c,0);
  const totalProt=todayMeals.reduce((a,m)=>a+m.p,0);

  function sendMsg(){
    if(!draft.trim())return;
    setMsgs(m=>[...m,{from:"them",text:draft.trim(),ts:"Just now"}]);
    setDraft("");
  }

  return <div>
    <div className="banner">
      <div className="banner-label">Tom Saunders Nutrition</div>
      <div className="banner-title">Welcome back, {client.name.split(" ")[0]}</div>
      <div className="banner-sub">Goal: {client.goal} · {client.activityLevel} · {client.targetCals} kcal target</div>
    </div>

    {/* Calorie Targets */}
    <div className="card" style={{marginBottom:"1.1rem"}}>
      <div className="card-hd">My Calorie & Protein Targets</div>
      <div className="g3">
        <div className="cal-row"><div><div className="cal-label">Sedentary Day</div><div style={{fontSize:"0.72rem",color:B.grey}}>No exercise</div></div><div className="cal-val">1,900<span style={{fontSize:"0.75rem",color:B.grey}}> kcal</span></div></div>
        <div className={`cal-row ${client.activityLevel==="Very Active"||client.activityLevel?.includes("Moderately")?"active":""}`}><div><div className="cal-label">Active Day</div><div style={{fontSize:"0.72rem",color:B.grey}}>1 session</div></div><div className="cal-val">2,500<span style={{fontSize:"0.75rem",color:B.grey}}> kcal</span></div></div>
        <div className="cal-row"><div><div className="cal-label">Very Active</div><div style={{fontSize:"0.72rem",color:B.grey}}>2+ sessions</div></div><div className="cal-val">2,800<span style={{fontSize:"0.75rem",color:B.grey}}> kcal</span></div></div>
      </div>
      <div style={{fontSize:"0.78rem",color:B.grey,marginTop:"0.75rem"}}>Protein target: <strong style={{color:B.white}}>{client.protein}g daily</strong> · Fluid intake: <strong style={{color:B.white}}>2.8L+</strong></div>
    </div>

    <div className="g2" style={{marginBottom:"1.1rem"}}>
      {/* Macros */}
      <div className="card">
        <div className="card-hd">Today's Macros</div>
        <Prog label="Calories" val={totalCals} max={client.targetCals||2500} col="p-green" unit=" kcal"/>
        <Prog label="Protein" val={totalProt} max={client.protein||128} col="p-green" unit="g"/>
        <Prog label="Hydration" val={water} max={client.wgoal} col="p-grey" unit=" cups"/>
        <div className="div"/>
        <div style={{fontSize:"0.8rem",color:B.grey}}>Logged from today's meal plan selection</div>
      </div>

      {/* Supplements */}
      <div className="card">
        <div className="card-hd">Supplement Schedule</div>
        <div style={{marginBottom:"0.5rem"}}>
          <div style={{fontSize:"0.68rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.green,marginBottom:"0.4rem"}}>AM Supplements</div>
          {client.supps.filter(s=>s.time==="Morning"||s.time==="With breakfast").map((s,i)=>(
            <div className="supp-row" key={i}>
              <div className="supp-dot" style={{background:s.col}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:"0.86rem",fontWeight:500,color:B.white}}>{s.name}</div>
                <div style={{fontSize:"0.72rem",color:B.grey}}>{s.dose}</div>
              </div>
              <div className={`supp-check ${suppChecked[i]?"done":""}`} onClick={()=>setSuppChecked(c=>c.map((v,j)=>j===i?!v:v))}>
                {suppChecked[i]&&<span style={{color:"white",fontSize:"0.65rem",fontWeight:700}}>✓</span>}
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:"0.75rem"}}>
          <div style={{fontSize:"0.68rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.amber,marginBottom:"0.4rem"}}>PM Supplements</div>
          {client.supps.filter(s=>s.time==="Evening"||s.time==="Before bed").map((s,i)=>(
            <div className="supp-row" key={i}>
              <div className="supp-dot" style={{background:s.col}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:"0.86rem",fontWeight:500,color:B.white}}>{s.name}</div>
                <div style={{fontSize:"0.72rem",color:B.grey}}>{s.dose}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Hydration */}
    <div className="card" style={{marginBottom:"1.1rem"}}>
      <div className="fb" style={{marginBottom:"0.85rem"}}>
        <div className="card-hd" style={{margin:0}}>💧 Hydration Tracker</div>
        <span style={{fontSize:"0.8rem",color:B.grey}}>{water} of {client.wgoal} cups · Target: 2.8L+</span>
      </div>
      <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
        {Array.from({length:client.wgoal}).map((_,i)=>(
          <div key={i} className={`wcup ${i<water?"full":""}`} onClick={()=>setWater(i<water?i:i+1)}/>
        ))}
      </div>
    </div>

    {/* Meal Plan */}
    <div className="card" style={{marginBottom:"1.1rem"}}>
      <div className="card-hd">This Week's Meal Plan</div>
      <div className="fg" style={{marginBottom:"1rem",flexWrap:"wrap"}}>
        {days.map(d=>(
          <button key={d} onClick={()=>setDay(d)}
            style={{padding:"0.35rem 0.85rem",borderRadius:"6px",border:"none",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.72rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",background:day===d?B.green:B.border,color:day===d?"white":B.grey,transition:"all 0.2s"}}>
            {d}
          </button>
        ))}
      </div>
      <table className="mp-table" style={{width:"100%"}}>
        <thead><tr><th>Meal</th><th>Food</th><th>Calories</th><th>Protein</th></tr></thead>
        <tbody>
          {todayMeals.map((m,i)=>(
            <tr key={i}><td style={{color:B.green,fontWeight:600}}>{m.t}</td><td>{m.m}</td><td>{m.c} kcal</td><td>{m.p}g</td></tr>
          ))}
          <tr style={{borderTop:`2px solid ${B.green}`}}>
            <td colSpan={2} style={{color:B.greyLt,fontWeight:600}}>Total</td>
            <td style={{color:B.green,fontWeight:700}}>{totalCals} kcal</td>
            <td style={{color:B.green,fontWeight:700}}>{totalProt}g</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Schedule */}
    <div className="card" style={{marginBottom:"1.1rem"}}>
      <div className="card-hd">My Weekly Schedule</div>
      <ScheduleView client={client}/>
    </div>

    {/* Messages */}
    <div className="card">
      <div className="card-hd">Messages from Tom</div>
      <div className="chat-wrap">
        {msgs.map((m,i)=>(
          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.from==="me"?"flex-end":"flex-start"}}>
            <div className={`msg msg-${m.from==="me"?"me":"them"}`}>{m.text}</div>
            <div className="msg-ts">{m.ts}</div>
          </div>
        ))}
      </div>
      <div className="div"/>
      <div className="fg">
        <input className="inp" placeholder="Message Tom…" value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()} style={{flex:1}}/>
        <button className="btn btn-g btn-sm" onClick={sendMsg}>Send</button>
      </div>
    </div>
  </div>;
}

/* ─── MANAGER DASHBOARD ──────────────────────────────────────────────────── */
function ManagerDash({clients,setClients}){
  const [sel,setSel]=useState(clients[0]);
  const [tab,setTab]=useState("assessment");
  const onTrack=clients.filter(c=>c.status==="on-track").length;
  const avgComp=Math.round(clients.filter(c=>c.comp>0).reduce((a,c)=>a+c.comp,0)/clients.filter(c=>c.comp>0).length||0);

  return <div>
    <div className="g4" style={{marginBottom:"1.1rem"}}>
      <div className="stat"><div className="stat-lbl">Total Clients</div><div className="stat-val">{clients.length}</div><div className="stat-delta up">Active roster</div></div>
      <div className="stat"><div className="stat-lbl">On Track</div><div className="stat-val">{onTrack}<span className="stat-unit">/{clients.length}</span></div><div className="stat-delta up">{Math.round(onTrack/clients.length*100)}%</div></div>
      <div className="stat"><div className="stat-lbl">Avg Compliance</div><div className="stat-val">{avgComp}<span className="stat-unit">%</span></div><div className="stat-delta up">This week</div></div>
      <div className="stat"><div className="stat-lbl">Need Attention</div><div className="stat-val" style={{color:B.alert}}>{clients.filter(c=>c.status!=="on-track"&&c.status!=="new").length}</div><div className="stat-delta dn">Follow up</div></div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"240px 1fr",gap:"1.1rem"}}>
      {/* Client List */}
      <div className="card" style={{padding:"1rem"}}>
        <div className="fb" style={{marginBottom:"0.85rem",padding:"0 0.25rem"}}>
          <div className="card-hd" style={{margin:0}}>Clients</div>
          <button className="btn btn-g btn-sm">+ Add</button>
        </div>
        <div className="scroll mh400">
          {clients.map(c=>(
            <div key={c.id} className={`crow ${sel.id===c.id?"sel":""}`} onClick={()=>{setSel(c);setTab("assessment");}}>
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

      {/* Detail */}
      <div className="card">
        <div className="fg" style={{marginBottom:"1.25rem",flexWrap:"wrap",gap:"0.75rem"}}>
          <div className="cav" style={{background:sel.col,width:50,height:50,fontSize:"0.9rem"}}>{sel.ini}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.2rem",fontWeight:700,color:B.white,textTransform:"uppercase",letterSpacing:"0.04em"}}>{sel.name}</div>
            <div style={{fontSize:"0.78rem",color:B.grey}}>{sel.goal}{sel.age?` · Age ${sel.age}`:""}{sel.height?` · ${sel.height}cm`:""}{sel.weight?` · ${sel.weight}kg`:""}</div>
          </div>
          <Badge status={sel.status}/>
        </div>

        {/* Sub tabs */}
        <div style={{display:"flex",gap:"0.25rem",background:B.darker,borderRadius:"8px",padding:"0.3rem",border:`1px solid ${B.border}`,marginBottom:"1.25rem",flexWrap:"wrap"}}>
          {["assessment","meal plan","schedule","supplements","messages","progress"].map(t=>(
            <button key={t} onClick={()=>setTab(t)}
              style={{padding:"0.35rem 0.9rem",borderRadius:"6px",border:"none",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",background:tab===t?B.green:B.darker,color:tab===t?"white":B.grey,transition:"all 0.2s"}}>
              {t}
            </button>
          ))}
        </div>

        {/* Assessment Tab */}
        {tab==="assessment" && (
          sel.assessed ? <div>
            <div className="g3" style={{marginBottom:"1.1rem"}}>
              {[{l:"Weight",v:`${sel.weight}kg`,s:`Target: ${sel.targetWeight}kg`},{l:"Activity",v:sel.activityLevel?.split(" ")[0]||"—",s:sel.activityLevel},{l:"Compliance",v:`${sel.comp}%`,s:sel.comp>=80?"Good":"Needs support"}].map((s,i)=>(
                <div key={i} style={{background:B.darker,border:`1px solid ${B.border}`,borderRadius:"8px",padding:"1rem",textAlign:"center"}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.6rem",fontWeight:700,color:B.white}}>{s.v}</div>
                  <div style={{fontSize:"0.68rem",color:B.grey,textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.l}</div>
                  <div style={{fontSize:"0.72rem",color:B.grey,marginTop:"0.2rem"}}>{s.s}</div>
                </div>
              ))}
            </div>
            <Prog label="Plan Compliance" val={sel.comp} max={100} col={sel.comp>=80?"p-green":"p-alert"} unit="%"/>
            <Prog label="Calorie Target" val={sel.cals} max={sel.targetCals||2500} col="p-green" unit=" kcal"/>
            <Prog label="Hydration" val={sel.water} max={sel.wgoal} col="p-grey" unit=" cups"/>
            <div className="div"/>
            <div style={{marginBottom:"0.75rem"}}>
              <div style={{fontSize:"0.65rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.4rem"}}>Health Conditions</div>
              {(sel.conditions||["None"]).map(c=><span key={c} className="tag">{c}</span>)}
            </div>
            <div>
              <div style={{fontSize:"0.65rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.4rem"}}>Dietary Requirements</div>
              {(sel.tags||[]).map(t=><span key={t} className="tag" style={{background:B.greenDim,color:B.greenLt}}>{t}</span>)}
            </div>
          </div>
          : <div style={{textAlign:"center",padding:"3rem",color:B.grey}}>
            <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>📋</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1rem",fontWeight:700,color:B.greyLt,textTransform:"uppercase",marginBottom:"0.35rem"}}>Assessment Not Yet Completed</div>
            <div style={{fontSize:"0.84rem"}}>This client has been invited but hasn't completed their assessment yet.</div>
          </div>
        )}

        {tab==="meal plan" && <AIMealGen client={sel}/>}
        {tab==="schedule" && <ScheduleView client={sel}/>}

        {tab==="supplements" && (
          <div>
            <div className="card-hd">Supplement Protocol</div>
            {sel.supps?.length>0 ? sel.supps.map((s,i)=>(
              <div className="supp-row" key={i}>
                <div className="supp-dot" style={{background:s.col}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:"0.88rem",fontWeight:500,color:B.white}}>{s.name}</div>
                  <div style={{fontSize:"0.74rem",color:B.grey}}>{s.dose} · {s.time}</div>
                </div>
                <span className={`badge ${s.done?"badge-green":"badge-amber"}`}>{s.done?"Taken":"Pending"}</span>
              </div>
            )) : <div style={{color:B.grey,fontSize:"0.85rem"}}>No supplements assigned yet.</div>}
            <div className="div"/>
            <button className="btn btn-g btn-sm">+ Add Supplement</button>
          </div>
        )}

        {tab==="messages" && (
          <div>
            <div className="card-hd">Messages — {sel.name}</div>
            <div className="chat-wrap">
              {(sel.msgs||[]).map((m,i)=>(
                <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.from==="me"?"flex-end":"flex-start"}}>
                  <div className={`msg msg-${m.from==="me"?"me":"them"}`}>{m.text}</div>
                  <div className="msg-ts">{m.ts}</div>
                </div>
              ))}
            </div>
            <div className="div"/>
            <div className="fg">
              <input className="inp" placeholder="Message client…" style={{flex:1}}/>
              <button className="btn btn-g btn-sm">Send</button>
            </div>
          </div>
        )}

        {tab==="progress" && (
          <div>
            <div className="card-hd">Progress Tracking</div>
            <div className="g2" style={{marginBottom:"1rem"}}>
              <div style={{background:B.darker,border:`1px solid ${B.border}`,borderRadius:"8px",padding:"1rem"}}>
                <div style={{fontSize:"0.65rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.35rem"}}>Start Weight</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.8rem",fontWeight:700,color:B.white}}>{sel.weight}<span style={{fontSize:"0.9rem",color:B.grey}}> kg</span></div>
              </div>
              <div style={{background:B.darker,border:`1px solid ${B.green}`,borderRadius:"8px",padding:"1rem"}}>
                <div style={{fontSize:"0.65rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.35rem"}}>Target Weight</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.8rem",fontWeight:700,color:B.green}}>{sel.targetWeight}<span style={{fontSize:"0.9rem",color:B.grey}}> kg</span></div>
              </div>
            </div>
            <Prog label="Weight Progress" val={sel.weight&&sel.targetWeight?(sel.weight-sel.targetWeight):0} max={10} col="p-green" unit="kg to goal"/>
            <div className="div"/>
            <div className="inp-group"><label className="inp-label">Log Weekly Weight (kg)</label><input className="inp" type="number" placeholder="e.g. 79.2"/></div>
            <button className="btn btn-g btn-sm">Save Check-in</button>
          </div>
        )}
      </div>
    </div>
  </div>;
}

/* ─── LOGIN ──────────────────────────────────────────────────────────────── */
function Login({onLogin}){
  const [isSignup,setIsSignup]=useState(false);
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [name,setName]=useState("");

  function handle(){
    if(email.includes("tom")||email.includes("admin")){onLogin("manager");}
    else{onLogin("client");}
  }

  return <div className="auth-wrap">
    <div className="auth-box">
      <div className="auth-logo"><TSLogo/></div>
      <div className="auth-title">{isSignup?"Create Account":"Welcome Back"}</div>
      <div className="auth-sub">{isSignup?"Sign up to access your personalised nutrition plan":"Sign in to your Tom Saunders Nutrition account"}</div>
      {isSignup&&<div className="inp-group"><label className="inp-label">Full Name</label><input className="inp" value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name"/></div>}
      <div className="inp-group"><label className="inp-label">Email Address</label><input className="inp" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"/></div>
      <div className="inp-group"><label className="inp-label">Password</label><input className="inp" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••"/></div>
      <button className="btn btn-g btn-full" onClick={handle}>{isSignup?"Create Account →":"Sign In →"}</button>
      <div className="auth-switch">
        {isSignup?"Already have an account? ":"New client? "}
        <span onClick={()=>setIsSignup(s=>!s)}>{isSignup?"Sign in":"Sign up here"}</span>
      </div>
      <div style={{marginTop:"1.5rem",padding:"0.75rem",background:B.darker,borderRadius:"7px",fontSize:"0.72rem",color:B.grey,textAlign:"center",border:`1px solid ${B.border}`}}>
        <strong style={{color:B.greyLt}}>Demo:</strong> Use "tom@" to access manager view · Any other email for client view
      </div>
    </div>
  </div>;
}

/* ─── ROOT APP ────────────────────────────────────────────────────────────── */
export default function App(){
  const [authState,setAuthState]=useState(null); // null=login, "manager", "client", "assessment"
  const [clients,setClients]=useState(CLIENTS);
  const [view,setView]=useState("dashboard");
  const [assessmentDone,setAssessmentDone]=useState(false);

  function handleLogin(role){
    setAuthState(role);
    if(role==="client"&&!assessmentDone){setView("assessment");}
    else{setView("dashboard");}
  }

  function handleAssessmentComplete(data){
    setAssessmentDone(true);
    setView("dashboard");
  }

  if(!authState) return <><style>{G}</style><Login onLogin={handleLogin}/></>;

  const me=clients[0];

  const clientSidebarLinks=authState==="client"?[
    ["📊","Dashboard","dashboard"],["📅","My Plan","plan"],["💊","Supplements","supps"],["💬","Messages","messages"],["📈","Progress","progress"],
  ]:[];
  const managerSidebarLinks=authState==="manager"?[
    ["👥","All Clients","dashboard"],["📊","Analytics","analytics"],["📅","Schedules","schedules"],["🍽","Meal Plans","plans"],["💬","Messages","messages"],["⚙️","Settings","settings"],
  ]:[];
  const links=authState==="manager"?managerSidebarLinks:clientSidebarLinks;

  return <div className="app">
    <style>{G}</style>
    <nav className="nav">
      <TSLogo/>
      {authState==="manager"&&(
        <div className="nav-pills">
          <button className={`pill ${view==="dashboard"?"active":""}`} onClick={()=>setView("dashboard")}>Manager</button>
          <button className={`pill ${view==="client_preview"?"active":""}`} onClick={()=>setView("client_preview")}>Client Preview</button>
        </div>
      )}
      <div className="fg">
        <div className="nav-av">{authState==="manager"?"TS":me.ini}</div>
        <button className="btn btn-ghost btn-sm" onClick={()=>setAuthState(null)}>Sign Out</button>
      </div>
    </nav>

    <div className="main">
      <aside className="sidebar">
        {authState==="manager"&&<div className="s-section">Practice</div>}
        {authState==="client"&&<div className="s-section">My Dashboard</div>}
        {links.map(([ic,lb,v])=>(
          <button key={lb} className={`slink ${view===v?"active":""}`} onClick={()=>setView(v)}>
            <span className="slink-icon">{ic}</span>{lb}
          </button>
        ))}
        {authState==="manager"&&<>
          <div className="s-section">Tools</div>
          {[["✦","AI Planner","ai"],["📄","Reports","reports"]].map(([ic,lb,v])=>(
            <button key={lb} className="slink" onClick={()=>setView(v)}>
              <span className="slink-icon">{ic}</span>{lb}
            </button>
          ))}
        </>}
      </aside>

      <main className="content">
        {authState==="client"&&view==="assessment"&&(
          <Assessment onComplete={handleAssessmentComplete}/>
        )}
        {authState==="client"&&view==="dashboard"&&(
          <>
            <div className="ph">My <em>Dashboard</em></div>
            <div className="psub">Your personalised plan from Tom Saunders Nutrition</div>
            <ClientDash client={me}/>
          </>
        )}
        {authState==="manager"&&view==="dashboard"&&(
          <>
            <div className="ph"><em>TS Nutrition</em> — Client Management</div>
            <div className="psub">View assessments, build plans and monitor all your clients</div>
            <ManagerDash clients={clients} setClients={setClients}/>
          </>
        )}
        {authState==="manager"&&view==="client_preview"&&(
          <>
            <div className="ph">Client <em>Preview</em></div>
            <div className="psub">This is what Tom Saunders sees when logged in as a client</div>
            <ClientDash client={me}/>
          </>
        )}
        {!["assessment","dashboard","client_preview"].includes(view)&&(
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"60vh",flexDirection:"column",gap:"1rem",color:B.grey}}>
            <div style={{fontSize:"3rem"}}>🚧</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"1.2rem",fontWeight:700,color:B.greyLt,textTransform:"uppercase"}}>Coming Soon</div>
            <div style={{fontSize:"0.85rem"}}>This section is being built. Check back soon!</div>
          </div>
        )}
      </main>
    </div>
  </div>;
}