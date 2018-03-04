import React, { Component } from 'react';
import Recharts from "recharts";

//import { LineChart, Line } from "recharts";
import {PieChart, Pie,AreaChart, Area,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer} from "recharts";



class SimpleLineChart extends React.Component{
  render () {
    const coef = this.props.coef;
    const age = this.props.age;
    const data = [
      {name: 'Birth', me: 0, frenchAverage: 0, amt: 2400},
      {name: 'Now', me:age*coef, frenchAverage: age*5.05, amt: 2210},
    ];
    return (
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}
          margin={{top: 5, right: 30, left: 20}}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name"/>
          <YAxis label={{ value: 'tons of CO2', angle: -90, position: 'insideLeft' }} />


          <Legend />
          <Area type="monotone" dataKey="frenchAverage" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)"/>
          <Area type="monotone" dataKey="me" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)"/>
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

//<Pie data={data01} outerRadius={60} fill="#8884d8"/>

const RADIAN = Math.PI / 180;

var COLORS = ['#3DCC91', '#FFB366', '#FF7373', '#FFCC00', '#3B22FF'];

//const innerRadius=;
//const outerRadius=;

class TwoLevelPieChart extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      innerRadius:$(window).width()< 576?60:70,
      outerRadius:$(window).width()< 576?70:80,
      cx:($(window).width()< 991?190:($(window).width()<1190?200:280))
    };
    this.updateRadiuses = this.updateRadiuses.bind(this);
  }
  updateRadiuses() {
    this.setState({innerRadius: $(window).width()< 576?60:70, outerRadius: $(window).width()< 576?70:80,cx: $(window).width()< 991?190:($(window).width()<1190?200:280)});
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateRadiuses);
  }
  render () {
    const persData = this.props.persData;
    const age = this.props.age;


    const data02 = [{name: 'Car', value: age*persData.carCoef},
    {name: 'Plane', value: age*persData.planeCoef},
    {name: 'Bus', value: age*persData.busCoef},
    {name: 'Subway', value: age*persData.subCoef},
    {name: 'Train', value: age*persData.trainCoef},
    {name: 'Diet', value: age*persData.dietCoef},
    {name: 'Electricity', value: age*persData.elecCoef},
    {name: 'Gas', value: age*persData.gasCoef},
    {name: 'Pharma', value: age*persData.pharmaCoef},
    {name: 'Clothes', value: age*persData.cloCoef},
    {name: 'Books', value: age*persData.booksCoef},
    {name: 'IT', value: age*persData.compCoef}
  ];
  const total = age*(persData.carCoef
    +persData.planeCoef
    +persData.busCoef
    +persData.subCoef
    +persData.trainCoef
    +persData.dietCoef
    +persData.elecCoef
    +persData.gasCoef
    +persData.pharmaCoef
    +persData.cloCoef
    +persData.booksCoef
    +persData.compCoef
  );


  /*
  if ( $(window).width() < 767) {
  //Add your javascript for small screens here
  innerRadius = 40;
  outerRadius = 60;
}
else {
innerRadius = 70;
outerRadius = 90;
}*/

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
  const item = data02[index];
  return (

    <text className="label" x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" key={``}>
      {item.value/total>0.05?item.name+' ('+Math.floor(item.value)+')':null}</text>
    )
  };

  return (
    <div className="mx-auto">
      <ResponsiveContainer width="100%" height={270}>
        <PieChart >
          <Pie data={data02}
            innerRadius={this.state.innerRadius}
            outerRadius={this.state.outerRadius}
            cx={this.state.cx}
            cy={140}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#82ca9d">

          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
}





export class DietType extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const dietType = e.target.value;
    this.props.onChange(dietType);
  }

  render() {
    return (
      <div className="d-inline">
        <select
          id="dietType"
          onChange={this.handleChange}>
          <option value={0}>Choose</option>
          <option value={3.3}>Meat Lover</option>
          <option value={2.5}>Average</option>
          <option value={1.9}>No beef</option>
          <option value={1.7}>Vegetarian</option>
          <option value={1.5}>Vegan</option>
        </select>
      </div>
    );
  }
}

export class DietSize extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const dietSize = e.target.value;
    this.props.onChange(dietSize);
  }

  render() {
    return (
      <div className="d-inline">
        <select
          id="dietSize"
          onChange={this.handleChange}>
          <option value={0.95}>Choose</option>
          <option value={1.1}>Big eater</option>
          <option value={1}>Average eater</option>
          <option value={0.9}>Small eater</option>
        </select>
      </div>
    );
  }
}


export class PlaneCoef extends React.Component {
  constructor(props) {
    super(props);
    this.state = {planeKms:''};
    this.handleChangePlaneKms = this.handleChangePlaneKms.bind(this);
  }

