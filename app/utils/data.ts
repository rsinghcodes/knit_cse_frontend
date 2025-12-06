export const highlights = [
  {
    name: 'Dr. Arvind Kumar Tiwari',
    title: 'HoD',
    subtitle: 'Department of Computer Science & Engineering',
    image: '/assets/images/arvind.jpg',
  },
  {
    name: 'Dr. Samir Srivastava',
    title: 'Professor & DSW',
    subtitle: 'Department of Computer Science & Engineering',
    image: '/assets/images/samir.jpg',
  },
  {
    name: 'Dr. R.K. Singh',
    title: 'Professor',
    subtitle: 'Department of Computer Science & Engineering',
    image: '/assets/images/rksingh.jpg',
  },
  {
    name: 'Prof. Alka Singh',
    title: 'Professor',
    subtitle: 'Department of Computer Science & Engineering',
    image: '/assets/images/alkasingh.jpg',
  },
  {
    name: 'Dr. D.L. Gupta',
    title: 'TPO & Professor',
    subtitle: 'Department of Computer Science & Engineering',
    image: '/assets/images/dlgupta.jpg',
  },
  {
    name: 'Dr. B.P Chaurasia',
    title: 'Professor',
    subtitle: 'Department of Computer Science & Engineering',
    image: '/assets/images/bpchaurasia.jpg',
  },
];

export const circulars = [
  {
    title:
      'Notice List of Eligible Students for tablet distribution scheduled on 31-October-2025 at 10 AM',
    date: '18/10/2025',
    size: '1 MB',
    lang: 'English',
  },
  {
    title: 'Important Notice For M.Tech. (P.T.) First Year 2025-26',
    date: '30/09/2025',
    size: '269 KB',
    lang: 'English',
  },
  {
    title:
      'Regarding the enrollment form submission for newly admitted students in B.Tech, MCA, M.Tech first year, and B.Tech second year (lateral entry)',
    date: '29/09/2025',
    size: '390 KB',
    lang: 'English',
  },
];

export const quickLinks = [
  {
    src: '/assets/icons/students.png',
    title: 'Students',
    href: '/',
  },
  {
    src: '/assets/icons/incubations.png',
    title: 'Courses Offered',
    href: '/',
  },
  {
    src: '/assets/icons/alumni.png',
    title: 'Alumni',
    href: '/',
  },
  {
    src: '/assets/icons/gallary.png',
    title: 'Photo Gallery',
    href: '/photo-gallery',
  },
  {
    src: '/assets/icons/results.png',
    title: 'Faculty',
    href: '/faculty',
  },
];

export interface Faculty {
  name: string;
  designation: string;
  photo: string;
  resumeLink?: string;
  profileLink?: string;
}

export const cseFaculty: Faculty[] = [
  {
    name: 'Prof. B.P. Chaurasia',
    designation: 'Associate Professor',
    photo: '/assets/images/bpchaurasia.jpg',
    resumeLink: '#',
    profileLink: '#',
  },
  {
    name: 'Prof. Neelendra Badal',
    designation: 'Professor',
    photo: '/assets/images/placeholder-faculty.jpg',
    resumeLink: '#',
    profileLink: '#',
  },
  {
    name: 'Prof. (Dr.) Samir Srivastava',
    designation: 'Professor',
    photo: '/assets/images/samir.jpg',
    resumeLink: '#',
    profileLink: '#',
  },
  {
    name: 'Prof. (Dr.) Awadhesh Kumar',
    designation: 'Professor',
    photo: '/assets/images/placeholder-faculty.jpg',
    resumeLink: '#',
    profileLink: '#',
  },
  {
    name: 'Prof. (Dr.) Suman Pandey',
    designation: 'Professor',
    photo: '/assets/images/placeholder-faculty.jpg',
    resumeLink: '#',
    profileLink: '#',
  },
  {
    name: 'Dr. Arvind Kumar Tiwari',
    designation: 'Professor & HOD',
    photo: '/assets/images/arvind.jpg',
    resumeLink: '#',
    profileLink: '#',
  },
  {
    name: 'Prof. (Dr.) Aruni Singh',
    designation: 'Professor',
    photo: '/assets/images/placeholder-faculty.jpg',
    resumeLink: '#',
    profileLink: '#',
  },
  {
    name: 'Dr. Rajesh Kumar',
    designation: 'Assistant Professor',
    photo: '/assets/images/placeholder-faculty.jpg',
    resumeLink: '#',
    profileLink: '#',
  },
];

