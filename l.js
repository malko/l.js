/**
* script for js/css parallel loading with dependancies management
* @author Jonathan Gotti < jgotti at jgotti dot net >
* @licence dual licence mit / gpl
* @since 2012-04-12
* @todo add prefetching using text/cache for js files
*/
(function(){
	/** gEval credits goes to my javascript idol John Resig, this is a simplified jQuery.globalEval */
	var gEval = function(js){ ( window.execScript || function(js){ window[ "eval" ].call(window,js);} )(js); }
		//-- get the current script tag for further evaluation of it's eventual content
		,scripts = document.getElementsByTagName("script")
		,script  = scripts[ scripts.length - 1 ].innerHTML.replace(/^\s+|\s+$/g,'')
		//-- keep trace of header as we will make multiple access to it
		,header  = document.getElementsByTagName("head")[0] || document.documentElement
		,appendElmt = function(type,attrs,cb){
			var e = document.createElement(type), i;
			if( cb ){ //-- this is not intended to be used for link
				if(e.readyState){
					e.onreadystatechange = function(){
						if (e.readyState === "loaded" || e.readyState === "complete"){
							e.onreadystatechange = null;
							cb();
						}
					};
				}else{
					e.onload = cb; //function(){ cb(); };
				}
			}
			for( i in attrs ){ e[i]=attrs[i]; }
			header.appendChild(e);
		}
		,load = function(url,cb){
			if( this.aliases && this.aliases[url] ){
				var args = this.aliases[url].slice(0);
				args instanceof Array || (args=[args]);
				cb && args.push(cb);
				return this.load.apply(this,args);
			}
			if( url.match(/\.css\b/) ){
				return this.loadcss(url,cb);
			}
			return this.loadjs(url,cb);
		}
		,loaded = {} // will handle already loaded urls
		,loader  = {
			aliases:{}
			,loadjs: function(url,cb){
				if( loaded[url] === true ){ // already loaded exec cb if any
					cb && cb();
					return this;
				}else if( loaded[url]!== undefined ){ // already asked for loading we append callback if any else return
					if( cb ){
						loaded[url] = function(ocb,cb){ return function(){ ocb && ocb(); cb && cb(); } }(loaded[url],cb);
					}
					return this;
				}
				// first time we ask this script
				loaded[url] = function(cb){ return function(){loaded[url]=true; cb && cb();}}(cb);
				appendElmt('script',{type:'text/javascript',src:url},function(){ loaded[url]() });
				return this;
			}
			,loadcss: function(url,cb){
				if(! loaded[url]){
					appendElmt('link',{type:'text/css',rel:'stylesheet',href:url},function(){ loaded[url]=true; });
				}
				loaded[url] = true;
				cb && cb();
				return this;
			}
			,load: function(){
				var argv=arguments,argc = argv.length;
				if( argc === 1 && argv[0] instanceof Function){
					argv[0]();
					return this;
				}
				load.call(this,argv[0], argc <= 1 ? undefined : function(){ loader.load.apply(loader,[].slice.call(argv,1))} )
				return this;
			}
		}
	;
	//export ljs
	ljs = loader;
	// eval inside tag code if any
	script && gEval(script);	
})()
