<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

use App\Mail\TransactionReceipt;
use App\ReceiptTemplate;
use App\Organization;
use App\Invoice;

class EmailReceipt extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:receipts {--invoice_id=} {--charge_id=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $transact = Invoice::withoutGlobalScopes()
            ->where('id', $this->option('invoice_id'))
            ->orWhere('charge_id', $this->option('charge_id'))
            ->with([
                'user' => fn($usr) => $usr->withoutGlobalScopes(),
                'organization' => fn($org) => $org->withoutGlobalScopes()->with('template') 
            ])
            ->first(); 

        $organization = optional($transact)->organization;

        if(!$transact || !$organization) {
            $this->info('Transaction not found or organization doesnt exist');
            return ;
        }

        if(!$organization->template){
            $organization->setRelation('template', new ReceiptTemplate);
        }

        $transact->loadMissing(['model' => fn($model) => $model->withoutGlobalScopes()]);

        $transacts = 'Amount';

        switch ($transact->model_type) {
            case 'App\Need':
                $transacts = 'Donation on need entitled "'. (optional($transact->model)->title ?? '-missing-need-') . '"';
                break;
            default:
                break;
        }

        Mail::to($transact->user)->send(new TransactionReceipt($organization, $transact->user, [  $transacts => $transact->amount ?? 0 ]));

        $this->info('Transaction receipt will be sent shortly');

    }
}
