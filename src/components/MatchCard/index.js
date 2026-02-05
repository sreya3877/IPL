import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails

  const statusClassName = matchStatus === 'Won' ? 'match-won' : 'match-lost'

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-card-logo"
      />
      <p className="match-card-team">{competingTeam}</p>
      <p className="match-card-result">{result}</p>
      <p className={`match-status ${statusClassName}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
