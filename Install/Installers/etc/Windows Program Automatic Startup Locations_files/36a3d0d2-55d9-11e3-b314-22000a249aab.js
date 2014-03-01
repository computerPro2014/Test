if(typeof (amplat)==='undefined'){
	if(typeof (_gaq)==='undefined')
		_gaq=[];
	(function(){
		amplat={};
		amplat.v=4022600; //
		amplat.bd=''; //
		amplat.href=document.location.href.toString().replace(/^[^\/]+[\/][\/]+/,'').replace(/[\/\?#].+$/,'');
		//
		amplat.pro=window.location.protocol==='file:'?'http:':window.location.protocol;
		amplat.browser=/Firefox[\/\s]\d+/.test(navigator.userAgent)?'ff':/MSIE 6/.test(navigator.userAgent)?'ie6':/MSIE 7/.test(navigator.userAgent)?'ie7':/MSIE 8/.test(navigator.userAgent)?'ie8':/MSIE 9/.test(navigator.userAgent)?'ie9':/MSIE 10/.test(navigator.userAgent)?'ie10':/MSIE\s\d+/.test(navigator.userAgent)?'ie?':/Chrome[\/\s]\d+/.test(navigator.userAgent)?'gc':/Chromium[\/\s]\d+/.test(navigator.userAgent)?'oc':/Safari[\/\s]\d+/.test(navigator.userAgent)?'sa':/Opera[\/\s]\d+/.test(navigator.userAgent)?'op':navigator.appName==='Netscape'&&/Trident\/.*rv\:\d+/.test(navigator.userAgent)?'ie11':'?';
		amplat.mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		//
		amplat.getHostname=function(url){
			return url.toString().replace(/^[^\/]*[\/][\/]/,'').replace(/^([^\/?#]*).*$/,"$1");
		};
		//
		amplat.hashCode=function(s){
			return Array.prototype.reduce&&s.split("").reduce(function(a,b){
				a=((a<<5)-a)+b.charCodeAt(0);
				return a&a;
			},0);
		};
		//
		if(amplat.browser==='gc'||amplat.browser==='oc')
			amplat.cssp='-webkit-';
		else if(amplat.browser==='ff')
			amplat.cssp='-moz-';
		else if(amplat.browser.indexOf('ie')===0)
			amplat.cssp='-ms-';
		else if(amplat.browser==='op'||amplat.browser==='sa')
			amplat.cssp='-o-';
		else
			amplat.cssp='';
		amplat.config={
			code_id:"36a3d0d2-55d9-11e3-b314-22000a249aab",
			sub_id:"None"==="None"?"":"None",
			dist:""!=="",
			mobile:""!=="",
			BASE_URL:amplat.pro+"//cdn.adopt-media.com/",
			ga_ua:"UA-41129277-6",
			https:""!=="",
			error_report_ratio:1*"0.01",//
			log_ratio:1*"1.0",//
			loading_delay_ms:1*"",//
			close_text:'Close',
			fpc:null,
			lang:navigator.language||navigator.userLanguage,
			inject:{
				script:"",
				script_url:""
			},
			popu:{
				//
			},
			print:{
				//
				active:true,
				url:amplat.pro+"//cdn.adopt-media.com/36a3d0d2-55d9-11e3-b314-22000a249aab.print"+amplat.bd+".html",
				height:1*"442",
				width:1*"318",
				selector:""
						//
			},
			scroll:{
				//
				active:true,
				url:amplat.pro+"//cdn.adopt-media.com/36a3d0d2-55d9-11e3-b314-22000a249aab.scroll"+amplat.bd+".html",
				rtl:""!=="",
				overflow_fix:"1"!=="",
				height:1*"266",
				width:1*"582",
				tmp:"en.html",
				trigger:"#related_content_title",
				bottom:0,
				cap:(1*"0")||0,
				ratio:1*"1.0",
				auto_close:""!=="",
				borderColor:"#3988A6",
				shadowColor:"#0D1A31"
						//
			},
			search:{
				//
				active:true,
				url:"//search.conduit.com/Results.aspx?ctid\u003DCT3325515\u0026searchsource\u003D55\u0026UM\u003D2\u0026q\u003D[q]",
				placeholder:"Search with Bing",
				remove:"1"!=="",
				info:""
						//
			},
			tipbox:{
				//
			},
			peel:{
				//
			}
		};
		//
		if(amplat.hashCode(document.location.href)!==1803014692&&amplat.hashCode(document.location.hostname)===1538156801)
			amplat.config.search.active=false;
		if(typeof (_am_sub_id)!=='undefined')
			amplat.config.sub_id=_am_sub_id;
		if(typeof (_am_config)==='object')
			for(var i in _am_config)
				if(typeof (_am_config[i])==='object'&&typeof (amplat.config[i])==='object'){
					for(var ii in _am_config[i])
						amplat.config[i][ii]=_am_config[i][ii];
				}else{
					amplat.config[i]=_am_config[i];
				}
		//

		amplat.config.inject.active=amplat.config.inject.script.length+amplat.config.inject.script_url.length>0;
		if(/[\?&]lang=(en|fr|es|ru|he|ar|pt|it|de|pl)\b/.test(document.location.search))
			amplat.config.lang=document.location.search.toString().replace(/.*[\?&]lang=(en|fr|es|ru|he|ar|pt|it|de|pl)\b.*$/,'$1');
		if(/^(en|fr|es|ru|he|ar|pt|it|de|pl)/.test(amplat.config.lang))
			amplat.config.lang=amplat.config.lang.substr(0,2);
		else
			amplat.config.lang='en';
		//
		amplat.abort=false;
		amplat.abortlog={};
		//
		amplat.logq=[];
		//
		amplat.errhint='tag_index0';
		//
		//
		//
		amplat.debug=amplat.config.debug||amplat.hashCode(window.location.hostname.toString())===-510678359||amplat.hashCode(amplat.getHostname(amplat.config.BASE_URL))===-510678359;
		//
		amplat.err=function(x,hint){
			if(!hint)
				hint=amplat.errhint||'';
			amplat.errx=x;
			//
			if(Math.random()<=amplat.config.error_report_ratio){
				if(typeof (amplat.gaerr)==='undefined'){
					_gaq=_gaq||[];
					amplat.load(('https:'===document.location.protocol?'https://':'http://')+'www.google-analytics.com/ga.js',amplat.onloadAnalytics);
				}
				var st='';
				if(typeof (x)==='string')
					x={message:x};
				if(x.stack){
					st=x.stack.replace(/\n(\s*at\s+)?/g,'|');
				}else{
					//
					for(var a=arguments.callee.caller?arguments.callee.caller.arguments:arguments; a.callee.caller; a=a.callee.caller.arguments){
						//
						var args=Array.prototype.slice.call(a.callee.caller.arguments);
						for(var i=0; i<args.length; i++)
							if(typeof (args[i])==='function')
								args[i]=(args[i].toString().replace(/^function\s*|\(.*$/gm,'')||'<anonymous function>')+'()';
						st+='|'+(a.callee.caller.toString().replace(/\s+/gm,' ').replace(/^function\s*|\(.*$/g,'')||'<func>')+'('+args.join(',')+')';
					}
				}
				_gaq.push(['gaerr._trackEvent',hint+':'+x.message,amplat.browser,st,0,true]);
			}
		};
		//
		if(amplat.debug){
			amplat.log=function(eventName,options){
				console.log('--amlog: '+(eventName+(!options?'':JSON.stringify(options))))
			};
			amplat.err=function(x,h){
				console.log('--amerror: '+h+amplat.errhint);
				console.error(x);
			};
		}else{
			if(Math.random()<=amplat.config.log_ratio){ //
				amplat.logging=true;
				amplat.log=function(eventName,options,fromQueue){
					if(amplat.logloaded){//
						if(typeof (options)!=='object')
							options={action:'a',label:null,value:null};
						else{
							if(options.action)
								options.action=options.action.toString();
							else
								options.action='a';
							if(options.label)
								options.label=options.label.toString();
							if(options.value)
								options.value=Math.round(options.value);
						}
						_gaq.push(['amplog._trackEvent',eventName,options.action,options.label,options.value,true]);
					}else{
						//
						if(!fromQueue)
							amplat.logq.push([eventName,options,true]);
					}
				};
			}else{
				amplat.log=function(){
				};
			}
		}
//
		amplat.config.tipbox.active=amplat.config.tipbox.active&&(Math.random()<=amplat.config.tipbox.ratio);
		amplat.config.scroll.active=amplat.config.scroll.active&&(Math.random()<=amplat.config.scroll.ratio);
		amplat.config.popu.active=amplat.config.popu.active&&(Math.random()<=amplat.config.popu.ratio);
		amplat.config.peel.active=amplat.config.peel.active&&document.getElementsByTagName('base').length===0;
		//
		amplat.load=function(url,callback){
			var s=document.createElement('script');
			s.type='text/javascript';
			s.async=!callback;
			s.src=url;
			if(typeof callback==='function')
				s.onload=function(){
					try{
						amplat.errhint='onload:'+s.src.substr(s.src.length-20);
						callback();
						this.onload=null;
					}catch(e){
						amplat.err(e);
					}
				};
			var n=document.getElementsByTagName('script')[0];
			n.parentNode.insertBefore(s,n);
		};
		//
		amplat.onloadAnalytics=function(){
			if(typeof (_gat)!=='undefined'&&typeof (_gaq)!=='undefined'){
				amplat.galog=_gat._createTracker(amplat.config.ga_ua||"UA-41129277-3",'amplog');
				amplat.gaerr=_gat._createTracker("UA-41129277-15",'amperr');
				_gaq.push(
						['amplog._setCustomVar',1,'pid',amplat.config.code_id,3],
						['amplog._setCustomVar',2,'sid',amplat.config.sub_id,3],
						['amplog._setCustomVar',3,'browser',amplat.browser,3],
						['amplog._setCustomVar',4,'site',amplat.bl?(amplat.p?'p':'bl'):amplat.href,3],
						['amplog._setCustomVar',5,'lang',navigator.language||navigator.userLanguage,3],
						['amperr._setCustomVar',1,'pid',amplat.config.code_id,3],
						['amperr._setCustomVar',2,'sid',amplat.config.sub_id,3],
						['amperr._setCustomVar',3,'browser',amplat.browser,3],
						['amperr._setCustomVar',4,'url',document.location.href,3],
						['amperr._setCustomVar',5,'v',amplat.v,3]);
				amplat.logloaded=true;
				while(amplat.logq.length)
					amplat.log.apply(null,amplat.logq.pop());
			}
		};
		if(amplat.logging){
			if(typeof (_gat)!=='undefined'&&typeof (_gat._createTracker)==='function')
				amplat.onloadAnalytics();
			else
				amplat.load(('https:'===document.location.protocol?'https://':'http://')+'www.google-analytics.com/ga.js',amplat.onloadAnalytics);
		}

//
//

//
		if(amplat.pro!=="http:"&&!(amplat.config.https&&amplat.pro==="https:")){
			amplat.abort=true;
			amplat.abortlog={action:'protocol '+amplat.pro.replace(':','')};
		}else

//
		if(navigator.appName==='Microsoft Internet Explorer'&&/MSIE [0-8]\b/.test(navigator.userAgent)){
			amplat.abort=true;
			amplat.abortlog={action:'ie8-',label:navigator.userAgent.replace(/^.*(MSIE [0-8])\b.*$/,'$1')};
		}else

//
		if(amplat.config.mobile&&!amplat.config.mobile){
			amplat.abort=true;
			amplat.abortlog={action:'mobile'};
		}else

//
		if(!document.body){
			amplat.abort=true;
			amplat.abortlog={action:'no body'};
		}else{
			amplat.ab={};
			amplat.ab.d=document.createElement('div');
			amplat.ab.d.id='adright';
			document.body.appendChild(amplat.ab.d);
			if(amplat.ab.d.ownerDocument.defaultView.getComputedStyle(amplat.ab.d)['display']==='none'){
				amplat.adb=true;
				if(!amplat.config.search.active){
					amplat.abort=true;
					amplat.abortlog={action:'adblock',label:'adright'};
				}else{
					//
					amplat.config.scroll.active=amplat.config.print.active=amplat.config.peel.active=false;
				}
			}
			document.body.removeChild(amplat.ab.d);
		}

		//
		if(!amplat.abort&&amplat.config.scroll.active){
			if(window.innerHeight<300||window.innerHeight*1.36>document.body.scrollHeight){
				amplat.config.scroll.active=false;
				amplat.log('scroll abort',{action:'short(tag)',label:'wh='+Math.round(window.innerHeight/100)+'00,dh='+Math.round(document.body.scrollHeight/100)+'00'});
			}
		}

//
		if(!amplat.abort){
			if(!amplat.config.search.active&&!amplat.config.tipbox.active&&!amplat.config.scroll.active&&!amplat.config.peel.active){
				amplat.abort=true;
				amplat.abortlog={action:'no tools'};
			}else{
//
				amplat.p=/\.x{3}$/.test(amplat.href)||/(x{3,}|s[e]x|fem.?dom|fu?ck|n[u]de|ana[il1]|p[ou]?rn|henta[il1]|b[il1][o0]w.?job)(e?r|[zsn]|ing?)?\b/.test(amplat.href)||/\b(x{3,}|s[e]x[^y]|fem.?dom|fu?ck|n[u]de|ana[il1]|p[ou]?rn|henta[il1]|b[il1][o0]w.?job)/.test(amplat.href)||/(x{3,}|s[e]x|fem.?dom|fu?ck|n[u]de|ana[il1]|p[ou]?rn|henta[il1]).{0,}(tube|video|movi?e?|pict?|s[e]x|clip|comic)/.test(amplat.href);
				if(amplat.p){
					amplat.bl=true;
					amplat.abort=true;
					amplat.abortlog={action:'blacklist p',label:amplat.href};
				}else{
//
					amplat.blacklist=eval('["paypal\\.com", "cloudfront\\.net", "amazonaws\\.com", "xnxx\\.com", "xvideos\\.com", "seconomic\\.net", "clickered\\.com", "abhidharm\\.com", "alliput\\.com", "austrable\\.com", "austras\\.com", "barrane\\.com", "burundges\\.com", "charaches\\.com", "deliberal\\.com", "dullava\\.com", "familiate\\.com", "foundam\\.com", "hypnother\\.com", "lamoravit\\.com", "monoper\\.com", "nicobain\\.com", "oppositive\\.com", "potamian\\.com", "purites\\.com", "represide\\.com", "resurred\\.com", "scherse\\.com", "thoughly\\.com", "thussed\\.com", "westinct\\.com", "withicked\\.com", "wyched\\.com", "recognited\\.com", "spurrently\\.com", "teethiopia\\.com", "obscurated\\.com", "myfreecams\\.com", "example\\.com", "onlinewebfind\\.com", "fastdailyfind\\.com", "media\\.imgdefault\\.com", "clickdiagnostic\\.com", "continella\\.com", "akamaihd\\.net", "adobso\\.com", "alltrannystars\\.com", "animeshi\\.tv", "big\\-teen\\-tits\\.org", "damplips\\.com", "desimasalalive\\.in", "fullmovies4tv\\.com", "malaywatchtube\\.pw", "megalien\\.com", "momfuckboy\\.org", "movie25\\.in", "niceblacktube\\.com", "osemtube\\.com", "primewire\\.fr", "rumom\\.net", "teenfucktory\\.com", "trannytube\\.me", "vertvonline\\.biz", "videospornomexicano\\.net", "vodly\\.unblocked\\.co", "watchmastimovies\\.com", "wildbbwtube\\.com", "xpussytube\\.com", "22cam\\.com", "300mbmoviez\\.com", "asianmilftube\\.net", "bigassestube\\.org", "brutalgaytube\\.com", "celebritysexstories\\.net", "chastity\\.com", "chastitymansion\\.com", "coolgayporno\\.com", "denunciando\\.com", "eroticstories\\.com", "freebestsexstories\\.com", "freeteensexhd\\.com", "freewatchxnxxvids\\.com", "french\\.shayanashop\\.com", "gayboylicious\\.blogspot\\.de", "grandpagaytube\\.com", "h\\-babes\\.com", "hardcoretube\\.org", "hindiindiansexstories\\.com", "hindisexchat\\.com", "hindisexstories4u\\.in", "homemadeinterracial\\.org", "hotmilftube\\.net", "hotteensexhd\\.com", "hotvilla\\.net", "hunk\\-ch\\.com", "inchastitybelts\\.com", "indianpornoz\\.com", "indiansex247\\.com", "indiansexchat\\.org", "indiansexhookup\\.com", "indiansexmms\\.net", "indiansexscandals\\.in", "indiansexstory\\.in", "indiansexteacher\\.com", "indiansexygfs\\.com", "interracialsexx\\.com", "jellypeep\\.com", "latinapussytube\\.com", "lesbianmoviestube\\.com", "liveindiansexwebcams\\.com", "meatycams\\.com", "medirty\\.com", "merdb\\.cn", "milfpicture\\.org", "milftube\\.in", "milkgaytube\\.com", "momscams\\.com", "montrealnurumassage\\.com", "mycandygames\\.com", "neatmovies\\.com", "nedporno\\.tv", "needgaytube\\.com", "neongalleries\\.com", "newvideoz\\.com", "orangegaytube\\.com", "oxotube\\.tv", "pinaysexstories\\.com", "privatemilfpics\\.com", "sachisexstories\\.com", "sexyamat\\.com", "shemalefuckbuddies\\.com", "sluttyhub\\.com", "southindiansex4u\\.net", "tagalogsexstories\\.net", "tamilsexstories\\.co", "tamilsexstories\\.mobi", "tamilsexstoriesblog\\.com", "tamilsexstoriesz\\.com", "teengaysvideo\\.com", "teensexa\\.com", "teensexxl\\.com", "telugsexstories\\.blogspot\\.in", "thebondagevideos\\.com", "thenurumassage\\.com", "trannytube\\.in", "truesexstories\\.org", "urdusexstories\\.net", "verytranny\\.com", "voga360\\.com", "xpetardasx\\.com", "xstories\\.org", "yaske\\.to", "younggaypornhd\\.com", "youngteensexhd\\.com", "frenchstream\\.co", "xhamster\\.com", "webcamnights\\.com", "zoophilieonline\\.com", "readbestbooks\\.net", "bdsmtube\\.org", "fullmoviefreee\\.com", "ftvdaily\\.com", "supercachondeo\\.com", "freshhotness\\.net", "eyeonhentai\\.com", "wwclivetv\\.com", "brutalwhore\\.com", "teenassespics\\.com", "0dt\\.net", "teen\\-shemales\\.com", "manojob\\.com", "gpgbh\\.com\\.br", "citebeur\\.com", "lgrp\\.esy\\.es", "plp\\.cl", "zztube\\.com"]');
					for(var i=0; i<amplat.blacklist.length&&!amplat.abort; i++){
						if(amplat.blacklist[i]!==''&&new RegExp(".*\\b"+amplat.blacklist[i].replace(/[\\]*\./g,'\\.')+"\\b.*",'i').test(window.location.href)){
							amplat.bl=true;
							amplat.abort=true;
							amplat.abortlog={action:'blacklist',label:amplat.href};
						}
					}
					delete amplat.blacklist;
				}
			}
		}

//
		if(amplat.abort){
			amplat.log('page abort',amplat.abortlog);
		}else{
			amplat.log('page run',{action:amplat.v,label:navigator.language||navigator.userLanguage});
//
			amplat.v$=function(){
				return typeof (jQuery)==='function'&&typeof (jQuery.fn)==='object'&&/^1\.([789]|1[0-9]?)\./.test(jQuery.fn.jquery);
			};
			amplat.intervalDomReady=setInterval(function(){
				if(document.readyState==="complete"||document.readyState==="interactive"){
					try{
						amplat.errhint='tagdr';
						amplat.errhint='tag_'+document.readyState;
						clearInterval(amplat.intervalDomReady);
						delete amplat.intervalDomReady;
						var onloadJQ=function(){
							//
							var c=amplat.config;
							var url=''+(c.inject.active?'1':'0')+(c.popu.active?'1':'0')+(c.print.active?'1':'0')+(c.scroll.active?'1':'0')+(c.search.active?'1':'0')+(c.tipbox.active?'1':'0')+(c.peel.active?'1':'0');
							amplat.load(c.BASE_URL+'tool/'+amplat.v+'.'+url+'.js');
						};
						//
						if(amplat.v$()){
							//
							jqAmp=jQuery;
							onloadJQ();
						}else{
							//
							amplat.load(amplat.pro+"//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js",
									function(){
										//
										if(amplat.v$()){
											jqAmp=amplat.$=jQuery.noConflict(true);
											onloadJQ();
										}else{
											amplat.jqNow=(new Date()).getTime();
											amplat.jqInterval=setInterval(
													function(){
														if(amplat.v$()){
															clearInterval(amplat.jqInterval);
															delete amplat.jqInterval;
															clearTimeout(amplat.jqTimeout);
															delete amplat.jqTimeout;
															jqAmp=amplat.$=jQuery.noConflict(true);
															onloadJQ();
															if(Math.random()<0.1)
																amplat.log('jq-load',{action:Math.ceil(((new Date()).getTime()-amplat.jqNow)/100)+'00ms',label:jQuery.fn.jquery});
															delete amplat.jqNow;
														}
													},20);
											amplat.jqTimeout=setTimeout(function(){
												if(amplat.jqInterval){
													clearInterval(amplat.jqInterval);
													delete amplat.jqInterval;
													delete amplat.jqTimeout;
													if(!amplat.v$()){
														amplat.abort=true;
														amplat.log('page abort',{action:'noJQ',label:Math.round(((new Date()).getTime()-amplat.jqNow)/100)+'00ms'});
														delete amplat.jqNow;
													}
												}
											},2000);
										}
									}
							);
						}
					}catch(e){
						amplat.err(e);
					}
					amplat.errhint='/tag'+document.readyState;
				}else{
					amplat.errhint='tag^'+document.readyState;
				}
			},10); //
		} //
	})();
}else{ //
//
	amplat.log('page abort',{action:'tag collision',label:"36a3d0d2-55d9-11e3-b314-22000a249aab overrun by "+amplat.config.code_id+'/'+amplat.config.sub_id});
}
