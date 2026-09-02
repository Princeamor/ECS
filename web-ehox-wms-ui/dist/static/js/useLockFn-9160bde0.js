import{r as a}from"./@vue-7624cf1b.js";function n(n){const o=a(!1);return{isLock:o,lockFn:async(...a)=>{if(!o.value){o.value=!0;try{await n(...a)}finally{o.value=!1}}}}}export{n as u};
