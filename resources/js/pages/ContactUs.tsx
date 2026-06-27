import { Head } from '@inertiajs/react';
import { Mail, MapPin, PhoneCall, Smartphone } from 'lucide-react';
import { useState } from 'react';

const contactItems = [
    {
        id: 'phone',
        icon: <PhoneCall />,
        title: 'Call Us',
        value: '+251 937 848785',
        subtitle: '24/7 Reception Desk',
        href: 'tel:+251937848785',
    },
    {
        id: 'email',
        icon: <Mail />,
        title: 'Email Us',
        value: 'info@genethotel.com',
        subtitle: 'We reply within 24 hours',
        href: 'mailto:info@genethotel.com',
    },
    {
        id: 'location',
        icon: <MapPin />,
        title: 'Visit Us',
        value: 'Awash 7 kilo, Ethiopia',
        subtitle: 'Near Menehariya bus station',
        href: 'https://maps.app.goo.gl/kQyyqnQ7wRXapRRq7',
    },
];

const socialLinks = [
    { icon: '📘', label: 'Facebook', href: '#' },
    { icon: '📸', label: 'Instagram', href: '#' },
    { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/251937848785' },
];

const faqs = [
    { q: 'Do you offer free Wi-Fi?', a: 'Yes! Free high-speed Wi-Fi is available throughout the hotel.' },
    { q: 'Is parking available?', a: 'Yes, we offer free and secure parking for all guests.' },
    { q: 'What time is check-in/check-out?', a: 'Check-in is from 12:00 PM and check-out is by 11:00 AM.' },
    { q: 'Can I book via phone?', a: 'Absolutely! Call our 24/7 reception desk to make a reservation.' },
];

export default function ContactUs() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);

    const handleCopyPhone = () => {
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText('+251937848785').catch(() => { });
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#F9FAFA] font-sans text-[#36413E] pb-20">
            <Head title="Genet Hotel – Contact Us" />

            {/* Hero */}
            <div className="relative bg-[#5E7960] overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-[#BEB2C8] opacity-15 blur-2xl" />
                    <div className="absolute bottom-0 left-4 w-36 h-36 rounded-full bg-[#4a604c] opacity-20 blur-3xl translate-y-1/3" />
                </div>
                <div className="relative z-10 px-5 pt-10 pb-14 text-center text-white">
                    <span className="text-3xl"><Smartphone /></span>
                    <h1 className="text-2xl font-extrabold mt-2 mb-2">Contact Us</h1>
                    <div className="w-16 h-1 bg-[#BEB2C8] rounded-full mx-auto mb-3" />
                    <p className="text-sm text-gray-200 max-w-xs mx-auto leading-relaxed">
                        We are always here to help. Reach out anytime — we respond fast!
                    </p>
                </div>
                <svg className="w-full -mb-px" viewBox="0 0 1440 36" preserveAspectRatio="none">
                    <path d="M0,36 C360,0 1080,36 1440,0 L1440,36 Z" fill="#F9FAFA" />
                </svg>
            </div>

            {/* Quick call CTA */}
            <div className="px-5 mt-4">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#5E7960] flex items-center justify-center text-2xl flex-shrink-0">
                        <PhoneCall />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 font-medium">24/7 Reception</p>
                        <p className="text-base font-extrabold text-[#5E7960] tracking-wide">+251 937 848785</p>
                    </div>
                    <div className="flex gap-2">
                        <a
                            href="tel:+251937848785"
                            className="w-9 h-9 rounded-full bg-[#5E7960] flex items-center justify-center text-white text-base shadow"
                            aria-label="Call now"
                        >
                            <PhoneCall />
                        </a>
                        <button
                            onClick={handleCopyPhone}
                            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-base"
                            aria-label="Copy number"
                        >
                            {copied ? '✅' : '📋'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Contact Cards */}
            <div className="px-5 mt-5">
                <h2 className="text-base font-bold text-[#36413E] mb-3">Get In Touch</h2>
                <div className="space-y-3">
                    {contactItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            target={item.id === 'location' ? '_blank' : undefined}
                            rel={item.id === 'location' ? 'noreferrer' : undefined}
                            className="flex items-center gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#F9FAFA] border border-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                                {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] text-gray-400 font-medium mb-0.5">{item.title}</p>
                                <p className="text-sm font-bold text-[#36413E] truncate">{item.value}</p>
                                <p className="text-[11px] text-gray-400 mt-0.5">{item.subtitle}</p>
                            </div>
                            <div className="flex-shrink-0 text-[#5E7960] text-xl font-bold">›</div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Map */}
            <div className="px-5 mt-5">
                <h2 className="text-base font-bold text-[#36413E] mb-3">Find Us on the Map</h2>
                <a
                    href="https://maps.app.goo.gl/kQyyqnQ7wRXapRRq7"
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl overflow-hidden shadow-md border border-gray-100 h-48 relative"
                >
                    <iframe
                        src="https://maps.google.com/maps?q=8.992567,40.163479&hl=en&z=15&output=embed"
                        className="pointer-events-none w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="absolute inset-0 flex items-end p-3">
                        <span className="bg-[#5E7960] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                            <MapPin /> Tap to open in Google Maps
                        </span>
                    </div>
                </a>
                <p className="text-xs text-gray-400 text-center mt-2">
                    Awash 7 kilo, around Menehariya bus station — Awash, Ethiopia
                </p>
            </div>

            {/* Social Links */}
            <div className="px-5 mt-5">
                <h2 className="text-base font-bold text-[#36413E] mb-3">Follow Us</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                        Stay connected with us on social media for the latest updates and special offers.
                    </p>
                    <div className="flex gap-3 justify-center">
                        {socialLinks.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={s.label}
                                className="w-12 h-12 rounded-xl bg-[#F9FAFA] border border-gray-100 flex items-center justify-center text-2xl"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="px-5 mt-5 mb-4">
                <h2 className="text-base font-bold text-[#36413E] mb-3">FAQs</h2>
                <div className="space-y-2">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <button
                                className="w-full text-left px-4 py-3.5 flex items-center justify-between gap-3"
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <span className="text-sm font-semibold text-[#36413E]">{faq.q}</span>
                                <span className={`text-[#5E7960] text-lg flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}>
                                    ⌄
                                </span>
                            </button>
                            {openFaq === i && (
                                <div className="px-4 pb-4 text-xs text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
