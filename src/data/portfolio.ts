import { Project, Skill, Experience, Education } from '../types';

export const personalInfo = {
  name: "Conor Van Bibber",
  title: "Electrical Engineer",
  subtitle: "Advanced Mechatronics & Embedded Systems Engineer",
  email: "conorvanbibber@gmail.com",
  location: "Berkeley, CA",
  linkedin: "https://linkedin.com/in/conor-van-bibber",
  github: "https://github.com/cvanbibber",
  website: "https://cvanbibber.github.io",
  bio: "Electrical engineer specializing in high power and RF/microwave design, antenna systems, and electromagnetic simulation. Experienced in both hardware design and software development with a focus on creating innovative, reliable, and optimal solutions for complex engineering challenges."
};

export const skills: Skill[] = [
  // Programming
  { name: "Python", category: "programming", icon: "/skills/python.png" },
  { name: "C++", category: "programming", icon: "/skills/c++.png" },
  { name: "MATLAB", category: "programming", icon: "/skills/matlab.png" },
  
  // Hardware Design
  { name: "Altium Designer", category: "hardware", icon: "/skills/altium.png" },
  { name: "KiCad", category: "hardware", icon: "/skills/kicad.png" },
  
  // CAD/Mechanical
  { name: "SolidWorks", category: "software", icon: "/skills/solidworks.png" },
  { name: "Fusion 360", category: "software", icon: "/skills/fusion.png" },
  
  // Analysis Software
  { name: "ANSYS HFSS", category: "analysis", icon: "/skills/hfss.png" },
  { name: "ANSYS Maxwell", category: "analysis", icon: "/skills/maxwell.png" },
  { name: "ANSYS Fluent", category: "analysis", icon: "/skills/ansysfluent.png" },
  { name: "OpenFOAM", category: "analysis", icon: "/skills/openfoam.png" },
  
  // Manufacturing
  { name: "3D Printing", category: "hardware", icon: "/skills/3dprint.png" },
  { name: "CNC Machining", category: "hardware", icon: "/skills/cnc.png" },
  { name: "Laser Cutting", category: "hardware", icon: "/skills/lasercut.png" },
  { name: "Lathe Operation", category: "hardware", icon: "/skills/lathe.png" }
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    title: "RF Engineer Intern",
    company: "Tech Company", // Update with actual company
    location: "San Francisco, CA",
    startDate: "2023-06",
    endDate: "2023-08",
    description: [
      "Designed and simulated antenna arrays for 5G applications using ANSYS HFSS",
      "Developed Python scripts for automated electromagnetic analysis and optimization",
      "Collaborated with cross-functional teams to integrate RF solutions into product designs",
      "Performed measurements and validation of prototype antenna systems"
    ],
    technologies: ["ANSYS HFSS", "Python", "RF Design", "Antenna Arrays", "5G"]
  },
  // Add more experiences as needed
];

export const education: Education[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Science in Electrical Engineering",
    institution: "University of California, Berkeley",
    location: "Berkeley, CA",
    startDate: "2020-08",
    endDate: "2024-05", // Update as needed
    gpa: "3.8/4.0", // Update with actual GPA
    achievements: [
      "Dean's List (multiple semesters)",
      "IEEE Student Member",
      "Senior Design Project: [Project Name]",
      "Relevant Coursework: Electromagnetics, RF Circuits, Antenna Theory, Signal Processing"
    ]
  }
];

