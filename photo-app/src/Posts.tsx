import {OnCreatePostSubscription, Post} from "./API";
import {API, graphqlOperation, Storage} from "aws-amplify";
import {useEffect, useReducer, useState} from "react";
import {listPosts} from "./graphql/queries";
import {isDefined} from "./utils";
import {GraphQLResult} from '@aws-amplify/api-graphql'
import {onCreatePost} from "./graphql/subscriptions";

interface SetPosts {
    type: 'SET_POSTS',
    posts: ClientPost[]
}

interface AddPost {
    type: 'ADD_POST',
    post: ClientPost
}

type Action = SetPosts | AddPost

type ClientPost = {
    id: string;
    imageKey: string;
    title: string;
    imageUrl: string;
}

const reducer = (state: ClientPost[], action: Action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return action.posts;
        case "ADD_POST":
            return [action.post, ...state]
        default:
            return state;
    }
}

const getSignedPosts = async (posts: Post[]): Promise<ClientPost[]> => {
    const signedPosts = await Promise.all(
        posts.map(async (item) => {
            if (!item.imageKey) return;
            const signedUrl = await Storage.get(item.imageKey)
            const clientPost: ClientPost = {
                id: item.id,
                imageKey: item.imageKey,
                title: item.title,
                imageUrl: signedUrl
            };
            return clientPost
        })
    )
    return signedPosts.filter(isDefined);
}
type PostSubscriptionEvent = { value: { data: OnCreatePostSubscription } };

const Posts = () => {
    const [posts, dispatch] = useReducer(reducer, [])
    // const [posts2,updatePost]= useState<ClientPost[]>([]);

    const update = async ({value: {data}}: PostSubscriptionEvent) => {
        const newPost = data.onCreatePost;
        if (!newPost || !newPost.imageKey) return;
        const signedUrl = await Storage.get(newPost.imageKey)
        const newClientPost: ClientPost = {
            id: newPost.id,
            imageKey: newPost.imageKey,
            title: newPost.title,
            imageUrl: signedUrl
        }
        // const newPosts = [...posts2,newClientPost]
        // updatePost(newPosts)
        // updatePost(prevState => [...prevState,newClientPost])
        dispatch({type: 'ADD_POST', post: newClientPost})
    }

    useEffect(() => {
        fetchPosts();
        const client = API.graphql(
            graphqlOperation(onCreatePost)
        )
        if ("subscribe" in client) {
            const subscription = client.subscribe({
                next:update
            })

            return () => subscription.unsubscribe();
        }

    }, [])
    const fetchPosts = async () => {
        const postData = await API.graphql(graphqlOperation(listPosts)) as GraphQLResult<{listPosts:{items:Post[]}}>
        const items = postData.data?.listPosts.items;
        if (!items) return;
        const signedPosts = await getSignedPosts(items)
        dispatch({type: 'SET_POSTS', posts: signedPosts})
        // updatePost(signedPosts)
    }
    return (
        <div>
            <h2 style={heading}>Posts</h2>
            {posts.map(post => (
                <div key={post.id} style={postContainer}>
                    <img style={postImage} src={post.imageUrl} alt=""/>
                    <h3 style={postTitle}>{post.title}</h3>
                </div>
            ))}
            {/*{posts2.map(post => (*/}
            {/*    <div key={post.id} style={postContainer}>*/}
            {/*        <img style={postImage} src={post.imageUrl} alt=""/>*/}
            {/*        <h3 style={postTitle}>{post.title}</h3>*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    )
}

const postContainer = {
    padding: '20px 0px 0px',
    borderBottom: '1px solid #ddd'
}

const heading = {margin: '20px 0px'};
const postImage = {width: 400};
const postTitle = {marginTop: 4}

export default Posts;