import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, number }) => (
    <tr>
      <td>{text}</td>
      <td>{number}</td>
    </tr>
)

const Statistics = ({ good, neutral, bad, all, average }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return(
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }

  return(
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={'good'} number={good} />
          <StatisticLine text={'neutral'} number={neutral} />
          <StatisticLine text={'bad'} number={bad} />
          <StatisticLine text={'all'} number={all} />
          <StatisticLine text={'average'} number={average / all} />
          <StatisticLine text={'positive'} number={((good / all) * 100) + "%"} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setAll(all + 1);
    setAverage(average + 1);
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  }
  const handleBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setAverage(average - 1);
  }

  return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text={'good'} />
      <Button handleClick={handleNeutral} text={'neutral'} />
      <Button handleClick={handleBad} text={'bad'} />    
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} />
    </div>
  )
}

export default App;