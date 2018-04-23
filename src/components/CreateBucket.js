import React, { Component } from 'react';


class BucketList extends Component {


  render() {

    const createBucket = event => {
      event.preventDefault();
      const newBucket = {
        name: this.name.value,
        description: this.description.value
      }
      console.log('the values', newBucket)

      fetch('http://localhost:3001/buckets', {
        method: 'POST',
        body: JSON.stringify(newBucket),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())
      .then(bucket => console.log('bucket created', bucket))
      .catch(err => console.log('some errr', err));
    }

    return (
      <div>
        <form>

          Name: <input type="text" name="name" ref={i => this.name = i} /> <br />

          Description: <input type="text" name="description" ref={i => this.description = i} />

          <button onClick={createBucket}>Create</button>

        </form>
        <h1>Our First React App!!!</h1>
      </div>
    )
  }
}

export default BucketList;