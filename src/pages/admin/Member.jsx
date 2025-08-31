import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import AlertMessage from "../../components/AlertMessage";
import SelectMemberRegisteraion from "../../components/admin/SelectRegister";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function AdminMember() {
  const { API_URL, logout } = useAuth();
  const [memberRegisteration, setMemberRegisteration] = useState(null);
  const [alert, setAlert] = useState({ type: "", msg: "" });
  const [selectMember, setSelectMember] = useState(null);
  const [approvedMemberRegistration, setApprovedMemberRegistration] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/member/getMemberRegisteration`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMemberRegisteration(data.data);
    } catch (err) {
      console.log(err);
      setAlert({
        type: "error",
        msg: err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล",
      });
    }
  };

  useEffect(() => {
    if (import.meta.env.DEV) {
      localStorage.setItem("token", import.meta.env.VITE_DEV_TOKEN);
    }
    fetchData();
  }, [API_URL]);

  const fetchApprovedMemberRegistration = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/member/getApprovedMemberRegistrations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setApprovedMemberRegistration(data.data);
    } catch (err) {
      console.log(err);
      setAlert({
        type: "error",
        msg: err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล",
      });
    }
  };


  const exportToExcel = (data, fileName) => {
    fetchApprovedMemberRegistration();

    // Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

    // Write workbook to binary array
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(blob, fileName);
  }

  return (
    <>
      {/* Alert */}
      {alert.msg && (
        <AlertMessage
          type={alert.type}
          msg={alert.msg}
          clear={() => setAlert({ type: "", msg: "" })}
        />
      )}

      {/* Modal แสดงรายละเอียดสมาชิก */}
      {selectMember && (
        <SelectMemberRegisteraion
          selectMember={selectMember}
          clear={() => setSelectMember(null)}
          fetchData={fetchData}
        />
      )}

      {/* เนื้อหาหลัก */}
      <div className="min-h-screen md:py-10 md:px-6">
        <div className="mx-auto bg-white min-h-screen rounded-2xl border border-gray-200 ma:max-w-6xl md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              จัดการการสมัครเข้าร่วมสมาคมศิษย์เก่า
            </h1>

            {/* button group on the right */}
            <div className="flex gap-4 mt-4 sm:mt-0">
              <button
                onClick={() => exportToExcel(approvedMemberRegistration, 'รายชื่อสมาชิกที่ยืนยันแล้ว.xlsx')}
                className="px-5 py-2 bg-blue-500 text-white cursor-pointer rounded-lg shadow hover:bg-blue-900 hover:scale-105 transition-all duration-200"
              >
                Export รายชื่อที่ยืนยันแล้ว
              </button>
              <button
                onClick={() => exportToExcel(memberRegisteration, 'รายชื่อสมาชิกที่สมัคร.xlsx')}
                className="px-5 py-2 bg-blue-500 text-white cursor-pointer rounded-lg shadow hover:bg-blue-900 hover:scale-105 transition-all duration-200"
              >
                Export รายชื่อที่สมัครทั้งหมด
              </button>

              <button
                onClick={logout}
                className="px-5 py-2 underline underline-offset-8 cursor-pointer hover:scale-105 hover:text-red-600 rounded-lg transition-all duration-200"
              >
                ออกจากระบบแอดมิน
              </button>
            </div>
          </div>

          {/* Loading */}
          {!memberRegisteration && (
            <div className="text-center py-10 text-gray-500 animate-pulse">
              กำลังโหลดรายการสมัคร...
            </div>
          )}

          {/* แสดงข้อมูล */}
          {memberRegisteration && memberRegisteration.length > 0 && (
            <div className="grid gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
              {memberRegisteration.map((m) => (
                <div
                  key={m.registration_id}
                  className="bg-white border border-gray-200 cursor-pointer rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 p-6"
                  onClick={() => setSelectMember(m)}
                >
                  {/* Header */}
                  <div className="mb-4 border-b pb-3">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {m.prefix || m.custom_prefix} {m.first_name} {m.last_name}
                    </h2>
                    {m.old_fname && (
                      <p className="text-sm text-gray-500">
                        ชื่อเก่า {m.old_fname} นามสกุลเก่า {m.old_lname}
                      </p>
                    )}
                    <span
                      className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${m.status === "pending"
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
                  <div className="space-y-1 text-gray-700 text-sm">
                    <p>
                      <span className="font-medium">รหัสนิสิต:</span>{" "}
                      {m.student_id || "-"}
                    </p>
                    <p>
                      <span className="font-medium">ประเภทสมาชิก:</span>{" "}
                      {m.member_type || "ไม่ระบุ"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ไม่มีสมาชิก */}
          {memberRegisteration && memberRegisteration.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              ยังไม่มีการสมัครเข้าร่วมสมาคม
            </div>
          )}
        </div>
      </div>
    </>
  );
}
