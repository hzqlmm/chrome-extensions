var background = chrome.extension.getBackgroundPage(), VERSION = 1.8;
function welcome_init() {
    if (!localStorage.welcomeshown && !localStorage.updateread)document.getElementById("welcome").innerHTML = "<div style='height: 13px;'></div>" + chrome.i18n.getMessage("welcomeMessage") + " - <b>Click here to begin!</b>", document.getElementById("welcome").style.display = "block"
}
function welcome_dismiss() {
    localStorage.setItem("welcomeshown", "true");
    localStorage.setItem("updateread", VERSION);
    window.open("http://blog.visibotech.com/2010/09/thank-you-for-installing-wikipedia.html");
    window.close()
}
function update_init() {
    if (localStorage.welcomeshown && (!localStorage.updateread || localStorage.updateread < VERSION))document.getElementById("update").innerHTML = chrome.i18n.getMessage("updateMessage", [VERSION]), document.body.setAttribute("updated", "true")
}
function update_dismiss() {
    localStorage.welcomeshown = !0;
    localStorage.updateread = VERSION;
    window.open("http://blog.visibotech.com/search/label/WikipediaCompanion");
    window.close()
}
function init() {
    document.getElementById("searchbutton").title = chrome.i18n.getMessage("search");
    document.getElementById("language").innerHTML = chrome.i18n.getMessage("language");
    document.getElementById("openInTab").innerHTML = chrome.i18n.getMessage("openInTab");
    document.getElementById("options").innerHTML = chrome.i18n.getMessage("options");
    resizePage();
    checkForRefresh();
    document.getElementById("searchbox").focus();
    checkLang();
    updateButtonState();
    $("#wikipage").load(function () {
        for (var a = $("#wikipage").contents().find("a"), b = 0; b < a.length; b++) {
            var c = $(a[b]);
            c.attr("href").indexOf("#") == 0 ? c.attr("skip", "") : (c.attr("title", c.attr("href")), c.attr("href", "#"), c.mouseup(function (a) {
                return goAnotherPage(a)
            }))
        }
    })
}
function goAnotherPage(a) {
    if (a.currentTarget.title.indexOf("http://") == 0 || a.currentTarget.title.indexOf("https://") == 0)window.open(a.currentTarget.title, "_blank"); else if (a.currentTarget.title.indexOf("//") == 0) {
        var b = "http:" + a.currentTarget.title;
        window.open(b, "_blank")
    } else b = a.currentTarget.title, a.button == 1 ? window.open("http://" + background.getCurrentLang() + ".wikipedia.org" + b, "_blank") : (b = b.replace(/^(\/zh.*?\/)/i, "/wiki/"), background.handleLink(decodeURIComponent(b)));
    return!1
}
function resizePage() {
    document.body.style.width = localStorage.pageWidth;
    document.getElementById("wikipage").style.width = localStorage.pageWidth
}
function checkForRefresh() {
    if (localStorage.refresh && localStorage.refresh == "true")document.getElementById("wikipage").src = "./content.html", localStorage.refresh = "false";
    setTimeout(function () {
        checkForRefresh()
    }, 100);
    updateButtonState()
}
function doSearch() {
    var a = document.getElementById("searchbox");
    background.handleLink("/wiki/" + a.value);
    updateButtonState()
}
function moveInHistory(a) {
    if (!(background.currentHistoryPosition + a < 0) && !(background.currentHistoryPosition + a >= background.wikihistory.length))background.currentHistoryPosition += a, localStorage.refresh = "true", updateButtonState()
}
function clearHistory() {
    background.wikihistory = [];
    background.wikicache = {};
    background.currentHistoryPosition = 0;
    updateButtonState()
}
function openInNewTab() {
    var a = getRegularWikiURL();
    a != !1 && (window.open(a, "_blank"), window.close())
}
function openOptions() {
    window.open("options.html");
    window.close()
}
function getRegularWikiURL() {
    if (background.wikihistory[background.currentHistoryPosition] == null)return!1;
    var a = background.wikihistory[background.currentHistoryPosition].url;
    try {
        return a = wikipage.document.querySelector(".searchresults") ? a.replace(".m.wikipedia.org/wiki/", ".wikipedia.org/w/index.php?title=Special:Search&search=") : a.replace(".m.wikipedia.org", ".wikipedia.org")
    } catch (b) {
        return!1
    }
}
function getCurrentWikiPageLang() {
    if (background.wikihistory[background.currentHistoryPosition] == null)return"";
    return background.wikihistory[background.currentHistoryPosition].lang
}
function getCurrentWikiPageTitle() {
    if (background.wikihistory[background.currentHistoryPosition] == null)return"";
    return background.wikihistory[background.currentHistoryPosition].title
}
function toggleLang() {
    background.toggleLang();
    background.checkLang().state == 0 ? (document.getElementById("primaryLang").style.fontWeight = "bold", document.getElementById("secondaryLang").style.fontWeight = "") : (document.getElementById("primaryLang").style.fontWeight = "", document.getElementById("secondaryLang").style.fontWeight = "bold");
    loadLangURL()
}
function checkLang() {
    var a = background.checkLang(), b = document.getElementById("language");
    a.secondaryLang ? (b.style.display = "", b.innerHTML = "<span id='primaryLang'>" + a.primaryLang + "</span> | <span id='secondaryLang'>" + a.secondaryLang + "</span>", a.state == 0 ? (document.getElementById("primaryLang").style.fontWeight = "bold", document.getElementById("secondaryLang").style.fontWeight = "") : (document.getElementById("primaryLang").style.fontWeight = "", document.getElementById("secondaryLang").style.fontWeight = "bold")) :
        b.style.display = "none"
}
function updateButtonState() {
    document.getElementById("clearhistorybutton").setAttribute("disabled", background.wikihistory.length <= 1);
    document.getElementById("backbutton").setAttribute("disabled", background.currentHistoryPosition >= background.wikihistory.length - 1);
    document.getElementById("forwardbutton").setAttribute("disabled", background.currentHistoryPosition <= 0)
}
function loadLangURL() {
    document.getElementById("wikipage").src = "./loading.html";
    var a = background.getCurrentLang(), b = getRegularWikiURL();
    if (b == !1)localStorage.refresh = "true"; else {
        var c = new XMLHttpRequest;
        c.open("GET", b, !0);
        c.onreadystatechange = function () {
            if (c.readyState == 4) {
                var b = c.responseText;
                b != "" && (b = RegExp('<li class="interwiki-' + a + '"><a href="http.+wikipedia.org(.+)">', "gi").exec(b), b != null && b.length > 1 ? background.handleLink(b[1]) : (console.log("No wikipedia page in this language..."), background.wikihistory[background.currentHistoryPosition] !=
                    null && (b = background.wikihistory[background.currentHistoryPosition].url.replace(/^.+(\/wiki\/.+)/, "$1"), console.log(b), background.handleLink(b))))
            }
        };
        c.send()
    }
}
;
