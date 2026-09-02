(function(){
  var colors={green:'#39ff88',blue:'#27a8ff',pink:'#ff4fd8',red:'#ff3d5a'};
  function paint(root){
    if(!root||!root.querySelectorAll)return;
    root.querySelectorAll('.x6-graph-grid path,.x6-graph-grid line').forEach(function(el){el.style.stroke=colors.green;el.style.filter='drop-shadow(0 0 2px '+colors.green+')'});
    root.querySelectorAll('.x6-node text,.x6-edge text').forEach(function(el){var label=(el.textContent||'').trim();el.style.fill=label==='P'?colors.blue:'#fff';if(label==='P')el.style.filter='drop-shadow(0 0 4px '+colors.blue+')'});
    root.querySelectorAll('.x6-node rect,.x6-node path,.x6-node circle,.x6-node polygon').forEach(function(el){var fill=(el.getAttribute('fill')||'').toLowerCase();if(/(f|e)[0-9a-f]{2}(7|8|9|a|b|c|d|e|f)[0-9a-f]/.test(fill)){el.style.fill=colors.pink;el.style.stroke=colors.pink;el.style.filter='drop-shadow(0 0 4px '+colors.pink+')'}if(/(f|e)[0-9a-f]{2}(0|1|2|3|4|5|6)[0-9a-f]/.test(fill)){el.style.fill=colors.red;el.style.stroke=colors.red;el.style.filter='drop-shadow(0 0 4px '+colors.red+')'}})
  }
  function run(){paint(document)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  new MutationObserver(function(records){records.forEach(function(r){for(var i=0;i<r.addedNodes.length;i++)paint(r.addedNodes[i])})}).observe(document.documentElement,{childList:true,subtree:true});
})();
