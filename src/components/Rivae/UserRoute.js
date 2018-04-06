import React from 'react';
import axios from 'axios';
import { VictoryPie, VictoryLabel, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme} from 'victory';

import PieChartDiv from '../../assets/styledComponents/PieChartDiv';
import FlexRowDiv from '../../assets/styledComponents/FlexRowDiv';



class UserRoute extends React.Component{
  state = {
    user: {
      admin: '',
      avatar: '',
      created: '',
      email: '',
      transactions: [],
      username: '',
      balance: '',
      spendingByCategory: [],
      spendingByPayee: [],
      balanceByDate: []
    }
  }

  absoluteGraphData = (dataObject,) => {
    return Object.entries(dataObject)
      .map(entry => Object.assign( { x: entry[0], y: Math.abs(entry[1]) }));
  }

  GraphData = (dataObject,) => {
    return Object.entries(dataObject)
      .map(entry => Object.assign( { x: entry[0], y: entry[1] }));
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data}, () => console.log(this.state)));
  }

  render() {

    return (
      <div className="container">
        <h1 className="title is-1 has-text-right  ">{this.state.user.username}</h1>
        <h3 className="title is-3 has-text-centered">Current Balance: {this.state.user.balance}</h3>
        <VictoryChart
          theme={VictoryTheme.material}
          width={960}
          height={250}
        >
          <VictoryLine
            data={this.GraphData(this.state.user.balanceByDate)}
            sortOrder="descending"
            x={d => d.x.substring(8,10)}
            y={d => d.y}
            labels={d => {
              if (d.x.substring(8,10) % 4 === 0 ) return d.y.toFixed(2);
              return '';
            }}
          />
          <VictoryAxis/>
        </VictoryChart>
        <FlexRowDiv>
          <PieChartDiv>
            <h3 className="subtitle is-3 has-text-centered">Spending By Category</h3>
            <h4 className="subtitle is-4 has-text-centered">Total Spending: {this.state.user.totalSpending}</h4>
            <VictoryPie
              data={this.absoluteGraphData(this.state.user.spendingByCategory)}
              colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy' ]}
              labels={(d) => d.a}
              // labelComponent={
              //   <VictoryLabel
              //     angle={30}
              //     capHeight={0.5}
              //   />}
              events={[{ target: 'data', eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: 'data',
                      mutation: (props) => {
                        const fill = props.style && props.style.fill;
                        return fill === '#c43a31' ? null : { style: { fill: '#c43a31' } };
                      }
                    }, {
                      target: 'labels',
                      mutation: (props) => {
                        return props.text === 'clicked' ? {text: ''} : { text: (d) => d.x };
                      }
                    }
                  ];
                }
              }
              }]}
            />
          </PieChartDiv>

          <PieChartDiv>
            <h3 className="subtitle is-3 has-text-centered">Spending By Payee</h3>
            <h4 className="subtitle is-4 has-text-centered">Total Spending: {this.state.user.totalSpending}</h4>
            <VictoryPie
              data={this.absoluteGraphData(this.state.user.spendingByPayee)}
              colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy' ]}
              labels={(d) => d.a}
              // labelComponent={
              //   <VictoryLabel
              //     angle={30}
              //     capHeight={0.5}
              //   />}
              events={[{ target: 'data', eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: 'data',
                      mutation: (props) => {
                        const fill = props.style && props.style.fill;
                        return fill === '#c43a31' ? null : { style: { fill: '#c43a31' } };
                      }
                    }, {
                      target: 'labels',
                      mutation: (props) => {
                        return props.text === 'clicked' ? null : { text: (d) => d.x };
                      }
                    }
                  ];
                }
              }
              }]}
            />
          </PieChartDiv>
        </FlexRowDiv>



      </div>
    );
  }

}

export default UserRoute;
