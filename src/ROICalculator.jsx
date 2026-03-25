import { useState, useEffect, useRef, useCallback } from "react";

const LOGO_B64 = "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";

const WPM=4.33, HPY=2080;
function fmt$(v){if(v>=1000000)return`$${(v/1000000).toFixed(1)}M`;if(v>=10000)return`$${(v/1000).toFixed(0)}k`;return new Intl.NumberFormat("en-NZ",{style:"currency",currency:"NZD",maximumFractionDigits:0}).format(v);}
function fmtSal(v){return`$${(v/1000).toFixed(0)}k`;}
function fmtH(v){return v<10?v.toFixed(1):v.toFixed(0);}
function s2n(p){return p<=0?1:p>=100?5000:Math.round(Math.exp((p/100)*Math.log(5000)));}
function n2s(s){return s<=1?0:s>=5000?100:(Math.log(s)/Math.log(5000))*100;}

/* ── Animated number ── */
function ANum({value, format, duration=600}) {
  const [display, setDisplay] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prevRef = useRef(value);
  const rafRef = useRef(null);

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = value;
    if (prev === value) return;
    if (!hasAnimated) { setHasAnimated(true); }
    const start = performance.now();
    const from = prev;
    const to = value;
    const animate = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(from + (to - from) * ease);
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value, duration]);

  return <>{format ? format(display) : Math.round(display)}</>;
}

/* ── Use case examples ── */
const USE_CASES = [
  { icon: "✉️", label: "Comms & templates", detail: "1-2 hrs/week back on emails, tone variants, reusable templates", risk: "Fewer tone mistakes, less escalation" },
  { icon: "📄", label: "Docs → structured outputs", detail: "1-4 hrs saved per document - contracts, schedules, manuals into tables or slides", risk: "Catches buried obligations" },
  { icon: "👁️", label: "Second set of eyes", detail: "30-60 min per spec check, tender review, or revision comparison", risk: "Catches omissions before costly rework" },
  { icon: "📊", label: "Ops & finance workflows", detail: "2-4 hrs/week on budgeting, forecasting, and reporting", risk: "Fewer spreadsheet errors, better assumptions" },
  { icon: "📋", label: "Meeting synthesis", detail: "Multi-hour wins consolidating docs into exec-ready updates", risk: "Consistent messaging, nothing missed" },
];

