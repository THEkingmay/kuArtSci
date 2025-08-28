import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";

export default function SelectMemberRegistration({
  selectMember,
  clear,
  fetchData,
}) {
  const { API_URL } = useAuth();

  // States
  const [confirmStatus, setConfirmStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transcriptURL, setTranscriptURL] = useState(null);
  const [transcriptError, setTranscriptError] = useState(null);
  const [loadingTranscript, setLoadingTranscript] = useState(false);

  // ==================== ดูหลักฐานการเรียน ====================
  const showTranscript = async (transcript_image_name) => {
    const token = localStorage.getItem("token");
    try {
      setLoadingTranscript(true);
      setTranscriptError(null);

      const res = await fetch(`${API_URL}/member/getTranscriptImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ transcript_image_name }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      if (data.transcript_URL) {
        setTranscriptURL(data.transcript_URL);
      } else {
        setTranscriptError(true);
      }
    } catch (err) {
      console.error(err);
      setTranscriptError(true);
    } finally {
      setLoadingTranscript(false);
    }
  };

  // ==================== เปลี่ยนสถานะการสมัคร ====================
  const handleChangeStatus = async (newStatus) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/member/updateMemberRegistration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          registration_id: selectMember.registration_id,
          newStatus,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "เกิดข้อผิดพลาด");

      await fetchData();
      clear();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setConfirmStatus(null);
    }
  };

  // ==================== Modal ยืนยัน ====================
  const showConfirm = (status) => {
    if (!status) return null;

    const statusText =
      status === "approved" ? "ยืนยันการสมัคร" : "ปฏิเสธการสมัคร";

    return (
      <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center border border-gray-200 animate-fadeIn">
          <h2 className="text-xl font-bold mb-3 text-gray-800">{statusText}</h2>
          <p className="mb-5 text-gray-600">
            คุณแน่ใจที่จะ{" "}
            <span className="font-semibold">
              {status === "approved" ? "ยืนยัน" : "ปฏิเสธ"}
            </span>{" "}
            สมาชิกคนนี้หรือไม่?
          </p>
          <div className="flex justify-between gap-4">
            <button
              disabled={loading}
              onClick={() => handleChangeStatus(status)}
              className={`flex-1 py-2 rounded-lg font-medium cursor-pointer transition-transform hover:scale-[1.02] ${
                status === "approved"
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:opacity-90"
                  : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:opacity-90"
              }`}
            >
              {loading
                ? status === "approved"
                  ? "กำลังอนุมัติ..."
                  : "กำลังปฏิเสธ..."
                : "ยืนยัน"}
            </button>
            <button
              disabled={loading}
              onClick={() => setConfirmStatus(null)}
              className="flex-1 cursor-pointer py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {showConfirm(confirmStatus)}

      {/* ==================== Main Modal ==================== */}
      <div className="bg-white border border-gray-200 rounded-2xl w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={clear}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl cursor-pointer font-bold p-2"
        >
          &times;
        </button>

        {/* ==================== Header ==================== */}
        <div className="mb-5 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectMember.prefix || selectMember.custom_prefix}{" "}
            {selectMember.first_name} {selectMember.last_name}
          </h2>

          {selectMember.old_fname && (
            <p className="text-sm text-gray-500 mt-1">
              (ชื่อเก่า {selectMember.old_fname} นามสกุลเก่า{" "}
              {selectMember.old_lname})
            </p>
          )}

          <span
            className={`inline-block mt-2 px-4 py-1 text-sm font-medium rounded-full shadow-sm ${
              selectMember.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : selectMember.status === "approved"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {selectMember.status === "pending"
              ? "⏳ รอการยืนยัน"
              : selectMember.status === "approved"
              ? "✅ อนุมัติแล้ว"
              : "❌ ปฏิเสธแล้ว"}
          </span>
        </div>

        {/* ==================== Personal Info ==================== */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            ข้อมูลส่วนตัว
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <p>📌 รหัสนิสิต: <span className="font-medium">{selectMember.student_id}</span></p>
            <p>🎂 วันเกิด: {selectMember.birth_date || "-"} (อายุ: {selectMember.age || "-"})</p>
            <p>🌏 เชื้อชาติ: {selectMember.race || "-"} / {selectMember.nationality || "-"}</p>
            <p>🕊 ศาสนา: {selectMember.religion || "-"}</p>
            <p>💼 อาชีพ: {selectMember.job || "-"}</p>
          </div>
        </div>

        {/* ==================== Education ==================== */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">การศึกษา</h3>
          {["bachelor", "master", "doctoral"].map((level) => (
            <div key={level} className="mb-3 border-b last:border-b-0 pb-2">
              <p>
                🎓 {level === "bachelor"
                  ? "ปริญญาตรีหลักสูตร"
                  : level === "master"
                  ? "ปริญญาโทหลักสูตร"
                  : "ปริญญาเอกหลักสูตร"}:{" "}
                <span className="font-medium">
                  {selectMember[`${level}_degree`] || "-"}
                </span>
              </p>
              <p>สาขา: {selectMember[`${level}_degree_major`] || "-"}</p>
              <p>รุ่น KU: {selectMember[`${level}_degree_ku_batch`] || "-"}</p>
              <p>รุ่น ศวท: {selectMember[`${level}_degree_as_batch`] || "-"}</p>
              <p>ปีเริ่ม: {selectMember[`${level}_degree_start_year`] || "-"}</p>
              <p>ปีจบ: {selectMember[`${level}_degree_end_year`] || "-"}</p>
            </div>
          ))}
        </div>

        {/* ==================== Contact ==================== */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">ข้อมูลติดต่อ</h3>
          <div className="space-y-1 text-gray-700">
            <p>🏠 บ้าน: {selectMember.current_home_place || "-"}</p>
            <p>🏢 ที่ทำงาน: {selectMember.current_work_place || "-"}</p>
            <p>📞 โทร: {selectMember.phone_number || "-"}</p>
            <p>📧 อีเมล: {selectMember.contact_email || "-"}</p>
            {selectMember.line_id && <p>💬 Line: {selectMember.line_id}</p>}
            {selectMember.facebook && <p>📘 Facebook: {selectMember.facebook}</p>}
          </div>
        </div>

        {/* ==================== Member Info ==================== */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">ข้อมูลสมาชิก</h3>
          <p>🔖 ประเภทสมาชิก: {selectMember.member_type}</p>
          <p>📅 วันที่สมัคร: {new Date(selectMember.submitted_at).toLocaleDateString("th-TH")}</p>

          {/* ปุ่มดูหลักฐาน */}
          <button
            disabled={loadingTranscript}
            onClick={() => showTranscript(selectMember.transcript_image_name)}
            className="mt-3 px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow-md hover:bg-blue-600 transition-all duration-200"
          >
            {loadingTranscript ? "⏳ กำลังเปิดหลักฐาน..." : "📄 ดูหลักฐานการเรียน"}
          </button>
          {transcriptError && (
            <span className="ml-3 text-red-600 font-semibold">
              ❌ เปิดรูปไม่สำเร็จ
            </span>
          )}
        </div>

        {/* ==================== Action Buttons ==================== */}
        <div className="flex gap-4 mt-6">
          {selectMember.status !== "approved" && (
            <button
              onClick={() => setConfirmStatus("approved")}
              className="flex-1 cursor-pointer py-2 rounded-lg font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 shadow-lg transition-all duration-200"
            >
              ✅ ยืนยันการสมัคร
            </button>
          )}
          {selectMember.status !== "rejected" && (
            <button
              onClick={() => setConfirmStatus("rejected")}
              className="flex-1 cursor-pointer py-2 rounded-lg font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 shadow-lg transition-all duration-200"
            >
              ❌ ปฏิเสธการสมัคร
            </button>
          )}
        </div>
      </div>

      {/* ==================== Modal แสดงหลักฐาน ==================== */}
      {transcriptURL && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-5 rounded-2xl shadow-2xl max-w-3xl w-[90%] relative animate-fadeIn">
            {/* Close Slip Button */}
            <button
              onClick={() => setTranscriptURL(null)}
              className="absolute top-3 right-3 cursor-pointer text-gray-600 hover:text-black text-3xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
              หลักฐานการเรียน
            </h2>

            <div className="flex justify-center">
              <img
                src={transcriptURL}
                alt="หลักฐานการเรียน"
                className="rounded-xl shadow-lg max-h-[75vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
