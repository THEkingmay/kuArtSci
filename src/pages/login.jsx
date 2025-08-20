import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login();
      // หลัง login แล้ว เราจะให้ useEffect จัดการ redirect เอง
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) return; // ยังไม่ได้ login

    if (user.role === "admin") {
      navigate("/admin/home", { replace: true });
    } else if (user.role === "user") {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]); // <-- จะทำงานทุกครั้งที่ user เปลี่ยนค่า

  return (
    <div>
      LOGIN
      <button onClick={handleLogin}>login</button>
    </div>
  );
}
