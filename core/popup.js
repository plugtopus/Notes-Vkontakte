var dwnl_id = 0;

var dwnl_timer = null;


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) 
{
		chrome.tabs.getSelected(null, function(tab) 
		{
			var url = tab.url.substr(0, 22);
			if (  parseInt(url.indexOf("vk.com")) >1)
			{
			chrome.tabs.executeScript(tab.id, {file: "content.js"});
			}
		});
});



chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) 
{
		chrome.tabs.getSelected(null, function(tab)  
		{
			var url = tab.url.substr(0, 22);
			if (  parseInt(url.indexOf("vk.com")) >1)
			{
			chrome.tabs.executeScript(tab.id, {file: "content.js"});
			}
		});
});

chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
        chrome.tabs.create({
            url: 'https://sites.google.com/view/promo-extensions-welcome'
        });
    }
});

chrome.runtime.setUninstallURL("https://sites.google.com/view/promo-extensions-bbye");

