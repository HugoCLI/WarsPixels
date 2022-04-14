class api {
    constructor() {
        if (document.querySelectorAll('.maintenance').length > 0) return;
        this.tmpJson = {domain: 'warspixels.com'}
        this.get = {};
        this.maps = {sizeX: 192, sizeY: 192};
        this.createMap(this.maps.sizeX, this.maps.sizeY);
        this.start();

    }

    createMap(sizeX, sizeY) {

        canvas.width = sizeX * 10;
        canvas.height = sizeY * 10;

        /*        let render = `translateX(${(window.innerWidth - sizeX * 10) / 2}px) translateY(${window.innerHeight - (sizeY / 2) * 10}px)`;*/

        this.canvas = {
            position: {
                x: (window.innerWidth - sizeX * 10) / 2,
                y: (window.innerHeight - sizeY * 10) / 2
            }
        };
        /*

                doc.first('.render .adjuster').style.transform = render;*/
        for (let y = 0; y < sizeY; y++) {
            for (let x = 0; x < sizeX; x++) {
                this.blockPlace({pos: {x: x * 10, y: y * 10}, color: '#dedede'}, false);
            }
        }
        /*            document.getElementById('bloc_count').innerText = sizeY * sizeX;*/
        this.restricted = {y: sizeY, x: sizeX};
    }

    async getCountry() {
        if (this.get && this.get.country) return this.get.country;

        doc.first('aside.loader p').innerText = textLang.assign_to_team;
        let response = await fetch('https://ipwhois.app/json/');
        let data = await response.json();


        this.get.country = (data.country_code).toLowerCase();
        return this.get.country;
    }

    async start() {
        new Promise(resolve => setTimeout(resolve, 2000));
        await this.getCountry();
        this.websocket = new WebSocket('wss://warspixels.com/ics');
        doc.first('#loader-status').innerText = "Waiting line";
        this.websocket.addEventListener('open', (event) => this.configs());
        this.websocket.addEventListener('message', (event) => this.onmessage(event.data));
        this.websocket.addEventListener('close', (event) => this.onclose(event));


    }

    onmessage(data) {
        data = JSON.parse(event.data);
        if (!data.response_type) return;
        if (!data.response) return;



        if (data.response_type === 'maintenance' && data.response === true) return this.maintenance(true);
        if (data.response_type === 'maintenance' && data.response === false) return this.maintenance(false)
        if (data.response_type === 'configs') return this.configs(data);
        if (data.response_type === 'configs-bloc') return this.superBlocks(data.response);
        if (data.response_type === 'bloc') return this.block(data.response);
        if (data.response_type === 'stats') return this.ranked(data.response);


        if (data.response_type === 'bypass')
            document.querySelectorAll('.maintenance')[0].remove();
    }

    block(obj) {
        this.blockPlace({pos: {x: obj.pos.x, y: obj.pos.y}, color: obj.color});
    }

    maintenance(mode) {
        if(mode) {
            doc.first('aside.loader').classList.remove('hide');
            doc.first('aside.loader #loader-status').innerText = 'Current maintenance';

            setTimeout(() => {
                let json = this.tmpJson;
                json.token = this.token();
                json.maintenance = "check";
                this.send({json});
            }, 5000)
        } else{
            doc.first('aside.loader').classList.add('hide');
        }
    }

    async queue(obj) {
        console.log(obj);
    }
    async superBlocks(obj) {
        let index = 1;
        let length = Object.keys(obj).length;

        for (const [key, value] of Object.entries(obj)) {

            let prc = 100 / length * index;
            doc.first('aside.loader p').innerText = `${textLang.await_data} (${prc.toFixed(0)}%)`;
            this.blockPlace({pos: {x: value.pos.x, y: value.pos.y}, color: value.color});
            if (Math.ceil(prc) === 100) {
                doc.first('aside.loader').classList.add('hide');
                interact();
            }
            ;
            index += 1;
        }
    }

    async ranked(obj) {
        this.stats('players', obj.online);

        let country = await this.getCountry();

        let div = doc.first('.ranked .list');
        div.innerHTML = "";
        for (const [key, value] of Object.entries(obj.ranked)) {
            if (value.country.code.toLowerCase() === country) {
                this.stats('scores', value.score);
                this.stats('ranks', value.rank);
            }
            if(value.score < 10) return;
            div.innerHTML += `<div class="item"><div>#${value.rank}</div><div>${value.country.name}</div><div>${value.score}</div>`;

        }

    }


    async stats(type, value) {
        let country = await this.getCountry();
        if (type === 'ranks') {
            if (value === 1) doc.first('#ranked_top').innerText = 'first';
            if (value === 2) doc.first('#ranked_top').innerText = 'second';
            else doc.first('#ranked_top').innerText = `#${value}`;
        }
        if (type === 'scores')
            doc.first('#ranked_score').innerText = value;
        if (type === 'players')
            doc.first('#pos_online').innerText = value;

    }

    blockPlace(obj, accutive = true) {
        ctx.fillStyle = obj.color;

        if (accutive) {
            ctx.fillRect(obj.pos.x + "0", obj.pos.y + "0", 10, 10);
        } else {
            ctx.fillRect(obj.pos.x, obj.pos.y, 10, 10);
        }

    }

    async blockRequest(cords, color) {
        let country = await this.getCountry();
        let json = this.tmpJson;
        json.token = this.token();
        json.request = "bloc";
        json.language = country;
        json.pos = {x: cords.x, y: cords.y}
        json.color = color;
        configs.pick = {};
        configs.expires = new Date().getTime() + 59000;
        startChrono();

        audio.bloc_place.play();
        doc.first('.container').classList.remove('open-colors');
        this.send(json);
    }

    send(data) {
        this.websocket.send(JSON.stringify(data));
    }

    onclose(event) {
        doc.first('aside.loader').classList.remove('hide');
        window.focus();
        doc.first('aside.loader #loader-status').innerText = textLang.reboot_system;
        setTimeout(() => {
            window.location = "";
        }, Math.floor(Math.random() * (10 - 5)) + 5 * 1000)
    }

    token() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    async configs(data = null) {
        if (!data) {
            let country = await this.getCountry();
            let json = this.tmpJson;
            json.language = country;
            json.host = SRV_HOST;
            json.request = "configs";
            json.token = this.token();
            this.send(json);
        } else {
            console.log(data.response.nextBloc);
            configs.expires = new Date().getTime() + (data.response.nextBloc);
            if (configs.expires - new Date().getTime() > 0) startChrono();
            else doc.first('.block_status h3').innerHTML = "Place!";

        }
    }

}

