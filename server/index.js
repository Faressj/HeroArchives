const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;

require('dotenv').config({ path: '../.env' });
const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;

app.use(cors({
    origin: 'https://heroarchives.com'
}));

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get('/search-hero', async (req, res) => {
    const ts = new Date().getTime().toString();
    const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');
    const query = req.query.name;
    try {
        const response = await axios.get(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=10`); // Ajout d'une limite
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from Marvel API');
    }
});

app.get('/hero/:id', async (req, res) => {
    const heroId = req.params.id;
    const ts = new Date().getTime().toString();
    const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');

    try {
        const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${heroId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching hero data from Marvel API');
    }
});
app.get('/comic/:comicId', async (req, res) => {
    const comicId = req.params.comicId;
    const ts = new Date().getTime().toString();
    const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');

    try {
        const response = await axios.get(`http://gateway.marvel.com/v1/public/comics/${comicId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from Marvel API');
    }
});
app.get('/serie/:serieId', async (req, res) => {
    const serieId = req.params.serieId;
    const ts = new Date().getTime().toString();
    const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');

    try {
        const response = await axios.get(`http://gateway.marvel.com/v1/public/series/${serieId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from Marvel API');

    }
});
app.get('/story/:storyId', async (req, res) => {

    const storyId = req.params.storyId;
    const ts = new Date().getTime().toString();
    const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');

    try {
        const response = await axios.get(`http://gateway.marvel.com/v1/public/stories/${storyId}/series?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from Marvel API');
    }
});
app.get('/event/:eventId', async (req, res) => {

    const eventId = req.params.eventId;
    const ts = new Date().getTime().toString();
    const hash = crypto.createHash('md5').update(ts + privateKey + publicKey).digest('hex');

    try {
        const response = await axios.get(`http://gateway.marvel.com/v1/public/events/${eventId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from Marvel API');
    }
});

app.listen(port, () => {
    console.log(`Server listening at https://heroarchives.com`);
});
