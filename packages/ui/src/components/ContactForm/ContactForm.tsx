import React, { useState } from 'react';
import { Input } from '../Input/Input';
import { TextArea } from '../TextArea/TextArea';
import { Button } from '../Button/Button';
import styles from './ContactForm.module.css';

export interface ContactFormProps {
  /**
   * Web3Forms access key.
   * Get yours free at https://web3forms.com — enter your email and they'll
   * send you an access key instantly, no account sign-up required.
   */
  accessKey: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export const ContactForm: React.FC<ContactFormProps> = ({ accessKey }) => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: FormData): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!data.get('name')) errs.name = 'Name is required.';
    const email = data.get('email') as string;
    if (!email) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!data.get('subject')) errs.subject = 'Subject is required.';
    if (!data.get('message')) errs.message = 'Message is required.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      const json = (await res.json()) as { success: boolean };
      if (json.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>✓</div>
        <p className={styles.successTitle}>Message transmitted.</p>
        <p className={styles.successBody}>
          We'll get back to you at the email you provided. Stay tuned.
        </p>
        <Button variant="ghost" size="sm" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* Web3Forms required fields */}
      <input type="hidden" name="access_key" value={accessKey} />
      <input type="hidden" name="from_name" value="Harlem Hustle Studios — Contact Form" />
      {/* Honeypot spam trap — must stay hidden and empty */}
      <input
        type="checkbox"
        name="botcheck"
        className={styles.botcheck}
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className={styles.row}>
        <Input
          label="Name"
          name="name"
          placeholder="Your name"
          error={errors.name}
          disabled={status === 'submitting'}
          autoComplete="name"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          error={errors.email}
          disabled={status === 'submitting'}
          autoComplete="email"
        />
      </div>

      <Input
        label="Subject"
        name="subject"
        placeholder="What's this about?"
        error={errors.subject}
        disabled={status === 'submitting'}
      />

      <TextArea
        label="Message"
        name="message"
        placeholder="Tell us what's on your mind..."
        error={errors.message}
        disabled={status === 'submitting'}
      />

      {status === 'error' && (
        <p className={styles.errorBanner}>
          Something went wrong. Please try again or email us directly at{' '}
          <a href="mailto:contact@harlemlinehustle.com" className={styles.errorLink}>
            contact@harlemlinehustle.com
          </a>
          .
        </p>
      )}

      <div className={styles.actions}>
        <Button type="submit" variant="primary" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Transmitting...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
};
