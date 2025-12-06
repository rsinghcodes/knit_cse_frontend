import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/login', 'routes/adminLogin.tsx'),
  layout('./layout/AdminLayout.tsx', [
    route('admin/', 'routes/dashboard.tsx'),
    route('admin/students', 'routes/students.tsx'),
    route('admin/gallery', 'routes/gallery.tsx'),
    route('admin/alumni', 'routes/alumni.tsx'),
    route('admin/highlights', 'routes/highlights.tsx'),
    route('admin/notices', 'routes/notice.tsx'),
    route('admin/gallery-upload', 'routes/galleryUpload.tsx'),
  ]),
  route('/faculty', 'routes/faculty.tsx'),
  route('/photo-gallery', 'routes/photo-gallery.tsx'),
  route('/photo-gallery/:eventId', 'routes/photo-gallery.$eventId.tsx'),
] satisfies RouteConfig;
