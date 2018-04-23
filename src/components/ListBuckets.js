import React, { Component } from 'react';

class ListBuckets extends React.Component {
  constructor() {
    console.log('runs first constructor');
    super();
    this.state = {
      //buckets: []
    }
  }

  componentDidMount() {
    console.log('runs second componentWillMount');
  }

  componentWillMount() {
    console.log('runs fourth componentDidMount');
    fetch('http://localhost:3001/buckets')
      .then(res => res.json())
      .then(fetchedBuckets => {
        console.log('bucketssss', fetchedBuckets)
        this.setState({ buckets: fetchedBuckets.concat(this.props.parentBuckets) });
        //this.props.parentBuckets.concat(buckets);
      })
      .catch(err => console.log('err fetching buckets'));
  }

  render() {
    console.log('runs third render');

    const bucketMap = this.state.buckets ? this.state.buckets.map((bucket, i) => <li key={i}> {bucket.name} - {bucket.description} </li>) : 'No Buckets yet!'

    return (
      <div>
        {console.log('now mounting/rendering to the DOM')}
        <ul>
          {bucketMap}
        </ul>
        <br />
      </div>
    )
  }
}

export default ListBuckets;



