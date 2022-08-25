const { json } = require('express')
const postsControllers = require('./posts.controllers')

const getAllPost = (req, res) => {
    const data = postsControllers.getAllPosts()
    res.status(200).json({items: data.length, posts: data})
}

const newPost = (req, res) => {
    const bodyData = req.body
    console.log(bodyData)
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
	        "header_image": "url_to_img",
        }
        }) 
    }else {
        const newPost = postsControllers.createNewPost(bodyData)
        res.status(201).json({message: 'User created'})
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
    const userId = req.params.user_id
    const posts = postsControllers.getPostsByUserId(userId)
    if(!posts){
        res.status(404).json({message: 'That user dont have posts yet or does not exist'})
    }else {
        res.status(200).json(posts)
    }
}


module.exports = {
    getAllPost,
    newPost,
    getOnePost
}