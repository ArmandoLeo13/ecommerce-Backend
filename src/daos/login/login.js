import { Router, response } from 'express';
import path from 'path';

const login = Router();

login.get("/",async (request, res) => {
    const file = "login.html";
    const dir = process.cwd();
    let options = {
        root: path.join(dir+"/public")
    };
    res.sendFile(file,options);
})

export {login};