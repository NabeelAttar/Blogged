import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import {PostCard, Container} from '../components'
import { useSelector } from 'react-redux'

function AllPosts() {
    const [posts, setPosts] = useState([])    
    const userData = useSelector((state) => state.auth.userData)
    const defaultImage = "65ba6f9081cc51e85890" // Using a public placeholder image
    
    const samplePosts = [
        {
            title: "Getting Started with React Development",
            slug: "getting-started-with-react-2025",
            content: "React has revolutionized web development. Learn about Components, Props, State, and Hooks - the building blocks of modern React applications. Discover best practices and tips for building scalable apps.",
            featuredImage: "68bdc8ff003c421efb33",
        },
        {
            title: "Modern JavaScript Features Every Developer Should Know",
            slug: "modern-javascript-features-2025",
            content: "Explore essential modern JavaScript features including arrow functions, destructuring, spread/rest operators, and optional chaining. Make your code more concise and maintainable.",
            featuredImage: "68bdc94e0013157369c9",
        },
        {
            title: "Building a Full-Stack Application with MERN Stack",
            slug: "building-with-mern-stack-2025",
            content: "Discover the power of MERN stack (MongoDB, Express.js, React, Node.js) for building modern web applications. Learn about architecture, best practices, and implementation patterns.",
            featuredImage: "68bdc9ad00167a090f62",
        },
        {
            title: "CSS Tips and Tricks for Modern Web Design",
            slug: "css-tips-and-tricks-2025",
            content: "Master modern CSS with essential tips including Grid Layout, CSS Reset, Custom Properties, and Media Queries. Create beautiful and responsive websites with these powerful techniques.",
            featuredImage: "68bdca280017eab4bda4",
        },
        {
            title: "Mastering Git for Team Collaboration",
            slug: "mastering-git-collaboration-2025",
            content: "Learn essential Git workflows for effective team collaboration. Understand branching strategies, merge conflicts resolution, and best practices for maintaining a clean Git history.",
            featuredImage: "68bdca7c000c10d50df9",
        },
        {
            title: "TypeScript: The Future of JavaScript Development",
            slug: "typescript-future-development-2025",
            content: "Discover how TypeScript enhances JavaScript development with static typing, interfaces, and advanced object-oriented features. Learn to write more maintainable and scalable code.",
            featuredImage: "68bdcadc002140b6f88a",
        },
        {
            title: "Redux Toolkit: Simplified State Management",
            slug: "redux-toolkit-state-management-2025",
            content: "Explore Redux Toolkit's modern approach to state management in React applications. Learn about slices, thunks, and how to effectively manage complex application state.",
            featuredImage: "68bdcb29000f301e682f",
        },
        {
            title: "API Design Best Practices with REST",
            slug: "api-design-best-practices-2025",
            content: "Master the principles of RESTful API design. Learn about resource naming, HTTP methods, status codes, and authentication patterns for building robust APIs.",
            featuredImage: "68bdcb800020eb87f65b",
        },
        {
            title: "Optimizing React Performance",
            slug: "optimizing-react-performance-2025",
            content: "Learn advanced techniques for optimizing React applications. Discover code splitting, lazy loading, useMemo, useCallback, and other performance optimization strategies.",
            featuredImage: "68bdcbd3002d3f4a77e9",
        },
        {
            title: "Modern Authentication Patterns",
            slug: "modern-authentication-patterns-2025",
            content: "Explore modern authentication patterns including JWT, OAuth 2.0, and Social Login. Learn to implement secure user authentication in web applications.",
            featuredImage: "68bdcc3300154d0c6e2a",
        },
        {
            title: "Docker for Web Developers",
            slug: "docker-for-web-developers-2025",
            content: "Get started with Docker for web development. Learn about containers, Docker Compose, and how to containerize your web applications for consistent development environments.",
            featuredImage: "68bdcca30037f76d6bd5",
        },
        {
            title: "Testing React Applications",
            slug: "testing-react-applications-2025",
            content: "Master testing in React with Jest and React Testing Library. Learn about unit testing, integration testing, and test-driven development practices.",
            featuredImage: "68bdccfb0000e8e6047a",
        },
        {
            title: "CSS-in-JS: Styled Components",
            slug: "css-in-js-styled-components-2025",
            content: "Explore the power of Styled Components for writing CSS in JavaScript. Learn about component-based styling, theming, and dynamic styles in React applications.",
            featuredImage: "68bdcd650005b971b5be",
        },
        {
            title: "Web Accessibility (A11y) Best Practices",
            slug: "web-accessibility-best-practices-2025",
            content: "Learn how to make your web applications accessible to all users. Understand ARIA attributes, keyboard navigation, and semantic HTML for better accessibility.",
            featuredImage: "68bdcdb500387d746d36",
        },
        {
            title: "Progressive Web Apps (PWA)",
            slug: "progressive-web-apps-2025",
            content: "Build modern Progressive Web Apps that work offline and feel like native applications. Learn about service workers, web manifests, and PWA best practices.",
            featuredImage: "68bdce1f000e95d53731",
        },
    ]
    const createSamplePosts = async () => {
        if (!userData) {
            console.log("User not logged in");
            return [];
        }
        
        try {
            const results = [];
            for (const post of samplePosts) {
                try {
                    // Check if post already exists
                    const existingPost = await service.getPost(post.slug);
                    if (existingPost) {
                        console.log(`Post "${post.title}" already exists, skipping...`);
                        results.push(existingPost);
                        continue;
                    }

                    const result = await service.createPost({
                        ...post,
                        userId: userData.$id,
                        featuredImage: "65bce4a6e2b9cb40710c" // Default image ID - you can replace this with your uploaded image ID
                    });
                    if (result) {
                        results.push(result);
                        console.log(`Created post: ${post.title}`);
                    }
                } catch (error) {
                    if (error.code !== 409) { // Ignore "already exists" errors
                        console.error(`Error creating post "${post.title}":`, error);
                    }
                }
            }
            return results;
        } catch (error) {
            console.error('Failed to create sample posts:', error);
            return [];
        }
    };
    
    useEffect(() => {
        const initializePosts = async () => {
            try {
                const existingPosts = await service.getPosts();
                if (existingPosts && existingPosts.length === 0 && userData) {
                    // Only create sample posts if there are no existing posts and user is logged in
                    const newPosts = await createSamplePosts();
                    if (newPosts.length > 0) {
                        setPosts(newPosts);
                    }
                } else if (existingPosts) {
                    setPosts(existingPosts);
                }
            } catch (error) {
                console.error('Error initializing posts:', error);
            }
        };

        initializePosts();
    }, [userData]) // Add userData as dependency to ensure we have it
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap -m-2'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4'>
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts