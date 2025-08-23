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
    bachelor_degree_major: "",
    bachelor_degree_KU_batch: "",
    bachelor_degree_AS_batch: "",
    bachelor_degree_start_yaer: "",
    bachelor_degree_end_yaer: "",

    // 🟢 ปริญญาโท
    master_degree_major: "",
    master_degree_KU_batch: "",
    master_degree_AS_batch: "",
    master_degree_start_yaer: "",
    master_degree_end_yaer: "",

    // 🟢 ปริญญาเอก
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
  };

const prefixSelect = [
  {value:'นาย' , label : "นาย"} ,
  {value:'นาง' , label : "นาง"} ,
  {value:'นางสาว' , label : "นางสาว"} ,
  {value:'อื่นๆ' , label : "อื่นๆ"} ,
]

  const bachelorSelect = [
  { value: "บธ.บ. (การจัดการ)", label: "บธ.บ. (การจัดการ)" },
  { value: "บธ.บ. (การจัดการ) ภาคพิเศษ", label: "บธ.บ. (การจัดการ) ภาคพิเศษ" },
  { value: "บธ.บ. (การตลาด)", label: "บธ.บ. (การตลาด)" },
  { value: "บธ.บ. (การตลาด) ภาคพิเศษ", label: "บธ.บ. (การตลาด) ภาคพิเศษ" },
  { value: "บธ.บ. (การบัญชีบริหาร/การบัญชี)", label: "บธ.บ. (การบัญชีบริหาร/การบัญชี)" },
  { value: "บธ.บ. (การบัญชีบริหาร/การบัญชี) ภาคพิเศษ", label: "บธ.บ. (การบัญชีบริหาร/การบัญชี) ภาคพิเศษ" },
  { value: "วท.บ. (วิทยาศาสตร์ทั่วไป)", label: "วท.บ. (วิทยาศาสตร์ทั่วไป)" },
  { value: "วท.บ. (วิทยาศาสตร์ชีวภาพ)", label: "วท.บ. (วิทยาศาสตร์ชีวภาพ)" },
  { value: "วท.บ. (เคมี)", label: "วท.บ. (เคมี)" },
  { value: "วท.บ. (ฟิสิกส์)", label: "วท.บ. (ฟิสิกส์)" },
  { value: "วท.บ. (จุลชีววิทยา)", label: "วท.บ. (จุลชีววิทยา)" },
  { value: "วท.บ. (วิทยาการคอมพิวเตอร์)", label: "วท.บ. (วิทยาการคอมพิวเตอร์)" },
  { value: "วท.บ. (วิทยาการคอมพิวเตอร์) ภาคพิเศษ", label: "วท.บ. (วิทยาการคอมพิวเตอร์) ภาคพิเศษ" },
  { value: "วท.บ. (เทคโนโลยีสารสนเทศ)", label: "วท.บ. (เทคโนโลยีสารสนเทศ)" },
  { value: "วท.บ. (เทคโนโลยีสารสนเทศ) ภาคพิเศษ", label: "วท.บ. (เทคโนโลยีสารสนเทศ) ภาคพิเศษ" },
  { value: "วท.บ. (คณิตศาสตร์ประยุกต์)", label: "วท.บ. (คณิตศาสตร์ประยุกต์)" },
  { value: "วท.บ. (พฤกษนวัตกรรม)", label: "วท.บ. (พฤกษนวัตกรรม)" },
  { value: "ศศ.บ. (ภาษาอังกฤษ)", label: "ศศ.บ. (ภาษาอังกฤษ)" },
  { value: "ศศ.บ. (ภาษาอังกฤษ) ภาคพิเศษ", label: "ศศ.บ. (ภาษาอังกฤษ) ภาคพิเศษ" },
  { value: "ศศ.บ. (ภาษาตะวันออก)", label: "ศศ.บ. (ภาษาตะวันออก)" },
  { value: "ศศ.บ. (ภาษาจีนธุรกิจ)", label: "ศศ.บ. (ภาษาจีนธุรกิจ)" },
  { value: "ศศ.บ. (รัฐศาสตร์)", label: "ศศ.บ. (รัฐศาสตร์)" },
  { value: "ร.บ. (การเมืองและการปกครอง)", label: "ร.บ. (การเมืองและการปกครอง)" } ,
];

