// Seed CMS Data - Create default pages for Faculty, Courses, and Alumni
import type { Page, FacultyMember, Course, AlumniProfile } from '~/types/cms';
import { cseFaculty, mcaFaculty } from './data';

// Helper to convert existing faculty data to CMS format
function convertFacultyToMembers(facultyList: typeof cseFaculty): FacultyMember[] {
    return facultyList.map((faculty, index) => ({
        id: `faculty-${Date.now()}-${index}`,
        name: faculty.name,
        designation: faculty.designation,
        photo: faculty.photo,
        email: '',  // Not available in current Faculty data
        phone: '',  // Not available in current Faculty data
        qualification: faculty.designation,  // Use designation as qualification
        specialization: '', // Not available in current Faculty data
        experience: '', // Not available in current Faculty data
        order: index,
    }));
}

export function createFacultyPage(): Page {
    return {
        id: 'faculty-page',
        slug: 'faculty',
        title: 'Faculty',
        status: 'published',
        type: 'static',
        template: 'default',
        seo: {
            metaTitle: 'Faculty | KNIT CSE Department',
            metaDescription: 'Meet our distinguished faculty members from the Computer Science & Engineering and MCA departments at KNIT Sultanpur.',
            keywords: ['KNIT Faculty', 'CSE Faculty', 'MCA Faculty', 'Computer Science'],
        },
        blocks: [
            // Hero Block
            {
                id: 'faculty-hero',
                type: 'hero',
                content: {
                    heading: 'Faculty',
                    subheading: 'Department of Computer Science & Engineering',
                    description: 'Meet our distinguished faculty members who are experts in their fields',
                    backgroundColor: '#153D6A',
                    alignment: 'center',
                },
                settings: {
                    visible: true,
                },
                order: 0,
            },
            // CSE Faculty Grid
            {
                id: 'cse-faculty-grid',
                type: 'faculty-grid',
                content: {
                    title: 'Computer Science & Engineering',
                    department: 'CSE',
                    members: convertFacultyToMembers(cseFaculty),
                    columns: 4,
                    showEmail: true,
                    showPhone: false,
                },
                settings: {
                    visible: true,
                },
                order: 1,
            },
            // MCA Faculty Grid
            {
                id: 'mca-faculty-grid',
                type: 'faculty-grid',
                content: {
                    title: 'Master of Computer Applications (MCA)',
                    department: 'MCA',
                    members: convertFacultyToMembers(mcaFaculty),
                    columns: 4,
                    showEmail: true,
                    showPhone: false,
                },
                settings: {
                    visible: true,
                },
                order: 2,
            },
        ],
        author: 'System',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        order: 2,
    };
}

export function createCoursesPage(): Page {
    const sampleCourses: Course[] = [
        { id: '1', code: 'CS101', name: 'Introduction to Computer Science', credits: 4, semester: '1', type: 'core', order: 0 },
        { id: '2', code: 'CS102', name: 'Data Structures', credits: 4, semester: '2', type: 'core', order: 1 },
        { id: '3', code: 'CS201', name: 'Algorithms', credits: 4, semester: '3', type: 'core', order: 2 },
        { id: '4', code: 'CS202', name: 'Database Systems', credits: 3, semester: '3', type: 'core', order: 3 },
        { id: '5', code: 'CS301', name: 'Operating Systems', credits: 4, semester: '5', type: 'core', order: 4 },
        { id: '6', code: 'CS302', name: 'Computer Networks', credits: 3, semester: '5', type: 'core', order: 5 },
        { id: '7', code: 'CS401', name: 'Machine Learning', credits: 3, semester: '7', type: 'elective', order: 6 },
        { id: '8', code: 'CS402', name: 'Cloud Computing', credits: 3, semester: '7', type: 'elective', order: 7 },
    ];

    return {
        id: 'courses-page',
        slug: 'courses',
        title: 'Courses',
        status: 'published',
        type: 'static',
        template: 'default',
        seo: {
            metaTitle: 'Courses | KNIT CSE Department',
            metaDescription: 'Explore our comprehensive Computer Science and Engineering curriculum at KNIT Sultanpur.',
            keywords: ['CSE Courses', 'CS Curriculum', 'KNIT Courses'],
        },
        blocks: [
            {
                id: 'courses-hero',
                type: 'hero',
                content: {
                    heading: 'Our Courses',
                    subheading: 'Comprehensive Curriculum',
                    description: 'Explore our wide range of courses designed to build strong fundamentals and advanced skills',
                    backgroundColor: '#153D6A',
                    alignment: 'center',
                },
                settings: {
                    visible: true,
                },
                order: 0,
            },
            {
                id: 'courses-list',
                type: 'course-list',
                content: {
                    title: 'B.Tech Computer Science & Engineering',
                    courses: sampleCourses,
                    showCredits: true,
                    showSemester: true,
                    collapsible: false,
                },
                settings: {
                    visible: true,
                },
                order: 1,
            },
        ],
        author: 'System',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        order: 3,
    };
}

