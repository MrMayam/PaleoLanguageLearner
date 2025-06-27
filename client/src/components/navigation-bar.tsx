import { Button } from "@/components/ui/button";
import { Home, TrendingUp, Gamepad2, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";

export function NavigationBar() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home", color: "teal" },
    { path: "/progress", icon: TrendingUp, label: "Progress", color: "orange" },
    { path: "/sounds", icon: Gamepad2, label: "Games", color: "purple" },
    { path: "/alphabet", icon: Settings, label: "Learn", color: "green" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-3xl px-6 py-4">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const IconComponent = item.icon;
          
          return (
            <Link key={item.path} href={item.path}>
              <Button
                variant="ghost"
                className="flex flex-col items-center space-y-1 p-2 hover:bg-transparent"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isActive 
                    ? `bg-${item.color}-400 text-white shadow-lg` 
                    : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                }`}>
                  <IconComponent size={20} />
                </div>
                <span className={`text-xs font-semibold ${
                  isActive ? `text-${item.color}-400` : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
