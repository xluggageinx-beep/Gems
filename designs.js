(function(){
const PI=Math.PI,BG='#fffdfb';
const E=(color,shape,min,max,draw,orient)=>({color,shape,min,max,draw,orient});
const P=(color,shape,pts)=>({color,shape,pts});
const add=(id,cat,title,els)=>DESIGNS.push({id,ver:'1',cat,title,w:600,h:600,bg:BG,els});
ANNIV.cat='메세지';

/* ---------- 그리기 도구 ---------- */
function along(Q0,step,closed){const Q=closed?Q0.concat([Q0[0]]):Q0,out=[];let t=0;
 for(let i=0;i<Q.length-1;i++){const a=Q[i],b=Q[i+1],len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(!len)continue;const an=Math.atan2(b[1]-a[1],b[0]-a[0]);
  while(t<=len){out.push([a[0]+(b[0]-a[0])*t/len,a[1]+(b[1]-a[1])*t/len,an]);t+=step;}t-=len;}
 return out;}
const dots=(Q,step,r,closed)=>along(Q,step,closed).map(p=>[p[0],p[1],r,p[2]]);
const quad=(A,C,B,n)=>{n=n||60;const o=[];for(let i=0;i<=n;i++){const t=i/n,u=1-t;o.push([u*u*A[0]+2*u*t*C[0]+t*t*B[0],u*u*A[1]+2*u*t*C[1]+t*t*B[1]]);}return o;};
const arcP=(cx,cy,r,a0,a1,n)=>{n=n||80;const o=[];for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n;o.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r]);}return o;};
const circ=(x,cx,cy,r)=>{x.beginPath();x.arc(cx,cy,r,0,7);x.fill();};
const ell=(x,cx,cy,rx,ry,a)=>{x.beginPath();x.ellipse(cx,cy,rx,ry,a||0,0,7);x.fill();};
const strokeP=(x,Q,w)=>{x.lineWidth=w;x.beginPath();Q.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke();};
const starP=(x,cx,cy,R,r,n)=>{n=n||5;x.beginPath();for(let i=0;i<n*2;i++){const a=-PI/2+i*PI/n,q=i%2?r:R;x.lineTo(cx+Math.cos(a)*q,cy+Math.sin(a)*q);}x.closePath();};
const heart=(x,cx,cy,s)=>{heartPath(x,cx,cy,s);x.fill();};
const txt=(x,t,cx,y,size,maxW,th)=>scriptText(x,t,cx,y,size,maxW,th||5);
function flake(x,cx,cy,R){const w=Math.max(10,R*.2);x.lineWidth=w;x.beginPath();
 for(let k=0;k<6;k++){const a=k*PI/3-PI/2,c=Math.cos(a),s=Math.sin(a);x.moveTo(cx,cy);x.lineTo(cx+c*R,cy+s*R);
  [[.42,.34],[.7,.24]].forEach(([b,l])=>{const bx=cx+c*R*b,by=cy+s*R*b;[a+.9,a-.9].forEach(t=>{x.moveTo(bx,by);x.lineTo(bx+Math.cos(t)*R*l,by+Math.sin(t)*R*l);});});}
 x.stroke();circ(x,cx,cy,w*1.1);}

/* ================= 성탄절 ================= */
// 1. 트리
const TREE=(()=>{const lf=[],orn=[];
 for(let j=0;j<11;j++){const y=150+j*30,half=10+j*21,r=12+j*.25,n=Math.floor(2*half/(2*r+1))+1,sp=n>1?2*half/(n-1):0;
  for(let k=0;k<n;k++){const X=n===1?300:300-half+k*sp;if(j>=2&&(k*3+j)%5===0)orn.push([X,y,r*.8]);else lf.push([X,y,r,-PI/2]);}}
 return{lf,orn};})();
add('c-tree','성탄절','크리스마스 트리',[
 E('골드','round',2.5,6,x=>{starP(x,300,95,42,18);x.fill();}),
 E('샴페인','cushion',3,8,x=>x.fillRect(278,474,44,46)),
 P('빨강','round',()=>TREE.orn),
 P('진초록','pear',()=>TREE.lf)
]);

