Showing controllers and includes in your angular app
------------------------------------------------------------

After some time spent with AngularJS and structuring my application I found it useful to see what controllers and what partials are being used in any application view that I'm working with - and batarang, while a nice tool is not really helping that much - with those red cluttered outlines - it does not show what is where.

So I came up with this little piece of code which you can easily discard when you move to production.

Demo
--------------------
![](http://imgur.com/download/Mwn8kkh)

Can be seen here: http://maciejjankowski.github.io/angular-dgb/

CSS content to the rescue
------------------------------

The idea behind it is really simple - it's based upon CSS content property which renders controller name right where the the controller-bound tag starts.

```
.dbg-ctrl:before
{
	content: attr(ng-controller) attr(data-ng-controller);
	position:relative;
	line-height: 16px;
	font-size: 16px;
	background-color: greenyellow;
	padding:2px 6px;
}
```

I also added a translucent background for easily identifying controllers nesting.

```
.dbg-ctrl
{
	border: 1px dotted crimson;
	background-color: rgba(173,255,47,0.09);
	padding:5px;
}
```
	
Then I'm using jQuery to dynamically add the class:

```
$('[ng-controller]').addClass('dbg-ctrl');
```

While adding classes with jQuery is definitely not recommended* in your production app, here I chose it deliberately because I didn't want to pollute my production code and I wanted to make it easy to unplug this "feature" from my application.
*For dynamically adding classes the angular way, you should be using ng-class statement.


The next step would be to embed a code editor and code the app from within the app :-)
If there is anyone who can help in making this into Angular Batarang I'd be happy to contribute.
