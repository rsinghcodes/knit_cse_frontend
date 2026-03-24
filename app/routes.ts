import {
  type RouteConfig,
  index,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/faculty', 'routes/faculty.tsx'),
  route('/photo-gallery', 'routes/photo-gallery.tsx'),
  route('/photo-gallery/:eventId', 'routes/photo-gallery.$eventId.tsx'),
  route('/our-alumni', 'routes/our-alumni.tsx'),
  route('/courses', 'routes/courses.tsx'),
  route('/staff', 'routes/staff.tsx'),
  route('/students', 'routes/students.tsx'),
  route('/contact-us', 'routes/contact-us.tsx'),
  route('/pages/:slug', 'routes/pages.$slug.tsx'),
  route('/admin-login', 'routes/admin-login.tsx'),
] satisfies RouteConfig;
