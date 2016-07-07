const React = require('react');


const Answers = React.createClass({
  render() {
    const currentQuestion = this.props.currentQuestion;
    let questionE;
    if (currentQuestion.e) {
      questionE = (<div>
        <input type="radio" value={currentQuestion.e[0]} name="options" id="e" onChange={this.props.updateAnswer}></input>
        <label htmlFor="e"> {currentQuestion.e} </label> <br /> </div>);
    }
    return (
      <form>
        <input type="radio" name="options" id="a" value={currentQuestion.a[0]} onChange={this.props.updateAnswer}></input>
        <label htmlFor="a"> {currentQuestion.a} </label> <br />
        <input type="radio" name="options" id="b" value={currentQuestion.b[0]} onChange={this.props.updateAnswer}></input>
        <label htmlFor="b"> {currentQuestion.b} </label> <br />
        <input type="radio" name="options" id="c" value={currentQuestion.c[0]} onChange={this.props.updateAnswer}></input>
        <label htmlFor="c"> {currentQuestion.c} </label> <br />
        <input type="radio" name="options" id="d" value={currentQuestion.d[0]} onChange={this.props.updateAnswer}></input>
        <label htmlFor="d"> {currentQuestion.d} </label> <br />
        {currentQuestion.e !== 'null' ? questionE : ''}
      </form>
    );
  },
});

module.exports = Answers;
