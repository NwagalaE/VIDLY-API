const express = require('express');
const Joi = require('joi');

const app =  express();

app.use(express.json());//middleware function



const genres = [
    {id : 1, genre: 'Action'},
    {id : 2, genre: 'Thriller'},
    {id : 3, genre: 'Comedy'},
    {id : 4, genre: 'Horror'},
    {id : 5, genre: 'Romance'}
]

app.get('/', (req,res)=>{
    res.send("What's up world?");
});


app.get('/api/genres', (req,res)=>{
    res.send(genres);
});


app.get('/api/genres/:id', (req,res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Genre not found");
    res.send(genre)
});


app.post('/api/genres', (req,res)=>{
    const {error} = validation(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        genre : req.body.genre
    };
    genres.push(genre);
    res.send(genre);
});


//validation function
function validation(genre) {
    const schema = Joi.object({
        genre : Joi.string().min(6).required()
    });

    return schema.validate(genre);
}



app.put('/api/genres/:id', (req,res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genre not found');
   
    const {error} = validation(req.body); //result.error
    if(error) return res.status(400).send(error.details[0].message);

    genre.genre = req.body.genre
    res.send(genre);
});



app.delete('/api/genres/:id', (req,res)=>{
    //Look up the course
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genre not found');    

    //Delete
    const index = genres.indexOf(genre)
    genres.splice(index,1);

    //Return course
    res.send(genre);
});







//PORT
const port = process.env.PORT || 2500;
app.listen(port, ()=>console.log(`Listening on ${port} ...`));