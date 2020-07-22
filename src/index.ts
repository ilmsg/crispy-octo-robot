import http from 'http';
import App from './app';

const port = process.env.PORT || 4000;
http.createServer(new App().app).listen(port, () => {
    console.log(`server listen at *:${port}`);
});
