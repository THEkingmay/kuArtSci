import { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin/AdminNav";
import { useAuth } from "../../context/AuthProvider";
import AlertMessage from "../../components/AlertMessage";

import SelectMemberRegisteraion from "../../components/admin/SelectRegister";

export default function AdminMember() {
  const { API_URL } = useAuth();
  const [memberRegisteration, setMemberRegisteration] = useState(null);
  const [alert, setAlert] = useState({ type: "", msg: "" });

  const [selectMember , setSelectMember] = useState(null)

  const fetchData = async () => {
    const token = localStorage.getItem('token')
      try {
        const res = await fetch(`${API_URL}/member/getMemberRegisteration`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` // ดึง token จาก localStorage
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setMemberRegisteration(data.data);
        // console.log(data.data)
      } catch (err) {
        console.log(err);
        setAlert({ type: "error", msg: err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล" });
      }
    };
  useEffect(() => {
    fetchData();
  }, [API_URL]);

  return (
    <>
      {/* Alert */}
      {alert.msg && (
        <AlertMessage
          type={alert.type}
          msg={alert.msg}
          clear={() =>{ setAlert({ type: "", msg: "" })}}
        />
      )}
        {
            selectMember && (
            <SelectMemberRegisteraion 
                selectMember={selectMember}
                clear={()=>setSelectMember(null)}        
                fetchData={fetchData}    
            />
            )
        }
      <AdminNavbar />

      <div className="container mx-auto px-10 mt-6">
        <div className="text-3xl  text-center underline text-gray-800 mb-6">
          จัดการการสมัครเข้าร่วมสมาคมศิษย์เก่า
        </div>

        {/* Loading */}
        {!memberRegisteration && (
          <div className="text-center py-10 text-gray-500">
            กำลังโหลดรายการสมัคร...
          </div>
        )}

       <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {memberRegisteration?.map((m) => (
                <div
                key={m.registration_id}
                className="bg-white border border-gray-200 cursor-pointer rounded-xl shadow-md p-6 hover:shadow-lg transition"
                onClick={() => setSelectMember(m)}
                >
                {/* Header */}
                <div className="mb-4 border-b pb-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                    {m.prefix || m.custom_prefix} {m.first_name} {m.last_name}
                    </h2>
                    {m.old_fname && (
                    <p className="text-sm text-gray-500">
                        ชื่อเก่า {m.old_fname} นามสกุลเก่า {m.old_lname}
                    </p>
                    )}
                    <span
                    className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                        m.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : m.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                    >
                    {m.status === "pending"
                        ? "รอการยืนยัน"
                        : m.status === "approved"
                        ? "อนุมัติแล้ว"
                        : "ปฏิเสธแล้ว"}
                    </span>
                </div>

                {/* Short Summary */}
                <p className="text-sm text-gray-600">
                    รหัสนิสิต: {m.student_id} <br/> ประเภทสมาชิก: {m.member_type}
                </p>
                </div>
            ))}
            </div>
        {/* ไม่มีสมาชิก */}
        {memberRegisteration && memberRegisteration.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            ยังไม่มีการสมัครเข้าร่วมสมาคม
          </div>
        )}
      </div>
    </>
  );
}
