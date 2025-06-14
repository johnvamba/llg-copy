<?php

namespace App\Http\Controllers\Admin;

use App\ReceiptTemplate;
use Illuminate\Http\Request;
use App\Http\Resources\ReceiptTemplateResource;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Organization;
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
            $template = ReceiptTemplate::with([
                'organization'=>fn($org)=>$org->unfilter()->with('media'), 
                'media'])
                ->firstOrNew(['organization_id' => $org]);

            if(!$template->exists){
                $template->setRelation('organization', Organization::unfilter()->with('media')->findOrFail($org));
            }
            // dd($template, Organization::unfilter()->with('media')->findOrFail($org));

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
            // dd($request->all());
            $template->fill( $request->only('subject', 'html_content', 'facebook', 'twitter', 'instagram', 'text') + [
                'raw_draft_json' => json_encode($request->get('raw_draft_json'))
            ] );


            if($image = $request->get('photo')){
                if(strpos($image, 'http') !== false)
                    goto skipPhoto;
                $name = time().'-'.Str::random(20);
                $extension = explode('/', mime_content_type($image))[1];
                
                $template 
                    ->clearMediaCollection('photo')
                    ->addMediaFromBase64($image)
                    ->addCustomHeaders([
                        'ACL' => 'public-read'
                    ])
                    ->usingName($name)
                    ->usingFileName($name.'.'.$extension)
                    ->toMediaCollection('photo');

                $template->getMedia('photo');
            }
            skipPhoto:

            $template->save();

            $template->loadMissing(['organization', 'media']);

            return new ReceiptTemplateResource($template);
        }

        return $this->returnIfEmpty();
    }

    protected function returnIfEmpty()
    {
        
    }
}
