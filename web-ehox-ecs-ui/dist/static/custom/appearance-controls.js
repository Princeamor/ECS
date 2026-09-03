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
  function forceLayoutLabels(root){
    if(!root||!root.querySelectorAll)return;
    var labels=[];
    if(root.matches&&root.matches('.drawer-container .drawer-item > span,.drawer-container .drawer-title,.setting-drawer-content .setting-drawer-title'))labels.push(root);
    labels=labels.concat([].slice.call(root.querySelectorAll('.drawer-container .drawer-item > span,.drawer-container .drawer-title,.setting-drawer-content .setting-drawer-title')));
    labels.forEach(function(label){
      label.style.setProperty('color','#ffffff','important');
      label.style.setProperty('opacity','1','important');
      label.style.setProperty('font-size','17px','important');
      label.style.setProperty('font-weight','700','important');
      label.style.setProperty('text-shadow','0 1px 2px #000','important');
    });
  }
  function addControls(root){
    if(!root||root.querySelector('.ecs-appearance-controls'))return;
    var drawer=root.matches&&root.matches('.drawer-container')?root:root.querySelector('.drawer-container');
    if(!drawer)return;
    var colors=load(), panel=document.createElement('section');
    panel.className='ecs-appearance-controls';
    panel.innerHTML='<h3>Interface appearance</h3><label>Background color <button type="button" class="ecs-color-trigger" data-color="background"></button></label><label>Text color <button type="button" class="ecs-color-trigger" data-color="text"></button></label><label>Highlight color <button type="button" class="ecs-color-trigger" data-color="highlight"></button></label>';
    panel.querySelectorAll('.ecs-color-trigger').forEach(function(trigger){
      var color=trigger.dataset.color;
      trigger.style.backgroundColor=colors[color];
      trigger.setAttribute('aria-label','Choose '+color+' color');
      trigger.addEventListener('click',function(){
        var existing=panel.querySelector('.ecs-color-popover');
        if(existing){existing.remove();return}
        var popover=document.createElement('div');
        popover.className='ecs-color-popover';
        popover.innerHTML='<label>Hex color <input type="text" value="'+colors[color]+'" maxlength="7"></label><div class="ecs-color-swatches"></div>';
        ['#070b14','#0d1422','#ffffff','#e8f0ff','#27a8ff','#39ff88','#ff4fd8','#ff3d5a'].forEach(function(value){
          var swatch=document.createElement('button');
          swatch.type='button';swatch.style.backgroundColor=value;swatch.setAttribute('aria-label',value);
          swatch.addEventListener('click',function(){setColor(value)});popover.querySelector('.ecs-color-swatches').appendChild(swatch);
        });
        function setColor(value){
          if(!/^#[0-9a-fA-F]{6}$/.test(value))return;
          colors[color]=value;trigger.style.backgroundColor=value;popover.querySelector('input').value=value;save(colors);
        }
        popover.querySelector('input').addEventListener('change',function(){setColor(this.value)});
        trigger.parentNode.appendChild(popover);
      });
    });
    drawer.insertBefore(panel,drawer.firstChild);
  }
  apply(load());
  function refresh(root){removeHoverText(root);forceLayoutLabels(root);addControls(root)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){refresh(document)});else refresh(document);
  new MutationObserver(function(records){records.forEach(function(record){for(var i=0;i<record.addedNodes.length;i++){var node=record.addedNodes[i];if(node.nodeType===1)refresh(node)}})}).observe(document.documentElement,{childList:true,subtree:true});
})();
