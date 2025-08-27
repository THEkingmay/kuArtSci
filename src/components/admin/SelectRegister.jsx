import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";

export default function SelectMemberRegisteraion({ selectMember, clear , fetchData }) {

    const { API_URL} = useAuth()
    const [confirmStatus , setConfirmStatus] = useState(null)
    const [load ,setLaod] = useState(false)

  const showSlip = async (slipName)=>{  // แสดงสลิปเงินโอน
    alert(slipName)
  }

    const handleChangeStatus = async (newStatus) =>{
        try{
            setLaod(true)
            const res = await fetch(`${API_URL}/member/updateMemberRegistration` , {
                method:'post' ,
                headers :{
                   'Content-Type': 'application/json' , 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                } ,
                body : JSON.stringify({registration_id : selectMember.registration_id , newStatus})
            })
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'เกิดข้อผิดพลาด');
            await fetchData()
            clear()
        }catch(err){
            console.log(err)
            setAlert({type:'error' , msg:'เปลี่ยนสถานะไม่สำเร็จ'})
        }finally{
            setLaod(false)
            setConfirmStatus(null);
        }
    }

    const showConfirm = (status) => {
        if (!status) return null;

        const statusText = status === "approved" ? "ยืนยันการสมัคร" : "ปฏิเสธการสมัคร";

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
                <h2 className="text-lg font-semibold mb-4">{statusText}</h2>
                <p className="mb-6">คุณแน่ใจที่จะ {status === "approved" ? "ยืนยัน" : "ปฏิเสธ"} สมาชิกคนนี้หรือไม่?</p>
                <div className="flex justify-between gap-4">
                <button
                    disabled={load}
                    onClick={() => {
                    handleChangeStatus(status);
                    }}
                    className={`flex-1 py-2 rounded-lg font-medium cursor-pointer ${
                    status === "approved"
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                >
                    {load ? status === "approved" ? 'กำลังอนุมัติ...' : 'กำลังปฏิเสธ...' : "ใช่"}
                </button>
                <button
                    disabled={load}
                    onClick={() => setConfirmStatus(null)}
                    className="flex-1 cursor-pointer py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                    ยกเลิก
                </button>
                </div>
            </div>
            </div>
        );
        };

  if (!selectMember) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
        {showConfirm(confirmStatus)}
      <div className="bg-white border border-gray-300 rounded-xl w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto shadow-xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={clear}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-4xl cursor-pointer font-bold p-2"
        >
          &times;
        </button>

        {/* Header */}
        <div className="mb-4 border-b pb-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            {selectMember.prefix || selectMember.custom_prefix}{" "}
            {selectMember.first_name} {selectMember.last_name}
          </h2>
          {selectMember.old_fname && (
            <p className="text-sm text-gray-500">
              ชื่อเก่า {selectMember.old_fname} นามสกุลเก่า{" "}
              {selectMember.old_lname}
            </p>
          )}
          <span
            className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${
              selectMember.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : selectMember.status === "approved"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {selectMember.status === "pending"
              ? "รอการยืนยัน"
              : selectMember.status === "approved"
              ? "อนุมัติแล้ว"
              : "ปฏิเสธแล้ว"}
          </span>
        </div>

        {/* Personal Info */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            ข้อมูลส่วนตัว
          </h3>
          <p>รหัสนิสิต: <span className="font-medium">{selectMember.student_id}</span></p>
          <p>วันเกิด: {selectMember.birth_date || '-'} (อายุ: {selectMember.age || '-'})</p>
          <p>เชื้อชาติ: {selectMember.race || '-'} | สัญชาติ: {selectMember.nationality || '-'}</p>
          <p>ศาสนา: {selectMember.religion || '-'}</p>
        </div>

        {/* Education */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">การศึกษา</h3>
          <div className="mb-2">
            <p>ปริญญาตรีหลักสูตร: {selectMember.bachelor_degree || "-"}</p>
            <p>สาขา: {selectMember.bachelor_degree_major || "-"}</p>
            <p>รุ่น KU: {selectMember.bachelor_degree_ku_batch || "-"}</p>
            <p>รุ่น ศวท: {selectMember.bachelor_degree_as_batch || "-"}</p>
            <p>ปีเริ่ม: {selectMember.bachelor_degree_start_year || "-"}</p>
            <p>ปีจบ: {selectMember.bachelor_degree_end_year || "-"}</p>
          </div>
          <div className="mb-2">
              <p>ปริญญาโทหลักสูตร: {selectMember.master_degree || '-'}</p>
              <p>สาขา: {selectMember.master_degree_major || '-'}</p>
              <p>รุ่น KU: {selectMember.master_degree_ku_batch || "-"}</p>
              <p>รุ่น ศวท: {selectMember.master_degree_as_batch || "-"}</p>
              <p>ปีเริ่ม: {selectMember.master_degree_start_year || "-"}</p>
              <p>ปีจบ: {selectMember.master_degree_end_year || "-"}</p>
          </div>
          <div>
            <p>ปริญญาเอกสูตร: {selectMember.doctoral_degree || '-'}</p>
            <p>สาขา: {selectMember.doctoral_degree_major || "-"}</p>
            <p>รุ่น KU: {selectMember.doctoral_degree_ku_batch || "-"}</p>
            <p>รุ่น ศวท: {selectMember.doctoral_degree_as_batch || "-"}</p>
            <p>ปีเริ่ม: {selectMember.doctoral_degree_start_year || "-"}</p>
            <p>ปีจบ: {selectMember.doctoral_degree_end_year || "-"}</p>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">ข้อมูลติดต่อ</h3>
          <p>ที่อยู่บ้าน: {selectMember.current_home_place || '-'}</p>
          <p>ที่อยู่ทำงาน: {selectMember.current_work_place || '-'}</p>
          <p>ช่องทางติดต่อที่สะดวก: {selectMember.contact_preference || '-'}</p>
          <p>โทรศัพท์: {selectMember.phone_number || "-"}</p>
          <p>อีเมลติดต่อ: {selectMember.contact_email || "-"}</p>
          {selectMember.line_id && <p>Line: {selectMember.line_id || '-'}</p>}
          {selectMember.facebook && <p>Facebook: {selectMember.facebook || '-'}</p>}
        </div>

        {/* Member Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">ข้อมูลสมาชิก</h3>
          <p>ประเภทการสมัครสมาชิก: {selectMember.member_type}</p>
          <p>
            วันที่สมัคร:{" "}
            {new Date(selectMember.submitted_at).toLocaleDateString("th-TH")}
          </p>
          <button  className="border cursor-pointer p-2 rounded-lg shadow-sm border-gray-300 mt-2">ดูสลิปการชำระเงิน</button>
        </div>

         <div className="flex gap-4 mt-6">
            {selectMember.status!=='approved' && <button
                onClick={() =>setConfirmStatus('approved')}
                className="cursor-pointer flex-1 border shadow-sm border-green-400  text-black  font-medium py-2 px-4 rounded-lg hover:bg-green-200 transition"
            >
                ยืนยันการสมัคร
            </button>}
            {selectMember.status!=='rejected' && <button
                onClick={() => setConfirmStatus('rejected')}
                className="flex-1 cursor-pointer border shadow-sm border-red-400 text-black  font-medium py-2 px-4 rounded-lg hover:bg-red-200 transition"
            >
                ปฏิเสธการสมัคร
            </button>}
            </div>
      </div>
    </div>
  );
}
