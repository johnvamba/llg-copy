<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerCredential extends Model
{
    //
    protected $guarded = [];

    public function model()
    {
        return $this->morphTo();
    }

    /**
     * 
     * 
     * @return stripe customer
     */
    public static function addCredential($model, $key)
    {
        \Stripe\Stripe::setApiKey($key);

        $customer = \Stripe\Customer::create([
                'name' => auth()->user()->name,
                'email' => auth()->user()->email
            ]);

        $credential = CustomerCredential::make([
                    'user_id' => auth()->user()->id,
                    'customer_id' => $customer->id 
                ]);

        $result = $model->customerCredential()->save($credential);

        return $customer;
    }
}
