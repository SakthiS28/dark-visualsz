const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

$("#year").textContent = new Date().getFullYear();

// Hero background automatically changes every 5 seconds.
const bgSlides = $$(".hero-bg-image");
const moodLabel = $("#moodLabel");
let slideIndex = 0;
setInterval(() => {
  bgSlides[slideIndex].classList.remove("active");
  slideIndex = (slideIndex + 1) % bgSlides.length;
  bgSlides[slideIndex].classList.add("active");
  moodLabel.textContent = bgSlides[slideIndex].dataset.label;
}, 5000);

// Header state.
const header = $(".site-header");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 40), {passive:true});

// Scroll progress.
const progress = $(".scroll-progress");
function updateProgress(){
  const total = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${total ? scrollY / total * 100 : 0}%`;
}
addEventListener("scroll", updateProgress, {passive:true});
updateProgress();

// Reveal animations.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
$$(".reveal").forEach(el => observer.observe(el));

// Pointer: deliberately simple, just a small pointer dot + ring.
const dot = $(".pointer-dot"), ring = $(".pointer-ring");
let x = innerWidth/2, y = innerHeight/2, rx=x, ry=y;
addEventListener("pointermove", e => {
  x=e.clientX; y=e.clientY;
  dot.style.left=x+"px"; dot.style.top=y+"px";
});
function moveRing(){
  rx += (x-rx)*.18; ry += (y-ry)*.18;
  ring.style.left=rx+"px"; ring.style.top=ry+"px";
  requestAnimationFrame(moveRing);
}
moveRing();

$$("a,button,.project-card").forEach(el=>{
  el.addEventListener("mouseenter",()=>ring.classList.add("active"));
  el.addEventListener("mouseleave",()=>ring.classList.remove("active"));
});

// Subtle magnetic motion only on CTA buttons.
$$(".magnetic").forEach(btn=>{
  btn.addEventListener("pointermove",e=>{
    if(matchMedia("(max-width: 991px)").matches) return;
    const r=btn.getBoundingClientRect();
    const dx=(e.clientX-(r.left+r.width/2))*.10;
    const dy=(e.clientY-(r.top+r.height/2))*.10;
    btn.style.transform=`translate(${dx}px,${dy}px)`;
  });
  btn.addEventListener("pointerleave",()=>btn.style.transform="");
});

// Close Bootstrap mobile navigation after selecting a section.
$$("#mainNav a").forEach(a=>a.addEventListener("click",()=>{
  const nav=$("#mainNav");
  if(nav.classList.contains("show")){
    bootstrap.Collapse.getOrCreateInstance(nav).hide();
  }
}));





document.addEventListener("DOMContentLoaded", function () {

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.15
    }
  );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });

});