// 2. 눈송이
const FL=[[150,130,62],[300,110,48],[450,140,60],[220,250,44],[380,250,70],[130,380,52],[300,400,46],[470,380,52],[180,520,50],[340,530,56],[480,520,46]];
const FC=[['연하늘','oval'],['라벤더','round'],['아쿠아','oval'],['진한 하늘','round']];
add('c-flakes','성탄절','눈송이',FC.map((c,ci)=>E(c[0],c[1],2.4,6,x=>FL.forEach((f,i)=>{if(i%4===ci)flake(x,f[0],f[1],f[2]);}))));

// 3. 큰 눈꽃
const arm=k=>k*PI/3-PI/2;
add('c-bigflake','성탄절','큰 눈꽃',[
 P('아쿠아','round',()=>[[300,300,26]]),
 P('진주','round',()=>[0,1,2,3,4,5].flatMap(k=>{const a=arm(k)+PI/6;return[[300+Math.cos(a)*38,300+Math.sin(a)*38,9],[300+Math.cos(a)*62,300+Math.sin(a)*62,7.5]];})),
 P('연하늘','marquise',()=>{const o=[];for(let k=0;k<6;k++){const a=arm(k);for(let R=44;R<=266;R+=22)o.push([300+Math.cos(a)*R,300+Math.sin(a)*R,13.5,a]);}return o;}),
 P('라벤더','pear',()=>{const o=[];for(let k=0;k<6;k++){const a=arm(k);[[78,14],[132,12.8],[186,11.6],[238,10.2]].forEach(([R,r])=>{const bx=300+Math.cos(a)*R,by=300+Math.sin(a)*R;[a+.82,a-.82].forEach(t=>o.push([bx+Math.cos(t)*36,by+Math.sin(t)*36,r,t]));});}return o;}),
 P('아쿠아','marquise',()=>{const o=[];for(let k=0;k<6;k++){const a=arm(k)+PI/6;for(let R=84;R<=190;R+=22)o.push([300+Math.cos(a)*R,300+Math.sin(a)*R,9.4,a]);}return o;}),
 P('다이아','round',()=>{const o=[];for(let k=0;k<6;k++){const a=arm(k)+PI/6;for(let R=96;R<=210;R+=38)o.push([300+Math.cos(a)*R,300+Math.sin(a)*R,6.2]);}return o;})
]);

// 4. 별 오너먼트
add('c-star','성탄절','별 오너먼트',[
 P('진주','round',()=>dots([[300,22],[300,108]],13,5)),
 E('골드','round',2.6,6.5,x=>{starP(x,300,335,205,82);x.lineWidth=14;x.stroke();}),
 E('빨강','round',3,9,x=>{starP(x,300,335,100,40);x.fill();}),
 E('버터 옐로','trillion',3,8,x=>{starP(x,300,335,190,76);x.fill();x.globalCompositeOperation='destination-out';starP(x,300,335,122,49);x.fill();x.globalCompositeOperation='source-over';})
]);

// 5. 오너먼트 볼
const inBall=(x,f)=>{x.save();x.beginPath();x.arc(300,330,193,0,7);x.clip();f();x.restore();};
add('c-ball','성탄절','오너먼트 볼',[
 E('골드','cushion',3,7,x=>x.fillRect(268,90,64,30)),
 E('골드','round',2.4,4,x=>{x.lineWidth=8;x.beginPath();x.arc(300,74,13,0,7);x.stroke();}),
 E('골드','round',2.6,6.5,x=>{x.lineWidth=14;x.beginPath();x.arc(300,330,205,0,7);x.stroke();}),
 P('골드','round',()=>[164,232,300,368,436].map(X=>[X,330,7])),
 E('진한 하늘','cushion',3,9,x=>inBall(x,()=>{x.beginPath();for(let X=130;X<=470;X+=68){x.moveTo(X,290);x.lineTo(X+26,330);x.lineTo(X,370);x.lineTo(X-26,330);x.closePath();}x.fill();})),
 E('진주','oval',2.4,5,x=>inBall(x,()=>{x.lineWidth=9;x.beginPath();x.moveTo(80,232);x.lineTo(520,232);x.moveTo(80,428);x.lineTo(520,428);x.stroke();})),
 E('라벤더','round',2.4,4.5,x=>inBall(x,()=>{x.lineWidth=8;x.beginPath();for(let X=130;X<=470;X+=48){x.moveTo(X+24,232);x.arc(X,232,24,0,PI);x.moveTo(X-24,428);x.arc(X,428,24,PI,2*PI);}x.stroke();})),
 P('진주','round',()=>[...dots(arcP(300,330,170,-PI*.78,-PI*.22),15,5),...dots(arcP(300,330,170,PI*.22,PI*.78),15,5)])
]);

