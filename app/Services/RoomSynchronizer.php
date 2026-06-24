<?php

namespace App\Services;

use App\Models\MobileRoom;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Native\Mobile\Facades\Network;

class RoomSynchronizer
{
    // 1. Temporarily use localhost port loopback
    protected static string $serverUrl = 'http://127.0.0.1:8000/api/rooms/sync';

    public static function run(): void
    {
        // 2. Simplified network check for the dev emulator
        try {
            if (class_exists('Native\Mobile\Facades\Network') && Network::status()->isOffline()) {
                Log::info('Mobile Sync skipped: Emulator reports offline state.');
                return;
            }
        } catch (\Throwable $th) {
            // Fallback gracefully if facade is still pairing with mobile driver hooks
        }

        try {
            Log::info('Mobile Sync initiating hit to: ' . self::$serverUrl);

            $response = Http::timeout(10)->get(self::$serverUrl);

            if ($response->successful()) {
                $remoteRooms = $response->json('rooms') ?? [];

                Log::info('Mobile Sync successful! Found rooms count: ' . count($remoteRooms));

                foreach ($remoteRooms as $room) {
                    MobileRoom::updateOrCreate(
                        ['uuid' => $room['uuid']],
                        [
                            'title'       => $room['title'],
                            'description' => $room['description'],
                            'price'       => $room['price'],
                            'image'       => $room['image'],
                        ]
                    );
                }
            } else {
                Log::error('Mobile Sync failed status code: ' . $response->status());
            }
        } catch (\Exception $e) {
            Log::error('Mobile Sync connection error: ' . $e->getMessage());
        }
    }
}
