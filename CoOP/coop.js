/**
* CoOP Desktop notification - Google chrome extension
* @Author Shidhin C R
* @Version 0.0.1
*/
var _$main$ = function(){

	// request the notification permission --  this is not required because the extension will have the access.
	if (window.webkitNotifications.checkPermission() != 0){ 
		window.webkitNotifications.requestPermission( final );
	}else{
		final();
	}
	function final(){
		// copy the original updateUnreadCount function to a variable
		var unreadCountObj = window.unreadCount;
		var origUpdUnRdCnt = window.unreadCount.updateUnreadCount;
		var lstNotified = '';
		window.unreadCount.updateUnreadCount = function(){
			var elementId = ''; 
			if($('note_' + unreadCountObj.mostRecentlyViewedId) || $('day_entry_' + unreadCountObj.mostRecentlyViewedId)) { 
				$$('.entry').each(function(element) { 
					elementId = this._getIdFromEntryElement(element);
					if(elementId !== this.mostRecentlyViewedId && !this._current_user_entry(element) && elementId > lstNotified) {								
						var _icon = $('note_'+elementId ).select(".favicon img")[0].getAttribute("src"),
						_name = $('note_'+elementId ).select(".user_name_text")[0].innerHTML,
						_content = $('note_'+elementId ).select("#display_text_note_"+elementId)[0].innerHTML +
						'    ( ' +  $('note_'+elementId ).select(".user_name .meta")[0].innerHTML + ' )';
						var n = window.webkitNotifications.createNotification(_icon, _name, _content);
						n.show();
						lstNotified = elementId;
					}
					//setTimeout( function() { n.cancel() }, 10000 );
				}.bind(unreadCountObj));
			}
			// give the control back to the actual function
			origUpdUnRdCnt.apply(this,arguments)
		};
	}

};

if (!document.xmlVersion) {
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ _$main$ +')();'));
	document.documentElement.appendChild(script);
}