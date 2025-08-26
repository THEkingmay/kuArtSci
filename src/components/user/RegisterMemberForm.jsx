import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import AlertMessage from "../AlertMessage";

export default function RegisterMemberForm() {
  const {API_URL} = useAuth()
  
  const [loading , setLoad] = useState(false)
  
  const [alert , setAlert] = useState({
    type : '' , msg:''
  })
 // เก็บค่าของ select วัน/เดือน/ปี ไทย
  const [selectTH_birthDate, setSelectTH_birthDate] = useState({
    day: "",
    month: "",
    year: "",
  });
   // สร้าง array สำหรับวัน / เดือน / ปี
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  // ปี พ.ศ. 2400 - 2568 (ย้อนกลับให้ปีใหม่อยู่ข้างบน)
  const years = Array.from({ length: 2568 - 2400 + 1 }, (_, i) => 2568 - i);

  const initialFormData = {
    // 🟢 ข้อมูลส่วนตัว
    student_id: "",
    prefix: "",
    custom_prefix: "",
    first_name: "",
    last_name: "",
    old_fname: "",
    old_lname: "",
    birth_date: "",
    age: "",
    nationality: "",
    race: "",
    religion: "",

    // 🟢 ปริญญาตรี
    bachelor_degree :"" , // หลักสูตร
    bachelor_degree_major: "",
    bachelor_degree_KU_batch: "",
    bachelor_degree_AS_batch: "",
    bachelor_degree_start_yaer: "",
    bachelor_degree_end_yaer: "",

    // 🟢 ปริญญาโท
    master_degree  : "",
    master_degree_major: "",
    master_degree_KU_batch: "",
    master_degree_AS_batch: "",
    master_degree_start_yaer: "",
    master_degree_end_yaer: "",

    // 🟢 ปริญญาเอก
    doctoral_degree:"",
    doctoral_degree_major: "",
    doctoral_degree_KU_batch: "",
    doctoral_degree_AS_batch: "",
    doctoral_degree_start_yaer: "",
    doctoral_degree_end_yaer: "",

    // 🟢 ที่อยู่ปัจจุบัน
    homeNo: "",
    homeVillageNo: "",
    homeVillageName: "",
    homeAlley: "",
    homeStreet: "",
    homeSubdistrict: "",
    homeDistrict: "",
    homeProvince: "",
    homeZipcode: "",
    homePhone: "",

    // 🟢 สถานที่ทำงาน
    workNo: "",
    workVillageNo: "",
    workVillageName: "",
    workAlley: "",
    workStreet: "",
    workSubdistrict: "",
    workDistrict: "",
    workProvince: "",
    workZipcode: "",
    workPhone: "",
    workFax: "",

    // 🟢 ช่องทางติดต่อ
    contact_preference: "",
    phone_number: "",
    contact_email: "",
    line_id: "",
    facebook: "",

    // 🟢 ประเภทสมาชิก
    member_type: "",
    slip :""
  };

const prefixSelect = [
  {value:'นาย' , label : "นาย"} ,
  {value:'นาง' , label : "นาง"} ,
  {value:'นางสาว' , label : "นางสาว"} ,
  {value:'อื่นๆ' , label : "อื่นๆ"} ,
]


const contactPreferenceSelect = [
  {value :"ที่อยู่บ้าน" , label :"ที่อยู่บ้าน"}
  ,{value :"ที่อยู่ที่ทำงาน" , label :"ที่อยู่ที่ทำงาน"}
]

const memberTypeSelect = [
  {value :"สมาชิกสามัญ ประเภท1" , label :"สมาชิกสามัญ ประเภท1"} ,
  {value :"สมาชิกสามัญ ประเภท2" , label :"สมาชิกสามัญ ประเภท2"} , 
  {value :"สมาชิกวิสามัญ" , label :"สมาชิกวิสามัญ"}
]

  const [formData, setFormData] = useState(initialFormData);

  // ฟังก์ชันรีเซตค่า
  const resetForm = () => {
    setFormData(initialFormData);
    setSelectTH_birthDate({
      day:"" , month :"" , year:""
    })
    const id = document.getElementById('slipInput')
    id.value=''
  };

useEffect(()=>{ // ถ้าเปลี่ยนคำนำหน้าไปมา ให้ลบคำนำหน้าที่เขียนเอง
  setFormData({
    ...formData , 
    ['custom_prefix'] : '' 
  })
},[formData.prefix])

useEffect(() => {
  const degrees = ["bachelor", "master", "doctoral"];
  degrees.forEach((degree) => {
    if (formData[`${degree}_degree_major`] === "") {
      setFormData((prev) => ({
        ...prev,
        [`${degree}_degree_KU_batch`]: "",
        [`${degree}_degree_AS_batch`]: "",
        [`${degree}_degree_start_year`]: "",
        [`${degree}_degree_end_year`]: "",
      }));
    }
  });
}, [
  formData.bachelor_degree_major,
  formData.master_degree_major,
  formData.doctoral_degree_major,
]);

// จัดการ onChange ของ dropdown วัน/เดือน/ปี
  const handleBirthDateChange = (e) => {
    const { name, value } = e.target;
    setSelectTH_birthDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // 🟢 จัดการค่าฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeFile = (e) => {
      const file = e.target.files[0];
      if (file) {
        // กำหนดขนาดไฟล์สูงสุด (2MB)
        const maxSize = 2 * 1024 * 1024;

        if (file.size > maxSize) {
           setAlert({type : 'error' , msg : 'เลือกขนาดไฟล์ไม่เกิน 2 MB'})
          e.target.value = ""; // รีเซ็ต input file
          return;
        }
        // ตรวจสอบชนิดไฟล์ (optional ถ้าอยากให้เลือกเฉพาะ .jpg / .png)
        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
           setAlert({type : 'error' , msg : 'เลือกได้แค่รูปภาพเท่านั้น'})
          e.target.value = "";
          return;
        }
        setFormData({ ...formData, slip: file });
      }
  };



