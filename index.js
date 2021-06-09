const Instagram = require('instagram-web-api');
const express = require('express');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const client = new Instagram({ username, password });

const app = express();

app.get('/', async (req, res) => {
    try {
        await client.login({ username, password });
        const profile = await client.getProfile()
        const fotos = await client.getPhotosByUsername({ username })

        res.send(fotos);
    } catch (err) {
        console.error(err);
    }
});

app.post('/', async (req, res) => {
    try {
        const photo = 'https://www.earthrangers.com/public/content/wildwire/sun-sunglasses.jpg';

        await client.login({ username, password });
        const data = await client.uploadPhoto({ photo, caption: '❤️', post: 'feed' });

        res.send(data);
    } catch (err) {
        console.error(err);
    }
})

app.get('/test', async (req, res) => {
    try {
        await client.login({ username, password });
        const activity = await client.getActivity()

        res.send(activity);
    } catch (err) {
        console.error(err);
    }
})

app.listen(3000, () => console.log('Server running...'))
