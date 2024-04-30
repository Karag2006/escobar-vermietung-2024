<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Customer extends Model
{
    use SoftDeletes, HasFactory;

    public $incrementing = true;

    public function getSelectorAttribute(){
        return $this->name1 . ' - ' . $this->name2;
    }

    protected $appends = ['selector'];

    protected $dates = [
        'birth_date',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'pass_number',
        'name1',
        'name2',
        'birth_date',
        'birth_city',
        'street',
        'plz',
        'city',
        'phone',
        'email',
        'driving_license_no',
        'driving_license_class',
        'car_number',
        'comment',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function getBirthDateAttribute($value)
    {
        return $value 
            ? Carbon::parse($value)->format(config('custom.date_format')) 
            : null;
    }
    public function setBirthDateAttribute($value)
    {
        $this->attributes['birth_date'] = $value 
            ? Carbon::createFromFormat(config('custom.date_format'), $value)->format('Y-m-d') 
            : null;
    }
}