// 6. 캔디케인
const CN=(x,f)=>{x.save();x.translate(300,330);x.rotate(.3);f();x.restore();};
const cane=x=>{x.beginPath();x.moveTo(-30,230);x.lineTo(-30,-130);x.arc(30,-130,60,PI,0);x.lineTo(90,-95);};
add('c-cane','성탄절','캔디케인',[
 E('골드','round',2.6,6,x=>CN(x,()=>circ(x,-30,-20,15))),
 E('진초록','pear',3,9,x=>CN(x,()=>{ell(x,-76,-30,44,22,.25);ell(x,16,-30,44,22,-.25);x.lineWidth=16;x.beginPath();x.moveTo(-36,-12);x.lineTo(-72,62);x.moveTo(-24,-12);x.lineTo(12,62);x.stroke();})),
 E('빨강','round',2.6,7,x=>CN(x,()=>{cane(x);x.lineWidth=46;x.stroke();x.globalCompositeOperation='destination-in';x.beginPath();for(let c=-300;c<=560;c+=64){x.moveTo(-200,c);x.lineTo(200,c-400);}x.lineWidth=24;x.stroke();})),
 E('진주','round',2.6,7,x=>CN(x,()=>{cane(x);x.lineWidth=46;x.stroke();}))
]);

// 7. Merry Christmas
const HL=[[-38,-6,-.35],[18,-30,1.15],[30,22,.45]];
const hollyL=(x,cx,cy,f)=>HL.forEach(([dx,dy,a])=>ell(x,cx+dx*f,cy+dy*f,34,14,a));
const hollyB=(cx,cy,f)=>[[-2,2],[14,10],[2,18]].map(([dx,dy])=>[cx+dx*f,cy+dy*f,8]);
add('c-merry','성탄절','Merry Christmas',[
 E('빨강','round',2.4,6.5,x=>txt(x,'Merry',300,255,150,420,6)),
 E('진초록','round',2.4,6,x=>txt(x,'Christmas',300,395,130,500,5)),
 E('골드','oval',2.4,4.5,x=>strokeP(x,quad([70,440],[300,500],[530,420]),8)),
 P('빨강','round',()=>[...hollyB(105,100,1),...hollyB(490,505,-1)]),
 E('옥색','marquise',3,8,x=>{hollyL(x,105,100,1);hollyL(x,490,505,-1);}),
 E('연하늘','round',2,5,x=>{star4(x,520,120,24);star4(x,470,80,12);star4(x,85,505,20);star4(x,135,555,11);})
]);

// 8. 양말
const stock=x=>{x.beginPath();x.moveTo(232,150);x.lineTo(392,150);x.lineTo(392,380);x.bezierCurveTo(392,428,420,440,462,450);x.bezierCurveTo(522,466,522,560,452,560);x.lineTo(300,560);x.bezierCurveTo(240,560,220,522,226,470);x.closePath();};
const inStock=(x,f)=>{x.save();stock(x);x.clip();f();x.restore();};
add('c-stock','성탄절','크리스마스 양말',[
 E('진주','round',2.4,4,x=>{x.lineWidth=8;x.beginPath();x.arc(214,72,16,0,7);x.stroke();}),
 E('진주','round',2.6,7,x=>{rr(x,200,86,224,82,18);x.fill();}),
 E('골드','round',2.6,6,x=>{starP(x,312,320,46,19);x.fill();}),
 P('진주','round',()=>[[270,230,6],[350,250,6],[280,420,6],[360,450,6],[420,500,6],[255,330,6]]),
 E('진초록','round',2.6,7,x=>inStock(x,()=>circ(x,238,532,64))),
 E('진초록','round',2.6,7,x=>inStock(x,()=>circ(x,510,510,66))),
 E('빨강','round',3,8,x=>{stock(x);x.fill();})
]);

