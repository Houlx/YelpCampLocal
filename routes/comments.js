var express = require('express')
var router = express.Router({ mergeParams: true })
var Campground = require('../models/campground')
var Comment = require('../models/comment')
var middleware = require('../middleware')


router.get('/new', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err)
        } else {
            res.render('comments/new', { campground: campground })
        }
    })
})

router.post('/', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err)
            res.redirect('/campgrounds')
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err)
                } else {
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.save()
                    campground.comments.push(comment)
                    campground.save()
                    req.flash('success', 'Comment Added')
                    res.redirect('/campgrounds/' + campground._id)
                }
            })
        }
    })
})

router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, found) => {
        if (err || !found) {
            req.flash('error', 'Campground not found')
            return res.redirect('back')
        }
        Comment.findById(req.params.comment_id, (err, found) => {
            if (err) {
                res.redirect('back')
            } else {
                res.render('comments/edit', {
                    campground_id: req.params.id,
                    comment: found
                })
            }
        })
    })
})

router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updated) => {
        if (err) {
            res.redirect('back')
        } else {
            res.redirect('/campgrounds/' + req.params.id)
        }
    })
})

router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            res.redirect('back')
        } else {
            req.flash('success', 'DELETED')
            res.redirect('/campgrounds/' + req.params.id)
        }
    })
})

module.exports = router