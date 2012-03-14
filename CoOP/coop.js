/**
* CoOP Desktop notification - Google chrome extension
* @Author Shidhin C R
* @Version 0.0.1
*/
var _$main$ = function(){

	// request the notification permission
	if (window.webkitNotifications.checkPermission() != 0){

		var _link = document.createElement("a");
		_link.innerHTML = "Enable desktop notifications";
		_link.id = "_$link$_"
		_link.href = "#";
		var _bar  = document.createTextNode();
		_bar.innerHTML = " |        ";
		var _container = document.getElementById("controls");
		if(!_container) return;
		_link.setAttribute("onClick","javascript:window.webkitNotifications.requestPermission(_$final$);return false;");
		_container.insertBefore(_link,_container.firstChild);
		_container.insertBefore(_bar,_container.firstChild);
	}else{
		_$final$();
	}
};
function _$final$(){
	// copy the original updateUnreadCount function to a variable
	var unreadCountObj = window.unreadCount;
	var origUpdUnRdCnt = window.unreadCount.updateUnreadCount;
	var lstNotified = '';
	//remove the link for desktop notification
	if(document.getElementById("_$link$_")){
		document.body.removeChild( document.getElementById("_$link$_") );
	}
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
if (!document.xmlVersion) {
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ _$main$ +')();'));
	script.appendChild(document.createTextNode( _$final$ ));
	document.documentElement.appendChild(script);
}