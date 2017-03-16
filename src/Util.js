const WARNING = "WARNING", INFO = "INFO", ERROR = "ERROR";
const VERSION = "1.0.0", VERBOSE = true;

function info(message) {
    if (VERBOSE) {
        log(INFO, message);
    }
}

function warning(message){
    log(WARNING, message);
}

function error(message){
    log(ERROR, message);
}

function log(prefix, message) {
    console.log("FCP v" + VERSION + " " + prefix + " >> " + message);
}

function getSpaces(left) {
    if (left < 1) {
        return "&nbsp;";
    }

    return "&nbsp;" + getSpaces(left - 1);
}