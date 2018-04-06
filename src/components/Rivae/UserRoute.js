import React from 'react';
import axios from 'axios';
import { VictoryPie, VictoryLabel } from 'victory';

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
      spendingByPayee: []
    }
  }



  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data}, () => console.log(this.state)));
  }

  render() {
    const spendingPieData =
    Object.entries(this.state.user.spendingByCategory)
      .map(entry => Object.assign( { x: entry[0], y: Math.abs(entry[1]) }));

    const payeePieData =
    Object.entries(this.state.user.spendingByPayee)
      .map(entry => Object.assign( { x: entry[0], y: Math.abs(entry[1]) }));

    console.log('spendingPieData is ', spendingPieData, 'payeePieDate is', payeePieData);

    return (
      <div className="container">
        <h1 className="title is-1">{this.state.user.username}</h1>
        <h3 className="title is-3">Balance: {this.state.user.balance}</h3>
        <FlexRowDiv>
          <PieChartDiv>
            <h3 className="subtitle is-3 has-text-centered">Spending By Category</h3>
            <VictoryPie
              data={spendingPieData}
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

          <PieChartDiv>
            <h3 className="subtitle is-3 has-text-centered">Spending By Payee</h3>
            <VictoryPie
              data={payeePieData}
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
