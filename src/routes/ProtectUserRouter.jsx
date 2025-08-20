import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function ProtectUserRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
    // ไม่ล็อกอินก็ดูได้
  useEffect(() => {
    if (user && user.role === "admin") {
      // ถ้า login แล้วแต่เป็น admin → ไปหน้าแรกของแอดมิน
      navigate("/admin", { replace: true });
    }
  }, [user, navigate]);

  return children;
}
