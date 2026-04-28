import './SpecSheet.css';

interface SpecRow {
  label: string;
  value: string;
}

interface SpecGroup {
  title: string;
  rows: SpecRow[];
}

const specsLeft: SpecGroup[] = [
  {
    title: 'General Information',
    rows: [
      { label: 'Length',                      value: '4,600 mm' },
      { label: 'Width (without mirrors)',      value: '2,040 mm' },
      { label: 'Width (with mirrors)',         value: '2,210 mm' },
      { label: 'Height',                       value: '1,138 mm' },
      { label: 'Wheelbase',                    value: '2,730 mm' },
      { label: 'Front overhang',               value: '980 mm' },
      { label: 'Rear overhang',                value: '890 mm' },
      { label: 'Front track / rear track',     value: '1,692 mm / 1,614 mm' },
      { label: 'Ground clearance (to underbody)', value: '110 mm' },
      { label: 'Weight (DIN Empty)',            value: '1,280 kg' },
      { label: 'Fuel tank capacity',           value: '90 l' },
    ],
  },
  {
    title: 'Running Gear',
    rows: [
      { label: 'Suspension',        value: 'Double-wishbone, push-rod, front and rear' },
      { label: 'Wheels, front',     value: '9J × 20' },
      { label: 'Wheels, rear',      value: '12J × 21' },
      { label: 'Tyres, front',      value: '265 / 35 R20 ZR (Y) – Pirelli P Zero' },
      { label: 'Tyres, rear',       value: '335 / 30 R21 ZR (Y) – Pirelli P Zero' },
      { label: 'Driving programs',  value: 'Sport, Track, Wet — adaptive damping, traction control, stability control' },
    ],
  },
  {
    title: 'Brakes',
    rows: [
      { label: 'Diameters front brake discs', value: '380 mm carbon-ceramic' },
      { label: 'Diameters rear brake discs',  value: '380 mm carbon-ceramic' },
      { label: 'Brake pistons per caliper',   value: 'Front 6 / rear 4 — Brembo monobloc' },
    ],
  },
  {
    title: 'Acceleration',
    rows: [
      { label: '0 – 100 km/h (62 mph)',   value: '2.9 sec' },
      { label: '0 – 200 km/h (124 mph)',  value: '7.5 sec' },
      { label: '0 – 300 km/h (186 mph)',  value: '< 16.0 sec' },
    ],
  },
];

const specsRight: SpecGroup[] = [
  {
    title: 'Powertrain',
    rows: [
      { label: 'Engine type / number of cylinders', value: 'V12 naturally aspirated — 60° bank angle' },
      { label: 'Displacement',                      value: '5,980 cm³' },
      { label: 'Number of valves per cylinder',     value: '4' },
      { label: 'Aspiration',                        value: 'Naturally aspirated — titanium intake system' },
      { label: 'Power output',                      value: '864 PS (635 kW) at 8,000 rpm' },
      { label: 'Maximum torque',                    value: '900 Nm at 5,900 rpm' },
      { label: 'Transmission',                      value: '7-speed automated manual gearbox (AMT) or 6-speed manual' },
      { label: 'Drive system',                      value: 'Rear-wheel drive' },
      { label: 'Differential',                      value: 'Torsen limited-slip differential, rear axle' },
    ],
  },
  {
    title: 'Performance',
    rows: [
      { label: 'Maximum speed',          value: '355 km/h (221 mph)' },
      { label: '0 – 100 km/h',          value: '2.9 sec' },
      { label: 'Power-to-weight ratio', value: '493 PS / tonne' },
    ],
  },
  {
    title: 'Dimensions & Capacities',
    rows: [
      { label: 'Body',              value: 'Carbon-fibre monocoque — Carbo-Titanium HP52 & Carbo-Triax HP62' },
      { label: 'Doors',            value: '2 — scissor-opening' },
      { label: 'Seating capacity', value: '2' },
      { label: 'Boot volume',      value: '96 l' },
    ],
  },
  {
    title: 'Emissions',
    rows: [
      { label: 'CO₂ emissions combined',  value: '320 g/km' },
      { label: 'Fuel consumption combined', value: '14.4 l/100 km' },
      { label: 'Emission standard',        value: 'Euro 6d' },
    ],
  },
];

function SpecGroup({ group }: { group: SpecGroup }) {
  return (
    <div className="spec-group">
      <p className="spec-group__title">{group.title}</p>
      {group.rows.map((row, i) => (
        <div key={i} className="spec-row">
          <span className="spec-row__label">{row.label}</span>
          <span className="spec-row__value">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

export function SpecSheet() {
  return (
    <section id="specifications" className="spec-sheet">
      <h2 className="spec-sheet__heading">SPECIFICATIONS</h2>

      <div className="spec-sheet__grid">
        <SpecGroup group={specsLeft[0]} />
        <SpecGroup group={specsRight[0]} />
        <SpecGroup group={specsLeft[1]} />
        <SpecGroup group={specsRight[1]} />
        <SpecGroup group={specsLeft[2]} />
        <SpecGroup group={specsRight[2]} />
        <SpecGroup group={specsLeft[3]} />
        <SpecGroup group={specsRight[3]} />
      </div>

      <p className="spec-sheet__footer-label">SPECIFICATION SHEET</p>
    </section>
  );
}
