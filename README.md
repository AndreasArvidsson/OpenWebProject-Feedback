# OpenWebProject Feedback

**Feedback notifications**

## Try it
https://andreasarvidsson.github.io/OpenWebProject-Feedback/

## Installation
`npm install owp.feedback --save`

## Usage
```javascript
import Feedback from "owp.feedback";

//Show notification
Feedback.notify("Hello world");

//Or with options
Feedback.notify("Hello altered world", {
    type: "info",
    sticky:false,   
    duration: 1000
});

//Each type has a predefined notification function
Feedback.error("Hello horrible world");
Feedback.success("Hello happy world");
```

## Options
* type: Color/style of the notification
    - Default: `"info"`
    - `"info", "error", "success", "warn",  "grimace",  "neutral"`
* sticky: If true the notification will stay until manually closed
    - Default: `false`
* duration: Duration in milliseconds until notification closes
    - Defualt: `3000`
