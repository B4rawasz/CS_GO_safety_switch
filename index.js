const { app, BrowserWindow } = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 250,
    height: 400,
    resizable: false,
    icon: './img/icon.ico'
  });

  win.loadFile('./html/index.html');

  win.removeMenu();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const http = require('http');

let port = 3000;
let host = '127.0.0.1';

let server = http.createServer( function(req, res) {

    if (req.method == 'POST') {
        res.writeHead(200, {'Content-Type': 'text/html'});

        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            let msg = JSON.parse(body);
            try {
                searchForShitWeapon(msg.player.weapons);
            } catch (err) {
                //console.log(err);
            }
        	res.end( '' );
        });
    }
    else
    {
        console.log("Not expecting other request types...");
        res.writeHead(200, {'Content-Type': 'text/html'});
		var html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
        res.end(html);
    }

});

server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);

function searchForShitWeapon(weapons){
    for (const weapon in weapons) {
        if (Object.hasOwnProperty.call(weapons, weapon)) {
            if(weapons[weapon].name == "weapon_scar20" || weapons[weapon].name == "weapon_g3sg1"){
                dropThisShit();
            }
        }
    }
}

const ks = require('node-key-sender');

function dropThisShit(){
    ks.sendKeys(['1', 'g']);
}