/* ── Rollout logic ── */
function getRollout(staff, leaders) {
  const CM=15, tp=staff+leaders;
  const lc=leaders>0?Math.ceil(leaders/CM):0;
  if(tp<=15){
    if(tp<=CM&&leaders>0) return{approach:"Single combined cohort",note:`Your whole team of ${tp} fits in one facilitated cohort, with online licences for ongoing learning.`,
      items:[{icon:"👥",label:`1 facilitated cohort`,detail:`${tp} people together`},{icon:"💻",label:`${tp} online licences`,detail:"Self-paced micro lessons and support"}],
      timeline:[{phase:"Wks 1-12",label:"Facilitated training"},{phase:"Ongoing",label:"Online platform"}]};
    return{approach:"Small team rollout",note:"Leaders train first to model the behaviours, then staff follow.",
      items:[...(lc>0?[{icon:"🎯",label:`${lc} leadership cohort`,detail:`${leaders} leaders`}]:[]),{icon:"👥",label:"1 team cohort",detail:`${staff} staff`},{icon:"💻",label:`${tp} online licences`,detail:"Ongoing learning"}],
      timeline:[{phase:"Wks 1-12",label:"Leaders"},{phase:"Wks 4-16",label:"Staff cohort"},{phase:"Ongoing",label:"Online"}]};
  }
  if(staff<=60){const tc=Math.ceil(staff/CM);
    return{approach:"Full facilitated rollout",note:`Run the leadership cohort${lc>1?"s":""} first, then ${tc} team cohort${tc>1?"s":""}.`,
      items:[...(lc>0?[{icon:"🎯",label:`${lc} leadership cohort${lc>1?"s":""}`,detail:`${leaders} leaders`}]:[]),{icon:"👥",label:`${tc} team cohort${tc>1?"s":""}`,detail:`${staff} staff (up to ${CM} per cohort)`},{icon:"💻",label:`${tp} online licences`,detail:"Between and after sessions"}],
      timeline:[{phase:"Wks 1-12",label:"Leaders"},{phase:"Wks 4-24",label:`${tc} staff cohort${tc>1?"s":""}`},{phase:"Ongoing",label:"Online"}]};}
  if(staff<=250){const cc=Math.min(Math.ceil(staff*0.2),45),cco=Math.ceil(cc/CM);
    return{approach:"Champions + online",note:`Train leaders, then ~${cc} champions to seed AI habits. Online licences for everyone.`,
      items:[...(lc>0?[{icon:"🎯",label:`${lc} leadership cohort${lc>1?"s":""}`,detail:`${leaders} leaders`}]:[]),{icon:"⭐",label:`${cco} champion cohort${cco>1?"s":""}`,detail:`~${cc} early adopters`},{icon:"💻",label:`${staff} online licences`,detail:"Organisation-wide baseline"},{icon:"📈",label:"Phased rollout",detail:"Champions seed habits across teams"}],
      timeline:[{phase:"Wks 1-12",label:"Leaders"},{phase:"Wks 4-16",label:"Champions"},{phase:"Wk 8+",label:"Online rollout"}]};}
  const cc=Math.min(Math.ceil(staff*0.1),60),cco=Math.ceil(cc/CM),ph=Math.ceil(staff/500);
  return{approach:"Enterprise phased rollout",note:`Start with leaders and champions, then roll out online in ~${ph} waves.`,
    items:[...(lc>0?[{icon:"🎯",label:`${lc} leadership cohort${lc>1?"s":""}`,detail:`${leaders} leaders`}]:[]),{icon:"⭐",label:`${cco} champion cohort${cco>1?"s":""}`,detail:`~${cc} early adopters`},{icon:"💻",label:`${staff.toLocaleString()} online licences`,detail:`~${ph} phases`},{icon:"🔄",label:"Ongoing support",detail:"Weekly calls + community"}],
    timeline:[{phase:"Wks 1-12",label:"Leaders"},{phase:"Wks 4-16",label:"Champions"},{phase:`${ph} waves`,label:"Online rollout"}]};
}

