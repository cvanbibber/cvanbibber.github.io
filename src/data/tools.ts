import { Tool } from '../types';

export const engineeringTools: Tool[] = [
  {
    id: "trace-width-calculator",
    name: "PCB Trace Width Calculator",
    description: "Calculate the required trace width for a given current and temperature rise",
    category: "general",
    inputs: [
      { id: "current", label: "Current", unit: "A", type: "number", min: 0.1, max: 100, default: 1 },
      { id: "tempRise", label: "Temperature Rise", unit: "°C", type: "number", min: 1, max: 100, default: 10 },
      { id: "copperThickness", label: "Copper Thickness", unit: "oz", type: "number", min: 0.5, max: 4, default: 1 },
      { id: "traceLength", label: "Trace Length", unit: "mm", type: "number", min: 1, max: 1000, default: 50 }
    ],
    calculate: (inputs) => {
      const { current, tempRise, copperThickness, traceLength } = inputs;
      
      // IPC-2221 formula for external traces
      const area = Math.pow(current / (0.048 * Math.pow(tempRise, 0.44)), 1/0.725);
      
      // Convert area to width (thickness = copper thickness * 0.0347mm/oz)
      const thickness = copperThickness * 0.0347; // mm
      const width = area / thickness;
      
      // Calculate resistance and voltage drop
      const resistivity = 1.7e-8; // ohm⋅m for copper
      const resistance = (resistivity * traceLength * 1e-3) / (area * 1e-6); // ohms
      const voltageDrop = current * resistance;
      const powerLoss = current * current * resistance;
      
      return {
        traceWidth: Number(width.toFixed(3)),
        traceArea: Number(area.toFixed(3)),
        resistance: Number((resistance * 1000).toFixed(3)), // mΩ
        voltageDrop: Number((voltageDrop * 1000).toFixed(3)), // mV
        powerLoss: Number((powerLoss * 1000).toFixed(3)) // mW
      };
    }
  },
  {
    id: "impedance-calculator",
    name: "Microstrip Impedance Calculator",
    description: "Calculate characteristic impedance of microstrip transmission lines",
    category: "impedance",
    inputs: [
      { id: "width", label: "Trace Width", unit: "mm", type: "number", min: 0.1, max: 10, default: 0.2 },
      { id: "thickness", label: "Substrate Thickness", unit: "mm", type: "number", min: 0.1, max: 5, default: 1.6 },
      { id: "dielectric", label: "Dielectric Constant (εr)", unit: "", type: "number", min: 1, max: 20, default: 4.4 },
      { id: "copperThickness", label: "Copper Thickness", unit: "μm", type: "number", min: 17, max: 105, default: 35 }
    ],
    calculate: (inputs) => {
      const { width, thickness, dielectric, copperThickness } = inputs;
      
      const w = width;
      const h = thickness;
      const er = dielectric;
      const t = copperThickness / 1000; // convert to mm
      
      // Effective width accounting for copper thickness
      const weff = w + (t / Math.PI) * Math.log(2 * h / t);
      
      let z0;
      if (weff / h <= 1) {
        // Narrow trace
        z0 = (60 / Math.sqrt(er)) * Math.log(8 * h / weff + weff / (4 * h));
      } else {
        // Wide trace
        z0 = (120 * Math.PI) / (Math.sqrt(er) * (weff / h + 1.393 + 0.667 * Math.log(weff / h + 1.444)));
      }
      
      // Effective dielectric constant
      const erEff = (er + 1) / 2 + ((er - 1) / 2) * Math.pow(1 + 12 * h / weff, -0.5);
      
      // Phase velocity
      const c = 299792458; // m/s
      const vp = c / Math.sqrt(erEff);
      
      return {
        impedance: Number(z0.toFixed(2)),
        effectiveDielectric: Number(erEff.toFixed(3)),
        phaseVelocity: Number((vp / 1e6).toFixed(1)), // Mm/s
        wavelength: Number((vp / 1e9).toFixed(3)) // m at 1 GHz
      };
    }
  },
  {
    id: "via-calculator",
    name: "Via Impedance Calculator",
    description: "Calculate the impedance and current carrying capacity of vias",
    category: "impedance",
    inputs: [
      { id: "diameter", label: "Via Diameter", unit: "mm", type: "number", min: 0.1, max: 2, default: 0.2 },
      { id: "height", label: "Via Height", unit: "mm", type: "number", min: 0.1, max: 5, default: 1.6 },
      { id: "padDiameter", label: "Pad Diameter", unit: "mm", type: "number", min: 0.2, max: 3, default: 0.4 },
      { id: "current", label: "Current", unit: "A", type: "number", min: 0.1, max: 10, default: 1 }
    ],
    calculate: (inputs) => {
      const diameter = inputs.diameter;
      const height = inputs.height;
      const current = inputs.current;
      
      const d = diameter;
      const h = height;
      
      // Via impedance approximation
      const impedance = 60 * Math.log(4 * h / d);
      
      // Current capacity (conservative estimate)
      const area = Math.PI * Math.pow(d / 2, 2); // mm²
      const currentCapacity = area * 2; // A/mm² rule of thumb
      
      // Thermal resistance
      const thermalResistance = h / (237 * area); // K/W (copper thermal conductivity ≈ 237 W/m⋅K)
      
      // Temperature rise
      const resistance = 1.7e-8 * h / (area * 1e-6); // ohms
      const powerLoss = current * current * resistance;
      const tempRise = powerLoss * thermalResistance;
      
      return {
        impedance: Number(impedance.toFixed(2)),
        currentCapacity: Number(currentCapacity.toFixed(2)),
        resistance: Number((resistance * 1e6).toFixed(2)), // μΩ
        temperatureRise: Number(tempRise.toFixed(1)),
        safetyMargin: Number(((currentCapacity / current - 1) * 100).toFixed(1))
      };
    }
  },
  {
    id: "antenna-calculator",
    name: "Dipole Antenna Calculator",
    description: "Calculate dimensions for half-wave dipole antennas",
    category: "antenna",
    inputs: [
      { id: "frequency", label: "Frequency", unit: "MHz", type: "number", min: 1, max: 10000, default: 2400 },
      { id: "wireRadius", label: "Wire Radius", unit: "mm", type: "number", min: 0.1, max: 10, default: 1 },
      { id: "velocityFactor", label: "Velocity Factor", unit: "", type: "number", min: 0.6, max: 1, default: 0.95 }
    ],
    calculate: (inputs) => {
      const { frequency, wireRadius, velocityFactor } = inputs;
      
      const c = 299792458; // m/s
      const f = frequency * 1e6; // Hz
      const lambda = (c / f) * velocityFactor; // m
      
      // Half-wave dipole length
      const totalLength = lambda / 2; // m
      const armLength = totalLength / 2; // m
      
      // Quarter-wave monopole (for comparison)
      const monopoleLength = lambda / 4; // m
      
      // Radiation resistance (approximate)
      const radiationResistance = 73; // ohms for half-wave dipole
      
      // Bandwidth (approximate, depends on wire thickness)
      const lengthToDiameter = (totalLength * 1000) / (2 * wireRadius);
      const bandwidth = frequency * 0.05 / Math.log(lengthToDiameter); // MHz, rough approximation
      
      return {
        totalLength: Number((totalLength * 1000).toFixed(1)), // mm
        armLength: Number((armLength * 1000).toFixed(1)), // mm
        monopoleLength: Number((monopoleLength * 1000).toFixed(1)), // mm
        wavelength: Number((lambda * 1000).toFixed(1)), // mm
        radiationResistance: radiationResistance,
        bandwidth: Number(bandwidth.toFixed(1)) // MHz
      };
    }
  },
  {
    id: "lc-calculator",
    name: "LC Resonant Circuit Calculator",
    description: "Calculate resonant frequency and component values for LC circuits",
    category: "general",
    inputs: [
      { id: "inductance", label: "Inductance", unit: "μH", type: "number", min: 0.001, max: 1000, default: 10 },
      { id: "capacitance", label: "Capacitance", unit: "pF", type: "number", min: 0.1, max: 100000, default: 100 },
      { id: "resistance", label: "Series Resistance", unit: "Ω", type: "number", min: 0.1, max: 1000, default: 10 },
      { id: "targetFreq", label: "Target Frequency", unit: "MHz", type: "number", min: 0.1, max: 10000, default: 100 }
    ],
    calculate: (inputs) => {
      const { inductance, capacitance, resistance, targetFreq } = inputs;
      
      const L = inductance * 1e-6; // H
      const C = capacitance * 1e-12; // F
      const R = resistance; // Ω
      const fTarget = targetFreq * 1e6; // Hz
      
      // Resonant frequency
      const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C)); // Hz
      
      // Q factor
      const omega0 = 2 * Math.PI * f0;
      const Q = omega0 * L / R;
      
      // Bandwidth
      const bandwidth = f0 / Q; // Hz
      
      // Required L for target frequency (keeping C constant)
      const LForTarget = 1 / (Math.pow(2 * Math.PI * fTarget, 2) * C); // H
      
      // Required C for target frequency (keeping L constant)
      const CForTarget = 1 / (Math.pow(2 * Math.PI * fTarget, 2) * L); // F
      
      // Characteristic impedance
      const Z0 = Math.sqrt(L / C); // Ω
      
      return {
        resonantFreq: Number((f0 / 1e6).toFixed(3)), // MHz
        qFactor: Number(Q.toFixed(1)),
        bandwidth: Number((bandwidth / 1e3).toFixed(1)), // kHz
        requiredL: Number((LForTarget * 1e6).toFixed(3)), // μH
        requiredC: Number((CForTarget * 1e12).toFixed(1)), // pF
        impedance: Number(Z0.toFixed(1)) // Ω
      };
    }
  }
];
