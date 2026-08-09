const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")})},{threshold:.1});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));

function flip(card){card.classList.toggle("flipped")}

const nav=document.querySelectorAll(".bottom-nav a");
const ids=["home","about","lab","projects","contact"];
window.addEventListener("scroll",()=>{
 let cur="home";
 ids.forEach(id=>{const s=document.getElementById(id);if(s && scrollY>=s.offsetTop-220)cur=id});
 nav.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+cur));
},{passive:true});

function contactMe(e){
 e.preventDefault();
 const n=document.getElementById("cname").value.trim();
 const em=document.getElementById("cemail").value.trim();
 const company=document.getElementById("ccompany").value.trim();
 const msg=document.getElementById("cmsg").value.trim();
 const subject=encodeURIComponent("Portfolio Inquiry - "+(company||n));
 const body=encodeURIComponent("Name: "+n+"\nEmail: "+em+"\nCompany: "+(company||"Not provided")+"\n\nMessage:\n"+msg);
 const status=document.getElementById("formStatus");
 status.textContent="Opening your email app…";
 status.className="form-status show";
 window.location.href="mailto:vishupandit0880@gmail.com?subject="+subject+"&body="+body;
 setTimeout(()=>{status.textContent="Your email app should now be open. If it didn't open, email vishupandit0880@gmail.com directly.";},1200);
}

document.querySelectorAll(".flip-card").forEach(card=>{
  card.setAttribute("tabindex","0");
  card.addEventListener("keydown",e=>{
    if(e.key==="Enter"||e.key===" "){e.preventDefault();card.classList.toggle("flipped")}
  });
});
