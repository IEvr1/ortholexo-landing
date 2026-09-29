import { useState, type FormEvent } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  name: "",
  email: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Συμπλήρωσε το όνομά σου.";
  } else if (form.name.trim().length > 120) {
    errors.name = "Το όνομα είναι πολύ μακρύ.";
  }

  if (!form.email.trim()) {
    errors.email = "Συμπλήρωσε το email σου.";
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = "Μη έγκυρο email.";
  }

  if (!form.message.trim()) {
    errors.message = "Γράψε το μήνυμά σου.";
  } else if (form.message.trim().length > 4000) {
    errors.message = "Το μήνυμα είναι πολύ μακρύ.";
  }

  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status === "success") {
      setStatus("idle");
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          botcheck: formData.get("botcheck"),
        }),
      });

      if (response.ok) {
        setForm(initialForm);
        setErrors({});
        setStatus("success");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="botcheck"
        className="contact-form__honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="form-group">
        <label htmlFor="contact-name">Όνομα</label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={errors.name ? "error" : ""}
          autoComplete="name"
          disabled={status === "submitting"}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={errors.email ? "error" : ""}
          autoComplete="email"
          disabled={status === "submitting"}
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">Μήνυμα</label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={errors.message ? "error" : ""}
          rows={5}
          disabled={status === "submitting"}
        />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      {status === "success" && (
        <p className="form-status form-status--success" role="status">
          Ευχαριστούμε! Λάβαμε το μήνυμά σου και θα απαντήσουμε σύντομα.
        </p>
      )}

      {status === "error" && (
        <p className="form-status form-status--error" role="alert">
          Δεν ήταν δυνατή η αποστολή. Δοκίμασε ξανά σε λίγο.
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Αποστολή…" : "Αποστολή"}
      </button>
    </form>
  );
}
