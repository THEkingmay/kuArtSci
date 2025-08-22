import { BrowserRouter , Routes , Route ,Navigate } from "react-router-dom"
import AuthContextProvider from "./context/AuthProvider"
import UserRoutes from "./routes/UserRoute"
import AdminRoute from "./routes/AdminRoute"
import LoginPage from "./pages/Login"

export default function App(){
  return (
    <AuthContextProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage/>}/>
                {UserRoutes()}
                {AdminRoute()}  
              <Route path="*" element={<Navigate to={'/'}/>}/>
            </Routes>
               </BrowserRouter>
            </AuthContextProvider>
  )
}