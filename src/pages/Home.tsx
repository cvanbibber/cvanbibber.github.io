import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, Download, Github, Briefcase } from 'lucide-react';
import ProgressiveImage from '../components/ProgressiveImage';
import { personalInfo, featuredProjects, skills } from '../data/portfolio';
import Reveal from '../components/Reveal';
import CircuitField from '../components/CircuitField';
import TiltCard from '../components/TiltCard';
import MagneticButton from '../components/MagneticButton';

const Home: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
  <section className="section-padding relative overflow-hidden">
  {/* Electronics-themed interactive background */}
  <CircuitField />
        {/* Focused soft overlay behind the hero text (centered, doesn't obscure edges) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 flex justify-center z-15">
          <div
            className="w-full max-w-3xl mt-12 md:mt-20"
            style={{
              height: 'min(20rem, 38vh)',
              pointerEvents: 'none',
              borderRadius: '28px',
              // Stronger center fade but quick falloff to avoid obscuring top/bottom/sides
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.80) 60%, rgba(255,255,255,0.28) 75%, rgba(255,255,255,0) 100%)',
              filter: 'blur(4px)'
            }}
          />
        </div>
  <div className="relative z-20 max-w-7xl mx-auto">
          <div className="text-center">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                <span className="gradient-text">{personalInfo.name}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-xl md:text-2xl text-gray-700 mb-6">
                {personalInfo.subtitle}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
                {personalInfo.bio}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/projects" className="inline-flex">
                  <MagneticButton className="btn-primary inline-flex items-center justify-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  <span>View My Work</span>
                  </MagneticButton>
                </Link>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <MagneticButton className="btn-secondary inline-flex items-center justify-center gap-2">
                    <Download className="h-5 w-5" />
                    <span>Download Resume</span>
                  </MagneticButton>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
  <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Featured Projects
            </h2>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Showcasing innovative solutions in advanced embedded systems, mechatronics, antenna design, and electromagnetic simulation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
              <Link to={`/projects/${project.id}`} className="card group cursor-pointer block overflow-hidden">
                <TiltCard className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 relative">
                  {project.images[0] && (
                    <ProgressiveImage
                      src={project.images[0]}
                      alt={project.title}
                      hoverBlur
                    />
                  )}
                </TiltCard>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                      Learn More
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </span>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/projects" className="btn-secondary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expertise across multiple domains of electrical engineering and software development
            </p>
          </div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
    {skills.map((skill, i) => (
      <Reveal key={skill.name} delay={i * 0.03}
    className="bg-white rounded-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => { e.currentTarget.src = '/images/skills/fallback.svg'; }}
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{skill.name}</h3>
      </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Collaborate?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Let's work together to bring your next engineering project to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              Get In Touch
            </Link>
            <Link
              to="/tools"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Try Engineering Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
