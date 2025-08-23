import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";

export default function LoginPage() {
  const { login, resetPassword, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", msg: "" });

  // ฟังก์ชันล็อกอิน
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password) throw new Error("กรุณากรอกอีเมลและรหัสผ่าน");
      await login(email, password);
    } catch (err) {
      setAlert({ type: "error", msg: err.message || "ล็อกอินผิดพลาด" });
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันรีเซ็ตรหัสผ่าน
  const handleResetPassword = async () => {
    if (!email) {
      setAlert({ type: "error", msg: "กรุณากรอกอีเมลเพื่อรีเซ็ตรหัสผ่าน" });
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      setAlert({
        type: "success",
        msg: "เราได้ส่งอีเมลการเปลี่ยนรหัสไปให้คุณแล้ว",
      });
    } catch (err) {
      setAlert({
        type: "error",
        msg: err.message || "ไม่สามารถรีเซ็ตรหัสผ่านได้",
      });
    } finally {
      setLoading(false);
    }
  };

  // redirect ถ้า login แล้ว
  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      navigate("/admin", { replace: true });
    } else if (user.role === "user") {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-xl shadow border border-gray-200 w-full max-w-md">
        {/* หัวข้อ */}
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          เข้าสู่ระบบ
        </h1>
        <p className="text-md text-gray-500 text-center mt-1 mb-6">
          กรุณากรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ
        </p>

        {/* ฟอร์มล็อกอิน */}
        <form onSubmit={handleLogin} className="space-y-4 text-sm">
          {/* อีเมล */}
          <div>
            <label className="block text-gray-700 mb-1">อีเมล</label>
            <input
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* รหัสผ่าน */}
          <div>
            <label className="block text-gray-700 mb-1">รหัสผ่าน</label>
            <input
              type="password"
              placeholder="กรอกรหัสผ่านของคุณ"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* ปุ่มล็อกอิน */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer py-2 mt-2 rounded-lg text-white font-medium ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        {/* ลิงก์รีเซ็ตรหัสผ่าน */}
        {/* <button
          onClick={handleResetPassword}
          className="mt-3 text-sm text-gray-600 hover:text-gray-800 underline cursor-pointer"
          disabled={loading}
        >
          ลืมรหัสผ่าน? กดที่นี่เพื่อรีเซ็ต
        </button> */}

        {/* ปุ่มไปหน้าแรกโดยไม่ล็อกอิน */}
        <div className="mt-6 text-sm">
          <button
            onClick={() => navigate("/")}
            className="w-full py-2 rounded-lg border cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            ดำเนินการโดยไม่ล็อกอิน
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
