import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function ProtectAdminRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // ถ้ายังไม่ได้ login → ไปหน้า login
      navigate("/login", { replace: true });
    } else if (user.role !== "admin") {
      // ถ้า login แล้วแต่ไม่ใช่ admin → ไปหน้าแรก
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  // กรณี user ยังไม่โหลด / redirect → ไม่ render children
  if (!user || user.role !== "admin") return <div>กำลังโหลด</div>;

  return children;
}