// 🟢 ฟังก์ชันช่วยต่อที่อยู่แบบมีค่าเท่านั้น
const formatAddress = (fields) => {
  return Object.entries(fields)
    .filter(([_, value]) => value !== null && value !== undefined && value !== '') // มีค่าเท่านั้น
    .reduce((acc, [key, value]) => {
      let formattedValue;
      switch (key) {
        case 'homeNo':
        case 'workNo':
          formattedValue = `เลขที่ ${value}`;
          break;
        case 'homeVillageNo':
        case 'workVillageNo':
          formattedValue = `หมู่ ${value}`;
          break;
        case 'homeVillageName':
        case 'workVillageName':
          formattedValue = `หมู่บ้าน ${value}`;
          break;
        case 'homeAlley':
        case 'workAlley':
          formattedValue = `ซ.${value}`;
          break;
        case 'homeStreet':
        case 'workStreet':
          formattedValue = `ถ.${value}`;
          break;
        case 'homeSubdistrict':
        case 'workSubdistrict':
          formattedValue = `ต./แขวง.${value}`;
          break;
        case 'homeDistrict':
        case 'workDistrict':
          formattedValue = `อ./เขต.${value}`;
          break;
        case 'homeProvince':
        case 'workProvince':
          formattedValue = `จ.${value}`;
          break;
        case 'homeZipcode':
        case 'workZipcode':
          formattedValue = `รหัสไปรษณีย์ ${value}`;
          break;
        default:
          formattedValue = value;
      }
      // ต่อ string ไปเรื่อย ๆ โดยเว้นวรรคถ้ามีค่าเดิม
      return acc ? `${acc} ${formattedValue}` : formattedValue;
    }, ''); // เริ่มต้นด้วย ""
};


