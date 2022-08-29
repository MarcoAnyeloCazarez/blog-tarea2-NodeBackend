const { json } = require('express')
const postsControllers = require('./posts.controllers')
const passport = require('passport')
require('../middlewere/auth.middleware')(passport)

const getAllPost = (req, res) => {
    const data = postsControllers.getAllPosts()
    res.status(200).json({items: data.length, posts: data})
}

const newPost = (req, res) => {
    const bodyData = req.body
    const user_id = req.user.id    //obtengo el id de la informacion generada por passport en req cuando decodifica el toquen 
    console.log("User id: ",user_id)
    if(!bodyData){
        return res.status(400).json({message: 'Body doesnt exist'})
    }
    if(!bodyData.title || !bodyData.content || !bodyData.header_image){
       res.status(400).json({
        body: {bodyData},
        message: 'All field must be complete like:',
        fields: {
	        "title": "string",
	        "content":"string",
	        "header_image": "string",
        }
        }) 
    }else {
        const newPost = postsControllers.createNewPost(bodyData, user_id)
        res.status(201).json({message: 'Posts created'})
        return newPost
    }
}

const getOnePost = (req, res) => {
    const postId = req.params.id
    const data = postsControllers.getPostById(postId)
    if(!data){
        res.status(404).json({message: `Does not eixist post with ID especified: ${postId}`})
    } else{
        res.status(200).json(data)
    }
}

const postsByUser = (req, res) => {
    const userId = req.user.user_id
    const posts = postsControllers.getPostsByUser(userId)
    if(!posts){
        return res.status(404).json({message: 'That user dont have posts yet or does not exist'})
    }else {
        return res.status(200).json(posts)
    }
}

const getSpecificPostByUser = (req, res) => {
    const userID = req.user.id
    console.log("User id: ", userID)
    const postID = req.params.id
    console.log("Post id: ", postID)
    if(!userID || !postID){
        return res.status(404).json('Invalid post ID')
    }else {
        const post = postsControllers.getSpecificPostsByUser(userID, postID)
        return res.status(200).json(post)

    }
}




module.exports = {
    getAllPost,
    newPost,
    getOnePost,
    postsByUser,
    getSpecificPostByUser
}