import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";
import React, { useState } from "react";
import GlassPanel from "../components/GlassPanel.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { emailjsConfig } from "../config/emailjs.js";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [notice, setNotice] = useState("");

  const updateField = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    if (status !== "sending") {
      setStatus("idle");
      setNotice("");
    }
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return "Please complete all fields before sending your message.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (status === "sending") return;

    const validationMessage = validateForm();
    if (validationMessage) {
      setStatus("error");
      setNotice(validationMessage);
      return;
    }

    setStatus("sending");
    setNotice("Sending your message...");

    const templateParams = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      from_name: form.name.trim(),
      from_email: form.email.trim(),
      reply_to: form.email.trim(),
    };

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        { publicKey: emailjsConfig.publicKey },
      );

      setStatus("sent");
      setForm(initialForm);
      setNotice("Thanks. Your message has been sent successfully.");
    } catch {
      setStatus("error");
      setNotice("I could not send the message right now. Please try again in a moment.");
    }
  };

  return (
    <section id="contact" className="section-shell pb-24">
      <SectionHeader eyebrow="Contact" title="Open a research channel">
        Send a message directly to my research inbox for collaborations,
        opportunities, or technical discussions.
      </SectionHeader>
      <GlassPanel data-reveal className="mx-auto max-w-3xl p-6 md:p-8">
        <form onSubmit={onSubmit} className="grid gap-5">
          <label className="field-label">
            Name
            <input
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="field-input"
              placeholder="Your name"
              disabled={status === "sending"}
            />
          </label>
          <label className="field-label">
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="field-input"
              placeholder="you@example.com"
              disabled={status === "sending"}
            />
          </label>
          <label className="field-label">
            Message
            <textarea
              required
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className="field-input min-h-40 resize-y"
              placeholder="Tell me about the collaboration, research idea, or opportunity."
              disabled={status === "sending"}
            />
          </label>
          <button
            className="primary-button justify-center disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
          >
            <Send size={18} />
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {notice && (
            <p
              className={`contact-toast text-center font-mono text-sm ${
                status === "sent"
                  ? "text-labMint"
                  : status === "sending"
                    ? "text-labCyan"
                    : "text-labRose"
              }`}
              role="status"
              aria-live="polite"
            >
              {notice}
            </p>
          )}
        </form>
      </GlassPanel>
    </section>
  );
}
