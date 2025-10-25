import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import './Hero.css'

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="container">
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="hero-title">
                            Hi, I'm <span className="gradient-text">Huy Tran</span>
                        </h1>
                        <h2 className="hero-subtitle">
                            <span className="typing-effect">Backend Engineer</span>
                        </h2>
                        <p className="hero-description">
                            This is my personal portfolio where I showcase my projects, skills, and experience as a backend engineer.
                        </p>
                        <div className="hero-buttons">
                            <a href="#contact" className="btn btn-primary">Get In Touch</a>
                            <a href="#projects" className="btn btn-outline">View My Work</a>
                        </div>
                        <div className="social-links">
                            <a href="https://github.com/NartHoangHuy" target="_blank" rel="noopener noreferrer">
                                <FaGithub />
                            </a>
                            <a href="https://www.linkedin.com/in/tr%E1%BA%A7n-ho%C3%A0ng-huy-151450302/" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </a>
                            <a href="mailto:narthoanghuy@gmail.com">
                                <FaEnvelope />
                            </a>
                        </div>
                    </motion.div>
                    <motion.div
                        className="hero-image"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="image-container">
                            <div className="floating-card card-1">React</div>
                            <div className="floating-card card-2">Go</div>
                            <div className="floating-card card-3">Javascript</div>
                            <div className="floating-card card-4">Python</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Hero
