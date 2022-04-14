class Doc {
    id = (id) => {
        return document.querySelectorAll(`#${id}`)[0];
    }
    all = (selector) => {
        return document.querySelectorAll(selector);
    }
    first = (selector) => {
        return document.querySelectorAll(selector)[0];
    }
}
const doc = new Doc();