import UserNavbar from "../../components/user/UserNav"
import { useNavigate } from "react-router-dom"

export default function UserHome(){
  const navigate = useNavigate()
    return(
      <>
        <UserNavbar/>
        <div className="container mx-auto mt-3">
          <div className="text-center p-3 text-xl underline ">
            ข่าวสาร
          </div>
            <div 
            onClick={()=>navigate('/member')}
            className="text-center cursor-pointer p-3 rounded border border-gray-200  shadow-sm">
              สมัครสมาคมศิษย์เก่า 
            </div>
        </div>
      </>
    )
}