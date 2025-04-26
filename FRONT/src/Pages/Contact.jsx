import Button from "/src/Components/Partials/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Contact() {
  return (
    <main>
      <section className="main-section">
        <div className="icon_title">
          <FontAwesomeIcon icon={faEnvelope} />
          <h1>Contact</h1>
        </div>
        <article className="text-block">
          <p>
            Vous pouvez nous contacter si vous avez des remarques, des souhaits
            d'articles ou encore des corrections que vous souhaiteriez voir
            apporter à notre blog. Les critiques, si elles sont constructives,
            seront appréciées.
          </p>
        </article>
        <form className="contact-form">
          <label htmlFor="email">Email</label>
          <input
            aria-label="Email"
            placeholder="Votre mail"
            type="email"
            id="email"
            name="email"
            autoComplete="on"
            required
          />

          <label htmlFor="subject">Sujet</label>
          <input
            aria-label="Sujet"
            placeholder="Veuillez ajouter un sujet à votre message"
            type="text"
            id="subject"
            name="subject"
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            aria-label="Message"
            placeholder="Votre message"
            name="message"
            id="message"
            required
          ></textarea>

          <Button
            buttonLabel="Nous contacter"
            icon={faEnvelope}
            variant="primary"
            onClick={() => {
              window.location.href = "mailto:pimpmyspc.contact@gmail.com";
            }}
          />
        </form>
      </section>
    </main>
  );
}

export default Contact;
