import { useNavigate } from "react-router-dom"
export default function AdminHome(){
    const navigate = useNavigate()
    return(
        <div>
            THIS IS ADMIN HOME
            <button onClick={()=>{navigate('/admin/member')}}>to member</button>
            <button onClick={()=>{navigate('/')}}>test</button>
        </div>
    )
}