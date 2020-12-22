import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import API from '../../apis/API';
import Login from '../login/Login';
import { capitalize, getIDToken } from '../../util/util';
import colorsJSON from '../../constants/colors.json';
import shadingsJSON from '../../constants/shadings.json';
import sheensJSON from '../../constants/sheens.json';
import featheringsJSON from '../../constants/featherings.json';
import watersJSON from '../../constants/waters.json';
import dryingTimesJSON from '../../constants/dryingTimes.json';
import transparenciesJSON from '../../constants/transparencies.json';
import './writingSample.css';

class WritingSample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      writingSample: {},
      colorReviews: [],
      shadingReviews: [],
      sheenReviews: [],
      waterReviews: [],
      dryingReviews: [],
      transparencyReviews: [],
      featheringReviews: [],
      priorColorOneChoice: '',
      priorColorTwoChoice: '',
      priorColorThreeChoice: '',
      priorShadingChoice: '',
      priorSheenAmountChoice: '',
      priorSheenColorChoice: '',
      priorFeatheringChoice: '',
      priorWaterChoice: '',
      priorDryingTimeChoice: '',
      priorTransparencyChoice: '',
      colorOneChoice: '',
      colorTwoChoice: '',
      colorThreeChoice: '',
      shadingChoice: '',
      sheenAmountChoice: '',
      sheenColorChoice: '',
      featheringChoice: '',
      waterChoice: '',
      dryingTimeChoice: '',
      transparencyChoice: '',
      clientErrorMessage: '',
      serverErrorMessage: '',
    };

    this.getPriorColorReviews = this.getPriorColorReviews.bind(this);
    this.getPriorShadingReview = this.getPriorShadingReview.bind(this);
    this.getPriorSheenReview = this.getPriorSheenReview.bind(this);
    this.getPriorFeatheringReview = this.getPriorFeatheringReview.bind(this);
    this.getPriorWaterReview = this.getPriorWaterReview.bind(this);
    this.getPriorDryingReview = this.getPriorDryingReview.bind(this);
    this.getPriorTransparencyReview = this.getPriorTransparencyReview.bind(
      this,
    );

    this.getWritingSample = this.getWritingSample.bind(this);
    this.getColorReviews = this.getColorReviews.bind(this);
    this.getShadingReviews = this.getShadingReviews.bind(this);
    this.getSheenReviews = this.getSheenReviews.bind(this);
    this.getWaterReviews = this.getWaterReviews.bind(this);
    this.getDryingReviews = this.getDryingReviews.bind(this);
    this.getTransparencyReviews = this.getTransparencyReviews.bind(this);
    this.getFeatheringReviews = this.getFeatheringReviews.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { isSignedIn } = this.props;

    const writingSample = await this.getWritingSample();

    const validWaterproofness = writingSample.valid_waterproofness;
    const validDryingTime = writingSample.valid_drying_time;
    const validTransparency = writingSample.valid_transparency;

    this.getColorReviews();
    this.getShadingReviews();
    this.getSheenReviews();
    this.getFeatheringReviews();

    if (validWaterproofness) {
      this.getWaterReviews();
    }

    if (validDryingTime) {
      this.getDryingReviews();
    }

    if (validTransparency) {
      this.getTransparencyReviews();
    }

    if (isSignedIn) {
      this.getPriorColorReviews();
      this.getPriorShadingReview();
      this.getPriorSheenReview();
      this.getPriorFeatheringReview();
    }

    if (isSignedIn && validWaterproofness) {
      this.getPriorWaterReview();
    }

    if (isSignedIn && validDryingTime) {
      this.getPriorDryingReview();
    }

    if (isSignedIn && validTransparency) {
      this.getPriorTransparencyReview();
    }
  }

  async getWritingSample() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `writing-samples/${id}`;

    let res;
    try {
      res = await API.instance.get(url);
      this.setState({ writingSample: res.data[0] });
    } catch (err) {
      console.log(err);
    }

    return res.data[0];
  }

  getPriorColorReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `color-reviews/${id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .get(url, config)
      .then((res) => {
        const priorColorOneChoice =
          res.data.length >= 1 ? capitalize(res.data[0].color) : '';
        const priorColorTwoChoice =
          res.data.length >= 2 ? capitalize(res.data[1].color) : '';
        const priorColorThreeChoice =
          res.data.length >= 3 ? capitalize(res.data[2].color) : '';

        this.setState({
          priorColorOneChoice,
          colorOneChoice: priorColorOneChoice,
          priorColorTwoChoice,
          colorTwoChoice: priorColorTwoChoice,
          priorColorThreeChoice,
          colorThreeChoice: priorColorThreeChoice,
        });
      })
      .catch((error) => console.log(error.response));
  }

  getPriorShadingReview() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `shading-reviews/${id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .get(url, config)
      .then((res) => {
        if (res.data.length === 1) {
          const priorShadingChoice = capitalize(res.data[0].amount);
          this.setState({
            priorShadingChoice,
            shadingChoice: priorShadingChoice,
          });
        }
      })
      .catch((error) => console.log(error.response));
  }

  getPriorSheenReview() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `sheen-reviews/${id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .get(url, config)
      .then((res) => {
        if (res.data.length === 1) {
          const priorSheenColorChoice = capitalize(res.data[0].color);
          const priorSheenAmountChoice = capitalize(res.data[0].amount);
          this.setState({
            priorSheenColorChoice,
            sheenColorChoice: priorSheenColorChoice,
            priorSheenAmountChoice,
            sheenAmountChoice: priorSheenAmountChoice,
          });
        }
      })
      .catch((error) => console.log(error.response));
  }

  getPriorFeatheringReview() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `feathering-reviews/${id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .get(url, config)
      .then((res) => {
        if (res.data.length === 1) {
          const priorFeatheringChoice = capitalize(res.data[0].amount);
          this.setState({
            priorFeatheringChoice,
            featheringChoice: priorFeatheringChoice,
          });
        }
      })
      .catch((error) => console.log(error.response));
  }

  getPriorWaterReview() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `water-reviews/${id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .get(url, config)
      .then((res) => {
        if (res.data.length === 1) {
          const priorWaterChoice = capitalize(res.data[0].waterproofness);
          this.setState({
            priorWaterChoice,
            waterChoice: priorWaterChoice,
          });
        }
      })
      .catch((error) => console.log(error.response));
  }

  getPriorDryingReview() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `drying-reviews/${id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .get(url, config)
      .then((res) => {
        if (res.data.length === 1) {
          const priorDryingTimeChoice = capitalize(res.data[0].drying_time);
          this.setState({
            priorDryingTimeChoice,
            dryingTimeChoice: priorDryingTimeChoice,
          });
        }
      })
      .catch((error) => console.log(error.response));
  }

  getPriorTransparencyReview() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `transparency-reviews/${id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    API.instance
      .get(url, config)
      .then((res) => {
        if (res.data.length === 1) {
          const priorTransparencyChoice = capitalize(res.data[0].transparency);
          this.setState({
            priorTransparencyChoice,
            transparencyChoice: priorTransparencyChoice,
          });
        }
      })
      .catch((error) => console.log(error.response));
  }

  getColorReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `color-reviews/?writing_sample_id=${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ colorReviews: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  getShadingReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `shading-reviews/?writing_sample_id=${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ shadingReviews: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  getSheenReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `sheen-reviews/?writing_sample_id=${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ sheenReviews: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  getFeatheringReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `feathering-reviews/?writing_sample_id=${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ featheringReviews: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  getWaterReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `water-reviews/?writing_sample_id=${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ waterReviews: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  getDryingReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `drying-reviews/?writing_sample_id=${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ dryingReviews: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  getTransparencyReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `transparency-reviews/?writing_sample_id=${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ transparencyReviews: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  handleChange(e) {
    const { value } = e.target;
    const { id } = e.target;

    this.setState({
      [id]: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    let clientError = false;
    this.setState({
      clientErrorMessage: '',
      serverErrorMessage: '',
    });

    const {
      priorColorOneChoice,
      priorColorTwoChoice,
      priorColorThreeChoice,
      priorShadingChoice,
      priorSheenAmountChoice,
      priorSheenColorChoice,
      priorFeatheringChoice,
      priorWaterChoice,
      priorDryingTimeChoice,
      priorTransparencyChoice,
      colorOneChoice,
      colorTwoChoice,
      colorThreeChoice,
      shadingChoice,
      sheenAmountChoice,
      sheenColorChoice,
      featheringChoice,
      waterChoice,
      dryingTimeChoice,
      transparencyChoice,
    } = this.state;

    const colorReviewChoices = [
      colorOneChoice,
      colorTwoChoice,
      colorThreeChoice,
    ];

    const nonBlankColorReviewChoices = colorReviewChoices.filter(function (
      colorReviewChoice,
    ) {
      return colorReviewChoice !== '';
    });

    const uniqueColorReviewChoices = [...new Set(nonBlankColorReviewChoices)];

    if (nonBlankColorReviewChoices.length !== uniqueColorReviewChoices.length) {
      clientError = true;
      this.setState((prevState) => {
        return {
          clientErrorMessage: `${prevState.clientErrorMessage}Color Reviews must have unique colors. `,
        };
      });
    }

    if (
      uniqueColorReviewChoices.includes('None') &&
      uniqueColorReviewChoices.length !== 1
    ) {
      clientError = true;
      this.setState((prevState) => {
        return {
          clientErrorMessage: `${prevState.clientErrorMessage}Color Reviews must contain no other colors if 'None' is selected.`,
        };
      });
    }

    if (sheenAmountChoice === '' && sheenColorChoice !== '') {
      clientError = true;
      this.setState((prevState) => {
        return {
          clientErrorMessage: `${prevState.clientErrorMessage}If sheen amount is blank then sheen color must be blank. `,
        };
      });
    }

    if (sheenAmountChoice !== '' && sheenColorChoice === '') {
      clientError = true;
      this.setState((prevState) => {
        return {
          clientErrorMessage: `${prevState.clientErrorMessage}If sheen color is blank then sheen amount must be blank. `,
        };
      });
    }

    if (sheenAmountChoice === 'None' && sheenColorChoice !== 'None') {
      clientError = true;
      this.setState((prevState) => {
        return {
          clientErrorMessage: `${prevState.clientErrorMessage}If sheen amount is 'None' then sheen color must be 'None'. `,
        };
      });
    }

    if (sheenAmountChoice !== 'None' && sheenColorChoice === 'None') {
      clientError = true;
      this.setState((prevState) => {
        return {
          clientErrorMessage: `${prevState.clientErrorMessage}If sheen color is 'None' then sheen amount must be 'None'. `,
        };
      });
    }

    if (
      colorOneChoice === priorColorOneChoice &&
      colorTwoChoice === priorColorTwoChoice &&
      colorThreeChoice === priorColorThreeChoice &&
      shadingChoice === priorShadingChoice &&
      sheenAmountChoice === priorSheenAmountChoice &&
      sheenColorChoice === priorSheenColorChoice &&
      featheringChoice === priorFeatheringChoice &&
      waterChoice === priorWaterChoice &&
      dryingTimeChoice === priorDryingTimeChoice &&
      transparencyChoice === priorTransparencyChoice
    ) {
      this.setState((prevState) => {
        return {
          clientErrorMessage: `${prevState.clientErrorMessage}All Review choices already exist.`,
        };
      });
    }

    if (clientError) {
      return;
    }

    const writingSampleID = window.location.pathname.replace(
      '/writing-samples/',
      '',
    );

    const config = {
      headers: {
        Authorization: `Bearer ${getIDToken()}`,
      },
    };

    if (
      colorOneChoice !== priorColorOneChoice ||
      colorTwoChoice !== priorColorTwoChoice ||
      colorThreeChoice !== priorColorThreeChoice
    ) {
      const url = `color-reviews/${writingSampleID}`;

      if (
        priorColorOneChoice !== '' ||
        priorColorTwoChoice !== '' ||
        priorColorThreeChoice !== ''
      ) {
        try {
          await API.instance.delete(url, config);

          this.setState({
            priorColorOneChoice: '',
            priorColorTwoChoice: '',
            priorColorThreeChoice: '',
          });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot delete prior color reviews. `,
            };
          });
        }
      }

      if (colorOneChoice !== '') {
        const colorOneReview = {
          writingSampleID,
          color: colorOneChoice,
        };

        try {
          await API.instance.post('color-reviews', colorOneReview, config);

          this.setState({
            priorColorOneChoice: colorOneChoice,
          });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot create first color review. `,
            };
          });
        }
      }

      if (colorTwoChoice !== '') {
        const colorTwoReview = {
          writingSampleID,
          color: colorTwoChoice,
        };

        try {
          await API.instance.post('color-reviews', colorTwoReview, config);

          this.setState({
            priorColorTwoChoice: colorTwoChoice,
          });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot create second color review. `,
            };
          });
        }
      }

      if (colorThreeChoice !== '') {
        const colorThreeReview = {
          writingSampleID,
          color: colorThreeChoice,
        };

        try {
          await API.instance.post('color-reviews', colorThreeReview, config);

          this.setState({
            priorColorThreeChoice: colorThreeChoice,
          });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot create third color review. `,
            };
          });
        }
      }

      this.getColorReviews();
    }

    if (shadingChoice !== priorShadingChoice) {
      const url = `shading-reviews/${writingSampleID}`;

      if (priorShadingChoice !== '') {
        try {
          await API.instance.delete(url, config);

          this.setState({
            priorShadingChoice: '',
          });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot delete prior shading review. `,
            };
          });
        }
      }

      if (shadingChoice !== '') {
        const shadingReview = {
          writingSampleID,
          amount: shadingChoice,
        };

        try {
          await API.instance.post('shading-reviews', shadingReview, config);

          this.setState({
            priorShadingChoice: shadingChoice,
          });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot create shading review. `,
            };
          });
        }
      }

      this.getShadingReviews();
    }

    if (
      sheenColorChoice !== priorSheenColorChoice ||
      sheenAmountChoice !== priorSheenAmountChoice
    ) {
      const url = `sheen-reviews/${writingSampleID}`;

      if (priorSheenColorChoice !== '' && priorSheenAmountChoice !== '') {
        try {
          await API.instance.delete(url, config);

          this.setState({
            priorSheenAmountChoice: '',
            priorSheenColorChoice: '',
          });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot delete prior sheen review. `,
            };
          });
        }
      }

      if (sheenColorChoice !== '' || sheenAmountChoice !== '') {
        const sheenReview = {
          writingSampleID,
          amount: sheenAmountChoice,
          color: sheenColorChoice,
        };

        try {
          await API.instance.post('sheen-reviews', sheenReview, config);

          this.setState({
            priorSheenAmountChoice: sheenAmountChoice,
            priorSheenColorChoice: sheenColorChoice,
          });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot create sheen review. `,
            };
          });
        }
      }

      this.getSheenReviews();
    }

    if (featheringChoice !== priorFeatheringChoice) {
      const url = `feathering-reviews/${writingSampleID}`;

      if (priorFeatheringChoice !== '') {
        try {
          await API.instance.delete(url, config);

          this.setState({
            priorFeatheringChoice: '',
          });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot delete prior feathering review. `,
            };
          });
        }
      }

      if (featheringChoice !== '') {
        const featheringReview = {
          writingSampleID,
          amount: featheringChoice,
        };

        try {
          await API.instance.post(
            'feathering-reviews',
            featheringReview,
            config,
          );

          this.setState({
            priorFeatheringChoice: featheringChoice,
          });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot create feathering review. `,
            };
          });
        }
      }

      this.getFeatheringReviews();
    }

    if (waterChoice !== priorWaterChoice) {
      const url = `water-reviews/${writingSampleID}`;

      if (priorWaterChoice !== '') {
        try {
          await API.instance.delete(url, config);

          this.setState({ priorWaterChoice: '' });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot delete prior waterproofness review. `,
            };
          });
        }
      }

      if (waterChoice !== '') {
        const waterReview = {
          writingSampleID,
          waterproofness: waterChoice,
        };

        try {
          await API.instance.post('water-reviews', waterReview, config);

          this.setState({ priorWaterChoice: waterChoice });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot create waterproofness review. `,
            };
          });
        }
      }

      this.getWaterReviews();
    }

    if (dryingTimeChoice !== priorDryingTimeChoice) {
      const url = `drying-reviews/${writingSampleID}`;

      if (priorDryingTimeChoice !== '') {
        try {
          await API.instance.delete(url, config);

          this.setState({ priorDryingTimeChoice: '' });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot delete prior drying time review. `,
            };
          });
        }
      }

      if (dryingTimeChoice !== '') {
        const dryingReview = {
          writingSampleID,
          dryingTime: dryingTimeChoice,
        };

        try {
          await API.instance.post('drying-reviews', dryingReview, config);

          this.setState({ priorDryingTimeChoice: dryingTimeChoice });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot create drying time review. `,
            };
          });
        }
      }

      this.getDryingReviews();
    }

    if (transparencyChoice !== priorTransparencyChoice) {
      const url = `transparency-reviews/${writingSampleID}`;

      if (priorTransparencyChoice !== '') {
        try {
          await API.instance.delete(url, config);

          this.setState({ priorTransparencyChoice: '' });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot delete prior transparency review. `,
            };
          });
        }
      }

      if (transparencyChoice !== '') {
        const transparencyReview = {
          writingSampleID,
          transparency: transparencyChoice,
        };

        try {
          await API.instance.post(
            'transparency-reviews',
            transparencyReview,
            config,
          );

          this.setState({ priorTransparencyChoice: transparencyChoice });
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              serverErrorMessage: `${prevState.serverErrorMessage}Cannot create transparency review. `,
            };
          });
        }
      }

      this.getTransparencyReviews();
    }
  }

  render() {
    const { isSignedIn, signIn } = this.props;

    const {
      writingSample,
      colorReviews,
      shadingReviews,
      sheenReviews,
      waterReviews,
      dryingReviews,
      transparencyReviews,
      featheringReviews,
      priorColorOneChoice,
      priorColorTwoChoice,
      priorColorThreeChoice,
      priorShadingChoice,
      priorSheenAmountChoice,
      priorSheenColorChoice,
      priorFeatheringChoice,
      priorWaterChoice,
      priorDryingTimeChoice,
      priorTransparencyChoice,
    } = this.state;

    let { clientErrorMessage, serverErrorMessage } = this.state;

    /* eslint-disable no-unneeded-ternary */
    const validWaterproofness = writingSample.valid_waterproofness
      ? true
      : false;

    const validDryingTime = writingSample.valid_drying_time ? true : false;

    const validTransparency = writingSample.valid_transparency ? true : false;
    /* eslint-enable no-unneeded-ternary */

    if (clientErrorMessage) {
      clientErrorMessage = `No reviews submitted. ${clientErrorMessage}`;
    }

    if (serverErrorMessage) {
      serverErrorMessage = `Most reviews are being processed,  but at least one error occured. ${serverErrorMessage}Please wait 30s and try to resubmit.`;
    }

    const red = 'FF4136';
    const lightRed = 'FF6E66';
    const orange = 'FF851B';
    const lightOrange = 'FFA04D';
    const yellow = 'FFDC00';
    const lightYellow = 'FFE433';
    const green = '2ECC40';
    const lightGreen = '44D555';
    const blue = '0074D9';
    const lightBlue = '0088FF';
    const purple = 'B10DC9';
    const lightPurple = 'D20FF0';
    const pink = 'F012BE';
    const lightPink = 'F33FC9';
    const black = '111111';
    const lightBlack = '222222';
    const grey = 'AAAAAA';
    const lightGrey = 'BBBBBB';
    const brown = '8b4513';
    const lightBrown = 'b45918';
    const gold = 'fcc200';
    const lightGold = 'FFC91A';
    const silver = 'DDDDDD';
    const lightSilver = 'CCCCCC';
    const white = 'FFFFFF';
    const lightWhite = 'EEEEEE';
    const none = '444444';

    const defaultChartColors = [
      red,
      orange,
      yellow,
      green,
      blue,
      purple,
      pink,
      black,
      grey,
      brown,
      gold,
      silver,
      white,
      none,
    ];

    // process colorReviews
    const colorCounts = [];
    colorReviews.forEach((colorReview) => {
      const { color } = colorReview;
      colorCounts[color] = colorCounts[color] ? colorCounts[color] + 1 : 1;
    });

    const colorData = [['Color', 'Number of reviews']];
    const colorChartColors = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(colorCounts)) {
      colorData.push([capitalize(key), value]);

      if (key === 'red') {
        colorChartColors.push(red);
      } else if (key === 'orange') {
        colorChartColors.push(orange);
      } else if (key === 'yellow') {
        colorChartColors.push(yellow);
      } else if (key === 'green') {
        colorChartColors.push(green);
      } else if (key === 'blue') {
        colorChartColors.push(blue);
      } else if (key === 'purple') {
        colorChartColors.push(purple);
      } else if (key === 'pink') {
        colorChartColors.push(pink);
      } else if (key === 'black') {
        colorChartColors.push(black);
      } else if (key === 'grey') {
        colorChartColors.push(grey);
      } else if (key === 'brown') {
        colorChartColors.push(brown);
      } else if (key === 'gold') {
        colorChartColors.push(gold);
      } else if (key === 'silver') {
        colorChartColors.push(silver);
      } else if (key === 'white') {
        colorChartColors.push(white);
      } else if (key === 'none') {
        colorChartColors.push(none);
      }
    }

    // process shadingReviews
    const shadingCounts = [];
    shadingReviews.forEach((shadingReview) => {
      const { amount } = shadingReview;
      shadingCounts[amount] = shadingCounts[amount]
        ? shadingCounts[amount] + 1
        : 1;
    });

    const shadingData = [['Shading', 'Number of reviews']];

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(shadingCounts)) {
      shadingData.push([capitalize(key), value]);
    }

    // process sheenReviews
    const sheenCounts = [];
    sheenReviews.forEach((sheenReview) => {
      const { amount, color } = sheenReview;

      sheenCounts[`${amount} ${color}`] = sheenCounts[`${amount} ${color}`]
        ? sheenCounts[`${amount} ${color}`] + 1
        : 1;
    });

    const sheenData = [['Sheen', 'Number of reviews']];
    const sheenChartColors = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(sheenCounts)) {
      if (key !== 'none none') {
        sheenData.push([capitalize(key), value]);
      } else {
        sheenData.push(['None', value]);
      }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(sheenCounts)) {
      if (key === 'heavy red') {
        sheenChartColors.push(red);
      } else if (key === 'light red') {
        sheenChartColors.push(lightRed);
      } else if (key === 'heavy orange') {
        sheenChartColors.push(orange);
      } else if (key === 'light orange') {
        sheenChartColors.push(lightOrange);
      } else if (key === 'heavy yellow') {
        sheenChartColors.push(yellow);
      } else if (key === 'light yellow') {
        sheenChartColors.push(lightYellow);
      } else if (key === 'heavy green') {
        sheenChartColors.push(green);
      } else if (key === 'light green') {
        sheenChartColors.push(lightGreen);
      } else if (key === 'heavy blue') {
        sheenChartColors.push(blue);
      } else if (key === 'light blue') {
        sheenChartColors.push(lightBlue);
      } else if (key === 'heavy purple') {
        sheenChartColors.push(purple);
      } else if (key === 'light purple') {
        sheenChartColors.push(lightPurple);
      } else if (key === 'heavy pink') {
        sheenChartColors.push(pink);
      } else if (key === 'light pink') {
        sheenChartColors.push(lightPink);
      } else if (key === 'heavy black') {
        sheenChartColors.push(black);
      } else if (key === 'light black') {
        sheenChartColors.push(lightBlack);
      } else if (key === 'heavy grey') {
        sheenChartColors.push(grey);
      } else if (key === 'light grey') {
        sheenChartColors.push(lightGrey);
      } else if (key === 'heavy brown') {
        sheenChartColors.push(brown);
      } else if (key === 'light brown') {
        sheenChartColors.push(lightBrown);
      } else if (key === 'heavy gold') {
        sheenChartColors.push(gold);
      } else if (key === 'light gold') {
        sheenChartColors.push(lightGold);
      } else if (key === 'heavy silver') {
        sheenChartColors.push(silver);
      } else if (key === 'light silver') {
        sheenChartColors.push(lightSilver);
      } else if (key === 'heavy white') {
        sheenChartColors.push(white);
      } else if (key === 'light white') {
        sheenChartColors.push(lightWhite);
      } else if (key === 'none none') {
        sheenChartColors.push(none);
      }
    }

    // process featheringReviews
    const featheringCounts = [];
    featheringReviews.forEach((featheringReview) => {
      const { amount } = featheringReview;

      featheringCounts[amount] = featheringCounts[amount]
        ? featheringCounts[amount] + 1
        : 1;
    });

    const featheringData = [['Feathering', 'Number of reviews']];

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(featheringCounts)) {
      featheringData.push([capitalize(key), value]);
    }

    // process waterReviews
    const waterCounts = [];
    waterReviews.forEach((waterReview) => {
      const { waterproofness } = waterReview;

      waterCounts[waterproofness] = waterCounts[waterproofness]
        ? waterCounts[waterproofness] + 1
        : 1;
    });

    const waterData = [['Waterproofness', 'Number of reviews']];

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(waterCounts)) {
      waterData.push([capitalize(key), value]);
    }

    // process dryingReviews
    const dryingCounts = [];
    dryingReviews.forEach((dryingReview) => {
      const dryingTime = dryingReview.drying_time;

      dryingCounts[dryingTime] = dryingCounts[dryingTime]
        ? dryingCounts[dryingTime] + 1
        : 1;
    });

    const dryingData = [['Drying Time', 'Number of reviews']];

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(dryingCounts)) {
      dryingData.push([key, value]);
    }

    // process transparencyReviews
    const transparencyCounts = [];
    transparencyReviews.forEach((transparencyReview) => {
      const { transparency } = transparencyReview;

      transparencyCounts[transparency] = transparencyCounts[transparency]
        ? transparencyCounts[transparency] + 1
        : 1;
    });

    const transparencyData = [['Transparency', 'Number of reviews']];

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(transparencyCounts)) {
      transparencyData.push([capitalize(key), value]);
    }

    return (
      <div className="container-fluid text-center topmargin">
        <div className="row ml-1 mb-3 mr-1 rounded bg-light ">
          <div className="col-12 col-sm-6 col-lg-3 text-center pt-1 pb-1">
            <h4>
              Ink: {capitalize(writingSample.ink_brand)}{' '}
              {capitalize(writingSample.ink_name)}
            </h4>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 text-center pt-1 pb-1">
            <h4>
              Pen: {capitalize(writingSample.pen_brand)}{' '}
              {capitalize(writingSample.pen_model)}
            </h4>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 text-center pt-1 pb-1">
            <h4>
              Nib: {capitalize(writingSample.nib_grind)}{' '}
              {capitalize(writingSample.nib_size)}{' '}
              {capitalize(writingSample.nib_tune)}
            </h4>
          </div>
          <div className="col-12 col-sm-6 col-lg-3 text-center pt-1 pb-1">
            <h4>
              Paper: {capitalize(writingSample.paper_brand)}{' '}
              {capitalize(writingSample.paper_name)}{' '}
            </h4>
          </div>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h2 className="mb-0">
                <button
                  className="btn btn-link btn-block text-left collpased text-center"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  High Resolution Image
                </button>
              </h2>
            </div>

            <div
              id="collapseOne"
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <img
                src={writingSample.high_res_url}
                alt="writing sample"
                className="w-100"
              />
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingTwo">
              <h2 className="mb-0">
                <button
                  className="btn btn-link btn-block text-left collapsed text-center"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Review
                </button>
              </h2>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordionExample"
            >
              {isSignedIn && (
                <div>
                  <h3 className="p-5">
                    Feel free to leave a review category blank, but any prior
                    reviews in that category will be deleted.
                  </h3>
                  <form className="m-1">
                    <div className="row">
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <label htmlFor="colorChoices" className="p-3 m-0">
                          Color
                          <div className="row">
                            <div className="col-4">
                              <select
                                className="form-control m-1"
                                id="colorOneChoice"
                                onBlur={this.handleChange}
                              >
                                <option disabled selected>
                                  {priorColorOneChoice}
                                </option>
                                <option />
                                {colorsJSON.names.map((color) => {
                                  return <option>{color}</option>;
                                })}
                              </select>
                            </div>
                            <div className="col-4">
                              <select
                                className="form-control m-1"
                                id="colorTwoChoice"
                                onBlur={this.handleChange}
                              >
                                <option disabled selected>
                                  {priorColorTwoChoice}
                                </option>
                                <option />
                                {colorsJSON.names.map((color) => {
                                  return <option>{color}</option>;
                                })}
                              </select>
                            </div>
                            <div className="col-4">
                              <select
                                className="form-control m-1"
                                id="colorThreeChoice"
                                onBlur={this.handleChange}
                              >
                                <option disabled selected>
                                  {priorColorThreeChoice}
                                </option>
                                <option />
                                {colorsJSON.names.map((color) => {
                                  return <option>{color}</option>;
                                })}
                              </select>
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <label htmlFor="shadingChoice" className="p-3 m-0">
                          Shading
                          <select
                            className="form-control m-1"
                            id="shadingChoice"
                            onBlur={this.handleChange}
                          >
                            <option disabled selected>
                              {priorShadingChoice}
                            </option>
                            <option />
                            {shadingsJSON.names.map((amount) => {
                              return <option>{amount}</option>;
                            })}
                          </select>
                        </label>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <label htmlFor="sheenChoices" className="p-3 m-0">
                          Sheen
                          <div className="row">
                            <div className="col-6">
                              <select
                                className="form-control m-1"
                                id="sheenAmountChoice"
                                onBlur={this.handleChange}
                              >
                                <option disabled selected>
                                  {priorSheenAmountChoice}
                                </option>
                                <option />
                                {sheensJSON.names.map((amount) => {
                                  return <option>{amount}</option>;
                                })}
                              </select>
                            </div>
                            <div className="col-6">
                              <select
                                className="form-control m-1"
                                id="sheenColorChoice"
                                onBlur={this.handleChange}
                              >
                                <option disabled selected>
                                  {priorSheenColorChoice}
                                </option>
                                <option />
                                <option>None</option>
                                {colorsJSON.names.map((color) => {
                                  if (color === 'None') {
                                    return null;
                                  }
                                  return <option>{color}</option>;
                                })}
                              </select>
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <label htmlFor="featheringChoice" className="p-3 m-0">
                          Feathering
                          <select
                            className="form-control m-1"
                            id="featheringChoice"
                            onBlur={this.handleChange}
                          >
                            <option disabled selected>
                              {priorFeatheringChoice}
                            </option>
                            <option />
                            {featheringsJSON.names.map((amount) => {
                              return <option>{amount}</option>;
                            })}
                          </select>
                        </label>
                      </div>
                      {validWaterproofness && (
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                          <label htmlFor="waterChoice" className="p-3 m-0">
                            Waterproofness
                            <select
                              className="form-control m-1"
                              id="waterChoice"
                              onBlur={this.handleChange}
                            >
                              <option disabled selected>
                                {priorWaterChoice}
                              </option>
                              <option />
                              {watersJSON.names.map((amount) => {
                                return <option>{amount}</option>;
                              })}
                            </select>
                          </label>
                        </div>
                      )}
                      {validDryingTime && (
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                          <label htmlFor="dryingTimeChoice" className="p-3 m-0">
                            Drying Time
                            <select
                              className="form-control m-1"
                              id="dryingTimeChoice"
                              onBlur={this.handleChange}
                            >
                              <option disabled selected>
                                {priorDryingTimeChoice}
                              </option>
                              <option />
                              {dryingTimesJSON.names.map((time) => {
                                return <option>{time}</option>;
                              })}
                            </select>
                          </label>
                        </div>
                      )}
                      {validTransparency && (
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                          <label
                            htmlFor="transparencyChoice"
                            className="p-3 m-0"
                          >
                            Transparency
                            <select
                              className="form-control m-1"
                              id="transparencyChoice"
                              onBlur={this.handleChange}
                            >
                              <option disabled selected>
                                {priorTransparencyChoice}
                              </option>
                              <option />
                              {transparenciesJSON.names.map((amount) => {
                                return <option>{amount}</option>;
                              })}
                            </select>
                          </label>
                        </div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#reviewModal"
                      onClick={this.handleSubmit}
                    >
                      Submit Reviews
                    </button>
                  </form>
                </div>
              )}
              <div
                className="modal fade"
                id="reviewModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="reviewModalLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-body">
                      {clientErrorMessage}
                      {serverErrorMessage}
                      {!clientErrorMessage &&
                        !serverErrorMessage &&
                        'Thanks! All of your reviews are being processed.'}
                    </div>
                  </div>
                </div>
              </div>
              {!isSignedIn && <Login signIn={signIn} />}
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 pb-1 pt-1">
            <Chart
              className="chart"
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={colorData}
              options={{
                title: 'Color Reviews',
                backgroundColor: 'D3D3D3',
                colors: colorChartColors,
                pieSliceBorderColor: 'black',
                pieSliceText: 'none',
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 pb-1 pt-1">
            <Chart
              className="chart"
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={shadingData}
              options={{
                title: 'Shading Reviews',
                backgroundColor: 'D3D3D3',
                colors: defaultChartColors,
                pieSliceBorderColor: 'black',
                pieSliceText: 'none',
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 pb-1 pt-1">
            <Chart
              className="chart"
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={sheenData}
              options={{
                title: 'Sheen Reviews',
                backgroundColor: 'D3D3D3',
                colors: sheenChartColors,
                pieSliceBorderColor: 'black',
                pieSliceText: 'none',
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-4 pb-1 pt-1">
            <Chart
              className="chart"
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={featheringData}
              options={{
                title: 'Feathering Reviews',
                backgroundColor: 'D3D3D3',
                colors: defaultChartColors,
                pieSliceBorderColor: 'black',
                pieSliceText: 'none',
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </div>
          {validWaterproofness && (
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 pb-1 pt-1">
              <Chart
                className="chart"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={waterData}
                options={{
                  title: 'Waterproofness Reviews',
                  backgroundColor: 'D3D3D3',
                  colors: defaultChartColors,
                  pieSliceBorderColor: 'black',
                  pieSliceText: 'none',
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            </div>
          )}
          {validDryingTime && (
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 pb-1 pt-1">
              <Chart
                className="chart"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={dryingData}
                options={{
                  title: 'Drying Time Reviews',
                  backgroundColor: 'D3D3D3',
                  colors: defaultChartColors,
                  pieSliceBorderColor: 'black',
                  pieSliceText: 'none',
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            </div>
          )}
          {validTransparency && (
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 pb-1 pt-1">
              <Chart
                className="chart"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={transparencyData}
                options={{
                  title: 'Transparency Reviews',
                  backgroundColor: 'D3D3D3',
                  colors: defaultChartColors,
                  pieSliceBorderColor: 'black',
                  pieSliceText: 'none',
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default WritingSample;
