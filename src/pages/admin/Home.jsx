import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNav";

export default function AdminHome() {
    const navigate = useNavigate();

    return (
        <>
            <AdminNavbar />
            <div className="container mx-auto mt-10">
                {/* หัวข้อหลัก */}
                <h1 className="text-3xl font-bold text-center text-gray-800 underline mb-8">
                    หน้าจัดการกิจกรรมข่าวสาร
                </h1>

                {/* กล่องเมนูหลัก */}
                <div className="flex justify-center">
                    <div
                        onClick={() => navigate("/admin/member")}
                        className="bg-white border border-gray-300 rounded-xl shadow-md p-6 w-[500px] 
                                   text-center text-lg font-medium text-gray-700 cursor-pointer
                                   transition-all duration-300 hover:shadow-xl hover:scale-105
                                   hover:border-blue-400 hover:bg-blue-50"
                    >
                        จัดการรายการสมัครการเป็นสมาชิกสมาคมศิษย์เก่า
                    </div>
                </div>
            </div>
        </>
    );
}
