import React from 'react';
// import {Link} from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { VictoryPie, VictoryLine, VictoryChart, VictoryAxis, VictoryTheme} from 'victory';

import PieChartDiv from '../../assets/styledComponents/PieChartDiv';
import FlexRowDiv from '../../assets/styledComponents/FlexRowDiv';
import UserInfo from '../../assets/styledComponents/UserInfo';
import AvatarFrame from '../../assets/styledComponents/AvatarFrame';

import dataVis from '../../lib/dataVisualization';

class UserRoute extends React.Component{
  state = {
    user: {
      admin: '',
      avatar: '',
      created: '',
      email: '',
      transactions: [],
      username: '',
      balance: 0,
      totalSpending: 0,
      totalIncome: 0,
      spendingByCategory: [],
      incomeByCategory: [],
      spendingByPayee: [],
      incomeByPayee: [],
      balanceByDate: [],
      absoluteSpendingByDate: [],
      transactionsByDate: {}
    }
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)

      .then(res => {
        console.log('getting res data',res.data);
        this.setState({ user: res.data }, () => console.log('state post setState',this.state));
        console.log('finished setting state');
      });
  }

  newTransaction= () => {
    axios.post(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data}, () => console.log(this.state)));
  }

  render() {
    // console.log(dataVis.graphData(this.state.user.balanceByDate).reverse());
    return (
      <div className="container">
        <UserInfo className="userInfo">
          <AvatarFrame src={this.state.user.avatar} className="is-pulled-right"></AvatarFrame>
          <h1 className="title is-1 has-text-right  ">{this.state.user.username}</h1>
        </UserInfo>
        {this.state.user.transactions.length === 0 &&
        <Link to={`/users/${this.props.match.params.id}/transactions`} className="title is-2 has-text-centered">You have no transactions on file yet. Lets add some!</Link>}
        <h3 className="title is-3 has-text-centered">Current Balance: {this.state.user.balance.toFixed(2)}</h3>

        {/* Balance Graph */}
        <VictoryChart
          theme={VictoryTheme.material}
          width={1280}
          height={250}
          sortOrder='ascending'
        >
          <VictoryLine
            data={dataVis.graphData(this.state.user.balanceByDate)}

            x={d => d.x.substring(4,10)}
            y={d => d.y}
            labels={d => {
              if (d.x.substring(8,10) % 4 === 0 ) return d.y.toFixed(2);
              return '';
            }}
          />
          <VictoryAxis/>
        </VictoryChart>
        {/* Spending Pies */}
        <FlexRowDiv>
          <PieChartDiv>
            <h3 className="subtitle is-3 has-text-centered">Spending By Category</h3>
            <h4 className="subtitle is-4 has-text-centered">Total Spending: {this.state.user.totalSpending}</h4>
            <VictoryPie
              data={dataVis.absoluteGraphData(this.state.user.spendingByCategory)}
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
              data={dataVis.absoluteGraphData(this.state.user.spendingByPayee)}
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
        {/* Income Pies */}
        <FlexRowDiv>
          <PieChartDiv>
            <h3 className="subtitle is-3 has-text-centered">Income By Category</h3>
            <h4 className="subtitle is-4 has-text-centered">Total Income: {this.state.user.totalIncome.toFixed(2)}</h4>
            <VictoryPie
              data={dataVis.absoluteGraphData(this.state.user.incomeByCategory)}
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
            <h3 className="subtitle is-3 has-text-centered">Income By Payee</h3>
            <h4 className="subtitle is-4 has-text-centered">Total Income: {this.state.user.totalIncome.toFixed(2)}</h4>
            <VictoryPie
              data={dataVis.absoluteGraphData(this.state.user.incomeByPayee)}
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
