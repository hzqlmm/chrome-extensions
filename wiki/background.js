// chrome.browserAction.onClicked.addListener(function (tab) {
// });

// chrome.webRequest.onBeforeRequest.addListener(
//     function (details) {
//         chrome.tabs.sendRequest(details.tabId, {tabId:details.tabId}, function (response) {
//         });
//         return {redirectUrl:chrome.extension.getURL("background_page.html")};
//     },
//     {
//         types:["main_frame"],
//         urls:["*://*/*"]
//     },
//     ["blocking"]);

// chrome.tabs.onUpdated.addListener(function (tabId, props) {
//     chrome.tabs.sendRequest(tabId, {html:"good"});
// });
//
//chrome.extension.onRequest.addListener(function (request) {
//});
//
//chrome.tabs.getSelected(null, function (tab) {
//    updateAddress(tab.id);
//});
//
//function updateAddress(tabId) {
//}

// chrome.tabs.query({status:"complete", url:"http://www.xiami.com/artist/10702"}, function (tabs) {
//     for (var i = tabs.length - 1; i >= 0; i--) {
//         chrome.tabs.update(tabs[i].id, {active:true}, function (tab) {
//             console.log(tab);
//         });
//     }
// })


