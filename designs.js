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



/* ================= 악세사리 / 드레스 / 동화 ================= */
// 14. 티아라
add('a-tiara','악세사리','로열 티아라',[
 P('진주','round',()=>dots(arcP(300,390,170,PI*1.07,PI*1.93,84),14,6)),
 P('골드','round',()=>dots(arcP(300,392,150,PI*1.09,PI*1.91,80),16,4.7)),
 P('연하늘','marquise',()=>[[300,214,22,-PI/2],[244,244,18,-.72],[356,244,18,.72],[194,286,15,-.54],[406,286,15,.54],[150,324,12,-.36],[450,324,12,.36]]),
 P('라벤더','pear',()=>[[300,268,18,-PI/2],[260,294,13,-.65],[340,294,13,.65],[214,322,11,-.44],[386,322,11,.44]]),
 P('아쿠아','cushion',()=>[[300,328,24,0],[228,348,14,0],[372,348,14,0]]),
 P('샴페인','round',()=>[[300,184,9],[218,226,7],[382,226,7],[168,270,6],[432,270,6]])
]);

// 15. 목걸이
add('a-necklace','악세사리','오션 목걸이',[
 P('골드','round',()=>dots(quad([88,196],[300,420],[512,196]),14,5)),
 P('진주','round',()=>dots(quad([110,214],[300,398],[490,214]),16,7)),
 P('민트','oval',()=>[[180,290,14,0],[228,326,16,0],[372,326,16,0],[420,290,14,0]]),
 P('연하늘','round',()=>[[300,414,16],[250,366,12],[350,366,12]]),
 P('아쿠아','heart',()=>[[300,312,34,0]]),
 P('라벤더','pear',()=>[[300,240,18,-PI/2],[264,268,13,-.82],[336,268,13,.82]])
]);

// 16. 드레스
add('d-gown','드레스','로즈 드레스',[
 P('진주','round',()=>dots([[255,112],[345,112]],14,5)),
 P('연핑크','heart',()=>[[300,138,22,0]]),
 P('버건디','marquise',()=>[[278,166,16,-.28],[322,166,16,.28]]),
 P('라벤더','oval',()=>[[300,196,18,0],[300,232,16,0],[300,268,14,0]]),
 P('분홍','pear',()=>[[265,212,15,-.5],[335,212,15,.5],[248,252,13,-.35],[352,252,13,.35]]),
 P('파스텔 핑크','cushion',()=>{const o=[];for(let r=0;r<6;r++){const y=300+r*42,half=48+r*34,n=4+r*2;for(let k=0;k<n;k++){const X=300-half+(half*2)*(n===1?0:k/(n-1));o.push([X,y,12+r*.5,0]);}}return o;}),
 P('연보라','oval',()=>{const o=[];[[230,340,14],[370,340,14],[204,388,14],[396,388,14],[184,436,13],[416,436,13],[170,486,12],[430,486,12],[160,534,10],[440,534,10]].forEach(v=>o.push([v[0],v[1],v[2],0]));return o;}),
 P('진주','round',()=>[[300,566,11],[228,548,8],[372,548,8]])
]);

// 17. 유리구두
const SLIP=[[124,402],[156,372],[208,346],[280,330],[370,340],[444,364],[498,406],[518,438],[468,454],[416,448],[364,432],[286,424],[230,432],[176,436],[136,430],[118,416]];
add('f-slipper','동화','유리구두',[
 P('진주','round',()=>dots(SLIP,13,5.2,true)),
 P('연하늘','cushion',()=>[[170,402,18,0],[220,388,20,0],[274,380,22,0],[332,384,20,0],[388,398,18,0],[438,418,17,0]]),
 P('아쿠아','oval',()=>[[198,420,18,0],[254,414,18,0],[310,412,19,0],[366,418,18,0],[422,434,17,0]]),
 P('다이아','round',()=>[[304,354,11],[346,362,9],[248,362,9],[450,394,8]]),
 P('민트','pear',()=>[[466,374,15,.85],[486,352,12,.65],[442,356,12,1.1],[206,344,12,-.85]]),
 P('라벤더','marquise',()=>[[300,454,13,0],[348,444,11,.16],[252,444,11,-.16]])
]);

