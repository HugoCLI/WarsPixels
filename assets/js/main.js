const canvas = document.querySelector('canvas');
const ctx = document.getElementById("canvas").getContext("2d");

let textLang, system, isDrag;
let configs = {};


const audio = {
    bloc_available: doc.first('#bloc_available'),
    bloc_place: doc.first('#bloc_place')
}



function startChrono() {
    if (configs.expires - 1000 > new Date().getTime()) {
        let res = (configs.expires - new Date().getTime()).toString();

        if (res.length === 5) {
            res = res.substring(0, 2);
        } else if (res.length === 4)
            res = "0" + res.substring(0, 1);
        else
            res = "00";


        doc.first('.block_status h3').innerHTML = `0:${res}`;
        setTimeout(() => startChrono(), 500);
    } else {
        doc.first('.block_status h3').innerHTML = textLang.can_place;
        audio.bloc_available.play();
        if (configs.pick && configs.pick.x && configs.pick.y)
            doc.first('.container').classList.add('open-colors');
    }

}

let squares = {};
let bX = 0, bY = 0, zoom = 1;


let pos = {x: null, y: null};
const getCursorPosition = (event) => {
    if (isDrag) return;
    const rect = canvas.getBoundingClientRect();

    let blocX = (event.clientX - rect.left).toString().split("");
    let blocY = (event.clientY - rect.top).toString().split("");

    blocX.pop();
    blocX = parseInt(blocX.join(""));
    if (!blocX) blocX = 0;
    <!-- HugoCLI -->
    blocY.pop();
    blocY = parseInt(blocY.join(""));
    if (!blocY) blocY = 0;


    if (system.restricted.x - 1 < blocX || blocX < 0) return;
    if (system.restricted.y - 1 < blocY || blocY < 0) return;


    /*    document.getElementById('cords').innerText = blocX + ":" + blocY;*/
    doc.first('#pos_cord').innerText = blocX + ":" + blocY;

    if (doc.first('.render .selector').classList.contains('hide')) {
        doc.first('.render .selector').classList.remove('hide');
    }

    /*        divOverlay.style.transform = "translateX("+(blocX)+"0px) translateY("+ blocY+"0px)";*/
    doc.first('.render .selector').style.left = blocX + "0px";
    doc.first('.render .selector').style.top = blocY + "0px";


    configs.pick = {x: blocX, y: blocY};
    if (configs.expires-1000 < new Date().getTime()) {
        doc.first('.container').classList.add('open-colors');
    }
}
canvas.addEventListener('click', (e) => {
    getCursorPosition(e);
});

const blocTraite = (color) => {
    if (configs.pick && configs.pick.x >= 0 && configs.pick.y >= 0 && configs.pick.x <= system.restricted.x && configs.pick.y <= system.restricted.y)
        system.blockRequest(configs.pick, color);

}

const ranked = doc.first('.ranked');
const showRanked = () => {
    if(ranked.classList.contains('display')) ranked.classList.remove('display');
    else ranked.classList.add('display');
}


const interact = () => {

    const mouseElm = doc.first('.render .adjuster');
    mouseElm.onmousedown = function (event) {
        isDrag = true;
        let shiftX = event.clientX - mouseElm.getBoundingClientRect().left;
        let shiftY = event.clientY - mouseElm.getBoundingClientRect().top;

        mouseElm.style.position = 'absolute';
        mouseElm.style.zIndex = 10;

        moveAt(event.pageX, event.pageY);

        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
            mouseElm.style.left = pageX - shiftX + 'px';
            mouseElm.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {

            moveAt(event.pageX, event.pageY);
        }

        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // drop the ball, remove unneeded handlers
        document.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            mouseElm.onmouseup = null;
            isDrag = false;
        };

        mouseElm.ondragstart = () => {
            return false;
        };



    };


}