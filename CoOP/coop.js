/**
* CoOP Desktop notification - Google chrome extension
* @Author Shidhin C R
* @Version 0.0.1
*/
(function(unreadCountObj,window){

	// copy the original updateUnreadCount function to a variable
	var origUpdUnRdCnt = unreadCountObj.updateUnreadCount;
	// request the notification permission --  this is not required because the extension will have the access.
	//if (window.webkitNotifications.checkPermission() != 0){ window.webkitNotifications.requestPermission() }

	window.unreadCount.updateUnreadCount = function(){
		var elementId = ''; 
		if($('note_' + unreadCountObj.mostRecentlyViewedId) || $('day_entry_' + unreadCountObj.mostRecentlyViewedId)) { 
			$$('.entry').each(function(element) { 
				elementId = this._getIdFromEntryElement(element);
				if(elementId == this.mostRecentlyViewedId) throw $break; 
				if(this._current_user_entry(element)) return;				
				var icon = $('note_'+elementId ).select(".favicon img")[0].getAttribute("src")
				,name = $('note_'+elementId ).select(".user_name_text")[0].innerHTML
				,content = $('note_'+elementId ).select("#display_text_note_"+elementId)[0].innerHTML +
				'    ( ' +  $('note_'+elementId ).select(".user_name .meta")[0].innerHTML + ' )' 
				,n = window.webkitNotifications.createNotification(icon, name, content);
				n.show();
				//setTimeout( function() { n.cancel() }, 10000 );
			}.bind(unreadCountObj));
		}
		origUpdUnRdCnt.apply(this,arguments)
	};

}(unreadCount,window));