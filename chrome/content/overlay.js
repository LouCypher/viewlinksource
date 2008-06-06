function viewLinkSource(aEvent) {
  var url = gContextMenu.linkURL;
  if(aEvent) {
    aEvent.stopPropagation();
    switch(aEvent.button) {
      case 1: //middle click
        if(nsPreferences.getBoolPref("view_source.tabs.loadInNewTab")) {
          var newTab = gBrowser.addTab("view-source:" + url); //view source in new tab
          if(!nsPreferences.getBoolPref("view_source.tabs.loadInBackground"))
            gBrowser.selectedTab = newTab;  //focus new tab
        } else loadURI("view-source:" + url);   //view source in current tab
        break;
      case 2: //right click
        openWebPanel(url, "view-source:" + url); //view source in sidebar
        break;
    }
    closeMenus(aEvent.target);
  } else {
    if(typeof gViewSourceUtils == 'object') //if Firefox 2.0
      ViewSourceOfURL(url);
    else
      BrowserViewSourceOfURL(url);
  }
}

function viewLinkSourceItem() {
  var schemes = "https?|ftp|file|data|resource|chrome|about|jar";
  var regScheme = new RegExp(schemes, "i");
  var isLinkViewable = regScheme.test(gContextMenu.linkProtocol);
  gContextMenu.showItem("context-viewlinksource", gContextMenu.onLink && isLinkViewable);
}

function viewLinkSourceInit() {
  var cm = document.getElementById("contentAreaContextMenu");
  cm.addEventListener("popupshowing", viewLinkSourceItem, false);
}

window.addEventListener("load", viewLinkSourceInit, false);

