import React from 'react';
import { useSelector } from 'react-redux';
import service from '../appwrite/config';

function SeedPosts() {
    const userData = useSelector((state) => state.auth.userData);

    const samplePosts = [
        {
            title: "Getting Started with React Development",
            slug: "getting-started-with-react",
            content: `
# Getting Started with React Development

React has revolutionized how we build web applications. In this comprehensive guide, we'll explore the fundamentals of React development and best practices for building modern web applications.

## Key Concepts

1. **Components**: The building blocks of React applications
2. **Props**: How to pass data between components
3. **State**: Managing component data effectively
4. **Hooks**: Modern way to handle state and side effects

## Why Choose React?

React offers several advantages:
- Virtual DOM for optimal performance
- Component-based architecture
- Rich ecosystem of libraries
- Strong community support

Remember: The best way to learn React is by building projects. Start small, focus on understanding core concepts, and gradually tackle more complex applications.

Happy coding! 🚀`,
            status: "active",
        },
        {
            title: "Modern JavaScript Features Every Developer Should Know",
            slug: "modern-javascript-features",
            content: `
# Modern JavaScript Features Every Developer Should Know

JavaScript has evolved significantly over the years. Let's explore some essential features that make modern JavaScript development more efficient and enjoyable.

## 1. Arrow Functions
\`\`\`javascript
const add = (a, b) => a + b;
\`\`\`

## 2. Destructuring
\`\`\`javascript
const { name, age } = person;
const [first, second] = array;
\`\`\`

## 3. Spread/Rest Operators
\`\`\`javascript
const newArray = [...oldArray];
const sum = (...numbers) => numbers.reduce((a, b) => a + b);
\`\`\`

## 4. Optional Chaining
\`\`\`javascript
const value = object?.property?.nestedProperty;
\`\`\`

These features make your code more concise, readable, and maintainable. Stay tuned for more JavaScript tips! 💻`,
            status: "active",
        },
        {
            title: "Building a Full-Stack Application with MERN Stack",
            slug: "building-with-mern-stack",
            content: `
# Building a Full-Stack Application with MERN Stack

The MERN stack (MongoDB, Express.js, React, Node.js) is a powerful combination for building modern web applications. Let's explore how to create a full-stack application.

## Architecture Overview

1. **MongoDB**: NoSQL database for flexible data storage
2. **Express.js**: Backend framework for building robust APIs
3. **React**: Frontend library for building user interfaces
4. **Node.js**: Runtime environment for server-side JavaScript

## Best Practices

- Use proper project structure
- Implement authentication and authorization
- Handle errors effectively
- Optimize performance
- Follow security guidelines

## Code Sample: Basic Express Server
\`\`\`javascript
const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to our API!' });
});

app.listen(3000, () => console.log('Server running'));
\`\`\`

Ready to build your next big project? Let's get started! 🛠️`,
            status: "active",
        },
        {
            title: "CSS Tips and Tricks for Modern Web Design",
            slug: "css-tips-and-tricks",
            content: `
# CSS Tips and Tricks for Modern Web Design

Creating beautiful and responsive websites requires mastery of CSS. Here are some essential tips and tricks to level up your styling game.

## 1. CSS Grid Layout
\`\`\`css
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}
\`\`\`

## 2. Modern CSS Reset
\`\`\`css
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
\`\`\`

## 3. Custom Properties (Variables)
\`\`\`css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
}
\`\`\`

## 4. Media Queries Best Practices
\`\`\`css
@media (min-width: 768px) {
    .container {
        max-width: 720px;
    }
}
\`\`\`

Stay tuned for more design tips! 🎨`,
            status: "active",
        }
    ];

    const handleSeed = async () => {
        if (!userData) {
            console.log("Please login first!");
            return;
        }

        try {
            for (const post of samplePosts) {
                try {
                    // Create the post
                    const result = await service.createPost({
                        ...post,
                        userId: userData.$id
                    });
                    
                    console.log(`Created post: ${post.title}`);
                } catch (error) {
                    console.error(`Error creating post "${post.title}":`, error);
                }
            }
            
            console.log('All posts created successfully!');
        } catch (error) {
            console.error('Failed to create posts:', error);
        }
    };

    return (
        <div className="w-full py-8">
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4">Seed Sample Posts</h1>
                    <button
                        onClick={handleSeed}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
                    >
                        Create Sample Posts
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SeedPosts;
