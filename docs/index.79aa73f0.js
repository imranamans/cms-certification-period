var a=Object.defineProperty,t=Object.defineProperties,e=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,o=(t,e,s)=>e in t?a(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,d=(a,t)=>{for(var e in t||(t={}))i.call(t,e)&&o(a,e,t[e]);if(s)for(var e of s(t))l.call(t,e)&&o(a,e,t[e]);return a},r=(a,s)=>t(a,e(s));import{m as c,D as n,o as u,c as y,a as D,F as m,r as p,b as f,t as h,d as v,w as b,v as C,e as O,p as P,f as S,g as I,h as g,i as F,j as k,k as w,l as U,K as x,n as V,q as M,s as z,u as j}from"./vendor.3a711070.js";const L={props:{defaultCertPeriodDisplayCount:{type:Number,default:10}},computed:d({},c({dateFormat:a=>a.userDateFormat,socDate:"socDate"})),methods:{getNCertPeriods(a,t){const e=[];for(let s=1;s<=t;s++)e.push(this.getNextCertPeriod(a,s));return e},getNextCertPeriod(a,t){const e=n.fromISO(a).plus({days:60*(t-1)}),s=e.plus({days:59});return{start:e,end:s,isCurrent:this.isCurrentCertPeriod(e,s)}},isCurrentCertPeriod(a,t){const e=n.local().startOf("day");return e<=t&&e>=a},isValidSoc(){return!!this.socDate&&n.fromISO(this.socDate).isValid}}},T={key:0},A=f("li",{class:"notification is-danger is-light"}," Please select or enter a valid start of care date ",-1),N={key:1,class:"is-family-monospace"},B={class:"level"},_={class:"level-left"},R={class:"level-item"},H={class:"level-item has-text-weight-bold has-text-weight-semibold is-size-5"},W=f("div",{class:"level-item"},"to",-1),q={class:"level-item has-text-weight-bold has-text-weight-semibold is-size-5"},E={key:0,class:"level-item tag is-info is-light is-rounded ml-3 is-size-6"};L.render=function(a,t,e,s,i,l){return u(),y(m,null,[l.isValidSoc()?D("",!0):(u(),y("ul",T,[A])),l.isValidSoc()?(u(),y("ul",N,[(u(!0),y(m,null,p(l.getNCertPeriods(a.socDate,e.defaultCertPeriodDisplayCount),((a,t)=>(u(),y("li",{key:t},[f("div",B,[f("div",_,[f("div",R," Certification Period #"+h(("00"+(t+1)).slice(-2)),1),f("div",H,h(a.start.toFormat(this.dateFormat)),1),W,f("div",q,h(a.end.toFormat(this.dateFormat)),1),a.isCurrent?(u(),y("div",E," Current ")):D("",!0)])])])))),128)),f("li",null,[f("a",{onClick:t[1]||(t[1]=a=>e.defaultCertPeriodDisplayCount=e.defaultCertPeriodDisplayCount+3)},"more ")])])):D("",!0)],64)};const K={data:()=>({theDate:n.local().startOf("day").toISODate()}),computed:r(d({},c({dateFormat:a=>a.userDateFormat,socDate:"socDate"})),{today(){return n.local().startOf("day").toFormat(this.dateFormat)}}),activated(){this.update()},methods:r(d({},v(["updateSocDate"])),{makeTodayAsSocDate(){const a=n.local().startOf("day").toISODate();this.theDate=a,this.update()},update(){this.updateSocDate(this.theDate)}})},$={class:"field is-horizontal"},G=f("div",{class:"field-label is-normal"},[f("label",{for:"socDate",class:"label"},"Start of Care Date")],-1),J={class:"field-body"},Q={class:"field is-narrow"},X={class:"control"},Y={class:"field is-narrow"},Z={class:"control"};K.render=function(a,t,e,s,i,l){return u(),y("div",$,[G,f("div",J,[f("div",Q,[f("div",X,[b(f("input",{id:"socDate","onUpdate:modelValue":t[1]||(t[1]=a=>i.theDate=a),class:"input",type:"date",onInput:t[2]||(t[2]=(...a)=>l.update&&l.update(...a))},null,544),[[C,i.theDate]])])]),f("div",Y,[f("div",Z,[f("a",{class:"button is-text",onClick:t[3]||(t[3]=a=>l.makeTodayAsSocDate()),title:"Set start of care to today"},"Today "+h(l.today),1)])])])])};const aa={data:()=>({theDate:n.local().startOf("day").toISODate(),dayOrdinal:1,certificationPeriodOrdinal:1}),computed:d({},c({socDate:"socDate"})),activated(){this.calculateSocDate()},methods:r(d({},v(["updateSocDate"])),{calculateSocDate(){const a=n.fromISO(this.theDate).startOf("day").minus({days:60*this.certificationPeriodOrdinal-(60-(this.dayOrdinal-1))}).toISODate();this.updateSocDate(a)}})},ta={class:"field is-horizontal"},ea=f("div",{class:"field-label is-normal"},[f("label",{for:"theDate",class:"label"},"The date")],-1),sa={class:"field-body"},ia={class:"field is-narrow"},la={class:"control"},oa={class:"field is-horizontal"},da=f("div",{class:"field-label is-normal"},[f("label",{for:"dayOrdinal",class:"label"},"is day")],-1),ra={class:"field-body"},ca={class:"field is-narrow"},na={class:"control"},ua={class:"field is-horizontal"},ya=f("div",{class:"field-label is-normal"},[f("label",{for:"anyDateCertificationPeriodOrdinal",class:"label"},"of Cert Period")],-1),Da={class:"field-body"},ma={class:"field is-narrow"},pa={class:"control"};aa.render=function(a,t,e,s,i,l){return u(),y(m,null,[f("div",ta,[ea,f("div",sa,[f("div",ia,[f("div",la,[b(f("input",{id:"theDate","onUpdate:modelValue":t[1]||(t[1]=a=>i.theDate=a),type:"date",class:"input",onChange:t[2]||(t[2]=a=>l.calculateSocDate())},null,544),[[C,i.theDate]])])])])]),f("div",oa,[da,f("div",ra,[f("div",ca,[f("div",na,[b(f("input",{id:"dayOrdinal","onUpdate:modelValue":t[3]||(t[3]=a=>i.dayOrdinal=a),type:"number",class:"input",min:"1",max:"60",placeholder:"nth day, 1 to 60",onChange:t[4]||(t[4]=a=>l.calculateSocDate())},null,544),[[C,i.dayOrdinal]])])])])]),f("div",ua,[ya,f("div",Da,[f("div",ma,[f("div",pa,[b(f("input",{id:"anyDateCertificationPeriodOrdinal","onUpdate:modelValue":t[5]||(t[5]=a=>i.certificationPeriodOrdinal=a),type:"number",min:"1",max:"100",class:"input",placeholder:"nth Cert Period",onChange:t[6]||(t[6]=a=>l.calculateSocDate())},null,544),[[C,i.certificationPeriodOrdinal]])])])])])],64)};const fa={data:()=>({dayInFirst55Days:2,dayInLast5Days:56,todayIsDay:"dayInFirst55Days",certificationPeriodOrdinal:1,englishOrdinalRules:new Intl.PluralRules("en",{type:"ordinal"}),ordinalSuffixes:{one:"st",two:"nd",few:"rd",other:"th"}}),computed:r(d({},c({dateFormat:a=>a.userDateFormat,socDate:"socDate"})),{today(){return n.local().startOf("day").toFormat(this.dateFormat)}}),activated(){this.calculateSocDate()},methods:r(d({range:O},v(["updateSocDate"])),{calculateSocDate(){const a=n.local().startOf("day").minus({days:this.$data[this.todayIsDay]-1}).minus({days:60*(this.certificationPeriodOrdinal-1)}).toISODate();this.updateSocDate(a)},ordinal(a){return a+this.ordinalSuffixes[this.englishOrdinalRules.select(a)]}})},ha=k();P("data-v-083d7bcf");const va={id:"todayInFirst55Days",class:"field is-horizontal"},ba={class:"field-label"},Ca={class:"label"},Oa={class:"field-body"},Pa={class:"field is-horizontal is-grouped"},Sa={class:"control"},Ia={class:"radio"},ga=w(" first 55 days, optionally pick a day "),Fa={class:"control"},ka={class:"select"},wa={id:"todayInLast5Days",class:"field is-horizontal"},Ua=f("div",{class:"field-label"},null,-1),xa={class:"field-body"},Va={class:"field is-horizontal is-grouped"},Ma={class:"control"},za={class:"radio"},ja=w(" last 5 days, optionally pick a day "),La={class:"control"},Ta={class:"select"},Aa={class:"field is-horizontal"},Na=f("div",{class:"field-label"},[f("label",{for:"currentDateCertPeriodOrdinal",class:"label"},"of the")],-1),Ba={class:"field-body"},_a={class:"field is-narrow"},Ra={class:"control"},Ha={class:"select"},Wa=f("div",{class:"field is-narrow"},[f("span",null,"Certification Period")],-1);S();const qa=ha(((a,t,e,s,i,l)=>(u(),y(m,null,[f("div",va,[f("div",ba,[f("label",Ca,"Today ("+h(l.today)+") is in the",1)]),f("div",Oa,[f("div",Pa,[f("div",Sa,[f("label",Ia,[b(f("input",{type:"radio",name:"certWindow",id:"first55Days",value:"dayInFirst55Days","onUpdate:modelValue":t[1]||(t[1]=a=>i.todayIsDay=a),onChange:t[2]||(t[2]=a=>l.calculateSocDate())},null,544),[[I,i.todayIsDay]]),ga])]),f("div",Fa,[f("div",ka,[b(f("select",{id:"dayInFirst55Days","onUpdate:modelValue":t[3]||(t[3]=a=>i.dayInFirst55Days=a),onChange:t[4]||(t[4]=a=>(i.todayIsDay="dayInFirst55Days",l.calculateSocDate()))},[(u(),y(m,null,p(55,(a=>f("option",{key:a},h(a),1))),64))],544),[[g,i.dayInFirst55Days,void 0,{number:!0}]])])])])])]),f("div",wa,[Ua,f("div",xa,[f("div",Va,[f("div",Ma,[f("label",za,[b(f("input",{type:"radio",name:"certWindow",id:"last5Days",value:"dayInLast5Days","onUpdate:modelValue":t[5]||(t[5]=a=>i.todayIsDay=a),onChange:t[6]||(t[6]=a=>l.calculateSocDate())},null,544),[[I,i.todayIsDay]]),ja])]),f("div",La,[f("div",Ta,[b(f("select",{id:"dayInLast5Days","onUpdate:modelValue":t[7]||(t[7]=a=>i.dayInLast5Days=a),onChange:t[8]||(t[8]=a=>(i.todayIsDay="dayInLast5Days",l.calculateSocDate()))},[(u(!0),y(m,null,p(l.range(56,61),(a=>(u(),y("option",{key:a},h(a),1)))),128))],544),[[g,i.dayInLast5Days,void 0,{number:!0}]])])])])])]),b(f("div",Aa,[Na,f("div",Ba,[f("div",_a,[f("div",Ra,[f("div",Ha,[b(f("select",{id:"currentDateCertPeriodOrdinal","onUpdate:modelValue":t[9]||(t[9]=a=>i.certificationPeriodOrdinal=a),onChange:t[10]||(t[10]=a=>l.calculateSocDate())},[(u(!0),y(m,null,p(l.range(1,21),(a=>(u(),y("option",{key:a,value:a},h(l.ordinal(a)),9,["value"])))),128))],544),[[g,i.certificationPeriodOrdinal,void 0,{number:!0}]])])])]),Wa])],512),[[F,i.todayIsDay]])],64))));fa.render=qa,fa.__scopeId="data-v-083d7bcf";const Ea={components:{CmsCertPeriodViewer:L,CmsCertPeriodCalculatorStartOfCareDate:K,CmsCertPeriodCalculatorAnyDate:aa,CmsCertPeriodCalculatorCurrentDate:fa},data:()=>({defaultCertPeriodDisplayCount:10,tab:"B"}),computed:d({},c({dateFormat:a=>a.userDateFormat,socDate:"socDate"})),methods:d({},v(["updateUserDateFormat"]))},Ka=k();P("data-v-db8baee0");const $a={class:"tile is-ancestor is-vertical"},Ga={class:"tile is-parent is-8"},Ja={class:"tabs is-centered"},Qa={class:"tile is-parent"},Xa={class:"tile is-child is-8"},Ya={class:"tile is-child is-4"},Za={class:"buttons has-addons"},at={class:"tile is-parent"},tt={class:"tile is-child is-12"};S();const et=Ka(((a,t,e,s,i,l)=>{const o=U("cms-cert-period-calculator-start-of-care-date"),d=U("cms-cert-period-calculator-any-date"),r=U("cms-cert-period-calculator-current-date"),c=U("CmsCertPeriodViewer");return u(),y("div",$a,[f("div",Ga,[f("div",Ja,[f("ul",null,[f("li",{class:{"is-active":"A"===i.tab}},[f("a",{onClick:t[1]||(t[1]=a=>i.tab="A")},"Using start of care date")],2),f("li",{class:{"is-active":"B"===i.tab}},[f("a",{onClick:t[2]||(t[2]=a=>i.tab="B")},"Using any date")],2),f("li",{class:{"is-active":"C"===i.tab}},[f("a",{onClick:t[3]||(t[3]=a=>i.tab="C")},"Using today' date")],2)])])]),f("div",Qa,[f("div",Xa,[(u(),y(x,null,["A"===i.tab?(u(),y(o,{key:0})):"B"===i.tab?(u(),y(d,{key:1})):"C"===i.tab?(u(),y(r,{key:2})):D("",!0)],1024))]),f("div",Ya,[f("div",Za,[f("button",{type:"button",class:["button",{"is-selected is-link":"MM/dd/yyyy"===a.dateFormat}],onClick:t[4]||(t[4]=t=>a.updateUserDateFormat("MM/dd/yyyy"))}," mm/dd/yyyy ",2),f("button",{type:"button",class:["button",{"is-selected is-link":"yyyy-MM-dd"===a.dateFormat}],onClick:t[5]||(t[5]=t=>a.updateUserDateFormat("yyyy-MM-dd"))}," yyyy-mm-dd ",2)])])]),f("div",at,[f("div",tt,[f(c,{defaultCertPeriodDisplayCount:i.defaultCertPeriodDisplayCount},null,8,["defaultCertPeriodDisplayCount"])])])])}));Ea.render=et,Ea.__scopeId="data-v-db8baee0";const st=V('<section class="hero is-small is-light"><div class="hero-body"><div class="container is-max-desktop"><h1 class="title">CMS Certification Period Calculator</h1><h2 class="subtitle">Home Health Care</h2></div></div></section>',1),it={class:"section"},lt={class:"container is-max-desktop"},ot=f("footer",{class:"footer"},[f("div",{class:"content has-text-centered"},[f("p",null," CMS Certification Period Calculator by Imran Shah. The source code is licensed MIT. ")])],-1),dt={expose:[],setup:a=>(a,t)=>(u(),y(m,null,[st,f("section",it,[f("div",lt,[f(Ea)])]),ot],64))};const rt=z({state:()=>({socDate:n.local().startOf("day").toISODate(),userDateFormat:"MM/dd/yyyy"}),mutations:{setSocDate(a,t){a.socDate=t},setUserDateFormat(a,t){a.userDateFormat=t}},actions:{async updateSocDate({commit:a},t){M(t)||a("setSocDate",t)},async updateUserDateFormat({commit:a},t){a("setUserDateFormat",t)}}}),ct=j(dt);ct.use(rt),ct.mount("#app");