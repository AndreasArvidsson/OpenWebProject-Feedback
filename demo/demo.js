import Feedback from "../index.js";

console.log("test.js")

const types = [
    "info",
    "success",
    "grimace",
    "neutral",
    "warn",
    "error"
];

let i = -1;

function next() {
    ++i;

    if (i == types.length) {
        Feedback.load();
        i = -1;
    }
    else {
        const type = types[i];
        const func = Feedback[type];
        func(type);
    }

    setTimeout(next, 3000);
}

next();