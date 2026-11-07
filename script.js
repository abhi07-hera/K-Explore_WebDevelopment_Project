const events=[
{id:1,title:"Neon Horizon 26",category:"tech",date:"18 APR 2026",time:"10:00 AM",venue:"Bengaluru // India",image:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",desc:"A high-voltage technology summit exploring AI, robotics, spatial computing, quantum systems and the architecture of tomorrow.",featured:true},
{id:2,title:"Cyber//Verse",category:"tech",date:"02 MAY 2026",time:"6:00 PM",venue:"New Delhi // India",image:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=85",desc:"A night of cybersecurity, digital identity, ethical hacking and next-generation infrastructure."},
{id:3,title:"Afterlight",category:"creative",date:"16 MAY 2026",time:"7:30 PM",venue:"Mumbai // India",image:"https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85",desc:"An experimental creative lab merging visual art, projection, sound design and generative media."},
{id:4,title:"Founders Protocol",category:"business",date:"29 MAY 2026",time:"9:00 AM",venue:"Hyderabad // India",image:"https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",desc:"A founder-focused summit for builders working on ambitious products, platforms and deep technology."},
{id:5,title:"SYNTH//NIGHT",category:"music",date:"12 JUN 2026",time:"8:00 PM",venue:"Goa // India",image:"https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85",desc:"Electronic sound, laser architecture and a crowd built around one shared frequency."},
{id:6,title:"Future Systems",category:"tech",date:"27 JUN 2026",time:"11:00 AM",venue:"Pune // India",image:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85",desc:"Engineers and creators decode the systems shaping autonomous, connected and intelligent cities."}
];

const grid=document.getElementById("eventGrid"), featured=document.getElementById("featuredEvent");
let activeFilter="all";

function renderFeatured(){
 const e=events.find(x=>x.featured)||events[0];
 featured.innerHTML=`<div class="featured-image" style="background-image:url('${e.image}')"></div>
 <div class="featured-content"><span class="tag">◈ FEATURED TRANSMISSION</span><h3>${e.title}</h3><p>${e.desc}</p>
 <div class="meta"><span>◷ ${e.date}</span><span>⌖ ${e.venue}</span><span>◉ ${e.category.toUpperCase()}</span></div>
 <div><button class="btn primary" onclick="openEvent(${e.id})">VIEW EVENT <b>↗</b></button></div></div>`;
}
function renderEvents(){
 const q=document.getElementById("searchInput").value.toLowerCase();
 const list=events.filter(e=>(activeFilter==="all"||e.category===activeFilter)&&(`${e.title} ${e.category} ${e.venue} ${e.desc}`.toLowerCase().includes(q)));
 grid.innerHTML=list.filter(e=>!e.featured).map(e=>card(e)).join("")||`<div style="grid-column:1/-1;padding:50px;text-align:center;color:#71858d">NO SIGNALS FOUND.</div>`;
}
function card(e){return `<article class="event-card reveal visible" onclick="openEvent(${e.id})"><div class="card-image" style="background-image:url('${e.image}')"></div><div class="card-body"><span class="tag">${e.category.toUpperCase()} // 0${e.id}</span><h3>${e.title}</h3><p>${e.desc}</p><div class="card-footer"><span>${e.date}</span><b>ACCESS ↗</b></div></div></article>`}

function openEvent(id){
 const e=events.find(x=>x.id===id);
 document.getElementById("eventModalContent").innerHTML=`<div class="modal-image" style="background-image:url('${e.image}')"></div><div class="modal-content"><span class="tag">${e.category.toUpperCase()} // EVENT ${String(e.id).padStart(2,"0")}</span><h2>${e.title}</h2><div class="meta"><span>◷ ${e.date}</span><span>⌖ ${e.venue}</span><span>◉ ${e.time}</span></div><p>${e.desc}</p><br><button class="btn primary" onclick="openRegister(${e.id});closeModal('eventModal')">REGISTER NOW <b>↗</b></button></div>`;
 document.getElementById("eventModal").classList.add("show");
}
function openRegister(id=1){
 const select=document.getElementById("eventSelect");
 select.innerHTML=events.map(e=>`<option value="${e.id}" ${e.id===id?"selected":""}>${e.title} — ${e.date}</option>`).join("");
 document.getElementById("selectedEventText").textContent=`Request access for ${events.find(e=>e.id===id)?.title||"your selected event"}.`;
 document.getElementById("registerModal").classList.add("show");
}
function closeModal(id){document.getElementById(id).classList.remove("show")}
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("show")}));

document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
 activeFilter=btn.dataset.filter;renderEvents();
}));
document.getElementById("searchInput").addEventListener("input",renderEvents);

document.getElementById("registerForm").addEventListener("submit",e=>{
 e.preventDefault();
 const name=document.getElementById("name").value.trim(),email=document.getElementById("email").value.trim(),phone=document.getElementById("phone").value.trim(),eventId=+document.getElementById("eventSelect").value;
 const msg=document.getElementById("formMessage");
 if(name.length<2){msg.textContent="Enter a valid full name.";return}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){msg.textContent="Enter a valid email address.";return}
 if(!/^\d{10}$/.test(phone)){msg.textContent="Phone number must contain exactly 10 digits.";return}
 const reg={name,email,phone,event:events.find(x=>x.id===eventId).title,time:new Date().toISOString()};
 const saved=JSON.parse(localStorage.getItem("nexusRegistrations")||"[]");saved.push(reg);localStorage.setItem("nexusRegistrations",JSON.stringify(saved));
 document.getElementById("registerForm").reset();closeModal("registerModal");
 document.getElementById("toastText").textContent=`${reg.event} registration saved for ${name}.`;
 document.getElementById("toast").classList.add("show");setTimeout(()=>document.getElementById("toast").classList.remove("show"),4500);
});

document.getElementById("eventSelect").addEventListener("change",e=>{document.getElementById("selectedEventText").textContent=`Request access for ${events.find(x=>x.id==e.target.value).title}.`});
document.getElementById("themeBtn").onclick=()=>document.body.classList.toggle("light");
document.getElementById("menuBtn").onclick=()=>document.getElementById("mainNav").classList.toggle("open");
document.querySelectorAll("#mainNav a").forEach(a=>a.onclick=()=>document.getElementById("mainNav").classList.remove("open"));
document.getElementById("randomBtn").onclick=()=>openEvent(events[Math.floor(Math.random()*events.length)].id);

document.querySelectorAll("[data-event]").forEach(b=>b.onclick=()=>openRegister(+b.dataset.event));

const target=new Date("2026-04-18T10:00:00+05:30");
function countdown(){let diff=target-Date.now();if(diff<0)diff=0;document.getElementById("days").textContent=String(Math.floor(diff/86400000)).padStart(2,"0");diff%=86400000;document.getElementById("hours").textContent=String(Math.floor(diff/3600000)).padStart(2,"0");diff%=3600000;document.getElementById("mins").textContent=String(Math.floor(diff/60000)).padStart(2,"0");diff%=60000;document.getElementById("secs").textContent=String(Math.floor(diff/1000)).padStart(2,"0")}
setInterval(countdown,1000);countdown();

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));

const cursor=document.getElementById("cursorGlow");
window.addEventListener("pointermove",e=>{cursor.style.transform=`translate(${e.clientX-150}px,${e.clientY-150}px)`});
renderFeatured();renderEvents();
