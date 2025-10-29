import { GraduationCap, ImageIcon, Newspaper, Star, Users } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h2 className="text-3xl font-semibold text-[#153D6A]">
          Dashboard Overview
        </h2>
        <p className="text-gray-500 mt-1">Welcome back, Admin 👋</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value="1,245"
          icon={<Users className="text-[#A80D1E]" size={28} />}
        />
        <StatCard
          title="Alumni"
          value="642"
          icon={<GraduationCap className="text-[#A80D1E]" size={28} />}
        />
        <StatCard
          title="Gallery Photos"
          value="128"
          icon={<ImageIcon className="text-[#A80D1E]" size={28} />}
        />
        <StatCard
          title="Active Notices"
          value="6"
          icon={<Newspaper className="text-[#A80D1E]" size={28} />}
        />
      </div>

      {/* Highlights Section */}
      {/* Highlights Section */}
      <div>
        <Card className="border border-gray-200 shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#153D6A]">
              <Star size={20} className="text-[#A80D1E]" /> Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="marquee-container">
              <div className="animate-marquee">
                <span className="mx-6 text-[#153D6A] font-medium">
                  🔹 KNIT Annual Tech Fest starts next week!
                </span>
                <span className="mx-6 text-[#153D6A] font-medium">
                  🔹 Alumni Meet registration is now open!
                </span>
                <span className="mx-6 text-[#153D6A] font-medium">
                  🔹 New Internship Opportunities announced!
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notices + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Notices */}
        <Card className="col-span-2 border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#153D6A]">Recent Notices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {[
                { title: 'Exam Schedule Released', date: 'Oct 20, 2025' },
                { title: 'Library Closed on Sunday', date: 'Oct 18, 2025' },
                { title: 'New Placement Policy 2025', date: 'Oct 16, 2025' },
              ].map((notice, i) => (
                <li key={i} className="py-2 flex justify-between">
                  <span className="text-gray-700">{notice.title}</span>
                  <span className="text-sm text-gray-500">{notice.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-primary">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button className="bg-primary hover:bg-primary">Add Student</Button>
            <Button className="bg-primary hover:bg-primary">Add Alumni</Button>
            <Button className="bg-[#A80D1E] hover:bg-[#820a18]">
              Upload Photo
            </Button>
            <Button className="bg-[#A80D1E] hover:bg-[#820a18]">
              Create Notice
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold text-primary">{value}</h3>
        </div>
        {icon}
      </CardContent>
    </Card>
  );
}
