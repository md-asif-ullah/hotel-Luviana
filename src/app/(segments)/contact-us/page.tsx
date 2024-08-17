import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/forms/ContactForm";

function ContactUs() {
  return (
    <div className="bg-white h-full px-4 md:px-10 xl:px-20 py-10">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-10 xl:space-x-20 bg-white">
        <div className="pt-10 mb-5 lg:mb-0 lg:w-1/2 mx-5 md:mx-auto">
          <section className="text-start max-w-md mx-auto lg:mx-0">
            <h3 className="text-4xl text-black font-medium">
              Contact Information
            </h3>
            <p className="text-gray-600 text-sm mt-4">
              Feel free to contact us directly if you have any inquiries
              regarding accommodation. We would love to have you stay with us!
            </p>
          </section>
          {/* Contact Form Section */}
          <section className="mt-5">
            <ContactForm />
          </section>
        </div>

        {/* Contact Info Section */}
        <section className="lg:w-1/2 mt-10">
          <ContactInfo />
        </section>
      </div>

      {/* Google Map Embed */}

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58563.314796292696!2d91.14204189788494!3d23.45299034155169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37547f249815015d%3A0x549a77e542115f77!2sCumilla!5e0!3m2!1sen!2sbd!4v1723896942081!5m2!1sen!2sbd"
        width="100%"
        height="500"
        loading="lazy"
        className="mt-10 md:mt-20 border-0"
      ></iframe>
    </div>
  );
}

export default ContactUs;
