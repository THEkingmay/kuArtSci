import UserNavbar from "../../components/user/UserNav";
import { useNavigate } from "react-router-dom";

export default function UserHome() {
  const navigate = useNavigate();

  return (
    <>
      <UserNavbar />
      <div className="container mx-auto p-4 " >
        {/* หัวข้อข่าวสาร */}
        <h1 className="text-center text-3xl font-semibold underline mb-8 text-gray-800">
          ข่าวสารและกิจกรรม
        </h1>

        {/* การ์ดสมัครสมาชิก */}
        <div className="flex justify-center">
          <div className="bg-white rounded-xl border border-gray-200 shadow-md w-full max-w-md p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-medium text-gray-900 mb-4 text-center">
              สมัครสมาคมศิษย์เก่า
            </h2>
            <p className="text-gray-600 text-center mb-6">
              เข้าร่วมสมาคมเพื่อรับข่าวสารและกิจกรรมพิเศษสำหรับศิษย์เก่า
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/member")}
                className="bg-blue-500 text-white font-semibold px-6 py-3 cursor-pointer rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
              >
                สมัครเลย
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
