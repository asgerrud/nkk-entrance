import { ReactNode } from "react";

export default function TermsAndConditionsPage() {
  return (
    <div
      className="h-screen m-[-32px] p-8 overflow-y-scroll space-y-8"
      data-testid="terms-and-conditions-page"
    >
      <div>
        <h1 className="text-2xl font-bold mb-4">
          HANDELSBETINGELSER FOR DAGSBILLET TIL NØRREBRO KLATREKLUB (NKK)
        </h1>
        <p>Gældende fra 30/07/2025</p>
      </div>

      <div>
        <Heading>1. GENERELT</Heading>
        <p>
          Ved køb af dagsbillet til Nørrebro Klatreklub (NKK) accepterer du
          nedenstående handelsbetingelser. Billetten giver adgang til klubbens
          klatrefaciliteter i den valgte tidsramme og under de gældende
          adgangsregler.
        </p>
      </div>

      <div>
        <Heading>2. GÆSTEKLATRING OG ADGANG</Heading>
        <p>
          Peak-hours (hverdage kl. 15:00 - luk)
          <br />
          Adgang kræver, at du er ledsaget af et aktivt NKK-medlem
          (&quot;buddy&quot;). Din buddy skal være til stede under hele dit
          besøg og købe billetten via QR-koden på døren. Prisen er 50 kr. pr.
          gæst.
          <br />
          OBS: Der er ingen adgang uden buddy i peak-hours - undlad venligst at
          ringe på døren
        </p>
        <br />
        <p>
          Off-peak (hverdage før kl. 15:00 og hele weekenden)
          <br />
          Her er der fri gæsteadgang for alle. Følg anvisningerne på døren og
          betal din billet via QR-koden. <br />
          Du må kun klatre efter betalt adgang.
        </p>
      </div>
      <div>
        <Heading>3. ÅBNINGSTIDER</Heading>
        <p>
          NKK følger Nørrebrohallens officielle åbningstider.
          <br />
          Bemærk at klatrefaciliteterne typisk åbner ca. 15 minutter efter og
          lukker ca. 15 minutter før selve hallens åbningstider.
        </p>
      </div>
      <div>
        <Heading>4. PRIS OG BETALING</Heading>
        <ul className="list-disc ml-5">
          <li>En dagsbillet koster 50 kr.</li>
          <li>
            Betaling foregår udelukkende via den QR-kode, der er opsat på døren
          </li>
          <li>Du skal kunne dokumentere gyldigt billetkøb ved forespørgse</li>
        </ul>
      </div>
      <div>
        <Heading>5. BILLETTENS GYLDIGHED OG REFUSION</Heading>
        <ul className="list-disc ml-5">
          <li>
            Billetten gælder kun for den dag og det tidspunkt, den er købt til
          </li>
          <li>
            Ingen refusion gives for ubrugte billetter, fortrydelse eller
            manglende adgang grundet fejl i adgang eller buddyordning
          </li>
          <li>
            Forkert brug eller misbrug af billetsystemet kan føre til
            bortvisning og evt. karantæne fra klubben
          </li>
        </ul>
      </div>

      <div>
        <Heading>6. ANSVAR OG REGLER FOR BRUG</Heading>
        <ul className="list-disc ml-5">
          <li>Al færdsel og klatring sker på eget ansvar</li>
          <li>
            Klatring uden betalt billet betragtes som brud på klubbens regler
          </li>
          <li>
            Du skal følge klubbens gældende sikkerhedsprocedurer, herunder
            korrekt brug af crash pads, spotning og ansvarlig klatreadfærd
          </li>
          <li>Overtrædelser kan medføre udelukkelse</li>
        </ul>
      </div>

      <div>
        <Heading>7. PERSONOPLYSNINGER</Heading>
        <p>
          Ved betaling gemmes ingen personlige oplysninger ud over det, der er
          nødvendigt for at gennemføre betalingen.
          <br />
          Vi følger gældende databeskyttelseslovgivning.
        </p>
      </div>

      <div>
        <Heading>8. KONTAKT</Heading>
        <p>
          Har du spørgsmål til billetsystemet eller adgang, er du velkommen til
          at kontakte os:{" "}
          <a
            className="btn-link hover:underline"
            href="mailto:sekretariat@nkk.dk"
          >
            sekretariat@nkk.dk
          </a>
        </p>
      </div>
    </div>
  );
}

const Heading = ({ children }: { children: ReactNode }) => (
  <h1 className="text-xl font-bold">{children}</h1>
);