export function createAlumniPage(): Page {
    const sampleAlumni: AlumniProfile[] = [
        {
            id: '1',
            name: 'Rajat Singh',
            photo: '',
            batch: '2020',
            degree: 'B.Tech CSE',
            company: 'Google',
            position: 'Software Engineer',
            location: 'Bangalore, India',
            testimonial: 'KNIT gave me the foundation I needed to succeed in the tech industry.',
            order: 0,
        },
        {
            id: '2',
            name: 'Priya Sharma',
            photo: '',
            batch: '2019',
            degree: 'B.Tech CSE',
            company: 'Microsoft',
            position: 'Senior Developer',
            location: 'Hyderabad, India',
            testimonial: 'The faculty and curriculum at KNIT prepared me well for industry challenges.',
            order: 1,
        },
    ];

    return {
        id: 'alumni-page',
        slug: 'our-alumni',
        title: 'Our Alumni',
        status: 'published',
        type: 'static',
        template: 'default',
        seo: {
            metaTitle: 'Our Alumni | KNIT CSE Department',
            metaDescription: 'Meet our successful alumni working at top companies worldwide.',
            keywords: ['KNIT Alumni', 'CSE Alumni', 'Placements'],
        },
        blocks: [
            {
                id: 'alumni-hero',
                type: 'hero',
                content: {
                    heading: 'Our Alumni',
                    subheading: 'Success Stories',
                    description: 'Proud alumni making their mark in the tech industry',
                    backgroundColor: '#153D6A',
                    alignment: 'center',
                },
                settings: {
                    visible: true,
                },
                order: 0,
            },
            {
                id: 'alumni-grid',
                type: 'alumni-grid',
                content: {
                    title: 'Featured Alumni',
                    profiles: sampleAlumni,
                    columns: 3,
                    showCompany: true,
                    showTestimonial: true,
                },
                settings: {
                    visible: true,
                },
                order: 1,
            },
        ],
        author: 'System',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        order: 4,
    };
}

// Function to seed all default pages
export function seedCMSPages() {
    const pages = [
        createFacultyPage(),
        createCoursesPage(),
        createAlumniPage(),
    ];

    // Get existing pages
    const existingPagesRaw = localStorage.getItem('cms_pages');
    const existingPages = existingPagesRaw ? JSON.parse(existingPagesRaw) : [];

    // Only add pages that don't exist
    const existingSlugs = new Set(existingPages.map((p: Page) => p.slug));
    const newPages = pages.filter(page => !existingSlugs.has(page.slug));

    if (newPages.length > 0) {
        const allPages = [...existingPages, ...newPages];
        localStorage.setItem('cms_pages', JSON.stringify(allPages));
        console.log(`Seeded ${newPages.length} CMS pages:`, newPages.map(p => p.slug));
    }

    return newPages.length;
}