/* ================= 메세지 ================= */
// 9. Happy Day
add('m-happy','메세지','Happy Day',[
 E('분홍','round',2.4,6.5,x=>txt(x,'Happy',300,250,150,420,6)),
 E('라벤더','round',2.4,6.5,x=>txt(x,'Day',300,395,150,280,6)),
 E('빨강','heart',3,9,x=>heart(x,300,495,36),0),
 E('연핑크','heart',2.6,6,x=>{heart(x,225,500,18);heart(x,375,500,18);heart(x,165,488,12);heart(x,435,488,12);},0),
 P('연핑크','heart',()=>[[52,52,10,0],[548,52,10,0]]),
 P('진주','round',()=>dots(quad([70,455],[300,640],[530,455]),15,5)),
 P('민트','round',()=>[...dots(arcP(40,40,70,0,PI/2),15,5),...dots(arcP(40,40,105,0,PI/2),17,6),...dots(arcP(560,40,70,PI/2,PI),15,5),...dots(arcP(560,40,105,PI/2,PI),17,6)])
]);

// 10. Sweet Dreams
add('m-dream','메세지','Sweet Dreams',[
 E('연보라','round',2.4,6,x=>txt(x,'Sweet',345,275,120,290,5)),
 E('남색','round',2.4,6,x=>txt(x,'Dreams',350,395,120,320,5)),
 P('진주','round',()=>dots(arcP(330,268,224,PI*.5,PI*1.5,120).filter(p=>Math.hypot(p[0]-255,p[1]-300)<224),14,5)),
 E('버터 옐로','round',3,8,x=>{x.beginPath();x.arc(255,300,235,0,7);x.fill();x.globalCompositeOperation='destination-out';x.beginPath();x.arc(330,268,212,0,7);x.fill();x.globalCompositeOperation='source-over';}),
 E('연하늘','round',2.2,5,x=>{star4(x,470,100,30);star4(x,545,175,18);star4(x,520,470,26);star4(x,560,545,14);star4(x,110,555,18);})
]);

// 11. Je t'aime
const JX=[110,205,300,395,490],JS=[26,34,40,34,26];
add('m-jtm','메세지',"Je t'aime",[
 E('빨강','round',2.4,6.5,x=>txt(x,"Je t'aime",300,330,120,470,5)),
 E('분홍','heart',3,9,x=>[0,2,4].forEach(i=>{heart(x,JX[i],160,JS[i]);heart(x,JX[i],470,JS[i]);}),0),
 E('파스텔 핑크','heart',3,8,x=>[1,3].forEach(i=>{heart(x,JX[i],160,JS[i]);heart(x,JX[i],470,JS[i]);}),0),
 P('진주','round',()=>[157,252,347,442].flatMap(X=>[[X,165,6],[X,475,6]])),
 P('진주','round',()=>[...dots(quad([60,100],[300,30],[540,100]),15,5),...dots(quad([60,540],[300,610],[540,540]),15,5)])
]);

// 12. I love you Mom
const FLW=[0,1,2,3,4,5,6,7].map(k=>{const a=k*PI/4+PI/8;return[300+Math.cos(a)*245,300+Math.sin(a)*245];});
add('m-mom','메세지','I love you Mom',[
 E('연보라','round',2.4,6,x=>{txt(x,'I love',300,230,105,320,5);txt(x,'you',300,325,105,200,5);}),
 E('분홍','round',2.4,6.5,x=>txt(x,'Mom',300,445,135,300,6)),
 P('버터 옐로','round',()=>FLW.map(c=>[c[0],c[1],8])),
 P('연핑크','round',()=>FLW.flatMap(c=>[0,1,2,3,4].map(i=>{const a=i*2*PI/5-PI/2;return[c[0]+Math.cos(a)*17,c[1]+Math.sin(a)*17,8.2];}))),
 P('옥색','marquise',()=>{const o=[],N=50;for(let i=0;i<N;i++){const a=i/N*2*PI,s=i%2?1:-1,r=245+s*12;o.push([300+Math.cos(a)*r,300+Math.sin(a)*r,11,a+PI/2+s*.5]);}return o;}),
 E('연두','oval',2.4,4,x=>{x.lineWidth=7;x.beginPath();x.arc(300,300,245,0,7);x.stroke();})
]);

