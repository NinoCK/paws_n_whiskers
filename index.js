const mongoose = require('mongoose') // Require mongoose for database connection
const express = require('express') // Require express for web server
const session = require('express-session') // Require express-session for session management

require('dotenv').config() // Require dotenv for environment variables
const itemsPerPage = 3; // Define the number of items per page
const port = 3005 // Define the port for the web server
const app = express() // Create an express application
app.set('view engine', 'ejs') // Set the view engine to ejs
app.use(express.json()) // Use express.json() for parsing JSON data
app.use(express.urlencoded({ extended: true })) // Use express.urlencoded() for parsing URL-encoded data
app.use(session({secret: process.env.SECRET, resave: false, saveUninitialized: true})) // Use express-session for session management

let User = require('./models/user') // Require the User model to access the users collection
let Appointment = require('./models/appointment') // Require the Appointment model to access the appointments collection
let Contact = require('./models/contact') // Require the Contact model to access the contact_messages collection

mongoose.connect(process.env.DATABASE_URL) // Connect to the database using the DATABASE_URL environment variable

app.use((req, res, next) => { // Middleware to set the isLoggedIn variable to true if the user is logged in
    res.locals.isLoggedIn = req.session && req.session.user ? true : false; // Set the isLoggedIn variable to true if the user is logged in
    next(); // Call the next middleware
  });

function getUsername(req) { // Function to get the username of the logged in user
    return req.session.username ? req.session.username : ''; // Return the username if the user is logged in
}
// Define the newsfeed array
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

app.get("/", (req, res) => { // Define the route for the home page
    // Define the services array
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
    res.render('pages/home', { title: "Paws n' Whiskers", data:services}) // Render the home page
})

app.get("/services", (req, res) => { // Define the route for the services page
    // Define the services array
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
    res.render('pages/services', { title: "Services", data:data}) // Render the services page
})

app.get("/news", (req, res) => { // Define the route for the news page

    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters
    const totalPages = Math.ceil(newsfeed.length / itemsPerPage); // Calculate the total number of pages
    const startIndex = (page - 1) * itemsPerPage; // Calculate the start index of the items on the current page
    const endIndex = page * itemsPerPage; // Calculate the end index of the items on the current page
    const currentPageItems = newsfeed.slice(startIndex, endIndex); // Get the items on the current page

    const title = "News"; // Define the title variable 

    res.render('pages/news', {  // Render the news page
        page, // Pass the page variable to the template
        pages: totalPages, // Pass the totalPages variable to the template
        newsfeed: currentPageItems, // Pass the currentPageItems variable to the template
        title: title // Pass the title variable to the template
    });
});

app.get("/contact", (req, res) => { // Define the route for the contact page
    res.render('pages/contact', { title: "Contact Us"})
})

app.get("/appointment", (req, res) => { // Define the route for the appointment page
    res.render('pages/appointment', { 'title': "Appointment", username: getUsername(req)}) // Render the appointment page
})

const path = require('path'); // Require path for working with file and directory paths
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.post('/contact', async (req, res) => { // Define the route for the contact form
    Contact.create({ // Create a new contact message in the database
        name: req.body.name, // Set the name field to the name field from the request body
        email: req.body.email, // Set the email field to the email field from the request body
        phone: req.body.phone, // Set the phone field to the phone field from the request body
        message: req.body.message // Set the message field to the message field from the request body
    })
    res.redirect('/') // Redirect to the home page
})

app.post('/appointment', async (req, res) => { // Define the route for the appointment form
    Appointment.create({ // Create a new appointment in the database
        petName: req.body.petName, // Set the petName field to the petName field from the request body
        petType: req.body.petType, // Set the petType field to the petType field from the request body
        petAge: req.body.petAge, // Set the petAge field to the petAge field from the request body
        date: req.body.date,  // Set the date field to the date field from the request body
        time: req.body.time, // Set the time field to the time field from the request body
        reason: req.body.reason // Set the reason field to the reason field from the request body
    })
    const username = getUsername(req); // Get the username of the logged in user
    res.render('pages/appointment', { title: "Appointment", username: username }); // Render the appointment page
})

app.get("/dashboard", async (req, res) => { // Define the route for the dashboard page
    try { // Try to execute the following code
        const appointments = await Appointment.find(); // Find all appointments in the database
        res.render('pages/dashboard', { appointments: appointments }); // Render the dashboard page
      } catch (err) { // Catch any errors
        res.status(500).json({ message: err.message }); // Return an error message
      }
})

app.get("/login", (req, res) => { // Define the route for the login page
    res.render('pages/login', { title: "Login"}) // Render the login page
})

app.post('/login', async (req, res) => { // Define the route for the login form
    const user = await User.findOne({'username': req.body.username}).exec(); // Find the user with the username from the request body
    if(user != null) { // If the user exists
        if(user.password == req.body.password) { // If the password is correct
            req.session.username = req.body.username; // Set the username session variable
            if (user.isAdmin) { // If the user is an admin
                res.redirect('/dashboard'); // Redirect to the dashboard page
            } else { // If the user is not an admin
                res.redirect('/appointment'); // Redirect to the appointment page
            }
        }
        else { // If the password is incorrect 
            res.render('pages/error', {'error': 'Wrong credentials', 'username': getUsername(req), 'title': 'Error'}); // Render the error page
        }
    }
    else { // If the user does not exist
        res.render('pages/error', {'error': 'User not found', 'username': getUsername(req), 'title': 'Error'}); // Render the error page
    }
});

app.get("/register", (req, res) => { // Define the route for the register page
    res.render('pages/register', { 'title': "Register"}) // Render the register page
})

app.post('/register', async (req, res) => { // Define the route for the register form
    const user = await User.findOne({'username': req.body.username}).exec() // Find the user with the username from the request body
    if(user != null) { // If the user exists
        res.render('pages/error', {'error': 'Username ' + req.body.username + ' already used', 'username': getUsername(req)}) // Render the error page
    }
    else { // If the user does not exist
        if(req.body.password != req.body.password2) {  // If the passwords do not match
            res.render('pages/error', {'error': 'Passwords do not match', 'username': getUsername(req)}) // Render the error page
        }
        else { // If the passwords match
            User.create({ // Create a new user in the database
                username: req.body.username, // Set the username field to the username field from the request body
                password:  req.body.password, // Set the password field to the password field from the request body
                email: req.body.email, // Set the email field to the email field from the request body
                first_name: req.body.first_name, // Set the first_name field to the first_name field from the request body 
                last_name: req.body.last_name, // Set the last_name field to the last_name field from the request body
                address: req.body.address, // Set the address field to the address field from the request body
                phone: req.body.phone, // Set the phone field to the phone field from the request body
                isAdmin: false // Set the isAdmin field to false by default
            })
            res.redirect('/login') // Redirect to the login page
        }
    }
})

app.get('/logout', (req, res) => { // Define the route for the logout page
    req.session.destroy() // Destroy the session to log the user out
    res.redirect('/') // Redirect to the home page
})

app.get('/error', function(req, res) { // Define the route for the error page
    res.render('pages/error', { title: "Error Page" }); // Render the error page
});

app.use(express.static('images')); // Use the images directory for static files

app.listen(port, () => { // Start the web server
    console.log("Server is running on port " + port) // Log a message to the console
})
