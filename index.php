<?php

$langSelect = 'en';
$langs = array(
    'FR' => 'FR',
    'EN' => "EN",
    'DE' => 'DE',
    'CA' => 'EN',
    'BE' => 'FR'
);

$subdomain = "en";
$lg = strtoupper(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2));

if (isset($_SERVER['HTTP_HOST'], $_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
    if (isset($langs[strtoupper(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2))])) {

        $langSelect = strtolower($langs[$lg]);


        if ($_SERVER['HTTP_HOST'] === "warspixels.com" || $_SERVER['HTTP_HOST'] === "www.warspixels.com") {
            header('Location: https://' . $langSelect . '.warspixels.com');
        } else {
            $subavailable = $langSelect;

            $subdomain = explode('.', $_SERVER['HTTP_HOST'])[0];
        }
    }
}
if (is_file('app/' . strtolower($subdomain) . '.json')) {
    $meta = file_get_contents('app/' . strtolower($subdomain) . '.json');
    $meta = json_decode($meta, true);
}

?>
<!doctype html>
<html lang="<?= $langSelect ?>" xml:lang="<?= $langSelect ?>" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta name="theme-color" content="dark">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="alternate" hreflang="fr" href="https://fr.warspixels.com"/>
    <link rel="alternate" hreflang="en" href="https://en.warspixels.com"/>
    <link rel="alternate" hreflang="de" href="https://de.warspixels.com"/>

    <title>WarsPixels - <?= $meta['welcome'] ?></title>
    <meta name="description" content="<?= $meta['description'] ?>">
    <meta name="author" content="Hugo Chilemme">

    <meta content="NOFOLLOW, NOARCHIVE" name="robots">
    <meta property="og:title" content="WarsPixels - <?= $meta['welcome'] ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://warspixels.com">
    <meta property="og:description" content="<?= $meta['description'] ?>">
    <meta http-equiv="Cache-control" content="max-age=0">

    <link rel="icon" href="/assets/images/logo.ico">
    <link rel="icon" href="/assets/images/logo.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/assets/images/logo.png">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&display=swap" rel="stylesheet">

    <link rel="stylesheet"
          href="/assets/css/style.css?v=<?= filemtime('/apps/website/warspixels.com/assets/css/style.css') ?>">
    <script>const ACCEPT_LANG = "<?= $langSelect; ?>";
        const SRV_HOST = "<?= $_SERVER['HTTP_HOST'] ?>"; SUB_HOST = "<?= $subavailable ?>"; </script>

    <!-- Google Tag Manager -->
    <script>(function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-TJ39NNP');</script>
    <!-- End Google Tag Manager -->
</head>
<body>
<aside class="loader">
    <h1>WarsPixels
        <thin>.com</thin>
    </h1>
    <h2 text="welcome">Which country will win this war?</h2>
    <div class="bottom">
        <svg viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20"></circle>
        </svg>
        <p id="loader-status" text="detecting_language">Detecting language</p>
    </div>
</aside>
<main>

    <div class="container">
        <div class="ranked">
            <div class="displayed" onclick="showRanked()">
                <div>
                    <h4 text="country_ranking">Ranking of your country</h4>
                    <h3 text="country_ranking_subtitle">You are
                        <r id="ranked_top">not ranked</r>
                        with
                        <r id="ranked_score">0</r>
                        blocks
                    </h3>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                    </svg>
                </div>
            </div>
            <div class="list">
                <div class="item">
                </div>
            </div>
        </div>
        <div class="block_status">
            <h4 text="next_block">Your next block</h4>
            <h3>0</h3>
        </div>
        <div class="colors">
            <div class="actionbar">

                <div class="close" onclick="doc.first('.container').classList.remove('open-colors');">
                    <div class="hoverable">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor"
                             stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </div>
                </div>
                <div>
                    <p text="chose_color">Choose the color to place</p>
                </div>

            </div>
            <div class="palette">
                <div class="color" style="background:#EA3426" color="EA3426"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#FF5733" color="FF5733"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#ec24d4" color="ec24d4"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#b44ac0" color="b44ac0"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#811e9f" color="811e9f"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#7eed56" color="7eed56"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#00cc78" color="00cc78"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#00a368" color="00a368"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#26D2EA" color="26D2EA"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#2673EA" color="2673EA"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#2629EA" color="2629EA"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#0C0A3E" color="0C0A3E"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#202020" color="202020"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#404040" color="404040"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#959595" color="959595"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#dedede" color="dedede"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#DEEA26" color="DEEA26"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#ffa800" color="ffa800"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#9c6926" color="9c6926"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
                <div class="color" style="background:#6d482f" color="6d482f"
                     onclick="blocTraite(this.getAttribute('color'))"></div>
            </div>
        </div>
    </div>
    <section class="render">
        <div class="enlarge" >
            <div class="adjuster">
                <div class="selector hide"></div>
                <canvas id="canvas"></canvas>
            </div>
        </div>
    </section>
    <div class="pos">
        <!--x: <data x-pos></data> y: <data y-pos></data>-->
        <text text="online"></text>
        :
        <r id="pos_online">0</r>
        <text text="cords"></text>
        :
        <r id="pos_cord">Place!</r>
    </div>
</main>
<audio id="bloc_place" class="hide">
    <source src="/assets/audios/valid_place.wav">
</audio>
<audio id="bloc_available" class="hide">
    <source src="/assets/audios/bloc_available.wav">
</audio>

<script src="/assets/js/modules/doc.js?v=<?= filemtime('/apps/website/warspixels.com/assets/js/modules/doc.js') ?>"></script>
<script src="/assets/js/main.js?v=<?= filemtime('/apps/website/warspixels.com/assets/js/main.js') ?>"></script>
<script src="/assets/js/websocket.js?v=<?= filemtime('/apps/website/warspixels.com/assets/js/websocket.js') ?>"></script>
<script src="/assets/js/modules/lang.js?v=<?= filemtime('/apps/website/warspixels.com/assets/js/modules/lang.js') ?>"></script>
<!-- Google Tag Manager (noscript) -->
<noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TJ39NNP" height="0" width="0"
            style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->
</body>
</html>