const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!")
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *20) + 10;
        const camp = new Campground({
            author: '61857748aeea092ee3718ad0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum voluptatem nihil, temporibus harum non, obcaecati dolores assumenda illo omnis vero ea ad. Magni illum possimus voluptates sint! Quis, quae dolorum?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dsvsfnknz/image/upload/v1638229539/YelpCamp/ehoruckvkpej8ikhe6o9.jpg',
                  filename: 'YelpCamp/ehoruckvkpej8ikhe6o9'
                },
                {
                  url: 'https://res.cloudinary.com/dsvsfnknz/image/upload/v1638229539/YelpCamp/dmxo8xiarha4c4g26cvj.jpg',
                  filename: 'YelpCamp/dmxo8xiarha4c4g26cvj'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})