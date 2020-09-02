import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import API from '../../apis/API';
import { capitalize } from '../../util/util';
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
    };

    this.getWritingSample = this.getWritingSample.bind(this);
    this.getColorReviews = this.getColorReviews.bind(this);
    this.getShadingReviews = this.getShadingReviews.bind(this);
    this.getSheenReviews = this.getSheenReviews.bind(this);
    this.getWaterReviews = this.getWaterReviews.bind(this);
    this.getDryingReviews = this.getDryingReviews.bind(this);
    this.getTransparencyReviews = this.getTransparencyReviews.bind(this);
    this.getFeatheringReviews = this.getFeatheringReviews.bind(this);
  }

  componentDidMount() {
    this.getWritingSample();
    this.getColorReviews();
    this.getShadingReviews();
    this.getSheenReviews();
    this.getWaterReviews();
    this.getDryingReviews();
    this.getTransparencyReviews();
    this.getFeatheringReviews();
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

  getColorReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `color-reviews/${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ colorReviews: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  getShadingReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `shading-reviews/${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ shadingReviews: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  getSheenReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `sheen-reviews/${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ sheenReviews: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  getWaterReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `water-reviews/${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ waterReviews: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  getDryingReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `drying-reviews/${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ dryingReviews: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  getTransparencyReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `transparency-reviews/${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ transparencyReviews: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  getFeatheringReviews() {
    const id = window.location.pathname.replace('/writing-samples/', '');
    const url = `feathering-reviews/${id}`;

    API.instance
      .get(url)
      .then((res) => {
        this.setState({ featheringReviews: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  render() {
    const {
      writingSample,
      colorReviews,
      shadingReviews,
      sheenReviews,
      waterReviews,
      dryingReviews,
      transparencyReviews,
      featheringReviews,
    } = this.state;

    // process colorReviews
    const colorCounts = [];
    colorReviews.forEach((colorReview) => {
      const color = colorReview.name;
      colorCounts[color] = colorCounts[color] ? colorCounts[color] + 1 : 1;
    });

    const colorData = [['Color', 'Number of reviews']];
    const colorChartColors = [];

    // TODO
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

    // TODO
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(shadingCounts)) {
      shadingData.push([capitalize(key), value]);
    }

    // TODO sheenChartColors for 'partial color' and 'full color'.
    // process sheenReviews
    const sheenCounts = [];
    sheenReviews.forEach((sheenReview) => {
      const { amount, name } = sheenReview;

      sheenCounts[`${amount} ${name}`] = sheenCounts[`${amount} ${name}`]
        ? sheenCounts[`${amount} ${name}`] + 1
        : 1;
    });

    const sheenData = [['Sheen', 'Number of reviews']];

    // TODO
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(sheenCounts)) {
      if (key !== 'none none') {
        sheenData.push([capitalize(key), value]);
      } else {
        sheenData.push(['None', value]);
      }
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

    // TODO
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

    // TODO
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

    // TODO
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(transparencyCounts)) {
      transparencyData.push([capitalize(key), value]);
    }

    // process featheringReviews
    const featheringCounts = [];
    featheringReviews.forEach((featheringReview) => {
      const { feathering } = featheringReview;

      featheringCounts[feathering] = featheringCounts[feathering]
        ? featheringCounts[feathering] + 1
        : 1;
    });

    const featheringData = [['Feathering', 'Number of reviews']];

    // TODO
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(featheringCounts)) {
      featheringData.push([capitalize(key), value]);
    }

    console.log(this.state);
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
              {capitalize(writingSample.paper_style)}
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
                  Downloads
                </button>
              </h2>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample"
            >
              coming soon
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingThree">
              <h2 className="mb-0">
                <button
                  className="btn btn-link btn-block text-left collapsed text-center"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Review
                </button>
              </h2>
            </div>
            <div
              id="collapseThree"
              className="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordionExample"
            >
              coming soon
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
