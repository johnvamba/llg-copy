<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

use App\Story;

class StoryPublished extends Mailable
{
    use Queueable, SerializesModels;

    protected $story;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Story $story)
    {
        $story->loadMissing(['media']);
        
        $this->story = $story;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('email.new_story', [
            'story' => $this->story,
            'photo' => optional($this->story)->getFirstMediaUrl('photo'),
            'url' => 'url'
        ]);
    }
}
