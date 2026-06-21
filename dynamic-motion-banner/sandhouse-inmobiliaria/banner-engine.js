// Stable banner engine adapter — immersphere v0.3
(function(){
  var cfg=window.BANNER_CONFIG||{};
  function apply(){
    var n=document.querySelector("[data-b-name]"),cl=document.querySelector("[data-b-claim]"),
        lo=document.querySelector("[data-b-logo]"),he=document.querySelector("[data-b-hero]"),
        ct=document.querySelector("[data-b-cta]");
    if(n)n.textContent=cfg.clientName||"";
    if(cl)cl.textContent=cfg.claim||"";
    if(lo&&cfg.logoUrl){lo.src=cfg.logoUrl;lo.style.display="";}
    if(he&&cfg.heroImage){he.src=cfg.heroImage;he.style.display="";}
    if(ct&&cfg.waHref)ct.href=cfg.waHref;
  }
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",apply):apply();
})();
