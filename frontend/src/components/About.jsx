import { motion } from 'framer-motion'
import { FaCode, FaDatabase, FaServer, FaTools } from 'react-icons/fa'
import './About.css'

const About = () => {
    const skills = [
        {
            category: 'Frontend',
            icon: <FaCode />,
            items: ['React', 'Javascript', 'Tailwind CSS', 'HTML/CSS']
        },
        {
            category: 'Backend',
            icon: <FaServer />,
            items: ['Go (Golang)', 'Python', 'RESTful APIs', 'GraphQL']
        },
        {
            category: 'Database',
            icon: <FaDatabase />,
            items: ['PostgreSQL', 'MongoDB', 'Oracle', 'MySQL']
        },
        {
            category: 'Tools & Others',
            icon: <FaTools />,
            items: ['Git', 'Docker', 'Cloud Google Platform', 'Agile']
        }
    ]

    return (
        <section id="about" className="section about-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">About Me</h2>
                    <p className="section-subtitle">Get to know me better</p>

                    <div className="about-content">
                        <div className="about-text">
                            <p>
                                I am a passionate <strong>Information Systems Engineer</strong> with expertise in building scalable web applications. Based on my acquired knowledge, practical exploration, and a strong interest in data and system management, I look forward to exploring many future opportunities.
                            </p>
                            <p>
                                My journey in software development has equipped me with a diverse skill set, from creating responsive user interfaces with React to building robust backend systems with Go and Python. I am constantly learning and adapting to new technologies to deliver the best solutions.
                            </p>
                            <p>
                                I proactively seek out new knowledge and technologies to meet work requirements effectively and responsibly.
                            </p>
                            <p>
                                I have a passion for musical instruments and continuously develop my <strong>teamwork</strong> and <strong>communication</strong> skills. I work effectively with agile development methodologies such as <strong>Agile & Scrum</strong>.
                            </p>
                        </div>

                        <div className="skills-grid">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill.category}
                                    className="skill-card card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="skill-icon">{skill.icon}</div>
                                    <h3>{skill.category}</h3>
                                    <ul>
                                        {skill.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default About
