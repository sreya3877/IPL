import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    venue,
    result,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatchDetails

  return (
    <div className="latest-match-container">
      <div className="match-info">
        <p>{competingTeam}</p>
        <p>{date}</p>
        <p>{venue}</p>
        <p>{result}</p>
      </div>
      <img
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
        className="match-logo"
      />
      <div className="extra-info">
        <p>{firstInnings}</p>
        <p>{secondInnings}</p>
        <p>{manOfTheMatch}</p>
        <p>{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
