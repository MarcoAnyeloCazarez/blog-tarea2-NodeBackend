const uuid = require('uuid')


const postsDB = [ 
    {
        id: "f2d52a50-debb-441a-a5f2-787dfa3fb1c0",
        title: "primer Post desde Thunder",
        content: "Mi primer post",
        header_image: "hiuhciuhr",
        published: true
    }
]

const getAllPosts = () => {
    return postsDB
}

const getPostsByUserId = (userId) => {
    const posts = postsDB.filter(array => array.user_id === userId)
    if(posts.length > 0){
        return posts
    }else{
        return 'no hay posts aún'
    }
}

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

const getPostById = (id) => {
    const data = postsDB.filter(item => item.id === id)
    if(data.length > 0){
        return data[0]
    }else {
        return null
    }
}

const getPostsByUser = (userId) => {
    const posts = postsDB.filter(post => post.user_id === userId)
    if(posts.length > 0){
        return posts
    }else{
        return null
    }
}


module.exports = {
    getAllPosts,
    getPostsByUserId,
    createNewPost,
    getPostById,
    getPostsByUser
}
 