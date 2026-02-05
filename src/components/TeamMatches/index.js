import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Cell, Legend} from 'recharts'
import {withRouter} from 'react-router-dom'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamMatchesData: {},
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {id} = match.params

    const response = await fetch(`${teamMatchesApiUrl}${id}`)
    const fetchedData = await response.json()

    const formattedData = {
      teamBannerURL: fetchedData.team_banner_url,
      latestMatch: this.getFormattedData(fetchedData.latest_match_details),
      recentMatches: fetchedData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }

    this.setState({
      teamMatchesData: formattedData,
      isLoading: false,
    })
  }

  // ✅ Corrected method to include Won, Lost, Draw
  getMatchStatistics = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    let won = 0
    let lost = 0
    let draw = 0

    recentMatches.forEach(match => {
      if (match.matchStatus === 'Won') {
        won += 1
      } else if (match.matchStatus === 'Lost') {
        lost += 1
      } else {
        draw += 1
      }
    })

    return [
      {name: 'Won', value: won},
      {name: 'Lost', value: lost},
      {name: 'Draw', value: draw},
    ]
  }

  onClickBack = () => {
    const {history} = this.props
    history.push('/')
  }

  renderRecentMatchesList = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(match => (
          <MatchCard key={match.id} matchDetails={match} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerURL, latestMatch} = teamMatchesData
    const pieData = this.getMatchStatistics()

    return (
      <div className="responsive-container">
        {/* Back Button */}
        <button
          type="button"
          className="back-button"
          onClick={this.onClickBack}
        >
          Back
        </button>

        {/* Team Banner */}
        <img src={teamBannerURL} alt="team banner" className="team-banner" />

        {/* Latest Match */}
        <LatestMatch latestMatchData={latestMatch} />

        {/* Pie Chart */}
        <PieChart width={300} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
          >
            <Cell fill="#18ed66" /> {/* Won */}
            <Cell fill="#e31a1a" /> {/* Lost */}
            <Cell fill="#fbbf24" /> {/* Draw */}
          </Pie>
          <Legend />
        </PieChart>

        {/* Recent Matches */}
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {id} = match.params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default withRouter(TeamMatches)