// ใช้กับบ้าน
const getFullHomeAddress = () => {
  const homeFields = {
    homeNo: formData.homeNo,
    homeVillageNo: formData.homeVillageNo,
    homeVillageName: formData.homeVillageName,
    homeAlley: formData.homeAlley,
    homeStreet: formData.homeStreet,
    homeSubdistrict: formData.homeSubdistrict,
    homeDistrict: formData.homeDistrict,
    homeProvince: formData.homeProvince,
    homeZipcode: formData.homeZipcode,
  };
  return formatAddress(homeFields);
};

// ใช้กับที่ทำงาน
const getFullWorkAddress = () => {
  const workFields = {
    workNo: formData.workNo,
    workVillageNo: formData.workVillageNo,
    workVillageName: formData.workVillageName,
    workAlley: formData.workAlley,
    workStreet: formData.workStreet,
    workSubdistrict: formData.workSubdistrict,
    workDistrict: formData.workDistrict,
    workProvince: formData.workProvince,
    workZipcode: formData.workZipcode,
  };
  return formatAddress(workFields);
};

  // เอาวันมาต่อกัน
  const formatBD = ()=>{
    return `${selectTH_birthDate.day}-${selectTH_birthDate.month}-${selectTH_birthDate.year}`
  }
  // 🟢 เมื่อส่งฟอร์ม
  const handleSubmit = async (e) => {
     e.preventDefault();
     
    try{
        setLoad(true);
          // รวมที่อยู่บ้านและที่อยู่ที่ทำงาน
          const fullHomeAddress = getFullHomeAddress();
          const fullWorkAddress = getFullWorkAddress();
          function toIntOrNull(value) { 
            const n = parseInt(value, 10);
            // console.log(n ,isNaN(n))
            return !isNaN(n) ? n : null;
          }
          // สร้าง payload สำหรับส่ง API
          const payload = {
            student_id : formData.student_id , 
            prefix : formData.prefix ,
            custom_prefix : formData.custom_prefix || null ,
            first_name : formData.first_name , 
            last_name : formData.last_name , 
            old_fname : formData.old_fname|| null ,
            old_lname : formData.old_lname|| null ,
            birth_date : formatBD(), 
            age: toIntOrNull(formData.age),
            nationality: formData.nationality,
            race: formData.race,
            religion: formData.religion,

            // การศึกษา: ปริญญาตรี
            bachelor_degree : formData.bachelor_degree || null,
            bachelor_degree_major: formData.bachelor_degree_major || null,
            bachelor_degree_ku_batch: toIntOrNull(formData.bachelor_degree_KU_batch),
            bachelor_degree_as_batch: toIntOrNull(formData.bachelor_degree_AS_batch),
            bachelor_degree_start_year: toIntOrNull(formData.bachelor_degree_start_yaer),
            bachelor_degree_end_year: toIntOrNull(formData.bachelor_degree_end_yaer),

            // ปริญญาโท
            master_degree : formData.master_degree || null ,
            master_degree_major: formData.master_degree_major || null,
            master_degree_ku_batch: toIntOrNull(formData.master_degree_KU_batch),
            master_degree_as_batch: toIntOrNull(formData.master_degree_AS_batch),
            master_degree_start_year: toIntOrNull(formData.master_degree_start_yaer),
            master_degree_end_year: toIntOrNull(formData.master_degree_end_yaer),

            // ปริญญาเอก
            doctoral_degree : formData.master_degree || null ,
            doctoral_degree_major: formData.doctoral_degree_major || null,
            doctoral_degree_ku_batch: toIntOrNull(formData.doctoral_degree_KU_batch),
            doctoral_degree_as_batch: toIntOrNull(formData.doctoral_degree_AS_batch),
            doctoral_degree_start_year: toIntOrNull(formData.doctoral_degree_start_yaer),
            doctoral_degree_end_year: toIntOrNull(formData.doctoral_degree_end_yaer),
            
            current_home_place: fullHomeAddress || null,
            current_work_place: fullWorkAddress || null,

            // 🟢 ช่องทางติดต่อ
            contact_preference: formData.contact_preference,
            phone_number: formData.phone_number|| null,
            contact_email:formData.contact_email|| null,
            line_id: formData.line_id|| null,
            facebook:formData.facebook|| null,

            // 🟢 ประเภทสมาชิก
            member_type: formData.member_type,
            slip : formData.slip
          };
          // console.log(payload)
          const formDataToSend = new FormData()
          for (const key in payload) {
              formDataToSend.append(key, formData[key]);
          }
          try{
            const res= await fetch(`${API_URL}/member/register` , {
              method : 'post' ,
              body : formDataToSend // ไม่ต้องเขียน contenttype  เพราะใช้ new FormData()
            })
            const data = await res.json()
            if(!res.ok) throw new Error(data.message)
            setAlert({type : 'success' , msg : 'บันทึกการสมัครเรียบร้อย'})
            resetForm()
          }catch(err){
            setAlert({type : 'error' , msg : err.message})
            console.log(err)
          }finally{
            setLoad(false)
          }
          resetForm()

    }catch(err){
      console.log(err)
       setAlert({type : 'error' , msg : err.message})
    }
  };
