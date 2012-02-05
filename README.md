# jQuery videostretch plugin

A jQuery plugin that will take an HTML5 video element, place it in the background and stretch it. The script retains the intrinsic aspect ratio of the video.

## Features

videostretch supports the following features:

* Call it as many times as you want, only the last matched video element will be used
* Previously matched video elements will get their modified attributes restored

## Demo

You can view a demo live at: TODO

The same demo file is included with the project under the name `demo.html`

## Usage

First include a version of jQuery to your HTML document. (you can use Google CDN's version or the one provided under the /js directory of the project) :

```html
<script type="text/javascript" src="js/jquery-1.7.1.min"></script>
<script type="text/javascript" src="js/jquery-videostretch.js"></script>
```

Then just call it on the video element of your choice:

```html
<script>
$(function(){
 $('#myvideo').videostretch();
});
</script>
```

You can call it as many times as you want in whatever set of video elements you want!