<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $table = 'options';

    protected $fillable = [
        'vat',
        'offer_note',
        'reservation_note',
        'contract_note',
        'document_footer',
        'contactdata',
        'license_classes',
        'payment_types'
    ];
}
