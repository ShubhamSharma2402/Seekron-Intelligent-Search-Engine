import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildIndex } from "../backend/src/search/indexing/indexBuilder.js";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Correct path to backend/src/data
const dataDir = path.join(__dirname, "../backend/src/data");

// Sample documents
const documents = [
  {
    id: "1",
    title: "Node.js Basics",
    content: "Node.js is a runtime environment for JavaScript.",
  },
  {
    id: "2",
    title: "React Guide",
    content: "React is a frontend library for building UI.",
  },
  {
    id: "3",
    title: "Express Framework",
    content: "Express is a backend framework for Node.js.",
  },
  
  {
    id: "4",
    title: "Data Structures Overview",
    content: "Data structures are a way of organizing and storing data so it can be accessed efficiently. Common data structures include arrays, linked lists, stacks, and queues. Choosing the right data structure can improve both the performance and readability of code."
  },
  {
    id: "5",
    title: "Arrays in Programming",
    content: "An array is a collection of elements identified by index or key. Arrays are widely used due to their simplicity and speed in accessing elements. However, inserting or deleting elements in the middle of an array can be costly in terms of performance."
  },
  {
    id: "6",
    title: "Stacks and Queues",
    content: "Stacks are data structures that follow the LIFO principle, where the last element added is the first to be removed. Queues follow FIFO, where the first element added is the first to be removed. Both are used in algorithm design and task scheduling."
  },
  {
    id: "7",
    title: "Binary Search Trees",
    content: "A binary search tree (BST) is a data structure where each node has at most two children. The left child contains values less than the parent, and the right child contains values greater than the parent. BSTs allow for efficient search, insertion, and deletion operations."
  },
  {
    id: "8",
    title: "Graph Theory Basics",
    content: "Graphs are a collection of nodes and edges representing relationships between entities. They can be directed or undirected, weighted or unweighted. Graph algorithms are used in network analysis, pathfinding, and recommendation systems."
  },
  {
    id: "9",
    title: "Relational Databases",
    content: "Relational databases store data in tables with rows and columns. SQL is the standard language for querying and manipulating relational databases. Proper normalization ensures data integrity and reduces redundancy."
  },
  {
    id: "10",
    title: "NoSQL Databases",
    content: "NoSQL databases are designed for flexible, schema-less data storage. They include document databases, key-value stores, column-family stores, and graph databases. NoSQL is preferred for handling large-scale and unstructured data."
  },
  {
    id: "11",
    title: "RESTful APIs",
    content: "RESTful APIs follow the principles of REST architecture, allowing communication between client and server over HTTP. They use standard HTTP methods like GET, POST, PUT, and DELETE. REST APIs are stateless, scalable, and easy to integrate with web and mobile applications."
  },
  {
    id: "12",
    title: "Introduction to AI",
    content: "Artificial Intelligence (AI) is the simulation of human intelligence in machines. It includes tasks like reasoning, learning, problem-solving, and language understanding. AI applications include chatbots, recommendation engines, and self-driving cars."
  },
  {
    id: "13",
    title: "Machine Learning Fundamentals",
    content: "Machine Learning (ML) is a subset of AI focused on teaching machines to learn from data. ML algorithms can be supervised, unsupervised, or reinforcement-based. Feature engineering and model selection are critical steps for building effective ML systems."
  },
{
  id: "14",
  title: "Deep Learning Basics",
  content: "Deep Learning is a subset of machine learning that uses neural networks with many layers. It excels at recognizing patterns in large datasets and is widely used in image recognition, NLP, and autonomous systems."
},
{
  id: "15",
  title: "Convolutional Neural Networks",
  content: "CNNs are specialized neural networks for processing grid-like data such as images. They use convolutional layers to automatically detect spatial hierarchies of features and are widely used in computer vision tasks."
},
{
  id: "16",
  title: "Recurrent Neural Networks",
  content: "RNNs are neural networks designed for sequential data. They maintain a memory of previous inputs and are commonly used in time series prediction, language modeling, and speech recognition."
},
{
  id: "17",
  title: "Natural Language Processing",
  content: "NLP focuses on the interaction between computers and human language. It enables machines to read, understand, and generate natural language, powering chatbots, translation, and sentiment analysis."
},
{
  id: "18",
  title: "Python for AI",
  content: "Python is a preferred language for AI due to its simplicity and rich ecosystem of libraries like TensorFlow, PyTorch, and scikit-learn. It allows rapid prototyping and efficient data handling for machine learning tasks."
},
{
  id: "19",
  title: "JavaScript for Web Development",
  content: "JavaScript is a versatile language for building interactive web applications. It can manipulate HTML and CSS, handle events, and communicate with servers via APIs."
},
{
  id: "20",
  title: "Frontend Frameworks Overview",
  content: "Frontend frameworks like React, Angular, and Vue provide structured ways to build dynamic user interfaces. They simplify state management, routing, and component reuse."
},
{
  id: "21",
  title: "React Components",
  content: "React components are reusable UI building blocks. They can be functional or class-based, manage their own state, and allow a declarative way of describing the UI."
},
{
  id: "22",
  title: "State Management in React",
  content: "State management involves controlling the data that affects UI rendering. React provides useState and useReducer, while libraries like Redux handle complex global states."
},
{
  id: "23",
  title: "Node.js Event Loop",
  content: "The event loop in Node.js allows asynchronous operations to execute without blocking the main thread. It handles I/O operations efficiently, enabling high concurrency in server applications."
},
{
  id: "24",
  title: "Express Middleware",
  content: "Middleware functions in Express process requests before they reach route handlers. They can handle logging, authentication, and error handling, providing modular request processing."
},
{
  id: "25",
  title: "REST API Best Practices",
  content: "REST APIs should follow standards such as using HTTP methods correctly, statelessness, proper status codes, and clear documentation. This ensures maintainable and scalable APIs."
},
{
  id: "26",
  title: "GraphQL Basics",
  content: "GraphQL is a query language for APIs that allows clients to request exactly the data they need. It reduces over-fetching and under-fetching problems common in REST APIs."
},
{
  id: "27",
  title: "Data Normalization",
  content: "Normalization organizes database tables to reduce redundancy and improve data integrity. Common forms include 1NF, 2NF, and 3NF, each addressing specific anomalies."
},
{
  id: "28",
  title: "SQL Joins",
  content: "SQL joins combine rows from two or more tables based on related columns. Types include INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN, allowing complex queries across tables."
},
{
  id: "29",
  title: "Indexing in Databases",
  content: "Indexes improve query performance by allowing fast lookups of rows based on column values. They can be single-column or multi-column and are essential for large datasets."
},
{
  id: "30",
  title: "Hash Tables",
  content: "Hash tables store key-value pairs for efficient lookup, insertion, and deletion. They use a hash function to map keys to indices, making average operations O(1)."
},
{
  id: "31",
  title: "Linked Lists",
  content: "A linked list is a collection of nodes where each node points to the next. They allow efficient insertion and deletion at arbitrary positions but have slower random access compared to arrays."
},
{
  id: "32",
  title: "Dynamic Programming Basics",
  content: "Dynamic Programming (DP) solves problems by breaking them into subproblems and storing intermediate results. It is commonly used for optimization and combinatorial problems."
},
{
  id: "33",
  title: "Sorting Algorithms Overview",
  content: "Sorting algorithms arrange elements in a specific order. Popular algorithms include Bubble Sort, Merge Sort, Quick Sort, and Heap Sort, each with different time and space complexities."
},
{
  id: "34",
  title: "Binary Search Algorithm",
  content: "Binary search efficiently finds a target element in a sorted array by repeatedly dividing the search space in half. It has a time complexity of O(log n)."
},
{
  id: "35",
  title: "Graph Traversal Techniques",
  content: "Graph traversal explores nodes in a graph. BFS uses a queue and explores level by level, while DFS uses recursion or a stack and explores as deep as possible before backtracking."
},
{
  id: "36",
  title: "Heaps and Priority Queues",
  content: "Heaps are specialized trees that maintain a specific order property. Priority queues use heaps to efficiently extract the highest or lowest priority element."
},
{
  id: "37",
  title: "Regular Expressions",
  content: "Regular expressions are patterns used to match strings. They are widely used for input validation, search, and text manipulation in programming languages."
},
{
  id: "38",
  title: "HTTP Protocol Basics",
  content: "HTTP is the protocol for transferring data on the web. It defines methods like GET, POST, PUT, DELETE and status codes for communication between clients and servers."
},
{
  id: "39",
  title: "WebSockets Overview",
  content: "WebSockets provide full-duplex communication between client and server. They are useful for real-time applications like chat apps and live updates."
},
{
  id: "40",
  title: "Authentication Methods",
  content: "Authentication verifies the identity of a user. Methods include passwords, tokens (JWT), OAuth, and multi-factor authentication for secure access."
},
{
  id: "41",
  title: "Authorization vs Authentication",
  content: "Authentication confirms identity, while authorization determines access rights. Both are essential for securing web applications and APIs."
},
{
  id: "42",
  title: "Caching Strategies",
  content: "Caching stores frequently accessed data to improve performance. Techniques include client-side caching, server-side caching, and CDN-based caching."
},
{
  id: "43",
  title: "React Hooks Overview",
  content: "Hooks are functions that let you use state and lifecycle features in functional components. Common hooks include useState, useEffect, and useContext."
},
{
  id: "44",
  title: "Redux Basics",
  content: "Redux is a state management library for predictable application states. It uses actions, reducers, and a centralized store to manage data flow."
},
{
  id: "45",
  title: "Python Libraries for ML",
  content: "Popular Python libraries for machine learning include NumPy, Pandas, scikit-learn, TensorFlow, and PyTorch. They provide tools for data manipulation, modeling, and evaluation."
},
{
  id: "46",
  title: "Feature Engineering",
  content: "Feature engineering transforms raw data into features suitable for ML models. Good features improve model accuracy and reduce training time."
},
{
  id: "47",
  title: "Model Evaluation Metrics",
  content: "Evaluation metrics measure model performance. Common metrics include accuracy, precision, recall, F1-score, and ROC-AUC for classification tasks."
},
{
  id: "48",
  title: "Overfitting and Underfitting",
  content: "Overfitting occurs when a model learns noise instead of patterns, while underfitting occurs when a model is too simple. Proper training and regularization help mitigate these issues."
},
{
  id: "49",
  title: "Gradient Descent Optimization",
  content: "Gradient Descent is an optimization algorithm that minimizes loss functions in ML models. Variants include batch, stochastic, and mini-batch gradient descent."
},
{
  id: "50",
  title: "Hyperparameter Tuning",
  content: "Hyperparameters control the learning process of ML models. Techniques like grid search, random search, and Bayesian optimization help find optimal hyperparameters."
},
{
  id: "51",
  title: "Version Control with Git",
  content: "Git is a distributed version control system that tracks changes in code. It allows collaboration, branching, and merging efficiently."
},
{
  id: "52",
  title: "GitHub for Collaboration",
  content: "GitHub is a platform for hosting Git repositories. It enables team collaboration, code reviews, pull requests, and project management."
},
{
  id: "53",
  title: "Docker Basics",
  content: "Docker is a containerization platform that packages applications with all dependencies. Containers ensure consistent environments across development and production."
},
{
  id: "54",
  title: "Kubernetes Overview",
  content: "Kubernetes is an orchestration tool for managing containerized applications. It automates deployment, scaling, and management of containers in clusters."
},
{
  id: "55",
  title: "Continuous Integration / Continuous Deployment",
  content: "CI/CD automates the process of building, testing, and deploying applications. Tools like Jenkins, GitHub Actions, and GitLab CI enable reliable delivery pipelines."
},
{
  id: "56",
  title: "REST vs GraphQL",
  content: "REST uses multiple endpoints, while GraphQL uses a single endpoint with flexible queries. GraphQL reduces over-fetching and gives clients more control over data retrieval."
},
{
  id: "57",
  title: "JSON Data Format",
  content: "JSON is a lightweight data interchange format. It is easy to read and write, making it popular for APIs and data exchange between client and server."
},
{
  id: "58",
  title: "AJAX for Dynamic Web Pages",
  content: "AJAX allows asynchronous data fetching without page reloads. It improves user experience by enabling dynamic updates in web applications."
},
{
  id: "59",
  title: "Web Security Basics",
  content: "Web security protects applications from threats like XSS, CSRF, SQL injection, and data breaches. Secure coding practices and HTTPS are essential safeguards."
},
{
  id: "60",
  title: "OAuth 2.0 Protocol",
  content: "OAuth 2.0 is an authorization framework that allows third-party applications to access resources without exposing credentials. It is widely used for secure API access."
},
{
  id: "61",
  title: "Microservices Architecture",
  content: "Microservices divide applications into small, independent services. Each service handles a specific business function, improving scalability and maintainability."
},
{
  id: "62",
  title: "Serverless Computing",
  content: "Serverless computing allows developers to run functions without managing servers. Cloud providers handle scaling and infrastructure, enabling rapid development."
},
{
  id: "63",
  title: "Cloud Platforms Overview",
  content: "Cloud platforms like AWS, Azure, and Google Cloud provide scalable computing resources, storage, and services. They enable building modern, resilient applications."
}
];

// Ensure folder exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const docsPath = path.join(dataDir, "documents.json");

// Read existing documents (if any)
let existing = [];
if (fs.existsSync(docsPath)) {
  try {
    existing = JSON.parse(fs.readFileSync(docsPath, "utf-8"));
  } catch {
    existing = [];
  }
}

// Merge: script docs override existing ones with the same id; new ids are appended
const existingMap = new Map(existing.map((d) => [String(d.id), d]));
documents.forEach((d) => existingMap.set(String(d.id), d));
const merged = Array.from(existingMap.values());

// Write merged documents.json
fs.writeFileSync(docsPath, JSON.stringify(merged, null, 2));

console.log(`✅ documents.json updated (${merged.length} total documents)`);
buildIndex();

console.log("✅ Index built successfully");