import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import API from '../../apis/API';
import { capitalize } from '../../util/util';

class WritingSample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      writingSample: {},
      colorReviews: [],
      shadingReviews: [],
      sheenReviews: [],
      waterReviews: [],
    };

    this.getWritingSample = this.getWritingSample.bind(this);
    this.getColorReviews = this.getColorReviews.bind(this);
    this.getShadingReviews = this.getShadingReviews.bind(this);
    this.getSheenReviews = this.getSheenReviews.bind(this);
    this.getWaterReviews = this.getWaterReviews.bind(this);
  }

  componentDidMount() {
    this.getWritingSample();
    this.getColorReviews();
    this.getShadingReviews();
    this.getSheenReviews();
    this.getWaterReviews();
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

  render() {
    const {
      writingSample,
      colorReviews,
      shadingReviews,
      sheenReviews,
      waterReviews,
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
      colorData.push([key, value]);
      colorChartColors.push(key);
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
      shadingData.push([key, value]);
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
        sheenData.push([key, value]);
      } else {
        sheenData.push(['none', value]);
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
      waterData.push([key, value]);
    }

    // process dryingReviews

    // process transparencyReviews

    // process featheringReviews

    console.log(this.state);
    return (
      <div className="container-fluid text-center">
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
                  Details
                </button>
              </h2>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample"
            >
              <div className="card-body">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-sm-6 col-lg-3 text-center p-1">
                      Ink: {capitalize(writingSample.ink_brand)}{' '}
                      {capitalize(writingSample.ink_name)}
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 text-center p-1">
                      Pen: {capitalize(writingSample.pen_brand)}{' '}
                      {capitalize(writingSample.pen_model)}
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 text-center p-1">
                      Nib: {capitalize(writingSample.nib_grind)}{' '}
                      {capitalize(writingSample.nib_size)}{' '}
                      {capitalize(writingSample.nib_tune)}
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 text-center p-1">
                      Paper: {capitalize(writingSample.paper_brand)}{' '}
                      {capitalize(writingSample.paper_name)}{' '}
                      {capitalize(writingSample.paper_style)}
                    </div>
                  </div>
                </div>
              </div>
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
          <div className="card">
            <div className="card-header" id="headingFour">
              <h2 className="mb-0">
                <button
                  className="btn btn-link btn-block text-left collapsed text-center"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Downloads
                </button>
              </h2>
            </div>
            <div
              id="collapseFour"
              className="collapse"
              aria-labelledby="headingFour"
              data-parent="#accordionExample"
            >
              <div className="card-body">Coming Soon</div>
            </div>
          </div>
        </div>
        <div>
          <Chart
            width="500px"
            height="300px"
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
        <div>
          <Chart
            width="500px"
            height="300px"
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={shadingData}
            options={{
              title: 'Shading Reviews',
              pieSliceBorderColor: 'black',
              colors: ['slategrey', 'dimgrey', 'darkgrey'],
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
        <div>
          <Chart
            width="500px"
            height="300px"
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={sheenData}
            options={{
              title: 'Sheen Reviews',
              pieSliceBorderColor: 'black',
              colors: ['slategrey', 'dimgrey', 'darkgrey'],
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
        <div>
          <Chart
            width="500px"
            height="300px"
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={waterData}
            options={{
              title: 'Waterproofness Reviews',
              pieSliceBorderColor: 'black',
              colors: ['slategrey', 'dimgrey', 'darkgrey'],
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        </div>
      </div>
    );
  }
}

export default WritingSample;
