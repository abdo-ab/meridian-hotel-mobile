import { Head } from '@inertiajs/react';
import { useState, useMemo } from 'react';

interface Room {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string | null;
}

interface Props {
    rooms: Room[];
}

export default function MobileDashboard({ rooms }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [maxPrice, setMaxPrice] = useState<number>(50000);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    // Booking Form State
    const [bookingRoom, setBookingRoom] = useState<Room | null>(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        checkIn: '',
        checkOut: '',
    });

    // Filter rooms based on query and price
    const filteredRooms = useMemo(() => {
        return rooms.filter((room) => {
            const matchesSearch = room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                room.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = Number(room.price) <= maxPrice;
            return matchesSearch && matchesPrice;
        });
    }, [rooms, searchQuery, maxPrice]);

    // Calculate booking total
    const bookingTotal = useMemo(() => {
        if (!bookingRoom || !formData.checkIn || !formData.checkOut) return 0;
        const start = new Date(formData.checkIn);
        const end = new Date(formData.checkOut);
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays * Number(bookingRoom.price) : Number(bookingRoom.price);
    }, [bookingRoom, formData.checkIn, formData.checkOut]);

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setBookingSuccess(true);
        setTimeout(() => {
            setBookingSuccess(false);
            setBookingRoom(null);
            setFormData({ name: '', phone: '', checkIn: '', checkOut: '' });
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#F9FAFA] font-sans text-[#36413E] pb-24">
            <Head title="Meridian Hotel – Rooms" />

            {/* Rooms Hero */}
            <div className="relative bg-[#5E7960] overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-3 right-4 w-28 h-28 rounded-full bg-[#BEB2C8] opacity-15 blur-2xl" />
                </div>
                <div className="relative z-10 px-5 pt-8 pb-12 text-center text-white">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#BEB2C8] uppercase">Book Your Room</span>
                    <h1 className="text-2xl font-extrabold mt-1 mb-1">Available Rooms</h1>
                    <p className="text-xs text-gray-200 opacity-90">Find the perfect space for your stay with instant offline booking.</p>
                </div>
                <svg className="w-full -mb-px" viewBox="0 0 1440 36" preserveAspectRatio="none">
                    <path d="M0,36 C360,0 1080,36 1440,0 L1440,36 Z" fill="#F9FAFA" />
                </svg>
            </div>

            {/* Search and Filters Section */}
            <div className="max-w-md mx-auto px-4 -mt-5">
                <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search rooms (e.g. VIP, Luxury)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5E7960] focus:border-transparent text-[#36413E]"
                        />
                        <svg className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                        <span className="text-gray-500 font-medium whitespace-nowrap">Filter Price (Max):</span>
                        <input
                            type="range"
                            min="1000"
                            max="50000"
                            step="500"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full accent-[#5E7960] h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="font-bold text-[#5E7960] whitespace-nowrap">{maxPrice.toLocaleString()} ETB</span>
                    </div>
                </div>
            </div>

            {/* Room List Grid */}
            <div className="max-w-md mx-auto px-4 mt-6 space-y-5">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-[#36413E]">Available Rooms ({filteredRooms.length})</h3>
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="text-xs text-[#5E7960] font-semibold hover:underline">Clear Search</button>
                    )}
                </div>

                {filteredRooms.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl bg-white p-6">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-500 font-bold">No Rooms Match Your Filter</p>
                        <p className="text-xs text-gray-400 mt-1">Try adjusting your search query or price slider.</p>
                    </div>
                ) : (
                    filteredRooms.map((room) => (
                        <div key={room.id} className="bg-white rounded-2xl shadow-sm border border-gray-150/80 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md">
                            <div className="h-48 bg-gray-100 relative overflow-hidden group">
                                {room.image ? (
                                    <img src={room.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={room.title} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-medium">No Image Available</div>
                                )}
                                <div className="absolute top-3 right-3 bg-[#5E7960] text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-md">
                                    {Number(room.price).toLocaleString()} ETB <span className="text-[10px] font-normal opacity-90">/ night</span>
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-bold text-lg text-[#36413E] leading-snug">{room.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{room.description}</p>
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setSelectedRoom(room)}
                                        className="py-2 border border-[#BEB2C8] text-[#36413E] text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        See Details
                                    </button>
                                    <button
                                        onClick={() => setBookingRoom(room)}
                                        className="py-2 bg-[#5E7960] text-white text-xs font-semibold rounded-lg hover:bg-[#4a604c] transition-colors shadow-sm"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Room Details Modal */}
            {selectedRoom && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4 animate-fadeIn">
                    <div className="bg-white w-full rounded-t-[2rem] sm:rounded-2xl max-h-[85vh] overflow-y-auto flex flex-col max-w-md relative pb-6">
                        <div className="h-56 bg-gray-100 relative">
                            {selectedRoom.image ? (
                                <img src={selectedRoom.image} className="w-full h-full object-cover" alt={selectedRoom.title} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Image</div>
                            )}
                            <button
                                onClick={() => setSelectedRoom(null)}
                                className="absolute top-4 right-4 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm"
                            >
                                ✕
                            </button>
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <h3 className="text-xl font-bold drop-shadow-md">{selectedRoom.title}</h3>
                            </div>
                        </div>
                        <div className="p-5 flex-1">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-gray-400">Price Rate</span>
                                    <p className="text-lg font-extrabold text-[#5E7960]">{Number(selectedRoom.price).toLocaleString()} ETB <span className="text-xs font-normal text-gray-500">/ night</span></p>
                                </div>
                                <div className="bg-green-50 px-2.5 py-1 rounded-md text-[10px] text-green-700 font-bold border border-green-200">
                                    Instant Sync Active
                                </div>
                            </div>
                            <h4 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Room Description</h4>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed whitespace-pre-line">{selectedRoom.description}</p>

                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={() => setSelectedRoom(null)}
                                    className="flex-1 py-3 border border-gray-300 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition"
                                >
                                    Go Back
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedRoom(null);
                                        setBookingRoom(selectedRoom);
                                    }}
                                    className="flex-1 py-3 bg-[#5E7960] text-white text-sm font-semibold rounded-xl hover:bg-[#4a604c] shadow transition"
                                >
                                    Book Room
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking Form Modal */}
            {bookingRoom && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4">
                    <div className="bg-white w-full rounded-t-[2rem] sm:rounded-2xl max-h-[90vh] overflow-y-auto flex flex-col max-w-md relative p-6">
                        <button
                            onClick={() => setBookingRoom(null)}
                            className="absolute top-4 right-4 bg-gray-100 text-gray-500 w-8 h-8 rounded-full flex items-center justify-center"
                        >
                            ✕
                        </button>

                        {bookingSuccess ? (
                            <div className="text-center py-10">
                                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-150">
                                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Booking Requested!</h3>
                                <p className="text-xs text-gray-500 mt-2 max-w-[260px] mx-auto leading-relaxed">
                                    We have received your reservation request for <span className="font-semibold">{bookingRoom.title}</span>. Our desk will contact you shortly!
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Reservation</span>
                                    <h3 className="text-lg font-bold text-gray-800 truncate">{bookingRoom.title}</h3>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Your Full Name"
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5E7960] text-[#36413E]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+251 9..."
                                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5E7960] text-[#36413E]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1">Check-in</label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.checkIn}
                                                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                                                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5E7960] text-[#36413E]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 mb-1">Check-out</label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.checkOut}
                                                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                                                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5E7960] text-[#36413E]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-500 font-semibold">Total Price Rate:</span>
                                        <span className="font-bold text-[#5E7960] text-sm">
                                            {bookingTotal > 0 ? `${bookingTotal.toLocaleString()} ETB` : `${Number(bookingRoom.price).toLocaleString()} ETB`}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#5E7960] text-white text-sm font-semibold rounded-xl hover:bg-[#4a604c] shadow transition"
                                >
                                    Confirm Reservation
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
