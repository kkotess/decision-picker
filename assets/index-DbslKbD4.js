var L=Object.defineProperty;var S=(s,t,e)=>t in s?L(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var i=(s,t,e)=>S(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();function c({tag:s,className:t,text:e}){const o=document.createElement(s);return o.className=t,o.innerHTML=e||"",o}class f{constructor(t){i(this,"title");this.title=t}render(){return c({tag:"h1",className:"h1",text:this.title})}}class d{static addList(t){localStorage.setItem(this.key,t)}static getList(){return localStorage.getItem(this.key)||""}static setNextId(t){localStorage.setItem(this.nextIdKey,String(t))}static getNextId(){return Number(localStorage.getItem(this.nextIdKey))||0}}i(d,"key","list"),i(d,"nextIdKey","nextId");class w{constructor({text:t,inputmode:e="text",onChange:o}){i(this,"element");this.element=c({tag:"input",className:"input"}),this.element.placeholder=t,this.element.type=e,this.element.addEventListener("input",()=>{o&&o(this.element.value)})}}class p{constructor(t,e){i(this,"element");i(this,"title");this.title=t,this.element=c({tag:"button",className:"button",text:this.title}),e&&this.element.addEventListener("click",e)}}class I{constructor(t,e,o){i(this,"id");i(this,"titleValue","");i(this,"weightValue","");i(this,"titleInput");i(this,"weightInput");i(this,"deleteButton");i(this,"onDataChange");this.id=t,this.onDataChange=o,this.titleInput=new w({text:"Title",onChange:n=>{this.titleValue=n,this.onDataChange()}}),this.weightInput=new w({text:"Weight",inputmode:"number",onChange:n=>{this.weightValue=n,o()}}),this.deleteButton=new p("Delete").element,this.deleteButton.addEventListener("click",e)}setInitialValues(t,e){this.titleValue=t,this.weightValue=e,this.titleInput.element.value=t,this.weightInput.element.value=e}toJSON(){return{id:this.id,title:this.titleValue,weight:this.weightValue}}render(){const t=c({tag:"li",className:"li",text:`#${this.id}`});t.append(this.titleInput.element),t.append(this.weightInput.element);const e=this.deleteButton;return t.append(e),t}}class O{constructor(){i(this,"options",[]);i(this,"listElement");i(this,"nextId");this.listElement=c({tag:"ul",className:"ul"}),this.nextId=0,this.loadOptions()}loadOptions(){const t=d.getList(),e=d.getNextId();t?JSON.parse(t).forEach(n=>{const r=new I(n.id,()=>this.deleteOption(n.id),()=>this.updateStorage());r.setInitialValues(n.title,n.weight),this.options.push(r)}):this.addOption(),this.nextId=e||(this.options.length?Math.max(...this.options.map(o=>o.id)):0),this.render()}updateStorage(){d.addList(JSON.stringify(this.options))}addOption(){this.nextId=this.options.length>0?this.nextId+1:1;const t=this.nextId;d.setNextId(t);const e=new I(t,()=>this.deleteOption(t),()=>this.updateStorage());this.options.push(e),this.render(),this.updateStorage()}deleteOption(t){const e=this.options.filter(o=>o.id!=t);this.options=e,this.render(),this.updateStorage()}clearList(){this.options=[],this.nextId=0,d.addList(""),d.setNextId(this.nextId),this.render(),this.updateStorage()}render(){const t=this.listElement;return t.innerHTML="",this.options.map(e=>{t.append(e.render())}),t}}class N{constructor(t){i(this,"button");i(this,"list");i(this,"element");this.button=new p("Add Option"),this.list=t,this.element=this.button.element}render(){return this.element.addEventListener("click",()=>{this.list.addOption()}),this.element}}class y{constructor(t){i(this,"button");i(this,"list");i(this,"element");this.button=new p("Clear list"),this.list=t,this.element=this.button.element}render(){return this.element.addEventListener("click",()=>{this.list.clearList()}),this.element}}class E{constructor(t){i(this,"button");i(this,"element");i(this,"onStart");this.onStart=t,this.button=new p("Start"),this.element=this.button.element,this.element.addEventListener("click",()=>{this.onStart()})}render(){return this.element}}class k{constructor(t){i(this,"container");i(this,"list");i(this,"onStart");this.onStart=t,this.container=c({tag:"div",className:"options-page"}),this.list=new O,this.container.append(this.list.render());const e=new N(this.list).render();this.container.append(e);const o=new y(this.list).render();this.container.append(o);const n=new E(this.onStart).render();this.container.append(n)}getElement(){return this.container}}class B{constructor(t){i(this,"canvas");i(this,"ctx");i(this,"options");this.options=t,this.canvas=document.createElement("canvas"),this.canvas.width=400,this.canvas.height=400,this.ctx=this.canvas.getContext("2d"),this.drawWheel()}getElement(){return this.canvas}drawWheel(){if(!this.ctx||this.options.length===0)return;const t=200,e=200,o=180,n=100,r=this.options.reduce((u,h)=>u+h.weight,0);let a=0;this.options.forEach(u=>{if(!this.ctx)return;const h=u.weight/r*2*Math.PI;this.ctx.beginPath(),this.ctx.moveTo(t,e),this.ctx.arc(t,e,o,a,a+h),this.ctx.closePath(),this.ctx.fillStyle=u.color,this.ctx.fill(),this.ctx.strokeStyle="#000",this.ctx.lineWidth=2,this.ctx.stroke();const m=2*n*Math.sin(h/2);if(m<30){a+=h;return}this.ctx.font="14px Arial",this.ctx.textAlign="center",this.ctx.textBaseline="middle";const g=u.title;let l=g;if(this.ctx.measureText(g).width>m)for(;l.length>0&&this.ctx.measureText(l).width>m;)l=l.slice(0,-1);if(l.length===0){a+=h;return}l!==g&&(l=l+"...");const x=a+h/2,v=t+n*Math.cos(x),b=e+n*Math.sin(x);this.ctx.save(),this.ctx.translate(v,b),this.ctx.rotate(x),this.ctx.lineWidth=2,this.ctx.strokeStyle="#fff",this.ctx.strokeText(l,0,0),this.ctx.fillStyle="#000",this.ctx.fillText(l,0,0),this.ctx.restore(),a+=h})}}function M(){return`hsl(${Math.random()*360}, 100%, 70%)`}function T(s){return s.sort(()=>Math.random()-.5)}class V{constructor(t){i(this,"button");i(this,"element");i(this,"onBack");this.onBack=t,this.button=new p("Back"),this.element=this.button.element,this.element.addEventListener("click",()=>{this.onBack()})}render(){return this.element}}class A{constructor(t){i(this,"container");i(this,"onBack");i(this,"options",[]);this.onBack=t,this.container=c({tag:"div",className:"decision_picker"}),this.render(),this.loadOptions()}render(){const t=c({tag:"canvas",className:"wheel-canvas"});t.setAttribute("width","400"),t.setAttribute("height","400");const e=c({tag:"div",className:"decision_panel"}),o=new V(this.onBack).render();e.append(o),this.container.append(e)}getElement(){return this.container}loadOptions(){const e=new O().options.filter(n=>n.titleValue.trim()!==""&&Number(n.weightValue)>0).map(n=>({title:n.titleValue,weight:Number(n.weightValue),color:M()}));if(e.length<2)return;this.options=T(e);const o=new B(this.options).getElement();this.container.append(o)}}document.addEventListener("DOMContentLoaded",()=>{const s=document.createElement("div");s.id="app",document.body.appendChild(s);function t(){window.location.hash="#main",s.innerHTML="";const o=new f("Decision Making Tool").render();s.append(o);const n=new k(()=>{e()});s.append(n.getElement())}function e(){window.location.hash="#decision-picker",s.innerHTML="";const o=new f("Decision Making Tool").render();s.append(o);const n=new A(()=>{t()});s.append(n.getElement())}t()});