return (
  <>
  <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-8">
  {/* ข้อมูลส่วนตัว */}
  <section className="space-y-4">
    <h2 className="text-2xl font-semibold border-b pb-2">ข้อมูลส่วนตัว</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input required type="text" name="student_id"  placeholder="รหัสประจำตัวนิสิต" value={formData.student_id} onChange={handleChange} className="input-field"/>
      <select  name="prefix" value={formData.prefix} onChange={handleChange} className="input-field">
        <option value="">เลือกคำนำหน้า</option>
        {prefixSelect.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
      </select>
      {formData.prefix === "อื่นๆ" && <input type="text"  name="custom_prefix" placeholder="ระบุคำนำหน้า" value={formData.custom_prefix} onChange={handleChange} className="input-field"/>}
      <input required type="text" name="first_name" placeholder="ชื่อ"  value={formData.first_name} onChange={handleChange} className="input-field"/>
      <input required type="text" name="last_name" placeholder="นามสกุล"  value={formData.last_name} onChange={handleChange} className="input-field"/>
      <input type="text" name="old_fname" placeholder="ชื่อเดิม" value={formData.old_fname} onChange={handleChange} className="input-field"/>
      <input type="text" name="old_lname" placeholder="นามสกุลเดิม" value={formData.old_lname} onChange={handleChange} className="input-field"/>
       {/* วันเกิดแบบไทย */}
        <div className="flex gap-2">
          {/* วัน */}
          <select
            name="day"
            value={selectTH_birthDate.day}
            onChange={handleBirthDateChange}
            
            className="input-field"
          >
            <option value="">วันเกิด</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* เดือน */}
          <select
            name="month"
            value={selectTH_birthDate.month}
            onChange={(e) =>
              setSelectTH_birthDate((prev) => ({
                ...prev,
                month:e.target.value,
              }))
            }
            
            className="input-field"
          >
            <option value="">เดือนเกิด</option>
            {months.map((m, i) => (
              <option key={i} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* ปี */}
          <select
            name="year"
            value={selectTH_birthDate.year}
            onChange={handleBirthDateChange}
            
            className="input-field"
          >
            <option value="">ปีเกิด</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      <input type="number" name="age"  placeholder="อายุ" min={1} value={formData.age} onChange={handleChange} className="input-field"/>
      <input type="text" name="nationality"  placeholder="สัญชาติ" value={formData.nationality} onChange={handleChange} className="input-field"/>
      <input type="text" name="race"  placeholder="เชื้อชาติ" value={formData.race} onChange={handleChange} className="input-field"/>
      <input type="text" name="religion"  placeholder="ศาสนา" value={formData.religion} onChange={handleChange} className="input-field"/>
    </div>
  </section>

{/* ปริญญาตรี */}
<section className="space-y-4">
  <h2 className="text-2xl font-semibold border-b pb-2">ปริญญาตรี</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="text"
      name="bachelor_degree"
      placeholder="หลักสูตร"
      value={formData.bachelor_degree}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="bachelor_degree_major"
      placeholder="สาขา"
      value={formData.bachelor_degree_major}
      onChange={handleChange}
      className={`input-field`}
    />

    <input
      type="number"
      name="bachelor_degree_KU_batch"
      min={1}
      placeholder="รุ่น KU"
      value={formData.bachelor_degree_KU_batch}
      onChange={handleChange}
      className={`input-field`}
    />

    <input
      type="number"
      name="bachelor_degree_AS_batch"
      min={1}
      placeholder="รุ่น ศวท."
      value={formData.bachelor_degree_AS_batch}
      onChange={handleChange}
      className={`input-field`}
    />

    <input
      type="number"
      name="bachelor_degree_start_yaer"
      min={2400}
      max={3000}
      placeholder="ปีเริ่ม (พ.ศ.)"
      value={formData.bachelor_degree_start_yaer}
      onChange={handleChange}
      className={`input-field`}
    />

    <input
      type="number"
      
      name="bachelor_degree_end_yaer"
      min={2400}
      max={3000}
      placeholder="ปีจบ (พ.ศ.)"
      value={formData.bachelor_degree_end_yaer}
      onChange={handleChange}
      className={`input-field`}
    />
  </div>
</section>

{/* ปริญญาโท */}
<section className="space-y-4">
  <h2 className="text-2xl font-semibold border-b pb-2">ปริญญาโท</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="text"
      name="master_degree"
      placeholder="หลักสูตร"
      value={formData.master_degree}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="master_degree_major"
      placeholder="สาขา"
      value={formData.master_degree_major}
      onChange={handleChange}
      className={`input-field`}
    />

    <input
      type="number"
      name="master_degree_KU_batch"
      min={1}
      placeholder="รุ่น KU"
      value={formData.master_degree_KU_batch}
      onChange={handleChange}
      className={`input-field`}
    />

    <input
      type="number"
      name="master_degree_AS_batch"
      min={1}
      placeholder="รุ่น ศวท."
      value={formData.master_degree_AS_batch}
      onChange={handleChange}
      className={`input-field`}
    />

    <input
      type="number"
      name="master_degree_start_yaer"
      min={2400}
      max={3000}
      placeholder="ปีเริ่ม (พ.ศ.)"
      value={formData.master_degree_start_yaer}
      onChange={handleChange}
      className={`input-field`}
    />

    <input
      type="number"
      name="master_degree_end_yaer"
      min={2400}
      max={3000}
      placeholder="ปีจบ (พ.ศ.)"
      value={formData.master_degree_end_yaer}
      onChange={handleChange}
      className={`input-field`}
    />
  </div>
</section>

{/* ปริญญาเอก */}
<section className="space-y-4">
  <h2 className="text-2xl font-semibold border-b pb-2">ปริญญาเอก</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="text"
      name="doctoral_degree"
      placeholder="หลักสูตร"
      value={formData.doctoral_degree}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="doctoral_degree_major"
      placeholder="สาขา"
      value={formData.doctoral_degree_major}
      onChange={handleChange}
      className={`input-field`}
    />

    <input
      type="number"
      name="doctoral_degree_KU_batch"
      min={1}
      placeholder="รุ่น KU"
      value={formData.doctoral_degree_KU_batch}
      onChange={handleChange}
      className={`input-field`}
    />

    <input
      type="number"
      name="doctoral_degree_AS_batch"
      min={1}
      placeholder="รุ่น ศวท."
      value={formData.doctoral_degree_AS_batch}
      onChange={handleChange}
      className={`input-field`}
    />

    <input
      type="number"
      name="doctoral_degree_start_yaer"
      min={2400}
      max={3000}
      placeholder="ปีเริ่ม (พ.ศ.)"
      value={formData.doctoral_degree_start_yaer}
      onChange={handleChange}
      className={`input-field`}
    />

    <input
      type="number"
      name="doctoral_degree_end_yaer"
      min={2400}
      max={3000}
      placeholder="ปีจบ (พ.ศ.)"
      value={formData.doctoral_degree_end_yaer}
      onChange={handleChange}
      className={`input-field`}
    />
  </div>
</section>




  {/* ที่อยู่ปัจจุบัน */}
  <section className="space-y-4">
    <h2 className="text-2xl font-semibold border-b pb-2">ที่อยู่ปัจจุบัน</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input  type="text" name="homeNo" placeholder="บ้านเลขที่" value={formData.homeNo} onChange={handleChange} className="input-field"/>
      <input type="text" name="homeVillageNo" placeholder="หมู่" value={formData.homeVillageNo} onChange={handleChange} className="input-field"/>
      <input type="text" name="homeVillageName" placeholder="หมู่บ้าน" value={formData.homeVillageName} onChange={handleChange} className="input-field"/>
      <input type="text" name="homeAlley" placeholder="ซอย" value={formData.homeAlley} onChange={handleChange} className="input-field"/>
      <input type="text" name="homeStreet" placeholder="ถนน" value={formData.homeStreet} onChange={handleChange} className="input-field"/>
      <input type="text" name="homeSubdistrict" placeholder="ตำบล/แขวง" value={formData.homeSubdistrict} onChange={handleChange} className="input-field"/>
      <input type="text" name="homeDistrict" placeholder="อำเภอ/เขต" value={formData.homeDistrict} onChange={handleChange} className="input-field"/>
      <input  type="text" name="homeProvince" placeholder="จังหวัด" value={formData.homeProvince} onChange={handleChange} className="input-field"/>
      <input  type="text" name="homeZipcode" placeholder="รหัสไปรษณีย์" value={formData.homeZipcode} onChange={handleChange} className="input-field"/>
      <input type="text" name="homePhone" placeholder="เบอร์โทรบ้าน" value={formData.homePhone} onChange={handleChange} className="input-field"/>
    </div>
  </section>

  {/* สถานที่ทำงาน */}
<section className="space-y-4">
  <h2 className="text-2xl font-semibold border-b pb-2">สถานที่ทำงาน</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      type="text"
      name="workNo"
      placeholder="บ้านเลขที่"
      value={formData.workNo}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="workVillageNo"
      placeholder="หมู่"
      value={formData.workVillageNo}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="workVillageName"
      placeholder="หมู่บ้าน"
      value={formData.workVillageName}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="workAlley"
      placeholder="ซอย"
      value={formData.workAlley}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="workStreet"
      placeholder="ถนน"
      value={formData.workStreet}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="workSubdistrict"
      placeholder="ตำบล/แขวง"
      value={formData.workSubdistrict}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="workDistrict"
      placeholder="อำเภอ/เขต"
      value={formData.workDistrict}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="workProvince"
      placeholder="จังหวัด"
      value={formData.workProvince}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="workZipcode"
      placeholder="รหัสไปรษณีย์"
      value={formData.workZipcode}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="workPhone"
      placeholder="เบอร์โทรที่ทำงาน"
      value={formData.workPhone}
      onChange={handleChange}
      className="input-field"
    />
    <input
      type="text"
      name="workFax"
      placeholder="โทรสาร"
      value={formData.workFax}
      onChange={handleChange}
      className="input-field"
    />
  </div>
</section>


  {/* ช่องทางติดต่อ */}
  <section className="space-y-4">
    <h2 className="text-2xl font-semibold border-b pb-2">ช่องทางติดต่อ</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <select  name="contact_preference" value={formData.contact_preference} onChange={handleChange} className="input-field">
        <option value="">ช่องทางติดต่อหลัก</option>
        {contactPreferenceSelect.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
      </select>
      <input  type="text" name="phone_number" placeholder="เบอร์มือถือ" value={formData.phone_number} onChange={handleChange} className="input-field"/>
      <input  type="email" name="contact_email" placeholder="อีเมล" value={formData.contact_email} onChange={handleChange} className="input-field"/>
      <input type="text" name="line_id" placeholder="Line ID" value={formData.line_id} onChange={handleChange} className="input-field"/>
      <input type="text" name="facebook" placeholder="Facebook" value={formData.facebook} onChange={handleChange} className="input-field"/>
    </div>
  </section>

{/* ประเภทสมาชิก */}
<section className="space-y-4">
  <h2 className="text-2xl font-semibold border-b pb-2">ประเภทสมาชิก</h2>

  {/* กล่องรายละเอียดประเภทสมาชิก */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* สมาชิกสามัญ */}
    <div className="p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-blue-700">สมาชิกสามัญ ประเภทที่ 1</h3>
      <p className="text-gray-600 mt-2">
        <span className="font-medium">คุณสมบัติ:</span>บุคคลที่สำเร็จการศีกษามาไม่เกิน 1 ปีการศึกษา นับจากวันที่สำเร็จการศึกษาจนถึงวันที่สมัครเป็นสมาชิก<br />
        <span className="font-medium">ค่าลงทะเบียน:</span> 100 บาท<br />
        <span className="font-medium">ระยะเวลาการเป็นสมาชิก:</span>ตลอดชีพ
      </p>
    </div>

    {/* สมาชิกวิสามัญ */}
    <div className="p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-green-700">สมาชิกสามัญ ประเภทที่ 2</h3>
      <p className="text-gray-600 mt-2">
        <span className="font-medium">คุณสมบัติ:</span>บุคคลที่สำเร็จการศีกษามาไม่เกิน 1 ปีการศึกษา นับจากวันที่สำเร็จการศึกษาจนถึงวันที่สมัครเป็นสมาชิก<br />
        <span className="font-medium">ค่าลงทะเบียน:</span> 300 บาท<br />
        <span className="font-medium">ระยะเวลาการเป็นสมาชิก:</span> ตลอดชีพ
      </p>
    </div>

    {/* สมาชิกกิตติมศักดิ์ */}
    <div className="p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-purple-700">สมาชิกวิสามัญ</h3>
      <p className="text-gray-600 mt-2">
        <span className="font-medium">คุณสมบัติ:</span>บุลคลที่เคยปฏิบัติหรือสำเร็จการศึกษาในหลักสูตรเฉพาะด้าน<br />
        <span className="font-medium">ค่าลงทะเบียน:</span> 300 บาท<br />
        <span className="font-medium">ระยะเวลาการเป็นสมาชิก:</span>ตลอดชีพ
      </p>
    </div>
  </div>

  {/* Dropdown เลือกประเภทสมาชิก */}
  <select
  required
    name="member_type"
    value={formData.member_type}
    onChange={handleChange}
    className="input-field mt-4"
  >
    <option value="">เลือกประเภทสมาชิก</option>
    {memberTypeSelect.map((m) => (
      <option key={m.value} value={m.value}>
        {m.label}
      </option>
    ))}
  </select>

  {/* อัปโหลดสลิปโอนเงิน */}
  <div className="flex items-center gap-4 mt-4">
    <span className="w-1/5">เลือกรูปสลิปเงินโอน<br/>(ขนาดไม่เกิน2MB)</span>
    <input
    required
      type="file"
      name="slip"
      onChange={handleChangeFile}
      className="input-field mt-1"
      id="slipInput"
    />
  </div>
</section>


{/* แจ้งเตือน */}
  {alert.msg && <AlertMessage type={alert.type} msg={alert.msg} clear={() => setAlert({ type: "", msg: "" })}/>}
  <div className="text-center mt-6">
    <button
    disabled={loading}
     type="submit" className="cursor-pointer bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transition-transform duration-200">
     {loading ? 'กำลังส่งแบบสมัคร...' : 'ส่งแบบมัคร'}
    </button>
  </div>
</form>

</>
  );
}
