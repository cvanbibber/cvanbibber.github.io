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
    id: "diff-impedance-calculator",
    name: "Differential Pair Impedance (Microstrip)",
    description: "Estimate single-ended and differential impedance with spacing suggestion",
    category: "impedance",
    inputs: [
      { id: "width", label: "Trace Width", unit: "mm", type: "number", min: 0.05, max: 10, default: 0.2 },
      { id: "height", label: "Substrate Thickness (h)", unit: "mm", type: "number", min: 0.1, max: 5, default: 1.6 },
      { id: "dielectric", label: "Dielectric Constant (εr)", unit: "", type: "number", min: 1, max: 20, default: 4.2 },
      { id: "copperThickness", label: "Copper Thickness", unit: "µm", type: "number", min: 10, max: 105, default: 35 },
      { id: "spacing", label: "Pair Spacing (s)", unit: "mm", type: "number", min: 0.05, max: 10, default: 0.2 },
      { id: "targetZdiff", label: "Target Zdiff", unit: "Ω", type: "number", min: 50, max: 150, default: 100 }
    ],
    calculate: (inputs) => {
      const { width, height, dielectric, copperThickness, spacing, targetZdiff } = inputs;
      const w = width;
      const h = height;
      const er = dielectric;
      const t = (copperThickness || 35) / 1000; // mm

      // Effective width (Hammerstad/Jensen approx.)
      const weff = w + (t / Math.PI) * Math.log(1 + 4 * Math.E / (t / h * (1/Math.tanh(Math.sqrt(6.517 * w / t)))));
      const u = weff / h;
      const z0 = u <= 1
        ? (60 / Math.sqrt(er)) * Math.log(8 / u + u / 4)
        : (120 * Math.PI) / (Math.sqrt(er) * (u + 1.393 + 0.667 * Math.log(u + 1.444)));

      // Differential impedance approximation for coupled microstrip
      const s = spacing / h;
      const k = 0.48 * Math.exp(-0.96 * s);
      const zdiff = 2 * z0 * (1 - k);

      // Find recommended spacing for target Zdiff by simple search
      let bestS = spacing;
      let bestErr = Math.abs(zdiff - targetZdiff);
      for (let sTest = 0.05; sTest <= 5 * h; sTest += Math.max(0.01, 0.02 * h)) {
        const st = (sTest / h);
        const kd = 0.48 * Math.exp(-0.96 * st);
        const zdt = 2 * z0 * (1 - kd);
        const err = Math.abs(zdt - targetZdiff);
        if (err < bestErr) { bestErr = err; bestS = sTest; }
      }

      return {
        z0Single: Number(z0.toFixed(2)),
        zDiff: Number(zdiff.toFixed(2)),
        recSpacing: Number(bestS.toFixed(3))
      };
    }
  },
  {
    id: "via-current-thermal",
    name: "Via Current & Thermal Estimator",
    description: "Estimate via resistance, current per via, and temperature rise",
    category: "power",
    inputs: [
      { id: "holeDiameter", label: "Hole Diameter", unit: "mm", type: "number", min: 0.15, max: 1.0, default: 0.3 },
      { id: "plating", label: "Plating Thickness", unit: "µm", type: "number", min: 15, max: 35, default: 25 },
      { id: "height", label: "Board Thickness", unit: "mm", type: "number", min: 0.6, max: 2.4, default: 1.6 },
      { id: "count", label: "Vias in Parallel", unit: "", type: "number", min: 1, max: 100, default: 1 },
      { id: "current", label: "Total Current", unit: "A", type: "number", min: 0.1, max: 30, default: 2 }
    ],
    calculate: (inputs) => {
      const d_mm = inputs.holeDiameter;
      const t_mm = (inputs.plating || 25) / 1000; // mm
      const h_mm = inputs.height;
      const n = Math.max(1, Math.floor(inputs.count));
      const I = inputs.current;

      // Cross-sectional ring area (thin-wall approximation): A ≈ π * d * t
      const area_mm2 = Math.PI * d_mm * t_mm; // mm^2
      const area_m2 = area_mm2 * 1e-6; // m^2
      const L_m = h_mm / 1000; // m
      const rho = 1.7e-8; // Ω·m (copper)

      const R_via = (rho * L_m) / area_m2; // Ω per via
      const I_per = I / n; // A

      // Rough thermal resistance K/W (very approximate)
      const k_cu = 237; // W/m·K
      const Rth = L_m / (k_cu * area_m2); // K/W
      const P_per = I_per * I_per * R_via; // W
      const dT = P_per * Rth; // °C

      return {
        rPerVia: Number((R_via * 1000).toFixed(3)), // mΩ
        currentPerVia: Number(I_per.toFixed(2)),
        temperatureRise: Number(dT.toFixed(1)),
        safetyMargin: Number((Math.max(0, (40 - dT)) / 40 * 100).toFixed(0)) // vs. 40°C headroom
      };
    }
  },
  {
    id: "decap-optimizer",
    name: "Decoupling Capacitor Optimizer",
    description: "Suggest cap mix to meet target impedance over frequency",
    category: "power",
    inputs: [
      { id: "fMin", label: "Min Frequency", unit: "MHz", type: "number", min: 0.1, max: 1000, default: 1 },
      { id: "fMax", label: "Max Frequency", unit: "MHz", type: "number", min: 1, max: 5000, default: 100 },
      { id: "zTarget", label: "Target Impedance", unit: "mΩ", type: "number", min: 1, max: 500, default: 50 }
    ],
    calculate: (inputs) => {
      const fMaxHz = inputs.fMax * 1e6;
      const Zt = inputs.zTarget / 1000; // Ω
      // C_total required at fMax: Z = 1/(2π f C)
      const C_total = 1 / (2 * Math.PI * fMaxHz * Zt); // F
      const C_uF = C_total * 1e6;
      // Split: 60% small (0.1uF), 30% mid (1uF), 10% bulk (10uF)
      const n100n = Math.ceil((0.6 * C_uF) / 0.1);
      const n1u = Math.ceil((0.3 * C_uF) / 1);
      const n10u = Math.max(1, Math.ceil((0.1 * C_uF) / 10));
      return {
        totalCap: Number(C_uF.toFixed(2)),
        n100n: n100n,
        n1u: n1u,
        n10u: n10u
      };
    }
  },
  {
    id: "snubber-calculator",
    name: "Switching Regulator Snubber",
    description: "Suggest RC snubber from ringing frequency and parasitic C",
    category: "power",
    inputs: [
      { id: "fRing", label: "Ringing Frequency", unit: "MHz", type: "number", min: 0.1, max: 100, default: 10 },
      { id: "cPar", label: "Parasitic Capacitance", unit: "nF", type: "number", min: 0.5, max: 100, default: 10 }
    ],
    calculate: (inputs) => {
      const fHz = inputs.fRing * 1e6;
      const Cpar = inputs.cPar * 1e-9;
      const L = 1 / ((2 * Math.PI * fHz) ** 2 * Cpar); // H
      const Csnub = 2 * Cpar; // F (rule of thumb)
      const Rs = 1 / (2 * Math.PI * fHz * Csnub); // Ω
      return {
        lStray: Number((L * 1e6).toFixed(3)), // µH
        cSnub: Number((Csnub * 1e9).toFixed(2)), // nF
        rSnub: Number(Rs.toFixed(1)) // Ω
      };
    }
  },
  {
    id: "plane-drop",
    name: "PCB Power Plane Voltage Drop",
    description: "Estimate plane resistance, voltage drop, and power loss",
    category: "power",
    inputs: [
      { id: "length", label: "Current Path Length", unit: "mm", type: "number", min: 1, max: 1000, default: 100 },
      { id: "width", label: "Effective Width", unit: "mm", type: "number", min: 0.5, max: 100, default: 20 },
      { id: "copperOz", label: "Copper Weight", unit: "oz", type: "number", min: 0.5, max: 4, default: 1 },
      { id: "current", label: "Current", unit: "A", type: "number", min: 0.1, max: 100, default: 5 }
    ],
    calculate: (inputs) => {
      const L_m = inputs.length / 1000;
      const w_mm = inputs.width;
      const t_mm = inputs.copperOz * 0.0347;
      const A_m2 = (w_mm * t_mm) * 1e-6;
      const rho = 1.7e-8; // Ω·m
      const R = rho * L_m / A_m2;
      const V = inputs.current * R;
      const P = inputs.current * inputs.current * R;
      return {
        planeR: Number((R * 1000).toFixed(3)), // mΩ
        vDrop: Number((V * 1000).toFixed(2)), // mV
        planePower: Number((P * 1000).toFixed(2)) // mW
      };
    }
  },
  {
    id: "baud-error",
    name: "UART Baud Rate Error",
    description: "Compute actual baud, error, and best divisor",
    category: "transmission",
    inputs: [
      { id: "fclk", label: "MCU Clock", unit: "MHz", type: "number", min: 1, max: 400, default: 16 },
      { id: "baud", label: "Desired Baud", unit: "", type: "number", min: 110, max: 921600, default: 115200 },
      { id: "oversample", label: "Oversampling", unit: "x", type: "number", min: 4, max: 32, default: 16 },
      { id: "divisor", label: "Divisor (N)", unit: "", type: "number", min: 1, max: 65535, default: 8 }
    ],
    calculate: (inputs) => {
      const f = inputs.fclk * 1e6;
      const os = inputs.oversample || 16;
      const baud = inputs.baud;
      const N = Math.max(1, Math.round(inputs.divisor));
      const actual = f / (os * N);
      const err = (actual - baud) / baud * 100;
      const Nbest = Math.max(1, Math.round(f / (os * baud)));
      const bestBaud = f / (os * Nbest);
      const bestErr = (bestBaud - baud) / baud * 100;
      return {
        actualBaud: Number(actual.toFixed(1)),
        errorPercent: Number(err.toFixed(3)),
        suggestedDivisor: Nbest,
        suggestedBaud: Number(bestBaud.toFixed(1)),
        suggestedError: Number(bestErr.toFixed(3))
      };
    }
  },
  {
    id: "pwm-calculator",
    name: "Timer & PWM Frequency",
    description: "Compute achievable PWM frequency and resolution",
    category: "general",
    inputs: [
      { id: "fclk", label: "Timer Clock", unit: "MHz", type: "number", min: 0.5, max: 400, default: 16 },
      { id: "prescaler", label: "Prescaler", unit: "", type: "number", min: 1, max: 65536, default: 64 },
      { id: "bits", label: "Resolution (bits)", unit: "", type: "number", min: 1, max: 16, default: 8 }
    ],
    calculate: (inputs) => {
      const f = inputs.fclk * 1e6;
      const pres = Math.max(1, Math.round(inputs.prescaler));
      const levels = Math.pow(2, Math.max(1, Math.round(inputs.bits))) - 1;
      const freq = f / (pres * (levels + 1));
      const step = 100 / (levels + 1);
      return {
        pwmFrequency: Number(freq.toFixed(1)),
        resolutionBits: Math.round(inputs.bits),
        dutyStep: Number(step.toFixed(4))
      };
    }
  },
  {
    id: "battery-life",
    name: "Battery Life Estimator",
    description: "Estimate runtime from active/sleep currents and duty cycle",
    category: "power",
    inputs: [
      { id: "active", label: "Active Current", unit: "mA", type: "number", min: 0.01, max: 5000, default: 50 },
      { id: "sleep", label: "Sleep Current", unit: "mA", type: "number", min: 0, max: 100, default: 0.1 },
      { id: "duty", label: "Active Duty Cycle", unit: "%", type: "number", min: 0, max: 100, default: 10 },
      { id: "capacity", label: "Battery Capacity", unit: "mAh", type: "number", min: 1, max: 50000, default: 2000 },
      { id: "temp", label: "Temperature", unit: "°C", type: "number", min: -20, max: 60, default: 25 }
    ],
    calculate: (inputs) => {
      const duty = Math.min(100, Math.max(0, inputs.duty)) / 100;
      const Iavg = inputs.active * duty + inputs.sleep * (1 - duty);
      // Simple temperature derating
      let capAdj = inputs.capacity;
      if (inputs.temp < 0) capAdj *= 0.8; else if (inputs.temp > 40) capAdj *= 0.9;
      const hours = capAdj / Iavg;
      return {
        avgCurrent: Number(Iavg.toFixed(3)),
        capacityAdjusted: Number(capAdj.toFixed(0)),
        runtimeHours: Number(hours.toFixed(1)),
        runtimeDays: Number((hours / 24).toFixed(2))
      };
    }
  },
  {
    id: "rc-filter",
    name: "RC Low-Pass Filter Helper",
    description: "Compute R/C for a desired cutoff and sampling rate",
    category: "transmission",
    inputs: [
      { id: "fc", label: "Cutoff Frequency", unit: "kHz", type: "number", min: 0.1, max: 10000, default: 2 },
      { id: "fs", label: "ADC Sampling Rate", unit: "kHz", type: "number", min: 1, max: 50000, default: 10 },
      { id: "Rk", label: "Chosen R", unit: "kΩ", type: "number", min: 0.1, max: 1000, default: 10 }
    ],
    calculate: (inputs) => {
      const fc = inputs.fc * 1e3; // Hz
      const R = inputs.Rk * 1e3; // Ω
      const C = 1 / (2 * Math.PI * R * fc); // F
      const tau = R * C; // s
      const recFc = (inputs.fs * 1e3) / 5; // Hz
      return {
        cValue: Number((C * 1e9).toFixed(2)), // nF
        tau: Number((tau * 1e3).toFixed(3)), // ms
        recommendedFc: Number((recFc / 1e3).toFixed(2)) // kHz
      };
    }
  },
  {
    id: "rf-length",
    name: "RF Line Length Matcher",
    description: "Quarter/half-wave and phase length for given εr",
    category: "transmission",
    inputs: [
      { id: "freq", label: "Frequency", unit: "MHz", type: "number", min: 1, max: 100000, default: 2400 },
      { id: "erEff", label: "Effective εr", unit: "", type: "number", min: 1, max: 10, default: 2.9 },
      { id: "phase", label: "Phase Shift", unit: "°", type: "number", min: 0, max: 360, default: 90 }
    ],
    calculate: (inputs) => {
      const c = 299792458;
      const f = inputs.freq * 1e6;
      const vp = c / Math.sqrt(inputs.erEff);
      const lambda = vp / f; // m
      return {
        quarterWave: Number((lambda * 1000 / 4).toFixed(2)),
        halfWave: Number((lambda * 1000 / 2).toFixed(2)),
        phaseLength: Number(((lambda * 1000) * (inputs.phase / 360)).toFixed(2))
      };
    }
  },
  {
    id: "antenna-tuning",
    name: "Antenna Tuning Aid",
    description: "Estimate length trim to shift resonance",
    category: "antenna",
    inputs: [
      { id: "fMeas", label: "Measured Resonance", unit: "MHz", type: "number", min: 100, max: 6000, default: 2450 },
      { id: "fTarget", label: "Target Resonance", unit: "MHz", type: "number", min: 100, max: 6000, default: 2400 },
      { id: "length", label: "Current Length", unit: "mm", type: "number", min: 1, max: 1000, default: 31 }
    ],
    calculate: (inputs) => {
      // Length ∝ 1/f approx.
      const newLen = inputs.length * (inputs.fMeas / inputs.fTarget);
      const delta = newLen - inputs.length;
      return {
        newLength: Number(newLen.toFixed(2)),
        deltaLength: Number(delta.toFixed(2))
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