// 18. Happy Anniversary
add('m-anniv2','메세지','Happy Anniversary',[
 E('분홍','round',2.4,6.4,x=>txt(x,'Happy',300,190,116,320,5)),
 E('버건디','round',2.4,6.4,x=>txt(x,'Anniversary',300,300,100,470,5)),
 E('라벤더','round',2.4,6.2,x=>txt(x,'Day',300,406,122,180,5)),
 P('연핑크','heart',()=>[[300,486,18,0],[252,468,11,0],[348,468,11,0]]),
 P('골드','round',()=>dots(quad([86,452],[300,560],[514,452]),14,4.8)),
 P('버건디','round',()=>[...dots(arcP(102,106,78,0,PI/2),16,5.2),...dots(arcP(498,106,78,PI/2,PI),16,5.2),...dots(arcP(94,498,74,PI*1.5,PI*2),16,5.2),...dots(arcP(506,498,74,PI,PI*1.5),16,5.2)]),
 P('민트','marquise',()=>[[142,138,13,.7],[460,138,13,-.7],[134,470,13,-.7],[468,470,13,.7]])
]);

// 19. 크리스마스 리스
add('c-wreath','성탄절','크리스마스 리스',[
 P('진초록','marquise',()=>{const o=[];for(let i=0;i<42;i++){const a=i/42*2*PI,r=176+(i%2?10:-10);o.push([300+Math.cos(a)*r,310+Math.sin(a)*r,18,a+PI/2]);}return o;}),
 P('연두','marquise',()=>{const o=[];for(let i=0;i<28;i++){const a=i/28*2*PI+PI/28,r=150+(i%2?8:-8);o.push([300+Math.cos(a)*r,310+Math.sin(a)*r,13,a+PI/2]);}return o;}),
 P('빨강','round',()=>[[230,208,10],[266,176,10],[338,176,10],[374,208,10],[204,316,8],[394,316,8],[250,438,9],[350,438,9]]),
 P('골드','cushion',()=>[[250,206,18,.2],[350,206,18,-.2]]),
 P('빨강','heart',()=>[[300,250,16,0]]),
 E('골드','round',2.4,6.2,x=>txt(x,'Noel',300,324,132,250,5)),
 P('진주','round',()=>dots(arcP(300,310,118,PI*.12,PI*.88,70),15,5))
]);

/* ======= V5.6: detailed curated beadwork, created from original jewel coordinates ======= */
// Retire the rushed V5.5 templates from the gallery, keep progress in storage untouched.
const retiredV55=new Set(['a-tiara','a-necklace','d-gown','f-slipper','m-anniv2','c-wreath','m-mom','m-dad']);
for(let i=DESIGNS.length-1;i>=0;i--)if(retiredV55.has(DESIGNS[i].id))DESIGNS.splice(i,1);
const JE=(x,y,r,a=0)=>[+x.toFixed(2),+y.toFixed(2),r,a];
const Jline=(x0,y0,x1,y1,step,r)=>dots([[x0,y0],[x1,y1]],step,r);
function Jell(cx,cy,rx,ry,n,r,phase=0){const p=[];for(let i=0;i<n;i++){const a=i/n*2*PI+phase;p.push(JE(cx+Math.cos(a)*rx,cy+Math.sin(a)*ry,r,a+PI/2));}return p;}
function Jarc(cx,cy,rx,ry,a0,a1,n,r){const p=[];for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n;p.push(JE(cx+Math.cos(a)*rx,cy+Math.sin(a)*ry,r,a+PI/2));}return p;}
function Jfill(cx,cy,rx,ry,stepX,stepY,r,omit){const p=[];let k=0;for(let y=cy-ry+stepY/2;y<=cy+ry-stepY/2;y+=stepY){const rr=1-((y-cy)/ry)**2;if(rr<=0)continue;const mx=rx*Math.sqrt(rr);let j=0;for(let x=cx-mx+stepX/2;x<=cx+mx-stepX/2;x+=stepX){if(omit&&omit(x,y))continue;p.push(JE(x,y,r*(j%6===0?1.05:1),0));j++;}k++;}return p;}
function Jrect(x0,y0,x1,y1,dx,dy,r,omit){const p=[];for(let y=y0;y<=y1;y+=dy){for(let x=x0;x<=x1;x+=dx){if(!omit||!omit(x,y))p.push(JE(x,y,r));}}return p;}
function Jtri(cx,apex,baseY,half,dy,r){const p=[];for(let y=apex;y<=baseY;y+=dy){const w=half*(y-apex)/(baseY-apex);for(let x=cx-w+6;x<=cx+w-5;x+=2*r+2.5){p.push(JE(x,y,r));}}return p;}
function Jflower(cx,cy,scale,petals=6){return Array.from({length:petals},(_,i)=>{const a=2*PI*i/petals-PI/2;return JE(cx+Math.cos(a)*scale*.57,cy+Math.sin(a)*scale*.57,scale*.26,a+PI/2);});}
function Jheartline(cx,cy,s,n,r){const p=[];for(let i=0;i<n;i++){const t=2*PI*i/n,X=16*Math.sin(t)**3,Y=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);p.push(JE(cx+X*s/17,cy-Y*s/17,r));}return p;}
function Jspiral(cx,cy,s,flip=1){const p=[];for(let i=0;i<56;i++){const t=i*.205,r=6+t*s,ang=t*flip; p.push(JE(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r,2.7));}return p;}
function JP(color,shape,coords){return P(color,shape,()=>coords);}