const masterSelect = [
  { value: "วท.ม. (นิติวิทยาศาสตร์)", label: "วท.ม. (นิติวิทยาศาสตร์)" },
  { value: "วท.ม. (นิติวิทยาศาสตร์) ภาคพิเศษ", label: "วท.ม. (นิติวิทยาศาสตร์) ภาคพิเศษ" },
  { value: "วท.ม. (พฤกษ์เศรษฐกิจ)", label: "วท.ม. (พฤกษ์เศรษฐกิจ)" },
  { value: "วท.ม. (วิทยาการพืช)", label: "วท.ม. (วิทยาการพืช)" },
  { value: "วท.ม. (วิทยาศาสตร์และเทคโนโลยีสิ่งแวดล้อม)", label: "วท.ม. (วิทยาศาสตร์และเทคโนโลยีสิ่งแวดล้อม)" },
  { value: "วท.ม. (ชีวผลิตภัณฑ์)", label: "วท.ม. (ชีวผลิตภัณฑ์)" },
  { value: "วท.ม. (จุลชีววิทยา)", label: "วท.ม. (จุลชีววิทยา)" },
  { value: "วท.ม. (เคมี)", label: "วท.ม. (เคมี)" },
  { value: "ศศ.ม. (รัฐศาสตร์)", label: "ศศ.ม. (รัฐศาสตร์)" } , 
  { value: "", label: "ไม่มี" }
];

const doctoralSelect = [
  { value: "ปร.ด. (วิทยาศาสตร์ชีวผลิตภัณฑ์)", label: "ปร.ด. (วิทยาศาสตร์ชีวผลิตภัณฑ์)" } ,
  { value: "", label: "ไม่มี" }
];

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

  // 🟢 รวมที่อยู่เป็นสตริงเดียว ก่อนส่ง API
  const getFullHomeAddress = () => {
    const {
      homeNo,
      homeVillageNo,
      homeVillageName,
      homeAlley,
      homeStreet,
      homeSubdistrict,
      homeDistrict,
      homeProvince,
      homeZipcode,
    } = formData;

    return `เลขที่ ${homeNo} หมู่ ${homeVillageNo} หมู่บ้าน ${homeVillageName} ซ.${homeAlley} ถ.${homeStreet} ต./แขวง.${homeSubdistrict} อ./เขต.${homeDistrict} จ.${homeProvince} รหัสไปรษณีย์ ${homeZipcode}`;
  };

  const getFullWorkAddress = () => {
    const {
      workNo,
      workVillageNo,
      workVillageName,
      workAlley,
      workStreet,
      workSubdistrict,
      workDistrict,
      workProvince,
      workZipcode,
    } = formData;

    return `เลขที่ ${workNo} หมู่ ${workVillageNo} หมู่บ้าน ${workVillageName} ซ.${workAlley} ถ.${workStreet} ต./แขวง.${workSubdistrict} อ./เขต.${workDistrict} จ.${workProvince} รหัสไปรษณีย์${workZipcode}`;
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
            age: parseInt(formData.age) || null,
            nationality: formData.nationality,
            race: formData.race,
            religion: formData.religion,

            // การศึกษา: ปริญญาตรี
            bachelor_degree_major: formData.bachelor_degree_major || null,
            bachelor_degree_ku_batch: parseInt(formData.bachelor_degree_KU_batch) || null,
            bachelor_degree_as_batch: parseInt(formData.bachelor_degree_AS_batch) || null,
            bachelor_degree_start_year: parseInt(formData.bachelor_degree_start_yaer) || null, 
            bachelor_degree_end_year: parseInt(formData.bachelor_degree_end_yaer) || null,

            // ปริญญาโท
            master_degree_major: formData.master_degree_major || null,
            master_degree_ku_batch: parseInt(formData.master_degree_KU_batch) || null,
            master_degree_as_batch: parseInt(formData.master_degree_AS_batch) || null,
            master_degree_start_year: parseInt(formData.master_degree_start_yaer) || null,
            master_degree_end_year: parseInt(formData.master_degree_end_yaer) || null,

            // ปริญญาเอก
            doctoral_degree_major: formData.doctoral_degree_major || null,
            doctoral_degree_ku_batch: parseInt(formData.doctoral_degree_KU_batch) || null,
            doctoral_degree_as_batch: parseInt(formData.doctoral_degree_AS_batch) || null,
            doctoral_degree_start_year: parseInt(formData.doctoral_degree_start_yaer) || null,
            doctoral_degree_end_year: parseInt(formData.doctoral_degree_end_yaer) || null,
            
            current_home_place: fullHomeAddress,
            current_work_place: fullWorkAddress,

            // 🟢 ช่องทางติดต่อ
            contact_preference: formData.contact_preference,
            phone_number: formData.phone_number|| null,
            contact_email:formData.contact_email|| null,
            line_id: formData.line_id|| null,
            facebook:formData.facebook|| null,

            // 🟢 ประเภทสมาชิก
            member_type: formData.member_type,
          };
          try{
            const res= await fetch(`${API_URL}/member/register` , {
              method : 'post' ,
              headers : {
                 "Content-Type": "application/json",
              },
              body : JSON.stringify(payload)
            })
            const data = await res.json()
            if(!res.ok) throw new Error(data.message)
            setAlert({type : 'success' , msg : 'บันทึกการสมัครเรียบร้อย'})
            resetForm()
          }catch(err){
            setError(err.message)
            setAlert({type : 'error' , msg : err.message})
          }finally{
            setLoad(false)
          }

    }catch(err){
      console.log(err)
      setError(err)
    }
  };
