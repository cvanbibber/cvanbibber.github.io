import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag, ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { projects } from '../data/portfolio';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <Link 
            to="/projects" 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const categoryPlaceholders: Record<string, { primary: string; secondary: string }> = {
    hardware: { primary: '/images/placeholders/hardware.svg', secondary: '/images/placeholders/hardware-2.svg' },
    cad: { primary: '/images/placeholders/cad.svg', secondary: '/images/placeholders/cad-2.svg' },
    research: { primary: '/images/placeholders/research.svg', secondary: '/images/placeholders/research-2.svg' },
    software: { primary: '/images/placeholders/software.svg', secondary: '/images/placeholders/software-2.svg' },
  };

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hardware': return 'bg-red-100 text-red-800';
      case 'research': return 'bg-purple-100 text-purple-800';
      case 'cad': return 'bg-blue-100 text-blue-800';
      case 'software': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/projects" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-600">{project.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    View Code
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-2 h-4 w-4" />
                {formatDate(project.date)}
              </div>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </span>
              
              {project.featured && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Images - ensure placeholders exist */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(project.images && project.images.length ? project.images : [
                  categoryPlaceholders[project.category].primary,
                  categoryPlaceholders[project.category].secondary,
                ]).slice(0, 4).map((image, index) => (
                  <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${project.title} - ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const fallback = index % 2 === 0
                          ? categoryPlaceholders[project.category].primary
                          : categoryPlaceholders[project.category].secondary;
                        e.currentTarget.src = fallback;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Project Description */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Project Overview</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {project.longDescription}
                </p>
              </div>

              {/* Extrapolated helpful sections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Objectives</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Deliver a reliable, testable prototype aligned with the project scope</li>
                    <li>Validate core assumptions via simulation and bench testing</li>
                    <li>Design for manufacturability and integration with adjacent systems</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">My Contributions</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Lead design and implementation of key subsystems</li>
                    <li>Develop test plans and instrumentation for data collection</li>
                    <li>Coordinate cross-discipline work across electrical, mechanical, and software</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Outcomes</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Demonstrated core functionality and performance targets</li>
                    <li>Documented learnings and next-iteration opportunities</li>
                    <li>Delivered a maintainable, modular solution ready for extension</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Media & Documentation section removed per request */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="mr-2 h-5 w-5" />
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                  </dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Completion Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatDate(project.date)}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Technologies</dt>
                  <dd className="mt-1 text-sm text-gray-900">{project.technologies.length} tools used</dd>
                </div>
              </div>
            </div>

            {/* Related Projects */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Projects</h3>
              <div className="space-y-3">
                {projects
                  .filter(p => p.id !== project.id && p.category === project.category)
                  .slice(0, 3)
                  .map((relatedProject) => (
                    <Link
                      key={relatedProject.id}
                      to={`/projects/${relatedProject.id}`}
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 text-sm mb-1">
                        {relatedProject.title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {relatedProject.description}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
