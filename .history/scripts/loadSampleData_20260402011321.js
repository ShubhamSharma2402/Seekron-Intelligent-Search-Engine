import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildIndex } from "../backend/src/search/indexing/indexBuilder.js";

// Fix __dirname in ES modules
// ye ek standard way hai to get the current directory in ES modules since __dirname is not available by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// so this is path to backend/src/data
const dataDir = path.join(__dirname, "../backend/src/data");

//sample datasets for the project
const documents = [
  //technical data sets
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
},

//science data sets
{ id: "64", title: "Quantum Mechanics Basics", content: "Quantum mechanics studies particles at atomic and subatomic levels. It explains phenomena like wave-particle duality and uncertainty principle. It forms the basis of modern physics." },
{ id: "65", title: "Theory of Relativity", content: "Einstein’s theory of relativity explains gravity as curvature of spacetime. It includes special and general relativity. It revolutionized our understanding of the universe." },
{ id: "66", title: "Photosynthesis Process", content: "Photosynthesis is how plants convert sunlight into energy. It uses carbon dioxide and water to produce glucose and oxygen. This process sustains life on Earth." },
{ id: "67", title: "Human Nervous System", content: "The nervous system controls body functions using electrical signals. It includes the brain, spinal cord, and nerves. It helps in coordination and response to stimuli." },
{ id: "68", title: "DNA Structure", content: "DNA carries genetic information in living organisms. It has a double helix structure. It determines heredity and biological traits." },
{ id: "69", title: "Evolution Theory", content: "Evolution explains how species change over time. It is driven by natural selection and genetic variation. Charles Darwin proposed this concept." },
{ id: "70", title: "Black Holes", content: "Black holes are regions of spacetime with extreme gravity. Nothing, not even light, can escape them. They form from collapsed massive stars." },
{ id: "71", title: "Newton's Laws of Motion", content: "Newton’s laws describe motion and forces. They explain how objects move and interact. These laws are fundamental to classical mechanics." },
{ id: "72", title: "Periodic Table", content: "The periodic table organizes elements based on atomic number. It shows chemical properties and trends. It is essential in chemistry studies." },
{ id: "73", title: "Chemical Bonding", content: "Chemical bonds hold atoms together in molecules. Types include ionic, covalent, and metallic bonds. They determine properties of substances." },
{ id: "74", title: "Thermodynamics Laws", content: "Thermodynamics studies heat and energy transfer. It includes four fundamental laws. These laws govern energy conservation and entropy." },
{ id: "75", title: "Electric Current", content: "Electric current is the flow of charge in a conductor. It is measured in amperes. It powers electrical devices." },
{ id: "76", title: "Magnetism", content: "Magnetism arises from moving electric charges. It creates magnetic fields. It is used in motors and generators." },
{ id: "77", title: "Cell Structure", content: "Cells are the basic unit of life. They contain organelles like nucleus and mitochondria. Cells perform vital biological functions." },
{ id: "78", title: "Genetics Basics", content: "Genetics studies heredity and variation. Genes are units of inheritance. DNA controls genetic traits." },
{ id: "79", title: "Astronomy Overview", content: "Astronomy studies celestial objects and space. It includes stars, planets, and galaxies. It helps understand the universe." },
{ id: "80", title: "Solar System", content: "The solar system includes the Sun and orbiting planets. It also contains moons and asteroids. Earth is part of this system." },
{ id: "81", title: "Light Properties", content: "Light behaves as both wave and particle. It travels at high speed in vacuum. It is essential for vision and energy." },
{ id: "82", title: "Sound Waves", content: "Sound is a mechanical wave. It requires a medium to travel. It is produced by vibrations." },
{ id: "83", title: "Climate Science", content: "Climate science studies long-term weather patterns. It analyzes global warming and environmental changes. It helps in sustainability planning." },
{ id: "84", title: "Ecosystem Dynamics", content: "Ecosystems consist of living and non-living components. They interact through energy flow. Balance is crucial for sustainability." },
{ id: "85", title: "Biotechnology", content: "Biotechnology uses biological systems for innovation. It includes genetic engineering and medicine. It has applications in agriculture and health." },
{ id: "86", title: "Nanotechnology", content: "Nanotechnology deals with materials at nanoscale. It enables advanced materials and devices. It is used in medicine and electronics." },
{ id: "87", title: "Renewable Energy", content: "Renewable energy comes from natural sources. Examples include solar and wind energy. It reduces environmental impact." },
{ id: "88", title: "Fossil Fuels", content: "Fossil fuels include coal, oil, and gas. They are non-renewable energy sources. They contribute to pollution." },
{ id: "89", title: "Gravity Concept", content: "Gravity is the force attracting objects with mass. It keeps planets in orbit. It influences motion in the universe." },
{ id: "90", title: "Plate Tectonics", content: "Plate tectonics explains movement of Earth's crust. It causes earthquakes and volcanoes. It shapes continents." },
{ id: "91", title: "Water Cycle", content: "The water cycle describes movement of water on Earth. It includes evaporation, condensation, and precipitation. It maintains ecosystem balance." },
{ id: "92", title: "Human Digestive System", content: "The digestive system breaks down food. It absorbs nutrients for energy. It includes organs like stomach and intestines." },
{ id: "93", title: "Respiratory System", content: "The respiratory system helps in breathing. It exchanges oxygen and carbon dioxide. It includes lungs and airways." },
{ id: "94", title: "Immune System", content: "The immune system defends against pathogens. It includes cells and proteins. It protects the body from disease." },
{ id: "95", title: "Artificial Intelligence", content: "AI simulates human intelligence in machines. It includes machine learning and deep learning. It is widely used in technology." },
{ id: "96", title: "Machine Learning Basics", content: "Machine learning allows systems to learn from data. It improves performance over time. It is used in predictions and automation." },
{ id: "97", title: "Data Science", content: "Data science extracts insights from data. It uses statistics and algorithms. It supports decision-making." },
{ id: "98", title: "Robotics", content: "Robotics involves designing intelligent machines. Robots perform tasks automatically. They are used in industries and research." },
{ id: "99", title: "Cybersecurity", content: "Cybersecurity protects systems from attacks. It includes encryption and authentication. It ensures data safety." },
{ id: "100", title: "Space Exploration", content: "Space exploration studies outer space using spacecraft. It includes missions to planets. It expands scientific knowledge." },
{ id: "101", title: "Genetic Engineering", content: "Genetic engineering modifies DNA. It is used in medicine and agriculture. It helps create improved organisms." },
{ id: "102", title: "Physics of Motion", content: "Motion describes movement of objects. It includes velocity and acceleration. It is governed by physical laws." },
{ id: "103", title: "Energy Conservation", content: "Energy cannot be created or destroyed. It only transforms forms. This is a fundamental law of physics." },
{ id: "104", title: "Wave Theory", content: "Waves transfer energy without matter transfer. They include sound and light waves. They are important in physics." },
{ id: "105", title: "Atoms and Molecules", content: "Atoms are basic units of matter. Molecules form when atoms bond. They make up substances." },
{ id: "106", title: "Organic Chemistry", content: "Organic chemistry studies carbon compounds. It is essential for life sciences. It includes reactions and structures." },
{ id: "107", title: "Inorganic Chemistry", content: "Inorganic chemistry studies non-carbon compounds. It includes metals and minerals. It has industrial applications." },
{ id: "108", title: "Analytical Chemistry", content: "Analytical chemistry analyzes chemical substances. It uses techniques like spectroscopy. It ensures quality control." },
{ id: "109", title: "Environmental Science", content: "Environmental science studies the environment. It focuses on conservation and sustainability. It addresses pollution issues." },
{ id: "110", title: "Meteorology", content: "Meteorology studies weather and atmosphere. It predicts weather patterns. It helps in disaster management." },
{ id: "111", title: "Oceanography", content: "Oceanography studies oceans and marine life. It explores underwater ecosystems. It helps understand climate impact." },
{ id: "112", title: "Geology", content: "Geology studies Earth's structure. It includes rocks and minerals. It explains natural events." },
{ id: "113", title: "Astrophysics", content: "Astrophysics studies physical properties of space. It combines physics and astronomy. It explains cosmic phenomena." },


//bussiness data sets
{ id: "114", title: "Business Strategy", content: "Business strategy defines long-term goals and direction. It helps organizations allocate resources effectively. A strong strategy creates competitive advantage." },
{ id: "115", title: "Marketing Fundamentals", content: "Marketing focuses on promoting products and services. It includes advertising, branding, and customer engagement. It helps businesses reach target audiences." },
{ id: "116", title: "Financial Planning", content: "Financial planning involves managing income and expenses. It helps businesses maintain profitability. Proper planning ensures long-term stability." },
{ id: "117", title: "Human Resource Management", content: "HR management handles employee recruitment and development. It ensures a productive workforce. It plays a key role in organizational success." },
{ id: "118", title: "Operations Management", content: "Operations management focuses on production efficiency. It ensures smooth business processes. It improves quality and reduces costs." },
{ id: "119", title: "Supply Chain Management", content: "Supply chain involves movement of goods and services. It includes sourcing, manufacturing, and delivery. Efficient supply chains reduce delays and costs." },
{ id: "120", title: "Entrepreneurship", content: "Entrepreneurship involves starting and managing businesses. It requires innovation and risk-taking. Entrepreneurs drive economic growth." },
{ id: "121", title: "Startup Funding", content: "Startup funding helps new businesses grow. It includes venture capital and angel investment. Funding supports scaling operations." },
{ id: "122", title: "Business Ethics", content: "Business ethics guide moral decision-making. It promotes fairness and transparency. Ethical practices build trust." },
{ id: "123", title: "Customer Relationship Management", content: "CRM focuses on managing customer interactions. It improves customer satisfaction and loyalty. It uses data-driven strategies." },
{ id: "124", title: "Digital Marketing", content: "Digital marketing uses online platforms for promotion. It includes SEO, social media, and ads. It helps reach global audiences." },
{ id: "125", title: "E-commerce", content: "E-commerce enables buying and selling online. It uses websites and apps. It has transformed retail industries." },
{ id: "126", title: "Brand Management", content: "Brand management builds company identity. It influences customer perception. Strong branding increases loyalty." },
{ id: "127", title: "Market Research", content: "Market research analyzes consumer behavior. It helps understand demand and trends. It supports better decision-making." },
{ id: "128", title: "Business Analytics", content: "Business analytics uses data for insights. It improves efficiency and performance. It supports strategic decisions." },
{ id: "129", title: "Accounting Basics", content: "Accounting records financial transactions. It tracks income and expenses. It ensures financial accuracy." },
{ id: "130", title: "Corporate Finance", content: "Corporate finance manages company funds. It focuses on investments and capital. It aims to maximize shareholder value." },
{ id: "131", title: "Leadership Skills", content: "Leadership involves guiding teams effectively. It includes decision-making and motivation. Good leaders drive success." },
{ id: "132", title: "Organizational Behavior", content: "Organizational behavior studies employee interactions. It improves workplace productivity. It helps manage teams effectively." },
{ id: "133", title: "Project Management", content: "Project management plans and executes tasks. It ensures timely delivery. It uses tools and methodologies." },
{ id: "134", title: "Risk Management", content: "Risk management identifies potential threats. It minimizes losses. It ensures business continuity." },
{ id: "135", title: "Global Business", content: "Global business involves international operations. It includes trade and investment. It connects markets worldwide." },
{ id: "136", title: "Retail Management", content: "Retail management focuses on store operations. It includes inventory and customer service. It improves sales performance." },
{ id: "137", title: "Sales Techniques", content: "Sales techniques help convert leads into customers. They involve communication and persuasion. Effective sales increase revenue." },
{ id: "138", title: "Negotiation Skills", content: "Negotiation involves reaching agreements. It requires communication and strategy. It benefits business deals." },
{ id: "139", title: "Business Communication", content: "Business communication ensures clear information exchange. It includes verbal and written forms. It improves collaboration." },
{ id: "140", title: "Franchise Model", content: "Franchising allows business expansion. It uses a proven model. It benefits both franchisor and franchisee." },
{ id: "141", title: "Lean Management", content: "Lean management reduces waste. It improves efficiency. It focuses on value creation." },
{ id: "142", title: "Six Sigma", content: "Six Sigma improves quality. It reduces defects. It uses data-driven methods." },
{ id: "143", title: "Innovation Management", content: "Innovation management encourages new ideas. It drives business growth. It improves competitiveness." },
{ id: "144", title: "Corporate Strategy", content: "Corporate strategy defines overall direction. It aligns business units. It ensures long-term success." },
{ id: "145", title: "Business Law", content: "Business law governs commercial activities. It includes contracts and regulations. It ensures legal compliance." },
{ id: "146", title: "Taxation", content: "Taxation involves government charges. Businesses must comply with tax laws. It affects profitability." },
{ id: "147", title: "Investment Strategies", content: "Investment strategies guide financial decisions. They balance risk and return. They help grow wealth." },
{ id: "148", title: "Stock Market Basics", content: "Stock markets allow trading of shares. They reflect company performance. They are key to investment." },
{ id: "149", title: "Business Models", content: "Business models define revenue generation. They outline operations. They are key to success." },
{ id: "150", title: "Competitive Analysis", content: "Competitive analysis studies rivals. It identifies strengths and weaknesses. It helps in strategy planning." },
{ id: "151", title: "Customer Experience", content: "Customer experience focuses on satisfaction. It improves brand loyalty. It enhances retention." },
{ id: "152", title: "Pricing Strategies", content: "Pricing strategies set product value. They influence demand. They affect profitability." },
{ id: "153", title: "Advertising", content: "Advertising promotes products. It uses media channels. It increases brand awareness." },
{ id: "154", title: "Public Relations", content: "Public relations manage company image. It builds trust with stakeholders. It handles communication." },
{ id: "155", title: "Logistics Management", content: "Logistics manages transportation and storage. It ensures timely delivery. It reduces costs." },
{ id: "156", title: "Business Intelligence", content: "Business intelligence analyzes data. It supports decision-making. It improves performance." },
{ id: "157", title: "Corporate Governance", content: "Corporate governance ensures accountability. It involves rules and policies. It protects stakeholders." },
{ id: "158", title: "Mergers and Acquisitions", content: "M&A involve combining companies. They support growth strategies. They increase market share." },
{ id: "159", title: "Business Sustainability", content: "Sustainability focuses on long-term impact. It balances profit and environment. It ensures future growth." },
{ id: "160", title: "Workplace Culture", content: "Workplace culture defines environment. It affects employee satisfaction. It improves productivity." },
{ id: "161", title: "Time Management", content: "Time management improves efficiency. It prioritizes tasks. It increases productivity." },
{ id: "162", title: "Decision Making", content: "Decision making involves choosing options. It uses data and analysis. It impacts business success." },
{ id: "163", title: "Strategic Planning", content: "Strategic planning sets long-term goals. It guides business direction. It ensures growth and stability." },


//health data sets
{ id: "164", title: "Healthy Diet", content: "A healthy diet includes balanced nutrients. It supports growth and energy. It prevents diseases." },
{ id: "165", title: "Exercise Benefits", content: "Exercise improves physical fitness. It strengthens muscles and heart. It boosts mental well-being." },
{ id: "166", title: "Mental Health", content: "Mental health affects emotions and behavior. It includes stress and anxiety management. Awareness is important." },
{ id: "167", title: "Balanced Nutrition", content: "Balanced nutrition includes proteins, carbs, and fats. It supports body functions. It maintains health." },
{ id: "168", title: "Immunity System", content: "The immune system fights infections. It protects the body. Strong immunity prevents illness." },
{ id: "169", title: "Hydration", content: "Water is essential for life. It regulates body temperature. It prevents dehydration." },
{ id: "170", title: "Sleep Importance", content: "Sleep helps body recovery. It improves memory and focus. Lack of sleep affects health." },
{ id: "171", title: "Heart Health", content: "Heart health depends on lifestyle. Exercise and diet are key. It prevents heart diseases." },
{ id: "172", title: "Diabetes", content: "Diabetes affects blood sugar levels. It requires monitoring and care. It can be managed with lifestyle." },
{ id: "173", title: "Obesity", content: "Obesity results from excess fat. It increases health risks. Healthy habits can prevent it." },
{ id: "174", title: "Blood Pressure", content: "Blood pressure measures heart function. High levels are risky. It requires control." },
{ id: "175", title: "Yoga", content: "Yoga improves flexibility and relaxation. It reduces stress. It supports overall health." },
{ id: "176", title: "Meditation", content: "Meditation calms the mind. It reduces anxiety. It improves focus and clarity." },
{ id: "177", title: "Hygiene Practices", content: "Hygiene prevents infections. It includes handwashing and cleanliness. It protects health." },
{ id: "178", title: "Vaccination", content: "Vaccines prevent diseases. They strengthen immunity. They are essential for public health." },
{ id: "179", title: "First Aid", content: "First aid provides immediate care. It prevents complications. It saves lives." },
{ id: "180", title: "Stress Management", content: "Stress affects mental health. It can be managed with relaxation techniques. Balance is important." },
{ id: "181", title: "Nutrition Deficiency", content: "Deficiency occurs due to lack of nutrients. It affects body function. Balanced diet prevents it." },
{ id: "182", title: "Protein Intake", content: "Protein helps muscle growth. It repairs tissues. It is essential for body strength." },
{ id: "183", title: "Vitamin Importance", content: "Vitamins support body functions. They boost immunity. They prevent diseases." },
{ id: "184", title: "Minerals in Diet", content: "Minerals like calcium and iron are vital. They support bones and blood. Balanced intake is important." },
{ id: "185", title: "Digestive Health", content: "Digestive health ensures proper food breakdown. It absorbs nutrients. It supports energy." },
{ id: "186", title: "Respiratory Health", content: "Respiratory health involves lungs and breathing. Clean air is essential. It prevents diseases." },
{ id: "187", title: "Skin Care", content: "Skin protects the body. Proper care prevents damage. Hydration and hygiene help." },
{ id: "188", title: "Eye Health", content: "Eye health ensures good vision. It requires proper nutrition. Regular checkups are important." },
{ id: "189", title: "Bone Health", content: "Bones provide structure. Calcium strengthens bones. Exercise improves bone health." },
{ id: "190", title: "Fitness Training", content: "Fitness training improves strength. It includes cardio and weight training. It boosts stamina." },
{ id: "191", title: "Cardio Exercise", content: "Cardio improves heart health. It includes running and cycling. It burns calories." },
{ id: "192", title: "Strength Training", content: "Strength training builds muscles. It increases endurance. It improves metabolism." },
{ id: "193", title: "Healthy Lifestyle", content: "A healthy lifestyle includes diet and exercise. It improves quality of life. It prevents diseases." },
{ id: "194", title: "Public Health", content: "Public health focuses on community well-being. It prevents disease spread. It promotes health awareness." },
{ id: "195", title: "Medical Checkups", content: "Regular checkups detect diseases early. They ensure timely treatment. They improve health outcomes." },
{ id: "196", title: "Cholesterol", content: "Cholesterol affects heart health. High levels are harmful. Diet control is important." },
{ id: "197", title: "Weight Management", content: "Weight management maintains healthy body weight. It involves diet and exercise. It prevents diseases." },
{ id: "198", title: "Hydration Benefits", content: "Hydration supports body functions. It improves energy levels. It keeps organs healthy." },
{ id: "199", title: "Healthy Habits", content: "Healthy habits include regular exercise. They improve well-being. They prevent illness." },
{ id: "200", title: "Mental Wellness", content: "Mental wellness ensures emotional balance. It reduces stress. It improves life quality." },
{ id: "201", title: "Food Safety", content: "Food safety prevents contamination. It ensures hygiene. It protects health." },
{ id: "202", title: "Allergies", content: "Allergies are immune reactions. They cause discomfort. They require management." },
{ id: "203", title: "Infectious Diseases", content: "Infectious diseases spread through pathogens. Prevention is key. Vaccination helps." },
{ id: "204", title: "Non-communicable Diseases", content: "These diseases are not infectious. Examples include diabetes. Lifestyle changes help." },
{ id: "205", title: "Healthy Eating", content: "Healthy eating includes balanced meals. It provides nutrients. It supports growth." },
{ id: "206", title: "Physical Activity", content: "Physical activity keeps the body active. It improves fitness. It reduces health risks." },
{ id: "207", title: "Wellness Programs", content: "Wellness programs promote health. They include fitness and nutrition. They improve productivity." },
{ id: "208", title: "Rehabilitation", content: "Rehabilitation helps recovery from injury. It restores function. It improves quality of life." },
{ id: "209", title: "Health Education", content: "Health education spreads awareness. It promotes healthy behavior. It prevents disease." },
{ id: "210", title: "Preventive Care", content: "Preventive care avoids illness. It includes vaccines and screenings. It improves longevity." },
{ id: "211", title: "Fitness Goals", content: "Fitness goals guide training. They improve consistency. They help track progress." },
{ id: "212", title: "Healthy Aging", content: "Healthy aging maintains well-being. It includes active lifestyle. It improves lifespan." },
{ id: "213", title: "Holistic Health", content: "Holistic health considers mind and body. It promotes balance. It improves overall wellness." },
];

//  so i have assigned categories based on id for now and if i want to add more documents i will change the id accordingly or declare 
// category in the document.
documents.forEach((doc) => {
  const id = parseInt(doc.id);
  if (id >= 1 && id <= 63) doc.category = "technology";
  else if (id >= 64 && id <= 113) doc.category = "science";
  else if (id >= 114 && id <= 163) doc.category = "business";
  else if (id >= 164 && id <= 213) doc.category = "health";
});

// checking if the folder exists , imp step 
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

// so here is merging these data setts with the exsiting documents.
//if there are any document with same id , just overwrite it
const existingMap = new Map(existing.map((d) => [String(d.id), d]));
documents.forEach((d) => existingMap.set(String(d.id), d));
const merged = Array.from(existingMap.values());

// merge document ko likh do
fs.writeFileSync(docsPath, JSON.stringify(merged, null, 2));

console.log(`✅ documents.json updated (${merged.length} total documents)`);
buildIndex();

console.log("✅ Index built successfully");