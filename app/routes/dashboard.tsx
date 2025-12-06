import {
  GraduationCap,
  ImageIcon,
  Newspaper,
  Star,
  Users,
  UserPlus,
  UserCheck,
  Image,
  FileText,
} from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export default function Dashboard() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 15s ease infinite',
        }}
      />

      {/* Overlay for better readability */}
      <div className="absolute inset-0 -z-10 bg-white/30 backdrop-blur-sm" />

      <div className="space-y-8 relative p-8">
        {/* Page Title with animation */}
        <div className="animate-[slide-up_0.6s_ease-out]">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#153D6A] via-[#A80D1E] to-[#153D6A] bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <p className="text-gray-700 mt-2 font-medium">
            Welcome back, Admin 👋
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value="1,245"
            icon={<Users size={28} />}
            gradient="from-blue-500 to-cyan-500"
            delay="0.1s"
          />
          <StatCard
            title="Alumni"
            value="642"
            icon={<GraduationCap size={28} />}
            gradient="from-purple-500 to-pink-500"
            delay="0.2s"
          />
          <StatCard
            title="Gallery Photos"
            value="128"
            icon={<ImageIcon size={28} />}
            gradient="from-orange-500 to-red-500"
            delay="0.3s"
          />
          <StatCard
            title="Active Notices"
            value="6"
            icon={<Newspaper size={28} />}
            gradient="from-green-500 to-teal-500"
            delay="0.4s"
          />
        </div>

        {/* Highlights Section */}
        <div
          className="animate-[slide-up_0.6s_ease-out]"
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          <Card className="border-none shadow-2xl glass-card hover-lift overflow-hidden relative">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#A80D1E] via-purple-500 to-[#153D6A] opacity-20 blur-xl" />
            <div className="relative bg-white/80 backdrop-blur-xl rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#153D6A]">
                  <Star
                    size={20}
                    className="text-[#A80D1E] animate-[glow-pulse_2s_ease-in-out_infinite]"
                  />
                  Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="marquee-container">
                  <div className="animate-marquee">
                    <span className="mx-6 text-[#153D6A] font-semibold text-lg">
                      🔹 KNIT Annual Tech Fest starts next week!
                    </span>
                    <span className="mx-6 text-[#153D6A] font-semibold text-lg">
                      🔹 Alumni Meet registration is now open!
                    </span>
                    <span className="mx-6 text-[#153D6A] font-semibold text-lg">
                      🔹 New Internship Opportunities announced!
                    </span>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Recent Notices + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Notices */}
          <div
            className="col-span-2 animate-[slide-up_0.6s_ease-out]"
            style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
          >
            <Card className="border-none shadow-2xl glass-card hover-lift h-full">
              <div className="relative bg-white/80 backdrop-blur-xl rounded-xl h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-[#153D6A] flex items-center gap-2">
                    <Newspaper size={20} className="text-[#A80D1E]" />
                    Recent Notices
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="divide-y divide-gray-200">
                    {[
                      { title: 'Exam Schedule Released', date: 'Oct 20, 2025' },
                      {
                        title: 'Library Closed on Sunday',
                        date: 'Oct 18, 2025',
                      },
                      {
                        title: 'New Placement Policy 2025',
                        date: 'Oct 16, 2025',
                      },
                    ].map((notice, i) => (
                      <li
                        key={i}
                        className="py-4 flex justify-between items-center group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 px-2 rounded-lg transition-all duration-300 cursor-pointer"
                      >
                        <span className="text-gray-800 font-medium group-hover:text-[#153D6A] transition-colors">
                          {notice.title}
                        </span>
                        <span className="text-sm text-gray-500 group-hover:text-[#A80D1E] transition-colors font-medium">
                          {notice.date}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div
            className="animate-[slide-up_0.6s_ease-out]"
            style={{ animationDelay: '0.7s', animationFillMode: 'both' }}
          >
            <Card className="border-none shadow-2xl glass-card hover-lift h-full">
              <div className="relative bg-white/80 backdrop-blur-xl rounded-xl h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-[#153D6A]">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 flex-1">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    <UserPlus size={18} />
                    Add Student
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    <UserCheck size={18} />
                    Add Alumni
                  </Button>
                  <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    <Image size={18} />
                    Upload Photo
                  </Button>
                  <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    <FileText size={18} />
                    Create Notice
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  gradient,
  delay,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
  delay: string;
}) {
  return (
    <div
      className="animate-[slide-up_0.6s_ease-out]"
      style={{ animationDelay: delay, animationFillMode: 'both' }}
    >
      <Card className="border-none shadow-2xl glass-card hover-lift group cursor-pointer overflow-hidden relative">
        {/* Glow effect on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl`}
        />

        <div className="relative bg-white/80 backdrop-blur-xl rounded-xl">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">{title}</p>
              <h3
                className={`text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
              >
                {value}
              </h3>
            </div>
            <div
              className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <div className="text-white">{icon}</div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
