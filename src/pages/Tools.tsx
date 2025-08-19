import React, { useState } from 'react';
import { Calculator, Settings, Zap, Radio, Cpu } from 'lucide-react';
import { engineeringTools } from '../data/tools';
import { Tool } from '../types';

const Tools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [results, setResults] = useState<Record<string, number>>({});

  const categories = {
    general: { name: 'General', icon: Settings, color: 'blue' },
    impedance: { name: 'Impedance', icon: Zap, color: 'green' },
    power: { name: 'Power', icon: Cpu, color: 'red' },
    antenna: { name: 'Antenna', icon: Radio, color: 'purple' },
    transmission: { name: 'Transmission', icon: Calculator, color: 'orange' },
  };

  const handleToolSelect = (tool: Tool) => {
    setSelectedTool(tool);
    // Initialize inputs with default values
    const defaultInputs: Record<string, number> = {};
    tool.inputs.forEach(input => {
      defaultInputs[input.id] = input.default || 0;
    });
    setInputs(defaultInputs);
    setResults({});
  };

  const handleInputChange = (inputId: string, value: number) => {
    setInputs(prev => ({ ...prev, [inputId]: value }));
  };

  const calculate = () => {
    if (selectedTool) {
      const calculatedResults = selectedTool.calculate(inputs);
      setResults(calculatedResults);
    }
  };



  const groupedTools = engineeringTools.reduce((groups, tool) => {
    if (!groups[tool.category]) {
      groups[tool.category] = [];
    }
    groups[tool.category].push(tool);
    return groups;
  }, {} as Record<string, Tool[]>);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Engineering Tools & Calculators
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Some simple engineering calculators and tools for RF design, 
              PCB layout, antenna analysis, and more. All calculations are performed 
              client-side for privacy and speed.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tool Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Select a Tool
              </h2>
              
              {Object.entries(groupedTools).map(([category, tools]) => {
                const categoryInfo = categories[category as keyof typeof categories];
                const Icon = categoryInfo.icon;
                
                return (
                  <div key={category} className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <h3 className="font-medium text-gray-900">
                        {categoryInfo.name}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {tools.map((tool) => (
                        <button
                          key={tool.id}
                          onClick={() => handleToolSelect(tool)}
                          className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                            selectedTool?.id === tool.id
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            {tool.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calculator Interface */}
          <div className="lg:col-span-2">
            {selectedTool ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {selectedTool.name}
                  </h2>
                  <p className="text-gray-600">
                    {selectedTool.description}
                  </p>
                </div>

                {/* Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Input Parameters
                    </h3>
                    <div className="space-y-4">
                      {selectedTool.inputs.map((input) => (
                        <div key={input.id}>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {input.label} {input.unit && `(${input.unit})`}
                          </label>
                          <input
                            type="number"
                            value={inputs[input.id] || ''}
                            onChange={(e) => handleInputChange(input.id, parseFloat(e.target.value) || 0)}
                            min={input.min}
                            max={input.max}
                            step="any"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            placeholder={input.default?.toString()}
                          />
                        </div>
                      ))}
                    </div>
                    
                    <button
                      onClick={calculate}
                      className="w-full mt-6 btn-primary"
                    >
                      Calculate
                    </button>
                  </div>

                  {/* Results Section */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Results
                    </h3>
                    {Object.keys(results).length > 0 ? (
                      <div className="space-y-3">
                        {Object.entries(results).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm font-medium text-gray-700 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-lg font-semibold text-gray-900">
                              {typeof value === 'number' ? value.toLocaleString() : value}
                              {getResultUnit(key)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-center py-8">
                        Enter parameters and click Calculate to see results
                      </div>
                    )}
                  </div>
                </div>

                {/* Formula/Theory Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    About This Calculator
                  </h3>
                  <div className="text-gray-600">
                    {getCalculatorInfo(selectedTool.id)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a Tool to Get Started
                </h2>
                <p className="text-gray-600">
                  Choose from our collection of professional engineering calculators 
                  to solve complex design problems quickly and accurately.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get appropriate units for results
const getResultUnit = (key: string): string => {
  const units = {
    traceWidth: ' mm',
    traceArea: ' mm²',
    resistance: ' mΩ',
    voltageDrop: ' mV',
    powerLoss: ' mW',
    impedance: ' Ω',
    effectiveDielectric: '',
    phaseVelocity: ' Mm/s',
    wavelength: ' m',
    currentCapacity: ' A',
    temperatureRise: ' °C',
    safetyMargin: '%',
    totalLength: ' mm',
    armLength: ' mm',
    monopoleLength: ' mm',
    radiationResistance: ' Ω',
    bandwidth: ' MHz',
    resonantFreq: ' MHz',
    qFactor: '',
  requiredL: ' μH',
  requiredC: ' pF',
  z0Single: ' Ω',
  zDiff: ' Ω',
  recSpacing: ' mm',
  rPerVia: ' mΩ',
  currentPerVia: ' A',
  totalCap: ' μF',
  n100n: '',
  n1u: '',
  n10u: '',
  lStray: ' μH',
  cSnub: ' nF',
  rSnub: ' Ω',
  planeR: ' mΩ',
  vDrop: ' mV',
  planePower: ' mW',
  actualBaud: '',
  errorPercent: ' %',
  suggestedDivisor: '',
  suggestedBaud: '',
  suggestedError: ' %',
  pwmFrequency: ' Hz',
  resolutionBits: ' bit',
  dutyStep: ' %',
  avgCurrent: ' mA',
  capacityAdjusted: ' mAh',
  runtimeHours: ' h',
  runtimeDays: ' d',
  cValue: ' nF',
  tau: ' ms',
  recommendedFc: ' kHz',
  quarterWave: ' mm',
  halfWave: ' mm',
  phaseLength: ' mm',
  newLength: ' mm',
  deltaLength: ' mm',
  };
  return units[key as keyof typeof units] || '';
};

// Helper function to provide educational information about each calculator
const getCalculatorInfo = (toolId: string): string => {
  const info = {
    'trace-width-calculator': 'Based on IPC-2221 standards for PCB trace current capacity. Calculations assume external traces in still air at room temperature.',
    'impedance-calculator': 'Uses microstrip transmission line equations for characteristic impedance calculation. Results are approximate and should be verified with field solvers.',
    'via-calculator': 'Estimates via impedance and current capacity. Actual performance may vary based on PCB stackup and manufacturing tolerances.',
    'antenna-calculator': 'Provides basic dimensions for half-wave dipole antennas in free space. Real-world performance will be affected by ground planes and nearby objects.',
  'lc-calculator': 'Calculates resonant frequency and component values for LC circuits. Assumes ideal components without parasitic effects.',
  'diff-impedance-calculator': 'Differential pair approximation for coupled microstrip; useful for quick spacing iterations. Verify with field solvers for final design.',
  'via-current-thermal': 'Thin-wall model for via copper ring; results are conservative estimates and ignore spreading/adjacent copper effects.',
  'decap-optimizer': 'Targets impedance at high frequency and proposes a practical cap mix (0.1u/1u/10u). Consider ESR/ESL and placement for best results.',
  'snubber-calculator': 'Estimates parasitics and suggests RC snubber values from ringing frequency; tune on the bench for optimal damping.',
  'plane-drop': 'Uses sheet resistance derived from copper weight to estimate plane voltage drop and power dissipation.',
  'baud-error': 'Computes actual baud and error given clock, oversampling, and divisor; suggests closest divisor.',
  'pwm-calculator': 'Relates timer clock, prescaler, and resolution to the achievable PWM frequency and duty step size.',
  'battery-life': 'Simple duty-cycle energy model with coarse temperature derating; battery chemistry may vary.',
  'rc-filter': 'RC low-pass helper for embedded ADC front-ends; considers convenient R value and computes required C.',
  'rf-length': 'Quarter/half-wave and custom phase lengths given effective dielectric constant.',
  'antenna-tuning': 'Length scales approximately inversely with frequency; calculator estimates how much to trim/extend.',
  };
  return info[toolId as keyof typeof info] || 'Professional engineering calculator with industry-standard formulas.';
};

export default Tools;
