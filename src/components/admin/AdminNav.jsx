import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { HiMenu, HiX } from "react-icons/hi"; // ใช้ไอคอน hamburger และ close

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };


  const menuItems = [
    { name: "หน้าแรก", path : '/admin', onClick: () => navigate("/admin") },
    { name: "จัดการสมาคม", path: '/admin/member' ,  onClick: () => navigate("/admin/member") },
    { name: "ออกจากระบบ", onClick: handleLogout },
  ];

  return (
    <nav className="w-full bg-green-900 border-b border-gray-300 container-fluid mx-auto">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/admin")}
          className="text-2xl font-bold  text-white cursor-pointer hover:text-gray-300 transition-colors"
        >
          KU AS
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center justify-between">
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={item.onClick}
              className={`text-white cursor-pointer hover:text-gray-300 transition-colors 
                ${location.pathname === item.path ?  'underline underline-offset-8' : ''}
                ${item.name=='เข้าสู่ระบบ' || item.name=='ออกจากระบบ' ? 'border p-2 rounded-lg' : ''}
                `}
            >
              {item.name}
            </div>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow">
          <div className="flex flex-col px-4 py-2 space-y-2">
            {menuItems.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false); // ปิดเมนูหลังคลิก
                }}
                className={`text-gray-700 p-2  cursor-pointer hover:text-blue-500 transition-colors 
                ${location.pathname === item.path ?  'underline underline-offset-8' : ''}`}
                >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
