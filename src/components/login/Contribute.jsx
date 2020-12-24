import React, { Component } from 'react';
import API from '../../apis/API';
import nibsJSON from '../../constants/nibs.json';
import papersJSON from '../../constants/papers.json';
import { getIDToken } from '../../util/util';

class Contribute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      writingSampleImage: undefined,
      inkBrand: '',
      inkName: '',
      penBrand: '',
      penModel: '',
      nibSize: '',
      nibGrind: '',
      nibTune: '',
      paperBrand: '',
      paperName: '',
      paperStyle: '',
      comment: '',
      clientErrorMessage: '',
      serverErrorMessage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    const { id } = e.target;

    this.setState({
      [id]: value,
    });
  }

  handleFile(e) {
    this.setState({
      writingSampleImage: e.target.files[0],
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ clientErrorMessage: '', serverErrorMessage: '' });
    const { isSignedIn } = this.props;

    const {
      writingSampleImage,
      inkBrand,
      inkName,
      penBrand,
      penModel,
      nibSize,
      nibGrind,
      nibTune,
      paperBrand,
      paperName,
      paperStyle,
      comment,
    } = this.state;

    if (!isSignedIn) {
      this.setState({
        clientErrorMessage: 'You must login before contributing',
      });
      return;
    }

    if (
      writingSampleImage === undefined ||
      inkBrand === '' ||
      inkName === '' ||
      penBrand === '' ||
      penModel === '' ||
      nibSize === '' ||
      nibGrind === '' ||
      nibTune === '' ||
      paperBrand === '' ||
      paperStyle === ''
    ) {
      this.setState({
        clientErrorMessage: 'Only paper name and comment may be blank',
      });

      return;
    }

    if (writingSampleImage.name.length > 900) {
      this.setState({
        clientErrorMessage:
          'Writing sample image name must be 900 characters or less.',
      });

      return;
    }

    if (inkBrand.length > 100) {
      this.setState({
        clientErrorMessage: 'Ink brand must be 100 characters or less.',
      });

      return;
    }

    if (inkName.length > 100) {
      this.setState({
        clientErrorMessage: 'Ink name must be 100 characters or less.',
      });

      return;
    }

    if (penBrand.length > 100) {
      this.setState({
        clientErrorMessage: 'Pen brand must be 100 characters or less.',
      });

      return;
    }

    if (penModel.length > 255) {
      this.setState({
        clientErrorMessage: 'Pen model must be 255 characters or less.',
      });

      return;
    }

    if (paperBrand.length > 100) {
      this.setState({
        clientErrorMessage: 'Paper brand must be 100 characters or less.',
      });

      return;
    }

    if (paperName.length > 100) {
      this.setState({
        clientErrorMessage: 'Paper name must be 100 characters or less.',
      });

      return;
    }

    if (comment.length > 1024) {
      this.setState({
        clientErrorMessage: 'Comment must be 1024 characters or less.',
      });

      return;
    }

    if (
      !(
        writingSampleImage.type === 'image/png' ||
        writingSampleImage.type === 'image/jpg' ||
        writingSampleImage.type === 'image/jpeg'
      )
    ) {
      this.setState({
        clientErrorMessage:
          'Writing sample image must be .jpg, .jpeg or .png format.',
      });

      return;
    }

    if (writingSampleImage.size > 25000000) {
      this.setState({
        clientErrorMessage:
          'Writing sample image must be less than 25 Megabytes.',
      });

      return;
    }

    const formData = new FormData();
    formData.append('writingSampleImage', writingSampleImage);
    formData.append('inkBrand', inkBrand);
    formData.append('inkName', inkName);
    formData.append('penBrand', penBrand);
    formData.append('penModel', penModel);
    formData.append('nibSize', nibSize);
    formData.append('nibGrind', nibGrind);
    formData.append('nibTune', nibTune);
    formData.append('paperBrand', paperBrand);
    formData.append('paperName', paperName);
    formData.append('paperStyle', paperStyle);
    formData.append('comment', comment);

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    this.setState({
      clientErrorMessage: 'Processing submission... please wait 5s.',
    });

    API.instance
      .post('/writing-samples', formData, config)
      .then((res) => {
        this.setState({ clientErrorMessage: '' });
      })
      .catch((error) => {
        console.log(error);

        this.setState({
          clientErrorMessage: '',
          serverErrorMessage: 'A server error occured',
        });
      });
  }

  render() {
    const { isSignedIn } = this.props;
    const { clientErrorMessage, serverErrorMessage } = this.state;

    return (
      <div className="container text-center">
        <div className="row">
          {!isSignedIn && <div className="col-lg-2" />}
          {!isSignedIn && (
            <h3 className="col-lg-8 pb-3 pt-3 border-bottom border-dark m-1">
              You must <a href="/login">Login</a> before contributing.
            </h3>
          )}
          <div className="col-lg-2" />
          <h3 className="col-lg-8 pb-3 pt-3 border-bottom border-dark m-1">
            A contribution may simply be written words. Feel free to add
            anything else but we suggest the following: waterproofness, drying
            time, ghosting/bleed-through.
          </h3>
          <div className="col-lg-2" />
        </div>
        <form className="m-1">
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="writingSampleImage" className="p-3 m-0">
                <input
                  type="file"
                  id="writingSampleImage"
                  className="form-control-file p-1"
                  onChange={this.handleFile}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="nibSize" className="p-3 m-0">
                Nib Size
                <select
                  className="form-control"
                  id="nibSize"
                  onBlur={this.handleChange}
                >
                  <option> </option>
                  {nibsJSON.sizes.map((size) => {
                    return <option>{size}</option>;
                  })}
                </select>
              </label>
              <label htmlFor="nibGrind" className="p-3 m-0">
                Nib Grind
                <select
                  className="form-control"
                  id="nibGrind"
                  onBlur={this.handleChange}
                >
                  <option> </option>
                  {nibsJSON.grinds.map((grind) => {
                    return <option>{grind}</option>;
                  })}
                </select>
              </label>
              <label htmlFor="nibTune" className="p-3 m-0">
                Nib Tune
                <select
                  className="form-control"
                  id="nibTune"
                  onBlur={this.handleChange}
                >
                  <option> </option>
                  {nibsJSON.tunes.map((tune) => {
                    return <option>{tune}</option>;
                  })}
                </select>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="inkBrand" className="p-3 m-0">
                Ink Brand
                <input
                  type="text"
                  id="inkBrand"
                  className="form-control text-center"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="inkName" className="p-3 m-0">
                Ink Name
                <input
                  type="text"
                  id="inkName"
                  className="form-control text-center"
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="penBrand" className="p-3 m-0">
                Pen Brand
                <input
                  type="text"
                  id="penBrand"
                  className="form-control text-center"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="penModel" className="p-3 m-0">
                Pen Model
                <input
                  type="text"
                  id="penModel"
                  className="form-control text-center"
                  onChange={this.handleChange}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-lg-offset-12">
              <label htmlFor="paperBrand" className="p-3 m-0">
                Paper Brand
                <input
                  type="text"
                  id="paperBrand"
                  className="form-control text-center"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="paperName" className="p-3 m-0">
                Paper name
                <input
                  type="text"
                  id="paperName"
                  className="form-control text-center"
                  placeholder="May be blank"
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="paperStyle" className="p-3 m-0">
                Paper style
                <select
                  className="form-control"
                  id="paperStyle"
                  onBlur={this.handleChange}
                >
                  <option> </option>
                  {papersJSON.styles.map((style) => {
                    return <option>{style}</option>;
                  })}
                </select>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-1" />
            <div className="col-lg-10 col-lg-offset-12">
              <label htmlFor="comment" className="p-3 m-0 w-100">
                Comment
                <textarea
                  id="comment"
                  className="form-control text-center"
                  onChange={this.handleChange}
                  placeholder="If a dropdown above does not offer a proper choice for this writing sample, please let us know which choice is needed for which dropdown."
                />
              </label>
            </div>
            <div className="col-lg-1" />
          </div>
          <button
            type="submit"
            className="btn btn-primary m-1"
            data-toggle="modal"
            data-target="#contributeModal"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
        <div
          className="modal fade"
          id="contributeModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="contributeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                {clientErrorMessage}
                {serverErrorMessage}
                {!clientErrorMessage &&
                  !serverErrorMessage &&
                  'Thanks! Your contribution is being processed.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contribute;
