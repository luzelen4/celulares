<?php

namespace App\Mail;

use App\Models\Product;
use App\Models\Watch;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ProductCreatedMail extends Mailable
{
    use Queueable, SerializesModels;

    private $product;

    /**
     * Create a new message instance.
     */
    public function __construct(Watch $watch)
    {
        $this->product = $watch;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Se ha generado nuevo registro de Reloj',
        );
    }

    /**
     * Get the message content definition.
     */
    public function build()
    {
        return $this->view (
            'emails.product-created',
            [ 'product' => $this->product ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}