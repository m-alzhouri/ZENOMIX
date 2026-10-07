import { ServiceItem, FleetVehicle, Testimonial } from './types';

export const servicesData: ServiceItem[] = [
  {
    id: 'logistics',
    title: 'Logistics',
    shortDesc: 'Fixed delivery routes and part loads up to 3.5 t — as a dependable subcontractor for major B2B logistics networks.',
    longDesc: 'We run fixed delivery routes as a subcontractor for established B2B logistics networks and move part loads and palletised goods within the segment up to 3.5 tonnes. Routes are staffed reliably through our own shift planning, including cover for sickness and holidays, and we add capacity in peak season. For our clients that means dependable route coverage without building up their own driver pool.',
    iconName: 'Route',
    features: [
      'Fixed delivery routes as a logistics subcontractor',
      'Part loads and palletised goods up to 1,200 kg',
      'Predictable driver staffing including cover',
      'Extra capacity in peak season'
    ],
    specs: {
      transitTime: 'Scheduled routes',
      capacity: 'Up to 1,200 kg',
      globalCoverage: 'Regional & nationwide'
    }
  },
  {
    id: 'fleet-management',
    title: 'Fleet & Shift Management',
    shortDesc: 'Our own software for driver, shift and route planning — traceable personnel scheduling instead of paperwork.',
    longDesc: 'Our operation is digital end to end. We build and run our own software, purpose-made for driver and shift management: planning shifts, assigning routes, recording availability and working hours, and evaluating how personnel are deployed. The focus is deliberately on organising drivers and shifts — not on tracking individual parcels. For clients that translates into staffed routes, documented assignments and figures they can rely on.',
    iconName: 'LayoutDashboard',
    features: [
      'In-house shift and route planning software',
      'Availability and stand-in management',
      'Digital records of working and driving hours',
      'Reporting on route coverage and staffing'
    ],
    specs: {
      transitTime: 'Real time',
      capacity: 'Entire fleet',
      globalCoverage: 'All locations'
    }
  },
  {
    id: 'courier',
    title: 'Courier & Parcel Services',
    shortDesc: 'Same-day direct runs, parcel and document delivery — fast, insured and dispatched within hours.',
    longDesc: 'When a consignment has to arrive today, we collect it and drive it straight to its destination — documents, parcels, spare parts or single pallets. Direct and special runs are dispatched within a few hours, and recurring courier runs can be booked as fixed time slots. We confirm collection and handover to you, so you always know when your consignment has arrived.',
    iconName: 'Package',
    features: [
      'Same-day direct and special runs',
      'Parcels, documents and single pallets',
      'Recurring courier runs at fixed times',
      'Confirmation of collection and handover'
    ],
    specs: {
      transitTime: 'From 2 hrs',
      capacity: 'Up to 1,200 kg',
      globalCoverage: 'Regional & nationwide'
    }
  },
  {
    id: 'moving',
    title: 'Moving Help',
    shortDesc: 'Van with driver, helpers for carrying and furniture assembly — for private moves as well as office and business relocations.',
    longDesc: 'We support your move with vehicles up to 3.5 tonnes: a box van or large van with an experienced driver, plus helpers who carry, load and unload as needed. On request we dismantle furniture at the old address and reassemble it in the new home or office. Alongside private moves we handle office and business relocations — planned so that your operation is back up and running as quickly as possible.',
    iconName: 'Sofa',
    features: [
      'Van up to 3.5 t including driver',
      'Helpers for carrying, loading and unloading',
      'Dismantling and reassembly of furniture',
      'Private, office and business moves'
    ],
    specs: {
      transitTime: 'By appointment',
      capacity: 'Van up to 3.5 t',
      globalCoverage: 'Regional & nationwide'
    }
  }
];

export const fleetData: FleetVehicle[] = [
  {
    id: 'fleet-1',
    name: 'Zenomix Sprinter Maxi',
    type: 'heavy',
    typeName: 'Large Panel Van (3.5 t)',
    payload: '1,200 kg',
    volume: '15.5 m³',
    range: '900 km',
    propulsion: 'Diesel (Euro 6, low emission)',
    imageAlt: 'Zenomix large panel van in white with the blue brand wave',
    features: ['Gross vehicle weight 3.5 t', 'Bulkhead and lashing system', 'Telematics and digital route assignment']
  },
  {
    id: 'fleet-2',
    name: 'Zenomix Cargo Van',
    type: 'medium',
    typeName: 'Medium-Wheelbase Van',
    payload: '950 kg',
    volume: '9.3 m³',
    range: '750 km',
    propulsion: 'Diesel / Mild Hybrid',
    imageAlt: 'Zenomix medium delivery van with cyan and blue livery',
    features: ['Manoeuvrable in inner-city traffic', 'Shelving system for parcel rounds', 'Reversing camera and driver assistance']
  },
  {
    id: 'fleet-3',
    name: 'Zenomix Box Van',
    type: 'light',
    typeName: 'Box Van with Tail Lift',
    payload: '1,000 kg',
    volume: '20 m³',
    range: '700 km',
    propulsion: 'Diesel (Euro 6)',
    imageAlt: 'Zenomix box van with tail lift for moves and bulky goods',
    features: ['Tail lift for heavy furniture', 'Moving blankets, straps and dollies on board', 'Box body with lashing rails']
  },
  {
    id: 'fleet-4',
    name: 'Zenomix E-Kurier',
    type: 'electric',
    typeName: 'Electric Courier Vehicle',
    payload: '540 kg',
    volume: '3.3 m³',
    range: '320 km',
    propulsion: 'Fully electric',
    imageAlt: 'Zenomix compact electric courier vehicle in silver and blue',
    features: ['Emission-free in low-emission zones', 'Built for documents and small consignments', 'Charged overnight at our own depot']
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Andreas Keller',
    role: 'Head of Regional Dispatch',
    company: 'Nord-West Paketlogistik',
    quote: 'Zenomix has been running four of our delivery routes for over a year. Absences are covered through their own shift planning before we even have to ask.',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Miriam Sander',
    role: 'Office Manager',
    company: 'Rhein-Main Servicegruppe',
    quote: 'Zenomix moved our entire office over one weekend — dismantling, transport and reassembly included. By Monday morning every workstation was ready to use.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Thomas Brenner',
    role: 'Head of Logistics',
    company: 'Vance Elektronik GmbH',
    quote: 'Urgent spare parts reach our customers the same day. Direct runs are dispatched within hours, and we get a confirmation as soon as the handover is done.',
    rating: 5
  }
];
