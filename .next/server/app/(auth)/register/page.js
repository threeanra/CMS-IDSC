(()=>{var e={};e.id=566,e.ids=[566],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},21946:(e,s,r)=>{"use strict";r.r(s),r.d(s,{GlobalError:()=>l.a,__next_app__:()=>h,originalPathname:()=>m,pages:()=>c,routeModule:()=>u,tree:()=>o}),r(15483),r(35866),r(32029);var t=r(23191),a=r(88716),i=r(37922),l=r.n(i),n=r(95231),d={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);r.d(s,d);let o=["",{children:["(auth)",{children:["register",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,15483)),"E:\\Adis\\Development\\_KANTOR\\CMS ID Smart Care\\cms-idsc\\src\\app\\(auth)\\register\\page.tsx"]}]},{}]},{"not-found":[()=>Promise.resolve().then(r.t.bind(r,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,32029)),"E:\\Adis\\Development\\_KANTOR\\CMS ID Smart Care\\cms-idsc\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["E:\\Adis\\Development\\_KANTOR\\CMS ID Smart Care\\cms-idsc\\src\\app\\(auth)\\register\\page.tsx"],m="/(auth)/register/page",h={require:r,loadChunk:()=>Promise.resolve()},u=new t.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/(auth)/register/page",pathname:"/register",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},8635:(e,s,r)=>{Promise.resolve().then(r.t.bind(r,12994,23)),Promise.resolve().then(r.t.bind(r,96114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,79671,23)),Promise.resolve().then(r.t.bind(r,41868,23)),Promise.resolve().then(r.t.bind(r,84759,23))},8764:(e,s,r)=>{Promise.resolve().then(r.bind(r,54232))},35303:()=>{},54232:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>f});var t=r(10326),a=r(77109);function i({children:e}){return t.jsx(a.SessionProvider,{children:e})}r(26442),r(23824);var l=r(43188),n=r(35047),d=r(17577),o=r(91272),c=r(46226);let m={src:"/_next/static/media/logo.c25f4b22.png",height:736,width:3143,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAQAAADPnVVmAAAAK0lEQVR42gXAQQoAEQAAQA/Z9kjiokg+5ubrQ0F2bjFFVfEF3fbfZWiG9ABQZxNHhppqAQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:2};var h=r(43440),u=r(90434);let x=[{href:"/document",icon:h.gMD,label:"Document"}];function p(){let[e,s]=(0,d.useState)({}),r=e=>{s(s=>({...s,[e]:!s[e]}))},i=(0,n.usePathname)();return t.jsx("div",{className:"bg-primary",children:(0,t.jsxs)("div",{className:"drawer lg:drawer-open shadow h-full z-20",children:[t.jsx("input",{id:"my-drawer-2",type:"checkbox",className:"drawer-toggle"}),(0,t.jsxs)("div",{className:"drawer-side",children:[t.jsx("label",{htmlFor:"my-drawer-2","aria-label":"close sidebar",className:"drawer-overlay"}),(0,t.jsxs)("div",{className:"flex flex-col justify-between h-full w-80 p-4 bg-primary rounded-lg",children:[(0,t.jsxs)("div",{children:[t.jsx("div",{className:"mb-5",children:t.jsx(c.default,{src:m,alt:"Logo"})}),t.jsx("hr",{className:"mb-5"}),t.jsx("ul",{className:"menu",children:x.map(s=>(0,t.jsxs)("li",{className:"mb-3",children:[s.list?(0,t.jsxs)("div",{className:"flex justify-between items-center text-white text-lg hover:bg-secondary hover:rounded-lg duration-100 cursor-pointer",onClick:()=>r(s.label),"aria-expanded":e[s.label],children:[(0,t.jsxs)("div",{className:"flex items-center gap-5",children:[t.jsx(o.G,{className:"text-lg",icon:s.icon,width:20,height:20}),t.jsx("span",{children:s.label})]}),t.jsx("span",{className:"text-sm ml-auto",children:e[s.label]?"▲":"▼"})]}):t.jsx(u.default,{href:s.href||"#",className:`hover:bg-secondary hover:rounded-lg duration-100 ${i===s.href?"bg-secondary":""}`,children:(0,t.jsxs)("div",{className:"flex items-center gap-5 text-white text-lg",children:[t.jsx(o.G,{className:"text-lg",icon:s.icon,width:20,height:20}),t.jsx("span",{children:s.label})]})}),s.list&&e[s.label]&&t.jsx("ul",{className:"mt-2",children:s.list.map(e=>t.jsx("li",{className:"mb-2",children:t.jsx(u.default,{href:e.href,className:`text-white text-lg hover:bg-secondary hover:rounded-lg p-2 block ${i===e.href?"bg-secondary":""}`,children:e.label})},e.href))})]},s.label))})]}),t.jsx("div",{className:"mt-auto mb-3",children:(0,t.jsxs)("button",{onClick:()=>(0,a.signOut)({redirect:!0,callbackUrl:"/login"}),className:"w-full px-6 text-lg text-white hover:bg-secondary hover:rounded-lg duration-100 flex items-center gap-5 p-2",children:[t.jsx(o.G,{className:"text-lg",icon:h.mXR}),t.jsx("span",{children:"Logout"})]})})]})]})]})})}function g(){let{data:e}=(0,a.useSession)();return(0,t.jsxs)("div",{className:"flex justify-between mx-10 mt-10 mb-7",children:[t.jsx("div",{className:"drawer-content flex flex-col items-center justify-center",children:t.jsx("label",{htmlFor:"my-drawer-2",className:"btn bg-primary text-white hover:bg-secondary drawer-button lg:hidden",children:t.jsx(o.G,{icon:h.xiG})})}),(0,t.jsxs)("div",{className:"flex align-middle content-center items-center gap-3",children:[(0,t.jsxs)("h5",{className:"text-right font-bold",children:["Hello, ",e?.user?.username]}),t.jsx("div",{className:"avatar",children:t.jsx("div",{className:"w-10 rounded-full",children:t.jsx("img",{src:"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",alt:"avatar"})})})]})]})}function b({children:e}){let s=(0,n.usePathname)();return t.jsx("div",{className:"antialiased",suppressHydrationWarning:!0,children:"/login"===s?t.jsx("div",{className:"flex flex-row w-full",children:e}):(0,t.jsxs)("div",{className:"flex flex-row w-full",children:[t.jsx(p,{}),(0,t.jsxs)("div",{className:"w-full",children:[t.jsx(g,{}),t.jsx("div",{className:"mx-10 pb-10",children:e})]})]})})}function f({children:e}){return t.jsx("html",{lang:"en","data-theme":"light",children:t.jsx("body",{suppressHydrationWarning:!0,children:t.jsx(i,{children:t.jsx(b,{children:e})})})})}l.vc.autoAddCss=!1},15483:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>a});var t=r(19510);function a(){return t.jsx("div",{children:"Register"})}r(71159)},32029:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>t});let t=(0,r(68570).createProxy)(String.raw`E:\Adis\Development\_KANTOR\CMS ID Smart Care\cms-idsc\src\app\layout.tsx#default`)},73881:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>a});var t=r(66621);let a=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,t.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]},23824:()=>{}};var s=require("../../../webpack-runtime.js");s.C(e);var r=e=>s(s.s=e),t=s.X(0,[948,975,621],()=>r(21946));module.exports=t})();