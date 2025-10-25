import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BlogPost from './components/BlogPost'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import SEO from './components/SEO'

function App() {
    return (
        <HelmetProvider>
            <AuthProvider>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <SEO />
                                    <Header />
                                    <Hero />
                                    <About />
                                    <Projects />
                                    <Blog />
                                    <Contact />
                                    <Footer />
                                </>
                            } />
                            <Route path="/blog/:id" element={
                                <>
                                    <Header />
                                    <BlogPost />
                                    <Footer />
                                </>
                            } />
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route path="/admin/dashboard" element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </div>
                </Router>
            </AuthProvider>
        </HelmetProvider>
    )
}

export default App