export const projects: Project[] = [
  // Featured Projects (existing ones updated)
  {
    id: "muon-detector-altimeter",
    title: "Muon Detector Altimeter Payload",
    description: "An innovative prototype for altitude detection designed for high-altitude weather balloons, space stations, and satellites",
    longDescription: "An innovative prototype for altitude detection designed for high-altitude weather balloons, space stations, and satellites. This prototype utilizes muons, subatomic particles generated through cosmic ray interactions in the upper atmosphere, to measure altitude based on the distance from the upper atmosphere, rather than relying on pressure sampling. This groundbreaking approach enables satellites and space stations in stable orbits to achieve precise altitude measurements even in low-pressure environments.",
    technologies: ["Particle Physics", "ANSYS HFSS", "PCB Design", "C++", "Python", "Signal Processing", "Space Systems", "FPGA"],
  images: ["/images/projects/muon-detector-altimeter.svg", "/static/media/muon2.7d3374d3.png", "/static/media/layout.2d74e840.png"],
    featured: true,
    category: "research",
    date: "2022-02",
    status: "completed",
    demoUrl: "",
    githubUrl: ""
  },
  {
    id: "hope-satellite",
    title: "HOPE Satellite Project",
    description: "Aerospace electronics and control systems for Berkeley's satellite program with advanced communication systems",
    longDescription: "Led the electronics and control systems development for Berkeley's HOPE satellite project. Designed high-frequency communication systems, power management circuits, and attitude control electronics. The project involved extensive RF simulation, PCB design for space applications, and integration with mechanical systems. Successfully passed all testing phases and deployment readiness assessments.",
    technologies: ["RF Design", "Altium Designer", "Aerospace Electronics", "ANSYS HFSS", "Power Management", "Embedded Systems", "FPGA"],
  images: ["/images/projects/hope-satellite.svg", "/static/media/HOPEFRONT.6cf372d4.png", "/static/media/HOPE_BACK.d0ad02cc.png"],
    featured: true,
    category: "hardware",
    date: "2023-09",
    status: "completed"
  },
  {
    id: "flight-computer-telemetry",
    title: "Long Range Live Telemetry Flight Computer for Aviation",
    description: "Advanced flight controller suite designed for ultra-long-range rocket flights with space-shot capabilities",
    longDescription: "An advanced flight controller suite designed for ultra-long-range rocket flights with space-shot capabilities. This flight computer offers exceptional quadruple redundancy, advanced Kalman filtering, extensive battery compatibility, versatile high-current outputs for separation charges or motor ignition, and live sensor uplink telemetry reaching up to 100km. It can transmit precise altitude measurements, achieve altitude precision at a sub-centimeter level, leverage GPS for accurate landing location extrapolation, and ensure data backup with a micro-SD card.",
    technologies: ["Embedded Systems", "Telemetry", "GPS", "Kalman Filtering", "PCB Design", "C++", "Real-time Systems", "FPGA"],
  images: ["/images/projects/flight-computer-telemetry.svg", "/static/media/pcb.9c6b494a.png", "/static/media/layout.2d74e840.png"],
    featured: true,
    category: "hardware",
    date: "2022-11",
    status: "completed"
  },
  {
    id: "ai-generative-wind-turbine",
    title: "AI Generative Design Optimized Wind Turbine",
    description: "Using Fusion 360's Generative Design to optimize a wind turbine for rigidity whilst reducing weight and ensuring manufacturability",
    longDescription: "Using Fusion 360's Generative Design to optimize a wind turbine for rigidity whilst reducing weight and ensuring manufacturability. The wind turbine won first place in strength to weight ratio and overall strength in the UC Berkeley engineering competition while adhering to the 500 gram mass requirement.",
    technologies: ["Fusion 360", "Generative Design", "AI Optimization", "SolidWorks", "Mechanical Design", "Manufacturing"],
  images: ["/images/projects/ai-generative-wind-turbine.svg", "/static/media/Needex.f0ab30a3.png", "/static/media/newmain.43a51081.png"],
    featured: true,
    category: "cad",
    date: "2021-10",
    status: "completed"
  },

  // Hardware/Electronics Projects
  {
    id: "electric-hand-sanitizer",
    title: "Electric Hand Sanitizer",
    description: "A pedestal mounted sterilizer using electric principles of capacitive coupling to safely and effectively sanitize small items and hands",
    longDescription: "A pedestal mounted sterilizer using electric principles of capacitive coupling to safely and effectively sanitize small items and hands for use in high traffic areas with high cleanliness requirements.",
    technologies: ["Capacitive Coupling", "Electronics", "Safety Systems", "PCB Design"],
  images: ["/images/projects/electric-hand-sanitizer.svg", "/images/placeholders/hardware.svg", "/images/placeholders/hardware-2.svg"],
    featured: false,
    category: "hardware",
    date: "2020-03",
    status: "completed"
  },
  {
    id: "modified-backpack-core",
    title: "Modified Backpack Core",
    description: "A comprehensive set of modifications for a backpack to incorporate IoT connectivity, a complete sensor suite, and support for high-power applications",
    longDescription: "A comprehensive set of modifications for a backpack to incorporate IoT connectivity, a complete sensor suite, and support for high-power applications with a PCB. Several mechanical modules can be attached, allowing the installation of a versatile 9-degree-of-freedom hydraulic arm. This arm facilitates utility functions, while the addition of an active scanning radar and sonar array further enhances the backpack's capabilities.",
    technologies: ["IoT", "Sensor Integration", "Hydraulic Systems", "PCB Design", "Radar", "Sonar"],
  images: ["/images/projects/modified-backpack-core.svg", "/images/placeholders/hardware.svg", "/images/placeholders/research-2.svg", "/images/placeholders/hardware-2.svg"],
    featured: false,
    category: "hardware",
    date: "2023-03",
    status: "completed"
  },
  {
    id: "compact-solar-charger",
    title: "Compact Solar Powered Battery Charger",
    description: "Miniaturized general purpose Solar battery charger intended for use cases ranging from cars to house systems",
    longDescription: "Miniaturized general purpose Solar battery charger intended for use cases ranging from cars to house systems. The PCB is intended to charge anywhere from single cell lithium batteries to high capacity Lithium Ion battery packs.",
    technologies: ["Solar Power", "Battery Management", "Power Electronics", "PCB Design", "Lithium Ion"],
  images: ["/images/projects/compact-solar-charger.svg", "/images/placeholders/hardware-2.svg", "/images/placeholders/hardware.svg"],
    featured: false,
    category: "hardware",
    date: "2023-02",
    status: "completed"
  },
  {
    id: "ultrasonic-projector",
    title: "Ultrasonic Projector",
    description: "An iteration of the former VIVID project, the ultrasonic projector uses 91 ultrasonic transducers instead of the 3 on the former model",
    longDescription: "An iteration of the former VIVID project, the ultrasonic projector uses 91 ultrasonic transducers instead of the 3 on the former model. It works by streaming and modulating a sound transmitted over Wi-Fi to an amplifier MOSFET array. Instead of detecting the obstacle, it projects a sound to the obstacle, meaning the user can 'hear' the obstacle from up to 50 feet away to avoid it.",
    technologies: ["Ultrasonic Transducers", "MOSFET Arrays", "Wi-Fi", "Signal Processing", "Amplifier Design"],
  images: ["/images/projects/ultrasonic-projector.svg", "/images/placeholders/hardware.svg", "/images/placeholders/hardware-2.svg"],
    featured: false,
    category: "hardware",
    date: "2022-08",
    status: "completed"
  },
  {
    id: "vivid-device",
    title: "Visually Impaired Visualization Device (VIVID)",
    description: "A portable device that employs ultrasonic transducers to measure the distance between the user and nearby obstacles",
    longDescription: "A portable device that employs ultrasonic transducers to measure the distance between the user and nearby obstacles. The gathered information is then processed and utilized to activate motors that adjust pins, providing tactile feedback on the user's hand to indicate the position and distance of the obstacle.",
    technologies: ["Ultrasonic Sensors", "Haptic Feedback", "Motor Control", "Signal Processing", "Embedded Systems"],
  images: ["/images/projects/vivid-device.svg", "/images/placeholders/hardware-2.svg", "/images/placeholders/hardware.svg"],
    featured: false,
    category: "hardware",
    date: "2022-01",
    status: "completed"
  },
  {
    id: "dave-avionics",
    title: "Deployable Aerial Vehicle Avionics",
    description: "The Deployable Aerial Vehicle Experiment (DAVE) is a glider that can be deployed from a rocket at its highest altitude",
    longDescription: "The Deployable Aerial Vehicle Experiment (DAVE) is a glider that can be deployed from a rocket at its highest altitude. I designed, prototyped, and debugged the PCB which acts as a structural support and avionics suite, managing control surfaces and receiving live instructions from the ground as well as completing a pre-programmed flight routine using GPS and MEMS accelerometers and altimeters to locate and transmit its position in real time.",
    technologies: ["Avionics", "GPS", "MEMS Sensors", "PCB Design", "Flight Control", "Telemetry", "RF Communications"],
  images: ["/images/projects/dave-avionics.svg", "/images/placeholders/hardware.svg", "/images/placeholders/research.svg"],
    featured: false,
    category: "hardware",
    date: "2023-03",
    status: "completed"
  },
  {
    id: "fire-proof-radio",
    title: "Fire-Proof Open Source Radio",
    description: "This Fire-Proof Radio was designed as a part of the disaster response engineering course at UC Berkeley",
    longDescription: "This Fire-Proof Radio was designed as a part of the disaster response engineering course at UC Berkeley. It is designed to act as a localized network for emergency response calls when landlines and cellular towers are non-functional, with each radio acting as a repeater and separate channels for listening to emergency broadcasts.",
    technologies: ["Radio Communications", "Mesh Networking", "Emergency Systems", "Fire-Resistant Design", "RF Design"],
  images: ["/images/projects/fire-proof-radio.svg", "/images/placeholders/hardware-2.svg", "/images/placeholders/software.svg"],
    featured: false,
    category: "hardware",
    date: "2022-03",
    status: "completed"
  },
  {
    id: "sterile-needle-dispenser",
    title: "Sterile Needle Dispensing Device",
    description: "I embarked on my introductory project at UC Berkeley, where I had the opportunity to develop a device aimed at mitigating the global impact of the coronavirus",
    longDescription: "I embarked on my introductory project at UC Berkeley, where I had the opportunity to develop a device aimed at mitigating the global impact of the coronavirus. The design features an integrated Internet of Things (IoT) connection that enables automatic notifications when the stock reaches a low level. Additionally, the device utilizes infrared beam detection to detect the insertion of money and subsequently dispenses a sterilized, prepackaged needle from a rotating chamber in a safe and controlled manner.",
    technologies: ["IoT", "Infrared Detection", "Sterilization", "Mechanical Design", "Safety Systems"],
  images: ["/images/projects/sterile-needle-dispenser.svg", "/images/placeholders/hardware.svg", "/images/placeholders/software-2.svg"],
    featured: false,
    category: "hardware",
    date: "2021-08",
    status: "completed"
  },
  {
    id: "autosyringe",
    title: "Automated Syringe Mechanism",
    description: "The 'Autosyringe' is a cutting-edge device designed to provide quick and efficient liquid injection, similar to an Epi-Pen",
    longDescription: "The 'Autosyringe' is a cutting-edge device designed to provide quick and efficient liquid injection, similar to an Epi-Pen. It boasts a dual safety switch that ensures optimal safety by incorporating machine learning color recognition. This technology ensures that the syringe only injects when it detects both a button push and human skin color, providing an added layer of security and peace of mind.",
    technologies: ["Machine Learning", "Computer Vision", "Medical Devices", "Safety Systems", "Embedded Systems"],
  images: ["/images/projects/autosyringe.svg", "/images/placeholders/hardware-2.svg", "/images/placeholders/software-2.svg"],
    featured: false,
    category: "hardware",
    date: "2019-12",
    status: "completed"
  },

  // Mechanical/CAD Projects
  {
    id: "x24-engine",
    title: "X-24 Engine",
    description: "Introducing an experimental X-configured engine with 24 cylinders, arranged in four banks of six",
    longDescription: "Introducing an experimental X-configured engine with 24 cylinders, arranged in four banks of six. This engine achieves perfect balancing and incorporates a combination of 3D printed components and precision-machined parts. The project focuses on exploring tolerance in machining, with the crankshaft machined on a lathe with a 3-jaw chuck and the piston assembly 3D printed.",
    technologies: ["Mechanical Design", "3D Printing", "Precision Machining", "Engine Design", "SolidWorks"],
  images: ["/images/projects/x24-engine.svg", "/images/placeholders/cad.svg", "/images/placeholders/cad-2.svg", "/images/placeholders/hardware.svg"],
    featured: false,
    category: "cad",
    date: "2023-01",
    status: "completed"
  },
  {
    id: "utility-submarine-drone",
    title: "Utility Submarine Drone",
    description: "A modular submersible drone with detachable tether for increased maneuverability and the ability to automatically retrace its steps",
    longDescription: "A modular submersible drone with detachable tether for increased maneuverability and the ability to automatically retrace its steps to return to home safely. This drone will be used for low cost bay area seafloor mapping and trash collection using a modular attachment point with hydraulic jaws.",
    technologies: ["Marine Engineering", "Hydraulics", "Autonomous Navigation", "Modular Design", "Underwater Systems"],
  images: ["/images/projects/utility-submarine-drone.svg", "/images/placeholders/cad-2.svg", "/images/placeholders/hardware.svg", "/images/placeholders/research.svg"],
    featured: false,
    category: "cad",
    date: "2023-01",
    status: "completed"
  },
  {
    id: "cnc-lathe-conversion",
    title: "CNC Lathe Conversion Module",
    description: "A modular conversion kit which can turn any lathe into a precise, computer controlled machine",
    longDescription: "A modular conversion kit which can turn any lathe into a precise, computer controlled machine with several modules that can be attached to each axis of the lathe, including the tailstock.",
    technologies: ["CNC", "Mechanical Design", "Automation", "Precision Machining", "Modular Systems"],
  images: ["/images/projects/cnc-lathe-conversion.svg", "/images/placeholders/cad.svg", "/images/placeholders/cad-2.svg"],
    featured: false,
    category: "cad",
    date: "2022-08",
    status: "completed"
  },
  {
    id: "mini-vending-machine",
    title: "Mini Open Source Vending Machine",
    description: "A small desktop vending machine for use with small businesses when a full-size vending machine is not needed or too expensive",
    longDescription: "A small desktop vending machine for use with small businesses when a full-size vending machine is not needed or too expensive. Designed to be an engineering design and assembly experience for non-STEM majors and marketed as a UC Berkeley collaborative effort to design a functional device for internal use.",
    technologies: ["Mechanical Design", "Product Design", "Educational Engineering", "Small Business Solutions"],
  images: ["/images/projects/mini-vending-machine.svg", "/images/placeholders/cad-2.svg", "/images/placeholders/software.svg"],
    featured: false,
    category: "cad",
    date: "2023-05",
    status: "completed"
  },
  {
    id: "venturi-tube-meter",
    title: "Venturi Tube Air Flow Meter",
    description: "A custom built venturi tube payload for the Deployable Aerial Vehicle Experiment (DAVE) to determine airspeed",
    longDescription: "A custom built venturi tube payload for the Deployable Aerial Vehicle Experiment (DAVE) to determine airspeed using bernoulli's principle and MEMS differential pressure sensors. The device is parametrically designed and optimized for highest accuracy when measure expected glider airspeeds.",
    technologies: ["Fluid Dynamics", "MEMS Sensors", "Parametric Design", "Aerodynamics", "Precision Instrumentation"],
  images: ["/images/projects/venturi-tube-meter.svg", "/images/placeholders/research.svg", "/images/placeholders/hardware-2.svg"],
    featured: false,
    category: "cad",
    date: "2021-09",
    status: "completed"
  },
  {
    id: "side-deployed-parachute",
    title: "Side-Deployed Parachute Payload",
    description: "A payload with the goal of developing an inline, reliable deployment method for parachutes from sounding rockets",
    longDescription: "A payload with the goal of developing an inline, reliable deployment method for parachutes from sounding rockets. The current method uses black powder charges to separate the rocket and subsequently deploy the parachute. This method uses a piston to push the parachute out of the side of the rocket, eliminating the need for explosives and the risk of damaging the rocket body.",
    technologies: ["Rocket Systems", "Deployment Mechanisms", "Safety Systems", "Mechanical Design"],
  images: ["/images/projects/side-deployed-parachute.svg", "/images/placeholders/cad.svg", "/images/placeholders/hardware.svg"],
    featured: false,
    category: "cad",
    date: "2022-08",
    status: "completed"
  },
  {
    id: "xwinder-restoration",
    title: "X-Winder Filament Winder Restoration",
    description: "The X-Winder is a CNC machine designed for winding and curing carbon fiber around molds",
    longDescription: "The X-Winder is a CNC machine designed for winding and curing carbon fiber around molds to create various structures such as rocket airframes and airfoils. I ordering necessary parts for restoration, machined customized components, and fine-tuning software parameters to ensure optimal functionality of the machine. Through these efforts, I was able to restore the X-Winder, enabling the precise and reliable production of carbon fiber tubes for berkeley's rocketry club.",
    technologies: ["CNC", "Carbon Fiber", "Machine Restoration", "Composite Manufacturing", "Precision Manufacturing"],
  images: ["/images/projects/xwinder-restoration.svg", "/images/placeholders/cad-2.svg", "/images/placeholders/research-2.svg"],
    featured: false,
    category: "cad",
    date: "2022-07",
    status: "completed"
  },
  {
    id: "solar-racing-boat",
    title: "Solar Racing Boat Design",
    description: "A unique boat design for maximizing speed and manueverability in the 2021 solar regatta for Ohlone College",
    longDescription: "A unique boat design for maximizing speed and manueverability in the 2021 solar regatta for Ohlone College. This design consisted of a catamaran design with dual hulls and utilized detachable hydrofoils to maximize speed while still keeping the design lightweight, manueverable, and manufacturable with ample space for mounting solar panels and passengers",
    technologies: ["Marine Design", "Hydrofoils", "Solar Integration", "Catamaran Design", "Lightweight Structures"],
  images: ["/images/projects/solar-racing-boat.svg", "/images/placeholders/research.svg", "/images/placeholders/cad.svg"],
    featured: false,
    category: "cad",
    date: "2019-10",
    status: "completed"
  },

  // Research Projects
  {
    id: "plasma-magnetic-confinement",
    title: "High Acceleration Plasma Magnetic Confinement",
    description: "A Prototype payload for sounding rockets that uses magnetic confinement xenon or hydrogen plasma",
    longDescription: "A Prototype payload for sounding rockets that uses magnetic confinement xenon or hydrogen plasma to experiment with modulation techniques to increase safety of fusion and other plasma applications under high acceleration environments, such as rocket launches or earthquakes.",
    technologies: ["Plasma Physics", "Magnetic Confinement", "Fusion Research", "High-G Systems", "Rocket Payloads"],
  images: ["/images/projects/plasma-magnetic-confinement.svg", "/images/placeholders/research.svg", "/images/placeholders/research-2.svg"],
    featured: false,
    category: "research",
    date: "2019-06",
    status: "completed"
  },
  {
    id: "ocean-microplastic-removal",
    title: "Ocean Microplastic Removal Drone Network",
    description: "This project features a network of amphibious and seaborne drones equipped with electrostatically charged nets",
    longDescription: "This project features a network of amphibious and seaborne drones equipped with electrostatically charged nets to target microplastic pollution. By leveraging container ship routes, the drones can be deployed to areas with high microplastic concentration to retrieve plastic particles from the ocean. This innovative approach utilizes electrostatic nets to more effectively attract the negatively charged plastic, surpassing the limitations of mechanical methods.",
    technologies: ["Environmental Engineering", "Electrostatic Systems", "Autonomous Drones", "Ocean Cleanup", "Network Systems"],
  images: ["/images/projects/ocean-microplastic-removal.svg", "/images/placeholders/research-2.svg", "/images/placeholders/software.svg"],
    featured: false,
    category: "research",
    date: "2019-09",
    status: "completed"
  },

  // Software/Media Projects
  // New Projects
  {
    id: "walker-project",
    title: "Adaptive Quadruped Walker",
    description: "A mechatronic quadruped platform with adaptive gait control for uneven terrain.",
    longDescription: "Designed and built a modular quadruped walker featuring swappable leg modules and an adaptive gait controller. The system integrates IMU feedback, servo kinematics, and terrain classification to maintain stability on uneven surfaces. Control loops were tuned for responsive stepping, while the chassis and linkages were optimized for manufacturability.",
    technologies: ["Mechatronics", "Servo Control", "IMU", "Kinematics", "Embedded C++", "SolidWorks"],
  images: ["/images/projects/walker-project.svg", "/images/placeholders/cad.svg", "/images/placeholders/hardware-2.svg"],
    featured: false,
    category: "cad",
    date: "2024-06",
    status: "completed"
  },
  {
    id: "bluetooth-switch",
    title: "Bluetooth Smart Switch",
    description: "Low-power BLE smart switch module with mobile control and OTA updates.",
    longDescription: "Developed a compact Bluetooth Low Energy switch module capable of driving mains-rated relays via opto-isolated control. Implemented secure pairing, OTA firmware updates, and a mobile app interface for scheduling and telemetry. Designed a multi-layer PCB with attention to EMI/ESD and creepage/clearance constraints.",
    technologies: ["BLE", "Low Power Design", "OTA Updates", "Mobile App", "PCB Design", "EMI/ESD"],
  images: ["/images/projects/bluetooth-switch.svg", "/images/placeholders/hardware.svg", "/images/placeholders/software-2.svg"],
    featured: false,
    category: "hardware",
    date: "2024-02",
    status: "completed"
  },
  {
    id: "universal-daq",
    title: "Universal DAQ System",
    description: "Modular data acquisition platform with interchangeable front-end cards and high-rate logging.",
    longDescription: "Architected a universal DAQ with modular front-end cards (analog, digital, RTD/thermocouple) and a common backplane. Supports synchronized sampling, precision references, and high-throughput logging to SD and host over USB/UART. Firmware provides a command protocol, calibration routines, and streaming with error detection.",
    technologies: ["ADC/DAC", "Precision References", "Backplane", "RTD/TC", "C/C++", "SD Logging"],
  images: ["/images/projects/universal-daq.svg", "/images/placeholders/hardware-2.svg", "/images/placeholders/research.svg"],
    featured: false,
    category: "hardware",
    date: "2024-09",
    status: "in-progress"
  },
  {
    id: "modular-camera-system",
    title: "Modular Camera System",
    description: "Interchangeable lens and sensor modules with FPGA-based ISP pipeline.",
    longDescription: "Designed a modular camera platform featuring interchangeable sensors (global/rolling shutter), lens mounts, and an FPGA-based pipeline for image signal processing. Implemented exposure control, color pipeline stages, and MIPI-CSI bridging to an embedded host for capture and analysis.",
    technologies: ["FPGA", "MIPI-CSI", "ISP Pipeline", "Image Processing", "Embedded Linux", "Optics"],
  images: ["/images/projects/modular-camera-system.svg", "/images/placeholders/research-2.svg", "/images/placeholders/hardware.svg"],
    featured: false,
    category: "research",
    date: "2025-04",
    status: "planned"
  },
  {
    id: "fluidx3d-tutorial",
    title: "FluidX3D Fluid Dynamics Analysis Video",
    description: "A short tutorial video showcasing application of FluidX3D, a program allowing for rapid, live CFD simulations",
    longDescription: "A short tutorial video showcasing application of FluidX3D, a program allowing for rapid, live CFD simulations for 3D models.",
    technologies: ["CFD", "FluidX3D", "Video Tutorial", "Fluid Dynamics", "Simulation"],
  images: ["/images/projects/fluidx3d-tutorial.svg", "/images/placeholders/research.svg", "/images/placeholders/software-2.svg"],
    featured: false,
    category: "software",
    date: "2023-05",
    status: "completed"
  }
];

export const featuredProjects = projects.filter(project => project.featured);
