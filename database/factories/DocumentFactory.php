<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $total = $this->faker->numberBetween($min = 750, $max = 3500);
        $usable = $this->faker->numberBetween($min = 500, $max = $total);

        $collectDateTime = Carbon::parse($this->faker->dateTimeBetween($startDate = 'now', $endDate = '+12 month'));
        $durationDays = $this->faker->numberBetween($min = 0, $max = 21);
        $durationHours = $this->faker->numberBetween($min = 1, $max = 23);
        $durationHours = $durationHours + $durationDays * 24;
        $returnDateTime = $collectDateTime->copy()->addHours($durationHours);

        [$collect_date, $collect_time] = $this->stringsFromDateTime($collectDateTime);
        [$return_date, $return_time] = $this->stringsFromDateTime($returnDateTime);
        return [
            // 03.11.2024 Feature: Add Archive functionality - Add is_archived to the factory - 40% chance of being true
            'is_archived' => $this->faker->boolean($chanceOfGettingTrue = 40),
            'offer_number' => $this->faker->numberBetween($min = 10, $max = 9999),
            'reservation_number' => $this->faker->numberBetween($min = 10, $max = 9999),
            'contract_number' => $this->faker->numberBetween($min = 10, $max = 9999),
            'offer_date' => $this->faker->date($format = 'd.m.Y', $max = 'now'),
            'reservation_date' => $this->faker->date($format = 'd.m.Y', $max = 'now'),
            'contract_date' => $this->faker->date($format = 'd.m.Y', $max = 'now') ,
            // currentState is one of : ['offer', 'reservation', 'contract']
            'current_state' => $this->faker->randomElement($array = array('offer', 'reservation', 'contract')),

            // 22.10.2024 Fix: Add collect_at and return_at columns for collision checks
            'collect_at' => $collectDateTime,
            'return_at' => $returnDateTime,

            // 22.10.2024 Fix: base collect_date and return_date on the new collect_at and return_at columns
            'collect_date' => $collect_date,
            'return_date' => $return_date,
            'collect_time' => $collect_time,
            'return_time' => $return_time,

            'netto_price' => $this->faker->randomFloat(2),
            'total_price' => $this->faker->randomFloat(2),
            'tax_value' => $this->faker->randomFloat(2),
            'reservation_deposit_value' => $this->faker->randomFloat(2),
            'reservation_deposit_date' => $this->faker->date($format = 'd.m.Y', $max = 'now'),
            'reservation_deposit_type' => 'Bar',
            'reservation_deposit_recieved' => false,
            'final_payment_value' => $this->faker->randomFloat(2),
            'final_payment_date' => $this->faker->date($format = 'd.m.Y', $max = 'now'),
            'final_payment_type' => 'Bar',
            'final_payment_recieved' => false,
            'contract_bail' => $this->faker->randomFloat(2),
            'contract_bail_date' => $this->faker->date($format = 'd.m.Y', $max = 'now'),
            'contract_bail_type' => 'Bar',
            'contract_bail_return_type' => 'Bar',
            'contract_bail_recieved' => false,
            'contract_bail_returned' => false,
            'comment' => $this->faker->text($maxNbChars = 200),

            'customer_pass_number' => Str::random(10),
            'customer_name1' => $this->faker->unique()->name(),
            'customer_name2' => $this->faker->name(),
            'customer_street' => $this->faker->streetAddress(),
            'customer_plz' => $this->faker->numberBetween($min = 10000, $max = 99999),
            'customer_city' => $this->faker->city(),
            'customer_birth_date' => $this->faker->date($format = 'd.m.Y', $max = 'now'),
            'customer_birth_city' => $this->faker->city(),
            'customer_phone' => $this->faker->e164PhoneNumber(),
            'customer_car_number' => "SU - FK " . $this->faker->numberBetween($min = 10, $max = 9999),
            'customer_email' => $this->faker->unique()->safeEmail(),
            'customer_driving_license_no' => Str::random(10),
            'customer_driving_license_class' => $this->faker->randomElement($array = array('B', 'BE', 'B96', 'Klasse 3')),
            'customer_comment' => $this->faker->text($maxNbChars = 200),

            'driver_pass_number' => Str::random(10),
            'driver_name1' => $this->faker->unique()->name(),
            'driver_name2' => $this->faker->name(),
            'driver_street' => $this->faker->streetAddress(),
            'driver_plz' => $this->faker->numberBetween($min = 10000, $max = 99999),
            'driver_city' => $this->faker->city(),
            'driver_birth_date' => $this->faker->date($format = 'd.m.Y', $max = 'now'),
            'driver_birth_city' => $this->faker->city(),
            'driver_phone' => $this->faker->e164PhoneNumber(),
            'driver_car_number' => "SU - FK " . $this->faker->numberBetween($min = 10, $max = 9999),
            'driver_email' => $this->faker->unique()->safeEmail(),
            'driver_driving_license_no' => Str::random(10),
            'driver_driving_license_class' => $this->faker->randomElement($array = array('B', 'BE', 'B96', 'Klasse 3')),
            'driver_comment' => $this->faker->text($maxNbChars = 200),

            'vehicle_title' => $this->faker->randomElement(
                $array = array(
                    'Autotransporter',
                    '3m Plane',
                    '1er Motorrad',
                    '2er Motorrad',
                    '1er Absenker'
                )
            ),
            'vehicle_plateNumber' => "SU - ES " . $this->faker->unique()->numberBetween($min = 100, $max = 9999),
            'vehicle_chassisNumber' => $this->faker->regexify('[a-zA-Z0-9]{20}'),
            'vehicle_totalWeight' => $total,
            'vehicle_usableWeight' => $usable,
            'vehicle_loadingSize' => $this->getLoadingSize(),
            'vehicle_comment' => $this->faker->text($maxNbChars = 200),

            'vat'               => 19,
            'offer_note'        => '<ul><li><strong>+ Anhänger und Zubehör sind Teilkaskoversichert mit 750 € Selbstbeteiligung !</strong></li><li><strong>+ Eine Vollkaskoversicherung besteht nicht !</strong></li><li><strong>+ Spanngurte werden pro Stück mit 2,00 € für die Mietzeit zusätzlich zum Mietpreis berechnet !</strong></li><li><strong>+ Der Vertrag wird erst nach Erhalt der gesamten Mietanzahlung bis u.g. Termin verbindlich !</strong></li><li><strong>+ Bei einer Stornierung wird eine Stornogebühr in Höhe der Anzahlung berechnet !</strong></li></ul>',

            'reservation_note'  => '<ul><li><strong>+ Anhänger und Zubehör sind Teilkaskoversichert mit 750 € Selbstbeteiligung !</strong></li><li><strong>+ Eine Vollkaskoversicherung besteht nicht !</strong></li><li><strong>+ Spanngurte werden pro Stück mit 2,00 € für die Mietzeit zusätzlich zum Mietpreis berechnet !</strong></li><li><strong>+ Das Fahrzeug kann nur zum genannten Abholtermin in Empfang genommen werden.</strong></li><li><strong>+ Bei einer Stornierung wird eine Stornogebühr in Höhe der Anzahlung berechnet !</strong></li></ul><p>&nbsp;</p>',

            'contract_note'     => '<ul><li><strong>+ Anhänger und Zubehör sind Teilkaskoversichert mit 750 € Selbstbeteiligung ! !!</strong></li><li><strong>+ Eine Vollkaskoversicherung besteht nicht !</strong></li><li><strong>+ Der Mieter erkennt die umseitigen Geschäftsbedingungen an !</strong></li><li><strong>+ Bei Verlust des Fahrzeugscheins werden 65 Euro für die Wiederbeschaffung berechnet !</strong></li></ul>',

            'document_footer'   => '<p>Escobar Anhängercenter &nbsp;• &nbsp;Inh. : Torsten Hebenstrick &nbsp;• Industriepark 13 - 15 • D-56593 Horhausen / Westerwald<br>SteuerNr.: 02 / 062 / 51544 • USt-ID : DE 2411 499 64&nbsp;<br>Bankverbindung : Escobar Anhängercenter • VR-Bank Rhein Sieg • DE61 3706 9520 1202 5610 27</p>',

            'contactdata'       => '<p>Escobar Anhängercenter <br>Industriepark 13 - 15 <br>D-56593 Horhausen / Westerwald <br><br>Telefon : 02687 – 9289538</p>',

            'collect_address_id' => 1,
            'user_id' => 1,
        ];
    }

    private function getLoadingSize()
    {
        $result = [];
        $length = $this->faker->numberBetween($min = 200, $max = 600);
        $width = $this->faker->numberBetween($min = 100, $max = 220);
        $height = $this->faker->optional($weight = 0.5)->passthrough($this->faker->numberBetween($min = 30, $max = 200));
        $result[] = $length;
        $result[] = $width;
        if ($height > 0)
            $result[] = $height;
        return $result;
    }

    private function stringsFromDateTime($dateTime)
    {
        $date = Carbon::parse($dateTime)->format(config('custom.date_format'));
        $time = Carbon::parse($dateTime)->format(config('custom.time_format'));

        return [$date, $time];
    }

}