// 13. Best Dad Ever
const spiral=(cx,cy,dir,ph)=>{const o=[];for(let t=0;t<=3*PI;t+=.12){const r=5+4.5*t,a=ph+dir*t;o.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r]);}return o;};
add('m-dad','메세지','Best Dad Ever',[
 E('골드','emerald',3,7,x=>{x.lineWidth=14;x.strokeRect(150,110,300,380);}),
 E('진주','round',2.4,4,x=>{x.lineWidth=8;x.strokeRect(170,130,260,340);}),
 E('남색','round',2.4,6,x=>{txt(x,'Best',300,230,100,230,5);txt(x,'Ever',300,432,100,230,5);}),
 E('진한 하늘','round',2.4,6.5,x=>txt(x,'Dad',300,330,110,230,6)),
 E('연하늘','heart',3,8,x=>{heart(x,95,300,26);heart(x,505,300,26);},0),
 E('연하늘','oval',2.4,4.5,x=>[[100,62,1,PI],[500,62,-1,0],[100,538,-1,PI],[500,538,1,0]].forEach(s=>strokeP(x,spiral(s[0],s[1],s[2],s[3]),9))),
 P('라벤더','round',()=>[95,505].flatMap(X=>[...dots([[X,140],[X,262]],16,5),...dots([[X,338],[X,460]],16,5)]))
]);

/* ---------- 갤러리: 카테고리 탭 ---------- */
const st=document.createElement('style');
st.textContent='.tabs{display:flex;gap:8px;overflow-x:auto;padding:6px 0}.tab{flex:none;padding:9px 16px;border-radius:999px;background:#fff;border:1px solid #ecdde8;font-size:14px;color:#7a6170}.tab.on{background:linear-gradient(180deg,#e9b0cb,#cf8db3);color:#fff;border-color:#d59abd}.card{aspect-ratio:1}';
document.head.appendChild(st);
let cat='전체',tok=0;const CATS=['전체','성탄절','메세지'];
showHome=function(){
 const home=$('home'),list=$('list');let tabs=$('tabs');
 if(!tabs){tabs=document.createElement('div');tabs.id='tabs';tabs.className='tabs';home.insertBefore(tabs,list);}
 tabs.innerHTML='';
 CATS.forEach(c=>{const b=document.createElement('button');b.className='tab'+(c===cat?' on':'');b.textContent=c;b.onclick=()=>{cat=c;showHome();};tabs.appendChild(b);});
 list.innerHTML='';const my=++tok,jobs=[];
 DESIGNS.filter(d=>cat==='전체'||d.cat===cat).forEach(d=>{
  const card=document.createElement('div');card.className='card';const c=document.createElement('canvas');card.appendChild(c);
  card.insertAdjacentHTML('beforeend','<div class="bd">'+d.title+'</div>');list.appendChild(card);card.onclick=()=>openDesign(d);
  jobs.push(()=>{try{const Ld=getLayout(d),w=card.clientWidth,h=card.clientHeight;if(!w)return;const s=Math.min(w/d.w,h/d.h);c.width=w*DPR;c.height=h*DPR;
   render(c.getContext('2d'),d,Ld,{sc:s,ox:(w-d.w*s)/2,oy:(h-d.h*s)/2,dpr:DPR});
   const done=loadProg(d.id).length;if(done)card.insertAdjacentHTML('beforeend','<div class="pct">'+Math.floor(done/Ld.gems.length*100)+'%</div>');}
   catch(e){card.insertAdjacentHTML('beforeend','<div class="pct">오류</div>');}});});
 const run=()=>{if(my!==tok)return;const j=jobs.shift();if(!j)return;j();setTimeout(run,10);};setTimeout(run,30);
};
})();
