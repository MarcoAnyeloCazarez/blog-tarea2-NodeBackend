const uuid = require('uuid')


const postsDB = [ 
    {
        id: "f2d52a50-debb-441a-a5f2-787dfa3fb1c0",
        title: "primer Post desde Thunder",
        content: "Mi primer post",
        header_image: "hiuhciuhr",
        user_id: "e7189119-8f6c-4174-8425-201d178bb231",
        published: true
    }
]

const getAllPosts = () => {
    return postsDB
}

/*
const getPostsByUserId = (userId) => {
    const posts = postsDB.filter(array => array.user_id === userId)
    if(posts.length > 0){
        return posts
    }else{
        return 'no hay posts aún'
    }
}
*/

const createNewPost = (bodyData, user_id) => {
    const newPost = {
        id: uuid.v4(),
        title: bodyData.title,
        content: bodyData.content,
        header_image: bodyData.header_image,
        user_id: user_id,
        published: true
    }
    postsDB.push(newPost)
    return(newPost)
}

/*
const getPostById = (id) => {
    const data = postsDB.filter(item => item.id === id)
    if(data.length > 0){
        return data[0]
    }else {
        return null
    }
}
*/

const getPostsByUser = (userId) => {
    const posts = postsDB.filter(post => postsDB.user_id === userId)
    if(posts.length > 0){
        return posts
    }else{
        return null
    }
}

const getSpecificPostsByUser = (userID, postID) => {
    const posts = postsDB.filter((posts) => posts.user_id === userID)
    //console.log(posts)
    const specificPost = posts.filter((post) => post.id === postID) 
    //console.log(specificPost)
    if(specificPost.length >0){
        return specificPost
    }else {
        return null
    }
}

const editSpecificPost = (userID, postID, data) => {
    const specificPost = getSpecificPostsByUser(userID, postID)
    const postIndex = postsDB.findIndex(item => item.id == postID)
    console.log(postIndex)
    if(postIndex !== -1){
        postsDB[postIndex] = {
            id: specificPost.id,
            title: data.title,
            content: data.content,
            header_image: data.header_image,
            user_id: specificPost.user_id,
            published: true
        }
        return specificPost
    }else{
        return null
    }
    
}

const deletePost = (postID) => {
    const postIndex = postsDB.findIndex(item => item.id == postID)
    if(postIndex !== -1){
        postsDB.splice(postIndex, 1)
        return true
    }else {
        return false
    }
}



module.exports = {
    getAllPosts,
    createNewPost,
    getPostsByUser,
    getSpecificPostsByUser,
    editSpecificPost,
    deletePost
}
 