export const mcaFaculty: Faculty[] = [
  {
    name: 'Prof. A.K. Malviya',
    designation: 'Professor',
    photo: '/assets/images/placeholder-faculty.jpg',
    resumeLink: '#',
    profileLink: '#',
  },
  {
    name: 'Prof. (Dr.) R.K. Singh',
    designation: 'Professor',
    photo: '/assets/images/rksingh.jpg',
    resumeLink: '#',
    profileLink: '#',
  },
  {
    name: 'Prof. (Dr.) D.L. Gupta',
    designation: 'Professor',
    photo: '/assets/images/dlgupta.jpg',
    resumeLink: '#',
    profileLink: '#',
  },
  {
    name: 'Prof. Alka Singh',
    designation: 'Associate Professor',
    photo: '/assets/images/alkasingh.jpg',
    resumeLink: '#',
    profileLink: '#',
  },
  {
    name: 'Dr. Abhay Kumar Agarwal',
    designation: 'Associate Professor',
    photo: '/assets/images/placeholder-faculty.jpg',
    resumeLink: '#',
    profileLink: '#',
  },
];

export interface GalleryPhoto {
  id: string;
  imageUrl: string;
  caption?: string;
}

export interface GalleryEvent {
  id: string;
  name: string;
  date: string;
  description: string;
  thumbnail: string;
  photos: GalleryPhoto[];
}

