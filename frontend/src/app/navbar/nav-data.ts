export const navbarData = [
  {
    routeLink: 'doctor',
    label: 'Prescriptions',
    adminRequired: true,
  },
  {
    routeLink: 'calendar',
    label: 'Calendar',
    patientOnly:true
  },
  {
    routeLink: 'patient-profile',
    label: 'My profile',
    patientOnly:true
  },
  {
    routeLink: 'patients-info',
    label: 'Patients information',
    adminRequired: true
  },
  {
    routeLink: 'settings',
    label: 'Settings',
    common:true
  },
];
