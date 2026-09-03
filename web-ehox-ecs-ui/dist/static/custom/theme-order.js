(function(){
  var themeUrls=['/static/custom/dark-neon.css','/static/custom/modern.css','/static/custom/login-black.css'];
  function moveThemesLast(){
    var head=document.head;
    themeUrls.forEach(function(url){
      var link=[].slice.call(document.querySelectorAll('link[rel="stylesheet"]')).find(function(node){return node.href.endsWith(url)});
      if(link) head.appendChild(link);
    });
  }
  function addFallbackGrid(root){
    if(!root||!root.querySelectorAll)return;
    root.querySelectorAll('.map-dialog .graphBox .ref,.ops-map-graph .graphBox .ref').forEach(function(node){
      if(!node.querySelector('.x6-graph-grid')) node.classList.add('neon-grid-fallback');
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){moveThemesLast();addFallbackGrid(document)});else{moveThemesLast();addFallbackGrid(document)}
  new MutationObserver(function(records){records.forEach(function(record){for(var i=0;i<record.addedNodes.length;i++)addFallbackGrid(record.addedNodes[i])})}).observe(document.documentElement,{childList:true,subtree:true});
})();
