var express = require('express')
var router = express.Router()
var Campground = require('../models/campground')
var middleware = require('../middleware')
var NodeGeocoder = require('node-geocoder')

var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null,
}

var geocoder = NodeGeocoder(options)

router.get('/', (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err)
        } else {
            res.render('campgrounds/index', {
                campgrounds: allCampgrounds,
                currentUser: req.user
            })
        }
    })
})

router.post('/', middleware.isLoggedIn, (req, res) => {
    var name = req.body.name
    var price = req.body.price
    var image = req.body.image
    var description = req.body.description
    geocoder.geocode(req.body.location, (err, data) => {
        if (err || !data.length) {
            req.flash('error', 'Invalid Address')
            console.log(err)
            return res.redirect('back')
        }
        var latitude = data[0].latitude
        var longtitude = data[0].longitude
        var location = data[0].formattedAddress
        Campground.create({
            name: name,
            price: price,
            image: image,
            description: description,
            author: {
                id: req.user._id,
                username: req.user.username,
            },
            location: location,
            latitude: latitude,
            longtitude: longtitude,
        }, (err, newly) => {
            if (err) {
                console.log(err)
            } else {
                res.redirect('/campgrounds')
            }
        })
    })

})

router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
})

router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, found) => {
        if (err || !found) {
            req.flash('error', 'Campground not found')
            res.redirect('back')
        } else {
            res.render('campgrounds/show', { campground: found })
        }
    })
})

router.get('/:id/edit', middleware.checkOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, found) => {
        res.render('campgrounds/edit', { campground: found })
    })
})

router.put('/:id', middleware.checkOwnership, (req, res) => {
    geocoder.geocode(req.body.location, (err, data) => {
        if (err || !data.length) {
            req.flash('error', 'Invalid Address')
            console.log(err)
            return res.redirect('back')
        }
        req.body.campground.latitude = data[0].latitude
        req.body.campground.longitude = data[0].longitude
        req.body.campground.location = data[0].formattedAddress

        Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updated) => {
            if (err) {
                req.flash('error', err.message)
                res.redirect('/campgrounds')
            } else {
                req.flash('success', 'Successfully Updated')
                res.redirect('/campgrounds/' + req.params.id)
            }
        })
    })
})

router.delete('/:id', middleware.checkOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect('/campgrounds')
        } else {
            res.redirect('/campgrounds')
        }
    })
})

module.exports = router;