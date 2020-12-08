import React from 'react';

export default function About() {
  return (
    <div className="container text-center">
      <h1 className="pt-3 font-weight-bold">Purpose</h1>
      <h3 className="pb-3">
        FPinks.com is a website for uploading and querying fountain pen writing
        samples and reviews. Writing samples are of interest because the visual
        appearance and characteristics of fountain pen writing is very dependent
        on the pen, ink and paper combination. Reviews allows users to vote on
        the subjective qualities of the writing sample.
      </h3>
      <h1 className="pt-3 font-weight-bold">Contact</h1>
      <h3 className="font-weight-bold">DominicFPinks@gmail.com&nbsp;</h3>
      <h3 className="pb-3">
        Feel free to contact for suggestions, bug reports or questions.
      </h3>
      <h1 className="pt-3 font-weight-bold">Support</h1>
      <h3 className="pb-3">
        <a href="https://github.com/DomPSU/fpinks">FPinks</a> is open source
        software. Feel free to create an issue or pull request.
      </h3>
    </div>
  );
}