return (
  <>
  <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-8">
  {/* ข้อมูลส่วนตัว */}
  <section className="space-y-4">
    <h2 className="text-2xl font-semibold border-b pb-2">ข้อมูลส่วนตัว</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" name="student_id" required placeholder="รหัสนักศึกษา" value={formData.student_id} onChange={handleChange} className="input-field"/>
      <select required name="prefix" value={formData.prefix} onChange={handleChange} className="input-field">
        <option value="">เลือกคำนำหน้า</option>
        {prefixSelect.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
      </select>
      {formData.prefix === "อื่นๆ" && <input type="text" required name="custom_prefix" placeholder="ระบุคำนำหน้า" value={formData.custom_prefix} onChange={handleChange} className="input-field"/>}
      <input type="text" name="first_name" placeholder="ชื่อ" required value={formData.first_name} onChange={handleChange} className="input-field"/>
      <input type="text" name="last_name" placeholder="นามสกุล" required value={formData.last_name} onChange={handleChange} className="input-field"/>
      <input type="text" name="old_fname" placeholder="ชื่อเดิม" value={formData.old_fname} onChange={handleChange} className="input-field"/>
      <input type="text" name="old_lname" placeholder="นามสกุลเดิม" value={formData.old_lname} onChange={handleChange} className="input-field"/>
       {/* วันเกิดแบบไทย */}
        <div className="flex gap-2">
          {/* วัน */}
          <select
            name="day"
            value={selectTH_birthDate.day}
            onChange={handleBirthDateChange}
            required
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
            required
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
            required
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
      <input type="number" name="age" required placeholder="อายุ" min={1} value={formData.age} onChange={handleChange} className="input-field"/>
      <input type="text" name="nationality" required placeholder="สัญชาติ" value={formData.nationality} onChange={handleChange} className="input-field"/>
      <input type="text" name="race" required placeholder="เชื้อชาติ" value={formData.race} onChange={handleChange} className="input-field"/>
      <input type="text" name="religion" required placeholder="ศาสนา" value={formData.religion} onChange={handleChange} className="input-field"/>
    </div>
  </section>

  {/* ปริญญาตรี */}
<section className="space-y-4">
  <h2 className="text-2xl font-semibold border-b pb-2">ปริญญาตรี</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <select
      name="bachelor_degree_major"
      required
      value={formData.bachelor_degree_major}
      onChange={handleChange}
      className="input-field"
    >
      <option value="">เลือกสาขา</option>
      {bachelorSelect.map((b) => (
        <option key={b.value} value={b.value}>{b.label}</option>
      ))}
    </select>

    <input
      type="number"
      required
      name="bachelor_degree_KU_batch"
      min={1}
      placeholder="รุ่น KU"
      value={formData.bachelor_degree_KU_batch}
      onChange={handleChange}
      className="input-field"
      disabled={!formData.bachelor_degree_major}
    />

    <input
      type="number"
      required
      name="bachelor_degree_AS_batch"
      min={1}
      placeholder="รุ่น ศวท."
      value={formData.bachelor_degree_AS_batch}
      onChange={handleChange}
      className="input-field"
      disabled={!formData.bachelor_degree_major}
    />

    <input
      type="number"
      required
      name="bachelor_degree_start_yaer"
      min={2400}
      max={3000}
      placeholder="ปีเริ่ม (พ.ศ.)"
      value={formData.bachelor_degree_start_yaer}
      onChange={handleChange}
      className="input-field"
      disabled={!formData.bachelor_degree_major}
    />

    <input
      type="number"
      required
      name="bachelor_degree_end_yaer"
      min={2400}
      max={3000}
      placeholder="ปีจบ (พ.ศ.)"
      value={formData.bachelor_degree_end_yaer}
      onChange={handleChange}
      className="input-field"
      disabled={!formData.bachelor_degree_major}
    />
  </div>
</section>

{/* ปริญญาโท */}
<section className="space-y-4">
  <h2 className="text-2xl font-semibold border-b pb-2">ปริญญาโท</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <select
      name="master_degree_major"
      value={formData.master_degree_major}
      onChange={handleChange}
      className="input-field"
    >
      <option value="">เลือกสาขา</option>
      {masterSelect.map((m) => (
        <option key={m.value} value={m.value}>{m.label}</option>
      ))}
    </select>

    <input
      type="number"
      name="master_degree_KU_batch"
      min={1}
      placeholder="รุ่น KU"
      value={formData.master_degree_KU_batch}
      onChange={handleChange}
      className="input-field"
      disabled={!formData.master_degree_major}
    />

    <input
      type="number"
      name="master_degree_AS_batch"
      min={1}
      placeholder="รุ่น ศวท."
      value={formData.master_degree_AS_batch}
      onChange={handleChange}
      className="input-field"
      disabled={!formData.master_degree_major}
    />

    <input
      type="number"
      name="master_degree_start_yaer"
      min={2400}
      max={3000}
      placeholder="ปีเริ่ม (พ.ศ.)"
      value={formData.master_degree_start_yaer}
      onChange={handleChange}
      className="input-field"
      disabled={!formData.master_degree_major}
    />

    <input
      type="number"
      name="master_degree_end_yaer"
      min={2400}
      max={3000}
      placeholder="ปีจบ (พ.ศ.)"
      value={formData.master_degree_end_yaer}
      onChange={handleChange}
      className="input-field"
      disabled={!formData.master_degree_major}
    />
  </div>
</section>

{/* ปริญญาเอก */}
<section className="space-y-4">
  <h2 className="text-2xl font-semibold border-b pb-2">ปริญญาเอก</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <select
      name="doctoral_degree_major"
      value={formData.doctoral_degree_major}
      onChange={handleChange}
      className="input-field"
    >
      <option value="">เลือกสาขา</option>
      {doctoralSelect.map((d) => (
        <option key={d.value} value={d.value}>{d.label}</option>
      ))}
    </select>

      <input
        type="number"
        name="doctoral_degree_KU_batch"
        min={1}
        placeholder="รุ่น KU"
        value={formData.doctoral_degree_KU_batch}
        onChange={handleChange}
        className="input-field"
        disabled={!formData.doctoral_degree_major}
      />

      <input
        type="number"
        name="doctoral_degree_AS_batch"
        min={1}
        placeholder="รุ่น ศวท."
        value={formData.doctoral_degree_AS_batch}
        onChange={handleChange}
        className="input-field"
        disabled={!formData.doctoral_degree_major}
      />

      <input
        type="number"
        name="doctoral_degree_start_yaer"
        min={2400}
        max={3000}
        placeholder="ปีเริ่ม (พ.ศ.)"
        value={formData.doctoral_degree_start_yaer}
        onChange={handleChange}
        className="input-field"
        disabled={!formData.doctoral_degree_major}
      />

      <input
        type="number"
        name="doctoral_degree_end_yaer"
        min={2400}
        max={3000}
        placeholder="ปีจบ (พ.ศ.)"
        value={formData.doctoral_degree_end_yaer}
        onChange={handleChange}
        className="input-field"
        disabled={!formData.doctoral_degree_major}
      />
  </div>
</section>


  {/* ที่อยู่ปัจจุบัน */}
  <section className="space-y-4">
    <h2 className="text-2xl font-semibold border-b pb-2">ที่อยู่ปัจจุบัน</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input required type="text" name="homeNo" placeholder="บ้านเลขที่" value={formData.homeNo} onChange={handleChange} className="input-field"/>
      <input type="text" name="homeVillageNo" placeholder="หมู่" value={formData.homeVillageNo} onChange={handleChange} className="input-field"/>
      <input type="text" name="homeVillageName" placeholder="หมู่บ้าน" value={formData.homeVillageName} onChange={handleChange} className="input-field"/>
      <input type="text" name="homeAlley" placeholder="ซอย" value={formData.homeAlley} onChange={handleChange} className="input-field"/>
      <input type="text" name="homeStreet" placeholder="ถนน" value={formData.homeStreet} onChange={handleChange} className="input-field"/>
      <input type="text" name="homeSubdistrict" placeholder="ตำบล/แขวง" value={formData.homeSubdistrict} onChange={handleChange} className="input-field"/>
      <input type="text" name="homeDistrict" placeholder="อำเภอ/เขต" value={formData.homeDistrict} onChange={handleChange} className="input-field"/>
      <input required type="text" name="homeProvince" placeholder="จังหวัด" value={formData.homeProvince} onChange={handleChange} className="input-field"/>
      <input required type="text" name="homeZipcode" placeholder="รหัสไปรษณีย์" value={formData.homeZipcode} onChange={handleChange} className="input-field"/>
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
      <select required name="contact_preference" value={formData.contact_preference} onChange={handleChange} className="input-field">
        <option value="">ช่องทางติดต่อหลัก</option>
        {contactPreferenceSelect.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
      </select>
      <input required type="text" name="phone_number" placeholder="เบอร์มือถือ" value={formData.phone_number} onChange={handleChange} className="input-field"/>
      <input required type="email" name="contact_email" placeholder="อีเมล" value={formData.contact_email} onChange={handleChange} className="input-field"/>
      <input type="text" name="line_id" placeholder="Line ID" value={formData.line_id} onChange={handleChange} className="input-field"/>
      <input type="text" name="facebook" placeholder="Facebook" value={formData.facebook} onChange={handleChange} className="input-field"/>
    </div>
  </section>

  {/* ประเภทสมาชิก */}
  <section className="space-y-4">
    <h2 className="text-2xl font-semibold border-b pb-2">ประเภทสมาชิก</h2>
    <select required name="member_type" value={formData.member_type} onChange={handleChange} className="input-field">
      <option value="">เลือกประเภทสมาชิก</option>
      {memberTypeSelect.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
    </select>
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
