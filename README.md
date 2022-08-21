# Tic-Tac-Toe-Web
Famous Tic-Tac-Toe game, multiplayer version.

## About this project

I had some free time so I decided to practice my new skills (html, css, js: node, express, websocket).
	
## How to run this application

Source point: _server.js_\
Requirements: _node.js_ (my version is: _v16.16.0_)

Steps:
* Download/clone this git repository.
* Open the project folder (_Tic-Tac-Toe-Web_) in any code editor.
* Alternatively, you can just use command prompt and notepad.
* Install _node.js_ if neccesary (if you already have _node.js_ on your machine, skip this step).
* Open the terminal in your code editor, or if you are using cmd then change directory to the project folder.
* Install project dependencies: type `npm install` in your terminal (if that doesn't work, try `npm install --force`). This step will add _node\_modules_ folder to the project with all needed dependencies.
* One last thing, open _socket.js_ file (located at: _./public/scripts_).
	* You will need to update your IP address. Look at line 7 in the code.
	* Check your IP address of your local machine. Copy it into the the code, so that line 7 of the code looks like this: \
	`const ws = new WebSocket("ws://<YOUR-IP-ADDRESS>:3000");`\
	(replace `<YOUR-IP-ADDRESS>` with your IP address)
	* You can also change a port value, but `3000` should be enough.
* Finally, to start the app (_server.js_), type `npm run start` (reminder: your directory location must be project folder!).

**Enjoj!**
