/*
* @author Vassilis Triglianos <triglian@gmail.com>, Vassilis Papapanagiotou <bpapapana@gmail.com> 
* @link https://github.com/bsquaredlabs/jquery-videostretch
* @copyright Copyright &copy; 2011 BSquaredLabs(http://bsquaredlabs.com), Vassilis Triglianos & Vassilis Papapanagiotou
* @license http://bsquaredlabs.com/licenses/jquery-videostretchLicense
*/

/*
 * jQuery Videostretch
 * Version 0.0.1
 *
 * Stretch HTML5 video to background of page
 *

*/

;(function($, window, undefined) {

	var vidRatio, hasResizeListener = false, $video = {},
	  rootElement = ("onorientationchange" in window) ? $(document) : $(window), // hack to acccount for iOS position:fixed shortcomings
	  isiDevice = /iPad|iPhone|iPod/i.test(navigator.platform);

	$.fn.videostretch = function() {

		return this.each(function() {
			$video = $(this);

			//if element isn't a video element, return
			if(!$video.is('video')) {
				return;
			}

			//remove stretched videos, if any, and restore css and other properties
			$('video.ui-videostretch').each(function() {
				var origProps = $(this).data('origProps');
				for(key in origProps) {
					$(this).prop(key, origProps[key]);
				}
				
				$(this).data('origProps', undefined);
				$(this).css($(this).data('origCss')).removeClass('ui-videostretch').data('origCss', undefined);

			});
			
			//cache original css properties of video, in case we want to restore them
			var cssProps = {
				position : '',
				zIndex : '',
				left : '',
				top : '',
				width: '',
				height: ''
			};
			
			for(key in cssProps) {
				cssProps[key] = $video.css(key);
			}
			
			//cache original properties of video, in case we want to restore them
			var props = {
				controls : '',
			};
			
			for(key in props) {
				props[key] = $video.prop(key);
			}

			//remove video controls, add stretch class and store cached css on object
			$video.addClass('ui-videostretch').data('origCss', cssProps);
			$video.data('origProps', props);
			
			
			
			if(! isiDevice){
				$video.removeAttr('controls');
			}

			var duration = $video.prop('duration');
			
			

			
			//we need the videoWidth and videoHeight properties of the video
			// they are available when the durationchange event has fired
			if(duration === undefined || isNaN(duration)) {
				$video.bind("durationchange", function(e) {
					computeRatio($video)
					resizeHandler($video);
				});
			} else {
				computeRatio($video)
				resizeHandler($video);
			}
			
			//make sure we attach the window listener only once
			if(! hasResizeListener){
				hasResizeListener = true;
				attachResizeListener();
			}
		});
	};
	
	
	/*
	 * attachResizeListener function.
	 * attaches a namespaced resize handler to the window
	 */	
	function attachResizeListener(){
		$(window).bind('resize.videostretch', function(e) {
			if($video !== undefined) {
				resizeHandler($video);
			}

		});
	}
	
	
	/*
	 * computeRatio function.
	 * Computes the intrinsic aspect ratio of the video
	 */
	function computeRatio(el) {
		vidRatio = el.prop('videoWidth') / el.prop('videoHeight');
		if(isiDevice){
			$video.removeAttr('controls');
		}
	}
	

	/*
	 * resizeHandler function.
	 * It will resize and position the video
	 * Called when resize events from the browser window occur
	 */
	function resizeHandler(el) {
		var vWidth, vHeight, vOffset, vCSS;
		
		try {
			vCSS = {
				position : 'fixed',
				zIndex : -999999,
				left : 0,
				top : 0
			}
			vWidth = rootElement.width();
			vHeight = vWidth / vidRatio;

			// Make adjustments based on video ratio
			// Note: Offset code provided by Peter Baker (http://ptrbkr.com/). 
			//saw it first time in Scott Robbin's post (http://srobbin.com/blog/jquery-plugins/jquery-backstretch/)
			if(vHeight >= rootElement.height()) {
				vOffset = (vHeight - rootElement.height()) / 2;
				$.extend(vCSS, {
					top : "-" + vOffset + "px"
				});
			} else {
				vHeight = rootElement.height();
				vWidth = vHeight * vidRatio;
				vOffset = (vWidth - rootElement.width()) / 2;
				$.extend(vCSS, {
					left : "-" + vOffset + "px"
				});
			}

			el.width(vWidth).height(vHeight).css(vCSS);
		} catch(err) {
			console.log(err);
		}
	}

})(jQuery, window, document);
