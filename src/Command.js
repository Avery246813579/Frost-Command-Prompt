if (typeof window.fcp == "undefined") {
    window.fcp = {};
}

function Command() {
    this.execute = function (parameters) {
        if (typeof this.fun == "function") {
            this.fun(this.console, parameters);

            return true;
        }

        if (typeof this.fun != "undefined") {
            this.console.sendLine(this.fun);

            return true;
        }

        return false;
    };

    this.getName = function () {
        return this.name;
    };

    this.getDescription = function () {
        return this.description;
    };

    this.setConsole = function (console) {
        this.console = console;
    };

    (function Constructor(name, description, func) {
        if (typeof name == "undefined") {
            warning("Could not find name while creating command " + name + "!");
            return;
        }

        this.name = name;
        if (typeof description == "undefined") {
            warning("Could not find description while creating command " + name + "!");
            return;
        }

        this.description = description;
        if (typeof func != "undefined") {
            this.fun = func;
        }

        info("Created command: " + name);
    }).apply(this, arguments);
}

window.fcp.Command = Command;
