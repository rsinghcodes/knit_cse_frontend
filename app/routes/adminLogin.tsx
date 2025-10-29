import { useFormik } from 'formik';
import { Lock, User } from 'lucide-react';
import React from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required').min(3, 'Too short'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Must be at least 6 characters'),
});

const AdminLogin: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Login values:', values);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[90%] max-w-md rounded-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <img
              src="/assets/logo.jpg"
              alt="KNIT Logo"
              width={80}
              height={80}
            />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <p className="text-sm text-gray-500">
            Please enter your credentials to continue
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="username">Username</Label>
              <div className="flex items-center border rounded-lg px-1 mt-1 focus-within:ring-2">
                <User className="text-gray-400 w-5 h-5 mx-1" />
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className="border-0 focus-visible:ring-0 text-sm"
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="text-sm text-[#A80D1E] mt-1">
                  {formik.errors.username}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="flex items-center border rounded-lg px-1 mt-1 focus-within:ring-2">
                <Lock className="text-gray-400 w-5 h-5 mx-1" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="border-0 focus-visible:ring-0 text-sm"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-[#A80D1E] mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full text-white font-semibold rounded-lg cursor-pointer"
            >
              Login
            </Button>
          </form>

          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <a href="#">Forgot password?</a>
            <a href="/">Back to Home</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
