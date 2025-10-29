import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/admin', 'routes/adminLogin.tsx'),
  layout('./layout/AdminLayout.tsx', [
    route('admin/', 'routes/dashboard.tsx'),
    route('admin/students', 'routes/students.tsx'),
    route('admin/gallery', 'routes/galleryUpload.tsx'),
  ]),
] satisfies RouteConfig;
