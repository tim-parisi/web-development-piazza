const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const {postValidation} = require('../validations/validation')
const verify = require('../verifyToken')

router.get('/', async(req, res) => {
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch(err) {
        res.status(400).send({message:err})
    }
})

router.get('/:postId', async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        console.log(post)
        res.send(post)
    } catch(err) {
        res.status(400).send({message:err})
    }
})

router.post('/', verify, async(req, res) => {
    const {error} = postValidation(req.body)
    if (error) {
        return res.send({message:error['details'][0]['message']})
    }
    const post = new Post({
        title:req.body.title,
        description:req.body.description,
        likes:0,
        createdBy:req.user['_id']
    })
    console.log(post)

    const savedPost = await post.save()
    res.send(savedPost)
})

router.put('/:postId', verify, async(req, res) => {
    const {error} = postValidation(req.body)
    if (error) {
        return res.send({message:error['details'][0]['message']})
    }
    try {
        // User validation
        const oldPost = await Post.findById(req.params.postId)
        if (oldPost['createdBy'] != req.user['_id']) {
            return res.status(400).send({message:'incorrect user'})
        }
        //Update post
        const post = await Post.findOneAndUpdate({_id:req.params.postId},
        {
            title:req.body.title,
            description:req.body.description
        })
        //Return new post
        const newPost = await Post.findById(req.params.postId)
        res.send(newPost)
    }catch(err) {
        return res.status(400).send({message:err['message']})
    }
})

router.delete('/:postId', verify, async(req, res) => {
    try {
        const post = await Post.deleteOne({_id:req.params.postId})
        res.send(post)
    } catch (err) {
        res.send(err)
    }
})

module.exports = router