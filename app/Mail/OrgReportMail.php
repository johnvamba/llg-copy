<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

use App\NeedMet;

class OrgReportMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $org;
    protected $startDate;
    protected $endDate;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($org, $startDate, $endDate)
    {
        $this->org = $org;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
            ->from(config('mail.from.address'), config('mail.from.name'))
            ->subject("Your Weekly Report!")
            ->view('email.weekly_report')
            ->with( 
                $this->calculate() + [
                'startDate' => $this->startDate,
                'endDate' => $this->endDate,
                'url' => route('web.login')
            ] );
    }

    protected function calculate() {

        $org = $this->org;

        $allneeds = NeedMet::whereHas('need', function($need) use ($org){ 
            $need->where('organization_id', $org->id);
        })
        ->whereBetween('created_at', [$this->startDate, $this->endDate])
        ->with(['need' => fn($need) => $need->withCount(['type as type_need' => fn($n) => $n->select('needs_types.name')]) ])
        ->get();

        return [
            'donations' => $allneeds->sum(fn($nmet) => optional($nmet->need)->type_need == 'Donation' ? $nmet->amount : 0) ?? 0,
            'volunteers' => $allneeds->filter(fn($nmet) => optional($nmet->need)->type_need == 'Volunteer')->count() ?? 0,
            'contributions' => $allneeds->filter(fn($nmet)=> optional($nmet->need)->type_need != 'Volunteer')->count() ?? 0
        ];
    }
}
