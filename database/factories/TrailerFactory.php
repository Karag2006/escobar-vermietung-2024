<?php

namespace Database\Factories;

use App\Models\Trailer;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trailer>
 */
class TrailerFactory extends Factory
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
        $inspectionData = $this->getInspection();

        return [
            'title' => $this->faker->randomElement(
                $array = array(
                    'Autotransporter',
                    '3m Plane',
                    '1er Motorrad',
                    '2er Motorrad',
                    '1er Absenker'
                )
            ),
            'plateNumber' => "SU - ES " . $this->faker->unique()->numberBetween($min = 100, $max = 9999),
            'chassisNumber' => $this->faker->regexify('[a-zA-Z0-9]{20}'),
            'totalWeight' => $total,
            'usableWeight' => $usable,
            'loadingSize' => $this->getLoadingSize(),
            'tuev' => $inspectionData['tuev'],
            'inspection_at' => $inspectionData['inspection_at'],
            'comment' => $this->faker->text($maxNbChars = 200),
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

    private function getInspection()
    {
        $inspectionDate = Carbon::parse($this->faker->dateTimeBetween($startDate = 'now', $endDate = '+1 years', NULL))->startOfMonth();
        $data = [
            "inspection_at" => $inspectionDate,
            "tuev" => $inspectionDate->format(config('custom.tuev_format')),
        ];
        return $data;
    }

}
