import { useState } from "react";
import { GitFork, Link, Mail, Send, Users, Camera } from "lucide-react";
import { motion as Motion, useReducedMotion } from "motion/react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { gmailComposeUrl, personal } from "../data/personal";

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const formEndpoint = formspreeEndpoint || web3FormsKey;

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    if (
      !name ||
      !email ||
      !message ||
      !form.elements.namedItem("email").checkValidity()
    ) {
      setSubmitted(true);
      setStatus(
        "Please enter your name, a valid email address, and a message.",
      );
      return;
    }

    if (!formEndpoint) {
      setSubmitted(true);
      setStatus(
        "The form is not connected yet. Please use the email link instead.",
      );
      return;
    }
    formData.set("name", name);
    formData.set("email", email);
    formData.set("message", message);
    setSubmitted(false);
    setStatus("");
    setIsSending(true);
    try {
      const response = await fetch(
        formspreeEndpoint || "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: formspreeEndpoint
            ? { Accept: "application/json", "Content-Type": "application/json" }
            : undefined,
          body: formspreeEndpoint
            ? JSON.stringify({
                ...Object.fromEntries(formData),
                _subject: "New message from your portfolio",
              })
            : (() => {
                formData.set("access_key", web3FormsKey);
                return formData;
              })(),
        },
      );
      const result = await response.json();
      if (!response.ok || result.success === false || result.errors?.length) {
        throw new Error("The form provider rejected the message");
      }
      setSubmitted(true);
      setStatus(
        "Your message was sent successfully. Thank you for reaching out.",
      );
      form.reset();
    } catch {
      setSubmitted(true);
      setStatus(
        "Your message could not be sent. Please try again or use the email link.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="section" id="contact">
      <SectionHeading
        eyebrow="06 / Contact"
        title="Let’s build or learn together"
        description="Have a project idea, research question, or collaboration in mind?"
      />
      <div className="contact-grid">
        <Reveal className="contact-info-reveal">
          <div className="contact-info">
            {personal.email && (
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noreferrer"
                title="Opens a Gmail compose window"
              >
                <Mail size={20} />
                <div>
                  <span>Email</span>
                  <strong>{personal.email}</strong>
                </div>
              </a>
            )}
            {personal.github && (
              <a href={personal.github} target="_blank" rel="noreferrer">
                <GitFork size={20} />
                <div>
                  <span>GitHub</span>
                  <strong>View repositories</strong>
                </div>
              </a>
            )}
            {personal.linkedin && (
              <a href={personal.linkedin} target="_blank" rel="noreferrer">
                <Link size={20} />
                <div>
                  <span>LinkedIn</span>
                  <strong>Connect professionally</strong>
                </div>
              </a>
            )}
            {personal.facebook && (
              <a href={personal.facebook} target="_blank" rel="noreferrer">
                <Users size={20} />
                <div>
                  <span>Facebook</span>
                  <strong>View profile</strong>
                </div>
              </a>
            )}
            {personal.instagram && (
              <a href={personal.instagram} target="_blank" rel="noreferrer">
                <Camera size={20} />
                <div>
                  <span>Instagram</span>
                  <strong>View profile</strong>
                </div>
              </a>
            )}
            {personal.cvPath && <a className="button" href={personal.cvPath} download>Download CV</a>}
          </div>
        </Reveal>
        <Reveal className="contact-form-reveal" delay={0.1}>
          <form className="contact-form" onSubmit={submit} aria-busy={isSending}>
            {!formEndpoint && (
              <div className="form-notice">
                The contact form is not connected yet. Please use the email link
                or configure the form endpoint.
              </div>
            )}
            <label className="form-trap" aria-hidden="true">
              Leave this field empty
              <input name="_gotcha" tabIndex="-1" autoComplete="off" />
            </label>
            <label>
              Name
              <input name="name" autoComplete="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                required
                rows="5"
                placeholder="Tell me about your idea..."
              />
            </label>
            <button className="button" type="submit" disabled={isSending} aria-busy={isSending}>
              <Send size={16} /> {isSending ? "Sending..." : "Send message"}
            </button>
            {submitted && (
              <Motion.p
                key={status}
                className={
                  status.startsWith("Your message was sent")
                    ? "form-success"
                    : "form-error"
                }
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
                role="status"
              >
                {status}
              </Motion.p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
