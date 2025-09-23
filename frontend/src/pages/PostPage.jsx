import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import {useParams,Link} from 'react-router-dom'
import CommentSection from '../components/CommentSection'
import PostCard from '../components/PostCard'

const PostPage = () => {
    const {postSlug} = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [post, setPost] = useState(null)
    const [recentPosts, setRecentPosts] = useState(null)
    
    useEffect(()=>{
        const fetchPost = async()=>{
            try {
                setLoading(true)
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
                const data = await res.json()
                if(!res.ok){
                    setError(true)
                    setLoading(false)
                    return
                }
                if(res.ok){
                    setPost(data.posts[0])
                    setLoading(false)
                    setError(false)
                }
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchPost()
    },[postSlug])

    useEffect(()=>{
        try {
            const fetchRecentPosts = async()=>{
                const res = await fetch(`/api/post/getPosts?limit=3`)
                const data = await res.json()
                if(res.ok){
                    setRecentPosts(data.posts)
                }
            }
            fetchRecentPosts()
        } catch (error) {
            console.log(error.message);
        }
    },[])

    if(loading){
        return (
            <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800'>
                <div className='text-center'>
                    <Spinner size='xl' className='mb-4' />
                    <p className='text-slate-600 dark:text-slate-400 animate-pulse'>Loading article...</p>
                </div>
            </div>
        )
    }
    
    return (
        <main className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
            {/* Hero Section */}
            <div className='relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 pt-16 pb-20'>
                <div className='absolute inset-0 bg-black/20'></div>
                <div className='relative max-w-4xl mx-auto px-6 text-center'>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight animate-fade-in'>
                        {post && post.title}
                    </h1>
                    <Link to={`/search?category=${post && post.category}`} className='inline-block'>
                        <Button 
                            color='light' 
                            pill 
                            size='lg'
                            className='bg-white/90 hover:bg-white text-slate-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
                        >
                            {post && post.category}
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-5xl mx-auto px-6 -mt-10 relative z-10'>
                {/* Featured Image */}
                <div className='mb-12'>
                    <img 
                        src={post && post.image} 
                        alt={post && post.title} 
                        className='w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl border-8 border-white dark:border-slate-800 transform hover:scale-[1.02] transition-transform duration-500'
                    />
                </div>

                {/* Article Meta */}
                <div className='bg-white dark:bg-slate-800 rounded-xl p-6 mb-8 shadow-lg border border-slate-200 dark:border-slate-700'>
                    <div className='flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-600 dark:text-slate-400'>
                        <div className='flex items-center gap-2'>
                            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
                            </svg>
                            <span className='font-medium'>
                                {post && new Date(post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd' />
                            </svg>
                            <span className='font-medium italic'>
                                {post && (post.content.length/1000).toFixed(0)} mins read
                            </span>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <article className='bg-white dark:bg-slate-800 rounded-xl p-8 md:p-12 mb-12 shadow-lg border border-slate-200 dark:border-slate-700'>
                    <div 
                        className='prose prose-lg dark:prose-invert max-w-none
                                   prose-headings:text-slate-800 dark:prose-headings:text-slate-200
                                   prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
                                   prose-a:text-blue-600 hover:prose-a:text-blue-800 dark:prose-a:text-blue-400
                                   prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-slate-700/50
                                   prose-code:bg-slate-100 dark:prose-code:bg-slate-700 prose-code:px-2 prose-code:py-1 prose-code:rounded
                                   prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700
                                   prose-img:rounded-xl prose-img:shadow-lg'
                        dangerouslySetInnerHTML={{__html: post && post.content}}
                    />
                </article>

                {/* Comments Section */}
                <div className='bg-white dark:bg-slate-800 rounded-xl p-8 mb-12 shadow-lg border border-slate-200 dark:border-slate-700'>
                    <CommentSection postId={post && post._id} />
                </div>

                {/* Recent Articles */}
                <section className='mb-16'>
                    <div className='text-center mb-12'>
                        <h2 className='text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4'>
                            Recent Articles
                        </h2>
                        <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full'></div>
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {recentPosts && recentPosts.map((recentPost, index) => (
                            <div 
                                key={recentPost._id}
                                className='transform transition-all duration-500 hover:scale-105'
                                style={{
                                    animationDelay: `${index * 150}ms`,
                                    animation: 'fadeInUp 0.6s ease-out forwards'
                                }}
                            >
                                <PostCard post={recentPost} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
            `}</style>
        </main>
    )
}

export default PostPage