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

  get_sectors() {
    return this.http.get(`${config.base_url}/JobMarket/jobs/sectorwise`)
  }

  get_various_sectors_jobs() {
    return this.http.get<any>(`${config.base_url}/JobMarket/jobs`);
  }

  get_job_description($data: number) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/${$data}`)
  }

  apply_to_job(jobId, $data: any) {
    return this.http.post(`${config.base_url}/JobMarket/jobs/${jobId}/apply/`, $data)
  }

  get_company_details(companyId: number) {
    return this.http.get(`${config.base_url}/JobMarket/companies/${companyId}`);
  }

  upload_resume(jobId: number, $data: any) {
    const formData = new FormData();
    formData.append('text', $data.text);
    formData.append('video', $data.video);
    return this.http.post(`${config.base_url}/JobMarket/jobs/${jobId}/apply/`, formData);
  }

  archive_job_search($data: any) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/archive?month=${$data['month']}&job_title=${$data['job_title']}`)
  }

  select_all_jobs() {
    return this.http.get(`${config.base_url}/JobMarket/jobs/instantApply`);
  }

  save_job(jobId: number) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/${jobId}/save/`)
  }

  unsave_job(jobId: number) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/${jobId}/unsave/`)
  }

  favourite_job(jobId) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/${jobId}/fav/`)
  }

  get_favourite_jobs() {
    return this.http.get(`${config.base_url}/JobMaket/jobs/favourite/`)
  }

  search_job($data) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/job?salary=${$data['salary']}&location_District=${$data['location_District']}&location_State=${$data['location_State']}&starting_time=${$data['starting_time']}&end_time=${$data['end_time']}`)
  }

  get_job_postings() {
    return this.http.get(`${config.base_url}/JobMarket/jobs/myJobPostings`)

  }

  get_saved_jobs() {
    return this.http.get<any>(`${config.base_url}/JobMarket/jobs/saved`);
  }

  get_applied_jobs() {
    return this.http.get(`${config.base_url}/JobMarket/jobs/applied`);
  }

  get_job_candidates(jobId: number) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/myJobPostings/${jobId}/candidates`);
  }

  get_shorlisted_candidates(jobId: number) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/myJobPostings/${jobId}/shortlistedCandidates`);
  }
  // myJobPosting(jobId:number){
  //   return this.http.get(`${config.base_url}/JobMarket/jobs/myJobPostings/${jobId}/shortlistedCandidates`);

  get_jobs_by_titles() {
    return this.http.get(`${config.base_url}/JobMarket/jobs?ordering=job_title`);
  }

  get_jobs_by_openings(order) {
    return this.http.get(`${config.base_url}/JobMarket/jobs?ordering=${order}`);
  }

  instant_apply_jobs(isInstantJob: boolean) {
    return this.http.get(`${config.base_url}/JobMarket/jobs?is_instantjob=${isInstantJob}`);
  }

  get_job_status(applicationId: number) {
    return this.http.get(`${config.base_url}/JobMarket/jobApplicationState/${applicationId}`)
  }

  change_job_application_state(postId: number, candidateId: number, state: string) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/myJobPostings/${postId}/candidates/${candidateId}/${state}`)
  }

  get_job_byId(jobId: number) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/myJobPostings/${jobId}`);
  }
  edit_job_post($data: any, jobId: number) {
    return this.http.put(`${config.base_url}/JobMarket/jobs/myJobPostings/${jobId}/`, $data);
  }
  delete_job_post(jobId: number) {
    return this.http.delete(`${config.base_url}/JobMarket/jobs/myJobPostings/${jobId}/`);

  }

}
