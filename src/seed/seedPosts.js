import { Service } from '../appwrite/config';
import { Client, ID } from 'appwrite';
import conf from '../conf/conf';

const service = new Service();

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

async function seedPosts() {
    try {
        // Login first (you need to manually login in the app first)
        
        // Create posts
        for (const post of samplePosts) {
            try {
                // Upload a placeholder image for each post
                const file = await service.uploadFile(
                    // You can add a default image file here if needed
                    // For now, we'll skip the image
                );
                
                // Create the post
                const result = await service.createPost({
                    ...post,
                    featuredImage: file ? file.$id : undefined, // Skip if no file was uploaded
                    userId: '68bc8fa30010eee770c9' // Replace with actual user ID after login
                });
                
                console.log(`Created post: ${post.title}`);
            } catch (error) {
                console.error(`Error creating post "${post.title}":`, error);
            }
        }
        
        console.log('Seeding completed!');
    } catch (error) {
        console.error('Seeding failed:', error);
    }
}

export { seedPosts };
