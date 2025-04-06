"use client";

import Navbar from "../../components/Navbar";
import { BarChart, PieChart, LineChart, Activity, Users, Globe, Award, BookOpen, Code, Zap, Check } from "lucide-react";

export default function About() {
  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Main About Content - Long scrollable format */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-900 p-3 rounded-full">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </div>
          
          <p className="text-lg text-gray-300 mb-8">
          At Vizulytics, we're committed to democratizing data visualization by providing tools that allow everyone—from data scientists to business professionals—to unlock the stories hidden within their data. We believe that understanding data shouldn't require advanced technical skills, and powerful insights should be accessible to all.
          <br /><br />
          Our platform bridges the gap between complex data analysis and actionable insights, empowering users of all skill levels to make data-driven decisions confidently. Through intuitive interfaces and guided workflows, we remove traditional barriers to data visualization, making it possible for anyone to transform raw numbers into compelling visual narratives.
          <br /><br />
          We recognize that the true value of data lies not in its volume but in the clarity it brings to decision-making processes. By simplifying the visualization journey, we enable organizations to identify trends, spot anomalies, and discover opportunities that might otherwise remain hidden in spreadsheets and databases.
          <br /><br />
          Our comprehensive suite of tools supports various visualization needs—from basic charts for quick insights to complex interactive dashboards for in-depth analysis. With automated recommendations and educational resources integrated throughout the platform, we help users not only create effective visualizations but also understand the principles behind them, fostering greater data literacy across teams and organizations.
          <br /><br />
          By democratizing access to data visualization capabilities, we're working toward a future where data-informed decisions are the norm rather than the exception, regardless of technical expertise or resources.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="bg-purple-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-gray-400">
                Making data visualization accessible to users of all skill levels through intuitive interfaces and guided workflows.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="bg-purple-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Empowerment</h3>
              <p className="text-gray-400">
                Enabling organizations to make better decisions by transforming raw data into clear, actionable visual insights.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="bg-purple-900 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-400">
                Continuously pushing the boundaries of what's possible in data visualization through research and development.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">Our Vision for the Future</h3>
            <p className="text-gray-300 mb-6">
              We envision a world where data literacy is universal, where organizations of all sizes can harness the power of their data to solve complex problems and drive positive change. Vizulytics is working to build tools that not only visualize data but also provide context, uncover patterns, and suggest actions—transforming information into understanding.
            </p>
            <p className="text-gray-300">
              By 2030, we aim to help one million organizations worldwide implement data-driven decision-making processes that lead to measurable improvements in their operations, services, and impact.
            </p>
          </div>
        </section>
        
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-900 p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold">Our Story</h2>
          </div>
          
          <p className="text-lg text-gray-300 mb-8">
            Vizulytics was born from a simple frustration: despite living in an age of unprecedented data availability, making sense of that data remained unnecessarily complex. Our founders, Sarah Chen and Marcus Rodriguez, experienced this challenge firsthand while working at a leading research institution.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">The Beginning</h3>
              <p className="text-gray-400 mb-4">
                In 2018, after spending countless hours wrestling with complex visualization tools that required extensive programming knowledge, Sarah and Marcus decided there had to be a better way. They envisioned a platform that would combine the power of advanced analytics with the simplicity of drag-and-drop interfaces.
              </p>
              <p className="text-gray-400">
                They began developing prototypes in Sarah's garage, focusing on creating visualizations that could reveal insights without requiring users to write a single line of code. Their early tests with non-technical users showed promising results, validating their core hypothesis.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4">The Growth</h3>
              <p className="text-gray-400 mb-4">
                After securing seed funding in 2019, Vizulytics launched its beta platform to a small group of users spanning industries from healthcare to finance. The feedback was overwhelmingly positive, with users reporting they could analyze data and extract insights in minutes rather than days.
              </p>
              <p className="text-gray-400">
                By 2021, our team had grown to 25 passionate individuals, and we released Vizulytics 1.0 to the public. Within six months, we reached 10,000 active users and were processing over 5 million data points daily.
              </p>
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold mb-4">Key Milestones</h3>
          <div className="space-y-4 mb-12">
            <div className="flex gap-4">
              <div className="w-24 font-bold text-purple-400">2018</div>
              <div>
                <h4 className="font-medium">Founding</h4>
                <p className="text-gray-400">Sarah Chen and Marcus Rodriguez found Vizulytics</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-24 font-bold text-purple-400">2019</div>
              <div>
                <h4 className="font-medium">Seed Funding</h4>
                <p className="text-gray-400">Secured $2.5M in seed funding from Horizon Ventures</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-24 font-bold text-purple-400">2020</div>
              <div>
                <h4 className="font-medium">Beta Launch</h4>
                <p className="text-gray-400">Released beta version to 500 early adopters</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-24 font-bold text-purple-400">2021</div>
              <div>
                <h4 className="font-medium">Public Launch</h4>
                <p className="text-gray-400">Official release of Vizulytics 1.0 to the public</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-24 font-bold text-purple-400">2022</div>
              <div>
                <h4 className="font-medium">Series A</h4>
                <p className="text-gray-400">Raised $12M in Series A funding led by Innovation Capital</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-24 font-bold text-purple-400">2023</div>
              <div>
                <h4 className="font-medium">Enterprise Focus</h4>
                <p className="text-gray-400">Launched Vizulytics Enterprise with advanced security features</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-24 font-bold text-purple-400">2024</div>
              <div>
                <h4 className="font-medium">Global Expansion</h4>
                <p className="text-gray-400">Opened offices in London, Singapore, and São Paulo</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">Where We Are Today</h3>
            <p className="text-gray-300 mb-6">
              Today, Vizulytics serves over 100,000 users across 70 countries. Our platform processes billions of data points monthly and has helped organizations of all sizes—from startups to Fortune 500 companies—transform their approach to data analysis and decision-making.
            </p>
            <p className="text-gray-300">
              We've grown to a team of 120 dedicated professionals working across four global offices, united by our mission to make data visualization accessible and intuitive for everyone.
            </p>
          </div>
        </section>
        
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-900 p-3 rounded-full">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold">Our Team</h2>
          </div>
          
          <p className="text-lg text-gray-300 mb-8">
            Vizulytics is powered by a diverse team of passionate individuals who combine expertise in data science, design, engineering, and business. Together, we're united by a shared mission to democratize data visualization and help organizations make better decisions.
          </p>
          
          <h3 className="text-2xl font-semibold mb-6">Leadership</h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="aspect-square bg-gray-700 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <p className="text-gray-500">Photo</p>
              </div>
              <h4 className="text-xl font-semibold text-center mb-1">Sarah Chen</h4>
              <p className="text-purple-400 text-center mb-4">Co-Founder & CEO</p>
              <p className="text-gray-400 text-sm">
                With a background in data science and business strategy, Sarah leads our company vision and growth initiatives. Prior to Vizulytics, she was the Head of Analytics at Quantum Research Institute.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="aspect-square bg-gray-700 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <p className="text-gray-500">Photo</p>
              </div>
              <h4 className="text-xl font-semibold text-center mb-1">Marcus Rodriguez</h4>
              <p className="text-purple-400 text-center mb-4">Co-Founder & CTO</p>
              <p className="text-gray-400 text-sm">
                A brilliant engineer with expertise in data visualization algorithms, Marcus oversees our technology development and innovation pipeline. He previously worked at Tech Innovations Inc.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="aspect-square bg-gray-700 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <p className="text-gray-500">Photo</p>
              </div>
              <h4 className="text-xl font-semibold text-center mb-1">Elena Patel</h4>
              <p className="text-purple-400 text-center mb-4">Chief Design Officer</p>
              <p className="text-gray-400 text-sm">
                Elena brings her expertise in UX/UI design to ensure our platform remains intuitive and visually impactful. She previously led design teams at several Fortune 500 companies.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h4 className="text-xl font-semibold mb-3">What Drives Us</h4>
              <p className="text-gray-400 mb-4">
                At Vizulytics, we're passionate about the transformative power of data visualization. We believe that when people can truly see and understand their data, they make better decisions that positively impact their organizations and communities.
              </p>
              <p className="text-gray-400">
                Our team thrives in an environment that encourages curiosity, creativity, and continuous learning. We embrace challenges as opportunities to innovate and grow, both individually and collectively.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-3">How We Work</h4>
              <p className="text-gray-400 mb-4">
                We operate with a flat organizational structure that empowers team members to take ownership of their work and contribute meaningfully to our shared goals. Collaboration is at the heart of our approach, with cross-functional teams working together to solve complex problems.
              </p>
              <p className="text-gray-400">
                We embrace flexibility, offering remote and hybrid work options that allow our team to achieve a healthy work-life balance while delivering exceptional results.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
            <p className="text-gray-300 mb-6">
              We're always looking for talented individuals who share our passion for data visualization and our commitment to excellence. At Vizulytics, you'll have the opportunity to work on challenging problems, learn from industry experts, and make a meaningful impact on how organizations understand and use their data.
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition">
              View Open Positions
            </button>
          </div>
        </section>
        
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-900 p-3 rounded-full">
              <Code className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold">Our Technology</h2>
          </div>
          
          <p className="text-lg text-gray-300 mb-8">
            Vizulytics combines cutting-edge technology with intuitive design to create a platform that's both powerful and easy to use. Our technology stack is built to handle massive datasets, perform complex analyses, and render beautiful visualizations—all without requiring users to write code.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold mb-4">Core Platform</h3>
              <p className="text-gray-400 mb-4">
                Our platform is built on a microservices architecture that ensures scalability and reliability. We use a combination of React for our frontend, Node.js for our API layer, and a mixture of PostgreSQL and MongoDB for data storage.
              </p>
              <p className="text-gray-400">
                For real-time processing, we leverage Apache Kafka and Apache Spark, allowing users to visualize streaming data with minimal latency. Our cloud-native infrastructure runs on AWS, with automatic scaling to handle traffic spikes.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold mb-4">Visualization Engine</h3>
              <p className="text-gray-400 mb-4">
                At the heart of Vizulytics is our proprietary visualization engine, which combines D3.js with WebGL for rendering. This hybrid approach allows us to handle millions of data points while maintaining smooth interactions and beautiful aesthetics.
              </p>
              <p className="text-gray-400">
                Our engine includes over 50 chart types, from basic bar charts to complex network diagrams and geographic maps. Each visualization is optimized for performance and accessibility, with considerations for color blindness and screen readers.
              </p>
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold mb-6">Advanced Capabilities</h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-850 p-5 rounded-lg border border-gray-700">
              <div className="bg-purple-900 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                <BarChart className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="font-medium mb-2">Automated Analytics</h4>
              <p className="text-sm text-gray-400">
                Our AI algorithms automatically identify patterns and anomalies in your data, suggesting relevant visualizations.
              </p>
            </div>
            
            <div className="bg-gray-850 p-5 rounded-lg border border-gray-700">
              <div className="bg-purple-900 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                <PieChart className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="font-medium mb-2">Interactive Dashboards</h4>
              <p className="text-sm text-gray-400">
                Create dynamic dashboards with drag-and-drop functionality and real-time filtering capabilities.
              </p>
            </div>
            
            <div className="bg-gray-850 p-5 rounded-lg border border-gray-700">
              <div className="bg-purple-900 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-3">
                <LineChart className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="font-medium mb-2">Predictive Analytics</h4>
              <p className="text-sm text-gray-400">
                Leverage machine learning to forecast trends and visualize potential future scenarios.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-900 p-3 rounded-full">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold">Our Approach</h2>
          </div>
          
          <p className="text-lg text-gray-300 mb-8">
            At Vizulytics, we believe that effective data visualization requires more than just technical tools—it demands a thoughtful approach that combines design principles, statistical rigor, and domain knowledge. Our methodology has been refined through years of experience working with organizations across industries.
          </p>
          
          <h3 className="text-2xl font-semibold mb-6">The Vizulytics Method</h3>
          
          <div className="space-y-8 mb-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Understand the Context</h4>
                <p className="text-gray-400 mb-4">
                  Every data visualization project begins with a deep understanding of the business context, key questions, and intended audience. Our platform guides users through a series of questions to clarify these fundamental aspects before suggesting visualization approaches.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 italic">
                    "Vizulytics helped us step back and really think about what we were trying to learn from our customer data. This clarity completely changed our approach to visualization and led to actionable insights we'd never seen before." — Marketing Director, Global Retail Brand
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Prepare Data With Purpose</h4>
                <p className="text-gray-400 mb-4">
                  We believe that thoughtful data preparation is essential for meaningful visualization. Our platform includes intelligent data cleaning tools that identify potential issues and suggest transformations that preserve the integrity of your insights.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 italic">
                    "The automated data preparation features saved our analysts countless hours and helped us identify quality issues we weren't even aware of." — Data Science Lead, Healthcare Provider
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Choose the Right Visualization</h4>
                <p className="text-gray-400 mb-4">
                  Different questions require different visualization approaches. Our AI-powered recommendation engine suggests the most appropriate visualization types based on your data structure and objectives, while providing educational context about why certain charts work better for specific scenarios.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 italic">
                    "As someone without a data background, I always struggled to know which chart to use. Vizulytics's recommendations and explanations have dramatically improved my data literacy." — Operations Manager, Manufacturing Company
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-900 p-3 rounded-full">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold">Our Values</h2>
          </div>
          
          <p className="text-lg text-gray-300 mb-8">
            Our values guide everything we do at Vizulytics, from the features we develop to the way we interact with our customers and each other. These principles have been at the core of our company since day one and continue to shape our growth and evolution.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-900 p-2 rounded-full">
                  <Check className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Integrity</h3>
              </div>
              <p className="text-gray-400">
                We believe in honest, accurate data representation. Our platform is designed to help users avoid common visualization pitfalls that can distort or misrepresent data, ensuring that insights are trustworthy and actionable.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-900 p-2 rounded-full">
                  <Check className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Inclusion</h3>
              </div>
              <p className="text-gray-400">
                We're committed to making data visualization accessible to everyone, regardless of technical background or expertise. Our platform is designed with inclusivity in mind, from our interface to our educational resources.
              </p>
            </div>
          </div>  
        </section> 
      </div> 
    </div>
    </>
  )}         
            