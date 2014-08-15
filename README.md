# l.js is another simple/tiny javascript/css loader

## features
- parallel script / css loading
- callback after script loading (css support callback too but are executed imediately)
- tiny only 2.1ko uglifyed, less than 1ko gziped (at least for latest revision)
- may load in order to preserve dependencies
- support aliases for simpler calling
- on demand loading
- only one script tag required
- clear syntax
- successive load of same file will load it once but execute all callbacks associated
- can dumbly check already inserted tags at load time
- may use a fallback url on error (only for js files and with error events compatible browsers)

## examples

### loading ljs and another libs with one single tag
```html
<script src="l.js">
	ljs.load('myLib.js',function(){ /* your callback here */});
</script>
```

### loading some scripts in parallel others in order
```html
<script src="l.js">
	ljs
		.load('myLib.js')
		.load('myRequiredLib.js','myDependentLib.js',function(){ /* your callback here */})
	;
</script>
```
second load will be executed in parallel of first load but myDependentLib.js won't load before myRequireLib.js is loaded

```html
<script src="l.js">
	ljs.load(['myLib.js','myRequiredLib.js'],'myDependentLib.js',function(){ /* your callback here */});
</script>
```
this will load myLib.js and myRequiredLib.js in parrallel and wait for them before loading myDependentLib.js


### using some aliases for simpler loading
```html
<script src="l.js?checkLoaded"> // <- adding checkLoaded to the url will dumbly check already inserted script/link tags
	ljs
		.addAliases({
			jQuery:'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js#jqueryId' // <- script tag will have attribute id=jqueryId
			ui:[
				'jQuery'
				,'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js'
				,'myUITheme.css'
			]
		})
		.load('ui',function(){
			/* work with both jquery and jquery-ui here */
		})
	;
</script>
```

### define a fallback url
l.js also support a fallback url for javascript files in case you want to try to get the resource from another location on loading failure
You can define this fallback url parameter like you define ids. The difference is you will prefix with **#=** instead of # alone
```html
<script src="l.js">
	ljs.load('http://domain.com/myLib.js#=/myfallback.js#myid',function(){
		/*
			generated script tag will have myid as id and will try to load /myfallback.js if it fail to load http://domain.com/myLib.js
		*/
	});
</script>
```
this piece of code is dual licensed under MIT / GPL
Hope this help, code review, suggestions, bug reports are welcome and appreciated.
