import { useEffect, useState } from "react";

export default function AlertMessage({ type, msg, clear }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg) return;

    // เริ่มโชว์ Alert
    setVisible(true);

    // ตั้งเวลาให้ Alert หายหลัง 2 วิ
    const timer = setTimeout(() => {
      setVisible(false);

      // เคลียร์ข้อความหลัง transition 300ms
      setTimeout(clear, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [msg, clear]);

  // กำหนดสีและสไตล์ตาม type
  const alertStyles = {
    success: "bg-green-100 border-green-400 text-green-800",
    error: "bg-red-100 border-red-400 text-red-800",
  };

  return (
    <>
      {msg && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center space-x-3 border px-5 py-3 rounded-xl shadow-lg transition-all duration-300 transform ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
          } ${alertStyles[type]}`}
        >
          {/* ไอคอน */}
          {type === "success" ? (
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}

          {/* ข้อความแจ้งเตือน */}
          <p className="font-medium">{msg}</p>
        </div>
      )}
    </>
  );
}
