import { ServiceItem, FleetVehicle, Testimonial, TrackingData } from './types';

export const servicesData: ServiceItem[] = [
  {
    id: 'courier',
    title: 'Courier & Parcel Services',
    shortDesc: 'Parcel delivery, direct runs and fixed daily routes — including work as a dependable subcontractor for major B2B logistics networks.',
    longDesc: 'We deliver parcels, documents and palletised goods within the light-commercial segment — both as an independent courier service and as a subcontractor for established B2B logistics networks. Fixed delivery routes are staffed reliably through our own shift planning, including cover for sickness and holidays. For our clients that means dependable route coverage without building up their own driver pool.',
    iconName: 'Truck',
    features: [
      'Fixed delivery routes as a logistics subcontractor',
      'Same-day direct and special runs',
      'Predictable driver staffing including cover',
      'Digital documentation of shifts and working hours'
    ],
    specs: {
      transitTime: 'From 2 hrs',
      capacity: 'Up to 1,200 kg',
      globalCoverage: 'Regional & nationwide'
    }
  },
  {
    id: 'passenger',
    title: 'Passenger Transport & Mobility',
    shortDesc: 'Staff shuttles, group transfers and recurring driving services — general mobility solutions with vehicles under 3.5 tonnes.',
    longDesc: 'Whether staff shuttles around shift changes, transfers or recurring driving services for institutions and companies: we organise passenger transport with a settled driver team and binding time windows. Scheduling runs through our own software, so early-morning, late-evening and weekend departures stay reliably staffed.',
    iconName: 'Users',
    features: [
      'Staff shuttles aligned with shift changes',
      'Transfers and group journeys',
      'Recurring driving services under framework agreements',
      'Named contacts in dispatch'
    ],
    specs: {
      transitTime: 'To timetable',
      capacity: 'Up to 8 passengers',
      globalCoverage: 'Regional'
    }
  },
  {
    id: 'patient',
    title: 'Non-Emergency Patient Transport',
    shortDesc: 'Non-qualified patient transport — seated or by wheelchair, without medical care during the journey.',
    longDesc: 'We carry patients who do not require medical care while travelling — seated or in a wheelchair, in suitably equipped vehicles and with trained drivers. Typical journeys are trips to dialysis, radiotherapy, rehabilitation or outpatient appointments. Emergency response and qualified medical transport with clinical care on board are expressly outside our scope.',
    iconName: 'HeartPulse',
    features: [
      'Seated transport or by wheelchair',
      'Wheelchair-accessible vehicles with ramp',
      'Trained drivers and fixed appointment slots',
      'No medical care provided during the journey'
    ],
    specs: {
      transitTime: 'Appointment-bound',
      capacity: 'Wheelchair & seated',
      globalCoverage: 'Regional'
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
    name: 'Zenomix Care Mobil',
    type: 'light',
    typeName: 'Passenger & Patient Transport',
    payload: '750 kg',
    volume: 'Up to 8 seats',
    range: '800 km',
    propulsion: 'Diesel (Euro 6)',
    imageAlt: 'Zenomix wheelchair-accessible passenger van with boarding ramp',
    features: ['Wheelchair ramp and certified floor anchorage', 'Carries passengers seated or in a wheelchair', 'Low-step, barrier-reduced entry']
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
    role: 'Fleet Manager',
    company: 'Rhein-Main Servicegruppe',
    quote: 'Our staff shuttles needed dependable time windows around shift changes. Departures are punctual, dispatch is reachable, and the billing is easy to follow.',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Dr. Thomas Brenner',
    role: 'Administrative Director',
    company: 'MVZ Gesundheitszentrum Süd',
    quote: 'Journeys to dialysis and rehab run reliably, wheelchair included. The drivers are trained and treat our patients with genuine respect.',
    rating: 5
  }
];

export const mockTrackingDatabase: Record<string, TrackingData> = {
  'ZN-772-B1': {
    trackingId: 'ZN-772-B1',
    origin: 'Cologne-Ossendorf Depot',
    destination: 'Delivery Area Cologne North',
    sender: 'Nord-West Paketlogistik',
    receiver: 'Sprinter Maxi · Driver M. Keller',
    serviceType: 'Delivery Round (Subcontracted)',
    estimatedDelivery: 'Today, 17:30',
    currentStatus: 'In Transit',
    progressPercentage: 65,
    history: [
      { step: 1, location: 'Cologne-Ossendorf Depot', time: 'Today, 06:00', status: 'Shift Started', details: 'Driver checked in, vehicle handover and walkaround completed.' },
      { step: 2, location: 'Cologne-Ossendorf Depot', time: 'Today, 07:15', status: 'Loading Confirmed', details: 'Round loaded and confirmed against the client manifest.' },
      { step: 3, location: 'Cologne North, Block 1', time: 'Today, 11:40', status: 'Block 1 Completed', details: 'First delivery block finished, remaining stops rescheduled automatically.' },
      { step: 4, location: 'Cologne North, Block 2', time: 'Pending', status: 'Block 2 Running', details: 'Second delivery block in progress, shift ends at 17:30.' },
    ]
  },
  'ZN-982-A3': {
    trackingId: 'ZN-982-A3',
    origin: 'Düsseldorf Depot',
    destination: 'Client Site, Neuss',
    sender: 'Vance Elektronik GmbH',
    receiver: 'Cargo Van · Driver S. Ari',
    serviceType: 'Direct Run (Same-Day Courier)',
    estimatedDelivery: 'Today, 15:40',
    currentStatus: 'Out for Delivery',
    progressPercentage: 90,
    history: [
      { step: 1, location: 'Dispatch, Düsseldorf', time: 'Today, 12:05', status: 'Order Accepted', details: 'Direct run accepted and assigned to an available shift.' },
      { step: 2, location: 'Düsseldorf Depot', time: 'Today, 12:50', status: 'Collected', details: 'Consignment collected and secured, driver on route.' },
      { step: 3, location: 'B7 Towards Neuss', time: 'Today, 14:20', status: 'En Route', details: 'Journey running to plan, no deviation reported.' },
      { step: 4, location: 'Client Site, Neuss', time: 'Today, 15:20', status: 'Out for Delivery', details: 'Arrived in the delivery area, handover being prepared.' },
    ]
  },
  'ZN-104-C8': {
    trackingId: 'ZN-104-C8',
    origin: 'Duisburg Operating Yard',
    destination: 'Plant II, Shift Change 14:00',
    sender: 'Rhein-Main Servicegruppe',
    receiver: 'Care Mobil · Driver T. Öz',
    serviceType: 'Passenger Transport (Staff Shuttle)',
    estimatedDelivery: 'Today, 14:00',
    currentStatus: 'In Transit',
    progressPercentage: 40,
    history: [
      { step: 1, location: 'Duisburg Operating Yard', time: 'Today, 12:30', status: 'Shift Started', details: 'Vehicle checked, seating configuration confirmed for 8 passengers.' },
      { step: 2, location: 'Pickup Point A', time: 'Today, 13:05', status: 'Passengers Boarded', details: 'First pickup point served, headcount matches the booking.' },
      { step: 3, location: 'Pickup Point B', time: 'Pending', status: 'Approaching', details: 'Second pickup point scheduled, arrival at the plant planned for 14:00.' },
    ]
  },
  'ZN-334-D9': {
    trackingId: 'ZN-334-D9',
    origin: 'Home Address, Essen-Rüttenscheid',
    destination: 'Dialysis Centre Essen-Süd',
    sender: 'MVZ Gesundheitszentrum Süd',
    receiver: 'Care Mobil · Driver L. Braun',
    serviceType: 'Non-Emergency Patient Transport (Wheelchair)',
    estimatedDelivery: 'Today, 09:15',
    currentStatus: 'Delivered',
    progressPercentage: 100,
    history: [
      { step: 1, location: 'Operating Yard, Essen', time: 'Today, 07:30', status: 'Shift Started', details: 'Ramp and wheelchair anchorage checked before departure.' },
      { step: 2, location: 'Home Address, Essen-Rüttenscheid', time: 'Today, 08:20', status: 'Patient Collected', details: 'Boarding assisted, wheelchair secured to the anchorage points.' },
      { step: 3, location: 'En Route, Essen-Süd', time: 'Today, 08:55', status: 'En Route', details: 'Journey without medical care on board, as agreed.' },
      { step: 4, location: 'Dialysis Centre Essen-Süd', time: 'Today, 09:10', status: 'Journey Completed', details: 'Patient handed over at reception, return journey booked for 13:00.' },
    ]
  }
};
