import RegisterMemberForm from "../../components/user/RegisterMemberForm";
import { Link } from "react-router-dom";

export default function UserMember() {
  return (
    <>
      <div className="min-h-screen max-w-4xl mx-auto flex flex-col items-center py-10 px-4">
        {/* กล่องหลัก */}
        <div className="w-full  bg-white shadow-lg rounded-2xl border border-gray-200 p-8">
          {/* หัวข้อ + ปุ่มเข้าสู่ระบบ */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              แบบฟอร์มสมัครสมาชิก
            </h1>
            <Link to={"/login"}>
              <button className="cursor-pointer px-5 py-2 underline underline-offset-8 hover:scale-105 hover:text-green-600 transition-all duration-200">
                แอดมินเข้าสู่ระบบ
              </button>
            </Link>
          </div>

          {/* ฟอร์มลงทะเบียน */}
          <RegisterMemberForm />
        </div>
      </div>
    </>
  );
}
