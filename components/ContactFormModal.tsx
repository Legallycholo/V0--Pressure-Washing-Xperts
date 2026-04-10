"use client"

import { X } from "lucide-react"
import { ContactQuoteForm } from "@/components/ContactQuoteForm"
import type { OfferId } from "@/data/offers"
import { modalCopyDefault, modalCopyOfferIntent } from "@/data/modalCopy"

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
  /** When set, form opens with this offer selected and offer-intent header copy */
  initialOfferId?: OfferId
}

export function ContactFormModal({
  isOpen,
  onClose,
  initialOfferId,
}: ContactFormModalProps) {
  if (!isOpen) return null

  const headerCopy = initialOfferId
    ? modalCopyOfferIntent
    : modalCopyDefault

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close form"
        >
          <X className="size-5" />
        </button>

        <ContactQuoteForm
          key={initialOfferId ?? "none"}
          variant="modal"
          copy={headerCopy}
          showOfferSelect
          initialOfferId={initialOfferId}
          onAfterSuccess={onClose}
        />
      </div>
    </div>
  )
}
