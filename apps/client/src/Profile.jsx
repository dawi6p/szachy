import React, { Component } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { Navigate } from 'react-router-dom';
import NavBar from "./integrations/NavBar";
import Plot from "react-plotly.js";

class Profile extends Component {

  constructor(props) {
		super(props);

    this.state = {
			token: String,
			TokenisLoaded: false,
      match: [],
      matchIsLoaded: false,
      score: [],
      scoreIsLoaded: false
		};
  }

  componentDidMount() {
    fetch("/api")
    .then((res) => res.text())
    .then((String) => {
      this.setState({
        token: String,
        TokenisLoaded: true
      });
    })
    fetch("/api/match/MatchResults")
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					match: json,
					matchIsLoaded: true
				});
			})
    fetch("/api/score/getHistoryScore")
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					score: json,
					scoreIsLoaded: true
				});
			})
  }

  max(arr)
  {
      var max = 0;
      for (var i = 0; i <= arr.length; i++)
      {
        if (arr[i] > max) max = arr[i];
      }
      return max;
  }

  render() {
    const { TokenisLoaded, token, match, matchIsLoaded, score, scoreIsLoaded} = this.state;

    let w = 0;
    let d = 0;
    let l = 0;
    const scoreY = [];
    const scoreX = [];
    let max = 0;

    if(!TokenisLoaded) return '';
    if(isExpired(token)) return (<Navigate to="/Home" />);
    if(matchIsLoaded)
    {
      w += match[1]
      w += match[2]
      w += match[3]
      d += match[4]
      d += match[5]
      l += match[6]
      l += match[7]
      l += match[8]
    }

    if(scoreIsLoaded)
    {
      for(let i = 0; i < score.length; i++)
      {
        scoreY.push(score[i]['score'])
        scoreX.push(score[i]['date'])
      }
      max = this.max(scoreY)*1.1;
    }

    let temp = decodeToken(token);

    var data1 = [
    {
      x: scoreX,
      y: scoreY,
      fill: 'tozeroy',
      type: 'scatter',
    }]


    var data = [
      {
        values: [match[1], match[2], match[3], match[4], match[5], match[6], match[7], match[8]],
        labels: ["Win By Surrender", "Win By Mat", "Win By End Of Time", "Draw by repetition", "Draw By Pat", "Loss By Surrender", "Loss By Mat", "Loss By End Of Time"],
        marker: {
          colors: ["#0be619", "#00940a", "#71ff7a", "#414141", "#2c2c2c", "#8a0101", "#ca0505", "#f64141"]
        },
        type: "pie",
      },
    ];
    

    return (
      <div class='inline'>
        <NavBar/>
        <div class="cover"> 
          <div class="media align-items-end profile-head"> 
            <div class="profile mr-5 ml-5">
              <img src="/vite.svg" alt="profilePic" height='75' width='75' class='imgProfile'></img>
              <a href="#" class="btn btn-outline-dark btn-sm btn-block">Edit profile</a>
            </div> 
            
            <div class="media-body mb-5 text-white"> 
              <h4 class="mt-0 mb-0">{temp.nickName}</h4> 
            </div> 
            <div class="d-flex justify-content-end text-center"> 
              <ul class="list-inline mb-0 mr-5 ml-5"> 
                <li class="list-inline-item text-success"> 
                  <h5 class="font-weight-bold mb-0">{w}</h5>
                  <small>Victories</small> 
                </li> 
                <li class="list-inline-item text-secondary"> 
                  <h5 class="font-weight-bold mb-0">{d}</h5>
                  <small>Draws</small> 
                </li> 
                <li class="list-inline-item text-danger"> 
                  <h5 class="font-weight-bold mb-0">{l}</h5>
                  <small>Defets</small> 
                </li> 
              </ul> 
            </div> 
          </div> 
          <div class="px-4 py-3"> 
            <div class="p-4 rounded shadow-sm bg-light profileTextField">
              <div class="graphField">
                <Plot
                  class='pieChart'
                  data={data}
                  layout={ {width: 500, height: 400} } />
                <Plot
                  data={data1}
                  layout={ {width: 500, height: 400, title: 'Area Chart', yaxis: {range: [90,max] }}} />
              </div>
            </div> 
          </div>
        </div> 
      </div>
    );
  }
}

export default Profile;