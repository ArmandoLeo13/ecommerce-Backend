import { Router, response } from 'express';
import path from 'path';
import ContenedorDBUser from '../../contenedores/ContenedorDBUser.js';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const contenedor = new ContenedorDBUser();
contenedor.conectDB();
const signup = Router();

passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req,email,password, done) => {
        
  
        // const usuario = [1,2]
        // await contenedor.usuarios.find({"email":email})
        
        // if (usuario.length!=0) {
        //   return done("el nombre de usuario ya existe");
        // }

        const user = req.body

        contenedor.usuarios.usuarios.insertOne(user);
  
        return done(null, user);
      }
    )
  );

signup.get("/",async (request, res) => {
    const file = "signup.html";
    const dir = process.cwd();
    let options = {
        root: path.join(dir+"/public")
    };
    res.sendFile(file,options);
});

signup.post("/",
    passport.authenticate("register", {
      failureRedirect: "/4000",
      successRedirect: "/",
    })
  )
// signup.post('/', async (req, res) => {
    
//     const usuario = await contenedor.usuarios.find({"email":req.body.email})
    
//     if (usuario.length!=0) {
//         return res.status(400).json({ error: 'el nombre de usuario ya existe' });
//     }

//     const user = req.body
    
//     contenedor.usuarios.collection.insertOne(user);
    
//     res.redirect("/")
// })

export {signup};