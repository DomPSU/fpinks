import React from 'react';
import colorsJSON from '../../constants/colors.json';
import nibsJSON from '../../constants/nibs.json';
import papersJSON from '../../constants/papers.json';
import './help.css';

export default function Help() {
  const colorList = colorsJSON.names.map((name, index) => {
    return index !== colorsJSON.names.length - 1 ? (
      <span>{name}, </span>
    ) : (
      <span>{name}</span>
    );
  });

  const nibSizeList = nibsJSON.sizes.map((size, index) => {
    return index !== nibsJSON.sizes.length - 1 ? (
      <span>{size}, </span>
    ) : (
      <span>{size}</span>
    );
  });

  const nibGrindList = nibsJSON.grinds.map((grind, index) => {
    return index !== nibsJSON.grinds.length - 1 ? (
      <span>{grind}, </span>
    ) : (
      <span>{grind}</span>
    );
  });

  const nibTuneList = nibsJSON.tunes.map((tune, index) => {
    return index !== nibsJSON.tunes.length - 1 ? (
      <span>{tune}, </span>
    ) : (
      <span>{tune}</span>
    );
  });

  const paperStyleList = papersJSON.styles.map((style, index) => {
    return index !== papersJSON.styles.length - 1 ? (
      <span>{style}, </span>
    ) : (
      <span>{style}</span>
    );
  });

  return (
    <div id="help" className="text-center">
      <h3 className="pt-5 pb-3 ml-5 mr-5">
        Currently only basic search is provided. Typing &quot;Pilot&quot; will
        provide writing samples with the pen brand &quot;Pilot&quot;, the ink
        brand &quot;Pilot Namiki&quot;, the ink brand &quot;Pilot
        Iroshizuku&quot;, as well as any other writing sample search criteria
        that contain the word &quot;Pilot&quot;.
      </h3>
      <h3 className="pt-3 pb-5 mr-5 ml-5">
        Use longer searches like &quot;Pilot Iroshizuku&quot; or more specific
        searches like &quot;Iroshizuku&quot; for better results. Capitalization
        does not matter. A more robust search will be provided in the future.
      </h3>
      <table className="table table-primary">
        <thead>
          <tr>
            <th scope="col">Search Criteria</th>
            <th scope="col">Example Input</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Color Name</td>
            <td>{colorList}</td>
          </tr>
          <tr>
            <td>Ink Brand</td>
            <td>Noodler&apos;s Ink, Pilot Iroshizuku, Parker Quink, etc</td>
          </tr>
          <tr>
            <td>Ink Name</td>
            <td>Apache Sunset, Kon-Peki, Blue, etc</td>
          </tr>
          <tr>
            <td>Nib Size</td>
            <td>{nibSizeList}</td>
          </tr>
          <tr>
            <td>Nib Grind</td>
            <td>{nibGrindList}</td>
          </tr>
          <tr>
            <td>Nib Tune</td>
            <td>{nibTuneList}</td>
          </tr>
          <tr>
            <td>Paper Brand</td>
            <td>Rhodia, Clairefontaine, Amazon, etc</td>
          </tr>
          <tr>
            <td>Paper Name</td>
            <td>Printer, Notebook, etc</td>
          </tr>
          <tr>
            <td>Paper Style</td>
            <td>{paperStyleList}</td>
          </tr>
          <tr>
            <td>Paper lbs</td>
            <td>20, 30, etc</td>
          </tr>
          <tr>
            <td>Paper grams</td>
            <td>50, 68, 80 etc</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
