const express = require('express')
const port = 3005
const app = express()
const mongoose = require('mongoose')

const itemsPerPage = 3;
//connect to mongodb
const dbURI = 'mongodb+srv://cerzie:<password>@cluster0.2kzoq3w.mongodb.net/'

newsfeed = [
    {
        'title': 'Exploring Dog-Friendly Trails: A Summer Adventure Guide',
        'content': "Summer invites us to embark on exciting outdoor adventures with our furry friends. While the warm weather is perfect for exploration, it's crucial to ensure your dog's safety. Here are some valuable tips to make your summer hikes enjoyable and safe for your canine companion.",
        'image': 'News_section.jpg'
    },
    {
        'title': 'Keeping Your Feline Friend Cool in the Heat',
        'content': "As the temperature rises, spending quality time outdoors with your cat becomes more tempting. Nevertheless, the summer heat can pose risks to your feline friend. Learn how to keep your cat cool and secure with these essential summer safety tips.",
        'image': 'News_section.jpg'
    },
    {
        'title': 'Summer Wellness: Caring for Your Pet’s Health and Happiness',
        'content': "Summer is a delightful season to cherish moments with your pets in the sunshine. However, it's vital to be mindful of their well-being amidst the rising temperatures. Discover comprehensive tips on ensuring the health and happiness of your pets during the summer months.",
        'image': 'News_section.jpg'
    },
    {
        'title': 'Beat the Heat: Protecting Your Pet from Summer Hazards',
        'content': "While summer promises fun and frolic, it also brings potential dangers for your pets. Safeguard your furry companions by understanding and preventing common summer hazards. Follow these guidelines to create a secure environment for your pets throughout the sunny season.",
        'image': 'News_section.jpg'
    },
    {
        'title': 'Sunny Days and Wagging Tails: Dog Safety Essentials',
        'content': "Nothing beats the joy of spending sunny days outdoors with your dog. To ensure a worry-free experience, prioritize your dog's safety in the summer heat. Explore these essential dog safety tips to make the most of your sunny adventures together.",
        'image': 'News_section.jpg'
    },
    {
        'title': 'Cool Cats: A Guide to Summer Comfort for Your Feline Companion',
        'content': "As summer approaches, it's time to make sure your cat stays cool and content. Discover effective strategies to keep your feline friend comfortable and safe during the warmer months. From hydration tips to creating shady retreats, ensure your cat enjoys a purrfect summer.",
        'image': 'News_section.jpg'
    },
    {
        'title': 'Exploring Dog-Friendly Trails: A Summer Adventure Guide',
        'content': "Summer invites us to embark on exciting outdoor adventures with our furry friends. While the warm weather is perfect for exploration, it's crucial to ensure your dog's safety. Here are some valuable tips to make your summer hikes enjoyable and safe for your canine companion.",
        'image': 'News_section.jpg'
    },
    {
        'title': 'Keeping Your Feline Friend Cool in the Heat',
        'content': "As the temperature rises, spending quality time outdoors with your cat becomes more tempting. Nevertheless, the summer heat can pose risks to your feline friend. Learn how to keep your cat cool and secure with these essential summer safety tips.",
        'image': 'News_section.jpg'
    },
    {
        'title': 'Summer Wellness: Caring for Your Pet’s Health and Happiness',
        'content': "Summer is a delightful season to cherish moments with your pets in the sunshine. However, it's vital to be mindful of their well-being amidst the rising temperatures. Discover comprehensive tips on ensuring the health and happiness of your pets during the summer months.",
        'image': 'News_section.jpg'
    },
    {
        'title': 'Beat the Heat: Protecting Your Pet from Summer Hazards',
        'content': "While summer promises fun and frolic, it also brings potential dangers for your pets. Safeguard your furry companions by understanding and preventing common summer hazards. Follow these guidelines to create a secure environment for your pets throughout the sunny season.",
        'image': 'News_section.jpg'
    },
    {
        'title': 'Sunny Days and Wagging Tails: Dog Safety Essentials',
        'content': "Nothing beats the joy of spending sunny days outdoors with your dog. To ensure a worry-free experience, prioritize your dog's safety in the summer heat. Explore these essential dog safety tips to make the most of your sunny adventures together.",
        'image': 'News_section.jpg'
    },
    {
        'title': 'Cool Cats: A Guide to Summer Comfort for Your Feline Companion',
        'content': "As summer approaches, it's time to make sure your cat stays cool and content. Discover effective strategies to keep your feline friend comfortable and safe during the warmer months. From hydration tips to creating shady retreats, ensure your cat enjoys a purrfect summer.",
        'image': 'News_section.jpg'
    }
    
]

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    services=[
        {
            'title':'Basic Pet Exam',
            'content':"From vaccinations to dental care, our team is devoted to your pet's well-being. Trust us for thorough and attentive care, because a happy pet begins with a healthy start.", 
            'image':'Care.png'
        },
        {
            'title':'Emergency Care',
            'content':"Our clinic is here for your pets when every moment counts. Our experienced team is ready 24/7 to provide immediate attention and care during those unexpected situations.", 
            'image':'Emergency.png'
        },
        {
            'title':'Pet Grooming', 
            'content':"Our skilled groomers offer a range of treatments, from baths to precision trims, ensuring your furry companions not only look fabulous but also enjoy a spa-like experience.", 
            'image':'Grooming.png'
        }
    ]
    res.render('pages/home', { title: "Paws n' Whiskers", data:services})
})

app.get("/services", (req, res) => {
    data=[
        {
            'title':'Basic Pet Exam',
            'content':"From vaccinations to dental care, our team is devoted to your pet's well-being. Trust us for thorough and attentive care, because a happy pet begins with a healthy start.", 
            'image':'News_section.jpg'
        },
        {
            'title':'Emergency Care',
            'content':"Our clinic is here for your pets when every moment counts. Our experienced team is ready 24/7 to provide immediate attention and care during those unexpected situations.",
            'image':'News_section.jpg'
        },
        {
            'title':'Pet Grooming', 
            'content':"Our skilled groomers offer a range of treatments, from baths to precision trims, ensuring your furry companions not only look fabulous but also enjoy a spa-like experience.", 
            'image':'News_section.jpg'
        }
    ]
    res.render('pages/services', { title: "Services", data:data})
})

app.get("/news", (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const totalPages = Math.ceil(newsfeed.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const currentPageItems = newsfeed.slice(startIndex, endIndex);

    const title = "News"; // Define the title variable

    res.render('pages/news', {  
        page,
        pages: totalPages,
        newsfeed: currentPageItems,
        title: title // Pass the title variable to the template
    });
});

app.get("/contact", (req, res) => {
    res.render('pages/contact', { title: "Contact Us"})
})

app.get("/login", (req, res) => {
    res.render('pages/login', { title: "Login"})
})

app.get("/register", (req, res) => {
    res.render('pages/register', { title: "Register"})
})

app.use(express.static('images'));

app.listen(port, () => {
    console.log("Server is running on port " + port)
})
