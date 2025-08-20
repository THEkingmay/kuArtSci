import { useState } from "react";

export default function RegisterMemberForm() {

const prefixSelect = [
  {value:'นาย' , leble : "นาย"} ,
  {value:'นาง' , leble : "นาง"} ,
  {value:'นางสาว' , leble : "นางสาว"} ,
  {value:'อื่นๆ' , leble : "อื่นๆ"} ,
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
  { value: "ร.บ. (การเมืองและการปกครอง)", label: "ร.บ. (การเมืองและการปกครอง)" }
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
  { value: "ศศ.ม. (รัฐศาสตร์)", label: "ศศ.ม. (รัฐศาสตร์)" }
];

const doctoralSelect = [
  { value: "ปร.ด. (วิทยาศาสตร์ชีวผลิตภัณฑ์)", label: "ปร.ด. (วิทยาศาสตร์ชีวผลิตภัณฑ์)" }
];

const contactPreferenceSelect = [
  {value :"ที่อยู่บ้าน" , lebel :"ที่อยู่บ้าน"}
  ,{value :"ที่อยู่ที่ทำงาน" , lebel :"ที่อยู่ที่ทำงาน"}
]

const memberTypeSelect = [
  {value :"สมาชิกสามัญ ประเภท1" , lebel :"สมาชิกสามัญ ประเภท1"} ,
  {value :"สมาชิกสามัญ ประเภท2" , lebel :"สมาชิกสามัญ ประเภท2"} , 
  {value :"สมาชิกวิสามัญ" , lebel :"สมาชิกวิสามัญ"}
]

  const [formData, setFormData] = useState({
    // 🟢 ข้อมูลส่วนตัว
    student_id : "" ,
    prefix : "" ,
    custom_prefix: "" ,
    first_name: "" , 
    last_name: "" , 
    old_fname: "" ,
    old_lname: "" ,
    birth_date :"",
    age:"",
    nationality :'',
    race :"",
    religion: "",

    // 🟢 ปริญญาตรี
    bachelor_degree_major :"",
    bachelor_degree_KU_batch :"",
    bachelor_degree_AS_batch :"",
    bachelor_degree_start_yaer :"" ,
    bachelor_degree_end_yaer :"" , 

    // 🟢 ปริญญาโท
    master_degree_major :"",
    master_degree_KU_batch :"",
    master_degree_AS_batch :"",
    master_degree_start_yaer :"" ,
    master_degree_end_yaer :"" , 

    // 🟢 ปริญญาเอก
    doctoral_degree_major :"",
    doctoral_degree_KU_batch :"",
    doctoral_degree_AS_batch :"",
    doctoral_degree_start_yaer :"" ,
    doctoral_degree_end_yaer :"" , 

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
  });

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

    return `เลขที่ ${homeNo} หมู่ ${homeVillageNo} หมู่บ้าน ${homeVillageName} ซ.${homeAlley} ถ.${homeStreet} ต.${homeSubdistrict} อ.${homeDistrict} จ.${homeProvince} ${homeZipcode}`;
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

    return `เลขที่ ${workNo} หมู่ ${workVillageNo} หมู่บ้าน ${workVillageName} ซ.${workAlley} ถ.${workStreet} ต.${workSubdistrict} อ.${workDistrict} จ.${workProvince} ${workZipcode}`;
  };

  // 🟢 เมื่อส่งฟอร์ม
  const handleSubmit = (e) => {
    e.preventDefault();

    // รวมที่อยู่บ้านและที่อยู่ที่ทำงาน
    const fullHomeAddress = getFullHomeAddress();
    const fullWorkAddress = getFullWorkAddress();

    // สร้าง payload สำหรับส่ง API
    const payload = {
      ...formData,
      current_home_place: fullHomeAddress,
      current_work_place: fullWorkAddress,
    };

    console.log("📌 ส่งข้อมูล:", payload);
    alert("บันทึกข้อมูลสำเร็จ! 🎉");

    // TODO: เรียก API POST -> /member_registrations
  };
