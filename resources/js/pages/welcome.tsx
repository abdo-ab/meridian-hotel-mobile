import { Head } from '@inertiajs/react';
import { Phone, MapPin, MoveRight } from 'lucide-react';

export default function Welcome() {
    const amenities = [
        { icon: '🛎️', label: 'Concierge Service', desc: '24/7 front desk support' },
        { icon: '🍽️', label: 'Restaurant & Bar', desc: 'Ethiopian & international cuisine' },
        { icon: '🌿', label: 'Garden & Terrace', desc: 'Lush outdoor relaxation spaces' },
        { icon: '🚿', label: 'En-suite Bathrooms', desc: 'Private, modern bathrooms' },
        { icon: '📶', label: 'Free Wi-Fi', desc: 'High-speed internet throughout' },
        { icon: '🚗', label: 'Free Parking', desc: 'Ample on-site parking space' },
    ];

    const highlights = [
        { label: '50+', sub: 'Rooms Available' },
        { label: '4.8★', sub: 'Guest Rating' },
        { label: '5+', sub: 'Years of Service' },
    ];

    return (
        <div className="min-h-screen bg-[#F9FAFA] text-[#36413E] font-sans pb-8">
            <Head title="Genet Hotel – Home" />

            {/* Hero Section */}
            <div className="relative bg-[#5E7960] text-white overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#BEB2C8] opacity-20 blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 -left-10 w-36 h-36 rounded-full bg-[#36413E] opacity-30 blur-2xl pointer-events-none" />

                <div className="relative z-10 max-w-md mx-auto px-5 pt-10 pb-14 text-center">
                    {/*  Brand */}
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#BEB2C8] flex items-center justify-center text-[#36413E] font-extrabold text-2xl shadow-md">
                            G
                        </div>
                        <div className="text-left">
                            <h1 className="text-2xl font-extrabold tracking-tight leading-none">Genet Hotel</h1>
                            <p className="text-[11px] text-[#BEB2C8] font-medium mt-0.5">Awash 7, Ethiopia</p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-200 leading-relaxed max-w-[300px] mx-auto">
                        Experience premium hospitality in the heart of Awash. Comfort, care, and culture — all in one place.
                    </p>

                    <a
                        href="/rooms"
                        className="mt-5 inline-flex items-center gap-2 bg-white text-[#5E7960] font-bold text-sm px-6 py-3 rounded-2xl shadow-lg hover:bg-[#F9FAFA] transition-all active:scale-95"
                    >
                        Browse Rooms
                        <span className="text-base">→</span>
                    </a>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="max-w-md mx-auto px-4 -mt-6 relative z-20">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 flex divide-x divide-gray-100">
                    {highlights.map((h) => (
                        <div key={h.label} className="flex-1 py-4 text-center">
                            <p className="text-xl font-extrabold text-[#5E7960]">{h.label}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5 font-medium">{h.sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Welcome Banner */}
            <div className="max-w-md mx-auto px-4 mt-6">
                <div className="bg-gradient-to-br from-[#5E7960] to-[#36413E] rounded-2xl p-5 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-[#BEB2C8] opacity-10 blur-xl translate-x-6 -translate-y-6 pointer-events-none" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#BEB2C8]">About Us</span>
                    <h2 className="text-lg font-bold mt-1 leading-snug">
                        A Home Away From Home
                    </h2>
                    <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                        Genet Hotel has served the Awash 7 community for over a years, offering a blend of warm Ethiopian hospitality
                        with modern amenities. Whether you're a business traveler or a family on vacation, we make every stay memorable.
                    </p>
                    <a
                        href="/about"
                        className="mt-4 inline-flex items-center gap-1.5 text-[#BEB2C8] text-xs font-semibold hover:underline"
                    >
                        Learn more <span><MoveRight /> </span>
                    </a>
                </div>
            </div>

            {/* Amenities */}
            <div className="max-w-md mx-auto px-4 mt-6">
                <h2 className="font-bold text-base text-[#36413E] mb-3">Hotel Amenities</h2>
                <div className="grid grid-cols-2 gap-3">
                    {amenities.map((a) => (
                        <div
                            key={a.label}
                            className="bg-white border border-gray-100 rounded-2xl p-4 flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span className="text-2xl leading-none">{a.icon}</span>
                            <div>
                                <p className="text-sm font-bold text-[#36413E] leading-snug">{a.label}</p>
                                <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{a.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Location Strip */}
            <div className="max-w-md mx-auto px-4 mt-6">
                <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 bg-[#5E7960] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                        <MapPin />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#36413E]">Awash 7, Afar Region</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">Ethiopia — Near Awash National Park</p>
                    </div>
                    <a
                        href="https://maps.google.com/?q=Awash+7+Ethiopia"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-shrink-0 bg-[#5E7960] text-white text-[10px] font-bold px-3 py-2 rounded-xl"
                    >
                        Map
                    </a>
                </div>
            </div>

            {/* Contact CTA */}
            <div className="max-w-md mx-auto px-4 mt-6 mb-2">
                <a
                    href="/contactus"
                    className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-[#5E7960] text-[#5E7960] font-bold text-sm rounded-2xl hover:bg-[#5E7960] hover:text-white transition-all active:scale-95"
                >
                    <Phone /> Contact Us
                </a>
            </div>
        </div>
    );
}