  handleChangePlaneKms(e) {
    const planeKms = e.target.value;
    this.props.onChange(planeKms*0.158/1000);
    this.setState({planeKms:planeKms});
  }

  render() {
    return (
      <div className="d-inline">
        <input
          type="text"
          onChange={this.handleChangePlaneKms}
          value={this.state.planeKms}/>


        </div>
      );
    }
  }

  export class CarCoef extends React.Component {
    constructor(props) {
      super(props);
      this.state = {carKms:''};
      this.handleChangeCarKms = this.handleChangeCarKms.bind(this);
    }

    handleChangeCarKms(e) {
      const carKms = e.target.value;
      this.props.onChange(carKms*0.18/1000);
      this.setState({carKms:carKms});
    }

    render() {
      return (
        <div className="d-inline">
          <input
            type="text"
            onChange={this.handleChangeCarKms}
            value={this.state.carKms}/>


          </div>
        );
      }
    }
    export class BusCoef extends React.Component {
      constructor(props) {
        super(props);
        this.state = {busKms:''};
        this.handleChangeBusKms = this.handleChangeBusKms.bind(this);
      }

      handleChangeBusKms(e) {
        const busKms = e.target.value;
        this.props.onChange(busKms*0.1/1000);
        this.setState({busKms:busKms});
      }

      render() {
        return (
          <div className="d-inline">
            <input
              type="text"
              onChange={this.handleChangeBusKms}
              value={this.state.busKms}/>


            </div>
          );
        }
      }
      export class SubCoef extends React.Component {
        constructor(props) {
          super(props);
          this.state = {subKms:''};
          this.handleChangeSubKms = this.handleChangeSubKms.bind(this);
        }

        handleChangeSubKms(e) {
          const subKms = e.target.value;
          this.props.onChange(subKms*0.05/1000);
          this.setState({subKms:subKms});
        }

        render() {
          return (
            <div className="">
              <input
                type="text"
                onChange={this.handleChangeSubKms}
                value={this.state.subKms}/>


              </div>
            );
          }
        }
        export class TrainCoef extends React.Component {
          constructor(props) {
            super(props);
            this.state = {trainKms:''};
            this.handleChangeTrainKms = this.handleChangeTrainKms.bind(this);
          }

          handleChangeTrainKms(e) {
            const trainKms = e.target.value;
            this.props.onChange(trainKms*0.01/1000);
            this.setState({trainKms:trainKms});
          }

          render() {
            return (
              <div className="d-inline">
                <input
                  type="text"
                  onChange={this.handleChangeTrainKms}
                  value={this.state.trainKms}/>


                </div>
              );
            }
          }
          export class ElecCoef extends React.Component {
            constructor(props) {
              super(props);
              this.state = {elecKWhs:''};
              this.handleChangeElecKWhs = this.handleChangeElecKWhs.bind(this);
            }

            handleChangeElecKWhs(e) {
              const elecKWhs = e.target.value;
              this.props.onChange(elecKWhs*0.04/1000);
              this.setState({elecKWhs:elecKWhs});
            }

            render() {
              return (
                <div className="d-inline">
                  <input
                    type="text"
                    onChange={this.handleChangeElecKWhs}
                    value={this.state.elecKWhs}/>


                  </div>
                );
              }
            }
            export class GasCoef extends React.Component {
              constructor(props) {
                super(props);
                this.state = {gasKWhs:''};
                this.handleChangeGasKWhs = this.handleChangeGasKWhs.bind(this);
              }

              handleChangeGasKWhs(e) {
                const gasKWhs = e.target.value;
                this.props.onChange(gasKWhs*0.18/1000);
                this.setState({gasKWhs:gasKWhs});
              }

              render() {
                return (
                  <div className="d-inline">
                    <input
                      type="text"
                      onChange={this.handleChangeGasKWhs}
                      value={this.state.gasKWhs}/>


                    </div>
                  );
                }
              }
              export class PharmaCoef extends React.Component {
                constructor(props) {
                  super(props);
                  this.state = {pharmaEuros:''};
                  this.handleChangePharmaEuros = this.handleChangePharmaEuros.bind(this);
                }

                handleChangePharmaEuros(e) {
                  const pharmaEuros = e.target.value;
                  this.props.onChange(pharmaEuros*0.5/1000);
                  this.setState({pharmaEuros:pharmaEuros});
                }

                render() {
                  return (
                    <div className="d-inline">
                      <input
                        type="text"
                        onChange={this.handleChangePharmaEuros}
                        value={this.state.pharmaEuros}/>


                      </div>
                    );
                  }
                }
                export class CloCoef extends React.Component {
                  constructor(props) {
                    super(props);
                    this.state = {cloEuros:''};
                    this.handleChangeCloEuros = this.handleChangeCloEuros.bind(this);
                  }

                  handleChangeCloEuros(e) {
                    const cloEuros = e.target.value;
                    this.props.onChange(cloEuros*0.33/1000);
                    this.setState({cloEuros:cloEuros});
                  }

                  render() {
                    return (
                      <div className="d-inline">
                        <input
                          type="text"
                          onChange={this.handleChangeCloEuros}
                          value={this.state.cloEuros}/>


                        </div>
                      );
                    }
                  }
                  export class BooksCoef extends React.Component {
                    constructor(props) {
                      super(props);
                      this.state = {booksEuros:''};
                      this.handleChangeBooksEuros = this.handleChangeBooksEuros.bind(this);
                    }

                    handleChangeBooksEuros(e) {
                      const booksEuros = e.target.value;
                      this.props.onChange(booksEuros*0.66/1000);
                      this.setState({booksEuros:booksEuros});
                    }

                    render() {
                      return (
                        <div className="d-inline">
                          <input
                            type="text"
                            onChange={this.handleChangeBooksEuros}
                            value={this.state.booksEuros}/>


                          </div>
                        );
                      }
                    }
                    export class CompCoef extends React.Component {
                      constructor(props) {
                        super(props);
                        this.state = {compEuros:''};
                        this.handleChangeCompEuros = this.handleChangeCompEuros.bind(this);
                      }

                      handleChangeCompEuros(e) {
                        const compEuros = e.target.value;
                        this.props.onChange(compEuros*0.65/1000);
                        this.setState({compEuros:compEuros});
                      }

                      render() {
                        return (
                          <div className="d-inline">
                            <input
                              type="text"
                              onChange={this.handleChangeCompEuros}
                              value={this.state.compEuros}/>


                            </div>
                          );
                        }
                      }








                      export default class App extends React.Component {
                        constructor(props) {
                          super(props);

                          this.state = {
                            dietType:0,
                            dietSize:0.95,
                            planeCoef:0,
                            carCoef:0,
                            busCoef:0,
                            subCoef:0,
                            trainCoef:0,
                            elecCoef:0,
                            gasCoef:0,
                            pharmaCoef:0,
                            cloCoef:0,
                            booksCoef:0,
                            compCoef:0
                          };



                          this.changeDietType = this.changeDietType.bind(this);
                          this.changeDietSize = this.changeDietSize.bind(this);
                          this.changePlaneCoef = this.changePlaneCoef.bind(this);
                          this.changeCarCoef = this.changeCarCoef.bind(this);
                          this.changeBusCoef = this.changeBusCoef.bind(this);
                          this.changeSubCoef = this.changeSubCoef.bind(this);
                          this.changeTrainCoef = this.changeTrainCoef.bind(this);
                          this.changeElecCoef = this.changeElecCoef.bind(this);
                          this.changeGasCoef = this.changeGasCoef.bind(this);
                          this.changePharmaCoef = this.changePharmaCoef.bind(this);
                          this.changeCloCoef = this.changeCloCoef.bind(this);
                          this.changeBooksCoef = this.changeBooksCoef.bind(this);
                          this.changeCompCoef = this.changeCompCoef.bind(this);
                        }

                        changePlaneCoef(newPlaneCoef) {
                          this.setState({
                            planeCoef: newPlaneCoef
                          });
                        }
                        changeCarCoef(newCarCoef) {
                          this.setState({
                            carCoef: newCarCoef
                          });
                        }
                        changeBusCoef(newBusCoef) {
                          this.setState({
                            busCoef: newBusCoef
                          });
                        }
                        changeSubCoef(newSubCoef) {
                          this.setState({
                            subCoef: newSubCoef
                          });
                        }
                        changeTrainCoef(newTrainCoef) {
                          this.setState({
                            trainCoef: newTrainCoef
                          });
                        }
                        changeDietType(newDietType) {
                          this.setState({
                            dietType: newDietType
                          });
                        }
                        changeDietSize(newDietSize) {
                          this.setState({
                            dietSize: newDietSize
                          });
                        }
                        changeElecCoef(newElecCoef) {
                          this.setState({
                            elecCoef: newElecCoef
                          });
                        }
                        changeGasCoef(newGasCoef) {
                          this.setState({
                            gasCoef: newGasCoef
                          });
                        }
                        changePharmaCoef(newPharmaCoef) {
                          this.setState({
                            pharmaCoef: newPharmaCoef
                          });
                        }
                        changeCloCoef(newCloCoef) {
                          this.setState({
                            cloCoef: newCloCoef
                          });
                        }
                        changeBooksCoef(newBooksCoef) {
                          this.setState({
                            booksCoef: newBooksCoef
                          });
                        }
                        changeCompCoef(newCompCoef) {
                          this.setState({
                            compCoef: newCompCoef
                          });
                        }


                        render () {

                          return (
                            <div>
                              <div id="questions-title" className="row">
                                <div className="col-md-6" >
                                  <div>
                                    <div className="d-flex flex-row align-items-stretch text-center">
                                      <div className="port-item py-2 hvr-bob" data-toggle="collapse" data-target="#travel">
                                        <i className="fa fa-paper-plane d-none"></i> <div className="sectionTitle"> Travel </div>
                                      </div>
                                      <div className="port-item py-2 hvr-bob" data-toggle="collapse" data-target="#food">
                                        <i className="fa fa-fish d-none"></i> <div className="sectionTitle"> Food </div>
                                      </div>
                                      <div className="port-item py-2 hvr-bob" data-toggle="collapse" data-target="#home">
                                        <i className="fa fa-home d-none "></i> <div className="sectionTitle"> Home </div>
                                      </div>
                                      <div className="port-item py-2 hvr-bob" data-toggle="collapse" data-target="#other">
                                        <i className="fa fa-plus d-none"></i> <div className="sectionTitle"> Other </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6" >
                                </div>

                              </div>

                              <div className="row">
                                <div id="questions-div" className="col-md-6" >



                                  {/*questions*/}
                                  <div id="travel" className="collapse show">
                                    <p className="questions mt-3 mb-4">Each year, I travel ... </p>
                                    <div className="row questions mt-3 mb-4">
                                      <div className="col-12">
                                        <BusCoef onChange={this.changeBusCoef}/> kms by bus
                                      </div>
                                    </div>
                                    <div className="row questions mt-3 mb-4">
                                      <div className="col">
                                        <SubCoef onChange={this.changeSubCoef}/> kms by subway
                                      </div>
                                    </div>
                                    <p className="questions mt-3 mb-4"><CarCoef onChange={this.changeCarCoef}/> kms by car</p>
                                    <p className="questions mt-3 mb-4"><TrainCoef onChange={this.changeTrainCoef}/> kms by train</p>
                                    <p className="questions mt-3 mb-4"><PlaneCoef onChange={this.changePlaneCoef}/> kms by plane</p>

                                  </div>
                                  <div id="food" className="collapse">
                                    <p className="questions mt-3 mb-4">My diet type is ... <DietType onChange={this.changeDietType}/> </p>
                                    <p className="questions mt-3 mb-4">I am a ... <DietSize onChange={this.changeDietSize}/> </p>
                                  </div>

                                  <div id="home" className="collapse">
                                    <p className="questions mt-3 mb-4">Per year, my power consumption is made of ... </p>
                                    <p className="questions mt-3 mb-4"> Electricity : <ElecCoef onChange={this.changeElecCoef}/> kWh</p>
                                    <p className="questions mt-3 mb-4"> Gas : <GasCoef onChange={this.changeGasCoef}/> kWh</p>
                                  </div>
                                  <div id="other" className="collapse">
                                    <p className="questions mt-3 mb-4">Per year, I consume ... </p>
                                    <p className="questions mt-3 mb-4"> <PharmaCoef onChange={this.changePharmaCoef}/> € of pharmaceuticals</p>
                                    <p className="questions mt-3 mb-4"> <CloCoef onChange={this.changeCloCoef}/> € of clothes</p>
                                    <p className="questions mt-3 mb-4"> <BooksCoef onChange={this.changeBooksCoef}/> € of books or magazines</p>
                                    <p className="questions mt-3 mb-4"> <CompCoef onChange={this.changeCompCoef}/> € of computers or IT</p>
                                  </div>
                                </div>

                                {/*graphs*/}
                                <div className="col-md-6 mt-4 graphs">
                                  <div className="">
                                    <SimpleLineChart coef={this.state.planeCoef
                                      +this.state.dietType*this.state.dietSize
                                      +this.state.carCoef
                                      +this.state.busCoef
                                      +this.state.subCoef
                                      +this.state.trainCoef
                                      +this.state.elecCoef
                                      +this.state.gasCoef
                                      +this.state.pharmaCoef
                                      +this.state.cloCoef
                                      +this.state.booksCoef
                                      +this.state.compCoef
                                    } age={30}/>
                                  </div>
                                  <div className="">
                                    <TwoLevelPieChart persData={{
                                      planeCoef:this.state.planeCoef,
                                      dietCoef:this.state.dietType*this.state.dietSize,
                                      carCoef:this.state.carCoef,
                                      busCoef:this.state.busCoef,
                                      subCoef:this.state.subCoef,
                                      trainCoef:this.state.trainCoef,
                                      elecCoef:this.state.elecCoef,
                                      gasCoef:this.state.gasCoef,
                                      pharmaCoef:this.state.pharmaCoef,
                                      cloCoef:this.state.cloCoef,
                                      booksCoef:this.state.booksCoef,
                                      compCoef:this.state.compCoef
                                    }} age={30} innerRadius={0} outerRadius={0}/>
                                  </div>
                                </div>
                              </div>

                            </div>

                          );
                        }
                      }