/* ── Shared components ── */
function Sl({label,value,onChange,min,max,step,format,suffix,desc,lBadge,rBadge,helper}){
  const pct=((value-min)/(max-min))*100;
  return(<div style={{marginBottom:14}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:3}}>
      <label style={{fontSize:12,fontWeight:500,color:"#3D4A2F"}}>{label}</label>
      <span style={{fontSize:18,fontWeight:700,color:"#3D6B2E"}}>{format?format(value):value}{suffix||""}</span>
    </div>
    {desc&&<p style={{fontSize:10,color:"#7A8569",margin:"0 0 5px",lineHeight:1.35}}>{desc}</p>}
    <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}
      style={{width:"100%",height:4,borderRadius:2,appearance:"none",background:`linear-gradient(to right,#6B9B37 0%,#6B9B37 ${pct}%,#DDE4D0 ${pct}%,#DDE4D0 100%)`,outline:"none",cursor:"pointer"}}/>
    {(lBadge||rBadge)&&<div style={{display:"flex",justifyContent:"space-between",marginTop:2}}><span style={{fontSize:9,color:"#9AA387"}}>{lBadge}</span><span style={{fontSize:9,color:"#9AA387"}}>{rBadge}</span></div>}
    {helper&&<p style={{fontSize:9,color:"#A8AD96",margin:"3px 0 0",lineHeight:1.35,fontStyle:"italic"}}>{helper}</p>}
  </div>);
}
function NlSl({label,value,onChange}){
  const pos=n2s(value);
  return(<div style={{marginBottom:14}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:3}}>
      <label style={{fontSize:12,fontWeight:500,color:"#3D4A2F"}}>{label}</label>
      <span style={{fontSize:18,fontWeight:700,color:"#3D6B2E"}}>{value.toLocaleString()}</span>
    </div>
    <input type="range" min={0} max={100} step={0.5} value={pos} onChange={e=>onChange(s2n(Number(e.target.value)))}
      style={{width:"100%",height:4,borderRadius:2,appearance:"none",background:`linear-gradient(to right,#6B9B37 0%,#6B9B37 ${pos}%,#DDE4D0 ${pos}%,#DDE4D0 100%)`,outline:"none",cursor:"pointer"}}/>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}><span style={{fontSize:9,color:"#9AA387"}}>1</span><span style={{fontSize:9,color:"#9AA387"}}>5,000</span></div>
  </div>);
}
function Acc({title,icon,children,open:init}){
  const [open,setOpen]=useState(init||false);
  const [hov,setHov]=useState(false);
  return(<div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    style={{background:open?"#F6F8F1":"#FAFAF6",borderRadius:10,border:`1px solid ${open?"#C4D4A8":hov?"#B8C9A0":"#E4E1D6"}`,padding:open?"12px 14px":"10px 14px",marginBottom:8,cursor:"pointer",transition:"all 0.2s"}}>
    <div onClick={()=>setOpen(!open)} style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div style={{display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:13}}>{icon}</span><span style={{fontSize:12,fontWeight:600,color:"#3D4A2F"}}>{title}</span></div>
      <span style={{fontSize:10,color:"#9AA387",transform:open?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s",userSelect:"none",display:"inline-block",animation:!open&&hov?"accBounce 0.6s ease infinite":"none"}}>▼</span>
    </div>
    <div style={{maxHeight:open?800:0,opacity:open?1:0,overflow:"hidden",transition:"max-height 0.35s ease, opacity 0.25s ease",marginTop:open?10:0}}>
      <div onClick={e=>e.stopPropagation()}>{children}</div>
    </div>
  </div>);
}

/* ── Timeline component ── */
function Timeline({steps}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:0,margin:"10px 0 4px",position:"relative"}}>
      <div style={{position:"absolute",top:"50%",left:12,right:12,height:2,background:"#D4DFC4",transform:"translateY(-50%)",zIndex:0}}/>
      {steps.map((s,i)=>(
        <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative",zIndex:1}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:i===steps.length-1?"#6B9B37":"#3D6B2E",border:"2px solid #fff",boxShadow:"0 0 0 1px #D4DFC4",marginBottom:4}}/>
          <span style={{fontSize:10,fontWeight:600,color:"#3D6B2E",textAlign:"center",lineHeight:1.2}}>{s.phase}</span>
          <span style={{fontSize:9,color:"#7A8569",textAlign:"center",lineHeight:1.2}}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Canvas export ── */
function exportImage(data) {
  const {tMoH,tMo$,tPpl,tYr$,tYrH,staff,sSal,leaders,lSal,hpw,rollout,costWaiting} = data;
  const W=1200, H=1700;
  const c=document.createElement("canvas"); c.width=W; c.height=H;
  const ctx=c.getContext("2d"); const P=60;
  const rr=(x,y,w,h,r,fill)=>{ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();ctx.fillStyle=fill;ctx.fill();};
  const txt=(t,x,y,{size=14,weight="400",color="#2C3E1F",align="left",maxW}={})=>{ctx.fillStyle=color;ctx.font=`${weight} ${size}px sans-serif`;ctx.textAlign=align;ctx.textBaseline="top";if(maxW)ctx.fillText(t,x,y,maxW);else ctx.fillText(t,x,y);};

  ctx.fillStyle="#FFFFFF"; ctx.fillRect(0,0,W,H);
  let y=P;
  const logoImg=new Image();
  logoImg.onload=()=>{
    ctx.save();ctx.beginPath();ctx.arc(P+24,y+24,24,0,Math.PI*2);ctx.closePath();ctx.clip();ctx.drawImage(logoImg,P,y,48,48);ctx.restore();
    txt("Avocado AI",P+62,y+8,{size:22,weight:"700",color:"#3D6B2E"});
    txt("Time and value estimate",P+62,y+34,{size:13,weight:"500",color:"#6B9B37"});
    y+=68;
    txt(new Date().toLocaleDateString("en-NZ",{day:"numeric",month:"long",year:"numeric"}),P,y,{size:12,color:"#9AA387"}); y+=32;

    txt("ESTIMATED MONTHLY SAVINGS",P,y,{size:11,weight:"700",color:"#5A6B47"}); y+=24;
    const cW=(W-P*2-20)/2;
    rr(P,y,cW,100,12,"#3D6B2E"); rr(P+cW+20,y,cW,100,12,"#3D6B2E");
    txt("HOURS SAVED / MONTH",P+20,y+14,{size:9,weight:"700",color:"#B8D4A0"});
    txt(fmtH(tMoH),P+20,y+32,{size:34,weight:"700",color:"#FFFFFF"});
    txt(`${fmtH(tMoH/tPpl)} hrs per person`,P+20,y+72,{size:11,color:"#9BC27A"});
    txt("VALUE OF TIME SAVED / MONTH",P+cW+40,y+14,{size:9,weight:"700",color:"#B8D4A0"});
    txt(fmt$(tMo$),P+cW+40,y+32,{size:34,weight:"700",color:"#FFFFFF"});
    txt(`${fmt$(tMo$/tPpl)} per person`,P+cW+40,y+72,{size:11,color:"#9BC27A"});
    y+=120;

    rr(P,y,W-P*2,72,12,"#EDF2E4");
    txt("Projected annual savings",P+20,y+12,{size:11,weight:"500",color:"#5A6B47"});
    txt(fmt$(tYr$),P+20,y+30,{size:28,weight:"700",color:"#3D6B2E"});
    txt("Annual hours reclaimed",W-P-20,y+12,{size:11,weight:"500",color:"#5A6B47",align:"right"});
    txt(`${fmtH(tYrH)} hrs`,W-P-20,y+30,{size:28,weight:"700",color:"#3D6B2E",align:"right"});
    y+=90;

    // Cost of waiting
    txt(`Every month without AI training costs your team ~${fmt$(costWaiting)} in unrealised productivity.`,P,y,{size:12,weight:"500",color:"#8B6B3E",maxW:W-P*2}); y+=30;

    // Testimonial
    rr(P,y,W-P*2,60,10,"#F9F7F3");
    txt(`"One of my favourite training sessions of all time... really hits the mark."`,P+16,y+12,{size:12,weight:"500",color:"#5A5040",maxW:W-P*2-32});
    txt("— Jonathan White, General Manager",P+16,y+38,{size:10,color:"#9A9080"});
    y+=80;

    txt("YOUR INPUTS",P,y,{size:11,weight:"700",color:"#5A6B47"}); y+=20;
    rr(P,y,W-P*2,44,10,"#F7F7F2");
    txt(`Staff: ${staff.toLocaleString()} at ${fmtSal(sSal)}  ·  Leaders: ${leaders} at ${fmtSal(lSal)}  ·  Hours saved: ${hpw} hrs/person/week`,P+16,y+14,{size:12,color:"#5A6B47",maxW:W-P*2-32});
    y+=64;

    txt("SUGGESTED ROLLOUT",P,y,{size:11,weight:"700",color:"#5A6B47"}); y+=20;
    txt(rollout.approach,P,y,{size:14,weight:"700",color:"#2C3E1F"}); y+=20;
    txt(rollout.note,P,y,{size:11,color:"#7A8569",maxW:W-P*2}); y+=30;
    rollout.items.forEach(item=>{
      rr(P,y,W-P*2,36,8,"#F6F8F1");
      txt(`${item.icon}  ${item.label}`,P+14,y+6,{size:12,weight:"600",color:"#3D4A2F"});
      txt(item.detail,P+14,y+22,{size:10,color:"#7A8569",maxW:W-P*2-28});
      y+=42;
    });
    y+=10;
    txt("This is illustrative - we'll discuss what works best for your team.",P,y,{size:10,color:"#A8AD96"}); y+=28;

    txt("Estimates reflect efficiency gains in writing, research, analysis, and admin - not job replacement.",P,y,{size:10,color:"#9AA387",maxW:W-P*2}); y+=18;
    txt("Learn more: avocadoai.org",P,y,{size:10,weight:"500",color:"#6B9B37"});

    c.toBlob(blob=>{const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="avocado-ai-value-estimate.png";a.click();URL.revokeObjectURL(url);},"image/png");
  };
  logoImg.src=`data:image/png;base64,${LOGO_B64}`;
}

/* ── Main ── */
export default function ROICalculator(){
  const [staff,setStaff]=useState(5);
  const [sSal,setSSal]=useState(60000);
  const [leaders,setLeaders]=useState(5);
  const [lSal,setLSal]=useState(120000);
  const [hpw,setHpw]=useState(5);
  const [exporting,setExporting]=useState(false);

  const sHr=sSal/HPY,lHr=lSal/HPY;
  const sMoH=staff*hpw*WPM,lMoH=leaders*hpw*WPM;
  const tMoH=sMoH+lMoH;
  const tMo$=(sMoH*sHr)+(lMoH*lHr);
  const tPpl=staff+leaders;
  const tYr$=tMo$*12,tYrH=tMoH*12;
  const rollout=getRollout(staff,leaders);
  const costWaiting=tMo$;

  const handleExport=()=>{setExporting(true);setTimeout(()=>{exportImage({tMoH,tMo$,tPpl,tYr$,tYrH,staff,sSal,leaders,lSal,hpw,rollout,costWaiting});setTimeout(()=>setExporting(false),800);},100);};

  return(
    <div style={{maxWidth:480,margin:"0 auto",fontFamily:"'DM Sans',sans-serif",padding:"20px 16px 28px"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap" rel="stylesheet"/>
      <style>{`
        input[type="range"]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:#3D6B2E;border:2.5px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.18);cursor:pointer}
        input[type="range"]::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#3D6B2E;border:2.5px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.18);cursor:pointer}
        @keyframes accBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}
        @media(max-width:440px){.rr{flex-direction:column!important}}
      `}</style>

      <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:16}}>
        <img src={`data:image/png;base64,${LOGO_B64}`} alt="Avocado AI" style={{width:32,height:32}}/>
        <div>
          <p style={{margin:0,fontSize:10,fontWeight:600,color:"#6B9B37",textTransform:"uppercase",letterSpacing:".04em"}}>Time and value estimate</p>
          <h1 style={{margin:0,fontSize:15,fontWeight:700,color:"#2C3E1F",lineHeight:1.25}}>How much time and value could Avocado save you?</h1>
        </div>
      </div>

      <Acc title="Staff" icon="👥" open={true}>
        <NlSl label="Number of staff" value={staff} onChange={setStaff}/>
        <Sl label="Average staff salary" value={sSal} onChange={setSSal} min={30000} max={150000} step={5000} format={fmtSal} desc="Annual, before tax (NZD)"/>
      </Acc>
      <Acc title="Leaders" icon="🎯" open={true}>
        <Sl label="Number of leaders" value={leaders} onChange={setLeaders} min={0} max={50} step={1}/>
        <Sl label="Average leader salary" value={lSal} onChange={setLSal} min={60000} max={300000} step={5000} format={fmtSal} desc="Annual, before tax (NZD)"/>
      </Acc>
      <Acc title="Time saved per person" icon="⏱" open={true}>
        <div style={{background:"#EDF2E4",borderRadius:6,padding:"6px 10px",marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:11}}>🥑</span>
          <span style={{fontSize:10,color:"#3D6B2E",fontWeight:500,lineHeight:1.35}}>Avocado AI learners report saving 1 - 5 hours a week after just the first few lessons.</span>
        </div>
        <Sl label="Hours saved per person, per week" value={hpw} onChange={setHpw} min={1} max={20} step={0.5} suffix=" hrs"
          lBadge="← Less words-and-screens work" rBadge="More words-and-screens work →"
          helper="Think about emails, documents, summaries, and follow-up."/>
        {/* Use case examples */}
        <div style={{marginTop:6}}>
          <p style={{fontSize:10,fontWeight:600,color:"#5A6B47",margin:"0 0 6px"}}>Where our clients see time back:</p>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {USE_CASES.map((uc,i)=>(
              <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"5px 8px",background:"#FAFAF6",borderRadius:6,border:"1px solid #EEEDEA"}}>
                <span style={{fontSize:12,lineHeight:1,flexShrink:0,marginTop:1}}>{uc.icon}</span>
                <div>
                  <span style={{fontSize:10,fontWeight:600,color:"#3D4A2F"}}>{uc.label}</span>
                  <span style={{fontSize:10,color:"#7A8569"}}> — {uc.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Acc>

      {/* Results */}
      <div style={{marginTop:4,marginBottom:6}}>
        <div className="rr" style={{display:"flex",gap:8,marginBottom:8}}>
          <div style={{background:"#3D6B2E",borderRadius:8,padding:"12px",flex:1,minWidth:120}}>
            <p style={{margin:"0 0 1px",fontSize:9,fontWeight:600,color:"#B8D4A0",textTransform:"uppercase",letterSpacing:".04em"}}>Hours saved / month</p>
            <p style={{margin:"0 0 1px",fontSize:22,fontWeight:700,color:"#fff",lineHeight:1.1}}><ANum value={tMoH} format={fmtH}/></p>
            <p style={{margin:0,fontSize:10,color:"#9BC27A"}}>{fmtH(tMoH/tPpl)} hrs per person</p>
          </div>
          <div style={{background:"#3D6B2E",borderRadius:8,padding:"12px",flex:1,minWidth:120}}>
            <p style={{margin:"0 0 1px",fontSize:9,fontWeight:600,color:"#B8D4A0",textTransform:"uppercase",letterSpacing:".04em"}}>Value of time saved / month</p>
            <p style={{margin:"0 0 1px",fontSize:22,fontWeight:700,color:"#fff",lineHeight:1.1}}><ANum value={tMo$} format={fmt$}/></p>
            <p style={{margin:0,fontSize:10,color:"#9BC27A"}}>{fmt$(tMo$/tPpl)} per person</p>
          </div>
        </div>
        <div style={{background:"#EDF2E4",borderRadius:8,padding:"12px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6,border:"1px solid #D4DFC4"}}>
          <div>
            <p style={{margin:0,fontSize:10,color:"#5A6B47",fontWeight:500}}>Projected annual savings</p>
            <p style={{margin:0,fontSize:22,fontWeight:700,color:"#3D6B2E"}}><ANum value={tYr$} format={fmt$}/></p>
          </div>
          <div style={{textAlign:"right"}}>
            <p style={{margin:0,fontSize:10,color:"#5A6B47",fontWeight:500}}>Annual hours reclaimed</p>
            <p style={{margin:0,fontSize:22,fontWeight:700,color:"#3D6B2E"}}><ANum value={tYrH} format={fmtH}/> hrs</p>
          </div>
        </div>

        {/* Cost of waiting */}
        <div style={{background:"#FBF7F0",border:"1px solid #E8DFD0",borderRadius:8,padding:"10px 12px",marginTop:8,display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:14,flexShrink:0}}>⏳</span>
          <p style={{margin:0,fontSize:11,color:"#8B6B3E",lineHeight:1.4}}>
            Every month without AI training costs your team <strong style={{color:"#6B4D20"}}>~{fmt$(costWaiting)}</strong> in unrealised productivity.
          </p>
        </div>

        <p style={{margin:"6px 0 0",fontSize:9,color:"#9AA387",lineHeight:1.35}}>Estimates reflect efficiency gains in writing, research, analysis, and admin - not job replacement.</p>
      </div>

      {/* Testimonial */}
      <div style={{background:"#FAFAF6",borderRadius:10,padding:"12px 14px",marginBottom:8,borderLeft:"3px solid #6B9B37"}}>
        <p style={{margin:"0 0 6px",fontSize:12,color:"#4A4A3A",lineHeight:1.5,fontStyle:"italic"}}>
          "This has been one of my favourite training sessions of all time. Avocado provide expert training that really hits the mark and is up to date. Would thoroughly recommend."
        </p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
          <p style={{margin:0,fontSize:10,color:"#7A8569",fontWeight:500}}>— Jonathan White, General Manager</p>
          <a href="https://share.google/SdokYKqoQexzCuwDA" target="_blank" rel="noopener noreferrer" style={{fontSize:9,color:"#6B9B37",textDecoration:"none",fontWeight:500}}>⭐ 5-star Google review →</a>
        </div>
      </div>

      {/* Rollout */}
      <Acc title={`Suggested rollout: ${rollout.approach}`} icon="🗺️">
        <p style={{fontSize:11,color:"#5A6B47",lineHeight:1.45,margin:"0 0 8px"}}>{rollout.note}</p>
        <Timeline steps={rollout.timeline}/>
        <div style={{display:"flex",flexDirection:"column",gap:5,marginTop:10}}>
          {rollout.items.map((item,i)=>(
            <div key={i} style={{background:"#fff",borderRadius:8,padding:"8px 10px",border:"1px solid #E4E1D6",display:"flex",gap:8,alignItems:"flex-start"}}>
              <span style={{fontSize:14,lineHeight:1,flexShrink:0,marginTop:1}}>{item.icon}</span>
              <div><p style={{margin:0,fontSize:11,fontWeight:600,color:"#3D4A2F",lineHeight:1.3}}>{item.label}</p><p style={{margin:"1px 0 0",fontSize:10,color:"#7A8569",lineHeight:1.35}}>{item.detail}</p></div>
            </div>
          ))}
        </div>
        <p style={{margin:"8px 0 0",fontSize:9,color:"#A8AD96",fontStyle:"italic",lineHeight:1.35}}>This is illustrative - we'll discuss what works best for your team.</p>
      </Acc>

      {/* Intangibles */}
      <Acc title="Beyond the numbers" icon="∞">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          {[{t:"Job satisfaction",d:"Less time on tedious tasks, more on meaningful work."},
            {t:"Loyalty to employer",d:"Investing in skills signals you value your people's growth."},
            {t:"Problem-solving",d:"AI-confident teams tackle bigger challenges faster."},
            {t:"Reduced risk",d:"Fewer costly mistakes, less reputational damage, and lower risk of data exposure or lost trust."},
            {t:"Future-readiness",d:"A shared language and culture of innovation across your team."}
          ].map((b,i)=>(
            <div key={i} style={{background:"#fff",borderRadius:6,padding:"8px 10px",border:"1px solid #E4E1D6",gridColumn:i===4?"1 / -1":undefined}}>
              <p style={{margin:"0 0 2px",fontSize:11,fontWeight:600,color:"#3D4A2F"}}>{b.t}</p>
              <p style={{margin:0,fontSize:10,color:"#7A8569",lineHeight:1.35}}>{b.d}</p>
            </div>
          ))}
        </div>
      </Acc>

      {/* CTAs */}
      <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
        <button onClick={handleExport} disabled={exporting}
          style={{flex:"1 1 140px",background:"#fff",color:"#3D6B2E",border:"1.5px solid #3D6B2E",borderRadius:8,padding:"9px 12px",fontSize:12,fontWeight:600,cursor:exporting?"wait":"pointer",fontFamily:"'DM Sans',sans-serif",opacity:exporting?0.6:1}}>
          {exporting?"⏳ Generating...":"📄 Share your value estimate"}
        </button>
        <a href="https://avocadoai.notion.site/1c2318e890a080eca5a0fd4669fcb3fa?pvs=105" target="_blank" rel="noopener noreferrer"
          style={{flex:"1 1 100px",display:"flex",alignItems:"center",justifyContent:"center",background:"#3D6B2E",color:"#fff",borderRadius:8,padding:"9px 12px",fontSize:12,fontWeight:600,textDecoration:"none",fontFamily:"'DM Sans',sans-serif"}}>
          Get in touch
        </a>
        <a href="https://avocadoai.learnworlds.com/program/avocado-ai-business-subscription" target="_blank" rel="noopener noreferrer"
          style={{flex:"1 1 100px",display:"flex",alignItems:"center",justifyContent:"center",background:"transparent",color:"#3D6B2E",border:"1px solid #C4D4A8",borderRadius:8,padding:"9px 12px",fontSize:12,fontWeight:500,textDecoration:"none",fontFamily:"'DM Sans',sans-serif"}}>
          Try the course
        </a>
      </div>
    </div>
  );
}