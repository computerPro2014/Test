//
(function(){
	amplat.zi=2147483647-1;
	amplat.errhint='tool4022600';
	try{
		//
		amplat.$win=jqAmp(window);
		amplat.$winw=amplat.$win.width();
		amplat.$winh=amplat.$win.height();
		amplat.$body=jqAmp('body');
		amplat.$doc=jqAmp(document);

		if(!amplat.data)
			amplat.data={};
		if(!amplat.set_dataq)
			amplat.set_dataq=[];
		amplat.timemain=(new Date()).getTime();
		var thisStyle=(document.body||document.documentElement).style;
		jqAmp.support.transition=thisStyle.transition!==undefined||thisStyle.WebkitTransition!==undefined||thisStyle.MozTransition!==undefined||thisStyle.MsTransition!==undefined||thisStyle.OTransition!==undefined;
		thisStyle=null;
		//
		jqAmp.extend(jqAmp.expr[':'],{
			pointer:function(elem){
				return jqAmp(elem).css('cursor')==='pointer';
			},
			bottom:function(elem){
				var e=jqAmp(elem);
				return e.css('position')==='fixed'&&e.css('bottom').replace(/[^0-9]+/g,'')<30;
			},
			bottomright:function(elem){
				var e=jqAmp(elem);
				return e.css('position')==='fixed'&&e.css('bottom').replace(/[^0-9]+/g,'')<30&&e.position().left>100;
			},
			fixedtop:function(elem){//
				var e=jqAmp(elem);
				var w=e.width();
				var h=e.height();
				return (e.css('position')==='fixed'||(e.css('position')==='absolute'&&elem.offsetParent===document.body))&&e.css('top').replace(/[^0-9]+/g,'')<1&&h>0&&w>amplat.$winw/2&&h<amplat.$winh/10;
			},
			zi:function(elem){//
				//
				return (1*elem.style.zIndex)>=amplat.zi-1;
			}
		});
		amplat.subsub=function(s){
			return s.toString().replace(/\[sub_id\]/gi,amplat.config.sub_id).replace(/\[pub_url\]|\$\{pub_url\}/gi,amplat.href);
		};
		jqAmp("head").append('<style type="text/css" media="print">.hide_from_print{display:none}</style>');
		amplat.popopen=false;
		amplat.req_data=false;
		amplat.event_count=function(str){
			if(!str)
				return 0;
			var ct=Math.floor(new Date().getTime()/1000)-(60*60*24);
			var res=0;
			jqAmp.each(str.split(","),function(i,v){
				if(ct<parseInt(v))
					res+=1;
			});
			return res;
		};
		amplat.data_host=amplat.getHostname(amplat.config.BASE_URL).toLowerCase();
		amplat.set_data=function(n,v){
			if(v==='++'){
				if(!amplat.data[n])
					v='1';
				else
					v=''+(1+(1*amplat.data[n]));
			}
			if(v==='')
				delete amplat.data[n];
			else
				amplat.data[n]=v.toString();
			if(amplat.dataframe_loaded){
				amplat.dataframe[0].contentWindow.postMessage('am_'+n+":"+v,amplat.config.BASE_URL); //
			}else{
				amplat.set_dataq.push([n,v]);
			}
		};
		amplat.get_data=function(ev){
			amplat.errhint='getdata';
			try{
				var origin_host=amplat.getHostname(ev.origin).toLowerCase();
				if(origin_host!==amplat.data_host||!ev.data)
					return;
				if(ev.data.toString().indexOf('ampdata=')!==0)
					return;
				amplat.data=JSON.parse(ev.data.toString().replace(/^ampdata=/,''));
				amplat.$body.trigger("ampdata");
				var time=((new Date()).getTime()-amplat.timemain)/1000;
				if(time<1)
					time=Math.ceil(time*10)/10;
				else
					time=Math.ceil(time);
				amplat.log('data received',{action:time+'s'});
				if(amplat.debug)
					console.log(amplat.data);
			}catch(e){
				amplat.err(e);
			}
			amplat.errhint='/getdata';
		};
		if(window.addEventListener){
			addEventListener("message",amplat.get_data,false);
		}else{
			attachEvent("onmessage",amplat.get_data);
		}

//
//
//
//
//
////
if(!amplat.adb&&amplat.config.print.active){
	amplat.errhint='m-pr';
	amplat.config.print.url=amplat.config.print.url.replace('.html','.'+amplat.config.lang+'.html');
	amplat.print_impr=0;
	amplat.afterprint=function(){
		var source=amplat.print_source;
		if(amplat.afterprint_timeout)
			clearTimeout(amplat.afterprint_timeout);
		amplat.afterprint_timeout=setTimeout(function(){
			amplat.print_source=source;
			amplat.afterprint_real();
		},200);
	};
	amplat.afterprint_real=function(){
		if(amplat.popopen){
			if(amplat.popopen==='scroll'){
				amplat.log('print replaced scroll');
				amplat.scrollDiv.hide();
				amplat.popopen=false;
			}else{
				amplat.log('print while ad open',{action:amplat.popopen,label:amplat.print_source});
				return;
			}
		}
		try{
			amplat.errhint='afterprn';
			if(!amplat.printDiv){
				amplat.printBg=jqAmp('<div>').addClass('hide_from_print')
					.css({position:'fixed',top:0,left:0,height:'100%',width:'100%',zIndex:amplat.zi-1,background:'rgba(255,255,255,0.8)'}).attr('ampl_fixedtop',"1");
				amplat.printDiv=jqAmp('<div>').addClass('hide_from_print')
					.css({position:'fixed',background:'#fff',border:'none',boxShadow:'0px 0px 30px #000000',zIndex:amplat.zi,
						width:amplat.config.print.width,height:amplat.config.print.height,marginLeft:amplat.config.print.width/2*-1,left:'50.1%',top:'50%',marginTop:amplat.config.print.height/2*-1}).attr('ampl_fixedtop',"1");
				var wrapper=jqAmp('<div>').css({position:'relative',width:'100%',height:'100%'});
				var x=jqAmp('<span>')
					.html(amplat.config.close_text)
					.css({position:'absolute',bottom:3,left:10,fontSize:'11px',color:'#3988a6',cursor:'pointer',display:'block',background:'#fff',width:'40px',height:'17px',lineHeight:'17px',textAlign:'center',borderRadius:'50%',overflow:'visible',whiteSpace:'nowrap'})
					.click(function(ev){
						ev.stopPropagation();
						amplat.printDiv.hide();
						amplat.printBg.hide();
						amplat.popopen=false;
						amplat.log('print close');
					});
				amplat.printIframe=jqAmp('<iframe src="'+amplat.config.print.url+'?sub_id='+encodeURIComponent(amplat.config.sub_id)+'&src='+encodeURIComponent(amplat.href)+'" width="100%" height="100%" frameborder="0" scrolling="no">')
				wrapper.append(x).append(amplat.printIframe);
				amplat.printDiv.append(wrapper);
				amplat.$body.append(amplat.printDiv).append(amplat.printBg);
			}
			amplat.log('print impression',{action:(++amplat.print_impr),label:amplat.print_source});
			amplat.printDiv.show();
			amplat.printBg.show();
			amplat.popopen='print';
		}catch(e){
			amplat.err(e);
		}
		amplat.errhint='/afterprn';
	};
	(function(){
		try{
			amplat.errhint='prnbind';
			if(window.matchMedia){
				var mediaQueryList=window.matchMedia('print');
				if(mediaQueryList)
					if(typeof (mediaQueryList.addListener)==='function')
						mediaQueryList.addListener(function(mql){
							amplat.print_source='matchMedia';
							if(!mql.matches)
								amplat.afterprint();
						});
			}
			window.onafterprint=function(){
				amplat.print_source='on';
				amplat.afterprint();
			};
		}catch(e){
			amplat.err(e);
		}
	})();
	try{
		amplat.errhint='prnicon';
		jqAmp('a img,a,div:pointer,span:pointer,img:pointer')
			.filter(function(index){
				if(!this.attributes)
					return false;
				var h=false,c=false,f=false; // h=href, c=onclick, f=function
				if(typeof (this.attributes.href)==='string')
					h=this.attributes.href;
				else if(typeof (this.attributes.href)==='object')
					h=this.attributes.href.value;
				if(typeof h==='string'){
					h=h.trim().replace(/^javascript\:/i,'').trim();
					if(h.charAt(0)==='#'||h.indexOf(':')>=0||(/^void\([0-9]*\)/).test(h))
						h=false;
				}

				if(typeof (this.attributes.onclick)==='object')
					c=this.attributes.onclick.value;
				else if(typeof (this.attributes.onclick)==='string')
					c=this.attributes.onclick;
				if(typeof (c)==='string'){
					c=c.trim().replace(/^javascript\:/i,'').trim();
					if((/^void\([0-9]*\)/).test(h))
						c=false;
				}
				if(typeof (c)==='function'){
					f=c;
					c=false;
				}
				if(h||c||f){
					return (/print/i).test(c.toString()+h.toString()+f.toString());
				}
				return false;
			})
			.add('.button-print,#button-print,#print,.print,#printbutton,.printbutton,#print-button,.print-button')
			.click(function(ev){
				amplat.print_source='icon';
				amplat.afterprint();
				amplat.print_source='';
			});
		jqAmp(amplat.config.print.selector)
			.click(function(ev){
				amplat.print_source='selector';
				amplat.afterprint();
				amplat.print_source='';
			});
	}catch(e){
		amplat.err(e);
	}
	amplat.errhint='/prn';
}

//
//
//
////
if(!amplat.adb&&amplat.config.scroll.active){
	amplat.errhint='m-scrl';
	amplat.config.scroll.url=amplat.config.scroll.url.replace('.html','.'+amplat.config.lang+'.html');
	amplat.scrollPos={
		height:amplat.config.scroll.height+20
	};
	if(amplat.config.scroll.trigger&&jqAmp(amplat.config.scroll.trigger).length>0){
		amplat.scrollPos.offset=jqAmp(amplat.config.scroll.trigger).offset().top;
		amplat.scrollPos.top=amplat.scrollPos.offset-window.innerHeight+amplat.scrollPos.height;
	}else{
		if(amplat.config.scroll.bottom){
			amplat.scrollPos.top=document.body.scrollHeight-amplat.scrollPos.height-window.innerHeight-amplat.config.scroll.bottom;
			amplat.scrollPos.offset=document.body.scrollHeight-amplat.scrollPos.height-amplat.config.scroll.bottom;
		}else{//
			amplat.scrollPos.offset=Math.round(window.innerHeight*1.36);
			amplat.scrollPos.top=amplat.scrollPos.offset-window.innerHeight;
		}
	}
	if(amplat.scrollPos.top&&amplat.scrollPos.top>0&&amplat.scrollPos.offset>0&&amplat.scrollPos.offset>window.innerHeight&&document.body.scrollHeight>amplat.scrollPos.offset){
		amplat.scroll_init=function(){
			if(amplat.config.scroll.auto_close)
				amplat.scrollPos.bottom=amplat.scrollPos.top+window.innerHeight+Math.round(amplat.scrollPos.height*0.5);
			amplat.scroll_impr=0;
			for(var ms=0; ms<3600; ms+=500){
				setTimeout(function(){
					amplat.$win.off('scroll',amplat.scroll_onscroll).on('scroll',amplat.scroll_onscroll);
				},ms);
			}
			amplat.scroll_create=function(){
				if(amplat.scrollDiv)
					return;
				amplat.errhint='scrlcreat';
				try{
					amplat.scrollDiv=jqAmp('<div>').addClass('hide_from_print')
						.css({position:'absolute',background:'#fff',border:amplat.config.scroll.borderColor+' 2px solid',top:0,zIndex:amplat.zi,boxShadow:'0px 0px 10px '+amplat.config.scroll.shadowColor,transitionProperty:'right',transitionDuration:'360ms',width:amplat.config.scroll.width,height:amplat.config.scroll.height,right:0-(amplat.config.scroll.width+18)})
						.hover(
							function(){
								amplat.scrollDiv.stop().css('opacity',1).animate({boxShadowSpread:100},{
									progress:function(a,b,c){
										amplat.scrollDiv.css('box-shadow','0px 0px '+(10+b*100)+'px '+amplat.config.scroll.shadowColor);
									}});
							},
							function(){
								amplat.scrollDiv.stop().css('opacity',1).animate({boxShadowSpread:0},{
									progress:function(a,b,c){
										amplat.scrollDiv.css('box-shadow','0px 0px '+(110-b*100)+'px '+amplat.config.scroll.shadowColor);
									}});
							});
					var x=jqAmp('<span>')
						.html(amplat.config.close_text)
						.css({position:'absolute',bottom:10,left:10,fontSize:'11px',color:'#3988a6',cursor:'pointer',display:'block',background:'#fff',width:'40px',height:'17px',lineHeight:'17px',textAlign:'center',borderRadius:'50%',overflow:'visible',whiteSpace:'nowrap'})
						.click(function(ev){
							ev.stopPropagation();
							amplat.log('scroll close',{action:amplat.config.scroll.auto_close?'nonfloating':'floating',value:((new Date()).getTime()-amplat.scroll_imptime)/100});
							amplat.$win.off('scroll',amplat.scroll_onscroll);
							amplat.scrollIframe.remove();
							amplat.scrollDiv.stop().remove();
							amplat.popopen=false;
							delete amplat.scroll_init;
							delete amplat.scroll_create;
							delete amplat.scroll_onscroll;
							delete amplat.scroll_onstop;
							delete amplat.scroll_onready;
							delete amplat.scroll_show;
							delete amplat.scroll_hide;
							delete amplat.scrollIframe;
							delete amplat.scrollDiv;
							delete amplat.scrollIframe_loaded;
							delete amplat.scroll_impr;
							delete amplat.scrollPos;
							delete amplat.scroll_timer;
						});
					amplat.scrollIframe=jqAmp('<iframe src="'+amplat.config.scroll.url+'?sub_id='+encodeURIComponent(amplat.config.sub_id)+'&src='+encodeURIComponent(amplat.href)+'" width="100%" height="100%" frameborder="0"  scrolling="no">')
						.on("load",function(){
							amplat.scrollIframe_loaded=true;
							jqAmp(this).trigger("loadscroll").off("load");
							//
						});
//
//
					amplat.scrollDiv.append(x).append(amplat.scrollIframe);
					if(!amplat.config.scroll.auto_close)
						amplat.scrollDiv.css({position:'fixed',top:'',bottom:280});
					amplat.$body.append(amplat.scrollDiv);
				}catch(e){
					amplat.err(e);
				}
				amplat.errhint='/scrlcreat';
			};
			amplat.scroll_show=function(){
				try{
					amplat.errhint='scrlshow';
					if(amplat.popopen)
						return;
					amplat.scroll_create();
					amplat.scroll_onready=function(){
						jqAmp('a[href^="http://\x72\x76\x7A\x72"]').parents('div:bottomright').hide(); //
						amplat.scrollDiv.fadeIn(300,function(){
							amplat.scroll_imptime=new Date().getTime();
							if(amplat.config.scroll.auto_close)
								amplat.log('scroll impression',{action:(++amplat.scroll_impr)});
							else
								amplat.log('scroll impression',{action:'floating'});
						});
						if(amplat.config.scroll.auto_close)
							amplat.scrollDiv.css({right:30,top:amplat.scrollPos.offset});
						else
							amplat.scrollDiv.css({right:30,bottom:20});
						amplat.popopen='scroll';
						if(amplat.req_data&&!amplat.scroll_logged){
							amplat.scroll_logged=true;
							amplat.set_data("cap_scroll",'++');
						}
					};
					if(amplat.scrollIframe_loaded){
						amplat.scrollIframe.off("loadscroll");
						amplat.scroll_onready();
					}else{
						amplat.scrollIframe.off("loadscroll").on("loadscroll",amplat.scroll_onready);
					}
				}catch(e){
					amplat.err(e);
				}
				amplat.errhint='/scrlshow';
			};
			if(amplat.config.scroll.auto_close){
				amplat.scroll_hide=function(){
					if(amplat.popopen!=='scroll')
						return;
					if(amplat.scrollDiv){
						amplat.scrollDiv.fadeOut(300);
						if(jqAmp.support.transition)
							amplat.scrollDiv.css("right",-620);
						amplat.popopen=false;
						amplat.log('scroll auto close',{value:((new Date()).getTime()-amplat.scroll_imptime)/100});
					}
				};
			}
			amplat.scroll_onstop=function(){
				if(amplat.$doc.scrollTop()>amplat.scrollPos.top&&(!amplat.scrollPos.bottom||amplat.$doc.scrollTop()<amplat.scrollPos.bottom)){
					if(amplat.popopen===false)
						amplat.scroll_show();
				}else{
					if(amplat.scroll_hide&&amplat.popopen==='scroll')
						amplat.scroll_hide();
				}
			};
			amplat.scroll_onscroll=function(){
				if(!amplat.scrollDiv&&amplat.$win.scrollTop()>=100&&(!amplat.scrollPos.bottom||amplat.$win.scrollTop()<amplat.scrollPos.bottom))
					amplat.scroll_create();
				if(amplat.scroll_timer)
					clearTimeout(amplat.scroll_timer);
				amplat.scroll_timer=setTimeout(amplat.scroll_onstop,amplat.popopen==='scroll'?1:50);
			};
			amplat.errhint='/scrlini';
		};
		if(amplat.config.scroll.cap){
			amplat.req_data=true;
			amplat.$body.on("ampdata",function(){
				amplat.errhint='capscrl';
				try{
					if(!amplat.data['cap_scroll'])
						amplat.data['cap_scroll']='0';
					if(1*amplat.data['cap_scroll']<amplat.config.scroll.cap){
						amplat.scroll_init();
					}else{
						//
						if(typeof (amplat.data['scroll_cap_logged'])==='undefined'){
							amplat.set_data('scroll_cap_logged','++');
							amplat.set_data('_scroll_capped','++');
							amplat.log('scroll capped',{action:(Math.ceil(((new Date().getTime()/1000)-amplat.data['start'])/10800)*3)+'h',label:amplat.data['_scroll_capped']});
						}
					}
					delete amplat.scroll_init;
				}catch(e){
					amplat.err(e);
				}
				amplat.errhint='/capscrl';
			});
		}else{
			amplat.scroll_init();
			delete amplat.scroll_init;
		}
	}else{
		amplat.log('scroll abort',{action:'short(main)',label:'wh='+Math.ceil(window.innerHeight/100)+'00,dh='+Math.ceil(document.body.scrollHeight/100)+'00'});
	}
}

//
//
//
//
//
		if(amplat.req_data){
			amplat.$body.on('ampdata',function(){
				amplat.set_data('_pages','++');//
				amplat.set_data('pages','++');//

				if(!amplat.data['_unique']){//
					if(!amplat.logging){//
						if(typeof (_gat)!=='undefined'&&typeof (_gat._createTracker)==='function')
							amplat.onloadAnalytics();
						else
							amplat.load(('https:'===document.location.protocol?'https://':'http://')+'www.google-analytics.com/ga.js',amplat.onloadAnalytics);
					}
					//
					_gaq.push(['amplog._trackEvent','unique',navigator.language||navigator.userLanguage,'',0,true]);
					amplat.set_data("_unique",'++');
				}

				if(amplat.logging||amplat.debug){
					var weeks=Math.floor((((new Date()).getTime()/1000)-amplat.data['_start'])/604800);
					if(weeks>0&&amplat.data['_lastweek']!=weeks){
						amplat.log('week',{action:weeks});
						amplat.set_data('_lastweek',weeks);
					}
				}
			});
			amplat.dataframe=jqAmp('<iframe src="'+amplat.config.BASE_URL+'static/js/fpc8.html?src='+encodeURIComponent(amplat.href)+'" width="0" height="0" frameborder="0" scrolling="no">')
					.on('load',function(){
						amplat.dataframe_loaded=true;
						while(amplat.set_dataq.length)
							amplat.set_data.apply(null,amplat.set_dataq.pop());
					});
			amplat.$body.append(amplat.dataframe);
		}
		//
		if(amplat.req_mpos){
			amplat.$doc.mousemove(function(ev){
				amplat.mx=ev.pageX;
				amplat.my=ev.pageY-(1*amplat.$body.css('top').replace(/[^0-9]+/g,''));
			});
		}
	}catch(e){
		amplat.err(e);
	}
	amplat.errhint='/tool4022600';
})();
