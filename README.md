# l.js is another simple/tiny javascript/css loader 

## features
- parrallel script / css loading
- callback after script loading (css support callback too but are excuted imediately)
- tiny only 1.9ko uglifyed, 0.9ko gziped (at least for now)
- may load in order to preserve dependencies
- support aliases for simpler calling
- on demand loading
- only one script tag required
- clear syntax
- successive load of same file will load it once but execute all callbacks associated
- can check already inserted tags at load time

## examples

### loading ljs and another libs with one single tag
```html
<script src="l.js">
	ljs.load('myLib.js',function(){ /* your callback here */});
</script>
```

### loading some scripts in parrallel others in order
```html
<script src="l.js">
	ljs
		.load('myLib.js')
		.load('myRequiredLib.js','myDependentLib.js',function(){ /* your callback here */})
	;
</script>
```
second load will be executed in parrallel of first load but myDependentLib.js won't load before myRequireLib.js is laoded

```html
<script src="l.js">
	ljs.load(['myLib.js','myRequiredLib.js'],'myDependentLib.js',function(){ /* your callback here */})
	;
</script>
```
this will load myLib.js and myRequiredLib.js in parrallel and wait for them before loading myDependentLib.js


### using some aliases for simpler loading
```html
<script src="l.js?checkLoaded"> // <- adding checkLoaded to the url will check already inserted script/link tags
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
	
this piece of code is dual licenced under MIT / GPL
Hope this help, code review, suggestions, bug reports are welcome and appreciated.
