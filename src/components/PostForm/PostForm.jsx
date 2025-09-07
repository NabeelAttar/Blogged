import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    }) //watch is used to continuously monitor, RTE ka control iske control me aayega

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth?.userData)
    const submit = async (data) => {
        if (post) {
            let file = null;

            if (data.image[0]) {
                file = await service.uploadFile(data.image[0]);
                await service.deleteFile(post.featuredImage);
            }

            const nextFeaturedImage = file ? file.$id : post.featuredImage;

            // If slug changed, create new doc with new slug and delete old
            if (data.slug !== post.$id) {
                const newDoc = await service.createPost({
                    title: data.title,
                    slug: data.slug,
                    content: data.content,
                    featuredImage: nextFeaturedImage,
                    status: data.status,
                    userId: post.userId,
                });

                if (newDoc) {
                    await service.deletePost(post.$id);
                    navigate(`/post/${newDoc.$id}`);
                }
                return;
            }

            // Slug unchanged → normal update
            const dbPost = await service.updatePost(post.$id, {
                title: data.title,
                content: data.content,
                featuredImage: file ? file.$id : undefined,
                status: data.status,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } 
        else {
            // create a Post
            const file = await service.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
            }
            const dbPost = await service.createPost({
                ...data,
                userId: userData?.$id || "guest"
            })
            
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
    }

    //  generate slug , if space, replace by -
    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') return value.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').substring(0, 36)
        // replace says leaving all value between a-z , A-Z, all digits, all spaces , replace everythin with '-' and then replace spaces with '-'
        return ''
    }, [])

    // important interview question - how to use this generated slug
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [slugTransform, setValue, watch])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm