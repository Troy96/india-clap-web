import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { config } from '../config';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private queryJobList = new BehaviorSubject<any[]>([]);
  public queryJobList$ = this.queryJobList.asObservable();

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
    return this.http.get<any>(`${config.base_url}/JobMarket/jobs/sectorwise`)
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
    // formData.append('video', $data.video);
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

  un_favourite_job(jobId) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/${jobId}/unfav/`)
  }

  get_favourite_jobs() {
    return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs/favourite/`)
  }
  un_save_job(jobId) {
    return this.http.get(`${config.base_url}/JobMarket/jobs/${jobId}/unsave/`)
  }
  search_job($data) {
    return this.http.get<any>(`${config.base_url}/JobMarket/jobs/job?salary=${$data['salary']}&location_District=${$data['location_District']}&location_State=${$data['location_State']}&starting_time=${$data['starting_time']}&end_time=${$data['end_time']}`)
  }

  get_job_postings() {
    return this.http.get(`${config.base_url}/JobMarket/jobs/myJobPostings`)

  }

  get_saved_jobs() {
    return this.http.get<any>(`${config.base_url}/JobMarket/jobs/saved`);
  }

  get_applied_jobs() {
    return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs/applied/`);
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
    return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=job_title`);
  }

  get_jobs_by_openings(order) {
    return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=${order}`);
  }

  instant_apply_jobs(isInstantJob: boolean) {
    return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?is_instantjob=${isInstantJob}`);
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
  send_video(userId, $data) {
    const formData = new FormData();
    formData.append('video_resume', $data.video_resume);
    return this.http.patch(`${config.base_url}/Users/profiles/${userId}/`, formData);

  }

  pushNewJobs(jobs: any[]) {
    this.queryJobList.next(jobs)
  }
  all_archive_jobs(){
    return this.http.get(`${config.base_url}/JobMarket/jobs/archive`);

  }
  get_jobs_by_filters($data:any){
    console.log($data)
    if($data.searchText){

      if($data.ordering&&$data.ordering=='job_title')
      {      console.log("not applying")

        if($data.jobType=='Active'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=job_title&&search=${$data.searchText}&&is_active=true`);
        }
        else if($data.jobType=='Instant'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=job_title&&search=${$data.searchText}&&is_active=true&is_instantjob=true`);
        }
        else if($data.jobType=='Archive'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=job_title&&search=${$data.searchText}&&is_active=false`);
        }
      }
      if($data.ordering&&$data.ordering=='numOpenings')
      {
        if($data.jobType=='Active'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=${$data.filter}&&search=${$data.searchText}&&is_active=true`);
        }
        else if($data.jobType=='Instant'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=${$data.filter}&&search=${$data.searchText}&&is_active=true&is_instantjob=true`);
        }
        else if($data.jobType=='Archive'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=${$data.filter}&&search=${$data.searchText}&&is_active=false`);
        }
      }
      else{
        if($data.jobType=='Active'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?search=${$data.searchText}&&is_active=true`);
        }
        else if($data.jobType=='Instant'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?search=${$data.searchText}&&is_active=true&is_instantjob=true`);
        }
        else if($data.jobType=='Archive'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?search=${$data.searchText}&&is_active=false`);
        }
      }
    }
    else{
      if($data.ordering&&$data.ordering=='job_title')
      {
        if($data.jobType=='Active'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=job_title&&is_active=true`);
        }
        else if($data.jobType=='Instant'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=job_title&&is_active=true&is_instantjob=true`);
        }
        else if($data.jobType=='Archive'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=job_title&&is_active=false`);
        }
      //  return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=job_title&&is_active=true&&is_instant=true`);
      }
      if($data.ordering&&$data.ordering=='numOpenings')
      {
        // return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=${$data.filter}&&is_active=true&&is_instant=true`);
        if($data.jobType=='Active'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=${$data.filter}&&is_active=true`);
        }
        else if($data.jobType=='Instant'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=${$data.filter}&&is_active=true&is_instantjob=true`);
        }
        else if($data.jobType=='Archive'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?ordering=${$data.filter}&&is_active=false`);
        }
      }
      else{
        if($data.jobType=='Active'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?is_active=true`);
        }
        else if($data.jobType=='Instant'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?is_active=true&is_instantjob=true`);
        }
        else if($data.jobType=='Archive'){
          return this.http.get<any[]>(`${config.base_url}/JobMarket/jobs?is_active=false`);
        }
      }
    }
  }
}
