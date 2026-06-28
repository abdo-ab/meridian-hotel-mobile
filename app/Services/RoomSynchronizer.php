<?php

namespace App\Services;

use App\Models\MobileRoom;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Native\Mobile\Facades\Network;

class RoomSynchronizer
{
    public static function run(): void
    {
        // Dynamically track incoming  endpoints
        $apiUrl = config('services.rooms.api_url');
        $serverUrl = (is_string($apiUrl) && !empty($apiUrl)) ? $apiUrl : "https://sefefuhotel.abdoab.dev/api/rooms/sync";


        try {
            if (class_exists('Native\Mobile\Facades\Network')) {
                $status = Network::status();
                if ($status && isset($status->connected) && !$status->connected) {
                    Log::info('Mobile Sync skipped: Emulator reports offline state.');
                    return;
                }
            }
        } catch (\Throwable $th) {
            // Fallback gracefully if facade driver hooks are loading asynchronously
        }

        try {
            Log::info('Mobile Sync initiating hit to live server: ' . $serverUrl);

            $response = Http::retry(3, 100)->timeout(30)->get($serverUrl);

            if ($response->successful()) {
                $roomsData = $response->json();

                if (!isset($roomsData['rooms']) || !is_array($roomsData['rooms'])) {
                    Log::error('Mobile Sync error: API response structure invalid. Response: ' . $response->body());
                    return;
                }

                $remoteRooms = $roomsData['rooms'];

                Log::info('Mobile Sync successful! Processing rooms count: ' . count($remoteRooms));

                foreach ($remoteRooms as $room) {
                    $remoteId = $room['id'] ?? null;

                    if (!$remoteId) {
                        Log::warning('Mobile Sync skipped a room record with missing tracking identifier.');
                        continue;
                    }

                    $fullImageUrl = $room['image'] ?? null;
                    if ($fullImageUrl) {
                        $fullImageUrl = str_replace(' ', '%20', $fullImageUrl);
                    }

                    MobileRoom::updateOrCreate(
                        ['remote_id' => $remoteId],
                        [
                            'uuid'        => $room['uuid'] ?? null,
                            'title'       => $room['title'] ?? null,
                            'description' => $room['description'] ?? null,
                            'price'       => $room['price'] ?? null,
                            'image'       => $fullImageUrl,
                        ]
                    );
                }
            } else {
                Log::error('Mobile Sync failed with status code: ' . $response->status() . ' | Body: ' . $response->body());
            }
        } catch (\Exception $e) {
            Log::error('Mobile Sync connection error: ' . $e->getMessage() . ' | Trace: ' . $e->getTraceAsString());
        }
    }
}
