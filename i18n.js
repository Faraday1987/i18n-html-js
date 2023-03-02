/**List of languajes in Enumerator Object expandit as you want*/
const LANG = { ES: 0, EN: 1, PT: 2, IT: 3 };

let xmlfile = new XMLHttpRequest();
xmlfile.open("GET", "./i18n.xml", false);
xmlfile.send();
let xml = xmlfile.responseXML;
let languages;

loadLanguage = () => {
    /**
     * Here load the root of your xml languages
     */
    languages = xml.getElementsByTagName("language");
    return languages;
}

setLanguageSelected = (selectLang) => {
    let selected = selectLang ? selectLang : LANG.ES;
    let currentTagNames = document.querySelectorAll(`[data-i18n]`);
    currentTagNames.forEach(function (tag) {
        const key = tag.dataset.i18n;
        try {
            let langs = loadLanguage(selectLang);
            tag.innerText = langs[selected].getElementsByTagName(key)[0].textContent;
        } catch (e) {
            /**Here you can logs errors in your tags xml */
            console.log(e)
         }
    });

    /**Your selector input in html */
    let selectLanguage = document.getElementById("change-language");
    selectLanguage.value = selectLang;
}

changeLanguage = () => {
    let selectLanguage = document.getElementById("change-language");
    let selectLang = selectLanguage.options[selectLanguage.selectedIndex].value;

    setLanguageSelected(selectLang);
}

getCurrentLanguage = () => {
    /**
     * Here set up the default language from list
     * TODO: Detection languaje from browser
     * Save default langage in local storage
     * load from local storage....
     */
    const localLang = LANG.EN;

    return localLang;
}

/**Function to chnague language from select input*/
document.getElementById("change-language").addEventListener("change", function (e) {
    changeLanguage();
});

try {
    setLanguageSelected(parseInt(getCurrentLanguage()));
}
catch (e) { 
    /**
     * Here log errors
     */
    console.log(e)
}



