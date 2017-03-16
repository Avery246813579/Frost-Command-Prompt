var COMMANDS = {
    HTML: {
        DESCRIPTION: "The best language",
        TEXT: "Very nice markup"
    },
    CSS: {
        DESCRIPTION: "A lit language",
        TEXT: "Dogs"
    },
    JAVASCRIPT: {
        DESCRIPTION: "It's alright",
        TEXT: "Cats"
    }
};

if (typeof window.fcp == "undefined") {
    window.fcp = {};
}

function Console() {
    this.cursing = false;
    this.command = "";
    this.commands = {};

    this.addCommand = function (command) {
        this.addCommands([command]);
    };

    this.addCommands = function (commands) {
        if (commands.constructor === Array) {
            for (var i = 0; i < commands.length; i++) {
                var command = commands[i];

                if (command.constructor === Command) {
                    this.initCommand(command);
                } else {
                    warning("Error parsing command " + command.getName());
                }
            }

            return;
        }

        if (commands.constructor === Command) {
            this.initCommand(commands);
            return;
        }

        warning("Error parsing commands");
    };

    this.initCommand = function (command) {
        command.setConsole(this);
        this.commands[command.getName()] = command;
    };

    this.parseCommand = function() {
        this.raw += this.command + "<br>";

        var FOUND = false;
        for (var key in this.commands) {
            if (this.commands.hasOwnProperty(key) && this.command.toUpperCase().trim() == key) {
                if(!this.commands[key].execute()){
                    this.sendLine("Command response not found!");
                }

                FOUND = true;
            }
        }

        if (!FOUND && this.command.trim() != "") {
            this.raw += "'" + this.command.trim() + "' is not recognized as an internal or external command.<br><br>";
        }

        this.raw += 'C:\\Users\\Avery Durrant>';

        this.command = "";
        this.fixCursor();

        document.getElementById(this.id).scrollTop = document.getElementById('console').scrollHeight;
    };

    this.sendLine = function (line) {
        this.raw += line + "<br>";
    };

    this.init = function() {
        for (var key in this.commands) {
            if (this.commands.hasOwnProperty(key)) {
                this.raw += key + getSpaces(20 - key.length) + this.commands[key].getDescription() + "<br>";
            }
        }

        var self = this;
        setInterval(function(){
            self.fixCursor();
        }, 500);

        window.onkeydown = function (e) {
            if (e['key'] == "Backspace") {
                self.command = self.command.substr(0, self.command.length - 1);
                self.fixCursor();
                return;
            }

            if (e['key'] == "Enter") {
                self.parseCommand();
                return;
            }

            if (e['key'].length > 1) {
                return;
            }

            self.command += e['key'];

            self.fixCursor();
        };

        this.parseCommand();
    };

    this.fixCursor = function() {
        if (this.cursing) {
            this.cursing = false;
            this.line.innerHTML = this.raw + this.command;
        } else {
            this.cursing = true;
            this.line.innerHTML = this.raw + this.command + '<span style="font-weight: 900">_</span>';
        }
    };

    (function Constructor(id, commands) {
        if (typeof id == "undefined") {
            error("Could not find console id " + id + "!");
            return;
        }

        var self = this;
        if(typeof commands != "undefined"){
            self.addCommands(commands);
        }

        this.id = id;
        this.line = document.getElementById(id).getElementsByClassName('line')[0];
        this.raw = this.line.innerHTML;

        self.init();
        info("Created Console: " + id);
    }).apply(this, arguments);
}

window.fcp.Console = Console;