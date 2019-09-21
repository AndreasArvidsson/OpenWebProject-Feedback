/**
 * @author Andreas Arvidsson
 * https://github.com/AndreasArvidsson/OpenWebProject-Feedback
 */
import "./feedback.css";

const defaults = {
    type: "info",
    sticky: false,
    duration: 3000
};

const types = {
    "info": "fdb-info",
    "error": "fdb-error",
    "success": "fdb-success",
    "warn": "fdb-warn",
    "grimace": "fdb-grimace",
    "neutral": "fdb-neutral"
};

let timeoutAutoDismiss;
let timeoutDismiss;
let feedbackClass;
let isLoading;

const fdb = document.createElement("div");
fdb.className = "fdb";
fdb.addEventListener("click", function () {
    if (!isLoading) {
        dismiss();
    }
});

const fdbInner = document.createElement("div");
fdb.appendChild(fdbInner);

const fdbMessage = document.createElement("span");
fdbMessage.className = "fdb-message";
fdbInner.appendChild(fdbMessage);

const fdbSpinner = document.createElement("span");
fdbSpinner.className = "fdb-spinner";
fdbInner.appendChild(fdbSpinner);

function setMessage(message) {
    fdbMessage.innerHTML = message;
}

function setFeedbackClass(className) {
    feedbackClass = className
    fdbInner.className = "fdb-inner " + className;
}

function setIsActive(isActive) {
    if (isActive) {
        fdb.style.display = "block";
    }
    else {
        fdb.style.display = "none";
    }
}

function setIsLoading(loading) {
    isLoading = loading;
    if (loading) {
        fdbSpinner.style.display = "block";
    }
    else {
        fdbSpinner.style.display = "none";
    }
}

setIsActive(false);
document.body.appendChild(fdb);

function reset() {
    setIsActive(false);
    setIsLoading(false);
    setMessage("");
    setFeedbackClass("");
}

function dismiss() {
    if (isLoading) {
        setFeedbackClass(feedbackClass + " fdb-unloading");
    }
    else {
        setFeedbackClass(feedbackClass + " fdb-contract");
    }
    timeoutDismiss = setTimeout(reset, 500);
}

const Feedback = {

    config: function (params) {
        params = params || {};
        Object.assign(defaults, params);
    },

    notify: function (message, userOpt) {
        if (!message) {
            return;
        }

        clearTimeout(timeoutAutoDismiss);
        clearTimeout(timeoutDismiss);

        const options = {};

        if (typeof userOpt === "object") {
            Object.assign(options, defaults, userOpt);
        }
        else {
            Object.assign(options, defaults);
            //Special case for when user options is just a class name string.
            if (userOpt && types[userOpt]) {
                options.type = userOpt;
            }
        }

        setMessage(message);
        setFeedbackClass(types[options.type] + " fdb-expand");
        setIsLoading(false);
        setIsActive(true);

        if (!options.sticky) {
            timeoutAutoDismiss = setTimeout(dismiss, options.duration);
        }
    },

    load: function () {
        clearTimeout(timeoutAutoDismiss);
        clearTimeout(timeoutDismiss);

        setMessage("");
        setFeedbackClass(types.neutral + " fdb-loading");
        setIsLoading(true);
        setIsActive(true);
    },

    dismiss: dismiss

};

for (let type in types) {
    Feedback[type] = function(message, userOpt) {
        this.notify(message, {...userOpt, type: type});
    }
}

export default Feedback;