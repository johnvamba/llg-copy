<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    //
    protected $guarded = [];

    public static function removeFCMToken($token)
    {
        try {
            $deleteDevice = Device::where(function($query) use ($token) {
                $query->where('user_id', auth()->user()->id)
                    ->where('fcm_token', $token);
            })
            ->delete();
            
            return response()->json([
                    'message' => 'Device successfully deleted.'
                ], 204);
        } catch (\Exception $e) {
            return response()->json([
                    'message' => 'An error occurred. Please try again.'
                ], 500);
        }
    }
}
