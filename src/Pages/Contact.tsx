import { useEffect, useState } from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Input
} from "@/components/ui/input";
import {
  Textarea
} from "@/components/ui/textarea";
import {
  Button
} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message Submitted Successfully.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="bg-background min-h-screen px-2 sm:px-6 md:px-12 lg:px-16">
      {/* Header Banner */}
      <div className="sm:py-10 py-5 border-b">
        <div className="container mx-auto px-4">
          <h1 className="sm:text-4xl text-3xl font-bold text-center">Contact Us</h1>
          <p className="text-center sm:text-base text-xs  text-gray-500 mt-4 max-w-2xl mx-auto">
            We're here to help! Reach out to us with any questions, concerns, or feedback about our products or services.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
            <div className="sm:space-y-6 space-y-2">
              {/* Cards */}
              {[{
                icon: <MapPin className="h-6 w-6 text-white" />,
                title: "Our Location",
                lines: ["Sector 3 Saket, New Delhi, 110017"]
              }, {
                icon: <Phone className="h-6 w-6 text-white" />,
                title: "Phone Number",
                lines: ["+91 8404973614"]
              }, {
                icon: <Mail className="h-6 w-6 text-white" />,
                title: "Email Address",
                lines: ["rohankumar993985@gmail.com"]
              }, {
                icon: <Clock className="h-6 w-6 text-white" />,
                title: "Working Hours",
                lines: ["Monday - Friday: 9:00 AM - 8:00 PM", "Saturday - Sunday: 10:00 AM - 6:00 PM"]
              }].map((item, idx) => (
                <Card key={idx} className="rounded-[5px] shadow-none">
                  <CardContent className="sm:px-6 px-3">
                    <div className="flex items-start">
                      <div className="bg-orange-500 p-3 rounded-full mr-4">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        {item.lines.map((line, i) => (
                          <p key={i} className="text-gray-500 mt-1">{line}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-span-1 lg:col-span-2">
            <Card className="border shadow-none rounded-[5px]">
              <div className="sm:px-6 px-3">
                <h3 className="text-2xl font-semibold">Send Us A Message</h3>
              </div>
              <CardContent className="sm:p-6 p-3">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required className="rounded-[5px] placeholder:text-gray-500 shadow-none" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Your Email</label>
                      <Input id="email" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Enter your email" required className="rounded-[5px] placeholder:text-gray-500 shadow-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {["general", "product", "order", "return", "feedback"].map(option => (
                          <SelectItem key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1).replace(/_/g, ' ')}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Your Message</label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Type your message here..." required className="min-h-32 rounded-[5px] placeholder:text-gray-500 shadow-none" />
                  </div>
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-2 rounded-[5px] flex items-center">
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>


        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What are your shipping options?",
                answer: "We offer standard, express, and free shipping orders. Delivery times vary based on your location."
              },
              {
                question: "How do I return an item?",
                answer: "Returns can be initiated within 30 days of purchase. Visit your order history to start a return process."
              },
              {
                question: "Do you offer international shipping?",
                answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location."
              },
              {
                question: "How can I track my order?",
                answer: "You can track your order through your account dashboard or using the tracking link sent in your shipping confirmation email."
              }
            ].map((faq, i) => (
              <Card key={i} className="border shadow-none rounded-[5px]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                  <p className="text-gray-500">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>


      {/* Map */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-6">Our Location</h2>
        <div className="h-96 bg-gray-200 w-full rounded-lg overflow-hidden flex items-center justify-center text-gray-500">
          <div className="h-96 w-full rounded-[5px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28041.98848909871!2d77.19240465350777!3d28.532247699743554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1f5c052e5c5%3A0x5370da1a66ac27f4!2sNew%20Delhi%2C%20Delhi%20110017!5e0!3m2!1sen!2sin!4v1746876038932!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-50 dark:bg-[#1c1917] py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-3">Subscribe to Our Newsletter</h2>
            <p className="text-gray-500 mb-6">Stay updated with our latest offers, new arrivals, and exclusive discounts.</p>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <Input placeholder="Enter your email address" className="max-w-md rounded-[5px] shadow-none" />
              <Button className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-2 rounded-[5px] w-fit">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
