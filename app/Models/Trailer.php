<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Trailer extends Model
{
    use HasFactory;

    protected $appends = ['selector'];

    protected $dates = [
        'inspection_at',
        'tuev',
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'title',
        'plateNumber',
        'chassisNumber',
        'totalWeight',
        'usableWeight',
        'loading_size',
        'tuev',
        'inspection_at',
        'comment'
    ];




    public function getSelectorAttribute(){
        return $this->plateNumber . ' - ' . $this->title;
    }

    public function getLoadingSizeAttribute($value){
        if($value){
            $temp = explode("x", $value);
            $length = intval(trim($temp[0]));
            $width = intval(trim($temp[1]));
            $height = isset($temp[2]) ? intval(trim($temp[2])) : 0;

            if($height > 0)
                return array($length, $width, $height);

            return array($length, $width);
        }

        return 0;

    }

    public function setLoadingSizeAttribute($value){
        $this->attributes['loading_size'] = implode(" x ", $value);
    }


    public function getInspectionAtAttribute($value)
    {
        return $value ? Carbon::parse($value)->firstOfMonth() : null;
    }
    public function setInspectionAtAttribute($value)
    {
        $this->attributes['inspection_at'] = $value ? Carbon::parse($value)->firstOfMonth() : null;
    }


    public function getTuevAttribute($value)
    {
        return $value ? Carbon::parse($value)->format(config('custom.tuev_format')) : null;
    }
    public function setTuevAttribute($value)
    {
        if ($value) {
            $array = explode("/", $value);
            $this->attributes['tuev'] = $array[1] + 2000 . "-" . $array[0] . "-01";
        }
    }
}
