(function(){
  var key='ecs-appearance-controls';
  var defaults={background:'#070b14',text:'#ffffff',highlight:'#27a8ff'};
  function load(){try{return Object.assign({},defaults,JSON.parse(localStorage.getItem(key)||'{}'))}catch(e){return defaults}}
  function apply(colors){
    var root=document.documentElement;
    root.style.setProperty('--ecs-user-background',colors.background);
    root.style.setProperty('--ecs-user-text',colors.text);
    root.style.setProperty('--ecs-user-highlight',colors.highlight);
  }
  function save(colors){localStorage.setItem(key,JSON.stringify(colors));apply(colors)}
  function removeHoverText(root){
    if(!root||!root.querySelectorAll)return;
    if(root.matches&&root.matches('[title]'))root.removeAttribute('title');
    root.querySelectorAll('[title]').forEach(function(node){node.removeAttribute('title')});
  }
  function addControls(root){
    if(!root||root.querySelector('.ecs-appearance-controls'))return;
    var drawer=root.matches&&root.matches('.drawer-container')?root:root.querySelector('.drawer-container');
    if(!drawer)return;
    var colors=load(), panel=document.createElement('section');
    panel.className='ecs-appearance-controls';
    panel.innerHTML='<h3>Interface appearance</h3><label>Background color <input type="color" data-color="background"></label><label>Text color <input type="color" data-color="text"></label><label>Highlight color <input type="color" data-color="highlight"></label>';
    panel.querySelectorAll('input').forEach(function(input){
      input.value=colors[input.dataset.color];
      input.addEventListener('input',function(){colors[input.dataset.color]=input.value;save(colors)});
    });
    drawer.insertBefore(panel,drawer.firstChild);
  }
  apply(load());
  function refresh(root){removeHoverText(root);addControls(root)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){refresh(document)});else refresh(document);
  new MutationObserver(function(records){records.forEach(function(record){for(var i=0;i<record.addedNodes.length;i++){var node=record.addedNodes[i];if(node.nodeType===1)refresh(node)}})}).observe(document.documentElement,{childList:true,subtree:true});
})();
