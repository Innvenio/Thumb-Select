# ThumbSelect
jQuery plugin to change the traditional select tag for "thumb friendly" items


<br/>
<strong>Demo</strong>
<br/><br/>
Demo in <a target="_blank" href="http://jsfiddle.net/aesposito/a87cLg52/">jsFiddle</a>

<br/>
<strong>How to use</strong>
<br/><br/>

Your HTML:
<br/>
```html
<!DOCTYPE html>
<html>
<head>
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="js/ThumbSelect.js"></script>
</head>
<body>
	<!-- YOUR TRADITIONAL SELECT -->
	<select id="select">
		<option value="Linux">Linux</option>
		<option value="OSX">OSX</option>
		<option value="Windows">Windows</option>
		<option value="Other">Other</option>
	</select>
	<!-- YOUR TRADITIONAL SELECT -->
	<br/><br/>
	<div class="selected"></div>
	<script type="text/javascript" src="js/script.js"></script>
</body>
</html>

```
<br/><br/>
Your script:
<br/>
```javascript
$(document).ready(function () {
	//Create ThumbSelect
	$('#select').ThumbSelect();

	//Select multiple items
    //$('#select').ThumbSelect('multiple', true);

    //Select items previously
    //$('#select').ThumbSelect('select', ["Linux"]); //Single select
    //$('#select').ThumbSelect('select', ["Linux", "OSX"]); //Multiple select

	//Event change item
	$('#select').ThumbSelect('change', function (value) {
		$('.selected').html("Item selected: " +  value);
	});

	//Get value
	//var value = $('#select').ThumbSelect('value');
});
```