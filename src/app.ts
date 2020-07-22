import createError from 'http-errors';
import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import IndexRouter from './routes/index';

export default class App {
    public app: Application;

    constructor() {
        this.app = express();

        this.app.set('views', path.join(__dirname, `../views`));
        this.app.set('view engine', 'hbs');

        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use((_req: Request, res: Response, next: NextFunction) => {
            res.locals.user = { username: '', email: '' };
            next();
        })

        this.app.use('/', new IndexRouter().router);

        this.app.use(express.static(path.join(__dirname, `../public`)));

        // catch 404 and forward to error handler
        this.app.use(function (_req: Request, _res: Response, next: NextFunction) {
            next(createError(404));
        });

        // error handler
        this.app.use(function (err: any, req: Request, res: Response, _next: NextFunction) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    }
}