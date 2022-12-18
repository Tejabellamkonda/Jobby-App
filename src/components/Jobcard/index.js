import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {eachJob} = props
  return (
    <Link to={`/jobs/${eachJob.id}`} className="item-link">
      <li className="list-view">
        <div className="container1">
          <img
            src={eachJob.companyLogoUrl}
            alt="company logo"
            className="companyLogo"
          />
          <div className="name-container">
            <h1>{eachJob.title}</h1>
            <p>{eachJob.rating}</p>
          </div>
        </div>
        <div className="container2">
          <p>{eachJob.location}</p>
          <p>{eachJob.employmentType}</p>
          <p>{eachJob.packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div>
          <h1>Description</h1>
          <p>{eachJob.jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
