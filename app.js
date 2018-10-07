var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var User = require('./models/user')
var methodOverride = require('method-override')
var flash = require('connect-flash')
require('dotenv').config()


var commentRoutes = require('./routes/comments')
var campgroundRoutes = require('./routes/campgrounds')
var indexRoutes = require('./routes/index')

// require('./seeds')()
mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true })
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"))
app.use(require('express-session')({
    secret: "SECRET",
    resave: false,
    saveUninitialized: false,
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash('success')
    next()
})
app.use(methodOverride('_method'))
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(indexRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)

app.listen(process.env.PORT || 3000, () => {
    console.log('server start')
})