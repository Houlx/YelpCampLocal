var mongoose = require('mongoose')
var Campground = require('./models/campground')
var Comment = require('./models/comment')

var data = [
    {
        name: "One",
        image: "https://images.unsplash.com/photo-1538169204832-1b461add30a5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0ebd42143ffb584a838c3a10f446e5e8&auto=format&fit=crop&w=1950&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel augue sollicitudin lorem laoreet dapibus ac in turpis. Nam semper est et sapien iaculis, in interdum eros sollicitudin. Pellentesque aliquet sem sit amet tempor pellentesque. Sed erat eros, rhoncus dignissim bibendum in, pretium quis sapien. Integer lorem mi, feugiat a faucibus quis, suscipit vel ante. Praesent sagittis ex vel sapien placerat mattis. In hac habitasse platea dictumst. Vestibulum vestibulum augue id turpis maximus lacinia. Curabitur sagittis fringilla aliquet. Mauris accumsan nec elit lobortis ultricies. Aenean velit ipsum, ullamcorper id rhoncus sed, euismod sit amet nisl. Nam nunc ante, euismod vitae tempus a, sagittis sed neque. Cras ut justo lectus. Sed facilisis neque non lacus varius pharetra. Nam eget tincidunt sapien. Aliquam efficitur arcu vitae erat ultricies ornare.",
    },
    {
        name: "Two",
        image: "https://images.unsplash.com/photo-1538218952949-2f5dda4a9156?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b79a9c7314dd5ca8eac2f187902ceca2&auto=format&fit=crop&w=1952&q=80",
        description: "Ut et quam convallis, euismod tellus sit amet, fringilla tortor. Mauris lacus odio, finibus a sapien quis, scelerisque imperdiet arcu. Sed molestie consequat sem et scelerisque. In sit amet felis at nisl commodo suscipit. Sed sagittis congue ipsum vitae porttitor. Integer a scelerisque massa. Proin pharetra, ex sit amet eleifend viverra, metus nisi accumsan urna, varius tincidunt quam mauris at leo. Phasellus fermentum pellentesque leo, sit amet faucibus leo porttitor sed. Phasellus convallis in urna eget tincidunt. Morbi pharetra erat a facilisis placerat. Donec sollicitudin mi at ipsum vehicula commodo. Phasellus eleifend aliquet lectus.",
    },
    {
        name: "Three",
        image: "https://images.unsplash.com/photo-1538228585993-961ccc1704b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d70413ad3150a7cde5bc5d469e3c0da7&auto=format&fit=crop&w=2016&q=80",
        description: "In dictum commodo lacus ac tristique. Duis venenatis sem at lorem semper blandit. Sed quis lectus fermentum, euismod nunc rutrum, fermentum magna. Cras felis augue, tincidunt quis ultricies sed, malesuada vel ipsum. Integer non ornare ex. Nulla lobortis pharetra orci, in molestie dolor sodales at. Nulla metus libero, egestas id neque in, commodo convallis odio. Ut id eleifend diam. Quisque est orci, consequat vel dui ac, iaculis finibus ipsum. Nam lacinia turpis ut elit finibus imperdiet. Sed vitae risus massa. Morbi iaculis condimentum augue, at dignissim libero viverra eget. Aenean in libero quis elit auctor vulputate. Sed sed luctus arcu. Ut faucibus convallis mi, et efficitur ipsum tempor et.",
    },
]

module.exports = () => {
    Campground.remove({}, err => {
        // if (err) {
        //     console.log(err)
        // } else {
        //     console.log("removed")
        //     data.forEach(seed => {
        //         Campground.create(seed, (err, campground) => {
        //             if (err) {
        //                 console.log(err)
        //             } else {
        //                 console.log("added one")
        //                 Comment.create({
        //                     text: "GREAT!",
        //                     author: "Alice"
        //                 }, (err, comment) => {
        //                     if (err) {
        //                         console.log(err)
        //                     } else {
        //                         campground.comments.push(comment)
        //                         campground.save()
        //                         console.log("Created comment")
        //                     }
        //                 })
        //             }
        //         })
        //     });
        // }
    })


}
