import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, Calendar, Tag, ExternalLink, Github, Cpu, Zap, Cog, Settings } from 'lucide-react';
import ProgressiveImage from '../components/ProgressiveImage';
import { projects } from '../data/portfolio';
import TiltCard from '../components/TiltCard';

const Projects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'impact'>('recent');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Initialize state from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const sortParam = searchParams.get('sort');

    if (categoryParam && ['hardware', 'research', 'cad', 'software'].includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    if (sortParam && ['recent', 'impact'].includes(sortParam)) {
      setSortBy(sortParam as 'recent' | 'impact');
    }
  }, [searchParams]);

  // Update URL when filters change
  const updateURL = (category: string, search: string, sort: string) => {
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (search) params.set('search', search);
    if (sort !== 'recent') params.set('sort', sort);
    setSearchParams(params);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateURL(category, searchTerm, sortBy);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    updateURL(selectedCategory, search, sortBy);
  };

  const handleSortChange = (sort: 'recent' | 'impact') => {
    setSortBy(sort);
    updateURL(selectedCategory, searchTerm, sort);
  };

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length, icon: Settings },
    { id: 'hardware', name: 'Hardware', count: projects.filter(p => p.category === 'hardware').length, icon: Cpu },
    { id: 'research', name: 'Research', count: projects.filter(p => p.category === 'research').length, icon: Zap },
    { id: 'cad', name: 'CAD Design', count: projects.filter(p => p.category === 'cad').length, icon: Cog },
    { id: 'software', name: 'Software', count: projects.filter(p => p.category === 'software').length, icon: ExternalLink },
  ];

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.longDescription.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
      );
    }

    // Sort projects
    filtered.sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else { // impact
        // Featured projects first, then by date
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return filtered;
  }, [searchTerm, sortBy, selectedCategory]);

  // Derive top technology tags to offer as quick chips
  const topTags = useMemo(() => {
    const freq: Record<string, number> = {};
    projects.forEach(p => p.technologies.forEach(t => {
      const key = t.trim();
      if (!key) return;
      freq[key] = (freq[key] || 0) + 1;
    }));
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name]) => name);
  }, []);

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'planned': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hardware': return 'bg-blue-100 text-blue-700';
      case 'research': return 'bg-purple-100 text-purple-700';
      case 'cad': return 'bg-orange-100 text-orange-700';
      case 'software': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.h1
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Engineering Projects
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Projects spanning FPGA design, RF/microwave engineering, 
              electronics, PCB design, mechanical CAD, and mechatronics integration through simulation-based design.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
  {/* Filters and Search */}
  <motion.div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search projects, technologies, or keywords..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as 'recent' | 'impact')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="impact">Most Impactful</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {category.name} ({category.count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Tags */}
          {topTags.length > 0 && (
            <div className="mt-6 border-t border-gray-100 pt-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-gray-500">Popular tags:</span>
                {topTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleSearchChange(tag)}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
                  >
                    <Tag className="h-3.5 w-3.5 mr-1" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedProjects.length} of {projects.length} projects
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProjects.map((project, i) => (
            <motion.div key={project.id} className="group" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.45, delay: i * 0.04 }}>
              <Link to={`/projects/${project.id}`} className="block">
                <TiltCard className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-2xl">
                  {/* Project Image with hover blur */}
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 relative overflow-hidden">
                    {project.images[0] && (
                      <ProgressiveImage src={project.images[0]} alt={project.title} hoverBlur />
                    )}
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProjectStatusColor(project.status)}`}>
                        {project.status.replace('-', ' ')}
                      </span>
                    </div>
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(project.date).toLocaleDateString()}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-primary-600 font-medium text-sm flex items-center">
                        Learn More
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </span>
                      
                      <div className="flex space-x-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <button
              onClick={() => {
                handleSearchChange('');
                handleCategoryChange('all');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interested in Collaboration?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            I'm always excited to work on innovative engineering projects that push the boundaries 
            of mechatronics, simulation-based design, and electronics design.
          </p>
          <Link to="/contact" className="btn-primary">
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;