export const galleryEvents: GalleryEvent[] = [
  {
    id: 'techfest-2024',
    name: 'TechFest 2024',
    date: 'November 15-17, 2024',
    description: 'Annual technical festival featuring coding competitions, hackathons, and tech talks.',
    thumbnail: '/assets/gallery/techfest/thumb.jpg',
    photos: [
      {
        id: '1',
        imageUrl: '/assets/gallery/techfest/img1.jpg',
        caption: 'Opening ceremony with keynote speaker',
      },
      {
        id: '2',
        imageUrl: '/assets/gallery/techfest/img2.jpg',
        caption: 'Hackathon participants working on projects',
      },
      {
        id: '3',
        imageUrl: '/assets/gallery/techfest/img3.jpg',
        caption: 'Coding competition finals',
      },
      {
        id: '4',
        imageUrl: '/assets/gallery/techfest/img4.jpg',
        caption: 'Technical exhibition stalls',
      },
      {
        id: '5',
        imageUrl: '/assets/gallery/techfest/img5.jpg',
        caption: 'Prize distribution ceremony',
      },
      {
        id: '6',
        imageUrl: '/assets/gallery/techfest/img6.jpg',
        caption: 'Cultural performances',
      },
    ],
  },
  {
    id: 'convocation-2024',
    name: 'Convocation Ceremony 2024',
    date: 'September 20, 2024',
    description: 'Graduation ceremony for the batch of 2024 with distinguished guests and awards.',
    thumbnail: '/assets/gallery/convocation/thumb.jpg',
    photos: [
      {
        id: '1',
        imageUrl: '/assets/gallery/convocation/img1.jpg',
        caption: 'Students in graduation gowns',
      },
      {
        id: '2',
        imageUrl: '/assets/gallery/convocation/img2.jpg',
        caption: 'Chief guest addressing the audience',
      },
      {
        id: '3',
        imageUrl: '/assets/gallery/convocation/img3.jpg',
        caption: 'Award winners with medals',
      },
      {
        id: '4',
        imageUrl: '/assets/gallery/convocation/img4.jpg',
        caption: 'Group photo with faculty',
      },
    ],
  },
  {
    id: 'sports-week-2024',
    name: 'Sports Week 2024',
    date: 'August 5-10, 2024',
    description: 'Inter-departmental sports competitions including cricket, football, and athletics.',
    thumbnail: '/assets/gallery/sports/thumb.jpg',
    photos: [
      {
        id: '1',
        imageUrl: '/assets/gallery/sports/img1.jpg',
        caption: 'Cricket match between CSE and ECE',
      },
      {
        id: '2',
        imageUrl: '/assets/gallery/sports/img2.jpg',
        caption: 'Football tournament finals',
      },
      {
        id: '3',
        imageUrl: '/assets/gallery/sports/img3.jpg',
        caption: 'Athletics track events',
      },
      {
        id: '4',
        imageUrl: '/assets/gallery/sports/img4.jpg',
        caption: 'Badminton championship',
      },
      {
        id: '5',
        imageUrl: '/assets/gallery/sports/img5.jpg',
        caption: 'Winners celebration',
      },
    ],
  },
  {
    id: 'workshop-ai-ml',
    name: 'AI & Machine Learning Workshop',
    date: 'July 12-14, 2024',
    description: 'Three-day intensive workshop on artificial intelligence and machine learning.',
    thumbnail: '/assets/gallery/workshop/thumb.jpg',
    photos: [
      {
        id: '1',
        imageUrl: '/assets/gallery/workshop/img1.jpg',
        caption: 'Workshop inauguration',
      },
      {
        id: '2',
        imageUrl: '/assets/gallery/workshop/img2.jpg',
        caption: 'Students learning ML algorithms',
      },
      {
        id: '3',
        imageUrl: '/assets/gallery/workshop/img3.jpg',
        caption: 'Hands-on coding session',
      },
      {
        id: '4',
        imageUrl: '/assets/gallery/workshop/img4.jpg',
        caption: 'Project presentations',
      },
    ],
  },
  {
    id: 'fresher-welcome-2024',
    name: 'Fresher Welcome 2024',
    date: 'June 25, 2024',
    description: 'Welcome ceremony for newly admitted students with cultural programs and orientation.',
    thumbnail: '/assets/gallery/fresher/thumb.jpg',
    photos: [
      {
        id: '1',
        imageUrl: '/assets/gallery/fresher/img1.jpg',
        caption: 'Welcome banner and decorations',
      },
      {
        id: '2',
        imageUrl: '/assets/gallery/fresher/img2.jpg',
        caption: 'Department head addressing freshers',
      },
      {
        id: '3',
        imageUrl: '/assets/gallery/fresher/img3.jpg',
        caption: 'Cultural performance by seniors',
      },
      {
        id: '4',
        imageUrl: '/assets/gallery/fresher/img4.jpg',
        caption: 'Freshers group photo',
      },
      {
        id: '5',
        imageUrl: '/assets/gallery/fresher/img5.jpg',
        caption: 'Fun games and activities',
      },
    ],
  },
  {
    id: 'industry-visit-2024',
    name: 'Industry Visit - Tech Park',
    date: 'May 18, 2024',
    description: 'Educational visit to local tech companies and IT parks for practical exposure.',
    thumbnail: '/assets/gallery/industry/thumb.jpg',
    photos: [
      {
        id: '1',
        imageUrl: '/assets/gallery/industry/img1.jpg',
        caption: 'Students at company entrance',
      },
      {
        id: '2',
        imageUrl: '/assets/gallery/industry/img2.jpg',
        caption: 'Office tour and presentation',
      },
      {
        id: '3',
        imageUrl: '/assets/gallery/industry/img3.jpg',
        caption: 'Interaction with software engineers',
      },
      {
        id: '4',
        imageUrl: '/assets/gallery/industry/img4.jpg',
        caption: 'Group photo at tech park',
      },
    ],
  },
];
