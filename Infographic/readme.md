
# Chrome headless

install `http-server` to setup `LottieWeb` folder as a simple web server
```
npm install -g http-server
```
run this command line to let the server up and running
```
http-server .\LottieWeb\ -p 4050
```

then run `chrome` generator to render to `png` file
```
node .\chrome_generator.js
```