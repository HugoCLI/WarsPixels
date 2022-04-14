class Lang {
    constructor() {
        if (!ACCEPT_LANG) return this.onready();
        this.lang = ACCEPT_LANG;

        if(SRV_HOST !== "warspixels.com" && SRV_HOST !== "www.warspixels.com") {
            if (SUB_HOST + ".warspixels.com" !== SRV_HOST)
                window.location = "https://" + SUB_HOST + ".warspixels.com";
        }

        this.load();
    }

    async load() {
        console.log(this.lang.toLowerCase());
        let response = await fetch('https://warspixels.com/app/' + this.lang.toLowerCase() + '.json');
        let data = await response.json();
        textLang = data;
        for (const [key, value] of Object.entries(data)) {
            if (doc.all(`[text="${key}"]`).length > 0) {
                doc.all(`[text="${key}"]`).forEach((text) => {
                    let msg = value;
                    if (key === 'country_ranking_subtitle') {
                        msg = msg.replace("%rank%", '<r id="ranked_top">not ranked</r>');
                        msg = msg.replace("%score%", '<r id="ranked_score">0</r>');
                    }
                    text.innerHTML = msg;
                })

            }
        }
        document.title = "WarsPixels - "+textLang.welcome;
        this.onready();
    }

    onready() {
        doc.first('#loader-status').innerText = textLang.connection;
        system = new api();

    }

}

const lang = new Lang();

