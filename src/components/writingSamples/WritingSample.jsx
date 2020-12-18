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
      errorMessage: '',
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

  componentDidMount() {
    const { isSignedIn } = this.props;

    this.getWritingSample();
    this.getColorReviews();
    this.getShadingReviews();
    this.getSheenReviews();
    this.getWaterReviews();
    this.getDryingReviews();
    this.getTransparencyReviews();
    this.getFeatheringReviews();

    if (isSignedIn) {
      this.getPriorColorReviews();
      this.getPriorShadingReview();
      this.getPriorSheenReview();
      this.getPriorFeatheringReview();
      this.getPriorWaterReview();
      this.getPriorDryingReview();
      this.getPriorTransparencyReview();
    }
  }

  getWritingSample() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `writing-samples/${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ writingSample: res.data[0] });
      })
      .catch((error) => console.log(error.response));
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

  handleChange(e) {
    const { value } = e.target;
    const { id } = e.target;

    this.setState({
      [id]: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    // TODO frontend validation before trying to submit to backend

    this.setState({
      errorMessage: '',
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

      try {
        await API.instance.delete(url, config);
      } catch (err) {
        console.log(err);

        this.setState((prevState) => {
          return {
            errorMessage: `${prevState.errorMessage}Cannot delete prior color reviews. `,
          };
        });
      }

      if (colorOneChoice !== '') {
        const colorOneReview = {
          writingSampleID,
          color: colorOneChoice,
        };

        try {
          await API.instance.post('color-reviews', colorOneReview, config);
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              errorMessage: `${prevState.errorMessage}Cannot create first color review. `,
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
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              errorMessage: `${prevState.errorMessage}Cannot create second color review. `,
            };
          });
        }

        if (colorThreeChoice !== '') {
          const colorThreeReview = {
            writingSampleID,
            color: colorThreeChoice,
          };

          try {
            await API.instance.post('color-reviews', colorThreeReview, config);
          } catch (err) {
            console.log(err);

            this.setState((prevState) => {
              return {
                errorMessage: `${prevState.errorMessage}Cannot create third color review. `,
              };
            });
          }
        }
      }
    }

    if (shadingChoice !== priorShadingChoice) {
      const url = `shading-reviews/${writingSampleID}`;

      try {
        await API.instance.delete(url, config);
      } catch (err) {
        console.log(err);

        this.setState((prevState) => {
          return {
            errorMessage: `${prevState.errorMessage}Cannot delete prior shading review. `,
          };
        });
      }

      if (shadingChoice !== '') {
        const shadingReview = {
          writingSampleID,
          amount: shadingChoice,
        };

        try {
          await API.instance.post('shading-reviews', shadingReview, config);
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              errorMessage: `${prevState.errorMessage}Cannot create shading review. `,
            };
          });
        }
      }
    }

    if (
      sheenColorChoice !== priorSheenColorChoice ||
      sheenAmountChoice !== priorSheenAmountChoice
    ) {
      const url = `sheen-reviews/${writingSampleID}`;

      try {
        await API.instance.delete(url, config);
      } catch (err) {
        console.log(err);

        this.setState((prevState) => {
          return {
            errorMessage: `${prevState.errorMessage}Cannot delete prior sheen review. `,
          };
        });
      }

      if (sheenColorChoice !== '' || sheenAmountChoice !== '') {
        const sheenReview = {
          writingSampleID,
          color: sheenColorChoice,
          amount: sheenAmountChoice,
        };

        try {
          await API.instance.post('sheen-reviews', sheenReview, config);
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              errorMessage: `${prevState.errorMessage}Cannot create sheen review. `,
            };
          });
        }
      }
    }

    if (featheringChoice !== priorFeatheringChoice) {
      const url = `feathering-reviews/${writingSampleID}`;

      try {
        await API.instance.delete(url, config);
      } catch (err) {
        console.log(err);

        this.setState((prevState) => {
          return {
            errorMessage: `${prevState.errorMessage}Cannot delete prior feathering reivew. `,
          };
        });
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
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              errorMessage: `${prevState.errorMessage}Cannot create feathering review. `,
            };
          });
        }
      }
    }

    if (waterChoice !== priorWaterChoice) {
      const url = `water-reviews/${writingSampleID}`;

      try {
        await API.instance.delete(url, config);
      } catch (err) {
        console.log(err);

        this.setState((prevState) => {
          return {
            errorMessage: `${prevState.errorMessage}.Cannot delete prior waterproofness review `,
          };
        });
      }

      if (waterChoice !== '') {
        const waterReview = {
          writingSampleID,
          waterproofness: waterChoice,
        };

        try {
          await API.instance.post('water-reviews', waterReview, config);
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              errorMessage: `${prevState.errorMessage}Cannot create waterproofness review. `,
            };
          });
        }
      }
    }

    if (dryingTimeChoice !== priorDryingTimeChoice) {
      const url = `drying-reviews/${writingSampleID}`;

      try {
        await API.instance.delete(url, config);
      } catch (err) {
        console.log(err);

        this.setState((prevState) => {
          return {
            errorMessage: `${prevState.errorMessage}Cannot delete prior drying time review. `,
          };
        });
      }

      if (dryingTimeChoice !== '') {
        const dryingReview = {
          writingSampleID,
          dryingTime: dryingTimeChoice,
        };

        try {
          await API.instance.post('drying-reviews', dryingReview, config);
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              errorMessage: `${prevState.errorMessage}Cannot create drying time review. `,
            };
          });
        }
      }
    }

    if (transparencyChoice !== priorTransparencyChoice) {
      const url = `transparency-reviews/${writingSampleID}`;

      try {
        await API.instance.delete(url, config);
      } catch (err) {
        console.log(err);

        this.setState((prevState) => {
          return {
            errorMessage: `${prevState.errorMessage}Cannot delete prior transparency review. `,
          };
        });
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
        } catch (err) {
          console.log(err);

          this.setState((prevState) => {
            return {
              errorMessage: `${prevState.errorMessage}Cannot create transparency review. `,
            };
          });
        }
      }
    }
  }

  render() {
    console.log(this.state);

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
      errorMessage,
    } = this.state;

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
      colorChartColors.push(key); // TODO conditional when color is none
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

    // TODO sheenChartColors for 'partial color' and 'full color'.
    // process sheenReviews
    const sheenCounts = [];
    sheenReviews.forEach((sheenReview) => {
      const { amount, color } = sheenReview;

      sheenCounts[`${amount} ${color}`] = sheenCounts[`${amount} ${color}`]
        ? sheenCounts[`${amount} ${color}`] + 1
        : 1;
    });

    const sheenData = [['Sheen', 'Number of reviews']];

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(sheenCounts)) {
      if (key !== 'none none') {
        sheenData.push([capitalize(key), value]);
      } else {
        sheenData.push(['None', value]);
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
                    Feel free to leave a review category blank, but the prior
                    review will be deleted.
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
                                {colorsJSON.names.map((color) => {
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
                      <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <label htmlFor="transparencyChoice" className="p-3 m-0">
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
                      {errorMessage &&
                        'Thanks! Most reviews are being processed but at least one error occured. '}
                      {errorMessage}
                      {!errorMessage &&
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
              data={waterData}
              options={{
                title: 'Waterproofness Reviews',
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
              data={dryingData}
              options={{
                title: 'Drying Time Reviews',
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
              data={transparencyData}
              options={{
                title: 'Transparency Reviews',
                pieSliceBorderColor: 'black',
                pieSliceText: 'none',
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WritingSample;
