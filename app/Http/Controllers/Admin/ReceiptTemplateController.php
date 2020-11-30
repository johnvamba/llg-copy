<?php

namespace App\Http\Controllers\Admin;

use App\ReceiptTemplate;
use Illuminate\Http\Request;
use App\Http\Resources\ReceiptTemplateResource;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Str;

class ReceiptTemplateController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\ReceiptTemplate  $receiptTemplate
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        if($org = session('org_id')){
            $template = ReceiptTemplate::with('organization')->firstOrNew(['organization_id' => $org]);

            $template->loadMissing(['organization', 'media']);
            return new ReceiptTemplateResource($template);
        }
        
        return new ReceiptTemplateResource(new ReceiptTemplate);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ReceiptTemplate  $receiptTemplate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        if($org = session('org_id')){
            $template = ReceiptTemplate::with('organization')->firstOrNew(['organization_id' => $org]);

            $template->fill( $request->only('subject', 'html_content') + [
                'raw_draft_json' => json_encode($request->get('raw_draft_json'))
            ] );

            $template->save();

            if($image = $request->get('photo')){
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $template 
                    ->addMediaFromBase64($image)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo');

                $template->getMedia('photo');
            }


            $template->loadMissing(['organization', 'media']);

            return new ReceiptTemplateResource($template);
        }

        return $this->returnIfEmpty();
    }

    protected function returnIfEmpty()
    {
        
    }
}