// Jeweled Castle: large ruby hearts, three tapered rooftops, aquamarine masonry,
// snow-white pearl clouds and saturated floral garden. Built as actual gem coordinates.
{
 const skylines=Jtri(302,51,171,64,10,5.2), roofsSide=[[132,228],[468,228]].map(([x,y])=>Jtri(x,y,344,83,12,5.9)).flat();
 const upperWindow=(x,y)=>x>280&&x<327&&y>271&&y<325;
 const midWindows=(x,y)=>((x>115&&x<149)||(x>447&&x<481))&&y>413&&y<461;
 const cloud=(cx,cy)=>[
  ...Jfill(cx-26,cy+20,52,24,15,14,6),...Jfill(cx+20,cy+12,35,36,14,15,6),
  ...Jfill(cx+55,cy+27,52,21,15,14,6)];
 const botFlowers=[];for(const [x,y,s] of [[96,546,34],[170,558,23],[236,558,17],[352,561,25],[433,548,30],[507,559,28]])botFlowers.push(...Jflower(x,y,s,7));
 add('f-castle-v2','동화','루비 하트 궁전',[
 JP('빨강','heart',[[302,26,21],[132,206,16],[468,206,16],[301,219,13],[302,394,18],[300,523,17]]),
 JP('진한 하늘','emerald',[[132,425,16],[468,425,16],[300,470,19]]),
 JP('아쿠아','round',[[302,110,17],[132,286,11],[468,286,11]]),
 JP('연핑크','cushion',Jrect(87,364,187,517,14,14,5.5,midWindows)),
 JP('연핑크','cushion',Jrect(413,364,513,517,14,14,5.5,midWindows)),
 JP('연하늘','emerald',Jrect(259,181,345,392,13,14,5.6,upperWindow)),
 JP('아쿠아','emerald',Jrect(193,449,405,526,12,13,5.6,(x,y)=>x>273&&x<329&&y>466)),
 JP('골드','emerald',Jrect(273,171,331,219,12,11,5.1,(x,y)=>Math.abs(x-300)<17&&y>182&&y<212)),
 JP('분홍','oval',skylines),JP('버터 옐로','oval',roofsSide),
 JP('분홍','round',Jline(204,444,396,444,10,4.2)),
 JP('골드','round',[...Jarc(300,490,42,53,PI*1.01,PI*1.99,32,4.1),...Jarc(300,490,32,43,PI*1.01,PI*1.99,28,3.5)]),
 JP('진주','round',[...cloud(88,143),...cloud(405,146),...cloud(74,354),...cloud(470,347)]),
 JP('파스텔 핑크','marquise',botFlowers),
 JP('라벤더','marquise',[...Jflower(103,552,27),...Jflower(448,549,25)]),
 JP('진초록','marquise',[[64,567,12,-.5],[131,576,12,.5],[187,584,10,-.6],[352,583,10,.7],[497,576,12,-.5],[534,558,12,.5]]),
 JP('진주','round',[...Jline(78,527,78,537,8,3.5),...Jline(520,527,520,537,8,3.5),...Jline(218,543,380,543,11,4)]),
 JP('골드','round',[...Jflower(55,63,18,8),...Jflower(545,82,18,8),...Jflower(55,456,15,8),...Jflower(548,456,17,8)]),
 ]);
}
// Sapphire flacon: deep blue beaded drop, lavender shoulder scrolls, pearl filigree;
// the large aquamarine gems anchor the design rather than being randomly sprinkled.
{
 const flaconOmit=(x,y)=>Math.abs(x-298)<30&&y>330&&y<392;
 const body=Jfill(300,431,126,149,12,12,5.1,flaconOmit);
 const emptyCenter=Jfill(300,432,37,44,14,14,5.0);
 add('a-sapphire-flacon','악세사리','사파이어 향수병',[
 JP('아쿠아','heart',[[300,92,24],[300,405,25]]),
 JP('연하늘','cushion',[[300,268,20],[300,340,22],[260,291,14],[340,291,14],[300,176,15]]),
 JP('남색','round',body),
 JP('남색','round',Jfill(300,216,54,67,13,14,5.3)),
 JP('진주','round',[...Jell(300,431,130,151,99,4.2),...Jell(300,218,63,74,47,3.9)]),
 JP('자수정','marquise',[[244,204,13,-.8],[356,204,13,.8],[260,154,12,-.55],[340,154,12,.55],[300,140,14,0]]),
 JP('진한 하늘','emerald',[[300,291,24,0],[222,296,12,-.22],[378,296,12,.22]]),
 JP('연보라','oval',[...Jarc(300,295,92,64,PI*.83,PI*2.17,34,6.3),...Jarc(300,318,95,64,PI*.84,PI*2.16,32,5.9)]),
 JP('진한 하늘','round',[...Jline(237,310,363,310,9.6,4.4),...Jline(244,331,356,331,10,4.3),...Jline(257,352,343,352,10,4.1)]),
 JP('진주','round',emptyCenter),
 JP('남색','round',[...Jspiral(143,283,4.5,1),...Jspiral(459,283,4.5,-1),...Jspiral(121,398,4,1),...Jspiral(479,398,4,-1)]),
 JP('진주','round',[...Jell(101,87,40,29,28,4),...Jell(499,87,40,29,28,4),...Jell(91,526,40,29,28,4),...Jell(509,526,40,29,28,4)]),
 JP('라벤더','marquise',[
   [101,87,29,.2],[499,87,29,-.2],[91,526,27,.3],[509,526,27,-.3],
   [57,59,17,-.8],[139,59,17,.8],[462,59,17,-.8],[543,59,17,.8],
   [49,507,17,-.8],[129,507,17,.8],[466,505,17,-.8],[547,508,17,.8]]),
 JP('남색','heart',[[244,86,14],[356,86,14]]),
 JP('아쿠아','round',[...Jflower(80,225,26,6),...Jflower(522,225,26,6)]),
 ]);
}
// Original heartwork, beaded ruby heart frame with gold word and ornate leaves.
{
 add('m-hearts-jewel','메세지','Forever & Always',[
 JP('빨강','heart',[[300,110,32],[126,179,25],[474,179,25],[300,500,26]]),
 JP('골드','marquise',[...Jflower(300,75,38,10),...Jflower(110,210,29,6),...Jflower(490,210,29,6)]),
 JP('진주','round',[...Jheartline(300,300,225,184,4),...Jheartline(300,305,209,162,3.4)]),
 JP('버건디','round',Jheartline(300,300,240,184,4.1)),
 JP('골드','round',Jheartline(300,300,269,180,3.0)),
 E('골드','round',2.0,4.8,x=>txt(x,'Forever',300,279,104,305,4.4)),
 E('골드','round',2.0,4.8,x=>txt(x,'& Always',300,358,88,340,4)),
 JP('빨강','heart',[[300,418,18]]),
 JP('라벤더','marquise',[...Jflower(140,350,24,6),...Jflower(460,350,24,6)]),
 JP('버건디','round',[...Jspiral(64,108,3.5,1),...Jspiral(536,108,3.5,-1),...Jspiral(67,497,3.5,-1),...Jspiral(533,497,3.5,1)]),
 JP('진초록','marquise',[[135,378,13,-.7],[164,370,13,.7],[435,370,13,-.7],[466,380,13,.7]])
 ]);
}

// Dark jewel card: one deliberate alternative to the cream background.
const darkHeart=DESIGNS.find(d=>d.id==='m-hearts-jewel');if(darkHeart)darkHeart.bg='#1a111b';

/* ---------- 갤러리: 카테고리 탭 ---------- */
const st=document.createElement('style');
st.textContent='.tabs{display:flex;gap:8px;overflow-x:auto;padding:6px 0}.tab{flex:none;padding:9px 16px;border-radius:999px;background:#fff;border:1px solid #ecdde8;font-size:14px;color:#7a6170}.tab.on{background:linear-gradient(180deg,#e9b0cb,#cf8db3);color:#fff;border-color:#d59abd}.card{aspect-ratio:1}';
document.head.appendChild(st);
let cat='전체',tok=0;const CATS=['전체','성탄절','메세지','악세사리','동화'];
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
