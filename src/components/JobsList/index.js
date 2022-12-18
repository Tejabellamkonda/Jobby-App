import {Component} from 'react'
import Cookie from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import './index.css'
import JobCard from '../Jobcard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobList extends Component {
  state = {
    jobsList: '',
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentType: '',
    salaryRange: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobsData()
  }

  onChangeSalary = () => {
    this.setState({})
  }

  getJobsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput, employmentType, salaryRange} = this.state

    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobDetails = data.jobs.map(item => ({
        id: item.id,
        title: item.title,
        rating: item.rating,
        companyLogoUrl: item.company_logo_url,
        packagePerAnnum: item.package_per_annum,
        location: item.location,
        employmentType: item.employment_type,
        jobDescription: item.job_description,
      }))
      this.setState({
        jobsList: jobDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length !== 0) {
      return (
        <>
          {jobsList.map(eachJob => (
            <JobCard eachJob={eachJob} key={eachJob.id} />
          ))}
        </>
      )
    }
    return (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </>
    )
  }

  onClickRetry = () => {
    this.getJobsData()
  }

  renderJobsFailureView = () => (
    <div className="container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt=" failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderJobsLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobsLoadingView()
      default:
        return null
    }
  }

  render() {
    const {salaryOption} = this.props
    console.log(salaryOption)
    return (
      <>
        <div className="form-field">
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            onChange={this.onSearchInput}
          />
          <button
            type="button"
            className="searchButton"
            onClick={this.onClickSearch}
          >
            Search
          </button>
        </div>
        <div>{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobList
