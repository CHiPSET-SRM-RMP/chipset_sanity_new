"use client";

import React, { useState } from "react";
import { Trash2, Plus, Search } from "lucide-react";

interface Subject {
    id: string;
    name: string;
    totalCourseHours: number;  // Total hours for entire semester
    hoursHappened: number;      // Hours that have occurred so far
    attendedHours: number;      // Hours you actually attended
}

const predefinedSubjects = [
    // ============= FIRST YEAR COURSES (Extracted from PDF) =============
    // Humanities and Social Sciences
    { name: "Communicative English", hours: 45 },              // L=2 T=1 P=0 C=3
    { name: "Chinese", hours: 45 },                            // L=2 T=1 P=0 C=3
    { name: "French", hours: 45 },                             // L=2 T=1 P=0 C=3
    { name: "German", hours: 45 },                             // L=2 T=1 P=0 C=3
    { name: "Japanese", hours: 45 },                           // L=2 T=1 P=0 C=3
    { name: "Korean", hours: 45 },                             // L=2 T=1 P=0 C=3
    { name: "Spanish", hours: 45 },                            // L=2 T=1 P=0 C=3
    { name: "Philosophy of Engineering", hours: 45 },          // L=1 T=0 P=2 C=2
    { name: "Fundamentals of Economics", hours: 45 },          // L=3 T=0 P=0 C=3
    { name: "Fundamentals of Management", hours: 45 },         // L=3 T=0 P=0 C=3
    { name: "Basics of Accounting and Costing", hours: 45 },   // L=2 T=1 P=0 C=3

    // Basic Science Courses
    { name: "Introduction to Computational Biology", hours: 30 },  // L=2 T=0 P=0 C=2
    { name: "Biology", hours: 30 },                            // L=2 T=0 P=0 C=2
    { name: "Biology: Human Physiology and Anatomy", hours: 30 },  // L=2 T=0 P=0 C=2
    { name: "Cell Biology", hours: 30 },                       // L=2 T=0 P=0 C=2
    { name: "Calculus and Linear Algebra", hours: 60 },        // L=3 T=1 P=0 C=4
    { name: "Advanced Calculus and Complex Analysis", hours: 60 },  // L=3 T=1 P=0 C=4
    { name: "Probability and Statistics", hours: 60 },         // L=3 T=1 P=0 C=4
    { name: "Probability and Queuing Theory", hours: 60 },
    { name: "Physics: Electromagnetic Theory, Quantum Mechanics, Waves and Optics", hours: 90 },  // L=3 T=1 P=2 C=5
    { name: "Semiconductor Physics and Computational Methods", hours: 90 },  // L=3 T=1 P=2 C=5
    { name: "Physics: Mechanics", hours: 90 },                 // L=3 T=1 P=2 C=5
    { name: "Chemistry", hours: 90 },                          // L=3 T=1 P=2 C=5

    // Non Credit Courses
    { name: "Environmental Science", hours: 15 },              // L=1 T=0 P=0 C=0
    { name: "Constitution of India", hours: 15 },              // L=1 T=0 P=0 C=0
    { name: "Indian Traditional Knowledge", hours: 15 },       // L=1 T=0 P=0 C=0
    { name: "Indian Art Form", hours: 15 },
    { name: "Universal Human Values", hours: 15 },             // L=1 T=0 P=0 C=0
    { name: "Discrete Mathematics", hours: 60 },
    { name: "Short Range Wireless Communication", hours: 45 },
    { name: "UHV -2 universal human values understanding harmony and ethical human conduct", hours: 45 },
    { name: "Critical and Creative Thinking", hours: 30 },
    { name: "Professional Skills and Practices", hours: 30 },  // L=0 T=0 P=2 C=0
    { name: "General Aptitude", hours: 30 },                   // L=0 T=0 P=2 C=0
    { name: "Employability Skills and Practices", hours: 30 }, // L=0 T=0 P=2 C=0
    { name: "Physical and Mental Health using Yoga", hours: 30 },  // L=0 T=0 P=2 C=0
    { name: "National Service Scheme", hours: 30 },            // L=0 T=0 P=2 C=0
    { name: "National Cadet Corps", hours: 30 },               // L=0 T=0 P=2 C=0

    // Engineering Science Courses (First Year)
    { name: "Programming for Problem Solving", hours: 75 },    // L=3 T=0 P=2 C=4
    { name: "Electrical and Electronics Engineering", hours: 60 },  // L=3 T=1 P=0 C=4
    { name: "Basic Civil and Mechanical Workshop", hours: 60 },  // L=0 T=0 P=4 C=2
    { name: "Engineering Graphics and Design", hours: 60 },    // L=0 T=0 P=4 C=2
    { name: "Engineering Mechanics", hours: 60 },              // L=3 T=1 P=0 C=4
    { name: "Applied Engineering Mechanics", hours: 45 },      // L=3 T=0 P=0 C=3
    { name: "Artifact Dissection Laboratory", hours: 30 },     // L=0 T=0 P=2 C=1
    { name: "Foundation of Data Analysis", hours: 60 },        // L=2 T=0 P=2 C=3

    // Professional Core Courses (First Year)
    { name: "Biochemistry", hours: 45 },                       // L=3 T=0 P=0 C=3
    { name: "Biomedical Sensors", hours: 60 },                 // L=2 T=0 P=2 C=3
    { name: "Building Materials in the Built Environment", hours: 45 },  // L=3 T=0 P=0 C=3
    { name: "Physical and Analytical Chemistry", hours: 60 },  // L=2 T=0 P=2 C=3
    { name: "Object Oriented Design and Programming", hours: 45 },  // L=2 T=1 P=0 C=3
    { name: "Electric Circuits", hours: 60 },                  // L=2 T=0 P=2 C=3
    { name: "Electronic System and PCB Design", hours: 60 },   // L=2 T=0 P=2 C=3
    { name: "Fiber Optics and Optoelectronics", hours: 45 },   // L=3 T=0 P=0 C=3
    { name: "Systems Programming", hours: 75 },                // L=3 T=0 P=2 C=4
    { name: "Sensors and Actuators", hours: 75 },              // L=3 T=0 P=2 C=4
    { name: "Elements of Mechatronics Systems", hours: 45 },   // L=2 T=1 P=0 C=3
    { name: "Nanoscience and Nanotechnology", hours: 45 },     // L=3 T=0 P=0 C=3
    { name: "Physics of Materials", hours: 45 },               // L=3 T=0 P=0 C=3

    // Bridge Courses (Lateral Entry)
    { name: "Mathematics (LE)", hours: 60 },                   // L=3 T=1 P=0 C=4
    { name: "Engineering Physics (LE)", hours: 30 },           // L=2 T=0 P=0 C=2
    { name: "Chemistry (LE)", hours: 30 },                     // L=2 T=0 P=0 C=2
    { name: "Design Thinking and Methodology", hours: 45 },    // L=3 T=0 P=0 C=3 (Semester 3)

    // ============= HIGHER SEMESTER CSE COURSES =============
    // Professional Core Courses
    { name: "Computer Organization and Architecture", hours: 60 },
    { name: "Data Structures and Algorithms", hours: 75 },
    { name: "Operating Systems", hours: 75 },
    { name: "Advanced Programming Practice", hours: 60 },
    { name: "Design and Analysis of Algorithms", hours: 75 },
    { name: "Database Management Systems", hours: 60 },
    { name: "Formal Language and Automata", hours: 45 },
    { name: "Computer Networks", hours: 75 },
    { name: "Software Engineering and Project Management", hours: 75 },
    { name: "Compiler Design", hours: 75 },
    { name: "Machine Learning", hours: 60 },
    { name: "Deep Learning Techniques", hours: 75 },
    { name: "Software Architecture and Design", hours: 75 },
    { name: "Big Data Essentials", hours: 60 },
    { name: "Cloud Architecture and Protocols", hours: 75 },
    { name: "Wireless Networks", hours: 75 },
    { name: "Mobile Adhoc Networks", hours: 75 },
    { name: "Security Risk Management Principles", hours: 45 },
    { name: "Malware Analysis", hours: 75 },
    { name: "Information Retrieval Techniques", hours: 75 },
    { name: "Cloud Computing for IoT", hours: 75 },
    { name: "Fog Computing", hours: 75 },
    { name: "Blockchain using Cryptography", hours: 45 },

    // Professional Elective Courses - CSE
    { name: "Digital Image Processing", hours: 45 },
    { name: "Biometrics", hours: 45 },
    { name: "Internet of Things", hours: 45 },
    { name: "Bio Inspired Computing", hours: 45 },
    { name: "Computer Graphics and Animation", hours: 45 },
    { name: "Computational Logic", hours: 45 },
    { name: "Neuro Fuzzy and Genetic Programming", hours: 45 },
    { name: "Augmented, Virtual and Mixed Reality", hours: 45 },
    { name: "Full Stack Web Development", hours: 45 },
    { name: "Data Mining and Analytics", hours: 45 },
    { name: "Natural Language Processing", hours: 45 },
    { name: "Distributed Computing", hours: 45 },
    { name: "Network Security and Cryptography", hours: 45 },
    { name: "Information Storage and Management", hours: 45 },
    { name: "High Performance Computing", hours: 45 },
    { name: "Database Security and Privacy", hours: 45 },
    { name: "Cloud Computing", hours: 45 },
    { name: "Advanced Mobile Communications", hours: 45 },
    { name: "Pattern Recognition Techniques", hours: 45 },
    { name: "Semantic Web", hours: 45 },
    { name: "Speech Recognition", hours: 45 },
    { name: "Computer Vision", hours: 45 },
    { name: "Social Network Analysis", hours: 45 },
    { name: "Software Defined Networks", hours: 45 },
    { name: "Service Oriented Architecture", hours: 45 },
    { name: "Wireless and Mobile Communication", hours: 45 },
    { name: "Wireless Sensor Networks", hours: 45 },
    { name: "Network Protocols and Algorithms", hours: 45 },

    // AIML Courses
    { name: "Report Writing", hours: 30 },
    { name: "Programming in Java", hours: 45 },
    { name: "Genetic Algorithm and its Applications", hours: 45 },
    { name: "Introduction to Cognitive Neuroscience", hours: 45 },
    { name: "Robot Programming", hours: 60 },
    { name: "Software Engineering in Artificial Intelligence", hours: 60 },
    { name: "Accelerated Data Science", hours: 60 },
    { name: "Marketing Analytics", hours: 45 },
    { name: "Artificial Neural Networks", hours: 45 },
    { name: "Advanced Algorithms", hours: 45 },
    { name: "Computational Neuroscience", hours: 45 },
    { name: "Nature Inspired Computing Techniques", hours: 45 },
    { name: "Information Retrieval", hours: 45 },
    { name: "Design Principles of Smart Space Management", hours: 45 },
    { name: "Philosophy of Cognitive Science", hours: 45 },
    { name: "Logic and Knowledge Representation", hours: 45 },
    { name: "Artificial Intelligence in Genomics and Disease Prediction", hours: 45 },
    { name: "Machine Learning in Drug Discovery", hours: 45 },
    { name: "Artificial Intelligence", hours: 45 },
    { name: "IoT Concepts and Applications", hours: 45 },
    { name: "Fuzzy Logic and its Applications", hours: 45 },
    { name: "Robotics: Computational Motion Planning", hours: 45 },
    { name: "Reinforcement Learning Techniques", hours: 45 },
    { name: "Cyber Physical Systems", hours: 45 },
    { name: "Business Intelligence and Analytics", hours: 45 },

    // Software Engineering Courses
    { name: "Software Measurements and Metrics", hours: 45 },
    { name: "Software Verification and Validation", hours: 45 },
    { name: "Requirements Engineering", hours: 45 },
    { name: "Software Quality Management", hours: 45 },
    { name: "Software Process", hours: 45 },
    { name: "User Interface Design", hours: 60 },
    { name: "Visual Programming", hours: 60 },
    { name: "Machine Learning Techniques", hours: 60 },
    { name: "Object Oriented Software Engineering", hours: 45 },
    { name: "Python for Software Engineering", hours: 45 },
    { name: "Analysis of Software Artifacts", hours: 45 },
    { name: "Software Security", hours: 45 },
    { name: "Artificial Intelligence in Agile Systems", hours: 45 },
    { name: "Deep Learning", hours: 45 },
    { name: "Gaming and Virtual Reality", hours: 45 },
    { name: "Smartphone Computing and its Applications", hours: 45 },

    // Cloud Computing Courses
    { name: "Fundamentals of Cloud Computing", hours: 45 },
    { name: "Communication Systems Engineering", hours: 45 },
    { name: "Digital Communication Systems", hours: 45 },
    { name: "Cloud Architecture", hours: 45 },
    { name: "Service Oriented Architecture and Microservices", hours: 45 },
    { name: "Cloud Services Solution Architect", hours: 45 },
    { name: "Data Centric Networking and System Design", hours: 45 },
    { name: "Cloud Security", hours: 45 },
    { name: "Cloud Strategy Planning and Management", hours: 45 },
    { name: "Fog Computing Analytics", hours: 45 },
    { name: "Cloud Application Development", hours: 45 },
    { name: "Network Design and Management", hours: 45 },

    // Computer Networks Courses
    { name: "Distributed Operating Systems", hours: 45 },
    { name: "Pervasive Computing", hours: 45 },
    { name: "Network Protocols and Programming", hours: 45 },
    { name: "Network Routing Algorithms", hours: 45 },
    { name: "Optical Networks", hours: 45 },
    { name: "Principles Of Cloud Computing", hours: 45 },
    { name: "Network Security", hours: 45 },

    // Cyber Security Courses
    { name: "Check Point System Administration", hours: 75 },
    { name: "Cryptography and Network Security", hours: 45 },
    { name: "Information Security", hours: 45 },
    { name: "Cyber Law", hours: 45 },
    { name: "Forensics and Incident Response", hours: 45 },
    { name: "Security Management", hours: 45 },
    { name: "Security Governance, Risk and Compliance", hours: 45 },
    { name: "Security Audit and Risk Assessment", hours: 75 },
    { name: "Advanced Malware Analysis", hours: 75 },
    { name: "Penetration Testing and Vulnerability Assessment", hours: 75 },
    { name: "Hacker Techniques, Tools, and Incident Handling", hours: 75 },
    { name: "Comprehensive Linux for All", hours: 75 },
    { name: "Database Security", hours: 45 },
    { name: "Operation System Security", hours: 45 },
    { name: "Cyberwarfare", hours: 45 },
    { name: "Hacker Mind: Profiling The IT Criminal", hours: 45 },
    { name: "Social Engineering", hours: 30 },
    { name: "Mobile and Wireless Security", hours: 45 },
    { name: "Windows and Linux Internals", hours: 75 },
    { name: "Cyber Crime and Digital Forensics", hours: 45 },
    { name: "Cyber Crimes and Cyber Security", hours: 45 },

    // IT Courses
    { name: "Statistics for Machine Learning", hours: 45 },
    { name: "Quantum Computation", hours: 75 },
    { name: "Streaming Analytics", hours: 45 },
    { name: "Applied Graph Theory", hours: 45 },
    { name: "Logical Deduction and Non-Verbal Reasoning", hours: 45 },
    { name: "Cloud Native Architecture for Modern Platforms", hours: 45 },
    { name: "Fault Tolerant Systems", hours: 45 },
    { name: "Image and Video Processing", hours: 45 },

    // IoT Courses
    { name: "Introduction to IoT: Sensors, Actuators and Microcontrollers", hours: 45 },
    { name: "Introduction to Embedded Programming and Embedded OS", hours: 45 },
    { name: "Internet of Things Architecture and Protocols", hours: 45 },
    { name: "Machine Learning for IoT", hours: 45 },
    { name: "Introduction to Cloud Application Development for IoT", hours: 45 },
    { name: "IoT Forensics", hours: 45 },
    { name: "Network Programming for IoT", hours: 75 },
    { name: "Introduction to Security of Internet of Things and Cyber-Physical Systems", hours: 75 },
    { name: "Data Visualization for IoT", hours: 75 },
    { name: "IoT Techniques, Tools, and its Application", hours: 75 },
    { name: "Advanced Database Systems", hours: 45 },
    { name: "Edge Computing", hours: 45 },
    { name: "Energy Management for IoT Devices", hours: 45 },
    { name: "Applied Software Techniques in IoT Engineering", hours: 45 },
    { name: "Fundamentals of Cyber Security", hours: 45 },
    { name: "Full Stack Development for IoT", hours: 75 },
    { name: "Deep Learning for IoT", hours: 45 },
    { name: "IoT Privacy", hours: 45 },

    // Blockchain Courses
    { name: "Fundamentals of Blockchain", hours: 45 },
    { name: "IoT and Blockchain", hours: 45 },
    { name: "Distributed Systems and Applications", hours: 45 },
    { name: "Principles of Cryptography", hours: 45 },
    { name: "Cryptocurrencies and Blockchain Technology", hours: 45 },
    { name: "Fundamentals of Ethereum", hours: 45 },
    { name: "AI and Blockchain", hours: 45 },
    { name: "Container Management", hours: 45 },
    { name: "Advanced Cryptography", hours: 45 },
    { name: "Cloud Computing with Blockchain", hours: 45 },
    { name: "Web3 Development", hours: 45 },
    { name: "Trust Based Computing", hours: 45 },
    { name: "Building Private Blockchain", hours: 45 },
    { name: "Blockchain Technology with Hyperledger", hours: 45 },
    { name: "Blockchain Business Models", hours: 45 },
    { name: "Distributed Ledger Technology", hours: 45 },
    { name: "Smart Contracts and Application Development", hours: 45 },
    { name: "Bitcoin Essentials and Use Cases", hours: 45 },
    { name: "Decentralized Applications on Blockchain", hours: 45 },
    { name: "Web Security", hours: 45 },

    // Gaming Courses
    { name: "Software Engineering Perspectives in Computer Game Development", hours: 75 },
    { name: "Deep Learning in Gaming and Application", hours: 45 },
    { name: "Game Design, Prototyping and Development", hours: 45 },
    { name: "GPU Programming", hours: 45 },
    { name: "Art Creation for Games", hours: 45 },
    { name: "Storytelling for Marketing", hours: 45 },
    { name: "Game Artificial Intelligence", hours: 45 },
    { name: "Analytics and Decision Making", hours: 45 },
    { name: "Computer Graphics", hours: 45 },
    { name: "Gaming Studio for Business", hours: 45 },
    { name: "Web Services Development for Games", hours: 45 },
    { name: "3D Game Development with Unity", hours: 45 },
    { name: "Game System Integration", hours: 45 },
    { name: "Design Art and Theory", hours: 45 },
    { name: "Virtual Reality and Augmented Reality", hours: 45 },
    { name: "Computer Animation and Simulation", hours: 45 },
    { name: "Mobile Game Development", hours: 45 },
    { name: "Game Monetization Techniques", hours: 45 },
    { name: "Game Production and Publishing", hours: 45 },
    { name: "Applied Gamification", hours: 45 },
    { name: "Metaverse Fundamentals", hours: 45 },
    { name: "Digital Marketing and Publishing", hours: 45 },

    // Data Science Courses
    { name: "Fundamentals of Data Science", hours: 45 },
    { name: "Data Science", hours: 30 },
    { name: "Full Stack Development", hours: 45 },
    { name: "Advanced Object Oriented Programming", hours: 60 },
    { name: "Machine Learning for Data Analytics", hours: 60 },
    { name: "Big Data Tools and Techniques", hours: 45 },
    { name: "Computer Architecture", hours: 45 },
    { name: "Data Warehousing and Data Mining", hours: 45 },
    { name: "Multivariate Techniques for Data Analytics", hours: 45 },
    { name: "Applied Social Network Analysis", hours: 45 },
    { name: "Cloud Computing for Data Analytics", hours: 45 },
    { name: "Convolutional Neural Networks", hours: 45 },
    { name: "Big Data Visualization", hours: 45 },
    { name: "Deep Learning for Data Analytics", hours: 45 },
    { name: "Advanced Machine Learning", hours: 45 },
    { name: "Financial Machine Learning", hours: 45 },
    { name: "Augmented and Virtual Reality", hours: 45 },
    { name: "Healthcare Analytics", hours: 45 },
    { name: "Data Science for Internet of Things", hours: 45 },
    { name: "Automatic Speech Recognition", hours: 45 },
    { name: "Robot Motion Planning", hours: 45 },
    { name: "Bio-Inspired Computing and Fuzzy Logic", hours: 45 },
    { name: "Risk Analytics", hours: 45 },

    // M.Tech Integrated Courses
    { name: "Computer Graphics and Vision", hours: 45 },
    { name: "Computation and Cognition: The Probabilistic Approach", hours: 75 },
    { name: "Probabilistic Graphical Models: Principles and Techniques", hours: 45 },
    { name: "Deep Generative Models", hours: 45 },
    { name: "Brain Machine Interface: Science, Technology and Application", hours: 45 },
    { name: "Data Analysis and Visualization", hours: 45 },
    { name: "Computational Perception and Cognition", hours: 45 },
    { name: "Medical Signal Processing", hours: 45 },
    { name: "Deep Multitask and Meta Learning", hours: 45 },
    { name: "Spatial and Temporal Computing", hours: 45 },
    { name: "Decision Making Under Uncertainty", hours: 45 },
    { name: "Neural Network Models of Cognition", hours: 45 },
    { name: "Computational Linguistics", hours: 45 },
    { name: "Artificial Intelligence Engines", hours: 45 },
    { name: "Artificial Intelligence for Industrial Applications", hours: 45 },
    { name: "Artificial Intelligence in Medical Imaging", hours: 45 },
    { name: "Multimodal Machine Learning", hours: 45 },
    { name: "Security Service Management", hours: 45 },
    { name: "Android Malware Analysis", hours: 75 },
    { name: "Cyber Security Operations", hours: 45 },
    { name: "Network Management and Protocols", hours: 45 },
    { name: "Firewalls and Access Controls", hours: 45 },
    { name: "Network Programming and Management", hours: 45 },
    { name: "Network Intrusions and Computer Forensics", hours: 45 },
    { name: "Mobile Forensics", hours: 45 },
    { name: "Digital Forensics", hours: 45 },
    { name: "Security Scripting and Analysis", hours: 45 },
    { name: "Principles of Secure Coding", hours: 45 },
    { name: "Android Security and Design Internals", hours: 45 },
    { name: "Natural Language Processing Techniques", hours: 45 },
    { name: "Applied Deep Learning", hours: 75 },
    { name: "Advanced Algorithms Analysis", hours: 45 },
    { name: "Functional Programming", hours: 45 },
    { name: "Computer Vision Techniques", hours: 45 },
    { name: "Text Mining and Analytics", hours: 45 },
    { name: "Web Intelligence", hours: 45 },
];

