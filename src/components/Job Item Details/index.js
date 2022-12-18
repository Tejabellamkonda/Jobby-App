import {Component} from 'react'
import Cookie from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: '',
    similarJobs: '',
    skills: '',

    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.callJobDetails()
  }

  callJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const jobDetailsFormatted = {
        id: data.job_details.id,
        title: data.job_details.title,
        companyLogoUrl: data.job_details.company_logo_url,
        companyUrl: data.job_details.company_website_url,
        jobDescription: data.job_details.job_description,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        location: data.job_details.location,
        employmentType: data.job_details.employment_type,
        description: data.job_details.life_at_company.description,
        companyimgUrl: data.job_details.life_at_company.image_url,
      }
      const similarJobsData = data.similar_jobs.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        rating: eachItem.rating,
        companyLogoUrl: eachItem.company_logo_url,
        location: eachItem.location,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
      }))
      const skillSet = data.job_details.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))

      this.setState({
        jobDetails: jobDetailsFormatted,
        similarJobs: similarJobsData,
        skills: skillSet,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.callJobDetails()
  }

  renderSuccess() {
    const {jobDetails, skills, similarJobs} = this.state
    const {
      title,
      companyLogoUrl,
      companyUrl,
      jobDescription,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      description,
      companyimgUrl,
    } = jobDetails

    return (
      <>
        <div className="bodyContainer">
          <div className="body-container">
            <ul className="list-container">
              <li className="list-view">
                <div className="container1">
                  <img
                    src={companyLogoUrl}
                    alt="job details company logo"
                    className="companyLogo"
                  />
                  <div>
                    <h1>{title}</h1>
                    <p>{rating}</p>
                  </div>
                </div>
                <div className="container2">
                  <p>{location}</p>
                  <p>{employmentType}</p>
                  <p>{packagePerAnnum}</p>
                </div>
                <hr className="line" />
                <div>
                  <h1>Description</h1>
                  <a href={companyUrl}>Visit</a>
                  <p>{jobDescription}</p>
                </div>
                <div>
                  <h1>Skills</h1>
                  <ul className="skillContainer">
                    {skills.map(item => (
                      <li>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="skillsImage"
                        />
                        <p>{item.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h1>Life at Company</h1>
                  <div className="life-at-company">
                    <p>{description}</p>
                    <img src={companyimgUrl} alt="life at company" />
                  </div>
                </div>
              </li>
            </ul>
            <div>
              <h1>Similar Jobs</h1>
              <ul className="similarContainer">
                {similarJobs.map(eachjob => (
                  <li className="list-view">
                    <div className="container1">
                      <img
                        src={eachjob.companyLogoUrl}
                        alt="similar job company logo"
                        className="companyLogo"
                      />
                      <div>
                        <h1>{eachjob.title}</h1>
                        <p>{eachjob.rating}</p>
                      </div>
                    </div>
                    <div className="container2">
                      <p>{eachjob.location}</p>
                      <p>{eachjob.employmentType}</p>
                      <p>{eachjob.packagePerAnnum}</p>
                    </div>
                    <hr className="line" />
                    <div>
                      <h1>Description</h1>
                      <p>{eachjob.jobDescription}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderFailure = () => (
    <div className="container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobItemDetails
