import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mechatronics engineering student at UC Berkeley passionate about exploring diverse fields through hands-on project experiences
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Engineering Philosophy</h2>
              <p className="text-lg text-gray-700 mb-6">
                As a Mechatronics engineering student at UC Berkeley, I specialize in the integration of mechanical, 
                electrical, and computational systems. I think this brings a unique view to my work, allowing me to approach multidisciplinary problems from multiple angles.
                </p>
              <p className="text-lg text-gray-700">
                I believe in combining mechanical, electronics, and software engineering principles, leveraging simulation to optimize designs, and algorithmic engineering to push the boundaries of what's possible in modern engineering.
              </p>
            </div>

            {/* Core Competencies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              
              {/* FPGA Design */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">FPGA Design & Digital Systems</h3>
                <p className="text-gray-700 mb-4">
                  Expertise in FPGA development for high-performance computing applications, digital signal processing, 
                  and real-time control systems. Proficient in VHDL/Verilog and hardware acceleration techniques.
                </p>
                <div className="flex items-center text-primary-600 hover:text-primary-700">
                  <Link to="/projects?search=FPGA" className="flex items-center">
                    View FPGA Projects <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* RF/Microwave */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">RF/Microwave Engineering</h3>
                <p className="text-gray-700 mb-4">
                  Specialized in electromagnetic simulation using ANSYS HFSS and Maxwell, antenna design, 
                  transmission line analysis, and RF circuit optimization for communication systems.
                </p>
                <div className="flex items-center text-primary-600 hover:text-primary-700">
                  <Link to="/projects?search=RF" className="flex items-center">
                    Explore RF Projects <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Electronics & PCB */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Electronics & PCB Design</h3>
                <p className="text-gray-700 mb-4">
                  Proficient in circuit design, PCB layout using Altium Designer and KiCAD, component selection, 
                  and design for manufacturability. Experience with high-speed digital and analog circuits.
                </p>
                <div className="flex items-center text-primary-600 hover:text-primary-700">
                  <Link to="/projects?category=hardware" className="flex items-center">
                    See Electronics Work <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Mechanical & CAD */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Mechanical Design & CAD</h3>
                <p className="text-gray-700 mb-4">
                  Advanced CAD design using SolidWorks and Fusion 360, with expertise in generative design, 
                  topology optimization, and design for additive manufacturing. Strong background in FEA and CFD analysis.
                </p>
                <div className="flex items-center text-primary-600 hover:text-primary-700">
                  <Link to="/projects?category=cad" className="flex items-center">
                    View CAD Projects <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Simulation & Design Philosophy */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Simulation-Based Design Approach</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  By leveraging advanced simulation tools to validate and optimize designs, I can identify potential issues and make informed decisions before physical prototyping. This approach includes:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span><strong>Electromagnetic Simulation:</strong> Using ANSYS HFSS and Maxwell for RF/microwave design validation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span><strong>Finite Element Analysis:</strong> Structural and thermal analysis using ANSYS and SolidWorks Simulation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span><strong>Computational Fluid Dynamics:</strong> Flow analysis and optimization using ANSYS Fluent and OpenFOAM</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span><strong>Generative Design:</strong> AI-powered design exploration using Fusion 360 and Hyperganic</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Education & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-semibold text-gray-900">University of California, Berkeley</h4>
                    <p className="text-gray-600">Mechanical Engineering (Mechatronics Focus)</p>
                    <p className="text-sm text-gray-500">2021 - 2025</p>
                  </div>
                  <div className="border-l-4 border-gray-300 pl-4">
                    <h4 className="font-semibold text-gray-900">Ohlone College</h4>
                    <p className="text-gray-600">Certificate of Achievement in Engineering + Physics</p>
                    <p className="text-sm text-gray-500">2019 - 2021</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Projects</h3>
                <div className="space-y-3">
                  <Link to="/projects/muon-detector" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                    <h4 className="font-medium text-gray-900">Muon Detector System</h4>
                    <p className="text-sm text-gray-600">Electromagnetic simulation and detector design</p>
                  </Link>
                  <Link to="/projects/hope-satellite" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                    <h4 className="font-medium text-gray-900">HOPE Satellite Project</h4>
                    <p className="text-sm text-gray-600">Aerospace electronics and control systems</p>
                  </Link>
                  <Link to="/projects/pcb-designs" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                    <h4 className="font-medium text-gray-900">Advanced PCB Designs</h4>
                    <p className="text-sm text-gray-600">High-frequency and mixed-signal circuits</p>
                  </Link>
                </div>
              </div>
            </div>

            {/* Tools & Technologies */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Professional Tools & Technologies</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'ANSYS HFSS', 'ANSYS Maxwell', 'SolidWorks', 'Fusion 360',
                  'Altium Designer', 'KiCAD', 'Python', 'MATLAB',
                  'C++', 'VHDL/Verilog', 'OpenFOAM', 'Hyperganic'
                ].map((tool) => (
                  <div key={tool} className="bg-primary-50 text-primary-700 px-3 py-2 rounded text-center text-sm font-medium">
                    {tool}
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-to-r from-primary-50 to-accent-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Me</h3>
              <p className="text-gray-700 mb-6">
                I'm always excited to tackle new challenges in electronics, mechatronics, or simulation-based design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="btn-primary">
                  Get In Touch
                </Link>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
