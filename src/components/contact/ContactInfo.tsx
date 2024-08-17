import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import ContactInfoCard from "./ContactCard";

function ContactInfo() {
  return (
    <div className="space-y-6 ">
      <ContactInfoCard
        icon={<FaPhoneAlt />}
        title="Call Us"
        desc1="*1234 ### 456"
        desc2="*1234 ### 123"
      />
      <ContactInfoCard
        icon={<MdEmail />}
        title="E-Mail"
        desc1="*user1@gmail.com"
        desc2="*user2@gmail.com"
      />
      <ContactInfoCard
        icon={<FaLocationDot />}
        title="Address"
        desc1="37125 Maya Estate Dr, Victoria Road,"
        desc2="Warsaw, Poland - 234834"
      />
    </div>
  );
}

export default ContactInfo;
