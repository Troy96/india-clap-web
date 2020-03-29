import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { config } from '../config';
@Injectable({
  providedIn: 'root'
})
export class JobsService {


  constructor(private http: HttpClient) {
  }

  skill_test($data: any) {
    return this.http.post(`${config.base_url}/JobMarket/skilltest/`, $data);
  }
  create_job($data: any) {
    // console.log($data)
    return this.http.post(`${config.base_url}/JobMarket/jobs/create/`, $data);

  }
  get_companies() {
    //JobMarket/companies
    return this.http.get(`${config.base_url}/JobMarket/companies`);
  }
  get_jobList() {
    return this.http.get(`${config.base_url}/JobMarket/jobs/`);
  }

  get_various_sectors_jobs() {
    return this.http.get(`${config.base_url}/JobMarket/jobs`);
  }

  get_job_description($data: number) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/${$data}`)
  }

  apply_to_job(jobId, $data: any) {
    return this.http.post(`${config.base_url}/JobMarket/jobs/${jobId}/apply`, $data)
  }

  get_company_details(companyId: number) {
    return this.http.get(`${config.base_url}/JobMarket/companies/${companyId}`);
  }

  upload_resume(jobId: number, $data: any) {
    return this.http.post(`${config.base_url}/JobMarket/jobs/${jobId}/apply`, $data);
  }

  archive_job_search($data: any) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/archive?month=${$data['month']}&job_title=${$data['job_title']}`)
  }

  select_all_jobs() {
    return this.http.get(`${config.base_url}/JobMarket/jobs/instantApply`);
  }

  save_job(jobId: number) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/${jobId}/save`)
  }

  search_job($data) {

    const formData = new FormData();
    formData.append('salary', $data['salary']);
    formData.append('location_District', $data['location_District']);
    formData.append('location_State', $data['location_State']);
    formData.append('starting_date', $data['starting_date']);
    formData.append('end_date', $data['end_date']);

    return this.http.post(`${config.base_url}/JobMarket/jobs/`, formData)

  }
  myJobPostings($data) {
    // JobMarket/jobs/myJobPostings
    return this.http.get(`${config.base_url}/JobMarket/jobs/myJobPostings`)

  }

  get_saved_jobs() {
    return this.http.get(`${config.base_url}/JobMarket/jobs/saved`);
  }

  get_applied_jobs() {
    return this.http.get(`${config.base_url}/JobMarket/jobs/applied`);
  }

  get_job_candidates(jobId: number) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/myJobPostings/${jobId}/candidates`);
  }

  get_shorlisted_candidates(jobId: number){
    return this.http.get(`${config.base_url}/JobMarket/jobs/myJobPostings/${jobId}/shortlistedCandidates`);
  }

}
