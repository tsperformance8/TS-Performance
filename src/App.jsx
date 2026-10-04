import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";
import { useAuth, signUp, signIn, signOut, MANAGER_EMAIL } from "./Auth";

const B = {
  green:"#5EC431",greenLt:"#7BD655",greenDim:"rgba(94,196,49,0.12)",ink:"#0E1A08",
  dark:"#121212",darker:"#121212",card:"#1C1C1C",border:"#2A2A2A",borderLt:"#3A3A3A",
  grey:"#8E918C",greyLt:"#BDBFBB",white:"#F2F2F2",text:"#F2F2F2",
  alert:"#E05050",amber:"#F2A93B",blue:"#4A90D9",
};

const G = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{background:${B.darker};color:${B.text};font-family:'Barlow',sans-serif;font-size:15px;-webkit-font-smoothing:antialiased;font-synthesis:none}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${B.dark}}::-webkit-scrollbar-thumb{background:${B.border};border-radius:2px}
.app{min-height:100vh;display:flex;flex-direction:column}
.nav{background:${B.dark};border-bottom:3px solid ${B.green};display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:64px;position:sticky;top:0;z-index:200}
.logo{display:flex;align-items:center;gap:12px}
.logo-box{width:44px;height:44px;border-radius:8px;background:${B.green};color:${B.ink};display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:1.5rem;letter-spacing:0.02em;flex-shrink:0}
.logo-ts{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:1.2rem;color:white;letter-spacing:-0.02em;line-height:1}
.logo-slash{position:absolute;right:-4px;top:0;width:12px;height:100%;background:${B.dark};transform:skewX(-8deg)}
.logo-text{font-weight:700;font-size:0.95rem;line-height:1.15;color:${B.white}}
.logo-text em{font-style:normal;color:${B.green}}
.nav-pills{display:flex;gap:0.25rem;background:${B.darker};border-radius:8px;padding:0.3rem;border:1px solid ${B.border}}
.pill{padding:0.4rem 1.2rem;border-radius:6px;border:none;background:transparent;color:${B.grey};font-family:'Barlow Condensed',sans-serif;font-size:0.85rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;transition:all 0.2s}
.pill.active{background:${B.green};color:${B.ink}}.pill:hover:not(.active){color:${B.greyLt}}
.nav-av{width:36px;height:36px;border-radius:50%;background:#242424;display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:1.1rem;color:${B.green};flex-shrink:0}
.main{flex:1;display:flex}
.sidebar{width:220px;flex-shrink:0;background:${B.dark};border-right:1px solid ${B.border};padding:1.25rem 0;display:flex;flex-direction:column}
.s-section{font-family:'Barlow Condensed',sans-serif;font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${B.grey};padding:0 14px 8px}
.slink{display:flex;align-items:center;gap:14px;padding:12px 14px;margin:0;border-radius:10px;cursor:pointer;color:${B.grey};font-size:1rem;font-weight:600;border:none;background:transparent;width:100%;text-align:left;transition:background 0.15s,color 0.15s;font-family:'Barlow',sans-serif}
.slink:hover{background:${B.card};color:${B.greyLt}}
.slink.active{background:rgba(94,196,49,0.12);color:${B.green}}
.slink-icon{width:18px;text-align:center;font-size:0.9rem}
.content{flex:1;padding:2rem;overflow-y:auto;max-height:calc(100vh - 64px)}
.ph{font-family:'Bebas Neue',sans-serif;font-size:2.6rem;font-weight:400;color:${B.white};letter-spacing:0.02em;line-height:1;margin-bottom:0.35rem}
.ph em{color:${B.green};font-style:normal}
.psub{font-size:0.85rem;color:${B.grey};margin-bottom:1.75rem}
.card{background:${B.card};border:1px solid ${B.border};border-radius:14px;padding:1.4rem;margin-bottom:1.1rem}
.card-hd{font-family:'Barlow Condensed',sans-serif;font-size:0.78rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${B.green};margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem}
.card-hd::after{content:'';flex:1;height:1px;background:${B.border}}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.1rem}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
.g5{display:grid;grid-template-columns:repeat(5,1fr);gap:0.75rem}
.banner{background:linear-gradient(135deg,${B.card} 0%,rgba(94,196,49,0.10) 100%);border:1px solid ${B.border};border-radius:14px;padding:1.75rem 2rem;margin-bottom:1.1rem;position:relative;overflow:hidden}
.banner::after{content:'TS';position:absolute;right:1.5rem;top:50%;transform:translateY(-50%);font-family:'Bebas Neue',sans-serif;font-size:7rem;color:rgba(94,196,49,0.08);line-height:1}
.banner-label{font-family:'Barlow Condensed',sans-serif;font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${B.green};margin-bottom:0.4rem}
.banner-title{font-family:'Bebas Neue',sans-serif;font-size:2.2rem;font-weight:400;color:${B.white};margin-bottom:0.25rem;letter-spacing:0.02em;line-height:1}
.banner-sub{font-size:0.85rem;color:${B.grey}}
.pl{display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:0.3rem;color:${B.greyLt}}
.pt{height:7px;background:${B.border};border-radius:99px;margin-bottom:0.85rem;overflow:hidden}
.pf{height:100%;border-radius:99px;transition:width 0.6s ease}
.p-green{background:linear-gradient(90deg,${B.green},${B.greenLt})}
.p-amber{background:${B.amber}}.p-alert{background:${B.alert}}.p-blue{background:${B.blue}}
.badge{display:inline-flex;align-items:center;gap:0.3rem;padding:0.2rem 0.7rem;border-radius:4px;font-size:0.68rem;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:0.06em;text-transform:uppercase}
.badge-green{background:rgba(94,196,49,0.2);color:${B.greenLt};border:1px solid rgba(94,196,49,0.4)}
.badge-amber{background:rgba(212,160,32,0.15);color:${B.amber};border:1px solid rgba(212,160,32,0.3)}
.badge-blue{background:rgba(74,144,217,0.15);color:${B.blue};border:1px solid rgba(74,144,217,0.3)}
.badge-red{background:rgba(224,80,80,0.15);color:${B.alert};border:1px solid rgba(224,80,80,0.3)}
.tag{display:inline-block;padding:0.2rem 0.6rem;border-radius:4px;font-size:0.72rem;background:${B.border};color:${B.greyLt};margin:0.15rem 0.1rem}
.btn{padding:0.7rem 1.4rem;border-radius:10px;border:none;font-family:'Barlow',sans-serif;font-size:0.95rem;font-weight:700;cursor:pointer;transition:background 0.2s,color 0.2s,border-color 0.2s}
.btn-g{background:${B.green};color:${B.ink}}.btn-g:hover{background:${B.greenLt}}
.btn-o{background:${B.border};color:${B.greyLt}}.btn-o:hover{background:${B.borderLt};color:${B.white}}
.btn-sm{padding:0.45rem 0.9rem;font-size:0.85rem}
.btn-ghost{background:transparent;border:1px solid ${B.border};color:${B.grey}}.btn-ghost:hover{border-color:${B.green};color:${B.green}}
.btn-full{width:100%;padding:0.9rem;font-size:1rem}
.inp{width:100%;background:#242424;border:1px solid ${B.border};border-radius:10px;color:${B.text};font-family:'Barlow',sans-serif;font-size:0.95rem;padding:0.75rem 0.9rem;outline:none;transition:border-color 0.2s}
.inp:focus{border-color:${B.green}}.inp::placeholder{color:${B.grey}}
.inp-label{font-size:0.72rem;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${B.grey};margin-bottom:0.35rem;display:block}
.inp-group{margin-bottom:1rem}
select.inp option{background:${B.dark}}
.fb{display:flex;align-items:center;justify-content:space-between}
.fg{display:flex;align-items:center;gap:0.6rem}
.div{height:1px;background:${B.border};margin:1rem 0}
.scroll{overflow-y:auto}.mh300{max-height:300px}.mh400{max-height:400px}
.auth-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:${B.darker};padding:2rem}
.auth-box{background:${B.card};border:1px solid ${B.border};border-radius:16px;padding:2.5rem;width:100%;max-width:440px}
.auth-title{font-family:'Bebas Neue',sans-serif;font-size:2.2rem;font-weight:400;letter-spacing:0.02em;color:${B.white};margin-bottom:0.35rem;text-align:center}
.auth-sub{font-size:0.84rem;color:${B.grey};text-align:center;margin-bottom:1.75rem}
.auth-switch{text-align:center;font-size:0.82rem;color:${B.grey};margin-top:1rem}
.auth-switch span{color:${B.green};cursor:pointer;font-weight:600}
.err{background:rgba(224,80,80,0.1);border:1px solid rgba(224,80,80,0.3);border-radius:7px;padding:0.75rem 1rem;font-size:0.82rem;color:${B.alert};margin-bottom:1rem}
.success{background:rgba(94,196,49,0.1);border:1px solid rgba(94,196,49,0.3);border-radius:7px;padding:0.75rem 1rem;font-size:0.82rem;color:${B.greenLt};margin-bottom:1rem}
.loading-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:${B.darker};flex-direction:column;gap:1rem}
.spinner{width:40px;height:40px;border:3px solid ${B.border};border-top-color:${B.green};border-radius:50%;animation:spin 0.8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.assess-step{background:${B.card};border:1px solid ${B.border};border-radius:12px;padding:2rem}
.assess-title{font-family:'Bebas Neue',sans-serif;font-size:2rem;font-weight:400;color:${B.white};letter-spacing:0.02em;margin-bottom:0.35rem}
.assess-sub{font-size:0.85rem;color:${B.grey};margin-bottom:1.75rem}
.progress-steps{display:flex;gap:0.5rem;margin-bottom:2rem}
.step-dot{flex:1;height:4px;border-radius:99px;background:${B.border};transition:background 0.3s}
.step-dot.done{background:${B.green}}.step-dot.active{background:${B.greenLt}}
.checkbox-group{display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-bottom:1rem}
.checkbox-item{display:flex;align-items:center;gap:0.5rem;padding:0.6rem 0.85rem;background:${B.darker};border:1px solid ${B.border};border-radius:7px;cursor:pointer;transition:all 0.15s;font-size:0.85rem}
.checkbox-item:hover{border-color:${B.green}}.checkbox-item.checked{border-color:${B.green};background:rgba(94,196,49,0.12);color:${B.greenLt}}
.radio-group{display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1rem}
.radio-item{display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;background:${B.darker};border:1px solid ${B.border};border-radius:7px;cursor:pointer;transition:all 0.15s;font-size:0.88rem}
.radio-item:hover{border-color:${B.green}}.radio-item.selected{border-color:${B.green};background:rgba(94,196,49,0.12);color:${B.greenLt}}
.crow{display:flex;align-items:center;gap:0.85rem;padding:0.75rem;border-radius:8px;cursor:pointer;border:1px solid transparent;transition:all 0.15s}
.crow:hover{background:rgba(94,196,49,0.12)}.crow.sel{background:rgba(94,196,49,0.12);border-color:${B.border}}
.cav{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-size:0.85rem;font-weight:700;color:white;flex-shrink:0}
.cname{font-size:0.9rem;font-weight:600;color:${B.white}}.cmeta{font-size:0.74rem;color:${B.grey}}
.msg-wrap{display:flex;flex-direction:column;gap:0.75rem;height:360px;overflow-y:auto;padding:0.85rem;background:${B.dark};border:1px solid ${B.border};border-radius:12px;margin-bottom:0.75rem}
.msg-row{display:flex;flex-direction:column}
.msg-row.mine{align-items:flex-end}.msg-row.theirs{align-items:flex-start}
.msg-bubble{max-width:75%;padding:0.65rem 1rem;border-radius:10px;font-size:0.85rem;line-height:1.5;word-break:break-word}
.msg-bubble.mine{background:${B.green};color:${B.ink};border-bottom-right-radius:3px}
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
.mp-table th{background:${B.green};color:${B.ink};padding:0.6rem 0.8rem;text-align:left;font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:0.06em;text-transform:uppercase}
.mp-table td{padding:0.6rem 0.8rem;border-bottom:1px solid ${B.border};color:${B.greyLt};vertical-align:top}
.mp-table tr:hover td{background:rgba(94,196,49,0.08)}
.supp-row{display:flex;align-items:center;gap:0.85rem;padding:0.7rem 0;border-bottom:1px solid ${B.border}}
.supp-row:last-child{border:none}
.supp-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.supp-check{width:22px;height:22px;border-radius:5px;border:2px solid ${B.border};cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;margin-left:auto;flex-shrink:0}
.supp-check.done{background:${B.green};border-color:${B.green}}

/* v8 layout */
.app2{min-height:100vh;display:flex}
.side2{width:240px;flex-shrink:0;position:sticky;top:0;height:100vh;background:${B.dark};border-right:1px solid ${B.border};padding:28px 16px;display:flex;flex-direction:column;gap:4px}
.side2 .logo{padding:0 8px 28px}
.side2-foot{margin-top:auto;display:flex;flex-direction:column;gap:12px;padding:16px 8px 0;border-top:1px solid ${B.border}}
.side2-user{display:flex;align-items:center;gap:10px;min-width:0}
.side2-email{font-size:0.82rem;color:${B.grey};overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.content2{flex:1;min-width:0;padding:40px 48px;max-width:1320px}
.onb{min-height:100vh;background:${B.dark}}
.onb-top{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid ${B.border}}
.onb-body{max-width:760px;margin:0 auto;padding:32px 20px}
.auth-tag{text-align:center;color:${B.grey};font-style:italic;font-size:0.9rem;margin:-1.25rem 0 2rem}
@media (max-width:899px){
  .app2{flex-direction:column}
  .side2{position:static;width:auto;height:auto;flex-direction:row;flex-wrap:wrap;align-items:center;padding:12px;border-right:none;border-bottom:1px solid ${B.border}}
  .side2 .logo{padding:0 12px 0 4px}
  .side2 .s-section,.side2-email{display:none}
  .side2 .slink{width:auto}
  .side2-foot{margin:0 0 0 auto;border:none;padding:0;flex-direction:row}
  .content2{padding:24px 16px}
}

.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.65);display:flex;align-items:center;justify-content:center;padding:20px;z-index:500}
.modal{background:${B.card};border:1px solid ${B.border};border-radius:16px;padding:28px;width:100%;max-width:540px;max-height:90vh;overflow:auto}
.modal-title{font-family:'Bebas Neue',sans-serif;font-size:2rem;letter-spacing:0.02em;color:${B.white};line-height:1}
.btn-danger{background:${B.alert};color:#fff}.btn-danger:hover:not(:disabled){background:#C83E3E}
.btn:disabled{opacity:0.45;cursor:default}
input.inp,select.inp{height:44px}
.invite-note{display:flex;align-items:center;gap:16px;background:rgba(242,169,59,0.08);border:1px solid rgba(242,169,59,0.25);border-radius:12px;padding:14px 16px;margin-bottom:1.25rem;font-size:0.88rem;color:${B.grey};line-height:1.45}
.invite-box{background:#242424;border:1px solid ${B.border};border-radius:10px;padding:14px;font-size:0.9rem;line-height:1.5;color:${B.text}}

.dgrid2{display:grid;grid-template-columns:1fr 1fr;gap:0 0.75rem}
.dgrid3{display:grid;grid-template-columns:repeat(3,1fr);gap:0 0.75rem}
@media (max-width:420px){.dgrid3{grid-template-columns:1fr 1fr}}

/* ACTIVITY DAY SELECTOR */
.act-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:0.65rem}
.act-card{background:${B.darker};border:2px solid ${B.border};border-radius:10px;padding:0.85rem;cursor:pointer;transition:all 0.2s;text-align:center}
.act-card:hover{border-color:${B.green};transform:translateY(-1px)}
.act-card.sel{border-color:${B.green};background:rgba(94,196,49,0.12)}
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
.tcard-num{font-family:'Bebas Neue',sans-serif;font-size:2.4rem;font-weight:400;color:${B.white};line-height:1}
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
.bf-card:hover{border-color:${B.green}}.bf-card.sel{border-color:${B.green};background:rgba(94,196,49,0.15)}
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
.routine-time-tag{font-family:'Barlow Condensed',sans-serif;font-size:0.68rem;font-weight:700;letter-spacing:0.06em;color:${B.green};background:rgba(94,196,49,0.15);border:1px solid rgba(94,196,49,0.3);border-radius:4px;padding:0.1rem 0.45rem;margin-left:auto;flex-shrink:0}
`;

/* ─── ACTIVITY TYPES ─────────────────────────────────────────────────────── */
const ACTIVITIES = [
  {id:"rest",icon:"",name:"Rest Day",mult:1.2,desc:"No planned exercise"},
  {id:"light_walk",icon:"",name:"Light Walk",mult:1.3,desc:"30 min walk or light stretch"},
  {id:"moderate_walk",icon:"",name:"Moderate Walk",mult:1.35,desc:"45-60 min brisk walk"},
  {id:"yoga",icon:"",name:"Yoga / Mobility",mult:1.35,desc:"60 min yoga or mobility work"},
  {id:"gym_light",icon:"",name:"Light Gym",mult:1.45,desc:"30-40 min weights session"},
  {id:"gym_moderate",icon:"",name:"Gym Session",mult:1.55,desc:"45-60 min weights session"},
  {id:"gym_heavy",icon:"",name:"Heavy Gym",mult:1.6,desc:"60-75 min intense weights"},
  {id:"run_5k",icon:"",name:"5K Run",mult:1.5,desc:"30-35 min run"},
  {id:"run_10k",icon:"",name:"10K Run",mult:1.6,desc:"50-65 min run"},
  {id:"run_half",icon:"",name:"Half Marathon",mult:1.75,desc:"90+ min run"},
  {id:"cycle_mod",icon:"",name:"Cycling",mult:1.55,desc:"45-60 min moderate cycling"},
  {id:"cycle_hard",icon:"",name:"Hard Cycling",mult:1.65,desc:"60+ min intense cycling"},
  {id:"swim",icon:"",name:"Swimming",mult:1.55,desc:"45-60 min swim"},
  {id:"football",icon:"",name:"Football / Sport",mult:1.65,desc:"90 min game or training"},
  {id:"hiit",icon:"",name:"HIIT Session",mult:1.6,desc:"30-45 min HIIT"},
  {id:"double_mod",icon:"2",name:"Two Sessions",mult:1.75,desc:"Two moderate sessions"},
  {id:"double_hard",icon:"",name:"Double Hard",mult:1.9,desc:"Two intense sessions"},
  {id:"run_gym",icon:"",name:"Run + Gym",mult:1.8,desc:"Run AND weights same day"},
  {id:"comp",icon:"",name:"Competition",mult:1.9,desc:"Match day / competition"},
  {id:"custom",icon:"",name:"Custom",mult:null,desc:"Enter your own multiplier"},
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
  {pct:8,figure:"",label:"Very lean",desc:"Visible abs, very low fat"},
  {pct:12,figure:"",label:"Lean",desc:"Some ab definition"},
  {pct:16,figure:"",label:"Average fit",desc:"Athletic but not defined"},
  {pct:22,figure:"",label:"Average",desc:"Soft, minimal definition"},
  {pct:28,figure:"",label:"Above average",desc:"Carrying excess fat"},
  {pct:35,figure:"",label:"High body fat",desc:"Significant excess fat"},
];

const BF_OPTIONS_FEMALE = [
  {pct:15,figure:"",label:"Very lean",desc:"Visible muscle, very low fat"},
  {pct:20,figure:"",label:"Lean",desc:"Toned, some definition"},
  {pct:25,figure:"",label:"Average fit",desc:"Healthy, athletic build"},
  {pct:30,figure:"",label:"Average",desc:"Soft, healthy range"},
  {pct:36,figure:"",label:"Above average",desc:"Carrying some excess fat"},
  {pct:42,figure:"",label:"High body fat",desc:"Significant excess fat"},
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
    <span className="logo-box">TS</span>
    <span className="logo-text">Tom Saunders<br/><em>Nutrition</em></span>
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
  if(status==="active") return <span className="badge badge-green">● Active</span>;
  if(status==="invited") return <span className="badge badge-amber">● Invited</span>;
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
        ?<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",flexDirection:"column",gap:"0.5rem",color:B.grey}}><div style={{fontSize:"1.5rem"}}></div><div style={{fontSize:"0.85rem"}}>No messages yet.</div></div>
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
    <div className="card-hd"> Today's Nutrition Targets</div>

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
      <div className="card-hd" style={{margin:0}}> Weekly Target Planner</div>
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
              <option key={a.id} value={a.id}>{a.name}</option>
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
    <div className="card-hd"> Edit Routines & Supplements</div>
    <div style={{fontSize:"0.78rem",color:B.grey,marginBottom:"1rem"}}>Enter each item on a new line. You can include times e.g. "07:00 — Drink 500ml water with salt and lemon"</div>
    <div className="g2" style={{marginBottom:"1rem"}}>
      <div>
        <div className="inp-group"><label className="inp-label"> Morning Routine</label><textarea className="inp" rows={6} value={draft.morning} onChange={e=>setDraft(d=>({...d,morning:e.target.value}))} placeholder={"07:00 — Get morning sunlight\n07:05 — Drink 500ml water with salt and lemon\n07:10 — Breathwork (5 minutes)\n07:15 — Cold shower"}/></div>
        <div className="inp-group"><label className="inp-label"> AM Supplements</label><textarea className="inp" rows={4} value={draft.amSupps} onChange={e=>setDraft(d=>({...d,amSupps:e.target.value}))} placeholder={"Vitamin D3 K2 — 2000 IU\nOmega-3 — 1000mg EPA/DHA\nCreatine Monohydrate — 5g"}/></div>
      </div>
      <div>
        <div className="inp-group"><label className="inp-label"> Evening Routine</label><textarea className="inp" rows={6} value={draft.evening} onChange={e=>setDraft(d=>({...d,evening:e.target.value}))} placeholder={"21:00 — Remove blue light / screens off\n21:15 — Foam roll and stretch\n21:30 — Read or journal\n22:00 — Floss, tongue scrape and brush teeth"}/></div>
        <div className="inp-group"><label className="inp-label"> PM Supplements</label><textarea className="inp" rows={4} value={draft.pmSupps} onChange={e=>setDraft(d=>({...d,pmSupps:e.target.value}))} placeholder={"Magnesium Glycinate — 400mg\nLion's Mane — 1000mg\nL-Theanine — 200mg"}/></div>
      </div>
    </div>
    <div className="fg">
      <button className="btn btn-g" onClick={save} disabled={saving}>{saving?"Saving…":"Save Routine "}</button>
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
      <div className="card-hd" style={{margin:0}}> Daily Routines & Supplements</div>
      {isManager&&<button className="btn btn-ghost btn-sm" onClick={()=>setEditing(true)}> Edit</button>}
    </div>
    {!hasContent ? <div style={{textAlign:"center",padding:"2rem",color:B.grey,fontSize:"0.85rem"}}>
      {isManager?"Click Edit to add this client's morning and evening routines.":"Your coach will add your daily routines here soon."}
    </div> : <div className="g2">
      <div>
        <div style={{fontSize:"0.72rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.green,marginBottom:"0.5rem"}}> Morning Routine</div>
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
          <div style={{fontSize:"0.72rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.amber,margin:"0.85rem 0 0.5rem"}}> AM Supplements</div>
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
        <div style={{fontSize:"0.72rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.blue,marginBottom:"0.5rem"}}> Evening Routine</div>
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
          <div style={{fontSize:"0.72rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.amber,margin:"0.85rem 0 0.5rem"}}> PM Supplements</div>
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
      <div className="auth-tag">Make the best decisions at the right moments</div>
      <div className="auth-title">{isSignup?"Create your account":"Welcome back"}</div>
      <div className="auth-sub">{isSignup?"Sign up to access your personalised nutrition plan":"Sign in to your Tom Saunders Nutrition account"}</div>
      {error&&<div className="err">{error}</div>}
      {success&&<div className="success">{success}</div>}
      {isSignup&&<div className="inp-group"><label className="inp-label">Full Name</label><input className="inp" value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name"/></div>}
      <div className="inp-group"><label className="inp-label">Email Address</label><input className="inp" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" onKeyDown={e=>e.key==="Enter"&&handleSubmit()}/></div>
      <div className="inp-group"><label className="inp-label">Password</label><input className="inp" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&handleSubmit()}/></div>
      <button className="btn btn-g btn-full" onClick={handleSubmit} disabled={loading}>{loading?"Please wait…":isSignup?"Create account":"Sign in"}</button>
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
          {step<total-1?<button className="btn btn-g btn-sm" onClick={()=>setStep(s=>s+1)}>Continue →</button>:<button className="btn btn-g" onClick={submit} disabled={saving}>{saving?"Saving…":"Submit Assessment "}</button>}
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
    <div className="card-hd"> AI Meal Plan Generator</div>
    <textarea className="inp" rows={4} value={prompt} onChange={e=>setPrompt(e.target.value)} style={{marginBottom:"0.75rem"}}/>
    <div className="fg" style={{marginBottom:"0.75rem"}}>
      <button className="btn btn-g btn-sm" onClick={generate} disabled={loading}>{loading?"Generating…":" Generate Plan"}</button>
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
        <div className="card-hd" style={{margin:0}}> Hydration Tracker</div>
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
      <div className="card-hd"> Messages from Tom</div>
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

  const [clientRows,setClientRows]=useState([]);
  const [showAdd,setShowAdd]=useState(false);
  const [toDelete,setToDelete]=useState(null);
  const [toEdit,setToEdit]=useState(null);

  async function loadClients(selectEmail){
    const [a,c]=await Promise.all([
      supabase.from("assessments").select("*").order("completed_at",{ascending:false}),
      supabase.from("clients").select("*").order("created_at",{ascending:false}),
    ]);
    if(a.data) setDbClients(a.data);
    if(c.data) setClientRows(c.data);
    if(selectEmail!==undefined) setSel(selectEmail?{email:selectEmail}:null);
  }

  // Merge manager-added clients with clients who have signed up and completed an assessment
  const byEmail={};
  clientRows.forEach(r=>{ byEmail[r.email.toLowerCase()]={row:r,assess:null}; });
  dbClients.forEach(a=>{ const k=(a.email||"").toLowerCase(); if(!k) return; byEmail[k]=byEmail[k]||{row:null,assess:null}; byEmail[k].assess=a; });
  const allClients=Object.entries(byEmail).map(([email,{row,assess}])=>{
    const d=assess?.data||row?.data||null;
    const first=row?.first_name||assess?.data?.firstName||"";
    const last=row?.last_name||assess?.data?.lastName||"";
    const hasStats=!!(d&&d.weight);
    return {
      id:email, email, row, assess,
      name:`${first} ${last}`.trim()||email,
      ini:((first[0]||email[0]||"?")+(last[0]||"")).toUpperCase(),
      col:"#2F6A1A",
      goal:d?.goal||(assess?"Assessment complete":"Awaiting sign-up"),
      status:assess?"active":"invited",
      assessed:hasStats, assessmentData:hasStats?d:null,
    };
  });
  const currentSel=(sel&&allClients.find(c=>c.email===sel.email?.toLowerCase()))||allClients[0]||null;
  const activeCount=allClients.filter(c=>c.status==="active").length;

  const profile = currentSel?.assessmentData ? {
    weight: parseFloat(currentSel.assessmentData.weight)||0,
    height: parseFloat(currentSel.assessmentData.height)||0,
    age: parseFloat(currentSel.assessmentData.age)||0,
    sex: currentSel.assessmentData.sex||"male",
    bodyFatPct: parseFloat(currentSel.assessmentData.bodyFatPct)||20,
    goal: currentSel.assessmentData.goal||"",
  } : null;

  return <div>
    <div className="g3" style={{marginBottom:"1.1rem"}}>
      {[["Total clients",allClients.length,B.green],["Signed up",activeCount,B.green],["Awaiting sign-up",allClients.length-activeCount,B.amber]].map(([l,v,c])=>(
        <div key={l} style={{background:B.card,border:`1px solid ${B.border}`,borderLeft:`3px solid ${c}`,borderRadius:12,padding:"1.1rem 1.25rem"}}>
          <div style={{fontSize:"0.68rem",fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:B.grey,marginBottom:"0.4rem"}}>{l}</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"2.2rem",lineHeight:1,color:B.white}}>{v}</div>
        </div>
      ))}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"minmax(300px,340px) 1fr",alignItems:"start",gap:"1.1rem"}}>
      <div className="card" style={{padding:"1rem"}}>
        <button className="btn btn-g btn-full" style={{marginBottom:"0.85rem",display:"flex",alignItems:"center",justifyContent:"center",gap:8}} onClick={()=>setShowAdd(true)}>
          <Icon name="plus" size={18} sw={2.2}/>Add client
        </button>
        <div className="scroll" style={{maxHeight:"60vh"}}>
          {allClients.length===0&&<div style={{color:B.grey,fontSize:"0.9rem",padding:"1rem 0.5rem",textAlign:"center"}}>No clients yet. Add your first client to set up their account.</div>}
          {allClients.map(c=>(
            <div key={c.id} role="button" tabIndex={0} className={`crow ${currentSel?.id===c.id?"sel":""}`}
              onClick={()=>{setSel(c);setTab("assessment");}} onKeyDown={e=>{if(e.key==="Enter"){setSel(c);setTab("assessment");}}}>
              <div className="cav" style={{background:c.col}}>{c.ini}</div>
              <div style={{flex:1,minWidth:0}}><div className="cname">{c.name}</div><div className="cmeta" style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.goal}</div></div>
              <Badge status={c.status}/>
            </div>
          ))}
        </div>
      </div>

      {!currentSel&&<div className="card" style={{textAlign:"center",padding:"3rem",color:B.grey}}>Select or add a client to get started.</div>}
      {currentSel&&<div className="card">
        <div className="fg" style={{marginBottom:"1.25rem",gap:"0.75rem"}}>
          <div className="cav" style={{background:currentSel.col,width:50,height:50}}>{currentSel.ini}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"1.6rem",letterSpacing:"0.02em",color:B.white,lineHeight:1.1}}>{currentSel.name}</div>
            <div style={{fontSize:"0.82rem",color:B.grey}}>{currentSel.email}</div>
          </div>
          <Badge status={currentSel.status}/>
          <button className="btn btn-ghost btn-sm" style={{display:"flex",alignItems:"center",gap:6}} onClick={()=>setToEdit(currentSel)} aria-label={`Edit ${currentSel.name}`}>
            <Icon name="edit" size={16}/>Edit
          </button>
          <button className="btn btn-ghost btn-sm" style={{display:"flex",alignItems:"center",gap:6}} onClick={()=>setToDelete(currentSel)} aria-label={`Delete ${currentSel.name}`}>
            <Icon name="trash" size={16}/>Delete
          </button>
        </div>
        {currentSel.status==="invited"&&<InviteNote client={currentSel}/>}

        <div style={{display:"flex",gap:"0.25rem",background:B.darker,borderRadius:"8px",padding:"0.3rem",border:`1px solid ${B.border}`,marginBottom:"1.25rem",flexWrap:"wrap"}}>
          {["assessment","structure","diary","targets","routines","messages","meal plan","progress"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"0.35rem 0.9rem",borderRadius:"6px",border:"none",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",background:tab===t?B.green:B.card,color:tab===t?B.ink:B.grey,transition:"all 0.2s"}}>{t}</button>
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
            <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}></div>
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
        {tab==="structure"&&<StructureEditor email={currentSel.email}/>}
        {tab==="diary"&&<DiaryBrowser email={currentSel.email} profile={profile}/>}
        {tab==="meal plan"&&<AIMealGen client={currentSel}/>}

        {tab==="messages"&&<div>
          <div className="card-hd"> Messages with {currentSel.name}</div>
          {currentSel.email
            ?<Messaging myEmail={managerUser.email} otherEmail={currentSel.email} myId={managerUser.id}/>
            :<div style={{color:B.grey,fontSize:"0.85rem",padding:"1rem 0"}}>No email on file for this client.</div>
          }
        </div>}

        {tab==="progress"&&<div>
          <div className="card-hd"> Progress Tracking</div>
          <div style={{color:B.grey,fontSize:"0.85rem",padding:"1rem 0"}}>Progress tracking coming in Phase 5.</div>
        </div>}
      </div>}
    </div>
    {showAdd&&<AddClientModal existing={allClients.map(c=>c.email)} onClose={()=>setShowAdd(false)} onAdded={email=>{loadClients(email);}}/>}
    {toEdit&&<EditClientModal client={toEdit} onClose={()=>setToEdit(null)} onSaved={email=>{setToEdit(null);loadClients(email);}}/>}
    {toDelete&&<DeleteClientModal client={toDelete} onClose={()=>setToDelete(null)} onDeleted={()=>{setToDelete(null);loadClients(null);}}/>}
  </div>;
}

/* ─── ADD / DELETE CLIENTS ───────────────────────────────────────────────── */
const SITE_URL = typeof window!=="undefined" ? window.location.origin : "https://ts-performance.vercel.app";

function inviteText(first,email){
  return `Hi ${first||"there"}, your Tom Saunders Nutrition account is ready. Create your login at ${SITE_URL} using this email address: ${email}. You'll start with a short assessment, then your plan will be waiting for you.`;
}

