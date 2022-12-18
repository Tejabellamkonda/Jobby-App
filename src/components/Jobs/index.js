import {Component} from 'react'

import './index.css'
import Header from '../Header'
import Profile from '../Profile'
import JobList from '../JobsList'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    salary: '',
  }

  onChangeSalary = event => {
    this.setState({salary: event.target.value})
  }

  render() {
    const {salary} = this.state
    return (
      <>
        <Header />
        <div className="menu-and-body-container">
          <div className="menu">
            <Profile />
            <hr />
            <div>
              <ul className="items-container">
                <h1>Type of Employment</h1>
                {employmentTypesList.map(item => (
                  <li className="item-container">
                    <input type="checkbox" id={item.employmentTypeId} />
                    <label htmlFor={item.employmentTypeId}>{item.label}</label>
                  </li>
                ))}
              </ul>
              <hr />
              <ul className="items-container">
                <h1>Salary Range</h1>
                {salaryRangesList.map(item => (
                  <li className="item-container">
                    <input
                      type="radio"
                      id={item.salaryRangeId}
                      name="salary"
                      value={item.salaryRangeId}
                      onClick={this.onChangeSalary}
                    />
                    <label htmlFor={item.salaryRangeId}>{item.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="body-container">
            <ul className="list-container">
              <JobList salaryOption={salary} />
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
