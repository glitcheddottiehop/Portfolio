import{r as t,c as i,h as s,F as e,g as h}from"./p-bbd3fc13.js";import{A as n}from"./p-9d5c03f4.js";import{R as o}from"./p-47d66f75.js";class r{constructor(t=!1,i=!1){this.dragging=t,this.moving=i}}class a{constructor(t=0,i=0,s=0,e=0){this.left=t,this.top=i,this.x=s,this.y=e}}class l{constructor(t=null){this.position=new a,this.state=new r,this.element=null,this.initialCursorStyle="",this.dragTimeout=null,this.mouseDownHandler=t=>{t.composedPath().includes(this.element)&&(this.startDrag(),this.position={left:this.element.scrollLeft,top:this.element.scrollTop,x:t.clientX,y:t.clientY},document.addEventListener("mousemove",this.mouseMoveHandler),document.addEventListener("mouseup",this.mouseUpHandler))},this.mouseMoveHandler=t=>{const i=t.clientX-this.position.x,s=t.clientY-this.position.y;0===i&&0===s||(this.state.moving=!0),this.element.scrollTop=this.position.top-s,this.element.scrollLeft=this.position.left-i},this.mouseUpHandler=()=>{document.removeEventListener("mousemove",this.mouseMoveHandler),document.removeEventListener("mouseup",this.mouseUpHandler),this.element.style.cursor=this.initialCursorStyle,this.stopDrag()},null!==t&&this.init(t)}get dragging(){return this.state.dragging&&this.state.moving}init(t){this.element=t,this.initialCursorStyle=t.style.cursor||"",this.element.addEventListener("mousedown",this.mouseDownHandler)}destroy(){this.element.removeEventListener("mouseDown",this.mouseDownHandler)}startDrag(){this.stopDrag(),this.dragTimeout=setTimeout((()=>{this.state.dragging=!0}),l.DRAG_STATE_DELAY)}stopDrag(){null!==this.dragTimeout&&(clearTimeout(this.dragTimeout),this.dragTimeout=null),(this.state.dragging||this.state.moving)&&setTimeout((()=>{this.state.dragging=!1,this.state.moving=!1}),1)}}l.DRAG_STATE_DELAY=200;const c=class{constructor(s){t(this,s),this.changeEvent=i(this,"changed",7),this.beforeChangeEvent=i(this,"beforeChange",7),this.actions=["goTo"],this.subscribedEvents=[],this.actionKeyPrefix=o.RWC_ACTION_PREFIX,this.textAnimationCoroutine=null,this.dragMove=null,this.rwcKey=this.actionKeyPrefix+"-"+o.getLastComponentId(),this.animationSpeed=300,this.mode="underline",this.animateTransition=!0,this.defaultTab=0,this.textColorDefault="#000000",this.textColorActive="",this.activeTab=0,this.resizeHandler=()=>{this.tabs[this.activeTab].scrollIntoView({behavior:"smooth",inline:"center"})}}onTextColorActiveChange(t){this.setActiveColor(t)}onModeChange(){this.setActiveColor(this.textColorActive)}get currentIndicatorOffset(){var t;return Number.parseFloat((null===(t=this.indicator)||void 0===t?void 0:t.style.left)||getComputedStyle(this.indicator).left)}componentWillLoad(){this.activeTab=this.defaultTab,this.setActiveColor("")}componentDidLoad(){this.init()}disconnectedCallback(){this.dragMove.destroy(),window.removeEventListener("resize",this.resizeHandler),this.removeEventListeners()}init(){this.tabs=this.tabContainer.assignedElements(),this.initDefaultTab(),this.initTabClickEvents(),window.addEventListener("resize",this.resizeHandler),this.dragMove=new l(this.root),this.initGoToEventListeners()}initDefaultTab(){this.animateTransition&&(this.indicator.style.width=this.tabs[this.activeTab].getBoundingClientRect().width+"px",this.indicator.style.left=this.tabs[this.activeTab].offsetLeft+"px",this.tabs[this.activeTab].style.setProperty("--_end","100%")),this.tabs[this.activeTab].classList.add("active")}initTabClickEvents(){this.tabs.forEach(((t,i)=>{t.addEventListener("click",(()=>{this.dragMove.dragging||this.goTo(i)}))}))}async goTo(t){let i=null;t instanceof CustomEvent&&(i=t.target,t=Number.parseInt(t.detail.next)),this.activeTab!==t&&(this.beforeChangeEvent.emit({originalTarget:null!=i?i:null,next:t,previous:this.activeTab}),this.tabs.forEach((t=>{t.classList.remove(c.ACTIVE_TAB_CLASS)})),this.tabs[t].scrollIntoView({behavior:"smooth",inline:"center"}),this.animateTransition?(this.animateText(),await this.animateIndicator(t)&&(this.setActiveTab(t),this.cancelTextAnimation())):this.setActiveTab(t))}setActiveTab(t){this.tabs[t].classList.add(c.ACTIVE_TAB_CLASS),this.changeEvent.emit({originalTarget:this.element,next:t,previous:this.activeTab}),this.activeTab=t}async animateIndicator(t){const i=this.tabs[this.activeTab].offsetLeft,s=this.tabs[t].offsetLeft,e=this.currentIndicatorOffset,h=this.tabs[this.activeTab].getBoundingClientRect().width,n=this.tabs[t].getBoundingClientRect().width;return this.indicator.animation.start({keyframes:[{"--_progress":i,left:e+"px",width:h+"px"},{"--_progress":s,left:s+"px",width:n+"px"}],options:{duration:this.animationSpeed,fill:"forwards"},progressProperty:"--_progress"})}animateText(){this.cancelTextAnimation(),setInterval((()=>{const t=this.indicator.offsetLeft+this.indicator.offsetWidth;this.tabs.forEach((i=>{const s=Math.max((this.indicator.offsetLeft-i.offsetLeft)/i.offsetWidth,0),e=Math.min((t-i.offsetLeft)/i.offsetWidth,1);i.style.setProperty("--_start",100*s+"%"),i.style.setProperty("--_end",100*e+"%")}))}),c.TEXT_ANIMATION_INTERVAL)}cancelTextAnimation(){clearInterval(this.textAnimationCoroutine)}setActiveColor(t){this.activeColor=t||"buttons"===this.mode?"#ffffff":"#00aaaa"}initGoToEventListeners(){o.bindRWCActions(this,this.actions,this.actionKeyPrefix,this.rwcKey,"beforeChange")}removeEventListeners(){o.removeEventListeners(this)}get renderDynamicStyles(){return s(e,null,s("style",null,`\n                    ::slotted(*) {\n                        background: linear-gradient(90deg, ${this.textColorDefault} var(--_start, 0), ${this.activeColor} var(--_start, 0), ${this.activeColor} var(--_end, 0), ${this.textColorDefault} var(--_end, 0));\n                        background-clip: text;\n                        -webkit-background-clip: text;\n                        color: transparent;\n                    }\n                `))}get renderIndicator(){return this.animateTransition?s(e,null,s("div",{class:"indicator",ref:t=>this.indicator=n.castToAnimatedElement(t)})):""}render(){return s("div",{class:{container:!0,buttons:"buttons"===this.mode,animate:this.animateTransition},ref:t=>this.root=t},this.renderDynamicStyles,s("div",{class:"tab-container"},s("slot",{ref:t=>this.tabContainer=t})),this.renderIndicator)}get element(){return h(this)}static get watchers(){return{textColorActive:["onTextColorActiveChange"],mode:["onModeChange"]}}};c.ACTIVE_TAB_CLASS="active",c.TEXT_ANIMATION_INTERVAL=50,c.style=":host{--tab-spacing:var(--rwc-spacing--sm);--indicator-color:var(--rwc-color-accent);position:relative}.container{overflow-x:scroll;position:relative;scrollbar-width:none;-ms-overflow-style:none;}.container::-webkit-scrollbar{display:none}.tab-container{display:flex;flex-direction:row;gap:var(--tab-spacing);width:fit-content;position:relative;user-select:none}.indicator{bottom:0;left:0;background-color:var(--indicator-color);border-radius:2px;height:2px;position:absolute}::slotted(*){cursor:pointer;white-space:nowrap}.buttons.animate .indicator{border-radius:100vh;bottom:unset;top:0;height:100%;z-index:-1}.buttons.animate ::slotted(*){border-radius:100vh}";export{c as rwc_tabs}