function CopyButton({text,label="Copy invite message"}){
  const [done,setDone]=useState(false);
  async function copy(){
    try{ await navigator.clipboard.writeText(text); setDone(true); setTimeout(()=>setDone(false),2000); }
    catch{ window.prompt("Copy this message:",text); }
  }
  return <button className="btn btn-ghost btn-sm" style={{display:"inline-flex",alignItems:"center",gap:6}} onClick={copy}>
    <Icon name={done?"check":"copy"} size={16}/>{done?"Copied":label}
  </button>;
}

function Modal({title,onClose,children}){
  useEffect(()=>{
    const k=e=>{ if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown",k); return ()=>window.removeEventListener("keydown",k);
  },[onClose]);
  return <div className="modal-bg" onMouseDown={e=>{ if(e.target===e.currentTarget) onClose(); }}>
    <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="fb" style={{marginBottom:"1.25rem"}}>
        <div className="modal-title">{title}</div>
        <button className="btn btn-ghost btn-sm" onClick={onClose} aria-label="Close" style={{display:"flex",padding:"0.4rem"}}><Icon name="close" size={18}/></button>
      </div>
      {children}
    </div>
  </div>;
}

function InviteNote({client}){
  const first=client.row?.first_name||client.name.split(" ")[0];
  return <div className="invite-note">
    <div style={{flex:1}}>
      <div style={{fontWeight:700,color:B.white,marginBottom:2}}>Not signed up yet</div>
      <div>Anything you set up now (targets, routines, messages) will be waiting when {first} creates a login with <strong style={{color:B.greyLt}}>{client.email}</strong>.</div>
    </div>
    <CopyButton text={inviteText(first,client.email)}/>
  </div>;
}

function AddClientModal({existing,onClose,onAdded}){
  const [f,setF]=useState({first:"",last:"",email:"",sex:"",age:"",height:"",weight:"",bodyFatPct:"",goal:""});
  const [more,setMore]=useState(false);
  const [err,setErr]=useState("");
  const [saving,setSaving]=useState(false);
  const [added,setAdded]=useState(null);
  const set=k=>e=>setF(p=>({...p,[k]:e.target.value}));

  async function save(){
    setErr("");
    const email=f.email.trim().toLowerCase();
    if(!f.first.trim()) return setErr("Add the client's first name.");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setErr("That email address doesn't look right. Check it and try again.");
    if(existing.includes(email)) return setErr("A client with this email is already on your list.");
    const stats={sex:f.sex,age:f.age,height:f.height,weight:f.weight,bodyFatPct:f.bodyFatPct,goal:f.goal};
    const hasAny=Object.values(stats).some(v=>String(v).trim());
    setSaving(true);
    const {error}=await supabase.from("clients").insert({
      email, first_name:f.first.trim(), last_name:f.last.trim()||null,
      data: hasAny ? {...stats, firstName:f.first.trim(), lastName:f.last.trim()} : null,
    });
    setSaving(false);
    if(error) return setErr(error.code==="23505"?"A client with this email is already on your list.":"Couldn't add the client. Check your connection and try again.");
    setAdded({first:f.first.trim(),email});
    onAdded(email);
  }

  if(added) return <Modal title="Client added" onClose={onClose}>
    <p style={{color:B.greyLt,marginBottom:"1rem",lineHeight:1.5}}>{added.first}'s account is ready for you to set up. When you're ready, send them this message so they can create their login:</p>
    <div className="invite-box">{inviteText(added.first,added.email)}</div>
    <div className="fg" style={{justifyContent:"flex-end",marginTop:"1.25rem"}}>
      <CopyButton text={inviteText(added.first,added.email)}/>
      <button className="btn btn-g btn-sm" onClick={onClose}>Done</button>
    </div>
  </Modal>;

  return <Modal title="Add client" onClose={onClose}>
    {err&&<div className="err" role="alert">{err}</div>}
    <div className="g2" style={{gap:"0.75rem"}}>
      <div className="inp-group"><label className="inp-label" htmlFor="ac-first">First name</label><input id="ac-first" className="inp" value={f.first} onChange={set("first")} autoFocus/></div>
      <div className="inp-group"><label className="inp-label" htmlFor="ac-last">Last name</label><input id="ac-last" className="inp" value={f.last} onChange={set("last")}/></div>
    </div>
    <div className="inp-group"><label className="inp-label" htmlFor="ac-email">Email address</label><input id="ac-email" className="inp" type="email" value={f.email} onChange={set("email")} placeholder="The email they'll sign up with"/></div>

    <button className="m-link" style={{color:B.green,background:"none",border:"none",font:"inherit",fontSize:"0.9rem",fontWeight:600,cursor:"pointer",padding:0,marginBottom:"1rem"}} onClick={()=>setMore(m=>!m)} aria-expanded={more}>
      {more?"Hide details":"Add their details now (optional)"}
    </button>
    {more&&<div>
      <div style={{color:B.grey,fontSize:"0.85rem",marginBottom:"0.85rem"}}>Fill these in if you've already measured them, so you can set targets before they sign up.</div>
      <div className="g3" style={{gap:"0.75rem"}}>
        <div className="inp-group"><label className="inp-label" htmlFor="ac-sex">Sex</label><select id="ac-sex" className="inp" value={f.sex} onChange={set("sex")}><option value="">—</option><option value="male">Male</option><option value="female">Female</option></select></div>
        <div className="inp-group"><label className="inp-label" htmlFor="ac-age">Age</label><input id="ac-age" className="inp" type="number" inputMode="numeric" value={f.age} onChange={set("age")}/></div>
        <div className="inp-group"><label className="inp-label" htmlFor="ac-h">Height (cm)</label><input id="ac-h" className="inp" type="number" inputMode="decimal" value={f.height} onChange={set("height")}/></div>
        <div className="inp-group"><label className="inp-label" htmlFor="ac-w">Weight (kg)</label><input id="ac-w" className="inp" type="number" inputMode="decimal" value={f.weight} onChange={set("weight")}/></div>
        <div className="inp-group"><label className="inp-label" htmlFor="ac-bf">Body fat (%)</label><input id="ac-bf" className="inp" type="number" inputMode="decimal" value={f.bodyFatPct} onChange={set("bodyFatPct")}/></div>
      </div>
      <div className="inp-group"><label className="inp-label" htmlFor="ac-goal">Goal</label><select id="ac-goal" className="inp" value={f.goal} onChange={set("goal")}><option value="">—</option>{Object.keys(GOAL_ADJUSTMENTS).map(g=><option key={g} value={g}>{g}</option>)}</select></div>
    </div>}

    <div className="fg" style={{justifyContent:"flex-end",marginTop:"0.5rem"}}>
      <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
      <button className="btn btn-g btn-sm" onClick={save} disabled={saving}>{saving?"Adding…":"Add client"}</button>
    </div>
  </Modal>;
}

function DeleteClientModal({client,onClose,onDeleted}){
  const [confirm,setConfirm]=useState("");
  const [busy,setBusy]=useState(false);
  const [err,setErr]=useState("");
  const [done,setDone]=useState(false);
  const ok=confirm.trim().toLowerCase()==="delete";

  async function run(){
    setBusy(true); setErr("");
    const emails=[...new Set([client.email,client.assess?.email,client.row?.email].filter(Boolean))];
    const failed=[];
    for(const e of emails){
      const {data:files}=await supabase.storage.from("meal-photos").list(e.toLowerCase(),{limit:1000});
      if(files?.length){ const {error}=await supabase.storage.from("meal-photos").remove(files.map(x=>`${e.toLowerCase()}/${x.name}`)); if(error) failed.push("meal photos"); }
      for(const [table,col] of [["food_logs","client_email"],["eating_structures","client_email"],["daily_logs","client_email"],["week_plans","client_email"],["routines","client_email"],["messages","sender_email"],["messages","receiver_email"],["assessments","email"],["clients","email"]]){
        const {error}=await supabase.from(table).delete().eq(col,e);
        if(error) failed.push(table);
      }
    }
    setBusy(false);
    if(failed.length) setErr(`Some data couldn't be deleted (${[...new Set(failed)].join(", ")}). Nothing is lost by trying again.`);
    else setDone(true);
  }

  if(done) return <Modal title="Client deleted" onClose={onDeleted}>
    <p style={{color:B.greyLt,lineHeight:1.5}}>{client.name} and all of their data have been removed.</p>
    {client.status==="active"&&<p style={{color:B.grey,lineHeight:1.5,marginTop:"0.75rem",fontSize:"0.9rem"}}>Their login still exists. To remove it completely, open Supabase, go to Authentication → Users, and delete {client.email}.</p>}
    <div className="fg" style={{justifyContent:"flex-end",marginTop:"1.25rem"}}><button className="btn btn-g btn-sm" onClick={onDeleted}>Done</button></div>
  </Modal>;

  return <Modal title={`Delete ${client.name}?`} onClose={onClose}>
    {err&&<div className="err" role="alert">{err}</div>}
    <p style={{color:B.greyLt,lineHeight:1.5,marginBottom:"0.75rem"}}>This permanently removes their assessment, eating structure, food diary and photos, weekly plan, routines, daily ticks and all messages between you. It can't be undone.</p>
    <div className="inp-group"><label className="inp-label" htmlFor="del-confirm">Type DELETE to confirm</label><input id="del-confirm" className="inp" value={confirm} onChange={e=>setConfirm(e.target.value)} autoFocus/></div>
    <div className="fg" style={{justifyContent:"flex-end"}}>
      <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
      <button className="btn btn-danger btn-sm" onClick={run} disabled={!ok||busy}>{busy?"Deleting…":"Delete client"}</button>
    </div>
  </Modal>;
}

/* ─── EDIT CLIENT DETAILS (manager + client) ─────────────────────────────── */
const DETAIL_LIMITS={age:[10,100,"Age"],height:[100,230,"Height"],weight:[30,250,"Weight"],bodyFatPct:[3,60,"Body fat"]};

function detailsFrom(d={},row){
  return {
    first:row?.first_name||d.firstName||"", last:row?.last_name||d.lastName||"",
    sex:d.sex||"", age:d.age??"", height:d.height??"", weight:d.weight??"", bodyFatPct:d.bodyFatPct??"", goal:d.goal||"",
  };
}
function checkDetails(f){
  if(!String(f.first).trim()) return "Add a first name.";
  for(const [k,[lo,hi,label]] of Object.entries(DETAIL_LIMITS)){
    const v=String(f[k]).trim(); if(!v) continue;
    const n=parseFloat(v);
    if(isNaN(n)||n<lo||n>hi) return `${label} should be between ${lo} and ${hi}.`;
  }
  return "";
}
function mergeDetails(old,f){
  return {...(old||{}), firstName:f.first.trim(), lastName:f.last.trim(), sex:f.sex, age:f.age, height:f.height, weight:f.weight, bodyFatPct:f.bodyFatPct, goal:f.goal};
}

function DetailsFields({f,set,inputCls,labelCls,groupCls,idp}){
  const field=(k,label,type="text",mode)=><div className={groupCls} key={k}>
    <label className={labelCls} htmlFor={idp+k}>{label}</label>
    <input id={idp+k} className={inputCls} type={type} inputMode={mode} value={f[k]} onChange={set(k)}/>
  </div>;
  return <>
    <div className="dgrid2">{field("first","First name")}{field("last","Last name")}</div>
    <div className="dgrid3">
      <div className={groupCls}><label className={labelCls} htmlFor={idp+"sex"}>Sex</label>
        <select id={idp+"sex"} className={inputCls} value={f.sex} onChange={set("sex")}><option value="">—</option><option value="male">Male</option><option value="female">Female</option></select></div>
      {field("age","Age","number","numeric")}
      {field("height","Height (cm)","number","decimal")}
      {field("weight","Weight (kg)","number","decimal")}
      {field("bodyFatPct","Body fat (%)","number","decimal")}
    </div>
    <div className={groupCls}><label className={labelCls} htmlFor={idp+"goal"}>Goal</label>
      <select id={idp+"goal"} className={inputCls} value={f.goal} onChange={set("goal")}><option value="">—</option>{Object.keys(GOAL_ADJUSTMENTS).map(g=><option key={g} value={g}>{g}</option>)}</select></div>
  </>;
}

function EditClientModal({client,onClose,onSaved}){
  const base=client.assess?.data||client.row?.data||{};
  const [f,setF]=useState(detailsFrom(base,client.row));
  const [err,setErr]=useState(""); const [saving,setSaving]=useState(false);
  const set=k=>e=>setF(p=>({...p,[k]:e.target.value}));

  async function save(){
    const problem=checkDetails(f); if(problem) return setErr(problem);
    setSaving(true); setErr("");
    let failed="";
    if(client.assess){
      const {data,error}=await supabase.from("assessments").update({data:mergeDetails(client.assess.data,f)}).eq("email",client.assess.email).select();
      if(error) failed="connection"; else if(!data?.length) failed="permission";
    }
    if(!failed&&client.row){
      const {data,error}=await supabase.from("clients").update({first_name:f.first.trim(),last_name:f.last.trim()||null,data:client.assess?client.row.data:mergeDetails(client.row.data,f)}).eq("email",client.row.email).select();
      if(error) failed="connection"; else if(!data?.length) failed="permission";
    }
    setSaving(false);
    if(failed==="permission") return setErr("Not saved: the database blocked this change. The edit permission (Step 1 SQL) may be missing.");
    if(failed) return setErr("Couldn't save the changes. Check your connection and try again.");
    onSaved(client.email);
  }

  return <Modal title={`Edit ${client.name}`} onClose={onClose}>
    {err&&<div className="err" role="alert">{err}</div>}
    <DetailsFields f={f} set={set} inputCls="inp" labelCls="inp-label" groupCls="inp-group" idp="ec-"/>
    <div style={{color:B.grey,fontSize:"0.82rem",marginBottom:"1rem"}}>Email: {client.email}. Email addresses can't be changed here because they're linked to the client's login.</div>
    <div className="fg" style={{justifyContent:"flex-end"}}>
      <button className="btn btn-ghost btn-sm" onClick={onClose}>Cancel</button>
      <button className="btn btn-g btn-sm" onClick={save} disabled={saving}>{saving?"Saving…":"Save changes"}</button>
    </div>
  </Modal>;
}

/* ─── MOBILE CLIENT APP (v7) ─────────────────────────────────────────────── */
const COACH = { name:"Tom Saunders", photo:"/coach.jpg", tagline:"Make the best decisions at the right moments" };

const M = {
  bg:"#121212", card:"#1C1C1C", card2:"#242424", line:"#2A2A2A",
  green:"#5EC431", greenInk:"#0E1A08", amber:"#F2A93B",
  text:"#F2F2F2", muted:"#8E918C", faint:"#5C605A",
};

const MCSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&display=swap');
.m-app{max-width:480px;margin:0 auto;min-height:100dvh;background:${M.bg};color:${M.text};font-family:'Barlow',sans-serif;padding-bottom:calc(88px + env(safe-area-inset-bottom));position:relative}
.m-app.embedded{min-height:0;height:760px;overflow-y:auto;border:1px solid ${M.line};border-radius:24px;padding-bottom:0}
.m-head{display:flex;align-items:center;gap:14px;padding:calc(18px + env(safe-area-inset-top)) 20px 18px;border-bottom:1px solid ${M.line}}
.m-avatar{width:56px;height:56px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid ${M.green}}
.m-hi{font-family:'Bebas Neue',sans-serif;font-size:1.7rem;letter-spacing:0.02em;line-height:1}
.m-tag{color:${M.muted};font-style:italic;font-size:0.9rem;margin-top:4px;line-height:1.3}
.m-title{font-family:'Bebas Neue',sans-serif;font-size:2rem;letter-spacing:0.02em;line-height:1}
.m-sec{padding:20px}
.m-row{display:flex;align-items:center;justify-content:space-between;gap:12px}
.m-date{font-family:'Bebas Neue',sans-serif;font-size:1.6rem;letter-spacing:0.02em}
.m-streak{display:inline-flex;align-items:center;gap:6px;background:rgba(242,169,59,0.12);color:${M.amber};font-weight:700;font-size:0.85rem;padding:6px 10px;border-radius:8px}
.m-week{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-top:16px}
.m-day{display:flex;flex-direction:column;align-items:center;gap:6px;background:none;border:none;color:inherit;cursor:pointer;padding:0;font-family:inherit}
.m-dot{width:100%;max-width:46px;aspect-ratio:1;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid transparent;transition:border-color .15s}
.m-day.sel .m-dot{border-color:${M.text}}
.m-dlabel{font-size:0.75rem;color:${M.muted};font-weight:600}
.m-day.today .m-dlabel{color:${M.green}}
.m-dnum{font-size:0.72rem;color:${M.faint}}
.m-fuel{background:${M.card};border-radius:16px;padding:18px;margin-top:18px}
.m-kcal{font-family:'Bebas Neue',sans-serif;font-size:3.4rem;line-height:0.9;color:${M.text}}
.m-unit{font-size:0.9rem;color:${M.muted};margin-left:6px;font-family:'Barlow',sans-serif;font-weight:600}
.m-macros{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:16px}
.m-macro{background:${M.card2};border-radius:10px;padding:10px 8px;text-align:center}
.m-macro b{display:block;font-family:'Bebas Neue',sans-serif;font-size:1.35rem;font-weight:400;letter-spacing:0.02em}
.m-macro span{font-size:0.72rem;color:${M.muted}}
.m-act{display:flex;align-items:center;gap:8px;color:${M.muted};font-size:0.9rem;font-weight:600}
.m-h2{font-family:'Bebas Neue',sans-serif;font-size:1.5rem;letter-spacing:0.03em;margin:26px 0 12px}
.m-group{margin-bottom:14px}
.m-glabel{display:flex;align-items:center;gap:8px;color:${M.muted};font-size:0.82rem;font-weight:600;margin:0 0 8px 2px}
.m-item{display:flex;align-items:center;gap:12px;width:100%;background:${M.card};border:none;border-radius:12px;padding:14px;margin-bottom:6px;color:${M.text};font-family:inherit;font-size:0.98rem;text-align:left;cursor:pointer}
.m-item:disabled{cursor:default;opacity:0.55}
.m-check{width:24px;height:24px;border-radius:50%;border:2px solid ${M.faint};display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s}
.m-item.done .m-check{background:${M.green};border-color:${M.green};color:${M.greenInk}}
.m-item.done .m-itext{color:${M.muted};text-decoration:line-through}
.m-progress{height:6px;background:${M.card2};border-radius:3px;overflow:hidden;margin-top:6px}
.m-progress div{height:100%;background:${M.green};transition:width .3s}
.m-empty{text-align:center;padding:36px 20px;color:${M.muted}}
.m-empty h3{font-family:'Bebas Neue',sans-serif;font-size:1.6rem;font-weight:400;color:${M.text};margin:14px 0 6px;letter-spacing:0.02em}
.m-link{background:none;border:none;color:${M.green};font:inherit;text-decoration:underline;cursor:pointer;padding:0}
.m-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:min(480px,100%);background:${M.bg};border-top:1px solid ${M.line};display:grid;grid-template-columns:repeat(3,1fr);padding-bottom:env(safe-area-inset-bottom);z-index:50}
.m-app.embedded .m-nav{position:sticky;transform:none;left:auto;width:100%}
.m-tab{background:none;border:none;border-top:2px solid transparent;color:${M.muted};display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 0 12px;font-family:inherit;font-size:0.78rem;font-weight:600;cursor:pointer;margin-top:-1px}
.m-tab.on{color:${M.green};border-top-color:${M.green}}
.m-chat{display:flex;flex-direction:column;min-height:calc(100dvh - 88px - 93px)}
.m-app.embedded .m-chat{min-height:560px}
.m-msgs{flex:1;padding:16px 16px 8px;display:flex;flex-direction:column;gap:6px}
.m-bub{max-width:78%;padding:10px 14px;border-radius:18px;font-size:0.96rem;line-height:1.4;white-space:pre-wrap;word-wrap:break-word}
.m-bub.mine{align-self:flex-end;background:${M.green};color:${M.greenInk};border-bottom-right-radius:6px}
.m-bub.theirs{align-self:flex-start;background:${M.card2};border-bottom-left-radius:6px}
.m-time{font-size:0.68rem;color:${M.faint};margin:0 6px 6px}
.m-time.mine{align-self:flex-end}
.m-compose{position:sticky;bottom:calc(64px + env(safe-area-inset-bottom));display:flex;gap:10px;padding:12px 16px;background:${M.bg};border-top:1px solid ${M.line}}
.m-app.embedded .m-compose{bottom:64px}
.m-input{flex:1;background:${M.card};border:1px solid ${M.line};border-radius:12px;padding:12px 14px;color:${M.text};font-family:inherit;font-size:1rem;outline:none}
.m-input:focus{border-color:${M.green}}
.m-send{width:48px;height:48px;border-radius:50%;border:none;background:${M.green};color:${M.greenInk};display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0}
.m-send:disabled{background:${M.card2};color:${M.faint};cursor:default}
.m-card{background:${M.card};border-radius:14px;padding:16px;display:flex;align-items:center;gap:14px}
.m-ini{width:56px;height:56px;border-radius:50%;background:${M.card2};display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:1.5rem;color:${M.green};flex-shrink:0}
.m-name{font-weight:700;font-size:1.05rem}
.m-sub{color:${M.muted};font-size:0.88rem;margin-top:2px;word-break:break-all}
.m-tiles{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.m-tile{background:${M.card};border-radius:14px;padding:16px}
.m-tile b{display:flex;align-items:center;gap:8px;font-family:'Bebas Neue',sans-serif;font-size:2.4rem;font-weight:400;line-height:1}
.m-tile span{color:${M.muted};font-size:0.88rem}
.m-list{display:flex;flex-direction:column;gap:8px}
.m-li{display:flex;align-items:center;gap:14px;background:${M.card};border:none;border-radius:12px;padding:12px 14px;color:${M.text};font-family:inherit;font-size:1rem;cursor:pointer;width:100%;text-align:left}
.m-lic{width:40px;height:40px;border-radius:10px;background:${M.card2};display:flex;align-items:center;justify-content:center;color:${M.green};flex-shrink:0}
.m-back{display:flex;align-items:center;gap:6px;background:none;border:none;color:${M.muted};font-family:inherit;font-size:0.95rem;font-weight:600;cursor:pointer;padding:0}
.m-select{background:${M.card2};border:1px solid ${M.line};color:${M.text};border-radius:10px;padding:10px;font-family:inherit;font-size:0.95rem;width:100%}
.m-wrow{display:grid;grid-template-columns:44px 1fr auto;align-items:center;gap:12px;background:${M.card};border-radius:12px;padding:10px 12px;margin-bottom:6px}
.m-wday{font-family:'Bebas Neue',sans-serif;font-size:1.3rem}
.m-wk{text-align:right;font-size:0.85rem;color:${M.muted};min-width:64px}
.m-wk b{display:block;color:${M.text};font-size:1rem}
.m-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.m-stat{background:${M.card};border-radius:12px;padding:12px;text-align:center}
.m-stat b{display:block;font-family:'Bebas Neue',sans-serif;font-size:1.5rem;font-weight:400}
.m-stat span{font-size:0.75rem;color:${M.muted}}
.m-app *,.m-app *::before,.m-app *::after{box-sizing:border-box}
.m-app .dgrid2{display:grid;grid-template-columns:1fr 1fr;gap:0 10px}
.m-app .dgrid3{display:grid;grid-template-columns:1fr 1fr;gap:0 10px}
.m-editbtn{display:inline-flex;align-items:center;gap:6px;background:${M.card};border:1px solid ${M.line};color:${M.text};border-radius:10px;padding:8px 12px;font-family:inherit;font-size:0.9rem;font-weight:600;cursor:pointer}
.m-form{display:flex;flex-direction:column}
.m-fgroup{margin-bottom:12px}
.m-flabel{display:block;font-size:0.8rem;font-weight:600;color:${M.muted};margin-bottom:6px}
.m-field{width:100%;height:46px;background:${M.card};border:1px solid ${M.line};border-radius:10px;padding:0 12px;color:${M.text};font-family:inherit;font-size:1rem;outline:none}
.m-field:focus{border-color:${M.green}}
.m-btn{flex:1;height:48px;border:none;border-radius:12px;background:${M.green};color:${M.greenInk};font-family:inherit;font-size:1rem;font-weight:700;cursor:pointer}
.m-btn.ghost{background:${M.card};color:${M.text};border:1px solid ${M.line}}
.m-btn:disabled{opacity:0.5;cursor:default}
.m-err{background:rgba(224,80,80,0.1);border:1px solid rgba(224,80,80,0.3);color:#F08080;border-radius:10px;padding:10px 12px;font-size:0.9rem;margin-bottom:12px}
.m-note{font-size:0.82rem;color:${M.muted};margin-top:6px;min-height:1.2em}
.m-colA{padding-bottom:0}
.m-colB{padding-top:0}
.m-brand{display:none}
@media (min-width:900px){
  .m-app:not(.embedded){max-width:none;padding:0 0 0 240px}
  .m-app:not(.embedded) .m-nav{top:0;bottom:0;left:0;transform:none;width:240px;display:flex;flex-direction:column;gap:4px;padding:28px 16px;border-top:none;border-right:1px solid ${M.line}}
  .m-app:not(.embedded) .m-brand{display:flex;align-items:center;gap:12px;padding:0 8px 28px;font-weight:700;font-size:0.95rem;line-height:1.15}
  .m-app:not(.embedded) .m-brand em{font-style:normal;color:${M.green}}
  .m-brandmark{width:44px;height:44px;border-radius:8px;background:${M.green};color:${M.greenInk};display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:1.5rem;letter-spacing:0.02em}
  .m-app:not(.embedded) .m-tab{flex-direction:row;justify-content:flex-start;gap:14px;padding:12px 14px;border-top:none;border-radius:10px;font-size:1rem;margin:0}
  .m-app:not(.embedded) .m-tab.on{background:rgba(94,196,49,0.12)}
  .m-app:not(.embedded) .m-tab:hover:not(.on){background:${M.card}}
  .m-app:not(.embedded) .m-main{max-width:1120px;margin:0 auto;padding:0 32px}
  .m-app:not(.embedded) .m-main-chat,.m-app:not(.embedded) .m-main-profile{max-width:760px}
  .m-app:not(.embedded) .m-head{padding:32px 0 24px}
  .m-app:not(.embedded) .m-sec{padding:28px 0}
  .m-app:not(.embedded) .m-today{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:40px;align-items:start}
  .m-app:not(.embedded) .m-colB{padding-top:28px}
  .m-app:not(.embedded) .m-colB .m-h2{margin-top:0}
  .m-app:not(.embedded) .m-colA{position:sticky;top:0}
  .m-app:not(.embedded) .m-kcal{font-size:4.4rem}
  .m-app:not(.embedded) .m-chat{min-height:100dvh}
  .m-app:not(.embedded) .m-compose{bottom:0;padding:16px 0 24px}
  .m-app:not(.embedded) .m-msgs{padding:24px 0 8px}
  .m-app:not(.embedded) .m-item:hover:not(:disabled){background:${M.card2}}
  .m-app:not(.embedded) .m-li:hover{background:${M.card2}}
}
button:focus-visible,select:focus-visible,input:focus-visible{outline:2px solid ${M.green};outline-offset:2px}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
`;

const ICON_PATHS = {
  home:"M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  chat:"M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12z",
  user:"M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  moon:"M20 13.5A8.5 8.5 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z",
  walk:"M13 5a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 13 5zM10 21l2.2-6.5L15 17v4M12.2 14.5 11 9.5l-3 2.5M11 9.5l3.5.5 2 3",
  yoga:"M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM4 10h16M12 10v5M12 15l-4 6M12 15l4 6",
  gym:"M6.5 7v10M3.5 9.5v5M17.5 7v10M20.5 9.5v5M6.5 12h11",
  run:"M3 12h4l3-8 4 16 3-8h4",
  bike:"M5.5 18a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM18.5 18a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5.5 14.5 9 8h6l3.5 6.5M9 8 7.5 5H6M12 14.5 15 8",
  swim:"M2 15c2 0 2-1.5 4-1.5S8 15 10 15s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M2 20c2 0 2-1.5 4-1.5S8 20 10 20s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M8 11l4-4 3 3M16 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  ball:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7.5l3.8 2.8-1.4 4.5H9.6l-1.4-4.5z",
  zap:"M13 2 4 14h7l-1 8 9-12h-7z",
  layers:"M12 3 2 8l10 5 10-5zM2 13l10 5 10-5",
  trophy:"M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4",
  flame:"M12 22a7 7 0 0 0 7-7c0-4.5-4-7-5-12-3 2.5-5 6-5 9-1.2-.8-2-2-2.2-3.5C5.5 10.2 5 12.6 5 15a7 7 0 0 0 7 7z",
  check:"M5 12.5l4.5 4.5L19 7",
  drop:"M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12z",
  sun:"M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  pill:"M10.5 3.5a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7zM7 10l7 7",
  chevron:"M9 6l6 6-6 6",
  back:"M15 6l-6 6 6 6",
  send:"M4 12 20 4l-5 16-3.5-6.5z",
  calendar:"M4 6h16v15H4zM4 10h16M8 3v4M16 3v4",
  clipboard:"M9 4h6v3H9zM7 5.5H5V21h14V5.5h-2M8.5 12h7M8.5 16h7",
  logout:"M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 16l4-4-4-4M14 12H4",
  users:"M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M16 3.5a4 4 0 0 1 0 7.5M22 21a7 7 0 0 0-4.5-6.5",
  phone:"M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 18h2",
  chart:"M4 20V10M10 20V4M16 20v-7M2 20h20",
  sliders:"M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1M15 4v4M9 10v4M17 16v4",
  plus:"M12 5v14M5 12h14",
  trash:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
  copy:"M9 9h11v11H9zM5 15H4V4h11v1",
  edit:"M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4",
  camera:"M4 8h3l2-3h6l2 3h3v12H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  utensils:"M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M16 3c-2 1.5-2 6 0 8v10M16 3v18",
  close:"M6 6l12 12M18 6 6 18",
};

function Icon({name,size=20,sw=1.8}){
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={ICON_PATHS[name]||ICON_PATHS.calendar}/>
  </svg>;
}

function activityIcon(id=""){
  if(id==="rest") return "moon";
  if(id.includes("walk")) return "walk";
  if(id==="yoga") return "yoga";
  if(id.startsWith("gym")) return "gym";
  if(id.startsWith("run_gym")) return "layers";
  if(id.startsWith("run")) return "run";
  if(id.startsWith("cycle")) return "bike";
  if(id==="swim") return "swim";
  if(id==="football") return "ball";
  if(id==="hiit") return "zap";
  if(id.startsWith("double")) return "layers";
  if(id==="comp") return "trophy";
  return "calendar";
}

function localISO(d){ const z=new Date(d.getTime()-d.getTimezoneOffset()*60000); return z.toISOString().slice(0,10); }
function weekDates(ref=new Date()){
  const d=new Date(ref); const dow=(d.getDay()+6)%7; d.setDate(d.getDate()-dow);
  return DAYS.map((_,i)=>{ const x=new Date(d); x.setDate(d.getDate()+i); return x; });
}
function linesOf(t){ return t ? t.split("\n").map(l=>l.trim()).filter(Boolean) : []; }
function intensity(mult){ return Math.max(0,Math.min(1,((mult||1.2)-1.2)/0.7)); }

/* ─── EATING STRUCTURE + FOOD DIARY ──────────────────────────────────────── */
const OCC_TYPES=[["meal","Meal"],["snack","Snack"],["pre_meal","Pre-exercise meal"],["pre_snack","Pre-exercise snack"],["during","During exercise"],["post_snack","Post-exercise snack"],["post_meal","Post-exercise meal"]];
const OCC_LABEL=Object.fromEntries(OCC_TYPES);
const PHASES={1:"Phase 1 · Set meals",2:"Phase 2 · Choice",3:"Phase 3 · Training-based flex"};

function newOccId(){ return "o"+Math.random().toString(36).slice(2,9); }
function occ(time,type,name=""){ return {id:newOccId(),time,type,name,mode:"open",meals:[]}; }
function occTitle(o){ return o.name?.trim()||OCC_LABEL[o.type]||"Eating occasion"; }
function sortOcc(list){ return [...list].sort((a,b)=>(a.time||"").localeCompare(b.time||"")); }
function emptyWeek(){ return Object.fromEntries(DAYS.map(d=>[d,[]])); }

const STRUCTURE_TEMPLATES=[
  {id:"sed_b",group:"No exercise",name:"3 meals, 2 snacks (snack mid-morning)",build:()=>[occ("07:30","meal","Breakfast"),occ("10:30","snack"),occ("13:00","meal","Lunch"),occ("15:30","snack"),occ("18:30","meal","Dinner")]},
  {id:"sed_a",group:"No exercise",name:"3 meals, 2 snacks (snack after lunch)",build:()=>[occ("07:30","meal","Breakfast"),occ("12:30","meal","Lunch"),occ("15:30","snack"),occ("18:30","meal","Dinner"),occ("20:30","snack")]},
  {id:"sed_4",group:"No exercise",name:"4 meals",build:()=>[occ("07:30","meal","Breakfast"),occ("11:30","meal","Lunch 1"),occ("15:00","meal","Lunch 2"),occ("18:30","meal","Dinner")]},
  {id:"am",group:"Training day",name:"Morning session",build:()=>[occ("07:30","pre_meal"),occ("09:30","pre_snack"),occ("11:00","during"),occ("13:00","post_snack"),occ("13:30","post_meal"),occ("17:30","meal","Dinner")]},
  {id:"pm",group:"Training day",name:"Afternoon session",build:()=>[occ("07:30","meal","Breakfast"),occ("10:30","snack"),occ("12:00","pre_meal"),occ("14:00","pre_snack"),occ("15:00","during"),occ("16:30","post_snack"),occ("18:00","post_meal")]},
  {id:"eve",group:"Training day",name:"Evening session",build:()=>[occ("07:30","meal","Breakfast"),occ("10:30","snack"),occ("13:00","meal","Lunch"),occ("15:00","snack"),occ("16:30","pre_meal"),occ("18:00","pre_snack"),occ("19:00","during"),occ("20:30","post_snack")]},
  {id:"x2",group:"Training day",name:"Two sessions",build:()=>[occ("07:00","pre_meal"),occ("08:30","pre_snack"),occ("09:30","during"),occ("11:00","post_snack"),occ("13:00","pre_meal"),occ("15:30","pre_snack"),occ("16:30","during"),occ("18:00","post_snack"),occ("19:00","post_meal")]},
  {id:"md1",group:"Match week",name:"MD-1 with training",build:()=>[occ("07:30","pre_meal"),occ("09:30","pre_snack"),occ("11:00","during"),occ("13:00","post_snack"),occ("13:30","post_meal"),occ("17:30","meal","Dinner"),occ("19:00","snack")]},
  {id:"md1r",group:"Match week",name:"MD-1 no training",build:()=>[occ("07:30","meal","Breakfast"),occ("10:30","snack"),occ("13:00","meal","Lunch"),occ("15:30","snack"),occ("18:30","meal","Dinner"),occ("20:30","snack")]},
  {id:"md15",group:"Match week",name:"Match day, 15:00 kick-off",build:()=>[occ("09:00","meal","Breakfast"),occ("10:30","snack"),occ("12:30","pre_meal"),occ("14:30","pre_snack"),occ("15:45","during"),occ("16:45","post_snack"),occ("17:30","post_meal"),occ("19:00","snack")]},
  {id:"mdp1",group:"Match week",name:"MD+1 recovery",build:()=>[occ("09:30","meal","Breakfast"),occ("11:00","snack"),occ("13:00","meal","Lunch"),occ("15:00","snack"),occ("18:00","meal","Dinner"),occ("19:30","snack")]},
];

// Pick the structure version in force on a given date
function structureFor(versions,iso){
  let best=null;
  for(const v of versions){ if(v.effective_from<=iso&&(!best||v.effective_from>best.effective_from)) best=v; }
  return best;
}
function occasionsFor(versions,date){
  const v=structureFor(versions,localISO(date)); if(!v) return {occasions:[],phase:null};
  const day=DAYS[(date.getDay()+6)%7];
  return {occasions:sortOcc(v.week?.[day]||[]),phase:v.phase};
}

const SBCSS=`
.sb{color:${M.text};font-family:'Barlow',sans-serif}
.sb-days{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
.sb-day{background:${M.card};border:1px solid ${M.line};color:${M.muted};border-radius:10px;padding:8px 12px;font:inherit;font-weight:700;font-size:0.9rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;min-width:52px}
.sb-day small{font-weight:500;font-size:0.72rem}
.sb-day.on{background:rgba(94,196,49,0.14);border-color:${M.green};color:${M.green}}
.sb-bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px}
.sb-sel,.sb-in{background:#242424;border:1px solid ${M.line};color:${M.text};border-radius:10px;height:42px;padding:0 10px;font:inherit;font-size:0.92rem;outline:none;min-width:0}
.sb-sel:focus,.sb-in:focus{border-color:${M.green}}
.sb-row{display:grid;grid-template-columns:112px minmax(0,1.2fr) minmax(0,1fr) auto auto;gap:8px;align-items:center;background:${M.card};border:1px solid ${M.line};border-radius:12px;padding:8px;margin-bottom:6px}
.sb-row.client{grid-template-columns:112px minmax(0,1.2fr) minmax(0,1fr) auto}
.sb-mode{display:flex;background:#242424;border-radius:9px;padding:3px;gap:2px}
.sb-mode button{border:none;background:none;color:${M.muted};font:inherit;font-size:0.78rem;font-weight:700;padding:7px 9px;border-radius:7px;cursor:pointer;white-space:nowrap}
.sb-mode button.on{background:${M.green};color:${M.greenInk}}
.sb-x{background:none;border:none;color:${M.faint};cursor:pointer;padding:8px;border-radius:8px;display:flex}
.sb-x:hover{color:#F08080;background:#242424}
.sb-btn{display:inline-flex;align-items:center;gap:6px;background:#242424;border:1px solid ${M.line};color:${M.text};border-radius:10px;height:42px;padding:0 14px;font:inherit;font-weight:700;font-size:0.9rem;cursor:pointer}
.sb-btn.primary{background:${M.green};border-color:${M.green};color:${M.greenInk}}
.sb-btn:disabled{opacity:0.5;cursor:default}
.sb-copy{background:${M.card};border:1px solid ${M.line};border-radius:12px;padding:12px;margin-top:10px}
.sb-chk{display:inline-flex;align-items:center;gap:6px;margin:4px 12px 4px 0;font-size:0.9rem;cursor:pointer}
.sb-empty{color:${M.muted};text-align:center;padding:22px;border:1px dashed ${M.line};border-radius:12px;margin-bottom:10px;font-size:0.92rem}
.sb-label{font-size:0.8rem;font-weight:600;color:${M.muted}}
.sb-msg{font-size:0.88rem;min-height:1.2em;margin-top:8px}
@media (max-width:640px){
  .sb-row,.sb-row.client{grid-template-columns:112px minmax(0,1fr) auto;grid-template-areas:"t ty x" "n n n" "m m m"}
  .sb-row.client{grid-template-areas:"t ty x" "n n n"}
  .sb-row>.sb-t{grid-area:t}.sb-row>.sb-ty{grid-area:ty}.sb-row>.sb-n{grid-area:n}.sb-row>.sb-m{grid-area:m}.sb-row>.sb-x{grid-area:x}
}
/* diary */
.dy-row{display:flex;align-items:center;justify-content:space-between;gap:12px}
.dy-empty{text-align:center;color:${M.muted};padding:24px 12px;border:1px dashed ${M.line};border-radius:12px;font-size:0.92rem}
.dy-mgr .dy-tot,.dy-mgr .dy-card{background:#242424}
.dy-mgr .dy-chip.open,.dy-mgr .dy-photo{background:#2E2E2E}
.dy-tot{background:${M.card};border-radius:14px;padding:14px 16px;margin-bottom:12px}
.dy-totrow{display:flex;justify-content:space-between;font-size:0.85rem;color:${M.muted};margin-top:8px}
.dy-totrow b{color:${M.text}}
.dy-bar{height:6px;background:#242424;border-radius:3px;overflow:hidden;margin-top:4px}
.dy-bar div{height:100%;background:${M.green}}
.dy-card{background:${M.card};border-radius:14px;padding:14px;margin-bottom:8px}
.dy-head{display:flex;align-items:center;gap:10px}
.dy-time{font-family:'Bebas Neue',sans-serif;font-size:1.25rem;letter-spacing:0.02em;color:${M.muted};min-width:48px}
.dy-title{font-weight:700;font-size:1rem}
.dy-type{font-size:0.75rem;color:${M.muted}}
.dy-chip{margin-left:auto;font-size:0.72rem;font-weight:700;padding:4px 8px;border-radius:6px;white-space:nowrap}
.dy-chip.alloc{background:rgba(94,196,49,0.14);color:${M.green}}
.dy-chip.open{background:#242424;color:${M.muted}}
.dy-chip.done{background:${M.green};color:${M.greenInk}}
.dy-body{margin-top:10px;font-size:0.92rem;color:${M.muted};line-height:1.45}
.dy-acts{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}
.dy-act{display:inline-flex;align-items:center;gap:6px;background:#242424;border:1px solid ${M.line};color:${M.text};border-radius:10px;padding:9px 12px;font:inherit;font-size:0.88rem;font-weight:600;cursor:pointer}
.dy-act.primary{background:${M.green};border-color:${M.green};color:${M.greenInk}}
.dy-log{display:flex;gap:12px;margin-top:10px;align-items:flex-start}
.dy-photo{width:72px;height:72px;border-radius:10px;object-fit:cover;background:#242424;flex-shrink:0}
.dy-macros{font-size:0.82rem;color:${M.muted};margin-top:4px}
.dy-sheet-bg{position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:600;display:flex;align-items:flex-end;justify-content:center}
.dy-sheet{background:${M.bg};border-top:1px solid ${M.line};border-radius:20px 20px 0 0;width:min(520px,100%);max-height:92dvh;overflow:auto;padding:20px 20px calc(20px + env(safe-area-inset-bottom))}
@media (min-width:900px){.dy-sheet-bg{align-items:center}.dy-sheet{border-radius:20px;border:1px solid ${M.line}}}
.dy-g4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.dy-prev{width:100%;max-height:220px;object-fit:cover;border-radius:12px;margin-bottom:12px}
.dy-wknav{display:flex;align-items:center;gap:6px}
.dy-wkbtn{width:36px;height:36px;border-radius:50%;border:1px solid ${M.line};background:${M.card};color:${M.text};display:flex;align-items:center;justify-content:center;cursor:pointer}
.dy-today{background:none;border:none;color:${M.green};font:inherit;font-weight:700;font-size:0.85rem;cursor:pointer;padding:6px}
`;

/* Structure builder: used by the manager (with modes + phase) and by the client (times/types/names only) */
function StructureBuilder({week,setWeek,isManager}){
  const [day,setDay]=useState("Mon");
  const [tpl,setTpl]=useState("");
  const [copyTo,setCopyTo]=useState([]);
  const [copied,setCopied]=useState("");
  const list=sortOcc(week[day]||[]);

  function update(id,patch){ setWeek(w=>({...w,[day]:(w[day]||[]).map(o=>o.id===id?{...o,...patch}:o)})); }
  function remove(id){ setWeek(w=>({...w,[day]:(w[day]||[]).filter(o=>o.id!==id)})); }
  function add(){ const last=list[list.length-1]; setWeek(w=>({...w,[day]:[...(w[day]||[]),occ(last?.time?bump(last.time):"08:00","meal")]})); }
  function bump(t){ const [h,m]=t.split(":").map(Number); const x=Math.min(23,h+2); return `${String(x).padStart(2,"0")}:${String(m||0).padStart(2,"0")}`; }
  function applyTemplate(){
    const t=STRUCTURE_TEMPLATES.find(x=>x.id===tpl); if(!t) return;
    if((week[day]||[]).length&&!window.confirm(`Replace ${day}'s eating occasions with "${t.name}"?`)) return;
    setWeek(w=>({...w,[day]:t.build()})); setTpl("");
  }
  function doCopy(){
    if(!copyTo.length) return;
    setWeek(w=>{ const n={...w}; copyTo.forEach(d=>{ n[d]=(w[day]||[]).map(o=>({...o,id:newOccId(),meals:[...(o.meals||[])]})); }); return n; });
    setCopied(`Copied ${day} to ${copyTo.join(", ")}.`); setCopyTo([]); setTimeout(()=>setCopied(""),2500);
  }

  return <div className="sb">
    <style>{SBCSS}</style>
    <div className="sb-days" role="tablist" aria-label="Day of the week">
      {DAYS.map(d=><button key={d} role="tab" aria-selected={d===day} className={`sb-day ${d===day?"on":""}`} onClick={()=>setDay(d)}>
        {d}<small>{(week[d]||[]).length} {(week[d]||[]).length===1?"time":"times"}</small>
      </button>)}
    </div>

    <div className="sb-bar">
      <select className="sb-sel" value={tpl} onChange={e=>setTpl(e.target.value)} aria-label="Start from a template" style={{flex:"1 1 220px"}}>
        <option value="">Start {day} from a template…</option>
        {["No exercise","Training day","Match week"].map(g=><optgroup key={g} label={g}>
          {STRUCTURE_TEMPLATES.filter(t=>t.group===g).map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
        </optgroup>)}
      </select>
      <button className="sb-btn" onClick={applyTemplate} disabled={!tpl}>Use template</button>
    </div>

    {list.length===0&&<div className="sb-empty">No eating occasions on {day} yet. Pick a template above or add them one by one.</div>}
    {list.map(o=><div key={o.id} className={`sb-row ${isManager?"":"client"}`}>
      <input className="sb-in sb-t" type="time" value={o.time} onChange={e=>update(o.id,{time:e.target.value})} aria-label="Time"/>
      <select className="sb-sel sb-ty" value={o.type} onChange={e=>update(o.id,{type:e.target.value})} aria-label="Type">
        {OCC_TYPES.map(([v,l])=><option key={v} value={v}>{l}</option>)}
      </select>
      <input className="sb-in sb-n" value={o.name} placeholder={OCC_LABEL[o.type]} onChange={e=>update(o.id,{name:e.target.value})} aria-label="Name (optional)"/>
      {isManager&&<div className="sb-mode sb-m" role="group" aria-label="Who decides this meal">
        <button className={o.mode==="allocated"?"on":""} onClick={()=>update(o.id,{mode:"allocated"})}>Allocated</button>
        <button className={o.mode!=="allocated"?"on":""} onClick={()=>update(o.id,{mode:"open"})}>Open</button>
      </div>}
      <button className="sb-x" onClick={()=>remove(o.id)} aria-label={`Remove ${occTitle(o)}`}><Icon name="trash" size={18}/></button>
    </div>)}

    <div className="sb-bar" style={{marginTop:10}}>
      <button className="sb-btn" onClick={add}><Icon name="plus" size={16} sw={2.2}/>Add eating occasion</button>
    </div>

    {list.length>0&&<div className="sb-copy">
      <div className="sb-label" style={{marginBottom:6}}>Copy {day} to other days</div>
      {DAYS.filter(d=>d!==day).map(d=><label key={d} className="sb-chk">
        <input type="checkbox" checked={copyTo.includes(d)} onChange={e=>setCopyTo(c=>e.target.checked?[...c,d]:c.filter(x=>x!==d))}/>{d}
      </label>)}
      <div style={{display:"flex",gap:8,marginTop:8,alignItems:"center",flexWrap:"wrap"}}>
        <button className="sb-btn" onClick={()=>setCopyTo(DAYS.filter(d=>d!==day))}>Select all</button>
        <button className="sb-btn primary" onClick={doCopy} disabled={!copyTo.length}>Copy</button>
        <span className="sb-label" role="status">{copied}</span>
      </div>
    </div>}
  </div>;
}

/* Manager: edit a client's structure + phase, effective from a date */
function StructureEditor({email}){
  const todayISO=localISO(new Date());
  const [versions,setVersions]=useState(null);
  const [week,setWeek]=useState(emptyWeek());
  const [phase,setPhase]=useState(1);
  const [from,setFrom]=useState(todayISO);
  const [msg,setMsg]=useState({t:"",ok:true});
  const [saving,setSaving]=useState(false);

  useEffect(()=>{ load(); },[email]);
  async function load(){
    setVersions(null); setMsg({t:"",ok:true});
    const {data}=await supabase.from("eating_structures").select("*").eq("client_email",email).order("effective_from",{ascending:false});
    const v=data||[]; setVersions(v);
    const cur=structureFor(v,todayISO)||v[v.length-1]||null;
    setWeek(cur?{...emptyWeek(),...cur.week}:emptyWeek()); setPhase(cur?.phase||1); setFrom(todayISO);
  }
  async function save(){
    if(!from) return setMsg({t:"Choose the date these changes start from.",ok:false});
    setSaving(true);
    const {data,error}=await supabase.from("eating_structures").upsert({client_email:email,effective_from:from,phase:Number(phase),week,updated_at:new Date().toISOString()}).select();
    setSaving(false);
    if(error||!data?.length) return setMsg({t:"Not saved. Check the eating_structures permissions have been set up, then try again.",ok:false});
    setMsg({t:`Saved. This structure applies from ${new Date(from+"T12:00").toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"})}.`,ok:true});
    const {data:v}=await supabase.from("eating_structures").select("*").eq("client_email",email).order("effective_from",{ascending:false}); setVersions(v||[]);
  }
  if(versions===null) return <div style={{color:B.grey,padding:"1rem"}}>Loading…</div>;

  return <div>
    <div className="g3" style={{gap:"0.75rem",marginBottom:"0.5rem"}}>
      <div className="inp-group"><label className="inp-label" htmlFor="se-phase">Phase</label>
        <select id="se-phase" className="inp" value={phase} onChange={e=>setPhase(e.target.value)}>{[1,2,3].map(p=><option key={p} value={p}>{PHASES[p]}</option>)}</select></div>
      <div className="inp-group"><label className="inp-label" htmlFor="se-from">Changes apply from</label>
        <input id="se-from" className="inp" type="date" value={from} onChange={e=>setFrom(e.target.value)}/></div>
      <div className="inp-group" style={{display:"flex",alignItems:"flex-end"}}>
        <button className="btn btn-g" style={{width:"100%",height:44}} onClick={save} disabled={saving}>{saving?"Saving…":"Save structure"}</button></div>
    </div>
    <div style={{color:B.grey,fontSize:"0.85rem",marginBottom:"1rem"}}>
      <strong style={{color:B.greyLt}}>Allocated</strong> = you set the meal. <strong style={{color:B.greyLt}}>Open</strong> = the client logs it with a photo or by tracking. Days before the start date keep their previous structure.
    </div>
    {msg.t&&<div className={msg.ok?"success":"err"} role="status">{msg.t}</div>}
    <StructureBuilder week={week} setWeek={setWeek} isManager/>
    {versions.length>0&&<div style={{marginTop:"1.25rem",fontSize:"0.85rem",color:B.grey}}>
      <div className="inp-label">Structure history</div>
      {versions.map(v=><div key={v.effective_from}>From {new Date(v.effective_from+"T12:00").toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})} · {PHASES[v.phase]||"Phase "+v.phase}</div>)}
    </div>}
  </div>;
}

/* Client onboarding step / edit screen for their eating week */
function ClientStructureSetup({email,versions,onSaved,onBack,firstRun}){
  const todayISO=localISO(new Date());
  const cur=structureFor(versions||[],todayISO)||(versions||[])[0]||null;
  const [week,setWeek]=useState(cur?{...emptyWeek(),...cur.week}:emptyWeek());
  const [err,setErr]=useState(""); const [saving,setSaving]=useState(false);
  const total=DAYS.reduce((n,d)=>n+(week[d]||[]).length,0);

  async function save(){
    if(!total) return setErr("Add at least one eating occasion. Templates are the quickest way to start.");
    setSaving(true); setErr("");
    const {data,error}=await supabase.from("eating_structures").upsert({client_email:email,effective_from:todayISO,phase:cur?.phase||1,week,updated_at:new Date().toISOString()}).select();
    setSaving(false);
    if(error||!data?.length) return setErr("Your eating week didn't save. Please try again, or message your coach if it keeps happening.");
    onSaved();
  }

  return <div className="m-sec">
    {!firstRun&&<button className="m-back" onClick={onBack}><Icon name="back" size={18}/>Profile</button>}
    <div className="m-title" style={{margin:firstRun?"4px 0 8px":"14px 0 8px"}}>{firstRun?"Set up your eating week":"My eating week"}</div>
    <div style={{color:M.muted,fontSize:"0.94rem",lineHeight:1.5,marginBottom:16}}>
      {firstRun?"For each day, add the times you'll eat and what each one is: a meal, a snack, or food around training. Start from a template and adjust the times to fit your routine.":"Changes apply from today. Your past days stay as they were."}
    </div>
    {err&&<div className="m-err" role="alert">{err}</div>}
    <StructureBuilder week={week} setWeek={setWeek} isManager={false}/>
    <div className="m-row" style={{gap:10,marginTop:16}}>
      {!firstRun&&<button className="m-btn ghost" onClick={onBack}>Cancel</button>}
      <button className="m-btn" onClick={save} disabled={saving}>{saving?"Saving…":firstRun?"Save and continue":"Save changes"}</button>
    </div>
  </div>;
}

/* ─── Food diary for one day ─── */
async function compressImage(file){
  try{
    const img=await createImageBitmap(file);
    const scale=Math.min(1,1280/Math.max(img.width,img.height));
    const c=document.createElement("canvas"); c.width=Math.round(img.width*scale); c.height=Math.round(img.height*scale);
    c.getContext("2d").drawImage(img,0,0,c.width,c.height);
    return await new Promise(r=>c.toBlob(b=>r(b||file),"image/jpeg",0.82));
  }catch{ return file; }
}
const num=v=>{ const n=parseFloat(v); return isNaN(n)?0:n; };

function LogSheet({occasion,existing,email,dateISO,onClose,onSaved,startWithPhoto}){
  const [f,setF]=useState({description:existing?.description||"",kcal:existing?.kcal??"",protein:existing?.protein??"",carbs:existing?.carbs??"",fat:existing?.fat??""});
  const [file,setFile]=useState(null);
  const [preview,setPreview]=useState("");
  const [err,setErr]=useState(""); const [saving,setSaving]=useState(false);
  const fileRef=useRef(null);
  const set=k=>e=>setF(p=>({...p,[k]:e.target.value}));

  useEffect(()=>{ if(startWithPhoto) setTimeout(()=>fileRef.current?.click(),50); },[]);
  useEffect(()=>{ const k=e=>{ if(e.key==="Escape") onClose(); }; window.addEventListener("keydown",k); return ()=>window.removeEventListener("keydown",k); },[onClose]);
  function pick(e){ const fl=e.target.files?.[0]; if(!fl) return; setFile(fl); setPreview(URL.createObjectURL(fl)); }

  async function save(status="logged"){
    if(status==="logged"&&!file&&!existing?.photo_path&&!f.description.trim()&&!num(f.kcal))
      return setErr("Add a photo, or describe what you ate.");
    setSaving(true); setErr("");
    let photo_path=existing?.photo_path||null;
    if(file&&status==="logged"){
      photo_path=`${email.toLowerCase()}/${dateISO}_${occasion.id}.jpg`;
      const blob=await compressImage(file);
      const {error:upErr}=await supabase.storage.from("meal-photos").upload(photo_path,blob,{upsert:true,contentType:"image/jpeg"});
      if(upErr){ setSaving(false); return setErr("The photo didn't upload. Check your connection and try again."); }
    }
    const row=status==="skipped"
      ?{client_email:email,log_date:dateISO,occasion_id:occasion.id,status:"skipped",description:null,kcal:null,protein:null,carbs:null,fat:null,photo_path:existing?.photo_path||null,updated_at:new Date().toISOString()}
      :{client_email:email,log_date:dateISO,occasion_id:occasion.id,status,description:f.description.trim()||null,
        kcal:f.kcal===""?null:num(f.kcal),protein:f.protein===""?null:num(f.protein),carbs:f.carbs===""?null:num(f.carbs),fat:f.fat===""?null:num(f.fat),
        photo_path,updated_at:new Date().toISOString()};
    const {data,error}=await supabase.from("food_logs").upsert(row).select();
    setSaving(false);
    if(error||!data?.length) return setErr("That didn't save. Check your connection and try again.");
    onSaved();
  }
  async function clear(){
    setSaving(true);
    await supabase.from("food_logs").delete().eq("client_email",email).eq("log_date",dateISO).eq("occasion_id",occasion.id);
    if(existing?.photo_path) await supabase.storage.from("meal-photos").remove([existing.photo_path]);
    setSaving(false); onSaved();
  }

  return <div className="dy-sheet-bg" onMouseDown={e=>{ if(e.target===e.currentTarget) onClose(); }}>
    <div className="dy-sheet" role="dialog" aria-modal="true" aria-label={`Log ${occTitle(occasion)}`}>
      <div className="m-row" style={{marginBottom:14}}>
        <div><div className="m-title" style={{fontSize:"1.7rem"}}>{occTitle(occasion)}</div><div style={{color:M.muted,fontSize:"0.88rem"}}>{occasion.time} · {OCC_LABEL[occasion.type]}</div></div>
        <button className="dy-wkbtn" onClick={onClose} aria-label="Close"><Icon name="close" size={18}/></button>
      </div>
      {err&&<div className="m-err" role="alert">{err}</div>}
      {preview&&<img className="dy-prev" src={preview} alt="Your meal"/>}
      <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={pick} style={{display:"none"}}/>
      <button className="dy-act" style={{width:"100%",justifyContent:"center",marginBottom:14}} onClick={()=>fileRef.current?.click()}>
        <Icon name="camera" size={18}/>{preview||existing?.photo_path?"Change photo":"Add a photo"}
      </button>
      <div className="m-fgroup"><label className="m-flabel" htmlFor="lg-desc">What did you eat?</label>
        <input id="lg-desc" className="m-field" value={f.description} onChange={set("description")} placeholder="e.g. Chicken wrap and an apple"/></div>
      <div className="m-flabel" style={{marginBottom:6}}>Track it fully (optional)</div>
      <div className="dy-g4">
        {[["kcal","kcal"],["protein","Protein g"],["carbs","Carbs g"],["fat","Fat g"]].map(([k,l])=><div className="m-fgroup" key={k}>
          <label className="m-flabel" htmlFor={"lg-"+k} style={{fontSize:"0.72rem"}}>{l}</label>
          <input id={"lg-"+k} className="m-field" type="number" inputMode="decimal" value={f[k]} onChange={set(k)}/></div>)}
      </div>
      <div className="m-row" style={{gap:10,marginTop:6}}>
        <button className="m-btn ghost" onClick={()=>save("skipped")} disabled={saving}>I skipped this</button>
        <button className="m-btn" onClick={()=>save("logged")} disabled={saving}>{saving?"Saving…":"Save"}</button>
      </div>
      {existing&&<button className="m-link" style={{display:"block",margin:"14px auto 0",color:M.muted}} onClick={clear} disabled={saving}>Remove this log</button>}
    </div>
  </div>;
}

function MealDay({email,dateISO,occasions,phase,targets,canLog,readOnly}){
  const [logs,setLogs]=useState({});
  const [urls,setUrls]=useState({});
  const [sheet,setSheet]=useState(null);
  const todayISO=localISO(new Date());
  const future=dateISO>todayISO;

  useEffect(()=>{ load(); },[email,dateISO]);
  async function load(){
    setLogs({});
    if(!email) return;
    const {data}=await supabase.from("food_logs").select("*").eq("client_email",email).eq("log_date",dateISO);
    const m={}; (data||[]).forEach(r=>{ m[r.occasion_id]=r; }); setLogs(m);
    const paths=(data||[]).map(r=>r.photo_path).filter(Boolean);
    if(paths.length){
      const {data:signed}=await supabase.storage.from("meal-photos").createSignedUrls(paths,3600);
      const u={}; (signed||[]).forEach(s=>{ if(s.signedUrl) u[s.path]=s.signedUrl; }); setUrls(u);
    }
  }

  const ids=new Set(occasions.map(o=>o.id));
  const counted=Object.values(logs).filter(l=>ids.has(l.occasion_id)&&l.status!=="skipped");
  const tot={kcal:0,protein:0,carbs:0,fat:0}; counted.forEach(l=>{ tot.kcal+=num(l.kcal); tot.protein+=num(l.protein); tot.carbs+=num(l.carbs); tot.fat+=num(l.fat); });
  const photoOnly=counted.filter(l=>!num(l.kcal)).length;
  const loggedCount=Object.values(logs).filter(l=>ids.has(l.occasion_id)).length;

  if(!occasions.length) return <div className="dy-empty">
    {readOnly?"No eating structure set for this day yet. Add one in the Structure tab.":"No eating times set for this day yet."}
  </div>;

  return <div>
    <style>{SBCSS}</style>
    <div className="dy-tot">
      <div className="dy-row"><span style={{fontWeight:700}}>{loggedCount} of {occasions.length} logged</span>{phase&&<span style={{fontSize:"0.78rem",color:M.muted}}>{PHASES[phase]}</span>}</div>
      {targets&&<>
        <div className="dy-totrow"><span>Calories</span><span><b>{Math.round(tot.kcal).toLocaleString()}</b> / {targets.calories.toLocaleString()} kcal</span></div>
        <div className="dy-bar"><div style={{width:`${Math.min(100,tot.kcal/targets.calories*100)}%`}}/></div>
        <div className="dy-totrow"><span>Protein</span><span><b>{Math.round(tot.protein)}</b> / {targets.protein}g</span></div>
        <div className="dy-bar"><div style={{width:`${Math.min(100,tot.protein/targets.protein*100)}%`}}/></div>
      </>}
      {photoOnly>0&&<div style={{fontSize:"0.78rem",color:M.faint,marginTop:8}}>{photoOnly} photo-only {photoOnly===1?"log isn't":"logs aren't"} included in these totals.</div>}
    </div>

    {occasions.map(o=>{
      const l=logs[o.id]; const alloc=o.mode==="allocated";
      return <div className="dy-card" key={o.id}>
        <div className="dy-head">
          <div className="dy-time">{o.time}</div>
          <div style={{minWidth:0}}><div className="dy-title">{occTitle(o)}</div>{o.name&&<div className="dy-type">{OCC_LABEL[o.type]}</div>}</div>
          <span className={`dy-chip ${l?"done":alloc?"alloc":"open"}`}>{l?(l.status==="skipped"?"Skipped":"Logged"):alloc?"From your coach":"Your choice"}</span>
        </div>
        {alloc&&!l&&<div className="dy-body">{readOnly?"Allocated. Meals from your library can be assigned once the meal library is built.":`${COACH.name.split(" ")[0]} is setting this meal. Until it appears, log what you eat here.`}</div>}
        {l&&l.status!=="skipped"&&<div className="dy-log">
          {l.photo_path&&(urls[l.photo_path]?<img className="dy-photo" src={urls[l.photo_path]} alt={l.description||"Meal photo"}/>:<div className="dy-photo"/>)}
          <div style={{minWidth:0}}>
            <div style={{fontSize:"0.95rem"}}>{l.description||(l.photo_path?"Photo logged":"Logged")}</div>
            {(l.kcal!=null||l.protein!=null)&&<div className="dy-macros">{[l.kcal!=null&&`${Math.round(l.kcal)} kcal`,l.protein!=null&&`P ${Math.round(l.protein)}g`,l.carbs!=null&&`C ${Math.round(l.carbs)}g`,l.fat!=null&&`F ${Math.round(l.fat)}g`].filter(Boolean).join(" · ")}</div>}
          </div>
        </div>}
        {!readOnly&&canLog&&!future&&<div className="dy-acts">
          {l?<button className="dy-act" onClick={()=>setSheet({o,photo:false})}><Icon name="edit" size={16}/>Edit</button>
            :<>
              <button className="dy-act primary" onClick={()=>setSheet({o,photo:true})}><Icon name="camera" size={16}/>Add photo</button>
              <button className="dy-act" onClick={()=>setSheet({o,photo:false})}><Icon name="edit" size={16}/>Track it</button>
            </>}
        </div>}
      </div>;
    })}
    {future&&!readOnly&&<div style={{fontSize:"0.82rem",color:M.faint,textAlign:"center",marginTop:6}}>You can log meals on the day.</div>}
    {sheet&&<LogSheet occasion={sheet.o} existing={logs[sheet.o.id]} email={email} dateISO={dateISO} startWithPhoto={sheet.photo}
      onClose={()=>setSheet(null)} onSaved={()=>{ setSheet(null); load(); }}/>}
  </div>;
}

/* Manager: browse a client's diary week by week */
function DiaryBrowser({email,profile,weekPlan}){
  const [offset,setOffset]=useState(0);
  const [versions,setVersions]=useState([]);
  const todayISO=localISO(new Date());
  const [selISO,setSelISO]=useState(todayISO);
  const [plan,setPlan]=useState(weekPlan||DEFAULT_WEEK);
  useEffect(()=>{ (async()=>{
    const [s,w]=await Promise.all([
      supabase.from("eating_structures").select("*").eq("client_email",email),
      supabase.from("week_plans").select("plan").eq("client_email",email).maybeSingle(),
    ]);
    setVersions(s.data||[]); setPlan(w.data?.plan?{...DEFAULT_WEEK,...w.data.plan}:DEFAULT_WEEK);
  })(); },[email]);
  const ref=new Date(); ref.setDate(ref.getDate()+offset*7);
  const dates=weekDates(ref);
  const sel=dates.find(d=>localISO(d)===selISO)||dates[0];
  const {occasions,phase}=occasionsFor(versions,sel);
  const act=ACTIVITIES.find(a=>a.id===(plan[DAYS[(sel.getDay()+6)%7]]||"rest"))||ACTIVITIES[0];
  const targets=profile?.weight?calcTargets(profile,act.mult||1.2):null;
  function move(n){ const r=new Date(); r.setDate(r.getDate()+(offset+n)*7); setOffset(offset+n); setSelISO(localISO(weekDates(r)[0])); }

  return <div className="dy-mgr">
    <style>{SBCSS}</style>
    <div className="fb" style={{marginBottom:"0.75rem"}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"1.4rem",letterSpacing:"0.02em"}}>Week of {dates[0].toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</div>
      <div className="dy-wknav">
        {offset!==0&&<button className="dy-today" onClick={()=>{setOffset(0);setSelISO(todayISO);}}>This week</button>}
        <button className="dy-wkbtn" onClick={()=>move(-1)} aria-label="Previous week"><Icon name="back" size={18}/></button>
        <button className="dy-wkbtn" onClick={()=>move(1)} aria-label="Next week"><Icon name="chevron" size={18}/></button>
      </div>
    </div>
    <div className="sb-days">
      {dates.map((d,i)=>{ const iso=localISO(d); return <button key={iso} className={`sb-day ${iso===localISO(sel)?"on":""}`} onClick={()=>setSelISO(iso)}>{DAYS[i]}<small>{d.getDate()}</small></button>; })}
    </div>
    <div style={{color:B.grey,fontSize:"0.85rem",marginBottom:"0.75rem"}}>{sel.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})} · {act.name}</div>
    <MealDay email={email} dateISO={localISO(sel)} occasions={occasions} phase={phase} targets={targets} readOnly/>
  </div>;
}

function TodayScreen({firstName,profile,weekPlan,routine,email,canWrite,onStreak,goChat,versions}){
  const [offset,setOffset]=useState(0);
  const refDate=new Date(); refDate.setDate(refDate.getDate()+offset*7);
  const dates=weekDates(refDate);
  const todayISO=localISO(new Date());
  const [selISO,setSelISO]=useState(todayISO);
  function moveWeek(n){ const r=new Date(); r.setDate(r.getDate()+(offset+n)*7); setOffset(offset+n); const wk=weekDates(r); setSelISO(offset+n===0?todayISO:localISO(wk[0])); }
  const [done,setDone]=useState([]);
  const [note,setNote]=useState("");

  const selIdx=Math.max(0,dates.findIndex(d=>localISO(d)===selISO));
  const selDay=DAYS[selIdx<0?0:selIdx];
  const act=ACTIVITIES.find(a=>a.id===(weekPlan[selDay]||"rest"))||ACTIVITIES[0];
  const t=profile?.weight ? calcTargets(profile, act.mult||1.2) : null;
  const isFuture=selISO>todayISO;

  const groups=[
    {key:"morning",label:"Morning routine",icon:"sun",items:linesOf(routine?.morning)},
    {key:"am",label:"Morning supplements",icon:"pill",items:linesOf(routine?.am_supps)},
    {key:"water",label:"Hydration",icon:"drop",items:t?[`Drink ${t.hydration} L of water`]:[]},
    {key:"pm",label:"Evening supplements",icon:"pill",items:linesOf(routine?.pm_supps)},
    {key:"evening",label:"Evening routine",icon:"moon",items:linesOf(routine?.evening)},
  ].filter(g=>g.items.length);
  const allKeys=groups.flatMap(g=>g.items.map(i=>`${g.key}:${i}`));
  const hasRoutine=!!(routine&&(routine.morning||routine.evening||routine.am_supps||routine.pm_supps));
  const doneCount=allKeys.filter(k=>done.includes(k)).length;

  useEffect(()=>{ loadDay(); },[selISO,email]);

  async function loadDay(){
    setDone([]); setNote("");
    if(!email) return;
    const {data}=await supabase.from("daily_logs").select("done").eq("client_email",email).eq("log_date",selISO).maybeSingle();
    setDone(Array.isArray(data?.done)?data.done:[]);
  }

  async function toggle(k){
    if(!canWrite||isFuture) return;
    const next=done.includes(k)?done.filter(x=>x!==k):[...done,k];
    setDone(next);
    const complete=allKeys.length>0&&allKeys.every(x=>next.includes(x));
    const {error}=await supabase.from("daily_logs").upsert({client_email:email,log_date:selISO,done:next,complete,updated_at:new Date().toISOString()});
    if(error){ setNote("That tick didn't save. Check your connection and try again."); setDone(done); }
    else { setNote(""); onStreak&&onStreak(); }
  }

  const selDate=dates[selIdx<0?0:selIdx];
  const {occasions:occs,phase}=occasionsFor(versions||[],selDate);
  return <div className="m-today">
    <div className="m-sec m-colA">
      <div className="m-row">
        <div className="m-date">{selISO===todayISO?"Today":selDate.toLocaleDateString("en-GB",{weekday:"long"})}, {selDate.toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</div>
        <div className="dy-wknav">
          {offset!==0&&<button className="dy-today" onClick={()=>{setOffset(0);setSelISO(todayISO);}}>Today</button>}
          <button className="dy-wkbtn" onClick={()=>moveWeek(-1)} aria-label="Previous week"><Icon name="back" size={18}/></button>
          <button className="dy-wkbtn" onClick={()=>moveWeek(1)} aria-label="Next week"><Icon name="chevron" size={18}/></button>
        </div>
      </div>
      <div className="m-week" role="tablist" aria-label="This week">
        {dates.map((d,i)=>{
          const iso=localISO(d); const a=ACTIVITIES.find(x=>x.id===(weekPlan[DAYS[i]]||"rest"))||ACTIVITIES[0];
          const k=intensity(a.mult);
          return <button key={iso} role="tab" aria-selected={iso===selISO} aria-label={`${DAYS[i]}: ${a.name}`}
            className={`m-day ${iso===selISO?"sel":""} ${iso===todayISO?"today":""}`} onClick={()=>setSelISO(iso)}>
            <div className="m-dot" style={{background:`rgba(94,196,49,${0.08+k*0.62})`,color:k>0.55?M.greenInk:M.text}}>
              <Icon name={activityIcon(a.id)} size={18}/>
            </div>
            <div className="m-dlabel">{DAYS[i][0]}</div>
            <div className="m-dnum">{d.getDate()}</div>
          </button>;
        })}
      </div>

      <div className="m-fuel">
        <div className="m-act"><Icon name={activityIcon(act.id)} size={16}/>{act.name}</div>
        {t ? <>
          <div style={{marginTop:10}}><span className="m-kcal">{t.calories.toLocaleString()}</span><span className="m-unit">kcal</span></div>
          <div className="m-macros">
            <div className="m-macro"><b>{t.protein}g</b><span>Protein</span></div>
            <div className="m-macro"><b>{t.carbs}g</b><span>Carbs</span></div>
            <div className="m-macro"><b>{t.fats}g</b><span>Fat</span></div>
            <div className="m-macro"><b>{t.hydration}L</b><span>Water</span></div>
          </div>
        </> : <div style={{color:M.muted,marginTop:10,fontSize:"0.92rem"}}>Your fuel targets appear here once your assessment is complete.</div>}
      </div>
    </div>

    <div className="m-sec m-colB">
      <div className="m-h2">Your meals</div>
      <MealDay email={email} dateISO={selISO} occasions={occs} phase={phase} targets={t} canLog={canWrite}/>
      <div className="m-h2">Your daily Rx</div>
      {!hasRoutine && !t ? null : allKeys.length>0 && <div style={{marginBottom:16}}>
        <div className="m-row" style={{fontSize:"0.85rem",color:M.muted}}><span>{doneCount} of {allKeys.length} done</span>{isFuture&&<span>Ticks open on the day</span>}</div>
        <div className="m-progress"><div style={{width:`${allKeys.length?doneCount/allKeys.length*100:0}%`}}/></div>
      </div>}
      {groups.map(g=><div className="m-group" key={g.key}>
        <div className="m-glabel"><Icon name={g.icon} size={16}/>{g.label}</div>
        {g.items.map(item=>{ const k=`${g.key}:${item}`; const on=done.includes(k);
          return <button key={k} className={`m-item ${on?"done":""}`} onClick={()=>toggle(k)} disabled={!canWrite||isFuture} aria-pressed={on}>
            <span className="m-check">{on&&<Icon name="check" size={14} sw={3}/>}</span>
            <span className="m-itext">{item}</span>
          </button>; })}
      </div>)}
      {!hasRoutine && <div className="m-empty">
        <div style={{color:M.green,display:"flex",justifyContent:"center"}}><Icon name="clipboard" size={48} sw={1.4}/></div>
        <h3>Your routine is on its way</h3>
        <div>{COACH.name.split(" ")[0]} hasn't set your daily routine yet. Expecting one? <button className="m-link" onClick={goChat}>Send a message</button></div>
      </div>}
      <div className="m-note" role="status">{note}</div>
    </div>
  </div>;
}

function ChatScreen({me,myId,otherEmail}){
  const [messages,setMessages]=useState([]);
  const [draft,setDraft]=useState("");
  const [sending,setSending]=useState(false);
  const [err,setErr]=useState("");
  const bottomRef=useRef(null);

  useEffect(()=>{
    if(!me||!otherEmail) return;
    load();
    const ch=supabase.channel("mchat_"+me)
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"messages"},p=>{
        const m=p.new;
        if(m.sender_email===otherEmail&&m.receiver_email===me) setMessages(prev=>[...prev,m]);
      }).subscribe();
    return ()=>supabase.removeChannel(ch);
  },[me,otherEmail]);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth",block:"end"}); },[messages]);

  async function load(){
    const {data}=await supabase.from("messages").select("*")
      .or(`and(sender_email.eq.${me},receiver_email.eq.${otherEmail}),and(sender_email.eq.${otherEmail},receiver_email.eq.${me})`)
      .order("created_at",{ascending:true});
    if(data) setMessages(data);
  }
  async function send(){
    const text=draft.trim(); if(!text) return;
    setSending(true); setErr("");
    const msg={sender_id:myId,sender_email:me,receiver_email:otherEmail,message:text,created_at:new Date().toISOString(),read:false};
    setMessages(p=>[...p,msg]); setDraft("");
    const {error}=await supabase.from("messages").insert(msg);
    if(error){ setErr("Message not sent. Check your connection and try again."); setMessages(p=>p.filter(x=>x!==msg)); setDraft(text); }
    setSending(false);
  }

  return <div className="m-chat">
    <div className="m-head">
      <img className="m-avatar" src={COACH.photo} alt=""/>
      <div><div className="m-hi" style={{fontSize:"1.5rem"}}>{COACH.name}</div><div className="m-tag" style={{fontStyle:"normal"}}>Your nutrition coach</div></div>
    </div>
    <div className="m-msgs">
      {messages.length===0 && <div className="m-empty">
        <div style={{color:M.green,display:"flex",justifyContent:"center"}}><Icon name="chat" size={48} sw={1.4}/></div>
        <h3>Message {COACH.name.split(" ")[0]}</h3>
        <div>Questions about your plan, a tricky day, or a win to share. Send it here.</div>
      </div>}
      {messages.map((m,i)=>{ const mine=m.sender_email===me;
        return <div key={m.id||i} style={{display:"flex",flexDirection:"column"}}>
          <div className={`m-bub ${mine?"mine":"theirs"}`}>{m.message}</div>
          <div className={`m-time ${mine?"mine":""}`}>{fmtTime(m.created_at)}</div>
        </div>; })}
      {err&&<div className="m-note" role="alert" style={{color:M.amber}}>{err}</div>}
      <div ref={bottomRef}/>
    </div>
    <div className="m-compose">
      <input className="m-input" placeholder="Type a message" value={draft} aria-label="Message"
        onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); send(); } }}/>
      <button className="m-send" onClick={send} disabled={sending||!draft.trim()} aria-label="Send"><Icon name="send" size={20}/></button>
    </div>
  </div>;
}

function WeekEditor({profile,weekPlan,setDay,status,onBack}){
  return <div className="m-sec">
    <button className="m-back" onClick={onBack}><Icon name="back" size={18}/>Profile</button>
    <div className="m-title" style={{margin:"14px 0 6px"}}>My week</div>
    <div style={{color:M.muted,fontSize:"0.92rem",marginBottom:14}}>Set what you're doing each day. Your fuel targets update to match.</div>
    {DAYS.map(day=>{ const a=ACTIVITIES.find(x=>x.id===(weekPlan[day]||"rest"))||ACTIVITIES[0];
      const t=profile?.weight?calcTargets(profile,a.mult||1.2):null;
      return <div className="m-wrow" key={day}>
        <div className="m-wday">{day}</div>
        <select className="m-select" value={a.id} onChange={e=>setDay(day,e.target.value)} aria-label={`Activity for ${day}`}>
          {ACTIVITIES.filter(x=>x.id!=="custom").map(x=><option key={x.id} value={x.id}>{x.name}</option>)}
        </select>
        <div className="m-wk">{t?<><b>{t.calories.toLocaleString()}</b>kcal</>:"—"}</div>
      </div>; })}
    <div className="m-note" role="status">{status}</div>
  </div>;
}

function AssessmentSummary({data,userId,onBack,onSaved}){
  const [editing,setEditing]=useState(false);
  const [f,setF]=useState(detailsFrom(data||{}));
  const [err,setErr]=useState(""); const [saving,setSaving]=useState(false); const [note,setNote]=useState("");
  const set=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const lbm=data?.weight&&data?.bodyFatPct?Math.round(data.weight*(1-data.bodyFatPct/100)):null;
  const stats=[["Age",data?.age&&`${data.age}`],["Height",data?.height&&`${data.height}cm`],["Weight",data?.weight&&`${data.weight}kg`],["Body fat",data?.bodyFatPct&&`${data.bodyFatPct}%`],["Lean mass",lbm&&`${lbm}kg`],["Sex",data?.sex]];

  async function save(){
    const problem=checkDetails(f); if(problem) return setErr(problem);
    setSaving(true); setErr("");
    const next=mergeDetails(data,f);
    const {data:rows,error}=await supabase.from("assessments").update({data:next}).eq("user_id",userId).select();
    setSaving(false);
    if(error||!rows?.length) return setErr("Your changes didn't save. Please try again, or message your coach if it keeps happening.");
    onSaved(next); setEditing(false); setNote("Saved. Your targets have been updated."); setTimeout(()=>setNote(""),2500);
  }

  return <div className="m-sec">
    <button className="m-back" onClick={onBack}><Icon name="back" size={18}/>Profile</button>
    <div className="m-row" style={{margin:"14px 0 14px"}}>
      <div className="m-title">My details</div>
      {data&&!editing&&<button className="m-editbtn" onClick={()=>{setF(detailsFrom(data));setEditing(true);}}><Icon name="edit" size={16}/>Edit</button>}
    </div>
    {!data&&<div className="m-empty">No assessment on file yet.</div>}
    {data&&!editing&&<>
      <div className="m-grid3">{stats.map(([l,v])=><div className="m-stat" key={l}><b>{v||"—"}</b><span>{l}</span></div>)}</div>
      {data.goal&&<div className="m-card" style={{marginTop:10,display:"block"}}><div className="m-sub" style={{marginTop:0}}>Goal</div><div className="m-name">{data.goal}</div></div>}
      <div className="m-note" role="status" style={{color:M.green}}>{note}</div>
      <div style={{color:M.muted,fontSize:"0.88rem",marginTop:8}}>Weighed yourself recently or changed your goal? Tap Edit and your targets will update.</div>
    </>}
    {data&&editing&&<div className="m-form">
      {err&&<div className="m-err" role="alert">{err}</div>}
      <DetailsFields f={f} set={set} inputCls="m-field" labelCls="m-flabel" groupCls="m-fgroup" idp="me-"/>
      <div className="m-row" style={{marginTop:6,gap:10}}>
        <button className="m-btn ghost" onClick={()=>{setEditing(false);setErr("");}}>Cancel</button>
        <button className="m-btn" onClick={save} disabled={saving}>{saving?"Saving…":"Save changes"}</button>
      </div>
    </div>}
  </div>;
}

function ProfileScreen({user,firstName,streak,weekDone,openPage}){
  const name=firstName||user?.email?.split("@")[0];
  return <div>
    <div className="m-head" style={{justifyContent:"space-between"}}><div className="m-title">Profile</div></div>
    <div className="m-sec" style={{display:"flex",flexDirection:"column",gap:16}}>
      <div className="m-card">
        <div className="m-ini">{(name?.[0]||"?").toUpperCase()}</div>
        <div style={{minWidth:0}}><div className="m-name">{name}</div><div className="m-sub">{user?.email}</div></div>
      </div>
      <div className="m-card">
        <img className="m-avatar" src={COACH.photo} alt=""/>
        <div><div className="m-sub" style={{marginTop:0}}>Your coach</div><div className="m-name">{COACH.name}</div></div>
      </div>
      <div className="m-tiles">
        <div className="m-tile"><b><span style={{color:M.amber,display:"flex"}}><Icon name="flame" size={26}/></span>{streak}</b><span>Day streak</span></div>
        <div className="m-tile"><b><span style={{color:M.green,display:"flex"}}><Icon name="check" size={26} sw={2.4}/></span>{weekDone}/7</b><span>Days complete this week</span></div>
      </div>
      <div className="m-list">
        <button className="m-li" onClick={()=>openPage("structure")}><span className="m-lic"><Icon name="utensils"/></span><span style={{flex:1}}>My eating week</span><Icon name="chevron" size={18}/></button>
        <button className="m-li" onClick={()=>openPage("week")}><span className="m-lic"><Icon name="calendar"/></span><span style={{flex:1}}>My training week</span><Icon name="chevron" size={18}/></button>
        <button className="m-li" onClick={()=>openPage("assessment")}><span className="m-lic"><Icon name="clipboard"/></span><span style={{flex:1}}>My details</span><Icon name="chevron" size={18}/></button>
        <button className="m-li" onClick={signOut}><span className="m-lic"><Icon name="logout"/></span><span style={{flex:1}}>Sign out</span></button>
      </div>
    </div>
  </div>;
}

function ClientApp({user,assessmentData,embedded=false,onAssessmentChange}){
  const email=user?.email;
  const [tab,setTab]=useState("today");
  const [page,setPage]=useState(null);
  const [weekPlan,setWeekPlan]=useState(DEFAULT_WEEK);
  const [routine,setRoutine]=useState(null);
  const [streak,setStreak]=useState(0);
  const [weekDone,setWeekDone]=useState(0);
  const [weekStatus,setWeekStatus]=useState("");
  const [versions,setVersions]=useState(null);
  const firstName=assessmentData?.firstName||email?.split("@")[0]||"";
  const profile=assessmentData?{weight:parseFloat(assessmentData.weight)||0,height:parseFloat(assessmentData.height)||0,age:parseFloat(assessmentData.age)||0,sex:assessmentData.sex||"male",bodyFatPct:parseFloat(assessmentData.bodyFatPct)||20,goal:assessmentData.goal||""}:null;

  useEffect(()=>{ if(!email) return; loadAll(); },[email]);

  async function loadAll(){
    const [w,r,st]=await Promise.all([
      supabase.from("week_plans").select("plan").eq("client_email",email).maybeSingle(),
      supabase.from("routines").select("*").eq("client_email",email).maybeSingle(),
      supabase.from("eating_structures").select("*").eq("client_email",email),
    ]);
    setVersions(st.data||[]);
    setWeekPlan(w.data?.plan?{...DEFAULT_WEEK,...w.data.plan}:DEFAULT_WEEK);
    setRoutine(r.data||null);
    loadStreak();
  }

  async function loadStreak(){
    const since=new Date(); since.setDate(since.getDate()-90);
    const {data}=await supabase.from("daily_logs").select("log_date").eq("client_email",email).eq("complete",true).gte("log_date",localISO(since));
    const set=new Set((data||[]).map(r=>r.log_date));
    const d=new Date(); if(!set.has(localISO(d))) d.setDate(d.getDate()-1);
    let n=0; while(set.has(localISO(d))){ n++; d.setDate(d.getDate()-1); }
    setStreak(n);
    setWeekDone(weekDates().filter(x=>set.has(localISO(x))).length);
  }

  async function setDay(day,actId){
    const next={...weekPlan,[day]:actId};
    setWeekPlan(next); setWeekStatus("Saving…");
    const {error}=await supabase.from("week_plans").upsert({client_email:email,plan:next,updated_at:new Date().toISOString()});
    setWeekStatus(error?"That change didn't save. Check your connection and try again.":"Saved");
    if(!error) setTimeout(()=>setWeekStatus(""),1500);
  }

  function go(t){ setTab(t); setPage(null); }
  async function reloadStructures(){ const {data}=await supabase.from("eating_structures").select("*").eq("client_email",email); setVersions(data||[]); }

  if(!embedded&&versions&&versions.length===0) return <div className="m-app" style={{paddingBottom:24}}>
    <style>{MCSS}</style><style>{SBCSS}</style>
    <ClientStructureSetup email={email} versions={[]} firstRun onSaved={reloadStructures}/>
  </div>;

  return <div className={`m-app ${embedded?"embedded":""}`}>
    <style>{MCSS}</style>
    <div className={`m-main m-main-${tab}`}>
    {tab==="today"&&<>
      <div className="m-head">
        <img className="m-avatar" src={COACH.photo} alt={COACH.name}/>
        <div><div className="m-hi">Hi {firstName},</div><div className="m-tag">{COACH.tagline}</div></div>
        {streak>0&&<div className="m-streak" style={{marginLeft:"auto"}}><Icon name="flame" size={16}/>{streak}</div>}
      </div>
      <TodayScreen firstName={firstName} profile={profile} weekPlan={weekPlan} routine={routine} email={email} canWrite={!embedded} onStreak={loadStreak} goChat={()=>go("chat")} versions={versions}/>
    </>}
    {tab==="chat"&&<ChatScreen me={email} myId={user?.id} otherEmail={MANAGER_EMAIL}/>}
    {tab==="profile"&&page==="structure"&&<ClientStructureSetup email={email} versions={versions} onBack={()=>setPage(null)} onSaved={()=>{reloadStructures();setPage(null);}}/>}
    {tab==="profile"&&page!=="structure"&&(page==="week"
      ?<WeekEditor profile={profile} weekPlan={weekPlan} setDay={setDay} status={weekStatus} onBack={()=>setPage(null)}/>
      :page==="assessment"
      ?<AssessmentSummary data={assessmentData} userId={user?.id} onBack={()=>setPage(null)} onSaved={d=>onAssessmentChange&&onAssessmentChange(d)}/>
      :<ProfileScreen user={user} firstName={firstName} streak={streak} weekDone={weekDone} openPage={setPage}/>)}
    </div>
    <nav className="m-nav" aria-label="Main">
      <div className="m-brand"><span className="m-brandmark">TS</span><span>Tom Saunders<br/><em>Nutrition</em></span></div>
      {[["today","Today","home"],["chat","Chat","chat"],["profile","Profile","user"]].map(([id,l,ic])=>(
        <button key={id} className={`m-tab ${tab===id?"on":""}`} onClick={()=>go(id)} aria-current={tab===id?"page":undefined}><Icon name={ic} size={22}/>{l}</button>
      ))}
    </nav>
  </div>;
}

/* ─── ROOT APP ────────────────────────────────────────────────────────────── */
export default function App(){
  const {session,loading}=useAuth();
  const [view,setView]=useState("dashboard");
  const [assessmentData,setAssessmentData]=useState(null);
  const [needsAssessment,setNeedsAssessment]=useState(false);
  const [checked,setChecked]=useState(false);
  const isManager=session?.user?.email===MANAGER_EMAIL;

  useEffect(()=>{
    if(session&&!isManager){
      supabase.from("assessments").select("*").eq("user_id",session.user.id).single()
        .then(({data})=>{
          if(data){setAssessmentData(data.data);setNeedsAssessment(false);}
          else{setNeedsAssessment(true);}
          setChecked(true);
        });
    }
  },[session]);

  if(loading) return <><style>{G}</style><div className="loading-wrap"><div className="spinner"/><div style={{color:B.grey,fontSize:"0.85rem"}}>Loading...</div></div></>;
  if(!session) return <><style>{G}</style><LoginPage/></>;

  if(!isManager&&!checked) return <><style>{G}</style><div className="loading-wrap"><div className="spinner"/></div></>;
  if(!isManager&&!needsAssessment) return <><style>{G}</style><ClientApp user={session.user} assessmentData={assessmentData} onAssessmentChange={setAssessmentData}/></>;

  if(!isManager&&needsAssessment) return <div className="onb"><style>{G}</style>
    <div className="onb-top"><TSLogo/><button className="btn btn-ghost btn-sm" onClick={signOut}>Sign out</button></div>
    <div className="onb-body"><Assessment user={session.user} onComplete={(d)=>{setAssessmentData(d);setNeedsAssessment(false);}}/></div>
  </div>;

  const links=[["dashboard","Clients","users"],["preview","Client preview","phone"],["analytics","Analytics","chart"],["settings","Settings","sliders"]];

  return <div className="app2">
    <style>{G}</style>
    <aside className="side2">
      <TSLogo/>
      <div className="s-section">Practice</div>
      {links.map(([v,lb,ic])=>(
        <button key={v} className={`slink ${view===v?"active":""}`} onClick={()=>setView(v)} aria-current={view===v?"page":undefined}>
          <Icon name={ic} size={18}/>{lb}
        </button>
      ))}
      <div className="side2-foot">
        <div className="side2-user"><div className="nav-av">TS</div><span className="side2-email">{session.user.email}</span></div>
        <button className="btn btn-ghost btn-sm" onClick={signOut}>Sign out</button>
      </div>
    </aside>
    <main className="content2">
      {view==="dashboard"&&<>
        <div className="ph">Clients</div>
        <div className="psub">View assessments, set targets, assign routines and message clients</div>
        <ManagerDash managerUser={session.user}/>
      </>}
      {view==="preview"&&<>
        <div className="ph">Client preview</div>
        <div className="psub">This is what clients see on their phone. Ticking is switched off in preview.</div>
        <div style={{maxWidth:420}}><ClientApp user={session.user} assessmentData={null} embedded/></div>
      </>}
      {(view==="analytics"||view==="settings")&&<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"60vh",flexDirection:"column",gap:"0.75rem",color:B.grey,textAlign:"center"}}>
        <div style={{color:B.green}}><Icon name={view==="analytics"?"chart":"sliders"} size={44} sw={1.4}/></div>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"1.8rem",color:B.white,letterSpacing:"0.02em"}}>Coming soon</div>
        <div style={{fontSize:"0.9rem"}}>This section is being built step by step.</div>
      </div>}
    </main>
  </div>;
}