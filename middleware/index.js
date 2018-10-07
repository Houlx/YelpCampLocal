var Campground = require('../models/campground')
var Comment = require('../models/comment')

module.exports = {
    checkOwnership: (req, res, next) => {
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, (err, found) => {
                if (err || !found) {
                    req.flash('error', 'Campground not found')
                    res.redirect('back')
                } else {
                    if (found.author.id.equals(req.user._id)) {
                        next()
                    } else {
                        req.flash("error", "NO PERMISSION")
                        res.redirect('back')
                    }
                }
            })
        } else {
            req.flash('error', 'NEED LOGIN')
            res.redirect('back')
        }
    },

    checkCommentOwnership: (req, res, next) => {
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, (err, found) => {
                if (err || !found) {
                    req.flash('error', "Comment not found")
                    res.redirect('back')
                } else {
                    if (found.author.id.equals(req.user._id)) {
                        next()
                    } else {
                        req.flash('error', 'NO PERMISSION')
                        res.redirect('back')
                    }
                }
            })
        } else {
            req.flash('error', 'NEED LOGIN')
            res.redirect('back')
        }
    },

    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('error', 'NEED LOGIN')
        res.redirect('/login')
    },
}