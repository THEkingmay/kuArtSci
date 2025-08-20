import UserNavbar from "../../components/user/UserNav"
import RegisterMemberForm from "../../components/user/RegisterMemberForm"

export default function UserMember(){
    return(
        <>
        <UserNavbar/>
        <div className="container mx-auto">
            <RegisterMemberForm/>
        </div>
        </>
    )
}