const AttendanceCalculator: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [customMode, setCustomMode] = useState(false);
    const [customName, setCustomName] = useState("");
    const [customHours, setCustomHours] = useState<number | string>("");

    const filteredSubjects = predefinedSubjects.filter((subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addSubject = (name: string, totalCourseHours: number) => {
        const newId = (Math.max(...subjects.map((s) => parseInt(s.id)), 0) + 1).toString();
        setSubjects([...subjects, { id: newId, name, totalCourseHours, hoursHappened: 0, attendedHours: 0 }]);
        setSearchTerm("");
        setShowDropdown(false);
        setCustomMode(false);
        setCustomName("");
        setCustomHours("");
    };

    const addCustomSubject = () => {
        if (customName && customHours) {
            addSubject(customName, Number(customHours));
        }
    };

    const removeSubject = (id: string) => {
        setSubjects(subjects.filter((s) => s.id !== id));
    };

    const updateSubject = (id: string, field: 'hoursHappened' | 'attendedHours', value: number) => {
        setSubjects(
            subjects.map((s) => (s.id === id ? { ...s, [field]: value } : s))
        );
    };

    const calculateAttendance = (attended: number, total: number) => {
        if (total === 0) return 0;
        return ((attended / total) * 100).toFixed(2);
    };

    const calculateCanMiss = (attended: number, happened: number, totalCourse: number, targetPercent: number) => {
        // Calculate how many of the REMAINING classes can be missed
        // Final attendance will be: attended / totalCourse
        // We want: attended / totalCourse >= targetPercent / 100
        // 
        // Remaining hours = totalCourse - happened
        // If we miss X of the remaining hours:
        // - Final attended = attended + (remaining - X)
        // - Final total = totalCourse
        // We want: (attended + remaining - X) / totalCourse >= targetPercent / 100
        // 
        // Solving for X:
        // attended + remaining - X >= (targetPercent * totalCourse) / 100
        // remaining - X >= (targetPercent * totalCourse) / 100 - attended
        // -X >= (targetPercent * totalCourse) / 100 - attended - remaining
        // X <= remaining - (targetPercent * totalCourse) / 100 + attended
        // X <= attended + remaining - (targetPercent * totalCourse) / 100

        const remaining = totalCourse - happened;
        const requiredAttendance = (targetPercent * totalCourse) / 100;
        const canMiss = Math.floor(attended + remaining - requiredAttendance);

        return Math.max(0, Math.min(canMiss, remaining)); // Can't miss more than what's remaining
    };

    const calculateNeedToAttend = (attended: number, happened: number, totalCourse: number, targetPercent: number) => {
        // Calculate how many of the REMAINING classes must be attended
        // Final attendance will be: (attended + X) / totalCourse
        // We want: (attended + X) / totalCourse >= targetPercent / 100
        //
        // Solving for X:
        // attended + X >= (targetPercent * totalCourse) / 100
        // X >= (targetPercent * totalCourse) / 100 - attended

        const remaining = totalCourse - happened;
        const requiredAttendance = (targetPercent * totalCourse) / 100;
        const needToAttend = Math.ceil(requiredAttendance - attended);

        if (needToAttend <= 0) {
            return 0; // Already at or above target
        }

        if (needToAttend > remaining) {
            return -1; // Impossible to reach target even if attending all remaining classes
        }

        return needToAttend;
    };

    const getOverallAttendance = () => {
        const totalAttended = subjects.reduce((sum, s) => sum + s.attendedHours, 0);
        const totalHappened = subjects.reduce((sum, s) => sum + s.hoursHappened, 0);
        return calculateAttendance(totalAttended, totalHappened);
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
            <div className="w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8 bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl border border-gray-200/50">
                <div className="mb-6 md:mb-8 text-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-2 md:mb-3 tracking-tight">
                        SRM Attendance Calculator
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2">
                        Track your attendance and calculate how many hours you can miss while maintaining 75% or 90% attendance.
                    </p>
                </div>

                {/* Add Subject Section */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 shadow-lg border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Add Subject</h2>

                    <div className="space-y-4">
                        {!customMode ? (
                            <>
                                {/* Search Dropdown */}
                                <div className="relative">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setShowDropdown(true);
                                            }}
                                            onFocus={() => setShowDropdown(true)}
                                            placeholder="Search for a subject..."
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent transition-all"
                                        />
                                    </div>

                                    {showDropdown && searchTerm && (
                                        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                            {filteredSubjects.length > 0 ? (
                                                filteredSubjects.map((subject, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => addSubject(subject.name, subject.hours)}
                                                        className="px-4 py-3 hover:bg-orange-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                                                    >
                                                        <div className="font-semibold text-gray-800">{subject.name}</div>
                                                        <div className="text-sm text-gray-500">{subject.hours} hours</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-3 text-gray-500 text-center">
                                                    No subjects found
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => setCustomMode(true)}
                                    className="w-full px-4 py-2 text-sm text-gray-600 hover:text-[#f39e2f] transition-colors"
                                >
                                    + Add custom subject
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Custom Subject Input */}
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        value={customName}
                                        onChange={(e) => setCustomName(e.target.value)}
                                        placeholder="Subject name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent transition-all"
                                    />
                                    <input
                                        type="number"
                                        value={customHours}
                                        onChange={(e) => setCustomHours(e.target.value)}
                                        placeholder="Total hours"
                                        min="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent transition-all"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={addCustomSubject}
                                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#f39e2f] to-[#e08d1f] hover:from-[#e08d1f] hover:to-[#d67d1a] text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                                        >
                                            Add Subject
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCustomMode(false);
                                                setCustomName("");
                                                setCustomHours("");
                                            }}
                                            className="px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 rounded-xl transition-all font-semibold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Subjects List */}
                {subjects.length > 0 && (
                    <div className="space-y-4 mb-6">
                        {subjects.map((subject) => {
                            const attendance = calculateAttendance(subject.attendedHours, subject.hoursHappened);
                            const canMiss75 = calculateCanMiss(subject.attendedHours, subject.hoursHappened, subject.totalCourseHours, 75);
                            const canMiss90 = calculateCanMiss(subject.attendedHours, subject.hoursHappened, subject.totalCourseHours, 90);
                            const needToAttend75 = calculateNeedToAttend(subject.attendedHours, subject.hoursHappened, subject.totalCourseHours, 75);
                            const needToAttend90 = calculateNeedToAttend(subject.attendedHours, subject.hoursHappened, subject.totalCourseHours, 90);
                            const attendanceNum = parseFloat(String(attendance));
                            const remaining = subject.totalCourseHours - subject.hoursHappened;

                            return (
                                <div
                                    key={subject.id}
                                    className="bg-white rounded-xl p-4 md:p-6 shadow-lg border border-gray-200"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-lg mb-1">{subject.name}</h3>
                                            <p className="text-sm text-gray-500">Total Course: {subject.totalCourseHours} hours | Remaining: {remaining} hours</p>
                                        </div>
                                        <button
                                            onClick={() => removeSubject(subject.id)}
                                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Hours Happened So Far
                                            </label>
                                            <input
                                                type="number"
                                                value={subject.hoursHappened || ''}
                                                onChange={(e) => updateSubject(subject.id, 'hoursHappened', parseFloat(e.target.value) || 0)}
                                                placeholder="Classes that occurred"
                                                min="0"
                                                max={subject.totalCourseHours}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Hours You Attended
                                            </label>
                                            <input
                                                type="number"
                                                value={subject.attendedHours || ''}
                                                onChange={(e) => updateSubject(subject.id, 'attendedHours', parseFloat(e.target.value) || 0)}
                                                placeholder="Classes you attended"
                                                min="0"
                                                max={subject.hoursHappened}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f39e2f] focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Current Attendance */}
                                        <div className={`p-4 rounded-xl ${attendanceNum >= 90 ? 'bg-green-50 border-2 border-green-200' :
                                            attendanceNum >= 75 ? 'bg-yellow-50 border-2 border-yellow-200' :
                                                'bg-red-50 border-2 border-red-200'
                                            }`}>
                                            <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Current</p>
                                            <p className={`text-2xl font-bold ${attendanceNum >= 90 ? 'text-green-700' :
                                                attendanceNum >= 75 ? 'text-yellow-700' :
                                                    'text-red-700'
                                                }`}>{attendance}%</p>
                                        </div>

                                        {/* 75% Target */}
                                        <div className="p-4 rounded-xl bg-gradient-to-br from-white to-orange-50 border-2 border-orange-200">
                                            {canMiss75 > 0 ? (
                                                <>
                                                    <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Can Miss (75%)</p>
                                                    <p className="text-2xl font-bold text-orange-600">{canMiss75}h</p>
                                                    <p className="text-xs text-gray-500 mt-1">of remaining</p>
                                                </>
                                            ) : canMiss75 === 0 ? (
                                                <>
                                                    <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Can Miss (75%)</p>
                                                    <p className="text-2xl font-bold text-red-600">0h</p>
                                                    <p className="text-xs text-gray-500 mt-1">Attend all remaining</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Impossible</p>
                                                    <p className="text-xl font-bold text-red-700">❌</p>
                                                    <p className="text-xs text-gray-500 mt-1">Can&apos;t reach 75%</p>
                                                </>
                                            )}
                                        </div>

                                        {/* 90% Target */}
                                        <div className="p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200">
                                            {canMiss90 > 0 ? (
                                                <>
                                                    <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Can Miss (90%)</p>
                                                    <p className="text-2xl font-bold text-gray-600">{canMiss90}h</p>
                                                    <p className="text-xs text-gray-500 mt-1">of remaining</p>
                                                </>
                                            ) : canMiss90 === 0 ? (
                                                <>
                                                    <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Can Miss (90%)</p>
                                                    <p className="text-2xl font-bold text-red-600">0h</p>
                                                    <p className="text-xs text-gray-500 mt-1">Attend all remaining</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Impossible</p>
                                                    <p className="text-xl font-bold text-red-700">❌</p>
                                                    <p className="text-xs text-gray-500 mt-1">Can&apos;t reach 90%</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Overall Summary */}
                {subjects.length > 1 && (
                    <div className="bg-gradient-to-br from-slate-800 to-gray-700 rounded-2xl p-6 shadow-xl border-2 border-gray-600 text-white">
                        <h3 className="text-lg font-bold mb-2">Overall Attendance</h3>
                        <p className="text-4xl font-bold bg-gradient-to-r from-[#f39e2f] via-[#ffc107] to-[#f39e2f] bg-clip-text text-transparent">
                            {getOverallAttendance()}%
                        </p>
                        <p className="text-sm text-gray-300 mt-1">Across all subjects</p>
                    </div>
                )}

                {subjects.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-lg">No subjects added yet.</p>
                        <p className="text-sm mt-2">Search and add subjects to start tracking attendance.</p>
                    </div>
                )}

                {/* Disclaimer */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <p className="text-xs text-gray-600 text-center">
                        ⚠️ <span className="font-semibold">Beta Version:</span> Hours specified for each subject are taken from the syllabus and not verified. Inaccuracies may occur.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AttendanceCalculator;
