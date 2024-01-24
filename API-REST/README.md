#### Mongo DB
##### demo de Fazt
package.json
``` 
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mongoose": "^5.8.11",
    "morgan": "^1.10.0",
    "nodemon": "^3.0.2",
    "slugify": "^1.3.6",
    "validator": "^12.2.0"
  }
```
<form>
  <label for="q">Buscar:</label>
  <input type="search" name="q" id="q" required />
  <input type="submit" value="🔍" />
</form


### Notas para entender
en index.js se conecta todo
app.js solo levanta express()
sever realiza conexion a DB

### Algunos json

```
{
  "email": pepe3@gmail.com",
"password": "12345"
}
{
  "title":"tarea 3",
  "description":"14:47 17-01-2024"
}
```
//no colorcar "date": default new Date
video tutorial
https://www.youtube.com/watch?v=NmkY4JgS21A&t=395s

