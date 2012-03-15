/**
* Co-op Desktop notification - Google chrome extension
* @Author Shidhin C R
* @Version 0.0.1
*
* Requires prototype.js library
*
*/
var _$main$ = function(){

	// request the notification permission
	if (window.webkitNotifications.checkPermission() != 0){
		var _link = document.createElement("a");
		_link.innerHTML = "Enable desktop notifications";
		_link.id = "_$link$_";
		_link.href = "#";
		var _bar  = document.createTextNode(" |        ");
		var _container = document.getElementById("controls");
		if(!_container){return;}
		_link.setAttribute("onClick","javascript:window.webkitNotifications.requestPermission(_$final$);return false;");
		_container.insertBefore(_bar,_container.firstChild);
		_container.insertBefore(_link,_container.firstChild);
	}else{
		_$final$();
	}
};
function _$final$(){
	// copy the original updateUnreadCount function to a variable
	var unreadCountObj = window.unreadCount;
	var origUpdUnRdCnt = window.unreadCount.updateUnreadCount;
	//keep notified ids
	unreadCountObj.notifiedIds = [];
	//remove the link for desktop notification
	if(document.getElementById("_$link$_") && document.getElementById("controls")){
		var _container = document.getElementById("controls");
		_container.removeChild( document.getElementById("_$link$_") );
	}
	window.unreadCount.updateUnreadCount = function(){
		var elementId = ''; 
		if($('note_' + unreadCountObj.mostRecentlyViewedId) || $('day_entry_' + unreadCountObj.mostRecentlyViewedId)) { 
			$$('.entry').each(function(element) { 
				elementId = this._getIdFromEntryElement(element);
				if(elementId == this.mostRecentlyViewedId){
					throw $break;
				}
				if(!this._current_user_entry(element) && this.notifiedIds.indexOf(elementId)==-1) {								
					var _icon = $('note_'+elementId ).select(".favicon img")[0].getAttribute("src"),
					_name = $('note_'+elementId ).select(".user_name_text")[0].innerHTML,
					_content = $('note_'+elementId ).select("#display_text_note_"+elementId)[0].innerHTML +
					'    ( ' +  $('note_'+elementId ).select(".user_name .meta")[0].innerHTML + ' )';
					var n = window.webkitNotifications.createNotification(_icon, _name, _content);
					n.show();
					this.notifiedIds.push( elementId );
				}
				//setTimeout( function() { n.cancel() }, 10000 );
			}.bind(unreadCountObj));
		}
		// give the control back to the actual function
		origUpdUnRdCnt.apply(this,arguments);
	};
}
if (!document.xmlVersion) {
	var addScript = document.createElement('script');
	addScript.setAttribute("type","text/javascript");
	addScript.setAttribute("charset","UTF-8");
	addScript.appendChild(document.createTextNode('('+ _$main$ +')();'));
	addScript.appendChild(document.createTextNode( _$final$ ));
	var h = document.getElementsByTagName("head")[0] ||  document.body ||document.documentElement;
	h.appendChild(addScript);
}