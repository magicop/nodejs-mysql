
import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {

    const query = `
        SELECT * 
        from heroes`;

    MySQL.ejecutarQuery (query, (err:any, heroes: Object[]) => {

        res.setHeader('Content-Type', 'application/json');

        if(err){
            
            res.status(400).json({
                ok: false,
                error: err
            });
            
        } else {
            
            res.json({
                ok: true,
                heroes: heroes
            });
            
        }

    });
    

});

router.get('/heroes/:id', (req: Request, res: Response) => {

    const id = req.params.id;

    const escapeId = MySQL.instance.cnn.escape(id);

    const query = `
        SELECT * 
        from heroes
        where id = ${ escapeId }`;


    MySQL.ejecutarQuery (query, (err:any, heroe: Object[]) => {

        res.setHeader('Content-Type', 'application/json');

        if(err){
            
            res.status(400).json({
                ok: false,
                error: err
            });
            
        } else {
            
            res.json({
                ok: true,
                heroe: heroe
            });
            
        }

    });

});

export default router;