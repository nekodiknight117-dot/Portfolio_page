import emailjs from '@emailjs/browser'
import { AlertTriangle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { profile } from '../data/profile'
import { cn } from '../lib/cn'
import { Button } from './ui/Button'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

interface FormValues {
  name: string
  email: string
  subject: string
  message: string
  /** Honeypot: bots fill it, humans never see it. */
  company: string
}

type Errors = Partial<Record<keyof FormValues, string>>
type Status = 'idle' | 'sending' | 'success' | 'error'

const initial: FormValues = { name: '', email: '', subject: '', message: '', company: '' }

function validate(v: FormValues): Errors {
  const errors: Errors = {}
  if (v.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errors.email = 'Please enter a valid email address.'
  if (v.subject.trim().length < 3) errors.subject = 'Please add a short subject.'
  if (v.message.trim().length < 20) errors.message = 'Message should be at least 20 characters.'
  return errors
}

const fieldClass =
  'w-full rounded-lg border border-asphalt-600 bg-asphalt-900 px-3.5 py-2.5 text-asphalt-100 placeholder:text-asphalt-500 transition-colors focus:border-accent-500'

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState<string | null>(null)

  const onChange =
    (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }))
      if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
    }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setServerError(null)

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // Silently drop bot submissions.
    if (values.company) {
      setStatus('success')
      return
    }

    if (!configured) {
      // Fall back to a mailto link so the form still "works" before EmailJS is set up.
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID!,
        TEMPLATE_ID!,
        {
          from_name: values.name,
          from_email: values.email,
          subject: values.subject,
          message: `${values.message}\n\n— ${values.name} (${values.email})`,
          to_name: profile.name,
        },
        { publicKey: PUBLIC_KEY! },
      )
      setStatus('success')
      setValues(initial)
    } catch (err) {
      setStatus('error')
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="surface flex flex-col items-center p-10 text-center" role="status">
        <CheckCircle2 size={44} className="text-highlight-400" />
        <h3 className="mt-4 text-2xl">Message sent</h3>
        <p className="mt-2 max-w-sm text-asphalt-300">
          Thanks for reaching out. I will get back to you as soon as I can, usually within a day or two.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="surface space-y-5 p-6 sm:p-8">
      {!configured && (
        <p className="rounded-lg border border-highlight-500/40 bg-highlight-500/10 px-3 py-2 text-xs text-highlight-400">
          EmailJS is not configured yet, so submitting will open your email client instead. See the README to enable
          direct sending.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={onChange('name')}
            className={cn(fieldClass, errors.name && 'border-accent-500')}
            placeholder="Jane Doe"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={onChange('email')}
            className={cn(fieldClass, errors.email && 'border-accent-500')}
            placeholder="jane@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </Field>
      </div>

      <Field label="Subject" htmlFor="subject" error={errors.subject}>
        <input
          id="subject"
          name="subject"
          type="text"
          value={values.subject}
          onChange={onChange('subject')}
          className={cn(fieldClass, errors.subject && 'border-accent-500')}
          placeholder="Let's build something"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
      </Field>

      <Field label="Message" htmlFor="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={onChange('message')}
          className={cn(fieldClass, 'resize-y', errors.message && 'border-accent-500')}
          placeholder="Tell me about your project, role, or idea..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
      </Field>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={onChange('company')} />
      </div>

      {status === 'error' && (
        <p role="alert" className="flex items-start gap-2 rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          <span>{serverError ?? 'Could not send your message. Please try again or email me directly.'}</span>
        </p>
      )}

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-asphalt-400">I typically reply within 48 hours.</p>
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Sending
            </>
          ) : (
            <>
              <Send size={18} /> Send Message
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-asphalt-300">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
