if (typeof window.fcp == "undefined") {
    window.fcp = {};
}

function Console() {
    this.cursing = false;
    this.mobile = false;
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

        console.dir(commands);
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

        this.raw += this.name;

        this.command = "";
        this.fixCursor();

        document.getElementById(this.id).scrollTop = document.getElementById('console').scrollHeight;
    };

    this.sendLine = function (line) {
        this.raw += line + "<br>";
    };

    this.init = function() {
        this.sendDescription();

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

        self.fixCursor();
        if(self.isMobile()){
            this.mobile = true;

            this.line.onclick = function(){
                var INPUT = document.getElementById('INPUT');

                INPUT.focus();
            }
        }

        this.parseCommand();
    };

    this.sendDescription = function(){
        for (var key in this.commands) {
            if (this.commands.hasOwnProperty(key)) {
                this.raw += key + getSpaces(20 - key.length) + this.commands[key].getDescription() + "<br>";
            }
        }
    };

    this.fixCursor = function() {
        if (this.cursing) {
            this.cursing = false;
            this.line.innerHTML = this.raw + this.command;

            if(this.mobile){
                this.line.innerHTML += '<input type="text" id="INPUT" style="width: 100%; height: 50px; visibility:hidden">'
            }
        } else {
            this.cursing = true;
            this.line.innerHTML = this.raw + this.command + '<span style="font-weight: 900">_</span>';

            if(this.mobile){
                this.line.innerHTML += '<input type="text" id="INPUT" style="width: 100%; height: 50px; visibility:hidden">'
            }
        }
    };

    this.isMobile = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    (function Constructor(id, name, commands) {
        if (typeof id == "undefined") {
            error("Could not find console id " + id + "!");
            return;
        }

        if(typeof name == "undefined"){
            this.name = "C:\\Frost Command Prompt>";
        }else{
            this.name = name;
        }

        var self = this;
        if(typeof commands != "undefined"){
            self.addCommands(commands);
        }

        this.id = id;
        this.console = document.getElementById(id);
        this.line = this.console.getElementsByClassName('line')[0];

        if(this.line == "undefined"){
            console.createElement('div').classList.add('line');
        }

        this.raw = this.line.innerHTML;

        self.init();
        info("Created Console: " + id);
    }).apply(this, arguments);
}

window.fcp.Console = Console;