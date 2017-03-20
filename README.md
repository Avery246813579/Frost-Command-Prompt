# Frost Command Prompt (FCP)

A fake command prompt for a website. 

## Installation 

Download [the project](https://github.com/Avery246813579/Frost-Command-Prompt/releases) and place it into your project. Then in your html code add the following inside your head
```html
<link type="text/css" rel="stylesheet" href="path/to/FCP.min.css">
```

then add the following right before the closing body tag
```html
<script src="path/to/FCP.min.js"></script>
```

## Usage

To create a fake command prompt, we first have to add the html for it. 
```html
<div id="console">
    <div class="line">
        Frost Command Prompt [Version 1.0.0]<br><br>Command Prompt Commands:<br>
    </div>
</div>
```

After we have the html, we can initialize the console. You need to do this in a script tag after you call the FrostCommandPrompt.min.js script.
```
new Console('console', 'C://Frost Command Prompt>', [
    new Command('TEST_COMMAND', 'Does stuff', function (console) {
        console.sendLine('Test 123');
    }),
    new Command('DOGS', "GETS A DOG", function (console) {
        console.sendLine('DOG');
    })
]);
```

The first parameter of the Console constructor is the console id in the html. The second parameter is the command list. 


For Command's the first parameter is the name, the second parameter is the description and the this is what we want the command to do. If we want the command to display text to the console we use the console.sendLine method. 


If you don't want the console to display the command descriptions on the page load, add the commands after the constructor using the addCommands function. [Check out an example](examples/nodescription/index.html).

If you want more help, visit the [example page](examples/README.md). 

## Todo
- Yes or No commands
- Clearing console
- Command Arguments
- Holding the next command input
- Change not found command
- Saving past commands in localStorage
- Stop HTML injection
- Have live examples for the examples
- Add command aliases 