return (
    <form onSubmit={handleSubmit}>
      <h2>ข้อมูลส่วนตัว</h2>
      <input type="text" name="student_id" placeholder="รหัสนักศึกษา" value={formData.student_id} onChange={handleChange} />
      <select name="prefix" value={formData.prefix} onChange={handleChange}>
        <option value="">เลือกคำนำหน้า</option>
        {prefixSelect.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
      </select>
      {formData.prefix === "อื่นๆ" && <input type="text" name="custom_prefix" placeholder="ระบุคำนำหน้า" value={formData.custom_prefix} onChange={handleChange} />}
      <input type="text" name="first_name" placeholder="ชื่อ" value={formData.first_name} onChange={handleChange} />
      <input type="text" name="last_name" placeholder="นามสกุล" value={formData.last_name} onChange={handleChange} />
      <input type="text" name="old_fname" placeholder="ชื่อเดิม" value={formData.old_fname} onChange={handleChange} />
      <input type="text" name="old_lname" placeholder="นามสกุลเดิม" value={formData.old_lname} onChange={handleChange} />
      <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} />
      <input type="number" name="age" placeholder="อายุ" value={formData.age} onChange={handleChange} />
      <input type="text" name="nationality" placeholder="สัญชาติ" value={formData.nationality} onChange={handleChange} />
      <input type="text" name="race" placeholder="เชื้อชาติ" value={formData.race} onChange={handleChange} />
      <input type="text" name="religion" placeholder="ศาสนา" value={formData.religion} onChange={handleChange} />

      <h2>ปริญญาตรี</h2>
      <select name="bachelor_degree_major" value={formData.bachelor_degree_major} onChange={handleChange}>
        <option value="">เลือกสาขา</option>
        {bachelorSelect.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
      </select>
      <input type="text" name="bachelor_degree_KU_batch" placeholder="รุ่น KU" value={formData.bachelor_degree_KU_batch} onChange={handleChange} />
      <input type="text" name="bachelor_degree_AS_batch" placeholder="รุ่น AS" value={formData.bachelor_degree_AS_batch} onChange={handleChange} />
      <input type="text" name="bachelor_degree_start_yaer" placeholder="ปีเริ่ม" value={formData.bachelor_degree_start_yaer} onChange={handleChange} />
      <input type="text" name="bachelor_degree_end_yaer" placeholder="ปีจบ" value={formData.bachelor_degree_end_yaer} onChange={handleChange} />

      <h2>ปริญญาโท</h2>
      <select name="master_degree_major" value={formData.master_degree_major} onChange={handleChange}>
        <option value="">เลือกสาขา</option>
        {masterSelect.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
      </select>
      <input type="text" name="master_degree_KU_batch" placeholder="รุ่น KU" value={formData.master_degree_KU_batch} onChange={handleChange} />
      <input type="text" name="master_degree_AS_batch" placeholder="รุ่น AS" value={formData.master_degree_AS_batch} onChange={handleChange} />
      <input type="text" name="master_degree_start_yaer" placeholder="ปีเริ่ม" value={formData.master_degree_start_yaer} onChange={handleChange} />
      <input type="text" name="master_degree_end_yaer" placeholder="ปีจบ" value={formData.master_degree_end_yaer} onChange={handleChange} />

      <h2>ปริญญาเอก</h2>
      <select name="doctoral_degree_major" value={formData.doctoral_degree_major} onChange={handleChange}>
        <option value="">เลือกสาขา</option>
        {doctoralSelect.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
      </select>
      <input type="text" name="doctoral_degree_KU_batch" placeholder="รุ่น KU" value={formData.doctoral_degree_KU_batch} onChange={handleChange} />
      <input type="text" name="doctoral_degree_AS_batch" placeholder="รุ่น AS" value={formData.doctoral_degree_AS_batch} onChange={handleChange} />
      <input type="text" name="doctoral_degree_start_yaer" placeholder="ปีเริ่ม" value={formData.doctoral_degree_start_yaer} onChange={handleChange} />
      <input type="text" name="doctoral_degree_end_yaer" placeholder="ปีจบ" value={formData.doctoral_degree_end_yaer} onChange={handleChange} />

      <h2>ที่อยู่ปัจจุบัน</h2>
      <input type="text" name="homeNo" placeholder="บ้านเลขที่" value={formData.homeNo} onChange={handleChange} />
      <input type="text" name="homeVillageNo" placeholder="หมู่" value={formData.homeVillageNo} onChange={handleChange} />
      <input type="text" name="homeVillageName" placeholder="หมู่บ้าน" value={formData.homeVillageName} onChange={handleChange} />
      <input type="text" name="homeAlley" placeholder="ซอย" value={formData.homeAlley} onChange={handleChange} />
      <input type="text" name="homeStreet" placeholder="ถนน" value={formData.homeStreet} onChange={handleChange} />
      <input type="text" name="homeSubdistrict" placeholder="ตำบล" value={formData.homeSubdistrict} onChange={handleChange} />
      <input type="text" name="homeDistrict" placeholder="อำเภอ" value={formData.homeDistrict} onChange={handleChange} />
      <input type="text" name="homeProvince" placeholder="จังหวัด" value={formData.homeProvince} onChange={handleChange} />
      <input type="text" name="homeZipcode" placeholder="รหัสไปรษณีย์" value={formData.homeZipcode} onChange={handleChange} />
      <input type="text" name="homePhone" placeholder="เบอร์โทรบ้าน" value={formData.homePhone} onChange={handleChange} />

      <h2>สถานที่ทำงาน</h2>
      <input type="text" name="workNo" placeholder="บ้านเลขที่" value={formData.workNo} onChange={handleChange} />
      <input type="text" name="workVillageNo" placeholder="หมู่" value={formData.workVillageNo} onChange={handleChange} />
      <input type="text" name="workVillageName" placeholder="หมู่บ้าน" value={formData.workVillageName} onChange={handleChange} />
      <input type="text" name="workAlley" placeholder="ซอย" value={formData.workAlley} onChange={handleChange} />
      <input type="text" name="workStreet" placeholder="ถนน" value={formData.workStreet} onChange={handleChange} />
      <input type="text" name="workSubdistrict" placeholder="ตำบล" value={formData.workSubdistrict} onChange={handleChange} />
      <input type="text" name="workDistrict" placeholder="อำเภอ" value={formData.workDistrict} onChange={handleChange} />
      <input type="text" name="workProvince" placeholder="จังหวัด" value={formData.workProvince} onChange={handleChange} />
      <input type="text" name="workZipcode" placeholder="รหัสไปรษณีย์" value={formData.workZipcode} onChange={handleChange} />
      <input type="text" name="workPhone" placeholder="เบอร์โทรที่ทำงาน" value={formData.workPhone} onChange={handleChange} />
      <input type="text" name="workFax" placeholder="Fax" value={formData.workFax} onChange={handleChange} />

      <h2>ช่องทางติดต่อ</h2>
      <select name="contact_preference" value={formData.contact_preference} onChange={handleChange}>
        <option value="">ช่องทางติดต่อหลัก</option>
        {contactPreferenceSelect.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
      </select>
      <input type="text" name="phone_number" placeholder="เบอร์มือถือ" value={formData.phone_number} onChange={handleChange} />
      <input type="email" name="contact_email" placeholder="อีเมล" value={formData.contact_email} onChange={handleChange} />
      <input type="text" name="line_id" placeholder="Line ID" value={formData.line_id} onChange={handleChange} />
      <input type="text" name="facebook" placeholder="Facebook" value={formData.facebook} onChange={handleChange} />

      <h2>ประเภทสมาชิก</h2>
      <select name="member_type" value={formData.member_type} onChange={handleChange}>
        <option value="">เลือกประเภทสมาชิก</option>
        {memberTypeSelect.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
      </select>

      <button type="submit">บันทึกข้อมูล</button>
    </form>
  );
}
